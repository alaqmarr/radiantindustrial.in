"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState, useEffect } from "react";
import { LayoutDashboard, Users, Mail, Settings, LogOut, Send, Menu, X } from "lucide-react";
import LogoutButton from "./LogoutButton";

export default function Sidebar({ user }: { user: { name?: string | null, email?: string | null } }) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  // Close sidebar on route change on mobile
  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  const navLinks = [
    { href: "/admin", icon: LayoutDashboard, label: "Dashboard" },
    { href: "/admin/lists", icon: Users, label: "Contacts & Lists" },
    { href: "/admin/templates", icon: Mail, label: "Templates" },
    { href: "/admin/campaigns", icon: Send, label: "Campaigns" },
    { href: "/admin/settings", icon: Settings, label: "Settings" },
  ];

  return (
    <>
      {/* Mobile Menu Button */}
      <div className="md:hidden fixed top-0 left-0 w-full z-50 bg-black/80 backdrop-blur-xl border-b border-white/10 p-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-orange to-orange-600 flex items-center justify-center">
            <span className="text-white font-bold">R</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Radiant<span className="text-brand-orange">Admin</span></h2>
        </div>
        <button onClick={() => setIsOpen(!isOpen)} className="text-white p-2 bg-white/5 rounded-lg border border-white/10">
          {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Backdrop for mobile */}
      {isOpen && (
        <div 
          className="md:hidden fixed inset-0 bg-black/60 backdrop-blur-sm z-40" 
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Sidebar */}
      <aside className={`fixed md:static inset-y-0 left-0 z-50 w-64 h-screen flex-shrink-0 bg-black/90 md:bg-white/[0.02] border-r border-white/10 backdrop-blur-3xl flex flex-col shadow-2xl transition-transform duration-300 ${isOpen ? "translate-x-0" : "-translate-x-full md:translate-x-0"}`}>
        <div className="p-6 border-b border-white/10 flex items-center gap-3 hidden md:flex">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-brand-orange to-orange-600 shadow-lg shadow-brand-orange/20 flex items-center justify-center">
            <span className="text-white font-bold text-lg">R</span>
          </div>
          <h2 className="text-xl font-bold text-white tracking-tight">Radiant<span className="text-brand-orange">Admin</span></h2>
        </div>
        
        <nav className="flex-1 p-4 flex flex-col gap-2 overflow-y-auto custom-scrollbar mt-16 md:mt-0">
          {navLinks.map((link) => {
            const isActive = pathname === link.href;
            return (
              <Link 
                key={link.href} 
                href={link.href} 
                className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-300 ${
                  isActive 
                    ? "text-white bg-gradient-to-r from-brand-orange/20 to-transparent border border-brand-orange/30 shadow-lg shadow-brand-orange/10" 
                    : "text-slate-400 hover:text-white hover:bg-white/5 hover:shadow-lg hover:shadow-black/20"
                }`}
              >
                <link.icon className={`w-5 h-5 ${isActive ? "text-brand-orange" : ""}`} />
                <span className="font-medium">{link.label}</span>
              </Link>
            );
          })}
        </nav>

        <div className="p-4 border-t border-white/10 bg-black/40 md:bg-black/20">
          <div className="flex items-center gap-3 px-4 py-3 text-sm text-slate-400 mb-2 bg-white/5 rounded-xl border border-white/5 backdrop-blur-md shadow-inner">
            <div className="w-8 h-8 rounded-full flex-shrink-0 bg-gradient-to-br from-brand-orange to-orange-700 flex items-center justify-center text-white font-bold shadow-md shadow-brand-orange/20">
              {user.name?.charAt(0) || "A"}
            </div>
            <div className="truncate flex-1">
              <p className="text-white font-semibold truncate">{user.name}</p>
              <p className="text-xs text-slate-400 truncate">{user.email}</p>
            </div>
          </div>
          <LogoutButton />
        </div>
      </aside>
    </>
  );
}
