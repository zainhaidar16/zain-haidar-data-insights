import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { Database, LineChart, Cpu, ShieldAlert, BarChart2, Workflow } from "lucide-react";

const capabilities = [
  {
    icon: BarChart2,
    title: "Microsoft Power BI",
    description: "Creating easy-to-read reports and dashboards. I make sure your data updates automatically, runs fast, and is secure so only the right people can see specific numbers.",
    stack: ["PL-300", "DAX", "Power Query", "Row Level Security", "Fabric"]
  },
  {
    icon: LineChart,
    title: "Tableau BI Platforms",
    description: "Building interactive Tableau dashboards. I write the custom calculations and set up filters so you can click around and explore your sales, customers, and operations.",
    stack: ["Tableau Desktop", "Tableau Server", "LOD Calcs", "Interactive Filters"]
  },
  {
    icon: Workflow,
    title: "Looker Studio & BigQuery",
    description: "Setting up simple reports using Google Looker Studio connected to Google BigQuery. Great for teams who want quick daily reports without paying for expensive software licenses.",
    stack: ["Looker Studio", "BigQuery", "SQL Queries", "GCP Connectors"]
  },
  {
    icon: Database,
    title: "SQL & Data Cleaning",
    description: "Organizing your messy data into clean tables. I write SQL code and database pipelines to combine all your spreadsheets and systems into one clean, reliable database.",
    stack: ["SQL Server", "Data Marts", "dbt Core", "Data Pipelines"]
  },
  {
    icon: Cpu,
    title: "Python for Automation",
    description: "Using Python scripts to clean messy spreadsheets, predict future trends, and automate repetitive data tasks so you don't have to do them manually.",
    stack: ["Python", "Pandas", "Data Automation", "Predictive Analytics"]
  },
  {
    icon: ShieldAlert,
    title: "Admin & User Access",
    description: "Managing your reporting workspaces and access controls. I make sure the data gateways are connected properly and help you organize who has access to which reports.",
    stack: ["Workspaces", "Gateways", "User Access", "Data Auditing"]
  }
];

export function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32 bg-secondary/5 overflow-hidden border-y border-border/80">
      <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-primary/5 blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeader
          kicker="My Skills"
          title="How I can help you"
          intro="I organize your messy data and build simple, clear dashboards so you can easily understand your business numbers."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mt-12">
          {capabilities.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.title}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.05 }}
                className="glass p-8 rounded-2xl relative overflow-hidden group glass-hover shadow-elegant border border-border"
              >
                {/* Subtle top indicator bar */}
                <div className="absolute top-0 inset-x-0 h-[2.5px] bg-accent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                
                {/* Icon Box */}
                <div className="h-11 w-11 rounded-xl bg-white/5 border border-border flex items-center justify-center text-accent mb-6 transition-transform duration-300 group-hover:scale-105">
                  <Icon className="h-5 w-5" />
                </div>

                <h3 className="font-serif-display text-[20px] font-bold mb-3 text-foreground group-hover:text-accent transition-colors">
                  {c.title}
                </h3>
                
                <p className="text-xs text-muted-foreground leading-relaxed mb-6 h-[90px] overflow-hidden line-clamp-4">
                  {c.description}
                </p>

                {/* Sub stack conformed monospace tags */}
                <div className="flex flex-wrap gap-2 pt-4 border-t border-border/40 font-mono text-[9px] tracking-wider text-muted-foreground uppercase">
                  {c.stack.map((s) => (
                    <span key={s} className="border border-border/60 rounded px-2 py-0.5 bg-black/40">
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
