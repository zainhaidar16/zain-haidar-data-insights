import { motion } from "framer-motion";
import { Award, Cpu, Shield, Database, GraduationCap } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const certs = [
  { t: "PL-300: Power BI Data Analyst", p: "Official Microsoft Certificate", icon: Award },
  { t: "Tableau Desktop Professional", p: "Advanced Dashboard Certificate", icon: Award },
  { t: "GCP: Professional Data Engineer", p: "Official Google Cloud Certificate", icon: Database },
  { t: "DP-203: Azure Data Engineer", p: "Official Microsoft Certificate", icon: Shield },
  { t: "dbt Certified Analytics Engineer", p: "Official dbt Labs Certificate", icon: Database },
  { t: "Databricks Associate Developer", p: "Official Databricks Certificate", icon: Cpu },
  { t: "Databricks Lakehouse Fundamentals", p: "Databricks Foundation Certificate", icon: GraduationCap },
];

export function Certifications() {
  return (
    <section id="certifications" className="relative py-20 md:py-24 border-b border-border">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeader kicker="Credentials" title="My official qualifications" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3.5 mt-10">
          {certs.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.t}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="border border-border bg-[#0e1320]/40 p-4 rounded-xl flex items-start gap-4 hover:border-accent/40 hover:bg-[#0e1320]/60 transition shadow-elegant group"
              >
                <div className="h-8.5 w-8.5 rounded-lg bg-white/5 border border-border flex items-center justify-center shrink-0 text-accent group-hover:scale-105 transition-transform duration-300">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold leading-snug text-foreground text-[14px]">{c.t}</div>
                  <div className="text-[10px] text-muted-foreground font-mono mt-1.5 uppercase tracking-wider font-medium">{c.p}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
