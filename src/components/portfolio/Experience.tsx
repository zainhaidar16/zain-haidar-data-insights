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
    <section id="experience" className="py-24 bg-white border-t border-[#E4E4E7]">
      <div className="section-container max-w-[1000px] mx-auto px-5 sm:px-8">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-16 max-w-3xl"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#F97316] mb-3">Career</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#09090B] leading-tight mb-4">
            Professional Experience
          </h2>
          <p className="text-[#71717A] text-[15px] leading-[1.8] font-medium">
            Over five years of experience partnering with teams to automate reports, build robust ETL pipelines, and deliver high-impact analytics solutions.
          </p>
        </motion.div>

        {loading && (
          <div className="space-y-8 animate-pulse">
            {[1, 2].map((i) => (
              <div key={i} className="bg-white border border-[#E4E4E7] p-6 sm:p-8 rounded-2xl space-y-4">
                <div className="h-6 bg-[#E4E4E7] rounded w-1/3" />
                <div className="h-4 bg-[#F4F4F5] rounded w-1/4" />
                <div className="h-4 bg-[#F4F4F5] rounded w-full" />
                <div className="space-y-2">
                  <div className="h-3.5 bg-[#FAFAFA] rounded w-11/12" />
                  <div className="h-3.5 bg-[#FAFAFA] rounded w-10/12" />
                </div>
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="p-6 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3.5 max-w-2xl mx-auto">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-red-800 text-sm">Failed to Load Experience</h4>
              <p className="text-xs text-red-600 mt-1 leading-normal font-semibold">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && experiences.length === 0 && (
          <div className="py-16 text-center max-w-md mx-auto">
            <div className="h-12 w-12 rounded-full bg-[#F4F4F5] border border-[#E4E4E7] flex items-center justify-center mx-auto mb-4">
              <Inbox className="h-5 w-5 text-[#71717A]" />
            </div>
            <h4 className="font-bold text-[#09090B] text-sm mb-1">No Experience Found</h4>
            <p className="text-xs text-[#71717A] leading-normal font-semibold">
              No experience records are currently published in the database.
            </p>
          </div>
        )}

        {!loading && !error && experiences.length > 0 && (
          <div className="relative">
            {/* Timeline line */}
            <div className="absolute left-6 top-4 bottom-4 w-px bg-[#E4E4E7]" />

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
                    {/* Node dot */}
                    <div className="absolute left-6 top-6 -translate-x-1/2 -translate-y-1/2 items-center justify-center z-10 flex">
                      <div className={`h-8 w-8 rounded-full border-2 flex items-center justify-center shadow-sm ${
                        isCurrent
                          ? "bg-[#F97316] border-[#F97316] text-white"
                          : "bg-white border-[#E4E4E7] text-[#71717A]"
                      }`}>
                        <Briefcase className="h-3.5 w-3.5" />
                      </div>
                    </div>

                    {/* Card */}
                    <div className="bg-white border border-[#E4E4E7] hover:border-[#F97316]/40 rounded-2xl p-6 shadow-sm hover:shadow-md transition-all duration-300">

                      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-4 pb-4 border-b border-[#E4E4E7]">
                        <div>
                          <div className="flex flex-wrap items-center gap-2 mb-1.5">
                            <h3 className="text-base sm:text-lg font-bold text-[#09090B]">
                              {exp.title}
                            </h3>
                            {isCurrent && (
                              <span className="inline-flex items-center text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded bg-[#FFF7ED] text-[#C2410C] border border-[#FDBA74]">
                                Current
                              </span>
                            )}
                          </div>

                          <div className="text-[13px] font-semibold text-[#F97316] flex flex-wrap items-center gap-x-2">
                            <span>{exp.company}</span>
                            <span className="text-[#E4E4E7] font-normal">•</span>
                            <span className="text-[#71717A] text-[11px] font-medium flex items-center gap-0.5">
                              <MapPin className="h-3 w-3 inline text-[#71717A] shrink-0" />
                              {exp.location}
                            </span>
                          </div>
                        </div>

                        <div className="flex items-center gap-2 text-[11px] font-semibold text-[#71717A] bg-[#F4F4F5] border border-[#E4E4E7] px-3 py-1 rounded-full shrink-0 h-fit w-fit">
                          <Calendar className="h-3 w-3 text-[#71717A]" />
                          <span>{periodText}</span>
                        </div>
                      </div>

                      {exp.description && (
                        <p className="text-[#71717A] text-xs sm:text-[13px] leading-relaxed mb-4 font-semibold">
                          {exp.description}
                        </p>
                      )}

                      {bullets.length > 0 && (
                        <ul className="space-y-2">
                          {bullets.map((bullet, idx) => (
                            <li key={idx} className="flex items-start gap-2.5 text-xs sm:text-[13px] text-[#71717A] leading-relaxed font-semibold">
                              <span className="h-1.5 w-1.5 rounded-full bg-[#F97316] mt-2 shrink-0" />
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

        <div className="mt-12 text-center">
          <Link
            to="/about"
            className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold text-[#F97316] hover:text-[#EA580C] transition-colors group cursor-pointer"
          >
            <span>View full problem-solution breakdowns on my About page</span>
            <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
