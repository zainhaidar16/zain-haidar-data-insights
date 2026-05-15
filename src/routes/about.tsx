import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { About } from "@/components/site/About";
import { Experience } from "@/components/site/Experience";
import { Certifications } from "@/components/site/Certifications";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Zain Haidar | Power BI & Data Analyst (Vienna)" },
      { name: "description", content: "Power BI & Data Analyst based in Vienna. MS Computer Science at the University of Vienna. Open to full-time roles and selective freelance." },
      { property: "og:title", content: "About — Zain Haidar" },
      { property: "og:description", content: "A consultant who codes — turning data into decisions." },
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
