import { useEffect, useRef } from "react";

const HOVER_SELECTOR = 'a, button, [role="button"], input, textarea, select, .fx-tilt-card, label';

/**
 * Small purple dot cursor that scales up over hoverable elements.
 * Mounted once at the root layout. No-ops entirely on touch devices
 * and prefers-reduced-motion, leaving the native cursor untouched.
 */
export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    if (prefersReducedMotion || !canHover) return;

    const dot = dotRef.current;
    if (!dot) return;

    document.documentElement.classList.add("fx-cursor-active");

    let x = window.innerWidth / 2;
    let y = window.innerHeight / 2;
    let targetX = x;
    let targetY = y;
    let raf = 0;

    const handleMove = (e: PointerEvent) => {
      targetX = e.clientX;
      targetY = e.clientY;
      dot.classList.add("is-visible");

      const target = e.target as Element | null;
      if (target?.closest(HOVER_SELECTOR)) {
        dot.classList.add("is-hover");
      } else {
        dot.classList.remove("is-hover");
      }
    };

    const handleDown = () => dot.classList.add("is-down");
    const handleUp = () => dot.classList.remove("is-down");
    const handleLeaveWindow = () => dot.classList.remove("is-visible");

    window.addEventListener("pointermove", handleMove, { passive: true });
    window.addEventListener("pointerdown", handleDown);
    window.addEventListener("pointerup", handleUp);
    document.addEventListener("mouseleave", handleLeaveWindow);

    const tick = () => {
      x += (targetX - x) * 0.25;
      y += (targetY - y) * 0.25;
      dot.style.transform = `translate3d(${x}px, ${y}px, 0) translate3d(-50%, -50%, 0)`;
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);

    return () => {
      document.documentElement.classList.remove("fx-cursor-active");
      window.removeEventListener("pointermove", handleMove);
      window.removeEventListener("pointerdown", handleDown);
      window.removeEventListener("pointerup", handleUp);
      document.removeEventListener("mouseleave", handleLeaveWindow);
      cancelAnimationFrame(raf);
    };
  }, []);

  return <div ref={dotRef} className="fx-cursor" aria-hidden="true" />;
}
