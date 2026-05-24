import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Work } from "@/components/site/Work";

export const Route = createFileRoute("/work")({
  head: () => ({
    meta: [
      { title: "Featured Projects — Haidar Analytics | Simple Data Dashboards" },
      { name: "description", content: "Explore simple and clean dashboard projects and business reports built by Haidar Analytics." },
      { property: "og:title", content: "Featured Projects — Haidar Analytics" },
      { property: "og:description", content: "Simple and clear business reports and dashboard project portfolio." },
    ],
  }),
  component: WorkPage,
});

function WorkPage() {
  return (
    <main>
      <Nav />
      <div className="pt-12"><Work /></div>
      <Footer />
    </main>
  );
}
