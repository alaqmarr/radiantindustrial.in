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
    <section id="about" className="py-32 bg-white relative">
      <div className="container mx-auto px-6 md:px-12">
        {/* Intro / Hook */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={itemVariants}
          className="max-w-5xl mb-32"
        >
          <div className="flex items-center gap-4 mb-8">
            <div className="w-12 h-[2px] bg-brand-orange"></div>
            <span className="uppercase tracking-widest text-sm font-bold text-slate-400">Who We Are</span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-brand-slate leading-tight tracking-tight mb-8">
            Illuminating the Path to <br className="hidden md:block" /> 
            <span className="text-brand-orange">Efficiency.</span>
          </h2>
          <p className="text-xl md:text-2xl text-slate-500 font-medium leading-relaxed max-w-3xl">
            Whether you are managing heavy industrial machinery, scaling agricultural production, or seeking highly specialized equipment, the supply chain should be the least of your worries.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-12 gap-12 lg:gap-8 items-start mb-32">
          {/* Our Story */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="lg:col-span-7 bg-brand-gray p-10 md:p-16 rounded-[2.5rem]"
          >
            <Route className="w-12 h-12 text-brand-orange mb-8 stroke-[1.5]" />
            <h3 className="text-3xl font-extrabold text-brand-slate mb-6">Our Story</h3>
            <p className="text-lg text-slate-600 leading-relaxed">
              Headquartered in Secunderabad, Radiant Industrial Co. was built on a singular vision: to be the most dynamic and dependable supply line for the industries that build and feed our world. We understand that modern businesses require more than just a vendor; they need a strategic partner who understands the nuances of diverse sectors—from the precision of specialized tech to the rugged demands of agriculture.
            </p>
          </motion.div>

          {/* Our Mission */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            variants={itemVariants}
            className="lg:col-span-5 bg-brand-slate text-white p-10 md:p-16 rounded-[2.5rem] flex flex-col justify-center h-full relative overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/20 blur-[80px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/3"></div>
            
            <Globe className="w-12 h-12 text-brand-orange mb-8 stroke-[1.5] relative z-10" />
            <h3 className="text-3xl font-extrabold mb-6 relative z-10">Our Mission</h3>
            <p className="text-lg text-slate-300 leading-relaxed relative z-10">
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
          <div className="mb-16">
            <h3 className="text-3xl font-extrabold text-brand-slate">Why Choose Radiant?</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <motion.div variants={itemVariants} className="group p-8 rounded-3xl border border-slate-100 hover:border-brand-orange/30 hover:bg-orange-50/30 transition-all duration-500">
              <Globe className="w-10 h-10 text-brand-orange mb-6 stroke-[1.5] group-hover:scale-110 transition-transform duration-500" />
              <h4 className="text-xl font-bold text-brand-slate mb-4">Broad Spectrum Sourcing</h4>
              <p className="text-slate-500 leading-relaxed">
                A single, trusted point of contact for diverse procurement needs across all your operational sectors.
              </p>
            </motion.div>
            
            <motion.div variants={itemVariants} className="group p-8 rounded-3xl border border-slate-100 hover:border-brand-orange/30 hover:bg-orange-50/30 transition-all duration-500">
              <ShieldCheck className="w-10 h-10 text-brand-orange mb-6 stroke-[1.5] group-hover:scale-110 transition-transform duration-500" />
              <h4 className="text-xl font-bold text-brand-slate mb-4">Uncompromising Quality</h4>
              <p className="text-slate-500 leading-relaxed">
                We partner with industry-leading brands to ensure every item meets rigorous operational standards.
              </p>
            </motion.div>

            <motion.div variants={itemVariants} className="group p-8 rounded-3xl border border-slate-100 hover:border-brand-orange/30 hover:bg-orange-50/30 transition-all duration-500">
              <Zap className="w-10 h-10 text-brand-orange mb-6 stroke-[1.5] group-hover:scale-110 transition-transform duration-500" />
              <h4 className="text-xl font-bold text-brand-slate mb-4">Agile Fulfillment</h4>
              <p className="text-slate-500 leading-relaxed">
                Streamlined logistics designed to minimize your downtime and keep your projects on schedule.
              </p>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
