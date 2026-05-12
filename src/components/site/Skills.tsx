import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const groups = [
  { title: "Data Analytics & BI", items: ["Power BI", "Tableau", "Looker", "DAX", "Excel"] },
  { title: "Programming & Databases", items: ["Python", "SQL", "PostgreSQL", "T-SQL", "MongoDB"] },
  { title: "Data Engineering & Cloud", items: ["Databricks", "Snowflake", "Azure", "AWS", "GCP", "dbt", "Airflow"] },
  { title: "AI & Advanced Analytics", items: ["Machine Learning", "NLP", "Generative AI", "Forecasting", "PyTorch"] },
  { title: "Web & Automation", items: ["Docker", "CI/CD", "FastAPI", "Next.js", "Vibe Coding"] },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-32 bg-secondary">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader kicker="Skills" title="A modern analytics toolbox" />

        <div className="grid lg:grid-cols-5 md:grid-cols-2 gap-4">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.05 }}
              className="rounded-2xl glass-strong p-6 hover:border-primary/40 transition"
            >
              <div className="text-xs uppercase tracking-widest text-primary mb-4">/ 0{i + 1}</div>
              <h3 className="text-lg font-semibold mb-5">{g.title}</h3>
              <ul className="space-y-2">
                {g.items.map((it) => (
                  <li key={it} className="flex items-center justify-between text-sm text-muted-foreground border-b border-black/5 pb-2 last:border-0">
                    <span>{it}</span>
                    <span className="font-mono text-primary/70 text-xs">●</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
