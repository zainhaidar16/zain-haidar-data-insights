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
    <section id="stats" className="border-t border-white/10 bg-[#0f1012] py-24 md:py-28">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ duration: 0.4, ease: EASE }} className="mb-14 text-center">
          <p className="mb-3 text-[12px] font-normal uppercase tracking-widest text-[#aaa9a3]">Facts and Stats</p>
          <h2 className="text-3xl font-normal text-[#f5f5f3] sm:text-4xl">Numbers that speak for themselves</h2>
          <p className="mx-auto mt-3 max-w-2xl text-[14px] leading-relaxed text-[#aaa9a3]">A snapshot of measurable outcomes delivered across analytics, dashboards, and workflow automation.</p>
        </motion.div>
        <div className="grid grid-cols-2 gap-4 lg:grid-cols-4 lg:gap-6">
          {stats.map((stat, i) => {
            const Icon = stat.icon;
            return <TiltCard key={stat.label} maxTilt={8}><motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.4, delay: i * 0.08, ease: EASE }} className="group flex h-full flex-col justify-between rounded-[24px] border border-white/10 bg-[#1d1e22] p-6 text-center transition-all duration-300 hover:border-white/25 hover:bg-[#232428] hover:shadow-md">
              <div className="mb-4 flex items-center justify-center"><div className="flex h-12 w-12 items-center justify-center rounded-2xl border border-white/10 bg-white/[0.055] transition-colors duration-300 group-hover:bg-white/[0.09]"><Icon className="h-5 w-5 text-[#d8d8d2] transition-colors duration-300" /></div></div>
              <div className="mb-3 text-4xl font-normal leading-none tracking-tight text-[#f5f5f3] sm:text-5xl lg:text-[56px]"><CountUp value={stat.value} /></div>
              <div className="text-[11px] font-normal uppercase tracking-wider text-[#aaa9a3] leading-snug">{stat.label}</div>
            </motion.div></TiltCard>;
          })}
        </div>
        <div className="mt-10 text-center"><Link to="/projects" className="inline-flex items-center gap-2 text-[13px] font-normal text-[#d8d8d2] transition-colors hover:text-white">View case studies</Link></div>
      </div>
    </section>
  );
}
