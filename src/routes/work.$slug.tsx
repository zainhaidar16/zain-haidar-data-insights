import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, AlertCircle } from "lucide-react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { PageHero } from "@/components/portfolio/PageHero";
import { getWorkDetailData } from "@/lib/public-data.functions";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }) => getWorkDetailData({ data: { slug: params.slug } }),
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
    <div className="min-h-screen bg-[var(--site-bg)] grid place-items-center px-6 text-center font-poppins text-[var(--text-soft)]">
      <div className="bg-[var(--site-bg-soft)] border border-[var(--border)] rounded-[24px] p-8 max-w-sm shadow-sm">
        <h1 className="text-2xl font-normal text-[var(--text-main)] mb-2">Case study not found</h1>
        <p className="text-xs text-[var(--text-soft)] mb-6">
          The requested project case study could not be located in the database.
        </p>
        <a
          href="/#projects"
          className="inline-flex items-center gap-2 text-[var(--text-soft)] font-normal border-b border-[var(--border)] pb-0.5 text-xs hover:text-[var(--text-main)] hover:border-[var(--text-main)]"
        >
          <ArrowLeft className="h-3.5 w-3.5" /> Back to projects
        </a>
      </div>
    </div>
  ),
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { project, nextProject } = Route.useLoaderData();

  if (!project) {
    return (
      <main className="min-h-screen bg-[var(--site-bg)] flex items-center justify-center font-poppins text-[var(--text-soft)]">
        <div className="max-w-md p-6 bg-[var(--site-bg-soft)] border border-[var(--border)] rounded-[24px] shadow-sm text-center">
          <AlertCircle className="h-10 w-10 text-red-600 mx-auto mb-3" />
          <h2 className="text-lg font-normal text-[var(--text-main)] mb-1">Could Not Load Case Study</h2>
          <p className="text-xs text-[var(--text-soft)] mb-6 leading-normal">
            The requested project case study could not be retrieved.
          </p>
          <Link to="/" className="text-[var(--text-soft)] hover:text-[var(--text-main)] text-xs font-normal">
            &larr; Back to home
          </Link>
        </div>
      </main>
    );
  }

  return (
    <main className="relative bg-[var(--site-bg)] min-h-screen flex flex-col font-poppins text-[var(--text-soft)]">
      <Header />

      <PageHero
        eyebrow="Case Study Details"
        title={project.title}
        description={project.description || "Case study details."}
        before={
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-xs font-normal uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-main)] cursor-pointer transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-[var(--text-muted)]" /> Back to home
          </Link>
        }
        meta={project.category ? <span>{project.category}</span> : undefined}
      />

      {project.image_url && (
        <section className="py-6">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="aspect-[16/9] rounded-[24px] overflow-hidden border border-[var(--border)] bg-[var(--site-bg-soft)] shadow-sm"
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
                  <div className="text-[10px] font-normal uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
                    Technologies
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {project.technologies.map((s) => (
                      <span key={s} className="px-2.5 py-0.5 rounded-full bg-[var(--site-bg-soft)] border border-[var(--border)] text-[10px] font-normal text-[var(--text-soft)] hover:border-[var(--card-border-hover)] hover:bg-[var(--card-bg-soft)] transition-all duration-300 shadow-sm">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {Array.isArray(project.metrics) && project.metrics.length > 0 && (
                <div>
                  <div className="text-[10px] font-normal uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
                    Key metrics
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {project.metrics.map((m) => (
                      <div key={m.label} className="bg-[var(--site-bg-soft)] border border-[var(--border)] rounded-xl p-4 hover:border-[var(--card-border-hover)] hover:bg-[var(--card-bg-soft)] transition-all duration-300 shadow-sm">
                        <div className="text-lg font-normal text-[var(--text-main)]">{m.value}</div>
                        <div className="text-[9px] font-normal uppercase tracking-wider text-[var(--text-muted)] mt-1 leading-normal">
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
                <h2 className="text-xl sm:text-2xl font-normal mb-4 text-[var(--text-main)]">About Project</h2>
                <p className="text-sm sm:text-base text-[var(--text-soft)] leading-relaxed">
                  {project.description}
                </p>
              </div>
            )}

            {project.problem && (
              <div>
                <h2 className="text-xl sm:text-2xl font-normal mb-4 text-[var(--text-main)]">The Challenge</h2>
                <p className="text-sm sm:text-base text-[var(--text-soft)] leading-relaxed">
                  {project.problem}
                </p>
              </div>
            )}

            {project.approach && project.approach.length > 0 && (
              <div>
                <h2 className="text-xl sm:text-2xl font-normal mb-5 text-[var(--text-main)]">The Approach</h2>
                <ol className="space-y-4">
                  {project.approach.map((step, i) => (
                    <li key={i} className="flex gap-4 items-start">
                      <div className="text-[11px] font-normal text-[var(--purple)] bg-[var(--purple-soft)] border border-[var(--border)] rounded h-6 w-6 flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                        0{i + 1}
                      </div>
                      <p className="text-sm sm:text-base text-[var(--text-soft)] leading-relaxed pt-0.5">
                        {step}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {project.outcome && project.outcome.length > 0 && (
              <div>
                <h2 className="text-xl sm:text-2xl font-normal mb-5 text-[var(--text-main)]">
                  Outcomes &amp; Impact
                </h2>
                <ul className="space-y-3">
                  {project.outcome.map((o, i) => (
                    <li
                      key={i}
                      className="flex gap-3 text-sm sm:text-base text-[var(--text-soft)] leading-relaxed"
                    >
                      <span className="mt-2 h-1.5 w-1.5 rounded-full bg-[var(--purple)] shrink-0" />
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
      <section className="py-20 border-t border-[var(--border)] bg-[var(--site-bg)]">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 grid md:grid-cols-2 gap-6">
          {nextProject && (
            <Link
              to="/work/$slug"
              params={{ slug: nextProject.slug }}
              className="group border border-[var(--border)] rounded-[24px] p-8 hover:border-[var(--card-border-hover)] hover:bg-[var(--card-bg-soft)] transition bg-[var(--site-bg-soft)] shadow-sm cursor-pointer"
            >
              <div className="text-[10px] font-normal uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
                Next Case Study
              </div>
              <div className="text-lg font-normal flex items-center justify-between gap-4 text-[var(--text-main)] group-hover:text-[var(--purple)] transition-colors">
                {nextProject.title}
                <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[var(--text-muted)] group-hover:text-[var(--purple)]" />
              </div>
            </Link>
          )}
          <a
            href="/#contact"
            className="group border border-[var(--border)] rounded-[24px] p-8 hover:border-[var(--card-border-hover)] hover:bg-[var(--card-bg-soft)] transition bg-[var(--site-bg-soft)] shadow-sm cursor-pointer"
          >
            <div className="text-[10px] font-normal uppercase tracking-wider text-[var(--text-muted)] mb-2.5">
              Have a similar challenge?
            </div>
            <div className="text-lg font-normal flex items-center justify-between gap-4 text-[var(--text-main)] group-hover:text-[var(--purple)] transition-colors">
              Let's talk about your data
              <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5 text-[var(--text-muted)] group-hover:text-[var(--purple)]" />
            </div>
          </a>
        </div>
      </section>

      <Footer />
    </main>
  );
}
