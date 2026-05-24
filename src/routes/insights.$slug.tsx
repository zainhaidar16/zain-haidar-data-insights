import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { getPostBySlug } from "@/lib/posts.functions";
import { ArrowLeft, Loader2 } from "lucide-react";

export const Route = createFileRoute("/insights/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ")} — Haidar Analytics` },
      { name: "description", content: "Simple and helpful data guides and articles by Haidar Analytics." },
    ],
  }),
  component: InsightDetail,
  notFoundComponent: () => (
    <main className="min-h-screen bg-background grid place-items-center">
      <div className="text-center">
        <h1 className="font-serif-display text-4xl mb-4 text-foreground">Article not found</h1>
        <Link to="/insights" className="text-accent border-b border-accent pb-0.5 font-mono text-sm">Back to writing</Link>
      </div>
    </main>
  ),
});

const fallbackPostsMap: Record<string, { category: string; reading_minutes: number; title: string; excerpt: string; body_md: string }> = {
  "speeding-up-power-bi-calcs": {
    category: "BI Strategy",
    reading_minutes: 6,
    title: "Speeding Up Power BI Calculation Layers",
    excerpt: "How to restructure complex DAX formulas and optimize data models to cut dashboard loading times in half.",
    body_md: `Complex DAX calculations can quickly slow down your Power BI reports. In this guide, we walk through how to optimize your measures, leverage calculated columns efficiently, and use Power Query to push transformations upstream.

### 1. Optimize complex DAX formulas
Avoid nesting heavy iteration functions like FILTER inside measures when simpler Boolean conditions can be evaluated. Instead, leverage CALCULATE with direct column filters.

### 2. Move calculations upstream
The golden rule of Business Intelligence modeling is: "Store calculations as close to the source database as possible." If a calculation can be written as a SQL View, do it there. Otherwise, do it in Power Query rather than waiting until the DAX layer.

### 3. Use star schema
Ensure your data model is built in a classic Star Schema (Fact and Dimension tables). Flat tables with 100+ columns are highly inefficient inside the Vertipaq storage engine.`
  },
  "why-we-retired-spreadsheets": {
    category: "AI Operations",
    reading_minutes: 5,
    title: "Why We Retired Our Spreadsheet Schedulers",
    excerpt: "The journey of moving a private clinic network from manual scheduling to automated patient demand forecasting models.",
    body_md: `Manual spreadsheet scheduling is prone to errors, hard to scale, and consumes hours of work. Discover how we built a simple forecasting model using Python that predicts patient visits with 92% accuracy, automated daily reporting and eliminated manual efforts.

### The Problem
Our healthcare clinic managers spent every Friday afternoon copying census numbers, weather reports, and holiday calendars into a huge Excel workbook to estimate doctor staffing levels for the upcoming week. The result was highly inaccurate, leading to either long queues or redundant staff costs.

### The Solution
We automated the extraction of historic patient visits from the EHR database, combined it with weather forecasts, and trained a forecasting algorithm using Python. By piping these predictions directly into a simple dashboard, managers now see recommended staffing schedules with a single click.

### The Outcome
Staffing accuracy spiked to 92%, resulting in shorter wait times for patients and a 6-hour reduction in spreadsheet labor every week for the clinical operations team.`
  },
  "modern-data-stack-growing-teams": {
    category: "Data Architecture",
    reading_minutes: 8,
    title: "The Modern Data Stack for Growing Teams",
    excerpt: "How Snowflake, dbt, and Looker Studio create a cost-effective, bulletproof daily reporting pipeline.",
    body_md: `Building a data stack doesn't have to be expensive. By combining Snowflake's powerful database engine, dbt's automation framework, and Google Looker Studio's simple visuals, you can construct a reliable, high-performance daily reporting system.

### Why standard reporting setups fail
Most growing teams struggle because their dashboards load directly from transactional databases. This slows down production applications and leads to broken dashboards when schemas change.

### Introducing the lean pipeline
By separating the transactional database from the analytical workspace, we create a secure, high-speed reporting channel:
1. **Extraction:** Fivetran or a simple Python script syncs active tables to Snowflake.
2. **Transformation:** dbt structures raw tables into clean, tested Data Marts.
3. **Visualization:** Google Looker Studio connects to Snowflake's transformed tables for fast, clear visualization.`
  }
};

function InsightDetail() {
  const { slug } = Route.useParams();
  const fetchPost = useServerFn(getPostBySlug);
  const { data, isLoading } = useQuery({
    queryKey: ["post", slug],
    queryFn: () => fetchPost({ data: { slug } }),
  });

  if (isLoading) {
    return (
      <main className="min-h-screen bg-background grid place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </main>
    );
  }

  const rawPost = data?.post;
  let post;
  if (!rawPost) {
    // Check fallback copy
    const fallback = fallbackPostsMap[slug];
    if (!fallback) throw notFound();
    post = fallback;
  } else {
    post = rawPost;
  }

  return (
    <main className="bg-background">
      <Nav />
      <article className="pt-32 md:pt-40 pb-24 grid-bg">
        <div className="mx-auto max-w-[720px] px-5 sm:px-8">
          <Link to="/insights" className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-accent mb-10">
            <ArrowLeft className="h-4 w-4" /> All writing
          </Link>
          
          {post && (
            <>
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent mb-4 font-bold">
                {post.category ?? "Article"} · {post.reading_minutes ?? 5} min read
              </div>
              <h1 className="font-serif-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl leading-[1.05] tracking-[-0.035em] text-foreground">
                {post.title}
              </h1>
              {post.excerpt && <p className="mt-6 text-lg text-muted-foreground leading-relaxed border-l border-border pl-4">{post.excerpt}</p>}
              
              {"cover_url" in post && post.cover_url && (
                <img src={post.cover_url} alt={post.title} className="mt-10 rounded-2xl w-full aspect-[16/9] object-cover border border-border/80 shadow-elegant" />
              )}
              
              <div className="prose prose-invert mt-12 whitespace-pre-wrap text-muted-foreground leading-[1.8] text-[16px] md:text-[17px] space-y-6">
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
