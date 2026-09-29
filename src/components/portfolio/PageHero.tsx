import type { ReactNode } from "react";
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
  eyebrow,
  title,
  description,
  meta,
  actions,
  before,
  media,
}: PageHeroProps) {
  return (
    <section className="page-hero">
      <div className="container page-hero-layout">
        <div className="page-hero-copy">
          {before && <div className="breadcrumb">{before}</div>}
          <p className="eyebrow">{eyebrow}</p>
          {meta && <div className="meta-row">{meta}</div>}
          <h1>{title}</h1>
          <div className="hero-description">{description}</div>
          {actions && <div className="actions">{actions}</div>}
        </div>
        {media || (
          <div className="page-hero-art" aria-hidden="true">
            <img src="/art/data-atelier-800.webp" alt="" width="800" height="533" />
          </div>
        )}
      </div>
    </section>
  );
}
