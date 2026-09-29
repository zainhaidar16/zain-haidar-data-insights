import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowDown, Plus } from "lucide-react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { SkillGroups } from "@/components/portfolio/SkillGroups";
import { getHomePageData } from "@/lib/public-data.functions";
import { useSiteContent } from "@/lib/site-content";
import { pageHead } from "@/lib/seo";
import type { Project, Service } from "@/lib/api";
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
function groupServices(services: Service[]) {
  const groups = [
    { title: "Understand your data", label: "Analysis & intelligence", items: [] as Service[] },
    {
      title: "Build a clearer picture",
      label: "Dashboards & applications",
      items: [] as Service[],
    },
    { title: "Make it repeatable", label: "Preparation & automation", items: [] as Service[] },
  ];
  for (const service of services) {
    const text = service.title.toLowerCase();
    const index = /etl|clean|automat/.test(text) ? 2 : /dashboard|web/.test(text) ? 1 : 0;
    groups[index].items.push(service);
  }
  return groups.filter((g) => g.items.length);
}
function Home() {
  const { projects, services, experiences, skills, posts, contentUnavailable } =
    Route.useLoaderData();
  const profile = useSiteContent();
  const selected = selectWork(projects);
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="studio-hero atelier-hero">
          <div className="container atelier-hero-grid">
            <div className="hero-content">
              <div className="hero-kicker">
                <span className="status-dot" />
                {profile.role}
              </div>
              <h1>
                {profile.headline}
                <br />
                <em>{profile.headline_accent}</em>
              </h1>
              <p className="hero-description">{profile.intro}</p>
              <div className="actions">
                <a href="#selected-work" className="button button-primary">
                  Explore the work <ArrowDown size={17} aria-hidden="true" />
                </a>
                <Link to="/contact" className="text-link">
                  Let’s talk <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </div>
              <div className="hero-signature">
                <img src={profile.portrait} alt={profile.name} width="48" height="48" />
                <div>
                  <strong>{profile.name}</strong>
                  <span>{profile.location}</span>
                </div>
              </div>
            </div>
            <figure className="atelier-figure">
              <img
                src="/art/data-atelier.webp"
                srcSet="/art/data-atelier-800.webp 800w, /art/data-atelier.webp 1536w"
                sizes="(max-width: 850px) 100vw, 54vw"
                width="1536"
                height="1024"
                alt="A physical data installation: scattered ceramic cubes become ordered columns alongside a green glass plane."
                fetchPriority="high"
              />
              <figcaption>
                <span>From observation to understanding</span>
                <span aria-hidden="true">Fig. 01</span>
              </figcaption>
            </figure>
          </div>
          <div className="container hero-foot">
            <span>
              <span className="status-dot" />
              {profile.availability}
            </span>
            <a href="#selected-work" aria-label="Scroll to selected work">
              Discover the work <ArrowDown size={14} aria-hidden="true" />
            </a>
          </div>
        </section>
        <div className="studio-paths container">
          <Link to="/about">
            <span>For hiring teams</span>
            <strong>
              Meet your next analyst <ArrowUpRight size={20} aria-hidden="true" />
            </strong>
          </Link>
          <Link to="/services">
            <span>For your next project</span>
            <strong>
              Find the right expertise <ArrowUpRight size={20} aria-hidden="true" />
            </strong>
          </Link>
        </div>
        {contentUnavailable && (
          <p className="container" role="status">
            Some portfolio content is temporarily unavailable. Please refresh to try again.
          </p>
        )}
        <section className="section studio-work" id="selected-work">
          <div className="container">
            <div className="premium-heading">
              <p className="eyebrow">01 / Selected work</p>
              <h2>
                Less guesswork.
                <br />
                <em>More understanding.</em>
              </h2>
              <Link className="text-link" to="/projects">
                Explore all {projects.length} projects <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="studio-case-list">
              {selected.map((p, i) => (
                <article className="studio-case" key={p.id}>
                  <div className="case-description">
                    <span className="case-index">
                      0{i + 1} / {p.category}
                    </span>
                    <h3>
                      <Link to="/projects/$slug" params={{ slug: p.slug }}>
                        {p.title}
                      </Link>
                    </h3>
                    <p>{p.project_goal || p.problem || p.short_description}</p>
                    {p.approach?.[0] && (
                      <div className="case-note">
                        <span>The approach</span>
                        <p>{p.approach[0]}</p>
                      </div>
                    )}
                    <div className="tag-list">
                      {p.technologies.slice(0, 4).map((t) => (
                        <span key={t} className="tag">
                          {t}
                        </span>
                      ))}
                    </div>
                    <Link className="text-link" to="/projects/$slug" params={{ slug: p.slug }}>
                      Inside the project <ArrowUpRight size={18} aria-hidden="true" />
                    </Link>
                  </div>
                  <Link
                    to="/projects/$slug"
                    params={{ slug: p.slug }}
                    className="case-visual"
                    aria-label={"Explore " + p.title}
                  >
                    {(p.gallery?.[0]?.image_url || p.image_url) && (
                      <img
                        src={p.gallery?.[0]?.image_url || p.image_url}
                        alt={p.gallery?.[0]?.alt_text || p.title}
                        width="1200"
                        height="750"
                        loading="lazy"
                      />
                    )}
                    <span className="case-open">
                      <ArrowUpRight aria-hidden="true" />
                    </span>
                  </Link>
                </article>
              ))}
            </div>
          </div>
        </section>
        <section className="section studio-services">
          <div className="container">
            <div className="premium-heading">
              <p className="eyebrow">02 / Ways to work together</p>
              <h2>
                A useful answer.
                <br />
                <em>A considered process.</em>
              </h2>
              <Link to="/services" className="text-link">
                All services <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="service-chapters">
              {groupServices(services).map((g, i) => (
                <details className="service-chapter" key={g.title} open={i === 0}>
                  <summary>
                    <span className="chapter-number">0{i + 1}</span>
                    <div>
                      <span className="chapter-label">{g.label}</span>
                      <h3>{g.title}</h3>
                    </div>
                    <Plus className="chapter-toggle" size={24} aria-hidden="true" />
                  </summary>
                  <div className="chapter-services">
                    {g.items.map((s) => (
                      <Link key={s.id} to="/services/$slug" params={{ slug: s.slug }}>
                        <h4>
                          {s.title}
                          <ArrowUpRight size={17} aria-hidden="true" />
                        </h4>
                        <p>{s.short_description}</p>
                      </Link>
                    ))}
                  </div>
                </details>
              ))}
            </div>
          </div>
        </section>
        <section className="section studio-about">
          <div className="container">
            <div className="premium-heading">
              <p className="eyebrow">03 / Behind the work</p>
              <h2>
                Analytical by practice.
                <br />
                <em>Curious by nature.</em>
              </h2>
              <a className="text-link" href={profile.resume} download>
                Download resume <ArrowUpRight size={18} aria-hidden="true" />
              </a>
            </div>
            <div className="signal-bio">
              <div className="portrait-frame">
                <img
                  src={profile.portrait}
                  alt={profile.name}
                  width="600"
                  height="700"
                  loading="lazy"
                />
                <div>
                  <span>{profile.name}</span>
                  <span>{profile.location}</span>
                </div>
              </div>
              <div>
                <p className="bio-lead">{profile.about}</p>
                <div className="signal-timeline">
                  {experiences.map((e) => (
                    <article key={e.id}>
                      <span>
                        {e.start_year} — {e.is_current ? "Present" : e.end_year}
                      </span>
                      <h3>{e.title}</h3>
                      <p>{e.company}</p>
                    </article>
                  ))}
                </div>
                <Link className="text-link" to="/about">
                  Experience & credentials <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </div>
            </div>
            <div className="toolkit-heading">
              <p className="eyebrow">Tools of the trade</p>
              <h3>
                The right tools.<em> Connected thinking.</em>
              </h3>
            </div>
            <SkillGroups skills={skills} />
          </div>
        </section>
        {!!posts.length && (
          <section className="section studio-notes">
            <div className="container">
              <div className="premium-heading">
                <p className="eyebrow">04 / Field notes</p>
                <h2>
                  Ideas worth
                  <br />
                  <em>looking into.</em>
                </h2>
                <Link to="/blog" className="text-link">
                  All writing <ArrowUpRight size={18} aria-hidden="true" />
                </Link>
              </div>
              <div className="signal-notes">
                {posts.map((p) => (
                  <Link key={p.id} to="/blog/$slug" params={{ slug: p.slug }}>
                    {p.cover_url && (
                      <img src={p.cover_url} alt="" loading="lazy" width="600" height="360" />
                    )}
                    <span className="eyebrow">{p.category || "Writing"}</span>
                    <h3>{p.title}</h3>
                    <span className="text-link">
                      Read the note <ArrowUpRight size={16} aria-hidden="true" />
                    </span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
        <section className="studio-contact">
          <img
            src="/art/data-atelier.webp"
            alt=""
            aria-hidden="true"
            width="1672"
            height="941"
            loading="lazy"
          />
          <div className="container">
            <p className="eyebrow">A new role. A new question. A new possibility.</p>
            <h2>
              What can we
              <br />
              <em>make clearer?</em>
            </h2>
            <div className="actions">
              <Link
                className="button button-primary"
                to="/contact"
                search={{ intent: "employment" }}
              >
                Discuss a role <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
              <Link
                className="button button-outline"
                to="/contact"
                search={{ intent: "freelance" }}
              >
                Start a project <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <a className="contact-email" href={"mailto:" + profile.email}>
              {profile.email} <ArrowUpRight size={18} aria-hidden="true" />
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
