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
      { title: "Zain Haidar — Power BI & BI Specialist Portfolio" },
      { name: "description", content: "Personal portfolio of Zain Haidar, specializing in custom Power BI, Tableau, and Looker Studio dashboard systems. Based in Vienna." },
      { property: "og:title", content: "Zain Haidar — Power BI, Tableau & Looker Studio Specialization" },
      { property: "og:description", content: "Executive-ready dashboards and high-speed data engineering setups." },
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
