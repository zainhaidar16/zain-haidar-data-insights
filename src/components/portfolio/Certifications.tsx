import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Inbox, Award, ArrowUpRight } from "lucide-react";
import { getCertifications, Certification } from "@/lib/api";

const EASE = [0.25, 0.1, 0.25, 1] as const;

type ColorKey = "blue" | "violet" | "indigo" | "slate" | "emerald";

const colorMap: Record<ColorKey, { badge: string; dot: string; issuer: string }> = {
  blue:    { badge: "bg-blue-50 text-blue-700 border-blue-200",     dot: "bg-blue-500",    issuer: "text-blue-600" },
  violet:  { badge: "bg-violet-50 text-violet-700 border-violet-200", dot: "bg-violet-500", issuer: "text-violet-600" },
  indigo:  { badge: "bg-indigo-50 text-indigo-700 border-indigo-200", dot: "bg-indigo-500", issuer: "text-indigo-600" },
  slate:   { badge: "bg-slate-100 text-slate-700 border-slate-200",  dot: "bg-slate-500",   issuer: "text-slate-500" },
  emerald: { badge: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500", issuer: "text-emerald-600" },
};

const getCategoryColor = (category: string): ColorKey => {
  const norm = category.toLowerCase();
  if (norm.includes("engineering")) return "violet";
  if (norm.includes("analysis") || norm.includes("viz")) return "blue";
  if (norm.includes("developer") || norm.includes("tool") || norm.includes("git")) return "slate";
  if (norm.includes("learning") || norm.includes("machine") || norm.includes("vector")) return "indigo";
  if (norm.includes("academic") || norm.includes("vienna")) return "emerald";
  return "blue"; // default fallback
};

export function Certifications() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadCertifications() {
      try {
        setLoading(true);
        const data = await getCertifications();
        setCertifications(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load certifications");
      } finally {
        setLoading(false);
      }
    }
    loadCertifications();
  }, []);

  return (
    <section id="certifications" className="py-24 bg-[#F8FAFC] border-t border-slate-100">
      <div className="section-container">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
            Credentials
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight mb-4">
            Certifications &amp; Courses
          </h2>
          <p className="text-[15px] text-slate-500 leading-relaxed max-w-2xl">
            A selection of certifications and courses that support my skills in data analysis, business intelligence, machine learning, data engineering, and modern analytics tools.
          </p>
        </motion.div>

        {/* LOADING STATE */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card-pro p-5 flex flex-col gap-3 animate-pulse">
                <div className="h-5 bg-slate-100 rounded w-1/2" />
                <div className="h-5 bg-slate-200 rounded w-3/4 mt-1" />
                <div className="h-4 bg-slate-100 rounded w-1/3 mt-2" />
                <div className="h-3.5 bg-slate-50 rounded w-full mt-3" />
              </div>
            ))}
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="p-6 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3.5 max-w-2xl mx-auto">
            <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-rose-800 text-sm">Failed to Load Certifications</h4>
              <p className="text-xs text-rose-600 mt-1 leading-normal">{error}</p>
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && certifications.length === 0 && (
          <div className="py-16 text-center max-w-md mx-auto">
            <div className="h-12 w-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-4">
              <Award className="h-5 w-5 text-slate-400" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">No Certifications Found</h4>
            <p className="text-xs text-slate-500 leading-normal">
              No certifications found.
            </p>
          </div>
        )}

        {/* CARDS GRID */}
        {!loading && !error && certifications.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {certifications.map((cert, i) => {
              const colorKey = getCategoryColor(cert.category);
              const color = colorMap[colorKey] || colorMap.blue;

              return (
                <motion.div
                  key={cert.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
                  className="card-pro p-5 flex flex-col gap-3 hover:border-blue-400/40 transition-all duration-300"
                >
                  {/* Top row: category badge */}
                  <div className="flex items-center justify-between gap-2">
                    <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${color.badge} leading-snug`}>
                      {cert.category}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-semibold text-[#0F172A] text-[14px] leading-snug flex-1">
                    {cert.title}
                  </h3>

                  {/* Provider with colored dot */}
                  <div className="flex items-center gap-1.5">
                    <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${color.dot}`} />
                    <span className={`text-[11px] font-semibold ${color.issuer}`}>
                      {cert.provider}
                    </span>
                  </div>

                  {/* Credential URL Verification Button */}
                  {cert.credential_url && (
                    <div className="pt-2 border-t border-slate-100 mt-2">
                      <a
                        href={cert.credential_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-750 transition-colors"
                      >
                        Verify Credential
                        <ArrowUpRight className="h-3 w-3 shrink-0" />
                      </a>
                    </div>
                  )}
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
