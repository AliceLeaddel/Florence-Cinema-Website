import { useState, useEffect } from "react";
import TicketModal from "../components/TicketModal.tsx";
import filmImages, { placeholder } from "../utils/filmImages";

interface Film {
  id: number;
  title: string;
  genre: string;
  rating: string;
  hall: string;
  description: string;
  price: number;
  dates: string[];
  times: string[];
}

export default function Films() {
  const [films, setFilms] = useState<Film[]>([]);
  const [loading, setLoading] = useState(true);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedFilm, setSelectedFilm] = useState<Film | null>(null);

  useEffect(() => {
    fetch("http://localhost:3001/api/films")
      .then((res) => res.json())
      .then((data) => {
        setFilms(data);
        setLoading(false);
      })
      .catch(() => setLoading(false));
  }, []);

  const openModal = (film: Film) => {
    setSelectedFilm(film);
    setModalOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-xl text-purple-300">Завантаження фільмів...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen py-24 px-4 md:px-8">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl md:text-5xl font-bold text-center text-purple-400 mb-12">
          Усі фільми
        </h1>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {films.map((film) => (
            <div
              key={film.id}
              className="glass rounded-xl overflow-hidden glow transition cursor-pointer movie-card animate-fade-in"
              style={{ animationDelay: `${(film.id - 1) * 50}ms` }}
            >
              <div className="relative h-64 bg-gray-800 overflow-hidden">
                <img
                  src={filmImages[film.id] || placeholder}
                  alt={film.title}
                  className="w-full h-full object-cover transition-opacity duration-500"
                  loading="lazy"
                />
              </div>
              <div className="p-4">
                <h4 className="font-semibold text-lg text-white">{film.title}</h4>
                <p className="text-sm text-gray-400 mt-1">{film.genre}</p>
                <p className="text-sm text-yellow-400 mt-1">Рейтинг: {film.rating}</p>
                <p className="text-sm text-gray-400 mt-1">Зал: {film.hall}</p>
                <p className="text-sm text-green-400 font-bold mt-1">{film.price} грн</p>
                <p className="text-sm text-gray-300 mt-2 line-clamp-2">{film.description}</p>
                <button
                  onClick={() => openModal(film)}
                  className="mt-3 w-full px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition"
                >
                  Купити квитки
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>

      {selectedFilm && (
        <TicketModal
          isOpen={modalOpen}
          onClose={() => setModalOpen(false)}
          film={selectedFilm}
        />
      )}
    </div>
  );
}