import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { InteractiveDashboard } from "@/components/site/InteractiveDashboard";
import { Work } from "@/components/site/Work";
import { Skills } from "@/components/site/Skills";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zain Haidar — Professional Data Insights & BI Specialist" },
      { name: "description", content: "Interactive, high-fidelity business intelligence dashboards and data analytics setups in Power BI, Tableau, and Looker Studio by Zain Haidar." },
      { property: "og:title", content: "Zain Haidar — Professional Data Insights & BI Specialist" },
      { property: "og:description", content: "Simple and clear reports and custom interactive dashboard setups by Haidar Analytics." },
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
      <InteractiveDashboard />
      <Work />
      <Skills />
      <Contact />
      <Footer />
    </main>
  );
}
