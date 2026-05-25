import { motion } from "framer-motion";
import { Calendar, Briefcase, MapPin, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const EASE = [0.25, 0.1, 0.25, 1] as const;

interface ExperienceItem {
  id: string;
  title: string;
  company: string;
  location: string;
  start_year: string;
  end_year?: string;
  is_current: boolean;
  tagline: string;
  highlights: string[];
}

const experiences: ExperienceItem[] = [
  {
    id: "lead-analyst",
    title: "Lead Data Analyst & BI Specialist",
    company: "Freelance & Consulting",
    location: "Vienna, Austria (Remote)",
    start_year: "2023",
    is_current: true,
    tagline: "Helping companies automate operational reporting and extract revenue-driving insights.",
    highlights: [
      "Designed and deployed 25+ automated Power BI dashboards, reducing reporting time by 40%.",
      "Built clean, repeatable SQL and Python ETL pipelines that consolidated marketing data.",
      "Coached non-technical stakeholder teams on self-service querying and metric tracking."
    ]
  },
  {
    id: "etl-specialist",
    title: "Data Analyst & ETL Specialist",
    company: "Corporate Contractor",
    location: "Vienna, Austria",
    start_year: "2021",
    end_year: "2023",
    is_current: false,
    tagline: "Centralized multi-channel customer data to identify high-value operational opportunities.",
    highlights: [
      "Delivered predictive customer segmentation insights that increased campaign ROI by 15%.",
      "Built robust automated SSIS workflows loading millions of records into Snowflake.",
      "Unified siloed performance metrics across three major sales departments."
    ]
  },
  {
    id: "junior-engineer",
    title: "Junior Data Engineer",
    company: "DataTech Solutions",
    location: "Vienna, Austria",
    start_year: "2019",
    end_year: "2021",
    is_current: false,
    tagline: "Optimized database reliability and orchestration for critical business infrastructure.",
    highlights: [
      "Increased ETL database sync reliability from 82% to 99.7% using Apache Airflow.",
      "Optimized slow-running analytical SQL queries, improving overall execution speeds by 35%.",
      "Containerized local database testing workflows using Docker to eliminate sync errors."
    ]
  }
];

export function Experience() {
  return (
    <section id="experience" className="py-24 bg-white border-t border-slate-100">
      <div className="section-container max-w-[1000px] mx-auto px-5 sm:px-8">
        
        {/* Section Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-16 max-w-3xl"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
            Career
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight mb-4">
            Professional Experience
          </h2>
          <p className="text-slate-500 text-[15px] leading-[1.8] font-medium">
            Over five years of experience partnering with teams to automate reports, build robust ETL pipelines, and deliver high-impact analytics solutions.
          </p>
        </motion.div>

        {/* TIMELINE SECTION */}
        <div className="relative">
          {/* Vertical Central Line */}
          <div className="absolute left-6 top-4 bottom-4 w-px bg-slate-200" />

          <div className="space-y-12">
            {experiences.map((exp, i) => {
              const isCurrent = exp.is_current;
              const periodText = isCurrent 
                ? `${exp.start_year} – Present` 
                : `${exp.start_year} – ${exp.end_year || ""}`;

              return (
                <motion.div
                  key={exp.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.5, delay: i * 0.1, ease: EASE }}
                  className="relative pl-12 sm:pl-16"
                >
                  
                  {/* Timeline node dot */}
                  <div className="absolute left-6 top-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center z-10 flex">
                    <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center shadow-xs ${
                      isCurrent
                        ? "bg-blue-600 border-blue-600 text-white shadow-blue-500/25"
                        : "bg-white border-slate-350 text-slate-400"
                    }`}>
                      <Briefcase className="h-3.5 w-3.5" />
                    </div>
                  </div>

                  {/* Card Container */}
                  <div className="bg-white border border-slate-250/70 hover:border-blue-400 rounded-2xl p-6 shadow-xs hover:shadow-md transition-all duration-300">
                    
                    {/* Job Title & Date Row */}
                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4 pb-4 border-b border-slate-100">
                      <div>
                        <div className="flex flex-wrap items-center gap-2 mb-1.5">
                          <h3 className="text-base sm:text-lg font-bold text-[#0F172A]">
                            {exp.title}
                          </h3>
                          {isCurrent && (
                            <span className="inline-flex items-center text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-250">
                              Current
                            </span>
                          )}
                        </div>
                        
                        <div className="text-[13px] font-semibold text-blue-600 flex flex-wrap items-center gap-x-2">
                          <span>{exp.company}</span>
                          <span className="text-slate-300 font-normal">•</span>
                          <span className="text-slate-450 text-[11px] font-medium flex items-center gap-0.5">
                            <MapPin className="h-3 w-3 inline text-slate-400 shrink-0" />
                            {exp.location}
                          </span>
                        </div>
                      </div>

                      {/* Date Tag */}
                      <div className="flex items-center gap-2 text-[11px] font-semibold text-slate-500 bg-slate-50 border border-slate-200 px-3 py-1 rounded-full shrink-0 h-fit w-fit font-mono">
                        <Calendar className="h-3 w-3 text-slate-400" />
                        <span>{periodText}</span>
                      </div>
                    </div>

                    {/* Tagline */}
                    <p className="text-slate-700 text-xs sm:text-[13px] leading-relaxed mb-4 font-semibold">
                      {exp.tagline}
                    </p>

                    {/* Key Highlights */}
                    <ul className="space-y-2">
                      {exp.highlights.map((highlight, idx) => (
                        <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-500 leading-relaxed font-semibold">
                          <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                          <span>{highlight}</span>
                        </li>
                      ))}
                    </ul>

                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>

        {/* View Details Link */}
        <div className="mt-12 text-center">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold text-blue-600 hover:text-blue-800 transition-colors group cursor-pointer"
          >
            <span>View full problem-solution breakdowns on my About page</span>
            <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
