import { motion } from "framer-motion";
import { LayoutDashboard, TrendingUp, Shuffle, Globe } from "lucide-react";
import { Link } from "@tanstack/react-router";
import TiltCard from "@/components/fx/TiltCard";
import CountUp from "@/components/fx/CountUp";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const stats = [
  { value: "20+", label: "Dashboards Delivered", icon: LayoutDashboard },
  { value: "30%", label: "Reporting Efficiency Improved", icon: TrendingUp },
  { value: "15%", label: "Campaign ROI Increase", icon: Shuffle },
  { value: "5+", label: "Years Data Experience", icon: Globe },
];

export function Stats() {
  return (
    <section className="py-24 md:py-28 bg-[#0F172A]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: EASE }}
          className="text-center mb-14"
        >
          <p className="text-[12px] font-semibold uppercase tracking-widest text-[#94A3B8] mb-3">
            Facts & Stats
          </p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#F8FAFC]">
            Numbers that speak for themselves
          </h2>
          <p className="mt-3 text-[14px] text-[#94A3B8] max-w-2xl mx-auto leading-relaxed">
            A snapshot of measurable outcomes delivered across analytics, dashboards, and workflow
            automation.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 lg:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <TiltCard key={stat.label} maxTilt={8}>
                <motion.div
                  initial={{ opacity: 0, y: 16 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
                  className="card-payoneer p-6 text-center group hover:border-[#2563EB]/40 transition-all duration-300 h-full"
                >
                  <div className="flex items-center justify-center mb-4">
                    <div className="h-12 w-12 rounded-2xl bg-[#2563EB]/10 border border-[#2563EB]/25 flex items-center justify-center group-hover:bg-[#2563EB] transition-colors duration-300">
                      <Icon className="h-5 w-5 text-[#2563EB] group-hover:text-white transition-colors duration-300" />
                    </div>
                  </div>
                  <div className="text-4xl sm:text-5xl font-extrabold text-[#2563EB] mb-2 tracking-tight">
                    <CountUp value={stat.value} />
                  </div>
                  <div className="text-[13px] font-medium text-[#475569] leading-snug">
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
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#2563EB] hover:text-[#3B82F6] transition-colors"
          >
            View case studies →
          </Link>
        </div>
      </div>
    </section>
  );
}
