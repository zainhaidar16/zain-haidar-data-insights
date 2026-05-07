import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { ArrowLeft, ArrowUpRight, Calendar, Clock, User2 } from "lucide-react";
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
        <h1 className="text-4xl font-bold">Case study not found</h1>
        <Link to="/" className="mt-6 inline-flex items-center gap-2 text-primary hover:underline">
          <ArrowLeft className="h-4 w-4" /> Back home
        </Link>
      </div>
    </div>
  ),
  errorComponent: ({ error, reset }) => (
    <div className="min-h-screen grid place-items-center px-6 text-center">
      <div>
        <h1 className="text-2xl font-bold">Something went wrong</h1>
        <p className="text-muted-foreground mt-2">{error.message}</p>
        <button onClick={reset} className="mt-6 rounded-full bg-gradient-primary px-5 py-2 text-sm">
          Try again
        </button>
      </div>
    </div>
  ),
  component: CaseStudyPage,
});

function CaseStudyPage() {
  const { cs } = Route.useLoaderData();
  const idx = caseStudies.findIndex((c) => c.slug === cs.slug);
  const next = caseStudies[(idx + 1) % caseStudies.length];

  return (
    <main className="relative">
      <Nav />

      {/* Hero */}
      <section className="relative pt-36 pb-16 overflow-hidden">
        <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
        <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[500px] w-[800px] rounded-full bg-primary/20 blur-[140px]" />
        <div className="relative mx-auto max-w-6xl px-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 text-sm text-muted-foreground hover:text-foreground mb-8"
          >
            <ArrowLeft className="h-4 w-4" /> Back to work
          </Link>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="inline-flex glass rounded-full px-3 py-1 text-[11px] uppercase tracking-widest mb-6">
              {cs.tag}
            </div>
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold leading-[1] tracking-tight max-w-4xl">
              {cs.title}
            </h1>
            <p className="mt-6 text-lg text-primary/90 font-mono">{cs.impact}</p>
          </motion.div>

          <div className="mt-12 grid sm:grid-cols-3 gap-3">
            {[
              { icon: User2, label: "Client", value: cs.client },
              { icon: Calendar, label: "Year", value: cs.year },
              { icon: Clock, label: "Duration", value: cs.duration },
            ].map((m) => (
              <div key={m.label} className="glass-strong rounded-2xl p-5 flex items-center gap-3">
                <div className="h-10 w-10 rounded-xl bg-gradient-primary grid place-items-center">
                  <m.icon className="h-4 w-4 text-primary-foreground" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] uppercase tracking-widest text-muted-foreground">{m.label}</div>
                  <div className="font-medium truncate">{m.value}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Cover image */}
      <section className="relative">
        <div className="mx-auto max-w-6xl px-6">
          <motion.div
            initial={{ opacity: 0, scale: 0.97 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="aspect-[16/9] rounded-3xl overflow-hidden glass-strong shadow-elegant"
          >
            <img src={cs.img} alt={cs.title} className="h-full w-full object-cover" />
          </motion.div>
        </div>
      </section>

      {/* Body */}
      <section className="relative py-24">
        <div className="mx-auto max-w-6xl px-6 grid lg:grid-cols-3 gap-12">
          {/* Sticky meta */}
          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-28 space-y-6">
              <div>
                <div className="text-xs uppercase tracking-widest text-primary mb-3">/ Role</div>
                <div className="font-medium">{cs.role}</div>
              </div>
              <div>
                <div className="text-xs uppercase tracking-widest text-primary mb-3">/ Stack</div>
                <div className="flex flex-wrap gap-2">
                  {cs.stack.map((s) => (
                    <span key={s} className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground">
                      {s}
                    </span>
                  ))}
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 pt-4">
                {cs.metrics.map((m) => (
                  <div key={m.label} className="glass-strong rounded-xl p-4">
                    <div className="text-xl font-bold text-gradient font-display">{m.value}</div>
                    <div className="text-[10px] uppercase tracking-widest text-muted-foreground mt-1">{m.label}</div>
                  </div>
                ))}
              </div>
            </div>
          </aside>

          {/* Content */}
          <div className="lg:col-span-2 space-y-14">
            <div>
              <h2 className="text-3xl font-bold mb-4">/ Problem</h2>
              <p className="text-lg text-muted-foreground leading-relaxed">{cs.problem}</p>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">/ Approach</h2>
              <ol className="space-y-4">
                {cs.approach.map((step, i) => (
                  <li key={i} className="glass-strong rounded-2xl p-5 flex gap-4">
                    <div className="h-9 w-9 rounded-lg bg-gradient-primary grid place-items-center shrink-0 font-mono text-sm">
                      0{i + 1}
                    </div>
                    <p className="text-muted-foreground leading-relaxed pt-1">{step}</p>
                  </li>
                ))}
              </ol>
            </div>

            <div>
              <h2 className="text-3xl font-bold mb-6">/ Outcomes</h2>
              <ul className="space-y-3">
                {cs.outcomes.map((o, i) => (
                  <li key={i} className="flex gap-3 text-lg text-muted-foreground">
                    <span className="text-primary mt-1.5">●</span>
                    <span>{o}</span>
                  </li>
                ))}
              </ul>
            </div>

            {cs.gallery.length > 0 && (
              <div className="grid sm:grid-cols-2 gap-4">
                {cs.gallery.map((g, i) => (
                  <div key={i} className="aspect-[4/3] rounded-2xl overflow-hidden glass-strong">
                    <img src={g} alt="" className="h-full w-full object-cover" loading="lazy" />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Next + CTA */}
      <section className="relative py-24 border-t border-white/5">
        <div className="mx-auto max-w-6xl px-6 grid md:grid-cols-2 gap-6">
          <Link
            to="/work/$slug"
            params={{ slug: next.slug }}
            className="group glass-strong rounded-3xl p-8 hover:border-primary/40 transition"
          >
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Next case study</div>
            <div className="text-2xl font-semibold flex items-center justify-between gap-4">
              {next.title}
              <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
          <Link
            to="/"
            hash="contact"
            className="group glass-strong rounded-3xl p-8 hover:border-primary/40 transition bg-gradient-to-br from-primary/10 to-transparent"
          >
            <div className="text-xs uppercase tracking-widest text-muted-foreground mb-3">Have a similar challenge?</div>
            <div className="text-2xl font-semibold flex items-center justify-between gap-4">
              Let's talk about your data
              <ArrowUpRight className="h-5 w-5 shrink-0 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
            </div>
          </Link>
        </div>
      </section>

      <Footer />
    </main>
  );
}
