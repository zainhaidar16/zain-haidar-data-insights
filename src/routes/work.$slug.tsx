import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Project } from "@/lib/api";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Loader2, AlertCircle } from "lucide-react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { getErrorMessage } from "@/lib/utils";

export const Route = createFileRoute("/work/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `Case Study — ${params.slug.replace(/-/g, " ")} | Zain The Analyst` },
      {
        name: "description",
        content: "Detailed and clear business reports and dashboard project by Zain Haidar.",
      },
    ],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen bg-[#F5F5F7] grid place-items-center px-6 text-center font-poppins">
      <div className="bg-[#FFFFFF] border border-[#D2D2D7] rounded-[24px] p-8 max-w-sm shadow-sm">
        <h1 className="text-2xl font-bold text-[#1D1D1F] mb-2">Case study not found</h1>
        <p className="text-xs text-[#6E6E73] mb-6">
          The requested project case study could not be located in the database.
        </p>
        <a
          href="/#projects"
          className="inline-flex items-center gap-2 text-[#0071E3] font-semibold border-b border-[#0071E3] pb-0.5 text-xs"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to projects
        </a>
      </div>
    </div>
  ),
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { slug } = Route.useParams();
  const [project, setProject] = useState<Project | null>(null);
  const [nextProject, setNextProject] = useState<{ slug: string; title: string } | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCaseStudy() {
      try {
        setLoading(true);
        setError(null);

        // Fetch current project
        const { data: current, error: currentErr } = await supabase
          .from("projects")
          .select("*")
          .eq("slug", slug)
          .single();

        if (currentErr) {
          throw currentErr;
        }

        setProject(current);

        // Fetch next project for navigation
        const { data: list, error: listErr } = await supabase
          .from("projects")
          .select("slug, title, sort_order")
          .eq("status", "published")
          .order("sort_order", { ascending: true });

        if (!listErr && list && list.length > 1) {
          const idx = list.findIndex((item) => item.slug === slug);
          if (idx !== -1) {
            const nextItem = list[(idx + 1) % list.length];
            if (nextItem.slug !== slug) {
              setNextProject(nextItem);
            }
          }
        }
      } catch (err: unknown) {
        console.error("Error loading project details:", err);
        setError(getErrorMessage(err, "Failed to load case study"));
      } finally {
        setLoading(false);
      }
    }
    loadCaseStudy();
  }, [slug]);

  if (loading) {
    return (
      <main className="min-h-screen bg-[#F5F5F7] flex items-center justify-center font-poppins">
        <div className="text-center flex flex-col items-center gap-3">
          <Loader2 className="h-8 w-8 animate-spin text-[#0071E3]" />
          <span className="text-xs font-medium text-[#86868B]">Loading case study...</span>
        </div>
      </main>
    );
  }

  if (error || !project) {
    return (
      <main className="min-h-screen bg-[#F5F5F7] flex items-center justify-center font-poppins">
        <div className="max-w-md p-6 bg-[#FFFFFF] border border-[#D2D2D7] rounded-[24px] shadow-sm text-center">
          <AlertCircle className="h-10 w-10 text-rose-500 mx-auto mb-3" />
          <h2 className="text-lg font-bold text-[#1D1D1F] mb-1">Could Not Load Case Study</h2>
          <p className="text-xs text-[#6E6E73] mb-6 leading-normal">
            {error || "The requested project case study could not be retrieved from the database."}
          </p>
          <Link to="/" className="text-[#0071E3] hover:text-[#005BB5] text-xs font-semibold">
            &larr; Back to home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative bg-[#F5F5F7] min-h-screen flex flex-col font-poppins text-[#6E6E73]">
      <Header />

      <section className="public-detail-heading">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-[#86868B] hover:text-[#0071E3] mb-10 cursor-pointer transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-[#0071E3]" /> Back to home
          </Link>

          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-wider text-[#0071E3] mb-6 font-semibold">
              <span>Case Study Details</span>
              {project.category && (
                <>
                  <span className="text-[#86868B]">/</span>
                  <span>{project.category}</span>
                </>
              )}
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold tracking-tight text-[#1D1D1F] leading-tight max-w-5xl">
              {project.title}
            </h1>
          </motion.div>
        </div>
      </section>

      {project.image_url && (
        <section className="py-6">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="aspect-[16/9] rounded-[24px] overflow-hidden border border-[#E8E8ED] bg-[#FFFFFF] shadow-sm"
            >
              <img
                src={project.image_url}
                alt={project.title}
                className="h-full w-full object-cover"
              />
            </motion.div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 grid lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-8">
              {project.technologies && project.technologies.length > 0 && (
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#0071E3] mb-2.5">
                    Technologies
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((s) => (
                      <span key={s} className="badge-navy text-[10px]">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {Array.isArray(project.metrics) && project.metrics.length > 0 && (
                <div>
                  <div className="text-[10px] font-semibold uppercase tracking-wider text-[#0071E3] mb-2.5">
                    Key metrics
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="card-pro p-4 hover:border-[#0071E3]/30">
                        <div className="text-lg font-bold text-[#1D1D1F]">{m.value}</div>
                        <div className="text-[9px] font-semibold uppercase tracking-wider text-[#86868B] mt-1 leading-normal">
                          {m.label}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Core Content */}
          <div className="lg:col-span-8 space-y-12 max-w-[66ch]">
            {project.description && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[#1D1D1F]">About Project</h2>
                <p className="text-sm sm:text-base text-[#6E6E73] leading-relaxed">
                  {project.description}
                </p>
              </div>
            )}

            {project.problem && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-4 text-[#1D1D1F]">The Challenge</h2>
                <p className="text-sm sm:text-base text-[#6E6E73] leading-relaxed">
                  {project.problem}
                </p>
              </div>
            )}

            {project.approach && project.approach.length > 0 && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-5 text-[#1D1D1F]">The Approach</h2>
                <ol className="space-y-4">
                  {project.approach.map((step, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <div className="text-[11px] font-bold text-[#0071E3] bg-[#0071E3]/5 border border-[#0071E3]/15 rounded h-6 w-6 flex items-center justify-center shrink-0 mt-0.5">
                        0{i + 1}
                      </div>
                      <p className="text-sm sm:text-base text-[#6E6E73] leading-relaxed pt-0.5">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {project.outcome && project.outcome.length > 0 && (
              <div>
                <h2 className="text-xl sm:text-2xl font-bold mb-5 text-[#1D1D1F]">
                  Outcomes &amp; Impact
                </h2>
                <ul className="space-y-3">
                  {project.outcome.map((o, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm sm:text-base text-[#6E6E73] leading-relaxed"
                    >
                      <span className="text-[#0071E3] mt-2 h-1.5 w-1.5 rounded-full bg-[#0071E3] shrink-0" />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Navigation footer */}
      <section className="py-20 border-t border-[#D2D2D7] bg-[#F5F5F7]">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 grid md:grid-cols-2 gap-6">
          {nextProject && (
            <Link
              to="/work/$slug"
              params={{ slug: nextProject.slug }}
              className="group border border-[#E8E8ED] rounded-[24px] p-8 hover:border-[#0071E3] transition bg-[#FFFFFF] shadow-sm cursor-pointer"
            >
              <div className="text-[10px] font-semibold uppercase tracking-wider text-[#0071E3] mb-2.5">
                Next Case Study
              </div>
              <div className="text-lg font-bold flex items-center justify-between gap-4 text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
                {nextProject.title}
                <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#86868B] group-hover:text-[#0071E3]" />
              </div>
            </Link>
          )}
          <a
            href="/#contact"
            className="group border border-[#E8E8ED] rounded-[24px] p-8 hover:border-[#0071E3] transition bg-[#FFFFFF] shadow-sm cursor-pointer"
          >
            <div className="text-[10px] font-semibold uppercase tracking-wider text-[#0071E3] mb-2.5">
              Have a similar challenge?
            </div>
            <div className="text-lg font-bold flex items-center justify-between gap-4 text-[#1D1D1F] group-hover:text-[#0071E3] transition-colors">
              Let's talk about your data
              <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[#86868B] group-hover:text-[#0071E3]" />
            </div>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div className="border-l border-[#D2D2D7] pl-4 py-1">
      <div className="text-[10px] font-semibold uppercase tracking-wider text-[#0071E3] mb-1">
        {label}
      </div>
      <div className="font-semibold text-[#6E6E73] text-[15px]">{value}</div>
    </div>
  );
}
