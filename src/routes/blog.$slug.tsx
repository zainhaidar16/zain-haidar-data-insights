import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { PageHero } from "@/components/portfolio/PageHero";
import { ArrowLeft, ArrowRight, AlertCircle, Calendar, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { getPostDetailData } from "@/lib/public-data.functions";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => getPostDetailData({ data: { slug: params.slug } }),
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} | Zain The Analyst` },
      { name: "description", content: "AI analytics, business intelligence, and data analysis article by Zain Haidar." },
    ],
  }),
  component: BlogDetailPage,
});

function BlogDetailPage() {
  const { post, relatedPosts, previousPost, nextPost } = Route.useLoaderData();

  if (!post) {
    return (
      <main className="bg-[var(--site-bg)] min-h-screen flex flex-col justify-between font-poppins text-[var(--text-soft)]">
        <Header />
        <div className="flex-grow flex items-center justify-center py-32">
          <div className="max-w-md p-8 bg-[var(--site-bg-soft)] border border-[var(--border)] rounded-3xl text-center shadow-sm">
            <AlertCircle className="h-10 w-10 text-red-600 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-[var(--text-main)] mb-2">
              Article not found
            </h2>
            <p className="text-xs text-[var(--text-soft)] mb-6 leading-relaxed">
              The blog article requested does not exist.
            </p>
            <Button
              asChild
              variant="outline"
            >
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const articleDate = post.published_at
    ? new Date(post.published_at)
    : new Date(post.created_at || "");
  const tags = Array.isArray(post.tags) ? post.tags : [];

  return (
    <main className="bg-[var(--site-bg)] min-h-screen flex flex-col font-poppins text-[var(--text-soft)]">
      <Header />

      <PageHero
        eyebrow={post.category ?? "Article"}
        title={post.title}
        description={post.excerpt || "Article details."}
        before={
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[12px] font-normal uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-[var(--text-muted)]" /> Back to Blog
          </Link>
        }
        meta={
          <>
            <span className="flex items-center gap-2">
              <Calendar className="h-4 w-4 text-[var(--text-muted)]" />
              {articleDate.toLocaleDateString(undefined, {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
            {tags.map((tag) => (
              <span
                key={tag}
                className="px-3 py-1 rounded-full bg-[var(--site-bg-soft)] border border-[var(--border)] text-xs font-normal text-[var(--text-main)] flex items-center gap-1.5 shadow-sm"
              >
                <Tag className="h-3 w-3 text-[var(--text-muted)]" />
                <span>{tag}</span>
              </span>
            ))}
          </>
        }
      />

      <article className="public-detail-article flex-grow animate-fade-in py-16">
        <div className="mx-auto max-w-[760px] px-6 space-y-8">
          {post.cover_url && (
            <div className="rounded-2xl overflow-hidden border border-[var(--border)] aspect-[16/9] bg-[var(--site-bg-muted)]">
              <img src={post.cover_url} alt={post.title} className="w-full h-full object-cover" />
            </div>
          )}

          {post.excerpt && (
            <p className="border-l-2 border-[var(--purple)] pl-4 text-base font-normal leading-relaxed text-[var(--text-soft)]">
              {post.excerpt}
            </p>
          )}

          {/* Article Body */}
          <div className="bg-white border border-[var(--border)] rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="prose max-w-none text-[var(--text-soft)] leading-[1.8] text-sm sm:text-base space-y-6 font-normal [&_h1]:text-[var(--text-main)] [&_h2]:text-[var(--text-main)] [&_h3]:text-[var(--text-main)] [&_h4]:text-[var(--text-main)] [&_strong]:text-[var(--text-main)] [&_li]:marker:text-[var(--purple)] [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h2
                      className="text-2xl font-bold text-[var(--text-main)] mt-8 mb-4 border-b border-[var(--border)] pb-2"
                      {...props}
                    />
                  ),
                  h2: ({ node, ...props }) => (
                    <h3 className="text-xl font-semibold text-[var(--text-main)] mt-6 mb-3" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h4 className="text-lg font-semibold text-[var(--text-main)] mt-4 mb-2" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="mb-4 text-[var(--text-soft)] leading-relaxed" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-5 mb-4 space-y-2" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal pl-5 mb-4 space-y-2" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="text-[var(--text-soft)] leading-relaxed" {...props} />
                  ),
                  code: ({ node, ...props }) => (
                    <code
                      className="bg-[var(--site-bg-muted)] border border-[var(--border)] px-1.5 py-0.5 rounded text-[12px] font-mono text-[var(--text-main)]"
                      {...props}
                    />
                  ),
                  pre: ({ node, ...props }) => (
                    <pre
                      className="bg-[var(--site-bg-muted)] border border-[var(--border)] text-[var(--text-main)] p-4 rounded-2xl overflow-x-auto text-[13px] font-mono leading-relaxed mb-4 shadow-sm"
                      {...props}
                    />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote
                      className="border-l-4 border-[var(--purple)] pl-4 italic text-[var(--text-soft)] mb-4 bg-[var(--site-bg-soft)] py-2 pr-4 rounded-r-lg"
                      {...props}
                    />
                  ),
                }}
              >
                {post.body_md}
              </ReactMarkdown>
            </div>
          </div>

          <section className="rounded-3xl border border-[var(--border)] bg-white p-6 sm:p-8 shadow-sm">
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
              <div>
                <p className="mb-2 text-xs font-normal uppercase tracking-[0.12em] text-[var(--text-muted)]">
                  Read next
                </p>
                <h2 className="text-2xl font-bold text-[var(--text-main)]">More articles</h2>
              </div>
              <Button asChild variant="primary">
                <Link to="/contact">
                  <span>Start a Project</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
            </div>

            {relatedPosts.length > 0 ? (
              <div className="grid gap-4">
                {relatedPosts.map((related) => (
                  <Link
                    key={related.slug}
                    to="/blog/$slug"
                    params={{ slug: related.slug }}
                    className="group rounded-2xl border border-[var(--border)] bg-[var(--site-bg-soft)] p-5 shadow-sm transition-all duration-300 hover:border-[var(--card-border-hover)] hover:bg-[var(--card-bg-soft)]"
                  >
                    <div className="mb-3 flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)]">
                      {related.category && <span>{related.category}</span>}
                      {related.published_at && (
                        <span>
                          {new Date(related.published_at).toLocaleDateString(undefined, {
                            month: "short",
                            day: "numeric",
                            year: "numeric",
                          })}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-[var(--text-main)] group-hover:text-[var(--purple)]">
                      {related.title}
                    </h3>
                    {related.excerpt && (
                      <p className="mt-2 line-clamp-2 text-sm leading-relaxed text-[var(--text-soft)]">
                        {related.excerpt}
                      </p>
                    )}
                  </Link>
                ))}
              </div>
            ) : (
              <div className="flex flex-col gap-3 sm:flex-row">
                <Button asChild variant="outline">
                  <Link to="/blog">Back to All Articles</Link>
                </Button>
              </div>
            )}
          </section>

          {(previousPost || nextPost) && (
            <nav className="grid gap-4 border-t border-[var(--border)] pt-6 sm:grid-cols-2" aria-label="Article navigation">
              {previousPost ? (
                <Link
                  to="/blog/$slug"
                  params={{ slug: previousPost.slug }}
                  className="group rounded-2xl border border-[var(--border)] bg-white p-5 shadow-sm transition-all duration-300 hover:border-[var(--card-border-hover)] hover:bg-[var(--card-bg-soft)]"
                >
                  <span className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Previous
                  </span>
                  <h3 className="text-base font-semibold text-[var(--text-main)] group-hover:text-[var(--purple)]">
                    {previousPost.title}
                  </h3>
                </Link>
              ) : (
                <div />
              )}

              {nextPost && (
                <Link
                  to="/blog/$slug"
                  params={{ slug: nextPost.slug }}
                  className="group rounded-2xl border border-[var(--border)] bg-white p-5 text-left shadow-sm transition-all duration-300 hover:border-[var(--card-border-hover)] hover:bg-[var(--card-bg-soft)] sm:text-right"
                >
                  <span className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                    Next
                    <ArrowRight className="h-3.5 w-3.5" />
                  </span>
                  <h3 className="text-base font-semibold text-[var(--text-main)] group-hover:text-[var(--purple)]">
                    {nextPost.title}
                  </h3>
                </Link>
              )}
            </nav>
          )}

          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4">
            <Button asChild variant="outline">
              <Link to="/blog">
                <ArrowLeft className="h-4 w-4 mr-2 inline" />
                <span>Back to All Articles</span>
              </Link>
            </Button>
            <Button asChild variant="primary">
              <Link to="/contact">
                <span>Contact Me</span>
                <ArrowRight className="h-4 w-4 ml-2 inline" />
              </Link>
            </Button>
          </div>
        </div>
      </article>
      <Footer />
    </main>
  );
}

