/**
 * Subtle animated purple gradient mesh for section backgrounds.
 * Pure CSS (see .fx-aurora in fx.css) — non-distracting, paused
 * automatically under prefers-reduced-motion.
 */
export function AuroraBackdrop() {
  return <div className="fx-aurora" aria-hidden="true" />;
}
