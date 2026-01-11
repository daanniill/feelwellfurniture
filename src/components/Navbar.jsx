import { useState, useEffect } from "react";
import { Link, NavLink } from "react-router-dom";
import { Sun, Moon, Menu, X } from "lucide-react"; // lightweight icon lib

export default function Navbar({ theme, setTheme }) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isMobileView, setIsMobileView] = useState(() =>
    typeof window !== "undefined" ? window.innerWidth < 768 : false
  );

  useEffect(() => {
    const handleResize = () => {
      const mobile = window.innerWidth < 768;
      setIsMobileView(mobile);
      if (!mobile) setIsMenuOpen(false);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => setIsMenuOpen((prev) => !prev);
  const closeMenu = () => setIsMenuOpen(false);

  const navLinkClass = ({ isActive }) =>
    `px-4 py-2 text-sm font-gilroy-medium transition-all block ${
      isActive
        ? "text-black dark:text-white border-b-2 border-black dark:border-white"
        : "text-gray-500 dark:text-gray-300 hover:text-black dark:hover:text-white"
    }`;

  const navItems = [
    { to: "/", label: "Home" },
    { to: "/collection", label: "Collection" },
    { to: "/reviews", label: "Reviews" },
    { to: "/contact", label: "Contact" },
  ];

  return (
    <nav
      className={`fixed top-0 left-0 right-0 flex justify-between items-center px-6 sm:px-8 bg-white/90 dark:bg-neutral-900/90 backdrop-blur-sm shadow-sm z-50 transition-all duration-300 ${
        isMobileView ? "py-3" : "py-4"
      }`}
    >
      <Link
        to="/"
        className="text-black dark:text-white flex flex-col items-start leading-tight"
      >
        <span className="font-gilroy-extrabold uppercase text-2xl">FEELWELL</span>
        <span className="font-gilroy-regular lowercase text-xl -mt-1">Furniture</span>
      </Link>
      <div className="hidden md:flex gap-6 items-center transition-all duration-300">
        {navItems.map(({ to, label }) => (
          <NavLink key={label} to={to} className={navLinkClass}>
            {label}
          </NavLink>
        ))}
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
      </div>

      <div
        className={`flex md:hidden items-center gap-2 transition-all duration-300 ease-out ${
          isMobileView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <button
          onClick={() => setTheme(theme === "light" ? "dark" : "light")}
          className="p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all"
          aria-label="Toggle theme"
        >
          {theme === "light" ? <Moon size={18} /> : <Sun size={18} />}
        </button>
        <button
          onClick={toggleMenu}
          className={`p-2 rounded-full hover:bg-gray-200 dark:hover:bg-neutral-700 transition-all ${
            isMenuOpen ? "rotate-90" : "rotate-0"
          }`}
          aria-label="Toggle navigation menu"
        >
          {isMenuOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      <div
        className={`md:hidden absolute top-full left-0 right-0 mt-2 bg-white dark:bg-neutral-900 shadow-lg rounded-lg py-4 px-6 space-y-2 transform origin-top transition-all duration-300 ${
          isMenuOpen
            ? "opacity-100 translate-y-0 scale-100 pointer-events-auto"
            : "opacity-0 -translate-y-2 scale-95 pointer-events-none"
        }`}
        aria-hidden={!isMenuOpen}
      >
        {navItems.map(({ to, label }) => (
          <NavLink
            key={label}
            to={to}
            className={navLinkClass}
            onClick={closeMenu}
          >
            {label}
          </NavLink>
        ))}
      </div>
    </nav>
  );
}
