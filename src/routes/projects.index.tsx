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
    <main className="bg-background min-h-screen flex flex-col font-poppins text-[#D8D8D2]">
      <Header />

      <PageHero
        eyebrow="Analytics Portfolio"
        title="Real-world case studies & outcomes."
        description="Every project is a deep-dive solution engineered to solve an exact organizational bottleneck. Explore the business problems, technical execution layers, and measurable commercial results below."
      />

      <section className="py-24 flex-grow bg-[#0F1012]">
        <div className="mx-auto max-w-[1200px] px-6 space-y-12">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 pb-6 border-b border-[rgba(245,245,243,0.10)]">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-6 py-2.5 rounded-full text-xs font-normal tracking-wide transition-all duration-300 cursor-pointer select-none border ${
                  activeFilter === f
                    ? "bg-[#F5F5F3] border-[#F5F5F3] text-[#101113] shadow-sm"
                    : "bg-[#151619] border-[rgba(245,245,243,0.10)] text-[#AAA9A3] hover:text-[#F5F5F3] hover:border-[rgba(245,245,243,0.24)]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Loader */}
          {loading && (
            <div className="flex flex-col justify-center items-center py-24 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-[#D8D8D2]" />
              <span className="text-xs text-[#AAA9A3] font-normal">Loading project catalog...</span>
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
            <div className="border border-[rgba(245,245,243,0.10)] rounded-[24px] p-16 text-center bg-[#151619] max-w-xl mx-auto shadow-none">
              <div className="h-14 w-14 rounded-2xl bg-[rgba(245,245,243,0.05)] border border-[rgba(245,245,243,0.10)] flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="h-6 w-6 text-[#D8D8D2]" />
              </div>
              <h3 className="font-normal text-[#F5F5F3] text-base mb-1.5">No Projects Found</h3>
              <p className="text-[#AAA9A3] text-xs leading-relaxed">
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
                    className="bg-[#151619] border border-[rgba(245,245,243,0.10)] rounded-[24px] overflow-hidden flex flex-col group hover:border-[rgba(245,245,243,0.24)] hover:bg-[#1D1E22] transition-all duration-300 shadow-none"
                  >
                    {/* Thumbnail */}
                    <div className="aspect-[16/9] overflow-hidden border-b border-[rgba(245,245,243,0.10)] relative bg-[#0F1012]">
                      {p.image_url ? (
                        <img
                          src={p.image_url}
                          alt={p.title}
                          className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-[#AAA9A3]">
                          <Eye className="h-10 w-10 stroke-1" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="text-[10px] uppercase font-normal text-[#D8D8D2] tracking-wider bg-[rgba(245,245,243,0.05)] border border-[rgba(245,245,243,0.10)] px-3.5 py-1 rounded-full">
                          {p.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-5 flex-1 flex flex-col">
                      <div className="space-y-2">
                        <h3 className="font-normal text-[#F5F5F3] group-hover:text-white transition-colors text-base sm:text-lg leading-snug duration-200">
                          {p.title}
                        </h3>
                        <p className="text-[#D8D8D2]/80 text-xs sm:text-sm leading-relaxed line-clamp-3">
                          {p.short_description}
                        </p>
                      </div>

                      {/* Tech tags */}
                      {technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-full bg-[#1D1E22] border border-[rgba(245,245,243,0.08)] text-[10px] font-normal text-[#D8D8D2]"
                            >
                              {tech}
                            </span>
                          ))}
                          {technologies.length > 4 && (
                            <span className="text-[10px] text-[#AAA9A3] font-normal flex items-center pl-1">
                              +{technologies.length - 4} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Metric Tag */}
                      {metrics.length > 0 && (
                        <div className="bg-[rgba(245,245,243,0.02)] rounded-xl p-3.5 border border-[rgba(245,245,243,0.06)] mt-auto">
                          <p className="text-xs font-normal text-[#F5F5F3] flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-[#D8D8D2] shrink-0" />
                            <span className="text-[#AAA9A3] font-normal truncate">
                              {metrics[0].label}:
                            </span>
                            <span className="font-normal text-[#F5F5F3] truncate">
                              {metrics[0].value}
                            </span>
                          </p>
                        </div>
                      )}

                      <div className="mt-auto pt-2">
                        <Link
                          to="/projects/$slug"
                          params={{ slug: p.slug }}
                          className="inline-flex items-center gap-1.5 text-[13px] font-normal text-[#D8D8D2] hover:text-[#F5F5F3] transition-colors cursor-pointer"
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
          <div className="bg-[#1D1E22] border border-[rgba(245,245,243,0.10)] rounded-[24px] p-8 sm:p-12 md:p-16 flex flex-col sm:flex-row justify-between items-center gap-6 relative overflow-hidden shadow-none">
            <div className="absolute -bottom-24 -right-24 w-[280px] h-[280px] rounded-full bg-[rgba(245,245,243,0.01)] blur-3xl pointer-events-none" />

            <div className="space-y-3 text-center sm:text-left relative z-10 max-w-lg">
              <h4 className="font-normal text-[#F5F5F3] text-lg sm:text-xl">
                Need similar outcomes in your business?
              </h4>
              <p className="text-[#D8D8D2]/80 text-xs sm:text-sm leading-relaxed">
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
