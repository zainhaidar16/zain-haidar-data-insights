import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { Milestone } from "lucide-react";

const xp = [
  { co: "Freelance BI Consultant", role: "Power BI & Tableau Developer", time: "2023 — Present", desc: "Building interactive dashboards, writing fast calculations, and setting up secure data filters for retail, healthcare, and software companies. Helping clients migrate from confusing spreadsheets to clean, automatic dashboards." },
  { co: "FBM Solutions", role: "Data Analyst & BI Developer", time: "2021 — 2023", desc: "Built operational dashboards in Tableau, wrote SQL scripts to clean database tables, and automated daily data updates so the team always had fresh reporting." },
  { co: "Software Projects", role: "Data Specialist", time: "2019 — 2021", desc: "Helped small and growing businesses set up their databases, designed clean tracking dashboards in Power BI, and automated repetitive spreadsheet tasks." },
  { co: "University of Vienna", role: "Computer Science Researcher (MS)", time: "Ongoing", desc: "Studying database structures, machine learning, and optimization methods to build faster, smarter reporting systems for modern businesses." },
];

export function Experience() {
  return (
    <section id="experience" className="relative py-24 md:py-32 bg-secondary/5 border-y border-border/80">
      <div className="absolute inset-0 grid-bg opacity-30 pointer-events-none" />
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 relative z-10">
        <SectionHeader kicker="My Career" title="Where I have worked" />

        <div className="mt-12 space-y-3">
          {xp.map((e, i) => (
            <motion.div
              key={e.co + e.time}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="glass p-6 md:p-8 rounded-2xl relative overflow-hidden group hover:border-accent/30 transition-all duration-300 grid md:grid-cols-12 gap-4 md:gap-8 items-center shadow-elegant border border-border"
            >
              {/* Glowing decorative milestone line on hover */}
              <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

              <div className="md:col-span-3 font-mono text-[10px] uppercase tracking-widest text-accent font-bold flex items-center gap-2">
                <Milestone className="h-3.5 w-3.5 opacity-40 group-hover:opacity-100 text-accent transition-opacity" />
                {e.time}
              </div>
              
              <div className="md:col-span-4">
                <h4 className="text-[18px] font-bold text-foreground group-hover:text-accent transition-colors">
                  {e.co}
                </h4>
                <div className="text-[11px] text-muted-foreground font-mono mt-1 uppercase tracking-wider">{e.role}</div>
              </div>
              
              <div className="md:col-span-5 text-xs md:text-sm text-muted-foreground leading-relaxed">
                {e.desc}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
