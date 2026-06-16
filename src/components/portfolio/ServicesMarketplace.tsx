import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Database, FileSpreadsheet, Trash2, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const smallCards = [
  {
    icon: Database,
    title: "SQL Reports",
    category: "Database Reports",
    description: "Clear reports from your database, built with clean SQL queries.",
  },
  {
    icon: FileSpreadsheet,
    title: "Excel Reporting",
    category: "Business Reports",
    description: "Better Excel reports, cleaned files, and simple reporting templates.",
  },
  {
    icon: Trash2,
    title: "Data Cleaning",
    category: "Clean Data",
    description: "Fix messy data, remove errors, combine files, and prepare everything for reporting.",
  },
  {
    icon: Zap,
    title: "Python Automation",
    category: "Save Time",
    description: "Automate repeated reporting tasks and reduce manual work.",
  },
];

export function ServicesMarketplace() {
  return (
    <section className="py-24 md:py-28 bg-[#050505] border-t border-[rgba(255,255,255,0.06)]">
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-normal text-white leading-tight">
            Services Built for Business Data
          </h2>
        </motion.div>

        {/* Layout: 1 big card on top, 4 small cards below */}
        <div className="space-y-6">
          {/* Big featured card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="bg-[#111111] border border-[rgba(145,92,255,0.20)] rounded-2xl p-8 md:p-10 group hover:border-[rgba(145,92,255,0.40)] transition-all duration-300 relative overflow-hidden"
          >
            {/* Subtle purple glow */}
            <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-[rgba(139,92,246,0.04)] blur-[80px] pointer-events-none" />

            <div className="relative z-10 flex flex-col md:flex-row md:items-start md:justify-between gap-6">
              <div className="flex-1">
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-12 w-12 rounded-xl bg-[#1B102B] border border-[rgba(139,92,246,0.20)] flex items-center justify-center">
                    <BarChart3 className="h-5 w-5 text-[#8B5CF6]" />
                  </div>
                  <span className="text-[11px] font-normal text-[#8B5CF6] uppercase tracking-wider">
                    Main Service
                  </span>
                </div>
                <h3 className="text-2xl md:text-3xl font-normal text-white mb-3">
                  Power BI Dashboards
                </h3>
                <p className="text-[15px] text-[#8B8B98] leading-relaxed mb-4 max-w-lg font-normal">
                  Custom dashboards that show your most important numbers clearly, so you can make better decisions faster.
                </p>
                <p className="text-[13px] text-[#D8D8E0] font-normal">
                  Sales, finance, operations, and KPI dashboards
                </p>
              </div>
              <Link
                to="/services"
                className="inline-flex items-center gap-2 text-[14px] font-normal text-[#8B5CF6] hover:text-[#A779FF] transition-colors shrink-0"
              >
                Explore
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </motion.div>

          {/* 4 small cards grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {smallCards.map((card, i) => {
              const Icon = card.icon;
              return (
                <motion.div
                  key={card.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
                  className="bg-[#111111] border border-[rgba(145,92,255,0.15)] rounded-2xl p-6 group hover:border-[rgba(145,92,255,0.35)] transition-all duration-300"
                >
                  <div className="flex items-center gap-3 mb-4">
                    <div className="h-10 w-10 rounded-lg bg-[#1B102B] border border-[rgba(139,92,246,0.15)] flex items-center justify-center">
                      <Icon className="h-4 w-4 text-[#8B5CF6]" />
                    </div>
                    <span className="text-[10px] font-normal text-[#8B5CF6] uppercase tracking-wider">
                      {card.category}
                    </span>
                  </div>
                  <h3 className="text-[17px] font-normal text-white mb-2">
                    {card.title}
                  </h3>
                  <p className="text-[13px] text-[#8B8B98] leading-relaxed mb-4 font-normal">
                    {card.description}
                  </p>
                  <Link
                    to="/services"
                    className="inline-flex items-center gap-1.5 text-[13px] font-normal text-[#8B5CF6] hover:text-[#A779FF] transition-colors"
                  >
                    Explore
                    <ArrowRight className="h-3.5 w-3.5" />
                  </Link>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
