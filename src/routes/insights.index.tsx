import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { getPosts, Post } from "@/lib/api";
import { Loader2, AlertCircle, Inbox } from "lucide-react";

export const Route = createFileRoute("/insights/")({
  head: () => ({
    meta: [
      { title: "Writing — Power BI, Tableau & Analytics | Zain Haidar" },
      { name: "description", content: "Professional blog and field notes by Zain Haidar focusing on Power BI calculation layers, Tableau server logic, and BigQuery data engineering." },
      { property: "og:title", content: "Writing — Zain Haidar" },
      { property: "og:description", content: "Sleek architectural notes on building professional business intelligence setups." },
    ],
  }),
  component: InsightsPage,
});

function InsightsPage() {
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
        setError(err.message || "Failed to load articles");
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  return (
    <main className="bg-[#F8FAFC] min-h-screen flex flex-col font-poppins text-slate-800">
      <Header />
      
      <section className="pt-32 md:pt-40 pb-20 flex-grow">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          
          {/* Header */}
          <div className="mb-14 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">Writing</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight mb-4">
              Simple tips and data guides
            </h2>
            <p className="text-slate-500 text-[15px] leading-[1.8]">
              I write simple articles about Power BI, Tableau, Looker Studio, and how to make sense of your business data without getting confused.
            </p>
          </div>

          {/* LOADING STATE */}
          {loading && (
            <div className="flex justify-center py-20">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
            </div>
          )}

          {/* ERROR STATE */}
          {error && !loading && (
            <div className="p-6 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3.5 max-w-2xl mx-auto">
              <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-rose-800 text-sm">Failed to Load Articles</h4>
                <p className="text-xs text-rose-600 mt-1 leading-normal">{error}</p>
              </div>
            </div>
          )}

          {/* EMPTY STATE */}
          {!loading && !error && posts.length === 0 && (
            <div className="border border-slate-200 rounded-xl p-12 text-center bg-white max-w-2xl mx-auto">
              <div className="h-12 w-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-4">
                <Inbox className="h-5 w-5 text-slate-400" />
              </div>
              <p className="font-bold text-slate-800 text-lg mb-1">No posts found.</p>
              <p className="text-slate-500 text-sm max-w-md mx-auto leading-relaxed">
                I am writing helpful guides on how to clean up spreadsheets, build faster reports, and make your business data easier to read.
              </p>
            </div>
          )}

          {/* ARTICLES LIST */}
          {!loading && !error && posts.length > 0 && (
            <div className="divide-y divide-slate-200/80 border-t border-b border-slate-200/80 mt-12">
              {posts.map((p) => (
                <Link
                  key={p.id}
                  to="/insights/$slug"
                  params={{ slug: p.slug }}
                  className="group grid md:grid-cols-12 gap-6 py-10 items-start hover:bg-slate-50/50 transition px-4 -mx-4 rounded-xl cursor-pointer"
                >
                  <div className="md:col-span-3 text-[10px] font-semibold uppercase tracking-[0.2em] text-blue-600">
                    {p.category ?? "Article"}
                  </div>
                  <div className="md:col-span-9">
                    <h3 className="text-xl md:text-2xl font-bold leading-snug text-[#0F172A] group-hover:text-[#2563EB] transition-colors">
                      {p.title}
                    </h3>
                    
                    {p.excerpt && (
                      <p className="mt-3 text-[14px] text-slate-500 leading-relaxed line-clamp-2 max-w-[62ch]">
                        {p.excerpt}
                      </p>
                    )}

                    {p.tags && p.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mt-3">
                        {p.tags.map((tag) => (
                          <span key={tag} className="badge-navy text-[10px]">{tag}</span>
                        ))}
                      </div>
                    )}
                    
                    <div className="mt-4 flex items-center gap-1.5 text-xs text-blue-600 font-semibold uppercase tracking-wider opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                      Read Article →
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
      
      <Footer />
    </main>
  );
}
