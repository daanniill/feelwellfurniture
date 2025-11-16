import { BrowserRouter as Router, Routes, Route, useLocation } from "react-router-dom";
import { AnimatePresence, motion } from "framer-motion";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

import Home from "./pages/Home";
import Collection from "./pages/Collection";
import Product from "./pages/Product";
import Contact from "./pages/Contact";
import Reviews from "./pages/Reviews";
import { useEffect, useState } from "react";

function AnimatedRoutes({ theme }) {
  const location = useLocation();

  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [location.pathname]);

  // Page transition animation variants
  const pageVariants = {
    initial: { opacity: 0, y: 30 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  };

  return (
    <AnimatePresence mode="wait">
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="animate"
        exit="exit"
        transition={{ duration: 0.4, ease: "easeInOut" }}
        className="flex-grow pt-[72px]"
      >
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home theme={theme} />} />
          <Route path="/collection" element={<Collection theme={theme} />} />
          <Route path="/product/:id" element={<Product theme={theme} />} />
          <Route path="/reviews" element={<Reviews theme={theme} />} />
          <Route path="/contact" element={<Contact theme={theme} />} />
        </Routes>
      </motion.div>
    </AnimatePresence>
  );
}

function App() {
  // Light/Dark mode
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Force scroll to top on mount
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", theme === "dark");
    localStorage.setItem("theme", theme);
  }, [theme]);

  return (
    <Router>
      <div className={`min-h-screen flex flex-col transition-colors duration-300 ${theme === "dark" ? "bg-neutral-900 text-gray-100" : "bg-white text-gray-800"}`}>
        <Navbar theme={theme} setTheme={setTheme} />
        <AnimatedRoutes theme={theme} />
        <Footer />
      </div>
    </Router>
  );
}

export default App;
