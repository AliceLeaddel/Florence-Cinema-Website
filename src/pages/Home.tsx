import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import TicketModal from "../components/TicketModal.tsx";
import filmImages, { placeholder } from "../utils/filmImages";

interface Film {
  id: number;
  title: string;
  genre: string;
  description: string;
  hall: string;
  price: number;
  dates: string[];
  times: string[];
}

export default function Home() {
  const [popularFilms, setPopularFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/films")
      .then((res) => res.json())
      .then((data) => {
        setPopularFilms(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const openModal = (film: Film) => {
    setSelectedFilm(film);
    setModalOpen(true);
  };

  const MovieCard = ({ movie, index }: { movie: Film; index: number }) => (
    <div
      className="glass rounded-xl overflow-hidden transition cursor-pointer movie-card flex-shrink-0 w-[calc(25%-1.5rem)] sm:w-[calc(33.33%-1.5rem)] md:w-[calc(25%-1.5rem)] lg:w-[calc(20%-1.5rem)] flex flex-col animate-fade-in"
      style={{ animationDelay: `${index * 100}ms` }}
    >
      <div className="relative h-64 bg-gray-800 overflow-hidden">
        <img
          src={filmImages[movie.id] || placeholder}
          alt={movie.title}
          className="w-full h-full object-cover transition-opacity duration-500"
          loading="lazy"
        />
      </div>
      <div className="p-4 flex flex-col flex-grow">
        <div className="flex-grow">
          <h4 className="font-semibold text-lg text-white">{movie.title}</h4>
          <p className="text-sm text-gray-400 mt-1">{movie.genre}</p>
          <p className="text-sm text-gray-300 mt-2 line-clamp-2">{movie.description}</p>
        </div>
        <button
          onClick={() => openModal(movie)}
          className="mt-2 inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 animate-button-hover"
        >
          Купити квитки
        </button>
      </div>
    </div>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-purple-300">Завантаження...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <section className="mt-24 relative flex items-center justify-center h-[70vh] overflow-hidden animate-fade-in-up">
        <img
          src="https://images.unsplash.com/photo-1524985069026-dd778a71c7b4?auto=format&fit=crop&w=1600&q=80"
          alt="Банер кіно"
          className="absolute w-full h-full object-cover opacity-30"
        />
        <div className="relative z-10 text-center max-w-2xl">
          <h2 className="text-5xl font-bold mb-4 text-white drop-shadow-lg">Відчуй магію кіно</h2>
          <p className="text-gray-300 text-lg mb-6">Дивись прем’єри, хіти та культові стрічки у нашому кінотеатрі</p>
          <div className="flex justify-center gap-4">
            <NavLink
              to="/schedule"
              className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition animate-button-hover"
            >
              Переглянути розклад
            </NavLink>
            <NavLink
              to="/films"
              className="px-6 py-3 rounded-lg bg-transparent border border-purple-600 hover:bg-purple-600 text-white font-medium transition animate-button-hover"
            >
              Дізнатися про фільми
            </NavLink>
          </div>
        </div>
      </section>
      <section className="px-8 py-16 animate-fade-in-up">
        <h3 className="text-3xl font-bold mb-8 text-purple-400">Популярне сьогодні</h3>
        <div className="flex gap-6 overflow-x-auto pb-4 scrollbar-thin">
          {popularFilms.slice(0, 5).map((movie, i) => (
            <MovieCard key={movie.id} movie={movie} index={i} />
          ))}
        </div>
      </section>
      <section className="px-8 py-16 glass rounded-2xl mx-6 my-6 animate-fade-in-up">
        <h3 className="text-3xl font-bold mb-8 text-purple-400">Розклад сеансів</h3>
        <table className="w-full text-left border-collapse text-gray-300">
          <thead>
            <tr className="border-b border-gray-700 text-purple-300">
              <th className="py-2">Дата</th>
              <th className="py-2">Фільм</th>
              <th className="py-2">Час</th>
              <th className="py-2">Зал</th>
              <th className="py-2">Формат</th>
            </tr>
          </thead>
          <tbody>
            {popularFilms.slice(0, 6).map((film) => (
              <tr key={film.id} className="border-b border-gray-800 hover:bg-white/5 transition">
                <td className="py-2">{new Date(film.dates[0]).toLocaleDateString("uk-UA")}</td>
                <td>{film.title}</td>
                <td>{film.times.join(", ")}</td>
                <td>{film.hall}</td>
                <td>{film.hall.includes("IMAX") ? "IMAX" : "2D"}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <p className="mt-6 text-gray-400 text-sm">
          * Розклад може змінюватися. Актуальна інформація доступна на касі або в особистому кабінеті.
        </p>
      </section>
      <section className="px-8 py-16 animate-fade-in-up">
        <h3 className="text-3xl font-bold mb-8 text-purple-400">Знижки та акції</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-xl animate-fade-in" style={{ animationDelay: "100ms" }}>
            <h4 className="text-xl font-semibold text-purple-300 mb-2">Студентська знижка -20%</h4>
            <p className="text-gray-400">Покажи студентський квиток і отримай знижку на квитки у будь-який день!</p>
          </div>
          <div className="glass p-6 rounded-xl animate-fade-in" style={{ animationDelay: "200ms" }}>
            <h4 className="text-xl font-semibold text-purple-300 mb-2">Щасливі години</h4>
            <p className="text-gray-400">З понеділка по четвер з 12:00 до 16:00 — квитки по 100 грн!</p>
          </div>
          <div className="glass p-6 rounded-xl animate-fade-in" style={{ animationDelay: "300ms" }}>
            <h4 className="text-xl font-semibold text-purple-300 mb-2">День народження</h4>
            <p className="text-gray-400">Іменинникам — безкоштовний попкорн та напій</p>
          </div>
        </div>
        <div className="text-center mt-6">
          <NavLink
            to="/discounts"
            className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition animate-button-hover"
          >
            Дізнатися більше про знижки
          </NavLink>
        </div>
      </section>
      <section className="px-8 py-16 glass rounded-2xl mx-6 my-6 animate-fade-in-up">
        <h3 className="text-3xl font-bold mb-8 text-purple-400">Подарункові сертифікати</h3>
        <p className="text-gray-300 mb-6">
          Подаруй враження! Сертифікат на відвідування нашого кінотеатру — чудовий вибір для друзів, коханої людини або родини.
        </p>
        <NavLink
          to="/certificates"
          className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition animate-button-hover"
        >
          Придбати сертифікат
        </NavLink>
      </section>
      <section className="px-8 py-16 animate-fade-in-up">
        <h3 className="text-3xl font-bold mb-8 text-purple-400">Відгуки користувачів</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-xl animate-fade-in" style={{ animationDelay: "100ms" }}>
            <p className="text-gray-300 mb-2">"Чудовий кінотеатр з класною атмосферою і великим вибором фільмів!"</p>
            <p className="text-purple-300 font-semibold">— Олексій</p>
          </div>
          <div className="glass p-6 rounded-xl animate-fade-in" style={{ animationDelay: "200ms" }}>
            <p className="text-gray-300 mb-2">"Особливо сподобались прем’єри в IMAX. Рекомендую всім!"</p>
            <p className="text-purple-300 font-semibold">— Марина</p>
          </div>
          <div className="glass p-6 rounded-xl animate-fade-in" style={{ animationDelay: "300ms" }}>
            <p className="text-gray-300 mb-2">"Зручне розташування і приємна атмосфера. Завжди раджу друзям."</p>
            <p className="text-purple-300 font-semibold">— Дмитро</p>
          </div>
        </div>
      </section>
      {selectedFilm && (
        <TicketModal isOpen={modalOpen} onClose={() => setModalOpen(false)} film={selectedFilm} />
      )}
    </div>
  );
}