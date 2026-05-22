import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { About } from "@/components/site/About";
import { Experience } from "@/components/site/Experience";
import { Certifications } from "@/components/site/Certifications";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "Core Capabilities — Haidar Analytics" },
      { name: "description", content: "Learn about the software-engineering-first approach at Haidar Analytics. Scalable star schema models, fast reporting optimization, and predictive AI pipelines." },
      { property: "og:title", content: "Core Capabilities — Haidar Analytics" },
      { property: "og:description", content: "High-performance enterprise Power BI modeling, dbt warehousing architectures, and predictive analytics." },
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
