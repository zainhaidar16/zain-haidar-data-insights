import { motion } from "framer-motion";
import { BarChart3, TrendingUp, Database, Cloud, Users } from "lucide-react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

interface SkillItem {
  name: string;
  note: string;
}

interface SkillCategory {
  title: string;
  icon: any;
  colorClass: string;
  iconColorClass: string;
  borderColorClass: string;
  skills: SkillItem[];
}

const skillCategories: SkillCategory[] = [
  {
    title: "Business Intelligence",
    icon: BarChart3,
    colorClass: "bg-blue-50/50 border-blue-150 text-blue-700 hover:shadow-blue-100/50",
    iconColorClass: "text-blue-600 bg-blue-50 border-blue-100",
    borderColorClass: "hover:border-blue-300",
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
    colorClass: "bg-violet-50/50 border-violet-150 text-violet-700 hover:shadow-violet-100/50",
    iconColorClass: "text-violet-600 bg-violet-50 border-violet-100",
    borderColorClass: "hover:border-violet-300",
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
    colorClass: "bg-emerald-50/50 border-emerald-150 text-emerald-700 hover:shadow-emerald-100/50",
    iconColorClass: "text-emerald-600 bg-emerald-50 border-emerald-100",
    borderColorClass: "hover:border-emerald-300",
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
    colorClass: "bg-sky-50/50 border-sky-150 text-sky-700 hover:shadow-sky-100/50",
    iconColorClass: "text-sky-600 bg-sky-50 border-sky-100",
    borderColorClass: "hover:border-sky-300",
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
    colorClass: "bg-amber-50/50 border-amber-150 text-amber-700 hover:shadow-amber-100/50",
    iconColorClass: "text-amber-600 bg-amber-50 border-amber-100",
    borderColorClass: "hover:border-amber-300",
    skills: [
      { name: "Stakeholder Communication", note: "Translating complex data metrics into actionable business strategies" },
      { name: "Problem Solving", note: "Deconstructing vague business requests into highly structured data products" },
      { name: "Project Management", note: "Led analytics projects from initial scope definition to final handoff" },
      { name: "Freelance Consulting", note: "Managed end-to-end client relationships, scoping, and value delivery" }
    ]
  }
];

export function Skills() {
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
          <p className="mt-4 text-[15px] text-slate-500 max-w-xl mx-auto leading-relaxed font-medium">
            A focused, practical skill set built through real-world analytics projects, corporate experience, and freelance work.
          </p>
        </motion.div>

        {/* SKILLS CARDS GRID */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 lg:gap-8">
          {skillCategories.map((group, gi) => {
            const Icon = group.icon;
            // The 5th card will span full width on large screens to keep the 3-column layout perfectly balanced.
            const isLast = gi === skillCategories.length - 1;
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: gi * 0.08, ease: EASE }}
                className={`bg-white border border-slate-200/80 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300 ${group.borderColorClass} ${
                  isLast ? "lg:col-span-3 md:col-span-2 lg:max-w-4xl lg:mx-auto w-full" : ""
                }`}
              >
                {/* Card header */}
                <div className="flex items-center gap-3 mb-6 border-b border-slate-50 pb-4">
                  <div className={`h-10 w-10 rounded-xl border flex items-center justify-center shrink-0 ${group.iconColorClass}`}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <h3 className="font-bold text-[#0F172A] text-[16px] tracking-tight">{group.title}</h3>
                </div>

                {/* Skills with Experience Notes */}
                <div className={`space-y-5 ${isLast ? "lg:grid lg:grid-cols-2 lg:gap-x-8 lg:gap-y-5 lg:space-y-0" : ""}`}>
                  {group.skills.map((skill) => (
                    <div key={skill.name} className="flex items-start gap-3 group/item">
                      <div className={`h-1.5 w-1.5 rounded-full mt-2 shrink-0 ${group.iconColorClass.split(" ")[0]}`} />
                      <div className="space-y-0.5">
                        <h4 className="font-bold text-slate-800 text-xs sm:text-[13px] tracking-tight group-hover/item:text-blue-600 transition-colors">
                          {skill.name}
                        </h4>
                        <p className="text-slate-500 text-[11px] sm:text-[12px] leading-relaxed font-semibold">
                          {skill.note}
                        </p>
                      </div>
                    </div>
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
