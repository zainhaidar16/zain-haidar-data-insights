import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { Button } from "@/components/ui/button";
import { getProjectBySlug, Project } from "@/lib/api";
import {
  Loader2,
  AlertCircle,
  ArrowLeft,
  Tag,
  BarChart3,
  Clock,
  AlertTriangle,
  CheckCircle,
  ArrowRight,
  Github,
  ExternalLink,
  X,
  Sparkles,
} from "lucide-react";
import { getErrorMessage } from "@/lib/utils";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => ({
    meta: [
      {
        title: `${params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} — Zain Haidar`,
      },
      {
        name: "description",
        content:
          "Detailed business intelligence case study report, database pipeline engineering, and business impact analysis.",
      },
    ],
  }),
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { slug } = Route.useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [activeImage, setActiveImage] = useState<string | null>(null);

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true);
        const data = await getProjectBySlug(slug);
        setProject(data);
        setError(null);
      } catch (err: unknown) {
        console.error("Failed to load project details:", err);
        setError(getErrorMessage(err, "Failed to load project."));
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [slug]);

  if (loading) {
    return (
      <main className="bg-[#0F172A] min-h-screen flex flex-col justify-between">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center gap-3 py-32">
          <Loader2 className="h-8 w-8 animate-spin text-[#F8FAFC]" />
          <span className="text-xs font-medium text-[#94A3B8]">Loading case study...</span>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="bg-[#0F172A] min-h-screen flex flex-col justify-between">
        <Header />
        <div className="flex-grow flex items-center justify-center py-32">
          <div className="max-w-md p-6 bg-[#0F172A] border border-[#334155] rounded-3xl shadow-sm text-center">
            <AlertCircle className="h-10 w-10 text-rose-500 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-[#F8FAFC] mb-1">
              {error ? "Failed to load project details." : "Case Study Not Found"}
            </h2>
            <p className="text-xs text-[#94A3B8] mb-6">
              {error || "The project case study requested does not exist."}
            </p>
            <Button asChild variant="secondary" className="text-xs">
              <Link to="/projects">Back to Projects</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const technologies = Array.isArray(project.technologies) ? project.technologies : [];
  const metrics = Array.isArray(project.metrics) ? project.metrics : [];
  const approach = Array.isArray(project.approach) ? project.approach : [];
  const outcome = Array.isArray(project.outcome) ? project.outcome : [];
  const dataSources = Array.isArray(project.data_sources) ? project.data_sources : [];
  const keyFeatures = Array.isArray(project.key_features) ? project.key_features : [];
  const challenges = Array.isArray(project.challenges) ? project.challenges : [];
  const solutionSteps = Array.isArray(project.solution_steps) ? project.solution_steps : [];
  const businessImpact = Array.isArray(project.business_impact) ? project.business_impact : [];
  const gallery = Array.isArray(project.gallery) ? project.gallery : [];

  return (
    <main className="bg-[#0F172A] min-h-screen flex flex-col font-poppins text-[#F8FAFC]">
      <Header />

      <article className="public-detail-article flex-grow animate-fade-in">
        <div className="mx-auto max-w-[840px] px-5 sm:px-8 space-y-12">
          {/* Back Link */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#94A3B8] hover:text-[#F8FAFC] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Projects
          </Link>

          {/* Hero Section */}
          <div className="public-detail-hero space-y-6 pb-8 border-b border-[#334155]">
            <span className="inline-flex text-[10px] uppercase font-bold text-[#2563EB] tracking-wider bg-[#2563EB]/10 border border-[#2563EB]/30 px-3.5 py-1 rounded-full">
              {project.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-[50px] font-extrabold text-[#F8FAFC] tracking-tight leading-[1.1]">
              {project.hero_title || project.title}
            </h1>
            <p className="text-[#94A3B8] text-base sm:text-lg leading-relaxed max-w-3xl">
              {project.hero_description || project.short_description}
            </p>

            {/* External buttons */}
            <div className="flex flex-wrap gap-3 pt-2">
              {project.live_url && (
                <Button
                  asChild
                  variant="primary"
                  className="text-xs bg-[#2563EB] hover:bg-orange-600 text-white font-semibold rounded-full px-5 py-2.5"
                >
                  <a
                    href={project.live_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <ExternalLink className="h-4 w-4" />
                    <span>Live Production App</span>
                  </a>
                </Button>
              )}
              {project.github_url && (
                <Button
                  asChild
                  variant="outline"
                  className="text-xs border-[#334155] hover:bg-[#1E293B] hover:text-[#F8FAFC] text-slate-300 font-semibold rounded-full px-5 py-2.5"
                >
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="h-4 w-4" />
                    <span>View Repository</span>
                  </a>
                </Button>
              )}
              <Button
                asChild
                variant="outline"
                className="text-xs border-[#334155] hover:bg-[#1E293B] hover:text-[#F8FAFC] text-slate-350 font-semibold rounded-full px-5 py-2.5"
              >
                <Link to="/contact" className="flex items-center gap-2">
                  <span>Discuss Project</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#2563EB]" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Cover Image */}
          {project.image_url && (
            <div className="rounded-3xl overflow-hidden border border-[#334155] shadow-lg aspect-[16/9] bg-[#020617] relative group">
              <img
                src={project.image_url}
                alt={`${project.title} cover image`}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
              />
            </div>
          )}

          {/* Metrics stat cards */}
          {metrics.length > 0 && (
            <div className="space-y-4 pt-2">
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#94A3B8] pl-1">
                Key Metrics Analyzed
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="bg-[#111114] border border-[#334155] p-5 flex items-center gap-4 rounded-2xl hover:border-[#2563EB]/30 transition group"
                  >
                    <div className="h-10 w-10 bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#2563EB] flex items-center justify-center rounded-xl shrink-0">
                      <BarChart3 className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] uppercase font-bold text-[#94A3B8] block tracking-wider truncate">
                        {m.label}
                      </span>
                      <span className="text-[#F8FAFC] font-extrabold text-sm sm:text-base tracking-tight truncate block mt-0.5">
                        {m.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Overview & Goal */}
          {(project.description || project.project_goal) && (
            <section className="space-y-4 pt-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] border-l-2 border-[#2563EB] pl-3">
                Overview & Objectives
              </h2>
              {project.description && (
                <div className="text-slate-300 text-sm sm:text-[15px] leading-relaxed whitespace-pre-wrap">
                  {project.description}
                </div>
              )}
              {project.project_goal && (
                <div className="bg-[#111114] border border-[#334155] p-5 rounded-2xl mt-4">
                  <h4 className="text-[10px] uppercase font-bold text-[#2563EB] tracking-wider mb-2">
                    Project Goal
                  </h4>
                  <p className="text-slate-300 text-xs sm:text-sm leading-relaxed">
                    {project.project_goal}
                  </p>
                </div>
              )}
            </section>
          )}

          {/* Problem */}
          {project.problem && (
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] border-l-2 border-[#2563EB] pl-3">
                The Business Problem & Challenges
              </h2>
              <div className="text-slate-300 text-sm sm:text-[15px] leading-relaxed whitespace-pre-wrap">
                {project.problem}
              </div>
            </section>
          )}

          {/* Approach */}
          {approach.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] border-l-2 border-[#2563EB] pl-3">
                Methodology & Approach
              </h2>
              <ul className="space-y-3.5">
                {approach.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex gap-3 items-start text-xs sm:text-sm text-slate-300 leading-relaxed animate-fade-in"
                  >
                    <span className="h-5 w-5 rounded bg-[#2563EB]/10 border border-[#2563EB]/30 text-[#F8FAFC] text-[10px] font-bold font-mono flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Solution Steps (Timeline) */}
          {solutionSteps.length > 0 && (
            <section className="space-y-6">
              <h2 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] border-l-2 border-[#2563EB] pl-3">
                Implementation Roadmap
              </h2>
              <div className="relative pl-6 border-l border-[#334155] space-y-6 ml-3">
                {solutionSteps.map((step, idx) => (
                  <div key={idx} className="relative animate-fade-in">
                    {/* Timeline bullet */}
                    <div className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border border-[#2563EB] bg-[#0F172A] flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#2563EB]" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-[#F8FAFC]">
                        {step.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-slate-400 mt-1 leading-relaxed">
                        {step.description}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Key Features & Business Impact Checklist/Cards */}
          {(keyFeatures.length > 0 || businessImpact.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 pt-2">
              {keyFeatures.length > 0 && (
                <section className="space-y-4">
                  <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC] border-l-2 border-[#2563EB] pl-3">
                    Key Features
                  </h3>
                  <div className="space-y-2">
                    {keyFeatures.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300"
                      >
                        <CheckCircle className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              {businessImpact.length > 0 && (
                <section className="space-y-4">
                  <h3 className="text-base sm:text-lg font-bold text-[#F8FAFC] border-l-2 border-[#2563EB] pl-3">
                    Business Impact
                  </h3>
                  <div className="space-y-2">
                    {businessImpact.map((impact, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-slate-300"
                      >
                        <Sparkles className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
                        <span>{impact}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
            </div>
          )}

          {/* Challenges faced */}
          {challenges.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] border-l-2 border-[#2563EB] pl-3">
                Challenges Overcome
              </h2>
              <ul className="space-y-3">
                {challenges.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex gap-2.5 items-start text-xs sm:text-sm text-slate-300"
                  >
                    <AlertTriangle className="h-4 w-4 text-[#2563EB] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Outcomes */}
          {outcome.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] border-l-2 border-[#2563EB] pl-3">
                Final Outcomes & Learnings
              </h2>
              <ul className="space-y-3.5">
                {outcome.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex gap-3 items-start text-xs sm:text-sm text-slate-300 leading-relaxed"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-[#2563EB] shrink-0 mt-2" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Image Gallery */}
          {gallery.length > 0 && (
            <section className="space-y-6 pt-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#F8FAFC] border-l-2 border-[#2563EB] pl-3">
                Project Gallery & Screenshots
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {gallery.map((imgItem, idx) => (
                  <div
                    key={idx}
                    className="border border-[#334155] bg-[#111114] rounded-2xl overflow-hidden hover:border-[#2563EB]/20 transition flex flex-col group cursor-zoom-in"
                    onClick={() => setActiveImage(imgItem.image_url)}
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-[#020617] relative">
                      <img
                        src={imgItem.image_url}
                        alt={imgItem.alt_text || "Gallery screenshot"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                    {imgItem.caption && (
                      <div className="p-3 border-t border-[#334155] bg-[#1E293B]">
                        <p className="text-slate-400 text-xs leading-snug">{imgItem.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Technologies & Data Sources */}
          {(technologies.length > 0 || dataSources.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[#334155] pt-8">
              {technologies.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3 py-1 rounded-full bg-[#111114] border border-[#334155] text-xs font-semibold text-slate-350"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {dataSources.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-wider text-slate-400 font-bold">
                    Data Sources
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {dataSources.map((source) => (
                      <span
                        key={source}
                        className="px-3 py-1 rounded-full bg-[#111114] border border-[#334155] text-xs font-semibold text-slate-350"
                      >
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}

          {/* Bottom CTA */}
          <div className="bg-[#1E293B] rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row justify-between items-center gap-6 border border-[#334155]">
            <div className="space-y-2 text-center sm:text-left">
              <h4 className="font-bold text-white text-base sm:text-lg">
                Need similar outcomes in your business?
              </h4>
              <p className="text-[#94A3B8] text-[13px]">
                Let's scope your metrics and construct dashboards tailored to your parameters.
              </p>
            </div>
            <Button
              asChild
              variant="primary"
              className="bg-[#2563EB] hover:bg-orange-600 text-white rounded-full"
            >
              <Link to="/contact">
                <span>Discuss Similar Projects</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </article>

      {/* Lightbox full preview overlay */}
      {activeImage && (
        <div
          className="fixed inset-0 bg-[#020617]/95 z-[100] flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
          onClick={() => setActiveImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center">
            <img
              src={activeImage}
              alt="Fullscreen preview"
              className="max-h-[85vh] max-w-full rounded-2xl border border-[#334155] object-contain shadow-2xl"
            />
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 p-2 rounded-full bg-[#000]/60 hover:bg-[#2563EB] transition text-white"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>
      )}

      <Footer />
    </main>
  );
}
