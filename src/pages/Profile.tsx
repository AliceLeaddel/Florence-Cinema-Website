import { useState, useEffect } from "react";
import { useParams, NavLink } from "react-router-dom";
import { motion } from "framer-motion";

interface ProfileData {
  coupons: any[];
  tickets: any[];
  certificates: any[];
  email?: string;
}

export default function Profile() {
  const { username: paramUsername } = useParams<{ username?: string }>();
  const [profile, setProfile] = useState<ProfileData | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [editMode, setEditMode] = useState(false);
  const [newUsername, setNewUsername] = useState("");
  const [newEmail, setNewEmail] = useState("");
  const [saveStatus, setSaveStatus] = useState("");
  const [currentUsername, setCurrentUsername] = useState<string>("");
  const [currentEmail, setCurrentEmail] = useState<string>("");

  const loadProfile = (username: string) => {
    setLoading(true);
    fetch(`http://localhost:3001/profile/${username}`)
      .then((res) => res.json())
      .then((data) => {
        setProfile(data);
        setCurrentEmail(data.email || "Не вказано");
        setLoading(false);
      })
      .catch(() => {
        setError("Помилка завантаження профілю");
        setLoading(false);
      });
  };

  useEffect(() => {
    const usernameFromParams = paramUsername;
    const usernameFromStorage = localStorage.getItem("username");
    const username = usernameFromParams || usernameFromStorage;

    if (!username) {
      setError("Увійдіть в акаунт");
      setLoading(false);
      return;
    }

    setCurrentUsername(username);
    loadProfile(username);
  }, [paramUsername]);

  const handleSave = async () => {
    if (!newUsername && !newEmail) {
      setSaveStatus("Введіть хоча б одне поле");
      return;
    }

    try {
      const res = await fetch(`http://localhost:3001/profile/${currentUsername}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          newUsername: newUsername || undefined,
          newEmail: newEmail || undefined,
        }),
      });

      const data = await res.json();
      if (!res.ok) throw new Error(data.message);

      setSaveStatus("Зміни збережено!");
      const updatedUsername = newUsername || currentUsername;
      const updatedEmail = newEmail || currentEmail;
      localStorage.setItem("username", updatedUsername);
      setCurrentEmail(updatedEmail);
      setEditMode(false);
      setTimeout(() => {
        window.location.href = `/profile/${updatedUsername}`;
      }, 1000);
    } catch (err: any) {
      setSaveStatus(err.message || "Помилка збереження");
    }
  };

  if (!currentUsername) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div className="glass p-8 rounded-2xl max-w-md">
          <h2 className="text-2xl font-bold text-purple-400 mb-4">Увійдіть в акаунт</h2>
          <NavLink to="/login" className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white rounded-lg">
            Увійти
          </NavLink>
        </div>
      </div>
    );
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="glass p-8 rounded-2xl">
          <p className="text-xl text-purple-300">Завантаження...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex items-center justify-center text-center px-4">
        <div className="glass p-8 rounded-2xl max-w-md">
          <p className="text-red-400 mb-4">{error}</p>
          <NavLink to="/login" className="text-purple-400 underline">
            Повернутися до входу
          </NavLink>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-4 md:px-8">
      <div className="max-w-6xl mx-auto">
        <motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-bold text-purple-400 mb-2">Профіль: {currentUsername}</h1>
          <p className="text-gray-300">Ваші квитки, сертифікати та знижки</p>
        </motion.div>
        <div className="grid lg:grid-cols-3 gap-8">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.1 }}
            className="lg:col-span-1 flex flex-col gap-6"
          >
            <div className="glass rounded-2xl p-6 flex flex-col h-full">
              <h2 className="text-2xl font-bold text-purple-300 mb-4">Особисті дані</h2>
              {editMode ? (
                <div className="space-y-4 flex-1">
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Нове ім'я</label>
                    <input
                      type="text"
                      value={newUsername}
                      onChange={(e) => setNewUsername(e.target.value)}
                      placeholder={currentUsername}
                      className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-gray-400 mb-1">Новий email</label>
                    <input
                      type="email"
                      value={newEmail}
                      onChange={(e) => setNewEmail(e.target.value)}
                      placeholder={currentEmail}
                      className="w-full px-3 py-2 bg-gray-800 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                    />
                  </div>
                  {saveStatus && (
                    <p className={`text-sm ${saveStatus.includes("збережено") ? "text-green-400" : "text-red-400"}`}>
                      {saveStatus}
                    </p>
                  )}
                  <div className="flex gap-2 mt-auto">
                    <button
                      onClick={handleSave}
                      className="flex-1 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm"
                    >
                      Зберегти
                    </button>
                    <button
                      onClick={() => {
                        setEditMode(false);
                        setNewUsername("");
                        setNewEmail("");
                        setSaveStatus("");
                      }}
                      className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg text-sm"
                    >
                      Скасувати
                    </button>
                  </div>
                </div>
              ) : (
                <div className="space-y-3 flex-1 flex flex-col justify-between">
                  <div>
                    <p className="text-sm text-gray-400">Ім'я</p>
                    <p className="text-white font-medium">{currentUsername}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-400">Email</p>
                    <p className="text-white font-medium">{currentEmail}</p>
                  </div>
                  <button
                    onClick={() => setEditMode(true)}
                    className="text-purple-400 hover:text-purple-300 text-sm underline mt-4"
                  >
                    Змінити дані
                  </button>
                </div>
              )}
            </div>
            <div className="glass rounded-2xl p-6 flex flex-col h-full">
              <h2 className="text-xl font-bold text-purple-300 mb-4">Активні купони</h2>
              <div className="flex-1">
                {profile!.coupons.length > 0 ? (
                  <div className="space-y-3">
                    {profile!.coupons.map((c) => (
                      <div
                        key={c.id}
                        className="bg-gradient-to-r from-purple-900 to-purple-700 p-3 rounded-lg border border-purple-500"
                      >
                        <p className="text-white font-bold">{c.code}</p>
                        <p className="text-sm text-purple-200">-{c.discount}% до {c.expires}</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400 text-sm">Немає активних купонів</p>
                )}
              </div>
            </div>
          </motion.div>
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-2 flex flex-col gap-8"
          >
            <div className="glass rounded-2xl p-6 flex flex-col h-full">
              <h2 className="text-2xl font-bold text-purple-300 mb-4">Мої квитки</h2>
              <div className="flex-1">
                {profile!.tickets.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {profile!.tickets.map((t) => (
                      <div
                        key={t.id}
                        className="bg-gray-800 bg-opacity-50 p-4 rounded-xl border border-gray-700 flex flex-col justify-between"
                      >
                        <div>
                          <h3 className="font-semibold text-white">{t.film}</h3>
                          <p className="text-sm text-gray-300 mt-1">
                            {new Date(t.date).toLocaleDateString("uk-UA")} о {t.time}
                          </p>
                          <p className="text-sm text-purple-300 mt-1">
                            Місця: {JSON.parse(t.seats).join(", ")}
                          </p>
                        </div>
                        <p className="text-green-400 font-bold text-sm mt-2">{t.price} грн</p>
                      </div>
                    ))}
                  </div>
                ) : (
                  <p className="text-gray-400">Ви ще не купили квитки</p>
                )}
              </div>
            </div>
            <div className="glass rounded-2xl p-6 flex flex-col h-full">
              <h2 className="text-2xl font-bold text-purple-300 mb-4">Мої сертифікати</h2>
              <div className="flex-1">
                {profile!.certificates.length > 0 ? (
                  <div className="grid md:grid-cols-2 gap-4">
                    {profile!.certificates.map((c) => (
                      <div
                        key={c.id}
                        className="bg-gradient-to-br from-yellow-900 to-orange-800 p-4 rounded-xl border border-yellow-600 flex flex-col justify-between"
                      >
                        <div className="flex justify-between items-start">
                          <div>
                            <p className="text-2xl font-bold text-yellow-300">{c.amount} грн</p>
                            <p className="text-sm text-yellow-200">Подарунковий сертифікат</p>
                          </div>
                          <div className="bg-white bg-opacity-20 px-2 py-1 rounded text-xs text-yellow-100">
                            Активний
                          </div>
                        </div>
                        <div className="mt-3 space-y-1">
                          <p className="text-xs text-yellow-200">
                            Код: <span className="font-mono font-bold">{c.code}</span>
                          </p>
                          <p className="text-xs text-yellow-300">Для: {c.recipient_email}</p>
                          <p className="text-xs text-yellow-400">
                            Куплено: {new Date(c.purchased_at).toLocaleDateString("uk-UA")}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <p className="text-gray-400 mb-4">У вас немає сертифікатів</p>
                    <NavLink
                      to="/certificates"
                      className="px-5 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg text-sm"
                    >
                      Придбати сертифікат
                    </NavLink>
                  </div>
                )}
              </div>
            </div>
          </motion.div>
        </div>
        <div className="text-center mt-12">
          <button
            onClick={() => {
              localStorage.removeItem("username");
              window.location.href = "/login";
            }}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-lg transition"
          >
            Вийти з акаунту
          </button>
        </div>
      </div>
    </div>
  );
}