import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const xp = [
  { co: "Freelance · Upwork", role: "Power BI & Data Analyst", time: "2023 — Now", desc: "Power BI dashboards, DAX rescue work, and ETL automation for international clients." },
  { co: "FBM Solutions", role: "Data Analyst & BI Developer", time: "2021 — 2023", desc: "Built KPI systems, forecasting models, and reporting automation pipelines for ops and finance." },
  { co: "Freelance · Fiverr", role: "Software Engineer", time: "2019 — 2021", desc: "Customer analytics, data visualization and analytics web integrations for small businesses." },
  { co: "University of Vienna", role: "MS Computer Science", time: "Ongoing", desc: "ML, NLP and modern data analytics. Final-stage student." },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32 bg-secondary">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeader kicker="Experience" title="Where I&rsquo;ve done the work." />

        <div className="border-t border-border">
          {xp.map((e, i) => (
            <motion.div
              key={e.co + e.time}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.05 }}
              className="grid md:grid-cols-12 gap-4 md:gap-8 items-start py-7 border-b border-border"
            >
              <div className="md:col-span-3 font-mono text-[12px] uppercase tracking-wider text-muted-foreground">
                {e.time}
              </div>
              <div className="md:col-span-4">
                <div className="text-[18px] font-medium">{e.co}</div>
                <div className="text-sm text-muted-foreground">{e.role}</div>
              </div>
              <div className="md:col-span-5 text-[15px] text-foreground/80 leading-relaxed">
                {e.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
