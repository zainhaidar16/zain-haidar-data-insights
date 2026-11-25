import { ThemeToggle } from "./ThemeToggle";
import { useEffect, useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, ArrowUpRight, Download } from "lucide-react";
import {
  Sheet,
  SheetTrigger,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetClose,
} from "@/components/ui/sheet";
import { useSiteContent } from "@/lib/site-content";

const navigation = [
  { label: "Projects", to: "/projects" },
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;

export function Header() {
  const profile = useSiteContent();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="site-header" data-scrolled={scrolled ? "true" : "false"}>
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label="zainhaidar, home">
            <img
              className="brand-symbol"
              src="/brand/signal-mark.svg"
              width="30"
              height="30"
              alt=""
              aria-hidden="true"
            />
            <span className="brand-text">
              <span className="brand-name">zainhaidar</span>
              <span className="brand-role">{profile.role}</span>
            </span>
          </Link>

          <nav aria-label="Main navigation" className="desktop-nav">
            {navigation.map((item) => (
              <Link
                key={item.to}
                to={item.to}
                activeProps={{ className: "active", "aria-current": "page" }}
              >
                {item.label}
              </Link>
            ))}
          </nav>

          <div className="header-actions">
            <a href={profile.resume} className="cv-button" download>
              <Download size={15} aria-hidden="true" />
              <span>Download CV</span>
            </a>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  type="button"
                  className="icon-button mobile-menu"
                  aria-label="Open navigation"
                >
                  <Menu className="menu-toggle-icon" size={20} aria-hidden="true" />
                </button>
              </SheetTrigger>
              <SheetContent className="site-menu">
                <SheetTitle>Navigation</SheetTitle>
                <SheetDescription>
                  Projects, experience, and ways to work together.
                </SheetDescription>
                <nav aria-label="Mobile navigation">
                  {navigation.map((item) => (
                    <SheetClose asChild key={item.to}>
                      <Link to={item.to} activeProps={{ "aria-current": "page" }}>
                        {item.label}
                        <ArrowUpRight size={18} aria-hidden="true" />
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <a href={profile.resume} className="button button-primary" download>
                  <Download size={16} aria-hidden="true" />
                  Download CV
                </a>
                <div className="menu-extras">
                  <a href={profile.github} target="_blank" rel="noreferrer">
                    GitHub ↗
                  </a>
                  <a href={profile.linkedin} target="_blank" rel="noreferrer">
                    LinkedIn ↗
                  </a>
                  <ThemeToggle />
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
