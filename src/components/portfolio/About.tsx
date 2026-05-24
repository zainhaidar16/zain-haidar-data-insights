import { motion } from "framer-motion";
import { GraduationCap, Briefcase, BarChart2, CheckCircle2 } from "lucide-react";

const highlights = [
  { icon: BarChart2, label: "20+ Dashboards Built", desc: "Delivered across retail, finance, healthcare, and SaaS" },
  { icon: GraduationCap, label: "MS Computer Science", desc: "University of Vienna — Machine Learning & Databases" },
  { icon: Briefcase, label: "5+ Years Experience", desc: "Analytics, BI development, and software engineering" },
];

const strengths = [
  "Power BI dashboards with complex DAX and RLS",
  "SQL and Python-based data analysis",
  "ETL pipelines and reporting automation",
  "Customer segmentation and trend forecasting",
  "End-to-end data engineering on Azure",
];

export function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-14 items-center">

          {/* Left — Text */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">About Me</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight mb-5">
              Turning complex data into <span className="text-blue-600">clear decisions</span>
            </h2>
            <div className="space-y-4 text-[15px] text-slate-500 leading-relaxed mb-8">
              <p>
                I am a <span className="font-semibold text-slate-700">Data Analyst and BI Developer</span> with experience in Power BI dashboards, SQL analysis, Python automation, ETL pipelines, and business reporting. I combine data analytics with software engineering to build practical, end-to-end solutions.
              </p>
              <p>
                Currently completing my <span className="font-semibold text-slate-700">Master's in Computer Science at the University of Vienna</span>, I specialize in making data accessible, reliable, and actionable for business teams.
              </p>
            </div>

            {/* Strengths checklist */}
            <ul className="space-y-2.5">
              {strengths.map((item) => (
                <li key={item} className="flex items-start gap-2.5 text-sm text-slate-600">
                  <CheckCircle2 className="h-4.5 w-4.5 text-blue-600 mt-0.5 shrink-0" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </motion.div>

          {/* Right — Highlight Cards */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: "easeOut" }}
            className="space-y-4"
          >
            {/* Industry exposure strip */}
            <div className="card-pro p-5 mb-2">
              <p className="text-xs font-semibold text-slate-400 uppercase tracking-widest mb-3">Industry Experience</p>
              <div className="flex flex-wrap gap-2">
                {["Retail", "Finance", "Healthcare", "SaaS", "E-commerce", "Customer Intelligence"].map((ind) => (
                  <span key={ind} className="badge-blue">{ind}</span>
                ))}
              </div>
            </div>

            {highlights.map((h, i) => (
              <motion.div
                key={h.label}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: "easeOut" }}
                className="card-pro p-5 flex items-start gap-4"
              >
                <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0">
                  <h.icon className="h-5 w-5 text-blue-600" />
                </div>
                <div>
                  <div className="font-semibold text-[#0F172A] text-[15px]">{h.label}</div>
                  <div className="text-sm text-slate-400 mt-0.5">{h.desc}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
