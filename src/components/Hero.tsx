"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Image from "next/image";
import { ArrowRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full h-[85vh] min-h-[650px] flex items-center overflow-hidden">
      {/* Full Bleed Background Image */}
      <div className="absolute inset-0 z-0">
        <Image
          src="https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&q=80"
          alt="Industrial manufacturing facility"
          fill
          className="object-cover object-[70%_center] md:object-center"
          priority
        />
      </div>

      {/* Solid Opaque Block for Text (Left Half) */}
      <div className="relative z-10 w-full md:w-[65%] lg:w-[55%] h-full bg-brand-slate flex flex-col justify-center px-6 md:px-16 lg:px-24 shadow-[30px_0_60px_rgba(0,0,0,0.5)]">
        {/* Subtle texture in the block */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] z-0"></div>

        <div className="relative z-10 max-w-xl">
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-1 bg-brand-orange"></div>
              <span className="uppercase tracking-widest text-sm font-bold text-slate-400">Radiant Industrial Co.</span>
            </div>
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[80px] font-extrabold text-white tracking-tight leading-[1.05]">
              Powering <br />
              <span className="text-brand-orange">Progress.</span>
            </h1>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
          >
            <p className="mt-8 text-lg md:text-xl text-slate-300 font-medium leading-relaxed">
              From field to factory. Your premier procurement partner delivering reliable general, specialized, industrial, and agricultural supplies.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
            className="mt-12 flex flex-col sm:flex-row items-start sm:items-center gap-6"
          >
            <Link
              href="/contact"
              className="inline-flex items-center justify-center px-8 py-4 bg-brand-orange text-white text-base font-bold rounded-lg hover:bg-orange-600 transition-colors duration-300 w-full sm:w-auto"
            >
              Request a Quote
            </Link>
            <Link
              href="#divisions"
              className="group inline-flex items-center gap-2 px-6 py-4 text-slate-300 hover:text-white text-base font-semibold transition-colors duration-300 w-full sm:w-auto"
            >
              Explore Divisions
              <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300 text-brand-orange" />
            </Link>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
