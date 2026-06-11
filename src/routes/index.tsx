import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/portfolio/Header";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { TrustedSkillsStrip } from "@/components/portfolio/TrustedSkillsStrip";
import { Services } from "@/components/portfolio/Services";
import { MeetSection } from "@/components/portfolio/MeetSection";
import { Stats } from "@/components/portfolio/Stats";
import { WhyWorkWithMe } from "@/components/portfolio/WhyWorkWithMe";
import { WhoIHelp } from "@/components/portfolio/WhoIHelp";
import { ProjectImpactHighlights } from "@/components/portfolio/ProjectImpactHighlights";
import { ResourceHub } from "@/components/portfolio/ResourceHub";
import { FinalCTA } from "@/components/portfolio/FinalCTA";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")(({
  head: () => ({
    meta: [
      { title: "Zain Haidar — Data Analyst & BI Specialist" },
      { name: "description", content: "Experienced Data Analyst & BI Specialist based in Vienna. Specializing in Power BI dashboards, SQL databases, Python automation, and scalable ETL pipelines that drive business value." },
      { property: "og:title", content: "Zain Haidar — Data Analyst & BI Specialist" },
      { property: "og:description", content: "Professional portfolio of Zain Haidar — automated BI dashboards, SQL database optimization, and Python data engineering." },
    ],
  }),
  component: Index,
}));

function Index() {
  return (
    <div className="min-h-screen bg-[#FAFAFA]">
      <Header />
      <main>
        <HeroSection />
        <TrustedSkillsStrip />
        <Services />
        <MeetSection />
        <Stats />
        <WhyWorkWithMe />
        <WhoIHelp />
        <ProjectImpactHighlights />
        <ResourceHub />
        <FinalCTA />
      </main>
      <Footer />
    </div>
  );
}
