import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { useSiteContent } from "@/lib/site-content";
export function FinalCTA() {
  const profile = useSiteContent();
  return (
    <section className="section">
      <div className="container">
        <div className="contact-band">
          <div>
            <p className="eyebrow">Let’s talk</p>
            <h2>
              A role to fill.
              <br />A data problem to solve.
            </h2>
            <p>{profile.availability}</p>
          </div>
          <div className="actions vertical">
            <Link className="button button-primary" to="/contact" search={{ intent: "employment" }}>
              Discuss an opportunity
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
            <Link className="button button-outline" to="/contact" search={{ intent: "freelance" }}>
              Discuss a project
              <ArrowUpRight size={18} aria-hidden="true" />
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
