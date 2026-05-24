import { motion } from "framer-motion";
import { ArrowUpRight, Check, Award } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { SectionHeader } from "./SectionHeader";
import { listPublishedProjects } from "@/lib/projects.functions";
import { translateProject } from "@/lib/simple-copy";

const fallbackProjects = [
  {
    slug: "executive-kpi-retail",
    title: "Store Sales and Profit Dashboard",
    tag: "Power BI · Retail",
    problem: "Store managers had to copy and paste numbers from 6 different spreadsheets every single week. It took a long time, and it was very hard to see if the stores were actually making a profit.",
    impact: "Saved managers 4 hours of work every week and made it easy to see profits in real-time.",
    stack: ["Power BI", "SQL Server", "Data Modeling", "Spreadsheet Cleanup"],
    cover_url: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1280&q=80"
  },
  {
    slug: "patient-demand-forecasting",
    title: "Hospital Staff Scheduler",
    tag: "AI Analytics · Healthcare",
    problem: "Hospitals were having a hard time scheduling the right number of doctors and nurses. Some days they had too many staff sitting around, and other days they were short-staffed and patients had to wait.",
    impact: "92% scheduling accuracy and automated daily updates.",
    stack: ["Power BI", "Python", "Data Automation", "Predictions"],
    cover_url: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?auto=format&fit=crop&w=1280&q=80"
  },
  {
    slug: "lakehouse-modernization",
    title: "Fast Automatic Database Setup",
    tag: "Data Engineering · Finance",
    problem: "A financial company's databases were extremely slow and took over 8 hours to update. This meant their daily business reports were always late, and the system broke constantly.",
    impact: "Reports now update in 12 minutes instead of 8 hours, and they never break.",
    stack: ["Snowflake", "dbt", "Python", "Automatic Pipelines"],
    cover_url: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1280&q=80"
  },
  {
    slug: "cohort-retention-ltv",
    title: "Customer Retention Dashboard",
    tag: "Customer Analytics · SaaS",
    problem: "Different departments in a software company couldn't agree on how to count lost customers. Their charts lived in messy spreadsheets that nobody trusted.",
    impact: "Helped reduce customer loss by 24% and gave the team a single dashboard they trust.",
    stack: ["Tableau", "SQL", "Google BigQuery", "Customer Analytics"],
    cover_url: "https://images.unsplash.com/photo-1551836022-d5d88e9218df?auto=format&fit=crop&w=1280&q=80"
  }
];

export function Work() {
  const fetchProjects = useServerFn(listPublishedProjects);
  const { data, isLoading } = useQuery({
    queryKey: ["published-projects"],
    queryFn: () => fetchProjects(),
  });

  // Calculate projects: server data first, fallback if empty
  const serverProjects = data?.projects ?? [];
  const projects = serverProjects.length > 0 
    ? serverProjects.map(translateProject)
    : fallbackProjects.map(p => translateProject(p as any));

  return (
    <section id="work" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeader
          kicker="Case Studies"
          title="Featured Projects"
          intro="Take a look at some of the dashboards and data systems I have built for real clients."
        />

        {isLoading && (
          <div className="flex justify-center items-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-accent"></div>
          </div>
        )}

        {!isLoading && projects.length === 0 && (
          <div className="glass rounded-3xl p-16 text-center max-w-xl mx-auto shadow-elegant">
            <p className="font-serif-display text-2xl mb-2 text-foreground">Projects coming soon</p>
            <p className="text-muted-foreground text-sm">
              I am writing up the details for my recent dashboard projects. Check back soon!
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
                {/* Visual Thumbnail */}
                <div className="lg:col-span-7 relative overflow-hidden rounded-2xl border border-border/80 bg-muted/20 shadow-elegant transition-colors duration-300">
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent z-10 opacity-70 group-hover:opacity-40 transition-opacity duration-300" />
                  
                  <div className="aspect-[16/10] overflow-hidden">
                    {p.cover_url ? (
                      <img
                        src={p.cover_url}
                        alt={p.title}
                        loading="lazy"
                        width={1280}
                        height={800}
                        className="h-full w-full object-cover transition-all duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="h-full w-full bg-surface" />
                    )}
                  </div>
                </div>

                {/* Content Block */}
                <div className="lg:col-span-5 flex flex-col justify-center">
                  <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-muted-foreground uppercase mb-4">
                    <span className="text-accent font-bold">No. {String(i + 1).padStart(2, "0")}</span>
                    {p.tag && <><span className="text-border/40">/</span><span>{p.tag}</span></>}
                  </div>
                  
                  <h3 className="font-serif-display text-[28px] md:text-[36px] leading-[1.08] tracking-[-0.03em] text-foreground group-hover:text-accent transition-colors duration-300">
                    {p.title}
                  </h3>
                  
                  {p.problem && (
                    <p className="mt-5 text-[15px] text-muted-foreground leading-relaxed">
                      {p.problem}
                    </p>
                  )}

                  {p.impact && (
                    <div className="mt-6 p-4 rounded-xl bg-white/[0.02] border border-border/80 flex items-center gap-3 shadow-elegant">
                      <div className="h-7 w-7 rounded-lg bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0 text-accent">
                        <Check className="h-4 w-4" />
                      </div>
                      <div className="text-xs">
                        <span className="text-accent uppercase font-mono tracking-widest block text-[9px] mb-0.5 font-bold">Measurable Impact</span>
                        <span className="font-mono text-foreground font-semibold text-[13px]">{p.impact}</span>
                      </div>
                    </div>
                  )}

                  {p.stack && p.stack.length > 0 && (
                    <div className="mt-6 flex flex-wrap gap-2 pt-2 border-t border-border/40 font-mono text-[9px] tracking-wider text-muted-foreground uppercase">
                      {p.stack.slice(0, 5).map((s) => (
                        <span key={s} className="border border-border/60 rounded px-2 py-0.5 bg-black/40">
                          {s}
                        </span>
                      ))}
                    </div>
                  )}

                  <div className="mt-8 inline-flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-accent group-hover:gap-3 transition-all relative w-fit py-1 after:absolute after:bottom-0 after:left-0 after:right-0 after:h-[2px] after:bg-accent after:scale-x-0 group-hover:after:scale-x-100 after:origin-right group-hover:after:origin-left after:transition-transform after:duration-300">
                    View Case Study Details
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
