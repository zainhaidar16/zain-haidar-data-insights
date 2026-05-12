import { motion } from "framer-motion";
import { Award } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const certs = [
  { t: "Databricks Associate Developer", p: "Apache Spark" },
  { t: "Databricks Lakehouse Fundamentals", p: "Databricks" },
  { t: "GitHub Foundations", p: "GitHub" },
  { t: "Vector Databases Professional", p: "Activeloop" },
  { t: "Machine Learning", p: "Kaggle" },
  { t: "Data Analysis with Python", p: "freeCodeCamp" },
  { t: "Data Visualization", p: "Kaggle" },
];

export function Certifications() {
  return (
    <section id="certifications" className="relative py-32 bg-secondary">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader kicker="Certifications" title="Continuously levelling up" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {certs.map((c, i) => (
            <motion.div
              key={c.t}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="glass-strong rounded-2xl p-5 flex items-center gap-4 hover:border-primary/40 transition"
            >
              <div className="h-10 w-10 rounded-lg bg-gradient-primary grid place-items-center shrink-0">
                <Award className="h-5 w-5 text-primary-foreground" />
              </div>
              <div className="min-w-0">
                <div className="font-medium truncate">{c.t}</div>
                <div className="text-xs text-muted-foreground">{c.p}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
