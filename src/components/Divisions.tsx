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
    <section id="divisions" className="py-32 bg-white relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-brand-orange"></div>
              <span className="uppercase tracking-widest text-sm font-bold text-slate-400">Divisions</span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-slate tracking-tight">
              Specialized expertise across <span className="text-brand-orange">multiple sectors.</span>
            </h2>
          </motion.div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {divisions.map((div, index) => (
            <Link href={`/divisions/${div.slug}`} key={div.title} className="group block h-full">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                className="relative bg-white border border-slate-200 rounded-xl p-10 h-full flex flex-col hover:border-brand-orange hover:shadow-[0_8px_30px_rgb(0,0,0,0.04)] transition-all duration-300"
              >
                <div className="flex items-start justify-between mb-8">
                  <div className={`p-4 rounded-lg bg-slate-50 ${div.accent} group-hover:scale-110 transition-transform duration-300`}>
                    {div.icon}
                  </div>
                  <div className="text-slate-300 group-hover:text-brand-orange transition-colors duration-300">
                    <ArrowUpRight size={28} />
                  </div>
                </div>
                
                <h3 className="text-2xl font-bold text-brand-slate mb-4">{div.title}</h3>
                <p className="text-slate-600 text-base mb-8 leading-relaxed flex-grow">
                  {div.description}
                </p>
                
                <div className="flex flex-wrap gap-2 mt-auto pt-6 border-t border-slate-100">
                  {div.categories.slice(0, 3).map((cat) => (
                    <span 
                      key={cat} 
                      className="text-sm font-semibold text-slate-500 bg-slate-50 px-3 py-1 rounded-md"
                    >
                      {cat}
                    </span>
                  ))}
                  {div.categories.length > 3 && (
                    <span className="text-sm font-semibold text-slate-400 px-3 py-1">
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
