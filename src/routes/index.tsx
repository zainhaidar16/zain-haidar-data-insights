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
      { title: "Zain Haidar — Power BI & Data Analyst (Vienna)" },
      { name: "description", content: "Power BI & Data Analyst in Vienna. I turn messy business data into dashboards executives actually use. Open to full-time roles in Vienna and remote EU." },
      { property: "og:title", content: "Zain Haidar — Power BI & Data Analyst" },
      { property: "og:description", content: "Power BI, DAX, SQL and Python for mid-market businesses. Based in Vienna, available worldwide." },
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
