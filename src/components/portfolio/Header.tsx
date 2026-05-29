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

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 16);
    handleScroll();
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = mobileOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [mobileOpen]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setMobileOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

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

  const handleNavClick = (e: React.MouseEvent, to: string, hash?: string) => {
    setMobileOpen(false);
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
          ? "bg-white border-b border-[#E4E4E7] shadow-[0_1px_6px_rgba(0,0,0,0.06)]"
          : "bg-white border-b border-transparent"
      }`}
    >
      {/* Dark top bar */}
      <div className="hidden md:block bg-[#09090B] text-white">
        <div className="section-container">
          <div className="flex items-center justify-between h-10 text-[11px] font-semibold uppercase tracking-widest">
            <span className="text-white/60">Zain The Analyst · Analytics Consultancy</span>
            <div className="flex items-center gap-6">
              {secondaryLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  onClick={(e) => handleNavClick(e, link.to)}
                  className="text-white/70 hover:text-[#FDBA74] transition-colors"
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
          {/* Logo */}
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center shrink-0"
            aria-label="Zain The Analyst — Home"
          >
            <img
              src="/zain-the-analyst-horizontal-z-powerbi-transparent.svg"
              alt="Zain The Analyst"
              className="w-[170px] md:w-[250px] h-auto object-contain"
              width={250}
              height={42}
            />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                hash={link.hash || undefined}
                onClick={(e) => handleNavClick(e, link.to, link.hash)}
                className={`px-4 py-2 text-[14px] font-medium rounded-full transition-all duration-200 ${
                  isLinkActive(link.to, link.hash)
                    ? "text-[#F97316] font-semibold"
                    : "text-[#18181B] hover:text-[#F97316]"
                }`}
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* CTA + Mobile toggle */}
          <div className="flex items-center gap-3">
            <Button asChild variant="dark" className="hidden md:inline-flex">
              <Link to="/contact" onClick={(e) => handleNavClick(e, "/contact")}>
                Start a Project
              </Link>
            </Button>

            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex items-center justify-center h-10 w-10 rounded-full border border-[#E4E4E7] text-[#09090B] hover:bg-[#F4F4F5] transition cursor-pointer"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-[112px] bottom-0 bg-white z-40 overflow-y-auto border-t border-[#E4E4E7] flex flex-col justify-between animate-fade-in">
          <nav className="px-6 py-8 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                hash={link.hash || undefined}
                onClick={(e) => handleNavClick(e, link.to, link.hash)}
                className={`flex items-center px-5 py-3.5 rounded-2xl text-[15px] font-medium transition ${
                  isLinkActive(link.to, link.hash)
                    ? "text-[#F97316] font-semibold bg-[#FFF7ED]"
                    : "text-[#18181B] hover:text-[#F97316] hover:bg-[#FFF7ED]"
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
          <div className="p-6 text-center text-[10px] text-[#71717A] font-medium uppercase tracking-widest border-t border-[#E4E4E7]">
            Zain The Analyst © {new Date().getFullYear()}
          </div>
        </div>
      )}
    </header>
  );
}
