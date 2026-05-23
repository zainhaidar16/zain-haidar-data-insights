import { motion } from "framer-motion";
import { ArrowRight, Check } from "lucide-react";
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
    <section id="work" className="relative py-20 md:py-24 border-b border-slate-100">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-6">
        <SectionHeader
          kicker="Case Studies"
          title="Deployed Data Architectures"
          intro="A selection of recent business intelligence architectures deployed across retail groups, private healthcare providers, fintech scale-ups, and customer analytics teams."
        />

        {isLoading && (
          <div className="flex justify-center items-center py-16">
            <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-slate-400"></div>
          </div>
        )}

        {!isLoading && projects.length === 0 && (
          <div className="border border-slate-200 rounded p-12 text-center max-w-lg mx-auto bg-slate-50">
            <p className="font-serif-display text-[16px] font-bold mb-1 text-slate-800">No Deployments Documented</p>
            <p className="text-slate-500 text-xs">
              We are currently drafting case studies for our most recent project implementations. Please check back.
            </p>
          </div>
        )}

        <div className="mt-12 space-y-16">
          {projects.map((p, i) => (
            <motion.div
              key={p.slug}
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.5, delay: i * 0.04 }}
              className="border border-slate-200 rounded p-6 md:p-8 hover:bg-slate-50/20 transition-all shadow-sm"
            >
              <Link
                to="/work/$slug"
                params={{ slug: p.slug }}
                preload="intent"
                className="grid lg:grid-cols-12 gap-6 md:gap-10 items-start"
              >
                {/* Visual Thumbnail */}
                <div className="lg:col-span-5 relative overflow-hidden rounded border border-slate-200/80 bg-slate-50 shadow-sm">
                  <div className="aspect-[16/10] overflow-hidden">
                    {p.cover_url ? (
                      <img
                        src={p.cover_url}
                        alt={p.title}
                        loading="lazy"
                        width={1280}
                        height={800}
                        className="h-full w-full object-cover grayscale opacity-90 transition-all hover:grayscale-0 hover:opacity-100 duration-300"
                      />
                    ) : (
                      <div className="h-full w-full bg-slate-100" />
                    )}
                  </div>
                </div>

                {/* Content Block */}
                <div className="lg:col-span-7 flex flex-col justify-between h-full">
                  <div>
                    <div className="flex items-center gap-2 text-[10px] font-mono text-slate-400 uppercase mb-3">
                      <span>No. {String(i + 1).padStart(2, "0")}</span>
                      {p.tag && <><span className="text-slate-200">/</span><span>{p.tag}</span></>}
                    </div>
                    
                    <h3 className="font-serif-display text-[22px] md:text-[26px] leading-tight text-slate-800 hover:text-slate-900 transition-colors">
                      {p.title}
                    </h3>
                    
                    {p.problem && (
                      <p className="mt-4 text-[13px] text-slate-500 leading-relaxed">
                        {p.problem}
                      </p>
                    )}
                  </div>

                  <div>
                    {p.impact && (
                      <div className="mt-5 p-3 rounded bg-slate-50 border border-slate-100 flex items-center gap-3">
                        <div className="h-5 w-5 rounded-full bg-slate-200 flex items-center justify-center shrink-0">
                          <Check className="h-3 w-3 text-slate-600" />
                        </div>
                        <div className="text-[11px] font-mono">
                          <span className="text-slate-400 uppercase block text-[9px] mb-0.5">Measurable Impact</span>
                          <span className="text-slate-700 font-semibold">{p.impact}</span>
                        </div>
                      </div>
                    )}

                    {p.stack && p.stack.length > 0 && (
                      <div className="mt-5 flex flex-wrap gap-1.5">
                        {p.stack.slice(0, 5).map((s) => (
                          <span
                            key={s}
                            className="text-[9px] font-mono tracking-wider bg-slate-50 border border-slate-100 text-slate-500 px-2 py-0.5 rounded"
                          >
                            {s}
                          </span>
                        ))}
                      </div>
                    )}

                    <div className="mt-6 inline-flex items-center gap-1.5 text-xs font-bold text-slate-900 hover:gap-2.5 transition-all">
                      Read Technical Case Study
                      <ArrowRight className="h-3.5 w-3.5" />
                    </div>
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
