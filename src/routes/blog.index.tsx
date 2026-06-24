import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo } from "react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { PageHero } from "@/components/portfolio/PageHero";
import { Calendar, Tag, ArrowRight, BookOpen } from "lucide-react";
import { motion } from "framer-motion";
import { getBlogIndexData } from "@/lib/public-data.functions";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export const Route = createFileRoute("/blog/")({
  loader: () => getBlogIndexData(),
  head: () => ({
    meta: [
      { title: "AI Analytics Blog | Zain The Analyst" },
      { name: "description", content: "Guides on AI analytics, business intelligence, Power BI, RAG, SQL, predictive analytics, and dashboard automation." },
    ],
  }),
  component: BlogListPage,
});

function BlogListPage() {
  const { posts } = Route.useLoaderData();

  const featuredPost = useMemo(() => posts.find((post) => post.featured) || posts[0], [posts]);
  const regularPosts = useMemo(() => posts.filter((post) => post.id !== featuredPost?.id), [posts, featuredPost]);
  const categories = useMemo(() => Array.from(new Set(posts.map((post) => post.category).filter(Boolean))).slice(0, 8), [posts]);

  return (
    <main className="bg-[var(--site-bg)] min-h-screen flex flex-col">
      <Header />

      <PageHero
        eyebrow="Resource Hub"
        title="Analytics guides & practical tips."
        description="Actionable guides on Power BI, SQL optimization, clean ETL pipelines, and dashboard storytelling for business leaders."
      />

      <section className="py-24 flex-grow bg-[var(--site-bg)]">
        <div className="section-container">
          {/* Empty */}
          {posts.length === 0 && (
            <div className="border border-[var(--border)] rounded-2xl p-16 text-center bg-[var(--site-bg-soft)] max-w-2xl mx-auto shadow-sm">
              <div className="h-14 w-14 rounded-2xl bg-[var(--purple-soft)] border border-[rgba(112,72,232,0.15)] flex items-center justify-center mx-auto mb-4">
                <BookOpen className="h-6 w-6 text-[var(--purple)]" />
              </div>
              <h3 className="font-semibold text-[var(--text-main)] text-lg mb-2">No posts published yet.</h3>
              <p className="text-[var(--text-soft)] text-sm max-w-md mx-auto leading-relaxed">
                Articles and guides will appear here once they are drafted and published.
              </p>
            </div>
          )}

          {/* Posts grid */}
          {posts.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {posts.map((p, i) => (
                <motion.article
                  key={p.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
                  className="site-card overflow-hidden flex flex-col group"
                >
                  {/* Thumbnail */}
                  {p.cover_url ? (
                    <div className="aspect-[16/9] overflow-hidden border-b border-[var(--border)]">
                      <img
                        src={p.cover_url}
                        alt=""
                        className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                      />
                    </div>
                  ) : (
                    <div className="aspect-[16/9] bg-[var(--site-bg-muted)] border-b border-[var(--border)] flex items-center justify-center">
                      <div className="w-[70%] rounded-2xl border border-[var(--border)] bg-[var(--site-bg-soft)] p-4 shadow-sm">
                        <div className="h-2 w-16 rounded-full bg-[var(--purple-soft)] mb-3" />
                        <div className="space-y-2">
                          <div className="h-2 w-full rounded-full bg-[var(--purple-soft)]" />
                          <div className="h-2 w-4/5 rounded-full bg-[var(--purple-soft)]" />
                          <div className="h-2 w-3/5 rounded-full bg-[var(--purple-soft)]" />
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Content */}
                  <div className="p-6 flex-1 flex flex-col justify-between space-y-4">
                    <div className="space-y-2">
                      <div className="flex items-center justify-between">
                        <span className="site-card-label">
                          {p.category ?? "Article"}
                        </span>
                        <span className="text-[10px] font-normal text-[var(--text-muted)] flex items-center gap-1">
                          <Calendar className="h-3 w-3 text-[var(--text-muted)]" />
                          {p.published_at
                            ? new Date(p.published_at).toLocaleDateString()
                            : new Date(p.created_at || "").toLocaleDateString()}
                        </span>
                      </div>

                      <h3 className="site-card-title text-lg leading-snug line-clamp-2 pt-1">
                        {p.title}
                      </h3>

                      {p.excerpt && (
                        <p className="site-card-text text-[13px] leading-relaxed line-clamp-3 pt-1">
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
                            className="px-2.5 py-1 rounded-full bg-[var(--purple-soft)] border border-[rgba(112,72,232,0.12)] text-[10px] font-normal text-[var(--text-soft)] flex items-center gap-1"
                          >
                            <Tag className="h-2.5 w-2.5 text-[var(--text-muted)]" />
                            <span>{tag}</span>
                          </span>
                        ))}
                      </div>
                    )}

                    {/* CTA */}
                    <div className="pt-2 border-t border-[var(--border)]">
                      <Link
                        to="/blog/$slug"
                        params={{ slug: p.slug }}
                        className="site-card-link inline-flex items-center gap-1.5 text-[13px]"
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
