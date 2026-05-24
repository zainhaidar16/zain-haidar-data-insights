import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { getProjectBySlug, Project } from "@/lib/api";
import { Loader2, AlertCircle, ArrowLeft, Tag, BarChart3, Clock, AlertTriangle, CheckCircle, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ").toUpperCase()} Case Study — Zain The Analyst` },
      { name: "description", content: "Detailed business intelligence case study report, calculations engineering, and outcome analysis." },
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
        console.log("Route slug:", slug);
        console.log("Fetched project:", data);
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
      <main className="bg-[#F8FAFC] min-h-screen flex flex-col justify-between font-poppins text-slate-800 animate-pulse">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center gap-3 py-32">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-1" />
          <span className="text-xs font-semibold text-slate-500">Loading...</span>
        </div>
        <Footer />
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-[#F8FAFC] min-h-screen flex flex-col justify-between font-poppins text-slate-800">
        <Header />
        <div className="flex-grow flex items-center justify-center py-32">
          <div className="max-w-md p-6 bg-white border border-slate-200 rounded-3xl shadow-sm text-center">
            <AlertCircle className="h-10 w-10 text-rose-500 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-slate-800 mb-1">Failed to load project details.</h2>
            <p className="text-xs text-rose-600 mb-6 leading-normal font-semibold">
              {error}
            </p>
            <Link to="/projects" className="inline-flex justify-center px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition cursor-pointer">
              Back to Projects
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!project) {
    return (
      <main className="bg-[#F8FAFC] min-h-screen flex flex-col justify-between font-poppins text-slate-800">
        <Header />
        <div className="flex-grow flex items-center justify-center py-32">
          <div className="max-w-md p-6 bg-white border border-slate-200 rounded-3xl shadow-sm text-center">
            <AlertCircle className="h-10 w-10 text-rose-500 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-slate-800 mb-1">Not found.</h2>
            <p className="text-xs text-slate-550 mb-6 leading-normal font-semibold">
              The project case study requested does not exist.
            </p>
            <Link to="/projects" className="inline-flex justify-center px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition cursor-pointer">
              Back to Projects
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // Safe array mapping for JSONB fields
  const technologies = Array.isArray(project.technologies) ? project.technologies : [];
  const metrics = Array.isArray(project.metrics) ? project.metrics : [];
  const approach = Array.isArray(project.approach) ? project.approach : [];
  const outcome = Array.isArray(project.outcome) ? project.outcome : [];

  return (
    <main className="bg-[#F8FAFC] min-h-screen flex flex-col font-poppins text-slate-800">
      <Header />
      
      <article className="pt-32 md:pt-40 pb-24 flex-grow animate-fade-in">
        <div className="mx-auto max-w-[840px] px-5 sm:px-8 space-y-10">
          
          {/* Back Navigation */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-blue-600 mb-4 cursor-pointer transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Projects
          </Link>

          {/* 1. Hero Block */}
          <div className="bg-white border border-slate-200/50 shadow-xs rounded-3xl p-6 sm:p-10 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider bg-blue-50 border border-blue-100 px-2.5 py-0.5 rounded-full select-none">
                {project.category}
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight pt-1">
              {project.title}
            </h1>
            <p className="text-slate-550 text-sm sm:text-base leading-relaxed font-semibold">
              {project.short_description}
            </p>
          </div>

          {/* Hero cover image rendered if imageUrl is present */}
          {project.image_url && (
            <div className="rounded-3xl overflow-hidden border border-slate-200 shadow-sm aspect-[16/9] select-none">
              <img 
                src={project.image_url} 
                alt={project.title} 
                className="h-full w-full object-cover" 
              />
            </div>
          )}

          {/* 2. Overview Section */}
          {project.description && (
            <div className="bg-white border border-slate-200/50 shadow-xs rounded-2xl p-6 sm:p-8 space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#0F172A] border-b border-slate-100 pb-2 flex items-center gap-2">
                <Clock className="h-4.5 w-4.5 text-blue-600" />
                <span>Overview</span>
              </h3>
              <p className="text-slate-650 text-xs sm:text-[13px] leading-[1.8] font-semibold whitespace-pre-line">
                {project.description}
              </p>
            </div>
          )}

          {/* 3. Problem Section */}
          {project.problem && (
            <div className="bg-white border border-slate-200/50 shadow-xs rounded-2xl p-6 sm:p-8 space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#0F172A] border-b border-slate-100 pb-2 flex items-center gap-2">
                <AlertTriangle className="h-4.5 w-4.5 text-amber-500" />
                <span>Problem</span>
              </h3>
              <p className="text-slate-650 text-xs sm:text-[13px] leading-[1.8] font-semibold whitespace-pre-line">
                {project.problem}
              </p>
            </div>
          )}

          {/* 4. Approach Section */}
          {approach.length > 0 && (
            <div className="bg-white border border-slate-200/50 shadow-xs rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#0F172A] border-b border-slate-100 pb-2">
                Approach
              </h3>
              <ul className="space-y-3.5">
                {approach.map((step, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-xs sm:text-[13px] text-slate-650 font-semibold leading-relaxed">
                    <span className="h-5 w-5 rounded-md bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold font-mono flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 5. Outcome Section */}
          {outcome.length > 0 && (
            <div className="bg-white border border-slate-200/50 shadow-xs rounded-2xl p-6 sm:p-8 space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#0F172A] border-b border-slate-100 pb-2 flex items-center gap-2">
                <CheckCircle className="h-4.5 w-4.5 text-emerald-500" />
                <span>Outcome</span>
              </h3>
              <ul className="space-y-3.5">
                {outcome.map((step, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-xs sm:text-[13px] text-slate-650 font-semibold leading-relaxed">
                    <div className="h-1.5 w-1.5 rounded-full bg-emerald-500 shrink-0 mt-2" />
                    <span>{step}</span>
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* 6. Technologies Section (Badges) */}
          {technologies.length > 0 && (
            <div className="bg-white border border-slate-200/50 shadow-xs rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#0F172A] border-b border-slate-100 pb-2 flex items-center gap-2">
                <Tag className="h-4.5 w-4.5 text-blue-600" />
                <span>Technologies</span>
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {technologies.map((tech) => (
                  <span 
                    key={tech}
                    className="px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-[10px] text-slate-650 font-bold uppercase tracking-wider"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          )}

          {/* 7. Metrics Section (Cards) */}
          {metrics.length > 0 && (
            <div className="space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-slate-400 tracking-widest pl-2">Metrics</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
                {metrics.map((m, idx) => (
                  <div key={idx} className="bg-white border border-slate-200/50 rounded-2xl p-5 shadow-xs flex items-center gap-4 group">
                    <div className="h-10 w-10 bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center rounded-xl shrink-0">
                      <BarChart3 className="h-4.5 w-4.5 shrink-0" />
                    </div>
                    <div className="min-w-0">
                      <span className="text-[9px] uppercase font-bold text-slate-400 block tracking-wider truncate">
                        {m.label}
                      </span>
                      <span className="text-slate-800 font-extrabold text-sm sm:text-base tracking-tight truncate block mt-0.5">
                        {m.value}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 8. CTA Section */}
          <div className="bg-[#0F172A] border border-slate-800 shadow-md rounded-3xl p-6 sm:p-10 text-white flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h4 className="font-bold text-base sm:text-lg">Need something similar?</h4>
              <p className="text-slate-400 text-xs font-semibold">Let's build clear dashboards and automated queries for your organization.</p>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 text-xs font-bold uppercase tracking-wider transition shadow-md shadow-blue-500/10 cursor-pointer self-stretch sm:self-auto justify-center"
            >
              <span>Contact Me</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </article>

      <Footer />
    </main>
  );
}
