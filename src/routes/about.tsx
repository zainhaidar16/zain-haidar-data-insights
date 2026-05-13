import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { About } from "@/components/site/About";
import { Experience } from "@/components/site/Experience";
import { Certifications } from "@/components/site/Certifications";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Haidar Analytics | Founded by Zain Haidar in Vienna" },
      { name: "description", content: "Boutique analytics studio in Vienna. Founded by Zain Haidar — 9+ years across data, BI and AI." },
      { property: "og:title", content: "About Haidar Analytics" },
      { property: "og:description", content: "A consultant who codes — turning data into decisions for ambitious teams." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <main>
      <Nav />
      <div className="pt-28 md:pt-36"><About /><Experience /><Certifications /></div>
      <Footer />
    </main>
  );
}
