import { useState } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  NavLink,
  useLocation,
} from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Home from "./pages/Home.tsx";
import Films from "./pages/Films.tsx";
import Schedule from "./pages/Schedule.tsx";
import Discounts from "./pages/Discounts.tsx";
import Certificates from "./pages/Certificates.tsx";
import About from "./pages/About.tsx";
import Profile from "./pages/Profile.tsx";
import AuthModal from "./components/AuthModal.tsx";
import "./styles.css";

function AnimatedRoutes() {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <Routes location={location} key={location.pathname}>
        <Route
          path="/"
          element={
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Home />
            </motion.div>
          }
        />
        <Route
          path="/films"
          element={
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Films />
            </motion.div>
          }
        />
        <Route
          path="/schedule"
          element={
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Schedule />
            </motion.div>
          }
        />
        <Route
          path="/discounts"
          element={
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Discounts />
            </motion.div>
          }
        />
        <Route
          path="/certificates"
          element={
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Certificates />
            </motion.div>
          }
        />
        <Route
          path="/about"
          element={
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <About />
            </motion.div>
          }
        />
        <Route
          path="/profile"
          element={
            <motion.div
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.5 }}
            >
              <Profile />
            </motion.div>
          }
        />
      </Routes>
    </AnimatePresence>
  );
}

export default function App() {
  const [isAuthModalOpen, setIsAuthModalOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem("username"));

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <header className="glass fixed top-0 left-0 w-full z-50 py-4 px-6 md:px-10 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <svg
              width="44"
              height="44"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="text-purple-400 drop-shadow-[0_0_12px_rgba(147,51,234,0.8)]"
            >
              <rect x="3" y="4" width="18" height="16" rx="2" />
              <path d="M3 12h18" />
              <path d="m7 8 4 4 4-4" />
              <circle cx="9" cy="16" r="1" fill="currentColor" />
              <circle cx="15" cy="16" r="1" fill="currentColor" />
            </svg>

            <h1 className="text-2xl md:text-3xl font-bold text-purple-400 tracking-wider drop-shadow-lg">
              Florence
            </h1>
          </div>
          <div className="flex items-center gap-6">
            <nav className="hidden md:flex space-x-8 text-gray-300 text-lg font-medium">
              <NavLink
                to="/"
                className={({ isActive }) =>
                  `hover:text-purple-400 transition ${isActive ? "text-purple-400 font-bold" : ""
                  }`
                }
              >
                Головна
              </NavLink>
              <NavLink
                to="/films"
                className={({ isActive }) =>
                  `hover:text-purple-400 transition ${isActive ? "text-purple-400 font-bold" : ""
                  }`
                }
              >
                Фільми
              </NavLink>
              <NavLink
                to="/schedule"
                className={({ isActive }) =>
                  `hover:text-purple-400 transition ${isActive ? "text-purple-400 font-bold" : ""
                  }`
                }
              >
                Розклад
              </NavLink>
              <NavLink
                to="/discounts"
                className={({ isActive }) =>
                  `hover:text-purple-400 transition ${isActive ? "text-purple-400 font-bold" : ""
                  }`
                }
              >
                Знижки
              </NavLink>
              <NavLink
                to="/certificates"
                className={({ isActive }) =>
                  `hover:text-purple-400 transition ${isActive ? "text-purple-400 font-bold" : ""
                  }`
                }
              >
                Сертифікати
              </NavLink>
              <NavLink
                to="/about"
                className={({ isActive }) =>
                  `hover:text-purple-400 transition ${isActive ? "text-purple-400 font-bold" : ""
                  }`
                }
              >
                Про нас
              </NavLink>
            </nav>
            {isLoggedIn ? (
              <NavLink
                to="/profile"
                className="btn-glow text-white font-semibold px-6 py-3 rounded-lg transition hover:scale-105"
              >
                Профіль
              </NavLink>
            ) : (
              <button
                className="btn-glow text-white font-semibold px-6 py-3 rounded-lg transition hover:scale-105"
                onClick={() => setIsAuthModalOpen(true)}
              >
                Увійти
              </button>
            )}
          </div>
        </header>
        <AuthModal
          isOpen={isAuthModalOpen}
          onClose={() => setIsAuthModalOpen(false)}
          onLogin={() => setIsLoggedIn(true)}
        />
        <main className="flex-grow pt-24">
          <AnimatedRoutes />
        </main>
        <footer className="glass text-center py-8 mt-auto text-gray-400 text-sm backdrop-blur-md">
          <p>© 2025 Florence Cinema • Всі права захищено</p>
        </footer>
      </div>
    </Router>
  );
}