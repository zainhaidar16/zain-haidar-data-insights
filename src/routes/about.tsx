import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { getExperience, getCertifications, getSkills } from "@/lib/api";
import { Experience, Certification, Skill } from "@/lib/api";
import { Loader2, Briefcase, Database, Award, ExternalLink, CalendarRange, MapPin, Target, ShieldCheck, Zap, HeartHandshake, CheckCircle2, Laptop } from "lucide-react";
import { BarChart3, Code2, Cpu, Users } from "lucide-react";
import { motion } from "framer-motion";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Zain Haidar — Data Analyst & BI Specialist" },
      { name: "description", content: "Learn about Zain Haidar's professional journey, core mission, and data analytics expertise. Experienced in Power BI, SQL pipelines, and custom BI solutions." },
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
    desc: "Working hand-in-hand with business users, product managers, and engineering teams to ensure our data tools are actively adopted and trusted.",
  }
];

const categoryConfigs: Record<string, { colorClass: string; icon: any }> = {
  "Business Intelligence": { colorClass: "text-[#F97316] bg-[#F97316]/10 border-[#F97316]/30", icon: BarChart3 },
  "Data Analysis & Modelling": { colorClass: "text-[#FAFAFA] bg-[#09090B] border-[#232329]", icon: Code2 },
  "Data Analysis": { colorClass: "text-[#FAFAFA] bg-[#09090B] border-[#232329]", icon: Code2 },
  "Data Engineering & ETL": { colorClass: "text-[#F97316] bg-[#F97316]/10 border-[#F97316]/30", icon: Cpu },
  "Data Engineering": { colorClass: "text-[#F97316] bg-[#F97316]/10 border-[#F97316]/30", icon: Cpu },
  "Cloud & Tools": { colorClass: "text-[#FAFAFA] bg-[#09090B] border-[#232329]", icon: Database },
  "Soft Skills": { colorClass: "text-[#FAFAFA] bg-[#09090B] border-[#232329]", icon: Users }
};

function AboutPage() {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [skills, setSkills] = useState<Skill[]>([]);
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    async function loadData() {
      try {
        setLoading(true);
        const [expData, skillsData, certsData] = await Promise.all([
          getExperience(),
          getSkills(),
          getCertifications()
        ]);
        setExperiences(expData);
        setSkills(skillsData);
        setCertifications(certsData);
      } catch (err: any) {
        console.error("About page load failed:", err);
        setError("Failed to load professional credentials. Please try again.");
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const getGroupedSkills = () => {
    const grouped: Record<string, Skill[]> = {};
    skills.forEach(s => {
      const cat = s.category || "General";
      if (!grouped[cat]) grouped[cat] = [];
      grouped[cat].push(s);
    });

    return Object.entries(grouped).map(([title, list]) => {
      const config = categoryConfigs[title] || { colorClass: "text-[#FAFAFA] bg-[#09090B] border-[#232329]", icon: Laptop };
      return {
        title,
        config,
        skills: list.sort((a, b) => (a.sort_order || 0) - (b.sort_order || 0))
      };
    });
  };

  const groupedSkillsList = getGroupedSkills();

  return (
    <main className="bg-[#0E0E11] min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-20 bg-[#09090B] relative overflow-hidden hero-arc">
        <div className="absolute -top-24 -right-16 w-[420px] h-[420px] rounded-full bg-[#F97316]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[280px] h-[280px] rounded-full bg-[#09090B]/6 blur-3xl pointer-events-none" />
        <div className="section-container">
          <div className="max-w-3xl">
            <p className="text-[12px] font-semibold uppercase tracking-widest text-[#A1A1AA] mb-3">About</p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#FAFAFA] tracking-tight leading-[1.1] mb-6">
              Bridging the gap between engineering pipelines and{" "}
              <span className="relative inline-block">
                business strategies.
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#F97316]/20 -z-10 rounded-sm" />
              </span>
            </h1>
            <p className="text-[#A1A1AA] text-[15px] leading-relaxed max-w-2xl">
              Data analyst and BI specialist with 5+ years building analytics infrastructure that removes operational drag and drives clearer business decisions.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 flex-grow">
        <div className="section-container space-y-20">

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
                <div className="absolute -inset-1 rounded-3xl bg-[#F97316]/10 -z-10" />
                <div className="relative aspect-[3/4] w-full rounded-3xl overflow-hidden border border-[#232329] bg-[#09090B]">
                  <img
                    src="/zain.jpg"
                    alt="Zain Haidar - Data Analyst & BI Specialist"
                    className="object-cover w-full h-full transform group-hover:scale-[1.03] transition duration-300"
                  />
                </div>
              </div>
              <div className="mt-5 text-center">
                <h4 className="font-bold text-[#FAFAFA] text-sm">Zain Haidar</h4>
                <p className="text-[11px] font-semibold text-[#A1A1AA] uppercase tracking-widest mt-1">Data Analyst & BI Specialist</p>
                <div className="flex items-center gap-1.5 mt-2 justify-center">
                  <MapPin className="h-3.5 w-3.5 text-[#F97316]" />
                  <span className="text-[12px] font-medium text-[#A1A1AA]">Vienna, Austria</span>
                </div>
                <div className="mt-4 inline-flex items-center gap-2 bg-[#F97316]/10 border border-[#F97316]/30 rounded-full px-3 py-1.5">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#F97316] animate-pulse" />
                  <span className="text-[10px] font-semibold text-[#FDBA74]">Available for projects</span>
                </div>
              </div>
            </div>

            {/* Narrative */}
            <div className="md:col-span-3 space-y-6">
              <div className="text-[#A1A1AA] text-[15px] leading-[1.8] space-y-4">
                <p>
                  Over the past few years, I have worked as a dedicated data professional, designing Business Intelligence systems and automating analytical infrastructure. I focus on removing operational bottlenecks and translating complex, multi-million row datasets into clear, revenue-driving business strategies.
                </p>
                <p>
                  Through my freelance consulting and corporate engagements, I partner with cross-functional teams to replace manual, error-prone reports with real-time, production-grade dashboards. I focus not just on beautiful visualisations, but on building modular ETL workflows and SQL pipelines that represent a single source of truth for the entire company.
                </p>
                <p>
                  Whether defining KPI architectures, writing optimized database queries, or coaching executive teams on how to query their own data, I treat data as a leverage point. My core goal is to enable organizations to move faster, identify new opportunities, and make decisions backed by verifiable evidence.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 pt-2">
                <Link to="/contact" className="btn-dark text-sm">Start a Project</Link>
                <Link to="/projects" className="btn-outline text-sm">View Case Studies</Link>
              </div>
            </div>
          </motion.div>

          {/* Mission & Values */}
          <div className="space-y-8">
            <div className="text-center max-w-xl mx-auto space-y-2">
              <p className="text-[12px] font-semibold uppercase tracking-widest text-[#A1A1AA]">Core Principles</p>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FAFAFA] tracking-tight">Mission & Values</h2>
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
                    className="card-payoneer p-6 space-y-4 group hover:border-[#F97316]/30"
                  >
                    <div className="h-11 w-11 rounded-xl bg-[#F97316]/10 border border-[#F97316]/30 flex items-center justify-center shrink-0 group-hover:bg-[#F97316] transition-colors duration-300">
                      <Icon className="h-5 w-5 text-[#F97316] group-hover:text-white transition-colors duration-300" />
                    </div>
                    <div>
                      <h3 className="font-bold text-[#FAFAFA] text-sm tracking-tight mb-2">
                        {v.title}
                      </h3>
                      <p className="text-[#A1A1AA] text-[13px] leading-relaxed">
                        {v.desc}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-[#FAFAFA]" />
              <span className="text-xs font-medium text-[#A1A1AA]">Loading professional records...</span>
            </div>
          ) : error ? (
            <div className="p-5 border border-red-100 bg-red-50 text-red-600 text-xs font-medium rounded-2xl">
              {error}
            </div>
          ) : (
            <div className="space-y-20">

              {/* Technical Capabilities */}
              <div className="space-y-8">
                <div className="flex items-center gap-3 border-b border-[#232329] pb-4">
                  <div className="h-9 w-9 rounded-xl bg-[#F97316]/10 border border-[#F97316]/30 flex items-center justify-center shrink-0">
                    <Laptop className="h-4.5 w-4.5 text-[#F97316]" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-[#FAFAFA] text-lg tracking-tight">Technical Capabilities</h2>
                    <p className="text-[12px] text-[#A1A1AA] mt-0.5">Tools and technologies I use in production</p>
                  </div>
                </div>

                {groupedSkillsList.length === 0 ? (
                  <div className="border border-[#232329] rounded-3xl p-12 text-center bg-[#0E0E11] max-w-md mx-auto">
                    <div className="h-12 w-12 rounded-full bg-[#09090B] border border-[#232329] flex items-center justify-center mx-auto mb-3">
                      <Database className="h-5 w-5 text-[#A1A1AA]" />
                    </div>
                    <p className="text-sm font-semibold text-[#FAFAFA] mb-1">No skills found</p>
                    <p className="text-xs text-[#A1A1AA]">Skills will appear here once added.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {groupedSkillsList.map((group) => {
                      const Icon = group.config.icon;
                      return (
                        <div
                          key={group.title}
                          className="card-payoneer p-5 space-y-4 hover:border-[#F97316]/30"
                        >
                          <div className="flex items-center gap-2.5 border-b border-[#232329] pb-3">
                            <div className={`h-8 w-8 rounded-lg border flex items-center justify-center shrink-0 ${group.config.colorClass}`}>
                              <Icon className="h-4 w-4" />
                            </div>
                            <h3 className="font-bold text-[#FAFAFA] text-xs tracking-wider uppercase">
                              {group.title}
                            </h3>
                          </div>

                          <div className="flex flex-wrap gap-2">
                            {group.skills.map((item) => (
                              <span
                                key={item.id}
                                className="px-2.5 py-1 rounded-full bg-[#16161A] border border-[#232329] text-[11px] font-medium text-[#FAFAFA]"
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
                <div className="flex items-center gap-3 border-b border-[#232329] pb-4">
                  <div className="h-9 w-9 rounded-xl bg-[#F97316]/10 border border-[#F97316]/30 flex items-center justify-center shrink-0">
                    <Briefcase className="h-4.5 w-4.5 text-[#F97316]" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-[#FAFAFA] text-lg tracking-tight">Professional Experience</h2>
                    <p className="text-[12px] text-[#A1A1AA] mt-0.5">Roles and engagements across analytics</p>
                  </div>
                </div>

                {experiences.length === 0 ? (
                  <div className="border border-[#232329] rounded-3xl p-12 text-center bg-[#0E0E11] max-w-md mx-auto">
                    <div className="h-12 w-12 rounded-full bg-[#09090B] border border-[#232329] flex items-center justify-center mx-auto mb-3">
                      <Briefcase className="h-5 w-5 text-[#A1A1AA]" />
                    </div>
                    <p className="text-sm font-semibold text-[#FAFAFA] mb-1">No experience entries</p>
                    <p className="text-xs text-[#A1A1AA]">Experience records will appear here once added.</p>
                  </div>
                ) : (
                  <div className="space-y-6 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-px before:bg-[#27272A]">
                    {experiences.map((exp) => {
                      const isCurrent = exp.is_current;
                      const bullets = Array.isArray(exp.bullet_points) ? exp.bullet_points : [];

                      return (
                        <div key={exp.id} className="relative pl-10 group">
                          <div className="absolute left-[11px] top-1.5 h-2.5 w-2.5 rounded-full bg-[#F97316] border-2 border-white shadow-sm group-hover:scale-125 transition duration-200" />

                          <div className="card-payoneer p-6 space-y-4 hover:border-[#F97316]/30">
                            <div className="flex flex-wrap justify-between items-start gap-2 border-b border-[#232329] pb-3">
                              <div>
                                <div className="flex items-center gap-2 flex-wrap">
                                  <h3 className="font-bold text-[#FAFAFA] text-sm sm:text-base leading-snug">{exp.title}</h3>
                                  {isCurrent && (
                                    <span className="inline-flex items-center text-[9px] font-bold tracking-wider uppercase px-2 py-0.5 rounded-full bg-[#F97316]/10 text-[#FDBA74] border border-[#F97316]/30">
                                      Current
                                    </span>
                                  )}
                                </div>
                                <div className="text-xs font-semibold text-[#F97316] mt-1">{exp.company}</div>
                              </div>

                              <div className="flex flex-col sm:items-end gap-1 text-[10px] font-medium text-[#A1A1AA]">
                                <span className="inline-flex items-center gap-1 bg-[#09090B] border border-[#232329] px-2.5 py-1 rounded-full">
                                  <CalendarRange className="h-3 w-3 text-[#A1A1AA]" />
                                  <span>{exp.start_year} – {isCurrent ? "Present" : exp.end_year}</span>
                                </span>
                                {exp.location && (
                                  <span className="inline-flex items-center gap-1 mt-0.5">
                                    <MapPin className="h-3 w-3 text-[#A1A1AA]" />
                                    <span>{exp.location}</span>
                                  </span>
                                )}
                              </div>
                            </div>

                            {exp.description && (
                              <p className="text-[#A1A1AA] text-xs sm:text-[13px] leading-relaxed">
                                {exp.description}
                              </p>
                            )}

                            {bullets.length > 0 && (
                              <ul className="space-y-2 pl-1">
                                {bullets.map((pt, idx) => (
                                  <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-[13px] text-[#A1A1AA] leading-relaxed">
                                    <span className="h-1.5 w-1.5 rounded-full bg-[#F97316] mt-2 shrink-0" />
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
                <div className="flex items-center gap-3 border-b border-[#232329] pb-4">
                  <div className="h-9 w-9 rounded-xl bg-[#F97316]/10 border border-[#F97316]/30 flex items-center justify-center shrink-0">
                    <Award className="h-4.5 w-4.5 text-[#F97316]" />
                  </div>
                  <div>
                    <h2 className="font-extrabold text-[#FAFAFA] text-lg tracking-tight">Certifications & Courses</h2>
                    <p className="text-[12px] text-[#A1A1AA] mt-0.5">Verified credentials and professional development</p>
                  </div>
                </div>

                {certifications.length === 0 ? (
                  <div className="border border-[#232329] rounded-3xl p-12 text-center bg-[#0E0E11] max-w-md mx-auto">
                    <div className="h-12 w-12 rounded-full bg-[#09090B] border border-[#232329] flex items-center justify-center mx-auto mb-3">
                      <Award className="h-5 w-5 text-[#A1A1AA]" />
                    </div>
                    <p className="text-sm font-semibold text-[#FAFAFA] mb-1">No certifications logged</p>
                    <p className="text-xs text-[#A1A1AA]">Certifications will appear here once added.</p>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {certifications.map((cert) => (
                      <div
                        key={cert.id}
                        className="card-payoneer p-5 flex justify-between items-center gap-4 group hover:border-[#F97316]/30"
                      >
                        <div className="min-w-0">
                          <h3 className="font-bold text-[#FAFAFA] text-xs leading-snug line-clamp-1">
                            {cert.title}
                          </h3>
                          <div className="text-[10px] text-[#A1A1AA] font-medium mt-1">
                            {cert.provider || "N/A"} {cert.category ? `· ${cert.category}` : ""}
                          </div>
                        </div>

                        {cert.credential_url ? (
                          <a
                            href={cert.credential_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex p-2 rounded-xl border border-[#232329] text-[#A1A1AA] hover:text-[#F97316] hover:border-[#F97316]/40 hover:bg-[#F97316]/10 transition shrink-0 cursor-pointer"
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
          )}

          {/* Bottom CTA */}
          <div className="bg-[#131316] rounded-3xl p-10 sm:p-14 text-center">
            <h3 className="font-extrabold text-white text-2xl sm:text-3xl mb-3">Ready to work together?</h3>
            <p className="text-[#A1A1AA] text-[14px] mb-8 max-w-lg mx-auto leading-relaxed">
              Let's build analytics infrastructure that drives real business outcomes. Get in touch to scope your project.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link to="/contact" className="btn-dark">Start a Project</Link>
              <Link to="/projects" className="btn-outline-white">View My Work</Link>
            </div>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
