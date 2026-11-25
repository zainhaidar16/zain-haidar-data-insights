import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Download, MapPin, Search } from "lucide-react";
import { useState } from "react";
import { DataWorkflow } from "@/components/portfolio/DataWorkflow";
import { ProjectCard } from "@/components/portfolio/LatestProjects";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { SkillGroups } from "@/components/portfolio/SkillGroups";
import { getHomePageData } from "@/lib/public-data.functions";
import { useSiteContent } from "@/lib/site-content";
import { pageHead } from "@/lib/seo";
import type { Project } from "@/lib/api";

export const Route = createFileRoute("/")({
  loader: () => getHomePageData(),
  head: () =>
    pageHead(
      "Data Analyst & Power BI Specialist",
      "Data analysis, reporting, and engineering by Zain Haidar. Explore the work and the thinking behind it.",
      "/",
    ),
  component: Home,
});

function selectWork(projects: Project[]) {
  const pool = projects.filter((p) => p.featured);
  const source = pool.length ? pool : projects;
  const result: Project[] = [];
  const take = (p: Project | undefined) => {
    if (p && !result.some((r) => r.id === p.id)) result.push(p);
  };
  take(source[0]);
  take(
    source.find(
      (p) =>
        !result.includes(p) &&
        p.technologies.some((t) => /sql/i.test(t)) &&
        !p.technologies.some((t) => /power bi/i.test(t)),
    ),
  );
  take(
    source.find(
      (p) => !result.includes(p) && p.technologies.some((t) => /python|spark|etl/i.test(t)),
    ),
  );
  for (const p of source) {
    if (result.length >= 3) break;
    take(p);
  }
  return result;
}

function Home() {
  const { projects, services, experiences, skills, certifications, contentUnavailable } =
    Route.useLoaderData();
  const profile = useSiteContent();
  const selected = selectWork(projects);
  const [query, setQuery] = useState("");
  const matches = query.trim()
    ? projects
        .filter((p) =>
          [p.title, ...p.technologies].join(" ").toLowerCase().includes(query.trim().toLowerCase()),
        )
        .slice(0, 5)
    : [];

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="enterprise-hero" aria-labelledby="hero-title">
          <div className="container enterprise-hero-grid">
            <div className="enterprise-hero-copy">
              <p className="hero-eyebrow">{profile.role}</p>
              <h1 id="hero-title">
                Turning complex data
                <br />
                into clear decisions.
              </h1>
              <p className="hero-intro">
                I’m {profile.name}, based in {profile.location}. {profile.intro}
              </p>
              <div className="actions hero-actions">
                <Link className="button button-primary" to="/projects">
                  Explore My Work <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
                <a className="button button-accent" href={profile.resume} download>
                  <Download size={16} aria-hidden="true" />
                  Download CV
                </a>
                <Link className="button button-outline" to="/contact">
                  Contact Me
                </Link>
              </div>
              <div className="hero-meta-strip">
                <span className="hero-meta-item">
                  <MapPin size={15} aria-hidden="true" />
                  {profile.location}
                </span>
                <span className="hero-meta-divider" aria-hidden="true" />
                <span className="hero-meta-item">{profile.availability}</span>
                <span className="hero-meta-divider" aria-hidden="true" />
                <Link className="hero-meta-link" to="/services">
                  Services <ArrowUpRight size={14} aria-hidden="true" />
                </Link>
              </div>
            </div>

            <figure className="hero-portrait-card">
              <div className="hero-portrait-frame">
                <img
                  src={profile.portrait}
                  alt={profile.name}
                  width="600"
                  height="700"
                  loading="eager"
                />
              </div>
              <figcaption className="hero-portrait-caption">
                <div>
                  <strong>{profile.name}</strong>
                  <span>{profile.role}</span>
                </div>
                <span className="hero-portrait-location">{profile.location}</span>
              </figcaption>
            </figure>
          </div>
        </section>

        {contentUnavailable && (
          <div className="container">
            <p className="status-notice" role="status">
              Some portfolio content is temporarily unavailable. Please refresh to try again.
            </p>
          </div>
        )}

        <section className="section open-work" id="selected-work">
          <div className="container">
            <div className="open-section-heading">
              <div>
                <p className="small-label">01 / Selected work</p>
                <h2>
                  From raw data to <em>something useful.</em>
                </h2>
              </div>
              <Link className="section-link" to="/projects">
                View all {projects.length} projects <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className="open-search-wrap">
              <label className="sr-only" htmlFor="home-search">
                Search projects and technologies
              </label>
              <Search size={18} aria-hidden="true" />
              <input
                id="home-search"
                type="search"
                placeholder="Search projects, Power BI, Python, SQL…"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-controls="home-search-results"
                autoComplete="off"
              />
            </div>
            {query.trim() && (
              <div id="home-search-results" className="open-search-results" aria-live="polite">
                {matches.length ? (
                  matches.map((p) => (
                    <Link key={p.id} to="/projects/$slug" params={{ slug: p.slug }}>
                      <span>{p.title}</span>
                      <ArrowUpRight size={16} aria-hidden="true" />
                    </Link>
                  ))
                ) : (
                  <p>
                    No matching projects. Try another technology or{" "}
                    <Link to="/projects">browse the portfolio</Link>.
                  </p>
                )}
              </div>
            )}
            <div className="open-feature-grid">
              {selected.map((p) => (
                <ProjectCard project={p} key={p.id} />
              ))}
            </div>
          </div>
        </section>

        <section className="section section-tint open-services" id="capabilities">
          <div className="container">
            <div className="open-section-heading">
              <div>
                <p className="small-label">02 / Capabilities</p>
                <h2>
                  A question. <em>A way forward.</em>
                </h2>
              </div>
              <Link className="section-link" to="/services">
                All services <ArrowUpRight size={16} aria-hidden="true" />
              </Link>
            </div>
            <div className="open-service-list">
              {services.map((s, idx) => (
                <Link key={s.id} to="/services/$slug" params={{ slug: s.slug }}>
                  <div className="open-service-content">
                    <span className="service-index">{String(idx + 1).padStart(2, "0")}</span>
                    <h3>{s.title}</h3>
                    <p>{s.short_description}</p>
                  </div>
                  <ArrowUpRight className="open-service-arrow" size={20} aria-hidden="true" />
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section className="section studio-approach">
          <div className="container">
            <div className="open-section-heading">
              <div>
                <p className="small-label">03 / Working approach</p>
                <h2>
                  Good work starts with <em>better questions.</em>
                </h2>
              </div>
              <p className="section-aside">
                A practical approach, from the first conversation to the next update.
              </p>
            </div>
            <DataWorkflow />
          </div>
        </section>

        <section className="section section-tint open-profile" id="experience">
          <div className="container">
            <div className="open-section-heading">
              <div>
                <p className="small-label">04 / Experience &amp; expertise</p>
                <h2>{profile.name}</h2>
              </div>
              <div className="actions header-inline-actions">
                <Link className="button button-primary" to="/about">
                  About &amp; experience <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <a className="button button-outline" href={profile.resume} download>
                  <Download size={15} aria-hidden="true" />
                  Download resume
                </a>
              </div>
            </div>

            <p className="open-profile-intro">{profile.about}</p>

            <div className="open-experience">
              {experiences.map((e) => (
                <article key={e.id}>
                  <p className="experience-period">
                    {e.start_year}–{e.is_current ? "Present" : e.end_year}
                  </p>
                  <h3>{e.title}</h3>
                  <p className="experience-company">{e.company}</p>
                </article>
              ))}
            </div>

            <div className="open-section-heading open-toolkit-heading">
              <div>
                <p className="small-label">Technical expertise</p>
                <h3>Tools &amp; capabilities</h3>
              </div>
            </div>
            <SkillGroups skills={skills} />

            {!!certifications.length && (
              <div className="home-credentials">
                <p className="small-label">Continuing development</p>
                <div className="credential-grid">
                  {certifications.slice(0, 3).map((c) => (
                    <article className="credential" key={c.id}>
                      <p className="small-label">{c.provider}</p>
                      <h3>{c.title}</h3>
                      {c.credential_url && (
                        <a
                          className="text-link"
                          href={c.credential_url}
                          target="_blank"
                          rel="noreferrer"
                        >
                          View credential ↗
                        </a>
                      )}
                    </article>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>

        <section className="section contact-band-wrap">
          <div className="container">
            <div className="open-contact">
              <div className="open-contact-copy">
                <p className="small-label">05 / Contact</p>
                <h2>
                  A new role.
                  <br />
                  <em>A new data challenge.</em>
                </h2>
                <p>{profile.availability}</p>
                <a className="contact-email-link" href={"mailto:" + profile.email}>
                  {profile.email} <ArrowUpRight size={16} aria-hidden="true" />
                </a>
              </div>
              <div className="actions open-contact-actions">
                <Link
                  className="button button-on-dark-primary"
                  to="/contact"
                  search={{ intent: "employment" }}
                >
                  Discuss a role <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <Link
                  className="button button-on-dark-outline"
                  to="/contact"
                  search={{ intent: "freelance" }}
                >
                  Start a project <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
