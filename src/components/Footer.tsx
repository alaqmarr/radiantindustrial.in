import Image from "next/image";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="bg-slate-50 pt-24 pb-12 border-t border-slate-200">
      <div className="container mx-auto px-6 md:px-12">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-12 mb-16">
          <div className="md:col-span-5 lg:col-span-4">
            <Link href="/" className="inline-block w-64 h-16 md:w-72 md:h-20 relative mb-8 mix-blend-multiply hover:opacity-80 transition-opacity">
              <Image 
                src="/logos/logo-long.png" 
                alt="Radiant Industrial Co. Logo" 
                fill
                className="object-contain object-left"
              />
            </Link>
            <p className="text-slate-600 text-lg leading-relaxed pr-4 font-medium">
              Your premier procurement partner, delivering reliable general, specialized, industrial, and agricultural supplies.
            </p>
          </div>

          <div className="md:col-span-3 lg:col-span-2 lg:col-start-7">
            <h4 className="text-xl font-bold text-brand-slate mb-6">Navigation</h4>
            <ul className="space-y-4">
              <li>
                <Link href="/about" className="text-slate-600 hover:text-brand-orange font-semibold transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/#divisions" className="text-slate-600 hover:text-brand-orange font-semibold transition-colors">
                  Divisions
                </Link>
              </li>
              <li>
                <Link href="/contact" className="text-slate-600 hover:text-brand-orange font-semibold transition-colors">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          <div className="md:col-span-4 lg:col-span-3">
            <div className="bg-white rounded-2xl p-8 border border-slate-200 shadow-sm">
              <h4 className="text-2xl font-bold text-brand-slate mb-3">Ready to start?</h4>
              <p className="text-slate-600 mb-6 font-medium">
                Let's discuss how we can streamline your supply chain.
              </p>
              <Link 
                href="/contact"
                className="inline-flex items-center gap-2 text-brand-orange font-bold hover:text-orange-600 transition-colors"
              >
                Request a Quote <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>
        </div>

        <div className="pt-8 border-t border-slate-200 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-slate-500 font-medium">
            &copy; {currentYear} Radiant Industrial Co. All rights reserved.
          </p>
          <div className="flex gap-6">
            <Link href="#" className="text-slate-500 hover:text-brand-orange font-medium transition-colors">
              Privacy Policy
            </Link>
            <Link href="#" className="text-slate-500 hover:text-brand-orange font-medium transition-colors">
              Terms of Service
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
}
