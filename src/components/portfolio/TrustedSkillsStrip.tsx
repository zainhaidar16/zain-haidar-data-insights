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
    <section className="py-12 bg-[#FFFFFF] border-t border-b border-[#E8E8ED]">
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-[11px] font-bold uppercase tracking-widest text-[#6E6E73] mb-6"
        >
          Trusted capabilities for practical business insights
        </motion.p>
 
        <div className="flex flex-wrap justify-center items-center gap-3">
          {skills.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center gap-2 bg-[#F5F5F7] border border-[#E8E8ED] px-4 py-2 rounded-full cursor-default select-none hover:border-[#0071E3]/40 transition-colors duration-200"
              >
                <Icon className="h-4 w-4 text-[#0071E3] shrink-0" />
                <span className="text-xs font-semibold text-[#1D1D1F]">{skill.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
