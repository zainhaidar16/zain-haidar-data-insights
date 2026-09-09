import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { PageHero } from "@/components/portfolio/PageHero";
import { FinalCTA } from "@/components/portfolio/FinalCTA";
import { pageHead } from "@/lib/seo";

import { getAboutPageData } from "@/lib/public-data.functions";
import { profile, capabilities } from "@/data/profile";
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
const roleCopy: Record<string, string[]> = {
  "2022": [
    "Build Power BI reports and prepare data with Python and SQL.",
    "Explore trends, define KPIs, and document repeatable reporting workflows.",
  ],
  "2019": [
    "Developed business intelligence dashboards and KPI reporting.",
    "Used SQL and Python for customer segmentation and data preparation.",
  ],
  "2017": [
    "Developed data-driven applications with Python and Django.",
    "Integrated reporting features and translated requirements into application workflows.",
  ],
};
function About() {
  const { experiences, certifications } = Route.useLoaderData();
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <PageHero
          eyebrow="About Zain"
          title="An analyst who connects the numbers to the next decision."
          description="I work across data preparation, analysis, and Power BI reporting, with a software engineering background that helps me build practical, repeatable workflows."
          actions={
            <>
              <a className="button button-primary" href={profile.resume} download>
                Download résumé
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
            <img src="/zain.jpg" alt="Zain Haidar" width="480" height="480" />
            <div>
              <p className="eyebrow">{profile.location}</p>
              <h2>Clear questions. Careful analysis. Useful reports.</h2>
              <p>
                I’m Zain, a data analyst focused on making information easier to use. My work brings
                together SQL, Python, and Power BI—from preparing source data to explaining the
                patterns in a finished report.
              </p>
              <p>
                I’m interested in data analyst and business intelligence roles, as well as focused
                freelance projects in dashboards, data preparation, and reporting automation.
              </p>
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
                  <ul>
                    {(roleCopy[e.start_year] || []).map((s) => (
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
                  View the résumé
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
              {capabilities.map((c) => (
                <article className="service-card" key={c.title}>
                  <h3>{c.title}</h3>
                  <p>{c.description}</p>
                  <div className="tag-list">
                    {c.tools.map((t) => (
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
