import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { PageHero } from "@/components/portfolio/PageHero";
import { FinalCTA } from "@/components/portfolio/FinalCTA";
import { siteOrigin, pageHead } from "@/lib/seo";

import ReactMarkdown from "react-markdown";
import { getPostDetailData } from "@/lib/public-data.functions";
export const Route = createFileRoute("/blog/$slug")({
  loader: async ({ params }) => {
    const data = await getPostDetailData({ data: { slug: params.slug } });
    if (!data.post) throw notFound();
    return data;
  },
  head: ({ loaderData }) =>
    loaderData?.post
      ? pageHead(
          loaderData.post.seo_title || loaderData.post.title,
          loaderData.post.seo_description ||
            loaderData.post.excerpt ||
            "An article by Zain Haidar.",
          "/blog/" + loaderData.post.slug,
          loaderData.post.cover_url,
        )
      : {},
  component: Article,
});
function Article() {
  const { post: p, relatedPosts } = Route.useLoaderData();
  if (!p) return null;
  const cover = p.gallery?.find((image) => image.image_url === p.cover_url);
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: p.title,
    description: p.seo_description || p.excerpt,
    image: p.cover_url || undefined,
    datePublished: p.published_at || undefined,
    dateModified: p.updated_at || p.published_at || undefined,
    author: { "@type": "Person", name: p.author_name || "Zain Haidar", url: siteOrigin + "/about" },
    mainEntityOfPage: siteOrigin + "/blog/" + p.slug,
    inLanguage: "en",
  };
  return (
    <>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replace(/</g, "\\u003c") }} />
      <Header />
      <main id="main-content" tabIndex={-1}>
        <PageHero
          eyebrow={p.category || "Article"}
          before={<Link to="/blog">← All articles</Link>}
          title={p.title}
          description={p.excerpt || ""}
          meta={
            <span>
              {p.author_name || "Zain Haidar"}
              {p.published_at
                ? " · " +
                  new Date(p.published_at).toLocaleDateString("en-GB", {
                    day: "numeric",
                    month: "long",
                    year: "numeric",
                    timeZone: "UTC",
                  })
                : ""}
              {p.reading_time ? " · " + p.reading_time : ""}
            </span>
          }
        />
        <section className="section">
          <div className="container detail-layout">
            <article className="article-body">
              {p.slug === "claude-fable-5-suspension-anthropic-mythos-ai-export-controls" && (
                <aside className="notice">
                  <strong>Update: access was restored.</strong>
                  <p>
                    Anthropic’s model pages state that Fable 5 access was restored on 1 July 2026.
                    Mythos 5 access was restored for a set of US organizations following government
                    approval. Read the article below as historical context.
                  </p>
                  <a href="https://www.anthropic.com/claude/fable" target="_blank" rel="noreferrer">
                    Anthropic: Fable
                  </a>
                  {" · "}
                  <a
                    href="https://www.anthropic.com/claude/mythos"
                    target="_blank"
                    rel="noreferrer"
                  >
                    Anthropic: Mythos
                  </a>
                </aside>
              )}
              {p.cover_url && (
                <figure>
                  <img src={p.cover_url} alt={cover?.alt_text || p.title} width="1200" height="675" decoding="async" />
                  {cover?.caption && <figcaption>{cover.caption}</figcaption>}
                </figure>
              )}
              <ReactMarkdown>{p.body_md || ""}</ReactMarkdown>
              {!p.body_md &&
                p.sections?.map((s) => (
                  <section key={s.heading}>
                    <h2>{s.heading}</h2>
                    <ReactMarkdown>{s.content}</ReactMarkdown>
                  </section>
                ))}
            </article>
            <aside className="detail-aside">
              {p.key_takeaways?.length && (
                <>
                  <h3>Key takeaways</h3>
                  <ul>
                    {p.key_takeaways.map((t) => (
                      <li key={t}>{t}</li>
                    ))}
                  </ul>
                </>
              )}
              <h3>More to explore</h3>
              {relatedPosts.map((r) => (
                <p key={r.id}>
                  <Link className="text-link" to="/blog/$slug" params={{ slug: r.slug }}>
                    {r.title}
                  </Link>
                </p>
              ))}
              <Link className="text-link" to="/projects">
                Explore my project work →
              </Link>
            </aside>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
