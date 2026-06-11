import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, FolderOpen, ExternalLink, Github, Eye } from "lucide-react";
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
    <section className="py-24 md:py-28 bg-white border-t border-[#E8E8ED]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-14"
        >
          <p className="text-[12px] font-semibold uppercase tracking-widest text-[#0071E3] mb-3">
            Case Studies
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#1D1D1F] leading-tight max-w-lg">
              Project Impact Highlights
            </h2>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0071E3] hover:text-[#005BB5] transition-colors"
            >
              View all projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {loading && (
          <div className="grid md:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div
                key={i}
                className="card-payoneer p-6 animate-pulse bg-[#FBFBFD] border border-[#E8E8ED] rounded-[24px]"
              >
                <div className="aspect-[16/9] bg-[#F5F5F7] rounded-xl mb-4" />
                <div className="h-5 bg-[#F5F5F7] rounded w-3/4 mb-3" />
                <div className="h-4 bg-[#F5F5F7] rounded w-full mb-2" />
                <div className="h-4 bg-[#F5F5F7] rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="p-6 bg-red-50 border border-red-200 rounded-[24px] flex items-start gap-3.5 max-w-2xl mx-auto">
            <FolderOpen className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-red-800 text-sm">Failed to Load Projects</h4>
              <p className="text-xs text-red-600 mt-1 leading-normal">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="py-16 text-center max-w-md mx-auto">
            <div className="h-14 w-14 rounded-full bg-[#F5F5F7] border border-[#E8E8ED] flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="h-6 w-6 text-[#0071E3]" />
            </div>
            <h4 className="font-bold text-[#1D1D1F] text-sm mb-2">No projects found</h4>
            <p className="text-xs text-[#86868B] leading-relaxed">
              Featured case studies will appear here once published.
            </p>
          </div>
        )}

        {!loading && !error && projects.length > 0 && (
          <div className="grid md:grid-cols-3 gap-6">
            {projects.slice(0, 3).map((project, i) => {
              const outcomes = Array.isArray(project.outcome) ? project.outcome : [];
              const technologies = Array.isArray(project.technologies) ? project.technologies : [];
              const metrics = Array.isArray(project.metrics) ? project.metrics : [];

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
                  className="card-payoneer overflow-hidden group flex flex-col bg-[#FFFFFF] border border-[#E8E8ED] hover:border-[#0071E3]/30 hover:shadow-md rounded-[24px] transition-all duration-300"
                >
                  <div className="aspect-[16/9] overflow-hidden border-b border-[#E8E8ED] bg-[#F5F5F7] relative">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="w-[70%] rounded-2xl border border-[#E8E8ED] bg-[#FFFFFF] p-4 shadow-none">
                          <div className="flex items-center justify-between text-[9px] text-[#86868B] font-semibold">
                            <span>Snapshot</span>
                            <span>Last 90 days</span>
                          </div>
                          <div className="mt-3 grid grid-cols-5 gap-2 items-end h-16">
                            {[28, 36, 44, 62, 48].map((h, idx) => (
                              <div
                                key={idx}
                                style={{ height: `${h}%` }}
                                className={`rounded-md ${idx > 2 ? "bg-[#E8E8ED]" : "bg-[#0071E3]"}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] uppercase font-bold text-[#0071E3] tracking-wider bg-[rgba(0,113,227,0.06)] border border-[rgba(0,113,227,0.12)] px-3 py-1 rounded-full">
                        {project.category}
                      </span>
                    </div>

                    {/* External links top right overlay */}
                    <div className="absolute top-3 right-3 flex gap-2">
                      {project.live_url && (
                        <a
                          href={project.live_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-7 w-7 rounded-full bg-white/80 border border-[#E8E8ED] flex items-center justify-center text-[#6E6E73] hover:text-[#0071E3] transition-colors"
                          title="Live Demo"
                        >
                          <ExternalLink className="h-3.5 w-3.5" />
                        </a>
                      )}
                      {project.github_url && (
                        <a
                          href={project.github_url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="h-7 w-7 rounded-full bg-white/80 border border-[#E8E8ED] flex items-center justify-center text-[#6E6E73] hover:text-[#0071E3] transition-colors"
                          title="GitHub Repository"
                        >
                          <Github className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-bold text-[#1D1D1F] text-[16px] leading-snug mb-2 group-hover:text-[#0071E3] transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[13px] text-[#6E6E73] leading-relaxed mb-4">
                      {project.short_description}
                    </p>

                    {/* Metric or Outcome */}
                    {metrics.length > 0 ? (
                      <div className="bg-[rgba(0,113,227,0.04)] rounded-xl px-4 py-3 mb-4 border border-[rgba(0,113,227,0.08)]">
                        <p className="text-[12px] font-semibold text-[#1D1D1F] flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5 text-[#0071E3]" />
                          <span className="text-[#6E6E73] font-normal truncate">
                            {metrics[0].label}:
                          </span>
                          <span className="truncate">{metrics[0].value}</span>
                        </p>
                      </div>
                    ) : outcomes.length > 0 ? (
                      <div className="bg-[rgba(0,113,227,0.04)] rounded-xl px-4 py-3 mb-4 border border-[rgba(0,113,227,0.08)]">
                        <p className="text-[12px] font-semibold text-[#1D1D1F] flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5 text-[#0071E3]" />
                          <span className="truncate">{outcomes[0]}</span>
                        </p>
                      </div>
                    ) : null}

                    {technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-full bg-[#F5F5F7] border border-[#E8E8ED] text-[10px] font-medium text-[#6E6E73]"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-auto pt-2">
                      <Link
                        to="/projects/$slug"
                        params={{ slug: project.slug }}
                        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0071E3] hover:text-[#005BB5] transition-colors cursor-pointer"
                      >
                        <span>Case Study</span>
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Link>
                    </div>
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
