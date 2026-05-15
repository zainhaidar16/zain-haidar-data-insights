import { motion } from "framer-motion";
import { SectionHeader } from "./SectionHeader";

const groups = [
  {
    title: "Expert",
    note: "Day-to-day, production",
    items: ["Power BI (Desktop & Service)", "DAX", "SQL (T-SQL)", "Excel · Power Query", "Data modeling (star schema)"],
  },
  {
    title: "Proficient",
    note: "Comfortable shipping",
    items: ["Azure Data Factory", "Microsoft Fabric", "Python · pandas", "dbt", "Git · CI/CD"],
  },
  {
    title: "Familiar",
    note: "Used in projects, learning more",
    items: ["Snowflake", "Databricks", "Tableau", "Airflow", "PowerShell"],
  },
];

export function Skills() {
  return (
    <section id="skills" className="relative py-24 md:py-32 bg-secondary">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeader
          kicker="Skills"
          title="An honest map of what I do."
          intro="Three buckets, no badges. If it's in &lsquo;Expert&rsquo;, I can lead the work end-to-end. If it&rsquo;s in &lsquo;Familiar&rsquo;, I&rsquo;ve shipped it but I&rsquo;m still levelling up."
        />

        <div className="grid md:grid-cols-3 gap-6 md:gap-10">
          {groups.map((g, i) => (
            <motion.div
              key={g.title}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.06 }}
              className="border-t border-foreground/40 pt-6"
            >
              <div className="flex items-baseline justify-between mb-1">
                <h3 className="font-serif-display text-2xl">{g.title}</h3>
                <span className="font-mono text-[11px] uppercase tracking-wider text-muted-foreground">
                  0{i + 1}
                </span>
              </div>
              <p className="text-xs text-muted-foreground mb-5">{g.note}</p>
              <ul className="space-y-2.5">
                {g.items.map((it) => (
                  <li key={it} className="text-[15px] flex items-start gap-2">
                    <span className="text-accent mt-2 h-1 w-1 rounded-full bg-accent shrink-0" />
                    <span>{it}</span>
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
