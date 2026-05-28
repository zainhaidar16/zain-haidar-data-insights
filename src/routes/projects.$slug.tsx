import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { Button } from "@/components/ui/button";
import { getProjectBySlug, Project } from "@/lib/api";
import { Loader2, AlertCircle, ArrowLeft, Tag, BarChart3, Clock, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())} — Zain Haidar` },
      { name: "description", content: "Detailed business intelligence case study report, database pipeline engineering, and business impact analysis." },
    ],
  }),
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { slug } = Route.useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProject() {
      try {
        setLoading(true);
        const data = await getProjectBySlug(slug);
        setProject(data);
        setError(null);
      } catch (err: any) {
        console.error("Failed to load project details:", err);
        setError(err.message || "Failed to load project.");
      } finally {
        setLoading(false);
      }
    }
    loadProject();
  }, [slug]);

  if (loading) {
    return (
      <main className="bg-white min-h-screen flex flex-col justify-between">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center gap-3 py-32">
          <Loader2 className="h-8 w-8 animate-spin text-[#111111]" />
          <span className="text-xs font-medium text-[#9CA3AF]">Loading case study...</span>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="bg-white min-h-screen flex flex-col justify-between">
        <Header />
        <div className="flex-grow flex items-center justify-center py-32">
          <div className="max-w-md p-6 bg-white border border-[#E5E7EB] rounded-3xl shadow-sm text-center">
            <AlertCircle className="h-10 w-10 text-rose-500 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-[#111111] mb-1">{error ? "Failed to load project details." : "Case Study Not Found"}</h2>
            <p className="text-xs text-[#4B5563] mb-6">{error || "The project case study requested does not exist."}</p>
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

  return (
    <main className="bg-white min-h-screen flex flex-col">
      <Header />
      
      <article className="pt-32 md:pt-40 pb-24 flex-grow animate-fade-in">
        <div className="mx-auto max-w-[840px] px-5 sm:px-8 space-y-10">
          
          {/* Back */}
          <Link to="/projects" className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-wider text-[#9CA3AF] hover:text-[#111111] transition-colors">
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Projects
          </Link>

          {/* Hero */}
          <div className="bg-[#F6F4EF] rounded-3xl p-6 sm:p-10 space-y-4">
            <span className="inline-flex text-[10px] uppercase font-semibold text-[#111111] tracking-wider bg-[#F2FBD9] border border-[#D7FF3F]/30 px-2.5 py-0.5 rounded-full">
              {project.category}
            </span>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#111111] tracking-tight leading-tight">
              {project.title}
            </h1>
            <p className="text-[#4B5563] text-sm sm:text-base leading-relaxed">
              {project.short_description}
            </p>
          </div>

          {/* Cover image */}
          {project.image_url && (
            <div className="rounded-3xl overflow-hidden border border-[#E5E7EB] shadow-sm aspect-[16/9] bg-[#F6F4EF]">
              <img src={project.image_url} alt={`${project.title} visualization`} className="h-full w-full object-cover" />
            </div>
          )}

          {/* Summary */}
          {project.description && (
            <div className="card-payoneer p-6 sm:p-8 space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#111111] border-b border-[#E5E7EB] pb-2 flex items-center gap-2">
                <Clock className="h-4 w-4 text-[#111111]" />
                <span>Summary & Business Context</span>
              </h3>
              <p className="text-[#4B5563] text-xs sm:text-[13px] leading-[1.8] whitespace-pre-line">
                {project.description}
              </p>
            </div>
          )}

          {/* Problem */}
          {project.problem && (
            <div className="card-payoneer p-6 sm:p-8 space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#111111] border-b border-[#E5E7EB] pb-2 flex items-center gap-2">
                <AlertTriangle className="h-4 w-4 text-amber-500" />
                <span>The Business Problem & Challenges</span>
              </h3>
              <p className="text-[#4B5563] text-xs sm:text-[13px] leading-[1.8] whitespace-pre-line">
                {project.problem}
              </p>
            </div>
          )}

          {/* Approach */}
          {approach.length > 0 && (
            <div className="card-payoneer p-6 sm:p-8 space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#111111] border-b border-[#E5E7EB] pb-2">
                Methodology & Objectives
              </h3>
              <ul className="space-y-3.5">
                {approach.map((step, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-xs sm:text-[13px] text-[#4B5563] leading-relaxed">
                    <span className="h-5 w-5 rounded-md bg-[#F2FBD9] border border-[#D7FF3F]/30 text-[#111111] text-[10px] font-bold font-mono flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Outcomes */}
          {outcome.length > 0 && (
            <div className="card-payoneer p-6 sm:p-8 space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#111111] border-b border-[#E5E7EB] pb-2 flex items-center gap-2">
                <CheckCircle className="h-4 w-4 text-emerald-500" />
                <span>Final Outcomes & Impact</span>
              </h3>
              <ul className="space-y-3.5">
                {outcome.map((step, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-xs sm:text-[13px] text-[#4B5563] leading-relaxed">
                    <div className="h-1.5 w-1.5 rounded-full bg-[#D7FF3F] shrink-0 mt-2" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Technologies */}
          {technologies.length > 0 && (
            <div className="card-payoneer p-6 space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#111111] border-b border-[#E5E7EB] pb-2 flex items-center gap-2">
                <Tag className="h-4 w-4 text-[#111111]" />
                <span>Technologies Used</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {technologies.map((tech) => (
                  <span key={tech} className="px-2.5 py-1 rounded-full bg-[#F3F4F6] border border-[#E5E7EB] text-[11px] font-medium text-[#4B5563]">
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* KPIs */}
          {metrics.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#9CA3AF] pl-2">Key Performance Indicators</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {metrics.map((m, idx) => (
                  <div key={idx} className="card-payoneer p-5 flex items-center gap-4 group hover:border-[#D7FF3F]/40">
                    <div className="h-10 w-10 bg-[#F2FBD9] border border-[#D7FF3F]/30 text-[#111111] flex items-center justify-center rounded-xl shrink-0">
                      <BarChart3 className="h-4.5 w-4.5" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] uppercase font-semibold text-[#9CA3AF] block tracking-wider truncate">{m.label}</span>
                      <span className="text-[#111111] font-extrabold text-sm sm:text-base tracking-tight truncate block mt-0.5">{m.value}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Bottom CTA */}
          <div className="bg-[#252525] rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h4 className="font-bold text-white text-base sm:text-lg">Need similar outcomes in your business?</h4>
              <p className="text-[#CFCFCF] text-[13px]">Let's scope your metrics and construct dashboards tailored to your parameters.</p>
            </div>
            <Button asChild variant="primary">
              <Link to="/contact">
                <span>Discuss Similar Projects</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>

        </div>
      </article>
      
      <Footer />
    </main>
  );
}
