import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const featureCards = [
  {
    title: "Executive BI Dashboards",
    description: "Power BI reports that make performance, revenue, operations, and growth easy to understand.",
    image: "linear-gradient(135deg, rgba(0,195,255,0.38), rgba(4,12,18,0.96)), radial-gradient(circle at 20% 20%, rgba(255,255,255,0.42), transparent 22%)",
  },
  {
    title: "Clean Data Pipelines",
    description: "SQL, Python, and ETL systems that clean messy business data and keep reports reliable.",
    image: "linear-gradient(135deg, rgba(190,190,190,0.55), rgba(6,6,6,0.96)), repeating-linear-gradient(90deg, rgba(255,255,255,0.18) 0 2px, transparent 2px 22px)",
  },
  {
    title: "Automation Systems",
    description: "Repeatable reporting workflows that save time and reduce manual spreadsheet work.",
    image: "radial-gradient(circle at 50% 45%, rgba(0,229,255,0.58), transparent 24%), linear-gradient(135deg, rgba(0,70,90,0.7), rgba(2,2,2,0.98))",
  },
];

export function HeroSection() {
  return (
    <section id="hero" className="amd-home-hero relative overflow-hidden bg-black pt-24 pb-0">
      <div className="amd-light-wave" aria-hidden="true" />
      <div className="amd-hero-vignette" aria-hidden="true" />

      <div className="section-container relative z-10">
        <div className="max-w-2xl pt-16 md:pt-24 pb-20 md:pb-28">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="amd-hero-title text-white"
          >
            Build What&apos;s Next With Data Intelligence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            className="mt-6 max-w-xl text-[18px] leading-[1.55] text-white"
          >
            Power BI, SQL, Python, ETL, and automation solutions for businesses that need faster,
            cleaner, and smarter decisions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button asChild variant="secondary" className="amd-outline-button">
              <Link to="/projects">
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" className="amd-outline-button">
              <Link to="/contact">Start a Project</Link>
            </Button>
          </motion.div>
        </div>

        <div className="amd-hero-card-grid grid gap-4 md:grid-cols-3">
          {featureCards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: EASE }}
              className="amd-news-card overflow-hidden border border-white/15 bg-[#151515]"
            >
              <div className="h-44" style={{ background: card.image }} />
              <div className="p-5">
                <h3 className="text-[19px] font-bold leading-snug text-white">{card.title}</h3>
                <p className="mt-4 text-[14px] leading-relaxed text-[#D7D7D7]">{card.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
