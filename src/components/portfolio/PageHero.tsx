import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  actions?: ReactNode;
}

export function PageHero({ eyebrow, title, description, actions }: PageHeroProps) {
  return (
    <section className="relative overflow-hidden border-b border-[rgba(245,231,210,0.14)] bg-[#17130f] px-6 py-24 text-[#fff7ed] md:py-32">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_0%,rgba(245,158,11,0.16),transparent_32%),radial-gradient(circle_at_82%_12%,rgba(249,115,22,0.10),transparent_30%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(245,231,210,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(245,231,210,0.05)_1px,transparent_1px)] bg-[size:64px_64px] opacity-40" />
      <div className="relative mx-auto max-w-7xl">
        <div className="mb-8 inline-flex items-center gap-3 rounded-full border border-[rgba(245,158,11,0.26)] bg-[rgba(245,158,11,0.10)] px-4 py-2 text-xs font-normal uppercase tracking-[0.22em] text-[#fbbf24]">
          <span>{eyebrow}</span>
          <span className="h-1 w-1 rounded-full bg-[#fbbf24]" aria-hidden="true" />
        </div>
        <div className="grid gap-8 lg:grid-cols-[1.08fr_0.92fr] lg:items-end">
          <h1 className="max-w-4xl text-5xl font-normal leading-[1.04] tracking-[-0.05em] text-[#fff7ed] md:text-7xl">
            {title}
          </h1>
          <div className="rounded-[28px] border border-[rgba(245,231,210,0.14)] bg-[rgba(33,28,22,0.72)] p-6 backdrop-blur-xl md:p-8">
            <p className="text-base font-normal leading-8 text-[#f5e7d2] md:text-lg">{description}</p>
            {actions && <div className="mt-6 flex flex-wrap gap-3">{actions}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
