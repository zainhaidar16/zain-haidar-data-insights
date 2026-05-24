import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Loader2 } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { getProjectBySlug, listPublishedProjectSlugs } from "@/lib/projects.functions";
import { translateProject } from "@/lib/simple-copy";

export const Route = createFileRoute("/work/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `Case Study — ${params.slug.replace(/-/g, " ")} | Haidar Analytics` },
      { name: "description", content: "Detailed and clear business reports and dashboard project by Haidar Analytics." },
    ],
  }),
  notFoundComponent: () => (
    <div className="min-h-screen bg-background grid place-items-center px-6 text-center">
      <div>
        <h1 className="font-serif-display text-4xl text-foreground">Case study not found</h1>
        <Link to="/work" className="mt-6 inline-flex items-center gap-2 text-accent border-b border-accent pb-0.5">
          <ArrowLeft className="h-4 w-4" /> Back to work
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen bg-background grid place-items-center px-6 text-center">
      <div>
        <h1 className="font-serif-display text-2xl text-foreground">Something went wrong</h1>
        <p className="text-muted-foreground mt-2">{error.message}</p>
        <button onClick={reset} className="mt-6 rounded-full bg-foreground text-background px-5 py-2 text-sm">
          Try again
        </button>
      </div>
    </div>
  ),
  component: CaseStudyPage,
});

const fallbackCovers: Record<string, string> = {
  "executive-kpi-retail": "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1280&q=80",
  "patient-demand-forecasting": "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1280&q=80",
  "lakehouse-modernization": "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1280&q=80",
  "cohort-retention-ltv": "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1280&q=80"
};

const localSlugs = [
  { slug: "executive-kpi-retail", title: "Store Sales and Profit Dashboard" },
  { slug: "patient-demand-forecasting", title: "Hospital Staff Scheduler" },
  { slug: "lakehouse-modernization", title: "Fast Automatic Database Setup" },
  { slug: "cohort-retention-ltv", title: "Customer Retention Dashboard" }
];

function CaseStudyPage() {
  const { slug } = Route.useParams();
  const fetchProject = useServerFn(getProjectBySlug);
  const fetchSlugs = useServerFn(listPublishedProjectSlugs);

  const projectQ = useQuery({
    queryKey: ["project", slug],
    queryFn: () => fetchProject({ data: { slug } }),
  });
  const slugsQ = useQuery({
    queryKey: ["project-slugs"],
    queryFn: () => fetchSlugs(),
  });

  if (projectQ.isLoading) {
    return (
      <main className="min-h-screen bg-background grid place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-accent" />
      </main>
    );
  }

  const rawCs = projectQ.data?.project;
  let cs;
  if (!rawCs) {
    // Try to load from simple copy directly
    const localCopy = translateProject({ slug } as any);
    if (!localCopy.title) {
      throw notFound();
    }
    cs = {
      ...localCopy,
      cover_url: fallbackCovers[slug] || null
    };
  } else {
    cs = translateProject(rawCs);
  }

  const dbSlugs = slugsQ.data?.items ?? [];
  const items = dbSlugs.length > 0 ? dbSlugs : localSlugs;
  const idx = items.findIndex((i) => i.slug === cs.slug);
  const next = items.length > 0 ? items[(idx + 1) % items.length] : null;

  return (
    <main className="relative bg-background">
      <Nav />

      <section className="pt-32 md:pt-40 pb-12 md:pb-16 grid-bg">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <Link
            to="/work"
            className="inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-muted-foreground hover:text-accent mb-10"
          >
            <ArrowLeft className="h-4 w-4" /> Back to work
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="flex items-center gap-3 text-[10px] uppercase tracking-[0.25em] text-accent mb-6 font-mono font-bold">
              <span>Case Study Details</span>
              {cs.tag && <><span className="text-border/40">/</span><span>{cs.tag}</span></>}
            </div>
            <h1 className="font-serif-display text-[34px] md:text-[56px] lg:text-[72px] leading-[1.02] tracking-[-0.03em] max-w-5xl">
              {cs.title}
            </h1>
            {cs.impact && <p className="mt-6 text-sm md:text-base text-accent font-mono border-l-2 border-accent pl-4">{cs.impact}</p>}
          </motion.div>

          <div className="mt-12 grid sm:grid-cols-3 gap-6 border-t border-border/60 pt-8 text-sm">
            {cs.client && <Meta label="Client" value={cs.client} />}
            {cs.year && <Meta label="Year" value={cs.year} />}
            {cs.duration && <Meta label="Duration" value={cs.duration} />}
          </div>
        </div>
      </section>

      {cs.cover_url && (
        <section className="py-6">
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="aspect-[16/9] rounded-2xl overflow-hidden border border-border/80 bg-[#0e1320] shadow-card"
            >
              <img src={cs.cover_url} alt={cs.title} className="h-full w-full object-cover" />
            </motion.div>
          </div>
        </section>
      )}

      <section className="py-16 md:py-24">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 grid lg:grid-cols-12 gap-12">
          {/* Sidebar */}
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-8">
              {cs.role && (
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent mb-2.5 font-bold">Role</div>
                  <div className="font-medium text-foreground text-sm">{cs.role}</div>
                </div>
              )}
              {cs.stack?.length > 0 && (
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent mb-2.5 font-bold">Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {cs.stack.map((s: string) => (
                      <span key={s} className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground border border-border bg-white/[0.02] rounded px-2.5 py-1">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {Array.isArray(cs.metrics) && cs.metrics.length > 0 && (
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent mb-2.5 font-bold">Key metrics</div>
                  <div className="grid grid-cols-2 gap-3">
                    {(cs.metrics as Array<{ label: string; value: string }>).map((m) => (
                      <div key={m.label} className="glass rounded-xl p-4 border border-border">
                        <div className="font-serif-display text-xl text-foreground font-bold">{m.value}</div>
                        <div className="text-[9px] font-mono uppercase tracking-wider text-muted-foreground mt-1">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          {/* Core Content */}
          <div className="lg:col-span-8 space-y-12 max-w-[66ch]">
            {cs.problem && (
              <div>
                <h2 className="font-serif-display text-2xl md:text-3xl mb-4 text-foreground">The Challenge</h2>
                <p className="text-[16px] text-muted-foreground leading-relaxed">{cs.problem}</p>
              </div>
            )}

            {cs.approach?.length > 0 && (
              <div>
                <h2 className="font-serif-display text-2xl md:text-3xl mb-5 text-foreground">The Approach</h2>
                <ol className="space-y-4">
                  {cs.approach.map((step: string, i: number) => (
                    <li key={i} className="flex gap-4 items-start">
                      <div className="font-mono text-[11px] font-bold text-accent bg-accent/15 border border-accent/20 rounded h-6 w-6 flex items-center justify-center shrink-0 mt-0.5">
                        0{i + 1}
                      </div>
                      <p className="text-[15px] text-muted-foreground leading-relaxed pt-0.5">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {cs.outcomes?.length > 0 && (
              <div>
                <h2 className="font-serif-display text-2xl md:text-3xl mb-5 text-foreground">Outcomes & Impact</h2>
                <ul className="space-y-3">
                  {cs.outcomes.map((o: string, i: number) => (
                    <li key={i} className="flex gap-3 text-[15px] text-muted-foreground leading-relaxed">
                      <span className="text-accent mt-2 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {cs.gallery?.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-4 pt-4">
                {cs.gallery.map((g: string, i: number) => (
                  <div key={i} className="aspect-[4/3] rounded-xl overflow-hidden border border-border/80 bg-[#0e1320] shadow-elegant">
                    <img src={g} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Navigation footer */}
      <section className="py-20 border-t border-border bg-secondary/5">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 grid md:grid-cols-2 gap-6">
          {next && next.slug !== cs.slug && (
            <Link
              to="/work/$slug"
              params={{ slug: next.slug }}
              className="group border border-border rounded-xl p-8 hover:border-accent/40 transition bg-[#0e1320]/30 shadow-elegant"
            >
              <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent mb-2.5 font-bold">Next Case Study</div>
              <div className="font-serif-display text-xl sm:text-2xl flex items-center justify-between gap-4 text-foreground group-hover:text-accent transition-colors">
                {next.title}
                <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </div>
            </Link>
          )}
          <Link
            to="/contact"
            className="group border border-border rounded-xl p-8 hover:opacity-95 transition bg-gradient-primary text-white shadow-glow"
          >
            <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-white/70 mb-2.5 font-bold">Have a similar challenge?</div>
            <div className="font-serif-display text-xl sm:text-2xl flex items-center justify-between gap-4">
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
    <div className="border-l border-border/80 pl-4 py-1">
      <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent mb-1 font-bold">{label}</div>
      <div className="font-medium text-foreground text-[15px]">{value}</div>
    </div>
  );
}
