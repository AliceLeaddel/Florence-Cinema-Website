import { useState, useRef } from "react";
import { motion } from "framer-motion";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
  onLogin: () => void;
}

export default function AuthModal({ isOpen, onClose, onLogin }: AuthModalProps) {
  const [isLogin, setIsLogin] = useState(true);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const modalRef = useRef<HTMLDivElement>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    if (!username || !password || (!isLogin && !email)) {
      setError("Будь ласка, заповніть усі поля");
      setIsLoading(false);
      return;
    }

    if (!isLogin && !/\S+@\S+\.\S+/.test(email)) {
      setError("Невірний формат email");
      setIsLoading(false);
      return;
    }

    try {
      const endpoint = isLogin ? "/login" : "/register";
      const response = await fetch(`http://localhost:3001${endpoint}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || "Помилка сервера");
      }

      if (isLogin) {
        localStorage.setItem("username", username);
        onLogin();
        onClose();
      } else {
        setIsLogin(true);
        setUsername("");
        setEmail("");
        setPassword("");
      }
    } catch (err: any) {
      setError(err.message || "Щось пішло не так");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOverlayClick = (e: React.MouseEvent) => {
    if (modalRef.current && !modalRef.current.contains(e.target as Node)) {
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onClick={handleOverlayClick}
    >
      <motion.div
        ref={modalRef}
        className="glass rounded-xl p-6 w-full max-w-md"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        exit={{ scale: 0.8, opacity: 0 }}
        transition={{ duration: 0.3 }}
      >
        <h2 className="text-2xl font-bold text-purple-400 mb-4">{isLogin ? "Увійти" : "Реєстрація"}</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Ім'я користувача</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Введіть ім'я"
            />
          </div>
          {!isLogin && (
            <div>
              <label className="block text-gray-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
                placeholder="Введіть email"
              />
            </div>
          )}
          <div>
            <label className="block text-gray-300 mb-1">Пароль</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-400"
              placeholder="Введіть пароль"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className="w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 animate-button-hover disabled:opacity-50"
          >
            {isLoading ? "Завантаження..." : isLogin ? "Увійти" : "Зареєструватися"}
          </button>
        </form>
        <button
          className="mt-4 text-purple-400 hover:text-purple-300"
          onClick={() => {
            setIsLogin(!isLogin);
            setError("");
            setUsername("");
            setEmail("");
            setPassword("");
          }}
        >
          {isLogin ? "Немає акаунта? Зареєструйтеся" : "Вже маєте акаунт? Увійдіть"}
        </button>
      </motion.div>
    </motion.div>
  );
}