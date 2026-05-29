import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getPostBySlug, Post } from "@/lib/api";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Loader2, AlertCircle, Calendar, Tag, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — Zain The Analyst` },
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
      } catch (err: any) {
        console.error("Failed to load blog detail post:", err);
        setError(err.message || "Failed to load post.");
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <main className="bg-[#FAFAFA] min-h-screen flex flex-col justify-between">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center gap-3 py-32">
          <Loader2 className="h-8 w-8 animate-spin text-[#09090B]" />
          <span className="text-xs font-semibold text-[#71717A]">Loading article...</span>
        </div>
        <Footer />
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-[#FAFAFA] min-h-screen flex flex-col justify-between">
        <Header />
        <div className="flex-grow flex items-center justify-center py-32">
          <div className="max-w-md p-8 bg-white border border-[#E4E4E7] rounded-3xl shadow-sm text-center">
            <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-[#09090B] mb-2">Failed to load article</h2>
            <p className="text-xs text-[#71717A] mb-6 leading-relaxed">{error}</p>
            <Button asChild variant="primary">
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!post) {
    return (
      <main className="bg-[#FAFAFA] min-h-screen flex flex-col justify-between">
        <Header />
        <div className="flex-grow flex items-center justify-center py-32">
          <div className="max-w-md p-8 bg-white border border-[#E4E4E7] rounded-3xl shadow-sm text-center">
            <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-[#09090B] mb-2">Article not found</h2>
            <p className="text-xs text-[#71717A] mb-6 leading-relaxed">
              The blog article requested does not exist.
            </p>
            <Button asChild variant="primary">
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const articleDate = post.published_at ? new Date(post.published_at) : new Date(post.created_at || "");
  const tags = Array.isArray(post.tags) ? post.tags : [];

  return (
    <main className="bg-[#FAFAFA] min-h-screen flex flex-col">
      <Header />

      <article className="pt-32 md:pt-40 pb-24 flex-grow animate-fade-in">
        <div className="mx-auto max-w-[760px] px-5 sm:px-8 space-y-8">

          {/* Back */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-[#71717A] hover:text-[#09090B] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Blog
          </Link>

          {/* Hero — open layout, no box */}
          <div className="space-y-5 pb-8 border-b border-[#E4E4E7]">
            {/* Category */}
            <span className="inline-block text-[10px] font-bold uppercase tracking-[0.2em] text-[#F97316]">
              {post.category ?? "Article"}
            </span>

            {/* Cover Image */}
            {post.cover_url && (
              <div className="rounded-2xl overflow-hidden border border-[#E4E4E7] aspect-[16/9]">
                <img
                  src={post.cover_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-[48px] font-extrabold tracking-tight text-[#09090B] leading-tight">
              {post.title}
            </h1>

            {/* Excerpt */}
            {post.excerpt && (
              <p className="text-[15px] text-[#71717A] font-medium leading-relaxed border-l-2 border-[#F97316] pl-4">
                {post.excerpt}
              </p>
            )}

            {/* Meta row */}
            <div className="flex items-center gap-4 text-xs text-[#71717A] font-medium pt-1">
              <span className="flex items-center gap-1.5">
                <Calendar className="h-3.5 w-3.5 text-[#A1A1AA]" />
                {articleDate.toLocaleDateString(undefined, { year: "numeric", month: "long", day: "numeric" })}
              </span>
            </div>

            {/* Tags */}
            {tags.length > 0 && (
              <div className="flex flex-wrap gap-1.5 pt-1">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-2.5 py-1 rounded-full bg-[#F4F4F5] border border-[#E4E4E7] text-[10px] font-medium text-[#71717A] flex items-center gap-1"
                  >
                    <Tag className="h-2.5 w-2.5" />
                    <span>{tag}</span>
                  </span>
                ))}
              </div>
            )}
          </div>

          {/* Article Body */}
          <div className="bg-white border border-[#E4E4E7] rounded-3xl p-6 sm:p-10">
            <div className="prose max-w-none text-[#09090B] leading-[1.85] text-sm sm:text-[15px] space-y-6 font-medium">
              <ReactMarkdown
                components={{
                  h1: ({node, ...props}) => <h2 className="text-2xl font-extrabold text-[#09090B] mt-8 mb-4 border-b border-[#E4E4E7] pb-2" {...props} />,
                  h2: ({node, ...props}) => <h3 className="text-xl font-bold text-[#09090B] mt-6 mb-3" {...props} />,
                  h3: ({node, ...props}) => <h4 className="text-lg font-bold text-[#09090B] mt-4 mb-2" {...props} />,
                  p: ({node, ...props}) => <p className="mb-4 text-[#71717A] leading-relaxed" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-1.5" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4 space-y-1.5" {...props} />,
                  li: ({node, ...props}) => <li className="text-[#71717A] leading-relaxed" {...props} />,
                  code: ({node, ...props}) => <code className="bg-[#F4F4F5] border border-[#E4E4E7] px-1.5 py-0.5 rounded text-[12px] font-mono text-[#09090B]" {...props} />,
                  pre: ({node, ...props}) => <pre className="bg-[#09090B] text-[#FAFAFA] p-4 rounded-2xl overflow-x-auto text-[13px] font-mono leading-relaxed mb-4 shadow-sm" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-[#F97316] pl-4 italic text-[#71717A] mb-4" {...props} />,
                }}
              >
                {post.body_md}
              </ReactMarkdown>
            </div>
          </div>

          {/* Bottom Actions */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-2">
            <Button asChild variant="secondary">
              <Link to="/blog">
                <ArrowLeft className="h-4 w-4" />
                <span>Back to Blog</span>
              </Link>
            </Button>
            <Button asChild variant="primary">
              <Link to="/contact">
                <span>Start a Project</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

        </div>
      </article>

      <Footer />
    </main>
  );
}
