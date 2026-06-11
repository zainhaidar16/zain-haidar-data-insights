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
  FileText,
  Workflow,
  BadgeCheck,
} from "lucide-react";
import { getErrorMessage } from "@/lib/utils";
import { motion } from "framer-motion";

const EASE = [0.25, 0.1, 0.25, 1] as const;

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
    <main className="bg-[#0A0A0B] min-h-screen flex flex-col font-poppins text-[#FFFFFF] overflow-hidden">
      <Header />

      {/* ═══════════════════════════════════════════════════════════════════════
          1. HERO SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="bg-[#0A0A0B] relative overflow-hidden border-b border-[#26262B] pt-24 pb-16">
        {/* Glow Effects */}
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#FF6B00]/5 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[300px] h-[300px] rounded-full bg-[#FF6B00]/3 blur-[100px] pointer-events-none" />

        <div className="section-container relative z-10 px-6 max-w-7xl mx-auto">
          {/* Back link */}
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-[#A1A1AA] hover:text-[#FFFFFF] transition-colors mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-[#FF6B00]" /> Back to Projects
          </Link>

          <div className="max-w-3xl">
            {/* Category tag */}
            <div className="flex items-center gap-4 mb-6">
              <span className="inline-flex text-[10px] uppercase font-bold text-[#FF6B00] tracking-wider bg-[#FF6B00]/10 border border-[#FF6B00]/20 px-3.5 py-1.5 rounded-full">
                {project.category}
              </span>
            </div>

            {/* Title */}
            <h1 className="text-3xl sm:text-4xl md:text-[50px] font-extrabold text-[#FFFFFF] tracking-tight leading-[1.15] mb-6">
              {project.hero_title || project.title}
            </h1>

            {/* Description */}
            <p className="text-[#A1A1AA] text-base sm:text-lg leading-relaxed max-w-3xl mb-10">
              {project.hero_description || project.short_description}
            </p>

            {/* External Action buttons */}
            <div className="flex flex-wrap gap-4">
              {project.live_url && (
                <Button
                  asChild
                  variant="primary"
                  className="bg-[#FF6B00] hover:bg-[#FF7D26] text-[#FFFFFF] font-semibold rounded-full px-6 py-2.5 transition-colors duration-200"
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
                  className="border-[#26262B] bg-[#111113] hover:bg-[#16161A] text-[#FFFFFF] font-semibold rounded-full px-6 py-2.5 transition-colors duration-200"
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
                className="border-[#26262B] bg-[#111113] hover:bg-[#16161A] text-[#FFFFFF] font-semibold rounded-full px-6 py-2.5 transition-colors duration-200"
              >
                <Link to="/contact" className="flex items-center gap-2">
                  <span>Discuss Project</span>
                  <ArrowRight className="h-3.5 w-3.5 text-[#FF6B00]" />
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          2. COVER IMAGE & METRICS SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      {(project.image_url || metrics.length > 0) && (
        <section className="py-20 bg-[#111113] border-b border-[#26262B]">
          <div className="section-container px-6 max-w-7xl mx-auto space-y-12">
            {/* Image */}
            {project.image_url && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, ease: EASE }}
                className="max-w-[1000px] mx-auto rounded-3xl overflow-hidden border border-[#26262B] shadow-2xl aspect-[16/9] bg-[#16161A] relative group"
              >
                <img
                  src={project.image_url}
                  alt={`${project.title} cover image`}
                  className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.01]"
                />
              </motion.div>
            )}

            {/* Metrics */}
            {metrics.length > 0 && (
              <div className="max-w-[1000px] mx-auto space-y-6">
                <h3 className="text-xs font-bold uppercase tracking-wider text-[#A1A1AA] text-center">
                  Key Metrics Analyzed
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
                  {metrics.map((m, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, y: 16 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: idx * 0.05, ease: EASE }}
                      className="bg-[#16161A] border border-[#26262B] p-6 flex items-center gap-4 rounded-2xl hover:border-[#FF6B00]/30 transition-all duration-300 shadow-lg group"
                    >
                      <div className="h-10 w-10 bg-[#FF6B00]/10 border border-[#FF6B00]/20 text-[#FF6B00] flex items-center justify-center rounded-xl shrink-0">
                        <BarChart3 className="h-4.5 w-4.5" />
                      </div>
                      <div className="min-w-0">
                        <span className="text-[9px] uppercase font-bold text-[#A1A1AA] block tracking-wider truncate">
                          {m.label}
                        </span>
                        <span className="text-[#FFFFFF] font-extrabold text-base tracking-tight truncate block mt-0.5">
                          {m.value}
                        </span>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          3. OVERVIEW & OBJECTIVES
          ═══════════════════════════════════════════════════════════════════════ */}
      {(project.description || project.project_goal) && (
        <section className="py-20 md:py-28 bg-[#0A0A0B] border-b border-[#26262B]">
          <div className="section-container px-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="max-w-[800px] mx-auto bg-[#16161A] border border-[#26262B] rounded-3xl p-8 md:p-12 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-lg bg-[#FF6B00]/10 flex items-center justify-center">
                  <FileText className="h-4 w-4 text-[#FF6B00]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] tracking-tight">
                  Overview & Objectives
                </h2>
              </div>

              {project.description && (
                <div className="text-[#A1A1AA] text-sm sm:text-base leading-[1.8] whitespace-pre-wrap mb-6">
                  {project.description}
                </div>
              )}

              {project.project_goal && (
                <div className="bg-[#111113] border border-[#26262B] p-6 rounded-2xl shadow-sm mt-6">
                  <h4 className="text-[10px] uppercase font-bold text-[#FF6B00] tracking-wider mb-2">
                    Project Goal
                  </h4>
                  <p className="text-[#A1A1AA] text-sm leading-relaxed">{project.project_goal}</p>
                </div>
              )}
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          4. BUSINESS PROBLEM
          ═══════════════════════════════════════════════════════════════════════ */}
      {project.problem && (
        <section className="py-20 md:py-28 bg-[#111113] border-b border-[#26262B]">
          <div className="section-container px-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="max-w-[800px] mx-auto bg-[#16161A] border border-[#26262B] rounded-3xl p-8 md:p-12 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-lg bg-[#FF6B00]/10 flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-[#FF6B00]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] tracking-tight">
                  The Business Problem
                </h2>
              </div>
              <div className="text-[#A1A1AA] text-sm sm:text-base leading-[1.8] whitespace-pre-wrap">
                {project.problem}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          5. METHODOLOGY & APPROACH
          ═══════════════════════════════════════════════════════════════════════ */}
      {approach.length > 0 && (
        <section className="py-20 md:py-28 bg-[#0A0A0B] border-b border-[#26262B]">
          <div className="section-container px-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="max-w-[800px] mx-auto"
            >
              <div className="text-center mb-16">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#FF6B00] mb-3 block">
                  Methodology
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FFFFFF] tracking-tight">
                  Our Approach
                </h2>
              </div>

              <ul className="space-y-4">
                {approach.map((step, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.06, ease: EASE }}
                    className="p-5 bg-[#16161A] border border-[#26262B] rounded-2xl flex gap-4 items-start text-sm text-[#A1A1AA] leading-relaxed shadow-md"
                  >
                    <span className="h-6 w-6 rounded bg-[#FF6B00]/10 border border-[#FF6B00]/20 text-[#FF6B00] text-[10px] font-bold font-mono flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </span>
                    <span>{step}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          6. ROADMAP & STEPS
          ═══════════════════════════════════════════════════════════════════════ */}
      {solutionSteps.length > 0 && (
        <section className="py-20 md:py-28 bg-[#111113] border-b border-[#26262B]">
          <div className="section-container px-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="max-w-[800px] mx-auto"
            >
              <div className="text-center mb-16">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#FF6B00] mb-3 block">
                  Implementation
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FFFFFF] tracking-tight">
                  Roadmap Execution
                </h2>
              </div>

              <div className="relative pl-6 border-l border-[#26262B] space-y-8 ml-3">
                {solutionSteps.map((step, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: -16 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.45, delay: idx * 0.08, ease: EASE }}
                    className="relative"
                  >
                    {/* Timeline bullet */}
                    <div className="absolute -left-[31px] top-1.5 h-3.5 w-3.5 rounded-full border border-[#FF6B00] bg-[#0A0A0B] flex items-center justify-center">
                      <div className="h-1.5 w-1.5 rounded-full bg-[#FF6B00]" />
                    </div>
                    <div className="p-6 bg-[#16161A] border border-[#26262B] rounded-2xl shadow-lg hover:border-[#FF6B00]/30 transition-all duration-300">
                      <h4 className="text-base font-bold text-[#FFFFFF] mb-2">{step.title}</h4>
                      <p className="text-sm text-[#A1A1AA] leading-relaxed">{step.description}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          7. KEY FEATURES & BUSINESS IMPACT
          ═══════════════════════════════════════════════════════════════════════ */}
      {(keyFeatures.length > 0 || businessImpact.length > 0) && (
        <section className="py-20 md:py-28 bg-[#0A0A0B] border-b border-[#26262B]">
          <div className="section-container px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[1000px] mx-auto">
              {keyFeatures.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, ease: EASE }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-[#FFFFFF] border-l-2 border-[#FF6B00] pl-3">
                    Key Features
                  </h3>
                  <div className="space-y-4">
                    {keyFeatures.map((feat, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-[#16161A] border border-[#26262B] rounded-2xl text-sm text-[#A1A1AA] shadow-md hover:border-[#FF6B00]/20 transition-all"
                      >
                        <CheckCircle className="h-5 w-5 text-[#FF6B00] shrink-0 mt-0.5" />
                        <span>{feat}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}

              {businessImpact.length > 0 && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
                  className="space-y-6"
                >
                  <h3 className="text-xl font-bold text-[#FFFFFF] border-l-2 border-[#FF6B00] pl-3">
                    Business Impact
                  </h3>
                  <div className="space-y-4">
                    {businessImpact.map((impact, idx) => (
                      <div
                        key={idx}
                        className="flex items-start gap-3 p-4 bg-[#16161A] border border-[#26262B] rounded-2xl text-sm text-[#A1A1AA] shadow-md hover:border-[#FF6B00]/20 transition-all"
                      >
                        <Sparkles className="h-5 w-5 text-[#FF6B00] shrink-0 mt-0.5" />
                        <span>{impact}</span>
                      </div>
                    ))}
                  </div>
                </motion.div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          8. CHALLENGES OVERCOME
          ═══════════════════════════════════════════════════════════════════════ */}
      {challenges.length > 0 && (
        <section className="py-20 md:py-28 bg-[#111113] border-b border-[#26262B]">
          <div className="section-container px-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="max-w-[800px] mx-auto bg-[#16161A] border border-[#26262B] rounded-3xl p-8 md:p-12 shadow-xl"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-lg bg-[#FF6B00]/10 flex items-center justify-center">
                  <AlertTriangle className="h-4 w-4 text-[#FF6B00]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#FFFFFF] tracking-tight">
                  Challenges Overcome
                </h2>
              </div>

              <ul className="space-y-4">
                {challenges.map((item, idx) => (
                  <li key={idx} className="flex gap-3 items-start text-sm text-[#A1A1AA]">
                    <AlertTriangle className="h-4.5 w-4.5 text-[#FF6B00] shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          9. OUTCOMES
          ═══════════════════════════════════════════════════════════════════════ */}
      {outcome.length > 0 && (
        <section className="py-20 md:py-28 bg-[#0A0A0B] border-b border-[#26262B]">
          <div className="section-container px-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="max-w-[800px] mx-auto"
            >
              <div className="text-center mb-16">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#FF6B00] mb-3 block">
                  Outcomes
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FFFFFF] tracking-tight">
                  Final Outcomes & Learnings
                </h2>
              </div>

              <ul className="space-y-4">
                {outcome.map((step, idx) => (
                  <motion.li
                    key={idx}
                    initial={{ opacity: 0, y: 12 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.35, delay: idx * 0.05, ease: EASE }}
                    className="flex gap-4 items-start text-sm text-[#A1A1AA] leading-relaxed p-4 bg-[#16161A] border border-[#26262B] rounded-2xl shadow-sm"
                  >
                    <div className="h-2 w-2 rounded-full bg-[#FF6B00] shrink-0 mt-2.5" />
                    <span>{step}</span>
                  </motion.li>
                ))}
              </ul>
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          10. GALLERY SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      {gallery.length > 0 && (
        <section className="py-20 md:py-28 bg-[#111113] border-b border-[#26262B]">
          <div className="section-container px-6 max-w-7xl mx-auto">
            <div className="max-w-[1000px] mx-auto space-y-10">
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FFFFFF] tracking-tight border-l-2 border-[#FF6B00] pl-3">
                Project Gallery & Screenshots
              </h2>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {gallery.map((imgItem, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, scale: 0.95 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.06, ease: EASE }}
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
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          11. TECHNOLOGIES & DATA SOURCES
          ═══════════════════════════════════════════════════════════════════════ */}
      {(technologies.length > 0 || dataSources.length > 0) && (
        <section className="py-20 bg-[#0A0A0B] border-b border-[#26262B]">
          <div className="section-container px-6 max-w-7xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-[1000px] mx-auto">
              {technologies.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-wider text-[#A1A1AA] font-bold">
                    Technologies Used
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {technologies.map((tech) => (
                      <span
                        key={tech}
                        className="px-4 py-2 rounded-full bg-[#16161A] border border-[#26262B] text-xs font-semibold text-[#FFFFFF] hover:border-[#FF6B00]/30 hover:bg-[#FF6B00]/5 transition-all duration-300 cursor-default"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {dataSources.length > 0 && (
                <div className="space-y-4">
                  <h4 className="text-xs uppercase tracking-wider text-[#A1A1AA] font-bold">
                    Data Sources
                  </h4>
                  <div className="flex flex-wrap gap-2.5">
                    {dataSources.map((source) => (
                      <span
                        key={source}
                        className="px-4 py-2 rounded-full bg-[#16161A] border border-[#26262B] text-xs font-semibold text-[#FFFFFF] hover:border-[#FF6B00]/30 hover:bg-[#FF6B00]/5 transition-all duration-300 cursor-default"
                      >
                        {source}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          12. BOTTOM CTA
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#0A0A0B] relative overflow-hidden">
        {/* Subtle orange accent line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-[#FF6B00]/40 to-transparent pointer-events-none" />

        <div className="section-container px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="bg-[#16161A] border border-[#26262B] rounded-3xl p-8 sm:p-12 md:p-16 max-w-[1000px] mx-auto relative overflow-hidden shadow-2xl">
              {/* Inner orange glow */}
              <div className="absolute -bottom-24 -right-24 w-[280px] h-[280px] rounded-full bg-[#FF6B00]/5 blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row justify-between items-center gap-6 relative z-10">
                <div className="space-y-3 text-center sm:text-left">
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
                  className="bg-[#FF6B00] hover:bg-[#FF7D26] text-[#FFFFFF] rounded-full px-8 py-3 font-semibold transition-all duration-200 shrink-0"
                >
                  <Link to="/contact" className="flex items-center gap-2">
                    <span>Discuss Similar Projects</span>
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                </Button>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

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
