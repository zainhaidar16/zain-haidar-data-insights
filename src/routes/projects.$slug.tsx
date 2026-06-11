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
  BarChart3,
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
      <main className="bg-[#0A0A0B] min-h-screen flex flex-col justify-between font-poppins text-[#FFFFFF]">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center gap-3 py-32">
          <Loader2 className="h-8 w-8 animate-spin text-[#FF6B00]" />
          <span className="text-xs font-medium text-[#71717A]">Loading case study...</span>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="bg-[#0A0A0B] min-h-screen flex flex-col justify-between font-poppins text-[#FFFFFF]">
        <Header />
        <div className="flex-grow flex items-center justify-center py-32">
          <div className="max-w-md p-8 bg-[#16161A] border border-[#26262B] rounded-3xl text-center shadow-2xl">
            <AlertCircle className="h-10 w-10 text-[#FF6B00] mx-auto mb-4" />
            <h2 className="text-lg font-bold text-[#FFFFFF] mb-2">
              {error ? "Failed to load project details." : "Case Study Not Found"}
            </h2>
            <p className="text-xs text-[#A1A1AA] mb-6">
              {error || "The project case study requested does not exist."}
            </p>
            <Button
              asChild
              variant="secondary"
              className="text-xs border-[#26262B] bg-[#111113] hover:bg-[#16161A] text-[#FFFFFF]"
            >
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
    <main className="bg-[#0A0A0B] min-h-screen flex flex-col font-poppins text-[#FFFFFF]">
      <Header />

      <article className="public-detail-article flex-grow animate-fade-in pt-24 pb-16">
        <div className="mx-auto max-w-[1200px] px-6 space-y-12">
          {/* Back Link */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-[12px] font-bold uppercase tracking-wider text-[#A1A1AA] hover:text-[#FFFFFF] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-[#FF6B00]" /> Back to Projects
          </Link>

          {/* Hero Section */}
          <div className="public-detail-hero space-y-6 pb-8 border-b border-[#26262B]">
            <span className="inline-flex text-[10px] uppercase font-bold text-[#FF6B00] tracking-wider bg-[#FF6B00]/10 border border-[#FF6B00]/20 px-3.5 py-1 rounded-full">
              {project.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-[50px] font-extrabold text-[#FFFFFF] tracking-tight leading-[1.15]">
              {project.hero_title || project.title}
            </h1>
            <p className="text-[#A1A1AA] text-base sm:text-lg leading-relaxed max-w-3xl">
              {project.hero_description || project.short_description}
            </p>

            {/* External buttons */}
            <div className="flex flex-wrap gap-4 pt-2">
              {project.live_url && (
                <Button
                  asChild
                  variant="primary"
                  className="text-xs bg-[#FF6B00] hover:bg-[#FF7D26] text-[#FFFFFF] font-semibold rounded-full px-5 py-2.5 transition-colors duration-200"
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
                  className="text-xs border-[#26262B] bg-[#111113] hover:bg-[#16161A] text-[#FFFFFF] font-semibold rounded-full px-5 py-2.5 transition-colors duration-200"
                >
                  <a
                    href={project.github_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2"
                  >
                    <Github className="h-4 w-4 text-[#A1A1AA]" />
                    <span>View Repository</span>
                  </a>
                </Button>
              )}
              <Button
                asChild
                variant="outline"
                className="text-xs border-[#26262B] bg-[#111113] hover:bg-[#16161A] text-[#FFFFFF] font-semibold rounded-full px-5 py-2.5 transition-colors duration-200"
              >
                <Link to="/contact" className="flex items-center gap-2">
                  <span>Discuss Project</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#FF6B00]" />
                </Link>
              </Button>
            </div>
          </div>

          {/* Cover Image */}
          {project.image_url && (
            <div className="rounded-3xl overflow-hidden border border-[#26262B] shadow-2xl aspect-[16/9] bg-[#16161A] relative group">
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
              <h3 className="text-xs font-bold uppercase tracking-wider text-[#A1A1AA] pl-1">
                Key Metrics Analyzed
              </h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {metrics.map((m, idx) => (
                  <div
                    key={idx}
                    className="bg-[#16161A] border border-[#26262B] p-5 flex items-center gap-4 rounded-2xl hover:border-[#FF6B00]/30 transition-all duration-300 shadow-lg group"
                  >
                    <div className="h-10 w-10 bg-[#FF6B00]/10 border border-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center rounded-xl shrink-0">
                      <BarChart3 className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] uppercase font-bold text-[#A1A1AA] block tracking-wider truncate">
                        {m.label}
                      </span>
                      <span className="text-[#FFFFFF] font-extrabold text-sm sm:text-base tracking-tight truncate block mt-0.5">
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
              <h2 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] border-l-2 border-[#FF6B00] pl-3">
                Overview & Objectives
              </h2>
              {project.description && (
                <div className="text-[#A1A1AA] text-sm sm:text-[15px] leading-relaxed whitespace-pre-wrap">
                  {project.description}
                </div>
              )}
              {project.project_goal && (
                <div className="bg-[#16161A] border border-[#26262B] p-6 rounded-2xl mt-4 shadow-md">
                  <h4 className="text-[10px] uppercase font-bold text-[#FF6B00] tracking-wider mb-2">
                    Project Goal
                  </h4>
                  <p className="text-[#A1A1AA] text-xs sm:text-sm leading-relaxed">
                    {project.project_goal}
                  </p>
                </div>
              )}
            </section>
          )}

          {/* Problem */}
          {project.problem && (
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] border-l-2 border-[#FF6B00] pl-3">
                The Business Problem & Challenges
              </h2>
              <div className="text-[#A1A1AA] text-sm sm:text-[15px] leading-relaxed whitespace-pre-wrap">
                {project.problem}
              </div>
            </section>
          )}

          {/* Approach */}
          {approach.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] border-l-2 border-[#FF6B00] pl-3">
                Methodology & Approach
              </h2>
              <ul className="space-y-3.5">
                {approach.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex gap-3 items-start text-xs sm:text-sm text-[#A1A1AA] leading-relaxed animate-fade-in"
                  >
                    <span className="h-5 w-5 rounded bg-[#FF6B00]/10 border border-[#FF6B00]/20 text-[#FFFFFF] text-[10px] font-bold font-mono flex items-center justify-center shrink-0 mt-0.5">
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
              <h2 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] border-l-2 border-[#FF6B00] pl-3">
                Implementation Roadmap
              </h2>
              <div className="relative pl-6 border-l border-[#26262B] space-y-6 ml-3">
                {solutionSteps.map((step, idx) => (
                  <div key={idx} className="relative animate-fade-in">
                    {/* Timeline bullet */}
                    <div className="absolute -left-[31px] top-1 h-3.5 w-3.5 rounded-full border border-[#FF6B00] bg-[#0A0A0B] flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
                    </div>
                    <div>
                      <h4 className="text-sm sm:text-base font-bold text-[#FFFFFF]">
                        {step.title}
                      </h4>
                      <p className="text-xs sm:text-sm text-[#A1A1AA] mt-1 leading-relaxed">
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
                  <h3 className="text-base sm:text-lg font-bold text-[#FFFFFF] border-l-2 border-[#FF6B00] pl-3">
                    Key Features
                  </h3>
                  <div className="space-y-2">
                    {keyFeatures.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#A1A1AA]"
                      >
                        <CheckCircle className="h-4.5 w-4.5 text-[#FF6B00] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </section>
              )}
              {businessImpact.length > 0 && (
                <section className="space-y-4">
                  <h3 className="text-base sm:text-lg font-bold text-[#FFFFFF] border-l-2 border-[#FF6B00] pl-3">
                    Business Impact
                  </h3>
                  <div className="space-y-2">
                    {businessImpact.map((impact, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-2.5 text-xs sm:text-sm text-[#A1A1AA]"
                      >
                        <Sparkles className="h-4.5 w-4.5 text-[#FF6B00] shrink-0 mt-0.5" />
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
              <h2 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] border-l-2 border-[#FF6B00] pl-3">
                Challenges Overcome
              </h2>
              <ul className="space-y-3">
                {challenges.map((item, idx) => (
                  <li
                    key={idx}
                    className="flex gap-2.5 items-start text-xs sm:text-sm text-[#A1A1AA]"
                  >
                    <AlertTriangle className="h-4.5 w-4.5 text-[#FF6B00] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Outcomes */}
          {outcome.length > 0 && (
            <section className="space-y-4">
              <h2 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] border-l-2 border-[#FF6B00] pl-3">
                Final Outcomes & Learnings
              </h2>
              <ul className="space-y-3.5">
                {outcome.map((step, idx) => (
                  <li
                    key={idx}
                    className="flex gap-3 items-start text-xs sm:text-sm text-[#A1A1AA] leading-relaxed"
                  >
                    <div className="h-1.5 w-1.5 rounded-full bg-[#FF6B00] shrink-0 mt-2" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </section>
          )}

          {/* Image Gallery */}
          {gallery.length > 0 && (
            <section className="space-y-6 pt-2">
              <h2 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] border-l-2 border-[#FF6B00] pl-3">
                Project Gallery & Screenshots
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {gallery.map((imgItem, idx) => (
                  <div
                    key={idx}
                    className="border border-[#26262B] bg-[#16161A] rounded-2xl overflow-hidden hover:border-[#FF6B00]/30 transition duration-300 flex flex-col group cursor-zoom-in shadow-md"
                    onClick={() => setActiveImage(imgItem.image_url)}
                  >
                    <div className="aspect-[16/10] overflow-hidden bg-[#0A0A0B] relative">
                      <img
                        src={imgItem.image_url}
                        alt={imgItem.alt_text || "Gallery screenshot"}
                        className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-[1.02]"
                      />
                    </div>
                    {imgItem.caption && (
                      <div className="p-4 border-t border-[#26262B] bg-[#111113]">
                        <p className="text-[#A1A1AA] text-xs leading-snug">{imgItem.caption}</p>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </section>
          )}

          {/* Technologies & Data Sources */}
          {(technologies.length > 0 || dataSources.length > 0) && (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 border-t border-[#26262B] pt-8">
              {technologies.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-wider text-[#A1A1AA] font-bold">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-3.5 py-1.5 rounded-full bg-[#16161A] border border-[#26262B] text-xs font-semibold text-[#FFFFFF] hover:border-[#FF6B00]/30 hover:bg-[#FF6B00]/5 transition-all duration-300 cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {dataSources.length > 0 && (
                <div className="space-y-3">
                  <h4 className="text-xs uppercase tracking-wider text-[#A1A1AA] font-bold">
                    Data Sources
                  </h4>
                  <div className="flex flex-wrap gap-2">
                    {dataSources.map((source) => (
                      <span
                        key={source}
                        className="px-3.5 py-1.5 rounded-full bg-[#16161A] border border-[#26262B] text-xs font-semibold text-[#FFFFFF] hover:border-[#FF6B00]/30 hover:bg-[#FF6B00]/5 transition-all duration-300 cursor-default"
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
          <div className="bg-[#16161A] rounded-3xl p-8 sm:p-12 md:p-16 flex flex-col sm:flex-row justify-between items-center gap-6 border border-[#26262B] relative overflow-hidden shadow-2xl">
            {/* Subtle bottom glow */}
            <div className="absolute -bottom-24 -right-24 w-[280px] h-[280px] rounded-full bg-[#FF6B00]/5 blur-3xl pointer-events-none" />

            <div className="space-y-2 text-center sm:text-left relative z-10">
              <h4 className="font-extrabold text-white text-lg sm:text-xl">
                Need similar outcomes in your business?
              </h4>
              <p className="text-[#A1A1AA] text-sm max-w-md">
                Let's scope your metrics and construct dashboards tailored to your parameters.
              </p>
            </div>
            <Button
              asChild
              variant="primary"
              className="bg-[#FF6B00] hover:bg-[#FF7D26] text-[#FFFFFF] rounded-full px-6 py-3 font-semibold transition-all duration-200 shrink-0 relative z-10"
            >
              <Link to="/contact" className="flex items-center gap-2">
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
          className="fixed inset-0 bg-[#0A0A0B]/95 z-[100] flex items-center justify-center p-4 cursor-zoom-out animate-fade-in"
          onClick={() => setActiveImage(null)}
        >
          <div className="relative max-w-5xl max-h-[90vh] flex flex-col items-center">
            <img
              src={activeImage}
              alt="Fullscreen preview"
              className="max-h-[85vh] max-w-full rounded-2xl border border-[#26262B] object-contain shadow-2xl"
            />
            <button
              onClick={() => setActiveImage(null)}
              className="absolute top-4 right-4 p-2.5 rounded-full bg-black/60 hover:bg-[#FF6B00] transition-colors text-white"
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
