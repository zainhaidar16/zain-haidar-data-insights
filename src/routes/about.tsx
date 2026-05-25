import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { getExperience, getCertifications } from "@/lib/api";
import { Experience, Certification } from "@/lib/api";
import { Loader2, Briefcase, Database, Award, ExternalLink, CalendarRange, MapPin, Target, ShieldCheck, Zap, HeartHandshake } from "lucide-react";
import { BarChart3, TrendingUp, Cloud, Users } from "lucide-react";
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

const skillCategories = [
  {
    title: "Business Intelligence",
    icon: BarChart3,
    iconColorClass: "text-blue-600 bg-blue-50 border-blue-100",
    skills: [
      { name: "Power BI", note: "3+ years building enterprise executive dashboards and automated reports" },
      { name: "Tableau", note: "Developed interactive sales, pipeline, and operations tracking sheets" },
      { name: "Looker Studio", note: "Designed custom analytics dashboards for direct freelance clients" },
      { name: "DAX / Power Query", note: "Advanced data modeling, calculated metrics, and query optimization" }
    ]
  },
  {
    title: "Data Analysis & Modelling",
    icon: TrendingUp,
    iconColorClass: "text-violet-600 bg-violet-50 border-violet-100",
    skills: [
      { name: "SQL", note: "Used SQL to query complex databases and build analytical schemas" },
      { name: "Python", note: "Pandas, NumPy, and Scikit-Learn for statistical & predictive analysis" },
      { name: "Excel", note: "Advanced financial modeling, VBA scripting, and deep pivot tables" },
      { name: "R", note: "Used for statistical hypothesis testing and academic regression analysis" }
    ]
  },
  {
    title: "Data Engineering & ETL",
    icon: Database,
    iconColorClass: "text-emerald-600 bg-emerald-50 border-emerald-100",
    skills: [
      { name: "SQL Server (SSIS)", note: "Built robust ETL pipelines processing millions of rows" },
      { name: "dbt", note: "Created modular, clean, and version-controlled database transformations" },
      { name: "Airflow", note: "Orchestrated daily data extraction, transformation, and load workflows" },
      { name: "APIs & Ingestion", note: "Wrote custom Python scripts to ingest web and marketing API data" }
    ]
  },
  {
    title: "Cloud & Tools",
    icon: Cloud,
    iconColorClass: "text-sky-600 bg-sky-50 border-sky-100",
    skills: [
      { name: "Snowflake", note: "Managed enterprise data warehouse loading and query tuning" },
      { name: "Azure", note: "Deployed resources, Synapse workspaces, and Azure Data Factory pipelines" },
      { name: "Git & GitHub", note: "Full version control, code reviews, and CI/CD deployment flows" },
      { name: "Docker", note: "Containerized database environments for reliable local development" }
    ]
  },
  {
    title: "Soft Skills",
    icon: Users,
    iconColorClass: "text-amber-600 bg-amber-50 border-amber-100",
    skills: [
      { name: "Stakeholder Communication", note: "Translating complex data metrics into actionable business strategies" },
      { name: "Problem Solving", note: "Deconstructing vague business requests into highly structured data products" },
      { name: "Project Management", note: "Led analytics projects from initial scope definition to final handoff" },
      { name: "Freelance Consulting", note: "Managed end-to-end client relationships, scoping, and value delivery" }
    ]
  }
];

function AboutPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [expData, certsData] = await Promise.all([
          getExperience(),
          getCertifications()
        ]);
        setExperiences(expData);
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
              
              <div className="text-slate-500 text-xs sm:text-[13px] sm:text-slate-650 sm:text-sm leading-relaxed sm:leading-[1.8] space-y-4 font-semibold">
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
                      <h3 className="font-extrabold text-[#0F172A] text-sm tracking-tight mb-2">
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
            <div className="space-y-16">
              
              {/* Technical Capabilities Grid */}
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                  <Database className="h-5 w-5 text-blue-600 shrink-0" />
                  <h2 className="font-extrabold text-slate-900 text-lg tracking-wide uppercase">Technical Capabilities</h2>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {skillCategories.map((group, gi) => {
                    const Icon = group.icon;
                    const isLast = gi === skillCategories.length - 1;
                    return (
                      <div 
                        key={group.title} 
                        className={`bg-white border border-slate-200/50 rounded-2xl p-5 shadow-xs space-y-5 ${
                          isLast ? "md:col-span-2 lg:col-span-3 lg:max-w-3xl lg:mx-auto w-full" : ""
                        }`}
                      >
                        <div className="flex items-center gap-3 border-b border-slate-50 pb-3">
                          <div className={`h-8 w-8 rounded-lg border flex items-center justify-center shrink-0 ${group.iconColorClass}`}>
                            <Icon className="h-4.5 w-4.5" />
                          </div>
                          <h3 className="font-bold text-[#0F172A] text-xs tracking-wider uppercase">
                            {group.title}
                          </h3>
                        </div>
                        
                        <div className={`space-y-4 ${isLast ? "lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-4 lg:space-y-0" : ""}`}>
                          {group.skills.map((skill) => (
                            <div key={skill.name} className="flex items-start gap-2.5 group/skill">
                              <div className={`h-1.5 w-1.5 rounded-full mt-1.5 shrink-0 ${group.iconColorClass.split(" ")[0]}`} />
                              <div className="space-y-0.5">
                                <h4 className="font-bold text-slate-800 text-xs tracking-tight">
                                  {skill.name}
                                </h4>
                                <p className="text-slate-500 text-[11px] leading-relaxed font-semibold">
                                  {skill.note}
                                </p>
                              </div>
                            </div>
                          ))}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic Work Experience */}
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                  <Briefcase className="h-5 w-5 text-blue-600 shrink-0" />
                  <h2 className="font-extrabold text-slate-900 text-lg tracking-wide uppercase">Work Experience</h2>
                </div>

                {experiences.length === 0 ? (
                  <p className="text-slate-400 text-xs italic font-semibold">No experience logs found.</p>
                ) : (
                  <div className="space-y-8 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-px before:bg-slate-200">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="relative pl-10 group">
                        {/* Bullet tracker */}
                        <div className="absolute left-[11px] top-1.5 h-2 w-2 rounded-full bg-blue-600 group-hover:scale-125 transition duration-200" />
                        
                        <div className="bg-white border border-slate-200/50 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition duration-200 space-y-3">
                          <div className="flex flex-wrap justify-between items-start gap-2">
                            <div>
                              <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-snug">{exp.title}</h3>
                              <div className="text-xs font-semibold text-slate-400 mt-0.5">{exp.company}</div>
                            </div>
                            
                            <div className="flex flex-col sm:items-end gap-1 text-[10px] font-semibold text-slate-400 font-mono">
                              <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                                <CalendarRange className="h-3 w-3 text-slate-350" />
                                <span>{exp.start_year} – {exp.is_current ? "Present" : exp.end_year}</span>
                              </span>
                              {exp.location && (
                                <span className="inline-flex items-center gap-1 mt-0.5">
                                  <MapPin className="h-3 w-3 text-slate-350" />
                                  <span>{exp.location}</span>
                                </span>
                              )}
                            </div>
                          </div>

                          {exp.description && (
                            <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed font-semibold">
                              {exp.description}
                            </p>
                          )}

                          {exp.bullet_points && exp.bullet_points.length > 0 && (
                            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-650 font-semibold leading-relaxed">
                              {exp.bullet_points.map((pt, i) => (
                                <li key={i}>{pt}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Dynamic Certifications List */}
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                  <Award className="h-5 w-5 text-blue-600 shrink-0" />
                  <h2 className="font-extrabold text-slate-900 text-lg tracking-wide uppercase">Certifications & Courses</h2>
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
                          <h3 className="font-bold text-slate-800 text-xs leading-snug line-clamp-1 group-hover:text-blue-600 transition-colors">
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

            </div>
          )}

        </div>
      </section>

      <Footer />
    </main>
  );
}
