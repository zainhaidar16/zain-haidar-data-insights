import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { getCertifications } from "@/lib/api";
import { Certification } from "@/lib/api";
import { Loader2, Briefcase, Database, Award, ExternalLink, CalendarRange, MapPin, Target, ShieldCheck, Zap, HeartHandshake, HelpCircle, CheckCircle2, Laptop } from "lucide-react";
import { BarChart3, Code2, Cpu } from "lucide-react";
import { motion } from "framer-motion";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Zain Haidar — Data Analyst & BI Specialist" },
      { name: "description", content: "Learn about Zain Haidar's professional journey, core mission, and data analytics expertise. Experienced in Power BI, SQL pipelines, and custom BI solutions." },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: Target,
    title: "Business-First Analytics",
    desc: "Data is only as valuable as the decisions it enables. I focus on core business outcomes and stakeholder objectives, not just writing code.",
    color: "text-blue-600 bg-blue-50 border-blue-100"
  },
  {
    icon: Zap,
    title: "Clarity & Simplicity",
    desc: "I believe in making insights intuitive and highly accessible. A premium dashboard shouldn't need a manual — it should speak for itself.",
    color: "text-violet-600 bg-violet-50 border-violet-100"
  },
  {
    icon: ShieldCheck,
    title: "Robust Engineering",
    desc: "Building ETL processes and databases that are modular, documented, version-controlled, and fully optimized for long-term scalability.",
    color: "text-emerald-600 bg-emerald-50 border-emerald-100"
  },
  {
    icon: HeartHandshake,
    title: "Collaborative Ownership",
    desc: "Working hand-in-hand with business users, product managers, and engineering teams to ensure our data tools are actively adopted and trusted.",
    color: "text-amber-600 bg-amber-50 border-amber-150"
  }
];

interface CapabilityItem {
  name: string;
  context: string;
}

interface CapabilityGroup {
  category: string;
  icon: any;
  iconColorClass: string;
  items: CapabilityItem[];
}

const capabilityGroups: CapabilityGroup[] = [
  {
    category: "Business Intelligence",
    icon: BarChart3,
    iconColorClass: "text-blue-600 bg-blue-50 border-blue-100",
    items: [
      { name: "Power BI", context: "Built automated dashboards for retail, operations, and finance clients to enable self-service querying." },
      { name: "Tableau", context: "Designed interactive drill-down reports to track operational pipelines and performance metrics." },
      { name: "Looker Studio", context: "Created customized Google Analytics dashboards to help ecommerce clients monitor web performance." },
      { name: "DAX & Power Query", context: "Wrote complex business calculations and structured data transformations to optimize reporting layers." }
    ]
  },
  {
    category: "Languages & Databases",
    icon: Code2,
    iconColorClass: "text-violet-600 bg-violet-50 border-violet-100",
    items: [
      { name: "Python & SQL", context: "Automated ETL processes for reporting, configured database structures, and wrote robust ingestion scripts." },
      { name: "PostgreSQL & SQL Server", context: "Designed structured relational schemas, optimized indexing, and managed high-performance data storage." },
      { name: "R Language", context: "Conducted statistical hypothesis testing and academic regression modeling to support research conclusions." },
      { name: "Snowflake & BigQuery", context: "Configured cloud data warehouse staging, automated query schedules, and structured large-scale datasets." }
    ]
  },
  {
    category: "Data Engineering & Infrastructure",
    icon: Cpu,
    iconColorClass: "text-emerald-600 bg-emerald-50 border-emerald-100",
    items: [
      { name: "SSIS / ETL", context: "Engineered enterprise-grade extraction and transformation workflows handling millions of rows." },
      { name: "dbt", context: "Created modular, version-controlled database schemas and clean transformations for single sources of truth." },
      { name: "Apache Airflow", context: "Orchestrated complex daily database sync runs and established pipeline failure alerts." },
      { name: "Docker & Git", context: "Containerized database environments for reliable local debugging and maintained rigorous Git workflows." }
    ]
  }
];

interface ProblemActionImpact {
  problem: string;
  actions: string[];
  impact: string;
}

interface DetailedExperience {
  id: string;
  title: string;
  company: string;
  location: string;
  start_year: string;
  end_year?: string;
  is_current: boolean;
  breakdown: ProblemActionImpact;
}

const detailedExperiences: DetailedExperience[] = [
  {
    id: "lead-analyst",
    title: "Lead Data Analyst & BI Specialist",
    company: "Freelance & Consulting",
    location: "Vienna, Austria (Remote)",
    start_year: "2023",
    is_current: true,
    breakdown: {
      problem: "Operational and executive business leaders were relying on static, delayed Excel exports and manual calculations that consumed up to 10 hours a week per department head, leading to slow operational reaction times and critical metric discrepancies.",
      actions: [
        "Designed and deployed 25+ automated Power BI dashboards connected directly to live cloud databases, removing report compilation times.",
        "Built automated, scheduled ETL pipelines in Python & SQL to centralize multi-channel advertising and operational records.",
        "Coached and trained business units in self-service querying, creating modular custom reports without engineering bottlenecks."
      ],
      impact: "Reduced operational and executive reporting time by 40%, saving over 40+ hours per month for team leads while ensuring 100% data alignment across all executive stakeholders."
    }
  },
  {
    id: "etl-specialist",
    title: "Data Analyst & ETL Specialist",
    company: "Corporate Contractor",
    location: "Vienna, Austria",
    start_year: "2021",
    end_year: "2023",
    is_current: false,
    breakdown: {
      problem: "Customer interaction and marketing acquisition data was siloed across five disconnected channels, preventing the performance marketing team from accurately assessing campaign ROI and tracking long-term customer churn.",
      actions: [
        "Wrote custom Python APIs and configured automated dbt & SSIS database workflows to extract and stage raw customer interactions.",
        "Created an integrated Snowflake data warehouse schema that linked user behavioral logs with historical billing records.",
        "Engineered predictive user-cohort segmentation dashboard filters in Tableau to highlight high-value operational clusters."
      ],
      impact: "Delivered customer segmentation insights that increased general campaign ROI by 15%, reduced customer churn by 8%, and unified reporting across sales, marketing, and success departments."
    }
  },
  {
    id: "junior-engineer",
    title: "Junior Data Engineer",
    company: "DataTech Solutions",
    location: "Vienna, Austria",
    start_year: "2019",
    end_year: "2021",
    is_current: false,
    breakdown: {
      problem: "Crucial operational databases suffered from daily sync failures and slow analytic querying, which left customer-facing dashboards blank at the start of business, leading to lost customer trust.",
      actions: [
        "Refactored complex database views, rewritten long-running joins, and constructed optimized window functions in SQL.",
        "Orchestrated robust pipeline execution schemas using Apache Airflow and configured automated Slack notifications for pipeline failures.",
        "Implemented standardized containerized local testing environments using Docker to identify database conflicts before staging."
      ],
      impact: "Increased overall database sync reliability from 82% to 99.7% and improved query performance speeds by 35%, ensuring operational data was fully updated and accessible at the start of business every day."
    }
  }
];

function AboutPage() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const certsData = await getCertifications();
        setCertifications(certsData);
      } catch (err: any) {
        console.error("About page load failed:", err);
        setError("Failed to load professional credentials. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <main className="bg-[#F8FAFC] min-h-screen flex flex-col font-poppins text-slate-800">
      <Header />
      
      <section className="pt-32 md:pt-40 pb-24 flex-grow">
        <div className="mx-auto max-w-[1000px] px-5 sm:px-8 space-y-16">
          
          {/* Main Professional Bio Section */}
          <div className="grid md:grid-cols-5 gap-10 items-start bg-white border border-slate-200/60 shadow-xs rounded-3xl p-6 sm:p-10">
            
            {/* Photo Column */}
            <div className="md:col-span-2 flex flex-col items-center">
              <div className="relative group w-full max-w-[280px]">
                {/* Decorative background border effect */}
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-tr from-blue-600 to-indigo-600 blur opacity-25 group-hover:opacity-40 transition duration-300" />
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border-2 border-white shadow-md bg-slate-100">
                  <img
                    src="/professional-headshot.png"
                    alt="Zain Haidar - Data Analyst & BI Specialist"
                    className="object-cover w-full h-full transform group-hover:scale-[1.03] transition duration-300"
                  />
                </div>
              </div>
              <div className="mt-4 text-center">
                <h4 className="font-bold text-[#0F172A] text-sm">Zain Haidar</h4>
                <p className="text-[11px] font-semibold text-slate-400 uppercase tracking-widest mt-0.5">Data Analyst &amp; BI Specialist</p>
                <div className="flex items-center gap-1.5 mt-2 justify-center">
                  <MapPin className="h-3.5 w-3.5 text-blue-600" />
                  <span className="text-[12px] font-medium text-slate-500">Vienna, Austria</span>
                </div>
              </div>
            </div>

            {/* Narrative Column */}
            <div className="md:col-span-3 space-y-6">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-2">My Professional Story</p>
                <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
                  Bridging the gap between engineering pipelines and business strategies.
                </h1>
              </div>
              
              <div className="text-slate-500 text-xs sm:text-[13px] sm:text-slate-650 sm:text-sm leading-relaxed sm:leading-[1.8] space-y-4 font-semibold font-poppins">
                <p>
                  Over the past few years, I have worked as a dedicated data professional, designing Business Intelligence systems and automating analytical infrastructure. I focus on removing operational bottlenecks and translating complex, multi-million row datasets into clear, revenue-driving business strategies.
                </p>
                <p>
                  Through my freelance consulting and corporate engagements, I partner with cross-functional teams to replace manual, error-prone reports with real-time, production-grade dashboards. I focus not just on beautiful visualisations, but on building modular ETL workflows and SQL pipelines that represent a single source of truth for the entire company.
                </p>
                <p>
                  Whether defining KPI architectures, writing optimized database queries, or coaching executive teams on how to query their own data, I treat data as a leverage point. My core goal is to enable organizations to move faster, identify new opportunities, and make decisions backed by verifiable evidence.
                </p>
              </div>
            </div>

          </div>

          {/* Mission & Values Section */}
          <div className="space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">Core Principles</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight">Mission &amp; Values</h2>
              <p className="text-xs sm:text-[13px] text-slate-500 font-semibold leading-relaxed">
                The technical standards, communication rules, and work ethic I bring to every engagement.
              </p>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((v, idx) => {
                const Icon = v.icon;
                return (
                  <div key={idx} className="bg-white border border-slate-200/50 rounded-2xl p-6 shadow-xs space-y-4">
                    <div className={`h-10 w-10 rounded-xl border flex items-center justify-center shrink-0 ${v.color}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <div>
                      <h3 className="font-extrabold text-[#0F172A] text-sm tracking-tight mb-2 font-poppins">
                        {v.title}
                      </h3>
                      <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                        {v.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Technical Capabilities Section */}
          <div className="space-y-8">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Laptop className="h-5 w-5 text-blue-600 shrink-0" />
              <h2 className="font-extrabold text-slate-900 text-lg tracking-wide uppercase font-poppins">Technical Capabilities</h2>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {capabilityGroups.map((group) => {
                const Icon = group.icon;
                return (
                  <div 
                    key={group.category} 
                    className="bg-white border border-slate-200/50 rounded-2xl p-5 shadow-xs space-y-4 hover:shadow-sm hover:border-slate-300 transition"
                  >
                    <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                      <div className={`h-8 w-8 rounded-lg border flex items-center justify-center shrink-0 ${group.iconColorClass}`}>
                        <Icon className="h-4.5 w-4.5" />
                      </div>
                      <h3 className="font-bold text-[#0F172A] text-xs tracking-wider uppercase font-poppins">
                        {group.category}
                      </h3>
                    </div>
                    
                    <div className="space-y-4">
                      {group.items.map((item) => (
                        <div key={item.name} className="space-y-0.5">
                          <h4 className="font-bold text-slate-800 text-xs font-poppins tracking-tight">
                            {item.name}
                          </h4>
                          <p className="text-slate-500 text-[11px] sm:text-[12px] leading-relaxed font-semibold">
                            {item.context}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Experience Timeline (Problem / Action / Impact) */}
          <div className="space-y-8">
            <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
              <Briefcase className="h-5 w-5 text-blue-600 shrink-0" />
              <h2 className="font-extrabold text-slate-900 text-lg tracking-wide uppercase font-poppins">Professional Experience</h2>
            </div>

            <div className="space-y-8 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-px before:bg-slate-200">
              {detailedExperiences.map((exp) => {
                const isCurrent = exp.is_current;
                return (
                  <div key={exp.id} className="relative pl-10 group">
                    {/* Timeline Tracker node dot */}
                    <div className="absolute left-[11px] top-1.5 h-2 w-2 rounded-full bg-blue-600 group-hover:scale-125 transition duration-200" />
                    
                    <div className="bg-white border border-slate-200/50 rounded-2xl p-6 shadow-xs hover:border-slate-350 transition duration-200 space-y-4">
                      
                      {/* Job Header */}
                      <div className="flex flex-wrap justify-between items-start gap-2 border-b border-slate-50 pb-3">
                        <div>
                          <div className="flex items-center gap-2">
                            <h3 className="font-bold text-[#0F172A] text-sm sm:text-base leading-snug font-poppins">{exp.title}</h3>
                            {isCurrent && (
                              <span className="inline-flex items-center text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-250">
                                Current
                              </span>
                            )}
                          </div>
                          <div className="text-xs font-semibold text-blue-600 mt-0.5 font-poppins">{exp.company}</div>
                        </div>
                        
                        <div className="flex flex-col sm:items-end gap-1 text-[10px] font-semibold text-slate-400 font-mono">
                          <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                            <CalendarRange className="h-3 w-3 text-slate-350" />
                            <span>{exp.start_year} – {isCurrent ? "Present" : exp.end_year}</span>
                          </span>
                          {exp.location && (
                            <span className="inline-flex items-center gap-1 mt-0.5">
                              <MapPin className="h-3 w-3 text-slate-350" />
                              <span>{exp.location}</span>
                            </span>
                          )}
                        </div>
                      </div>

                      {/* Structured Breakdown: PROBLEM */}
                      <div className="space-y-1">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <HelpCircle className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <h5 className="text-[10px] font-bold uppercase tracking-wider font-poppins">The Business Problem</h5>
                        </div>
                        <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed font-semibold">
                          {exp.breakdown.problem}
                        </p>
                      </div>

                      {/* Structured Breakdown: ACTIONS TAKEN */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Laptop className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                          <h5 className="text-[10px] font-bold uppercase tracking-wider font-poppins">Actions Taken</h5>
                        </div>
                        <ul className="space-y-2 pl-1.5">
                          {exp.breakdown.actions.map((act, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-500 leading-relaxed font-semibold">
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                              <span>{act}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Structured Breakdown: MEASURABLE IMPACT */}
                      <div className="bg-emerald-50/50 border border-emerald-150 rounded-xl p-4.5 space-y-1.5">
                        <div className="flex items-center gap-1.5 text-emerald-700">
                          <CheckCircle2 className="h-4 w-4 shrink-0" />
                          <h5 className="text-[10px] font-bold uppercase tracking-wider font-poppins">Measurable Business Impact</h5>
                        </div>
                        <p className="text-emerald-800 text-xs sm:text-[13px] leading-relaxed font-bold">
                          {exp.breakdown.impact}
                        </p>
                      </div>

                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Dynamic Certifications List */}
          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="text-xs font-semibold text-slate-400">Loading professional records...</span>
            </div>
          ) : error ? (
            <div className="p-5 border border-rose-100 bg-rose-50 text-rose-600 text-xs font-semibold rounded-2xl">
              {error}
            </div>
          ) : (
            <div className="space-y-6">
              <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                <Award className="h-5 w-5 text-blue-600 shrink-0" />
                <h2 className="font-extrabold text-slate-900 text-lg tracking-wide uppercase font-poppins">Certifications & Courses</h2>
              </div>

              {certifications.length === 0 ? (
                <p className="text-slate-400 text-xs italic font-semibold">No certifications logged.</p>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {certifications.map((cert) => (
                    <div 
                      key={cert.id} 
                      className="bg-white border border-slate-200/50 rounded-2xl p-4.5 shadow-xs hover:border-slate-300 transition flex justify-between items-center gap-4 group"
                    >
                      <div className="min-w-0">
                        <h3 className="font-bold text-slate-800 text-xs leading-snug line-clamp-1 group-hover:text-blue-600 transition-colors font-poppins">
                          {cert.title}
                        </h3>
                        <div className="text-[10px] text-slate-400 font-semibold mt-1">
                          {cert.provider || "N/A"} {cert.category ? `· ${cert.category}` : ""}
                        </div>
                      </div>

                      {cert.credential_url ? (
                        <a
                          href={cert.credential_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-blue-600 hover:bg-slate-50 transition shrink-0 cursor-pointer"
                          title="Verify Credential"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      ) : null}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

        </div>
      </section>

      <Footer />
    </main>
  );
}
