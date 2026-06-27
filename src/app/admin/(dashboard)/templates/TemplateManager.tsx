"use client";

import { useState } from "react";
import { saveTemplate, deleteTemplate } from "../../actions";
import { Plus, Trash2, Edit, X } from "lucide-react";
import dynamic from "next/dynamic";
import "react-quill-new/dist/quill.snow.css";

// ReactQuill must be dynamically imported with SSR disabled
const ReactQuill = dynamic(() => import("react-quill-new"), { ssr: false });

export default function TemplateManager({ templates }: { templates: any[] }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const [formData, setFormData] = useState({
    id: "",
    name: "",
    subject: "",
    body: "",
    type: "EMAIL"
  });

  const openEditor = (template?: any) => {
    if (template) {
      setFormData({
        id: template.id,
        name: template.name,
        subject: template.subject || "",
        body: template.body,
        type: template.type
      });
    } else {
      setFormData({ id: "", name: "", subject: "", body: "", type: "EMAIL" });
    }
    setModalOpen(true);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    
    const res = await saveTemplate(formData);
    
    if (res.error) {
      alert(res.error);
    } else {
      setModalOpen(false);
    }
    setLoading(false);
  };

  const handleDelete = async (id: string) => {
    if (confirm("Are you sure you want to delete this template?")) {
      await deleteTemplate(id);
    }
  };

  return (
    <div className="space-y-6 pb-20">
      <div className="flex justify-between items-center relative z-10">
        <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">Message Templates</h1>
        <button 
          onClick={() => openEditor()}
          className="bg-gradient-to-r from-brand-orange to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white px-5 py-2.5 rounded-xl flex items-center gap-2 transition-all duration-300 shadow-lg shadow-brand-orange/30 transform hover:-translate-y-0.5"
        >
          <Plus className="w-5 h-5" /> New Template
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 relative z-10">
        {templates.length === 0 ? (
          <div className="col-span-full p-12 text-center border-2 border-dashed border-white/10 rounded-2xl bg-black/20 backdrop-blur-sm">
            <Mail className="w-12 h-12 text-white/20 mx-auto mb-4" />
            <p className="text-slate-400 font-medium">No templates found. Create your first email or WhatsApp template!</p>
          </div>
        ) : (
          templates.map((template) => (
            <div key={template.id} className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col hover:border-brand-orange/50 transition-all duration-300 backdrop-blur-xl shadow-xl group hover:shadow-brand-orange/10 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-24 h-24 bg-brand-orange/5 blur-[40px] -z-10 rounded-full group-hover:bg-brand-orange/10 transition-colors"></div>
              
              <div className="flex justify-between items-start mb-4">
                <div>
                  <span className={`text-[10px] font-bold tracking-wider uppercase px-2 py-1 rounded-md backdrop-blur-sm border ${template.type === 'EMAIL' ? 'bg-blue-500/10 text-blue-400 border-blue-500/20' : 'bg-[#25D366]/10 text-[#25D366] border-[#25D366]/20'}`}>
                    {template.type}
                  </span>
                  <h3 className="text-lg font-bold text-white mt-3 drop-shadow-sm">{template.name}</h3>
                </div>
                <div className="flex gap-2">
                  <button onClick={() => openEditor(template)} className="text-slate-400 hover:text-brand-orange bg-black/20 hover:bg-black/40 p-2 rounded-lg transition-all border border-transparent hover:border-brand-orange/30">
                    <Edit className="w-4 h-4" />
                  </button>
                  <button onClick={() => handleDelete(template.id)} className="text-red-400 hover:text-red-300 bg-red-500/10 hover:bg-red-500/20 p-2 rounded-lg transition-all border border-transparent hover:border-red-500/30">
                    <Trash2 className="w-4 h-4" />
                  </button>
                </div>
              </div>
              
              {template.type === 'EMAIL' && (
                <div className="mb-4 bg-black/20 p-3 rounded-xl border border-white/5">
                  <span className="text-xs text-brand-orange/80 font-semibold uppercase tracking-wider block mb-1">Subject</span>
                  <p className="text-sm text-slate-200 line-clamp-1 font-medium">{template.subject}</p>
                </div>
              )}
              
              <div className="text-sm text-slate-400 line-clamp-3 flex-1 bg-black/20 p-4 rounded-xl border border-white/5 leading-relaxed">
                {template.body.replace(/<[^>]+>/g, ' ')}
              </div>
            </div>
          ))
        )}
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex items-center justify-center z-50 p-4">
          <div className="bg-[#0a0a0a] border border-white/10 rounded-3xl p-6 w-full max-w-[90vw] shadow-2xl h-[90vh] flex flex-col relative overflow-hidden">
            <div className="absolute top-[-20%] right-[-10%] w-[50%] h-[50%] bg-brand-orange/10 blur-[100px] pointer-events-none rounded-full"></div>
            
            <div className="flex justify-between items-center mb-6 relative z-10 border-b border-white/10 pb-4">
              <h2 className="text-2xl font-bold text-white tracking-tight flex items-center gap-3">
                <Edit className="w-6 h-6 text-brand-orange" />
                {formData.id ? "Edit Template" : "New Template"}
              </h2>
              <button onClick={() => setModalOpen(false)} className="text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 p-2 rounded-full transition-all">
                <X className="w-6 h-6" />
              </button>
            </div>
            
            <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden relative z-10">
              <div className="grid grid-cols-2 gap-6 mb-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Template Name *</label>
                  <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} placeholder="e.g. Quotation Email" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-orange/50 outline-none transition-all shadow-inner" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">Type *</label>
                  <select value={formData.type} onChange={e => setFormData({...formData, type: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-orange/50 outline-none transition-all shadow-inner">
                    <option value="EMAIL" className="bg-[#0a0a0a]">Email (HTML)</option>
                    <option value="WHATSAPP" className="bg-[#0a0a0a]">WhatsApp (Text)</option>
                  </select>
                </div>
              </div>
              
              {formData.type === "EMAIL" && (
                <div className="mb-6">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Subject Line</label>
                  <input type="text" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} placeholder="e.g. Quotation for {{company}}" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-orange/50 outline-none transition-all shadow-inner" />
                </div>
              )}
              
              <div className="flex-1 flex gap-6 overflow-hidden min-h-0">
                {/* Left Side: Editor */}
                <div className="flex-1 flex flex-col min-h-0">
                  <label className="block text-sm font-medium text-slate-300 mb-2 flex justify-between items-end">
                    <span>Message Body</span>
                    <span className="text-xs text-brand-orange bg-brand-orange/10 px-2 py-1 rounded-md border border-brand-orange/20">Supports placeholders like {`{{name}}, {{company}}`}</span>
                  </label>
                  {formData.type === "EMAIL" ? (
                    <div className="flex-1 overflow-hidden rounded-xl bg-white text-black shadow-xl border border-white/10">
                      <ReactQuill 
                        theme="snow" 
                        value={formData.body} 
                        onChange={val => setFormData({...formData, body: val})} 
                        className="h-full flex flex-col [&>.ql-container]:flex-1 [&>.ql-container]:overflow-y-auto"
                        modules={{
                          toolbar: [
                            [{ 'header': [1, 2, 3, false] }],
                            ['bold', 'italic', 'underline', 'strike', 'blockquote'],
                            [{'list': 'ordered'}, {'list': 'bullet'}],
                            ['link', 'image'],
                            ['clean']
                          ]
                        }}
                      />
                    </div>
                  ) : (
                    <textarea 
                      required 
                      value={formData.body} 
                      onChange={e => setFormData({...formData, body: e.target.value})} 
                      className="flex-1 w-full bg-black/40 border border-white/10 rounded-xl px-4 py-4 text-white focus:ring-2 focus:ring-brand-orange/50 outline-none resize-none shadow-inner"
                      placeholder="Hello {{name}}, here are our banking details..."
                    />
                  )}
                </div>

                {/* Right Side: Live Standardized Preview */}
                {formData.type === "EMAIL" && (
                  <div className="flex-1 flex flex-col min-h-0 border-l border-white/10 pl-6">
                     <label className="block text-sm font-medium text-slate-300 mb-2">Live Standardized Preview</label>
                     <div className="flex-1 overflow-y-auto rounded-xl bg-white border border-slate-200 shadow-xl email-preview-container">
                       <div 
                         dangerouslySetInnerHTML={{ 
                           __html: require('@/lib/emailTemplate').wrapInEmailTemplate(
                             formData.subject || "No Subject", 
                             formData.body || "<p class='text-slate-400 italic text-center my-10'>Start typing to see preview...</p>", 
                             "customer@example.com"
                           ) 
                         }} 
                       />
                     </div>
                  </div>
                )}
              </div>
              
              <div className="pt-6 border-t border-white/10 flex justify-end gap-4 mt-auto">
                <button type="button" onClick={() => setModalOpen(false)} className="px-6 py-3 rounded-xl text-slate-300 hover:text-white bg-white/5 hover:bg-white/10 transition-all font-medium">Cancel</button>
                <button type="submit" disabled={loading} className="px-6 py-3 rounded-xl bg-gradient-to-r from-brand-orange to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold transition-all disabled:opacity-50 shadow-lg shadow-brand-orange/30 transform hover:-translate-y-0.5">
                  {loading ? "Saving..." : "Save Template"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
