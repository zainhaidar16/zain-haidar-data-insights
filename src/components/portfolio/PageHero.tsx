import type { ReactNode } from "react";

interface PageHeroProps {
  eyebrow: string;
  title: ReactNode;
  description: string;
  actions?: ReactNode;
}

export function PageHero({ eyebrow, title, description, actions }: PageHeroProps) {
  return (
    <section className="public-page-hero">
      <div className="section-container public-page-hero__inner">
        <div className="public-page-hero__eyebrow">
          <span>{eyebrow}</span>
          <i aria-hidden="true" />
        </div>

        <div className="public-page-hero__layout">
          <h1>{title}</h1>
          <div className="public-page-hero__aside">
            <p>{description}</p>
            {actions && <div className="public-page-hero__actions">{actions}</div>}
          </div>
        </div>
      </div>
    </section>
  );
}
