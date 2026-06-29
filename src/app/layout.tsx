import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import LayoutWrapper from "@/components/LayoutWrapper";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: {
    default: "Radiant Industrial Co. | Premier Procurement Partner",
    template: "%s | Radiant Industrial Co."
  },
  description: "Radiant Industrial Co. is your premier procurement partner, delivering reliable general, specialized, industrial, and agricultural supplies across India.",
  keywords: ["industrial supply", "agricultural supply", "specialized equipment", "procurement", "India", "Secunderabad", "heavy machinery"],
  openGraph: {
    type: "website",
    locale: "en_IN",
    url: "https://radiantindustrial.in",
    siteName: "Radiant Industrial Co.",
    title: "Radiant Industrial Co. | Premier Procurement Partner",
    description: "Delivering reliable general, specialized, industrial, and agricultural supplies to keep your operations running seamlessly.",
    images: [
      {
        url: "/logos/logo-long.png",
        width: 1200,
        height: 630,
        alt: "Radiant Industrial Co. Logo",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Radiant Industrial Co.",
    description: "Your premier procurement partner for industrial and agricultural supplies.",
    images: ["/logos/logo-long.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "name": "Radiant Industrial Co.",
    "url": "https://radiantindustrial.in",
    "logo": "https://radiantindustrial.in/logos/logo-long.png",
    "contactPoint": {
      "@type": "ContactPoint",
      "telephone": "+91-8522095253",
      "contactType": "customer service",
      "areaServed": "IN",
      "availableLanguage": ["English", "Hindi"]
    },
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Sai Vaishnavi Complex, Ranigunj",
      "addressLocality": "Secunderabad",
      "addressRegion": "Telangana",
      "postalCode": "500003",
      "addressCountry": "IN"
    }
  };

  return (
    <html lang="en" className="scroll-smooth dark">
      <body
        className={`${inter.variable} font-sans antialiased bg-[#020617] text-slate-300 flex flex-col min-h-screen selection:bg-brand-orange/30 selection:text-white`}
      >
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <LayoutWrapper>
          {children}
        </LayoutWrapper>
      </body>
    </html>
  );
}
