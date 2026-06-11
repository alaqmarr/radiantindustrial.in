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
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out border-b bg-white/95 backdrop-blur-md border-slate-200 ${isScrolled
          ? "py-3 shadow-sm"
          : "py-5"
          }`}
      >
        <div className="container mx-auto px-6 md:px-12 flex items-center justify-between">
          <Link href="/" className="relative z-10 block transition-transform hover:opacity-80">
            <div className="relative w-56 h-14 md:w-64 md:h-16 mix-blend-multiply">
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
          <nav className="hidden md:flex items-center gap-10">
            <Link
              href="/about"
              className={`text-[15px] font-semibold tracking-wide transition-colors hover:text-brand-orange ${isScrolled ? "text-slate-800" : "text-slate-800"}`}
            >
              About
            </Link>
            
            <div className="relative group">
              <button className={`flex items-center gap-1 text-[15px] font-semibold tracking-wide transition-colors hover:text-brand-orange py-2 ${isScrolled ? "text-slate-800" : "text-slate-800"}`}>
                Divisions
                <svg className="w-4 h-4 transition-transform group-hover:rotate-180" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>
              <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-64 bg-white rounded-2xl shadow-xl shadow-slate-200/50 border border-slate-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 transform origin-top translate-y-2 group-hover:translate-y-0 overflow-hidden">
                <div className="p-3 flex flex-col">
                  {divisions.map((div) => (
                    <Link
                      key={div.name}
                      href={div.href}
                      className="px-4 py-3 text-sm font-semibold text-slate-600 hover:text-brand-orange hover:bg-orange-50 rounded-xl transition-colors"
                    >
                      {div.name}
                    </Link>
                  ))}
                </div>
              </div>
            </div>

            <Link
              href="/contact"
              className={`text-[15px] font-semibold tracking-wide transition-colors hover:text-brand-orange ${isScrolled ? "text-slate-800" : "text-slate-800"}`}
            >
              Contact
            </Link>

            <Link
              href="/contact"
              className={`px-7 py-2.5 rounded-full text-[15px] font-bold tracking-wide transition-all bg-brand-slate text-white hover:bg-brand-orange hover:shadow-lg hover:shadow-brand-orange/20`}
            >
              Request Quote
            </Link>
          </nav>

          {/* Mobile Toggle */}
          <button
            className="md:hidden relative z-[60] p-2 rounded-full backdrop-blur-sm transition-colors"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          >
            {mobileMenuOpen ? (
              <X className="text-slate-900" size={28} />
            ) : (
              <Menu className="text-slate-900" size={28} />
            )}
          </button>
        </div>
      </header>

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
              className="fixed inset-0 bg-slate-900/40 backdrop-blur-sm z-40 md:hidden"
            />
            
            {/* Side Drawer */}
            <motion.div
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 25, stiffness: 200 }}
              className="fixed top-0 right-0 bottom-0 w-4/5 max-w-sm bg-white z-50 md:hidden flex flex-col shadow-2xl border-l border-slate-100 overflow-y-auto"
            >
              <div className="p-6 pt-24 flex flex-col gap-8 h-full">
                <Link href="/about" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-slate-900 hover:text-brand-orange transition-colors">
                  About
                </Link>
                
                <div className="flex flex-col gap-4 py-4 border-y border-slate-100">
                  <span className="text-sm font-bold text-brand-orange uppercase tracking-widest">Divisions</span>
                  {divisions.map((div) => (
                    <Link
                      key={div.name}
                      href={div.href}
                      onClick={() => setMobileMenuOpen(false)}
                      className="text-lg font-bold text-slate-700 hover:text-brand-orange pl-4 border-l-2 border-slate-200 hover:border-brand-orange transition-colors"
                    >
                      {div.name}
                    </Link>
                  ))}
                </div>

                <Link href="/contact" onClick={() => setMobileMenuOpen(false)} className="text-2xl font-bold text-slate-900 hover:text-brand-orange transition-colors">
                  Contact
                </Link>
                
                <div className="mt-auto pt-8">
                  <Link
                    href="/contact"
                    onClick={() => setMobileMenuOpen(false)}
                    className="w-full flex justify-center bg-brand-slate hover:bg-brand-orange text-white text-lg px-6 py-4 rounded-xl font-bold transition-all shadow-lg"
                  >
                    Request a Quote
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
