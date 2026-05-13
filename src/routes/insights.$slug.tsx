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
      { title: `${params.slug.replace(/-/g, " ")} — Insights | Haidar Analytics` },
      { name: "description", content: "Article from the Haidar Analytics studio." },
    ],
  }),
  component: InsightDetail,
  notFoundComponent: () => (
    <main className="min-h-screen grid place-items-center">
      <div className="text-center">
        <h1 className="font-serif-display text-5xl mb-4">Article not found</h1>
        <Link to="/insights" className="text-primary underline">Back to Insights</Link>
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
        <div className="mx-auto max-w-3xl px-6">
          <Link to="/insights" className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8">
            <ArrowLeft className="h-4 w-4" /> All insights
          </Link>
          {isLoading && <div className="text-muted-foreground">Loading…</div>}
          {post && (
            <>
              <div className="text-[11px] uppercase tracking-[0.22em] text-primary mb-3">{post.category ?? "Article"}</div>
              <h1 className="font-serif-display text-4xl md:text-6xl leading-[1.05] tracking-tight">{post.title}</h1>
              {post.excerpt && <p className="mt-6 text-lg text-muted-foreground">{post.excerpt}</p>}
              {post.cover_url && (
                <img src={post.cover_url} alt={post.title} className="mt-10 rounded-3xl w-full aspect-[16/9] object-cover" />
              )}
              <div className="prose prose-invert mt-10 whitespace-pre-wrap text-foreground/85 leading-relaxed">
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
