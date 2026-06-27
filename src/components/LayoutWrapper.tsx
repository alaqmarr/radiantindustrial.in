"use client";

import { usePathname } from "next/navigation";
import Navbar from "./Navbar";
import Footer from "./Footer";
import FloatingContact from "./FloatingContact";

export default function LayoutWrapper({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname?.startsWith("/admin");

  if (isAdmin) {
    return <main className="flex-grow flex flex-col pt-0">{children}</main>;
  }

  return (
    <>
      <Navbar />
      <main className="flex-grow flex flex-col pt-0">
        {children}
      </main>
      <Footer />
      <FloatingContact />
    </>
  );
}
