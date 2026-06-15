import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Calendar, Tag, BookOpen } from "lucide-react";
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
    <section className="py-24 md:py-28 bg-[#151619] border-t border-[rgba(245,245,243,0.10)]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-14"
        >
          <p className="text-[12px] font-normal uppercase tracking-widest text-[#AAA9A3] mb-3">
            Resource Hub
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#F5F5F3] leading-tight max-w-lg">
              Analytics guides and tips
            </h2>
            <Link
              to="/blog"
              className="inline-flex items-center gap-1.5 text-[13px] font-normal text-[#D8D8D2] hover:text-[#F5F5F3] transition-colors"
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
                className="bg-[#1D1E22] rounded-[24px] p-6 animate-pulse border border-[rgba(245,245,243,0.10)]"
              >
                <div className="aspect-[16/9] bg-[#151619] rounded-xl mb-4" />
                <div className="h-5 bg-[#151619] rounded w-3/4 mb-3" />
                <div className="h-4 bg-[#151619] rounded w-full" />
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="p-6 bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.2)] rounded-[24px] flex items-start gap-3.5 max-w-2xl mx-auto">
            <BookOpen className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-normal text-red-200 text-sm">Failed to Load Guides</h4>
              <p className="text-xs text-red-400/80 mt-1 leading-normal">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && posts.length === 0 && (
          <div className="py-16 text-center max-w-md mx-auto">
            <div className="h-12 w-12 rounded-full bg-[#1D1E22] border border-[rgba(245,245,243,0.10)] flex items-center justify-center mx-auto mb-4">
              <BookOpen className="h-5 w-5 text-[#D8D8D2]" />
            </div>
            <h4 className="font-normal text-[#F5F5F3] text-sm mb-1">No guides published yet</h4>
            <p className="text-xs text-[#AAA9A3]">
              Articles and data guides will appear here once published.
            </p>
          </div>
        )}

        {!loading && !error && posts.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            {posts.slice(0, 3).map((post, i) => {
              const tags = Array.isArray(post.tags) ? post.tags : [];
              return (
                <motion.article
                  key={post.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
                  className="bg-[#1D1E22] rounded-[24px] border border-[rgba(245,245,243,0.10)] overflow-hidden shadow-none hover:border-[rgba(245,245,243,0.24)] hover:bg-[#232428] hover:shadow-lg transition-all duration-300 flex flex-col group"
                >
                  {post.cover_url ? (
                    <div className="aspect-[16/9] overflow-hidden border-b border-[rgba(245,245,243,0.10)]">
                      <img
                        src={post.cover_url}
                        alt={post.title}
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

                  <div className="p-6 flex-1 flex flex-col">
                    <div className="flex items-center justify-between mb-3">
                      <span className="text-[10px] font-normal uppercase tracking-widest text-[#D8D8D2] flex items-center gap-1">
                        <Tag className="h-3 w-3" />
                        {post.category ?? "Article"}
                      </span>
                      <span className="text-[10px] font-normal text-[#AAA9A3] flex items-center gap-1">
                        <Calendar className="h-3 w-3" />
                        {post.published_at
                          ? new Date(post.published_at).toLocaleDateString()
                          : new Date(post.created_at || "").toLocaleDateString()}
                      </span>
                    </div>

                    <h3 className="font-normal text-[#F5F5F3] text-[16px] leading-snug mb-2 group-hover:text-white transition-colors line-clamp-2">
                      {post.title}
                    </h3>

                    {post.excerpt && (
                      <p className="text-[13px] text-[#D8D8D2]/80 leading-relaxed line-clamp-2 mb-4">
                        {post.excerpt}
                      </p>
                    )}

                    {/* Blog post tags list per rule 8 */}
                    {tags.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {tags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full bg-[#151619] border border-[rgba(245,245,243,0.08)] text-[9px] font-normal text-[#AAA9A3]"
                          >
                            #{tag}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto pt-2">
                      <Link
                        to="/blog/$slug"
                        params={{ slug: post.slug }}
                        className="inline-flex items-center gap-1.5 text-[13px] font-normal text-[#D8D8D2] hover:text-[#F5F5F3] transition-colors cursor-pointer"
                      >
                        <span>Read more</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
                  </div>
                </motion.article>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
