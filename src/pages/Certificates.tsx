import { NavLink } from "react-router-dom";
import { useState } from "react";
import CertificateModal from "../components/CertificateModal.tsx";

export default function Certificates() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedAmount, setSelectedAmount] = useState(0);

  const openModal = (amount: number) => {
    setSelectedAmount(amount);
    setModalOpen(true);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <section className="mt-24 px-8 py-16 text-center">
        <h2 className="text-4xl font-bold mb-4 text-purple-400">Подарункові сертифікати</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Подаруйте незабутні емоції! Наші сертифікати — ідеальний подарунок для любителів кіно.
        </p>
      </section>
      <section className="px-8 py-16 glass rounded-2xl mx-6 my-6">
        <h3 className="text-3xl font-bold mb-8 text-purple-400">Варіанти сертифікатів</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-xl">
            <h4 className="text-xl font-semibold text-purple-300 mb-2">Сертифікат на 200 грн</h4>
            <p className="text-gray-400">
              Ідеально для одного сеансу в залі Комфорт або 2D форматі.
            </p>
            <button
              onClick={() => openModal(200)}
              className="mt-3 inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Придбати
            </button>
          </div>
          <div className="glass p-6 rounded-xl">
            <h4 className="text-xl font-semibold text-purple-300 mb-2">Сертифікат на 500 грн</h4>
            <p className="text-gray-400">
              Підходить для двох квитків у преміум-зал або IMAX-сеансу.
            </p>
            <button
              onClick={() => openModal(500)}
              className="mt-3 inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Придбати
            </button>
          </div>
          <div className="glass p-6 rounded-xl">
            <h4 className="text-xl font-semibold text-purple-300 mb-2">Сертифікат на 1000 грн</h4>
            <p className="text-gray-400">
              Для сімейного походу або кількох сеансів у будь-якому форматі.
            </p>
            <button
              onClick={() => openModal(1000)}
              className="mt-3 inline-block px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
            >
              Придбати
            </button>
          </div>
        </div>
      </section>
      <section className="px-8 py-16">
        <h3 className="text-3xl font-bold mb-8 text-purple-400">Як використовувати сертифікат</h3>
        <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
          Купуйте сертифікат онлайн або на касі. Вкажіть номінал та стиль упаковки (електронний або фізичний). Після
          активації сертифікат можна використати для оплати квитків або додаткових послуг (попкорн, напої) у
          CinemaVerse. Термін дії — 1 рік з моменту покупки.
        </p>
        <p className="text-gray-300 mb-6 max-w-3xl mx-auto">
          Для використання введіть код сертифіката при онлайн-бронюванні або пред’явіть його на касі. Сертифікати не
          підлягають поверненню та не обмінюються на готівку.
        </p>
      </section>
      <section className="px-8 py-16 glass rounded-2xl mx-6 my-6">
        <h3 className="text-3xl font-bold mb-8 text-purple-400">Чому варто подарувати сертифікат?</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-xl">
            <h4 className="text-xl font-semibold text-purple-300 mb-2">Універсальний подарунок</h4>
            <p className="text-gray-400">Підходить для будь-якого свята — від днів народження до корпоративних подій.</p>
          </div>
          <div className="glass p-6 rounded-xl">
            <h4 className="text-xl font-semibold text-purple-300 mb-2">Гнучкість</h4>
            <p className="text-gray-400">Отримувач може обрати фільм і сеанс на свій смак.</p>
          </div>
          <div className="glass p-6 rounded-xl">
            <h4 className="text-xl font-semibold text-purple-300 mb-2">Емоції</h4>
            <p className="text-gray-400">Подаруйте незабутні враження від перегляду улюблених фільмів.</p>
          </div>
        </div>
      </section>
      <section className="px-8 py-16 text-center">
        <h3 className="text-3xl font-bold mb-8 text-purple-400">Подаруйте радість</h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Зробіть особливий подарунок для близьких! Обирайте сертифікат і даруйте магію кіно.
        </p>
        <div className="flex justify-center gap-4">
          <NavLink
            to="/schedule"
            className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition"
          >
            Переглянути розклад
          </NavLink>
          <NavLink
            to="/about"
            className="px-6 py-3 rounded-lg bg-transparent border border-purple-600 hover:bg-purple-600 text-white font-medium transition"
          >
            Про нас
          </NavLink>
        </div>
      </section>
      <CertificateModal
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        amount={selectedAmount}
      />
    </div>
  );
}