import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Search } from "lucide-react";
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
      (p) =>
        !result.includes(p) &&
        p.technologies.some((t) => /python|spark|etl/i.test(t)),
    ),
  );
  for (const p of source) {
    if (result.length >= 3) break;
    take(p);
  }
  return result;
}
function Home() {
  const {
    projects,
    services,
    experiences,
    skills,
    certifications,
    posts,
    contentUnavailable,
  } = Route.useLoaderData();
  const profile = useSiteContent();
  const selected = selectWork(projects);
  const [query, setQuery] = useState("");
  const matches = query.trim()
    ? projects
        .filter((p) =>
          [p.title, ...p.technologies]
            .join(" ")
            .toLowerCase()
            .includes(query.trim().toLowerCase()),
        )
        .slice(0, 5)
    : [];
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="rare-hero" aria-labelledby="hero-title">
          <svg
            className="hero-emblem"
            viewBox="0 0 1000 1000"
            aria-hidden="true"
            focusable="false"
          >
            <path
              d="M205 225H795L205 775H795"
              fill="none"
              stroke="currentColor"
              strokeWidth="174"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          <div className="rare-hero-content">
            <p className="hero-badge hero-stage">
              <span aria-hidden="true" />
              {profile.role}
            </p>
            <h1 className="hero-stage" id="hero-title">
              <span>Turning complex data</span>
              <span>into clear decisions.</span>
            </h1>
            <p className="hero-intro hero-stage">
              I’m {profile.name}, based in {profile.location}. {profile.intro}
            </p>
            <div className="actions hero-stage">
              <Link className="button button-primary" to="/projects">
                Explore My Work <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
              <Link className="button button-outline" to="/contact">
                Contact Me <ArrowUpRight size={17} aria-hidden="true" />
              </Link>
            </div>
            <a className="hero-cv hero-stage" href={profile.resume} download>
              Download CV <span aria-hidden="true">↗</span>
            </a>
          </div>
          <div className="hero-bottom">
            <p>{profile.availability}</p>
            <nav aria-label="More to explore">
              <Link to="/services">
                Services <ArrowUpRight size={13} />
              </Link>
              <Link to="/blog">
                Writing <ArrowUpRight size={13} />
              </Link>
            </nav>
          </div>
        </section>
        {contentUnavailable && (
          <p className="container" role="status">
            Some portfolio content is temporarily unavailable. Please refresh to
            try again.
          </p>
        )}
        <section className="section open-work" id="selected-work">
          <div className="container">
            <div className="open-section-heading">
              <div>
                <p className="small-label">01 / Selected work</p>
                <h2>
                  From raw data
                  <br />
                  to <em>something useful.</em>
                </h2>
              </div>
              <Link to="/projects">
                View all {projects.length} projects <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="open-search-wrap">
              <label className="sr-only" htmlFor="home-search">
                Search projects and technologies
              </label>
              <Search size={20} aria-hidden="true" />
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
              <div
                id="home-search-results"
                className="open-search-results"
                aria-live="polite"
              >
                {matches.length ? (
                  matches.map((p) => (
                    <Link
                      key={p.id}
                      to="/projects/$slug"
                      params={{ slug: p.slug }}
                    >
                      {p.title}
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
        <section className="section open-services" id="capabilities">
          <div className="container">
            <div className="open-section-heading">
              <div>
                <p className="small-label">02 / Capabilities</p>
                <h2>
                  A question.
                  <br />
                  <em>A way forward.</em>
                </h2>
              </div>
              <Link to="/services">
                All services <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="open-service-list">
              {services.map((s) => (
                <Link key={s.id} to="/services/$slug" params={{ slug: s.slug }}>
                  <div>
                    <h3>{s.title}</h3>
                    <p>{s.short_description}</p>
                  </div>
                  <ArrowUpRight size={22} aria-hidden="true" />
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
                  Good work starts
                  <br />
                  with <em>better questions.</em>
                </h2>
              </div>
              <p className="section-aside">
                A practical approach, from the first conversation to the next
                update.
              </p>
            </div>
            <DataWorkflow />
          </div>
        </section>
        <section className="section open-profile">
          <div className="container">
            <div className="open-profile-layout">
              <div>
                <p className="small-label">04 / Experience</p>
                <h2>{profile.name}</h2>
                <p className="open-profile-intro">{profile.about}</p>
                <div className="actions">
                  <Link className="button button-primary" to="/about">
                    About & experience <ArrowUpRight size={16} />
                  </Link>
                  <a className="text-link" href={profile.resume} download>
                    Download resume <ArrowUpRight size={16} />
                  </a>
                </div>
              </div>
              <img
                src={profile.portrait}
                alt={profile.name}
                width="600"
                height="700"
                loading="lazy"
              />
            </div>
            <div className="open-experience">
              {experiences.map((e) => (
                <article key={e.id}>
                  <p className="small-label">
                    {e.start_year}–{e.is_current ? "Present" : e.end_year}
                  </p>
                  <h3>{e.title}</h3>
                  <p>{e.company}</p>
                </article>
              ))}
            </div>
            <div className="open-section-heading open-toolkit-heading">
              <h2>Tools & capabilities</h2>
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
        {!!posts.length && (
          <section className="section">
            <div className="container">
              <div className="open-section-heading">
                <div>
                  <p className="small-label">05 / Notes</p>
                  <h2>
                    Ideas worth
                    <br />
                    <em>thinking through.</em>
                  </h2>
                </div>
                <Link to="/blog">
                  View all <ArrowUpRight size={16} />
                </Link>
              </div>
              <div className="open-notes">
                {posts.slice(0, 3).map((p) => (
                  <article key={p.id}>
                    {p.cover_url && (
                      <Link
                        to="/blog/$slug"
                        params={{ slug: p.slug }}
                        tabIndex={-1}
                        aria-hidden="true"
                      >
                        <img
                          src={p.cover_url}
                          alt=""
                          width="600"
                          height="360"
                          loading="lazy"
                        />
                      </Link>
                    )}
                    <p className="small-label">
                      {p.category || "Writing"}
                      {p.reading_time ? " · " + p.reading_time : ""}
                    </p>
                    <h3>
                      <Link to="/blog/$slug" params={{ slug: p.slug }}>
                        {p.title}
                      </Link>
                    </h3>
                    <p>{p.excerpt}</p>
                    <Link
                      className="text-link"
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                    >
                      Read article <ArrowUpRight size={16} />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
        <section className="open-contact container">
          <p className="small-label">06 / Contact</p>
          <h2>
            A new role.
            <br />
            <em>A new data challenge.</em>
          </h2>
          <p>{profile.availability}</p>
          <div className="actions">
            <Link
              className="button button-primary"
              to="/contact"
              search={{ intent: "employment" }}
            >
              Discuss a role <ArrowUpRight size={16} />
            </Link>
            <Link
              className="button button-outline"
              to="/contact"
              search={{ intent: "freelance" }}
            >
              Start a project <ArrowUpRight size={16} />
            </Link>
          </div>
          <a className="text-link" href={"mailto:" + profile.email}>
            {profile.email} <ArrowUpRight size={16} />
          </a>
        </section>
      </main>
      <Footer />
    </>
  );
}
