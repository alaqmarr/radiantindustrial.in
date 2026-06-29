"use client";

import { useState, useRef, useEffect } from "react";
import {
  Eye,
  Monitor,
  Tablet,
  Smartphone,
  Mail,
  Calendar,
  Inbox,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

interface TemplateData {
  id: string;
  name: string;
  subject: string;
  body: string;
  type: string;
  createdAt: string;
  wrappedHtml: string;
}

const DEVICE_SIZES = [
  { key: "desktop", label: "Desktop", width: 600, icon: Monitor },
  { key: "tablet", label: "Tablet", width: 480, icon: Tablet },
  { key: "mobile", label: "Mobile", width: 320, icon: Smartphone },
] as const;

export default function TemplatePreviewGallery({
  templates,
}: {
  templates: TemplateData[];
}) {
  const [activeIndex, setActiveIndex] = useState(0);
  const [device, setDevice] = useState<"desktop" | "tablet" | "mobile">(
    "desktop"
  );
  const [transitioning, setTransitioning] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const iframeRef = useRef<HTMLIFrameElement>(null);

  const active = templates[activeIndex];
  const currentWidth = DEVICE_SIZES.find((d) => d.key === device)!.width;

  // Smooth transition when switching templates
  const switchTemplate = (index: number) => {
    if (index === activeIndex || transitioning) return;
    setTransitioning(true);
    setTimeout(() => {
      setActiveIndex(index);
      setTimeout(() => setTransitioning(false), 50);
    }, 200);
  };

  // Scroll the pills container
  const scrollPills = (direction: "left" | "right") => {
    if (scrollRef.current) {
      scrollRef.current.scrollBy({
        left: direction === "left" ? -200 : 200,
        behavior: "smooth",
      });
    }
  };

  // Auto-resize iframe height
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe) return;
    const handleLoad = () => {
      try {
        const doc = iframe.contentDocument;
        if (doc) {
          iframe.style.height =
            doc.documentElement.scrollHeight + 40 + "px";
        }
      } catch {
        // cross-origin fallback
      }
    };
    iframe.addEventListener("load", handleLoad);
    return () => iframe.removeEventListener("load", handleLoad);
  }, [activeIndex, device]);

  if (templates.length === 0) {
    return (
      <div className="space-y-6 pb-20">
        <div className="flex items-center gap-3 relative z-10">
          <Eye className="w-8 h-8 text-brand-orange" />
          <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">
            Email Template Gallery
          </h1>
        </div>
        <div className="col-span-full p-16 text-center border-2 border-dashed border-white/10 rounded-2xl bg-black/20 backdrop-blur-sm">
          <Inbox className="w-16 h-16 text-white/10 mx-auto mb-4" />
          <p className="text-slate-400 font-medium text-lg">
            No templates yet. Create your first template to see it here!
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-20">
      {/* Header */}
      <div className="relative z-10">
        <div className="flex items-center gap-3 mb-1">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-brand-orange to-orange-600 flex items-center justify-center shadow-lg shadow-brand-orange/20">
            <Eye className="w-5 h-5 text-white" />
          </div>
          <div>
            <h1 className="text-3xl font-bold text-white tracking-tight drop-shadow-md">
              Email Template Gallery
            </h1>
            <p className="text-slate-400 text-sm mt-0.5">
              Preview all {templates.length} templates with realistic email
              client rendering
            </p>
          </div>
        </div>
      </div>

      {/* Template Selector Pills */}
      <div className="relative z-10 flex items-center gap-2">
        <button
          onClick={() => scrollPills("left")}
          className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>

        <div
          ref={scrollRef}
          className="flex-1 flex gap-2 overflow-x-auto scrollbar-hide py-1 px-1"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
        >
          {templates.map((template, i) => (
            <button
              key={template.id}
              onClick={() => switchTemplate(i)}
              className={`flex-shrink-0 px-4 py-2 rounded-full text-sm font-medium transition-all duration-300 border whitespace-nowrap ${
                i === activeIndex
                  ? "bg-gradient-to-r from-brand-orange to-orange-600 text-white border-brand-orange/50 shadow-lg shadow-brand-orange/20"
                  : "bg-white/5 text-slate-400 border-white/10 hover:bg-white/10 hover:text-white hover:border-white/20"
              }`}
            >
              <span className="flex items-center gap-2">
                <span
                  className={`w-2 h-2 rounded-full ${
                    template.type === "EMAIL"
                      ? "bg-blue-400"
                      : "bg-[#25D366]"
                  }`}
                />
                {template.name}
              </span>
            </button>
          ))}
        </div>

        <button
          onClick={() => scrollPills("right")}
          className="flex-shrink-0 w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-slate-400 hover:text-white hover:bg-white/10 transition-all"
        >
          <ChevronRight className="w-4 h-4" />
        </button>
      </div>

      {/* Device Toggle */}
      <div className="relative z-10 flex items-center gap-3">
        <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
          Preview Size
        </span>
        <div className="flex gap-1 bg-white/5 border border-white/10 rounded-xl p-1 backdrop-blur-sm">
          {DEVICE_SIZES.map((d) => (
            <button
              key={d.key}
              onClick={() => setDevice(d.key)}
              className={`flex items-center gap-2 px-3 py-1.5 rounded-lg text-xs font-medium transition-all duration-300 ${
                device === d.key
                  ? "bg-white/10 text-white border border-white/20 shadow-sm"
                  : "text-slate-500 hover:text-slate-300"
              }`}
            >
              <d.icon className="w-3.5 h-3.5" />
              {d.label}
              <span className="text-[10px] text-slate-500">{d.width}px</span>
            </button>
          ))}
        </div>
      </div>

      {/* Main Preview Area */}
      <div className="relative z-10">
        <div className="bg-white/[0.03] border border-white/10 rounded-2xl overflow-hidden backdrop-blur-xl shadow-2xl">
          {/* Fake Email Client Chrome */}
          <div className="bg-white/[0.04] border-b border-white/10 px-6 py-4">
            {/* Window controls */}
            <div className="flex items-center gap-2 mb-4">
              <div className="w-3 h-3 rounded-full bg-red-500/70" />
              <div className="w-3 h-3 rounded-full bg-yellow-500/70" />
              <div className="w-3 h-3 rounded-full bg-green-500/70" />
              <span className="ml-3 text-xs text-slate-500 font-medium">
                Email Preview — {active.name}
              </span>
            </div>

            {/* Email headers */}
            <div className="space-y-2">
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider w-14 text-right">
                  From
                </span>
                <span className="text-sm text-slate-300 font-medium">
                  Radiant Industrial Co.{" "}
                  <span className="text-slate-500">
                    &lt;info@radiantindustrial.in&gt;
                  </span>
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider w-14 text-right">
                  To
                </span>
                <span className="text-sm text-slate-300">
                  customer@example.com
                </span>
              </div>
              <div className="flex items-center gap-3">
                <span className="text-[11px] text-slate-500 font-semibold uppercase tracking-wider w-14 text-right">
                  Subject
                </span>
                <span className="text-sm text-white font-semibold">
                  {active.subject || active.name}
                </span>
              </div>
            </div>
          </div>

          {/* Email Body Preview */}
          <div
            className="flex justify-center p-6 md:p-10 bg-gradient-to-b from-white/[0.02] to-transparent min-h-[500px]"
            style={{
              transition: "all 0.3s ease",
            }}
          >
            <div
              className={`transition-all duration-500 ease-in-out ${
                transitioning
                  ? "opacity-0 scale-[0.98]"
                  : "opacity-100 scale-100"
              }`}
              style={{
                width: `${currentWidth}px`,
                maxWidth: "100%",
              }}
            >
              <div className="rounded-xl overflow-hidden shadow-2xl shadow-black/40 border border-white/10">
                <iframe
                  ref={iframeRef}
                  srcDoc={active.wrappedHtml}
                  title={`Preview: ${active.name}`}
                  className="w-full border-0 bg-white"
                  style={{
                    minHeight: "500px",
                    transition: "width 0.4s ease",
                  }}
                  sandbox="allow-same-origin"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Template Metadata */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4 text-brand-orange" />
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Template Name
            </span>
          </div>
          <p className="text-white font-semibold truncate">{active.name}</p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <span
              className={`w-2 h-2 rounded-full ${
                active.type === "EMAIL" ? "bg-blue-400" : "bg-[#25D366]"
              }`}
            />
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Type
            </span>
          </div>
          <p className="text-white font-semibold">
            {active.type === "EMAIL" ? "Email (HTML)" : "WhatsApp (Text)"}
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Mail className="w-4 h-4 text-brand-orange" />
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Subject
            </span>
          </div>
          <p className="text-white font-semibold truncate">
            {active.subject || "—"}
          </p>
        </div>

        <div className="bg-white/5 border border-white/10 rounded-xl p-4 backdrop-blur-sm">
          <div className="flex items-center gap-2 mb-2">
            <Calendar className="w-4 h-4 text-brand-orange" />
            <span className="text-xs text-slate-500 uppercase tracking-wider font-semibold">
              Created
            </span>
          </div>
          <p className="text-white font-semibold">
            {new Date(active.createdAt).toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </p>
        </div>
      </div>
    </div>
  );
}
