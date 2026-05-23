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
    <section id="certifications" className="relative py-20 md:py-24 border-b border-slate-100">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-6">
        <SectionHeader kicker="Credentials" title="Accreditations &amp; Specializations" />

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-3 mt-10">
          {certs.map((c, i) => {
            const Icon = c.icon;
            return (
              <motion.div
                key={c.t}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.04 }}
                className="border border-slate-200 bg-white p-4 rounded flex items-start gap-4 hover:border-slate-300 transition shadow-sm"
              >
                <div className="h-8 w-8 rounded bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 text-slate-700">
                  <Icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="font-semibold leading-snug text-slate-800 text-[14px]">{c.t}</div>
                  <div className="text-[10px] text-slate-400 font-mono mt-1 uppercase tracking-wider">{c.p}</div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
