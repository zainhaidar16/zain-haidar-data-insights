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
    <section className="py-12 bg-[#151619] border-t border-b border-[rgba(245,245,243,0.10)]">
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-[11px] font-normal uppercase tracking-widest text-[#AAA9A3] mb-6"
        >
          Trusted capabilities for practical business insights
        </motion.p>
        <div className="flex flex-wrap items-center justify-center gap-3">
          {skills.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center gap-2 bg-[#1D1E22] border border-[rgba(245,245,243,0.10)] px-4 py-2 rounded-full cursor-default select-none hover:border-[rgba(245,245,243,0.24)] hover:bg-[#232428] transition-all duration-200"
              >
                <Icon className="h-4 w-4 text-[#D8D8D2] shrink-0" />
                <span className="text-xs font-normal text-[#F5F5F3]">{skill.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
