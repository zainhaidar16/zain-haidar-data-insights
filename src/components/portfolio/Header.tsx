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
          ? "bg-white border-b border-[#E5E7EB] shadow-[0_1px_3px_rgba(0,0,0,0.04)]"
          : "bg-white/98 backdrop-blur-sm border-b border-transparent"
      }`}
    >
      <div className="section-container">
        <div className="flex items-center justify-between h-[72px]">

          {/* Logo on Left */}
          <Link
            to="/"
            onClick={(e) => handleNavClick(e, "/")}
            className="flex items-center gap-2.5 group"
            aria-label="Zain The Analyst"
          >
            {/* Monogram Icon */}
            <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-[#111111] text-white font-bold text-sm tracking-tight select-none transition-transform duration-200 group-hover:scale-105">
              ZA
            </div>
            {/* Wordmark */}
            <span className="text-[15px] leading-tight hidden sm:block">
              <span className="font-bold text-[#111111]">Zain</span>
              <span className="font-medium text-[#4B5563]"> The Analyst</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-1" aria-label="Main navigation">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                hash={link.hash || undefined}
                onClick={(e) => handleNavClick(e, link.to, link.hash)}
                className={`px-4 py-2 text-[14px] font-medium rounded-full transition-all duration-200 ${
                  isLinkActive(link.to, link.hash)
                    ? "text-[#111111] font-semibold"
                    : "text-[#4B5563] hover:text-[#111111]"
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
              className="hidden md:inline-flex items-center px-5 py-2.5 text-[13px] font-semibold text-white bg-[#111111] hover:bg-[#2a2a2a] rounded-full transition-colors duration-200 cursor-pointer"
            >
              Hire Me
            </Link>

            {/* Mobile Hamburger toggle button */}
            <button
              type="button"
              aria-label={mobileOpen ? "Close menu" : "Open menu"}
              aria-expanded={mobileOpen}
              onClick={() => setMobileOpen((v) => !v)}
              className="md:hidden flex items-center justify-center h-10 w-10 rounded-full border border-[#E5E7EB] text-[#111111] hover:bg-[#F6F4EF] transition cursor-pointer"
            >
              {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </button>
          </div>

        </div>
      </div>

      {/* Accessible Full-Width Mobile Menu Drawer */}
      {mobileOpen && (
        <div className="md:hidden fixed inset-x-0 top-[72px] bottom-0 bg-white z-40 overflow-y-auto border-t border-[#E5E7EB] flex flex-col justify-between animate-fade-in">
          <nav className="px-6 py-8 flex flex-col gap-1">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.to}
                hash={link.hash || undefined}
                onClick={(e) => handleNavClick(e, link.to, link.hash)}
                className={`flex items-center px-5 py-3.5 rounded-2xl text-[15px] font-medium transition ${
                  isLinkActive(link.to, link.hash)
                    ? "text-[#111111] font-semibold bg-[#F6F4EF]"
                    : "text-[#4B5563] hover:text-[#111111] hover:bg-[#F6F4EF]"
                }`}
              >
                <span>{link.label}</span>
              </Link>
            ))}

            <Link
              to="/contact"
              onClick={(e) => handleNavClick(e, "/contact")}
              className="mt-6 flex items-center justify-center px-5 py-3.5 text-[14px] font-semibold text-white bg-[#111111] hover:bg-[#2a2a2a] rounded-full transition cursor-pointer"
            >
              Hire Me
            </Link>
          </nav>
          <div className="p-6 text-center text-[10px] text-[#9CA3AF] font-medium uppercase tracking-widest border-t border-[#E5E7EB]">
            Zain The Analyst © {new Date().getFullYear()}
          </div>
        </div>
      )}
    </header>
  );
}
