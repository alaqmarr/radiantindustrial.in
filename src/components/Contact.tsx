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

  const inputStyle = "w-full bg-transparent border-b-2 border-slate-200 py-4 px-0 text-brand-slate focus:border-brand-orange outline-none transition-colors placeholder:text-slate-400 font-medium";

  return (
    <section id="contact" className="py-32 bg-[#f8fafc] relative">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid lg:grid-cols-2 gap-20 items-center">
          {/* Contact Information */}
          <motion.div 
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="order-2 lg:order-1"
          >
            <div className="flex items-center gap-4 mb-6">
              <div className="w-12 h-[2px] bg-brand-orange"></div>
              <span className="uppercase tracking-widest text-sm font-bold text-slate-400">Get in Touch</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-extrabold text-brand-slate mb-8 tracking-tight">
              Let’s build something <br/> <span className="text-brand-orange">great together.</span>
            </h2>
            <p className="text-lg text-slate-500 mb-12 max-w-md">
              Ready to streamline your procurement? Reach out to our team today to discuss your supply needs or request a custom quote.
            </p>

            <div className="space-y-8">
              <div className="group flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-brand-orange shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <MapPin size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-slate mb-1">Headquarters</h4>
                  <p className="text-slate-500 leading-relaxed">
                    Sai Vaishnavi Complex, Ranigunj, <br/>
                    Secunderabad 500003, Telangana, India
                  </p>
                </div>
              </div>
              
              <div className="group flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-brand-orange shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <Phone size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-slate mb-1">Phone</h4>
                  <a href="tel:+919618443558" className="text-slate-500 hover:text-brand-orange transition-colors">
                    +91 9618443558
                  </a>
                </div>
              </div>

              <div className="group flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-brand-orange shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <Mail size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-slate mb-1">Email</h4>
                  <a href="mailto:info@radiantindustrial.in" className="text-slate-500 hover:text-brand-orange transition-colors">
                    info@radiantindustrial.in
                  </a>
                </div>
              </div>

              <div className="group flex items-start gap-6">
                <div className="w-12 h-12 rounded-2xl bg-white border border-slate-200 flex items-center justify-center text-brand-orange shrink-0 group-hover:scale-110 transition-transform duration-300 shadow-sm">
                  <Clock size={20} />
                </div>
                <div>
                  <h4 className="font-bold text-brand-slate mb-1">Operating Hours</h4>
                  <p className="text-slate-500">Mon – Sat, 9:00 AM – 6:00 PM</p>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Contact Form */}
          <motion.div 
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="order-1 lg:order-2 bg-white p-10 md:p-14 rounded-[2.5rem] shadow-2xl shadow-slate-200/50"
          >
            {submitSuccess ? (
              <motion.div 
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[400px] flex flex-col items-center justify-center text-center"
              >
                <div className="w-20 h-20 bg-green-50 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle className="w-10 h-10 text-green-500" />
                </div>
                <h4 className="text-2xl font-extrabold text-brand-slate mb-3">Message Sent</h4>
                <p className="text-slate-500">Thank you for reaching out. Our team will get back to you shortly.</p>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
                {submitError && (
                  <div className="p-4 bg-red-50 text-red-600 rounded-2xl text-sm border border-red-100 font-medium">
                    {submitError}
                  </div>
                )}
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="relative">
                    <input 
                      {...register("name", { required: "Name is required" })}
                      className={inputStyle}
                      placeholder="Full Name *"
                    />
                    {errors.name && <span className="absolute -bottom-5 left-0 text-xs text-red-500 font-medium">{errors.name.message}</span>}
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
                    {errors.email && <span className="absolute -bottom-5 left-0 text-xs text-red-500 font-medium">{errors.email.message}</span>}
                  </div>
                </div>

                <div className="relative">
                  <input 
                    {...register("phone")}
                    className={inputStyle}
                    placeholder="Phone Number (Optional)"
                  />
                </div>

                <div className="relative">
                  <textarea 
                    {...register("message", { required: "Message is required" })}
                    rows={4}
                    className={`${inputStyle} resize-none`}
                    placeholder="Tell us about your requirements... *"
                  ></textarea>
                  {errors.message && <span className="absolute -bottom-5 left-0 text-xs text-red-500 font-medium">{errors.message.message}</span>}
                </div>

                <div className="pt-4">
                  <button 
                    type="submit"
                    disabled={isSubmitting}
                    className="group w-full py-5 bg-brand-slate hover:bg-brand-orange text-white rounded-2xl font-bold tracking-wide transition-all duration-300 flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:bg-brand-slate"
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
