import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { getExperience, getCertifications, getSkills } from "@/lib/api";
import { Experience, Certification, Skill } from "@/lib/api";
import { Loader2, Briefcase, Database, Award, ExternalLink, CalendarRange, MapPin, Target, ShieldCheck, Zap, HeartHandshake, CheckCircle2, Laptop } from "lucide-react";
import { BarChart3, Code2, Cpu, Users } from "lucide-react";
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
  },
  {
    icon: Zap,
    title: "Clarity & Simplicity",
    desc: "I believe in making insights intuitive and highly accessible. A premium dashboard shouldn't need a manual — it should speak for itself.",
  },
  {
    icon: ShieldCheck,
    title: "Robust Engineering",
    desc: "Building ETL processes and databases that are modular, documented, version-controlled, and fully optimized for long-term scalability.",
  },
  {
    icon: HeartHandshake,
    title: "Collaborative Ownership",
    desc: "Working hand-in-hand with business users, product managers, and engineering teams to ensure our data tools are actively adopted and trusted.",
  }
];

// Context narrative notes mapping for skills
const skillNotes: Record<string, string> = {
  "Power BI": "Built automated dashboards for retail, operational, and financial clients.",
  "Tableau": "Designed interactive drill-down reports to track operational pipelines and performance metrics.",
  "Looker Studio": "Created customized Google Analytics dashboards to help ecommerce clients monitor web performance.",
  "DAX & Power Query": "Wrote complex business calculations and structured data transformations to optimize reporting layers.",
  "DAX / Power Query": "Wrote complex business calculations and structured data transformations to optimize reporting layers.",
  "Python & SQL": "Automated ETL processes for reporting, configured database structures, and wrote robust ingestion scripts.",
  "SQL": "Used SQL to query complex databases and build analytical schemas.",
  "Python": "Pandas, NumPy, and Scikit-Learn for statistical & predictive analysis.",
  "PostgreSQL & SQL Server": "Designed structured relational schemas, optimized indexing, and managed high-performance data storage.",
  "PostgreSQL / SQL Server": "Designed structured relational schemas, optimized indexing, and managed high-performance data storage.",
  "R Language": "Conducted statistical hypothesis testing and academic regression modeling to support research conclusions.",
  "R": "Conducted statistical hypothesis testing and academic regression modeling to support research conclusions.",
  "Snowflake & BigQuery": "Configured cloud data warehouse staging, automated query schedules, and structured large-scale datasets.",
  "SSIS / ETL": "Engineered enterprise-grade extraction and transformation workflows handling millions of rows.",
  "SQL Server (SSIS)": "Engineered enterprise-grade extraction and transformation workflows handling millions of rows.",
  "dbt": "Created modular, version-controlled database schemas and clean transformations for single sources of truth.",
  "Apache Airflow": "Orchestrated complex daily database sync runs and established pipeline failure alerts.",
  "Docker & Git": "Containerized database environments for reliable local debugging and maintained rigorous Git workflows.",
  "Stakeholder Communication": "Translating complex data metrics into actionable business strategies.",
  "Problem Solving": "Deconstructing vague business requests into highly structured data products.",
  "Project Management": "Led analytics projects from initial scope definition to final handoff.",
  "Freelance Consulting": "Managed end-to-end client relationships, scoping, and value delivery."
};

const categoryConfigs: Record<string, { colorClass: string; icon: any }> = {
  "Business Intelligence": { colorClass: "text-[#111111] bg-[#F2FBD9] border-[#D7FF3F]/30", icon: BarChart3 },
  "Data Analysis & Modelling": { colorClass: "text-[#111111] bg-[#F6F4EF] border-[#E5E7EB]", icon: Code2 },
  "Data Analysis": { colorClass: "text-[#111111] bg-[#F6F4EF] border-[#E5E7EB]", icon: Code2 },
  "Data Engineering & ETL": { colorClass: "text-[#111111] bg-[#F2FBD9] border-[#D7FF3F]/30", icon: Cpu },
  "Data Engineering": { colorClass: "text-[#111111] bg-[#F2FBD9] border-[#D7FF3F]/30", icon: Cpu },
  "Cloud & Tools": { colorClass: "text-[#111111] bg-[#F6F4EF] border-[#E5E7EB]", icon: Database },
  "Soft Skills": { colorClass: "text-[#111111] bg-[#F6F4EF] border-[#E5E7EB]", icon: Users }
};

function AboutPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [expData, skillsData, certsData] = await Promise.all([
          getExperience(),
          getSkills(),
          getCertifications()
        ]);
        setExperiences(expData);
        setSkills(skillsData);
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

  // Group skills dynamically by category
  const getGroupedSkills = () => {
    const grouped: Record<string, Skill[]> = {};
    skills.forEach(s => {
      const cat = s.category || "General";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(s);
    });

    return Object.entries(grouped).map(([title, list]) => {
      const config = categoryConfigs[title] || { colorClass: "text-[#111111] bg-[#F6F4EF] border-[#E5E7EB]", icon: Laptop };
      return {
        title,
        config,
        skills: list.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
      };
    });
  };

  const groupedSkillsList = getGroupedSkills();

  return (
    <main className="bg-white min-h-screen flex flex-col">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-20 bg-[#F8F7F3] relative overflow-hidden hero-arc">
        <div className="absolute -top-24 -right-16 w-[420px] h-[420px] rounded-full bg-[#D7FF3F]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[280px] h-[280px] rounded-full bg-[#111111]/5 blur-3xl pointer-events-none" />
        <div className="section-container">
          <div className="max-w-3xl">
            <p className="text-[12px] font-semibold uppercase tracking-widest text-[#9CA3AF] mb-3">About</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111111] tracking-tight leading-[1.1] mb-6">
              Bridging the gap between engineering pipelines and{" "}
              <span className="relative inline-block">
                business strategies.
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#D7FF3F]/40 -z-10 rounded-sm" />
              </span>
            </h1>
          </div>
        </div>
      </section>

      <section className="py-16 flex-grow">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8 space-y-16">
          
          {/* Bio */}
          <div className="grid md:grid-cols-5 gap-10 items-start">
            {/* Photo */}
            <div className="md:col-span-2 flex flex-col items-center">
              <div className="relative group w-full max-w-[280px]">
                <div className="absolute -inset-1 rounded-3xl bg-[#D7FF3F]/20 -z-10" />
                <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden border border-[#E5E7EB] bg-[#F6F4EF]">
                  <img
                    src="/zain.jpg"
                    alt="Zain Haidar - Data Analyst & BI Specialist"
                    className="object-cover w-full h-full transform group-hover:scale-[1.03] transition duration-300"
                  />
                </div>
              </div>
              <div className="mt-4 text-center">
                <h4 className="font-bold text-[#111111] text-sm">Zain Haidar</h4>
                <p className="text-[11px] font-medium text-[#9CA3AF] uppercase tracking-widest mt-0.5">Data Analyst & BI Specialist</p>
                <div className="flex items-center gap-1.5 mt-2 justify-center">
                  <MapPin className="h-3.5 w-3.5 text-[#111111]" />
                  <span className="text-[12px] font-medium text-[#4B5563]">Vienna, Austria</span>
                </div>
              </div>
            </div>

            {/* Narrative */}
            <div className="md:col-span-3 space-y-6">
              <div className="text-[#4B5563] text-[14px] leading-[1.8] space-y-4">
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

          {/* Mission & Values */}
          <div className="space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <p className="text-[12px] font-semibold uppercase tracking-widest text-[#9CA3AF]">Core Principles</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#111111] tracking-tight">Mission & Values</h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((v, idx) => {
                const Icon = v.icon;
                return (
                  <div key={idx} className="card-payoneer p-6 space-y-4 hover:border-[#D7FF3F]/40">
                    <div className="h-10 w-10 rounded-xl bg-[#F2FBD9] border border-[#D7FF3F]/30 flex items-center justify-center shrink-0">
                      <Icon className="h-5 w-5 text-[#111111]" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#111111] text-sm tracking-tight mb-2">
                        {v.title}
                      </h3>
                      <p className="text-[#4B5563] text-[13px] leading-relaxed">
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
              <Loader2 className="h-8 w-8 animate-spin text-[#111111]" />
              <span className="text-xs font-medium text-[#9CA3AF]">Loading professional records...</span>
            </div>
          ) : error ? (
            <div className="p-5 border border-rose-100 bg-rose-50 text-rose-600 text-xs font-medium rounded-2xl">
              {error}
            </div>
          ) : (
            <div className="space-y-16">
              
              {/* Technical Capabilities */}
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 border-b border-[#E5E7EB] pb-3">
                  <Laptop className="h-5 w-5 text-[#111111] shrink-0" />
                  <h2 className="font-extrabold text-[#111111] text-lg tracking-tight">Technical Capabilities</h2>
                </div>

                {groupedSkillsList.length === 0 ? (
                  <div className="border border-[#E5E7EB] rounded-3xl p-10 text-center bg-white max-w-md mx-auto">
                    <Database className="h-5 w-5 text-[#9CA3AF] mx-auto mb-2" />
                    <p className="text-xs text-[#4B5563]">No skills found.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {groupedSkillsList.map((group) => {
                      const Icon = group.config.icon;
                      return (
                        <div 
                          key={group.title} 
                          className="card-payoneer p-5 space-y-4 hover:border-[#D7FF3F]/40"
                        >
                          <div className="flex items-center gap-2.5 border-b border-[#E5E7EB] pb-3">
                            <div className={`h-8 w-8 rounded-lg border flex items-center justify-center shrink-0 ${group.config.colorClass}`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <h3 className="font-bold text-[#111111] text-xs tracking-wider uppercase">
                              {group.title}
                            </h3>
                          </div>
                          
                          <div className="space-y-4">
                            {group.skills.map((item) => {
                              const note = skillNotes[item.name] || "Utilized in multiple integrations to clean and organize business data layers.";
                              return (
                                <div key={item.id} className="space-y-0.5">
                                  <h4 className="font-bold text-[#111111] text-xs tracking-tight">
                                    {item.name}
                                  </h4>
                                  <p className="text-[#4B5563] text-[11px] leading-relaxed">
                                    {note}
                                  </p>
                                </div>
                              );
                            })}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Work Experience */}
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 border-b border-[#E5E7EB] pb-3">
                  <Briefcase className="h-5 w-5 text-[#111111] shrink-0" />
                  <h2 className="font-extrabold text-[#111111] text-lg tracking-tight">Professional Experience</h2>
                </div>

                {experiences.length === 0 ? (
                  <div className="border border-[#E5E7EB] rounded-3xl p-10 text-center bg-white max-w-md mx-auto">
                    <Briefcase className="h-5 w-5 text-[#9CA3AF] mx-auto mb-2" />
                    <p className="text-xs text-[#4B5563]">No experience found.</p>
                  </div>
                ) : (
                  <div className="space-y-8 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-px before:bg-[#E5E7EB]">
                    {experiences.map((exp) => {
                      const isCurrent = exp.is_current;
                      const bullets = Array.isArray(exp.bullet_points) ? exp.bullet_points : [];
                      
                      return (
                        <div key={exp.id} className="relative pl-10 group">
                          <div className="absolute left-[11px] top-1.5 h-2 w-2 rounded-full bg-[#111111] group-hover:scale-125 transition duration-200" />
                          
                          <div className="card-payoneer p-6 space-y-4 hover:border-[#D7FF3F]/40">
                            <div className="flex flex-wrap justify-between items-start gap-2 border-b border-[#E5E7EB] pb-3">
                              <div>
                                <div className="flex items-center gap-2">
                                  <h3 className="font-bold text-[#111111] text-sm sm:text-base leading-snug">{exp.title}</h3>
                                  {isCurrent && (
                                    <span className="inline-flex items-center text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-[#F2FBD9] text-[#111111] border border-[#D7FF3F]/30">
                                      Current
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs font-semibold text-[#111111] mt-0.5">{exp.company}</div>
                              </div>
                              
                              <div className="flex flex-col sm:items-end gap-1 text-[10px] font-medium text-[#9CA3AF] font-mono">
                                <span className="inline-flex items-center gap-1 bg-[#F6F4EF] border border-[#E5E7EB] px-2 py-0.5 rounded">
                                  <CalendarRange className="h-3 w-3 text-[#9CA3AF]" />
                                  <span>{exp.start_year} – {isCurrent ? "Present" : exp.end_year}</span>
                                </span>
                                {exp.location && (
                                  <span className="inline-flex items-center gap-1 mt-0.5">
                                    <MapPin className="h-3 w-3 text-[#9CA3AF]" />
                                    <span>{exp.location}</span>
                                  </span>
                                )}
                              </div>
                            </div>

                            {exp.description && (
                              <p className="text-[#4B5563] text-xs sm:text-[13px] leading-relaxed">
                                {exp.description}
                              </p>
                            )}

                            {bullets.length > 0 && (
                              <ul className="space-y-2 pl-1">
                                {bullets.map((pt, idx) => (
                                  <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-[13px] text-[#4B5563] leading-relaxed">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#D7FF3F] mt-2 shrink-0" />
                                    <span>{pt}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Certifications */}
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 border-b border-[#E5E7EB] pb-3">
                  <Award className="h-5 w-5 text-[#111111] shrink-0" />
                  <h2 className="font-extrabold text-[#111111] text-lg tracking-tight">Certifications & Courses</h2>
                </div>

                {certifications.length === 0 ? (
                  <div className="border border-[#E5E7EB] rounded-3xl p-10 text-center bg-white max-w-md mx-auto">
                    <Award className="h-5 w-5 text-[#9CA3AF] mx-auto mb-2" />
                    <p className="text-xs text-[#4B5563]">No certifications logged.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {certifications.map((cert) => (
                      <div 
                        key={cert.id} 
                        className="card-payoneer p-4.5 flex justify-between items-center gap-4 group hover:border-[#D7FF3F]/40"
                      >
                        <div className="min-w-0">
                          <h3 className="font-bold text-[#111111] text-xs leading-snug line-clamp-1 group-hover:text-[#4B5563] transition-colors">
                            {cert.title}
                          </h3>
                          <div className="text-[10px] text-[#9CA3AF] font-medium mt-1">
                            {cert.provider || "N/A"} {cert.category ? `· ${cert.category}` : ""}
                          </div>
                        </div>

                        {cert.credential_url ? (
                          <a
                            href={cert.credential_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex p-2 rounded-xl border border-[#E5E7EB] text-[#9CA3AF] hover:text-[#111111] hover:bg-[#F6F4EF] transition shrink-0 cursor-pointer"
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
