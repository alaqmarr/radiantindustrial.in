"use client";

import { useState } from "react";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
import { MapPin, Phone, Mail, Clock, ArrowRight, CheckCircle, Loader2 } from "lucide-react";

type ContactFormData = {
  name: string;
  email: string;
  phone?: string;
  message: string;
};

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitSuccess, setSubmitSuccess] = useState(false);
  const [submitError, setSubmitError] = useState("");

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitError("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      
      if (!res.ok) throw new Error("Failed to send message");
      
      setSubmitSuccess(true);
      reset();
      setTimeout(() => setSubmitSuccess(false), 5000);
    } catch (err) {
      setSubmitError("Something went wrong. Please try again or email us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const inputStyle = "w-full bg-[#020617] border border-white/10 rounded-2xl py-4 px-6 text-white focus:border-brand-orange outline-none transition-colors placeholder:text-slate-500 font-medium";

  return (
    <section id="contact" className="py-20 relative z-20">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-20 items-start">
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-brand-orange"></div>
              <span className="uppercase tracking-widest text-sm font-bold text-slate-500">Get in Touch</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-white mb-8 tracking-tighter">
              Let’s build something <br/> <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-brand-orange">great together.</span>
            </h2>
            <p className="text-lg text-slate-400 mb-12 max-w-md font-normal leading-relaxed">
              Ready to streamline your procurement? Reach out to our team today to discuss your supply needs or request a custom quote.
            </p>

            <div className="space-y-6">
              <div className="group flex items-start gap-6 p-6 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-white/5 hover:border-brand-orange/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#020617] border border-white/10 flex items-center justify-center text-brand-orange shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1 text-lg">Headquarters</h4>
                  <p className="text-slate-400 leading-relaxed font-normal">
                    Sai Vaishnavi Complex, Ranigunj, <br/>
                    Secunderabad 500003, Telangana, India
                  </p>
                </div>
              </div>
              
              <div className="group flex items-start gap-6 p-6 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-white/5 hover:border-brand-orange/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#020617] border border-white/10 flex items-center justify-center text-brand-orange shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1 text-lg">Phone</h4>
                  <a href="tel:+919618443558" className="text-slate-400 font-normal hover:text-white transition-colors">
                    +91 9618443558
                  </a>
                </div>
              </div>

              <div className="group flex items-start gap-6 p-6 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-white/5 hover:border-brand-orange/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#020617] border border-white/10 flex items-center justify-center text-brand-orange shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1 text-lg">Email</h4>
                  <a href="mailto:info@radiantindustrial.in" className="text-slate-400 font-normal hover:text-white transition-colors">
                    info@radiantindustrial.in
                  </a>
                </div>
              </div>

              <div className="group flex items-start gap-6 p-6 rounded-3xl bg-slate-900/40 backdrop-blur-xl border border-white/5 hover:border-brand-orange/30 transition-all duration-300">
                <div className="w-12 h-12 rounded-2xl bg-[#020617] border border-white/10 flex items-center justify-center text-brand-orange shrink-0 group-hover:scale-110 transition-transform duration-300">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-white mb-1 text-lg">Operating Hours</h4>
                  <p className="text-slate-400 font-normal">Mon – Sat, 9:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 bg-slate-900/40 backdrop-blur-2xl border border-white/10 p-8 md:p-12 rounded-[3rem] shadow-2xl relative overflow-hidden"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/5 to-transparent pointer-events-none"></div>

            {submitSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[500px] flex flex-col items-center justify-center text-center relative z-10"
              >
                <div className="w-24 h-24 bg-green-500/20 border border-green-500/30 rounded-full flex items-center justify-center mb-8">
                  <CheckCircle className="w-12 h-12 text-green-400" />
                </div>
                <h4 className="text-3xl font-extrabold text-white mb-4 tracking-tight">Message Sent</h4>
                <p className="text-slate-400 text-lg font-normal">Thank you for reaching out. Our team will get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 relative z-10">
                {submitError && (
                  <div className="p-4 bg-red-900/30 text-red-400 rounded-2xl border border-red-500/30 text-sm font-medium">
                    {submitError}
                  </div>
                )}
                
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="relative">
                    <input 
                      {...register("name", { required: "Name is required" })}
                      className={inputStyle}
                      placeholder="Full Name *"
                    />
                    {errors.name && <span className="absolute -bottom-5 left-2 text-xs text-red-400 font-medium">{errors.name.message}</span>}
                  </div>
                  
                  <div className="relative">
                    <input 
                      type="email"
                      {...register("email", { 
                        required: "Email is required",
                        pattern: { value: /\S+@\S+\.\S+/, message: "Invalid email format" }
                      })}
                      className={inputStyle}
                      placeholder="Email Address *"
                    />
                    {errors.email && <span className="absolute -bottom-5 left-2 text-xs text-red-400 font-medium">{errors.email.message}</span>}
                  </div>
                </div>

                <div className="relative pt-2">
                  <input 
                    {...register("phone")}
                    className={inputStyle}
                    placeholder="Phone Number (Optional)"
                  />
                </div>

                <div className="relative pt-2">
                  <textarea 
                    {...register("message", { required: "Message is required" })}
                    rows={5}
                    className={`${inputStyle} resize-none`}
                    placeholder="Tell us about your requirements... *"
                  ></textarea>
                  {errors.message && <span className="absolute -bottom-5 left-2 text-xs text-red-400 font-medium">{errors.message.message}</span>}
                </div>

                <div className="pt-6">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full py-5 bg-white hover:bg-brand-orange text-[#020617] hover:text-white rounded-2xl font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:bg-white disabled:hover:text-[#020617]"
                  >
                    {isSubmitting ? (
                      <>
                        <Loader2 className="animate-spin" size={20} />
                        Sending...
                      </>
                    ) : (
                      <>
                        Send Message
                        <ArrowRight size={20} className="group-hover:translate-x-1 transition-transform" />
                      </>
                    )}
                  </button>
                </div>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
