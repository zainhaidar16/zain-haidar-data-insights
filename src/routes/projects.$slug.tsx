import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { PageHero } from "@/components/portfolio/PageHero";
import { FinalCTA } from "@/components/portfolio/FinalCTA";
import { pageHead } from "@/lib/seo";

import { getProjectDetailData } from "@/lib/public-data.functions";
import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
export const Route = createFileRoute("/projects/$slug")({
  loader: async ({ params }) => {
    const data = await getProjectDetailData({ data: { slug: params.slug } });
    if (!data.project) throw notFound();
    return data;
  },
  head: ({ loaderData }) =>
    loaderData?.project
      ? pageHead(
          loaderData.project.title,
          loaderData.project.short_description,
          "/projects/" + loaderData.project.slug,
          loaderData.project.image_url,
        )
      : {},
  component: ProjectDetail,
});
function ProjectDetail() {
  const { project: p } = Route.useLoaderData();
  if (!p) return null;
  const images = p.gallery?.length
    ? p.gallery
    : p.image_url
      ? [{ image_url: p.image_url, alt_text: p.title, caption: "Report preview" }]
      : [];
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <PageHero
          eyebrow={p.study_type || "Portfolio study"}
          before={<Link to="/projects">← All projects</Link>}
          title={p.title}
          description={p.hero_description || p.short_description}
          actions={
            <>
              {p.live_url && (
                <a
                  className="button button-primary"
                  href={p.live_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  Open interactive report ↗
                </a>
              )}
              {p.github_url && (
                <a
                  className="button button-outline"
                  href={p.github_url}
                  target="_blank"
                  rel="noreferrer"
                >
                  View source code ↗
                </a>
              )}
            </>
          }
        />
        <section className="section">
          <div className="container detail-layout">
            <article className="article-body">
              <h2>The question</h2>
              <p>{p.project_goal || p.problem || p.short_description}</p>
              {p.contribution && (
                <>
                  <h2>My contribution</h2>
                  <p>{p.contribution}</p>
                </>
              )}
              {p.approach?.length && (
                <>
                  <h2>Approach</h2>
                  <ol>
                    {p.approach.map((s, i) => (
                      <li key={i}>{s}</li>
                    ))}
                  </ol>
                </>
              )}
              {p.findings?.length && (
                <>
                  <h2>What the analysis shows</h2>
                  <div className="finding-list">
                    {p.findings.map((f) => (
                      <section className="finding" key={f.title}>
                        <h3>{f.title}</h3>
                        <p>{f.detail}</p>
                      </section>
                    ))}
                  </div>
                </>
              )}
              {p.recommendation && (
                <>
                  <h2>Recommended next step</h2>
                  <p>{p.recommendation}</p>
                </>
              )}
              {p.solution_steps?.length && (
                <details>
                  <summary>Implementation details</summary>
                  {p.solution_steps.map((s, i) => (
                    <section key={i}>
                      <h3>{s.title}</h3>
                      <p>{s.description}</p>
                    </section>
                  ))}
                </details>
              )}
              {images.length > 0 && (
                <>
                  <h2>Explore the report</h2>
                  <p>Select a screenshot for a larger view.</p>
                  <div className="gallery-grid">
                    {images.map((img, i) => (
                      <Dialog key={img.image_url}>
                        <DialogTrigger asChild>
                          <button
                            className="gallery-button"
                            aria-label={
                              "Enlarge " + (img.alt_text || p.title) + " screenshot " + (i + 1)
                            }
                          >
                            <img
                              src={img.image_url}
                              alt={img.alt_text || p.title + " report page " + (i + 1)}
                              width="1200"
                              height="750"
                              loading="lazy"
                            />
                            {img.caption && <span>{img.caption}</span>}
                          </button>
                        </DialogTrigger>
                        <DialogContent className="image-dialog">
                          <DialogTitle>
                            {p.title} · {i + 1}
                          </DialogTitle>
                          <DialogDescription>
                            {img.caption || "Report screenshot"} ·{" "}
                            <a
                              className="text-link"
                              href={img.image_url}
                              target="_blank"
                              rel="noreferrer"
                            >
                              Open full-size image ↗
                            </a>
                          </DialogDescription>
                          <img src={img.image_url} alt={img.alt_text || p.title} />
                        </DialogContent>
                      </Dialog>
                    ))}
                  </div>
                </>
              )}
              {p.limitations?.length && (
                <>
                  <h2>Limitations & interpretation</h2>
                  <ul>
                    {p.limitations.map((s) => (
                      <li key={s}>{s}</li>
                    ))}
                  </ul>
                </>
              )}
            </article>
            <aside className="detail-aside">
              <p className="eyebrow">Project at a glance</p>
              <h3>Tools</h3>
              <div className="tag-list">
                {p.technologies.map((t) => (
                  <span className="tag" key={t}>
                    {t}
                  </span>
                ))}
              </div>
              <h3>Data & scope</h3>
              <p>
                {p.source_note ||
                  p.data_sources?.join(", ") ||
                  "See the linked project materials for dataset context."}
              </p>
              {p.period_note && <p>{p.period_note}</p>}
              {p.evidence_links?.map((l) => (
                <p key={l.url}>
                  <a className="text-link" href={l.url} target="_blank" rel="noreferrer">
                    {l.label} ↗
                  </a>
                </p>
              ))}
              <Link className="text-link" to="/contact" search={{ intent: "freelance" }}>
                Discuss a similar project →
              </Link>
            </aside>
          </div>
        </section>
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
