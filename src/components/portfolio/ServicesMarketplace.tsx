import { serviceEngagements } from "@/data/service-engagements";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Service } from "@/lib/api";
import { fallbackServices } from "@/lib/fallback-data";
export function ServiceCards({ services = fallbackServices }: { services?: Service[] }) {
  return (
    <div className="service-grid">
      {services.map((service, i) => (
        <article className="service-card" key={service.id}>
          <span className="service-number">0{i + 1}</span>
          <h3>{service.title}</h3>
          <p>{serviceEngagements[service.slug]?.fit || service.short_description}</p>
          {service.deliverables && (
            <ul>
              {service.deliverables.slice(0, 3).map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          )}
          {serviceEngagements[service.slug] && (
            <dl className="engagement-details">
              <div>
                <dt>What I need from you</dt>
                <dd>{serviceEngagements[service.slug].input}</dd>
              </div>
              <div>
                <dt>How I hand it over</dt>
                <dd>{serviceEngagements[service.slug].handover}</dd>
              </div>
            </dl>
          )}
          <Link className="text-link" to="/services/$slug" params={{ slug: service.slug }}>
            Explore service
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </article>
      ))}
    </div>
  );
}
export function ServicesMarketplace(_props: { services?: Service[] }) {
  return (
    <section className="section section-tint">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Freelance services</p>
            <h2>A clear scope. A useful handover.</h2>
            <p className="section-intro">
              Three ways to work together. Each starts with your question and ends with files,
              checks, and instructions you can use.
            </p>
          </div>
          <Link to="/services" className="text-link">
            How we can work together
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
        <ServiceCards />
      </div>
    </section>
  );
}
