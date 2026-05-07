import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { ArrowUpRight } from "lucide-react";

const links = [
  { href: "#work", label: "Work" },
  { href: "#services", label: "Services" },
  { href: "#experience", label: "Experience" },
  { href: "#about", label: "About" },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <motion.header
      initial={{ y: -24, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
      className="fixed top-4 left-1/2 -translate-x-1/2 z-50 w-[min(1200px,calc(100%-2rem))]"
    >
      <div
        className={`flex items-center justify-between rounded-full px-3 py-2 transition-all duration-500 ${
          scrolled ? "glass-strong shadow-elegant" : "glass"
        }`}
      >
        <a href="#top" className="flex items-center gap-2 pl-3">
          <span className="relative flex h-2 w-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
            <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-400" />
          </span>
          <span className="text-sm font-medium tracking-tight">Available for new projects</span>
        </a>

        <nav className="hidden md:flex items-center gap-1">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="px-4 py-2 text-sm text-muted-foreground hover:text-foreground transition-colors rounded-full"
            >
              {l.label}
            </a>
          ))}
        </nav>

        <a
          href="#contact"
          className="group inline-flex items-center gap-1.5 rounded-full bg-foreground text-background px-4 py-2 text-sm font-medium hover:bg-gradient-primary hover:text-primary-foreground transition-all"
        >
          Let's Talk
          <ArrowUpRight className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
        </a>
      </div>
    </motion.header>
  );
}
