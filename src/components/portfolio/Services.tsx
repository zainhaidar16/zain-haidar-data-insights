import { motion } from "framer-motion";
import { BarChart2, Search, RefreshCw, Code2, ArrowRight } from "lucide-react";

const services = [
  {
    icon: BarChart2,
    title: "Power BI Dashboards",
    description: "Interactive dashboards for KPIs, sales, finance, operations, and business reporting. Built with advanced DAX, Power Query, and row-level security.",
    tags: ["Power BI", "DAX", "KPI Design", "RLS"],
  },
  {
    icon: Search,
    title: "Data Analysis & Reporting",
    description: "SQL and Python-based analysis to find trends, patterns, and actionable business insights. Structured reports your team can actually use.",
    tags: ["SQL", "Python", "Pandas", "Reporting"],
  },
  {
    icon: RefreshCw,
    title: "ETL & Data Cleaning",
    description: "Clean, transform, and automate messy datasets into reliable reporting-ready data. Build pipelines that run without manual intervention.",
    tags: ["ETL", "Python", "Azure", "Automation"],
  },
  {
    icon: Code2,
    title: "Analytics Web Solutions",
    description: "Data-driven web apps and dashboards using Python, REST APIs, Django, Flask, and modern frontend tools. End-to-end analytics products.",
    tags: ["Python", "Flask", "REST APIs", "Full Stack"],
  },
];

export function Services() {
  return (
    <section id="services" className="py-24 bg-white">
      <div className="section-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">What I Offer</p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight max-w-md">
              Services I Provide
            </h2>
            <a
              href="#contact"
              onClick={(e) => { e.preventDefault(); document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" }); }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Discuss your project <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        {/* Service cards grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {services.map((service, i) => {
            const Icon = service.icon;
            return (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="card-pro p-7 group"
              >
                <div className="h-11 w-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors duration-200">
                  <Icon className="h-5 w-5 text-blue-600 group-hover:text-white transition-colors duration-200" />
                </div>
                <h3 className="font-bold text-[#0F172A] text-[17px] mb-2.5">{service.title}</h3>
                <p className="text-sm text-slate-500 leading-relaxed mb-5">{service.description}</p>
                <div className="flex flex-wrap gap-2">
                  {service.tags.map((tag) => (
                    <span key={tag} className="badge-navy">{tag}</span>
                  ))}
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
