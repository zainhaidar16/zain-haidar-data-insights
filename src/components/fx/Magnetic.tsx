import { useEffect, useRef, type ReactNode } from "react";

interface MagneticProps {
  children: ReactNode;
  className?: string;
  strength?: number;
  glow?: boolean;
}

/**
 * Wraps a CTA button/link so it's gently pulled toward the cursor on
 * hover (magnetic effect) and optionally pulses a soft purple glow
 * behind it. Applies the transform to this wrapper, not the button
 * itself, so it never fights the site's `transform: none !important`
 * button reset. No-ops on touch devices and prefers-reduced-motion.
 */
export function Magnetic({ children, className = "", strength = 0.35, glow = false }: MagneticProps) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (prefersReducedMotion || !canHover) return;

    const handleMove = (e: PointerEvent) => {
      const rect = el.getBoundingClientRect();
      const relX = e.clientX - (rect.left + rect.width / 2);
      const relY = e.clientY - (rect.top + rect.height / 2);
      el.style.setProperty("--fx-mx", `${relX * strength}px`);
      el.style.setProperty("--fx-my", `${relY * strength}px`);
    };

    const handleLeave = () => {
      el.style.setProperty("--fx-mx", "0px");
      el.style.setProperty("--fx-my", "0px");
    };

    el.addEventListener("pointermove", handleMove);
    el.addEventListener("pointerleave", handleLeave);
    return () => {
      el.removeEventListener("pointermove", handleMove);
      el.removeEventListener("pointerleave", handleLeave);
    };
  }, [strength]);

  return (
    <div ref={ref} className={`fx-magnetic ${glow ? "fx-cta-glow" : ""} ${className}`}>
      {children}
    </div>
  );
}
