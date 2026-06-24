import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, AlertCircle, Calendar, Tag, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { getPostDetailData } from "@/lib/public-data.functions";

export const Route = createFileRoute("/insights/$slug")({
  loader: ({ params }) => getPostDetailData({ data: { slug: params.slug } }),
  head: ({ params }) => ({
    meta: [
      {
        title: `${params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} — Zain Haidar`,
      },
      { name: "description", content: "Actionable technical blog article by Zain Haidar." },
    ],
  }),
  component: InsightDetailPage,
});

function InsightDetailPage() {
  const { post } = Route.useLoaderData();

  if (!post) {
    return (
      <main className="bg-[var(--site-bg)] min-h-screen flex flex-col justify-between font-poppins text-[var(--text-soft)]">
        <Header />
        <div className="flex-grow flex items-center justify-center py-32">
          <div className="max-w-md p-8 bg-[var(--site-bg-soft)] border border-[var(--border)] rounded-3xl text-center shadow-sm">
            <AlertCircle className="h-10 w-10 text-red-600 mx-auto mb-4" />
            <h2 className="text-lg font-normal text-[var(--text-main)] mb-2">
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

      <article className="public-detail-article flex-grow animate-fade-in pt-24 pb-16">
        <div className="mx-auto max-w-[760px] px-6 space-y-8">
          {/* Back */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[12px] font-normal uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-[var(--text-muted)]" /> Back to Blog
          </Link>

          {/* Hero */}
          <div className="public-detail-hero space-y-6 pb-8 border-b border-[var(--border)]">
            {/* Category */}
            <span className="inline-block text-[10px] font-normal uppercase tracking-[0.2em] text-[var(--text-muted)]">
              {post.category ?? "Article"}
            </span>

            {/* Cover Image */}
            {post.cover_url && (
              <div className="rounded-2xl overflow-hidden border border-[var(--border)] aspect-[16/9] bg-[var(--site-bg-muted)]">
                <img src={post.cover_url} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-[48px] font-normal tracking-tight text-[var(--text-main)] leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-base text-[var(--text-soft)] font-normal leading-relaxed border-l-2 border-[var(--purple)] pl-4">
                {post.excerpt}
              </p>
            )}

            {/* Meta row */}
            <div className="flex items-center gap-4 text-xs text-[var(--text-muted)] font-normal pt-1">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[var(--text-muted)]" />
                {articleDate.toLocaleDateString(undefined, {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </span>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-2 pt-1">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1 rounded-full bg-[var(--site-bg-soft)] border border-[var(--border)] text-[10px] font-normal text-[var(--text-main)] flex items-center gap-1.5 hover:border-[var(--card-border-hover)] hover:bg-[var(--card-bg-soft)] transition-all duration-300 cursor-default shadow-sm"
                  >
                    <Tag className="h-3 w-3 text-[var(--text-muted)]" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Article Body */}
          <div className="bg-white border border-[var(--border)] rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="prose max-w-none text-[var(--text-soft)] leading-[1.8] text-sm sm:text-base space-y-6 font-normal [&_h1]:text-[var(--text-main)] [&_h1]:font-normal [&_h2]:text-[var(--text-main)] [&_h2]:font-normal [&_h3]:text-[var(--text-main)] [&_h3]:font-normal [&_h4]:text-[var(--text-main)] [&_h4]:font-normal [&_strong]:text-[var(--text-main)] [&_strong]:font-normal [&_li]:marker:text-[var(--purple)] [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h2
                      className="text-2xl font-normal text-[var(--text-main)] mt-8 mb-4 border-b border-[var(--border)] pb-2"
                      {...props}
                    />
                  ),
                  h2: ({ node, ...props }) => (
                    <h3 className="text-xl font-normal text-[var(--text-main)] mt-6 mb-3" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h4 className="text-lg font-normal text-[var(--text-main)] mt-4 mb-2" {...props} />
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

          {/* Bottom Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-[var(--border)]">
            <Button
              asChild
              variant="outline"
            >
              <Link to="/blog">
                <ArrowLeft className="h-4 w-4 mr-2 inline" />
                <span>Back to Blog</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="primary"
            >
              <Link to="/contact">
                <span>Start a Project</span>
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
