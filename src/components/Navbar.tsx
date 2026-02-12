import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const navLinks = [
  { name: "Home", path: "/" },
  { name: "Destinations", path: "/destinations" },
  { name: "Packages", path: "/packages" },
  { name: "Gallery", path: "/gallery" },
  { name: "About", path: "/about" },
  { name: "FAQ", path: "/faq" },
  { name: "Contact", path: "/contact" },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();
  const isHome = location.pathname === "/";

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  const navBg = scrolled || !isHome ? "bg-primary/95 backdrop-blur-md shadow-lg" : "bg-transparent";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="safari-container flex items-center justify-between h-16 md:h-20 px-4 md:px-8 max-w-7xl mx-auto">
        <Link to="/" className="font-heading text-xl md:text-2xl font-bold text-primary-foreground tracking-wide">
          Kenya Explorer
        </Link>

        <div className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className={`text-sm font-medium tracking-wide transition-colors duration-200 ${
                location.pathname === link.path ? "text-accent" : "text-primary-foreground/80 hover:text-accent"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <a
            href="https://wa.me/254700000000?text=Hello%2C%20I%27d%20like%20to%20plan%20a%20trip%20to%20Kenya"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-secondary text-secondary-foreground px-5 py-2 rounded-md text-sm font-semibold hover:opacity-90 transition-opacity"
          >
            Plan My Trip
          </a>
        </div>

        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-primary-foreground" aria-label="Toggle menu">
          {isOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="md:hidden bg-primary/95 backdrop-blur-md overflow-hidden"
          >
            <div className="safari-container py-4 flex flex-col gap-3 px-4 md:px-8 max-w-7xl mx-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  className={`text-sm font-medium py-2 transition-colors ${
                    location.pathname === link.path ? "text-accent" : "text-primary-foreground/80 hover:text-accent"
                  }`}
                >
                  {link.name}
                </Link>
              ))}
              <a
                href="https://wa.me/254700000000?text=Hello%2C%20I%27d%20like%20to%20plan%20a%20trip%20to%20Kenya"
                target="_blank"
                rel="noopener noreferrer"
                className="bg-secondary text-secondary-foreground px-5 py-2 rounded-md text-sm font-semibold text-center mt-2"
              >
                Plan My Trip
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

