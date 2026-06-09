import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, Inbox } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { getFeaturedProjects, Project } from "@/lib/api";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function ProjectImpactHighlights() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      try {
        setLoading(true);
        const data = await getFeaturedProjects();
        setProjects(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load projects");
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <section className="py-24 md:py-28 bg-[#0E0E11]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-14"
        >
          <p className="text-[12px] font-semibold uppercase tracking-widest text-[#A1A1AA] mb-3">
            Case Studies
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#FAFAFA] leading-tight max-w-lg">
              Project Impact Highlights
            </h2>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#F97316] hover:text-[#FB923C] transition-colors"
            >
              View all projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {loading && (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-payoneer p-6 animate-pulse">
                <div className="aspect-[16/9] bg-[#16161A] rounded-xl mb-4" />
                <div className="h-5 bg-[#27272A] rounded w-3/4 mb-3" />
                <div className="h-4 bg-[#16161A] rounded w-full mb-2" />
                <div className="h-4 bg-[#16161A] rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="py-16 text-center max-w-md mx-auto">
            <div className="h-14 w-14 rounded-2xl bg-[#09090B] border border-[#232329] flex items-center justify-center mx-auto mb-4">
              <Inbox className="h-6 w-6 text-[#A1A1AA]" />
            </div>
            <h4 className="font-bold text-[#FAFAFA] text-sm mb-2">No featured projects yet</h4>
            <p className="text-xs text-[#A1A1AA] leading-relaxed">Featured case studies will appear here once published.</p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project, i) => {
              const outcomes = Array.isArray(project.outcome) ? project.outcome : [];
              const technologies = Array.isArray(project.technologies) ? project.technologies : [];

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
                  className="card-payoneer overflow-hidden group flex flex-col"
                >
                  <div className="aspect-[16/9] overflow-hidden border-b border-[#232329] bg-[#09090B]">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="w-[70%] rounded-2xl border border-[#232329] bg-[#0E0E11] p-4 shadow-sm">
                          <div className="flex items-center justify-between text-[9px] text-[#A1A1AA] font-semibold">
                            <span>Snapshot</span>
                            <span>Last 90 days</span>
                          </div>
                          <div className="mt-3 grid grid-cols-5 gap-2 items-end h-16">
                            {[28, 36, 44, 62, 48].map((h, idx) => (
                              <div
                                key={idx}
                                style={{ height: `${h}%` }}
                                className={`rounded-md ${idx > 2 ? "bg-[#131316]" : "bg-[#F97316]"}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    {/* Orange category label per rule 7 */}
                    <span className="text-[10px] font-bold uppercase tracking-widest text-[#F97316] mb-2">
                      {project.category}
                    </span>
                    <h3 className="font-bold text-[#FAFAFA] text-[16px] leading-snug mb-2 group-hover:text-[#F97316] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[13px] text-[#A1A1AA] leading-relaxed mb-4 flex-1">
                      {project.short_description}
                    </p>

                    {outcomes.length > 0 && (
                      <div className="bg-[#F97316]/10 rounded-xl px-4 py-3 mb-4 border border-[#F97316]/25">
                        <p className="text-[12px] font-semibold text-[#FAFAFA]">
                          <Sparkles className="h-3.5 w-3.5 inline mr-1.5 text-[#F97316]" />
                          {outcomes[0]}
                        </p>
                      </div>
                    )}

                    {technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-full bg-[#16161A] border border-[#232329] text-[10px] font-medium text-[#A1A1AA]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      to="/projects/$slug"
                      params={{ slug: project.slug }}
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#F97316] hover:text-[#FB923C] transition-colors mt-auto"
                    >
                      View case study <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
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
