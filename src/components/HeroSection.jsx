import { useState, useEffect, useRef } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { ChevronDown } from "lucide-react";

export default function HeroSection({ theme }) {
  const [showArrow, setShowArrow] = useState(true);
  const sectionRef = useRef(null);

  // Scroll to top when component mounts/fades in
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  // Check if HeroSection is visible and handle arrow visibility
  useEffect(() => {
    const handleScroll = () => {
      if (!sectionRef.current) return;

      const rect = sectionRef.current.getBoundingClientRect();
      const isVisible = rect.top >= 0 && rect.bottom <= window.innerHeight;
      const scrollPosition = window.scrollY;

      // Show arrow if HeroSection is fully visible or if scrolled back to top
      if (isVisible || scrollPosition < 100) {
        setShowArrow(true);
      } else {
        setShowArrow(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    // Also check on initial load
    handleScroll();

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <section
      ref={sectionRef}
      className={`relative min-h-screen -mt-[72px] pt-[72px] flex items-center justify-center overflow-hidden ${
        theme === "dark" 
          ? "bg-gradient-to-b from-neutral-700 to-neutral-800" 
          : "bg-gradient-to-b from-[#c3c2bf] to-white"
      }`}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        className="relative z-10 bg-transparent rounded-2xl p-10 text-center safari-motion-fix"
      >
        <h1 className="mb-2 text-gray-900 dark:text-gray-100 flex flex-col items-start leading-tight sm:translate-x-8">
          <span className="font-gilroy-extrabold uppercase text-4xl sm:text-5xl md:text-6xl">FEELWELL</span>
          <span className="font-gilroy-regular lowercase text-3xl sm:text-4xl md:text-5xl -mt-1 sm:-mt-2">Furniture</span>
        </h1>
        <p className="font-gilroy-regular text-gray-700 dark:text-gray-300 mb-6">Where Comfort Meets Style</p>
        <div className="flex flex-col sm:flex-row justify-center items-center gap-4 mt-8">
          <Link
            to="/collection"
            className="w-auto text-center bg-black dark:bg-white dark:text-black text-white px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-gray-800 dark:hover:bg-gray-200 transition-all font-gilroy-medium text-sm sm:text-base"
          >
            Explore Collection
          </Link>
          <Link
            to="/contact"
            className="w-auto text-center bg-transparent border-2 border-black dark:border-white dark:text-white text-black px-6 sm:px-8 py-2.5 sm:py-3 rounded-full hover:bg-black dark:hover:bg-white hover:text-white dark:hover:text-black transition-all font-gilroy-medium text-sm sm:text-base"
          >
            Get in Touch
          </Link>
        </div>
      </motion.div>

      {/* Scroll Indicator Arrow */}
      <motion.div
        className="absolute left-0 right-0 z-50 pointer-events-none flex justify-center safari-motion-fix"
        style={{ bottom: '8rem' }}
        initial={{ opacity: 0 }}
        animate={{ 
          opacity: showArrow ? 1 : 0,
          y: showArrow ? [0, 10, 0] : 0
        }}
        transition={{
          opacity: { duration: 0.3 },
          y: {
            duration: 1.5,
            repeat: showArrow ? Infinity : 0,
            ease: "easeInOut"
          }
        }}
      >
        <ChevronDown 
          size={32} 
          className="text-gray-600 dark:text-gray-300"
        />
      </motion.div>

    </section>
  );
}
