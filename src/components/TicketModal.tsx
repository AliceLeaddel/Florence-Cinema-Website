import { useState } from "react";

interface Seat {
  row: number;
  seat: number;
}

interface Film {
  id: number;
  title: string;
  price: number;
  hall: string;
  dates: string[];
  times: string[];
}

interface TicketModalProps {
  isOpen: boolean;
  onClose: () => void;
  film: Film;
}

export default function TicketModal({ isOpen, onClose, film }: TicketModalProps) {
  const [selectedDate, setSelectedDate] = useState(film.dates[0]);
  const [selectedTime, setSelectedTime] = useState(film.times[0]);
  const [selectedSeats, setSelectedSeats] = useState<Seat[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);

  const username = localStorage.getItem("username"); // ← ВАЖНО!

  const rows = 8;
  const seatsPerRow = 10;

  const toggleSeat = (row: number, seat: number) => {
    const seatKey = { row, seat };
    setSelectedSeats((prev) =>
      prev.some((s) => s.row === row && s.seat === seat)
        ? prev.filter((s) => !(s.row === row && s.seat === seat))
        : [...prev, seatKey]
    );
  };

  const handlePurchase = async () => {
    if (!username) {
      setError("Ви не увійшли в акаунт!");
      return;
    }
    if (selectedSeats.length === 0) {
      setError("Оберіть хоча б одне місце");
      return;
    }

    setIsLoading(true);
    setError("");
    setSuccess(false);

    const totalPrice = selectedSeats.length * film.price;

    try {
      const res = await fetch("http://localhost:3001/buy-ticket", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          username,
          film: film.title,
          date: selectedDate,
          time: selectedTime,
          seats: selectedSeats,
          price: totalPrice,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Помилка покупки");
      } else {
        setSuccess(true);
        setTimeout(() => {
          onClose();
          setSelectedSeats([]);
          setSuccess(false);
        }, 2000);
      }
    } catch (err) {
      setError("Немає зв’язку з сервером");
    } finally {
      setIsLoading(false);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
      <div className="glass max-w-4xl w-full max-h-[90vh] overflow-y-auto rounded-2xl p-6 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-400 hover:text-white text-2xl"
        >
          ×
        </button>

        <h2 className="text-3xl font-bold text-purple-400 mb-4">{film.title}</h2>
        <p className="text-gray-300 mb-6">Зал: {film.hall} • Ціна за місце: {film.price} грн</p>

        <div className="grid md:grid-cols-2 gap-6 mb-8">
          <div>
            <label className="block text-sm text-gray-400 mb-2">Дата</label>
            <select
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple-500/30 text-white"
            >
              {film.dates.map((date) => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString("uk-UA", {
                    weekday: "long",
                    day: "numeric",
                    month: "long",
                  })}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm text-gray-400 mb-2">Час</label>
            <select
              value={selectedTime}
              onChange={(e) => setSelectedTime(e.target.value)}
              className="w-full px-4 py-3 rounded-lg bg-white/10 border border-purple-500/30 text-white"
            >
              {film.times.map((time) => (
                <option key={time} value={time}>
                  {time}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-8">
          <p className="text-center text-gray-400 mb-4 text-sm">Екран</p>
          <div className="bg-gray-900/50 rounded-xl p-6 border-2 border-purple-500/30">
            <div className="grid grid-cols-10 gap-2 max-w-2xl mx-auto">
              {Array.from({ length: rows }, (_, row) =>
                Array.from({ length: seatsPerRow }, (_, seat) => {
                  const isSelected = selectedSeats.some((s) => s.row === row + 1 && s.seat === seat + 1);
                  const isTaken = Math.random() > 0.7;

                  return (
                    <button
                      key={`${row}-${seat}`}
                      disabled={isTaken}
                      onClick={() => toggleSeat(row + 1, seat + 1)}
                      className={`w-10 h-10 rounded text-xs font-medium transition
                        ${isTaken ? "bg-gray-700 text-gray-500 cursor-not-allowed" : ""}
                        ${isSelected ? "bg-purple-600 text-white" : "bg-gray-800 hover:bg-purple-600/50 text-gray-400"}
                      `}
                    >
                      {row + 1}-{seat + 1}
                    </button>
                  );
                })
              )}
            </div>
          </div>
        </div>

        <div className="text-center">
          <p className="text-xl mb-4">
            Вибрано місць: <span className="text-purple-400 font-bold">{selectedSeats.length}</span>
            <br />
            До сплати: <span className="text-green-400 font-bold">{selectedSeats.length * film.price} грн</span>
          </p>

          {error && <p className="text-red-400 mb-4">{error}</p>}
          {success && <p className="text-green-400 mb-4">Квитки успішно куплені!</p>}

          <button
            onClick={handlePurchase}
            disabled={isLoading || selectedSeats.length === 0 || !username}
            className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white font-bold rounded-lg hover:scale-105 transition disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isLoading ? "Обробка..." : "Купити квитки"}
          </button>
        </div>
      </div>
    </div>
  );
}