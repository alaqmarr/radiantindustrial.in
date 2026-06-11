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
      <section className="bg-brand-slate pt-40 pb-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03] z-0"></div>
        <div className="container mx-auto px-6 md:px-12 relative z-10 text-center">
          <h1 className="text-5xl md:text-6xl lg:text-7xl font-extrabold text-white tracking-tight mb-6">
            Contact <span className="text-brand-orange">Us</span>
          </h1>
          <p className="text-xl text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
            Ready to streamline your supply chain? Our procurement experts are here to help.
          </p>
        </div>
      </section>
      <div className="relative z-20 bg-white py-12">
        <ContactComponent />
      </div>
    </>
  );
}
