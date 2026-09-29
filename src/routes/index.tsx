import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, Search } from "lucide-react";
import { useState } from "react";
import { SignalField } from "@/components/portfolio/SignalField";
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
  const { projects, services, experiences, skills, posts, contentUnavailable } =
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
        <section className="open-hero container">
          <div className="open-hero-panel">
            <SignalField />
            <div className="open-hero-copy">
              <p className="open-kicker">
                {profile.role} · {profile.location}
              </p>
              <h1>
                Find the signal.
                <br />
                Build what matters.
              </h1>
              <p>{profile.intro}</p>
              <div className="actions">
                <Link className="button button-primary" to="/projects">
                  Explore my work <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
                <Link className="button button-outline" to="/contact">
                  Work with me <ArrowUpRight size={16} aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="open-hero-caption">
              <span>{profile.availability}</span>
              <span>Analysis → Insight → Action</span>
            </div>
          </div>
        </section>
        <section className="open-explorer container" aria-labelledby="explore-title">
          <h2 id="explore-title">What would you like to explore?</h2>
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
            <div id="home-search-results" className="open-search-results" aria-live="polite">
              {matches.length ? (
                matches.map((p) => (
                  <Link key={p.id} to="/projects/$slug" params={{ slug: p.slug }}>
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
          <div className="open-shortcuts">
            <Link to="/projects">
              Projects <ArrowUpRight size={14} />
            </Link>
            <Link to="/services">
              Services <ArrowUpRight size={14} />
            </Link>
            <Link to="/about">
              Experience <ArrowUpRight size={14} />
            </Link>
            <a href={profile.resume} download>
              Resume <ArrowUpRight size={14} />
            </a>
            <Link to="/blog">
              Writing <ArrowUpRight size={14} />
            </Link>
          </div>
        </section>
        {contentUnavailable && (
          <p className="container" role="status">
            Some portfolio content is temporarily unavailable. Please refresh to try again.
          </p>
        )}
        <section className="section open-work" id="selected-work">
          <div className="container">
            <div className="open-section-heading">
              <h2>Selected work</h2>
              <Link to="/projects">
                View all {projects.length} projects <ArrowUpRight size={16} />
              </Link>
            </div>
            <div className="open-feature-grid">
              {selected.map((p, i) => (
                <article
                  className={"open-feature " + (i === 0 ? "open-feature-main" : "")}
                  key={p.id}
                >
                  <Link
                    className="open-feature-media"
                    to="/projects/$slug"
                    params={{ slug: p.slug }}
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    {p.gallery?.[0]?.image_url || p.image_url ? (
                      <img
                        src={p.gallery?.[0]?.image_url || p.image_url}
                        alt=""
                        width="1200"
                        height="750"
                        loading="lazy"
                      />
                    ) : (
                      <div className="open-media-fallback">{p.technologies.join(" / ")}</div>
                    )}
                  </Link>
                  <div className="open-feature-copy">
                    <p className="small-label">{p.category}</p>
                    <h3>
                      <Link to="/projects/$slug" params={{ slug: p.slug }}>
                        {p.title}
                      </Link>
                    </h3>
                    <p>{p.project_goal || p.short_description}</p>
                    <div className="tag-list">
                      {p.technologies.slice(0, 3).map((t) => (
                        <span className="tag" key={t}>
                          {t}
                        </span>
                      ))}
                    </div>
                    <Link className="text-link" to="/projects/$slug" params={{ slug: p.slug }}>
                      Explore the project <ArrowUpRight size={16} />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section open-services">
          <div className="container">
            <div className="open-section-heading">
              <h2>Expertise for your next project</h2>
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
        <section className="section open-profile">
          <div className="container">
            <div className="open-profile-layout">
              <div>
                <p className="small-label">Behind the work</p>
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
          </div>
        </section>
        {!!posts.length && (
          <section className="section">
            <div className="container">
              <div className="open-section-heading">
                <h2>Latest writing</h2>
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
                        <img src={p.cover_url} alt="" width="600" height="360" loading="lazy" />
                      </Link>
                    )}
                    <p className="small-label">{p.category || "Writing"}</p>
                    <h3>
                      <Link to="/blog/$slug" params={{ slug: p.slug }}>
                        {p.title}
                      </Link>
                    </h3>
                    <Link className="text-link" to="/blog/$slug" params={{ slug: p.slug }}>
                      Read article <ArrowUpRight size={16} />
                    </Link>
                  </article>
                ))}
              </div>
            </div>
          </section>
        )}
        <section className="open-contact container">
          <p className="small-label">Let’s work together</p>
          <h2>
            A new role.
            <br />A new data challenge.
          </h2>
          <p>{profile.availability}</p>
          <div className="actions">
            <Link className="button button-primary" to="/contact" search={{ intent: "employment" }}>
              Discuss a role <ArrowUpRight size={16} />
            </Link>
            <Link className="button button-outline" to="/contact" search={{ intent: "freelance" }}>
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
