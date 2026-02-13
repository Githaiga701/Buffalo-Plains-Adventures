"use client";

import React, { useEffect, useRef, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { motion, AnimatePresence } from "framer-motion";
import useOnClickOutside from "@/hooks/useOnClickOutside";

type NavItem = { label: string; href: string };

const NAV_ITEMS: NavItem[] = [
  { label: "Home", href: "/" },
  { label: "Packages", href: "/packages" },
  { label: "Destinations", href: "/destinations" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const menuRef = useRef<HTMLDivElement | null>(null);
  const menuButtonRef = useRef<HTMLButtonElement | null>(null);

  useOnClickOutside(menuRef, () => setOpen(false));

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
      if (e.key === "Tab" && open) {
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
  }, [open]);

  const [announce, setAnnounce] = useState("");

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    if (open) {
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
  }, [open]);

  return (
    <header
      className={`fixed top-0 inset-x-0 z-50 transition-all duration-300 ${
        scrolled ? "backdrop-blur bg-white/60 shadow-sm" : "bg-transparent"
      }`}
    >
      <div className="sr-only" aria-live="polite">{announce}</div>
      <div className="max-w-7xl mx-auto px-4 md:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-4">
            <Link href="/" className="flex items-center gap-3">
              <img src="/assets/logo.svg" alt="Buffalo Plains Adventures logo" className="w-10 h-10 object-cover rounded" />
              <span className="font-heading text-lg md:text-xl">Buffalo Plains Adventures</span>
            </Link>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            {NAV_ITEMS.map((item) => (
              <Link key={item.href} href={item.href} className="text-sm md:text-base hover:underline">
                {item.label}
              </Link>
            ))}
            <Link
              href="/contact"
              className="ml-4 inline-flex items-center px-4 md:px-6 h-11 rounded-md bg-secondary text-secondary-foreground font-semibold text-sm md:text-base"
            >
              Book Now
            </Link>
          </nav>

          <div className="md:hidden flex items-center">
            <button
              ref={menuButtonRef}
              aria-label={open ? "Close menu" : "Open menu"}
              aria-expanded={open}
              aria-controls="mobile-menu"
              onClick={() => setOpen((s) => !s)}
              className="p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
            >
              <motion.svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden={true}>
                <motion.rect
                  x="3"
                  y="6"
                  width="18"
                  height="2"
                  rx="1"
                  fill="currentColor"
                  animate={{ rotate: open ? 45 : 0, y: open ? 6 : 0 }}
                  transition={{ duration: 0.18 }}
                />
                <motion.rect
                  x="3"
                  y="11"
                  width="18"
                  height="2"
                  rx="1"
                  fill="currentColor"
                  animate={{ opacity: open ? 0 : 1 }}
                  transition={{ duration: 0.12 }}
                />
                <motion.rect
                  x="3"
                  y="16"
                  width="18"
                  height="2"
                  rx="1"
                  fill="currentColor"
                  animate={{ rotate: open ? -45 : 0, y: open ? -6 : 0 }}
                  transition={{ duration: 0.18 }}
                />
              </motion.svg>
            </button>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.aside
            id="mobile-menu"
            ref={menuRef}
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0, stiffness: 300 }}
            className="fixed top-0 right-0 bottom-0 w-full max-w-xs bg-white z-60 shadow-2xl md:hidden"
            role="dialog"
            aria-modal="true"
          >
            <div className="h-16 flex items-center justify-between px-4 md:px-6 border-b">
              <div className="flex items-center gap-3">
                <div className="relative w-8 h-8 flex-shrink-0">
                  <Image src="/assets/hero-masai-mara.jpg" alt="Logo" fill className="object-cover rounded" />
                </div>
                <span className="font-heading text-sm">Buffalo Plains Adventures</span>
              </div>
              <button
                aria-label="Close menu"
                onClick={() => setOpen(false)}
                className="p-2 rounded-md focus:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-primary-500"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden={true}>
                  <path d="M6 6l12 12M6 18L18 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                </svg>
              </button>
            </div>

            <div className="px-4 md:px-6 py-6 space-y-4">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  onClick={() => setOpen(false)}
                  className="block text-base font-medium py-3 px-2 rounded hover:bg-muted"
                >
                  {item.label}
                </Link>
              ))}

              <div className="pt-4">
                <Link
                  href="/contact"
                  onClick={() => setOpen(false)}
                  className="block w-full text-center h-11 rounded-md bg-secondary text-secondary-foreground font-semibold"
                >
                  Book Now
                </Link>
              </div>
            </div>
          </motion.aside>
        )}
      </AnimatePresence>
    </header>
  );
}
