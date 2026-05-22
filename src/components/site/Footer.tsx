import { Link } from "@tanstack/react-router";
import { Linkedin, Github, Mail, FileDown, BarChart3 } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-white/5 bg-[#060913]/30 relative overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 py-16 grid gap-12 md:grid-cols-12 relative z-10">
        
        {/* Brand block */}
        <div className="md:col-span-5 space-y-4">
          <Link to="/" className="flex items-center gap-2.5 group relative w-fit">
            <div className="h-9 w-9 rounded-lg bg-gradient-primary p-0.5 flex items-center justify-center shadow-glow transition-transform duration-300 group-hover:scale-105">
              <div className="h-full w-full bg-[#060913] rounded-[6px] flex items-center justify-center">
                <BarChart3 className="h-4.5 w-4.5 text-accent animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif-display text-[20px] md:text-[22px] tracking-[-0.03em] leading-none font-extrabold text-foreground group-hover:text-accent transition-colors">
                HAIDAR
              </span>
              <span className="text-[9px] uppercase tracking-[0.35em] text-muted-foreground font-mono leading-none mt-1">
                ANALYTICS
              </span>
            </div>
          </Link>
          <p className="text-muted-foreground max-w-sm text-[14px] leading-relaxed">
            Enterprise business intelligence modeling, scalable SQL architectures, and predictive analytics that transform raw data assets into corporate decision platforms. Based in Vienna, Austria.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
            <a href="mailto:zainhaider72@gmail.com" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-accent transition">
              <Mail className="h-3.5 w-3.5" /> Email
            </a>
            <span className="text-white/10">·</span>
            <a href="https://www.linkedin.com/" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-accent transition">
              <Linkedin className="h-3.5 w-3.5" /> LinkedIn
            </a>
            <span className="text-white/10">·</span>
            <a href="https://github.com/zainhaidar16" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-accent transition">
              <Github className="h-3.5 w-3.5" /> GitHub
            </a>
            <span className="text-white/10">·</span>
            <a href="/cv-zain-haidar.pdf" download className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-accent transition">
              <FileDown className="h-3.5 w-3.5" /> Profile
            </a>
          </div>
        </div>

        {/* Directory links */}
        <div className="md:col-span-3">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent font-semibold mb-4">
            Navigation
          </div>
          <ul className="space-y-3 text-sm">
            <li><Link to="/work" className="text-muted-foreground hover:text-foreground transition-colors">Case Studies</Link></li>
            <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">Core Capabilities</Link></li>
            <li><Link to="/insights" className="text-muted-foreground hover:text-foreground transition-colors">Field Notes</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Initiate Project</Link></li>
          </ul>
        </div>

        {/* Operational location details */}
        <div className="md:col-span-4 space-y-3">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent font-semibold mb-4">
            Operations
          </div>
          <p className="text-[15px] font-semibold text-foreground">Vienna, Austria · CET Time Zone</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Direct secure channels open. Initial scoping and consultations scheduled within 24 hours.
          </p>
        </div>
      </div>

      {/* Baseline copyright bar */}
      <div className="border-t border-white/5">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
          <div>© {new Date().getFullYear()} Haidar Analytics. All rights reserved.</div>
          <div className="text-accent/60">POWER BI · STAR SCHEMA · SQL WAREHOUSING · dbt</div>
        </div>
      </div>
    </footer>
  );
}
