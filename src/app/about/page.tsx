import { Metadata } from "next";
import AboutComponent from "@/components/About";

export const metadata: Metadata = {
  title: "About Us",
  description: "Learn about Radiant Industrial Co., our mission, our story, and why we are your premier procurement partner.",
};

export default function AboutPage() {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "AboutPage",
    "name": "About Radiant Industrial Co.",
    "description": "Learn about Radiant Industrial Co., our mission, our story, and why we are your premier procurement partner.",
    "url": "https://radiantindustrial.in/about"
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
            About <span className="text-brand-orange">Us</span>
          </h1>
          <p className="text-xl text-slate-300 font-medium leading-relaxed max-w-2xl mx-auto">
            Discover the vision, mission, and people behind India's premier procurement partner.
          </p>
        </div>
      </section>
      <div className="relative z-20 bg-white py-12">
        <AboutComponent />
      </div>
    </>
  );
}
