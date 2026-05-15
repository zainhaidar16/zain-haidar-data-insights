import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { caseStudies, findCaseStudy, type CaseStudy } from "@/data/caseStudies";

export const Route = createFileRoute("/work/$slug")({
  loader: ({ params }): { cs: CaseStudy } => {
    const cs = findCaseStudy(params.slug);
    if (!cs) throw notFound();
    return { cs };
  },
  head: ({ loaderData }) => ({
    meta: loaderData
      ? [
          { title: `${loaderData.cs.title} — Zain Haidar` },
          { name: "description", content: loaderData.cs.problem.slice(0, 160) },
          { property: "og:title", content: loaderData.cs.title },
          { property: "og:description", content: loaderData.cs.impact },
          { property: "og:image", content: loaderData.cs.img },
          { property: "og:type", content: "article" },
        ]
      : [{ title: "Case Study — Zain Haidar" }],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen grid place-items-center px-6 text-center">
      <div>
        <h1 className="font-serif-display text-4xl">Case study not found</h1>
        <Link to="/work" className="mt-6 inline-flex items-center gap-2 border-b border-foreground pb-0.5">
          <ArrowLeft className="h-4 w-4" /> Back to work
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen grid place-items-center px-6 text-center">
      <div>
        <h1 className="font-serif-display text-2xl">Something went wrong</h1>
        <p className="text-muted-foreground mt-2">{error.message}</p>
        <button onClick={reset} className="mt-6 rounded-full bg-foreground text-background px-5 py-2 text-sm">
          Try again
        </button>
      </div>
    </div>
  ),
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { cs } = Route.useLoaderData() as { cs: CaseStudy };
  const idx = caseStudies.findIndex((c) => c.slug === cs.slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <main className="relative">
      <Nav />

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-12 md:pb-16">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-10"
          >
            <ArrowLeft className="h-4 w-4" /> Back to work
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-6">
              <span className="font-mono">Case study</span>
              <span className="text-border">/</span>
              <span>{cs.tag}</span>
            </div>
            <h1 className="font-serif-display text-[36px] md:text-[64px] lg:text-[80px] leading-[1.02] tracking-[-0.025em] max-w-5xl">
              {cs.title}
            </h1>
            <p className="mt-6 text-lg text-foreground/80 font-mono">{cs.impact}</p>
          </motion.div>

          <div className="mt-12 grid sm:grid-cols-3 gap-6 border-t border-border pt-6 text-sm">
            <Meta label="Client" value={cs.client} />
            <Meta label="Year" value={cs.year} />
            <Meta label="Duration" value={cs.duration} />
          </div>
        </div>
      </section>

      {/* Cover image — soft editorial frame */}
      <section>
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="aspect-[16/9] rounded-md overflow-hidden border border-border bg-secondary shadow-elegant"
          >
            <img src={cs.img} alt={cs.title} className="h-full w-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 grid lg:grid-cols-12 gap-12">
          {/* Sticky meta */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-8">
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-3">Role</div>
                <div className="font-medium">{cs.role}</div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-3">Stack</div>
                <div className="flex flex-wrap gap-2">
                  {cs.stack.map((s) => (
                    <span key={s} className="text-[11px] uppercase tracking-wider text-muted-foreground border border-border rounded-full px-2.5 py-1">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div>
                <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-3">Key metrics</div>
                <div className="grid grid-cols-2 gap-3">
                  {cs.metrics.map((m) => (
                    <div key={m.label} className="border border-border rounded-md p-4 bg-card">
                      <div className="font-serif-display text-2xl">{m.value}</div>
                      <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">{m.label}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-8 space-y-14 max-w-[64ch]">
            <div>
              <h2 className="font-serif-display text-3xl md:text-4xl mb-4">Problem</h2>
              <p className="text-[17px] text-foreground/85 leading-[1.7]">{cs.problem}</p>
            </div>

            <div>
              <h2 className="font-serif-display text-3xl md:text-4xl mb-6">Approach</h2>
              <ol className="space-y-5">
                {cs.approach.map((step, i) => (
                  <li key={i} className="flex gap-5">
                    <div className="font-mono text-[12px] uppercase tracking-wider text-muted-foreground pt-1 shrink-0">
                      0{i + 1}
                    </div>
                    <p className="text-[16px] text-foreground/85 leading-[1.7]">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="font-serif-display text-3xl md:text-4xl mb-6">Outcomes</h2>
              <ul className="space-y-3">
                {cs.outcomes.map((o, i) => (
                  <li key={i} className="flex gap-3 text-[16px] text-foreground/85 leading-[1.7]">
                    <span className="text-accent mt-2.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            {cs.gallery.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-4">
                {cs.gallery.map((g, i) => (
                  <div key={i} className="aspect-[4/3] rounded-md overflow-hidden border border-border bg-secondary">
                    <img src={g} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Next + CTA */}
      <section className="py-20 border-t border-border">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 grid md:grid-cols-2 gap-6">
          <Link
            to="/work/$slug"
            params={{ slug: next.slug }}
            className="group border border-border rounded-md p-8 hover:border-foreground/60 transition bg-card"
          >
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-3">Next case study</div>
            <div className="font-serif-display text-2xl flex items-center justify-between gap-4">
              {next.title}
              <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
          <Link
            to="/contact"
            className="group border border-border rounded-md p-8 hover:border-foreground/60 transition bg-foreground text-background"
          >
            <div className="text-[11px] uppercase tracking-[0.22em] text-background/60 mb-3">Have a similar challenge?</div>
            <div className="font-serif-display text-2xl flex items-center justify-between gap-4">
              Let&rsquo;s talk about your data
              <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Meta({ label, value }: { label: string; value: string }) {
  return (
    <div>
      <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-1.5">{label}</div>
      <div className="font-medium">{value}</div>
    </div>
  );
}
