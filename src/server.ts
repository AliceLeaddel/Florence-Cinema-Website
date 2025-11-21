import express from "express";
import sqlite3 from "sqlite3";
import cors from "cors";
import { fileURLToPath } from "url";
import { dirname, join } from "path";
import { readFileSync } from "fs";
import os from "os";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

const db = new sqlite3.Database("./database.sqlite", (err) => {
  if (err) console.error(err);
  else console.log("✅ SQLite connected");
});

db.serialize(() => {
  db.run(`CREATE TABLE IF NOT EXISTS users (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    username TEXT UNIQUE NOT NULL,
    email TEXT UNIQUE NOT NULL,
    password TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS coupons (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    code TEXT NOT NULL,
    discount INTEGER NOT NULL,
    expires TEXT NOT NULL
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS tickets (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    film TEXT NOT NULL,
    date TEXT NOT NULL,
    time TEXT NOT NULL,
    seats TEXT NOT NULL,
    price INTEGER NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);

  db.run(`CREATE TABLE IF NOT EXISTS purchased_certificates (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    user_id INTEGER,
    amount INTEGER NOT NULL,
    code TEXT UNIQUE NOT NULL,
    recipient_email TEXT,
    purchased_at TEXT NOT NULL,
    FOREIGN KEY(user_id) REFERENCES users(id)
  )`);
});

const seedCoupons = [
  { code: "CINEMA10", discount: 10, expires: "2025-12-31" },
  { code: "WELCOME20", discount: 20, expires: "2025-12-31" },
];

db.run(`DELETE FROM coupons`);
seedCoupons.forEach((c) => {
  db.run(
    `INSERT OR IGNORE INTO coupons (code, discount, expires) VALUES (?, ?, ?)`,
    [c.code, c.discount, c.expires]
  );
});

const filmsPath = join(__dirname, "data", "films.json");
let filmsCache: any[] = [];

try {
  const data = readFileSync(filmsPath, "utf-8");
  filmsCache = JSON.parse(data);
  console.log("🎬 Фільми завантажено:", filmsCache.length);
} catch (e) {
  console.error("❌ Помилка читання films.json:", e);
}

app.get("/api/films", (_, res) => {
  res.json(filmsCache);
});

app.post("/register", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: "Усі поля обов'язкові" });

  try {
    const bcrypt = await import("bcrypt");
    const hash = await bcrypt.hash(password, 10);

    db.run(
      `INSERT INTO users (username, email, password) VALUES (?, ?, ?)`,
      [username, email, hash],
      function (err) {
        if (err) {
          if (err.message.includes("UNIQUE"))
            return res.status(400).json({ message: "Користувач вже існує" });
          return res.status(500).json({ message: "Помилка сервера" });
        }
        res.status(201).json({ message: "Реєстрація успішна" });
      }
    );
  } catch (e) {
    res.status(500).json({ message: "Помилка сервера" });
  }
});

app.post("/login", (req, res) => {
  const { username, password } = req.body;
  db.get(`SELECT * FROM users WHERE username = ?`, [username], async (err, user: any) => {
    if (err || !user) return res.status(400).json({ message: "Невірні дані" });
    const bcrypt = await import("bcrypt");
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) return res.status(400).json({ message: "Невірні дані" });
    res.json({ message: "Успішний вхід", username: user.username });
  });
});

app.get("/profile/:username", (req, res) => {
  const { username } = req.params;

  db.get(`SELECT id FROM users WHERE username = ?`, [username], (err, user: any) => {
    if (err || !user) return res.status(404).json({ message: "Користувач не знайдений" });

    db.all(`SELECT * FROM coupons`, [], (err, coupons) => {
      if (err) return res.status(500).json({ message: "Помилка купонів" });

      db.all(`SELECT * FROM tickets WHERE user_id = ?`, [user.id], (err, tickets) => {
        if (err) return res.status(500).json({ message: "Помилка квитків" });

        db.all(
          `SELECT * FROM purchased_certificates WHERE user_id = ?`,
          [user.id],
          (err, certificates) => {
            if (err) return res.status(500).json({ message: "Помилка сертифікатів" });
            res.json({ coupons, tickets, certificates });
          }
        );
      });
    });
  });
});

app.put("/profile/:username", (req, res) => {
  const { username } = req.params;
  const { newUsername, newEmail } = req.body;

  if (!newUsername && !newEmail)
    return res.status(400).json({ message: "Нічого змінювати" });

  const updates: string[] = [];
  const values: any[] = [];

  if (newUsername) {
    updates.push(`username = ?`);
    values.push(newUsername);
  }
  if (newEmail) {
    updates.push(`email = ?`);
    values.push(newEmail);
  }
  values.push(username);

  db.run(
    `UPDATE users SET ${updates.join(", ")} WHERE username = ?`,
    values,
    function (err) {
      if (err) {
        if (err.message.includes("UNIQUE"))
          return res.status(400).json({ message: "Ім'я або email вже зайняті" });
        return res.status(500).json({ message: "Помилка сервера" });
      }
      res.json({ message: "Дані оновлено" });
    }
  );
});

app.post("/buy-ticket", (req, res) => {
  const { username, film, date, time, seats, price } = req.body;
  if (!username || !film || !date || !time || !seats || !price)
    return res.status(400).json({ message: "Всі поля обов'язкові" });

  db.get(`SELECT id FROM users WHERE username = ?`, [username], (err, user: any) => {
    if (err || !user) return res.status(400).json({ message: "Користувач не знайдений" });

    db.run(
      `INSERT INTO tickets (user_id, film, date, time, seats, price) VALUES (?, ?, ?, ?, ?, ?)`,
      [user.id, film, date, time, JSON.stringify(seats), price],
      function (err) {
        if (err) return res.status(500).json({ message: "Помилка збереження квитка" });
        res.json({ message: "Квиток куплено", ticketId: this.lastID });
      }
    );
  });
});

app.post("/buy-certificate", (req, res) => {
  const { username, amount, recipientEmail } = req.body;
  if (!username || !amount || !recipientEmail)
    return res.status(400).json({ message: "Всі поля обов'язкові" });

  db.get(`SELECT id FROM users WHERE username = ?`, [username], (err, user: any) => {
    if (err || !user) return res.status(400).json({ message: "Користувач не знайдений" });

    const code = `CERT-${Date.now().toString(36).toUpperCase()}-${Math.floor(Math.random() * 1000)}`;
    db.run(
      `INSERT INTO purchased_certificates (user_id, amount, code, recipient_email, purchased_at)
       VALUES (?, ?, ?, ?, ?)`,
      [user.id, amount, code, recipientEmail, new Date().toISOString()],
      function (err) {
        if (err) return res.status(500).json({ message: "Помилка" });
        res.json({ message: "Сертифікат придбано", code });
      }
    );
  });
});

function getNetworkIP() {
  const nets = os.networkInterfaces();
  for (const name of Object.keys(nets)) {
    for (const net of nets[name] || []) {
      if (net.family === "IPv4" && !net.internal) {
        if (name.includes("Radmin") || name.includes("Hamachi")) {
          return net.address;
        }
      }
    }
  }
  return "127.0.0.1";
}

const networkIP = getNetworkIP();

app.listen(port, "0.0.0.0", () => {
  console.log(`✅ Сервер запущен и доступен по:
  - Локально:  http://localhost:${port}
  - В сети:    http://${networkIP}:${port}
  `);
});
