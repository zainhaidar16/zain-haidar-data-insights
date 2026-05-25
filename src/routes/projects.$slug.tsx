import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { staticProjects } from "@/lib/projects-data";
import { ArrowLeft, ArrowRight, Target, Database, HelpCircle, Laptop, CheckCircle2, BarChart3, AlertTriangle } from "lucide-react";

export const Route = createFileRoute("/projects/$slug")({
  head: ({ params }) => {
    const project = staticProjects.find(p => p.slug === params.slug);
    return {
      meta: [
        { title: project ? `${project.title} Case Study — Zain Haidar` : "Project Case Study — Zain Haidar" },
        { name: "description", content: "Detailed business intelligence case study report, database pipeline engineering, and business impact analysis." },
      ],
    };
  },
  component: ProjectDetailPage,
});

function ProjectDetailPage() {
  const { slug } = Route.useParams();
  const project = staticProjects.find(p => p.slug === slug);

  if (!project) {
    return (
      <main className="bg-[#F8FAFC] min-h-screen flex flex-col justify-between font-poppins text-slate-800">
        <Header />
        <div className="flex-grow flex items-center justify-center py-32 px-5">
          <div className="max-w-md p-8 bg-white border border-slate-200 rounded-3xl shadow-sm text-center space-y-5">
            <HelpCircle className="h-10 w-10 text-slate-400 mx-auto" />
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-800">Case Study Not Found</h2>
              <p className="text-xs text-slate-500 leading-normal font-semibold">
                The requested analytics project does not exist or has been archived.
              </p>
            </div>
            <Link 
              to="/projects" 
              className="inline-flex justify-center w-full px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition cursor-pointer"
            >
              Back to Projects
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  return (
    <main className="bg-[#F8FAFC] min-h-screen flex flex-col font-poppins text-slate-800">
      <Header />
      
      <article className="pt-32 md:pt-40 pb-24 flex-grow">
        <div className="mx-auto max-w-[800px] px-5 sm:px-8 space-y-10">
          
          {/* Back Navigation */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-blue-600 cursor-pointer transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Projects
          </Link>

          {/* 1. Hero Block */}
          <div className="bg-white border border-slate-200/50 shadow-xs rounded-3xl p-6 sm:p-10 space-y-4">
            <div className="flex items-center gap-2">
              <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider bg-blue-50 border border-blue-100 px-3 py-1 rounded-full select-none">
                {project.category}
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight pt-1">
              {project.title}
            </h1>
            <p className="text-slate-550 text-xs sm:text-[13.5px] leading-relaxed font-semibold">
              {project.short_description}
            </p>
          </div>

          {/* 2. visual Screenshot Component */}
          <div className="rounded-3xl overflow-hidden border border-slate-200/70 shadow-sm aspect-[16/9] bg-white select-none">
            <img 
              src={project.image_url} 
              alt={`${project.title} screenshot visual`} 
              className="h-full w-full object-cover" 
            />
          </div>

          {/* 3. Summary & Business Context */}
          <div className="bg-white border border-slate-200/50 shadow-xs rounded-2xl p-6 sm:p-8 space-y-3.5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <HelpCircle className="h-4.5 w-4.5 text-blue-600" />
              <h2 className="font-bold text-xs uppercase tracking-wider text-[#0F172A]">Summary &amp; Business Context</h2>
            </div>
            <p className="text-slate-600 text-xs sm:text-[13.5px] leading-[1.8] font-semibold whitespace-pre-line">
              {project.caseStudy.context}
            </p>
          </div>

          {/* 4. Project Objectives */}
          <div className="bg-white border border-slate-200/50 shadow-xs rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Target className="h-4.5 w-4.5 text-blue-600" />
              <h2 className="font-bold text-xs uppercase tracking-wider text-[#0F172A]">Project Objectives</h2>
            </div>
            <ul className="space-y-3">
              {project.objectives.map((obj, i) => (
                <li key={i} className="flex gap-2.5 items-start text-xs sm:text-[13px] text-slate-650 font-semibold leading-relaxed">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mt-2 shrink-0 animate-pulse" />
                  <span>{obj}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 5. Data Scope & Type */}
          <div className="bg-white border border-slate-200/50 shadow-xs rounded-2xl p-6 sm:p-8 space-y-3.5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Database className="h-4.5 w-4.5 text-blue-600" />
              <h2 className="font-bold text-xs uppercase tracking-wider text-[#0F172A]">Data Scope &amp; Type</h2>
            </div>
            <p className="text-slate-600 text-xs sm:text-[13.5px] leading-[1.8] font-semibold">
              {project.caseStudy.scope}
            </p>
          </div>

          {/* 6. Challenges & Solutions */}
          <div className="bg-white border border-slate-200/50 shadow-xs rounded-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <AlertTriangle className="h-4.5 w-4.5 text-amber-500" />
              <h2 className="font-bold text-xs uppercase tracking-wider text-[#0F172A]">Challenges Faced &amp; Addressed</h2>
            </div>
            <div className="space-y-6">
              {project.caseStudy.challenges.map((c, idx) => (
                <div key={idx} className="space-y-2 border-l-2 border-slate-100 pl-4 py-0.5 hover:border-blue-400 transition-colors">
                  <h4 className="font-extrabold text-slate-800 text-xs sm:text-[13.5px]">{c.title}</h4>
                  <div className="space-y-1.5 pt-1 text-[11px] sm:text-xs text-slate-550 leading-relaxed font-semibold">
                    <p><strong className="text-slate-700 font-bold">The Problem:</strong> {c.problem}</p>
                    <p><strong className="text-emerald-700 font-bold">The Solution:</strong> {c.solution}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* 7. Methodology & Tools */}
          <div className="bg-white border border-slate-200/50 shadow-xs rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Laptop className="h-4.5 w-4.5 text-blue-600" />
              <h2 className="font-bold text-xs uppercase tracking-wider text-[#0F172A]">Methodology &amp; Tools Employed</h2>
            </div>
            <div className="flex flex-wrap gap-2 pb-2">
              {project.technologies.map((tech) => (
                <span 
                  key={tech}
                  className="px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-[10px] text-slate-650 font-bold uppercase tracking-wider"
                >
                  {tech}
                </span>
              ))}
            </div>
            <ul className="space-y-3.5 pt-2">
              {project.caseStudy.methodology.map((step, idx) => (
                <li key={idx} className="flex gap-3 items-start text-xs sm:text-[13px] text-slate-650 font-semibold leading-relaxed">
                  <span className="h-5 w-5 rounded-md bg-blue-50 border border-blue-100 text-blue-600 text-[10px] font-bold font-mono flex items-center justify-center shrink-0 mt-0.5">
                    {idx + 1}
                  </span>
                  <span>{step}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* 8. Outcomes & KPI Metrics */}
          <div className="space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3 pl-2">
              <CheckCircle2 className="h-4.5 w-4.5 text-emerald-500" />
              <h2 className="font-bold text-xs uppercase tracking-wider text-[#0F172A]">Outcomes &amp; KPIs Improved</h2>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {project.metrics.map((m, idx) => (
                <div key={idx} className="bg-white border border-slate-200/50 rounded-2xl p-5 shadow-xs flex items-center gap-4 hover:border-slate-350 transition">
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
            
            {/* Direct Impact statement */}
            <div className="bg-emerald-50/50 border border-emerald-150 rounded-2xl p-5">
              <p className="text-emerald-800 text-xs sm:text-[13px] leading-relaxed font-bold">
                <span className="underline">Overall Impact:</span> {project.impact}
              </p>
            </div>
          </div>

          {/* 9. Bottom CTA Section */}
          <div className="bg-[#0F172A] border border-slate-800 shadow-md rounded-3xl p-6 sm:p-10 text-white flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h4 className="font-bold text-base sm:text-lg">Interested in achieving similar results?</h4>
              <p className="text-slate-400 text-xs font-semibold">Let's discuss how we can engineer automated analytics solutions for your organization.</p>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-3.5 text-xs font-bold uppercase tracking-wider transition shadow-md shadow-blue-500/10 cursor-pointer self-stretch sm:self-auto justify-center"
            >
              <span>Discuss Similar Projects</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </article>
      
      <Footer />
    </main>
  );
}
