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
      transition: { staggerChildren: 0.15 }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30, filter: "blur(10px)" },
    visible: { opacity: 1, y: 0, filter: "blur(0px)", transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <div className="bg-transparent pb-32">
      {/* Magazine Overlay Hero */}
      <section className="relative w-full h-[85vh] min-h-[600px] flex items-center overflow-hidden">
        {/* Full Bleed Background Image */}
        <div className="absolute inset-0 z-0">
          <div 
            className="absolute inset-0 bg-cover bg-[70%_center] md:bg-center"
            style={{ backgroundImage: `url('${division.image}')` }}
          />
        </div>

        {/* Solid Opaque Block for Text (Left Half) */}
        <div className="relative z-10 w-full md:w-[65%] lg:w-[55%] h-full bg-brand-slate flex flex-col justify-center px-6 md:px-16 lg:px-24 shadow-[30px_0_60px_rgba(0,0,0,0.5)]">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] z-0"></div>
          
          <div className="relative z-10 max-w-xl">
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center justify-center p-4 rounded-xl bg-slate-800 border border-slate-700 mb-8"
            >
              <Icon className={`w-10 h-10 ${division.accent}`} />
            </motion.div>
            <motion.h1 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6"
            >
              {division.title}
            </motion.h1>
            <motion.p 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="text-xl md:text-2xl text-slate-300 font-medium leading-relaxed max-w-2xl"
            >
              {division.description}
            </motion.p>
          </div>
        </div>
      </section>

      {/* Symmetric Capabilities Grid */}
      <section className="py-20 bg-white border-y border-slate-200">
        <div className="container mx-auto px-6 md:px-12">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-brand-slate tracking-tight mb-4">Core Capabilities</h2>
            <p className="text-lg text-slate-500 font-medium">Explore our specialized procurement solutions.</p>
          </div>

          <motion.div 
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
          >
            {division.categories.map((category, index) => {
              const CatIcon = iconMap[category.iconName] || Component;
              
              return (
                <motion.div 
                  key={category.name} 
                  variants={itemVariants}
                  className="group bg-white p-10 rounded-2xl border border-slate-200 hover:border-brand-orange transition-all duration-300 shadow-sm hover:shadow-xl flex flex-col"
                >
                  <div className={`w-14 h-14 rounded-xl bg-slate-50 flex items-center justify-center mb-8 border border-slate-100 group-hover:scale-110 transition-transform duration-300`}>
                    <CatIcon className={`w-7 h-7 ${division.accent}`} />
                  </div>
                  <h3 className="text-2xl font-bold text-brand-slate mb-4">{category.name}</h3>
                  <p className="text-slate-600 leading-relaxed font-medium">
                    Premium grade {category.name.toLowerCase()} sourced from industry-leading manufacturers to ensure maximum reliability.
                  </p>
                </motion.div>
              );
            })}
          </motion.div>
        </div>
      </section>

      {/* Clean CTA section */}
      <section className="pt-32">
        <div className="container mx-auto px-6 md:px-12">
          <div className="bg-brand-slate rounded-3xl p-12 md:p-20 text-center shadow-xl">
            <div className="max-w-3xl mx-auto">
              <h3 className="text-4xl md:text-5xl font-extrabold text-white mb-6 tracking-tight">Need specialized equipment?</h3>
              <p className="text-xl text-slate-300 mb-10 font-medium">
                Our procurement experts are ready to source exactly what you need. Leverage our expansive network to streamline your supply chain today.
              </p>
              <Link 
                href="/contact" 
                className="inline-flex items-center gap-3 bg-brand-orange text-white px-10 py-5 rounded-lg font-bold text-lg hover:bg-orange-600 transition-colors"
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
