import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Inbox, Settings } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { getSkills, Skill } from "@/lib/api";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const categoryConfigs: Record<string, { color: string; icon: any }> = {
  "Business Intelligence": { color: "blue", icon: LucideIcons.BarChart2 },
  "Data Analysis": { color: "indigo", icon: LucideIcons.Code2 },
  "Data Engineering": { color: "violet", icon: LucideIcons.Database },
  "Cloud & Tools": { color: "sky", icon: LucideIcons.Cloud },
};

const colorMap: Record<string, { bg: string; icon: string; border: string; badge: string; text: string }> = {
  blue:   { bg: "bg-blue-50",   icon: "text-blue-600",   border: "border-blue-100",   badge: "bg-blue-50/40 border-blue-100 text-blue-700", text: "text-blue-700" },
  indigo: { bg: "bg-indigo-50", icon: "text-indigo-600", border: "border-indigo-100", badge: "bg-indigo-50/40 border-indigo-100 text-indigo-700", text: "text-indigo-700" },
  violet: { bg: "bg-violet-50", icon: "text-violet-600", border: "border-violet-100", badge: "bg-violet-50/40 border-violet-100 text-violet-700", text: "text-violet-700" },
  sky:    { bg: "bg-sky-50",    icon: "text-sky-600",    border: "border-sky-100",    badge: "bg-sky-50/40 border-sky-100 text-sky-700", text: "text-sky-700" },
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

  // Group flat skills array by category
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
      const config = categoryConfigs[catName] || { color: "blue", icon: Settings };
      return {
        title: catName,
        color: config.color,
        icon: config.icon,
        skills: grouped[catName]
      };
    });
  };

  const skillGroups = getGroupedSkills();

  return (
    <section id="skills" className="py-24 bg-[#F8FAFC] border-t border-slate-100">
      <div className="section-container">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">Technical Expertise</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight">
            Skills &amp; Technologies
          </h2>
          <p className="mt-4 text-[15px] text-slate-400 max-w-xl mx-auto leading-relaxed">
            A focused, practical skill set built through real-world analytics projects across multiple industries.
          </p>
        </motion.div>

        {/* LOADING STATE */}
        {loading && (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2].map((i) => (
              <div key={i} className="card-pro p-6 animate-pulse">
                <div className="flex items-center gap-3 mb-5">
                  <div className="h-10 w-10 rounded-xl bg-slate-100" />
                  <div className="h-6 bg-slate-200 rounded w-1/3" />
                </div>
                <div className="flex flex-wrap gap-2">
                  {[1, 2, 3, 4, 5].map((j) => (
                    <div key={j} className="h-8 bg-slate-100 rounded-full w-24" />
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="p-6 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3.5 max-w-2xl mx-auto">
            <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-rose-800 text-sm">Failed to Load Skills</h4>
              <p className="text-xs text-rose-600 mt-1 leading-normal">{error}</p>
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && skillGroups.length === 0 && (
          <div className="py-16 text-center max-w-md mx-auto">
            <div className="h-12 w-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-4">
              <Inbox className="h-5 w-5 text-slate-400" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">No Skills Found</h4>
            <p className="text-xs text-slate-500 leading-normal">
              No technical skills or categories have been published in the database yet.
            </p>
          </div>
        )}

        {/* SKILLS CARDS GRID */}
        {!loading && !error && skillGroups.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {skillGroups.map((group, gi) => {
              const colors = colorMap[group.color] || colorMap.blue;
              const Icon = group.icon;
              return (
                <motion.div
                  key={group.title}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: gi * 0.08, ease: EASE }}
                  className="card-pro p-6 hover:border-blue-400/40 transition-all duration-300"
                >
                  {/* Card header */}
                  <div className="flex items-center gap-3 mb-6">
                    <div className={`h-10 w-10 rounded-xl ${colors.bg} border ${colors.border} flex items-center justify-center`}>
                      <Icon className={`h-5 w-5 ${colors.icon}`} />
                    </div>
                    <h3 className="font-bold text-[#0F172A] text-[16px]">{group.title}</h3>
                  </div>

                  {/* Skills badges cloud */}
                  <div className="flex flex-wrap gap-2.5">
                    {group.skills.map((skill) => {
                      const hasLevel = skill.level !== undefined && skill.level !== null;
                      return (
                        <div
                          key={skill.id}
                          className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-semibold border ${colors.badge} transition-all duration-200 hover:scale-[1.02] bg-white`}
                        >
                          <span className="text-slate-700">{skill.name}</span>
                          {hasLevel && (
                            <>
                              <span className="h-1 w-1 rounded-full bg-slate-300" />
                              <span className={colors.text}>{skill.level}%</span>
                            </>
                          )}
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
