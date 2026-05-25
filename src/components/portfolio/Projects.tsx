import { useState } from "react";
import { motion } from "framer-motion";
import { Eye, Target, Tag, Sparkles, ArrowRight } from "lucide-react";
import { staticProjects } from "@/lib/projects-data";
import { Link } from "@tanstack/react-router";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const filters = [
  "All",
  "Business Intelligence",
  "Data Analysis",
  "Data Engineering"
];

export function Projects() {
  const [activeFilter, setActiveFilter] = useState("All");

  // Frontend filter matching
  const filteredProjects = staticProjects.filter(p => {
    if (activeFilter === "All") return true;
    return p.category.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <section id="projects" className="py-24 bg-[#F8FAFC] border-t border-slate-100">
      <div className="section-container max-w-[1200px] mx-auto px-5 sm:px-8 space-y-12">

        {/* Heading */}
        <motion.div
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
        </motion.div>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2.5 pb-4 border-b border-slate-100">
          {filters.map((f) => (
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

        {/* PROJECTS GRID */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, i) => (
            <motion.div
              key={project.slug}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
              className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-slate-350 transition-all duration-300 flex flex-col justify-between group"
            >
              <div className="flex flex-col">
                {/* Visual Thumbnail */}
                <div className="aspect-[16/9] overflow-hidden border-b border-slate-100 relative bg-slate-50 select-none">
                  <img
                    src={project.image_url}
                    alt={project.title}
                    className="h-full w-full object-cover transform group-hover:scale-[1.02] transition-transform duration-500"
                  />
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

                  {/* Objectives */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Target className="h-3.5 w-3.5 shrink-0" />
                      <span className="text-[9px] font-bold uppercase tracking-wider">Objectives</span>
                    </div>
                    <ul className="space-y-1.5">
                      {project.objectives.slice(0, 2).map((obj, i) => (
                        <li key={i} className="flex gap-2 items-start text-[11px] sm:text-xs text-slate-555 leading-relaxed font-semibold">
                          <span className="h-1 w-1 rounded-full bg-blue-500 mt-2 shrink-0" />
                          <span className="line-clamp-2">{obj}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* Tech stack */}
                  <div className="space-y-2">
                    <div className="flex items-center gap-1.5 text-slate-400">
                      <Tag className="h-3.5 w-3.5 shrink-0" />
                      <span className="text-[9px] font-bold uppercase tracking-wider">Technologies Used</span>
                    </div>
                    <div className="flex flex-wrap gap-1.5">
                      {project.technologies.slice(0, 4).map((tech) => (
                        <span 
                          key={tech} 
                          className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200/50 text-[9px] text-slate-650 font-bold uppercase tracking-wider"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.technologies.length > 4 && (
                        <span className="text-[9px] text-slate-400 font-bold">+{project.technologies.length - 4}</span>
                      )}
                    </div>
                  </div>

                  {/* Impact */}
                  <div className="bg-emerald-50/50 border border-emerald-150 rounded-2xl p-4 space-y-1">
                    <div className="flex items-center gap-1.5 text-emerald-700">
                      <Sparkles className="h-3.5 w-3.5 shrink-0" />
                      <span className="text-[9px] font-bold uppercase tracking-wider">Impact Achieved</span>
                    </div>
                    <p className="text-emerald-800 text-xs leading-relaxed font-bold">
                      {project.impact}
                    </p>
                  </div>

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
            </motion.div>
          ))}
        </div>

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
