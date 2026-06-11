import { useState, useEffect, MouseEvent } from "react";
import {
  ArrowUpRight,
  X,
  Home,
  User,
  Briefcase,
  FolderOpen,
  BookOpen,
  Mail,
  Menu,
} from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";

const navLinks = [
  { label: "Home", to: "/", hash: "", icon: Home },
  { label: "About", to: "/about", hash: "", icon: User },
  { label: "Services", to: "/services", hash: "", icon: Briefcase },
  { label: "Projects", to: "/projects", hash: "", icon: FolderOpen },
  { label: "Blog", to: "/blog", hash: "", icon: BookOpen },
  { label: "Contact", to: "/contact", hash: "", icon: Mail },
];

const secondaryLinks = [
  { label: "Insights", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setMenuOpen(false);
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const isLinkActive = (to: string) => {
    if (to === "/") return location.pathname === "/";
    return location.pathname.startsWith(to);
  };

  const handleNavClick = (event: MouseEvent<HTMLAnchorElement>, hash?: string) => {
    setMenuOpen(false);
    if (hash && location.pathname === "/") {
      event.preventDefault();
      document.getElementById(hash)?.scrollIntoView({ behavior: "smooth" });
      window.history.pushState(null, "", `/#${hash}`);
    }
  };

  return (
    <>
      <header className={`nvr-header ${menuOpen ? "is-open" : ""}`}>
        <Link to="/" className="nvr-logo" aria-label="Zain The Analyst - Home">
          <img src="/z-monogram-header.svg" alt="Zain The Analyst" width={38} height={38} />
        </Link>

        {/* Desktop Navigation Links */}
        <nav className="hidden md:flex items-center gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={(event) => handleNavClick(event, link.hash)}
              className={`text-sm font-semibold tracking-wide transition-colors duration-200 cursor-pointer ${
                isLinkActive(link.to) ? "text-[#FF6B00]" : "text-[#A1A1AA] hover:text-[#FFFFFF]"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <span className="hidden xl:flex nvr-availability">
            <i aria-hidden="true" />
            Zain The Analyst · Analytics Consultancy
          </span>

          <Link
            to="/contact"
            className="hidden md:inline-flex items-center justify-center px-5 py-2.5 bg-[#FF6B00] hover:bg-[#FF7D26] text-white text-xs font-bold uppercase tracking-wider rounded-full transition-all duration-200 cursor-pointer select-none"
          >
            Start a Project
          </Link>

          {/* Hamburger Menu Button */}
          <button
            type="button"
            className="md:hidden nvr-menu-button flex items-center justify-center gap-2"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? (
              <X aria-hidden="true" className="h-4.5 w-4.5" />
            ) : (
              <Menu aria-hidden="true" className="h-4.5 w-4.5" />
            )}
            <span>MENU</span>
          </button>
        </div>
      </header>

      {/* Mobile Menu Overlay */}
      <div className={`nvr-menu-overlay ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="nvr-menu-grid">
          <nav className="nvr-menu-nav" aria-label="Mobile navigation">
            {navLinks.map((link, index) => {
              const Icon = link.icon;
              return (
                <Link
                  key={link.label}
                  to={link.to}
                  hash={link.hash || undefined}
                  tabIndex={menuOpen ? 0 : -1}
                  onClick={(event) => handleNavClick(event, link.hash)}
                  className={`flex items-center gap-4 py-2 text-3xl font-bold ${
                    isLinkActive(link.to)
                      ? "is-active text-[#FF6B00]"
                      : "text-[#71717A] hover:text-[#FFFFFF]"
                  }`}
                >
                  <span className="nvr-menu-index text-xs font-semibold text-[#FF6B00]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon
                    className={`h-6 w-6 shrink-0 ${isLinkActive(link.to) ? "text-[#FF6B00]" : "text-[#71717A]"}`}
                  />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <aside className="nvr-menu-meta">
            <div>
              {secondaryLinks.map((link) => (
                <Link
                  key={link.label}
                  to={link.to}
                  tabIndex={menuOpen ? 0 : -1}
                  className="flex items-center gap-2 text-lg hover:text-[#FF6B00]"
                >
                  {link.label} <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
                </Link>
              ))}
            </div>
            <div>
              <p className="text-xs text-[#71717A] uppercase tracking-wider font-semibold">
                Start a Project
              </p>
              <Link
                to="/contact"
                tabIndex={menuOpen ? 0 : -1}
                className="flex items-center gap-2 text-lg hover:text-[#FF6B00]"
              >
                Contact <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
        <div className="nvr-menu-footer text-xs text-[#71717A]">
          Zain The Analyst © {new Date().getFullYear()}
        </div>
      </div>
    </>
  );
}
