import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Inbox } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { getPosts, Post } from "@/lib/api";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function ResourceHub() {
  const [posts, setPosts] = useState<Post[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await getPosts();
        setPosts(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load posts");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section className="py-24 md:py-28 bg-[#020617]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-14"
        >
          <p className="text-[12px] font-semibold uppercase tracking-widest text-[#94A3B8] mb-3">
            Resource Hub
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#F8FAFC] leading-tight max-w-lg">
              Analytics guides and tips
            </h2>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2563EB] hover:text-[#3B82F6] transition-colors"
            >
              View all guides <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {loading && (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="bg-[#0F172A] rounded-2xl p-6 animate-pulse border border-[#334155]"
              >
                <div className="aspect-[16/9] bg-[#1E293B] rounded-xl mb-4" />
                <div className="h-5 bg-[#1E293B] rounded w-3/4 mb-3" />
                <div className="h-4 bg-[#1E293B] rounded w-full" />
              </div>
            ))}
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="py-16 text-center max-w-md mx-auto">
            <div className="h-12 w-12 rounded-full bg-[#0F172A] border border-[#334155] flex items-center justify-center mx-auto mb-4">
              <Inbox className="h-5 w-5 text-[#94A3B8]" />
            </div>
            <h4 className="font-bold text-[#F8FAFC] text-sm mb-1">No guides published yet.</h4>
            <p className="text-xs text-[#94A3B8]">
              Articles and data guides will appear here once published.
            </p>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.slice(0, 3).map((post, i) => (
              <motion.article
                key={post.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
                className="bg-[#0F172A] rounded-3xl border border-[#334155] overflow-hidden shadow-sm hover:shadow-md hover:border-[#2563EB]/40 transition-all duration-300 flex flex-col group"
              >
                {post.cover_url ? (
                  <div className="aspect-[16/9] overflow-hidden border-b border-[#334155]">
                    <img
                      src={post.cover_url}
                      alt=""
                      className="h-full w-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  </div>
                ) : (
                  <div className="aspect-[16/9] bg-[#020617] border-b border-[#334155] flex items-center justify-center">
                    <div className="w-[70%] rounded-2xl border border-[#334155] bg-[#0F172A] p-4">
                      <div className="h-2 w-16 rounded-full bg-[#1E293B] mb-3" />
                      <div className="space-y-2">
                        <div className="h-2 w-full rounded-full bg-[#1E293B]" />
                        <div className="h-2 w-4/5 rounded-full bg-[#1E293B]" />
                        <div className="h-2 w-3/5 rounded-full bg-[#1E293B]" />
                      </div>
                    </div>
                  </div>
                )}

                <div className="p-6 flex-1 flex flex-col">
                  <div className="flex items-center justify-between mb-3">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#94A3B8]">
                      {post.category ?? "Article"}
                    </span>
                    <span className="text-[10px] font-medium text-[#94A3B8] flex items-center gap-1">
                      <Calendar className="h-3 w-3" />
                      {post.published_at
                        ? new Date(post.published_at).toLocaleDateString()
                        : new Date(post.created_at || "").toLocaleDateString()}
                    </span>
                  </div>

                  <h3 className="font-bold text-[#F8FAFC] text-[16px] leading-snug mb-2 group-hover:text-[#2563EB] transition-colors line-clamp-2">
                    {post.title}
                  </h3>

                  {post.excerpt && (
                    <p className="text-[13px] text-[#94A3B8] leading-relaxed line-clamp-2 mb-4 flex-1">
                      {post.excerpt}
                    </p>
                  )}

                  <Link
                    to="/blog/$slug"
                    params={{ slug: post.slug }}
                    className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2563EB] hover:text-[#3B82F6] transition-colors mt-auto"
                  >
                    Read more <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </div>
              </motion.article>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
