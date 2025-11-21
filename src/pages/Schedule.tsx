import { NavLink } from "react-router-dom";

export default function Schedule() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="mt-24 px-8 py-16 text-center">
        <h2 className="text-4xl font-bold mb-4 text-purple-400">Розклад сеансів</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Перегляньте актуальний розклад сеансів у наших залах. Обирайте зручний час і формат для незабутнього перегляду!
        </p>
      </section>
      <section className="px-8 py-16 glass rounded-2xl mx-6 my-6">
        <h3 className="text-3xl font-bold mb-8 text-purple-400">Актуальний розклад</h3>
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
            <tr className="border-b border-gray-800 hover:bg-white/5 transition">
              <td className="py-2">09.10.2025</td>
              <td>Інтерстеллар</td>
              <td>14:00, 19:30</td>
              <td>Зал 1 (IMAX)</td>
              <td>IMAX</td>
            </tr>
            <tr className="border-b border-gray-800 hover:bg-white/5 transition">
              <td className="py-2">09.10.2025</td>
              <td>Початок</td>
              <td>16:15, 21:00</td>
              <td>Зал 2 (Комфорт)</td>
              <td>2D</td>
            </tr>
            <tr className="border-b border-gray-800 hover:bg-white/5 transition">
              <td className="py-2">10.10.2025</td>
              <td>Джокер</td>
              <td>18:00, 22:15</td>
              <td>Зал 3 (Преміум)</td>
              <td>Dolby Atmos</td>
            </tr>
            <tr className="border-b border-gray-800 hover:bg-white/5 transition">
              <td className="py-2">10.10.2025</td>
              <td>Титанік</td>
              <td>12:30, 17:45</td>
              <td>Зал 2 (Комфорт)</td>
              <td>3D</td>
            </tr>
            <tr className="border-b border-gray-800 hover:bg-white/5 transition">
              <td className="py-2">11.10.2025</td>
              <td>Месники: Війна нескінченності</td>
              <td>13:15, 18:30, 22:00</td>
              <td>Зал 1 (IMAX)</td>
              <td>IMAX 3D</td>
            </tr>
            <tr className="hover:bg-white/5 transition">
              <td className="py-2">11.10.2025</td>
              <td>Оппенгеймер</td>
              <td>15:00, 20:45</td>
              <td>Зал 3 (Преміум)</td>
              <td>4K Laser</td>
            </tr>
          </tbody>
        </table>
        <p className="mt-6 text-gray-400 text-sm">
          * Розклад може змінюватися. Актуальна інформація доступна на касі або в особистому кабінеті користувача.
        </p>
      </section>
      <section className="px-8 py-16">
        <h3 className="text-3xl font-bold mb-8 text-purple-400">Наші зали</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-xl">
            <h4 className="text-xl font-semibold text-purple-300 mb-2">Зал 1 (IMAX)</h4>
            <p className="text-gray-400">Найсучасніший зал з великим екраном і технологією IMAX для епічних переглядів.</p>
          </div>
          <div className="glass p-6 rounded-xl">
            <h4 className="text-xl font-semibold text-purple-300 mb-2">Зал 2 (Комфорт)</h4>
            <p className="text-gray-400">Зручні крісла та якісний звук для сімейного відпочинку.</p>
          </div>
          <div className="glass p-6 rounded-xl">
            <h4 className="text-xl font-semibold text-purple-300 mb-2">Зал 3 (Преміум)</h4>
            <p className="text-gray-400">Ексклюзивний зал з Dolby Atmos та 4K для преміального досвіду.</p>
          </div>
        </div>
      </section>
      <section className="px-8 py-16 glass rounded-2xl mx-6 my-6">
        <h3 className="text-3xl font-bold mb-8 text-purple-400">Додаткові послуги</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass p-6 rounded-xl">
            <h4 className="text-xl font-semibold text-purple-300 mb-2">VIP-місця</h4>
            <p className="text-gray-400">Забронюйте преміум-місця з додатковим комфортом та простором.</p>
          </div>
          <div className="glass p-6 rounded-xl">
            <h4 className="text-xl font-semibold text-purple-300 mb-2">Попкорн і напої</h4>
            <p className="text-gray-400">Замовте снеки онлайн і заберіть їх без черги перед сеансом.</p>
          </div>
          <div className="glass p-6 rounded-xl">
            <h4 className="text-xl font-semibold text-purple-300 mb-2">Приватні покази</h4>
            <p className="text-gray-400">Орендуйте зал для приватного перегляду з друзями чи родиною.</p>
          </div>
        </div>
      </section>
      <section className="px-8 py-16 text-center">
        <h3 className="text-3xl font-bold mb-8 text-purple-400">Забронюйте квитки</h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Не пропустіть улюблені фільми! Купуйте квитки онлайн і обирайте найкращі місця.
        </p>
        <div className="flex justify-center gap-4">
          <NavLink
            to="/schedule"
            className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition"
          >
            Купити квитки
          </NavLink>
          <NavLink
            to="/discounts"
            className="px-6 py-3 rounded-lg bg-transparent border border-purple-600 hover:bg-purple-600 text-white font-medium transition"
          >
            Дізнатися про знижки
          </NavLink>
        </div>
      </section>
    </div>
  );
}