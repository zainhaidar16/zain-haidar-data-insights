import { createFileRoute } from "@tanstack/react-router";
import { Header } from "@/components/portfolio/Header";
import { AmdHomePage } from "@/components/portfolio/AmdHomePage";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zain Haidar — Data Analyst & BI Specialist" },
      {
        name: "description",
        content:
          "Experienced Data Analyst & BI Specialist based in Vienna. Specializing in Power BI dashboards, SQL databases, Python automation, and scalable ETL pipelines that drive business value.",
      },
      { property: "og:title", content: "Zain Haidar — Data Analyst & BI Specialist" },
      {
        property: "og:description",
        content:
          "Professional portfolio of Zain Haidar — automated BI dashboards, SQL database optimization, and Python data engineering.",
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <div className="min-h-screen bg-transparent">
      <Header />
      <main>
        <AmdHomePage />
      </main>
      <Footer />
    </div>
  );
}
