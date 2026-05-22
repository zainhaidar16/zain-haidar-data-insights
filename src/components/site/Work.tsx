import { motion } from "framer-motion";
import { ArrowUpRight, Check } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { SectionHeader } from "./SectionHeader";
import { listPublishedProjects } from "@/lib/projects.functions";

export function Work() {
  const fetchProjects = useServerFn(listPublishedProjects);
  const { data, isLoading } = useQuery({
    queryKey: ["published-projects"],
    queryFn: () => fetchProjects(),
  });
  const projects = data?.projects ?? [];

  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeader
          kicker="Selected Projects"
          title="Architectural Case Studies"
          intro="Explore our recent deployments covering Power BI scaling, optimized enterprise DAX architectures, high-throughput SQL warehouses, and predictive ML systems."
        />

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
          </div>
        )}

        {!isLoading && projects.length === 0 && (
          <div className="glass rounded-3xl p-16 text-center max-w-xl mx-auto">
            <p className="font-serif-display text-2xl mb-2 text-foreground">Case Studies Pending</p>
            <p className="text-muted-foreground text-sm">
              We are finalizing documentation for recent deployments. Please check back shortly.
            </p>
          </div>
        )}

        <div className="mt-16 space-y-20 md:space-y-28">
          {projects.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.6, delay: 0.05 }}
              className="group relative"
            >
              <Link
                to="/work/$slug"
                params={{ slug: p.slug }}
                preload="intent"
                className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center"
              >
                {/* Visual Cover Mockup */}
                <div className="lg:col-span-7 relative overflow-hidden rounded-2xl border border-white/5 bg-secondary/20 shadow-elegant group-hover:border-accent/25 transition-colors duration-500">
                  <div className="absolute inset-0 bg-gradient-to-t from-[#060913]/40 to-transparent z-10" />
                  
                  {/* Subtle Tech Glow */}
                  <div className="absolute -bottom-20 -right-20 w-60 h-60 rounded-full bg-accent/5 blur-[80px] pointer-events-none group-hover:bg-accent/10 transition-colors duration-500" />
                  
                  <div className="aspect-[16/10] overflow-hidden">
                    {p.cover_url ? (
                      <img
                        src={p.cover_url}
                        alt={p.title}
                        loading="lazy"
                        width={1280}
                        height={800}
                        className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-surface" />
                    )}
                  </div>
                </div>

                {/* Meta details & Copy */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-muted-foreground uppercase mb-4">
                    <span className="text-accent font-bold">No. {String(i + 1).padStart(2, "0")}</span>
                    {p.tag && <><span className="text-white/10">/</span><span>{p.tag}</span></>}
                  </div>
                  
                  <h3 className="font-serif-display text-[28px] md:text-[38px] leading-[1.08] tracking-[-0.03em] text-foreground group-hover:text-accent transition-colors duration-300">
                    {p.title}
                  </h3>
                  
                  {p.problem && (
                    <p className="mt-5 text-[15px] text-muted-foreground leading-relaxed">
                      {p.problem}
                    </p>
                  )}

                  {p.impact && (
                    <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-white/5 flex items-center gap-3">
                      <div className="h-6 w-6 rounded-full bg-accent/10 flex items-center justify-center shrink-0">
                        <Check className="h-3.5 w-3.5 text-accent" />
                      </div>
                      <div className="text-xs">
                        <span className="text-muted-foreground uppercase font-mono tracking-widest block text-[9px] mb-0.5">Measurable Outcome</span>
                        <span className="font-mono text-foreground font-semibold">{p.impact}</span>
                      </div>
                    </div>
                  )}

                  {p.stack && p.stack.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2">
                      {p.stack.slice(0, 5).map((s) => (
                        <span
                          key={s}
                          className="text-[9px] font-mono tracking-wider uppercase bg-white/5 border border-white/5 text-muted-foreground px-2.5 py-1 rounded"
                        >
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-8 inline-flex items-center gap-2 text-sm font-bold text-accent group-hover:gap-3 transition-all relative w-fit py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-accent after:scale-x-0 group-hover:after:scale-x-100 after:origin-right group-hover:after:origin-left after:transition-transform after:duration-300">
                    View Enterprise Case Study
                    <ArrowUpRight className="h-4.5 w-4.5" />
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
