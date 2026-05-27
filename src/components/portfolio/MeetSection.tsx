import { motion } from "framer-motion";
import { BarChart3, Database, Zap } from "lucide-react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function MeetSection() {
  return (
    <section className="py-24 bg-[#F6F4EF]">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left — Text Content */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <p className="text-[12px] font-semibold uppercase tracking-widest text-[#9CA3AF] mb-3">
              Who I Am
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#111111] leading-tight mb-6">
              Meet Zain The Analyst
            </h2>
            <p className="text-[16px] text-[#4B5563] leading-relaxed mb-8">
              I combine data analysis, BI dashboard development, and software engineering
              experience to build practical analytics solutions that help businesses understand
              performance, reduce manual reporting, and make better decisions.
            </p>

            {/* Highlight points */}
            <div className="space-y-4">
              {[
                { icon: BarChart3, text: "Production-grade Power BI dashboards" },
                { icon: Database, text: "Automated ETL and SQL pipelines" },
                { icon: Zap, text: "Actionable insights that drive revenue" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-[#D7FF3F]/30 flex items-center justify-center shrink-0">
                      <Icon className="h-4.5 w-4.5 text-[#111111]" />
                    </div>
                    <span className="text-[14px] font-medium text-[#111111]">{item.text}</span>
                  </div>
                );
              })}
            </div>
          </motion.div>

          {/* Right — Visual Card */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
            className="relative"
          >
            <div className="bg-white rounded-3xl border border-[#E5E7EB] overflow-hidden shadow-md">
              {/* Card header */}
              <div className="bg-[#111111] px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-[#D7FF3F] flex items-center justify-center font-bold text-[#111111] text-sm select-none">
                    ZA
                  </div>
                  <div>
                    <div className="font-bold text-white text-[15px]">Zain Haidar</div>
                    <div className="text-[12px] text-gray-400 font-medium">Data Analyst & BI Specialist</div>
                  </div>
                </div>
              </div>

              {/* Info rows */}
              <div className="divide-y divide-[#E5E7EB]">
                {[
                  { label: "Location", value: "Vienna, Austria" },
                  { label: "Focus", value: "Data Analytics, BI, ETL" },
                  { label: "Tools", value: "Power BI, SQL, Python, Tableau" },
                  { label: "Education", value: "MS Computer Science" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between px-6 py-4">
                    <span className="text-[12px] font-medium text-[#9CA3AF] uppercase tracking-wide">
                      {item.label}
                    </span>
                    <span className="text-[13px] font-semibold text-[#111111]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Availability */}
              <div className="px-6 py-4 bg-[#F2FBD9] border-t border-[#D7FF3F]/30 flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-[#22C55E] animate-pulse shrink-0" />
                <span className="text-[12px] font-semibold text-[#111111]">
                  Available for freelance projects & full-time roles
                </span>
              </div>
            </div>

            {/* Floating accent */}
            <div className="absolute -top-4 -right-4 h-14 w-14 rounded-2xl bg-[#D7FF3F] -z-10 rotate-6" />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
