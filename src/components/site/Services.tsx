import { motion } from "framer-motion";
import { ArrowUpRight, BarChart3, Brain, Database, GitBranch, LineChart, Workflow, Globe2, Gauge, Sparkles } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const services = [
  { icon: BarChart3, title: "Power BI Dashboards", desc: "Executive, sales, ops & finance dashboards with strong DAX foundations." },
  { icon: Brain, title: "AI Analytics Solutions", desc: "LLM-assisted reporting, anomaly detection and intelligent forecasting." },
  { icon: Database, title: "ETL Pipelines", desc: "Reliable batch & streaming pipelines on Azure, AWS, Snowflake & dbt." },
  { icon: LineChart, title: "Forecasting & KPI Systems", desc: "Demand, revenue and churn models with monitored business KPIs." },
  { icon: Workflow, title: "Reporting Automation", desc: "From manual Excel to one-click automated weekly briefings." },
  { icon: Gauge, title: "BI Consulting", desc: "Strategy, data modeling and stakeholder enablement for analytics teams." },
  { icon: GitBranch, title: "SQL & Python Analytics", desc: "Deep custom analysis, statistical modeling and notebooks." },
  { icon: Globe2, title: "Analytics Web Integrations", desc: "Embedded dashboards and analytics-driven web experiences." },
  { icon: Sparkles, title: "Data Visualization", desc: "Story-led visuals that turn dashboards into decisions." },
];

export function Services() {
  return (
    <section id="services" className="relative py-32 bg-secondary">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          kicker="Service"
          title="What I help with"
          intro="Enterprise-grade analytics services delivered with the focus of a senior consultant and the speed of a freelancer."
        />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
          {services.map((s, i) => (
            <motion.div
              key={s.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="group relative rounded-2xl glass-strong p-6 lg:p-8 hover:border-primary/40 transition-all overflow-hidden"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative flex items-start justify-between">
                <div className="h-11 w-11 rounded-xl bg-gradient-primary grid place-items-center shadow-glow">
                  <s.icon className="h-5 w-5 text-primary-foreground" />
                </div>
                <ArrowUpRight className="h-5 w-5 text-muted-foreground opacity-0 group-hover:opacity-100 -translate-y-1 group-hover:translate-y-0 transition-all" />
              </div>
              <h3 className="relative mt-6 text-xl font-semibold">{s.title}</h3>
              <p className="relative mt-2 text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
