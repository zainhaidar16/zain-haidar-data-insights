import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  actions?: ReactNode;
}

export function PageHero({ eyebrow, title, description, actions }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[var(--line-soft)] bg-[var(--site-bg)] px-6 py-24 text-[var(--text-main)] md:py-32">
      {/* Subtle purple glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_0%,rgba(112,72,232,0.06),transparent_40%),radial-gradient(circle_at_70%_20%,rgba(112,72,232,0.04),transparent_35%)]" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[var(--card-border)] bg-[var(--purple-soft)] px-4 py-2 text-xs font-normal uppercase tracking-[0.15em] text-[var(--purple)]">
          <span className="h-1.5 w-1.5 rounded-full bg-[var(--purple)] animate-pulse" aria-hidden="true" />
          <span>{eyebrow}</span>
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <h1 className="max-w-4xl text-5xl font-normal leading-[1.04] tracking-[-0.03em] text-[var(--text-main)] md:text-7xl">
            {title}
          </h1>
          <div className="rounded-2xl border border-[var(--card-border)] bg-[var(--card-bg)] p-6 md:p-8">
            <p className="text-base font-normal leading-8 text-[var(--text-soft)] md:text-lg">{description}</p>
            {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
