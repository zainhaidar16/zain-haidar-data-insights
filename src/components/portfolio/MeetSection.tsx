import { motion } from "framer-motion";
import { BarChart3, Database, Zap } from "lucide-react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function MeetSection() {
  return (
    <section className="py-24 md:py-28 bg-[#09090B]">
      <div className="section-container">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, margin: "-80px" }}
            transition={{ duration: 0.55, ease: EASE }}
          >
            <p className="text-[12px] font-semibold uppercase tracking-widest text-[#A1A1AA] mb-3">
              Who I Am
            </p>
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#FAFAFA] leading-tight mb-6">
              Meet Zain The Analyst
            </h2>
            <p className="text-[16px] text-[#A1A1AA] leading-relaxed mb-8">
              I combine data analysis, BI dashboard development, and software engineering
              experience to build practical analytics solutions that help businesses understand
              performance, reduce manual reporting, and make better decisions.
            </p>

            <div className="space-y-4">
              {[
                { icon: BarChart3, text: "Production-grade Power BI dashboards" },
                { icon: Database,  text: "Automated ETL and SQL pipelines" },
                { icon: Zap,       text: "Actionable insights that drive revenue" },
              ].map((item, i) => {
                const Icon = item.icon;
                return (
                  <div key={i} className="flex items-center gap-3">
                    <div className="h-9 w-9 rounded-xl bg-[#F97316]/10 border border-[#F97316]/25 flex items-center justify-center shrink-0">
                      <Icon className="h-4.5 w-4.5 text-[#F97316]" />
                    </div>
                    <span className="text-[14px] font-medium text-[#FAFAFA]">{item.text}</span>
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
            <div className="absolute -top-6 -right-6 h-24 w-24 rounded-[28px] bg-[#F97316]/70 blur-[2px]" />
            <div className="absolute -bottom-6 -left-6 h-20 w-20 rounded-full bg-[#09090B]/6" />

            <div className="bg-[#0E0E11] rounded-[28px] border border-[#232329] overflow-hidden shadow-md relative">
              {/* Card header */}
              <div className="bg-[#131316] px-6 py-5">
                <div className="flex items-center gap-3">
                  <div className="h-11 w-11 rounded-xl bg-[#F97316] flex items-center justify-center font-bold text-white text-sm select-none">
                    ZA
                  </div>
                  <div>
                    <div className="font-bold text-white text-[15px]">Zain Haidar</div>
                    <div className="text-[12px] text-[#A1A1AA] font-medium">Data Analyst & BI Specialist</div>
                  </div>
                </div>
              </div>

              {/* Portrait */}
              <div className="px-6 pt-6">
                <div className="relative w-full rounded-3xl overflow-hidden border border-[#232329] bg-[#09090B]">
                  <img
                    src="/zain.jpg"
                    alt="Zain Haidar portrait"
                    className="w-full h-[220px] object-cover"
                  />
                </div>
              </div>

              {/* Info rows */}
              <div className="divide-y divide-[#232329]">
                {[
                  { label: "Location",  value: "Vienna, Austria" },
                  { label: "Focus",     value: "Data Analytics, BI, ETL" },
                  { label: "Tools",     value: "Power BI, SQL, Python, Tableau" },
                  { label: "Education", value: "MS Computer Science" },
                ].map((item) => (
                  <div key={item.label} className="flex items-center justify-between px-6 py-4">
                    <span className="text-[12px] font-medium text-[#A1A1AA] uppercase tracking-wide">
                      {item.label}
                    </span>
                    <span className="text-[13px] font-semibold text-[#FAFAFA]">
                      {item.value}
                    </span>
                  </div>
                ))}
              </div>

              {/* Availability */}
              <div className="px-6 py-4 bg-[#F97316]/10 border-t border-[#F97316]/25 flex items-center gap-2.5">
                <span className="h-2 w-2 rounded-full bg-[#F97316] animate-pulse shrink-0" />
                <span className="text-[12px] font-semibold text-[#FAFAFA]">
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
