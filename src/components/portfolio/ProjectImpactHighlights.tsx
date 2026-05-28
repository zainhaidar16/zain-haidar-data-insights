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
    <section className="py-24 bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-14"
        >
          <p className="text-[12px] font-semibold uppercase tracking-widest text-[#71717A] mb-3">
            Case Studies
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#09090B] leading-tight max-w-lg">
              Project Impact Highlights
            </h2>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#F97316] hover:text-[#EA580C] transition-colors"
            >
              View all projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {loading && (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-payoneer p-6 animate-pulse">
                <div className="aspect-[16/9] bg-[#F4F4F5] rounded-xl mb-4" />
                <div className="h-5 bg-[#E4E4E7] rounded w-3/4 mb-3" />
                <div className="h-4 bg-[#F4F4F5] rounded w-full mb-2" />
                <div className="h-4 bg-[#F4F4F5] rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="py-16 text-center max-w-md mx-auto">
            <div className="h-12 w-12 rounded-full bg-[#FAFAFA] border border-[#E4E4E7] flex items-center justify-center mx-auto mb-4">
              <Inbox className="h-5 w-5 text-[#71717A]" />
            </div>
            <h4 className="font-bold text-[#09090B] text-sm mb-1">No featured projects yet</h4>
            <p className="text-xs text-[#71717A]">Featured case studies will appear here.</p>
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
                  <div className="aspect-[16/9] overflow-hidden border-b border-[#E4E4E7] bg-[#FAFAFA]">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="w-[70%] rounded-2xl border border-[#E4E4E7] bg-white p-4 shadow-sm">
                          <div className="flex items-center justify-between text-[9px] text-[#71717A] font-semibold">
                            <span>Snapshot</span>
                            <span>Last 90 days</span>
                          </div>
                          <div className="mt-3 grid grid-cols-5 gap-2 items-end h-16">
                            {[28, 36, 44, 62, 48].map((h, idx) => (
                              <div
                                key={idx}
                                style={{ height: `${h}%` }}
                                className={`rounded-md ${idx > 2 ? "bg-[#09090B]" : "bg-[#F97316]"}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <span className="text-[10px] font-semibold uppercase tracking-widest text-[#71717A] mb-2">
                      {project.category}
                    </span>
                    <h3 className="font-bold text-[#09090B] text-[16px] leading-snug mb-2 group-hover:text-[#F97316] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[13px] text-[#71717A] leading-relaxed mb-4 flex-1">
                      {project.short_description}
                    </p>

                    {outcomes.length > 0 && (
                      <div className="bg-[#FFF7ED] rounded-xl px-4 py-3 mb-4 border border-[#FDBA74]/30">
                        <p className="text-[12px] font-semibold text-[#09090B]">
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
                            className="px-2 py-0.5 rounded-full bg-[#F4F4F5] border border-[#E4E4E7] text-[10px] font-medium text-[#71717A]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <Link
                      to="/projects/$slug"
                      params={{ slug: project.slug }}
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#F97316] hover:text-[#EA580C] transition-colors mt-auto"
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
