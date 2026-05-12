import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const xp = [
  { co: "Upwork", role: "Freelance Data Analyst", time: "2023 — Now", desc: "BI dashboards, AI analytics and ETL automation for international clients." },
  { co: "FBM Solutions", role: "Data Analyst & BI Developer", time: "2021 — 2023", desc: "Built KPI systems, forecasting models and reporting automation pipelines." },
  { co: "Fiverr", role: "Freelance Software Engineer", time: "2019 — 2021", desc: "Customer analytics, data visualization and analytics web integrations." },
  { co: "University of Vienna", role: "MS Computer Science — ML, NLP, BI", time: "Ongoing", desc: "Researching ML, NLP and modern data analytics applications." },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader kicker="Experience" title="9+ years across data & engineering" />

        <div className="relative glass-strong rounded-3xl p-2 md:p-4">
          <div className="rounded-2xl bg-card/50 divide-y divide-black/5">
            {xp.map((e, i) => (
              <motion.div
                key={e.co + e.time}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.06 }}
                className="group grid md:grid-cols-12 gap-4 items-center px-6 py-7 hover:bg-black/[0.02] transition-colors"
              >
                <div className="md:col-span-3">
                  <div className="text-lg font-semibold">{e.co}</div>
                  <div className="text-sm text-muted-foreground">{e.role}</div>
                </div>
                <div className="md:col-span-6 text-sm text-muted-foreground">{e.desc}</div>
                <div className="md:col-span-3 md:text-right text-sm font-mono text-primary/90">{e.time}</div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
