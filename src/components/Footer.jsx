import { motion } from "framer-motion";
import instagramIcon from "../assets/icons/instagram.svg";
import facebookIcon from "../assets/icons/facebook.svg";
import pinterestIcon from "../assets/icons/pinterest.svg";

const socialLinks = [
  {
    name: "Instagram",
    icon: instagramIcon,
    href: "#"
  },
  {
    name: "Facebook",
    icon: facebookIcon,
    href: "#"
  },
  {
    name: "Pinterest",
    icon: pinterestIcon,
    href: "#"
  }
];

export default function Footer() {
  return (
    <footer className="relative z-10 py-8 bg-gray-100 dark:bg-neutral-800 border-t border-gray-200 dark:border-neutral-700">
      <div className="max-w-4xl mx-auto px-8">
        <div className="flex flex-col items-center gap-6">
          {/* Brand Section */}
          <div className="text-center">
            <h3 className="mb-1 text-gray-900 dark:text-gray-100 flex flex-col items-start leading-tight" style={{ transform: 'translateX(2.5rem)' }}>
              <span className="font-gilroy-extrabold uppercase text-xl">FEELWELL</span>
              <span className="font-gilroy-regular lowercase text-lg -mt-0.5">Furniture</span>
            </h3>
            <p className="text-sm font-gilroy-regular text-gray-600 dark:text-gray-300">
              Where Comfort Meets Style
            </p>
          </div>

          {/* Social Media Links */}
          <div className="flex gap-4">
            {socialLinks.map((link) => (
              <motion.a
                key={link.name}
                href={link.href}
                className="flex items-center gap-2 text-sm font-gilroy-regular text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
              >
                <img
                  src={link.icon}
                  alt={link.name}
                  className="w-5 h-5 dark:invert dark:opacity-80"
                />
                <span>{link.name}</span>
              </motion.a>
            ))}
          </div>

          {/* Contact Information */}
          <div className="text-center">
            <a
              href="tel:+18589770784"
              className="text-sm font-gilroy-regular text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors block"
            >
              +1 (858) 977-0784
            </a>
            <a
              href="mailto:contact@feelwellfurniture.com"
              className="text-sm font-gilroy-regular text-gray-600 dark:text-gray-300 hover:text-gray-900 dark:hover:text-gray-100 transition-colors block"
            >
              contact@feelwellfurniture.com
            </a>
            <p className="text-sm font-gilroy-regular text-gray-600 dark:text-gray-300 mt-1">
              La Jolla, CA
            </p>
          </div>

          {/* Copyright */}
          <div className="pt-4 border-t border-gray-200 dark:border-neutral-700">
            <p className="text-xs font-gilroy-regular text-gray-500 dark:text-gray-400 flex items-center justify-center flex-wrap gap-1">
              © 2025 <span className="font-gilroy-extrabold uppercase">FEELWELL</span><span className="font-gilroy-regular lowercase">Furniture</span>. All rights reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
  