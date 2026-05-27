import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { getPosts, Post } from "@/lib/api";
import { Loader2, AlertCircle, Inbox, Calendar, Tag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const EASE = [0.25, 0.1, 0.25, 1] as const;

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
    <main className="bg-white min-h-screen flex flex-col">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-20 bg-[#F6F4EF]">
        <div className="section-container">
          <div className="max-w-3xl">
            <p className="text-[12px] font-semibold uppercase tracking-widest text-[#9CA3AF] mb-3">Blog Insights</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111111] tracking-tight leading-[1.1] mb-5">
              Simple guides{" "}
              <span className="relative inline-block">
                & tech notes.
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#D7FF3F]/40 -z-10 rounded-sm" />
              </span>
            </h1>
            <p className="text-[#4B5563] text-[15px] leading-relaxed max-w-2xl">
              I share actionable guides about Power BI calculations, database query optimizations, clean ETL pipelines, and readable business intelligence reports.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 flex-grow animate-fade-in">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">

          {/* Loading */}
          {loading && (
            <div className="flex flex-col justify-center items-center py-24 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-[#111111]" />
              <span className="text-xs text-[#9CA3AF] font-medium">Loading guides catalogue...</span>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="p-5 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3.5 max-w-2xl mx-auto">
              <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-rose-800 text-sm">Failed to Load Blog Posts</h4>
                <p className="text-xs text-rose-600 mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && posts.length === 0 && (
            <div className="border border-[#E5E7EB] rounded-3xl p-16 text-center bg-white max-w-2xl mx-auto">
              <div className="h-12 w-12 rounded-full bg-[#F6F4EF] border border-[#E5E7EB] flex items-center justify-center mx-auto mb-4">
                <Inbox className="h-5 w-5 text-[#9CA3AF]" />
              </div>
              <h3 className="font-bold text-[#111111] text-lg mb-1">No posts found.</h3>
              <p className="text-[#4B5563] text-xs max-w-md mx-auto">
                Articles will appear here once they are drafted and published.
              </p>
            </div>
          )}

          {/* Posts grid */}
          {!loading && !error && posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((p, i) => (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
                  className="card-payoneer overflow-hidden flex flex-col group hover:border-[#D1D5DB]"
                >
                  {/* Thumbnail */}
                  {p.cover_url ? (
                    <div className="aspect-[16/9] overflow-hidden border-b border-[#E5E7EB]">
                      <img src={p.cover_url} alt="" className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300" />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] bg-[#F6F4EF] border-b border-[#E5E7EB] flex items-center justify-center text-[#D1D5DB]">
                      <svg className="h-8 w-8" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 14.25v-2.625a3.375 3.375 0 00-3.375-3.375h-1.5A1.125 1.125 0 0113.5 7.125v-1.5a3.375 3.375 0 00-3.375-3.375H8.25m0 12.75h7.5m-7.5 3H12M10.5 2.25H5.625c-.621 0-1.125.504-1.125 1.125v17.25c0 .621.504 1.125 1.125 1.125h12.75c.621 0 1.125-.504 1.125-1.125V11.25a9 9 0 00-9-9z" />
                      </svg>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-semibold text-[#9CA3AF] tracking-wider">
                          {p.category ?? "Article"}
                        </span>
                        <span className="text-[10px] font-medium text-[#9CA3AF] flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {p.published_at ? new Date(p.published_at).toLocaleDateString() : new Date(p.created_at || "").toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="font-bold text-[#111111] group-hover:text-[#4B5563] transition-colors text-lg leading-snug line-clamp-2 pt-1">
                        {p.title}
                      </h3>

                      {p.excerpt && (
                        <p className="text-[#4B5563] text-[13px] leading-relaxed line-clamp-3 pt-1">
                          {p.excerpt}
                        </p>
                      )}
                    </div>

                    {/* Tags */}
                    {p.tags && p.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {p.tags.map((tag) => (
                          <span key={tag} className="px-2 py-0.5 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] text-[9px] font-medium text-[#4B5563] flex items-center gap-1">
                            <Tag className="h-2.5 w-2.5" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* CTA */}
                  <div className="px-6 pb-6 pt-2">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full border border-[#E5E7EB] text-[#111111] hover:text-white hover:bg-[#111111] hover:border-[#111111] font-semibold text-[13px] transition cursor-pointer"
                    >
                      <span>Read More</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </div>
                </motion.article>
              ))}
            </div>
          )}

        </div>
      </section>

      <Footer />
    </main>
  );
}
