import { useState, type ReactNode } from "react";
import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Calendar,
  Check,
  Clock,
  Copy,
  Linkedin,
  Tag,
} from "lucide-react";
import ReactMarkdown from "react-markdown";
import { Button } from "@/components/ui/button";
import { getPostDetailData } from "@/lib/public-data.functions";

export const Route = createFileRoute("/blog/$slug")({
  loader: ({ params }) => getPostDetailData({ data: { slug: params.slug } }),
  pendingComponent: BlogArticleSkeleton,
  head: ({ params }) => ({
    meta: [
      {
        title: `${params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} | Zain The Analyst`,
      },
      {
        name: "description",
        content:
          "AI analytics, business intelligence, and data analysis article by Zain Haidar.",
      },
    ],
  }),
  component: BlogDetailPage,
});

function BlogDetailPage() {
  const { post, relatedPosts, previousPost, nextPost } = Route.useLoaderData();
  const [copied, setCopied] = useState(false);
  const [expanded, setExpanded] = useState(false);

  const articleDate = post?.published_at
    ? new Date(post.published_at)
    : new Date(post?.created_at || "");
  const tags = Array.isArray(post?.tags) ? post.tags : [];
  const readingTime = post ? getReadingTime(post.body_md) : "";
  const authorName = post?.author_name?.trim() || "Zain Haidar";
  const sidebarTopics = Array.from(
    new Set(
      [post?.category, ...tags].filter((topic): topic is string =>
        Boolean(topic),
      ),
    ),
  );
  const articleUrl =
    typeof window !== "undefined" && post
      ? window.location.href
      : post
        ? `https://www.zaintheanalyst.com/blog/${post.slug}`
        : "https://www.zaintheanalyst.com/blog";

  const [previewMd, restMd] = post
    ? splitAtThirdHeading(post.body_md)
    : ["", ""];
  const hasMore = restMd.length > 0;

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
        <div className="flex min-h-[70vh] items-center justify-center px-6 py-12 md:py-20">
          <div className="max-w-md rounded-3xl border border-[var(--border)] bg-[var(--site-bg-soft)] p-8 text-center shadow-sm">
            <AlertCircle className="mx-auto mb-4 h-10 w-10 text-red-600" />
            <h2 className="mb-2 text-lg font-semibold text-[var(--text-main)]">
              Article not found
            </h2>
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

  const mdComponents: Parameters<typeof ReactMarkdown>[0]["components"] = {
    h1: ({ node, children, ...props }) => (
      <h2
        id={slugifyHeading(getNodeText(children))}
        className="mb-4 mt-12 border-b border-[var(--border)] pb-3 text-2xl font-bold text-[var(--text-main)]"
        {...props}
      >
        {children}
      </h2>
    ),
    h2: ({ node, children, ...props }) => (
      <h2
        id={slugifyHeading(getNodeText(children))}
        className="mb-4 mt-12 text-2xl font-bold text-[var(--text-main)]"
        {...props}
      >
        {children}
      </h2>
    ),
    h3: ({ node, children, ...props }) => (
      <h3
        id={slugifyHeading(getNodeText(children))}
        className="mb-3 mt-9 text-xl font-semibold text-[var(--text-main)]"
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
      <p className="mb-6 text-[17px] leading-[1.82] text-[var(--text-soft)]" {...props} />
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
      <li className="text-[17px] leading-[1.82] text-[var(--text-soft)]" {...props} />
    ),
    code: ({ node, ...props }) => (
      <code
        className="rounded border border-[var(--border)] bg-[var(--site-bg-muted)] px-1.5 py-0.5 font-mono text-sm text-[var(--text-main)]"
        {...props}
      />
    ),
    pre: ({ node, ...props }) => (
      <pre
        className="mb-6 overflow-x-auto rounded-2xl border border-[var(--border)] bg-[var(--site-bg-muted)] p-5 font-mono text-sm leading-[1.75] text-[var(--text-main)] shadow-sm"
        {...props}
      />
    ),
    blockquote: ({ node, children }) => (
      <div className="relative my-10 overflow-hidden rounded-2xl bg-[var(--site-bg-soft)] px-8 py-8 text-center shadow-sm">
        <span
          aria-hidden="true"
          className="pointer-events-none absolute -top-5 left-3 select-none font-serif text-[9rem] leading-none text-[var(--purple)]/12"
        >
          &ldquo;
        </span>
        <blockquote className="relative z-10 text-xl font-medium italic leading-relaxed text-[var(--text-main)]">
          {children}
        </blockquote>
        <div className="mx-auto mt-5 h-0.5 w-10 rounded-full bg-[var(--purple)]/40" />
      </div>
    ),
    img: ({ node, ...props }) => (
      <img
        className="my-8 w-full rounded-2xl border border-[var(--border)] shadow-sm"
        {...props}
      />
    ),
  };

  return (
    <main className="min-h-screen bg-[var(--site-bg)] text-[var(--text-soft)]">
      <Header />

      <article className="pb-12 md:pb-20">
        {/* ── HERO – text only, no image ──────────────────────────────── */}
        <section className="border-b border-[var(--border)] bg-[var(--site-bg-soft)] pb-12 pt-12 md:pt-20">
          <div className="mx-auto max-w-6xl px-6">
            <Link
              to="/blog"
              className="mb-7 inline-flex items-center gap-2 text-sm text-[var(--text-muted)] transition-colors hover:text-[var(--purple)]"
            >
              <ArrowLeft className="h-4 w-4" />
              Back to Blog
            </Link>

            {post.category && (
              <p className="mb-5 inline-flex items-center rounded-full bg-[var(--purple-soft)] px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--purple)]">
                {post.category}
              </p>
            )}

            <h1 className="max-w-[840px] text-4xl font-bold leading-[1.08] tracking-tight text-[var(--text-main)] sm:text-5xl lg:text-[3.25rem]">
              {post.title}
            </h1>

            <div className="mt-6 flex flex-wrap items-center gap-x-4 gap-y-2 text-sm text-[var(--text-soft)]">
              <span className="font-semibold text-[var(--text-main)]">{authorName}</span>
              <span className="text-[var(--text-muted)]" aria-hidden="true">•</span>
              <span className="inline-flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                {formatArticleDate(articleDate)}
              </span>
              <span className="text-[var(--text-muted)]" aria-hidden="true">•</span>
              <span className="inline-flex items-center gap-1.5">
                <Clock className="h-3.5 w-3.5 text-[var(--text-muted)]" />
                {readingTime}
              </span>
            </div>
          </div>
        </section>

        {/* ── COVER IMAGE – below hero ────────────────────────────────── */}
        {post.cover_url && (
          <div className="mx-auto max-w-6xl px-6 pt-10">
            <div className="aspect-[21/9] overflow-hidden rounded-2xl border border-[var(--border)] shadow-sm">
              <img
                src={post.cover_url}
                alt={post.title}
                className="h-full w-full object-cover"
              />
            </div>
          </div>
        )}

        {/* ── CONTENT + SIDEBAR ──────────────────────────────────────── */}
        <div className="mx-auto grid max-w-6xl gap-12 px-6 py-12 md:py-14 lg:grid-cols-[minmax(0,680px)_300px] lg:items-start lg:gap-14 xl:gap-16">

          {/* ── Main content column ── */}
          <div>
            {post.excerpt && (
              <p className="border-b border-[var(--border)] pb-8 text-xl font-light italic leading-relaxed text-[var(--text-soft)]">
                {post.excerpt}
              </p>
            )}

            <div className="prose mt-10 max-w-none text-[var(--text-soft)] [&_h1]:text-[var(--text-main)] [&_h2]:text-[var(--text-main)] [&_h3]:text-[var(--text-main)] [&_h4]:text-[var(--text-main)] [&_li]:marker:text-[var(--purple)] [&_ol]:list-decimal [&_ol]:space-y-3 [&_ol]:pl-6 [&_p]:mb-6 [&_p]:text-[17px] [&_p]:leading-[1.82] [&_strong]:font-semibold [&_strong]:text-[var(--text-main)] [&_ul]:list-disc [&_ul]:space-y-3 [&_ul]:pl-6">
              {/* Preview: content up through the 2nd heading */}
              <ReactMarkdown components={mdComponents}>{previewMd}</ReactMarkdown>

              {/* Read more gate */}
              {hasMore && !expanded && (
                <div className="relative mt-2">
                  <div className="pointer-events-none absolute inset-x-0 -top-24 h-24 bg-gradient-to-t from-[var(--site-bg)] to-transparent" />
                  <div className="flex justify-center pt-2">
                    <button
                      type="button"
                      onClick={() => setExpanded(true)}
                      className="inline-flex items-center gap-2 rounded-full bg-[var(--purple)] px-7 py-3 text-sm font-semibold text-white shadow-md transition-colors hover:bg-[var(--purple-light)]"
                    >
                      Read more
                      <ArrowRight className="h-4 w-4" />
                    </button>
                  </div>
                </div>
              )}

              {/* Rest of article – revealed after clicking Read more */}
              {hasMore && expanded && (
                <ReactMarkdown components={mdComponents}>{restMd}</ReactMarkdown>
              )}
            </div>

            {/* Tags – only show when fully expanded or no gate */}
            {(!hasMore || expanded) && tags.length > 0 && (
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

            {/* Share buttons – only when fully expanded or no gate */}
            {(!hasMore || expanded) && (
              <div className="mt-8 flex flex-wrap items-center gap-2.5 border-y border-[var(--border)] py-4">
                <span className="mr-1 text-xs uppercase tracking-[0.1em] text-[var(--text-muted)]">
                  Share this post
                </span>
                <button
                  type="button"
                  onClick={handleCopyLink}
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--site-bg-soft)] px-3.5 py-2 text-sm text-[var(--text-main)] transition-colors hover:border-[var(--card-border-hover)] hover:bg-[var(--site-bg-muted)]"
                >
                  {copied ? (
                    <Check className="h-4 w-4 text-[var(--purple)]" />
                  ) : (
                    <Copy className="h-4 w-4 text-[var(--purple)]" />
                  )}
                  {copied ? "Copied!" : "Copy link"}
                </button>
                <a
                  href={`https://twitter.com/intent/tweet?text=${encodeURIComponent(post.title)}&url=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--site-bg-soft)] px-3.5 py-2 text-sm text-[var(--text-main)] transition-colors hover:border-[var(--card-border-hover)] hover:bg-[var(--site-bg-muted)]"
                >
                  <svg
                    viewBox="0 0 24 24"
                    className="h-4 w-4 fill-[var(--purple)]"
                    aria-hidden="true"
                  >
                    <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.742l7.727-8.83L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                  </svg>
                  Share on X
                </a>
                <a
                  href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(articleUrl)}`}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 rounded-full border border-[var(--border)] bg-[var(--site-bg-soft)] px-3.5 py-2 text-sm text-[var(--text-main)] transition-colors hover:border-[var(--card-border-hover)] hover:bg-[var(--site-bg-muted)]"
                >
                  <Linkedin className="h-4 w-4 text-[var(--purple)]" />
                  LinkedIn
                </a>
              </div>
            )}

            {/* Article footer: author bio + prev/next */}
            {(!hasMore || expanded) && (
              <footer className="mt-10 space-y-8">
                <section className="overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--site-bg-soft)] shadow-sm">
                  <div className="flex flex-col gap-5 p-6 sm:flex-row sm:items-start sm:gap-6">
                    <img
                      src="/zain.jpg"
                      alt={authorName}
                      className="h-20 w-20 flex-shrink-0 rounded-full object-cover ring-2 ring-[var(--border)]"
                    />
                    <div className="flex-1">
                      <p className="mb-1 text-xs uppercase tracking-[0.12em] text-[var(--text-muted)]">
                        Written by
                      </p>
                      <h2 className="text-xl font-bold text-[var(--text-main)]">
                        {authorName}
                      </h2>
                      <p className="mt-2.5 text-sm leading-relaxed text-[var(--text-soft)]">
                        Data analyst and BI specialist helping businesses turn messy data into
                        clear dashboards, reports, and decisions.
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
                  <nav
                    className="grid gap-4 border-t border-[var(--border)] pt-8 sm:grid-cols-2"
                    aria-label="Article navigation"
                  >
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
                        <h3 className="text-base font-semibold leading-snug text-[var(--text-main)] group-hover:text-[var(--purple)]">
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
                        <h3 className="text-base font-semibold leading-snug text-[var(--text-main)] group-hover:text-[var(--purple)]">
                          {nextPost.title}
                        </h3>
                      </Link>
                    )}
                  </nav>
                )}
              </footer>
            )}
          </div>

          {/* ── Sidebar ── */}
          <aside className="space-y-6 lg:sticky lg:top-28">
            <section className="rounded-2xl border border-[var(--border)] bg-[var(--site-bg-soft)] p-6 text-left shadow-sm">
              <p className="mb-4 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                About the Author
              </p>
              <img
                src="/zain.jpg"
                alt={authorName}
                className="h-24 w-24 rounded-full object-cover ring-4 ring-[var(--purple-soft)]"
              />
              <h2 className="mt-4 text-lg font-bold text-[var(--text-main)]">
                {authorName}
              </h2>
              <p className="mt-2 text-[13px] leading-relaxed text-[var(--text-soft)]">
                Data analyst and BI specialist turning complex data into clearer business
                decisions.
              </p>
              <Link
                to="/about"
                className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[var(--purple)] hover:text-[var(--purple-light)]"
              >
                Learn more <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </section>

            {relatedPosts.length > 0 && (
              <section className="rounded-2xl border border-[var(--border)] bg-[var(--site-bg-soft)] p-6 shadow-sm">
                <p className="mb-5 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Popular Posts
                </p>
                <div className="space-y-5">
                  {relatedPosts.slice(0, 3).map((related) => (
                    <Link
                      key={related.slug}
                      to="/blog/$slug"
                      params={{ slug: related.slug }}
                      className="group grid grid-cols-[68px_1fr] gap-3"
                    >
                      <div className="h-[52px] overflow-hidden rounded-xl bg-[var(--site-bg-muted)]">
                        {related.cover_url ? (
                          <img
                            src={related.cover_url}
                            alt={related.title}
                            className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                          />
                        ) : (
                          <div className="h-full w-full bg-gradient-to-br from-[var(--purple-soft)] to-[var(--site-bg-muted)]" />
                        )}
                      </div>
                      <div>
                        {related.category && (
                          <p className="mb-1 text-[10px] font-medium uppercase tracking-[0.12em] text-[var(--text-muted)]">
                            {related.category}
                          </p>
                        )}
                        <h3 className="text-[13px] font-semibold leading-snug text-[var(--text-main)] group-hover:text-[var(--purple)]">
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
                <p className="mb-4 text-left text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--text-muted)]">
                  Topics
                </p>
                <div className="flex flex-wrap justify-start gap-2">
                  {sidebarTopics.map((topic) => (
                    <span
                      key={topic}
                      className="rounded-full border border-[var(--border)] bg-[var(--site-bg-muted)] px-3 py-1.5 text-xs text-[var(--text-main)]"
                    >
                      {topic}
                    </span>
                  ))}
                </div>
              </section>
            )}

            <section className="rounded-2xl border border-[var(--purple-soft)] bg-[var(--site-bg-soft)] p-6 text-left shadow-sm">
              <p className="mb-3 text-[10px] font-semibold uppercase tracking-[0.18em] text-[var(--purple)]">
                Work with Zain
              </p>
              <p className="text-[13px] leading-relaxed text-[var(--text-soft)]">
                Bring me your reporting or analytics problem and I&rsquo;ll help you turn it
                into a cleaner decision system.
              </p>
              <Button asChild variant="primary" className="mt-5 w-full">
                <Link to="/contact">Start a Project</Link>
              </Button>
            </section>
          </aside>
        </div>

        {/* ── RELATED POSTS ──────────────────────────────────────────── */}
        {relatedPosts.length > 0 && (
          <section className="mx-auto max-w-6xl px-6 pb-6 pt-4">
            <div className="mb-8 flex items-center gap-4">
              <div className="h-px flex-1 bg-[var(--border)]" />
              <p className="text-[11px] font-semibold uppercase tracking-[0.16em] text-[var(--text-muted)]">
                You might also like
              </p>
              <div className="h-px flex-1 bg-[var(--border)]" />
            </div>
            <div className="grid gap-6 sm:grid-cols-2 md:grid-cols-3">
              {relatedPosts.slice(0, 3).map((related) => (
                <Link
                  key={related.slug}
                  to="/blog/$slug"
                  params={{ slug: related.slug }}
                  className="group overflow-hidden rounded-2xl border border-[var(--border)] bg-[var(--site-bg-soft)] shadow-sm transition-all duration-200 hover:border-[var(--card-border-hover)] hover:shadow-md"
                >
                  <div className="aspect-[16/10] overflow-hidden bg-[var(--site-bg-muted)]">
                    {related.cover_url ? (
                      <img
                        src={related.cover_url}
                        alt={related.title}
                        className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-gradient-to-br from-[var(--purple-soft)] to-[var(--site-bg-muted)]" />
                    )}
                  </div>
                  <div className="p-5">
                    {related.category && (
                      <p className="mb-2.5 text-[10px] font-semibold uppercase tracking-[0.14em] text-[var(--purple)]">
                        {related.category}
                      </p>
                    )}
                    <h3 className="text-base font-semibold leading-snug text-[var(--text-main)] group-hover:text-[var(--purple)]">
                      {related.title}
                    </h3>
                    {related.excerpt && (
                      <p className="mt-2 line-clamp-2 text-[13px] leading-relaxed text-[var(--text-muted)]">
                        {related.excerpt}
                      </p>
                    )}
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
      {/* Skeleton hero – text only */}
      <div className="border-b border-[var(--border)] bg-[var(--site-bg-soft)] pb-12 pt-12 md:pt-20">
        <div className="mx-auto max-w-6xl px-6">
          <div className="mb-7 h-4 w-24 animate-pulse rounded-full bg-[var(--site-bg-muted)]" />
          <div className="mb-5 h-6 w-28 animate-pulse rounded-full bg-[var(--site-bg-muted)]" />
          <div className="space-y-3">
            <div className="h-10 w-full max-w-[700px] animate-pulse rounded-full bg-[var(--site-bg-muted)]" />
            <div className="h-10 w-4/5 max-w-[560px] animate-pulse rounded-full bg-[var(--site-bg-muted)]" />
          </div>
          <div className="mt-6 h-4 w-72 animate-pulse rounded-full bg-[var(--site-bg-muted)]" />
        </div>
      </div>
      {/* Skeleton cover image */}
      <div className="mx-auto max-w-6xl px-6 pt-10">
        <div className="aspect-[21/9] animate-pulse rounded-2xl bg-[var(--site-bg-muted)]" />
      </div>
      {/* Skeleton content */}
      <div className="mx-auto grid max-w-6xl gap-12 px-6 py-12 md:py-14 lg:grid-cols-[minmax(0,680px)_300px]">
        <div className="space-y-5">
          <div className="h-7 w-full animate-pulse rounded-full bg-[var(--site-bg-muted)]" />
          <div className="h-7 w-4/5 animate-pulse rounded-full bg-[var(--site-bg-muted)]" />
          <div className="space-y-3 pt-4">
            <div className="h-4 w-full animate-pulse rounded-full bg-[var(--site-bg-muted)]" />
            <div className="h-4 w-full animate-pulse rounded-full bg-[var(--site-bg-muted)]" />
            <div className="h-4 w-2/3 animate-pulse rounded-full bg-[var(--site-bg-muted)]" />
            <div className="h-4 w-full animate-pulse rounded-full bg-[var(--site-bg-muted)]" />
            <div className="h-4 w-3/4 animate-pulse rounded-full bg-[var(--site-bg-muted)]" />
          </div>
        </div>
        <div className="hidden space-y-5 lg:block">
          <div className="h-60 animate-pulse rounded-2xl bg-[var(--site-bg-muted)]" />
          <div className="h-52 animate-pulse rounded-2xl bg-[var(--site-bg-muted)]" />
        </div>
      </div>
      <Footer />
    </main>
  );
}

function splitAtThirdHeading(md: string): [string, string] {
  const lines = md.split("\n");
  let headingCount = 0;
  let splitIndex = -1;

  for (let i = 0; i < lines.length; i++) {
    if (/^#{1,4}\s/.test(lines[i])) {
      headingCount++;
      if (headingCount === 3) {
        splitIndex = i;
        break;
      }
    }
  }

  if (splitIndex === -1) return [md, ""];
  return [lines.slice(0, splitIndex).join("\n"), lines.slice(splitIndex).join("\n")];
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
