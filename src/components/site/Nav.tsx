import { useEffect, useState } from "react";
import { Menu, X, BarChart3, CloudDownload } from "lucide-react";
import { Link } from "@tanstack/react-router";

const links = [
  { to: "/work", label: "Case Studies" },
  { to: "/about", label: "Core Capabilities" },
  { to: "/insights", label: "Field Notes" },
  { to: "/contact", label: "Initiate Project" },
] as const;

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-background/70 backdrop-blur-lg border-b border-white/5 py-4"
          : "bg-transparent py-5 md:py-6"
      }`}
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 flex items-center justify-between">
        {/* Glowing Tech Logo */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2.5 group relative"
        >
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

        {/* Desktop Nav links with hover glow effects */}
        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-accent font-semibold" }}
              inactiveProps={{ className: "text-foreground/75" }}
              className="text-[14px] hover:text-foreground transition-colors relative py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-accent after:scale-x-0 hover:after:scale-x-100 after:origin-right hover:after:origin-left after:transition-transform after:duration-300"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* CTA Button */}
        <div className="flex items-center gap-3">
          <a
            href="/cv-zain-haidar.pdf"
            download
            className="hidden sm:inline-flex items-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-5 py-2.5 text-xs font-semibold shadow-glow hover:opacity-90 transition active:scale-95"
          >
            <CloudDownload className="h-3.5 w-3.5" />
            Download Capability Profile
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-lg border border-white/10 text-foreground bg-white/5 focus:outline-none"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {/* Premium Dark Overlay Menu */}
      {open && (
        <div className="md:hidden fixed inset-x-0 top-16 bottom-0 z-40 bg-background/95 backdrop-blur-2xl animate-fade-in border-t border-white/5">
          <nav className="px-6 py-10 flex flex-col gap-6 h-full justify-between">
            <div className="flex flex-col gap-2">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="font-serif-display text-[32px] font-bold py-3 text-foreground hover:text-accent border-b border-white/5 flex justify-between items-center group"
                >
                  {l.label}
                  <span className="text-muted-foreground group-hover:translate-x-2 transition-transform duration-300">→</span>
                </Link>
              ))}
            </div>
            
            <a
              href="/cv-zain-haidar.pdf"
              download
              onClick={() => setOpen(false)}
              className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary text-primary-foreground py-4 text-sm font-bold shadow-glow"
            >
              <CloudDownload className="h-4 w-4" />
              Download Capability Profile
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
