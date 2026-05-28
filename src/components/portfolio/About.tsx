import { motion } from "framer-motion";
import { MapPin, GraduationCap, Target, Wrench } from "lucide-react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const summaryItems = [
  { icon: MapPin,        label: "Location",  value: "Vienna, Austria" },
  { icon: GraduationCap, label: "Education", value: "MS Computer Science, University of Vienna" },
  { icon: Target,        label: "Focus",     value: "Data Analytics, BI, ETL, Dashboards" },
  { icon: Wrench,        label: "Tools",     value: "Power BI, SQL, Python, Tableau" },
];

export function About() {
  return (
    <section id="about" className="py-24 bg-white">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-14 xl:gap-20 items-start">

          {/* Left — Bio */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-[#71717A] mb-3">
              About Me
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#09090B] leading-tight mb-6">
              Turning complex data into{" "}
              <span className="text-[#F97316]">clear decisions</span>
            </h2>

            <div className="space-y-4 text-[15px] text-[#71717A] leading-[1.8]">
              <p>
                I am a <span className="font-semibold text-[#09090B]">Data Analyst &amp; BI Specialist</span> with a strong track record in corporate analytics and freelance consulting. My work focuses on translating complex, scattered datasets into highly integrated business solutions that drive operational growth.
              </p>
              <p>
                I specialize in engineering automated <span className="font-semibold text-[#09090B]">Power BI systems</span>, building efficient database pipelines in SQL and Python, and helping cross-functional business units make self-service data inquiries without engineering friction.
              </p>
            </div>

            <div className="mt-8">
              <p className="text-xs font-semibold text-[#71717A] uppercase tracking-widest mb-3">
                Industries & Domains
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  "Business Intelligence",
                  "Data Analysis",
                  "ETL & Data Engineering",
                  "Forecasting",
                  "Customer Analytics",
                  "Web Analytics",
                ].map((tag) => (
                  <span key={tag} className="badge-lime text-[11px]">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>

          {/* Right — Summary Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          >
            <div className="bg-[#FAFAFA] border border-[#E4E4E7] rounded-2xl overflow-hidden shadow-sm">

              {/* Card header */}
              <div className="bg-[#09090B] px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="h-10 w-10 rounded-xl bg-[#F97316] flex items-center justify-center font-bold text-white text-sm select-none">
                    ZA
                  </div>
                  <div>
                    <div className="font-bold text-white text-[15px]">Zain Haidar</div>
                    <div className="text-[12px] text-[#A1A1AA] font-medium">Data Analyst &amp; BI Specialist</div>
                  </div>
                </div>
              </div>

              {/* Summary rows */}
              <div className="divide-y divide-[#E4E4E7]">
                {summaryItems.map(({ icon: Icon, label, value }) => (
                  <div key={label} className="flex items-start gap-4 px-6 py-4">
                    <div className="h-8 w-8 rounded-lg bg-[#FFF7ED] border border-[#FDBA74]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Icon className="h-4 w-4 text-[#F97316]" />
                    </div>
                    <div>
                      <div className="text-[11px] font-semibold text-[#71717A] uppercase tracking-wide mb-0.5">
                        {label}
                      </div>
                      <div className="text-[13px] font-semibold text-[#09090B] leading-snug">
                        {value}
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              {/* Availability footer */}
              <div className="px-6 py-4 bg-[#FFF7ED] border-t border-[#FDBA74]/30 flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-[#F97316] animate-pulse shrink-0" />
                <span className="text-[12px] font-semibold text-[#09090B]">
                  Available for freelance projects &amp; full-time roles
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
