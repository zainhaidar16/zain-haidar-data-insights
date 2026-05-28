import { useState, useEffect } from "react";
import { Menu, X } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const navLinks = [
  { label: "Home", to: "/", hash: "" },
  { label: "About", to: "/about", hash: "" },
  { label: "Services", to: "/services", hash: "" },
  { label: "Projects", to: "/projects", hash: "" },
  { label: "Blog", to: "/blog", hash: "" },
  { label: "Contact", to: "/contact", hash: "" },
];

const secondaryLinks = [
  { label: "Insights", to: "/blog" },
  { label: "Contact", to: "/contact" },
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

  // Determine active state for links
  const isLinkActive = (to: string, hash: string) => {
    const currentPath = location.pathname;
    const currentHash = (location.hash || "").replace("#", "");

    if (to === "/blog") return currentPath.startsWith("/blog");
    if (to === "/contact") return currentPath.startsWith("/contact");
    if (to === "/about") return currentPath.startsWith("/about");
    if (to === "/services") return currentPath.startsWith("/services");
    if (to === "/projects") return currentPath.startsWith("/projects");

    if (to === "/") {
      if (!hash) return currentPath === "/" && currentHash === "";
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
          ? "bg-[#CFCFCF] border-b border-[#545454] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "bg-[#CFCFCF] border-b border-transparent"
      }`}
    >
      {/* Dark top bar */}
      <div className="hidden md:block bg-[#252525] text-white">
        <div className="section-container">
          <div className="flex items-center justify-between h-10 text-[11px] font-semibold uppercase tracking-widest">
            <span className="text-white/70">Zain The Analyst · Analytics Consultancy</span>
            <div className="flex items-center gap-6">
              {secondaryLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={(e) => handleNavClick(e, link.to)}
                  className="text-white/80 hover:text-white transition-colors"
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="section-container">
        <div className="flex items-center justify-between h-[72px]">
          {/* Logo on Left */}
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center gap-3 group"
            aria-label="Zain The Analyst"
          >
              <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-[#252525] text-white font-bold text-sm tracking-tight select-none transition-transform duration-200 group-hover:scale-105">
              ZA
            </div>
            <span className="text-[15px] leading-tight">
                <span className="font-bold text-[#252525]">Zain</span>
                <span className="font-medium text-[#7D7D7D]"> The Analyst</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                hash={link.hash || undefined}
                onClick={(e) => handleNavClick(e, link.to, link.hash)}
                className={`px-4 py-2 text-[14px] font-medium rounded-full transition-all duration-200 ${
                  isLinkActive(link.to, link.hash)
                    ? "text-[#252525] font-semibold"
                    : "text-[#7D7D7D] hover:text-[#252525]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile */}
          <div className="flex items-center gap-3">
            <Button asChild variant="primary" className="hidden md:inline-flex">
              <Link to="/contact" onClick={(e) => handleNavClick(e, "/contact")}>
                Start a Project
              </Link>
            </Button>

            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex items-center justify-center h-10 w-10 rounded-full border border-[#545454] text-[#252525] hover:bg-[#CFCFCF] transition cursor-pointer"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Accessible Full-Width Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-[72px] bottom-0 bg-[#CFCFCF] z-40 overflow-y-auto border-t border-[#545454] flex flex-col justify-between animate-fade-in">
          <nav className="px-6 py-8 flex flex-col gap-2">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                hash={link.hash || undefined}
                onClick={(e) => handleNavClick(e, link.to, link.hash)}
                className={`flex items-center px-5 py-3.5 rounded-2xl text-[15px] font-medium transition ${
                  isLinkActive(link.to, link.hash)
                    ? "text-[#252525] font-semibold bg-[#CFCFCF]"
                    : "text-[#7D7D7D] hover:text-[#252525] hover:bg-[#CFCFCF]"
                }`}
              >
                <span>{link.label}</span>
              </Link>
            ))}

            <Button asChild variant="primary" className="mt-6 w-full">
              <Link to="/contact" onClick={(e) => handleNavClick(e, "/contact")}>
                Start a Project
              </Link>
            </Button>
          </nav>
          <div className="p-6 text-center text-[10px] text-[#7D7D7D] font-medium uppercase tracking-widest border-t border-[#545454]">
            Zain The Analyst © {new Date().getFullYear()}
          </div>
        </div>
      )}
    </header>
  );
}
