import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { SectionHeader } from "./SectionHeader";
import powerbi from "@/assets/project-powerbi.jpg";
import ai from "@/assets/project-ai.jpg";
import etl from "@/assets/project-etl.jpg";
import customer from "@/assets/project-customer.jpg";

const projects = [
  {
    img: powerbi,
    tag: "Power BI · Retail",
    title: "Executive KPI Dashboard for Multi-Brand Retailer",
    impact: "+18% margin visibility · 120 stores",
    stack: ["Power BI", "SQL", "DAX", "Azure"],
  },
  {
    img: ai,
    tag: "AI Analytics · Healthcare",
    title: "Patient Demand Forecasting with LLM Insights",
    impact: "92% MAPE accuracy · automated weekly briefings",
    stack: ["Python", "PyTorch", "OpenAI", "Databricks"],
  },
  {
    img: etl,
    tag: "Data Engineering · Finance",
    title: "ETL Pipeline & Lakehouse Modernization",
    impact: "8h → 12min refresh · single source of truth",
    stack: ["Snowflake", "dbt", "Airflow", "Python"],
  },
  {
    img: customer,
    tag: "Customer Analytics · SaaS",
    title: "Cohort, Retention & LTV Analytics Platform",
    impact: "−24% churn · 4 segments activated",
    stack: ["SQL", "Python", "Tableau", "GCP"],
  },
];

export function Work() {
  return (
    <section id="work" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          kicker="Portfolio"
          title="Selected Work"
          intro="A glimpse of dashboards, pipelines and AI analytics shipped across retail, finance and healthcare."
        />

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((p, i) => (
            <motion.a
              key={p.title}
              href="#contact"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
              className="group relative rounded-3xl glass-strong overflow-hidden hover:shadow-glow transition-all duration-500"
            >
              <div className="relative aspect-[16/10] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  width={1280}
                  height={800}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-[11px] uppercase tracking-widest">
                  {p.tag}
                </div>
                <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-foreground text-background grid place-items-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                  <ArrowUpRight className="h-4 w-4" />
                </div>
              </div>
              <div className="p-6 lg:p-8">
                <h3 className="text-xl lg:text-2xl font-semibold leading-tight">{p.title}</h3>
                <div className="mt-2 text-sm text-primary/90 font-mono">{p.impact}</div>
                <div className="mt-5 flex flex-wrap gap-2">
                  {p.stack.map((s) => (
                    <span key={s} className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
            </motion.a>
          ))}
        </div>
      </div>
    </section>
  );
}
