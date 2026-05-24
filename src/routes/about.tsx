import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { getExperience, getSkills, getCertifications } from "@/lib/api";
import { Experience, Skill, Certification } from "@/lib/api";
import { Loader2, Briefcase, Database, Award, ExternalLink, CalendarRange, MapPin } from "lucide-react";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About Zain Haidar — Data Analyst & Power BI Specialist" },
      { name: "description", content: "Master's student in Computer Science at the University of Vienna. Data analytics, dashboard automation, Python and SQL pipelines." },
    ],
  }),
  component: AboutPage,
});

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

  // Group skills by category for badges display
  const groupedSkills: Record<string, Skill[]> = {};
  skills.forEach(s => {
    if (!groupedSkills[s.category]) {
      groupedSkills[s.category] = [];
    }
    groupedSkills[s.category].push(s);
  });

  return (
    <main className="bg-[#F8FAFC] min-h-screen flex flex-col font-poppins text-slate-800">
      <Header />
      
      <section className="pt-32 md:pt-40 pb-20 flex-grow animate-fade-in">
        <div className="mx-auto max-w-[960px] px-5 sm:px-8 space-y-16">
          
          {/* Main Professional Bio Section */}
          <div className="bg-white border border-slate-200/60 shadow-xs rounded-3xl p-6 sm:p-10 space-y-6">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">About Zain Haidar</p>
              <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight">
                Data Analyst & Power BI Specialist based in Vienna.
              </h1>
            </div>
            
            <div className="text-slate-650 text-sm sm:text-[15px] leading-[1.8] space-y-4 font-medium">
              <p>
                I am a Master’s student in Computer Science at the University of Vienna with hands-on experience in data analytics, dashboard development, and web-based solutions. My work focuses on turning complex datasets into clear dashboards, reports, and insights that support better business decisions.
              </p>
              <p>
                I have experience designing Power BI dashboards, building ETL workflows with Python and SQL, performing trend analysis, creating forecasting reports, and developing analytics-focused web applications with Django and Flask.
              </p>
            </div>
          </div>

          {loading ? (
            <div className="flex flex-col items-center justify-center py-20 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="text-xs font-semibold text-slate-400">Loading dynamic CV records...</span>
            </div>
          ) : error ? (
            <div className="p-5 border border-rose-100 bg-rose-50 text-rose-600 text-xs font-semibold rounded-2xl">
              {error}
            </div>
          ) : (
            <div className="space-y-16">
              
              {/* Dynamic Work Experience */}
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                  <Briefcase className="h-5 w-5 text-blue-600 shrink-0" />
                  <h2 className="font-extrabold text-slate-900 text-lg tracking-wide uppercase">Work Experience</h2>
                </div>

                {experiences.length === 0 ? (
                  <p className="text-slate-400 text-xs italic font-semibold">No experience logs found.</p>
                ) : (
                  <div className="space-y-8 relative before:absolute before:left-3.5 before:top-2 before:bottom-2 before:w-px before:bg-slate-200">
                    {experiences.map((exp) => (
                      <div key={exp.id} className="relative pl-10 group">
                        {/* Bullet tracker */}
                        <div className="absolute left-[11px] top-1.5 h-2 w-2 rounded-full bg-blue-600 group-hover:scale-125 transition duration-200" />
                        
                        <div className="bg-white border border-slate-200/50 rounded-2xl p-5 shadow-xs hover:border-slate-300 transition duration-200 space-y-3">
                          <div className="flex flex-wrap justify-between items-start gap-2">
                            <div>
                              <h3 className="font-bold text-slate-800 text-sm sm:text-base leading-snug">{exp.title}</h3>
                              <div className="text-xs font-semibold text-slate-450 mt-0.5">{exp.company}</div>
                            </div>
                            
                            <div className="flex flex-col sm:items-end gap-1 text-[10px] font-semibold text-slate-400 font-mono">
                              <span className="inline-flex items-center gap-1 bg-slate-50 border border-slate-200 px-2 py-0.5 rounded">
                                <CalendarRange className="h-3 w-3 text-slate-350" />
                                <span>{exp.start_year} – {exp.is_current ? "Present" : exp.end_year}</span>
                              </span>
                              {exp.location && (
                                <span className="inline-flex items-center gap-1 mt-0.5">
                                  <MapPin className="h-3 w-3 text-slate-350" />
                                  <span>{exp.location}</span>
                                </span>
                              )}
                            </div>
                          </div>

                          {exp.description && (
                            <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed font-semibold">
                              {exp.description}
                            </p>
                          )}

                          {exp.bullet_points && exp.bullet_points.length > 0 && (
                            <ul className="list-disc pl-5 space-y-1.5 text-xs text-slate-650 font-semibold leading-relaxed">
                              {exp.bullet_points.map((pt, i) => (
                                <li key={i}>{pt}</li>
                              ))}
                            </ul>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Dynamic Skills Grid */}
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                  <Database className="h-5 w-5 text-blue-600 shrink-0" />
                  <h2 className="font-extrabold text-slate-900 text-lg tracking-wide uppercase">Technical Capabilities</h2>
                </div>

                {Object.keys(groupedSkills).length === 0 ? (
                  <p className="text-slate-400 text-xs italic font-semibold">No skills found.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                    {Object.entries(groupedSkills).map(([cat, list]) => (
                      <div key={cat} className="bg-white border border-slate-200/50 rounded-2xl p-5 shadow-xs space-y-4">
                        <h3 className="font-bold text-[#0F172A] text-xs tracking-wider uppercase border-b border-slate-100 pb-2">
                          {cat}
                        </h3>
                        <div className="flex flex-wrap gap-1.5">
                          {list.sort((a,b) => (a.sort_order || 0) - (b.sort_order || 0)).map((s) => (
                            <span 
                              key={s.id} 
                              className="px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200/60 text-[10px] text-slate-650 font-bold uppercase tracking-wider shadow-2xs hover:bg-blue-50 hover:text-blue-600 transition"
                            >
                              {s.name}
                            </span>
                          ))}
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>

              {/* Dynamic Certifications List */}
              <div className="space-y-6">
                <div className="flex items-center gap-2.5 border-b border-slate-100 pb-3">
                  <Award className="h-5 w-5 text-blue-600 shrink-0" />
                  <h2 className="font-extrabold text-slate-900 text-lg tracking-wide uppercase">Certifications & Courses</h2>
                </div>

                {certifications.length === 0 ? (
                  <p className="text-slate-400 text-xs italic font-semibold">No certifications logged.</p>
                ) : (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    {certifications.map((cert) => (
                      <div 
                        key={cert.id} 
                        className="bg-white border border-slate-200/50 rounded-2xl p-4.5 shadow-xs hover:border-slate-350 transition flex justify-between items-center gap-4 group"
                      >
                        <div className="min-w-0">
                          <h3 className="font-bold text-slate-800 text-xs leading-snug line-clamp-1 group-hover:text-blue-600 transition-colors">
                            {cert.title}
                          </h3>
                          <div className="text-[10px] text-slate-400 font-semibold mt-1">
                            {cert.provider || "N/A"} {cert.category ? `· ${cert.category}` : ""}
                          </div>
                        </div>

                        {cert.credential_url ? (
                          <a
                            href={cert.credential_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex p-2 rounded-xl border border-slate-200 text-slate-400 hover:text-blue-600 hover:bg-slate-50 transition shrink-0 cursor-pointer"
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

        </div>
      </section>

      <Footer />
    </main>
  );
}
