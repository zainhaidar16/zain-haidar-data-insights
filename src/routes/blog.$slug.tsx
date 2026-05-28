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
        console.log("Route slug:", slug);
        console.log("Fetched post:", data);
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
      <main className="bg-[#F6F4EF] min-h-screen flex flex-col justify-between font-sans animate-pulse">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center gap-3 py-32">
          <Loader2 className="h-8 w-8 animate-spin text-[#111111] mb-1" />
          <span className="text-xs font-semibold text-gray-500">Loading...</span>
        </div>
        <Footer />
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-[#F6F4EF] min-h-screen flex flex-col justify-between font-sans">
        <Header />
        <div className="flex-grow flex items-center justify-center py-32">
          <div className="max-w-md p-6 bg-white border border-[#E5E7EB] rounded-3xl shadow-sm text-center">
            <AlertCircle className="h-10 w-10 text-rose-500 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-[#111111] mb-1">Failed to load blog post.</h2>
            <p className="text-xs text-rose-600 mb-6 leading-normal font-semibold">
              {error}
            </p>
            <Button asChild variant="primary" className="text-xs">
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
      <main className="bg-[#F6F4EF] min-h-screen flex flex-col justify-between font-sans">
        <Header />
        <div className="flex-grow flex items-center justify-center py-32">
          <div className="max-w-md p-6 bg-white border border-[#E5E7EB] rounded-3xl shadow-sm text-center">
            <AlertCircle className="h-10 w-10 text-rose-500 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-[#111111] mb-1">Not found.</h2>
            <p className="text-xs text-gray-500 mb-6 leading-normal font-semibold">
              The blog article requested does not exist.
            </p>
            <Button asChild variant="primary" className="text-xs">
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
    <main className="bg-[#F6F4EF] min-h-screen flex flex-col font-sans text-[#111111]">
      <Header />
      
      <article className="pt-32 md:pt-40 pb-24 flex-grow animate-fade-in">
        <div className="mx-auto max-w-[760px] px-5 sm:px-8 space-y-8">
          
          {/* Back to Blog */}
          <Link
            to="/blog"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-gray-400 hover:text-[#111111] mb-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Blog
          </Link>
          
          {/* Hero Section */}
          <div className="bg-white border border-[#E5E7EB] shadow-sm rounded-3xl p-6 sm:p-10 space-y-6">
            
            {/* Cover Image */}
            {post.cover_url && (
              <div className="rounded-2xl overflow-hidden border border-[#E5E7EB] shadow-xs aspect-[16/9] select-none">
                <img
                  src={post.cover_url}
                  alt={post.title}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            <div className="space-y-4">
              {/* Category */}
              <div className="text-[10px] font-bold uppercase tracking-[0.22em] text-gray-500">
                {post.category ?? "Article"}
              </div>
              
              {/* Title */}
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold tracking-tight text-[#111111] leading-tight">
                {post.title}
              </h1>

              {/* Excerpt */}
              {post.excerpt && (
                <p className="text-[14px] text-gray-500 font-medium leading-relaxed italic border-l-2 border-[#D7FF3F] pl-4">
                  "{post.excerpt}"
                </p>
              )}
              
              {/* Publish Date */}
              <div className="flex items-center gap-2.5 text-xs text-gray-400 font-semibold pt-1 border-t border-gray-100">
                <Calendar className="h-4 w-4 text-gray-300" />
                <span>Published on {articleDate.toLocaleDateString(undefined, { year: 'numeric', month: 'long', day: 'numeric' })}</span>
              </div>

              {/* Tags badges */}
              {tags.length > 0 && (
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {tags.map((tag) => (
                    <span 
                      key={tag} 
                      className="badge-dark"
                    >
                      <Tag className="h-3 w-3 text-gray-400 mr-1" />
                      <span>{tag}</span>
                    </span>
                  ))}
                </div>
              )}
            </div>

          </div>
          
          {/* Article Body: Markdown Content safely rendered */}
          <div className="bg-white border border-[#E5E7EB] shadow-sm rounded-3xl p-6 sm:p-10">
            <div className="prose prose-slate max-w-none text-[#111111] leading-[1.85] text-sm sm:text-[15px] space-y-6 pt-2 font-medium">
              <ReactMarkdown
                components={{
                  h1: ({node, ...props}) => <h2 className="text-2xl font-bold text-[#111111] mt-8 mb-4 border-b border-gray-100 pb-2" {...props} />,
                  h2: ({node, ...props}) => <h3 className="text-xl font-bold text-[#111111] mt-6 mb-3" {...props} />,
                  h3: ({node, ...props}) => <h4 className="text-lg font-bold text-[#111111] mt-4 mb-2" {...props} />,
                  p: ({node, ...props}) => <p className="mb-4 text-gray-600 font-medium" {...props} />,
                  ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-4 space-y-1.5" {...props} />,
                  ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-4 space-y-1.5" {...props} />,
                  li: ({node, ...props}) => <li className="text-gray-600 font-medium" {...props} />,
                  code: ({node, ...props}) => <code className="bg-gray-100 px-1.5 py-0.5 rounded text-[12px] font-mono text-[#111111]" {...props} />,
                  pre: ({node, ...props}) => <pre className="bg-[#111111] text-gray-100 p-4 rounded-2xl overflow-x-auto text-[13px] font-mono leading-relaxed mb-4 shadow-sm" {...props} />,
                  blockquote: ({node, ...props}) => <blockquote className="border-l-4 border-gray-300 pl-4 italic text-gray-500 mb-4" {...props} />,
                }}
              >
                {post.body_md}
              </ReactMarkdown>
            </div>
          </div>

          {/* Bottom Actions Section */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-4 pt-4">
              <Button asChild variant="secondary">
                <Link to="/blog">
                  <ArrowLeft className="h-4 w-4" />
                  <span>Back to Blog</span>
                </Link>
              </Button>

              <Button asChild variant="primary">
                <Link to="/contact">
                  <span>Contact Me</span>
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
