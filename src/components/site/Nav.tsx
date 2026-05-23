import { useEffect, useState } from "react";
import { Menu, X, BarChart2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

const links = [
  { to: "/work", label: "Case Studies" },
  { to: "/about", label: "Capabilities" },
  { to: "/insights", label: "Field Notes" },
  { to: "/contact", label: "Contact" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-200 ${
        scrolled || open
          ? "bg-white/95 backdrop-blur-md border-b border-slate-200/80 py-3.5"
          : "bg-white/50 py-5"
      }`}
    >
      <div className="mx-auto max-w-[1140px] px-5 sm:px-6 flex items-center justify-between">
        {/* Minimal Stark Logo */}
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2 group"
        >
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

        {/* Minimal Nav Links */}
        <nav className="hidden md:flex items-center gap-7">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-slate-950 font-medium" }}
              inactiveProps={{ className: "text-slate-500" }}
              className="text-[13px] hover:text-slate-900 transition-colors py-1"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        {/* Minimal Action CTA Button */}
        <div className="flex items-center gap-3">
          <a
            href="/cv-zain-haidar.pdf"
            download
            className="hidden sm:inline-flex items-center rounded border border-slate-200 hover:border-slate-300 hover:bg-slate-50 text-slate-700 px-4 py-2 text-[12px] font-medium transition active:scale-98"
          >
            Capabilities PDF
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center h-8 w-8 rounded border border-slate-200 text-slate-700 bg-white"
          >
            {open ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
          </button>
        </div>
      </div>

      {/* Minimal Stark Mobile Dropdown Overlay */}
      {open && (
        <div className="md:hidden fixed inset-x-0 top-14 bottom-0 z-40 bg-white animate-fade-in border-t border-slate-200">
          <nav className="px-6 py-8 flex flex-col gap-5 h-full justify-between">
            <div className="flex flex-col gap-1">
              {links.map((l) => (
                <Link
                  key={l.to}
                  to={l.to}
                  onClick={() => setOpen(false)}
                  className="font-serif-display text-[26px] font-semibold py-2.5 text-slate-800 hover:text-slate-950 border-b border-slate-100 flex justify-between items-center"
                >
                  {l.label}
                  <span className="text-slate-400">→</span>
                </Link>
              ))}
            </div>
            
            <a
              href="/cv-zain-haidar.pdf"
              download
              onClick={() => setOpen(false)}
              className="w-full inline-flex items-center justify-center rounded bg-slate-900 text-white py-3.5 text-xs font-semibold"
            >
              Download Capabilities Profile
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
