import { Link } from "@tanstack/react-router";
import { Linkedin, Github, Mail, FileDown } from "lucide-react";

export function Footer() {
  return (
    <footer className="mt-32 border-t border-border">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 py-16 grid gap-12 md:grid-cols-12">
        <div className="md:col-span-5 space-y-4">
          <Link to="/" className="font-serif-display text-2xl tracking-[-0.02em]">
            Zain Haidar
          </Link>
          <p className="text-muted-foreground max-w-sm text-[15px] leading-relaxed">
            Power BI &amp; Data Analyst based in Vienna. Building dashboards executives
            actually open on Monday morning. Open to full-time roles in Vienna and remote
            EU, plus selective freelance work.
          </p>
          <div className="flex items-center gap-3 pt-2 text-sm">
            <a href="mailto:zainhaider72@gmail.com" className="inline-flex items-center gap-1.5 hover:text-accent transition">
              <Mail className="h-4 w-4" /> Email
            </a>
            <span className="text-border">·</span>
            <a href="https://www.linkedin.com/" className="inline-flex items-center gap-1.5 hover:text-accent transition">
              <Linkedin className="h-4 w-4" /> LinkedIn
            </a>
            <span className="text-border">·</span>
            <a href="https://github.com/" className="inline-flex items-center gap-1.5 hover:text-accent transition">
              <Github className="h-4 w-4" /> GitHub
            </a>
            <span className="text-border">·</span>
            <a href="/cv-zain-haidar.pdf" download className="inline-flex items-center gap-1.5 hover:text-accent transition">
              <FileDown className="h-4 w-4" /> CV
            </a>
          </div>
        </div>

        <div className="md:col-span-3">
          <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-4">
            Sitemap
          </div>
          <ul className="space-y-2.5 text-sm">
            <li><Link to="/work" className="hover:text-accent">Work</Link></li>
            <li><Link to="/about" className="hover:text-accent">About</Link></li>
            <li><Link to="/insights" className="hover:text-accent">Writing</Link></li>
            <li><Link to="/contact" className="hover:text-accent">Contact</Link></li>
          </ul>
        </div>

        <div className="md:col-span-4">
          <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-4">
            Based in
          </div>
          <p className="text-[15px]">Vienna, Austria · CET</p>
          <p className="text-sm text-muted-foreground mt-1">
            Replies within 24 hours, usually faster.
          </p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Zain Haidar — Vienna.</div>
          <div className="font-mono">Power BI · DAX · SQL · Python</div>
        </div>
      </div>
    </footer>
  );
}
