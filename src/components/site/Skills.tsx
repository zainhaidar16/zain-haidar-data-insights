import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { Database, LineChart, Cpu, ShieldAlert, BarChart2, Workflow } from "lucide-react";

const capabilities = [
  {
    icon: BarChart2,
    title: "Microsoft Power BI",
    description: "Designing complex tabular models, conformed star schemas, and row-level security (RLS). Advanced DAX measure scripting, query folding optimization, and tabular workspace governance.",
    stack: ["DAX", "Power Query", "Tabular Editor", "RLS/OLS", "Fabric"]
  },
  {
    icon: LineChart,
    title: "Tableau BI Platforms",
    description: "Developing highly interactive Tableau dashboards. Engineering custom LOD (Level of Detail) expressions, complex parameters, and cross-source database joins for operational stakeholders.",
    stack: ["Tableau Desktop", "Tableau Server", "LOD Calcs", "Sets/Parameters"]
  },
  {
    icon: Workflow,
    title: "Looker Studio & BigQuery",
    description: "Architecting self-service reporting layers on GCP. Linking Looker Studio dashboards to scalable BigQuery datasets and setting up automated scheduled ingestion layers.",
    stack: ["Looker Studio", "BigQuery", "SQL Queries", "GCP Connector", "Filters"]
  },
  {
    icon: Database,
    title: "SQL & Data Engineering",
    description: "Writing complex relational database logic, store procedures, and mart marts using T-SQL. Deploying automated dbt data transformation layers and ADF orchestrations.",
    stack: ["dbt Core", "SQL Server", "ADF Ingestion", "Stored Procs"]
  },
  {
    icon: Cpu,
    title: "Python Data Analysis",
    description: "Performing advanced statistical data analysis, regression forecasting, and machine-learning anomaly detections. Deploying Pandas analytics models directly inside dashboards.",
    stack: ["Pandas", "Scikit-Learn", "Jupyter", "Databricks", "MLflow"]
  },
  {
    icon: ShieldAlert,
    title: "Governance & Security",
    description: "Establishing robust workspace credentials, gateway server mappings, data lineage configurations, and dashboard access audits to secure critical business operational records.",
    stack: ["Gateways", "Fabric Admins", "Tenant Governance", "Audit Logs"]
  }
];

export function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32 bg-secondary/35 overflow-hidden border-y border-white/5">
      <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-glow/5 blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeader
          kicker="Capabilities"
          title="Modern BI &amp; Data Engineering"
          intro="Deep specialization in building performant dashboard control centers and the underlying data pipelines supporting them."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {capabilities.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.05 }}
                className="glass p-8 rounded-2xl relative overflow-hidden group glass-hover"
              >
                {/* Subtle top indicator bar */}
                <div className="absolute top-0 inset-x-0 h-[2px] bg-gradient-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon Circle */}
                <div className="h-12 w-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent mb-6 shadow-card group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="font-serif-display text-[22px] font-bold mb-3 text-foreground group-hover:text-accent transition-colors">
                  {c.title}
                </h3>
                
                <p className="text-sm text-muted-foreground leading-relaxed mb-6 h-[100px] overflow-hidden line-clamp-4">
                  {c.description}
                </p>

                {/* Sub stack tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-white/5">
                  {c.stack.map((s) => (
                    <span
                      key={s}
                      className="text-[10px] font-mono tracking-wider uppercase bg-white/5 border border-white/5 text-muted-foreground px-2.5 py-1 rounded"
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
