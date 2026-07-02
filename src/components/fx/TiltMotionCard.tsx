import { motion, type MotionProps } from "framer-motion";
import { useEffect, useRef, type ReactNode } from "react";

interface TiltMotionCardProps extends MotionProps {
  className?: string;
  children: ReactNode;
}

type TiltElement = HTMLDivElement & { vanillaTilt?: { destroy: () => void } };

/**
 * Drop-in replacement for `motion.div` on card elements: keeps the
 * existing framer-motion scroll-entrance animation untouched, and once
 * mounted, layers a VanillaTilt 3D tilt + glare on hover. Skipped on
 * touch devices and prefers-reduced-motion.
 */
export function TiltMotionCard({ className, children, ...motionProps }: TiltMotionCardProps) {
  const ref = useRef<TiltElement | null>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (prefersReducedMotion || !canHover) return;

    let destroyed = false;

    import("vanilla-tilt").then(({ default: VanillaTilt }) => {
      if (destroyed || !ref.current) return;
      VanillaTilt.init(ref.current, {
        max: 8,
        speed: 400,
        glare: true,
        "max-glare": 0.25,
        perspective: 900,
        scale: 1.02,
        gyroscope: false,
      });
    });

    return () => {
      destroyed = true;
      ref.current?.vanillaTilt?.destroy();
    };
  }, []);

  return (
    <motion.div ref={ref} className={`fx-tilt-card ${className ?? ""}`} {...motionProps}>
      {children}
    </motion.div>
  );
}
