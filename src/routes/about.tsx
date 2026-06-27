import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { PageHero } from "@/components/portfolio/PageHero";
import { Button } from "@/components/ui/button";
import { Experience, Certification, Skill } from "@/lib/api";
import {
  Briefcase,
  Database,
  Award,
  ExternalLink,
  CalendarRange,
  MapPin,
  Target,
  ShieldCheck,
  Zap,
  HeartHandshake,
  Laptop,
} from "lucide-react";
import { BarChart3, Code2, Cpu, Users } from "lucide-react";
import { motion } from "framer-motion";
import type { LucideIcon } from "lucide-react";
import { getAboutPageData } from "@/lib/public-data.functions";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export const Route = createFileRoute("/about")({
  loader: () => getAboutPageData(),
  head: () => ({
    meta: [
      { title: "About Zain Haidar — Data Analyst & BI Specialist" },
      {
        name: "description",
        content:
          "Learn about Zain Haidar's professional journey, core mission, and data analytics expertise. Experienced in Power BI, SQL pipelines, and custom BI solutions.",
      },
    ],
  }),
  component: AboutPage,
});

const values = [
  {
    icon: Target,
    title: "Business-First Analytics",
    desc: "Data is only as valuable as the decisions it enables. I focus on core business outcomes and stakeholder objectives, not just writing code.",
  },
  {
    icon: Zap,
    title: "Clarity & Simplicity",
    desc: "I believe in making insights intuitive and highly accessible. A premium dashboard shouldn't need a manual — it should speak for itself.",
  },
  {
    icon: ShieldCheck,
    title: "Robust Engineering",
    desc: "Building ETL processes and databases that are modular, documented, version-controlled, and fully optimized for long-term scalability.",
  },
  {
    icon: HeartHandshake,
    title: "Collaborative Ownership",
    desc: "Working hand-in-hand with business users, product managers, and engineering teams to ensure my data tools are actively adopted and trusted.",
  },
];

const categoryConfigs: Record<string, { colorClass: string; icon: LucideIcon }> = {
  "Business Intelligence": {
    colorClass: "text-[var(--purple)] bg-[var(--purple-soft)] border-[var(--card-border)]",
    icon: BarChart3,
  },
  "Data Analysis & Modelling": {
    colorClass: "text-[var(--purple)] bg-[var(--purple-soft)] border-[var(--card-border)]",
    icon: Code2,
  },
  "Data Analysis": { colorClass: "text-[var(--purple)] bg-[var(--purple-soft)] border-[var(--card-border)]", icon: Code2 },
  "Data Engineering & ETL": {
    colorClass: "text-[var(--purple)] bg-[var(--purple-soft)] border-[var(--card-border)]",
    icon: Cpu,
  },
  "Data Engineering": {
    colorClass: "text-[var(--purple)] bg-[var(--purple-soft)] border-[var(--card-border)]",
    icon: Cpu,
  },
  "Cloud & Tools": { colorClass: "text-[var(--purple)] bg-[var(--purple-soft)] border-[var(--card-border)]", icon: Database },
  "Soft Skills": { colorClass: "text-[var(--purple)] bg-[var(--purple-soft)] border-[var(--card-border)]", icon: Users },
};

function AboutPage() {
  const { experiences, skills, certifications } = Route.useLoaderData();

  const getGroupedSkills = () => {
    const grouped: Record<string, Skill[]> = {};
    skills.forEach((s) => {
      const cat = s.category || "General";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(s);
    });

    return Object.entries(grouped).map(([title, list]) => {
      const config = categoryConfigs[title] || {
        colorClass: "text-[#A779FF] bg-[rgba(139,92,246,0.08)] border-[rgba(139,92,246,0.15)]",
        icon: Laptop,
      };
      return {
        title,
        config,
        skills: list.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0)),
      };
    });
  };

  const groupedSkillsList = getGroupedSkills();

  return (
    <main className="bg-[var(--site-bg)] min-h-screen flex flex-col">
      <Header />

      <PageHero
        eyebrow="About"
        title="Bridging the gap between engineering pipelines and business strategies."
        // TODO(zain): Confirm the "5+ years" experience claim.
        description="Data analyst and BI specialist with 5+ years building analytics infrastructure that removes operational drag and drives clearer business decisions."
        divider={false}
        compact
      />

      <section className="pt-0 pb-12 md:pb-20 flex-grow bg-[var(--site-bg)]">
        <div className="section-container space-y-12 md:space-y-16">
          {/* Mission & Values */}
          <div className="space-y-8">
            <div className="max-w-xl space-y-2">
              <p className="text-[12px] font-normal uppercase tracking-[0.2em] text-[var(--purple)]">
                Core Principles
              </p>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-main)] tracking-normal">
                Mission & Values
              </h2>
            </div>

            <div className="grid sm:grid-cols-2 gap-6">
              {values.map((v, idx) => {
                const Icon = v.icon;
                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: idx * 0.06, ease: EASE }}
                    className="site-card p-6 space-y-4 group"
                  >
                    <div className="h-11 w-11 rounded-xl bg-[var(--purple-soft)] border border-[var(--card-border)] flex items-center justify-center shrink-0 group-hover:bg-[var(--purple)] transition-colors duration-300">
                      <Icon className="h-5 w-5 text-[var(--purple)] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-[var(--text-main)] text-sm tracking-normal mb-2">
                        {v.title}
                      </h3>
                      <p className="text-[var(--text-soft)] text-[13px] leading-relaxed">{v.desc}</p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* Bio */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, ease: EASE }}
            className="grid md:grid-cols-5 gap-10 items-start"
          >
            {/* Photo */}
            <div className="md:col-span-2 flex flex-col items-center">
              <div className="relative group w-full max-w-[280px]">
                <div className="absolute -inset-1 rounded-2xl bg-[var(--purple-soft)] -z-10" />
                <div className="relative aspect-[3/4] w-full rounded-2xl overflow-hidden border border-[var(--card-border)] bg-[var(--card-bg)]">
                  <img
                    src="/zain.jpg"
                    alt="Zain Haidar - Data Analyst & BI Specialist"
                    className="object-cover w-full h-full transform group-hover:scale-[1.03] transition duration-300"
                  />
                </div>
              </div>
              <div className="mt-5 text-center">
                <h4 className="font-semibold text-[var(--text-main)] text-sm">Zain Haidar</h4>
                <p className="text-[11px] font-normal text-[var(--text-muted)] uppercase tracking-widest mt-1">
                  Data Analyst & BI Specialist
                </p>
                <div className="flex items-center gap-1.5 mt-2 justify-center">
                  <MapPin className="h-3.5 w-3.5 text-[var(--purple)]" />
                  <span className="text-[12px] font-normal text-[var(--text-muted)]">Vienna, Austria</span>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 bg-[var(--purple-soft)] border border-[var(--card-border)] rounded-full px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[var(--purple)] animate-pulse" />
                  <span className="text-[10px] font-normal text-[var(--purple)]">
                    Available for projects
                  </span>
                </div>
              </div>
            </div>

            {/* Narrative */}
            <div className="md:col-span-3 space-y-6">
              <div className="text-[var(--text-soft)] text-[15px] leading-[1.8] space-y-4">
                <p>
                  Over the past few years, I have worked as a dedicated data professional, designing
                  Business Intelligence systems and automating analytical infrastructure. I focus on
                  removing operational bottlenecks and translating complex, multi-million row
                  datasets into clear, revenue-driving business strategies.
                </p>
                <p>
                  {/* TODO(zain): Confirm the "corporate engagements" claim. */}
                  Through my freelance consulting and corporate engagements, I partner with
                  cross-functional teams to replace manual, error-prone reports with real-time,
                  production-grade dashboards. I focus not just on beautiful visualisations, but on
                  building modular ETL workflows and SQL pipelines that represent a single source of
                  truth for the entire company.
                </p>
                <p>
                  Whether defining KPI architectures, writing optimized database queries, or
                  coaching executive teams on how to query their own data, I treat data as a
                  leverage point. My core goal is to enable organizations to move faster, identify
                  new opportunities, and make decisions backed by verifiable evidence.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <Button asChild variant="primary">
                  <Link to="/contact">Start a Project</Link>
                </Button>
                <Button asChild variant="outline">
                  <Link to="/projects">View Case Studies</Link>
                </Button>
              </div>
            </div>
          </motion.div>

          <div className="space-y-12 md:space-y-16">
              {/* Technical Capabilities */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 border-b border-[var(--line-soft)] pb-4">
                  <div className="h-9 w-9 rounded-xl bg-[var(--purple-soft)] border border-[var(--card-border)] flex items-center justify-center shrink-0">
                    <Laptop className="h-4.5 w-4.5 text-[var(--purple)]" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-[var(--text-main)] text-lg tracking-normal">
                      Technical Capabilities
                    </h2>
                    <p className="text-[12px] text-[var(--text-soft)] mt-0.5">
                      Tools and technologies I use in production
                    </p>
                  </div>
                </div>

                {groupedSkillsList.length === 0 ? (
                  <div className="site-card p-12 text-center max-w-md mx-auto">
                    <div className="h-12 w-12 rounded-full bg-[var(--purple-soft)] border border-[var(--card-border)] flex items-center justify-center mx-auto mb-3">
                      <Database className="h-5 w-5 text-[var(--text-muted)]" />
                    </div>
                    <p className="text-sm font-normal text-[var(--text-main)] mb-1">No skills found</p>
                    <p className="text-xs text-[var(--text-soft)]">Skills will appear here once added.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {groupedSkillsList.map((group) => {
                      const Icon = group.config.icon;
                      return (
                        <div
                          key={group.title}
                          className="site-card p-5 space-y-4"
                        >
                          <div className="flex items-center gap-2.5 border-b border-[var(--line-soft)] pb-3">
                            <div
                              className={`h-8 w-8 rounded-lg border flex items-center justify-center shrink-0 ${group.config.colorClass}`}
                            >
                              <Icon className="h-4 w-4" />
                            </div>
                            <h3 className="font-semibold text-[var(--text-main)] text-xs tracking-wider uppercase">
                              {group.title}
                            </h3>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {group.skills.map((item) => (
                              <span
                                key={item.id}
                                className="px-2.5 py-1 rounded-full bg-[var(--purple-soft)] border border-[var(--card-border)] text-[11px] font-normal text-[var(--text-soft)]"
                              >
                                {item.name}
                              </span>
                            ))}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Work Experience */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 border-b border-[var(--line-soft)] pb-4">
                  <div className="h-9 w-9 rounded-xl bg-[var(--purple-soft)] border border-[var(--card-border)] flex items-center justify-center shrink-0">
                    <Briefcase className="h-4.5 w-4.5 text-[var(--purple)]" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-[var(--text-main)] text-lg tracking-normal">
                      Professional Experience
                    </h2>
                    <p className="text-[12px] text-[var(--text-soft)] mt-0.5">
                      Roles and engagements across analytics
                    </p>
                  </div>
                </div>

                {experiences.length === 0 ? (
                  <div className="site-card p-12 text-center max-w-md mx-auto">
                    <div className="h-12 w-12 rounded-full bg-[var(--purple-soft)] border border-[var(--card-border)] flex items-center justify-center mx-auto mb-3">
                      <Briefcase className="h-5 w-5 text-[var(--text-muted)]" />
                    </div>
                    <p className="text-sm font-normal text-[var(--text-main)] mb-1">
                      No experience entries
                    </p>
                    <p className="text-xs text-[var(--text-soft)]">
                      Experience records will appear here once added.
                    </p>
                  </div>
                ) : (
                  <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-px before:bg-[var(--line-soft)]">
                    {experiences.map((exp) => {
                      const isCurrent = exp.is_current;
                      const bullets = Array.isArray(exp.bullet_points) ? exp.bullet_points : [];

                      return (
                        <div key={exp.id} className="relative pl-10 group">
                          <div className="absolute left-[11px] top-1.5 h-2.5 w-2.5 rounded-full bg-[var(--purple)] border-2 border-[var(--site-bg)] shadow-md group-hover:scale-125 transition duration-200" />

                          <div className="site-card p-6 space-y-4">
                            <div className="flex flex-wrap justify-between items-start gap-2 border-b border-[var(--line-soft)] pb-3">
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="font-semibold text-[var(--text-main)] text-sm sm:text-base leading-snug">
                                    {exp.title}
                                  </h3>
                                  {isCurrent && (
                                    <span className="inline-flex items-center text-[9px] font-normal tracking-wider uppercase px-2 py-0.5 rounded-full bg-[var(--purple-soft)] text-[var(--purple)] border border-[var(--card-border)]">
                                      Current
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs font-normal text-[var(--text-main)] mt-1">
                                  {exp.company}
                                </div>
                              </div>

                              <div className="flex flex-col sm:items-end gap-1 text-[10px] font-normal text-[var(--text-soft)]">
                                <span className="inline-flex items-center gap-1 bg-[var(--site-bg-soft)] border border-[var(--card-border)] px-2.5 py-1 rounded-full">
                                  <CalendarRange className="h-3 w-3 text-[var(--text-muted)]" />
                                  <span>
                                    {exp.start_year} – {isCurrent ? "Present" : exp.end_year}
                                  </span>
                                </span>
                                {exp.location && (
                                  <span className="inline-flex items-center gap-1 mt-0.5">
                                    <MapPin className="h-3 w-3 text-[var(--text-muted)]" />
                                    <span>{exp.location}</span>
                                  </span>
                                )}
                              </div>
                            </div>

                            {exp.description && (
                              <p className="text-[var(--text-soft)] text-xs sm:text-[13px] leading-relaxed">
                                {exp.description}
                              </p>
                            )}

                            {bullets.length > 0 && (
                              <ul className="space-y-2 pl-1">
                                {bullets.map((pt, idx) => (
                                  <li
                                    key={idx}
                                    className="flex gap-2.5 items-start text-xs sm:text-[13px] text-[var(--text-soft)] leading-relaxed"
                                  >
                                    <span className="h-1.5 w-1.5 rounded-full bg-[var(--purple)] mt-2 shrink-0" />
                                    <span>{pt}</span>
                                  </li>
                                ))}
                              </ul>
                            )}
                          </div>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* Certifications */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 border-b border-[var(--line-soft)] pb-4">
                  <div className="h-9 w-9 rounded-xl bg-[var(--purple-soft)] border border-[var(--card-border)] flex items-center justify-center shrink-0">
                    <Award className="h-4.5 w-4.5 text-[var(--purple)]" />
                  </div>
                  <div>
                    <h2 className="font-semibold text-[var(--text-main)] text-lg tracking-normal">
                      Certifications & Courses
                    </h2>
                    <p className="text-[12px] text-[var(--text-soft)] mt-0.5">
                      Verified credentials and professional development
                    </p>
                  </div>
                </div>

                {certifications.length === 0 ? (
                  <div className="site-card p-12 text-center max-w-md mx-auto">
                    <div className="h-12 w-12 rounded-full bg-[var(--purple-soft)] border border-[var(--card-border)] flex items-center justify-center mx-auto mb-3">
                      <Award className="h-5 w-5 text-[var(--text-muted)]" />
                    </div>
                    <p className="text-sm font-normal text-[var(--text-main)] mb-1">
                      No certifications logged
                    </p>
                    <p className="text-xs text-[var(--text-soft)]">
                      Certifications will appear here once added.
                    </p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {certifications.map((cert) => (
                      <div
                        key={cert.id}
                        className="site-card p-5 flex justify-between items-center gap-4 group"
                      >
                        <div className="min-w-0">
                          <h3 className="font-semibold text-[var(--text-main)] text-xs leading-snug line-clamp-1">
                            {cert.title}
                          </h3>
                          <div className="text-[10px] text-[var(--text-muted)] font-normal mt-1">
                            {cert.provider || "N/A"} {cert.category ? `· ${cert.category}` : ""}
                          </div>
                        </div>

                        {cert.credential_url ? (
                          <a
                            href={cert.credential_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex p-2 rounded-xl border border-[var(--card-border)] text-[var(--purple)] hover:text-white hover:bg-[var(--purple)] hover:border-[var(--purple)] transition shrink-0 cursor-pointer"
                            title="Verify Credential"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : null}
                      </div>
                    ))}
                  </div>
                )}
              </div>
          </div>

          <div className="site-card p-10 sm:p-14 text-left">
            <h3 className="font-semibold text-[var(--text-main)] text-2xl sm:text-3xl mb-3">
              Ready to work together?
            </h3>
            <p className="text-[var(--text-soft)] text-[14px] mb-8 max-w-lg leading-relaxed">
              Let's build analytics infrastructure that drives real business outcomes. Get in touch
              to scope your project.
            </p>
            <div className="flex flex-wrap justify-start gap-4">
              <Button asChild variant="primary">
                <Link to="/contact">Start a Project</Link>
              </Button>
              <Button asChild variant="outline">
                <Link to="/projects">View My Work</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
