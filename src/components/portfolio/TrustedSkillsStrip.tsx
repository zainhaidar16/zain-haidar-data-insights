import { motion } from "framer-motion";

const skills = [
  "Power BI",
  "SQL",
  "Python",
  "Tableau",
  "ETL",
  "Dashboard Automation",
  "Business Intelligence",
];

export function TrustedSkillsStrip() {
  return (
    <section className="py-14 bg-white border-y border-[#E5E7EB]">
      <div className="section-container">
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center text-[13px] font-medium text-[#9CA3AF] uppercase tracking-widest mb-8"
        >
          Trusted skills for practical business reporting
        </motion.p>

        <div className="flex flex-wrap justify-center items-center gap-x-8 gap-y-4">
          {skills.map((skill, i) => (
            <motion.div
              key={skill}
              initial={{ opacity: 0, y: 8 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.05 }}
              className="flex items-center gap-3"
            >
              <span className="text-[15px] sm:text-[17px] font-semibold text-[#9CA3AF] hover:text-[#111111] transition-colors duration-300 cursor-default select-none">
                {skill}
              </span>
              {i !== skills.length - 1 && (
                <span className="hidden sm:inline-flex h-1.5 w-1.5 rounded-full bg-[#D7FF3F]" aria-hidden="true" />
              )}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
