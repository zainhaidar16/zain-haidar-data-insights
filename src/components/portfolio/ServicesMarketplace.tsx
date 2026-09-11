import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import type { Service } from "@/lib/api";
export function ServiceCards({ services = [] }: { services?: Service[] }) {
  return (
    <div className="premium-services">
      {services.map((s, i) => (
        <article className="premium-service" key={s.id}>
          <span className="service-number">{String(i + 1).padStart(2, "0")}</span>
          <div>
            <h3>
              <Link to="/services/$slug" params={{ slug: s.slug }}>
                {s.title}
              </Link>
            </h3>
            <p>{s.short_description}</p>
            <div className="tag-list">
              {s.technologies?.slice(0, 4).map((t) => (
                <span className="tag" key={t}>
                  {t}
                </span>
              ))}
            </div>
          </div>
          <Link
            className="service-arrow"
            to="/services/$slug"
            params={{ slug: s.slug }}
            aria-label={"Explore " + s.title}
          >
            <ArrowUpRight aria-hidden="true" />
          </Link>
        </article>
      ))}
    </div>
  );
}
export function ServicesMarketplace({ services = [] }: { services?: Service[] }) {
  return (
    <section className="section section-tint">
      <div className="container">
        <div className="premium-heading">
          <p className="eyebrow">02 / Services</p>
          <h2>
            From complex data.
            <br />
            To something useful.
          </h2>
          <Link className="text-link" to="/contact" search={{ intent: "freelance" }}>
            Discuss a project ↗
          </Link>
        </div>
        <ServiceCards services={services} />
      </div>
    </section>
  );
}
