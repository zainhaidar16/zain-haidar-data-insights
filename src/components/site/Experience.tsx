import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { Milestone } from "lucide-react";

const xp = [
  { co: "Independent BI Consultant", role: "Power BI, Tableau & Looker Studio Developer", time: "2023 — Present", desc: "Developing enterprise-grade dashboard command centers, custom DAX metrics, Tableau server setups, and automated ETL pipelines for international retail, healthcare, and SaaS groups." },
  { co: "FBM Solutions", role: "Data Analyst & BI Developer", time: "2021 — 2023", desc: "Engineered operational dashboards, constructed automated SQL reporting scripts, set up ML patient demand models, and automated manual pipeline ingestions." },
  { co: "Software Engineering Engagements", role: "Software Developer & Analytics Integrator", time: "2019 — 2021", desc: "Designed customer analytics pipelines, advanced data visualizations, and integrated real-time pipeline telemetry dashboards for growth-stage businesses." },
  { co: "Academic Researcher — Uni Vienna", role: "MS Computer Science Scholar", time: "Ongoing", desc: "Researching statistical machine learning algorithms, database normalization formats, and NLP tools to integrate smart AI queries into corporate reporting workspaces." },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32 bg-secondary/25">
      <div className="absolute inset-0 grid-bg opacity-40 pointer-events-none" />
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 relative z-10">
        <SectionHeader kicker="Experience" title="Professional Track Record" />

        <div className="mt-12 space-y-2">
          {xp.map((e, i) => (
            <motion.div
              key={e.co + e.time}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass p-6 md:p-8 rounded-2xl relative overflow-hidden group hover:border-accent/25 transition-all duration-300 grid md:grid-cols-12 gap-4 md:gap-8 items-center shadow-elegant"
            >
              {/* Glowing decorative milestone line on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="md:col-span-3 font-mono text-[11px] uppercase tracking-widest text-accent font-semibold flex items-center gap-2">
                <Milestone className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100 text-accent transition-opacity" />
                {e.time}
              </div>
              
              <div className="md:col-span-4">
                <h4 className="text-[18px] font-bold text-foreground group-hover:text-accent transition-colors">
                  {e.co}
                </h4>
                <div className="text-xs text-muted-foreground font-mono mt-1">{e.role}</div>
              </div>
              
              <div className="md:col-span-5 text-sm text-muted-foreground leading-relaxed">
                {e.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
