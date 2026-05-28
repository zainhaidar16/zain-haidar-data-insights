import { Link } from "@tanstack/react-router";
import { Linkedin, Github, Mail, FileDown, BarChart3, Globe } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border bg-secondary/10 relative overflow-hidden">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 py-16 grid gap-12 md:grid-cols-12 relative z-10">
        
        {/* Brand/Bio Column */}
        <div className="md:col-span-5 space-y-4">
          <Link to="/" className="flex items-center gap-2.5 group relative w-fit">
            <div className="h-9 w-9 rounded-lg bg-gradient-primary p-0.5 flex items-center justify-center shadow-glow transition-transform duration-300 group-hover:scale-105">
              <div className="h-full w-full bg-[#0a0f1d] rounded-[6px] flex items-center justify-center">
                <BarChart3 className="h-4.5 w-4.5 text-accent animate-pulse" />
              </div>
            </div>
            <div className="flex flex-col">
              <span className="font-serif-display text-[20px] md:text-[22px] tracking-[-0.03em] leading-none font-bold text-foreground group-hover:text-primary transition-colors">
                Haidar Analytics
              </span>
              <span className="text-[9px] uppercase tracking-[0.25em] text-muted-foreground font-mono leading-none mt-1.5">
                Simple Data Dashboards
              </span>
            </div>
          </Link>
          <p className="text-muted-foreground max-w-sm text-[14px] leading-relaxed">
            I help businesses build simple, clear, and fast dashboards in Power BI, Tableau, and Looker Studio. Based in Vienna, Austria, and working with clients worldwide.
          </p>
          <div className="flex flex-wrap items-center gap-3 pt-2 text-xs font-mono">
            <a href="mailto:zainhaider72@gmail.com" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-accent transition">
              <Mail className="h-3.5 w-3.5" /> Email
            </a>
            <span className="text-border/40">·</span>
            <a href="https://www.linkedin.com/in/zain-haidar/" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-accent transition">
              <Linkedin className="h-3.5 w-3.5" /> LinkedIn
            </a>
            <span className="text-border/40">·</span>
            <a href="https://github.com/zainhaidar16" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-accent transition">
              <Github className="h-3.5 w-3.5" /> GitHub
            </a>
            <span className="text-border/40">·</span>
            <a href="https://www.kaggle.com/zainhaidar" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-accent transition">
              <Globe className="h-3.5 w-3.5" /> Kaggle
            </a>
            <span className="text-border/40">·</span>
            <a href="https://huggingface.co/zainhaidar" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-accent transition">
              <Globe className="h-3.5 w-3.5" /> Hugging Face
            </a>
            <span className="text-border/40">·</span>
            <a href="/Zain%20Haidar%20Resume.pdf" download className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-accent transition">
              <FileDown className="h-3.5 w-3.5" /> CV
            </a>
          </div>
        </div>

        {/* Directory links */}
        <div className="md:col-span-3">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent font-semibold mb-5">
            Navigation
          </div>
          <ul className="space-y-3 text-sm">
            <li><Link to="/work" className="text-muted-foreground hover:text-foreground transition-colors">Case Studies</Link></li>
            <li><Link to="/about" className="text-muted-foreground hover:text-foreground transition-colors">Capabilities & About</Link></li>
            <li><Link to="/insights" className="text-muted-foreground hover:text-foreground transition-colors">Writing</Link></li>
            <li><Link to="/contact" className="text-muted-foreground hover:text-foreground transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Operational location details */}
        <div className="md:col-span-4 space-y-3">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent font-semibold mb-5">
            Operational Presence
          </div>
          <p className="text-[15px] font-semibold text-foreground">Vienna, Austria · CET Time Zone</p>
          <p className="text-sm text-muted-foreground leading-relaxed">
            Scoping queries and custom consulting requests processed within 24 hours.
          </p>
        </div>
      </div>

      {/* Baseline copyright bar */}
      <div className="border-t border-border">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground font-mono">
          <div>© {new Date().getFullYear()} Haidar Analytics. All rights reserved.</div>
          <div className="text-accent/60">POWER BI · TABLEAU · LOOKER STUDIO · SQL · PYTHON</div>
        </div>
      </div>
    </footer>
  );
}
