import { useEffect, useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "@tanstack/react-router";

const links = [
  { to: "/work", label: "Work" },
  { to: "/about", label: "About" },
  { to: "/insights", label: "Writing" },
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
      className={`fixed top-0 left-0 right-0 z-50 transition-colors duration-300 ${
        scrolled || open
          ? "bg-background/85 backdrop-blur-md border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 h-16 md:h-[72px] flex items-center justify-between">
        <Link
          to="/"
          onClick={() => setOpen(false)}
          className="flex items-baseline gap-2 group"
        >
          <span className="font-serif-display text-[22px] md:text-[24px] tracking-[-0.02em] leading-none">
            Zain Haidar
          </span>
          <span className="hidden sm:inline text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
            — Power BI &amp; Data
          </span>
        </Link>

        <nav className="hidden md:flex items-center gap-8">
          {links.map((l) => (
            <Link
              key={l.to}
              to={l.to}
              activeProps={{ className: "text-foreground" }}
              inactiveProps={{ className: "text-foreground/65" }}
              className="text-[14px] hover:text-foreground transition-colors"
            >
              {l.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href="/cv-zain-haidar.pdf"
            download
            className="hidden sm:inline-flex items-center rounded-full bg-foreground text-background px-5 py-2.5 text-sm font-medium hover:bg-foreground/90 transition"
          >
            Download CV
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-border text-foreground"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      {open && (
        <div className="md:hidden border-t border-border bg-background">
          <nav className="px-5 py-6 flex flex-col">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                onClick={() => setOpen(false)}
                className="font-serif-display text-3xl py-3 border-b border-border"
              >
                {l.label}
              </Link>
            ))}
            <a
              href="/cv-zain-haidar.pdf"
              download
              onClick={() => setOpen(false)}
              className="mt-6 inline-flex items-center justify-center rounded-full bg-foreground text-background px-6 py-4 text-sm font-medium"
            >
              Download CV
            </a>
          </nav>
        </div>
      )}
    </header>
  );
}
