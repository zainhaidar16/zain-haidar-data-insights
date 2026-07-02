import { useState, useEffect, MouseEvent } from "react";
import { ArrowUpRight, X, Home, User, Briefcase, FolderOpen, BookOpen, Mail, Menu } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";
import { Magnetic } from "@/components/fx/Magnetic";

const navLinks = [
  { label: "Home", to: "/", hash: "", icon: Home },
  { label: "About", to: "/about", hash: "", icon: User },
  { label: "Services", to: "/services", hash: "", icon: Briefcase },
  { label: "Projects", to: "/projects", hash: "", icon: FolderOpen },
  { label: "Blog", to: "/blog", hash: "", icon: BookOpen },
  { label: "Contact", to: "/contact", hash: "", icon: Mail },
];

export function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => { if (event.key === "Escape") setMenuOpen(false); };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  useEffect(() => setMenuOpen(false), [location.pathname]);

  const isLinkActive = (to: string) => to === "/" ? location.pathname === "/" : location.pathname.startsWith(to);

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
        <div className="flex items-center gap-4">
          <Link to="/" className="nvr-logo flex items-center gap-2.5" aria-label="Zain The Analyst - Home">
            <img src="/z-monogram-header.svg" alt="Z Monogram" width={32} height={32} />
            <span className="text-[var(--text-main)] font-semibold text-sm tracking-normal">
              Zain <span className="font-medium text-[var(--text-muted)]">The Analyst</span>
            </span>
          </Link>
          <span className="hidden items-center gap-1.5 rounded-[20px] border border-[rgba(34,197,94,0.3)] bg-[rgba(34,197,94,0.15)] px-2.5 py-1 text-[12px] font-medium leading-none text-[#22C55E] xl:inline-flex">
            <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-[#22C55E]" aria-hidden="true" />
            <span>Available</span>
          </span>
        </div>

        <nav className="hidden lg:flex items-center gap-6 xl:gap-8" aria-label="Main navigation">
          {navLinks.map((link) => (
            <Link
              key={link.label}
              to={link.to}
              onClick={(event) => handleNavClick(event, link.hash)}
              className={`nvr-nav-link text-sm font-medium tracking-normal transition-colors duration-200 cursor-pointer ${isLinkActive(link.to) ? "is-active text-[var(--purple)]" : "text-[var(--text-muted)] hover:text-[var(--text-main)]"
                }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Magnetic glow className="hidden xl:inline-flex">
            <Link
              to="/contact"
              className="nvr-header-cta primary-button inline-flex items-center justify-center rounded-[10px] text-white transition-colors duration-200 cursor-pointer select-none"
            >
              Start a Project
            </Link>
          </Magnetic>

          <button type="button" className="lg:hidden nvr-menu-button flex items-center justify-center gap-2" aria-label={menuOpen ? "Close menu" : "Open menu"} aria-expanded={menuOpen} onClick={() => setMenuOpen((value) => !value)}>
            {menuOpen ? <X aria-hidden="true" className="h-4.5 w-4.5" /> : <Menu aria-hidden="true" className="h-4.5 w-4.5" />}
            <span>MENU</span>
          </button>
        </div>
      </header>

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
                  className={`flex items-center gap-4 py-2 text-3xl font-bold ${isLinkActive(link.to)
                      ? "is-active text-[var(--purple)]"
                      : "text-[var(--text-muted)] hover:text-[var(--purple)]"
                    }`}
                >
                  <span className="nvr-menu-index text-xs font-medium text-[var(--text-muted)]">
                    {String(index + 1).padStart(2, "0")}
                  </span>
                  <Icon
                    className={`h-6 w-6 shrink-0 ${isLinkActive(link.to) ? "text-[var(--purple)]" : "text-[var(--text-muted)]"}`}
                  />
                  <span>{link.label}</span>
                </Link>
              );
            })}
          </nav>

          <aside className="nvr-menu-meta">
            <div>
              <p className="text-xs text-[var(--text-muted)] uppercase tracking-wider font-medium">
                Start a Project
              </p>
              <Link
                to="/contact"
                tabIndex={menuOpen ? 0 : -1}
                className="nvr-menu-cta primary-button mt-3 inline-flex items-center justify-center gap-2"
              >
                Start a Project <ArrowUpRight className="h-4 w-4" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
        <div className="nvr-menu-overlay-footer-spacer h-12" />
        <div className="nvr-menu-footer text-xs text-[var(--text-muted)]">
          Zain The Analyst © {new Date().getFullYear()}
        </div>
      </div>
    </>
  );
}
