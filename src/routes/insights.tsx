import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SectionHeader } from "@/components/site/SectionHeader";
import { listPublishedPosts } from "@/lib/posts.functions";

export const Route = createFileRoute("/insights")({
  head: () => ({
    meta: [
      { title: "Insights — Analytics, BI & AI articles | Haidar Analytics" },
      { name: "description", content: "Articles on analytics engineering, BI, forecasting and AI from the Haidar Analytics studio." },
      { property: "og:title", content: "Insights — Haidar Analytics" },
      { property: "og:description", content: "Notes on shipping data products that move metrics." },
    ],
  }),
  component: InsightsPage,
});

function InsightsPage() {
  const fetchPosts = useServerFn(listPublishedPosts);
  const { data, isLoading } = useQuery({
    queryKey: ["published-posts"],
    queryFn: () => fetchPosts(),
  });
  const posts = data?.posts ?? [];

  return (
    <main>
      <Nav />
      <section className="pt-32 md:pt-40 pb-20">
        <div className="mx-auto max-w-6xl px-6">
          <SectionHeader
            kicker="Insights"
            title="Notes from the studio"
            intro="Field-tested takes on analytics engineering, BI and applied AI."
          />

          {isLoading && <div className="text-muted-foreground text-center">Loading…</div>}

          {!isLoading && posts.length === 0 && (
            <div className="glass-strong rounded-3xl p-12 text-center">
              <p className="font-serif-display text-2xl mb-2">First articles coming soon.</p>
              <p className="text-muted-foreground text-sm">
                We're cooking deep dives on Power BI architecture, dbt, and LLM-assisted analytics.
              </p>
            </div>
          )}

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.map((p) => (
              <Link
                key={p.id}
                to="/insights/$slug"
                params={{ slug: p.slug }}
                className="group glass-strong gradient-border rounded-2xl overflow-hidden hover:shadow-glow transition"
              >
                {p.cover_url && (
                  <div className="aspect-[16/10] overflow-hidden">
                    <img src={p.cover_url} alt={p.title} className="w-full h-full object-cover group-hover:scale-105 transition duration-700" />
                  </div>
                )}
                <div className="p-6">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-primary mb-2">{p.category ?? "Article"}</div>
                  <h3 className="font-serif-display text-xl leading-snug">{p.title}</h3>
                  {p.excerpt && <p className="mt-2 text-sm text-muted-foreground line-clamp-3">{p.excerpt}</p>}
                  <div className="mt-4 text-xs text-muted-foreground font-mono">
                    {p.reading_minutes ?? 5} min read
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
