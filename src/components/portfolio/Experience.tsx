import { motion } from "framer-motion";
import { Circle } from "lucide-react";

const experiences = [
  {
    role: "Data Analyst (Freelance)",
    company: "Self-Employed",
    location: "Vienna, Austria",
    period: "2023 — Present",
    type: "current",
    bullets: [
      "Built Power BI dashboards for 10+ clients across retail, finance, and healthcare.",
      "Designed customer segmentation models improving campaign ROI by 15%.",
      "Automated Excel and SQL reporting workflows, reducing manual effort by 30%.",
      "Delivered data-backed market entry analysis for a DACH region SaaS company.",
    ],
  },
  {
    role: "Database Development Internship",
    company: "Netpiloten Web Solutions GmbH",
    location: "Vienna, Austria",
    period: "2022 — 2023",
    type: "past",
    bullets: [
      "Designed and maintained relational databases for client projects.",
      "Built SQL queries and stored procedures to support business reporting.",
      "Worked in Agile sprints alongside backend and frontend development teams.",
    ],
  },
  {
    role: "Freelance Software Developer",
    company: "Self-Employed",
    location: "Pakistan / Remote",
    period: "2017 — 2022",
    type: "past",
    bullets: [
      "Developed full-stack web applications using Django, Flask, and PostgreSQL.",
      "Built REST APIs for data-heavy applications serving 10K+ users.",
      "Handled Upwork clients across e-commerce, SaaS, and data analytics verticals.",
    ],
  },
];

export function Experience() {
  return (
    <section id="experience" className="py-24 bg-white">
      <div className="section-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">Career</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight">Work Experience</h2>
        </motion.div>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-4 sm:left-6 top-2 bottom-2 w-px bg-slate-200 hidden sm:block" />

          <div className="space-y-8">
            {experiences.map((exp, i) => (
              <motion.div
                key={exp.role}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="relative sm:pl-16"
              >
                {/* Timeline dot */}
                <div className="hidden sm:flex absolute left-4 top-5 -translate-x-1/2 items-center justify-center">
                  <div className={`h-4 w-4 rounded-full border-2 ${exp.type === "current" ? "bg-blue-600 border-blue-600 shadow-blue-pro" : "bg-white border-slate-300"}`} />
                </div>

                {/* Card */}
                <div className="card-pro p-6">
                  <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-4">
                    <div>
                      <div className="flex items-center gap-2.5 mb-1">
                        <h3 className="font-bold text-[#0F172A] text-[16px] leading-snug">{exp.role}</h3>
                        {exp.type === "current" && (
                          <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200">
                            Current
                          </span>
                        )}
                      </div>
                      <div className="text-sm font-semibold text-blue-600">{exp.company}</div>
                      <div className="text-xs text-slate-400 mt-0.5">{exp.location}</div>
                    </div>
                    <span className="text-xs font-medium text-slate-400 bg-slate-50 px-3 py-1 rounded-full border border-slate-100 shrink-0 h-fit">
                      {exp.period}
                    </span>
                  </div>

                  <ul className="space-y-2">
                    {exp.bullets.map((bullet) => (
                      <li key={bullet} className="flex items-start gap-2.5 text-sm text-slate-500">
                        <span className="h-1.5 w-1.5 rounded-full bg-blue-400 mt-1.5 shrink-0" />
                        {bullet}
                      </li>
                    ))}
                  </ul>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
