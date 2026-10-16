import { ScrollMotion } from "./ScrollMotion";
import { ThemeToggle } from "./ThemeToggle";
import { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "@tanstack/react-router";
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
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;
const mobileNavigation = [
  navigation[0],
  { label: "Services", to: "/services" },
  navigation[1],
  { label: "Writing", to: "/blog" },
  navigation[2],
] as const;
export function Header() {
  const profile = useSiteContent();
  const path = useLocation({ select: (l) => l.pathname });
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [lockedWidth, setLockedWidth] = useState<number | null>(null);
  const inner = useRef<HTMLDivElement>(null);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (open || inner.current?.contains(document.activeElement)) return;
      setCompact(window.scrollY > (path === "/" ? 160 : 64));
    };
    const schedule = () => {
      if (!frame) frame = requestAnimationFrame(update);
    };
    update();
    window.addEventListener("scroll", schedule, { passive: true });
    window.addEventListener("resize", schedule);
    return () => {
      cancelAnimationFrame(frame);
      window.removeEventListener("scroll", schedule);
      window.removeEventListener("resize", schedule);
    };
  }, [open, path]);
  return (
    <>
      <ScrollMotion />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header
        className="site-header"
        data-layout={compact ? "compact" : "expanded"}
      >
        <div
          ref={inner}
          className="header-inner"
          style={
            lockedWidth ? { width: lockedWidth, transition: "none" } : undefined
          }
          onFocusCapture={() => {
            if (lockedWidth === null && inner.current)
              setLockedWidth(inner.current.getBoundingClientRect().width);
          }}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setLockedWidth(null);
              setCompact(window.scrollY > (path === "/" ? 160 : 64));
            }
          }}
        >
          <Link
            to="/"
            className="brand brand-pill"
            aria-label="zaintheanalyst, home"
          >
            <img
              className="brand-symbol"
              src="/brand/signal-mark.svg"
              width="28"
              height="28"
              alt=""
              aria-hidden="true"
            />
            <span>zaintheanalyst</span>
          </Link>
          <nav aria-label="Main navigation" className="desktop-nav nav-pill">
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
            <a href={profile.resume} className="cv-pill" download>
              <Download size={16} aria-hidden="true" />
              Download CV
            </a>
            <Sheet open={open} onOpenChange={setOpen}>
              <SheetTrigger asChild>
                <button
                  className="icon-button mobile-menu"
                  aria-label="Open navigation"
                >
                  <Menu size={20} aria-hidden="true" />
                </button>
              </SheetTrigger>
              <SheetContent className="site-menu">
                <SheetTitle>Explore</SheetTitle>
                <SheetDescription>
                  Projects, experience, and ways to work together.
                </SheetDescription>
                <nav aria-label="Mobile navigation">
                  {mobileNavigation.map((item) => (
                    <SheetClose asChild key={item.to}>
                      <Link to={item.to}>
                        {item.label}
                        <ArrowUpRight size={18} aria-hidden="true" />
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <a
                  href={profile.resume}
                  className="button button-outline"
                  download
                >
                  Download CV <Download size={16} />
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
