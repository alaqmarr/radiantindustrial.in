"use client";

import { useState } from "react";
import { saveSettings } from "./actions";
import { Save } from "lucide-react";

export default function SettingsForm({ initialSettings }: { initialSettings: Record<string, string> }) {
  const [settings, setSettings] = useState({
    legalName: initialSettings.legalName || "",
    tradeName: initialSettings.tradeName || "",
    gstNumber: initialSettings.gstNumber || "",
    bankName: initialSettings.bankName || "",
    accountName: initialSettings.accountName || "",
    accountNumber: initialSettings.accountNumber || "",
    ifscCode: initialSettings.ifscCode || "",
    branchName: initialSettings.branchName || "",
    address: initialSettings.address || "",
  });
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState<{ type: 'success' | 'error', text: string } | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setMessage(null);
    
    const res = await saveSettings(settings);
    if (res.error) {
      setMessage({ type: 'error', text: res.error });
    } else {
      setMessage({ type: 'success', text: "Settings saved successfully!" });
      setTimeout(() => setMessage(null), 3000);
    }
    
    setLoading(false);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setSettings(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  return (
    <div className="max-w-4xl space-y-8 pb-20 relative z-10">
      <div className="flex justify-between items-center relative z-10">
        <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">Company Settings</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Company Profile */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 blur-[80px] -z-10 rounded-full group-hover:bg-brand-orange/10 transition-colors"></div>
          <h2 className="text-xl font-bold text-brand-orange mb-6 flex items-center gap-2 drop-shadow-sm">
            <span className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center border border-brand-orange/20">
              🏢
            </span>
            Company Profile
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Legal Name</label>
              <input type="text" name="legalName" value={settings.legalName} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-orange/50 outline-none transition-all shadow-inner" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Trade Name (DBA)</label>
              <input type="text" name="tradeName" value={settings.tradeName} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-orange/50 outline-none transition-all shadow-inner" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">GST Number</label>
              <input type="text" name="gstNumber" value={settings.gstNumber} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-orange/50 outline-none transition-all shadow-inner" />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-300 mb-2">Registered Address</label>
              <textarea name="address" value={settings.address} onChange={handleChange} rows={3} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-orange/50 outline-none resize-none transition-all shadow-inner" />
            </div>
          </div>
        </div>

        {/* Banking Details */}
        <div className="bg-white/5 border border-white/10 rounded-3xl p-8 shadow-2xl backdrop-blur-xl relative overflow-hidden group">
          <div className="absolute top-0 right-0 w-64 h-64 bg-orange-600/5 blur-[80px] -z-10 rounded-full group-hover:bg-orange-600/10 transition-colors"></div>
          <h2 className="text-xl font-bold text-brand-orange mb-6 flex items-center gap-2 drop-shadow-sm">
            <span className="w-8 h-8 rounded-lg bg-brand-orange/10 flex items-center justify-center border border-brand-orange/20">
              🏦
            </span>
            Banking Details
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Bank Name</label>
              <input type="text" name="bankName" value={settings.bankName} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-orange/50 outline-none transition-all shadow-inner" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Account Name</label>
              <input type="text" name="accountName" value={settings.accountName} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-orange/50 outline-none transition-all shadow-inner" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Account Number</label>
              <input type="text" name="accountNumber" value={settings.accountNumber} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-orange/50 outline-none transition-all shadow-inner" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">IFSC Code</label>
              <input type="text" name="ifscCode" value={settings.ifscCode} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-orange/50 outline-none transition-all shadow-inner" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-2">Branch Name</label>
              <input type="text" name="branchName" value={settings.branchName} onChange={handleChange} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-orange/50 outline-none transition-all shadow-inner" />
            </div>
          </div>
        </div>

        <div className="flex items-center gap-4">
          <button 
            type="submit" 
            disabled={loading}
            className="bg-gradient-to-r from-brand-orange to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold py-3.5 px-8 rounded-xl flex items-center gap-2 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-brand-orange/30 transform hover:-translate-y-0.5"
          >
            {loading ? "Saving..." : <><Save className="w-5 h-5" /> Save Settings</>}
          </button>
          {message && (
            <span className={`text-sm px-4 py-2 rounded-lg border backdrop-blur-md ${message.type === 'error' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>
              {message.text}
            </span>
          )}
        </div>
      </form>
    </div>
  );
}
