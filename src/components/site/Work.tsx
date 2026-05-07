import { motion } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { SectionHeader } from "./SectionHeader";
import { caseStudies } from "@/data/caseStudies";

export function Work() {
  return (
    <section id="work" className="relative py-32">
      <div className="mx-auto max-w-7xl px-6">
        <SectionHeader
          kicker="Portfolio"
          title="Selected Work"
          intro="A glimpse of dashboards, pipelines and AI analytics shipped across retail, finance and healthcare."
        />

        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {caseStudies.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: i * 0.05 }}
            >
              <Link
                to="/work/$slug"
                params={{ slug: p.slug }}
                preload="intent"
                className="group block relative rounded-3xl glass-strong overflow-hidden hover:shadow-glow transition-all duration-500"
              >
                <div className="relative aspect-[16/10] overflow-hidden">
                  <img
                    src={p.img}
                    alt={p.title}
                    loading="lazy"
                    width={1280}
                    height={800}
                    className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-card via-card/30 to-transparent" />
                  <div className="absolute top-4 left-4 glass rounded-full px-3 py-1 text-[11px] uppercase tracking-widest">
                    {p.tag}
                  </div>
                  <div className="absolute top-4 right-4 h-10 w-10 rounded-full bg-foreground text-background grid place-items-center opacity-0 group-hover:opacity-100 translate-y-2 group-hover:translate-y-0 transition-all">
                    <ArrowUpRight className="h-4 w-4" />
                  </div>
                </div>
                <div className="p-6 lg:p-8">
                  <h3 className="text-xl lg:text-2xl font-semibold leading-tight">{p.title}</h3>
                  <div className="mt-2 text-sm text-primary/90 font-mono">{p.impact}</div>
                  <div className="mt-5 flex flex-wrap gap-2">
                    {p.stack.slice(0, 4).map((s) => (
                      <span key={s} className="rounded-full border border-white/10 px-3 py-1 text-xs text-muted-foreground">
                        {s}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 inline-flex items-center gap-1.5 text-sm font-medium text-primary group-hover:gap-2.5 transition-all">
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
