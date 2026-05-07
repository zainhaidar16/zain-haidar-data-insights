import { createFileRoute } from "@tanstack/react-router";
import { Nav } from "@/components/site/Nav";
import { Hero } from "@/components/site/Hero";
import { Marquee } from "@/components/site/Marquee";
import { Work } from "@/components/site/Work";
import { Services } from "@/components/site/Services";
import { Experience } from "@/components/site/Experience";
import { Skills } from "@/components/site/Skills";
import { About } from "@/components/site/About";
import { Certifications } from "@/components/site/Certifications";
import { Contact } from "@/components/site/Contact";
import { Footer } from "@/components/site/Footer";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Zain Haidar — Data Analyst & BI Consultant | Vienna" },
      { name: "description", content: "Power BI, SQL, Python, ETL and AI analytics solutions. Vienna-based Data Analyst & BI Consultant for startups and enterprises." },
      { property: "og:title", content: "Zain Haidar — Data Analyst & BI Consultant" },
      { property: "og:description", content: "Turning data into business growth with Power BI, SQL, Python and AI analytics." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <main className="relative">
      <Nav />
      <Hero />
      <Marquee />
      <Work />
      <Services />
      <Experience />
      <Skills />
      <About />
      <Certifications />
      <Contact />
      <Footer />
    </main>
  );
}
