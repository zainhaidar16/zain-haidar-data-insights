import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, AlertCircle, Inbox, Loader2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { getProjects, Project } from "@/lib/api";

export function Work() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        const data = await getProjects();
        setProjects(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load projects");
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  return (
    <section id="work" className="relative py-24 md:py-32 bg-[#F8FAFC]">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 font-poppins">
        
        {/* Header */}
        <div className="mb-14 max-w-3xl">
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">Case Studies</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight mb-4">
            Featured Projects
          </h2>
          <p className="text-slate-500 text-[15px] leading-[1.8]">
            Take a look at some of the dashboards and data systems I have built for real clients.
          </p>
        </div>

        {/* LOADING STATE */}
        {loading && (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="p-6 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3.5 max-w-2xl mx-auto">
            <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-rose-800 text-sm">Failed to Load Projects</h4>
              <p className="text-xs text-rose-600 mt-1 leading-normal">{error}</p>
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && projects.length === 0 && (
          <div className="card-pro p-16 text-center max-w-xl mx-auto hover:border-slate-300">
            <div className="h-12 w-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-4">
              <Inbox className="h-5 w-5 text-slate-400" />
            </div>
            <p className="font-bold text-[#0F172A] text-xl mb-2">Projects coming soon</p>
            <p className="text-slate-500 text-sm leading-relaxed">
              I am writing up the details for my recent dashboard projects. Check back soon!
            </p>
          </div>
        )}

        {/* PROJECTS TIMELINE STACK */}
        {!loading && !error && projects.length > 0 && (
          <div className="mt-16 space-y-20 md:space-y-28">
            {projects.map((p, i) => {
              const projectDescription = p.short_description || p.problem || "Detailed metrics transformation and business optimization case study.";
              return (
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
                    className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-center cursor-pointer"
                  >
                    {/* Visual Thumbnail */}
                    <div className="lg:col-span-7 relative overflow-hidden rounded-2xl border border-slate-200 bg-slate-50 shadow-sm transition-all duration-300">
                      <div className="absolute inset-0 bg-[#252525]/40 z-10 opacity-60 group-hover:opacity-30 transition-opacity duration-300" />
                      
                      <div className="aspect-[16/10] overflow-hidden">
                        {p.image_url ? (
                          <img
                            src={p.image_url}
                            alt={p.title}
                            loading="lazy"
                            width={1280}
                            height={800}
                            className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                          />
                        ) : (
                          <div className="h-full w-full bg-slate-100 flex items-center justify-center text-slate-300 text-xs">
                            No Image Available
                          </div>
                        )}
                      </div>
                    </div>

                    {/* Content Block */}
                    <div className="lg:col-span-5 flex flex-col justify-center">
                      <div className="flex items-center gap-3 text-[10px] font-semibold tracking-wider text-slate-400 uppercase mb-4">
                        <span className="text-blue-600 font-bold">No. {String(i + 1).padStart(2, "0")}</span>
                        {p.category && <><span className="text-slate-300">/</span><span>{p.category}</span></>}
                      </div>
                      
                      <h3 className="text-2xl md:text-3xl font-bold leading-tight text-[#0F172A] group-hover:text-blue-600 transition-colors duration-300">
                        {p.title}
                      </h3>
                      
                      <p className="mt-5 text-[14px] text-slate-500 leading-relaxed">
                        {projectDescription}
                      </p>

                      {p.technologies && p.technologies.length > 0 && (
                        <div className="mt-6 flex flex-wrap gap-2 pt-4 border-t border-slate-200/60 font-mono text-[9px] tracking-wider text-slate-500 uppercase">
                          {p.technologies.slice(0, 5).map((s: string) => (
                            <span key={s} className="badge-navy">
                              {s}
                            </span>
                          ))}
                        </div>
                      )}

                      <div className="mt-8 inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-blue-600 group-hover:gap-3 transition-all relative w-fit py-1 border-b-2 border-transparent hover:border-blue-600">
                        View Case Study Details
                        <ArrowUpRight className="h-4.5 w-4.5" />
                      </div>
                    </div>
                  </Link>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
