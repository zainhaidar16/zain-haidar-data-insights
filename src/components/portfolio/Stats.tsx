import { motion } from "framer-motion";
import { LayoutDashboard, TrendingUp, Shuffle, Globe, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const stats = [
  {
    value: "20+",
    label: "Dashboards Delivered",
    description: "KPI dashboards for retail analytics, sales performance tracking, and financial reporting — built with Power BI, DAX, and SQL.",
    icon: LayoutDashboard,
    linkTo: "/projects" as const,
    linkLabel: "See all projects",
  },
  {
    value: "30%",
    label: "Reporting Efficiency Improved",
    description: "Automated manual reporting workflows with scheduled Power BI refreshes, Python scripts, and streamlined ETL pipelines.",
    icon: TrendingUp,
    linkTo: "/projects" as const,
    linkLabel: "View case studies",
  },
  {
    value: "15%",
    label: "Campaign ROI Increase",
    description: "Customer segmentation analysis that identified high-value cohorts and drove more targeted marketing campaigns.",
    icon: Shuffle,
    linkTo: "/projects" as const,
    linkLabel: "View case study",
  },
  {
    value: "5+",
    label: "Years Data Experience",
    description: "End-to-end analytics: data engineering, dashboard development, trend analysis, and business intelligence consulting.",
    icon: Globe,
    linkTo: "/about" as const,
    linkLabel: "More about me",
  },
];

export function Stats() {
  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="section-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
                className="flex flex-col p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 transition-all duration-200"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-1.5">{stat.value}</div>
                <div className="text-sm font-semibold text-slate-700 mb-2">{stat.label}</div>
                <p className="text-xs text-slate-400 leading-relaxed mb-4 flex-1">{stat.description}</p>
                <Link
                  to={stat.linkTo}
                  className="inline-flex items-center gap-1.5 text-xs font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-150 mt-auto"
                >
                  {stat.linkLabel}
                  <ArrowRight className="h-3 w-3" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
