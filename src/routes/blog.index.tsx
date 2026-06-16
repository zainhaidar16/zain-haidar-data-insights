import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { getErrorMessage } from "@/lib/utils";
import { getPosts, Post } from "@/lib/api";
import { PageHero } from "@/components/portfolio/PageHero";
import { Loader2, AlertCircle, Calendar, Tag, ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "AI Analytics Blog | Zain The Analyst" },
      { name: "description", content: "Guides on AI analytics, business intelligence, Power BI, RAG, SQL, predictive analytics, and dashboard automation." },
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
        setPosts(await getPosts());
        setError(null);
      } catch (err: unknown) {
        setError(getErrorMessage(err, "Failed to load posts."));
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  const featuredPost = useMemo(() => posts.find((post) => post.featured) || posts[0], [posts]);
  const regularPosts = useMemo(() => posts.filter((post) => post.id !== featuredPost?.id), [posts, featuredPost]);
  const categories = useMemo(() => Array.from(new Set(posts.map((post) => post.category).filter(Boolean))).slice(0, 8), [posts]);

  return (
    <main className="bg-[#050505] min-h-screen flex flex-col">
      <Header />

      <PageHero
        eyebrow="Resource Hub"
        title="Analytics guides & practical tips."
        description="Actionable guides on Power BI, SQL optimization, clean ETL pipelines, and dashboard storytelling for business leaders."
      />

      <section className="py-24 flex-grow bg-[#050505]">
        <div className="section-container">
          {/* Loading */}
          {loading && (
            <div className="flex flex-col justify-center items-center py-24 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-[#8B5CF6]" />
              <span className="text-xs text-[#8B8B98] font-normal">
                Loading guides catalogue...
              </span>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="p-5 bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.2)] rounded-2xl flex items-start gap-3.5 max-w-2xl mx-auto shadow-none">
              <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-normal text-red-200 text-sm">Failed to Load Blog Posts</h4>
                <p className="text-xs text-red-400/80 mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && posts.length === 0 && (
            <div className="border border-[rgba(145,92,255,0.15)] rounded-2xl p-16 text-center bg-[#111111] max-w-2xl mx-auto">
              <div className="h-14 w-14 rounded-2xl bg-[#1B102B] border border-[rgba(139,92,246,0.20)] flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-[#8B5CF6]" />
              </div>
              <h3 className="font-normal text-white text-lg mb-2">No posts published yet.</h3>
              <p className="text-[#8B8B98] text-sm max-w-md mx-auto leading-relaxed">
                Articles and guides will appear here once they are drafted and published.
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
                  className="bg-[#111111] border border-[rgba(145,92,255,0.12)] rounded-2xl overflow-hidden flex flex-col group hover:border-[rgba(145,92,255,0.35)] hover:bg-[#0F0A1A] transition-all duration-300"
                >
                  {/* Thumbnail */}
                  {p.cover_url ? (
                    <div className="aspect-[16/9] overflow-hidden border-b border-[rgba(255,255,255,0.08)]">
                      <img
                        src={p.cover_url}
                        alt=""
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] bg-[#050505] border-b border-[rgba(255,255,255,0.08)] flex items-center justify-center">
                      <div className="w-[70%] rounded-2xl border border-[rgba(145,92,255,0.12)] bg-[#111111] p-4">
                        <div className="h-2 w-16 rounded-full bg-[#1B102B] mb-3" />
                        <div className="space-y-2">
                          <div className="h-2 w-full rounded-full bg-[#1B102B]" />
                          <div className="h-2 w-4/5 rounded-full bg-[#1B102B]" />
                          <div className="h-2 w-3/5 rounded-full bg-[#1B102B]" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-normal text-[#8B5CF6] tracking-wider">
                          {p.category ?? "Article"}
                        </span>
                        <span className="text-[10px] font-normal text-[#8B8B98] flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-[#8B8B98]" />
                          {p.published_at
                            ? new Date(p.published_at).toLocaleDateString()
                            : new Date(p.created_at || "").toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="font-normal text-white group-hover:text-white transition-colors text-lg leading-snug line-clamp-2 pt-1">
                        {p.title}
                      </h3>

                      {p.excerpt && (
                        <p className="text-[#8B8B98] text-[13px] leading-relaxed line-clamp-3 pt-1">
                          {p.excerpt}
                        </p>
                      )}
                    </div>

                    {/* Tags */}
                    {p.tags && p.tags.length > 0 && (
                      <div className="flex flex-wrap gap-1 pt-1">
                        {p.tags.map((tag) => (
                          <span
                            key={tag}
                            className="px-2.5 py-1 rounded-full bg-[rgba(139,92,246,0.06)] border border-[rgba(139,92,246,0.12)] text-[10px] font-normal text-[#D8D8E0] flex items-center gap-1"
                          >
                            <Tag className="h-2.5 w-2.5 text-[#8B8B98]" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* CTA */}
                    <div className="pt-2 border-t border-[rgba(255,255,255,0.08)]">
                      <Link
                        to="/blog/$slug"
                        params={{ slug: p.slug }}
                        className="inline-flex items-center gap-1.5 text-[13px] font-normal text-[#8B5CF6] hover:text-[#A779FF] transition-colors duration-200 cursor-pointer"
                      >
                        <span>Read Article</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
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
