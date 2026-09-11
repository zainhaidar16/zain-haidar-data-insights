import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowUpRight, ArrowDown, MapPin } from "lucide-react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { ServicesMarketplace } from "@/components/portfolio/ServicesMarketplace";
import { SkillGroups } from "@/components/portfolio/SkillGroups";
import { getHomePageData } from "@/lib/public-data.functions";
import { useSiteContent } from "@/lib/site-content";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/")({
  loader: () => getHomePageData(),
  head: () =>
    pageHead(
      "Data Analyst & Power BI Specialist",
      "Explore data analysis, business intelligence, and reporting projects by Zain Haidar.",
      "/",
    ),
  component: Home,
});
function Home() {
  const { projects, services, experiences, skills, posts, contentUnavailable } =
    Route.useLoaderData();
  const profile = useSiteContent();
  const selected = projects.filter((p) => p.featured).slice(0, 6);
  const hero = selected[0];
  const reportImage = hero?.gallery?.[0]?.image_url || hero?.image_url;
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="signal-hero">
          {reportImage && (
            <img
              className="signal-backdrop"
              src={reportImage}
              alt=""
              aria-hidden="true"
              fetchPriority="high"
            />
          )}
          <div className="container signal-topline">
            <span>
              <i />
              {profile.availability}
            </span>
            <span>
              <MapPin size={13} aria-hidden="true" />
              {profile.location}
            </span>
          </div>
          <div className="container signal-layout">
            <div className="signal-copy">
              <p className="eyebrow">{profile.role}</p>
              <h1>
                {profile.headline}
                <br />
                <span>{profile.headline_accent}</span>
              </h1>
              <p className="signal-intro">{profile.intro}</p>
              <div className="actions">
                <a className="button button-primary" href="#selected-work">
                  Explore my work <ArrowDown size={17} aria-hidden="true" />
                </a>
                <Link className="text-link" to="/contact">
                  Let’s talk <ArrowUpRight size={17} aria-hidden="true" />
                </Link>
              </div>
              <div className="signal-person">
                <img src={profile.portrait} alt={profile.name} width="52" height="52" />
                <div>
                  <strong>{profile.name}</strong>
                  <span>{profile.role}</span>
                </div>
              </div>
            </div>
            {hero && (
              <Link className="signal-report" to="/projects/$slug" params={{ slug: hero.slug }}>
                <div className="report-chrome">
                  <span>
                    <i />
                    <i />
                    <i />
                  </span>
                  <span>PROJECT / 001</span>
                  <ArrowUpRight size={18} aria-hidden="true" />
                </div>
                {reportImage && (
                  <img
                    src={reportImage}
                    alt={hero.gallery?.[0]?.alt_text || hero.title}
                    width="1200"
                    height="750"
                    fetchPriority="high"
                  />
                )}
                <div className="report-caption">
                  <div>
                    <span>{hero.category}</span>
                    <strong>{hero.title}</strong>
                  </div>
                  <span>View project ↗</span>
                </div>
              </Link>
            )}
          </div>
          <div className="container signal-bottom">
            <span>ANALYSIS / ENGINEERING / INTELLIGENCE</span>
            <a href="#selected-work">Scroll to explore ↓</a>
          </div>
        </section>
        {contentUnavailable && (
          <p className="container" role="status">
            Some portfolio content could not be loaded. Please refresh to try again.
          </p>
        )}
        <section className="section selected-section" id="selected-work">
          <div className="container">
            <div className="premium-heading">
              <p className="eyebrow">01 / Selected work</p>
              <h2>
                The work.
                <br />
                <span className="muted-heading">Beyond the headline.</span>
              </h2>
              <Link className="text-link" to="/projects">
                All {projects.length} projects <ArrowUpRight size={18} aria-hidden="true" />
              </Link>
            </div>
            <div className="signal-work-grid">
              {selected.map((p, i) => (
                <Link
                  className="signal-work"
                  key={p.id}
                  to="/projects/$slug"
                  params={{ slug: p.slug }}
                >
                  <div className="work-image">
                    {(p.gallery?.[0]?.image_url || p.image_url) && (
                      <img
                        src={p.gallery?.[0]?.image_url || p.image_url}
                        alt={p.gallery?.[0]?.alt_text || p.title}
                        loading="lazy"
                        width="1200"
                        height="750"
                      />
                    )}
                    <span className="work-open">
                      <ArrowUpRight aria-hidden="true" />
                    </span>
                  </div>
                  <div className="work-meta">
                    <span>
                      {String(i + 1).padStart(2, "0")} / {p.category}
                    </span>
                    <span>{p.technologies.slice(0, 2).join(" · ")}</span>
                  </div>
                  <h3>{p.title}</h3>
                  <p>{p.short_description}</p>
                </Link>
              ))}
            </div>
            {!selected.length && <p>Featured projects will appear here when available.</p>}
          </div>
        </section>
        <ServicesMarketplace services={services} />
        <section className="section signal-about">
          <div className="container">
            <div className="premium-heading">
              <p className="eyebrow">03 / The analyst</p>
              <h2>
                A person behind
                <br />
                every perspective.
              </h2>
              <a className="text-link" href={profile.resume} download>
                Download resume ↗
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
                <span>
                  {profile.name} / {profile.location}
                </span>
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
                      <p>{e.description}</p>
                    </article>
                  ))}
                </div>
                <Link className="text-link" to="/about">
                  Full experience & credentials ↗
                </Link>
              </div>
            </div>
            <div className="toolkit-heading">
              <p className="eyebrow">The toolkit</p>
              <h3>Different tools. One connected workflow.</h3>
            </div>
            <SkillGroups skills={skills} />
          </div>
        </section>
        {!!posts.length && (
          <section className="section section-tint">
            <div className="container">
              <div className="premium-heading">
                <p className="eyebrow">04 / Notes</p>
                <h2>Thinking out loud.</h2>
                <Link className="text-link" to="/blog">
                  All writing ↗
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
                    <p>{p.excerpt}</p>
                    <span className="text-link">Read article ↗</span>
                  </Link>
                ))}
              </div>
            </div>
          </section>
        )}
        <section className="signal-contact">
          {reportImage && <img src={reportImage} alt="" aria-hidden="true" loading="lazy" />}
          <div className="container">
            <p className="eyebrow">Your next chapter / Let’s talk</p>
            <h2>
              Good work starts
              <br />
              with a conversation.
            </h2>
            <p>{profile.availability}</p>
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
              {profile.email} ↗
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
