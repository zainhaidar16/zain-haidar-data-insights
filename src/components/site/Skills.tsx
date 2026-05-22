import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";
import { Database, TrendingUp, ShieldAlert, Cpu, BarChart3, Workflow } from "lucide-react";

const capabilities = [
  {
    icon: BarChart3,
    title: "Advanced Power BI & DAX",
    description: "Architecting high-performance semantic models and composite schemas. Crafting optimized, scalable DAX measures to resolve complex time-intelligence, cohort, and financial calculation challenges.",
    stack: ["Desktop", "Service", "XMLA Endpoints", "RLS/OLS", "DAX Studio"]
  },
  {
    icon: Database,
    title: "Enterprise Data Modeling",
    description: "Designing Kimball star schemas, conformed dimensions, and robust data marts. We structure relational databases from transactional chaos to high-performance analytics engines.",
    stack: ["Star Schema", "SQL Server", "Kimball Method", "Data Marts", "T-SQL"]
  },
  {
    icon: Workflow,
    title: "ETL & Analytics Engineering",
    description: "Engineering clean, tested transformation layers using dbt. Orchestrating secure multi-source pipelines via Azure Data Factory and automating warehouse updates end-to-end.",
    stack: ["dbt Core", "ADF", "Microsoft Fabric", "Git / CI-CD", "Fivetran"]
  },
  {
    icon: Cpu,
    title: "AI Integration & ML Analytics",
    description: "Infusing forecasting models and natural language insight generation directly inside executive screens. Deploying Python-based machine learning pipelines within modern data architectures.",
    stack: ["Python", "OpenAI API", "Databricks", "MLflow", "Pandas"]
  },
  {
    icon: TrendingUp,
    title: "Executive KPI Platforms",
    description: "Designing tailored business control rooms with fluid responsive layouts and robust accessibility standards. Retiring fragmented spreadsheet clusters into a single source of truth.",
    stack: ["Tableau", "Semantic Layers", "Figma Design", "Dashboard Audits"]
  },
  {
    icon: ShieldAlert,
    title: "Security & Governance",
    description: "Configuring robust user permissions, row-level security (RLS) policies, workspace gateways, and corporate tenant guardrails to protect critical financial and operational records.",
    stack: ["Row-Level Security", "Gateway Ops", "Fabric Admin", "Tenant Governance"]
  }
];

export function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32 bg-secondary/35 overflow-hidden">
      <div className="absolute top-1/2 -right-40 w-96 h-96 rounded-full bg-glow/5 blur-[140px] pointer-events-none" />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeader
          kicker="Capabilities"
          title="Enterprise-Grade Analytics Services"
          intro="We bridge the gap between raw, messy business databases and high-impact executive decision-making. Here is a mapping of our technical expertise."
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
                {/* Glowing subtle top border on hover */}
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
                      className="text-[10px] font-mono tracking-wider uppercase bg-white/5 border border-white/5 text-muted-foreground px-2 py-1 rounded"
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
