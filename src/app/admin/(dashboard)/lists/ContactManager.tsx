"use client";

import { useState } from "react";
import { addContact, deleteContact } from "../../actions";
import { Plus, Trash2, X } from "lucide-react";

export default function ContactManager({ contacts, allTags }: { contacts: any[], allTags: any[] }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", company: "", gstNumber: "", tags: ""
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const tagsArray = formData.tags.split(",").map(t => t.trim()).filter(t => t.length > 0);
    
    const res = await addContact({
      ...formData,
      tags: tagsArray
    });

    if (res.error) {
      alert(res.error);
    } else {
      setModalOpen(false);
      setFormData({ name: "", email: "", phone: "", company: "", gstNumber: "", tags: "" });
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this contact?")) {
      await deleteContact(id);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center relative z-10">
        <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">Contacts & Lists</h1>
        <button 
          onClick={() => setModalOpen(true)}
          className="bg-gradient-to-r from-brand-orange to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg shadow-brand-orange/30 transform hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" /> Add Contact
        </button>
      </div>

      <div className="bg-white/5 border border-white/10 rounded-2xl overflow-hidden shadow-2xl backdrop-blur-xl relative z-10">
        <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange/5 blur-[80px] -z-10 rounded-full"></div>
        <div className="overflow-x-auto">
          <table className="w-full text-left text-sm text-slate-300">
            <thead className="bg-black/40 text-slate-200 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-bold tracking-wider uppercase text-xs">Name</th>
                <th className="px-6 py-4 font-bold tracking-wider uppercase text-xs">Company</th>
                <th className="px-6 py-4 font-bold tracking-wider uppercase text-xs">Email / Phone</th>
                <th className="px-6 py-4 font-bold tracking-wider uppercase text-xs">Tags</th>
                <th className="px-6 py-4 font-bold tracking-wider uppercase text-xs text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/5">
              {contacts.length === 0 ? (
                <tr>
                  <td colSpan={5} className="px-6 py-12 text-center text-slate-400">
                    <div className="flex flex-col items-center justify-center">
                      <div className="w-12 h-12 rounded-full bg-white/5 flex items-center justify-center mb-3">
                        <Plus className="w-6 h-6 text-brand-orange" />
                      </div>
                      No contacts found. Click "Add Contact" to start building your list.
                    </div>
                  </td>
                </tr>
              ) : contacts.map((contact) => (
                <tr key={contact.id} className="hover:bg-white/5 transition-colors group">
                  <td className="px-6 py-4 font-medium text-white">{contact.name}</td>
                  <td className="px-6 py-4">
                    {contact.company || "-"}
                    {contact.gstNumber && <span className="block text-xs text-brand-orange/80 mt-1 font-mono">GST: {contact.gstNumber}</span>}
                  </td>
                  <td className="px-6 py-4">
                    <div className="text-slate-200">{contact.email}</div>
                    <div className="text-xs text-slate-400 mt-1">{contact.phone}</div>
                  </td>
                  <td className="px-6 py-4">
                    <div className="flex flex-wrap gap-2">
                      {contact.tags.map((ct: any) => (
                        <span key={ct.tag.id} className="px-2.5 py-1 bg-black/40 border border-white/10 rounded-md text-xs font-medium text-slate-300 shadow-sm backdrop-blur-md">
                          {ct.tag.name}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button onClick={() => handleDelete(contact.id)} className="text-red-400 hover:text-red-300 p-2 rounded-lg hover:bg-red-500/10 transition-all border border-transparent hover:border-red-500/30 opacity-0 group-hover:opacity-100">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 w-full max-w-lg shadow-2xl relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-orange/10 blur-[100px] pointer-events-none rounded-full"></div>
            
            <div className="flex justify-between items-center mb-6 relative z-10 border-b border-white/10 pb-4">
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <Plus className="w-6 h-6 text-brand-orange" />
                Add New Contact
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="space-y-5 relative z-10">
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-orange/50 outline-none transition-all shadow-inner" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Email *</label>
                  <input required type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-orange/50 outline-none transition-all shadow-inner" />
                </div>
              </div>
              <div className="grid grid-cols-2 gap-5">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number</label>
                  <input type="text" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-orange/50 outline-none transition-all shadow-inner" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Company</label>
                  <input type="text" value={formData.company} onChange={e => setFormData({...formData, company: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-orange/50 outline-none transition-all shadow-inner" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">GST Number</label>
                <input type="text" value={formData.gstNumber} onChange={e => setFormData({...formData, gstNumber: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-orange/50 outline-none transition-all shadow-inner" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Tags (Comma separated)</label>
                <input type="text" placeholder="e.g. suppliers, VIP, general" value={formData.tags} onChange={e => setFormData({...formData, tags: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-orange/50 outline-none transition-all shadow-inner" />
                <p className="text-xs text-slate-500 mt-2 bg-white/5 p-2 rounded-lg border border-white/5">Existing tags: <span className="text-brand-orange/80">{allTags.map(t => t.name).join(", ") || "None"}</span></p>
              </div>
              
              <div className="pt-6 border-t border-white/10 flex justify-end gap-4">
                <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-3 rounded-xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all font-medium">Cancel</button>
                <button type="submit" disabled={loading} className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-orange to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold transition-all disabled:opacity-50 shadow-lg shadow-brand-orange/30 transform hover:-translate-y-0.5">
                  {loading ? "Saving..." : "Save Contact"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
