import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Post } from "@/lib/api";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { ArrowLeft, Loader2, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/insights/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — Zain The Analyst` },
      { name: "description", content: "Simple and helpful data guides and articles by Zain Haidar." },
    ],
  }),
  component: InsightDetail,
  notFoundComponent: () => (
    <main className="min-h-screen bg-[#FAFAFA] grid place-items-center font-poppins">
      <div className="text-center p-8 bg-white border border-slate-200 rounded-2xl shadow-sm max-w-sm">
        <h1 className="text-2xl font-bold text-[#0F172A] mb-2">Article not found</h1>
        <p className="text-xs text-slate-500 mb-6">The article you are looking for might have been removed or updated.</p>
        <Link to="/insights" className="text-[#F97316] border-b border-blue-600 pb-0.5 text-xs font-semibold hover:text-[#EA580C]">
          Back to writing
        </Link>
      </div>
    </main>
  ),
});

function InsightDetail() {
  const { slug } = Route.useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("posts")
          .select("*")
          .eq("slug", slug)
          .single();

        if (error) {
          throw error;
        }

        setPost(data);
        setError(null);
      } catch (err: any) {
        console.error("Error loading post details:", err);
        setError(err.message || "Failed to load article details");
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center font-poppins">
        <div className="text-center flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#F97316]" />
          <span className="text-xs font-medium text-slate-400">Loading article...</span>
        </div>
      </main>
    );
  }

  if (error || !post) {
    return (
      <main className="min-h-screen bg-[#FAFAFA] flex items-center justify-center font-poppins">
        <div className="max-w-md p-6 bg-white border border-slate-200 rounded-2xl shadow-sm text-center">
          <AlertCircle className="h-10 w-10 text-rose-500 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-slate-800 mb-1">Could Not Load Article</h2>
          <p className="text-xs text-slate-500 mb-6 leading-normal">
            {error || "The requested post could not be retrieved from the database."}
          </p>
          <Link to="/insights" className="text-[#F97316] hover:text-[#EA580C] text-xs font-semibold">
            &larr; Back to all writing
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="bg-[#FAFAFA] min-h-screen flex flex-col font-poppins text-slate-800">
      <Header />
      
      <article className="pt-32 md:pt-40 pb-24 flex-grow">
        <div className="mx-auto max-w-[720px] px-5 sm:px-8">
          
          {/* Back Navigation */}
          <Link
            to="/insights"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-[#F97316] mb-10 cursor-pointer transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> All writing
          </Link>
          
          {/* Category Badge */}
          <div className="text-[10px] font-semibold uppercase tracking-[0.2em] text-[#F97316] mb-4">
            {post.category ?? "Article"}
          </div>
          
          {/* Article Title */}
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#0F172A] leading-tight">
            {post.title}
          </h1>
          
          {/* Excerpt */}
          {post.excerpt && (
            <p className="mt-6 text-base sm:text-lg text-slate-500 leading-relaxed border-l-2 border-blue-600 pl-4">
              {post.excerpt}
            </p>
          )}

          {/* Tags */}
          {post.tags && post.tags.length > 0 && (
            <div className="flex flex-wrap gap-1.5 mt-6">
              {post.tags.map((tag) => (
                <span key={tag} className="badge-navy text-[11px]">{tag}</span>
              ))}
            </div>
          )}
          
          {/* Cover Image */}
          {post.cover_url && (
            <img
              src={post.cover_url}
              alt={post.title}
              className="mt-10 rounded-2xl w-full aspect-[16/9] object-cover border border-slate-200 shadow-sm"
            />
          )}
          
          {/* Article Body */}
          <div className="prose prose-slate mt-12 whitespace-pre-wrap text-slate-600 leading-relaxed text-sm sm:text-base space-y-6">
            {post.body_md}
          </div>

        </div>
      </article>
      
      <Footer />
    </main>
  );
}
