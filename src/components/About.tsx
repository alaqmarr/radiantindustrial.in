"use client";

import { motion, Variants } from "framer-motion";
import { ShieldCheck, Zap, Globe, Route } from "lucide-react";

export default function About() {
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, ease: "easeOut" }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } }
  };

  return (
    <section id="about" className="py-20 relative z-20">
      <div className="container mx-auto px-4 md:px-8">
        {/* Intro / Hook */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="max-w-4xl mb-32"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[2px] bg-brand-orange"></div>
            <span className="uppercase tracking-widest text-sm font-bold text-slate-500">Who We Are</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-7xl font-extrabold text-white leading-tight tracking-tighter mb-8">
            Illuminating the Path to <br className="hidden md:block" /> 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-brand-orange">Efficiency.</span>
          </h2>
          <p className="text-lg md:text-2xl text-slate-400 font-normal leading-relaxed">
            Whether you are managing heavy industrial machinery, scaling agricultural production, or seeking highly specialized equipment, the supply chain should be the least of your worries.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-6 items-start mb-32">
          {/* Our Story */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="lg:col-span-7 bg-slate-900/40 backdrop-blur-xl border border-white/5 p-10 md:p-16 rounded-[3rem]"
          >
            <Route className="w-12 h-12 text-brand-orange mb-8 stroke-[1.5]" />
            <h3 className="text-3xl font-extrabold text-white mb-6 tracking-tight">Our Story</h3>
            <p className="text-lg text-slate-400 leading-relaxed font-normal">
              Headquartered in Secunderabad, Radiant Industrial Co. was built on a singular vision: to be the most dynamic and dependable supply line for the industries that build and feed our world. We understand that modern businesses require more than just a vendor; they need a strategic partner who understands the nuances of diverse sectors—from the precision of specialized tech to the rugged demands of agriculture.
            </p>
          </motion.div>

          {/* Our Mission */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="lg:col-span-5 bg-gradient-to-br from-slate-800 to-[#020617] border border-white/10 text-white p-10 md:p-16 rounded-[3rem] flex flex-col justify-center h-full relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/30 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
            
            <Globe className="w-12 h-12 text-brand-orange mb-8 stroke-[1.5] relative z-10" />
            <h3 className="text-3xl font-extrabold mb-6 relative z-10 tracking-tight">Our Mission</h3>
            <p className="text-lg text-slate-300 leading-relaxed relative z-10 font-normal">
              To empower businesses by delivering high-quality equipment and supplies with speed, accuracy, and unwavering support. We strive to be the standard of excellence in comprehensive supply management.
            </p>
          </motion.div>
        </div>

        {/* Why Choose Radiant */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <div className="mb-12">
            <h3 className="text-3xl md:text-4xl font-extrabold text-white tracking-tight">Why Choose Radiant?</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div variants={itemVariants} className="group p-10 rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl border border-white/5 hover:border-brand-orange/30 transition-all duration-500 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <Globe className="relative z-10 w-10 h-10 text-brand-orange mb-6 stroke-[1.5] group-hover:scale-110 transition-transform duration-500" />
              <h4 className="relative z-10 text-xl font-bold text-white mb-4">Broad Spectrum Sourcing</h4>
              <p className="relative z-10 text-slate-400 leading-relaxed">
                A single, trusted point of contact for diverse procurement needs across all your operational sectors.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="group p-10 rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl border border-white/5 hover:border-brand-orange/30 transition-all duration-500 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <ShieldCheck className="relative z-10 w-10 h-10 text-brand-orange mb-6 stroke-[1.5] group-hover:scale-110 transition-transform duration-500" />
              <h4 className="relative z-10 text-xl font-bold text-white mb-4">Uncompromising Quality</h4>
              <p className="relative z-10 text-slate-400 leading-relaxed">
                We partner with industry-leading brands to ensure every item meets rigorous operational standards.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="group p-10 rounded-[2.5rem] bg-slate-900/40 backdrop-blur-xl border border-white/5 hover:border-brand-orange/30 transition-all duration-500 overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <Zap className="relative z-10 w-10 h-10 text-brand-orange mb-6 stroke-[1.5] group-hover:scale-110 transition-transform duration-500" />
              <h4 className="relative z-10 text-xl font-bold text-white mb-4">Agile Fulfillment</h4>
              <p className="relative z-10 text-slate-400 leading-relaxed">
                Streamlined logistics designed to minimize your downtime and keep your projects on schedule.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
