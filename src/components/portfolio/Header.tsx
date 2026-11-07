import { ScrollMotion } from "./ScrollMotion";
import { ThemeToggle } from "./ThemeToggle";
import { useCallback, useEffect, useLayoutEffect, useRef, useState } from "react";
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
  { label: "Services", to: "/services" },
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
] as const;
const mobileNavigation = navigation;
export function Header() {
  const profile = useSiteContent();
  const path = useLocation({ select: (l) => l.pathname });
  const [open, setOpen] = useState(false);
  const [compact, setCompact] = useState(false);
  const [lockedWidth, setLockedWidth] = useState<number | null>(null);
  const inner = useRef<HTMLDivElement>(null);
  const compactValue = useRef(false);
  const previousPositions = useRef<{ element: HTMLElement; left: number }[]>([]);
  const moveToLayout = useCallback((next: boolean) => {
    if (next === compactValue.current) return;
    compactValue.current = next;
    if (inner.current && !inner.current.contains(document.activeElement)) {
      previousPositions.current = Array.from(inner.current.children).map((element) => ({
        element: element as HTMLElement,
        left: element.getBoundingClientRect().left,
      }));
    }
    setCompact(next);
  }, []);
  useLayoutEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const animations = previousPositions.current.map(({ element, left }) => {
      const delta = left - element.getBoundingClientRect().left;
      return element.animate(
        [{ transform: `translateX(${delta}px)` }, { transform: "translateX(0)" }],
        {
          duration: 500,
          easing: "cubic-bezier(.22,1,.36,1)",
        },
      );
    });
    previousPositions.current = [];
    return () => animations.forEach((animation) => animation.cancel());
  }, [compact]);
  useEffect(() => {
    let frame = 0;
    const update = () => {
      frame = 0;
      if (open || inner.current?.contains(document.activeElement)) return;
      moveToLayout(window.scrollY > (path === "/" ? 160 : 64));
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
  }, [open, path, moveToLayout]);
  return (
    <>
      <ScrollMotion />
      <a href="#main-content" className="skip-link">
        Skip to content
      </a>
      <header className="site-header" data-layout={compact ? "compact" : "expanded"}>
        <div
          ref={inner}
          className="header-inner"
          style={lockedWidth ? { width: lockedWidth, transition: "none" } : undefined}
          onFocusCapture={() => {
            if (lockedWidth === null && inner.current)
              setLockedWidth(inner.current.getBoundingClientRect().width);
          }}
          onBlurCapture={(e) => {
            if (!e.currentTarget.contains(e.relatedTarget as Node)) {
              setLockedWidth(null);
              moveToLayout(window.scrollY > (path === "/" ? 160 : 64));
            }
          }}
        >
          <Link to="/" className="brand brand-pill" aria-label="zainhaidar, home">
            <img
              className="brand-symbol"
              src="/brand/signal-mark.svg"
              width="28"
              height="28"
              alt=""
              aria-hidden="true"
            />
            <span>zainhaidar</span>
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
                <button className="icon-button mobile-menu" aria-label="Open navigation">
                  <Menu className="menu-toggle-icon" size={20} aria-hidden="true" />
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
                      <Link to={item.to} activeProps={{ "aria-current": "page" }}>
                        {item.label}
                        <ArrowUpRight size={18} aria-hidden="true" />
                      </Link>
                    </SheetClose>
                  ))}
                </nav>
                <a href={profile.resume} className="button button-outline" download>
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
