import { NavLink } from "react-router-dom";

export default function Discounts() {
  return (
    <div className="min-h-screen flex flex-col">
      <section className="mt-24 px-8 py-16 text-center">
        <h2 className="text-4xl font-bold mb-4 text-purple-400">Знижки та акції</h2>
        <p className="text-gray-300 max-w-2xl mx-auto mb-8">
          Отримуйте вигоду від наших спеціальних пропозицій! Ми пропонуємо знижки для студентів, групові акції та багато іншого.
        </p>
      </section>
      <section className="px-8 py-16">
        <h3 className="text-3xl font-bold mb-8 text-purple-400">Наші пропозиції</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-xl">
            <h4 className="text-xl font-semibold text-purple-300 mb-2">Студентська знижка -20%</h4>
            <p className="text-gray-400">
              Покажи студентський квиток на касі або при онлайн-покупці та отримай знижку 20% на будь-який сеанс!
            </p>
          </div>
          <div className="glass p-6 rounded-xl">
            <h4 className="text-xl font-semibold text-purple-300 mb-2">Щасливі години</h4>
            <p className="text-gray-400">
              З понеділка по четвер з 12:00 до 16:00 квитки коштують лише 100 грн. Ідеально для денного відпочинку!
            </p>
          </div>
          <div className="glass p-6 rounded-xl">
            <h4 className="text-xl font-semibold text-purple-300 mb-2">День народження</h4>
            <p className="text-gray-400">
              Іменинникам даруємо безкоштовний попкорн і напій! Покажи документ, що підтверджує дату народження.
            </p>
          </div>
          <div className="glass p-6 rounded-xl">
            <h4 className="text-xl font-semibold text-purple-300 mb-2">Сімейний пакет</h4>
            <p className="text-gray-400">
              При купівлі 4 квитків для сім’ї — знижка 15% на весь пакет. Чудова нагода для сімейного кінопохіду!
            </p>
          </div>
          <div className="glass p-6 rounded-xl">
            <h4 className="text-xl font-semibold text-purple-300 mb-2">Групова знижка</h4>
            <p className="text-gray-400">
              Для груп від 6 осіб — знижка 10% на квитки. Бронюйте заздалегідь для великих компаній!
            </p>
          </div>
          <div className="glass p-6 rounded-xl">
            <h4 className="text-xl font-semibold text-purple-300 mb-2">Вечірній марафон</h4>
            <p className="text-gray-400">
              Купуй квитки на два вечірні сеанси в один день і отримуй знижку 30% на другий квиток!
            </p>
          </div>
        </div>
      </section>
      <section className="px-8 py-16 glass rounded-2xl mx-6 my-6">
        <h3 className="text-3xl font-bold mb-8 text-purple-400">Як скористатися знижками</h3>
        <p className="text-gray-300 mb-6">
          Для отримання знижки пред’явіть необхідні документи (наприклад, студентський квиток) на касі або введіть
          промокод при онлайн-бронюванні. Деякі акції доступні лише за умови попереднього бронювання. Деталі уточнюйте
          у нашого персоналу або на сайті.
        </p>
        <p className="text-gray-300 mb-6">
          Знижки не сумуються з іншими пропозиціями, якщо не вказано інше. Слідкуйте за оновленнями на нашому сайті
          та в соціальних мережах, щоб не пропустити нові акції!
        </p>
      </section>
      <section className="px-8 py-16">
        <h3 className="text-3xl font-bold mb-8 text-purple-400">Спеціальні пропозиції</h3>
        <div className="grid md:grid-cols-2 gap-6">
          <div className="glass p-6 rounded-xl">
            <h4 className="text-xl font-semibold text-purple-300 mb-2">Кіномарафон</h4>
            <p className="text-gray-400">Організуйте кіномарафон із друзями та отримайте знижку 25% на груповий квиток!</p>
          </div>
          <div className="glass p-6 rounded-xl">
            <h4 className="text-xl font-semibold text-purple-300 mb-2">Прем’єрний бонус</h4>
            <p className="text-gray-400">Купуйте квитки на прем’єру та отримуйте знижку 10% на наступний сеанс!</p>
          </div>
        </div>
      </section>
      <section className="px-8 py-16 text-center">
        <h3 className="text-3xl font-bold mb-8 text-purple-400">Скористайтеся пропозиціями</h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Не пропустіть шанс заощадити! Ознайомтеся з розкладом і забронюйте квитки зі знижкою вже сьогодні.
        </p>
        <div className="flex justify-center gap-4">
          <NavLink
            to="/schedule"
            className="px-6 py-3 rounded-lg bg-purple-600 hover:bg-purple-700 text-white font-medium transition"
          >
            Забронювати квитки
          </NavLink>
          <NavLink
            to="/certificates"
            className="px-6 py-3 rounded-lg bg-transparent border border-purple-600 hover:bg-purple-600 text-white font-medium transition"
          >
            Купити сертифікат
          </NavLink>
        </div>
      </section>
    </div>
  );
}