import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { getPosts, Post } from "@/lib/api";
import { Loader2, AlertCircle, Inbox, Calendar, Tag } from "lucide-react";

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Zain The Analyst | Simple Data Guides" },
      { name: "description", content: "Data analyst guides, Power BI walkthroughs, SQL optimization, and Python analysis guides." },
    ],
  }),
  component: BlogListPage,
});

function BlogListPage() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPosts() {
      try {
        setLoading(true);
        const data = await getPosts();
        setPosts(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load posts.");
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  return (
    <main className="bg-[#F8FAFC] min-h-screen flex flex-col font-poppins text-slate-800">
      <Header />
      
      <section className="pt-32 md:pt-40 pb-20 flex-grow animate-fade-in">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          
          {/* Section Header */}
          <div className="mb-14 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">Blog Insights</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight mb-4">
              Simple guides & tech notes
            </h2>
            <p className="text-slate-500 text-[15px] leading-[1.8] font-medium">
              I share actionable guides about Power BI calculations, database query optimizations, clean ETL pipelines, and readable business intelligence reports.
            </p>
          </div>

          {/* Loading status */}
          {loading && (
            <div className="flex flex-col justify-center items-center py-24 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="text-xs text-slate-400 font-semibold">Loading guides catalogue...</span>
            </div>
          )}

          {/* Error Banner */}
          {error && !loading && (
            <div className="p-5 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3.5 max-w-2xl mx-auto shadow-xs">
              <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-rose-800 text-sm">Failed to Load Blog Posts</h4>
                <p className="text-xs text-rose-600 mt-1 leading-normal font-semibold">{error}</p>
              </div>
            </div>
          )}

          {/* Empty catalog state */}
          {!loading && !error && posts.length === 0 && (
            <div className="border border-slate-200 rounded-3xl p-16 text-center bg-white max-w-2xl mx-auto shadow-xs">
              <div className="h-12 w-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-4">
                <Inbox className="h-5 w-5 text-slate-400" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-1">No posts found.</h3>
              <p className="text-slate-550 text-xs max-w-md mx-auto leading-relaxed font-semibold">
                Articles will appear here once they are drafted and published in the admin room.
              </p>
            </div>
          )}

          {/* Posts list grid */}
          {!loading && !error && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((p) => (
                <article 
                  key={p.id} 
                  className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-slate-250 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div className="flex-1 flex flex-col">
                    {/* Thumbnail banner */}
                    {p.cover_url ? (
                      <div className="aspect-[16/9] overflow-hidden border-b border-slate-100">
                        <img 
                          src={p.cover_url} 
                          alt="" 
                          className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300 select-none" 
                        />
                      </div>
                    ) : (
                      <div className="aspect-[16/9] bg-slate-50 border-b border-slate-100 flex items-center justify-center text-slate-400 select-none">
                        <FileText className="h-8 w-8 stroke-1" />
                      </div>
                    )}

                    {/* Metadata summary */}
                    <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                      <div className="space-y-2">
                        <div className="flex items-center justify-between">
                          <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">
                            {p.category ?? "Article"}
                          </span>
                          <span className="text-[10px] font-semibold text-slate-400 font-mono flex items-center gap-1">
                            <Calendar className="h-3 w-3 shrink-0" />
                            {p.published_at ? new Date(p.published_at).toLocaleDateString() : new Date(p.created_at || "").toLocaleDateString()}
                          </span>
                        </div>

                        <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-lg tracking-tight leading-snug line-clamp-2 pt-1">
                          {p.title}
                        </h3>

                        {p.excerpt && (
                          <p className="text-slate-500 text-xs leading-relaxed font-semibold line-clamp-3 pt-1">
                            {p.excerpt}
                          </p>
                        )}
                      </div>

                      {/* Tag badges */}
                      {p.tags && p.tags.length > 0 && (
                        <div className="flex flex-wrap gap-1 pt-2">
                          {p.tags.map((tag) => (
                            <span 
                              key={tag} 
                              className="px-2 py-0.5 rounded-full bg-slate-100 border border-slate-200/40 text-[9px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1"
                            >
                              <Tag className="h-2.5 w-2.5 shrink-0" />
                              <span>{tag}</span>
                            </span>
                          ))}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Read More button */}
                  <div className="px-6 pb-6 pt-2">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                      className="w-full inline-flex items-center justify-center gap-1 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-bold text-xs shadow-xs transition cursor-pointer"
                    >
                      <span>Read More</span>
                      <span>→</span>
                    </Link>
                  </div>

                </article>
              ))}
            </div>
          )}

        </div>
      </section>

      <Footer />
    </main>
  );
}

// Quick placeholder icon mapping helper for skeleton
function FileText(props: any) {
  return (
    <svg 
      xmlns="http://www.w3.org/2000/svg" 
      width="24" 
      height="24" 
      viewBox="0 0 24 24" 
      fill="none" 
      stroke="currentColor" 
      strokeWidth="2" 
      strokeLinecap="round" 
      strokeLinejoin="round" 
      {...props}
    >
      <path d="M15 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V7Z"/>
      <path d="M14 2v4a2 2 0 0 0 2 2h4"/>
      <path d="M10 9H8"/>
      <path d="M16 13H8"/>
      <path d="M16 17H8"/>
    </svg>
  );
}
