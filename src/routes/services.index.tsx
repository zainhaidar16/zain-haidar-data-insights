import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { PageHero } from "@/components/portfolio/PageHero";
import { FinalCTA } from "@/components/portfolio/FinalCTA";
import { pageHead } from "@/lib/seo";

import { ServiceCards } from "@/components/portfolio/ServicesMarketplace";
import { getServicesPageData } from "@/lib/public-data.functions";
export const Route = createFileRoute("/services/")({
  loader: () => getServicesPageData(),
  head: () =>
    pageHead(
      "Freelance data services",
      "Power BI dashboards, data preparation, and reporting automation. Clear scope, useful deliverables, and documented handover.",
      "/services",
    ),
  component: Services,
});
function Services() {
  const { services } = Route.useLoaderData();
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <PageHero
          eyebrow="Freelance services"
          title="Make your data easier to work with."
          description="Focused help with dashboards, data preparation, and repeatable reporting. We start with the decision you need to make, then agree the scope and deliverables."
          actions={
            <Link className="button button-primary" to="/contact" search={{ intent: "freelance" }}>
              Discuss your project →
            </Link>
          }
        />
        <section className="section">
          <div className="container">
            <ServiceCards services={services} />
            {!services.length && (
              <p>Services are temporarily unavailable. Please try again shortly.</p>
            )}
          </div>
        </section>
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
