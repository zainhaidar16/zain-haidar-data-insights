import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Services } from "@/components/site/Services";
import { Skills } from "@/components/site/Skills";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Services — Haidar Analytics | Power BI, ETL, AI Analytics" },
      { name: "description", content: "Power BI dashboards, ETL pipelines, AI analytics, forecasting and BI consulting from Haidar Analytics." },
      { property: "og:title", content: "Services — Haidar Analytics" },
      { property: "og:description", content: "Enterprise-grade analytics services delivered with the focus of a senior consultant." },
    ],
  }),
  component: ServicesPage,
});

function ServicesPage() {
  return (
    <main>
      <Nav />
      <div className="pt-28 md:pt-36"><Services /><Skills /></div>
      <Footer />
    </main>
  );
}
