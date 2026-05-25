import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Database, Cloud, Users, AlertCircle, Inbox, Settings } from "lucide-react";
import { getSkills, Skill } from "@/lib/api";

const EASE = [0.25, 0.1, 0.25, 1] as const;

// Experience-based context notes dictionary for skills
const skillNotes: Record<string, string> = {
  "Power BI": "3+ years building enterprise executive dashboards and automated reports",
  "Tableau": "Developed interactive sales, pipeline, and operations tracking sheets",
  "Looker Studio": "Designed custom analytics dashboards for direct freelance clients",
  "DAX / Power Query": "Advanced data modeling, calculated metrics, and query optimization",
  "DAX & Power Query": "Advanced data modeling, calculated metrics, and query optimization",
  "SQL": "Used SQL to query complex databases and build analytical schemas",
  "Python": "Pandas, NumPy, and Scikit-Learn for statistical & predictive analysis",
  "Excel": "Advanced financial modeling, VBA scripting, and deep pivot tables",
  "R": "Used for statistical hypothesis testing and academic regression analysis",
  "R Language": "Used for statistical hypothesis testing and academic regression analysis",
  "SQL Server (SSIS)": "Built robust ETL pipelines processing millions of rows",
  "SSIS / ETL": "Built robust ETL pipelines processing millions of rows",
  "dbt": "Created modular, clean, and version-controlled database transformations",
  "Airflow": "Orchestrated daily data extraction, transformation, and load workflows",
  "Apache Airflow": "Orchestrated daily data extraction, transformation, and load workflows",
  "APIs & Ingestion": "Wrote custom Python scripts to ingest web and marketing API data",
  "Snowflake": "Managed enterprise data warehouse loading and query tuning",
  "Azure": "Deployed resources, Synapse workspaces, and Azure Data Factory pipelines",
  "Git & GitHub": "Full version control, code reviews, and CI/CD deployment flows",
  "Docker": "Containerized database environments for reliable local development",
  "Docker & Git": "Containerized database environments for reliable local development",
  "Stakeholder Communication": "Translating complex data metrics into actionable business strategies",
  "Problem Solving": "Deconstructing vague business requests into highly structured data products",
  "Project Management": "Led analytics projects from initial scope definition to final handoff",
  "Freelance Consulting": "Managed end-to-end client relationships, scoping, and value delivery"
};

const categoryConfigs: Record<string, { colorClass: string; iconColorClass: string; icon: any; borderClass: string }> = {
  "Business Intelligence": { colorClass: "text-blue-750", iconColorClass: "text-blue-600 bg-blue-50 border-blue-100", icon: BarChart3, borderClass: "hover:border-blue-300" },
  "Data Analysis & Modelling": { colorClass: "text-violet-750", iconColorClass: "text-violet-600 bg-violet-50 border-violet-100", icon: TrendingUp, borderClass: "hover:border-violet-300" },
  "Data Analysis": { colorClass: "text-violet-750", iconColorClass: "text-violet-600 bg-violet-50 border-violet-100", icon: TrendingUp, borderClass: "hover:border-violet-300" },
  "Data Engineering & ETL": { colorClass: "text-emerald-750", iconColorClass: "text-emerald-600 bg-emerald-50 border-emerald-100", icon: Database, borderClass: "hover:border-emerald-300" },
  "Data Engineering": { colorClass: "text-emerald-750", iconColorClass: "text-emerald-600 bg-emerald-50 border-emerald-100", icon: Database, borderClass: "hover:border-emerald-300" },
  "Cloud & Tools": { colorClass: "text-sky-755", iconColorClass: "text-sky-600 bg-sky-50 border-sky-100", icon: Cloud, borderClass: "hover:border-sky-300" },
  "Soft Skills": { colorClass: "text-amber-750", iconColorClass: "text-amber-600 bg-amber-50 border-amber-100", icon: Users, borderClass: "hover:border-amber-300" }
};

export function Skills() {
  const [skills, setSkills] = useState<Skill[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadSkills() {
      try {
        setLoading(true);
        const data = await getSkills();
        setSkills(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load skills");
      } finally {
        setLoading(false);
      }
    }
    loadSkills();
  }, []);

  // Group flat skills array from Supabase by category dynamically
  const getGroupedSkills = () => {
    const grouped: Record<string, Skill[]> = {};
    skills.forEach((s) => {
      const cat = s.category || "General";
      if (!grouped[cat]) {
        grouped[cat] = [];
      }
      grouped[cat].push(s);
    });

    return Object.keys(grouped).map((catName) => {
      const config = categoryConfigs[catName] || { 
        colorClass: "text-blue-700", 
        iconColorClass: "text-blue-600 bg-blue-50 border-blue-100", 
        icon: Settings, 
        borderClass: "hover:border-blue-300" 
      };
      return {
        title: catName,
        config,
        skills: grouped[catName].sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
      };
    });
  };

  const skillGroups = getGroupedSkills();

  return (
    <section id="skills" className="py-24 bg-[#F8FAFC] border-t border-slate-100">
      <div className="section-container max-w-[1200px] mx-auto px-5 sm:px-8">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">Technical Expertise</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight">
            Skills &amp; Technologies
          </h2>
          <p className="mt-4 text-[15px] text-slate-550 max-w-xl mx-auto leading-relaxed font-medium">
            A focused, practical skill set built through real-world analytics projects, corporate experience, and freelance work.
          </p>
        </motion.div>

        {/* LOADING STATE */}
        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-slate-200 p-6 rounded-2xl space-y-4 animate-pulse">
                <div className="h-10 w-10 rounded-xl bg-slate-100" />
                <div className="h-6 bg-slate-200 rounded w-1/3" />
                <div className="space-y-2">
                  <div className="h-4 bg-slate-50 rounded w-full" />
                  <div className="h-4 bg-slate-50 rounded w-5/6" />
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="p-6 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3.5 max-w-2xl mx-auto shadow-xs">
            <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-rose-800 text-sm">Failed to Load Skills</h4>
              <p className="text-xs text-rose-600 mt-1 leading-normal font-semibold">{error}</p>
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && skillGroups.length === 0 && (
          <div className="py-16 text-center max-w-md mx-auto border border-slate-200 rounded-3xl bg-white shadow-xs">
            <div className="h-12 w-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-4">
              <Inbox className="h-5 w-5 text-slate-400" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">No Skills Found</h4>
            <p className="text-xs text-slate-500 leading-normal font-semibold">
              No technical skills or categories have been published in the database yet.
            </p>
          </div>
        )}

        {/* SKILLS CARDS GRID */}
        {!loading && !error && skillGroups.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 lg:gap-8">
            {skillGroups.map((group, gi) => {
              const config = group.config;
              const Icon = config.icon;
              
              return (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: gi * 0.08, ease: EASE }}
                  className={`bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 ${config.borderClass}`}
                >
                  {/* Card header */}
                  <div className="flex items-center gap-3 mb-6 border-b border-slate-50 pb-4">
                    <div className={`h-10 w-10 rounded-xl border flex items-center justify-center shrink-0 ${config.iconColorClass}`}>
                      <Icon className="h-5 w-5" />
                    </div>
                    <h3 className="font-bold text-[#0F172A] text-[16px] tracking-tight">{group.title}</h3>
                  </div>

                  {/* Skills with Experience Notes */}
                  <div className="space-y-5">
                    {group.skills.map((skill) => {
                      const note = skillNotes[skill.name] || "Used in multiple analytical integrations to clean and organize business data layers.";
                      return (
                        <div key={skill.id} className="flex items-start gap-3 group/item">
                          <div className={`h-1.5 w-1.5 rounded-full mt-2 shrink-0 ${config.iconColorClass.split(" ")[0]}`} />
                          <div className="space-y-0.5">
                            <h4 className="font-bold text-slate-800 text-xs sm:text-[13px] tracking-tight group-hover/item:text-blue-600 transition-colors">
                              {skill.name}
                            </h4>
                            <p className="text-slate-550 text-[11px] sm:text-[12px] leading-relaxed font-semibold">
                              {note}
                            </p>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
