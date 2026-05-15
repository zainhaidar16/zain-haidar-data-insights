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
    <section id="certifications" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeader kicker="Certifications" title="Continuously levelling up." />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3">
          {certs.map((c, i) => (
            <motion.div
              key={c.t}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: i * 0.04 }}
              className="border border-border rounded-md p-5 flex items-start gap-4 bg-card"
            >
              <div className="h-9 w-9 rounded-md border border-border grid place-items-center shrink-0 text-accent">
                <Award className="h-4 w-4" />
              </div>
              <div className="min-w-0">
                <div className="font-medium leading-snug">{c.t}</div>
                <div className="text-xs text-muted-foreground mt-1">{c.p}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
