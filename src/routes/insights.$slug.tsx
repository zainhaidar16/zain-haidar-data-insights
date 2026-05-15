import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { getPostBySlug } from "@/lib/posts.functions";
import { ArrowLeft } from "lucide-react";

export const Route = createFileRoute("/insights/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — Writing | Zain Haidar` },
      { name: "description", content: "Article from Zain Haidar — Power BI, DAX and analytics." },
    ],
  }),
  component: InsightDetail,
  notFoundComponent: () => (
    <main className="min-h-screen grid place-items-center">
      <div className="text-center">
        <h1 className="font-serif-display text-4xl mb-4">Article not found</h1>
        <Link to="/insights" className="border-b border-foreground pb-0.5">Back to writing</Link>
      </div>
    </main>
  ),
});

function InsightDetail() {
  const { slug } = Route.useParams();
  const fetchPost = useServerFn(getPostBySlug);
  const { data, isLoading } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost({ data: { slug } }),
  });

  if (!isLoading && !data?.post) throw notFound();
  const post = data?.post;

  return (
    <main>
      <Nav />
      <article className="pt-32 md:pt-40 pb-24">
        <div className="mx-auto max-w-[680px] px-5 sm:px-8">
          <Link to="/insights" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-10">
            <ArrowLeft className="h-4 w-4" /> All writing
          </Link>
          {isLoading && <div className="text-muted-foreground">Loading…</div>}
          {post && (
            <>
              <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-4 font-mono">
                {post.category ?? "Article"} · {post.reading_minutes ?? 5} min read
              </div>
              <h1 className="font-serif-display text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.025em]">
                {post.title}
              </h1>
              {post.excerpt && <p className="mt-6 text-lg text-muted-foreground leading-relaxed">{post.excerpt}</p>}
              {post.cover_url && (
                <img src={post.cover_url} alt={post.title} className="mt-10 rounded-md w-full aspect-[16/9] object-cover border border-border" />
              )}
              <div className="prose prose-neutral mt-10 whitespace-pre-wrap text-foreground/85 leading-[1.8] text-[17px]">
                {post.body_md}
              </div>
            </>
          )}
        </div>
      </article>
      <Footer />
    </main>
  );
}
