import { Metadata } from "next";
import ContactComponent from "@/components/Contact";

export const metadata: Metadata = {
  title: "Contact Us",
  description: "Get in touch with Radiant Industrial Co. to discuss your supply needs or request a custom quote.",
};

export default function ContactPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ContactPage",
    "name": "Contact Radiant Industrial Co.",
    "description": "Get in touch with Radiant Industrial Co. to discuss your supply needs or request a custom quote.",
    "url": "https://radiantindustrial.in/contact"
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      
      {/* Mesh Glow Header */}
      <section className="relative w-full min-h-[60vh] flex flex-col items-center justify-center overflow-hidden pt-32 pb-20 bg-[#020617]">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full max-w-[800px] h-[400px] pointer-events-none opacity-30">
          <div className="absolute top-[20%] left-[30%] w-[400px] h-[400px] bg-slate-500/40 rounded-full mix-blend-screen blur-[120px]"></div>
          <div className="absolute bottom-[20%] right-[30%] w-[300px] h-[300px] bg-brand-orange/30 rounded-full mix-blend-screen blur-[100px]"></div>
        </div>
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.02] z-0 pointer-events-none"></div>

        <div className="container mx-auto px-4 md:px-8 relative z-10 text-center">
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-extrabold text-white tracking-tighter mb-6">
            Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-slate-200 to-brand-orange">Us</span>
          </h1>
          <p className="text-lg md:text-2xl text-slate-400 font-normal leading-relaxed max-w-2xl mx-auto">
            Ready to streamline your supply chain? Our procurement experts are here to help.
          </p>
        </div>
      </section>

      <div className="relative z-20 bg-[#020617] pb-24">
        <ContactComponent />
      </div>
    </>
  );
}
