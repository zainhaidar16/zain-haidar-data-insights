import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Loader2 } from "lucide-react";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { getProjectBySlug, listPublishedProjectSlugs } from "@/lib/projects.functions";

export const Route = createFileRoute("/work/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `Case Study — ${params.slug.replace(/-/g, " ")} | Zain Haidar` },
      { name: "description", content: "Power BI, DAX and analytics case study by Zain Haidar." },
    ],
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
      <main className="min-h-screen grid place-items-center">
        <Loader2 className="h-6 w-6 animate-spin text-muted-foreground" />
      </main>
    );
  }

  const cs = projectQ.data?.project;
  if (!cs) throw notFound();

  const items = slugsQ.data?.items ?? [];
  const idx = items.findIndex((i) => i.slug === cs.slug);
  const next = items.length > 0 ? items[(idx + 1) % items.length] : null;

  return (
    <main className="relative">
      <Nav />

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
              {cs.tag && <><span className="text-border">/</span><span>{cs.tag}</span></>}
            </div>
            <h1 className="font-serif-display text-[36px] md:text-[64px] lg:text-[80px] leading-[1.02] tracking-[-0.025em] max-w-5xl">
              {cs.title}
            </h1>
            {cs.impact && <p className="mt-6 text-lg text-foreground/80 font-mono">{cs.impact}</p>}
          </motion.div>

          <div className="mt-12 grid sm:grid-cols-3 gap-6 border-t border-border pt-6 text-sm">
            {cs.client && <Meta label="Client" value={cs.client} />}
            {cs.year && <Meta label="Year" value={cs.year} />}
            {cs.duration && <Meta label="Duration" value={cs.duration} />}
          </div>
        </div>
      </section>

      {cs.cover_url && (
        <section>
          <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="aspect-[16/9] rounded-md overflow-hidden border border-border bg-secondary shadow-elegant"
            >
              <img src={cs.cover_url} alt={cs.title} className="h-full w-full object-cover" />
            </motion.div>
          </div>
        </section>
      )}

      <section className="py-20 md:py-28">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 grid lg:grid-cols-12 gap-12">
          <aside className="lg:col-span-4">
            <div className="lg:sticky lg:top-28 space-y-8">
              {cs.role && (
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-3">Role</div>
                  <div className="font-medium">{cs.role}</div>
                </div>
              )}
              {cs.stack?.length > 0 && (
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-3">Stack</div>
                  <div className="flex flex-wrap gap-2">
                    {cs.stack.map((s: string) => (
                      <span key={s} className="text-[11px] uppercase tracking-wider text-muted-foreground border border-border rounded-full px-2.5 py-1">
                        {s}
                      </span>
                    ))}
                  </div>
                </div>
              )}
              {Array.isArray(cs.metrics) && cs.metrics.length > 0 && (
                <div>
                  <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-3">Key metrics</div>
                  <div className="grid grid-cols-2 gap-3">
                    {(cs.metrics as Array<{ label: string; value: string }>).map((m) => (
                      <div key={m.label} className="border border-border rounded-md p-4 bg-card">
                        <div className="font-serif-display text-2xl">{m.value}</div>
                        <div className="text-[11px] uppercase tracking-wider text-muted-foreground mt-1">{m.label}</div>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </aside>

          <div className="lg:col-span-8 space-y-14 max-w-[64ch]">
            {cs.problem && (
              <div>
                <h2 className="font-serif-display text-3xl md:text-4xl mb-4">Problem</h2>
                <p className="text-[17px] text-foreground/85 leading-[1.7]">{cs.problem}</p>
              </div>
            )}

            {cs.approach?.length > 0 && (
              <div>
                <h2 className="font-serif-display text-3xl md:text-4xl mb-6">Approach</h2>
                <ol className="space-y-5">
                  {cs.approach.map((step: string, i: number) => (
                    <li key={i} className="flex gap-5">
                      <div className="font-mono text-[12px] uppercase tracking-wider text-muted-foreground pt-1 shrink-0">
                        0{i + 1}
                      </div>
                      <p className="text-[16px] text-foreground/85 leading-[1.7]">{step}</p>
                    </li>
                  ))}
                </ol>
              </div>
            )}

            {cs.outcomes?.length > 0 && (
              <div>
                <h2 className="font-serif-display text-3xl md:text-4xl mb-6">Outcomes</h2>
                <ul className="space-y-3">
                  {cs.outcomes.map((o: string, i: number) => (
                    <li key={i} className="flex gap-3 text-[16px] text-foreground/85 leading-[1.7]">
                      <span className="text-accent mt-2.5 h-1.5 w-1.5 rounded-full bg-accent shrink-0" />
                      <span>{o}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {cs.gallery?.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-4">
                {cs.gallery.map((g: string, i: number) => (
                  <div key={i} className="aspect-[4/3] rounded-md overflow-hidden border border-border bg-secondary">
                    <img src={g} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      <section className="py-20 border-t border-border">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8 grid md:grid-cols-2 gap-6">
          {next && next.slug !== cs.slug && (
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
          )}
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
