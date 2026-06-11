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
    <main className="bg-[#F5F5F7] min-h-screen flex flex-col font-poppins text-[#1D1D1F]">
      <Header />

      <PageHero
        eyebrow="Analytics Portfolio"
        title="Real-world case studies & outcomes."
        description="Every project is a deep-dive solution engineered to solve an exact organizational bottleneck. Explore the business problems, technical execution layers, and measurable commercial results below."
      />

      <section className="py-24 flex-grow bg-[#F5F5F7]">
        <div className="mx-auto max-w-[1200px] px-6 space-y-12">
          {/* Category Filters */}
          <div className="flex flex-wrap gap-3 pb-6 border-b border-[#E8E8ED]">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-6 py-2.5 rounded-full text-xs font-semibold tracking-wide transition-all duration-300 cursor-pointer select-none border ${
                  activeFilter === f
                    ? "bg-[#0071E3] border-[#0071E3] text-[#FFFFFF] shadow-md"
                    : "bg-[#FFFFFF] border-[#D2D2D7] text-[#6E6E73] hover:text-[#1D1D1F] hover:border-[#0071E3]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Loader */}
          {loading && (
            <div className="flex flex-col justify-center items-center py-24 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-[#0071E3]" />
              <span className="text-xs text-[#6E6E73] font-medium">Loading project catalog...</span>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="p-6 bg-[#FFFFFF] border border-[#E8E8ED] rounded-2xl flex items-start gap-4 max-w-2xl mx-auto shadow-sm">
              <AlertCircle className="h-6 w-6 text-[#FF3B30] shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-[#1D1D1F] text-sm">Failed to Load Projects</h4>
                <p className="text-xs text-[#6E6E73] mt-1.5 leading-relaxed">{error}</p>
              </div>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && filteredProjects.length === 0 && (
            <div className="border border-[#E8E8ED] rounded-[24px] p-16 text-center bg-[#FFFFFF] max-w-xl mx-auto shadow-sm">
              <div className="h-14 w-14 rounded-2xl bg-[#0071E3]/5 border border-[#0071E3]/20 flex items-center justify-center mx-auto mb-4">
                <FolderOpen className="h-6 w-6 text-[#0071E3]" />
              </div>
              <h3 className="font-extrabold text-[#1D1D1F] text-base mb-1.5">No Projects Found</h3>
              <p className="text-[#6E6E73] text-xs leading-relaxed">
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
                    className="bg-[#FFFFFF] border border-[#E8E8ED] rounded-[24px] overflow-hidden flex flex-col group hover:border-[#0071E3]/30 transition-all duration-300 shadow-sm"
                  >
                    {/* Thumbnail */}
                    <div className="aspect-[16/9] overflow-hidden border-b border-[#E8E8ED] relative bg-[#F5F5F7]">
                      {p.image_url ? (
                        <img
                          src={p.image_url}
                          alt={p.title}
                          className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-[#86868B]">
                          <Eye className="h-10 w-10 stroke-1" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="text-[10px] uppercase font-bold text-[#0071E3] tracking-wider bg-[#0071E3]/5 border border-[#0071E3]/15 px-3.5 py-1 rounded-full">
                          {p.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-5 flex-1 flex flex-col">
                      <div className="space-y-2">
                        <h3 className="font-bold text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors text-base sm:text-lg leading-snug duration-200">
                          {p.title}
                        </h3>
                        <p className="text-[#6E6E73] text-xs sm:text-sm leading-relaxed line-clamp-3">
                          {p.short_description}
                        </p>
                      </div>

                      {/* Tech tags */}
                      {technologies.length > 0 && (
                        <div className="flex flex-wrap gap-2">
                          {technologies.slice(0, 4).map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 rounded-full bg-[#F5F5F7] border border-[#E8E8ED] text-[10px] font-medium text-[#6E6E73]"
                            >
                              {tech}
                            </span>
                          ))}
                          {technologies.length > 4 && (
                            <span className="text-[10px] text-[#86868B] font-semibold flex items-center pl-1">
                              +{technologies.length - 4} more
                            </span>
                          )}
                        </div>
                      )}

                      {/* Metric Tag */}
                      {metrics.length > 0 && (
                        <div className="bg-[#0071E3]/5 rounded-xl p-3.5 border border-[#0071E3]/10 mt-auto">
                          <p className="text-xs font-semibold text-[#0071E3] flex items-center gap-2">
                            <Sparkles className="h-4 w-4 text-[#0071E3] shrink-0" />
                            <span className="text-[#6E6E73] font-normal truncate">
                              {metrics[0].label}:
                            </span>
                            <span className="font-extrabold text-[#1D1D1F] truncate">
                              {metrics[0].value}
                            </span>
                          </p>
                        </div>
                      )}

                      <div className="mt-auto pt-2">
                        <Button
                          asChild
                          variant="primary"
                          className="w-full"
                        >
                          <Link to="/projects/$slug" params={{ slug: p.slug }}>
                            <Eye className="h-4 w-4" />
                            <span>View Case Study</span>
                          </Link>
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Bottom Callout */}
          <div className="bg-[#FFFFFF] border border-[#E8E8ED] rounded-[24px] p-8 sm:p-12 md:p-16 flex flex-col sm:flex-row justify-between items-center gap-6 relative overflow-hidden shadow-sm">
            <div className="absolute -bottom-24 -right-24 w-[280px] h-[280px] rounded-full bg-[#0071E3]/5 blur-3xl pointer-events-none" />

            <div className="space-y-3 text-center sm:text-left relative z-10 max-w-lg">
              <h4 className="font-extrabold text-[#1D1D1F] text-lg sm:text-xl">
                Need similar outcomes in your business?
              </h4>
              <p className="text-[#6E6E73] text-xs sm:text-sm leading-relaxed">
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
