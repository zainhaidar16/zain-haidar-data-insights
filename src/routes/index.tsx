import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/portfolio/Header";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { ThreeWays } from "@/components/portfolio/ThreeWays";
import { ServicesMarketplace } from "@/components/portfolio/ServicesMarketplace";
import { ToolsGrid } from "@/components/portfolio/ToolsGrid";
import { LatestProjects } from "@/components/portfolio/LatestProjects";
import { HomeBlog } from "@/components/portfolio/HomeBlog";
import { FinalCTA } from "@/components/portfolio/FinalCTA";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zain Haidar — Data Analyst & BI Specialist" },
      {
        name: "description",
        content:
          "Experienced Data Analyst & BI Specialist based in Vienna. Specializing in Power BI dashboards, SQL databases, Python automation, and scalable ETL pipelines that drive business value.",
      },
      { property: "og:title", content: "Zain Haidar — Data Analyst & BI Specialist" },
      {
        property: "og:description",
        content:
          "Professional portfolio of Zain Haidar — automated BI dashboards, SQL database optimization, and Python data engineering.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-[#050505]">
      <Header />
      <main>
        <HeroSection />
        <ThreeWays />
        <ServicesMarketplace />
        <ToolsGrid />
        <LatestProjects />
        <HomeBlog />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
