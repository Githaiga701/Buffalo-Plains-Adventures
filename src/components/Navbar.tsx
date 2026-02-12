import React, { useEffect, useState, useRef } from "react";
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
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    setIsOpen(false);
  }, [location]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setIsOpen(false);
      if (e.key === "Tab" && isOpen) {
        const container = menuRef.current;
        if (!container) return;
        const focusable = Array.from(
          container.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((el) => !el.hasAttribute("disabled"));
        if (focusable.length === 0) return;
        const first = focusable[0];
        const last = focusable[focusable.length - 1];

        if (e.shiftKey) {
          if (document.activeElement === first) {
            e.preventDefault();
            last.focus();
          }
        } else {
          if (document.activeElement === last) {
            e.preventDefault();
            first.focus();
          }
        }
      }
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [isOpen]);

  const [announce, setAnnounce] = useState("");

  useEffect(() => {
    document.body.style.overflow = isOpen ? "hidden" : "";
    if (isOpen) {
      const container = menuRef.current;
      if (container) {
        const focusable = Array.from(
          container.querySelectorAll<HTMLElement>(
            'a[href], button:not([disabled]), textarea, input, select, [tabindex]:not([tabindex="-1"])',
          ),
        ).filter((el) => !el.hasAttribute("disabled"));
        if (focusable.length) focusable[0].focus();
      }
      setAnnounce("Mobile menu opened");
    } else {
      const btn = menuButtonRef.current;
      if (btn) btn.focus();
      setAnnounce("Mobile menu closed");
    }
    const t = setTimeout(() => setAnnounce(""), 700);
    return () => {
      clearTimeout(t);
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  const navBg = scrolled || !isHome ? "bg-primary/95 backdrop-blur-md shadow-lg" : "bg-transparent";

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${navBg}`}>
      <div className="sr-only" aria-live="polite">{announce}</div>
      <div className="safari-container flex items-center justify-between h-16 md:h-20 px-4 md:px-8 max-w-7xl mx-auto">
        <Link to="/" className="flex items-center gap-3 font-heading text-xl md:text-2xl font-bold text-primary-foreground tracking-wide">
          <img src="/assets/logo.svg" alt="Kenya Explorer logo" className="w-10 h-10 object-cover rounded" />
          <span>Kenya Explorer</span>
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

        <button
          ref={menuButtonRef}
          onClick={() => setIsOpen(!isOpen)}
          className="md:hidden text-primary-foreground p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
          aria-label="Toggle menu"
          aria-expanded={isOpen}
        >
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
            <div ref={menuRef} className="safari-container py-4 flex flex-col gap-3 px-4 md:px-8 max-w-7xl mx-auto">
              {navLinks.map((link) => (
                <Link
                  key={link.path}
                  to={link.path}
                  onClick={() => setIsOpen(false)}
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

