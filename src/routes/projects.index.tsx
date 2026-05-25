import { createFileRoute, Link } from "@tanstack/react-router";
import { useState } from "react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { staticProjects } from "@/lib/projects-data";
import { BarChart3, Briefcase, Eye, Target, Sparkles, Database, TrendingUp, Tag, ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Case Studies & Analytics Projects — Zain Haidar" },
      { name: "description", content: "Explore real-world case studies detailing business dashboards engineering, calculation optimization, SQL databases, and forecasting pipelines by Zain Haidar." },
    ],
  }),
  component: ProjectsPage,
});

const filters = [
  "All",
  "Business Intelligence",
  "Data Analysis",
  "Data Engineering"
];

function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  // Frontend filtering
  const filteredProjects = staticProjects.filter(p => {
    if (activeFilter === "All") return true;
    return p.category.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <main className="bg-[#F8FAFC] min-h-screen flex flex-col font-poppins text-slate-800">
      <Header />
      
      <section className="pt-32 md:pt-40 pb-24 flex-grow">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 space-y-12">
          
          {/* Header */}
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">Analytics Portfolio</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              Real-World Case Studies &amp; Outcomes
            </h1>
            <p className="text-slate-500 text-xs sm:text-[14px] leading-relaxed font-semibold">
              Every project is a deep-dive solution engineered to solve an exact organizational bottleneck. Explore the business problems, technical execution layers, and measurable commercial results below.
            </p>
          </div>

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2.5 pb-4 border-b border-slate-100">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4.5 py-2 rounded-xl text-xs font-bold uppercase tracking-wider transition-all duration-200 cursor-pointer select-none border ${
                  activeFilter === f
                    ? "bg-blue-600 border-blue-600 text-white shadow-md shadow-blue-500/10"
                    : "bg-white border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-200"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Projects Grid */}
          {filteredProjects.length === 0 ? (
            <div className="border border-slate-200 rounded-3xl p-16 text-center bg-white max-w-xl mx-auto shadow-xs">
              <div className="h-12 w-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-4">
                <Briefcase className="h-5 w-5 text-slate-400" />
              </div>
              <h3 className="font-bold text-slate-800 text-base mb-1">No Projects Found</h3>
              <p className="text-slate-500 text-xs leading-relaxed font-semibold">
                No case studies match this classification yet.
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((p, idx) => (
                <motion.div 
                  key={p.slug}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: idx * 0.08, ease: EASE }}
                  className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-slate-350 transition-all duration-300 flex flex-col justify-between group"
                >
                  <div className="flex flex-col">
                    {/* Visual Thumbnail Preview */}
                    <div className="aspect-[16/9] overflow-hidden border-b border-slate-100 relative bg-slate-50 select-none">
                      <img 
                        src={p.image_url} 
                        alt={p.title} 
                        className="h-full w-full object-cover transform group-hover:scale-[1.02] transition-transform duration-500" 
                      />
                      <div className="absolute top-4 left-4">
                        <span className="text-[9px] uppercase font-bold text-blue-600 tracking-wider bg-white/95 backdrop-blur-xs border border-slate-100 px-3 py-1 rounded-full shadow-2xs">
                          {p.category}
                        </span>
                      </div>
                    </div>

                    {/* Content Block */}
                    <div className="p-6 space-y-5">
                      <div className="space-y-2">
                        <h3 className="font-extrabold text-slate-900 group-hover:text-blue-600 transition-colors text-base sm:text-[17px] tracking-tight leading-snug">
                          {p.title}
                        </h3>
                        <p className="text-slate-500 text-xs sm:text-[12.5px] leading-relaxed font-semibold">
                          {p.short_description}
                        </p>
                      </div>

                      {/* Objectives */}
                      <div className="space-y-2">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Target className="h-3.5 w-3.5 shrink-0" />
                          <span className="text-[9px] font-bold uppercase tracking-wider">Objectives</span>
                        </div>
                        <ul className="space-y-1.5">
                          {p.objectives.slice(0, 2).map((obj, i) => (
                            <li key={i} className="flex gap-2 items-start text-[11px] sm:text-xs text-slate-550 leading-relaxed font-semibold">
                              <span className="h-1 w-1 rounded-full bg-blue-500 mt-2 shrink-0" />
                              <span className="line-clamp-2">{obj}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      {/* Tech stack tags */}
                      <div className="space-y-2 pt-1">
                        <div className="flex items-center gap-1.5 text-slate-400">
                          <Tag className="h-3.5 w-3.5 shrink-0" />
                          <span className="text-[9px] font-bold uppercase tracking-wider">Technologies Used</span>
                        </div>
                        <div className="flex flex-wrap gap-1.5">
                          {p.technologies.slice(0, 4).map((tech) => (
                            <span 
                              key={tech} 
                              className="px-2 py-0.5 rounded bg-slate-50 border border-slate-200/50 text-[9px] text-slate-650 font-bold uppercase tracking-wider"
                            >
                              {tech}
                            </span>
                          ))}
                          {p.technologies.length > 4 && (
                            <span className="text-[9px] text-slate-400 font-bold">+{p.technologies.length - 4}</span>
                          )}
                        </div>
                      </div>

                      {/* High-level Impact Container */}
                      <div className="bg-emerald-50/50 border border-emerald-150 rounded-2xl p-4 space-y-1">
                        <div className="flex items-center gap-1.5 text-emerald-700">
                          <Sparkles className="h-3.5 w-3.5 shrink-0" />
                          <span className="text-[9px] font-bold uppercase tracking-wider">Impact Achieved</span>
                        </div>
                        <p className="text-emerald-800 text-xs leading-relaxed font-bold">
                          {p.impact}
                        </p>
                      </div>

                    </div>
                  </div>

                  {/* View Case Study CTA */}
                  <div className="px-6 pb-6 pt-2">
                    <Link
                      to="/projects/$slug"
                      params={{ slug: p.slug }}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm shadow-blue-500/10 transition cursor-pointer"
                    >
                      <Eye className="h-4 w-4 shrink-0" />
                      <span>View Case Study</span>
                    </Link>
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Consultation Lead Box */}
          <div className="bg-[#0F172A] border border-slate-800 shadow-md rounded-3xl p-6 sm:p-10 text-white flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h4 className="font-bold text-base sm:text-lg">Need similar outcomes in your business?</h4>
              <p className="text-slate-400 text-xs font-semibold">Let's discuss how we can build automated queries and robust dashboards tailored specifically to your data scope.</p>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition shadow-md shadow-blue-500/10 cursor-pointer self-stretch sm:self-auto justify-center"
            >
              <span>Discuss a Project</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
