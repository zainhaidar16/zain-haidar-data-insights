import { useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { AlertCircle, ArrowLeft, ArrowRight, Calendar, Check, Clock, Copy, Linkedin, Tag } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { getPostDetailData } from "@/lib/public-data.functions";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => getPostDetailData({ data: { slug: params.slug } }),
  pendingComponent: BlogArticleSkeleton,
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
  const [copied, setCopied] = useState(false);

  const articleDate = post?.published_at
    ? new Date(post.published_at)
    : new Date(post?.created_at || "");
  const tags = Array.isArray(post?.tags) ? post.tags : [];
  const readingTime = post ? getReadingTime(post.body_md) : "";
  const articleUrl =
    typeof window !== "undefined" && post
      ? window.location.href
      : post
        ? `https://www.zaintheanalyst.com/blog/${post.slug}`
        : "https://www.zaintheanalyst.com/blog";

  async function handleCopyLink() {
    if (typeof navigator === "undefined" || !navigator.clipboard) return;
    await navigator.clipboard.writeText(articleUrl);
    setCopied(true);
    window.setTimeout(() => setCopied(false), 1600);
  }

  if (!post) {
    return (
      <main className="min-h-screen bg-[var(--site-bg)] text-[var(--text-soft)]">
        <Header />
        <div className="flex min-h-[70vh] items-center justify-center px-6 py-32">
          <div className="max-w-md rounded-3xl border border-[var(--border)] bg-[var(--site-bg-soft)] p-8 text-center shadow-sm">
            <AlertCircle className="mx-auto mb-4 h-10 w-10 text-red-600" />
            <h2 className="mb-2 text-lg font-semibold text-[var(--text-main)]">Article not found</h2>
            <p className="mb-6 text-sm leading-relaxed text-[var(--text-soft)]">
              The blog article requested does not exist.
            </p>
            <Button asChild variant="outline">
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="min-h-screen bg-[var(--site-bg)] text-[var(--text-soft)]">
      <Header />

      <article className="pb-16">
        <section className="relative h-[60vh] min-h-[440px] max-h-[680px] overflow-hidden">
          {post.cover_url ? (
            <img src={post.cover_url} alt={post.title} className="absolute inset-0 w-full h-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--purple)] to-[#3b2a7a]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />

          <Link
            to="/blog"
            className="absolute left-6 top-28 z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3.5 py-2 text-xs uppercase tracking-[0.12em] text-white/85 backdrop-blur transition-colors hover:border-white/40 hover:text-white md:left-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Blog
          </Link>

          <div className="absolute inset-x-0 bottom-0 z-10">
            <div className="mx-auto max-w-[920px] px-6 pb-12">
              {post.category && (
                <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-white/75">
                  {post.category}
                </p>
              )}
              <h1 className="max-w-[860px] text-4xl font-bold leading-[1.1] tracking-tight text-white md:text-6xl">
                {post.title}
              </h1>
              <div className="mt-5 flex flex-wrap items-center gap-4 text-sm text-white/80">
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatArticleDate(articleDate)}
                </span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {readingTime}
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto max-w-[680px] px-6 py-12">
          {post.excerpt && (
            <p className="text-xl leading-relaxed text-[var(--text-muted)]">
              {post.excerpt}
            </p>
          )}

          <div className="mt-8 flex flex-wrap items-center gap-2.5 border-y border-[var(--border)] py-3 text-sm">
            <span className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">Share</span>
            <button
              type="button"
              onClick={handleCopyLink}
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--site-bg-soft)] px-3.5 py-1.5 text-sm text-[var(--text-main)] transition-colors hover:border-[var(--card-border-hover)]"
            >
              {copied ? <Check className="h-4 w-4 text-[var(--purple)]" /> : <Copy className="h-4 w-4 text-[var(--purple)]" />}
              {copied ? "Copied" : "Copy link"}
            </button>
            <a
              href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--site-bg-soft)] px-3.5 py-1.5 text-sm text-[var(--text-main)] transition-colors hover:border-[var(--card-border-hover)]"
            >
              <Linkedin className="h-4 w-4 text-[var(--purple)]" />
              LinkedIn
            </a>
          </div>

          <div className="prose mt-10 max-w-none text-lg leading-[1.75] text-[var(--text-soft)] [&_h1]:text-[var(--text-main)] [&_h2]:text-[var(--text-main)] [&_h3]:text-[var(--text-main)] [&_h4]:text-[var(--text-main)] [&_li]:marker:text-[var(--purple)] [&_ol]:list-decimal [&_ol]:space-y-3 [&_ol]:pl-6 [&_p]:mb-6 [&_p]:leading-[1.75] [&_strong]:font-semibold [&_strong]:text-[var(--text-main)] [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-6">
            <ReactMarkdown
              components={{
                h1: ({ node, children, ...props }) => (
                  <h2
                    id={slugifyHeading(getNodeText(children))}
                    className="mb-4 mt-10 border-b border-[var(--border)] pb-3 text-2xl font-bold text-[var(--text-main)]"
                    {...props}
                  >
                    {children}
                  </h2>
                ),
                h2: ({ node, children, ...props }) => (
                  <h2
                    id={slugifyHeading(getNodeText(children))}
                    className="mb-4 mt-10 text-2xl font-bold text-[var(--text-main)]"
                    {...props}
                  >
                    {children}
                  </h2>
                ),
                h3: ({ node, children, ...props }) => (
                  <h3
                    id={slugifyHeading(getNodeText(children))}
                    className="mb-3 mt-8 text-xl font-semibold text-[var(--text-main)]"
                    {...props}
                  >
                    {children}
                  </h3>
                ),
                h4: ({ node, children, ...props }) => (
                  <h4
                    id={slugifyHeading(getNodeText(children))}
                    className="mb-2 mt-7 text-lg font-semibold text-[var(--text-main)]"
                    {...props}
                  >
                    {children}
                  </h4>
                ),
                p: ({ node, ...props }) => (
                  <p className="mb-6 leading-[1.75] text-[var(--text-soft)]" {...props} />
                ),
                strong: ({ node, ...props }) => (
                  <strong className="font-semibold text-[var(--text-main)]" {...props} />
                ),
                ul: ({ node, ...props }) => (
                  <ul className="mb-6 list-disc space-y-3 pl-6" {...props} />
                ),
                ol: ({ node, ...props }) => (
                  <ol className="mb-6 list-decimal space-y-3 pl-6" {...props} />
                ),
                li: ({ node, ...props }) => (
                  <li className="leading-[1.75] text-[var(--text-soft)]" {...props} />
                ),
                code: ({ node, ...props }) => (
                  <code
                    className="rounded border border-[var(--border)] bg-[var(--site-bg-muted)] px-1.5 py-0.5 font-mono text-sm text-[var(--text-main)]"
                    {...props}
                  />
                ),
                pre: ({ node, ...props }) => (
                  <pre
                    className="mb-6 overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--site-bg-muted)] p-4 font-mono text-sm leading-[1.75] text-[var(--text-main)] shadow-sm"
                    {...props}
                  />
                ),
                blockquote: ({ node, ...props }) => (
                  <blockquote
                    className="mb-6 rounded-r-lg border-l-4 border-[var(--purple)] bg-[var(--site-bg-soft)] py-3 pl-5 pr-4 italic text-[var(--text-soft)]"
                    {...props}
                  />
                ),
              }}
            >
              {post.body_md}
            </ReactMarkdown>
          </div>

            {tags.length > 0 && (
              <div className="mt-10 flex flex-wrap gap-2 border-t border-[var(--border)] pt-6">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[var(--border)] bg-[var(--site-bg-soft)] px-3 py-1.5 text-xs text-[var(--text-main)]"
                  >
                    <Tag className="h-3.5 w-3.5 text-[var(--purple)]" />
                    {tag}
                  </span>
                ))}
              </div>
            )}

            <footer className="mt-12 space-y-6 border-t border-[var(--border)] pt-8">
              <section className="rounded-2xl border border-[var(--border)] bg-[var(--site-bg-soft)] p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <img
                    src="/zain.jpg"
                    alt="Zain Haidar"
                    className="h-14 w-14 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <h2 className="text-xl font-bold text-[var(--text-main)]">Zain Haidar</h2>
                    <p className="mt-2 text-sm leading-relaxed text-[var(--text-soft)]">
                      Data analyst and BI specialist helping businesses turn messy data into clear dashboards, reports, and decisions.
                    </p>
                    <div className="mt-4 flex flex-wrap gap-2.5">
                      <Button asChild variant="outline">
                        <Link to="/about">About Zain</Link>
                      </Button>
                      <Button asChild variant="primary">
                        <Link to="/contact">
                          Contact Me
                          <ArrowRight className="h-4 w-4" />
                        </Link>
                      </Button>
                    </div>
                  </div>
                </div>
              </section>

              <section>
                <div className="mb-4 flex items-end justify-between gap-4">
                  <div>
                    <p className="mb-2 text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">Read next</p>
                    <h2 className="text-2xl font-bold text-[var(--text-main)]">More articles</h2>
                  </div>
                  <Link to="/blog" className="text-sm text-[var(--purple)] hover:text-[var(--purple-light)]">
                    Browse all
                  </Link>
                </div>

                {relatedPosts.length > 0 ? (
                  <div className="grid gap-4">
                    {relatedPosts.slice(0, 3).map((related) => (
                      <Link
                        key={related.slug}
                        to="/blog/$slug"
                        params={{ slug: related.slug }}
                        className="group rounded-2xl border border-[var(--border)] bg-[var(--site-bg-soft)] p-4 shadow-sm transition-colors hover:border-[var(--card-border-hover)]"
                      >
                        <div className="mb-2 flex flex-wrap items-center gap-3 text-xs text-[var(--text-muted)]">
                          {related.category && <span>{related.category}</span>}
                          {related.published_at && <span>{formatArticleDate(new Date(related.published_at))}</span>}
                        </div>
                        <h3 className="text-lg font-semibold text-[var(--text-main)] group-hover:text-[var(--purple)]">
                          {related.title}
                        </h3>
                      </Link>
                    ))}
                  </div>
                ) : (
                  <Button asChild variant="outline">
                    <Link to="/blog">Browse all articles</Link>
                  </Button>
                )}
              </section>

              {(previousPost || nextPost) && (
                <nav className="grid gap-4 border-t border-[var(--border)] pt-6 sm:grid-cols-2" aria-label="Article navigation">
                  {previousPost ? (
                    <Link
                      to="/blog/$slug"
                      params={{ slug: previousPost.slug }}
                      className="group rounded-2xl border border-[var(--border)] bg-[var(--site-bg-soft)] p-4 shadow-sm transition-colors hover:border-[var(--card-border-hover)]"
                    >
                      <span className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">
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
                      className="group rounded-2xl border border-[var(--border)] bg-[var(--site-bg-soft)] p-4 text-left shadow-sm transition-colors hover:border-[var(--card-border-hover)] sm:text-right"
                    >
                      <span className="mb-2 inline-flex items-center gap-2 text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">
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
            </footer>
        </div>
      </article>

      <Footer />
    </main>
  );
}

function BlogArticleSkeleton() {
  return (
    <main className="min-h-screen bg-[var(--site-bg)] text-[var(--text-soft)]">
      <Header />
      <div className="relative h-[60vh] min-h-[440px] max-h-[680px] overflow-hidden bg-gradient-to-br from-[var(--purple)] to-[#3b2a7a]">
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-[920px] px-6 pb-12">
            <div className="mb-4 h-3 w-24 animate-pulse rounded-full bg-white/30" />
            <div className="space-y-3">
              <div className="h-12 w-full max-w-[760px] animate-pulse rounded-full bg-white/30" />
              <div className="h-12 w-4/5 max-w-[620px] animate-pulse rounded-full bg-white/30" />
            </div>
            <div className="mt-5 h-4 w-72 animate-pulse rounded-full bg-white/30" />
          </div>
        </div>
      </div>
      <div className="mx-auto max-w-[680px] space-y-5 px-6 py-12">
        <div className="h-8 w-full animate-pulse rounded-full bg-[var(--site-bg-muted)]" />
        <div className="h-8 w-4/5 animate-pulse rounded-full bg-[var(--site-bg-muted)]" />
        <div className="space-y-3 pt-6">
          <div className="h-4 w-full animate-pulse rounded-full bg-[var(--site-bg-muted)]" />
          <div className="h-4 w-full animate-pulse rounded-full bg-[var(--site-bg-muted)]" />
          <div className="h-4 w-2/3 animate-pulse rounded-full bg-[var(--site-bg-muted)]" />
        </div>
      </div>
      <Footer />
    </main>
  );
}

function getReadingTime(markdown: string) {
  const words = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/`[^`]*`/g, " ")
    .replace(/[^\w\s-]/g, " ")
    .trim()
    .split(/\s+/)
    .filter(Boolean).length;
  const minutes = Math.max(1, Math.ceil(words / 200));
  return `${minutes} min read`;
}

function slugifyHeading(text: string) {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-");
}

function getNodeText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(getNodeText).join("");
  return "";
}

function formatArticleDate(date: Date) {
  if (Number.isNaN(date.getTime())) return "Unpublished";
  return date.toLocaleDateString(undefined, {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}
