import { motion } from "framer-motion";
import { LogoGrid } from "./LogoGrid";
import { technologyTools, aiTools } from "@/data/tools";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function ToolsGrid() {
  return (
    <section className="py-20 md:py-24 bg-[var(--site-bg)] border-t border-[var(--border)]">
      <div className="section-container space-y-24">
        {/* Section 1: Data Work Tools */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-main)]">
              Tools I Use for Data Work
            </h2>
            <p className="mt-3 text-[14px] text-[var(--text-soft)] max-w-xl mx-auto font-normal">
              I use these tools to build dashboards, clean data, create reports, and automate business work.
            </p>
          </motion.div>
 
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          >
            <LogoGrid items={technologyTools} />
          </motion.div>
        </div>
 
        {/* Section 2: AI Tools */}
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="text-center mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-main)]">
              AI Tools I Can Use in Workflows
            </h2>
            <p className="mt-3 text-[14px] text-[var(--text-soft)] max-w-xl mx-auto font-normal">
              I can also use AI tools to speed up research, reporting, automation, content, and business workflows.
            </p>
          </motion.div>
 
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          >
            <LogoGrid items={aiTools} />
          </motion.div>
        </div>
 
        {/* AI Services Content Section */}
        <div className="grid md:grid-cols-3 gap-6 mt-16">
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.05, ease: EASE }}
            className="site-card p-7 flex flex-col"
          >
            <h3 className="text-[18px] font-semibold text-[var(--text-main)] mb-3">
              AI Reporting Helpers
            </h3>
            <p className="text-[14px] text-[var(--text-soft)] leading-relaxed font-normal">
              Use AI to help write report summaries, explain numbers, and make dashboards easier to understand.
            </p>
          </motion.div>
 
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.1, ease: EASE }}
            className="site-card p-7 flex flex-col"
          >
            <h3 className="text-[18px] font-semibold text-[var(--text-main)] mb-3">
              AI Workflow Automation
            </h3>
            <p className="text-[14px] text-[var(--text-soft)] leading-relaxed font-normal">
              Use tools like ChatGPT, Claude, and Gemini to support repeated business tasks and save time.
            </p>
          </motion.div>
 
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.45, delay: 0.15, ease: EASE }}
            className="site-card p-7 flex flex-col"
          >
            <h3 className="text-[18px] font-semibold text-[var(--text-main)] mb-3">
              AI Agents
            </h3>
            <p className="text-[14px] text-[var(--text-soft)] leading-relaxed font-normal">
              Build simple AI agent workflows that help with research, data checks, content, and task support.
            </p>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
