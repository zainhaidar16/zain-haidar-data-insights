import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Work } from "@/components/site/Work";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work & Case Studies — Zain Haidar | Power BI Analyst" },
      { name: "description", content: "Selected Power BI, DAX, ETL and analytics case studies — retail, healthcare, finance, SaaS." },
      { property: "og:title", content: "Case Studies — Zain Haidar" },
      { property: "og:description", content: "Dashboards and pipelines with measurable outcomes." },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <main>
      <Nav />
      <div className="pt-12"><Work /></div>
      <Footer />
    </main>
  );
}
