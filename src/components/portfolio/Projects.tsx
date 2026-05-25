import { useEffect, useState } from "react";
import { motion as motionElement } from "framer-motion";
import { Eye, Target, Tag, Sparkles, ArrowRight, AlertCircle, Inbox } from "lucide-react";
import { getProjects, Project } from "@/lib/api";
import { Link } from "@tanstack/react-router";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        const data = await getProjects();
        setProjects(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load projects");
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  // Collect unique categories dynamically from database rows
  const categories = ["All", ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))];

  // Frontend filter matching
  const filteredProjects = projects.filter(p => {
    if (activeFilter === "All") return true;
    return p.category?.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <section id="projects" className="py-24 bg-[#F8FAFC] border-t border-slate-100">
      <div className="section-container max-w-[1200px] mx-auto px-5 sm:px-8 space-y-12">

        {/* Heading */}
        <motionElement.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="space-y-3"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">Portfolio</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight">
            Featured Case Studies
          </h2>
          <p className="text-[15px] text-slate-500 leading-relaxed max-w-2xl font-medium">
            Selected projects demonstrating dashboard automation, data engineering pipelines, time-series forecasting, and high-impact analytics delivery.
          </p>
        </motionElement.div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2.5 pb-4 border-b border-slate-100">
          {categories.map((f) => (
            <button
              key={f}
              onClick={() => setActiveFilter(f)}
              className={`px-4 py-1.5 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer select-none border ${
                activeFilter === f
                  ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10"
                  : "bg-white border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200"
              }`}
            >
              {f}
            </button>
          ))}
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="bg-white border border-slate-200/60 rounded-3xl p-6 space-y-5 animate-pulse">
                <div className="aspect-[16/9] bg-slate-100 rounded-2xl w-full" />
                <div className="h-6 bg-slate-200 rounded w-1/3" />
                <div className="h-4 bg-slate-155 rounded w-5/6" />
                <div className="h-4 bg-slate-100 rounded w-full" />
                <div className="h-8 bg-slate-100 rounded w-1/4" />
              </div>
            ))}
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="p-6 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3.5 max-w-2xl mx-auto shadow-xs">
            <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-rose-800 text-sm">Failed to Load Projects</h4>
              <p className="text-xs text-rose-600 mt-1 leading-normal font-semibold">{error}</p>
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && filteredProjects.length === 0 && (
          <div className="border border-slate-200 rounded-3xl p-16 text-center bg-white max-w-xl mx-auto shadow-xs">
            <div className="h-12 w-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-4">
              <Inbox className="h-5 w-5 text-slate-400" />
            </div>
            <h3 className="font-bold text-slate-800 text-base mb-1">No Projects Found</h3>
            <p className="text-slate-500 text-xs leading-relaxed font-semibold">
              No projects match this category in the database.
            </p>
          </div>
        )}

        {/* PROJECTS GRID */}
        {!loading && !error && filteredProjects.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, i) => {
              const technologies = Array.isArray(project.technologies) ? project.technologies : [];
              const metrics = Array.isArray(project.metrics) ? project.metrics : [];
              const approach = Array.isArray(project.approach) ? project.approach : [];
              const outcomes = Array.isArray(project.outcome) ? project.outcome : [];

              return (
                <motionElement.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
                  className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-slate-350 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="flex flex-col">
                    {/* Visual Thumbnail */}
                    <div className="aspect-[16/9] overflow-hidden border-b border-slate-100 relative bg-slate-50 select-none">
                      {project.image_url ? (
                        <img
                          src={project.image_url}
                          alt={project.title}
                          className="h-full w-full object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
                        />
                      ) : (
                        <div className="h-full w-full bg-slate-100 flex items-center justify-center text-slate-300">
                          <Eye className="h-10 w-10 stroke-1" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="text-[9px] uppercase font-bold text-blue-600 tracking-wider bg-white/95 backdrop-blur-xs border border-slate-100 px-3 py-1 rounded-full shadow-2xs">
                          {project.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Block */}
                    <div className="p-6 space-y-5">
                      <div className="space-y-2">
                        <h3 className="font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors text-base sm:text-[17px] tracking-tight leading-snug">
                          {project.title}
                        </h3>
                        <p className="text-slate-500 text-xs sm:text-[12.5px] leading-relaxed font-semibold">
                          {project.short_description}
                        </p>
                      </div>

                      {/* Objectives (Mapped from database approach) */}
                      {approach.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Target className="h-3.5 w-3.5 shrink-0" />
                            <span className="text-[9px] font-bold uppercase tracking-wider">Objectives &amp; Approach</span>
                          </div>
                          <ul className="space-y-1.5">
                            {approach.slice(0, 2).map((obj, i) => (
                              <li key={i} className="flex gap-2 items-start text-[11px] sm:text-xs text-slate-550 leading-relaxed font-semibold">
                                <span className="h-1 w-1 rounded-full bg-blue-500 mt-2 shrink-0" />
                                <span className="line-clamp-2">{obj}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}

                      {/* Tech stack */}
                      {technologies.length > 0 && (
                        <div className="space-y-2">
                          <div className="flex items-center gap-1.5 text-slate-400">
                            <Tag className="h-3.5 w-3.5 shrink-0" />
                            <span className="text-[9px] font-bold uppercase tracking-wider">Technologies Used</span>
                          </div>
                          <div className="flex flex-wrap gap-1.5">
                            {technologies.slice(0, 4).map((tech) => (
                              <span 
                                key={tech} 
                                className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200/50 text-[9px] text-slate-650 font-bold uppercase tracking-wider"
                              >
                                {tech}
                              </span>
                            ))}
                            {technologies.length > 4 && (
                              <span className="text-[9px] text-slate-400 font-bold">+{technologies.length - 4}</span>
                            )}
                          </div>
                        </div>
                      )}

                      {/* Impact (Mapped from outcomes or first metric) */}
                      {(outcomes.length > 0 || metrics.length > 0) && (
                        <div className="bg-emerald-50/50 border border-emerald-150 rounded-2xl p-4 space-y-1">
                          <div className="flex items-center gap-1.5 text-emerald-700">
                            <Sparkles className="h-3.5 w-3.5 shrink-0" />
                            <span className="text-[9px] font-bold uppercase tracking-wider">Impact Achieved</span>
                          </div>
                          <p className="text-emerald-800 text-xs leading-relaxed font-bold">
                            {outcomes[0] || (metrics[0] ? `${metrics[0].label}: ${metrics[0].value}` : "Delivered measurable business outcomes.")}
                          </p>
                        </div>
                      )}

                    </div>
                  </div>

                  {/* View Case Study CTA */}
                  <div className="px-6 pb-6 pt-2">
                    <Link
                      to="/projects/$slug"
                      params={{ slug: project.slug }}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm shadow-blue-500/10 transition cursor-pointer"
                    >
                      <Eye className="h-4 w-4 shrink-0" />
                      <span>View Case Study</span>
                    </Link>
                  </div>
                </motionElement.div>
              );
            })}
          </div>
        )}

        {/* View All Projects Link */}
        <div className="mt-12 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs sm:text-[13px] font-bold text-blue-600 hover:text-blue-800 transition-colors group cursor-pointer"
          >
            <span>Explore all detailed case studies</span>
            <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-1 transition-transform" />
          </Link>
        </div>

      </div>
    </section>
  );
}
