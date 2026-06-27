import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import type { Post } from "@/lib/api";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function HomeBlog({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return null;
  }

  return (
    <section className="py-12 md:py-20 bg-[var(--site-bg)] border-t border-[var(--line-soft)]">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="max-w-3xl mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-bold text-[var(--text-main)] mb-4">
            Latest Guides & Insights
          </h2>
          <p className="text-[15px] text-[var(--text-soft)] max-w-xl leading-relaxed font-normal">
            Practical tips and guidelines for business analytics, SQL database design, and Power BI dashboards.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {posts.map((post, i) => (
            <motion.div
              key={post.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
              className="site-card p-6 flex flex-col justify-between group"
            >
              <div>
                {post.cover_url && (
                  <div className="aspect-[16/9] overflow-hidden rounded-xl border border-[var(--card-border)] mb-4 bg-[#FAF9FF]">
                    <img
                      src={post.cover_url}
                      alt=""
                      className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between mb-3">
                  <span className="blog-category-label">
                    {post.category ?? "Guide"}
                  </span>
                  {(post.published_at || post.created_at) && (
                    <span className="text-[10px] font-normal text-[var(--text-muted)] flex items-center gap-1">
                      <Calendar className="h-3 w-3 text-[var(--text-muted)]" />
                      {post.published_at
                         ? new Date(post.published_at).toLocaleDateString()
                         : new Date(post.created_at || "").toLocaleDateString()}
                    </span>
                  )}
                </div>
                <h3 className="site-card-title text-[17px] mb-2 leading-snug line-clamp-2">
                  {post.title}
                </h3>
                {post.excerpt && (
                  <p className="site-card-text text-[13px] leading-relaxed mb-4 line-clamp-3">
                    {post.excerpt}
                  </p>
                )}
              </div>
              <Link
                to="/blog/$slug"
                params={{ slug: post.slug }}
                className="site-card-link inline-flex items-center gap-1.5 text-[13px] mt-auto"
              >
                Read Article
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All button */}
        <div className="text-left">
          <Button asChild variant="secondary">
            <Link to="/blog" className="inline-flex items-center gap-2">
              View All Articles
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
