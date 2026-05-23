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
      { title: "Writing — Power BI, Tableau & Analytics | Zain Haidar" },
      { name: "description", content: "Professional blog and field notes by Zain Haidar focusing on Power BI calculation layers, Tableau server logic, and BigQuery data engineering." },
      { property: "og:title", content: "Writing — Zain Haidar" },
      { property: "og:description", content: "Sleek architectural notes on building professional business intelligence setups." },
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
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <SectionHeader
            kicker="Writing"
            title="Field notes from real projects."
            intro="Short, practical pieces on Power BI architecture, DAX, semantic modeling and the unglamorous reality of shipping analytics."
          />

          {isLoading && <div className="text-muted-foreground">Loading…</div>}

          {!isLoading && posts.length === 0 && (
            <div className="border border-border rounded-md p-12 text-center bg-card">
              <p className="font-serif-display text-2xl mb-2">First articles coming soon.</p>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                Drafts in progress on Power BI semantic modeling, DAX rescue patterns,
                and migrating spreadsheet reporting to a proper warehouse.
              </p>
            </div>
          )}

          <div className="divide-y divide-border border-t border-b border-border">
            {posts.map((p) => (
              <Link
                key={p.id}
                to="/insights/$slug"
                params={{ slug: p.slug }}
                className="group grid md:grid-cols-12 gap-6 py-8 items-start hover:bg-secondary/50 transition px-2 -mx-2 rounded-md"
              >
                <div className="md:col-span-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground font-mono">
                  {p.category ?? "Article"} · {p.reading_minutes ?? 5} min
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-serif-display text-2xl md:text-3xl leading-snug tracking-[-0.015em] group-hover:text-foreground/70 transition-colors">
                    {p.title}
                  </h3>
                  {p.excerpt && (
                    <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed line-clamp-2 max-w-[60ch]">
                      {p.excerpt}
                    </p>
                  )}
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
