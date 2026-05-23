import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { About } from "@/components/site/About";
import { Experience } from "@/components/site/Experience";
import { Certifications } from "@/components/site/Certifications";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Capabilities — Zain Haidar | Power BI Specialist" },
      { name: "description", content: "Learn about the capabilities and professional background of Zain Haidar, a Data Analyst and BI Developer based in Vienna." },
      { property: "og:title", content: "About & Capabilities — Zain Haidar" },
      { property: "og:description", content: "Data analysis, star schemas, Power BI, Tableau, and Looker Studio development." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main>
      <Nav />
      <div className="pt-28 md:pt-32"><About /><Experience /><Certifications /></div>
      <Footer />
    </main>
  );
}
