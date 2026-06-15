import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, FolderOpen, ExternalLink, Github } from "lucide-react";
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
    <section className="py-24 md:py-28 bg-[#0F1012] border-t border-[rgba(245,245,243,0.10)]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-14"
        >
          <p className="text-[12px] font-normal uppercase tracking-widest text-[#AAA9A3] mb-3">
            Case Studies
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#F5F5F3] leading-tight max-w-lg">
              Project Impact Highlights
            </h2>
            <Link
              to="/projects"
              className="inline-flex items-center gap-1.5 text-[13px] font-normal text-[#D8D8D2] hover:text-[#F5F5F3] transition-colors"
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
                className="card-payoneer p-6 animate-pulse bg-[#151619] border border-[rgba(245,245,243,0.10)] rounded-[24px]"
              >
                <div className="aspect-[16/9] bg-[#1D1E22] rounded-xl mb-4" />
                <div className="h-5 bg-[#1D1E22] rounded w-3/4 mb-3" />
                <div className="h-4 bg-[#1D1E22] rounded w-full mb-2" />
                <div className="h-4 bg-[#1D1E22] rounded w-2/3" />
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="p-6 bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.2)] rounded-[24px] flex items-start gap-3.5 max-w-2xl mx-auto">
            <FolderOpen className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-normal text-red-200 text-sm">Failed to Load Projects</h4>
              <p className="text-xs text-red-400/80 mt-1 leading-normal">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && projects.length === 0 && (
          <div className="py-16 text-center max-w-md mx-auto">
            <div className="h-14 w-14 rounded-full bg-[#151619] border border-[rgba(245,245,243,0.10)] flex items-center justify-center mx-auto mb-4">
              <FolderOpen className="h-6 w-6 text-[#D8D8D2]" />
            </div>
            <h4 className="font-normal text-[#F5F5F3] text-sm mb-2">No projects found</h4>
            <p className="text-xs text-[#AAA9A3] leading-relaxed">
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
                  className="card-payoneer overflow-hidden group flex flex-col bg-[#151619] border border-[rgba(245,245,243,0.10)] hover:border-[rgba(245,245,243,0.24)] hover:bg-[#1D1E22] hover:shadow-lg rounded-[24px] transition-all duration-300"
                >
                  <div className="aspect-[16/9] overflow-hidden border-b border-[rgba(245,245,243,0.10)] bg-[#0F1012] relative">
                    {project.image_url ? (
                      <img
                        src={project.image_url}
                        alt={project.title}
                        className="h-full w-full object-cover group-hover:scale-[1.03] transition-transform duration-500"
                      />
                    ) : (
                      <div className="h-full w-full flex items-center justify-center">
                        <div className="w-[70%] rounded-2xl border border-[rgba(245,245,243,0.10)] bg-[#151619] p-4 shadow-none">
                          <div className="flex items-center justify-between text-[9px] text-[#AAA9A3] font-normal">
                            <span>Snapshot</span>
                            <span>Last 90 days</span>
                          </div>
                          <div className="mt-3 grid grid-cols-5 gap-2 items-end h-16">
                            {[28, 36, 44, 62, 48].map((h, idx) => (
                              <div
                                key={idx}
                                style={{ height: `${h}%` }}
                                className={`rounded-md ${idx > 2 ? "bg-[#232428]" : "bg-[#D8D8D2]"}`}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    )}

                    <div className="absolute top-3 left-3">
                      <span className="text-[10px] uppercase font-normal text-[#D8D8D2] tracking-wider bg-[rgba(245,245,243,0.05)] border border-[rgba(245,245,243,0.10)] px-3 py-1 rounded-full">
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
                          className="h-7 w-7 rounded-full bg-[#151619]/80 border border-[rgba(245,245,243,0.10)] flex items-center justify-center text-[#D8D8D2] hover:text-white hover:border-[rgba(245,245,243,0.24)] transition-all"
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
                          className="h-7 w-7 rounded-full bg-[#151619]/80 border border-[rgba(245,245,243,0.10)] flex items-center justify-center text-[#D8D8D2] hover:text-white hover:border-[rgba(245,245,243,0.24)] transition-all"
                          title="GitHub Repository"
                        >
                          <Github className="h-3.5 w-3.5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <div className="p-6 flex-1 flex flex-col">
                    <h3 className="font-normal text-[#F5F5F3] text-[16px] leading-snug mb-2 group-hover:text-white transition-colors">
                      {project.title}
                    </h3>
                    <p className="text-[13px] text-[#D8D8D2]/80 leading-relaxed mb-4">
                      {project.short_description}
                    </p>

                    {/* Metric or Outcome */}
                    {metrics.length > 0 ? (
                      <div className="bg-[rgba(245,245,243,0.02)] rounded-xl px-4 py-3 mb-4 border border-[rgba(245,245,243,0.06)]">
                        <p className="text-[12px] font-normal text-[#F5F5F3] flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5 text-[#D8D8D2]" />
                          <span className="text-[#AAA9A3] font-normal truncate">
                            {metrics[0].label}:
                          </span>
                          <span className="truncate">{metrics[0].value}</span>
                        </p>
                      </div>
                    ) : outcomes.length > 0 ? (
                      <div className="bg-[rgba(245,245,243,0.02)] rounded-xl px-4 py-3 mb-4 border border-[rgba(245,245,243,0.06)]">
                        <p className="text-[12px] font-normal text-[#F5F5F3] flex items-center gap-1.5">
                          <Sparkles className="h-3.5 w-3.5 text-[#D8D8D2]" />
                          <span className="truncate">{outcomes[0]}</span>
                        </p>
                      </div>
                    ) : null}

                    {technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-5">
                        {technologies.slice(0, 3).map((tech) => (
                          <span
                            key={tech}
                            className="px-2.5 py-1 rounded-full bg-[#1D1E22] border border-[rgba(245,245,243,0.08)] text-[10px] font-normal text-[#D8D8D2]"
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
                        className="inline-flex items-center gap-1.5 text-[13px] font-normal text-[#D8D8D2] hover:text-[#F5F5F3] transition-colors cursor-pointer"
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
