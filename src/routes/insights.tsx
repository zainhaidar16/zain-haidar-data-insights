import { createFileRoute, Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SectionHeader } from "@/components/site/SectionHeader";
import { listPublishedPosts } from "@/lib/posts.functions";

const fallbackPosts = [
  {
    id: "post-1",
    slug: "speeding-up-power-bi-calcs",
    category: "BI Strategy",
    reading_minutes: 6,
    title: "Speeding Up Power BI Calculation Layers",
    excerpt: "How to restructure complex DAX formulas and optimize data models to cut dashboard loading times in half.",
    body_md: "Complex DAX calculations can quickly slow down your Power BI reports. In this guide, we walk through how to optimize your measures, leverage calculated columns efficiently, and use Power Query to push transformations upstream."
  },
  {
    id: "post-2",
    slug: "why-we-retired-spreadsheets",
    category: "AI Operations",
    reading_minutes: 5,
    title: "Why We Retired Our Spreadsheet Schedulers",
    excerpt: "The journey of moving a private clinic network from manual scheduling to automated patient demand forecasting models.",
    body_md: "Manual spreadsheet scheduling is prone to errors and consumes hours of work. Discover how we built a simple forecasting model using Python that predicts patient visits with 92% accuracy, automated daily reporting and eliminated manual efforts."
  },
  {
    id: "post-3",
    slug: "modern-data-stack-growing-teams",
    category: "Data Architecture",
    reading_minutes: 8,
    title: "The Modern Data Stack for Growing Teams",
    excerpt: "How Snowflake, dbt, and Looker Studio create a cost-effective, bulletproof daily reporting pipeline.",
    body_md: "Building a data stack doesn't have to be expensive. By combining Snowflake's powerful database engine, dbt's automation framework, and Google Looker Studio's simple visuals, you can construct a reliable, high-performance daily reporting system."
  }
];

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
  
  const serverPosts = data?.posts ?? [];
  const posts = serverPosts.length > 0 ? serverPosts : fallbackPosts;

  return (
    <main className="bg-background">
      <Nav />
      <section className="pt-32 md:pt-40 pb-20 grid-bg">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <SectionHeader
            kicker="Writing"
            title="Simple tips and data guides"
            intro="I write simple articles about Power BI, Tableau, Looker Studio, and how to make sense of your business data without getting confused."
          />

          {isLoading && (
            <div className="flex justify-center py-20">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
            </div>
          )}

          {!isLoading && posts.length === 0 && (
            <div className="border border-border rounded-xl p-12 text-center bg-card">
              <p className="font-serif-display text-2xl mb-2">Articles coming soon!</p>
              <p className="text-muted-foreground text-sm max-w-md mx-auto">
                I am writing helpful guides on how to clean up spreadsheets, build faster reports, and make your business data easier to read.
              </p>
            </div>
          )}

          <div className="divide-y divide-border/60 border-t border-b border-border/60 mt-12">
            {posts.map((p) => (
              <Link
                key={p.id}
                to="/insights/$slug"
                params={{ slug: p.slug }}
                className="group grid md:grid-cols-12 gap-6 py-10 items-start hover:bg-white/[0.01] transition px-4 -mx-4 rounded-xl"
              >
                <div className="md:col-span-3 text-[10px] font-mono uppercase tracking-[0.25em] text-accent font-bold">
                  {p.category ?? "Article"} · {p.reading_minutes ?? 5} min read
                </div>
                <div className="md:col-span-9">
                  <h3 className="font-serif-display text-2xl md:text-3xl leading-snug tracking-[-0.015em] group-hover:text-accent transition-colors text-foreground">
                    {p.title}
                  </h3>
                  {p.excerpt && (
                    <p className="mt-3 text-[15px] text-muted-foreground leading-relaxed line-clamp-2 max-w-[62ch]">
                      {p.excerpt}
                    </p>
                  )}
                  <div className="mt-4 flex items-center gap-1.5 text-xs text-accent font-mono uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    Read Article →
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
