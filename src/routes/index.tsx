import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Work } from "@/components/site/Work";
import { Skills } from "@/components/site/Skills";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Haidar Analytics — Enterprise Power BI & Advanced Business Intelligence" },
      { name: "description", content: "Vienna-based premier business intelligence and analytics engineering studio. We construct governed star schemas, optimized Power BI workspaces, and custom forecasting models." },
      { property: "og:title", content: "Haidar Analytics — Enterprise BI & Data Engineering" },
      { property: "og:description", content: "Optimized Power BI models, enterprise star schemas, and scalable ETL pipelines that drive executive performance." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Marquee />
      <Work />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
