import { groupSkills } from "@/components/portfolio/SkillGroups";
import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { PageHero } from "@/components/portfolio/PageHero";
import { FinalCTA } from "@/components/portfolio/FinalCTA";
import { pageHead } from "@/lib/seo";

import { getAboutPageData } from "@/lib/public-data.functions";
import { useSiteContent } from "@/lib/site-content";
export const Route = createFileRoute("/about")({
  loader: () => getAboutPageData(),
  head: () =>
    pageHead(
      "About & experience",
      "Data analysis, Power BI, SQL, and Python experience. Based in Vienna and open to employment and freelance projects.",
      "/about",
    ),
  component: About,
});
function About() {
  const profile = useSiteContent();
  const { experiences, certifications, skills, unavailable } = Route.useLoaderData();
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        {unavailable && (
          <p className="container" role="status">
            Profile details are temporarily unavailable. Please refresh to try again.
          </p>
        )}
        <PageHero
          eyebrow="About Zain"
          title="An analyst who connects the numbers to the next decision."
          description={profile.about}
          actions={
            <>
              <a className="button button-primary" href={profile.resume} download>
                Download resume
              </a>
              <Link
                className="button button-outline"
                to="/contact"
                search={{ intent: "employment" }}
              >
                Discuss a role
              </Link>
            </>
          }
        />
        <section className="section">
          <div className="container about-summary">
            <img src={profile.portrait} alt={profile.name} width="480" height="480" />
            <div>
              <p className="eyebrow">{profile.location}</p>
              <h2>Clear questions. Careful analysis. Useful reports.</h2>
              <p>{profile.about}</p>
              <p>{profile.availability}</p>
              <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">
                Explore my code ↗
              </a>
            </div>
          </div>
        </section>
        <section className="section section-tint" id="experience">
          <div className="container">
            <div className="section-intro">
              <p className="eyebrow">Professional background</p>
              <h2>Experience</h2>
              <p>
                Roles and responsibilities, with examples of technical work in the project
                portfolio.
              </p>
            </div>
            <div className="timeline">
              {experiences.map((e) => (
                <article className="timeline-item" key={e.id}>
                  <div className="meta-row">
                    {e.start_year}–{e.is_current ? "Present" : e.end_year} · {e.location}
                  </div>
                  <h3>{e.title}</h3>
                  <p>{e.company}</p>
                  <p>{e.description}</p>
                  <ul>
                    {(e.bullet_points || []).map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </article>
              ))}
            </div>
            {!experiences.length && (
              <p>
                Experience details are temporarily unavailable.{" "}
                <a className="text-link" href={profile.resume}>
                  View the resume
                </a>
                .
              </p>
            )}
          </div>
        </section>
        <section className="section">
          <div className="container">
            <div className="section-intro">
              <p className="eyebrow">What I bring</p>
              <h2>A practical analytical toolkit</h2>
            </div>
            <div className="service-grid">
              {groupSkills(skills).map(([category, items]) => (
                <article className="service-card" key={category}>
                  <h3>{category}</h3>

                  <div className="tag-list">
                    {(items || []).map(({ name: t }) => (
                      <span className="tag" key={t}>
                        {t}
                      </span>
                    ))}
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
        {certifications.length > 0 && (
          <section className="section section-tint">
            <div className="container">
              <div className="section-intro">
                <p className="eyebrow">Continuing development</p>
                <h2>Learning & courses</h2>
              </div>
              <div className="credential-grid">
                {certifications.map((c) => (
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
          </section>
        )}
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
