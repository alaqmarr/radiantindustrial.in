import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-[#020617] pt-24 pb-12 border-t border-white/10 relative overflow-hidden z-20">
      {/* Background Glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-[800px] h-[400px] pointer-events-none opacity-20">
        <div className="absolute -top-[200px] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-brand-orange/30 rounded-full mix-blend-screen blur-[120px]"></div>
      </div>
      
      <div className="container mx-auto px-4 md:px-8 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5 lg:col-span-4">
            <Link href="/" className="inline-block w-64 h-16 md:w-72 md:h-20 relative mb-8 hover:opacity-80 transition-opacity">
              <Image 
                src="/logos/logo-long.png" 
                alt="Radiant Industrial Co. Logo" 
                fill
                className="object-contain object-left brightness-0 invert opacity-90"
              />
            </Link>
            <p className="text-slate-400 text-lg leading-relaxed pr-4 font-normal">
              Your premier procurement partner, delivering reliable general, specialized, industrial, and agricultural supplies.
            </p>
          </div>

          <div className="md:col-span-3 lg:col-span-2 lg:col-start-7">
            <h4 className="text-xl font-bold text-white mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-slate-400 hover:text-white font-normal transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#divisions" className="text-slate-400 hover:text-white font-normal transition-colors">
                  Divisions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-400 hover:text-white font-normal transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 lg:col-span-3">
            <div className="bg-slate-900/40 backdrop-blur-xl rounded-[2rem] p-8 border border-white/5 relative overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-brand-orange/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"></div>
              <h4 className="text-2xl font-bold text-white mb-3 relative z-10">Ready to start?</h4>
              <p className="text-slate-400 mb-6 font-normal relative z-10">
                Let's discuss how we can streamline your supply chain.
              </p>
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 text-brand-orange font-bold hover:text-white transition-colors relative z-10"
              >
                Request a Quote <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-white/10 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 font-normal">
            &copy; {currentYear} Radiant Industrial Co. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-slate-500 hover:text-white font-normal transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-slate-500 hover:text-white font-normal transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
