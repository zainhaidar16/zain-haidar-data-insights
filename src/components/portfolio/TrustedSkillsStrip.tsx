import { motion } from "framer-motion";
import { BarChart3, Database, Code2, Workflow, FileBarChart, Activity } from "lucide-react";

const skills = [
  { name: "Power BI", icon: BarChart3 },
  { name: "SQL Databases", icon: Database },
  { name: "Python Automation", icon: Code2 },
  { name: "ETL Pipelines", icon: Workflow },
  { name: "Enterprise Reporting", icon: FileBarChart },
  { name: "Business Analytics", icon: Activity },
];

export function TrustedSkillsStrip() {
  return (
    <section className="border-y border-white/10 bg-[#151619] py-12">
      <div className="section-container">
        <motion.p initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ duration: 0.5 }} className="mb-6 text-center text-[11px] font-normal uppercase tracking-widest text-[#aaa9a3]">
          Trusted capabilities for practical business insights
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {skills.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <motion.div key={skill.name} initial={{ opacity: 0, y: 8 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, delay: i * 0.05 }} className="flex cursor-default select-none items-center gap-2 rounded-full border border-white/10 bg-white/[0.055] px-4 py-2 transition-colors duration-200 hover:border-white/25 hover:bg-white/[0.08]">
                <Icon className="h-4 w-4 shrink-0 text-[#d8d8d2]" />
                <span className="text-xs font-normal text-[#f5f5f3]">{skill.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
