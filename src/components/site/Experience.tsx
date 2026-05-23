import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { Milestone } from "lucide-react";

const xp = [
  { co: "Haidar Analytics (Vienna)", role: "Enterprise BI & Data Architecture Consultant", time: "2023 — Present", desc: "Consulting on enterprise-grade Power BI setups, custom DAX rescue packages, data warehousing, and ETL scaling for multinational retail, healthcare, and SaaS firms." },
  { co: "FBM Solutions", role: "Lead Data Analyst & BI Architect", time: "2021 — 2023", desc: "Spearheaded operational reporting, designed key executive control room dashboards, engineered statistical forecasting models, and automated manual legacy reporting cycles." },
  { co: "Independent Engagements", role: "Software Engineer & Analytics Developer", time: "2019 — 2021", desc: "Developed customized customer analytics databases, advanced data visualizations, and integrated real-time pipeline dashboards for growth-stage businesses." },
  { co: "Academic Research — Uni Vienna", role: "Advanced ML & Data Engineering Research", time: "Ongoing", desc: "Focusing on deep neural networks, natural language processors, and semantic data models to merge cutting-edge AI architectures into executive reporting environments." },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-20 md:py-24 bg-slate-50/20 border-b border-slate-100">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-6">
        <SectionHeader kicker="Track Record" title="Engagements &amp; Deliveries" />

        <div className="mt-10 space-y-3">
          {xp.map((e, i) => (
            <motion.div
              key={e.co + e.time}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              className="border border-slate-200 bg-white p-5 rounded hover:border-slate-300 transition duration-150 grid md:grid-cols-12 gap-3 md:gap-6 items-center shadow-sm"
            >
              <div className="md:col-span-3 font-mono text-[10px] uppercase tracking-wider text-slate-400 font-semibold flex items-center gap-2">
                <Milestone className="h-3.5 w-3.5 text-slate-300" />
                {e.time}
              </div>
              
              <div className="md:col-span-4">
                <h4 className="text-[15px] font-bold text-slate-800">
                  {e.co}
                </h4>
                <div className="text-[11px] text-slate-400 font-mono mt-0.5">{e.role}</div>
              </div>
              
              <div className="md:col-span-5 text-[13px] text-slate-500 leading-relaxed">
                {e.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
