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
const HERO_BG = "https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=2200&q=85";

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
    <main className="bg-background min-h-screen flex flex-col font-poppins text-[#D8D8D2]">
      <Header />

      <PageHero
        eyebrow="Resource Hub"
        title="Analytics guides & practical tips."
        description="Actionable guides on Power BI, SQL optimization, clean ETL pipelines, and dashboard storytelling for business leaders."
      />

      <section className="py-24 flex-grow bg-[#0F1012]">
        <div className="section-container">
          {/* Loading */}
          {loading && (
            <div className="flex flex-col justify-center items-center py-24 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-[#D8D8D2]" />
              <span className="text-xs text-[#AAA9A3] font-normal">
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
            <div className="border border-[rgba(245,245,243,0.10)] rounded-3xl p-16 text-center bg-[#151619] max-w-2xl mx-auto">
              <div className="h-14 w-14 rounded-2xl bg-[rgba(245,245,243,0.05)] border border-[rgba(245,245,243,0.10)] flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-[#D8D8D2]" />
              </div>
              <h3 className="font-normal text-[#F5F5F3] text-lg mb-2">No posts published yet.</h3>
              <p className="text-[#AAA9A3] text-sm max-w-md mx-auto leading-relaxed">
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
                  className="bg-[#151619] border border-[rgba(245,245,243,0.10)] rounded-[24px] overflow-hidden flex flex-col group hover:border-[rgba(245,245,243,0.24)] hover:bg-[#1D1E22] transition-all duration-300 shadow-none"
                >
                  {/* Thumbnail */}
                  {p.cover_url ? (
                    <div className="aspect-[16/9] overflow-hidden border-b border-[rgba(245,245,243,0.10)]">
                      <img
                        src={p.cover_url}
                        alt=""
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] bg-[#0F1012] border-b border-[rgba(245,245,243,0.10)] flex items-center justify-center">
                      <div className="w-[70%] rounded-2xl border border-[rgba(245,245,243,0.10)] bg-[#151619] p-4">
                        <div className="h-2 w-16 rounded-full bg-[#232428] mb-3" />
                        <div className="space-y-2">
                          <div className="h-2 w-full rounded-full bg-[#232428]" />
                          <div className="h-2 w-4/5 rounded-full bg-[#232428]" />
                          <div className="h-2 w-3/5 rounded-full bg-[#232428]" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-normal text-[#D8D8D2] tracking-wider">
                          {p.category ?? "Article"}
                        </span>
                        <span className="text-[10px] font-normal text-[#AAA9A3] flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-[#AAA9A3]" />
                          {p.published_at
                            ? new Date(p.published_at).toLocaleDateString()
                            : new Date(p.created_at || "").toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="font-normal text-[#F5F5F3] group-hover:text-white transition-colors text-lg leading-snug line-clamp-2 pt-1">
                        {p.title}
                      </h3>

                      {p.excerpt && (
                        <p className="text-[#D8D8D2]/80 text-[13px] leading-relaxed line-clamp-3 pt-1">
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
                            className="px-2.5 py-1 rounded-full bg-[#1D1E22] border border-[rgba(245,245,243,0.08)] text-[10px] font-normal text-[#D8D8D2] flex items-center gap-1"
                          >
                            <Tag className="h-2.5 w-2.5 text-[#AAA9A3]" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* CTA — understated link */}
                    <div className="pt-2 border-t border-[rgba(245,245,243,0.10)]">
                      <Link
                        to="/blog/$slug"
                        params={{ slug: p.slug }}
                        className="inline-flex items-center gap-1.5 text-[13px] font-normal text-[#D8D8D2] hover:text-[#F5F5F3] transition-colors duration-200 cursor-pointer"
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

