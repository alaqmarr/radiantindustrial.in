"use client";

import { useState, useRef, useEffect } from "react";
import { saveTemplate, deleteTemplate } from "../../actions";
import { Plus, Trash2, Edit, X, Mail, Type, AlertCircle, Info, PenTool, AlertTriangle, Table, List, Sparkles, Quote, Code, Bold, Italic, Underline, AlignLeft, AlignCenter, AlignRight, Link2, List as ListIcon, ListOrdered } from "lucide-react";
import "react-quill-new/dist/quill.snow.css";

const NativeHtmlEditor = ({ value, onChange }: { value: string, onChange: (val: string) => void }) => {
  const editorRef = useRef<HTMLDivElement>(null);

  // Sync external value to editor only if different, avoiding cursor jumps
  useEffect(() => {
    if (editorRef.current && editorRef.current.innerHTML !== value) {
      editorRef.current.innerHTML = value;
    }
  }, [value]);

  const handleInput = () => {
    if (editorRef.current) {
      onChange(editorRef.current.innerHTML);
    }
  };

  const execCmd = (cmd: string, val?: string) => {
    document.execCommand(cmd, false, val);
    handleInput();
  };

  return (
    <div className="flex-1 flex flex-col bg-white text-black h-full overflow-hidden rounded-xl border border-white/10 shadow-xl">
      {/* Toolbar */}
      <div className="flex flex-wrap items-center gap-1 p-2 bg-slate-100 border-b border-slate-200">
        <button type="button" onMouseDown={e => { e.preventDefault(); execCmd('bold'); }} className="p-1.5 hover:bg-slate-200 rounded text-slate-700 transition-colors" title="Bold"><Bold size={16}/></button>
        <button type="button" onMouseDown={e => { e.preventDefault(); execCmd('italic'); }} className="p-1.5 hover:bg-slate-200 rounded text-slate-700 transition-colors" title="Italic"><Italic size={16}/></button>
        <button type="button" onMouseDown={e => { e.preventDefault(); execCmd('underline'); }} className="p-1.5 hover:bg-slate-200 rounded text-slate-700 transition-colors" title="Underline"><Underline size={16}/></button>
        <div className="w-px h-5 bg-slate-300 mx-1"></div>
        <button type="button" onMouseDown={e => { e.preventDefault(); execCmd('justifyLeft'); }} className="p-1.5 hover:bg-slate-200 rounded text-slate-700 transition-colors"><AlignLeft size={16}/></button>
        <button type="button" onMouseDown={e => { e.preventDefault(); execCmd('justifyCenter'); }} className="p-1.5 hover:bg-slate-200 rounded text-slate-700 transition-colors"><AlignCenter size={16}/></button>
        <button type="button" onMouseDown={e => { e.preventDefault(); execCmd('justifyRight'); }} className="p-1.5 hover:bg-slate-200 rounded text-slate-700 transition-colors"><AlignRight size={16}/></button>
        <div className="w-px h-5 bg-slate-300 mx-1"></div>
        <button type="button" onMouseDown={e => { e.preventDefault(); execCmd('insertUnorderedList'); }} className="p-1.5 hover:bg-slate-200 rounded text-slate-700 transition-colors"><ListIcon size={16}/></button>
        <button type="button" onMouseDown={e => { e.preventDefault(); execCmd('insertOrderedList'); }} className="p-1.5 hover:bg-slate-200 rounded text-slate-700 transition-colors"><ListOrdered size={16}/></button>
        <div className="w-px h-5 bg-slate-300 mx-1"></div>
        <button type="button" onMouseDown={e => { 
          e.preventDefault(); 
          const url = prompt('Enter link URL:');
          if (url) execCmd('createLink', url);
        }} className="p-1.5 hover:bg-slate-200 rounded text-slate-700 transition-colors"><Link2 size={16}/></button>
      </div>
      
      {/* Editor Area */}
      <div 
        ref={editorRef}
        contentEditable
        onInput={handleInput}
        onBlur={handleInput}
        className="flex-1 overflow-y-auto p-5 outline-none text-[15px] leading-relaxed max-w-none email-content-area"
        style={{ fontFamily: "'Inter', sans-serif" }}
      />
    </div>
  );
};

export default function TemplateManager({ templates }: { templates: any[] }) {
  const [isModalOpen, setModalOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [isHtmlMode, setIsHtmlMode] = useState(false);
  
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
              <div className="grid grid-cols-2 gap-6 mb-4 shrink-0">
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
                <div className="mb-4 shrink-0">
                  <label className="block text-sm font-medium text-slate-300 mb-2">Subject Line</label>
                  <input type="text" value={formData.subject} onChange={e => setFormData({...formData, subject: e.target.value})} placeholder="e.g. Quotation for {{company}}" className="w-full bg-black/40 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-orange/50 outline-none transition-all shadow-inner" />
                </div>
              )}
              
              <div className="flex-1 flex gap-6 overflow-hidden min-h-0">
                {/* Left Side: Editor */}
                <div className="flex-1 flex flex-col min-h-0">
                  <div className="flex justify-between items-end mb-2 shrink-0">
                    <label className="block text-sm font-medium text-slate-300">Message Body</label>
                    <div className="flex items-center gap-3">
                      <span className="text-xs text-brand-orange bg-brand-orange/10 px-2 py-1 rounded-md border border-brand-orange/20">Supports placeholders like {`{{name}}, {{company}}`}</span>
                      <button type="button" onClick={() => setIsHtmlMode(!isHtmlMode)} className={`text-xs px-3 py-1 rounded-md border transition-all flex items-center gap-1.5 ${isHtmlMode ? 'bg-brand-orange text-white border-brand-orange' : 'bg-white/5 hover:bg-white/10 border-white/10 text-slate-300'}`}>
                        <Code className="w-3.5 h-3.5" /> HTML Mode
                      </button>
                    </div>
                  </div>
                  
                  {/* Snippet Buttons */}
                  {formData.type === "EMAIL" && (
                    <div className="flex flex-wrap gap-2 mb-3 shrink-0">
                      <button type="button" onClick={() => setFormData(prev => ({...prev, body: prev.body + `<h2 class="content-heading" style="color: #1a202c; margin-top: 0; font-size: 22px; font-weight: 700;">Section Heading</h2><p style="color: #2d3748; font-size: 15px; line-height: 1.7;">Start typing here...</p>`}))} className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 shadow-sm hover:shadow-black/20 hover:border-white/20"><Type className="w-3.5 h-3.5 text-brand-orange" /> Heading</button>
                      <button type="button" onClick={() => setFormData(prev => ({...prev, body: prev.body + `<div class="callout-box" style="background-color: #faf8f5; border-left: 4px solid #ea580c; padding: 16px 20px; margin: 25px 0; border-radius: 0 6px 6px 0;"><p style="margin: 0; color: #4a4238; font-style: italic; font-size: 14px;">Important callout text here...</p></div><p style="color: #2d3748; font-size: 15px; line-height: 1.7;">&nbsp;</p>`}))} className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 shadow-sm hover:shadow-black/20 hover:border-white/20"><AlertCircle className="w-3.5 h-3.5 text-brand-orange" /> Orange Callout</button>
                      <button type="button" onClick={() => setFormData(prev => ({...prev, body: prev.body + `<div class="callout-box" style="background-color: #f0fdf4; border-left: 4px solid #22c55e; padding: 20px; margin: 25px 0; border-radius: 0 8px 8px 0;"><h3 style="color: #166534; margin: 0 0 10px 0; font-size: 16px; font-weight: 700;">Information Summary</h3><p style="margin: 0; color: #14532d; font-size: 14px;">Details go here...</p></div><p style="color: #2d3748; font-size: 15px; line-height: 1.7;">&nbsp;</p>`}))} className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 shadow-sm hover:shadow-black/20 hover:border-white/20"><Info className="w-3.5 h-3.5 text-green-500" /> Green Info Box</button>
                      <button type="button" onClick={() => setFormData(prev => ({...prev, body: prev.body + `<div class="callout-box" style="background-color: #fff1f2; border-left: 4px solid #e11d48; padding: 16px 20px; margin: 30px 0; border-radius: 0 6px 6px 0;"><p style="margin: 0; color: #9f1239; font-size: 14px; line-height: 1.6;"><strong>Critical alert:</strong> Please pay attention to this.</p></div><p style="color: #2d3748; font-size: 15px; line-height: 1.7;">&nbsp;</p>`}))} className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 shadow-sm hover:shadow-black/20 hover:border-white/20"><AlertTriangle className="w-3.5 h-3.5 text-red-500" /> Red Alert</button>
                      <button type="button" onClick={() => setFormData(prev => ({...prev, body: prev.body + `<div style="background-color: #faf9f7; border: 1px solid #e8e2d9; padding: 20px; margin: 25px 0; border-radius: 8px;"><table class="responsive-table" width="100%" border="0" cellspacing="0" cellpadding="0" style="font-family: 'Inter', sans-serif;"><tr><td style="color: #718096; font-weight: 600; width: 40%; font-size: 14px; padding-bottom: 8px;">Label 1:</td><td style="color: #1a202c; padding-bottom: 8px; font-size: 14px;"><strong>Value 1</strong></td></tr><tr><td style="color: #718096; font-weight: 600; width: 40%; font-size: 14px;">Label 2:</td><td style="color: #1a202c; font-size: 14px;"><strong>Value 2</strong></td></tr></table></div><p style="color: #2d3748; font-size: 15px; line-height: 1.7;">&nbsp;</p>`}))} className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 shadow-sm hover:shadow-black/20 hover:border-white/20"><Table className="w-3.5 h-3.5 text-blue-400" /> Info Table</button>
                      <button type="button" onClick={() => setFormData(prev => ({...prev, body: prev.body + `<table class="responsive-table" width="100%" border="0" cellspacing="0" cellpadding="0" style="margin: 30px 0; border: 1px solid #e8e2d9; border-radius: 8px; overflow: hidden; font-family: 'Inter', sans-serif;"><tr><td width="35%" style="background-color: #faf9f7; padding: 16px; border-right: 1px solid #e8e2d9; border-bottom: 1px solid #e8e2d9; font-weight: 600; color: #718096; font-size: 14px;">Row 1 Label</td><td width="65%" style="padding: 16px; border-bottom: 1px solid #e8e2d9; color: #1a202c; font-weight: 700; font-size: 14px;">Row 1 Value</td></tr><tr><td width="35%" style="background-color: #faf9f7; padding: 16px; border-right: 1px solid #e8e2d9; font-weight: 600; color: #718096; font-size: 14px;">Row 2 Label</td><td width="65%" style="padding: 16px; color: #1a202c; font-weight: 700; font-size: 14px;">Row 2 Value</td></tr></table><p style="color: #2d3748; font-size: 15px; line-height: 1.7;">&nbsp;</p>`}))} className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 shadow-sm hover:shadow-black/20 hover:border-white/20"><List className="w-3.5 h-3.5 text-purple-400" /> Summary Table</button>
                      <button type="button" onClick={() => setFormData(prev => ({...prev, body: prev.body + `<div style="text-align: center; margin-bottom: 30px;"><div style="font-size: 48px; line-height: 1; margin-bottom: 15px;">✨</div><h2 class="content-heading" style="color: #ea580c; margin-top: 0; font-size: 26px; font-weight: 800; letter-spacing: 1px;">Happy Occasion!</h2></div><p style="color: #2d3748; font-size: 15px; line-height: 1.7;">&nbsp;</p>`}))} className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 shadow-sm hover:shadow-black/20 hover:border-white/20"><Sparkles className="w-3.5 h-3.5 text-yellow-500" /> Festival Header</button>
                      <button type="button" onClick={() => setFormData(prev => ({...prev, body: prev.body + `<div style="background-color: #faf8f5; padding: 25px; border-radius: 12px; border: 1px solid #e8e2d9; text-align: center; margin: 30px 0;"><p style="margin: 0; font-style: italic; color: #ea580c; font-size: 17px; font-weight: 600; line-height: 1.6;">"Inspiring quote goes here."</p></div><p style="color: #2d3748; font-size: 15px; line-height: 1.7;">&nbsp;</p>`}))} className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 shadow-sm hover:shadow-black/20 hover:border-white/20"><Quote className="w-3.5 h-3.5 text-brand-orange" /> Quote Block</button>
                      <button type="button" onClick={() => setFormData(prev => ({...prev, body: prev.body + `<div class="signature-block" style="border-top: 1px solid #e8e2d9; padding-top: 20px; margin-top: 30px;"><p style="margin: 0; color: #2d3748; font-size: 15px; line-height: 1.6;">Best Regards,<br><strong style="color: #1a202c;">Your Department</strong><br><span style="color: #718096;">Radiant Industrial Co.</span></p></div>`}))} className="text-xs bg-white/5 hover:bg-white/10 border border-white/10 text-slate-300 px-3 py-1.5 rounded-md transition-colors flex items-center gap-1.5 shadow-sm hover:shadow-black/20 hover:border-white/20"><PenTool className="w-3.5 h-3.5 text-slate-400" /> Signature</button>
                    </div>
                  )}

                  {formData.type === "EMAIL" ? (
                    <div className="flex-1 overflow-hidden min-h-0 relative flex flex-col">
                      {isHtmlMode ? (
                        <textarea 
                          value={formData.body} 
                          onChange={(e) => setFormData({...formData, body: e.target.value})} 
                          className="flex-1 w-full p-4 bg-[#0f172a] text-slate-300 font-mono text-[13px] resize-none outline-none leading-relaxed rounded-xl border border-white/10 shadow-xl"
                          placeholder="Write your HTML here..." 
                          spellCheck={false}
                        />
                      ) : (
                        <NativeHtmlEditor 
                          value={formData.body}
                          onChange={val => setFormData({...formData, body: val})}
                        />
                      )}
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
