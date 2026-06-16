import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { PageHero } from "@/components/portfolio/PageHero";
import { getErrorMessage } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getProjects, Project } from "@/lib/api";
import { Eye, Sparkles, ArrowRight, Loader2, AlertCircle, FolderOpen } from "lucide-react";
import { motion } from "framer-motion";
import { getLogosForText } from "@/data/tools";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export const Route = createFileRoute("/projects/")({
  head: () => ({
    meta: [
      { title: "Case Studies & Analytics Projects — Zain Haidar" },
      {
        name: "description",
        content:
          "Explore real-world case studies detailing business dashboards engineering, calculation optimization, SQL databases, and forecasting pipelines by Zain Haidar.",
      },
    ],
  }),
  component: ProjectsPage,
});

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
      } catch (err: unknown) {
        setError(getErrorMessage(err, "Failed to load projects catalog."));
      } finally {
        setLoading(false);
      }
    }
    loadProjectsData();
  }, []);

  const filters = ["All", ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean)))];
  const filteredProjects = projects.filter((p) => {
    if (activeFilter === "All") return true;
    return p.category?.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <main className="bg-[#050505] min-h-screen flex flex-col">
      <Header />

      <PageHero
        eyebrow="Analytics Portfolio"
        title="Real-world case studies & outcomes."
        description="Every project is a deep-dive solution engineered to solve an exact organizational bottleneck. Explore the business problems, technical execution layers, and measurable commercial results below."
      />

      <section className="py-24 flex-grow bg-[#050505]">
        <div className="mx-auto max-w-[1200px] px-6 space-y-12">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 pb-6 border-b border-[rgba(255,255,255,0.08)]">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-6 py-2.5 rounded-full text-xs font-normal tracking-wide transition-all duration-300 cursor-pointer select-none border ${
                  activeFilter === f
                    ? "bg-[#8B5CF6] border-[#8B5CF6] text-white shadow-[0_0_20px_rgba(139,92,246,0.25)]"
                    : "bg-[#111111] border-[rgba(255,255,255,0.08)] text-[#8B8B98] hover:text-white hover:border-[rgba(145,92,255,0.30)]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Loader */}
          {loading && (
            <div className="flex flex-col justify-center items-center py-24 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-[#8B5CF6]" />
              <span className="text-xs text-[#8B8B98] font-normal">Loading project catalog...</span>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="p-6 bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.2)] rounded-2xl flex items-start gap-4 max-w-2xl mx-auto shadow-none">
              <AlertCircle className="h-6 w-6 text-red-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-normal text-red-200 text-sm">Failed to Load Projects</h4>
                <p className="text-xs text-red-400/80 mt-1.5 leading-relaxed">{error}</p>
              </div>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && filteredProjects.length === 0 && (
            <div className="border border-[rgba(145,92,255,0.15)] rounded-2xl p-16 text-center bg-[#111111] max-w-xl mx-auto">
              <div className="h-14 w-14 rounded-2xl bg-[#1B102B] border border-[rgba(139,92,246,0.20)] flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="h-6 w-6 text-[#8B5CF6]" />
              </div>
              <h3 className="font-normal text-white text-base mb-1.5">No Projects Found</h3>
              <p className="text-[#8B8B98] text-xs leading-relaxed">
                No case studies match this classification.
              </p>
            </div>
          )}

          {/* Grid */}
          {!loading && !error && filteredProjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((p, idx) => {
                const technologies = Array.isArray(p.technologies) ? p.technologies : [];
                const metrics = Array.isArray(p.metrics) ? p.metrics : [];

                return (
                  <motion.div
                    key={p.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: idx * 0.07, ease: EASE }}
                    className="site-card overflow-hidden flex flex-col group"
                  >
                    {/* Thumbnail */}
                    <div className="aspect-[16/9] overflow-hidden border-b border-[rgba(255,255,255,0.08)] relative bg-[#050505]">
                      {p.image_url ? (
                        <img
                          src={p.image_url}
                          alt={p.title}
                          className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-[#8B8B98]">
                          <Eye className="h-10 w-10 stroke-1" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="site-card-label bg-[rgba(139,92,246,0.12)] border border-[rgba(139,92,246,0.25)] px-3.5 py-1 rounded-full">
                          {p.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-5 flex-1 flex flex-col">
                      <div className="space-y-2">
                        <h3 className="site-card-title text-base sm:text-lg leading-snug">
                          {p.title}
                        </h3>
                        <p className="site-card-text text-xs sm:text-sm leading-relaxed line-clamp-3">
                          {p.short_description || "Project details coming soon."}
                        </p>
                      </div>

                      {/* Tech tags */}
                      {technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {technologies.slice(0, 4).map((tech) => {
                            const matchedLogos = getLogosForText(tech);
                            const logo = matchedLogos[0];
                            return (
                              <span
                                key={tech}
                                className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-[rgba(139,92,246,0.06)] border border-[rgba(139,92,246,0.12)] text-[10px] font-normal text-[#D8D8E0]"
                              >
                                {logo && (
                                  <img src={logo.logo} alt="" className="h-3.5 w-3.5 object-contain shrink-0" />
                                )}
                                <span>{tech}</span>
                              </span>
                            );
                          })}
                          {technologies.length > 4 && (
                            <span className="text-[10px] text-[#8B8B98] font-normal flex items-center pl-1">
                              +{technologies.length - 4} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Metric Tag */}
                      {metrics.length > 0 && (
                        <div className="bg-[rgba(139,92,246,0.06)] rounded-xl p-3.5 border border-[rgba(139,92,246,0.12)] mt-auto">
                          <p className="text-xs font-normal text-white flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-[#8B5CF6] shrink-0" />
                            <span className="text-[#8B8B98] font-normal truncate">
                              {metrics[0].label}:
                            </span>
                            <span className="font-normal text-white truncate">
                              {metrics[0].value}
                            </span>
                          </p>
                        </div>
                      )}

                      <div className="mt-auto pt-2">
                        <Link
                          to="/projects/$slug"
                          params={{ slug: p.slug }}
                          className="site-card-link inline-flex items-center gap-1.5 text-[13px]"
                        >
                          <span>View Case Study</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Bottom Callout */}
          <div className="bg-[#111111] border border-[rgba(145,92,255,0.20)] rounded-2xl p-8 sm:p-12 md:p-16 flex flex-col sm:flex-row justify-between items-center gap-6 relative overflow-hidden">
            <div className="absolute -bottom-24 -right-24 w-[280px] h-[280px] rounded-full bg-[rgba(139,92,246,0.04)] blur-3xl pointer-events-none" />

            <div className="space-y-3 text-center sm:text-left relative z-10 max-w-lg">
              <h4 className="font-normal text-white text-lg sm:text-xl">
                Need similar outcomes in your business?
              </h4>
              <p className="text-[#8B8B98] text-xs sm:text-sm leading-relaxed">
                Let's discuss how we can build automated queries and robust dashboards tailored to
                your data scope.
              </p>
            </div>
            <Button
              asChild
              variant="primary"
              className="relative z-10"
            >
              <Link to="/contact" className="flex items-center gap-2">
                <span>Discuss a Project</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
