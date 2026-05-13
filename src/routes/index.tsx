import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Work } from "@/components/site/Work";
import { Services } from "@/components/site/Services";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Haidar Analytics — Data, BI & AI for teams that ship | Vienna" },
      { name: "description", content: "Boutique analytics studio led by Zain Haidar in Vienna. Power BI, SQL, Python, ETL and AI analytics for startups and enterprises." },
      { property: "og:title", content: "Haidar Analytics — Data, BI & AI Studio" },
      { property: "og:description", content: "Dashboards, pipelines and AI workflows that turn data into decisions." },
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
      <Services />
      <Footer />
    </main>
  );
}
