import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { getErrorMessage } from "@/lib/utils";
import { getPosts, Post } from "@/lib/api";
import { AlertCircle, ArrowRight, BookOpen, Calendar, Clock, Loader2, Sparkles, Star, Tag, User } from "lucide-react";
import { motion } from "framer-motion";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export const Route = createFileRoute("/blog/")({
  head: () => ({
    meta: [
      { title: "AI Analytics Blog | Zain The Analyst" },
      { name: "description", content: "SEO-focused guides on AI analytics, Power BI, business intelligence, agentic AI, RAG, predictive analytics, SQL, and dashboard automation." },
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
    <main className="min-h-screen bg-[#F5F5F7] font-poppins text-[#1D1D1F]">
      <Header />

      <section className="relative overflow-hidden border-b border-[#E8E8ED] bg-[radial-gradient(circle_at_top_left,rgba(0,113,227,0.12),transparent_35%),#F5F5F7] px-6 py-24 md:py-32">
        <div className="mx-auto max-w-6xl text-center">
          <div className="mx-auto mb-6 inline-flex items-center gap-2 rounded-full border border-[#D2D2D7] bg-white/80 px-4 py-2 text-xs font-semibold uppercase tracking-[0.18em] text-[#0071E3] shadow-sm"><Sparkles className="h-4 w-4" /> AI Analytics Blog</div>
          <h1 className="mx-auto max-w-4xl text-5xl font-semibold tracking-[-0.04em] text-[#1D1D1F] md:text-7xl">Practical AI, analytics, and BI guides.</h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-8 text-[#6E6E73]">Simple, business-focused guides on AI analytics, Power BI, SQL, RAG, automation, forecasting, and modern business intelligence.</p>
          {categories.length > 0 && <div className="mt-8 flex flex-wrap justify-center gap-2">{categories.map((category) => <span key={category} className="rounded-full border border-[#E8E8ED] bg-white px-4 py-2 text-sm font-medium text-[#6E6E73]">{category}</span>)}</div>}
        </div>
      </section>

      <section className="px-6 py-20">
        <div className="mx-auto max-w-7xl">
          {loading && <div className="flex flex-col items-center justify-center gap-3 py-24"><Loader2 className="h-8 w-8 animate-spin text-[#0071E3]" /><span className="text-sm font-medium text-[#6E6E73]">Loading AI analytics guides...</span></div>}

          {error && !loading && <div className="mx-auto flex max-w-2xl items-start gap-3 rounded-3xl border border-red-100 bg-red-50 p-5 text-red-700"><AlertCircle className="mt-0.5 h-5 w-5 shrink-0" /><div><h4 className="font-semibold">Failed to load blog posts</h4><p className="mt-1 text-sm">{error}</p></div></div>}

          {!loading && !error && posts.length === 0 && <div className="mx-auto max-w-2xl rounded-[32px] border border-[#E8E8ED] bg-white p-16 text-center shadow-sm"><BookOpen className="mx-auto mb-4 h-10 w-10 text-[#0071E3]" /><h3 className="text-xl font-semibold">No posts published yet.</h3><p className="mt-2 text-sm leading-6 text-[#6E6E73]">Articles and guides will appear here once they are published.</p></div>}

          {!loading && !error && featuredPost && <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="mb-16 overflow-hidden rounded-[36px] border border-[#E8E8ED] bg-white shadow-sm">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[360px] overflow-hidden bg-[#E8E8ED]">{featuredPost.cover_url ? <img src={featuredPost.cover_url} alt={featuredPost.title} className="h-full min-h-[360px] w-full object-cover" /> : <div className="flex h-full min-h-[360px] items-center justify-center"><BookOpen className="h-12 w-12 text-[#86868B]" /></div>}<div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full bg-white/90 px-4 py-2 text-xs font-semibold text-[#0071E3] backdrop-blur"><Star className="h-4 w-4" /> Featured Guide</div></div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-[#6E6E73]"><span className="rounded-full bg-[#F5F5F7] px-3 py-1 font-semibold text-[#0071E3]">{featuredPost.category || "AI Analytics"}</span><span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" />{formatDate(featuredPost.published_at || featuredPost.created_at)}</span>{featuredPost.reading_time && <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" />{featuredPost.reading_time}</span>}</div>
                <h2 className="text-3xl font-semibold tracking-[-0.03em] md:text-5xl">{featuredPost.hero_title || featuredPost.title}</h2>
                <p className="mt-5 text-base leading-8 text-[#6E6E73]">{featuredPost.hero_description || featuredPost.excerpt}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-medium text-[#6E6E73]"><User className="h-4 w-4" />{featuredPost.author_name || "Zain Haidar"}</div>
                <Link to="/blog/$slug" params={{ slug: featuredPost.slug }} className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-[#0071E3] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#005BB5]">Read featured guide <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </motion.div>}

          {!loading && !error && regularPosts.length > 0 && <div><div className="mb-8 flex items-end justify-between"><div><p className="text-sm font-semibold uppercase tracking-[0.18em] text-[#6E6E73]">Latest Articles</p><h2 className="mt-2 text-3xl font-semibold tracking-[-0.03em]">AI insights for analysts and business teams.</h2></div></div><div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">{regularPosts.map((post, index) => <BlogCard key={post.id} post={post} index={index} />)}</div></div>}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function BlogCard({ post, index }: { post: Post; index: number }) {
  return <motion.article initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.45, delay: index * 0.05, ease: EASE }} className="group overflow-hidden rounded-[28px] border border-[#E8E8ED] bg-white shadow-sm transition hover:-translate-y-1 hover:border-[#0071E3]/30 hover:shadow-md">
    <div className="aspect-[16/10] overflow-hidden bg-[#F5F5F7]">{post.cover_url ? <img src={post.cover_url} alt={post.title} className="h-full w-full object-cover transition duration-500 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center"><BookOpen className="h-8 w-8 text-[#86868B]" /></div>}</div>
    <div className="p-6">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-[#6E6E73]"><span className="rounded-full bg-[#F5F5F7] px-2.5 py-1 font-semibold text-[#0071E3]">{post.category || "Article"}</span><span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{formatDate(post.published_at || post.created_at)}</span>{post.reading_time && <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.reading_time}</span>}</div>
      <h3 className="line-clamp-2 text-xl font-semibold leading-snug tracking-[-0.02em] transition group-hover:text-[#0071E3]">{post.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#6E6E73]">{post.excerpt}</p>
      {(post.tags || []).length > 0 && <div className="mt-5 flex flex-wrap gap-1.5">{post.tags.slice(0, 3).map((tag) => <span key={tag} className="inline-flex items-center gap-1 rounded-full border border-[#E8E8ED] px-2.5 py-1 text-xs text-[#6E6E73]"><Tag className="h-3 w-3" />{tag}</span>)}</div>}
      <Link to="/blog/$slug" params={{ slug: post.slug }} className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-[#0071E3] hover:text-[#005BB5]">Read Article <ArrowRight className="h-4 w-4" /></Link>
    </div>
  </motion.article>;
}

function formatDate(value?: string) {
  if (!value) return "Recently";
  return new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
