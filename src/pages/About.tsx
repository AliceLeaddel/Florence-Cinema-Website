import { useState } from "react";
import { NavLink } from "react-router-dom";

interface TeamMember {
  name: string;
  role: string;
  initials: string;
  color: string;
  media: string;
}

const team: TeamMember[] = [
  {
    name: "Лыч Максим",
    role: "Технічний лідер",
    initials: "МЛ",
    color: "bg-gradient-to-br from-purple-600 to-purple-800",
    media: "https://media.tenor.com/8_3AEhHD970AAAPo/black-souls-black-souls-2.mp4",
  },
  {
    name: "Ігнатенко Ганна",
    role: "Дизайнер UI/UX",
    initials: "ГІ",
    color: "bg-gradient-to-br from-pink-600 to-pink-800",
    media: "https://images-ext-1.discordapp.net/external/FfbUCRmbPJkYYEMr-9LEP5j0xKgpnYCySfwpJqpYkGc/https/media.tenor.com/-SwRBdLUIbQAAAPo/hu-tao-sphere.mp4",
  },
  {
    name: "Бреус Артем",
    role: "Бекенд-розробник",
    initials: "АБ",
    color: "bg-gradient-to-br from-blue-600 to-blue-800",
    media: "/assets/бреусус.mp4",
  },
  {
    name: "Кравченко Руслан",
    role: "Фронтенд-розробник",
    initials: "РК",
    color: "bg-gradient-to-br from-green-600 to-green-800",
    media: "/assets/укрслан.png",
  },
  {
    name: "Хавін Єгор",
    role: "Спонсор",
    initials: "ЄХ",
    color: "bg-gradient-to-br from-yellow-600 to-yellow-800",
    media: "https://images-ext-1.discordapp.net/external/BUb0Y7zVib0vFi83FYifNdCrdlF_zQHVlPXQNNbsj9o/https/media.tenor.com/8aKwcKMV5SUAAAPo/aww-so-cute-aww.mp4",
  },
];

const importAssets = import.meta.glob("../assets/**/*.{png,jpg,jpeg,gif,mp4,webm}", {
  eager: true,
  import: "default",
}) as Record<string, string>;

const resolveMedia = (path: string): string => {
  const normalized = path.replace(/^\/assets\//, "../assets/");
  return importAssets[normalized] || path;
};

export default function About() {
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedMember, setSelectedMember] = useState<TeamMember | null>(null);

  const openModal = (member: TeamMember) => {
    setSelectedMember(member);
    setModalOpen(true);
  };

  const getMediaType = (url: string) => {
    if (!url) return "image";
    const cleanUrl = url.split("?")[0];
    const ext = cleanUrl.split(".").pop()?.toLowerCase() || "";
    if (["mp4", "webm", "ogg"].includes(ext)) return "video";
    if (ext === "gif") return "gif";
    return "image";
  };

  return (
    <div className="min-h-screen flex flex-col">
      <section className="mt-24 px-8 py-16 text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-900/30 to-black/50 -z-10"></div>
        <h1 className="text-5xl md:text-6xl font-bold mb-6 text-purple-400 drop-shadow-lg">
          Кінотеатр «Флоренсія»
        </h1>
        <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
          Сучасний кінотеатр на Троєщині — комфорт, технології, емоції та найкращі фільми.
        </p>
        <p className="text-lg text-purple-300 font-medium">
          проспект Червоної Калини, 31, Київ, 02225 (ТРЦ «Флоренсія»)
        </p>
      </section>

      <section className="px-8 py-16 glass rounded-2xl mx-6 my-6">
        <h3 className="text-3xl font-bold mb-8 text-purple-400">Наша історія</h3>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Кінотеатр «Флоренсія» відкрито у 2020 році в одному з найсучасніших ТРЦ Троєщини — <strong>ТРЦ «Флоренсія»</strong>.
          Ми створили місце, де кожен може зануритися у світ кіно — від голлівудських блокбастерів до українських прем’єр.
        </p>
        <p className="text-gray-300 mb-6 leading-relaxed">
          Наші зали оснащені передовими технологіями: <strong>IMAX</strong>, <strong>Dolby Atmos</strong>, <strong>4K Laser</strong> та
          комфортними кріслами. Ми прагнемо, щоб кожен сеанс став святом — з якісним звуком, чітким зображенням та атмосферою затишку.
        </p>
        <p className="text-gray-300 leading-relaxed">
          «Флоренсія» — це не просто кінотеатр. Це місце, де створюються спогади.
        </p>
      </section>

      <section className="px-8 py-16">
        <h3 className="text-3xl font-bold mb-8 text-purple-400">Де ми знаходимось</h3>
        <div className="glass rounded-2xl overflow-hidden shadow-2xl">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2538.633566123456!2d30.622345315749!3d50.507891979482!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x40d4cf0f12345678%3A0xabcdef1234567890!2z0KLQtdGA0LHQuNGB0YLRgNCw0LbQtdGC!5e0!3m2!1suk!2sua!4v1712864536000!5m2!1suk!2sua"
            width="100%"
            height="450"
            style={{ border: 0 }}
            allowFullScreen={true}
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            title="Розташування кінотеатру Флоренсія"
            className="w-full"
          ></iframe>
        </div>
        <p className="text-sm text-gray-400 mt-4 text-center">
          ТРЦ «Флоренсія», 3-й поверх, проспект Червоної Калини, 31
        </p>
      </section>

      <section className="px-8 py-16">
        <h3 className="text-3xl font-bold mb-8 text-purple-400">Наші зали</h3>
        <div className="grid md:grid-cols-3 gap-6">
          <div className="glass p-6 rounded-xl hover:scale-105 transition-transform duration-300">
            <h4 className="text-xl font-semibold text-purple-300 mb-2">Зал 1 (IMAX)</h4>
            <p className="text-gray-400">Екран 20 м, звук 12 000 Вт, 3D — для епічних блокбастерів.</p>
          </div>
          <div className="glass p-6 rounded-xl hover:scale-105 transition-transform duration-300">
            <h4 className="text-xl font-semibold text-purple-300 mb-2">Зал 2 (Комфорт)</h4>
            <p className="text-gray-400">М’які крісла, Dolby Digital, ідеально для сімейного перегляду.</p>
          </div>
          <div className="glass p-6 rounded-xl hover:scale-105 transition-transform duration-300">
            <h4 className="text-xl font-semibold text-purple-300 mb-2">Зал 3 (Преміум)</h4>
            <p className="text-gray-400">Dolby Atmos, 4K Laser, VIP-крісла з підігрівом.</p>
          </div>
        </div>
      </section>

      <section className="px-8 py-16 glass rounded-2xl mx-6 my-6">
        <h3 className="text-3xl font-bold mb-8 text-purple-400">Команда розробників сайту</h3>
        <p className="text-gray-300 mb-10 text-center">
          Сайт створено студентами з любов’ю до кіно та технологій.
        </p>

        <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto mb-12">
          <div className="md:col-span-2">
            <button
              onClick={() => openModal(team[0])}
              className="glass p-10 rounded-2xl text-center hover:scale-105 transition-all duration-300 cursor-pointer group w-full"
            >
              <div className={`w-36 h-36 ${team[0].color} rounded-full mx-auto mb-6 flex items-center justify-center text-5xl font-bold text-white shadow-2xl group-hover:shadow-purple-500/50 transition-shadow`}>
                {team[0].initials}
              </div>
              <h4 className="text-3xl font-bold text-purple-300">{team[0].name}</h4>
              <p className="text-xl text-gray-400 mt-2">{team[0].role}</p>
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
          {team.slice(1).map((member, index) => (
            <button
              key={index}
              onClick={() => openModal(member)}
              className="glass p-6 rounded-xl text-center hover:scale-105 transition-transform duration-300 cursor-pointer group"
            >
              <div className={`w-24 h-24 ${member.color} rounded-full mx-auto mb-4 flex items-center justify-center text-3xl font-bold text-white shadow-lg group-hover:shadow-xl transition-shadow`}>
                {member.initials}
              </div>
              <h4 className="text-xl font-semibold text-purple-300">{member.name}</h4>
              <p className="text-gray-400 text-sm">{member.role}</p>
            </button>
          ))}
        </div>
      </section>

      <section className="px-8 py-16 text-center">
        <h3 className="text-3xl font-bold mb-8 text-purple-400">Чекаємо на вас у «Флоренсії»!</h3>
        <p className="text-gray-300 mb-6 max-w-2xl mx-auto">
          Переглядайте розклад, обирайте місця та насолоджуйтесь кіно на великому екрані.
        </p>
        <div className="flex justify-center gap-4 flex-wrap">
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
      </section>

      {modalOpen && selectedMember && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 flex items-center justify-center z-50 p-4 overflow-y-auto"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="glass rounded-2xl max-w-4xl w-full p-6 relative my-8"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              onClick={() => setModalOpen(false)}
              className="absolute top-4 right-4 text-gray-400 hover:text-white text-3xl font-bold z-10"
            >
              x
            </button>

            <div className="text-center">
              <h3 className="text-2xl font-bold text-purple-400 mb-2">{selectedMember.name}</h3>
              <p className="text-gray-300 mb-6">{selectedMember.role}</p>

              <div className="bg-gray-800 rounded-xl overflow-hidden mb-4">
                {getMediaType(selectedMember.media) === "video" && (
                  <div className="relative aspect-video max-h-[80vh]">
                    <video
                      src={resolveMedia(selectedMember.media)}
                      autoPlay
                      loop
                      muted
                      playsInline
                      className="w-full h-full object-contain"
                    />
                  </div>
                )}
                {(getMediaType(selectedMember.media) === "gif" || getMediaType(selectedMember.media) === "image") && (
                  <div className="flex justify-center items-center max-h-[80vh]">
                    <img
                      src={resolveMedia(selectedMember.media)}
                      alt={selectedMember.name}
                      className="max-w-full max-h-full object-contain"
                    />
                  </div>
                )}
              </div>

              <p className="text-sm text-gray-400">
                Натисни поза межами, щоб закрити
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}