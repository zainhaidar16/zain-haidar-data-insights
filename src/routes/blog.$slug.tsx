import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getPostBySlug, Post } from "@/lib/api";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { ArrowLeft, ArrowRight, AlertCircle, BookOpen, Calendar, CheckCircle2, Clock, Loader2, Tag, User } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { getErrorMessage } from "@/lib/utils";

export const Route = createFileRoute("/blog/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} | Zain The Analyst` },
      { name: "description", content: "AI analytics, business intelligence, and data analysis article by Zain Haidar." },
    ],
  }),
  component: BlogDetailPage,
});

function BlogDetailPage() {
  const { slug } = Route.useParams();
  const [post, setPost] = useState<Post | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadPost() {
      try {
        setLoading(true);
        setPost(await getPostBySlug(slug));
        setError(null);
      } catch (err: unknown) {
        setError(getErrorMessage(err, "Failed to load post."));
      } finally {
        setLoading(false);
      }
    }
    loadPost();
  }, [slug]);

  if (loading) return <Shell><div className="flex flex-col items-center justify-center gap-3 py-32"><Loader2 className="h-8 w-8 animate-spin text-cyan-300" /><span className="text-sm font-semibold text-slate-300">Loading intelligence report...</span></div></Shell>;
  if (error || !post) return <Shell><div className="flex items-center justify-center px-6 py-32"><div className="max-w-md rounded-[32px] border border-white/10 bg-white/10 p-8 text-center shadow-2xl backdrop-blur"><AlertCircle className="mx-auto mb-4 h-10 w-10 text-red-300" /><h2 className="text-xl font-semibold text-white">{error ? "Failed to load article" : "Article not found"}</h2><p className="mt-2 text-sm leading-6 text-slate-300">{error || "The blog article requested does not exist."}</p><Link to="/blog" className="mt-6 inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"><ArrowLeft className="h-4 w-4" />Back to Blog</Link></div></div></Shell>;

  const tags = post.tags || [];
  const takeaways = post.key_takeaways || [];
  const sections = post.sections || [];
  const relatedServices = post.related_services || [];
  const gallery = post.gallery || [];

  return (
    <Shell>
      <article>
        <section className="relative isolate overflow-hidden px-6 py-20 md:py-28">
          {post.cover_url && <div className="absolute inset-0 -z-20 bg-cover bg-center opacity-40" style={{ backgroundImage: `url(${post.cover_url})` }} />}
          <div className="absolute inset-0 -z-10 bg-[linear-gradient(120deg,rgba(3,7,18,0.98),rgba(2,12,27,0.9),rgba(8,47,73,0.76))]" />
          <div className="absolute inset-0 -z-10 bg-[radial-gradient(circle_at_20%_10%,rgba(34,211,238,0.25),transparent_30%),radial-gradient(circle_at_80%_20%,rgba(59,130,246,0.25),transparent_28%),linear-gradient(rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:auto,auto,56px_56px,56px_56px]" />
          <div className="mx-auto max-w-5xl">
            <Link to="/blog" className="mb-8 inline-flex items-center gap-2 text-sm font-semibold text-slate-300 hover:text-cyan-200"><ArrowLeft className="h-4 w-4" />Back to Blog</Link>
            <div className="flex flex-wrap items-center gap-3 text-sm text-slate-300"><span className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 font-semibold text-cyan-200">{post.category || "AI Analytics"}</span><span className="inline-flex items-center gap-1"><Calendar className="h-4 w-4" />{formatDate(post.published_at || post.created_at)}</span>{post.reading_time && <span className="inline-flex items-center gap-1"><Clock className="h-4 w-4" />{post.reading_time}</span>}<span className="inline-flex items-center gap-1"><User className="h-4 w-4" />{post.author_name || "Zain Haidar"}</span></div>
            <h1 className="mt-6 max-w-4xl text-4xl font-semibold tracking-[-0.05em] text-white md:text-6xl">{post.hero_title || post.title}</h1>
            <p className="mt-6 max-w-3xl text-lg leading-8 text-slate-300">{post.hero_description || post.excerpt}</p>
            {tags.length > 0 && <div className="mt-8 flex flex-wrap gap-2">{tags.map((tag) => <span key={tag} className="inline-flex items-center gap-1 rounded-full border border-white/10 bg-white/10 px-3 py-1.5 text-xs font-medium text-slate-200 backdrop-blur"><Tag className="h-3 w-3 text-cyan-300" />{tag}</span>)}</div>}
          </div>
        </section>

        {post.cover_url && <section className="px-6 pt-10"><div className="mx-auto max-w-6xl overflow-hidden rounded-[40px] border border-white/10 bg-white/10 shadow-[0_30px_120px_rgba(14,165,233,0.18)] backdrop-blur"><img src={post.cover_url} alt={post.title} className="h-[320px] w-full object-cover md:h-[520px]" /></div></section>}

        <section className="bg-[radial-gradient(circle_at_top,rgba(14,165,233,0.16),transparent_30%),#030712] px-6 py-16">
          <div className="mx-auto grid max-w-6xl gap-8 lg:grid-cols-[280px_1fr]">
            <aside className="hidden lg:block"><div className="sticky top-28 space-y-4 rounded-[28px] border border-white/10 bg-white/[0.07] p-5 shadow-2xl backdrop-blur"><h3 className="text-sm font-semibold text-white">Article Guide</h3><div className="space-y-2 text-sm text-slate-300"><a href="#article" className="block hover:text-cyan-200">Main article</a>{takeaways.length > 0 && <a href="#takeaways" className="block hover:text-cyan-200">Key takeaways</a>}{sections.length > 0 && <a href="#sections" className="block hover:text-cyan-200">Extra sections</a>}{relatedServices.length > 0 && <a href="#services" className="block hover:text-cyan-200">Related services</a>}</div></div></aside>
            <div className="space-y-8">
              {takeaways.length > 0 && <div id="takeaways" className="rounded-[32px] border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur md:p-8"><h2 className="mb-5 text-2xl font-semibold tracking-[-0.02em] text-white">Key takeaways</h2><div className="grid gap-3">{takeaways.map((item) => <div key={item} className="flex gap-3 rounded-2xl border border-cyan-300/10 bg-cyan-300/10 p-4 text-sm leading-6 text-slate-100"><CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-cyan-300" />{item}</div>)}</div></div>}
              <div id="article" className="rounded-[32px] border border-white/10 bg-white/[0.92] p-6 text-[#111827] shadow-2xl md:p-10"><MarkdownContent content={post.body_md || ""} /></div>
              {sections.length > 0 && <div id="sections" className="space-y-5">{sections.map((section, index) => <div key={`${section.heading}-${index}`} className="rounded-[32px] border border-white/10 bg-white/[0.92] p-6 shadow-2xl md:p-8"><h2 className="text-2xl font-semibold tracking-[-0.02em] text-[#111827]">{section.heading}</h2><div className="mt-4"><MarkdownContent content={section.content} /></div></div>)}</div>}
              {gallery.length > 0 && <div className="grid gap-5 md:grid-cols-2">{gallery.map((image, index) => <figure key={`${image.image_url}-${index}`} className="overflow-hidden rounded-[28px] border border-white/10 bg-white/10 shadow-2xl backdrop-blur"><img src={image.image_url} alt={image.alt_text || post.title} className="h-64 w-full object-cover" />{image.caption && <figcaption className="p-4 text-sm text-slate-300">{image.caption}</figcaption>}</figure>)}</div>}
              {relatedServices.length > 0 && <div id="services" className="rounded-[32px] border border-white/10 bg-white/[0.07] p-6 shadow-2xl backdrop-blur md:p-8"><h2 className="text-2xl font-semibold tracking-[-0.02em] text-white">Related services</h2><div className="mt-5 flex flex-wrap gap-2">{relatedServices.map((service) => <span key={service} className="rounded-full border border-white/10 bg-white/10 px-4 py-2 text-sm font-medium text-slate-200">{service}</span>)}</div><Link to="/services" className="mt-6 inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_35px_rgba(34,211,238,0.35)]">Explore services <ArrowRight className="h-4 w-4" /></Link></div>}
              <div className="flex flex-col gap-3 border-t border-white/10 pt-8 sm:flex-row sm:justify-between"><Link to="/blog" className="inline-flex items-center gap-2 rounded-full border border-white/15 px-5 py-2.5 text-sm font-semibold text-white hover:bg-white/10"><ArrowLeft className="h-4 w-4" />Back to Blog</Link><Link to="/contact" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-cyan-400 to-blue-500 px-5 py-2.5 text-sm font-semibold text-white shadow-[0_0_35px_rgba(34,211,238,0.35)]">Start a Project <ArrowRight className="h-4 w-4" /></Link></div>
            </div>
          </div>
        </section>
      </article>
    </Shell>
  );
}

function Shell({ children }: { children: React.ReactNode }) { return <main className="min-h-screen bg-[#030712] font-poppins text-white"><Header />{children}<Footer /></main>; }
function MarkdownContent({ content }: { content: string }) { return <div className="prose max-w-none text-sm leading-7 text-[#4B5563] md:text-base [&_h1]:mb-4 [&_h1]:mt-8 [&_h1]:text-3xl [&_h1]:font-semibold [&_h1]:tracking-[-0.02em] [&_h1]:text-[#111827] [&_h2]:mb-3 [&_h2]:mt-7 [&_h2]:text-2xl [&_h2]:font-semibold [&_h2]:tracking-[-0.02em] [&_h2]:text-[#111827] [&_h3]:mb-2 [&_h3]:mt-5 [&_h3]:text-xl [&_h3]:font-semibold [&_h3]:text-[#111827] [&_p]:mb-4 [&_p]:leading-8 [&_strong]:text-[#111827] [&_ul]:mb-4 [&_ul]:list-disc [&_ul]:space-y-2 [&_ul]:pl-5 [&_ol]:mb-4 [&_ol]:list-decimal [&_ol]:space-y-2 [&_ol]:pl-5"><ReactMarkdown>{content}</ReactMarkdown></div>; }
function formatDate(value?: string) { if (!value) return "Recently"; return new Date(value).toLocaleDateString(undefined, { month: "long", day: "numeric", year: "numeric" }); }
