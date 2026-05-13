import { motion, useInView, useMotionValue, useSpring, useTransform } from "framer-motion";
import { useEffect, useRef } from "react";

export function KpiTile({
  value,
  suffix = "",
  prefix = "",
  label,
  decimals = 0,
}: {
  value: number;
  suffix?: string;
  prefix?: string;
  label: string;
  decimals?: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const mv = useMotionValue(0);
  const spring = useSpring(mv, { stiffness: 60, damping: 20 });
  const display = useTransform(spring, (v) =>
    `${prefix}${v.toFixed(decimals).replace(/\B(?=(\d{3})+(?!\d))/g, ",")}${suffix}`,
  );

  useEffect(() => {
    if (inView) mv.set(value);
  }, [inView, mv, value]);

  return (
    <div
      ref={ref}
      className="relative rounded-2xl glass-strong gradient-border p-6 overflow-hidden group"
    >
      <div className="absolute -right-10 -top-10 h-32 w-32 rounded-full bg-primary/15 blur-3xl opacity-0 group-hover:opacity-100 transition" />
      <motion.div className="font-serif-display text-5xl md:text-6xl tracking-tight text-gradient leading-none">
        {display}
      </motion.div>
      <div className="mt-3 text-xs uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
    </div>
  );
}
