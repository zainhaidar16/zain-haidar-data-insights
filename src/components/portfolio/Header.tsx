import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";

const navLinks = [
  { label: "Home", to: "/", hash: "" },
  { label: "About", to: "/about", hash: "" },
  { label: "Services", to: "/services", hash: "" },
  { label: "Projects", to: "/projects", hash: "" },
  { label: "Blog", to: "/blog", hash: "" },
  { label: "Contact", to: "/contact", hash: "" },
];

export function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Scroll detection for borders & shadow
  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Lock body scroll when mobile menu is open
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  // Escape key closes mobile menu
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  // Determine active state for links subtly
  const isLinkActive = (to: string, hash: string) => {
    const currentPath = location.pathname;
    const currentHash = (location.hash || "").replace("#", "");

    if (to === "/blog") {
      return currentPath.startsWith("/blog");
    }

    if (to === "/contact") {
      return currentPath.startsWith("/contact");
    }

    if (to === "/") {
      if (!hash) {
        return currentPath === "/" && currentHash === "";
      }
      return currentPath === "/" && currentHash === hash;
    }

    return false;
  };

  // Nav click smooth scroll intercept
  const handleNavClick = (e: React.MouseEvent, to: string, hash?: string) => {
    setMobileOpen(false);

    // If targeting home page anchor and already on home page
    if (hash && location.pathname === "/") {
      e.preventDefault();
      const el = document.getElementById(hash);
      if (el) {
        el.scrollIntoView({ behavior: "smooth" });
        window.history.pushState(null, "", `/#${hash}`);
      }
    }
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || mobileOpen
          ? "bg-white border-b border-slate-200 shadow-sm"
          : "bg-white/95 backdrop-blur-md border-b border-slate-100/60"
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-16">

          {/* Logo on Left */}
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center gap-2.5 group"
            aria-label="Zain The Analyst"
          >
            {/* Monogram Icon */}
            <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-blue-600 text-white font-bold text-sm tracking-tight shadow-md select-none transition-transform duration-200 group-hover:scale-105">
              ZA
            </div>
            {/* Wordmark */}
            <span className="text-[15px] leading-tight hidden sm:block">
              <span className="font-bold text-[#0F172A]">Zain</span>
              <span className="font-medium text-[#64748B]"> The Analyst</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1.5" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                hash={link.hash || undefined}
                onClick={(e) => handleNavClick(e, link.to, link.hash)}
                className={`px-4 py-2 text-sm font-semibold rounded-xl transition-all duration-200 ${
                  isLinkActive(link.to, link.hash)
                    ? "text-blue-600 bg-blue-50/50"
                    : "text-slate-500 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Hire Me CTA Button */}
          <div className="flex items-center gap-3">
            <Link
              to="/contact"
              onClick={(e) => handleNavClick(e, "/contact")}
              className="hidden md:inline-flex items-center px-4.5 py-2 text-xs font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-xl transition shadow-md shadow-blue-500/10 cursor-pointer"
            >
              Hire Me
            </Link>

            {/* Mobile Hamburger toggle button */}
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex items-center justify-center h-9.5 w-9.5 rounded-xl border border-slate-200 text-slate-650 hover:bg-slate-50 transition cursor-pointer"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Accessible Full-Width Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-16 bottom-0 bg-white/98 z-40 overflow-y-auto border-t border-slate-100 flex flex-col justify-between animate-fade-in">
          <nav className="px-6 py-8 flex flex-col gap-1.5">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                hash={link.hash || undefined}
                onClick={(e) => handleNavClick(e, link.to, link.hash)}
                className={`flex items-center px-5 py-3.5 rounded-2xl text-[15px] font-semibold transition ${
                  isLinkActive(link.to, link.hash)
                    ? "text-blue-600 bg-blue-50/50"
                    : "text-slate-600 hover:text-blue-600 hover:bg-slate-50"
                }`}
              >
                <span>{link.label}</span>
              </Link>
            ))}

            <Link
              to="/contact"
              onClick={(e) => handleNavClick(e, "/contact")}
              className="mt-6 flex items-center justify-center px-5 py-3.5 text-sm font-bold uppercase tracking-wider text-white bg-blue-600 hover:bg-blue-700 rounded-2xl transition shadow-md cursor-pointer"
            >
              Hire Me
            </Link>
          </nav>
          <div className="p-6 text-center text-[10px] text-slate-400 font-semibold uppercase tracking-widest border-t border-slate-100">
            Zain The Analyst © {new Date().getFullYear()}
          </div>
        </div>
      )}
    </header>
  );
}
