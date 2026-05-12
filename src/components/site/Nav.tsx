import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";
import { Triangle, Menu, X } from "lucide-react";
import { Link, useLocation } from "@tanstack/react-router";

const links = [
  { hash: "about", label: "About" },
  { hash: "services", label: "Services" },
  { hash: "work", label: "Case Study" },
  { hash: "contact", label: "Contact" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const { pathname } = useLocation();
  const onHome = pathname === "/";

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [open]);

  const hrefFor = (hash: string) => (onHome ? `#${hash}` : `/#${hash}`);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled || open
          ? "bg-background/85 backdrop-blur-xl border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-10 h-16 md:h-20 flex items-center justify-between">
        <Link
          to="/"
          hash="top"
          onClick={() => setOpen(false)}
          className="flex items-center gap-2"
        >
          <span className="grid place-items-center h-8 w-8 rounded-md bg-foreground text-background">
            <Triangle className="h-4 w-4 fill-current rotate-90" />
          </span>
          <span className="text-lg sm:text-xl font-serif-display tracking-tight">Zain</span>
        </Link>

        <nav className="hidden md:flex items-center gap-8 lg:gap-10">
          {links.map((l) => (
            <a
              key={l.hash}
              href={hrefFor(l.hash)}
              className="text-[15px] text-foreground/80 hover:text-foreground transition-colors"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <a
            href={hrefFor("contact")}
            className="hidden sm:inline-flex items-center rounded-full bg-foreground text-background px-5 py-2.5 md:px-6 md:py-3 text-sm font-medium hover:bg-foreground/90 transition-all"
          >
            Get in touch
          </a>
          <button
            type="button"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
            onClick={() => setOpen((v) => !v)}
            className="md:hidden inline-flex items-center justify-center h-10 w-10 rounded-full border border-foreground/15 text-foreground"
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </div>

      <AnimatePresence>
        {open && (
          <motion.div
            key="mobile-menu"
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
            className="md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
          >
            <nav className="px-5 py-6 flex flex-col gap-1">
              {links.map((l) => (
                <a
                  key={l.hash}
                  href={hrefFor(l.hash)}
                  onClick={() => setOpen(false)}
                  className="font-serif-display text-3xl py-3 border-b border-border/60 text-foreground"
                >
                  {l.label}
                </a>
              ))}
              <a
                href={hrefFor("contact")}
                onClick={() => setOpen(false)}
                className="mt-6 inline-flex items-center justify-center rounded-full bg-foreground text-background px-6 py-4 text-sm font-medium"
              >
                Get in touch
              </a>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
