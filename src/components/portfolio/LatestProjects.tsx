import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import type { Project } from "@/lib/api";
export function ProjectCard({ project }: { project: Project }) {
  return (
    <article className="project-card">
      {project.image_url && (
        <Link
          className="project-image"
          to="/projects/$slug"
          params={{ slug: project.slug }}
          tabIndex={-1}
          aria-hidden="true"
        >
          <img
            src={project.image_url}
            srcSet={project.image_srcset}
            sizes="(max-width: 580px) 92vw, (max-width: 850px) 45vw, 30vw"
            alt=""
            width="640"
            height="400"
            loading="lazy"
            decoding="async"
          />
        </Link>
      )}
      <div className="project-card-body">
        <span className="project-type">{project.study_type || "Portfolio study"}</span>
        <h3>
          <Link to="/projects/$slug" params={{ slug: project.slug }}>
            {project.title}
          </Link>
        </h3>
        <p>{project.short_description}</p>
        <div className="tag-list">
          {project.technologies.slice(0, 3).map((tool) => (
            <span className="tag" key={tool}>
              {tool}
            </span>
          ))}
        </div>
        {project.findings?.[0] && (
          <div className="project-finding">
            <span className="small-label">Inside the analysis</span>
            <strong>{project.findings[0].title}</strong>
          </div>
        )}
        <Link className="text-link" to="/projects/$slug" params={{ slug: project.slug }}>
          Read case study<span className="sr-only">: {project.title}</span>
          <ArrowRight size={17} aria-hidden="true" />
        </Link>
      </div>
    </article>
  );
}
export function LatestProjects({
  projects,
  unavailable = false,
}: {
  projects: Project[];
  unavailable?: boolean;
}) {
  return (
    <section className="section" id="selected-work">
      <div className="container">
        <div className="section-heading">
          <div>
            <p className="eyebrow">Selected work</p>
            <h2>
              Explore the thinking
              <br />
              behind the numbers.
            </h2>
            <p className="section-intro">
              Business questions, analytical choices, and the reports and code behind them.
            </p>
          </div>
          <Link to="/projects" className="text-link">
            All projects
            <ArrowRight size={17} aria-hidden="true" />
          </Link>
        </div>
        {projects.length ? (
          <div className="project-grid">
            {projects.map((project) => (
              <ProjectCard key={project.id} project={project} />
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <h3>
              {unavailable
                ? "Projects are temporarily unavailable"
                : "More work will be added here"}
            </h3>
            <p>Explore the repositories on GitHub or get in touch to discuss my work.</p>
            <a
              className="text-link"
              href="https://github.com/zainhaidar16"
              target="_blank"
              rel="noreferrer"
            >
              View GitHub ↗
            </a>
          </div>
        )}
      </div>
    </section>
  );
}
