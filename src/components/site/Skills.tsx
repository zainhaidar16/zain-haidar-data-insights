import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { Database, ShieldAlert, Cpu, BarChart2, GitBranch, Settings } from "lucide-react";

const capabilities = [
  {
    icon: BarChart2,
    title: "Advanced Power BI & DAX",
    description: "Design of scalable, high-performance semantic layers and composite schemas. Custom complex DAX calculations engineered for precise financial, cohort, and time-intelligence reporting requirements.",
    stack: ["Desktop", "Service", "XMLA", "RLS/OLS", "DAX Studio"]
  },
  {
    icon: Database,
    title: "Kimball Data Modeling",
    description: "Star schema modeling, conformed dimensions, and robust data marts. Restructuring raw transactional databases into optimized analytical databases that support consistent historical snapshotting.",
    stack: ["Star Schema", "SQL Server", "Conformed Dimensions", "T-SQL"]
  },
  {
    icon: Settings,
    title: "ETL & Analytics Engineering",
    description: "Orchestration of secure data ingestion and transformation logic. Deploying clean, testable transformation layers via dbt and orchestrating complex pipelines using Azure Data Factory.",
    stack: ["dbt Core", "ADF", "Microsoft Fabric", "CI/CD Pipelines"]
  },
  {
    icon: Cpu,
    title: "AI Integration & Analytics",
    description: "Deployment of machine-learning forecasting and natural language insights directly inside executive dashboards. We integrate Python analytics models cleanly into enterprise layers.",
    stack: ["Python", "OpenAI", "Databricks", "MLflow", "pandas"]
  },
  {
    icon: GitBranch,
    title: "Governance & Security",
    description: "Configuration of row-level security (RLS) models, workspace access hierarchies, gateway structures, and database audit logs to ensure compliance with strict operational rules.",
    stack: ["Row security", "Gateways", "Fabric Admins", "Compliance Log"]
  },
  {
    icon: ShieldAlert,
    title: "Dashboard Modernization",
    description: "Auditing laggy corporate dashboards, correcting data schema modeling flaws, and consolidating fragmented legacy spreadsheets into highly secure, fast-refreshing assets.",
    stack: ["Performance Audits", "Figma Prototyping", "Tabular Editor"]
  }
];

export function Skills() {
  return (
    <section id="skills" className="relative py-20 md:py-24 bg-slate-50/50 border-b border-slate-100">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-6">
        <SectionHeader
          kicker="Core Services"
          title="Enterprise Analytics Architecture"
          intro="We bridge the gap between chaotic database backends and strategic executive dashboards. Below is a mapping of our core capabilities."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-5 mt-10">
          {capabilities.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.04 }}
                className="border border-slate-200 bg-white p-6 rounded hover:border-slate-300 hover:bg-slate-50/40 transition duration-150 shadow-sm"
              >
                {/* Minimal Header */}
                <div className="flex items-center gap-3 mb-4">
                  <div className="h-8 w-8 rounded bg-slate-50 border border-slate-200 flex items-center justify-center text-slate-700">
                    <Icon className="h-4 w-4" />
                  </div>
                  <h3 className="font-serif-display text-[16px] font-bold text-slate-800">
                    {c.title}
                  </h3>
                </div>
                
                <p className="text-[13px] text-slate-500 leading-relaxed mb-5 h-[80px] overflow-hidden line-clamp-4">
                  {c.description}
                </p>

                {/* Flat Stack Badges */}
                <div className="flex flex-wrap gap-1.5 pt-3 border-t border-slate-100">
                  {c.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[9px] font-mono tracking-wider bg-slate-50 border border-slate-100 text-slate-500 px-2 py-0.5 rounded"
                    >
                      {s}
                    </span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
