import { motion } from "framer-motion";
import { LayoutDashboard, TrendingUp, Shuffle, Globe } from "lucide-react";

const stats = [
  { value: "20+", label: "Dashboards Delivered", sub: "Across retail, finance & healthcare", icon: LayoutDashboard },
  { value: "30%", label: "Reporting Efficiency Improved", sub: "Average across client engagements", icon: TrendingUp },
  { value: "15%", label: "Campaign ROI Increase", sub: "Via customer segmentation analysis", icon: Shuffle },
  { value: "5+", label: "Years Data Experience", sub: "Analytics, BI, and engineering", icon: Globe },
];

export function Stats() {
  return (
    <section className="py-16 bg-white border-y border-slate-100">
      <div className="section-container">
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.4, delay: i * 0.07, ease: "easeOut" }}
                className="text-center p-6 rounded-2xl bg-slate-50 border border-slate-100 hover:border-blue-200 hover:bg-blue-50/40 transition-all duration-200"
              >
                <div className="flex justify-center mb-3">
                  <div className="h-10 w-10 rounded-xl bg-blue-100 flex items-center justify-center">
                    <Icon className="h-5 w-5 text-blue-600" />
                  </div>
                </div>
                <div className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] mb-1.5">{stat.value}</div>
                <div className="text-sm font-semibold text-slate-700 mb-1">{stat.label}</div>
                <div className="text-xs text-slate-400 leading-relaxed">{stat.sub}</div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
