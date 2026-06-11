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
    <section className="py-16 bg-[#111113] border-t border-b border-[#26262B]">
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-[12px] font-semibold text-[#71717A] uppercase tracking-widest mb-8"
        >
          Trusted capabilities for practical business insights
        </motion.p>

        <div className="flex flex-wrap justify-center items-center gap-4">
          {skills.map((skill, i) => {
            const Icon = skill.icon;
            return (
              <motion.div
                key={skill.name}
                initial={{ opacity: 0, y: 8 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.05 }}
                className="flex items-center gap-2.5 bg-[#16161A] border border-[#26262B] px-4.5 py-2.5 rounded-full cursor-default select-none hover:border-[#FF6B00]/40 transition-colors duration-200"
              >
                <Icon className="h-4 w-4 text-[#FF6B00] shrink-0" />
                <span className="text-[14px] font-semibold text-white">{skill.name}</span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
