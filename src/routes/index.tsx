import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/portfolio/Header";
import { Hero } from "@/components/portfolio/Hero";
import { About } from "@/components/portfolio/About";
import { Skills } from "@/components/portfolio/Skills";
import { Stats } from "@/components/portfolio/Stats";
import { Services } from "@/components/portfolio/Services";
import { Projects } from "@/components/portfolio/Projects";
import { Experience } from "@/components/portfolio/Experience";
import { Certifications } from "@/components/portfolio/Certifications";
import { Contact } from "@/components/portfolio/Contact";
import { Testimonials } from "@/components/portfolio/Testimonials";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zain Haidar — Data Analyst & BI Specialist" },
      { name: "description", content: "Experienced Data Analyst & BI Specialist based in Vienna. Specializing in Power BI dashboards, SQL databases, Python automation, and scalable ETL pipelines that drive business value." },
      { property: "og:title", content: "Zain Haidar — Data Analyst & BI Specialist" },
      { property: "og:description", content: "Professional portfolio of Zain Haidar — automated BI dashboards, SQL database optimization, and Python data engineering." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <Header />
      <main>
        <Hero />
        <About />
        <Stats />
        <Skills />
        <Services />
        <Projects />
        <Testimonials />
        <Experience />
        <Certifications />
        <Contact />
      </main>
      <Footer />
    </div>
  );
}
