import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Database, Activity } from "lucide-react";
import { Link } from "@tanstack/react-router";
import DataField3D from "@/components/fx/DataField3D";

const EASE = [0.25, 0.1, 0.25, 1] as const;

function DashboardVisual() {
  return (
    <div className="relative mx-auto w-full max-w-[520px]">
      <div className="absolute -inset-8 rounded-[44px] bg-[rgba(245,158,11,0.16)] blur-3xl" />
      <div className="relative overflow-hidden rounded-[34px] border border-[rgba(245,231,210,0.14)] bg-[rgba(33,28,22,0.78)] p-5 shadow-2xl backdrop-blur-xl">
        <div className="mb-5 flex items-center justify-between border-b border-[rgba(245,231,210,0.12)] pb-4">
          <div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-[#ef4444]" /><span className="h-2.5 w-2.5 rounded-full bg-[#f59e0b]" /><span className="h-2.5 w-2.5 rounded-full bg-[#84cc16]" /></div>
          <div className="flex items-center gap-2 text-[11px] font-normal text-[#d6c3a5]"><Activity className="h-3.5 w-3.5 text-[#fbbf24]" />Business Intelligence Console</div>
        </div>
        <div className="grid grid-cols-3 gap-3">
          {[{ icon: BarChart3, label: "Revenue", value: "€142K", note: "+24%" }, { icon: Database, label: "Data Rows", value: "2.8M", note: "Clean" }, { icon: Activity, label: "Forecast", value: "18.3%", note: "Growth" }].map((item) => <div key={item.label} className="rounded-2xl border border-[rgba(245,158,11,0.18)] bg-[rgba(245,158,11,0.08)] p-4"><div className="mb-3 flex items-center gap-2 text-[11px] text-[#d6c3a5]"><item.icon className="h-4 w-4 text-[#fbbf24]" />{item.label}</div><div className="text-2xl font-normal text-[#fff7ed]">{item.value}</div><div className="mt-1 text-[11px] text-[#fbbf24]">{item.note}</div></div>)}
        </div>
        <div className="mt-5 rounded-2xl border border-[rgba(245,231,210,0.12)] bg-[#17130f] p-4">
          <div className="mb-4 flex items-center justify-between text-[12px]"><span className="text-[#fff7ed]">Monthly Performance</span><span className="text-[#d6c3a5]">Last 6 months</span></div>
          <svg viewBox="0 0 220 56" className="h-16 w-full"><rect x="12" y="34" width="22" height="18" rx="5" fill="#3a2f22" /><rect x="46" y="27" width="22" height="25" rx="5" fill="#5b3b16" /><rect x="80" y="22" width="22" height="30" rx="5" fill="#92400e" /><rect x="114" y="15" width="22" height="37" rx="5" fill="#b45309" /><rect x="148" y="9" width="22" height="43" rx="5" fill="#d97706" /><rect x="182" y="3" width="22" height="49" rx="5" fill="#f59e0b" /></svg>
        </div>
        <div className="mt-5 grid gap-2 text-[12px] text-[#f5e7d2]">{["Data cleaning workflow", "Power BI executive dashboard", "Automated KPI reporting"].map((item) => <div key={item} className="flex items-center justify-between rounded-xl border border-[rgba(245,231,210,0.10)] bg-[rgba(255,247,237,0.04)] px-4 py-3"><span>{item}</span><span className="text-[#fbbf24]">Ready</span></div>)}</div>
      </div>
    </div>
  );
}

export function HeroSection() {
  return (
    <section id="hero" className="relative flex min-h-screen items-center overflow-hidden bg-[#12100d] px-6 pb-20 pt-28 text-[#fff7ed]">
      <div className="absolute inset-0 opacity-25 [mask-image:linear-gradient(to_bottom,black_0%,black_55%,transparent_100%)]"><DataField3D className="opacity-30" /></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_12%,rgba(245,158,11,0.18),transparent_30%),radial-gradient(circle_at_82%_20%,rgba(249,115,22,0.12),transparent_32%)]" />
      <div className="absolute inset-0 bg-[linear-gradient(rgba(245,231,210,0.045)_1px,transparent_1px),linear-gradient(90deg,rgba(245,231,210,0.045)_1px,transparent_1px)] bg-[size:68px_68px] opacity-45" />
      <div className="relative z-10 mx-auto grid w-full max-w-7xl items-center gap-14 lg:grid-cols-[1.02fr_0.98fr]">
        <div className="max-w-2xl">
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.45, ease: EASE }} className="mb-8 inline-flex items-center gap-3 rounded-full border border-[rgba(245,158,11,0.26)] bg-[rgba(245,158,11,0.10)] px-4 py-2 text-[12px] font-normal uppercase tracking-[0.18em] text-[#fbbf24]"><span className="h-2 w-2 rounded-full bg-[#fbbf24]" />Available for analytics projects</motion.div>
          <motion.h1 initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.08, ease: EASE }} className="mb-7 text-5xl font-normal leading-[1.02] tracking-[-0.055em] text-[#fff7ed] sm:text-6xl lg:text-[72px]">Turn messy business data into clear decisions.</motion.h1>
          <motion.p initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.14, ease: EASE }} className="mb-9 max-w-xl text-[17px] font-normal leading-8 text-[#f5e7d2]">I build clean dashboards, data reports, SQL analysis, and automation systems that help teams understand performance without confusion.</motion.p>
          <motion.div initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5, delay: 0.22, ease: EASE }} className="flex flex-wrap gap-4">
            <Link to="/projects" className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-[#fbbf24] to-[#f97316] px-6 py-3 text-sm font-normal text-[#1c1408] shadow-[0_0_32px_rgba(245,158,11,0.24)] transition hover:translate-y-[-1px]">View Projects <ArrowRight className="h-4 w-4" /></Link>
            <Link to="/contact" className="inline-flex items-center gap-2 rounded-full border border-[rgba(245,231,210,0.22)] bg-[rgba(255,247,237,0.06)] px-6 py-3 text-sm font-normal text-[#fff7ed] transition hover:border-[rgba(245,158,11,0.55)] hover:bg-[rgba(245,158,11,0.12)]">Start a Project</Link>
          </motion.div>
        </div>
        <motion.div initial={{ opacity: 0, x: 28 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.6, delay: 0.22, ease: EASE }}><DashboardVisual /></motion.div>
      </div>
    </section>
  );
}
