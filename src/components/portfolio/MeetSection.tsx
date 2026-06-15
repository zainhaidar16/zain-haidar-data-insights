import { motion } from "framer-motion";
import { BarChart3, Database, Zap } from "lucide-react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function MeetSection() {
  return (
    <section className="py-24 md:py-28 bg-[#0F1012] overflow-hidden border-b border-[rgba(245,245,243,0.10)]">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <p className="text-[11px] font-normal uppercase tracking-widest text-[#AAA9A3] mb-3">
              Who I Am
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#F5F5F3] leading-tight mb-6">
              Meet Zain The Analyst
            </h2>
            <p className="text-[16px] text-[#D7D7D2] leading-relaxed mb-8 font-normal">
              I combine data analysis, BI dashboard development, and software engineering experience
              to build practical analytics solutions that help businesses understand performance,
              reduce manual reporting, and make better decisions.
            </p>

            <div className="space-y-4">
              {[
                { icon: BarChart3, text: "Production-grade Power BI dashboards" },
                { icon: Database, text: "Automated ETL and SQL pipelines" },
                { icon: Zap, text: "Actionable insights that drive revenue" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-[#1D1E22] border border-[rgba(245,245,243,0.10)] flex items-center justify-center shrink-0">
                      <Icon className="h-4.5 w-4.5 text-[#D8D8D2]" />
                    </div>
                    <span className="text-[14px] font-normal text-[#F5F5F3]">{item.text}</span>
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
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-[28px] bg-[rgba(255,255,255,0.02)] blur-[2px] pointer-events-none" />

            <div className="bg-[#1D1E22] rounded-[28px] border border-[rgba(245,245,243,0.12)] overflow-hidden shadow-xl relative">
              {/* Card header */}
              <div className="bg-[#151619] border-b border-[rgba(245,245,243,0.12)] px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-gradient-to-b from-[#F5F5F3] to-[#C8C8C1] flex items-center justify-center font-normal text-[#101113] text-sm select-none">
                    ZA
                  </div>
                  <div>
                    <div className="font-normal text-[#F5F5F3] text-[15px]">Zain Haidar</div>
                    <div className="text-[12px] text-[#AAA9A3] font-normal">
                      Data Analyst & BI Specialist
                    </div>
                  </div>
                </div>
              </div>

              {/* Portrait */}
              <div className="px-6 pt-6">
                <div className="relative w-full rounded-2xl overflow-hidden border border-[rgba(245,245,243,0.10)] bg-[#151619]">
                  <img
                    src="/zain.jpg"
                    alt="Zain Haidar portrait"
                    className="w-full h-[220px] object-cover filter brightness-[0.9]"
                  />
                </div>
              </div>

              {/* Info rows */}
              <div className="divide-y divide-[rgba(245,245,243,0.10)] mt-6">
                {[
                  { label: "Location", value: "Vienna, Austria" },
                  { label: "Focus", value: "Data Analytics, BI, ETL" },
                  { label: "Tools", value: "Power BI, SQL, Python, Tableau" },
                  { label: "Education", value: "MS Computer Science" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between px-6 py-4">
                    <span className="text-[11px] font-normal text-[#A5A5A0] uppercase tracking-wide">
                      {item.label}
                    </span>
                    <span className="text-[13px] font-normal text-[#F5F5F3]">{item.value}</span>
                  </div>
                ))}
              </div>

              {/* Availability */}
              <div className="px-6 py-4 bg-[rgba(255,255,255,0.04)] border-t border-[rgba(245,245,243,0.12)] flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-[#D8D8D2] animate-pulse shrink-0" />
                <span className="text-[12px] font-normal text-[#D8D8D2]">
                  Available for freelance projects & full-time roles
                </span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
