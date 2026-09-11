import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/portfolio/Header";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { EditorialWork } from "@/components/portfolio/EditorialWork";
import { ServicesMarketplace } from "@/components/portfolio/ServicesMarketplace";
import { Footer } from "@/components/portfolio/Footer";
import { FinalCTA } from "@/components/portfolio/FinalCTA";
import { getHomePageData } from "@/lib/public-data.functions";
import { profile } from "@/data/profile";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/")({
  loader: () => getHomePageData(),
  head: () =>
    pageHead(
      "Data Analyst & Power BI Specialist",
      "Zain Haidar in Vienna. Explore Power BI, SQL and Python projects, professional experience, and freelance analytics services.",
      "/",
    ),
  component: Home,
});
function Home() {
  const { projects, projectsUnavailable } = Route.useLoaderData();
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <HeroSection project={projects[0]} />
        <EditorialWork projects={projects} unavailable={projectsUnavailable} />
        <ServicesMarketplace />
        <section className="section">
          <div className="container about-summary">
            <img src="/zain.jpg" alt="Zain Haidar" width="1024" height="1024" loading="lazy" />
            <div>
              <p className="eyebrow">The person behind the work</p>
              <h2>
                Start with the question.
                <br />
                Then earn the answer.
              </h2>
              <p>
                I’m Zain, a data analyst based in Vienna. When a brief is unclear, I start with the
                decision: who needs to act, what they need to know, and which numbers they can
                trust.
              </p>
              <p>
                I check the grain of the data, make assumptions explicit, and reconcile the output
                before polishing the report. The handover should explain how the work runs and where
                its limits are.
              </p>
              <p>
                I’m open to joining an analytics team or taking on a defined freelance engagement.
              </p>
              <div className="actions">
                <Link className="text-link" to="/about">
                  About & experience
                  <ArrowRight size={17} aria-hidden="true" />
                </Link>
                <a className="button button-outline button-small" href={profile.resume} download>
                  Download resume
                </a>
              </div>
            </div>
          </div>
        </section>
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
