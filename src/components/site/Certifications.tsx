import { motion } from "framer-motion";
import { Award, Cpu, Shield, Database, GraduationCap } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const certs = [
  { t: "Databricks Associate Developer", p: "Apache Spark Data Processing", icon: Database },
  { t: "Databricks Lakehouse Fundamentals", p: "Unified Lakehouse Architecture", icon: Database },
  { t: "GitHub Foundations", p: "Git & Collaborative Workflows", icon: GraduationCap },
  { t: "Vector Databases Professional", p: "AI Search & Retrieval Systems", icon: Cpu },
  { t: "Machine Learning Masterclass", p: "Predictive Statistical Analysis", icon: Cpu },
  { t: "Data Analysis & Engineering", p: "High-Performance Data Architecture", icon: Shield },
  { t: "Enterprise Data Visualization", p: "Executive-grade UI Dashboards", icon: Award },
];

export function Certifications() {
  return (
    <section id="certifications" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeader kicker="Credentials" title="Accreditations &amp; Specializations" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 mt-12">
          {certs.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.t}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.5, delay: i * 0.04 }}
                className="glass p-5 rounded-2xl flex items-start gap-4 hover:border-accent/35 transition-all duration-300 group"
              >
                <div className="h-10 w-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center shrink-0 text-accent group-hover:scale-110 transition-transform duration-300">
                  <Icon className="h-5 w-5" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold leading-snug text-foreground group-hover:text-accent transition-colors duration-300">{c.t}</div>
                  <div className="text-[11px] text-muted-foreground font-mono mt-1 uppercase tracking-wider">{c.p}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
