import { motion } from "framer-motion";
import { BarChart2, Database, Cloud, Code2 } from "lucide-react";

const skillGroups = [
  {
    icon: BarChart2,
    title: "Business Intelligence",
    color: "blue",
    skills: [
      { name: "Power BI", level: 95 },
      { name: "DAX", level: 90 },
      { name: "Power Query", level: 88 },
      { name: "Tableau", level: 82 },
      { name: "KPI Dashboards", level: 93 },
      { name: "Excel (Advanced)", level: 90 },
    ],
  },
  {
    icon: Code2,
    title: "Data Analysis",
    color: "indigo",
    skills: [
      { name: "SQL", level: 92 },
      { name: "Python", level: 87 },
      { name: "Pandas / NumPy", level: 85 },
      { name: "Trend Analysis", level: 88 },
      { name: "Forecasting", level: 80 },
      { name: "Regression Models", level: 75 },
    ],
  },
  {
    icon: Database,
    title: "Data Engineering",
    color: "violet",
    skills: [
      { name: "ETL Pipelines", level: 84 },
      { name: "Azure Data Factory", level: 78 },
      { name: "Apache Spark", level: 72 },
      { name: "Azure Synapse", level: 74 },
      { name: "dbt (Core)", level: 70 },
      { name: "Snowflake", level: 68 },
    ],
  },
  {
    icon: Cloud,
    title: "Cloud & Tools",
    color: "sky",
    skills: [
      { name: "Microsoft Azure", level: 80 },
      { name: "AWS", level: 65 },
      { name: "Google Cloud", level: 62 },
      { name: "Docker", level: 70 },
      { name: "Git / GitHub", level: 90 },
      { name: "REST APIs", level: 82 },
    ],
  },
];

const colorMap: Record<string, { bg: string; bar: string; icon: string; badge: string }> = {
  blue:   { bg: "bg-blue-50",   bar: "bg-blue-500",   icon: "text-blue-600",   badge: "bg-blue-50 border-blue-100 text-blue-700" },
  indigo: { bg: "bg-indigo-50", bar: "bg-indigo-500", icon: "text-indigo-600", badge: "bg-indigo-50 border-indigo-100 text-indigo-700" },
  violet: { bg: "bg-violet-50", bar: "bg-violet-500", icon: "text-violet-600", badge: "bg-violet-50 border-violet-100 text-violet-700" },
  sky:    { bg: "bg-sky-50",    bar: "bg-sky-500",    icon: "text-sky-600",    badge: "bg-sky-50 border-sky-100 text-sky-700" },
};

export function Skills() {
  return (
    <section id="skills" className="py-24 bg-[#F8FAFC]">
      <div className="section-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">Technical Expertise</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight">
            Skills & Technologies
          </h2>
          <p className="mt-4 text-[15px] text-slate-400 max-w-xl mx-auto leading-relaxed">
            A focused, practical skill set built through real-world analytics projects across multiple industries.
          </p>
        </motion.div>

        {/* Skill cards grid */}
        <div className="grid md:grid-cols-2 gap-6">
          {skillGroups.map((group, gi) => {
            const colors = colorMap[group.color];
            const Icon = group.icon;
            return (
              <motion.div
                key={group.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: gi * 0.08, ease: "easeOut" }}
                className="card-pro p-6"
              >
                {/* Card header */}
                <div className="flex items-center gap-3 mb-5">
                  <div className={`h-10 w-10 rounded-xl ${colors.bg} border border-opacity-50 flex items-center justify-center`}>
                    <Icon className={`h-5 w-5 ${colors.icon}`} />
                  </div>
                  <h3 className="font-bold text-[#0F172A] text-[16px]">{group.title}</h3>
                </div>

                {/* Skills list with bars */}
                <div className="space-y-3.5">
                  {group.skills.map((skill) => (
                    <div key={skill.name}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-sm font-medium text-slate-700">{skill.name}</span>
                        <span className="text-xs text-slate-400 font-medium">{skill.level}%</span>
                      </div>
                      <div className="h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <motion.div
                          className={`h-full rounded-full ${colors.bar}`}
                          initial={{ width: 0 }}
                          whileInView={{ width: `${skill.level}%` }}
                          viewport={{ once: true }}
                          transition={{ duration: 0.7, delay: 0.1, ease: "easeOut" }}
                        />
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
