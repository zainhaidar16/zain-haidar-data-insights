import { useEffect } from "react";
import type Lenis from "lenis";
import type { gsap as GsapNamespace } from "gsap";

/**
 * Buttery inertia scrolling via Lenis, wired into GSAP's ticker so
 * ScrollTrigger-based reveals (see DepthReveal) stay in sync. Skipped
 * entirely under prefers-reduced-motion so users who asked for less
 * motion keep native, immediate scrolling.
 */
export function SmoothScroll() {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (prefersReducedMotion) return;

    let destroyed = false;
    let lenis: Lenis | null = null;
    let gsapInstance: typeof GsapNamespace | null = null;
    let tickerCallback: ((time: number) => void) | null = null;

    Promise.all([import("lenis"), import("gsap"), import("gsap/ScrollTrigger")]).then(
      ([{ default: LenisCtor }, { default: gsap }, { ScrollTrigger }]) => {
        if (destroyed) return;
        gsap.registerPlugin(ScrollTrigger);
        gsapInstance = gsap;

        lenis = new LenisCtor({ duration: 1.05, smoothWheel: true });
        lenis.on("scroll", ScrollTrigger.update);

        tickerCallback = (time: number) => lenis?.raf(time * 1000);
        gsap.ticker.add(tickerCallback);
        gsap.ticker.lagSmoothing(0);
      },
    );

    return () => {
      destroyed = true;
      if (tickerCallback && gsapInstance) gsapInstance.ticker.remove(tickerCallback);
      lenis?.destroy();
    };
  }, []);

  return null;
}
