import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { getProjects, Project } from "@/lib/api";
import { Loader2, AlertCircle, Inbox, Tag, BarChart3, Briefcase, Eye } from "lucide-react";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Case Studies & Featured Projects — Zain The Analyst" },
      { name: "description", content: "Explore advanced business intelligence dashboard project metrics, data queries models, and SQL trend analysis reports by Zain Haidar." },
    ],
  }),
  component: ProjectsPage,
});

const filters = [
  "All",
  "Business Intelligence",
  "Data Analysis",
  "Data Engineering",
  "Business Analytics",
  "Analytics Web Solution"
];

function ProjectsPage() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeFilter, setActiveFilter] = useState("All");

  useEffect(() => {
    async function loadProjectsData() {
      try {
        setLoading(true);
        const data = await getProjects();
        setProjects(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load projects catalog.");
      } finally {
        setLoading(false);
      }
    }
    loadProjectsData();
  }, []);

  // Frontend filter matching
  const filteredProjects = projects.filter(p => {
    if (activeFilter === "All") return true;
    return p.category?.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <main className="bg-[#F8FAFC] min-h-screen flex flex-col font-poppins text-slate-800">
      <Header />
      
      <section className="pt-32 md:pt-40 pb-20 flex-grow animate-fade-in">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          
          {/* Header */}
          <div className="mb-10 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">Portfolio Case Studies</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight mb-4">
              Featured Analytics Projects
            </h2>
            <p className="text-slate-500 text-[15px] leading-[1.8] font-medium">
              Explore real-world case studies detailing business dashboards engineering, calculations optimizations, database pre-processing, and trend reporting models.
            </p>
          </div>

          {/* Filters List */}
          <div className="flex flex-wrap gap-2 mb-10 pb-4 border-b border-slate-100">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-4 py-2 rounded-xl text-xs font-semibold uppercase tracking-wider transition cursor-pointer select-none ${
                  activeFilter === f
                    ? "bg-blue-600 text-white shadow-md shadow-blue-500/10"
                    : "bg-white border border-slate-200 text-slate-500 hover:text-blue-600 hover:border-blue-100"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Loader */}
          {loading && (
            <div className="flex flex-col justify-center items-center py-24 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="text-xs text-slate-400 font-semibold">Loading project catalog...</span>
            </div>
          )}

          {/* Error Banner */}
          {error && !loading && (
            <div className="p-5 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3.5 max-w-2xl mx-auto shadow-xs">
              <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-rose-800 text-sm">Failed to Load Projects</h4>
                <p className="text-xs text-rose-600 mt-1 leading-normal font-semibold">{error}</p>
              </div>
            </div>
          )}

          {/* Empty Catalog State */}
          {!loading && !error && filteredProjects.length === 0 && (
            <div className="border border-slate-200 rounded-3xl p-16 text-center bg-white max-w-2xl mx-auto shadow-xs">
              <div className="h-12 w-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-4">
                <Inbox className="h-5 w-5 text-slate-400" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-1">No projects found.</h3>
              <p className="text-slate-550 text-xs max-w-md mx-auto leading-relaxed font-semibold">
                No case studies match this classification yet. Open the admin control room to publish new projects.
              </p>
            </div>
          )}

          {/* Projects Listing Grid */}
          {!loading && !error && filteredProjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((p) => (
                <div 
                  key={p.id} 
                  className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-xs hover:shadow-md hover:border-slate-250 transition-all duration-200 flex flex-col justify-between group"
                >
                  <div className="flex flex-col">
                    {/* Thumbnail image */}
                    {p.image_url ? (
                      <div className="aspect-[16/9] overflow-hidden border-b border-slate-100">
                        <img 
                          src={p.image_url} 
                          alt="" 
                          className="h-full w-full object-cover group-hover:scale-103 transition-transform duration-300 select-none" 
                        />
                      </div>
                    ) : (
                      <div className="aspect-[16/9] bg-slate-50 border-b border-slate-100 flex items-center justify-center text-slate-400 select-none">
                        <Briefcase className="h-8 w-8 stroke-1" />
                      </div>
                    )}

                    {/* Description Details block */}
                    <div className="p-6 space-y-4">
                      <div className="space-y-1.5">
                        <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">
                          {p.category}
                        </span>
                        <h3 className="font-bold text-slate-900 group-hover:text-blue-600 transition-colors text-lg tracking-tight leading-snug line-clamp-2">
                          {p.title}
                        </h3>
                        <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed font-semibold line-clamp-3">
                          {p.short_description}
                        </p>
                      </div>

                      {/* Metrics JSONB mapping cards */}
                      {p.metrics && p.metrics.length > 0 && (
                        <div className="grid grid-cols-2 gap-2 bg-slate-50/50 p-3 rounded-2xl border border-slate-150/40">
                          {p.metrics.slice(0, 2).map((m, idx) => (
                            <div key={idx} className="min-w-0">
                              <span className="text-[8px] uppercase font-bold text-slate-400 block tracking-wider truncate">
                                {m.label}
                              </span>
                              <span className="text-slate-800 font-extrabold text-xs tracking-tight truncate block mt-0.5">
                                {m.value}
                              </span>
                            </div>
                          ))}
                        </div>
                      )}

                      {/* Tech stack badges */}
                      {p.technologies && p.technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5 pt-1">
                          {p.technologies.slice(0, 4).map((tech) => (
                            <span 
                              key={tech} 
                              className="px-2 py-0.5 rounded bg-slate-100 border border-slate-200/40 text-[9px] text-slate-500 font-bold uppercase tracking-wider flex items-center gap-1"
                            >
                              <Tag className="h-2.5 w-2.5 shrink-0" />
                              <span>{tech}</span>
                            </span>
                          ))}
                          {p.technologies.length > 4 && (
                            <span className="text-[9px] text-slate-400 font-bold">+{p.technologies.length - 4}</span>
                          )}
                        </div>
                      )}
                    </div>
                  </div>

                  {/* CTA button */}
                  <div className="px-6 pb-6 pt-2">
                    <Link
                      to="/projects/$slug"
                      params={{ slug: p.slug }}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-700 hover:text-blue-600 hover:bg-slate-50 font-bold text-xs shadow-xs transition cursor-pointer"
                    >
                      <Eye className="h-4 w-4 shrink-0" />
                      <span>View Case Study</span>
                    </Link>
                  </div>

                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      <Footer />
    </main>
  );
}
