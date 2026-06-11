"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, Factory, Tractor, Cpu, Package } from "lucide-react";
import Link from "next/link";

export default function Divisions() {
  const divisions = [
    {
      title: "Industrial Supply",
      slug: "industrial",
      description: "Built for the heavy lifters. Maintaining peak productivity on the factory floor.",
      categories: ["Heavy Machinery Parts", "Safety & PPE", "Power Tools", "Fasteners"],
      icon: <Factory className="w-16 h-16" />,
      color: "from-blue-500/10 to-transparent",
      accent: "text-blue-600",
      colSpan: "lg:col-span-8",
    },
    {
      title: "Agricultural Supply",
      slug: "agricultural",
      description: "Cultivating success for modern farming and daily operations.",
      categories: ["Irrigation", "Tractor Implements", "Harvesting Tools"],
      icon: <Tractor className="w-16 h-16" />,
      color: "from-green-500/10 to-transparent",
      accent: "text-green-600",
      colSpan: "lg:col-span-4",
    },
    {
      title: "Special & Technical",
      slug: "special-technical",
      description: "Precision meets performance. Niche and advanced tech.",
      categories: ["Precision Instruments", "Custom Fittings", "Advanced Electrical"],
      icon: <Cpu className="w-16 h-16" />,
      color: "from-purple-500/10 to-transparent",
      accent: "text-purple-600",
      colSpan: "lg:col-span-4",
    },
    {
      title: "General Supply",
      slug: "general",
      description: "The backbone of everyday operations keeping facilities stocked.",
      categories: ["Facility Maintenance", "Janitorial", "Material Handling"],
      icon: <Package className="w-16 h-16" />,
      color: "from-orange-500/10 to-transparent",
      accent: "text-brand-orange",
      colSpan: "lg:col-span-8",
    }
  ];

  return (
    <section id="divisions" className="py-32 bg-[#020617] relative z-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-3xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-brand-orange"></div>
              <span className="uppercase tracking-widest text-sm font-bold text-slate-400">Core Infrastructure</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-white tracking-tight">
              Specialized expertise across <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-brand-orange">multiple sectors.</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {divisions.map((div, index) => (
            <Link href={`/divisions/${div.slug}`} key={div.title} className="group block h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative bg-slate-900/40 backdrop-blur-xl border border-white/5 rounded-3xl p-10 h-full flex flex-col overflow-hidden transition-all duration-500 hover:border-brand-orange/30 hover:bg-slate-900/60"
              >
                {/* Glow effect behind the card */}
                <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>

                <div className="relative z-10 flex items-start justify-between mb-8">
                  <div className={`p-4 rounded-2xl bg-[#020617] border border-white/10 text-white group-hover:text-brand-orange group-hover:scale-110 transition-all duration-500 shadow-xl`}>
                    {div.icon}
                  </div>
                  <div className="text-slate-600 group-hover:text-white transition-colors duration-500">
                    <ArrowUpRight size={28} />
                  </div>
                </div>
                
                <h3 className="relative z-10 text-3xl font-bold text-white mb-4">{div.title}</h3>
                <p className="relative z-10 text-slate-400 text-lg mb-8 leading-relaxed flex-grow">
                  {div.description}
                </p>
                
                <div className="relative z-10 flex flex-wrap gap-2 mt-auto pt-6 border-t border-white/10">
                  {div.categories.slice(0, 3).map((cat) => (
                    <span 
                      key={cat} 
                      className="text-sm font-medium text-slate-300 bg-[#020617] border border-white/10 px-3 py-1.5 rounded-full"
                    >
                      {cat}
                    </span>
                  ))}
                  {div.categories.length > 3 && (
                    <span className="text-sm font-medium text-slate-500 px-3 py-1.5">
                      +{div.categories.length - 3} more
                    </span>
                  )}
                </div>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
