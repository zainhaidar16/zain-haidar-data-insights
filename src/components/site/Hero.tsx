import { ArrowRight, FileText, Database, Layers, CheckCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Hero() {
  return (
    <section className="relative pt-32 md:pt-40 pb-20 md:pb-24 overflow-hidden border-b border-slate-100">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-6 relative z-10">
        {/* Stark Eyebrow */}
        <div className="inline-flex items-center gap-2 rounded border border-slate-200 bg-slate-50 px-3 py-1 text-[10px] font-mono tracking-wider text-slate-600 uppercase mb-8">
          Enterprise Business Intelligence &amp; Analytics
        </div>

        {/* Clean Massive Headline (Zero Gradients, Pure Slate) */}
        <h1 className="font-serif-display text-[44px] sm:text-[62px] md:text-[82px] lg:text-[92px] leading-[1.05] tracking-[-0.035em] font-bold text-slate-900 max-w-5xl">
          Governed Power BI.<br />
          Structured for high-stakes decisions.
        </h1>

        {/* Professional Minimal Subtext */}
        <p className="mt-6 max-w-[700px] text-[15px] md:text-[17px] leading-[1.6] text-slate-500">
          Haidar Analytics engineers clean semantic workspaces, conformed star schemas, and automated data pipelines. We replace fragmented spreadsheets with robust, high-performance reporting architectures that scale.
        </p>

        {/* Flat Minimal Buttons */}
        <div className="mt-8 flex flex-wrap items-center gap-3">
          <Link
            to="/contact"
            className="inline-flex items-center gap-2 rounded bg-slate-900 text-white px-5 py-3 text-[13px] font-medium hover:bg-slate-800 transition active:scale-98"
          >
            Initiate Project
            <ArrowRight className="h-3.5 w-3.5" />
          </Link>
          <a
            href="/cv-zain-haidar.pdf"
            download
            className="inline-flex items-center gap-2 rounded border border-slate-200 bg-white px-5 py-3 text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition active:scale-98"
          >
            <FileText className="h-3.5 w-3.5 text-slate-400" />
            Capabilities PDF
          </a>
        </div>

        {/* Stark parameters line */}
        <div className="mt-12 flex flex-wrap items-center gap-y-2 gap-x-8 text-[11px] font-mono tracking-wider text-slate-400 uppercase">
          <div className="flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-slate-300" /> Star-Schema Data Modeling
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-slate-300" /> Performant DAX Architectures
          </div>
          <div className="flex items-center gap-1.5">
            <CheckCircle className="h-3.5 w-3.5 text-slate-300" /> Orchestrated Data Pipelines
          </div>
        </div>

        {/* Clean, Non-flashy Statistics Grid */}
        <div className="mt-16 md:mt-20 grid sm:grid-cols-3 gap-6 border-t border-slate-100 pt-12 text-left">
          {/* Stat 1 */}
          <div className="border border-slate-100 bg-[#f8fafc]/40 p-6 rounded">
            <div className="text-slate-400 uppercase text-[9px] tracking-widest font-mono mb-2 flex items-center gap-1.5">
              <Database className="h-3.5 w-3.5 text-slate-400" /> Data Mart Optimization
            </div>
            <div className="text-2xl md:text-3xl font-serif-display font-bold text-slate-900 mb-2">
              8h to 12min
            </div>
            <div className="text-xs text-slate-500 leading-relaxed">
              Drastic latency reduction in daily batch refresh run cycles achieved through pre-computed database aggregation models and custom dbt pipelines.
            </div>
          </div>

          {/* Stat 2 */}
          <div className="border border-slate-100 bg-[#f8fafc]/40 p-6 rounded">
            <div className="text-slate-400 uppercase text-[9px] tracking-widest font-mono mb-2 flex items-center gap-1.5">
              <Layers className="h-3.5 w-3.5 text-slate-400" /> Semantic Layer Scale
            </div>
            <div className="text-2xl md:text-3xl font-serif-display font-bold text-slate-900 mb-2">
              120+ Outlets
            </div>
            <div className="text-xs text-slate-500 leading-relaxed">
              Complex regional Row-Level Security (RLS) configured across multi-brand groups, providing consistent row security for all managers.
            </div>
          </div>

          {/* Stat 3 */}
          <div className="border border-slate-100 bg-[#f8fafc]/40 p-6 rounded">
            <div className="text-slate-400 uppercase text-[9px] tracking-widest font-mono mb-2 flex items-center gap-1.5">
              <CheckCircle className="h-3.5 w-3.5 text-slate-400" /> Forecasting Accuracy
            </div>
            <div className="text-2xl md:text-3xl font-serif-display font-bold text-slate-900 mb-2">
              92% MAPE
            </div>
            <div className="text-xs text-slate-500 leading-relaxed">
              Robust predictive machine-learning demand forecasting models deployed seamlessly directly inside business workspaces.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
