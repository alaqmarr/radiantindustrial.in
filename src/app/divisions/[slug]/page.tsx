import { Metadata } from "next";
import { notFound } from "next/navigation";
import DivisionClient from "./DivisionClient";

export const divisionsData = {
  "industrial": {
    title: "Industrial Supply",
    description: "Built for the heavy lifters. Maintaining peak productivity on the factory floor.",
    image: "https://images.unsplash.com/photo-1504917595217-d4dc5ebe6122?auto=format&fit=crop&q=80",
    categories: [
      { name: "Heavy Machinery Parts", iconName: "Factory" },
      { name: "Safety & PPE", iconName: "CheckCircle2" },
      { name: "Power Tools", iconName: "Zap" },
      { name: "Fasteners", iconName: "Hammer" },
      { name: "Abrasives", iconName: "Hexagon" },
      { name: "Lubricants", iconName: "Component" }
    ],
    iconName: "Factory",
    color: "from-blue-600 to-indigo-900",
    accent: "text-blue-500",
    bgAccent: "bg-blue-500",
    lightBg: "bg-blue-50 border-blue-100"
  },
  "agricultural": {
    title: "Agricultural Supply",
    description: "Cultivating success for modern farming and daily operations.",
    image: "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80",
    categories: [
      { name: "Irrigation Systems", iconName: "Zap" },
      { name: "Tractor Implements", iconName: "Tractor" },
      { name: "Harvesting Tools", iconName: "Hammer" },
      { name: "Fertilizer Spreaders", iconName: "Hexagon" },
      { name: "Agri-Chemicals", iconName: "Component" }
    ],
    iconName: "Tractor",
    color: "from-green-600 to-emerald-900",
    accent: "text-green-500",
    bgAccent: "bg-green-500",
    lightBg: "bg-green-50 border-green-100"
  },
  "special-technical": {
    title: "Special & Technical",
    description: "Precision meets performance. Niche and advanced tech.",
    image: "https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&q=80",
    categories: [
      { name: "Precision Instruments", iconName: "Component" },
      { name: "Custom Fittings", iconName: "Hexagon" },
      { name: "Advanced Electrical", iconName: "Zap" },
      { name: "Diagnostic Tools", iconName: "CheckCircle2" },
      { name: "Automation Sensors", iconName: "Cpu" }
    ],
    iconName: "Cpu",
    color: "from-purple-600 to-fuchsia-900",
    accent: "text-purple-500",
    bgAccent: "bg-purple-500",
    lightBg: "bg-purple-50 border-purple-100"
  },
  "general": {
    title: "General Supply",
    description: "The backbone of everyday operations keeping facilities stocked.",
    image: "https://images.unsplash.com/photo-1553413077-190dd305871c?auto=format&fit=crop&q=80",
    categories: [
      { name: "Facility Maintenance", iconName: "Hammer" },
      { name: "Janitorial Supplies", iconName: "CheckCircle2" },
      { name: "Material Handling", iconName: "Package" },
      { name: "Packaging", iconName: "Hexagon" },
      { name: "Office Supplies", iconName: "Component" }
    ],
    iconName: "Package",
    color: "from-brand-orange to-red-900",
    accent: "text-brand-orange",
    bgAccent: "bg-brand-orange",
    lightBg: "bg-orange-50 border-orange-100"
  }
};

export function generateStaticParams() {
  return [
    { slug: 'industrial' },
    { slug: 'agricultural' },
    { slug: 'special-technical' },
    { slug: 'general' },
  ];
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const division = divisionsData[slug as keyof typeof divisionsData];
  if (!division) return { title: "Division Not Found" };
  
  return {
    title: division.title,
    description: division.description,
  };
}

export default async function DivisionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const division = divisionsData[slug as keyof typeof divisionsData];
  
  if (!division) {
    notFound();
  }

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    "name": `${division.title} | Radiant Industrial Co.`,
    "description": division.description,
    "url": `https://radiantindustrial.in/divisions/${slug}`
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <DivisionClient division={division} />
    </>
  );
}
