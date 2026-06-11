import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getPostBySlug, Post } from "@/lib/api";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, AlertCircle, Calendar, Tag, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { getErrorMessage } from "@/lib/utils";

export const Route = createFileRoute("/insights/$slug")({
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
      <main className="bg-[#F5F5F7] min-h-screen flex flex-col justify-between font-poppins text-[#1D1D1F]">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center gap-3 py-32">
          <Loader2 className="h-8 w-8 animate-spin text-[#0071E3]" />
          <span className="text-xs font-semibold text-[#6E6E73]">Loading article...</span>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="bg-[#F5F5F7] min-h-screen flex flex-col justify-between font-poppins text-[#1D1D1F]">
        <Header />
        <div className="flex-grow flex items-center justify-center py-32">
          <div className="max-w-md p-8 bg-[#FFFFFF] border border-[#E8E8ED] rounded-3xl text-center shadow-sm">
            <AlertCircle className="h-10 w-10 text-[#FF3B30] mx-auto mb-4" />
            <h2 className="text-lg font-bold text-[#1D1D1F] mb-2">
              {error ? "Failed to load article" : "Article not found"}
            </h2>
            <p className="text-xs text-[#6E6E73] mb-6 leading-relaxed">
              {error || "The blog article requested does not exist."}
            </p>
            <Button
              asChild
              variant="secondary"
              className="text-xs border-[#D2D2D7] bg-[#FFFFFF] hover:bg-[#F5F5F7] text-[#1D1D1F]"
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
    <main className="bg-[#F5F5F7] min-h-screen flex flex-col font-poppins text-[#1D1D1F]">
      <Header />

      <article className="public-detail-article flex-grow animate-fade-in pt-24 pb-16">
        <div className="mx-auto max-w-[760px] px-6 space-y-8">
          {/* Back */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-[#6E6E73] hover:text-[#0071E3] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-[#0071E3]" /> Back to Blog
          </Link>

          {/* Hero */}
          <div className="public-detail-hero space-y-6 pb-8 border-b border-[#E8E8ED]">
            {/* Category */}
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#0071E3]">
              {post.category ?? "Article"}
            </span>

            {/* Cover Image */}
            {post.cover_url && (
              <div className="rounded-2xl overflow-hidden border border-[#E8E8ED] aspect-[16/9] bg-[#F5F5F7]">
                <img src={post.cover_url} alt={post.title} className="w-full h-full object-cover" />
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-[48px] font-extrabold tracking-tight text-[#1D1D1F] leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-base text-[#6E6E73] font-medium leading-relaxed border-l-2 border-[#0071E3] pl-4">
                {post.excerpt}
              </p>
            )}

            {/* Meta row */}
            <div className="flex items-center gap-4 text-xs text-[#6E6E73] font-medium pt-1">
              <span className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-[#0071E3]" />
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
                    className="px-3 py-1 rounded-full bg-[#F5F5F7] border border-[#E8E8ED] text-[10px] font-medium text-[#6E6E73] flex items-center gap-1.5 hover:border-[#0071E3]/30 hover:bg-[#0071E3]/5 transition-all duration-300 cursor-default"
                  >
                    <Tag className="h-3 w-3 text-[#0071E3]" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Article Body */}
          <div className="bg-[#FFFFFF] border border-[#E8E8ED] rounded-3xl p-6 sm:p-10 shadow-sm">
            <div className="prose max-w-none text-[#6E6E73] leading-[1.8] text-sm sm:text-base space-y-6 font-medium [&_h1]:text-[#1D1D1F] [&_h2]:text-[#1D1D1F] [&_h3]:text-[#1D1D1F] [&_h4]:text-[#1D1D1F] [&_strong]:text-[#1D1D1F] [&_li]:marker:text-[#0071E3] [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2 [&_ol]:list-decimal [&_ol]:pl-5 [&_ol]:space-y-2">
              <ReactMarkdown
                components={{
                  h1: ({ node, ...props }) => (
                    <h2
                      className="text-2xl font-extrabold text-[#1D1D1F] mt-8 mb-4 border-b border-[#E8E8ED] pb-2"
                      {...props}
                    />
                  ),
                  h2: ({ node, ...props }) => (
                    <h3 className="text-xl font-bold text-[#1D1D1F] mt-6 mb-3" {...props} />
                  ),
                  h3: ({ node, ...props }) => (
                    <h4 className="text-lg font-bold text-[#1D1D1F] mt-4 mb-2" {...props} />
                  ),
                  p: ({ node, ...props }) => (
                    <p className="mb-4 text-[#6E6E73] leading-relaxed" {...props} />
                  ),
                  ul: ({ node, ...props }) => (
                    <ul className="list-disc pl-5 mb-4 space-y-2" {...props} />
                  ),
                  ol: ({ node, ...props }) => (
                    <ol className="list-decimal pl-5 mb-4 space-y-2" {...props} />
                  ),
                  li: ({ node, ...props }) => (
                    <li className="text-[#6E6E73] leading-relaxed" {...props} />
                  ),
                  code: ({ node, ...props }) => (
                    <code
                      className="bg-[#F5F5F7] border border-[#E8E8ED] px-1.5 py-0.5 rounded text-[12px] font-mono text-[#1D1D1F]"
                      {...props}
                    />
                  ),
                  pre: ({ node, ...props }) => (
                    <pre
                      className="bg-[#F5F5F7] border border-[#E8E8ED] text-[#1D1D1F] p-4 rounded-2xl overflow-x-auto text-[13px] font-mono leading-relaxed mb-4 shadow-sm"
                      {...props}
                    />
                  ),
                  blockquote: ({ node, ...props }) => (
                    <blockquote
                      className="border-l-4 border-[#0071E3] pl-4 italic text-[#6E6E73] mb-4 bg-[#F5F5F7] py-2 pr-4 rounded-r-lg"
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
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4 border-t border-[#E8E8ED]">
            <Button
              asChild
              variant="secondary"
              className="border-[#D2D2D7] bg-[#FFFFFF] hover:bg-[#F5F5F7] text-[#1D1D1F] rounded-full px-6 py-2.5 font-medium transition-all duration-200"
            >
              <Link to="/blog">
                <ArrowLeft className="h-4 w-4 mr-2 inline" />
                <span>Back to Blog</span>
              </Link>
            </Button>
            <Button
              asChild
              variant="primary"
              className="bg-[#0071E3] hover:bg-[#005BB5] text-[#FFFFFF] rounded-full px-6 py-2.5 font-medium transition-all duration-200 shadow-sm"
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
