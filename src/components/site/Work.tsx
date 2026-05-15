import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SectionHeader } from "./SectionHeader";
import { caseStudies } from "@/data/caseStudies";

export function Work() {
  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeader
          kicker="Selected work"
          title="Dashboards, models &amp; pipelines I&apos;ve shipped."
          intro="A handful of recent engagements — Power BI, DAX, ETL — across retail, healthcare, finance and SaaS. Each case study includes the problem, what I built, and the measurable outcome."
        />

        <div className="space-y-14 md:space-y-20">
          {caseStudies.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.04 }}
            >
              <Link
                to="/work/$slug"
                params={{ slug: p.slug }}
                preload="intent"
                className="group grid md:grid-cols-12 gap-6 md:gap-10 items-start"
              >
                <div className="md:col-span-7 relative overflow-hidden rounded-md bg-secondary border border-border">
                  <div className="aspect-[16/10] overflow-hidden">
                    <img
                      src={p.img}
                      alt={p.title}
                      loading="lazy"
                      width={1280}
                      height={800}
                      className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-[1.02]"
                    />
                  </div>
                </div>

                <div className="md:col-span-5 md:pt-4">
                  <div className="flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-4">
                    <span className="font-mono">No. {String(i + 1).padStart(2, "0")}</span>
                    <span className="text-border">/</span>
                    <span>{p.tag}</span>
                  </div>
                  <h3 className="font-serif-display text-[28px] md:text-[34px] leading-[1.05] tracking-[-0.02em] group-hover:text-foreground/80 transition-colors">
                    {p.title}
                  </h3>
                  <p className="mt-4 text-[15px] text-muted-foreground leading-relaxed line-clamp-3">
                    {p.problem}
                  </p>

                  <div className="mt-5 flex items-baseline gap-2 text-sm">
                    <span className="text-muted-foreground">Outcome —</span>
                    <span className="font-mono text-foreground">{p.impact}</span>
                  </div>

                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.stack.slice(0, 5).map((s) => (
                      <span key={s} className="text-[11px] uppercase tracking-wider text-muted-foreground border border-border rounded-full px-2.5 py-1">
                        {s}
                      </span>
                    ))}
                  </div>

                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium border-b border-foreground pb-0.5 group-hover:gap-2.5 transition-all">
                    Read case study
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
