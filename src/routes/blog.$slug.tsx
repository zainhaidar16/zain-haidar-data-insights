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
  const authorName = post?.author_name?.trim() || "Zain Haidar";
  const sidebarTopics = Array.from(
    new Set([post?.category, ...tags].filter((topic): topic is string => Boolean(topic))),
  );
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

      <article className="pb-20">
        <section className="relative h-[68vh] min-h-[500px] max-h-[720px] overflow-hidden">
          {post.cover_url ? (
            <img src={post.cover_url} alt={post.title} className="absolute inset-0 h-full w-full object-cover" />
          ) : (
            <div className="absolute inset-0 bg-gradient-to-br from-[var(--purple)] to-[#3b2a7a]" />
          )}
          <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-black/10" />

          <Link
            to="/blog"
            className="absolute left-6 top-28 z-10 inline-flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-3.5 py-2 text-xs uppercase tracking-[0.12em] text-white/85 backdrop-blur transition-colors hover:border-white/40 hover:text-white md:left-10"
          >
            <ArrowLeft className="h-3.5 w-3.5" />
            Back to Blog
          </Link>

          <div className="absolute inset-x-0 bottom-0 z-10">
            <div className="mx-auto max-w-6xl px-6 pb-14 md:pb-18">
              {post.category && (
                <p className="mb-5 inline-flex rounded-full border border-white/20 bg-white/10 px-3 py-1.5 text-xs font-semibold uppercase tracking-[0.15em] text-white/80 backdrop-blur">
                  {post.category}
                </p>
              )}
              <h1 className="max-w-[900px] text-4xl font-bold leading-[1.08] tracking-tight text-white md:text-6xl">
                {post.title}
              </h1>
              <div className="mt-6 flex flex-wrap items-center gap-4 text-sm text-white/80">
                <span>{authorName}</span>
                <span aria-hidden="true" className="text-white/45">/</span>
                <span className="inline-flex items-center gap-1.5">
                  <Calendar className="h-4 w-4" />
                  {formatArticleDate(articleDate)}
                </span>
                <span aria-hidden="true" className="text-white/45">/</span>
                <span className="inline-flex items-center gap-1.5">
                  <Clock className="h-4 w-4" />
                  {readingTime}
                </span>
              </div>
            </div>
          </div>
        </section>

        <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[minmax(0,680px)_320px] lg:items-start">
          <div>
            {post.excerpt && (
              <p className="border-b border-[var(--border)] pb-8 text-xl leading-relaxed text-[var(--text-muted)]">
                {post.excerpt}
              </p>
            )}

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
                      className="mb-6 rounded-r-lg border-l-4 border-[var(--purple)] bg-[var(--site-bg-soft)] py-4 pl-6 pr-5 text-lg italic leading-[1.7] text-[var(--text-soft)] shadow-sm"
                      {...props}
                    />
                  ),
                  img: ({ node, ...props }) => (
                    <img className="my-8 rounded-2xl border border-[var(--border)] shadow-sm" {...props} />
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

            <div className="mt-8 flex flex-wrap items-center gap-2.5 border-y border-[var(--border)] py-4 text-sm">
              <span className="text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">Share this post</span>
              <button
                type="button"
                onClick={handleCopyLink}
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--site-bg-soft)] px-3.5 py-2 text-sm text-[var(--text-main)] transition-colors hover:border-[var(--card-border-hover)]"
              >
                {copied ? <Check className="h-4 w-4 text-[var(--purple)]" /> : <Copy className="h-4 w-4 text-[var(--purple)]" />}
                {copied ? "Copied" : "Copy link"}
              </button>
              <a
                href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--site-bg-soft)] px-3.5 py-2 text-sm text-[var(--text-main)] transition-colors hover:border-[var(--card-border-hover)]"
              >
                <Linkedin className="h-4 w-4 text-[var(--purple)]" />
                LinkedIn
              </a>
            </div>

            <footer className="mt-10 space-y-8">
              <section className="rounded-2xl border border-[var(--border)] bg-[var(--site-bg-soft)] p-5 shadow-sm sm:p-6">
                <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
                  <img
                    src="/zain.jpg"
                    alt={authorName}
                    className="h-16 w-16 rounded-full object-cover"
                  />
                  <div className="flex-1">
                    <p className="mb-1 text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">Written by</p>
                    <h2 className="text-xl font-bold text-[var(--text-main)]">{authorName}</h2>
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

              {(previousPost || nextPost) && (
                <nav className="grid gap-4 border-t border-[var(--border)] pt-8 sm:grid-cols-2" aria-label="Article navigation">
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

          <aside className="space-y-6 lg:sticky lg:top-28">
            <section className="rounded-2xl border border-[var(--border)] bg-[var(--site-bg-soft)] p-6 text-center shadow-sm">
              <p className="mb-4 text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">About the author</p>
              <img src="/zain.jpg" alt={authorName} className="mx-auto h-24 w-24 rounded-full object-cover" />
              <h2 className="mt-4 text-lg font-bold text-[var(--text-main)]">{authorName}</h2>
              <p className="mt-2 text-sm leading-relaxed text-[var(--text-soft)]">
                Data analyst and BI specialist turning complex data into clearer business decisions.
              </p>
              <Link to="/about" className="mt-4 inline-flex items-center gap-2 text-sm font-semibold text-[var(--purple)] hover:text-[var(--purple-light)]">
                Learn more <ArrowRight className="h-4 w-4" />
              </Link>
            </section>

            {relatedPosts.length > 0 && (
              <section className="rounded-2xl border border-[var(--border)] bg-[var(--site-bg-soft)] p-6 shadow-sm">
                <p className="mb-5 text-center text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">Popular posts</p>
                <div className="space-y-4">
                  {relatedPosts.slice(0, 3).map((related) => (
                    <Link
                      key={related.slug}
                      to="/blog/$slug"
                      params={{ slug: related.slug }}
                      className="group grid grid-cols-[72px_1fr] gap-3"
                    >
                      <div className="h-16 overflow-hidden rounded-xl bg-[var(--site-bg-muted)]">
                        {related.cover_url ? (
                          <img src={related.cover_url} alt={related.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-[var(--purple-soft)] to-[var(--site-bg-muted)]" />
                        )}
                      </div>
                      <div>
                        {related.category && <p className="mb-1 text-[11px] uppercase tracking-[0.1em] text-[var(--text-muted)]">{related.category}</p>}
                        <h3 className="text-sm font-semibold leading-snug text-[var(--text-main)] group-hover:text-[var(--purple)]">
                          {related.title}
                        </h3>
                      </div>
                    </Link>
                  ))}
                </div>
              </section>
            )}

            {sidebarTopics.length > 0 && (
              <section className="rounded-2xl border border-[var(--border)] bg-[var(--site-bg-soft)] p-6 shadow-sm">
                <p className="mb-4 text-center text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">Topics</p>
                <div className="flex flex-wrap justify-center gap-2">
                  {sidebarTopics.map((topic) => (
                    <span key={topic} className="rounded-full border border-[var(--border)] bg-[var(--site-bg-muted)] px-3 py-1.5 text-xs text-[var(--text-main)]">
                      {topic}
                    </span>
                  ))}
                </div>
              </section>
            )}

            <section className="rounded-2xl border border-[var(--border)] bg-[var(--site-bg-soft)] p-6 text-center shadow-sm">
              <p className="mb-3 text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">Need data clarity?</p>
              <p className="text-sm leading-relaxed text-[var(--text-soft)]">
                Bring me your reporting or analytics problem and I’ll help you turn it into a cleaner decision system.
              </p>
              <Button asChild variant="primary" className="mt-5 w-full">
                <Link to="/contact">Start a Project</Link>
              </Button>
            </section>
          </aside>
        </div>

        {relatedPosts.length > 0 && (
          <section className="mx-auto max-w-6xl px-6 pt-4">
            <div className="mb-6 flex items-center gap-4">
              <div className="h-px flex-1 bg-[var(--border)]" />
              <p className="text-xs uppercase tracking-[0.14em] text-[var(--text-muted)]">You might also like</p>
              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>
            <div className="grid gap-5 md:grid-cols-3">
              {relatedPosts.slice(0, 3).map((related) => (
                <Link
                  key={related.slug}
                  to="/blog/$slug"
                  params={{ slug: related.slug }}
                  className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--site-bg-soft)] shadow-sm transition-colors hover:border-[var(--card-border-hover)]"
                >
                  <div className="aspect-[16/10] bg-[var(--site-bg-muted)]">
                    {related.cover_url ? (
                      <img src={related.cover_url} alt={related.title} className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105" />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-[var(--purple-soft)] to-[var(--site-bg-muted)]" />
                    )}
                  </div>
                  <div className="p-4">
                    {related.category && <p className="mb-2 text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">{related.category}</p>}
                    <h3 className="text-base font-semibold leading-snug text-[var(--text-main)] group-hover:text-[var(--purple)]">
                      {related.title}
                    </h3>
                  </div>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <Footer />
    </main>
  );
}

function BlogArticleSkeleton() {
  return (
    <main className="min-h-screen bg-[var(--site-bg)] text-[var(--text-soft)]">
      <Header />
      <div className="relative h-[68vh] min-h-[500px] max-h-[720px] overflow-hidden bg-gradient-to-br from-[var(--purple)] to-[#3b2a7a]">
        <div className="absolute inset-0 bg-gradient-to-r from-black/75 via-black/35 to-black/10" />
        <div className="absolute inset-x-0 bottom-0">
          <div className="mx-auto max-w-6xl px-6 pb-14">
            <div className="mb-5 h-7 w-28 animate-pulse rounded-full bg-white/30" />
            <div className="space-y-3">
              <div className="h-12 w-full max-w-[760px] animate-pulse rounded-full bg-white/30" />
              <div className="h-12 w-4/5 max-w-[620px] animate-pulse rounded-full bg-white/30" />
            </div>
            <div className="mt-6 h-4 w-80 animate-pulse rounded-full bg-white/30" />
          </div>
        </div>
      </div>
      <div className="mx-auto grid max-w-6xl gap-10 px-6 py-14 lg:grid-cols-[minmax(0,680px)_320px]">
        <div className="space-y-5">
          <div className="h-8 w-full animate-pulse rounded-full bg-[var(--site-bg-muted)]" />
          <div className="h-8 w-4/5 animate-pulse rounded-full bg-[var(--site-bg-muted)]" />
          <div className="space-y-3 pt-6">
            <div className="h-4 w-full animate-pulse rounded-full bg-[var(--site-bg-muted)]" />
            <div className="h-4 w-full animate-pulse rounded-full bg-[var(--site-bg-muted)]" />
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-[var(--site-bg-muted)]" />
          </div>
        </div>
        <div className="hidden space-y-5 lg:block">
          <div className="h-64 animate-pulse rounded-2xl bg-[var(--site-bg-muted)]" />
          <div className="h-56 animate-pulse rounded-2xl bg-[var(--site-bg-muted)]" />
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
