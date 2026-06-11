import { useState, useEffect, MouseEvent } from "react";
import { ArrowUpRight, X } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";

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
          <span>
            <strong>Zain</strong>
            <span> The Analyst</span>
          </span>
        </Link>

        <div className="nvr-header-actions">
          <span className="nvr-availability">
            <i aria-hidden="true" />
            Zain The Analyst · Analytics Consultancy
          </span>
          <button
            type="button"
            className="nvr-menu-button"
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((value) => !value)}
          >
            {menuOpen ? <X aria-hidden="true" /> : <span aria-hidden="true">+</span>}
            <span>MENU</span>
          </button>
        </div>
      </header>

      <div className={`nvr-menu-overlay ${menuOpen ? "is-open" : ""}`} aria-hidden={!menuOpen}>
        <div className="nvr-menu-grid">
          <nav className="nvr-menu-nav" aria-label="Main navigation">
            {navLinks.map((link, index) => (
              <Link
                key={link.label}
                to={link.to}
                hash={link.hash || undefined}
                tabIndex={menuOpen ? 0 : -1}
                onClick={(event) => handleNavClick(event, link.hash)}
                className={isLinkActive(link.to) ? "is-active" : ""}
              >
                <span className="nvr-menu-index">{String(index + 1).padStart(2, "0")}</span>
                <span>{link.label}</span>
              </Link>
            ))}
          </nav>

          <aside className="nvr-menu-meta">
            <div>
              {secondaryLinks.map((link) => (
                <Link key={link.label} to={link.to} tabIndex={menuOpen ? 0 : -1}>
                  {link.label} <ArrowUpRight aria-hidden="true" />
                </Link>
              ))}
            </div>
            <div>
              <p>Start a Project</p>
              <Link to="/contact" tabIndex={menuOpen ? 0 : -1}>
                Contact <ArrowUpRight aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </div>
        <div className="nvr-menu-footer">Zain The Analyst © {new Date().getFullYear()}</div>
      </div>
    </>
  );
}
