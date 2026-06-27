import { useState } from "react";
import { motion } from "framer-motion";
import { technologyTools, aiTools } from "@/data/tools";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function ToolsGrid() {
  const [activeTab, setActiveTab] = useState<"analytics" | "ai">("analytics");
  const visibleTools = activeTab === "analytics" ? technologyTools.slice(0, 8) : aiTools.slice(0, 8);

  return (
    <section className="py-12 md:py-20 bg-white border-t border-[var(--border)]">
      <div className="section-container space-y-16">
        <div>
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="max-w-3xl mb-12"
          >
            <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-main)]">
              Tools & Technologies
            </h2>
            <p className="mt-3 text-[14px] text-[var(--text-soft)] max-w-xl font-normal">
              I use these analytics and AI tools to build dashboards, clean data, automate reports, and support business workflows.
            </p>
          </motion.div>

          <div className="mb-8 flex flex-wrap gap-3">
            {[
              { id: "analytics", label: "Analytics Stack" },
              { id: "ai", label: "AI Workflows" },
            ].map((tab) => {
              const isActive = activeTab === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  onClick={() => setActiveTab(tab.id as "analytics" | "ai")}
                  aria-pressed={isActive}
                  className={
                    isActive
                      ? "inline-flex items-center rounded-[10px] bg-[var(--purple)] px-6 py-3 text-[15px] font-semibold text-white transition-colors"
                      : "inline-flex items-center rounded-[10px] border border-[var(--purple)] bg-transparent px-6 py-3 text-[15px] font-semibold text-[var(--purple)] transition-colors hover:bg-[var(--purple-soft)]"
                  }
                >
                  {tab.label}
                </button>
              );
            })}
          </div>

          <motion.div
            key={activeTab}
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            className="grid grid-cols-2 gap-4 lg:grid-cols-4"
          >
            {visibleTools.map((item) => (
              <article key={item.name} className="logo-card">
                <div className="logo-card-mark">
                  <img src={item.logo} alt={`${item.name} logo`} loading="lazy" />
                </div>
                <h3>{item.name}</h3>
                {item.description && <p>{item.description}</p>}
              </article>
            ))}
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
