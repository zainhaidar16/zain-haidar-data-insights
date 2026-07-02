import { useEffect, useRef, type ReactNode } from "react";

/**
 * Wraps a section's content so it animates toward the viewer on
 * scroll — translateZ + opacity fade via GSAP ScrollTrigger, driven
 * through CSS custom properties consumed by `.fx-depth-inner` in
 * fx.css. Parent should have the `fx-depth-section` class to supply
 * the perspective. No-ops under prefers-reduced-motion.
 */
export function DepthReveal({ children, className = "" }: { children: ReactNode; className?: string }) {
  const ref = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let destroyed = false;
    let context: { revert: () => void } | undefined;

    Promise.all([import("gsap"), import("gsap/ScrollTrigger")]).then(([{ default: gsap }, { ScrollTrigger }]) => {
      if (destroyed || !ref.current) return;
      gsap.registerPlugin(ScrollTrigger);

      context = gsap.context(() => {
        gsap.fromTo(
          ref.current,
          { "--fx-tz": "-90px", "--fx-op": 0 },
          {
            "--fx-tz": "0px",
            "--fx-op": 1,
            ease: "power2.out",
            duration: 0.9,
            scrollTrigger: {
              trigger: ref.current,
              start: "top 85%",
              once: true,
            },
          },
        );
      });
    });

    return () => {
      destroyed = true;
      context?.revert();
    };
  }, []);

  return (
    <div ref={ref} className={`fx-depth-inner ${className}`}>
      {children}
    </div>
  );
}
