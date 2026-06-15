import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getPostBySlug, Post } from "@/lib/api";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, AlertCircle, Calendar, Tag, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { getErrorMessage } from "@/lib/utils";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => ({
    meta: [
      {
        title: `${params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} — Zain Haidar`,
      },
      { name: "description", content: "Actionable technical blog article by Zain Haidar." },
    ],
  }),
  component: BlogDetailPage,
});

function BlogDetailPage() {
  const { slug } = Route.useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        const data = await getPostBySlug(slug);
        setPost(data);
        setError(null);
      } catch (err: unknown) {
        console.error("Failed to load blog detail post:", err);
        setError(getErrorMessage(err, "Failed to load post."));
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <main className="bg-[#0F1012] min-h-screen flex flex-col justify-between font-poppins text-[#D8D8D2]">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center gap-3 py-32">
          <Loader2 className="h-8 w-8 animate-spin text-[#D8D8D2]" />
          <span className="text-xs font-normal text-[#AAA9A3]">Loading article...</span>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="bg-[#0F1012] min-h-screen flex flex-col justify-between font-poppins text-[#D8D8D2]">
        <Header />
        <div className="flex-grow flex items-center justify-center py-32">
          <div className="max-w-md p-8 bg-[#151619] border border-[rgba(245,245,243,0.10)] rounded-3xl text-center shadow-none">
            <AlertCircle className="h-10 w-10 text-red-400 mx-auto mb-4" />
            <h2 className="text-lg font-normal text-[#F5F5F3] mb-2">
              {error ? "Failed to load article" : "Article not found"}
            </h2>
            <p className="text-xs text-[#AAA9A3] mb-6 leading-relaxed">
              {error || "The blog article requested does not exist."}
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
    <main className="bg-[#0F1012] min-h-screen flex flex-col font-poppins text-[#D8D8D2]">
      <Header />

      <article className="public-detail-article flex-grow animate-fade-in pt-24 pb-16">
        <div className="mx-auto max-w-[760px] px-6 space-y-8">
          {/* Back */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[12px] font-normal uppercase tracking-wider text-[#AAA9A3] hover:text-[#F5F5F3] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-[#AAA9A3]" /> Back to Blog
          </Link>

          {/* Hero */}
          <div className="public-detail-hero space-y-6 pb-8 border-b border-[rgba(245,245,243,0.10)]">
            {/* Category */}
            <span className="inline-block text-[10px] font-normal uppercase tracking-[0.2em] text-[#AAA9A3]">
              {post.category ?? "Article"}
            </span>

            {/* Cover Image */}
            {post.cover_url && (
              <div className="rounded-2xl overflow-hidden border border-[rgba(245,245,243,0.10)] aspect-[16/9] bg-[#0F1012]">
                <img src={post.cover_url} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-[48px] font-normal tracking-tight text-[#F5F5F3] leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-base text-[#D8D8D2] font-normal leading-relaxed border-l-2 border-[#AAA9A3] pl-4">
                {post.excerpt}
              </p>
            )}

            {/* Meta row */}
            <div className="flex items-center gap-4 text-xs text-[#AAA9A3] font-normal pt-1">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#AAA9A3]" />
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
                    className="px-3 py-1 rounded-full bg-[#1D1E22] border border-[rgba(245,245,243,0.08)] text-[10px] font-normal text-[#D8D8D2] flex items-center gap-1.5 hover:border-[rgba(245,245,243,0.24)] hover:bg-[#232428] transition-all duration-300 cursor-default"
                  >
                    <Tag className="h-3 w-3 text-[#AAA9A3]" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Article Body */}
          <div className="bg-[#151619] border border-[rgba(245,245,243,0.10)] rounded-3xl p-6 sm:p-10 shadow-none">
            <div className="prose max-w-none text-[#D8D8D2]/80 leading-[1.8] text-sm sm:text-base space-y-6 font-normal [&_h1]:text-[#F5F5F3] [&_h1]:font-normal [&_h2]:text-[#F5F5F3] [&_h2]:font-normal [&_h3]:text-[#F5F5F3] [&_h3]:font-normal [&_h4]:text-[#F5F5F3] [&_h4]:font-normal [&_strong]:text-[#F5F5F3] [&_strong]:font-normal [&_li]:marker:text-[#D8D8D2] [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h2
                      className="text-2xl font-normal text-[#F5F5F3] mt-8 mb-4 border-b border-[rgba(245,245,243,0.10)] pb-2"
                      {...props}
                    />
                  ),
                  h2: ({ node, ...props }) => (
                    <h3 className="text-xl font-normal text-[#F5F5F3] mt-6 mb-3" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h4 className="text-lg font-normal text-[#F5F5F3] mt-4 mb-2" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="mb-4 text-[#D8D8D2]/80 leading-relaxed" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-5 mb-4 space-y-2" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal pl-5 mb-4 space-y-2" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="text-[#D8D8D2]/80 leading-relaxed" {...props} />
                  ),
                  code: ({ node, ...props }) => (
                    <code
                      className="bg-[#0F1012] border border-[rgba(245,245,243,0.10)] px-1.5 py-0.5 rounded text-[12px] font-mono text-[#F5F5F3]"
                      {...props}
                    />
                  ),
                  pre: ({ node, ...props }) => (
                    <pre
                      className="bg-[#0F1012] border border-[rgba(245,245,243,0.10)] text-[#F5F5F3] p-4 rounded-2xl overflow-x-auto text-[13px] font-mono leading-relaxed mb-4 shadow-none"
                      {...props}
                    />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote
                      className="border-l-4 border-[#D8D8D2] pl-4 italic text-[#D8D8D2]/80 mb-4 bg-[#0F1012] py-2 pr-4 rounded-r-lg"
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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-[rgba(245,245,243,0.10)]">
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
