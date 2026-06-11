"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { Menu, X } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "About", href: "/about" },
    { name: "Contact", href: "/contact" },
  ];

  const divisions = [
    { name: "Industrial Supply", href: "/divisions/industrial" },
    { name: "Agricultural Supply", href: "/divisions/agricultural" },
    { name: "Special & Technical", href: "/divisions/special-technical" },
    { name: "General Supply", href: "/divisions/general" },
  ];

  return (
    <>
      <div className="fixed top-6 left-1/2 -translate-x-1/2 z-50 w-[95%] max-w-6xl">
        <header
          className={`transition-all duration-500 ease-out rounded-full bg-white/80 backdrop-blur-2xl border border-white/40 shadow-[0_8px_30px_rgb(0,0,0,0.12)] px-6 md:px-8 flex items-center justify-between ${isScrolled ? "py-3 shadow-xl" : "py-4"
            }`}
        >
          <Link href="/" className="relative z-10 block transition-transform hover:scale-105">
            <div className="relative w-48 h-10 md:w-56 md:h-12 mix-blend-multiply">
              <Image
                src="/logos/logo-long.png"
                alt="Radiant Industrial Co. Logo"
                fill
                className="object-contain object-left"
                priority
              />
            </div>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              href="/"
              className="text-sm font-semibold tracking-wide text-slate-800 hover:text-brand-orange transition-colors"
            >
              Home
            </Link>
            <Link
              href="/about"
              className="text-sm font-semibold tracking-wide text-slate-800 hover:text-brand-orange transition-colors"
            >
              About
            </Link>

            <div className="relative group">
              <button className="flex items-center gap-1 text-sm font-semibold tracking-wide text-slate-800 hover:text-brand-orange transition-colors py-2">
                Infrastructure
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-[calc(100%+0.5rem)] left-1/2 -translate-x-1/2 w-56 bg-[#020617]/95 backdrop-blur-xl rounded-2xl shadow-2xl border border-slate-800 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0 overflow-hidden">
                <div className="p-2 flex flex-col">
                  {divisions.map((div) => (
                    <Link
                      key={div.name}
                      href={div.href}
                      className="px-4 py-3 text-sm font-medium text-slate-300 hover:text-white hover:bg-slate-800/50 rounded-xl transition-all"
                    >
                      {div.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className="text-sm font-semibold tracking-wide text-slate-800 hover:text-brand-orange transition-colors"
            >
              Contact
            </Link>

            <Link
              href="/contact"
              className="px-6 py-2.5 rounded-full text-sm font-bold tracking-wide transition-all bg-[#020617] text-white hover:bg-brand-orange hover:shadow-[0_0_20px_rgba(249,115,22,0.4)] hover:scale-105"
            >
              Get Started
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden relative z-[60] p-2 rounded-full transition-colors hover:bg-slate-100"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="text-slate-900" size={24} />
            ) : (
              <Menu className="text-slate-900" size={24} />
            )}
          </button>
        </header>
      </div>

      {/* Mobile Drawer Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            {/* Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setMobileMenuOpen(false)}
              className="fixed inset-0 bg-[#020617]/60 backdrop-blur-md z-40 md:hidden"
            />

            {/* Side Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-[85%] max-w-sm bg-[#020617] z-50 md:hidden flex flex-col shadow-2xl border-l border-slate-800 overflow-y-auto"
            >
              <div className="p-8 pt-32 flex flex-col gap-8 h-full">
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-white hover:text-brand-orange transition-colors">
                  About
                </Link>

                <div className="flex flex-col gap-4 py-6 border-y border-slate-800">
                  <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Infrastructure</span>
                  {divisions.map((div) => (
                    <Link
                      key={div.name}
                      href={div.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-medium text-slate-300 hover:text-white pl-4 border-l border-slate-800 hover:border-brand-orange transition-all"
                    >
                      {div.name}
                    </Link>
                  ))}
                </div>

                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-white hover:text-brand-orange transition-colors">
                  Contact
                </Link>

                <div className="mt-auto pt-8 pb-8">
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex justify-center bg-white hover:bg-brand-orange text-[#020617] hover:text-white text-lg px-6 py-4 rounded-full font-bold transition-all"
                  >
                    Get Started
                  </Link>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
