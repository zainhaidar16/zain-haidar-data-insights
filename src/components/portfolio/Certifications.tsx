import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { AlertCircle, Inbox, Award, ArrowUpRight } from "lucide-react";
import { getCertifications, Certification } from "@/lib/api";

const EASE = [0.25, 0.1, 0.25, 1] as const;

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
    <section id="certifications" className="py-24 bg-[#FAFAFA] border-t border-[#E4E4E7]">
      <div className="section-container">

        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#F97316] mb-3">
            Credentials
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#09090B] leading-tight mb-4">
            Certifications &amp; Courses
          </h2>
          <p className="text-[15px] text-[#71717A] leading-relaxed max-w-2xl">
            A selection of certifications and courses that support my skills in data analysis, business intelligence, machine learning, data engineering, and modern analytics tools.
          </p>
        </motion.div>

        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card-pro p-5 flex flex-col gap-3 animate-pulse">
                <div className="h-5 bg-[#F4F4F5] rounded w-1/2" />
                <div className="h-5 bg-[#E4E4E7] rounded w-3/4 mt-1" />
                <div className="h-4 bg-[#F4F4F5] rounded w-1/3 mt-2" />
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="p-6 bg-red-50 border border-red-200 rounded-xl flex items-start gap-3.5 max-w-2xl mx-auto">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-red-800 text-sm">Failed to Load Certifications</h4>
              <p className="text-xs text-red-600 mt-1 leading-normal">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && certifications.length === 0 && (
          <div className="py-16 text-center max-w-md mx-auto">
            <div className="h-12 w-12 rounded-full bg-[#F4F4F5] border border-[#E4E4E7] flex items-center justify-center mx-auto mb-4">
              <Award className="h-5 w-5 text-[#71717A]" />
            </div>
            <h4 className="font-bold text-[#09090B] text-sm mb-1">No Certifications Found</h4>
            <p className="text-xs text-[#71717A] leading-normal">No certifications found.</p>
          </div>
        )}

        {!loading && !error && certifications.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {certifications.map((cert, i) => (
              <motion.div
                key={cert.id}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
                className="card-pro p-5 flex flex-col gap-3"
              >
                {/* Category badge */}
                <div className="flex items-center justify-between gap-2">
                  <span className="text-[10px] font-semibold px-2 py-0.5 rounded border bg-[#FFF7ED] text-[#C2410C] border-[#FDBA74] leading-snug">
                    {cert.category}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-[#09090B] text-[14px] leading-snug flex-1">
                  {cert.title}
                </h3>

                {/* Provider */}
                <div className="flex items-center gap-1.5">
                  <span className="h-1.5 w-1.5 rounded-full shrink-0 bg-[#F97316]" />
                  <span className="text-[11px] font-semibold text-[#F97316]">
                    {cert.provider}
                  </span>
                </div>

                {/* Credential link */}
                {cert.credential_url && (
                  <div className="pt-2 border-t border-[#E4E4E7] mt-2">
                    <a
                      href={cert.credential_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-1 text-[11px] font-bold text-[#F97316] hover:text-[#EA580C] transition-colors"
                    >
                      Verify Credential
                      <ArrowUpRight className="h-3 w-3 shrink-0" />
                    </a>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
