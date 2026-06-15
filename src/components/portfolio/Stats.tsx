import { motion } from "framer-motion";
import { LayoutDashboard, TrendingUp, Activity, BadgeCheck } from "lucide-react";
import { Link } from "@tanstack/react-router";
import TiltCard from "@/components/fx/TiltCard";
import CountUp from "@/components/fx/CountUp";

const EASE = [0.25, 0.1, 0.25, 1] as const;
const stats = [
  { value: "20+", label: "Dashboards Delivered", icon: LayoutDashboard },
  { value: "30%", label: "Reporting Efficiency", icon: TrendingUp },
  { value: "15%", label: "Campaign ROI", icon: Activity },
  { value: "5+", label: "Years Experience", icon: BadgeCheck },
];

export function Stats() {
  return (
    <section id="stats" className="py-24 md:py-28 bg-[#151619] border-t border-[rgba(245,245,243,0.10)]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: EASE }}
          className="text-center mb-14"
        >
          <p className="text-[12px] font-normal uppercase tracking-widest text-[#AAA9A3] mb-3">
            Facts & Stats
          </p>
          <h2 className="text-3xl sm:text-4xl font-normal text-[#F5F5F3]">
            Numbers that speak for themselves
          </h2>
          <p className="mt-3 text-[14px] text-[#D7D7D2] max-w-2xl mx-auto leading-relaxed font-normal">
            A snapshot of measurable outcomes delivered across analytics, dashboards, and workflow
            automation.
          </p>
        </motion.div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <TiltCard key={stat.label} maxTilt={8}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
                  className="card-payoneer p-6 text-center group hover:border-[rgba(245,245,243,0.24)] hover:shadow-lg bg-[#1D1E22] border border-[rgba(245,245,243,0.10)] hover:bg-[#232428] rounded-[24px] transition-all duration-300 h-full flex flex-col justify-between"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-[#151619] border border-[rgba(245,245,243,0.10)] flex items-center justify-center group-hover:border-[rgba(245,245,243,0.24)] transition-all duration-300">
                      <Icon className="h-5 w-5 text-[#D8D8D2] group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                  <div className="text-4xl sm:text-5xl lg:text-[56px] font-normal text-[#F5F5F3] mb-3 tracking-tight leading-none">
                    <CountUp value={stat.value} />
                  </div>
                  <div className="text-[11px] font-normal uppercase tracking-wider text-[#AAA9A3] leading-snug">
                    {stat.label}
                  </div>
                </motion.div>
              </TiltCard>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <Link
            to="/projects"
            className="inline-flex items-center gap-2 text-[13px] font-normal text-[#D8D8D2] hover:text-[#F5F5F3] transition-colors"
          >
            View case studies →
          </Link>
        </div>
      </div>
    </section>
  );
}
