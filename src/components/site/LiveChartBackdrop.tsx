import { motion } from "framer-motion";

/** Decorative animated SVG line + bars used as cinematic backdrop. */
export function LiveChartBackdrop({ className = "" }: { className?: string }) {
  const points = "0,80 40,60 80,68 120,40 160,52 200,30 240,42 280,18 320,28 360,10";
  return (
    <svg
      viewBox="0 0 360 120"
      className={`pointer-events-none ${className}`}
      preserveAspectRatio="none"
      aria-hidden
    >
      <defs>
        <linearGradient id="lcg" x1="0" x2="1" y1="0" y2="0">
          <stop offset="0%" stopColor="oklch(0.78 0.17 225)" stopOpacity="0" />
          <stop offset="50%" stopColor="oklch(0.78 0.17 225)" stopOpacity="0.9" />
          <stop offset="100%" stopColor="oklch(0.7 0.2 290)" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="lcfill" x1="0" x2="0" y1="0" y2="1">
          <stop offset="0%" stopColor="oklch(0.78 0.17 225)" stopOpacity="0.25" />
          <stop offset="100%" stopColor="oklch(0.78 0.17 225)" stopOpacity="0" />
        </linearGradient>
      </defs>
      {/* grid */}
      {[20, 40, 60, 80, 100].map((y) => (
        <line key={y} x1="0" x2="360" y1={y} y2={y} stroke="oklch(1 0 0 / 0.05)" strokeWidth="0.5" />
      ))}
      {/* area */}
      <motion.polygon
        points={`${points} 360,120 0,120`}
        fill="url(#lcfill)"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1.2 }}
      />
      <motion.polyline
        points={points}
        fill="none"
        stroke="url(#lcg)"
        strokeWidth="1.5"
        strokeLinecap="round"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 2, ease: "easeInOut" }}
      />
    </svg>
  );
}
