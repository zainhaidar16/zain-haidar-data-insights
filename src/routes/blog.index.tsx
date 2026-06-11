import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { PageHero } from "@/components/portfolio/PageHero";
import { getErrorMessage } from "@/lib/utils";
import { getPosts, Post } from "@/lib/api";
import { Loader2, AlertCircle, Inbox, Calendar, Tag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "Blog — Zain The Analyst | Simple Data Guides" },
      {
        name: "description",
        content:
          "Data analyst guides, Power BI walkthroughs, SQL optimization, and Python analysis guides.",
      },
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
      } catch (err: unknown) {
        setError(getErrorMessage(err, "Failed to load posts."));
      } finally {
        setLoading(false);
      }
    }
    loadPosts();
  }, []);

  return (
    <main className="bg-[#0F172A] min-h-screen flex flex-col">
      <Header />

      <PageHero
        eyebrow="Resource Hub"
        title="Analytics guides & practical tips."
        description="Actionable guides on Power BI, SQL optimization, clean ETL pipelines, and dashboard storytelling for business leaders."
      />

      <section className="py-24 flex-grow animate-fade-in">
        <div className="section-container">
          {/* Loading */}
          {loading && (
            <div className="flex flex-col justify-center items-center py-24 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-[#F8FAFC]" />
              <span className="text-xs text-[#94A3B8] font-medium">
                Loading guides catalogue...
              </span>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="p-5 bg-red-50 border border-red-100 rounded-2xl flex items-start gap-3.5 max-w-2xl mx-auto">
              <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-red-800 text-sm">Failed to Load Blog Posts</h4>
                <p className="text-xs text-red-600 mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && posts.length === 0 && (
            <div className="border border-[#334155] rounded-3xl p-16 text-center bg-[#0F172A] max-w-2xl mx-auto">
              <div className="h-14 w-14 rounded-2xl bg-[#020617] border border-[#334155] flex items-center justify-center mx-auto mb-4">
                <Inbox className="h-6 w-6 text-[#94A3B8]" />
              </div>
              <h3 className="font-bold text-[#F8FAFC] text-lg mb-2">No posts published yet.</h3>
              <p className="text-[#94A3B8] text-sm max-w-md mx-auto leading-relaxed">
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
                  className="card-payoneer overflow-hidden flex flex-col group"
                >
                  {/* Thumbnail */}
                  {p.cover_url ? (
                    <div className="aspect-[16/9] overflow-hidden border-b border-[#334155]">
                      <img
                        src={p.cover_url}
                        alt=""
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] bg-[#020617] border-b border-[#334155] flex items-center justify-center">
                      <div className="w-[70%] rounded-2xl border border-[#334155] bg-[#0F172A] p-4 shadow-sm">
                        <div className="h-2 w-16 rounded-full bg-[#1E293B] mb-3" />
                        <div className="space-y-2">
                          <div className="h-2 w-full rounded-full bg-[#1E293B]" />
                          <div className="h-2 w-4/5 rounded-full bg-[#1E293B]" />
                          <div className="h-2 w-3/5 rounded-full bg-[#1E293B]" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-3">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="text-[10px] uppercase font-bold text-[#2563EB] tracking-wider">
                          {p.category ?? "Article"}
                        </span>
                        <span className="text-[10px] font-medium text-[#94A3B8] flex items-center gap-1">
                          <Calendar className="h-3 w-3" />
                          {p.published_at
                            ? new Date(p.published_at).toLocaleDateString()
                            : new Date(p.created_at || "").toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="font-bold text-[#F8FAFC] group-hover:text-[#2563EB] transition-colors text-lg leading-snug line-clamp-2 pt-1">
                        {p.title}
                      </h3>

                      {p.excerpt && (
                        <p className="text-[#94A3B8] text-[13px] leading-relaxed line-clamp-3 pt-1">
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
                            className="px-2.5 py-1 rounded-full bg-[#1E293B] border border-[#334155] text-[10px] font-medium text-[#94A3B8] flex items-center gap-1"
                          >
                            <Tag className="h-2.5 w-2.5" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    )}
                  </div>

                  {/* CTA — single Read More button per card */}
                  <div className="px-6 pb-6 pt-2">
                    <Link
                      to="/blog/$slug"
                      params={{ slug: p.slug }}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-full bg-[#2563EB] text-white hover:bg-[#1D4ED8] font-semibold text-[13px] transition-colors duration-200 cursor-pointer"
                    >
                      <span>Read Article</span>
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
