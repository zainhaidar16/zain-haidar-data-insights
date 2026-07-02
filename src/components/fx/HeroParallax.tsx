import { useEffect, useRef, type ReactNode } from "react";

/**
 * Subtle 3D perspective-tilt parallax: as the cursor moves across the
 * hero section, wrapped content (headline, copy) shifts in depth to
 * track it. Skipped on touch devices and prefers-reduced-motion.
 */
export function HeroParallax({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (prefersReducedMotion || !canHover) return;

    const section = el.closest("section") ?? document.body;

    const handleMove = (e: Event) => {
      const pointerEvent = e as PointerEvent;
      const rect = section.getBoundingClientRect();
      const relX = (pointerEvent.clientX - rect.left) / rect.width - 0.5;
      const relY = (pointerEvent.clientY - rect.top) / rect.height - 0.5;
      el.style.setProperty("--fx-rx", `${(-relY * 6).toFixed(2)}deg`);
      el.style.setProperty("--fx-ry", `${(relX * 6).toFixed(2)}deg`);
      el.style.setProperty("--fx-hz", "16px");
    };

    const handleLeave = () => {
      el.style.setProperty("--fx-rx", "0deg");
      el.style.setProperty("--fx-ry", "0deg");
      el.style.setProperty("--fx-hz", "0px");
    };

    section.addEventListener("pointermove", handleMove, { passive: true });
    section.addEventListener("pointerleave", handleLeave);
    return () => {
      section.removeEventListener("pointermove", handleMove);
      section.removeEventListener("pointerleave", handleLeave);
    };
  }, []);

  return (
    <div ref={ref} className={`fx-hero-parallax ${className}`}>
      {children}
    </div>
  );
}
