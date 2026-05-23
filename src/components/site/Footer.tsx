import { Link } from "@tanstack/react-router";
import { Linkedin, Github, Mail, FileDown, BarChart2 } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-slate-100 bg-[#f8fafc]/30 relative overflow-hidden">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-6 py-12 grid gap-10 md:grid-cols-12 relative z-10">
        
        {/* Brand block */}
        <div className="md:col-span-5 space-y-4">
          <Link to="/" className="flex items-center gap-2 group w-fit">
            <div className="h-7 w-7 rounded bg-slate-900 flex items-center justify-center text-white">
              <BarChart2 className="h-4 w-4" />
            </div>
            <div className="flex flex-col">
              <span className="font-serif-display text-[16px] tracking-[-0.02em] font-semibold text-slate-900 leading-none">
                HAIDAR
              </span>
              <span className="text-[8px] uppercase tracking-[0.25em] text-slate-500 font-mono mt-0.5 leading-none">
                ANALYTICS
              </span>
            </div>
          </Link>
          <p className="text-slate-500 max-w-sm text-[13px] leading-relaxed">
            Enterprise business intelligence modeling, scalable SQL architectures, and predictive analytics that transform raw data assets into corporate decision platforms. Based in Vienna, Austria.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2 text-[11px] font-mono">
            <a href="mailto:zainhaider72@gmail.com" className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-700 transition">
              <Mail className="h-3 w-3" /> Email
            </a>
            <span className="text-slate-200">·</span>
            <a href="https://www.linkedin.com/" className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-700 transition">
              <Linkedin className="h-3 w-3" /> LinkedIn
            </a>
            <span className="text-slate-200">·</span>
            <a href="https://github.com/zainhaidar16" className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-700 transition">
              <Github className="h-3 w-3" /> GitHub
            </a>
            <span className="text-slate-200">·</span>
            <a href="/cv-zain-haidar.pdf" download className="inline-flex items-center gap-1 text-slate-400 hover:text-slate-700 transition">
              <FileDown className="h-3 w-3" /> Profile
            </a>
          </div>
        </div>

        {/* Directory links */}
        <div className="md:col-span-3">
          <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-400 font-semibold mb-3">
            Navigation
          </div>
          <ul className="space-y-2 text-xs">
            <li><Link to="/work" className="text-slate-500 hover:text-slate-800 transition-colors">Case Studies</Link></li>
            <li><Link to="/about" className="text-slate-500 hover:text-slate-800 transition-colors">Capabilities</Link></li>
            <li><Link to="/insights" className="text-slate-500 hover:text-slate-800 transition-colors">Field Notes</Link></li>
            <li><Link to="/contact" className="text-slate-500 hover:text-slate-800 transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Operational location details */}
        <div className="md:col-span-4 space-y-2">
          <div className="text-[9px] font-mono uppercase tracking-[0.2em] text-slate-400 font-semibold mb-3">
            Operations
          </div>
          <p className="text-[13px] font-semibold text-slate-700">Vienna, Austria · CET Time Zone</p>
          <p className="text-xs text-slate-500 leading-relaxed">
            Direct secure channels open. Scoping and analytical architecture consultations scheduled within 24 hours.
          </p>
        </div>
      </div>

      {/* Baseline copyright bar */}
      <div className="border-t border-slate-100">
        <div className="mx-auto max-w-[1140px] px-5 sm:px-6 py-5 flex flex-col md:flex-row items-center justify-between gap-3 text-[10px] text-slate-400 font-mono">
          <div>© {new Date().getFullYear()} Haidar Analytics. All rights reserved.</div>
          <div>POWER BI · STAR SCHEMA · SQL WAREHOUSING · dbt</div>
        </div>
      </div>
    </footer>
  );
}
