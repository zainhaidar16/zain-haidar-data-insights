import { motion, useReducedMotion } from "framer-motion";
import type { ReactNode } from "react";
import { HeroParallax } from "@/components/fx/HeroParallax";

const EASE = [0.25, 0.1, 0.25, 1] as const;

interface PageHeroProps {
  variant?: "inner" | "landing";
  eyebrow: string;
  title: ReactNode;
  description: ReactNode;
  meta?: ReactNode;
  actions?: ReactNode;
  before?: ReactNode;
  media?: ReactNode;
  decorative?: ReactNode;
  divider?: boolean;
  compact?: boolean;
}

export function PageHero({
  variant = "inner",
  eyebrow,
  title,
  description,
  meta,
  actions,
  before,
  media,
  decorative,
  divider = true,
  compact = false,
}: PageHeroProps) {
  const prefersReducedMotion = useReducedMotion();
  const pulseClass = prefersReducedMotion ? "" : "animate-pulse";
  const innerPaddingClass = compact
    ? "pt-12 pb-8 md:pt-16 md:pb-10"
    : "pt-12 pb-12 md:pt-20 md:pb-20";

  if (variant === "landing") {
    return (
      <section
        id="hero"
        className="nvr-home-hero relative overflow-hidden border-b border-[var(--line-soft)] bg-[var(--site-bg)] px-6 pt-12 pb-12 text-[var(--text-main)] md:pt-20 md:pb-20"
      >
        {decorative}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_20%,rgba(112,72,232,0.08),transparent_38%)]" />
        <HeroParallax className="relative z-10 mx-auto flex max-w-4xl flex-col items-center text-center">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="mb-8 inline-flex items-center gap-2.5 rounded-full border border-[var(--card-border)] bg-[var(--purple-soft)] px-5 py-2 text-[12px] font-normal text-[var(--purple)]"
          >
            <span className={`h-2 w-2 rounded-full bg-[var(--purple)] ${pulseClass}`} aria-hidden="true" />
            {eyebrow}
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
            className="mb-0 text-5xl font-bold leading-[1.02] tracking-normal text-[var(--text-main)] sm:text-6xl md:text-7xl lg:text-[5rem]"
          >
            <span className={prefersReducedMotion ? "" : "fx-float-text"}>{title}</span>
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
            className="mx-auto mt-4 max-w-[60ch] text-lg font-normal leading-8 text-[var(--text-soft)] md:text-xl"
          >
            {description}
          </motion.div>

          {actions && (
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: EASE }}
              className="mt-8 flex flex-wrap justify-center gap-4"
            >
              {actions}
            </motion.div>
          )}
        </HeroParallax>
      </section>
    );
  }

  return (
    <section
      className={`relative overflow-hidden bg-[var(--site-bg)] px-6 ${innerPaddingClass} text-[var(--text-main)] ${
        divider ? "border-b border-[var(--line-soft)]" : ""
      }`}
    >
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(112,72,232,0.06),transparent_40%),radial-gradient(circle_at_70%_20%,rgba(112,72,232,0.04),transparent_35%)]" />
      <div className="relative mx-auto max-w-7xl">
        {before && <div className="mb-8">{before}</div>}
        <div className="mb-7 inline-flex items-center gap-3 rounded-full border border-[var(--card-border)] bg-[var(--purple-soft)] px-4 py-2 text-xs font-normal uppercase tracking-[0.12em] text-[var(--purple)]">
          <span className={`h-1.5 w-1.5 rounded-full bg-[var(--purple)] ${pulseClass}`} aria-hidden="true" />
          <span>{eyebrow}</span>
        </div>
        <div className="max-w-4xl overflow-hidden break-normal">
          {meta && <div className="mb-5 flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)]">{meta}</div>}
          <h1 className="max-w-4xl text-3xl font-bold leading-[1.05] tracking-normal text-[var(--text-main)] sm:text-4xl md:text-5xl lg:text-6xl">
            {title}
          </h1>
          <div className="mt-7 max-w-[60ch] text-base font-normal leading-8 text-[var(--text-soft)] md:text-lg">
            {description}
          </div>
          {actions && <div className="mt-8 flex flex-wrap gap-3">{actions}</div>}
        </div>
        {media && <div className="mt-10 max-w-5xl">{media}</div>}
      </div>
    </section>
  );
}
