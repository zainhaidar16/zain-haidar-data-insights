import { ScrollMotion } from "./ScrollMotion";
import { useState } from "react";
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
  { label: "Writing", to: "/blog" },
  { label: "Contact", to: "/contact" },
] as const;
export function Header() {
  const profile = useSiteContent();
  const [open, setOpen] = useState(false);
  return (
    <>
      <ScrollMotion />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="site-header">
        <div className="container header-inner">
          <Link to="/" className="brand" aria-label="Zain Haidar, home">
            <img className="brand-symbol" src="/brand/signal-mark.svg" alt="" width="36" height="36" aria-hidden="true" />
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
            <Link to="/contact" className="button button-small button-primary header-contact">
              Work with me <ArrowUpRight size={14} aria-hidden="true" />
            </Link>
            <a href={profile.resume} className="button button-small button-outline" download>
              <Download size={16} aria-hidden="true" />
              Resume
            </a>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button className="icon-button mobile-menu" aria-label="Open navigation">
                  <Menu aria-hidden="true" />
                </button>
              </SheetTrigger>
              <SheetContent className="site-menu">
                <SheetTitle>Explore</SheetTitle>
                <SheetDescription>
                  Projects, experience, and ways to work together.
                </SheetDescription>
                <nav aria-label="Mobile navigation">
                  {navigation.map((item) => (
                    <SheetClose asChild key={item.to}>
                      <Link to={item.to}>
                        {item.label}
                        <ArrowUpRight size={20} aria-hidden="true" />
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <a href={profile.github} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
                <a href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </header>
    </>
  );
}
