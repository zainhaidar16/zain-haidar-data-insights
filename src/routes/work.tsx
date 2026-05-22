import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Work } from "@/components/site/Work";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Case Studies — Haidar Analytics" },
      { name: "description", content: "Explore modern analytics architectures and Power BI case studies by Haidar Analytics across retail, healthcare, fintech, and customer retention." },
      { property: "og:title", content: "Case Studies — Haidar Analytics" },
      { property: "og:description", content: "Governed semantic models and pipelines with measurable business outcomes." },
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
