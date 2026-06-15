import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { getErrorMessage } from "@/lib/utils";
import { getPosts, Post } from "@/lib/api";
import { AlertCircle, ArrowRight, BookOpen, Calendar, Clock, Loader2, Sparkles, Star, Tag, User } from "lucide-react";
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
    <main className="min-h-screen bg-[#12100d] font-poppins text-[#fff7ed]">
      <Header />

      <section className="relative isolate overflow-hidden px-6 py-24 md:py-32">
        <div className="absolute inset-0 -z-20 bg-cover bg-center opacity-28" style={{ backgroundImage: `url(${HERO_BG})` }} />
        <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(18,16,13,0.98),rgba(23,19,15,0.92),rgba(64,36,12,0.74))]" />
        <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_18%_6%,rgba(245,158,11,0.18),transparent_32%),radial-gradient(circle_at_82%_18%,rgba(249,115,22,0.12),transparent_30%),linear-gradient(rgba(245,231,210,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(245,231,210,0.05)_1px,transparent_1px)] bg-[size:auto,auto,64px_64px,64px_64px]" />
        <div className="mx-auto grid max-w-7xl items-center gap-12 lg:grid-cols-[1fr_420px]">
          <div>
            <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-[rgba(245,158,11,0.30)] bg-[rgba(245,158,11,0.10)] px-4 py-2 text-xs font-normal uppercase tracking-[0.2em] text-[#fbbf24] backdrop-blur"><Sparkles className="h-4 w-4" /> AI Analytics Library</div>
            <h1 className="max-w-5xl text-5xl font-normal tracking-[-0.05em] text-[#fff7ed] md:text-7xl">Clear AI analytics guides for better business decisions.</h1>
            <p className="mt-6 max-w-2xl text-lg font-normal leading-8 text-[#f5e7d2]">Practical articles on AI analytics, Power BI, SQL, RAG, forecasting, data governance, and automation for analysts and business teams.</p>
            {categories.length > 0 && <div className="mt-8 flex flex-wrap gap-2">{categories.map((category) => <span key={category} className="rounded-full border border-[rgba(245,231,210,0.16)] bg-[rgba(255,247,237,0.07)] px-4 py-2 text-sm font-normal text-[#f5e7d2] backdrop-blur">{category}</span>)}</div>}
          </div>
          <div className="relative hidden lg:block">
            <div className="absolute -inset-8 rounded-[40px] bg-[rgba(245,158,11,0.14)] blur-3xl" />
            <div className="relative rounded-[36px] border border-[rgba(245,231,210,0.16)] bg-[rgba(33,28,22,0.78)] p-6 shadow-2xl backdrop-blur-xl">
              <div className="mb-5 flex items-center justify-between"><div className="flex items-center gap-2 text-sm font-normal text-[#fbbf24]"><BookOpen className="h-4 w-4" /> Featured Topics</div><Star className="h-5 w-5 text-[#fbbf24]" /></div>
              <div className="space-y-3">{["Agentic BI", "RAG Systems", "AI Dashboards", "Predictive Analytics"].map((item, index) => <div key={item} className="rounded-2xl border border-[rgba(245,231,210,0.12)] bg-[rgba(23,19,15,0.72)] p-4"><div className="mb-2 flex items-center justify-between text-xs text-[#f5e7d2]"><span>{item}</span><span>{92 - index * 7}% relevance</span></div><div className="h-2 overflow-hidden rounded-full bg-[rgba(255,247,237,0.10)]"><div className="h-full rounded-full bg-gradient-to-r from-[#fbbf24] to-[#f97316]" style={{ width: `${92 - index * 7}%` }} /></div></div>)}</div>
            </div>
          </div>
        </div>
      </section>

      <section className="bg-[radial-gradient(circle_at_top,rgba(245,158,11,0.10),transparent_30%),#12100d] px-6 py-20">
        <div className="mx-auto max-w-7xl">
          {loading && <div className="flex flex-col items-center justify-center gap-3 py-24"><Loader2 className="h-8 w-8 animate-spin text-[#fbbf24]" /><span className="text-sm font-normal text-[#f5e7d2]">Loading AI analytics guides...</span></div>}
          {error && !loading && <div className="mx-auto flex max-w-2xl items-start gap-3 rounded-3xl border border-red-400/20 bg-red-500/10 p-5 text-red-200"><AlertCircle className="mt-0.5 h-5 w-5 shrink-0" /><div><h4 className="font-normal">Failed to load blog posts</h4><p className="mt-1 text-sm">{error}</p></div></div>}
          {!loading && !error && posts.length === 0 && <div className="mx-auto max-w-2xl rounded-[32px] border border-[rgba(245,231,210,0.14)] bg-[rgba(33,28,22,0.78)] p-16 text-center shadow-2xl backdrop-blur"><BookOpen className="mx-auto mb-4 h-10 w-10 text-[#fbbf24]" /><h3 className="text-xl font-normal text-[#fff7ed]">No posts published yet.</h3><p className="mt-2 text-sm leading-6 text-[#f5e7d2]">Articles and guides will appear here once they are published.</p></div>}

          {!loading && !error && featuredPost && <motion.div initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, ease: EASE }} className="mb-16 overflow-hidden rounded-[40px] border border-[rgba(245,231,210,0.14)] bg-[rgba(33,28,22,0.78)] shadow-[0_30px_120px_rgba(0,0,0,0.28)] backdrop-blur-xl">
            <div className="grid lg:grid-cols-[1.1fr_0.9fr]">
              <div className="relative min-h-[420px] overflow-hidden bg-[#17130f]">{featuredPost.cover_url ? <img src={featuredPost.cover_url} alt={featuredPost.title} className="h-full min-h-[420px] w-full object-cover opacity-82" /> : <div className="flex h-full min-h-[420px] items-center justify-center"><BookOpen className="h-12 w-12 text-[#d6c3a5]" /></div>}<div className="absolute inset-0 bg-gradient-to-t from-[#12100d]/82 via-transparent to-transparent" /><div className="absolute left-6 top-6 inline-flex items-center gap-2 rounded-full border border-[rgba(245,158,11,0.30)] bg-[rgba(245,158,11,0.12)] px-4 py-2 text-xs font-normal text-[#fbbf24] backdrop-blur"><Star className="h-4 w-4" /> Featured Guide</div></div>
              <div className="flex flex-col justify-center p-8 md:p-12">
                <div className="mb-4 flex flex-wrap items-center gap-3 text-sm text-[#f5e7d2]"><span className="rounded-full border border-[rgba(245,158,11,0.28)] bg-[rgba(245,158,11,0.10)] px-3 py-1 font-normal text-[#fbbf24]">{featuredPost.category || "AI Analytics"}</span><span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" />{formatDate(featuredPost.published_at || featuredPost.created_at)}</span>{featuredPost.reading_time && <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" />{featuredPost.reading_time}</span>}</div>
                <h2 className="text-3xl font-normal tracking-[-0.04em] text-[#fff7ed] md:text-5xl">{featuredPost.hero_title || featuredPost.title}</h2>
                <p className="mt-5 text-base leading-8 text-[#f5e7d2]">{featuredPost.hero_description || featuredPost.excerpt}</p>
                <div className="mt-6 flex items-center gap-2 text-sm font-normal text-[#f5e7d2]"><User className="h-4 w-4" />{featuredPost.author_name || "Zain Haidar"}</div>
                <Link to="/blog/$slug" params={{ slug: featuredPost.slug }} className="mt-8 inline-flex w-fit items-center gap-2 rounded-full bg-gradient-to-r from-[#fbbf24] to-[#f97316] px-6 py-3 text-sm font-normal text-[#1c1408] shadow-[0_0_35px_rgba(245,158,11,0.22)] transition hover:translate-y-[-1px]">Read featured guide <ArrowRight className="h-4 w-4" /></Link>
              </div>
            </div>
          </motion.div>}

          {!loading && !error && regularPosts.length > 0 && <div><div className="mb-8 flex items-end justify-between"><div><p className="text-sm font-normal uppercase tracking-[0.18em] text-[#fbbf24]">Latest Articles</p><h2 className="mt-2 text-3xl font-normal tracking-[-0.03em] text-[#fff7ed]">AI insights for analysts and business teams.</h2></div></div><div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">{regularPosts.map((post, index) => <BlogCard key={post.id} post={post} index={index} />)}</div></div>}
        </div>
      </section>

      <Footer />
    </main>
  );
}

function BlogCard({ post, index }: { post: Post; index: number }) {
  return <motion.article initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-50px" }} transition={{ duration: 0.45, delay: index * 0.05, ease: EASE }} className="group overflow-hidden rounded-[30px] border border-[rgba(245,231,210,0.14)] bg-[rgba(33,28,22,0.78)] shadow-[0_20px_80px_rgba(0,0,0,0.24)] backdrop-blur-xl transition hover:-translate-y-1 hover:border-[rgba(245,158,11,0.42)] hover:bg-[rgba(42,36,28,0.92)]">
    <div className="relative aspect-[16/10] overflow-hidden bg-[#17130f]">{post.cover_url ? <img src={post.cover_url} alt={post.title} className="h-full w-full object-cover opacity-82 transition duration-500 group-hover:scale-105" /> : <div className="flex h-full items-center justify-center"><BookOpen className="h-8 w-8 text-[#d6c3a5]" /></div>}<div className="absolute inset-0 bg-gradient-to-t from-[#12100d]/76 to-transparent" /></div>
    <div className="p-6">
      <div className="mb-4 flex flex-wrap items-center gap-2 text-xs text-[#f5e7d2]"><span className="rounded-full border border-[rgba(245,158,11,0.24)] bg-[rgba(245,158,11,0.10)] px-2.5 py-1 font-normal text-[#fbbf24]">{post.category || "Article"}</span><span className="inline-flex items-center gap-1"><Calendar className="h-3.5 w-3.5" />{formatDate(post.published_at || post.created_at)}</span>{post.reading_time && <span className="inline-flex items-center gap-1"><Clock className="h-3.5 w-3.5" />{post.reading_time}</span>}</div>
      <h3 className="line-clamp-2 text-xl font-normal leading-snug tracking-[-0.02em] text-[#fff7ed] transition group-hover:text-[#fed7aa]">{post.title}</h3>
      <p className="mt-3 line-clamp-3 text-sm leading-6 text-[#f5e7d2]">{post.excerpt}</p>
      {(post.tags || []).length > 0 && <div className="mt-5 flex flex-wrap gap-1.5">{post.tags.slice(0, 3).map((tag) => <span key={tag} className="inline-flex items-center gap-1 rounded-full border border-[rgba(245,231,210,0.12)] bg-[rgba(255,247,237,0.05)] px-2.5 py-1 text-xs text-[#d6c3a5]"><Tag className="h-3 w-3" />{tag}</span>)}</div>}
      <Link to="/blog/$slug" params={{ slug: post.slug }} className="mt-6 inline-flex items-center gap-2 text-sm font-normal text-[#fbbf24] hover:text-[#fed7aa]">Read Article <ArrowRight className="h-4 w-4" /></Link>
    </div>
  </motion.article>;
}

function formatDate(value?: string) {
  if (!value) return "Recently";
  return new Date(value).toLocaleDateString(undefined, { month: "short", day: "numeric", year: "numeric" });
}
