"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { ArrowRight, ChevronRight } from "lucide-react";

export default function Hero() {
  return (
    <section className="relative w-full min-h-[90vh] flex flex-col items-center justify-center overflow-hidden pt-20">
      {/* Ultra-smooth Glowing Mesh Background */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[1000px] h-[500px] pointer-events-none opacity-40">
        <div className="absolute top-[20%] left-[20%] w-[400px] h-[400px] bg-brand-orange/40 rounded-full mix-blend-screen blur-[120px] animate-pulse" style={{ animationDuration: '8s' }}></div>
        <div className="absolute bottom-[20%] right-[20%] w-[500px] h-[500px] bg-slate-500/30 rounded-full mix-blend-screen blur-[140px] animate-pulse" style={{ animationDuration: '12s', animationDelay: '2s' }}></div>
        <div className="absolute top-[40%] left-[50%] -translate-x-1/2 w-[600px] h-[300px] bg-brand-orange/20 rounded-full mix-blend-screen blur-[100px]"></div>
      </div>

      {/* Grid Pattern Overlay for Tech feel */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] z-0 pointer-events-none"></div>

      <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center text-center mt-10">

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-slate-900/50 border border-slate-800 backdrop-blur-md mb-8"
        >
          <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
          <span className="text-sm font-medium tracking-wide text-slate-300">The New Standard in Procurement</span>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
          className="text-5xl sm:text-7xl md:text-8xl lg:text-[100px] font-extrabold text-white tracking-tighter leading-[1.05] max-w-5xl"
        >
          Radiant Industrial <br className="hidden md:block" />
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-white via-slate-200 to-brand-orange drop-shadow-[0_0_40px_rgba(249,115,22,0.2)]">
            Co.
          </span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="mt-8 text-lg md:text-2xl text-slate-400 font-normal leading-relaxed max-w-3xl"
        >
          Accelerate your supply chain with India's premier procurement partner. Reliable general, specialized, industrial, and agricultural supplies.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3, ease: [0.16, 1, 0.3, 1] }}
          className="mt-12 flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto"
        >
          <Link
            href="/contact"
            className="group relative inline-flex items-center justify-center px-8 py-4 bg-white text-black font-semibold rounded-full overflow-hidden transition-all duration-300 hover:scale-105 w-full sm:w-auto"
          >
            <span className="relative z-10 flex items-center gap-2">
              Start Building <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <div className="absolute inset-0 bg-gradient-to-r from-slate-200 to-white opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
          <Link
            href="#divisions"
            className="group inline-flex items-center justify-center gap-2 px-8 py-4 text-slate-300 bg-slate-900/50 hover:bg-slate-800 border border-slate-800 font-medium rounded-full transition-all duration-300 hover:text-white w-full sm:w-auto backdrop-blur-sm"
          >
            View Infrastructure
            <ChevronRight size={18} className="text-brand-orange group-hover:translate-x-1 transition-transform" />
          </Link>
        </motion.div>
      </div>

      {/* Fade out to the next section */}
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-[#020617] to-transparent z-10 pointer-events-none"></div>
    </section>
  );
}
