import { useState } from "react";
import { motion } from "framer-motion";

interface CertificateModalProps {
  isOpen: boolean;
  onClose: () => void;
  amount: number;
}

export default function CertificateModal({ isOpen, onClose, amount }: CertificateModalProps) {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  const handlePurchase = async () => {
    const username = localStorage.getItem("username");
    if (!username) {
      setMessage("Увійдіть в акаунт");
      return;
    }

    try {
      const res = await fetch("http://localhost:3001/buy-certificate", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, amount, recipientEmail: email }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setMessage("Сертифікат придбано!");
      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 1500);
    } catch (err: any) {
      setMessage(err.message || "Помилка");
    }
  };

  if (!isOpen) return null;

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="fixed inset-0 bg-black bg-opacity-70 flex items-center justify-center z-50 p-4"
      onClick={onClose}
    >
      <motion.div
        initial={{ scale: 0.8 }}
        animate={{ scale: 1 }}
        exit={{ scale: 0.8 }}
        className="glass rounded-2xl p-6 max-w-md w-full"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-2xl font-bold text-purple-400 mb-4">Придбати сертифікат</h2>
        <div className="text-center mb-6">
          <p className="text-3xl font-bold text-green-400">{amount} грн</p>
          <p className="text-gray-300">Подарунковий сертифікат</p>
        </div>

        <div className="space-y-4">
          <div>
            <label className="block text-gray-300 mb-1">Email отримувача</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="friend@example.com"
              className="w-full px-4 py-2 bg-gray-800 text-white rounded-lg"
            />
          </div>

          {message && (
            <p className={`text-sm ${message.includes("придбано") ? "text-green-400" : "text-red-400"}`}>
              {message}
            </p>
          )}

          <div className="flex gap-3">
            <button
              onClick={handlePurchase}
              className="flex-1 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Придбати
            </button>
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
            >
              Скасувати
            </button>
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}