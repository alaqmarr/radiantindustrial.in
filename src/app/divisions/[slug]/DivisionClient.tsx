"use client";

import { motion, Variants } from "framer-motion";
import Link from "next/link";
import { ArrowRight, Factory, Tractor, Cpu, Package, CheckCircle2, Hexagon, Component, Zap, Hammer } from "lucide-react";

const iconMap: Record<string, any> = {
  Factory,
  Tractor,
  Cpu,
  Package,
  CheckCircle2,
  Hexagon,
  Component,
  Zap,
  Hammer
};

type DivisionProps = {
  division: {
    title: string;
    description: string;
    image: string;
    categories: { name: string; iconName: string }[];
    iconName: string;
    color: string;
    accent: string;
    bgAccent: string;
    lightBg: string;
  };
};

export default function DivisionClient({ division }: DivisionProps) {
  const Icon = iconMap[division.iconName];

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.1 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: "easeOut" } }
  };

  return (
    <div className="bg-[#020617] pb-32 min-h-screen">
      {/* Mesh Glow Hero */}
      <section className="relative w-full min-h-[70vh] flex items-center justify-center overflow-hidden pt-32 pb-20">
        {/* Glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] pointer-events-none opacity-30">
          <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] rounded-full mix-blend-screen blur-[120px] ${division.color.split(' ')[0]}`}></div>
        </div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] z-0 pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 flex flex-col items-center text-center">
          <motion.div 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="mb-8 p-4 rounded-2xl bg-slate-900/50 border border-white/10 backdrop-blur-xl"
          >
            <Icon className={`w-12 h-12 ${division.accent}`} />
          </motion.div>
          
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tighter mb-6 max-w-5xl"
          >
            {division.title}
          </motion.h1>
          
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-lg md:text-2xl text-slate-400 font-normal leading-relaxed max-w-3xl"
          >
            {division.description}
          </motion.p>
        </div>
      </section>

      {/* Symmetric Capabilities Grid */}
      <section className="py-20 relative z-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-4">Core Capabilities</h2>
            <p className="text-lg text-slate-400 font-medium">Explore our specialized procurement solutions.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-7xl mx-auto"
          >
            {division.categories.map((category) => {
              const CatIcon = iconMap[category.iconName] || Component;
              
              return (
                <motion.div 
                  key={category.name} 
                  variants={itemVariants}
                  className="group relative bg-slate-900/40 backdrop-blur-xl p-8 rounded-3xl border border-white/5 hover:border-brand-orange/30 transition-all duration-500 overflow-hidden flex flex-col h-full"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                  <div className={`w-14 h-14 rounded-2xl bg-[#020617] border border-white/10 flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-500 relative z-10`}>
                    <CatIcon className={`w-6 h-6 ${division.accent}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-white mb-3 relative z-10">{category.name}</h3>
                  <p className="text-slate-400 leading-relaxed font-normal relative z-10">
                    Premium grade {category.name.toLowerCase()} sourced from industry-leading manufacturers to ensure maximum reliability.
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Clean CTA section */}
      <section className="pt-20 relative z-20">
        <div className="container mx-auto px-4 md:px-8">
          <div className="relative overflow-hidden bg-slate-900/60 backdrop-blur-2xl border border-white/10 rounded-[3rem] p-12 md:p-24 text-center">
            <div className="absolute inset-0 bg-gradient-to-t from-brand-orange/10 to-transparent pointer-events-none"></div>
            
            <div className="relative z-10 max-w-3xl mx-auto">
              <h3 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white mb-6 tracking-tighter">Ready to Scale?</h3>
              <p className="text-xl text-slate-400 mb-10 font-normal">
                Our procurement experts are ready to source exactly what you need. Leverage our expansive network to streamline your supply chain today.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center justify-center gap-3 bg-white text-[#020617] px-8 py-4 rounded-full font-bold text-lg hover:bg-brand-orange hover:text-white transition-all duration-300 hover:scale-105"
              >
                Request a Quote
                <ArrowRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
