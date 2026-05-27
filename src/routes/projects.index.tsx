import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { getProjects, Project } from "@/lib/api";
import { Eye, Target, Sparkles, Tag, ArrowRight, Loader2, AlertCircle, Inbox } from "lucide-react";
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

  const filters = ["All", ...Array.from(new Set(projects.map(p => p.category).filter(Boolean)))];
  const filteredProjects = projects.filter(p => {
    if (activeFilter === "All") return true;
    return p.category?.toLowerCase() === activeFilter.toLowerCase();
  });

  return (
    <main className="bg-white min-h-screen flex flex-col">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-20 bg-[#F8F7F3] relative overflow-hidden hero-arc">
        <div className="absolute -top-24 -right-16 w-[420px] h-[420px] rounded-full bg-[#D7FF3F]/20 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[280px] h-[280px] rounded-full bg-[#111111]/5 blur-3xl pointer-events-none" />
        <div className="section-container">
          <div className="max-w-3xl">
            <p className="text-[12px] font-semibold uppercase tracking-widest text-[#9CA3AF] mb-3">Analytics Portfolio</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111111] tracking-tight leading-[1.1] mb-5">
              Real-world case studies{" "}
              <span className="relative inline-block">
                & outcomes.
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#D7FF3F]/40 -z-10 rounded-sm" />
              </span>
            </h1>
            <p className="text-[#4B5563] text-[15px] leading-relaxed max-w-2xl">
              Every project is a deep-dive solution engineered to solve an exact organizational bottleneck. Explore the business problems, technical execution layers, and measurable commercial results below.
            </p>
          </div>
        </div>
      </section>

      <section className="py-16 flex-grow">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 space-y-12">

          {/* Filter Bar */}
          <div className="flex flex-wrap gap-2.5 pb-4 border-b border-[#E5E7EB]">
            {filters.map((f) => (
              <button
                key={f}
                onClick={() => setActiveFilter(f)}
                className={`px-5 py-2 rounded-full text-[13px] font-semibold transition-all duration-200 cursor-pointer select-none border ${
                  activeFilter === f
                    ? "bg-[#111111] border-[#111111] text-white"
                    : "bg-white border-[#E5E7EB] text-[#4B5563] hover:text-[#111111] hover:border-[#111111]"
                }`}
              >
                {f}
              </button>
            ))}
          </div>

          {/* Loader */}
          {loading && (
            <div className="flex flex-col justify-center items-center py-24 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-[#111111]" />
              <span className="text-xs text-[#9CA3AF] font-medium">Loading project catalog...</span>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="p-5 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3.5 max-w-2xl mx-auto">
              <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-rose-800 text-sm">Failed to Load Projects</h4>
                <p className="text-xs text-rose-600 mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && filteredProjects.length === 0 && (
            <div className="border border-[#E5E7EB] rounded-3xl p-16 text-center bg-white max-w-xl mx-auto">
              <div className="h-12 w-12 rounded-full bg-[#F6F4EF] border border-[#E5E7EB] flex items-center justify-center mx-auto mb-4">
                <Inbox className="h-5 w-5 text-[#9CA3AF]" />
              </div>
              <h3 className="font-bold text-[#111111] text-base mb-1">No Projects Found</h3>
              <p className="text-[#4B5563] text-xs">No case studies match this classification.</p>
            </div>
          )}

          {/* Grid */}
          {!loading && !error && filteredProjects.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {filteredProjects.map((p, idx) => {
                const technologies = Array.isArray(p.technologies) ? p.technologies : [];
                const outcomes = Array.isArray(p.outcome) ? p.outcome : [];
                const metrics = Array.isArray(p.metrics) ? p.metrics : [];

                return (
                  <motion.div 
                    key={p.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: idx * 0.07, ease: EASE }}
                    className="card-payoneer overflow-hidden flex flex-col group hover:border-[#D7FF3F]/40"
                  >
                    {/* Thumbnail */}
                    <div className="aspect-[16/9] overflow-hidden border-b border-[#E5E7EB] relative bg-[#F6F4EF]">
                      {p.image_url ? (
                        <img src={p.image_url} alt={p.title} className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500" />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-[#D1D5DB]">
                          <Eye className="h-10 w-10 stroke-1" />
                        </div>
                      )}
                      <div className="absolute top-4 left-4">
                        <span className="text-[10px] uppercase font-semibold text-[#111111] tracking-wider bg-white/95 border border-[#E5E7EB] px-3 py-1 rounded-full">
                          {p.category}
                        </span>
                      </div>
                    </div>

                    <div className="p-6 space-y-4 flex-1 flex flex-col">
                      <div className="space-y-2">
                        <h3 className="font-bold text-[#111111] group-hover:text-[#4B5563] transition-colors text-[16px] leading-snug">
                          {p.title}
                        </h3>
                        <p className="text-[#4B5563] text-[13px] leading-relaxed">{p.short_description}</p>
                      </div>

                      {/* Tech tags */}
                      {technologies.length > 0 && (
                        <div className="flex flex-wrap gap-1.5">
                          {technologies.slice(0, 4).map((tech) => (
                            <span key={tech} className="px-2 py-0.5 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] text-[10px] font-medium text-[#4B5563]">
                              {tech}
                            </span>
                          ))}
                          {technologies.length > 4 && (
                            <span className="text-[10px] text-[#9CA3AF] font-medium">+{technologies.length - 4}</span>
                          )}
                        </div>
                      )}

                      {/* Impact */}
                      {(outcomes.length > 0 || metrics.length > 0) && (
                        <div className="bg-[#F2FBD9] rounded-xl p-3 border border-[#D7FF3F]/20">
                          <p className="text-[12px] font-semibold text-[#111111]">
                            <Sparkles className="h-3.5 w-3.5 inline mr-1" />
                            {outcomes[0] || (metrics[0] ? `${metrics[0].label}: ${metrics[0].value}` : "Delivered measurable business outcomes.")}
                          </p>
                        </div>
                      )}

                      <div className="mt-auto pt-2">
                        <Link
                          to="/projects/$slug"
                          params={{ slug: p.slug }}
                          className="w-full btn-dark text-[13px]"
                        >
                          <Eye className="h-4 w-4" />
                          <span>View Case Study</span>
                        </Link>
                      </div>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Bottom CTA */}
          <div className="bg-[#111111] rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h4 className="font-bold text-white text-base sm:text-lg">Need similar outcomes in your business?</h4>
              <p className="text-gray-400 text-[13px]">Let's discuss how we can build automated queries and robust dashboards tailored to your data scope.</p>
            </div>
            <Link to="/contact" className="btn-lime shrink-0">
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
