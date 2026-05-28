import { motion } from "framer-motion";
import { LayoutDashboard, TrendingUp, Shuffle, Globe } from "lucide-react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const stats = [
  { value: "20+",  label: "Dashboards Delivered",             icon: LayoutDashboard },
  { value: "30%",  label: "Reporting Efficiency Improved",    icon: TrendingUp },
  { value: "15%",  label: "Campaign ROI Increase",            icon: Shuffle },
  { value: "5+",   label: "Years Data Experience",            icon: Globe },
];

export function Stats() {
  return (
    <section className="py-24 bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.4, ease: EASE }}
          className="text-center mb-12"
        >
          <p className="text-[12px] font-semibold uppercase tracking-widest text-[#71717A] mb-3">Facts & Stats</p>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-[#09090B]">
            Numbers that speak for themselves
          </h2>
          <p className="mt-3 text-[14px] text-[#71717A] max-w-2xl mx-auto">
            A snapshot of measurable outcomes delivered across analytics, dashboards, and workflow automation.
          </p>
        </motion.div>

        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-10">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }}
                className="text-center py-6"
              >
                <div className="flex items-center justify-center mb-4">
                  <div className="h-12 w-12 rounded-2xl bg-[#FFF7ED] border border-[#FDBA74]/30 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-[#F97316]" />
                  </div>
                </div>
                <div className="text-4xl sm:text-5xl font-extrabold text-[#F97316] mb-2 tracking-tight">
                  {stat.value}
                </div>
                <div className="text-[13px] font-medium text-[#09090B]">
                  {stat.label}
                </div>
              </motion.div>
            );
          })}
        </div>

        <div className="mt-10 text-center">
          <a
            href="/projects"
            className="inline-flex items-center gap-2 text-[13px] font-semibold text-[#F97316] hover:text-[#EA580C] transition-colors"
          >
            View case studies →
          </a>
        </div>
      </div>
    </section>
  );
}
