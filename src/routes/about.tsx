import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { About } from "@/components/site/About";
import { Experience } from "@/components/site/Experience";
import { Certifications } from "@/components/site/Certifications";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About & Skills — Haidar Analytics | Simple Data Dashboards" },
      { name: "description", content: "Learn about Haidar Analytics, specialized in building clean, interactive Power BI, Tableau, and Looker Studio dashboards." },
      { property: "og:title", content: "About & Skills — Haidar Analytics" },
      { property: "og:description", content: "Simple and clear reports and custom dashboard development by Haidar Analytics." },
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
