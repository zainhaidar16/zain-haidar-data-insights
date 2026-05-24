import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { About } from "@/components/portfolio/About";
import { Experience } from "@/components/portfolio/Experience";
import { Certifications } from "@/components/portfolio/Certifications";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Skills — Zain The Analyst | Simple Data Dashboards" },
      { name: "description", content: "Learn about Zain Haidar, specialized in building clean, interactive Power BI, Tableau, and Looker Studio dashboards." },
      { property: "og:title", content: "About & Skills — Zain The Analyst" },
      { property: "og:description", content: "Simple and clear reports and custom dashboard development by Zain Haidar." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main className="bg-[#F8FAFC] min-h-screen flex flex-col font-poppins text-slate-800">
      <Header />
      <div className="pt-16">
        <About />
        <Experience />
        <Certifications />
      </div>
      <Footer />
    </main>
  );
}
