"use client";

import { useState, useMemo } from "react";
import dynamic from 'next/dynamic';
import { sendCampaignEmails } from "../../actions";
import { Send, MessageCircle, Users, User, PlusCircle } from "lucide-react";
import 'react-quill-new/dist/quill.snow.css';

const ReactQuill = dynamic(() => import('react-quill-new'), { ssr: false });

export default function CampaignManager({ templates, tags, contacts, globalSettings = {} }: { templates: any[], tags: any[], contacts: any[], globalSettings?: Record<string, string> }) {
  const [sendMode, setSendMode] = useState<"BULK" | "INDIVIDUAL" | "QUICK_ADD">("BULK");
  const [selectedTemplate, setSelectedTemplate] = useState("");
  const [selectedTag, setSelectedTag] = useState("");
  const [selectedContactId, setSelectedContactId] = useState("");
  
  // Dynamic variables
  const [dynamicVars, setDynamicVars] = useState<Record<string, string>>({});
  const [richTextMode, setRichTextMode] = useState<Record<string, boolean>>({});
  
  // Quick Add manual contact
  const [manualContact, setManualContact] = useState({ name: "", email: "", phone: "", company: "", gstNumber: "", saveContact: false });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState<any>(null);

  const template = templates.find(t => t.id === selectedTemplate);
  const isWhatsApp = template?.type === "WHATSAPP";

  let targetContacts = contacts;
  if (sendMode === "INDIVIDUAL") {
    targetContacts = selectedContactId ? contacts.filter(c => c.id === selectedContactId) : [];
  } else if (sendMode === "QUICK_ADD") {
    targetContacts = [manualContact as any];
  } else {
    targetContacts = selectedTag 
      ? contacts.filter(c => c.tags.some((ct: any) => ct.tagId === selectedTag))
      : contacts;
  }

  // Detect dynamic variables inside template subject/body
  const detectedVariables = useMemo(() => {
    if (!template) return [];
    const textToScan = (template.subject || "") + " " + (template.body || "");
    const regex = /\{\{(.*?)\}\}/g;
    const matches = new Set<string>();
    let match;
    while ((match = regex.exec(textToScan)) !== null) {
      const v = match[1];
      // Exclude reserved ones and global settings
      if (!v.startsWith("my_") && !["name", "company", "gstNumber", "phone", "email"].includes(v)) {
        matches.add(v);
      }
    }
    return Array.from(matches);
  }, [template]);

  const replacePlaceholders = (text: string, contact: any) => {
    let res = text
      .replace(/\{\{name\}\}/g, contact.name || "Customer")
      .replace(/\{\{company\}\}/g, contact.company || "your company")
      .replace(/\{\{gstNumber\}\}/g, contact.gstNumber || "")
      .replace(/\{\{phone\}\}/g, contact.phone || "")
      .replace(/\{\{email\}\}/g, contact.email || "");

    // Global settings
    Object.keys(globalSettings).forEach(key => {
      res = res.replace(new RegExp(`\\{\\{my_${key}\\}\\}`, 'g'), globalSettings[key]);
    });

    // Dynamic user variables
    Object.keys(dynamicVars).forEach(key => {
      res = res.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), dynamicVars[key] || `[${key}]`);
    });
    
    // Replace un-filled dynamic vars with a placeholder
    detectedVariables.forEach(key => {
       if (!dynamicVars[key]) {
         res = res.replace(new RegExp(`\\{\\{${key}\\}\\}`, 'g'), `[${key}]`);
       }
    });

    // Make pasted HTML tables look professional and match the email styling
    res = res.replace(/<table/gi, '<table style="width: 100%; border-collapse: collapse; margin: 20px 0; font-family: \'Inter\', -apple-system, BlinkMacSystemFont, \'Segoe UI\', Roboto, sans-serif; font-size: 14px; text-align: left; background-color: #ffffff; border: 1px solid #e8e2d9;"');
    res = res.replace(/<thead/gi, '<thead style="border-bottom: 2px solid #e8e2d9;"');
    res = res.replace(/<th/gi, '<th style="background-color: #1e293b; color: #ffffff; font-weight: 600; padding: 12px 16px; border: 1px solid #e8e2d9; text-transform: uppercase; font-size: 12px; letter-spacing: 0.5px;"');
    res = res.replace(/<td/gi, '<td style="padding: 12px 16px; border: 1px solid #e8e2d9; color: #2d3748;"');

    return res;
  };

  const handleSendEmails = async () => {
    if (sendMode === "QUICK_ADD" && (!manualContact.name || !manualContact.email)) {
       setResult({ type: "error", message: "Name and Email are required for Quick Add." });
       return;
    }
    if (!confirm(`Are you sure you want to send this email to ${targetContacts.length} contact(s)?`)) return;
    
    setLoading(true);
    setResult(null);
    
    const res = await sendCampaignEmails(
      selectedTemplate, 
      sendMode === "BULK" ? selectedTag || null : null, 
      dynamicVars, 
      sendMode === "INDIVIDUAL" ? selectedContactId : null,
      sendMode === "QUICK_ADD" ? manualContact : null
    );
    
    if (res.error) {
      setResult({ type: "error", message: res.error });
    } else {
      setResult({ type: "success", message: `Campaign completed! Successfully sent: ${res.sent}, Failed: ${res.failed}` });
      if (sendMode === "QUICK_ADD" && manualContact.saveContact) {
        // Just refresh the page to show new contact, or it doesn't matter much.
        window.location.reload();
      }
    }
    setLoading(false);
  };

  return (
    <div className="space-y-6 pb-20">
      <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">Messaging & Campaigns</h1>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 h-fit space-y-6 shadow-2xl relative overflow-hidden">
          <div className="absolute top-0 right-0 w-32 h-32 bg-brand-orange/10 blur-[50px] -z-10 rounded-full"></div>
          <h2 className="text-xl font-bold text-white flex items-center gap-2"><Send className="w-5 h-5 text-brand-orange" /> Configuration</h2>
          
          {/* Send Mode Toggle */}
          <div className="grid grid-cols-3 gap-1 bg-black/40 p-1 rounded-xl border border-white/5 shadow-inner backdrop-blur-md">
            <button 
              onClick={() => { setSendMode("BULK"); setResult(null); }}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 ${sendMode === "BULK" ? 'bg-gradient-to-r from-brand-orange to-orange-600 text-white shadow-lg shadow-brand-orange/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <Users className="w-4 h-4" /> <span>Bulk</span>
            </button>
            <button 
              onClick={() => { setSendMode("INDIVIDUAL"); setResult(null); }}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 ${sendMode === "INDIVIDUAL" ? 'bg-gradient-to-r from-brand-orange to-orange-600 text-white shadow-lg shadow-brand-orange/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <User className="w-4 h-4" /> <span>Individual</span>
            </button>
            <button 
              onClick={() => { setSendMode("QUICK_ADD"); setResult(null); }}
              className={`flex flex-col sm:flex-row items-center justify-center gap-1 sm:gap-2 py-2.5 text-xs sm:text-sm font-medium rounded-lg transition-all duration-300 ${sendMode === "QUICK_ADD" ? 'bg-gradient-to-r from-brand-orange to-orange-600 text-white shadow-lg shadow-brand-orange/20' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}
            >
              <PlusCircle className="w-4 h-4" /> <span>Quick Add</span>
            </button>
          </div>

          <div>
            <label className="block text-sm font-medium text-slate-300 mb-1">Select Template</label>
            <select 
              value={selectedTemplate} 
              onChange={e => { setSelectedTemplate(e.target.value); setResult(null); setDynamicVars({}); }}
              className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-orange/50 outline-none backdrop-blur-sm transition-all"
            >
              <option value="" className="bg-slate-900">-- Choose a template --</option>
              {templates.map(t => (
                <option key={t.id} value={t.id} className="bg-slate-900">{t.name} ({t.type})</option>
              ))}
            </select>
          </div>

          {/* Dynamic Variables Inputs */}
          {detectedVariables.length > 0 && (
            <div className="bg-brand-orange/5 border border-brand-orange/20 p-4 rounded-xl space-y-4 backdrop-blur-md">
              <h3 className="text-sm font-bold text-brand-orange drop-shadow-sm">✨ Template Variables Detected</h3>
              {detectedVariables.map(v => {
                const isRichText = richTextMode[v] !== false && (richTextMode[v] || v.toLowerCase().includes('table'));
                return (
                  <div key={v} className="space-y-1">
                    <div className="flex justify-between items-center mb-1">
                      <label className="block text-xs font-medium text-brand-orange/80 capitalize">{v.replace(/_/g, ' ')}</label>
                      <button 
                        onClick={() => setRichTextMode(prev => ({...prev, [v]: !isRichText}))}
                        className="text-[10px] bg-brand-orange/10 px-2 py-1 rounded text-brand-orange/80 hover:text-brand-orange hover:bg-brand-orange/20 transition-colors"
                      >
                        {isRichText ? "Switch to Plain Text" : "Switch to Rich Text (Paste Tables)"}
                      </button>
                    </div>
                    {isRichText ? (
                      <div className="bg-white rounded-lg text-black overflow-hidden border border-brand-orange/30">
                        <ReactQuill 
                          theme="snow"
                          value={dynamicVars[v] || ""} 
                          onChange={val => setDynamicVars(prev => ({...prev, [v]: val}))}
                        />
                      </div>
                    ) : (
                      <input 
                        type="text" 
                        value={dynamicVars[v] || ""} 
                        onChange={e => setDynamicVars(prev => ({...prev, [v]: e.target.value}))}
                        placeholder={`Enter ${v}...`}
                        className="w-full bg-black/40 border border-brand-orange/30 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-brand-orange outline-none text-sm transition-all"
                      />
                    )}
                  </div>
                );
              })}
            </div>
          )}

          {sendMode === "BULK" ? (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Select Audience (Tag)</label>
              <select 
                value={selectedTag} 
                onChange={e => setSelectedTag(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-orange/50 outline-none backdrop-blur-sm transition-all"
              >
                <option value="" className="bg-slate-900">All Contacts ({contacts.length})</option>
                {tags.map(t => (
                  <option key={t.id} value={t.id} className="bg-slate-900">{t.name}</option>
                ))}
              </select>
            </div>
          ) : sendMode === "INDIVIDUAL" ? (
            <div>
              <label className="block text-sm font-medium text-slate-300 mb-1">Select Contact</label>
              <select 
                value={selectedContactId} 
                onChange={e => setSelectedContactId(e.target.value)}
                className="w-full bg-black/20 border border-white/10 rounded-xl px-4 py-3 text-white focus:ring-2 focus:ring-brand-orange/50 outline-none backdrop-blur-sm transition-all"
              >
                <option value="" className="bg-slate-900">-- Choose a contact --</option>
                {contacts.map(c => (
                  <option key={c.id} value={c.id} className="bg-slate-900">{c.name} ({c.company || 'No Company'})</option>
                ))}
              </select>
            </div>
          ) : (
            <div className="space-y-3 p-5 bg-black/20 rounded-xl border border-white/5 backdrop-blur-md">
              <h3 className="text-sm font-bold text-slate-200">Quick Add Client</h3>
              <input type="text" placeholder="Full Name *" value={manualContact.name} onChange={e => setManualContact({...manualContact, name: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-brand-orange/50 outline-none text-sm transition-all" />
              <input type="email" placeholder="Email Address *" value={manualContact.email} onChange={e => setManualContact({...manualContact, email: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-brand-orange/50 outline-none text-sm transition-all" />
              <input type="text" placeholder="Phone (e.g. 9876543210)" value={manualContact.phone} onChange={e => setManualContact({...manualContact, phone: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-brand-orange/50 outline-none text-sm transition-all" />
              <input type="text" placeholder="Company Name" value={manualContact.company} onChange={e => setManualContact({...manualContact, company: e.target.value})} className="w-full bg-black/40 border border-white/10 rounded-lg px-3 py-2 text-white focus:ring-2 focus:ring-brand-orange/50 outline-none text-sm transition-all" />
              <div className="flex items-center gap-2 mt-3 pt-3 border-t border-white/5">
                 <input type="checkbox" id="saveContact" checked={manualContact.saveContact} onChange={e => setManualContact({...manualContact, saveContact: e.target.checked})} className="rounded text-brand-orange focus:ring-brand-orange bg-black/40 border-white/20" />
                 <label htmlFor="saveContact" className="text-sm text-slate-400 cursor-pointer hover:text-slate-300">Save to Contacts Database</label>
              </div>
            </div>
          )}

          <div className="pt-4 border-t border-white/10">
            {sendMode !== "QUICK_ADD" && (
              <div className="text-sm text-slate-400 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-brand-orange animate-pulse"></span>
                <strong>{targetContacts.length}</strong> recipient(s) selected.
              </div>
            )}
            
            {template && !isWhatsApp && (
              <button 
                onClick={handleSendEmails}
                disabled={loading || (sendMode !== "QUICK_ADD" && targetContacts.length === 0)}
                className="w-full bg-gradient-to-r from-brand-orange to-orange-600 hover:from-orange-500 hover:to-orange-700 text-white font-bold py-3.5 rounded-xl flex justify-center items-center gap-2 transition-all duration-300 disabled:opacity-50 shadow-lg shadow-brand-orange/30 hover:shadow-brand-orange/50 transform hover:-translate-y-0.5"
              >
                {loading ? "Sending..." : <><Send className="w-5 h-5" /> Send Emails Now</>}
              </button>
            )}

            {result && (
              <div className={`mt-4 p-4 rounded-xl text-sm font-medium border backdrop-blur-md ${result.type === 'error' ? 'bg-red-500/10 text-red-400 border-red-500/20' : 'bg-green-500/10 text-green-400 border-green-500/20'}`}>
                {result.message}
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-2 bg-white/5 border border-white/10 backdrop-blur-xl rounded-2xl p-6 shadow-2xl flex flex-col relative overflow-hidden">
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-orange-600/5 blur-[80px] -z-10 rounded-full"></div>
          <h2 className="text-xl font-bold text-white mb-6 drop-shadow-md">Preview & Execution</h2>
          
          {!template ? (
            <div className="flex-1 flex flex-col items-center justify-center border-2 border-dashed border-white/10 rounded-2xl text-slate-500 bg-black/20 p-12 backdrop-blur-sm">
              <MessageCircle className="w-12 h-12 mb-4 text-white/20" />
              <p className="font-medium text-lg text-slate-400">Select a template to preview.</p>
              <p className="text-sm">You can view exactly what your customer will see before sending.</p>
            </div>
          ) : (
            <div className="space-y-6 flex-1 flex flex-col">
              {/* Preview Window */}
              <div className="bg-black/40 rounded-2xl p-1 border border-white/10 shadow-inner flex-1 flex flex-col backdrop-blur-md">
                <div className="bg-white/5 border-b border-white/10 px-4 py-3 rounded-t-xl flex items-center gap-3">
                  <div className="flex gap-1.5">
                    <div className="w-3 h-3 rounded-full bg-red-500/50 border border-red-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500/50 border border-yellow-500/50"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500/50 border border-green-500/50"></div>
                  </div>
                  <div className="text-xs font-medium text-slate-400 uppercase tracking-widest flex-1 text-center">
                    {isWhatsApp ? 'WhatsApp Preview' : 'Email Inbox Preview'}
                  </div>
                </div>
                
                <div className="p-4 md:p-6 overflow-y-auto max-h-[500px]">
                  {template.subject && (
                    <div className="mb-6 pb-4 border-b border-white/10">
                      <div className="text-xs text-brand-orange/80 font-semibold mb-1 uppercase tracking-wider">Subject:</div>
                      <div className="font-bold text-white text-lg drop-shadow-sm">{replacePlaceholders(template.subject, targetContacts[0] || {})}</div>
                    </div>
                  )}
                  
                  {isWhatsApp ? (
                    <div className="flex">
                      <div className="whitespace-pre-wrap text-[#e9edef] font-sans text-[15px] bg-[#005c4b] px-4 py-3 rounded-xl rounded-tr-none shadow-md max-w-sm ml-auto relative">
                        {replacePlaceholders(template.body, targetContacts[0] || {})}
                        <div className="text-[10px] text-right text-white/60 mt-1">Just now ✓✓</div>
                      </div>
                    </div>
                  ) : (
                    <div className="bg-white text-slate-800 email-preview-container rounded-xl overflow-hidden shadow-lg border border-slate-200" dangerouslySetInnerHTML={{ __html: require('@/lib/emailTemplate').wrapInEmailTemplate(template.subject || "No Subject", replacePlaceholders(template.body, targetContacts[0] || {}), targetContacts[0]?.email || "customer@example.com") }} />
                  )}
                </div>
              </div>

              {/* WhatsApp Dispatch List */}
              {isWhatsApp && (
                <div className="mt-6">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <h3 className="text-sm font-bold text-slate-200 uppercase tracking-wider flex items-center gap-2">
                        <MessageCircle className="w-4 h-4 text-[#25D366]" /> Manual Dispatch List
                      </h3>
                      <p className="text-xs text-slate-400 mt-1">WhatsApp Web will open for each individual contact.</p>
                    </div>
                  </div>
                  
                  <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
                    {targetContacts.length === 0 || (sendMode === "QUICK_ADD" && !manualContact.name) ? (
                      <div className="text-sm text-slate-500 text-center py-6 bg-black/20 rounded-xl border border-white/5 backdrop-blur-sm">
                        No valid contacts to show.
                      </div>
                    ) : targetContacts.map((contact, i) => {
                      // If it's a manual contact and hasn't been saved yet, it might not have an ID, use index
                      const key = contact.id || `manual-${i}`;
                      if (!contact.phone) return (
                        <div key={key} className="text-sm text-red-300 p-4 bg-red-500/10 border border-red-500/20 rounded-xl backdrop-blur-sm">
                          Contact <span className="font-bold">{contact.name || 'Unknown'}</span> does not have a phone number.
                        </div>
                      );
                      
                      const message = encodeURIComponent(replacePlaceholders(template.body, contact));
                      let phone = contact.phone.replace(/[^0-9]/g, '');
                      if (phone.length === 10) phone = '91' + phone;

                      const link = `https://wa.me/${phone}?text=${message}`;

                      return (
                        <div key={key} className="flex justify-between items-center bg-black/30 p-4 rounded-xl border border-white/10 hover:border-brand-orange/50 transition-all duration-300 group hover:shadow-lg hover:shadow-brand-orange/5 backdrop-blur-sm">
                          <div>
                            <div className="text-white font-bold">{contact.name}</div>
                            <div className="text-xs text-slate-400 font-medium mt-0.5">{contact.company || 'No Company'} &bull; {contact.phone}</div>
                          </div>
                          <a 
                            href={link} 
                            target="_blank" 
                            rel="noopener noreferrer"
                            onClick={() => {
                              if (sendMode === "QUICK_ADD" && manualContact.saveContact) {
                                handleSendEmails(); // Trigger save
                              }
                            }}
                            className="bg-[#25D366]/10 border border-[#25D366]/20 text-[#25D366] hover:bg-[#25D366] hover:text-white px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2 transition-all shadow-sm transform hover:-translate-y-0.5"
                          >
                            <MessageCircle className="w-4 h-4" /> Open WhatsApp
                          </a>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
