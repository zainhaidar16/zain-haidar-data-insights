import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Calendar, Briefcase, AlertCircle, Inbox, MapPin, ArrowRight } from "lucide-react";
import { getExperience, Experience as ExperienceType } from "@/lib/api";
import { Link } from "@tanstack/react-router";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function Experience() {
  const [experiences, setExperiences] = useState<ExperienceType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadExperience() {
      try {
        setLoading(true);
        const data = await getExperience();
        setExperiences(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load experience");
      } finally {
        setLoading(false);
      }
    }
    loadExperience();
  }, []);

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

        {/* LOADING STATE */}
        {loading && (
          <div className="space-y-8 animate-pulse">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white border border-slate-200 p-6 sm:p-8 rounded-2xl space-y-4">
                <div className="h-6 bg-slate-200 rounded w-1/3" />
                <div className="h-4 bg-slate-100 rounded w-1/4" />
                <div className="h-4 bg-slate-100 rounded w-full" />
                <div className="space-y-2">
                  <div className="h-3.5 bg-slate-50 rounded w-11/12" />
                  <div className="h-3.5 bg-slate-50 rounded w-10/12" />
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
              <h4 className="font-bold text-rose-800 text-sm">Failed to Load Experience</h4>
              <p className="text-xs text-rose-600 mt-1 leading-normal font-semibold">{error}</p>
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && experiences.length === 0 && (
          <div className="py-16 text-center max-w-md mx-auto">
            <div className="h-12 w-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-4">
              <Inbox className="h-5 w-5 text-slate-400" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">No Experience Found</h4>
            <p className="text-xs text-slate-555 leading-normal font-semibold">
              No experience records are currently published in the database.
            </p>
          </div>
        )}

        {/* TIMELINE SECTION */}
        {!loading && !error && experiences.length > 0 && (
          <div className="relative">
            {/* Vertical Central Line */}
            <div className="absolute left-6 top-4 bottom-4 w-px bg-slate-200" />

            <div className="space-y-12">
              {experiences.map((exp, i) => {
                const isCurrent = exp.is_current;
                const periodText = isCurrent 
                  ? `${exp.start_year} – Present` 
                  : `${exp.start_year} – ${exp.end_year || ""}`;
                
                const bullets = Array.isArray(exp.bullet_points) ? exp.bullet_points : [];

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
                              <span className="inline-flex items-center text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-emerald-50 text-emerald-700 border border-emerald-255">
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

                      {/* Description */}
                      {exp.description && (
                        <p className="text-slate-700 text-xs sm:text-[13px] leading-relaxed mb-4 font-semibold">
                          {exp.description}
                        </p>
                      )}

                      {/* Key Highlights */}
                      {bullets.length > 0 && (
                        <ul className="space-y-2">
                          {bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-slate-500 leading-relaxed font-semibold">
                              <span className="h-1.5 w-1.5 rounded-full bg-blue-500 mt-2 shrink-0" />
                              <span>{bullet}</span>
                            </li>
                          ))}
                        </ul>
                      )}

                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>
        )}

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
