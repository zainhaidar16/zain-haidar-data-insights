import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Work } from "@/components/site/Work";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Work & Case Studies — Haidar Analytics" },
      { name: "description", content: "Selected analytics, BI and AI projects shipped across retail, finance, healthcare and SaaS." },
      { property: "og:title", content: "Case Studies — Haidar Analytics" },
      { property: "og:description", content: "Dashboards, pipelines and AI analytics with measurable business impact." },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <main>
      <Nav />
      <div className="pt-28 md:pt-36"><Work /></div>
      <Footer />
    </main>
  );
}
