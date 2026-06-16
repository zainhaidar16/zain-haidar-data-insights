import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, Loader2, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { getFeaturedProjects, Project } from "@/lib/api";
import { getLogosForText } from "@/data/tools";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function LatestProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const data = await getFeaturedProjects(3);
        setProjects(data);
      } catch (err) {
        setError("Failed to load projects");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  if (loading) {
    return (
      <section className="py-24 md:py-28 bg-[var(--site-bg)] border-t border-[var(--line-soft)]">
        <div className="section-container text-center text-[var(--text-muted)] text-sm">
          <Loader2 className="h-6 w-6 animate-spin mx-auto mb-2 text-[var(--purple)]" />
          Loading projects...
        </div>
      </section>
    );
  }

  if (projects.length === 0) {
    return (
      <section className="py-24 md:py-28 bg-[var(--site-bg)] border-t border-[var(--line-soft)]">
        <div className="section-container text-center text-[var(--text-muted)] text-sm">
          No projects added yet.
        </div>
      </section>
    );
  }

  return (
    <section className="py-24 md:py-28 bg-[var(--site-bg)] border-t border-[var(--line-soft)]">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-normal text-[var(--text-main)] mb-4">
            Latest Projects
          </h2>
          <p className="text-[15px] text-[var(--text-soft)] max-w-xl mx-auto leading-relaxed font-normal">
            Simple examples of dashboards, reports, and data work I can build for businesses.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {projects.map((project, i) => (
            <motion.div
              key={project.id}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
              className="site-card p-6 flex flex-col justify-between group"
            >
              <div>
                {project.image_url && (
                  <div className="aspect-[16/9] overflow-hidden rounded-xl border border-[var(--card-border)] mb-4 bg-[#FAF9FF]">
                    <img
                      src={project.image_url}
                      alt=""
                      className="h-full w-full object-cover group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                )}
                <div className="flex items-center justify-between gap-3 mb-2">
                  <span className="site-card-label">
                    {project.category}
                  </span>
                  <div className="flex items-center gap-1">
                    {getLogosForText(project.title + " " + (project.short_description || "") + " " + (project.technologies ? project.technologies.join(" ") : "")).slice(0, 3).map((logo) => (
                      <div key={logo.name} className="h-6 w-6 rounded-md bg-[#F5F2FF] border border-[rgba(112,72,232,0.12)] flex items-center justify-center shrink-0" title={logo.name}>
                        <img src={logo.logo} alt={`${logo.name} logo`} className="h-3.5 w-3.5 object-contain" />
                      </div>
                    ))}
                  </div>
                </div>
                <h3 className="site-card-title text-[17px] mt-2 mb-2">
                  {project.title}
                </h3>
                {project.short_description && (
                  <p className="site-card-text text-[13px] leading-relaxed mb-4 line-clamp-3">
                    {project.short_description}
                  </p>
                )}
                {/* Metrics Tag */}
                {project.metrics && project.metrics.length > 0 && (
                  <div className="bg-[var(--purple-soft)] rounded-xl p-3 border border-[var(--card-border)] mb-4">
                    <p className="text-xs font-normal text-[var(--text-main)] flex items-center gap-2">
                      <Sparkles className="h-3.5 w-3.5 text-[var(--purple)] shrink-0" />
                      <span className="text-[var(--text-muted)] font-normal truncate">
                        {project.metrics[0].label}:
                      </span>
                      <span className="font-normal text-[var(--text-main)] truncate">
                        {project.metrics[0].value}
                      </span>
                    </p>
                  </div>
                )}
              </div>
              <Link
                to="/projects/$slug"
                params={{ slug: project.slug }}
                className="site-card-link inline-flex items-center gap-1.5 text-[13px] mt-auto"
              >
                View project
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All button */}
        <div className="text-center">
          <Button asChild variant="secondary">
            <Link to="/projects" className="inline-flex items-center gap-2">
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
