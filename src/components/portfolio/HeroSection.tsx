import { Link } from "@tanstack/react-router";
import { ArrowUpRight } from "lucide-react";
import { profile } from "@/data/profile";
import type { Project } from "@/lib/api";
export function HeroSection({ project }: { project?: Project }) {
  const flagship = project?.slug === "pitchside-pro-revenue-performance-dashboard";
  return (
    <section className="studio-hero">
      <div className="container">
        <div className="studio-masthead">
          <p className="eyebrow">Zain Haidar / Independent data analyst</p>
          <span>{profile.location}</span>
        </div>
        <div className="studio-hero-copy">
          <h1>
            Clear reporting.
            <br />
            <span>From SQL to Power{"\u00a0"}BI.</span>
          </h1>
          <div>
            <p>
              I prepare the data, question the numbers, and build reports people can use. Explore
              how I approach business intelligence and repeatable reporting.
            </p>
            <div className="actions">
              <a href="#selected-work" className="button button-primary">
                Explore my work
              </a>
              <Link to="/about" hash="experience" className="text-link">
                Experience & resume <ArrowUpRight size={17} />
              </Link>
            </div>
            <p className="studio-availability">{profile.availability}</p>
          </div>
        </div>
        {project?.image_url ? (
          <figure className="studio-report">
            <div className="studio-report-label">
              <span>01 / Featured study</span>
              <span>{project.title}</span>
              <span>{project.study_type || "Portfolio study"}</span>
            </div>
            <Link
              to="/projects/$slug"
              params={{ slug: project.slug }}
              className="studio-report-image"
            >
              <img
                src={
                  flagship ? "/project-images/optimized/pitchside-overview.webp" : project.image_url
                }
                srcSet={flagship ? undefined : project.image_srcset}
                sizes="(max-width: 1200px) 92vw, 1160px"
                width="1200"
                height="750"
                fetchPriority="high"
                alt={project.title + ": report overview"}
              />
              <span className="studio-report-open">
                Explore the analysis <ArrowUpRight size={18} />
              </span>
            </Link>
            {flagship && (
              <figcaption className="studio-annotations">
                <div>
                  <span>01 / Measure</span>
                  <h3>Read margin alongside revenue.</h3>
                  <p>
                    Sales scale alone does not explain profitability. The overview places both in
                    context.
                  </p>
                </div>
                <div>
                  <span>02 / Investigate</span>
                  <h3>Look at the timing.</h3>
                  <p>
                    Event-linked revenue points to a pattern to investigate, rather than proof of a
                    sales uplift.
                  </p>
                </div>
                <div>
                  <span>03 / Decide</span>
                  <h3>Turn a segment into a hypothesis.</h3>
                  <p>Category, region, and channel views help define what to test next.</p>
                </div>
              </figcaption>
            )}
          </figure>
        ) : (
          <p className="studio-fallback">
            Explore my approach and experience below. Project evidence will appear here when
            available.
          </p>
        )}
      </div>
    </section>
  );
}
