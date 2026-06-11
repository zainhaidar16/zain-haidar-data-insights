import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, BarChart3, Users, DollarSign } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import DataField3D from "@/components/fx/DataField3D";
import TiltCard from "@/components/fx/TiltCard";

const EASE = [0.25, 0.1, 0.25, 1] as const;

function DashboardVisual() {
  return (
    <div className="relative w-full max-w-[540px] mx-auto">
      {/* Main dashboard card */}
      <div className="bg-[#FFFFFF] rounded-3xl border border-[#E2E8F0] shadow-[0_12px_40px_-6px_rgba(0,0,0,0.06),0_0_40px_rgba(37,99,235,0.04)] overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#E2E8F0] bg-[#F1F5F9]">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#EF4444]" />
            <div className="h-3 w-3 rounded-full bg-[#93C5FD]" />
            <div className="h-3 w-3 rounded-full bg-[#22C55E]" />
          </div>
          <div className="text-[10px] font-semibold text-[#475569]">Analytics Dashboard</div>
          <div className="w-12" />
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-3 gap-3 p-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[#2563EB]/5 rounded-xl p-3 border border-[#2563EB]/20"
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <DollarSign className="h-3.5 w-3.5 text-[#2563EB]" />
              <span className="text-[9px] font-semibold text-[#475569]">Revenue</span>
            </div>
            <div className="text-lg font-bold text-[#0F172A]">€142K</div>
            <div className="text-[9px] font-semibold text-[#2563EB] mt-0.5">+24% ↑</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-[#F1F5F9] rounded-xl p-3 border border-[#E2E8F0]"
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <Users className="h-3.5 w-3.5 text-[#475569]" />
              <span className="text-[9px] font-semibold text-[#475569]">Users</span>
            </div>
            <div className="text-lg font-bold text-[#0F172A]">2,847</div>
            <div className="text-[9px] font-semibold text-[#14B8A6] mt-0.5">+12% ↑</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-[#F8FAFC] rounded-xl p-3 border border-[#E2E8F0]"
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-[#14B8A6]" />
              <span className="text-[9px] font-semibold text-[#475569]">Growth</span>
            </div>
            <div className="text-lg font-bold text-[#0F172A]">18.3%</div>
            <div className="text-[9px] font-semibold text-[#14B8A6] mt-0.5">+5.2% ↑</div>
          </motion.div>
        </div>

        {/* Mini chart */}
        <div className="px-4 pb-2">
          <div className="bg-[#F1F5F9] rounded-xl p-3 border border-[#E2E8F0]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold text-[#0F172A]">Monthly Performance</span>
              <span className="text-[9px] font-medium text-[#94A3B8]">Last 6 months</span>
            </div>
            <svg viewBox="0 0 200 50" className="w-full h-10">
              <rect x="10" y="30" width="20" height="20" rx="3" fill="#E2E8F0" />
              <rect x="40" y="20" width="20" height="30" rx="3" fill="#E2E8F0" />
              <rect x="70" y="15" width="20" height="35" rx="3" fill="#93C5FD" />
              <rect x="100" y="10" width="20" height="40" rx="3" fill="#93C5FD" />
              <rect x="130" y="5" width="20" height="45" rx="3" fill="#2563EB" />
              <rect x="160" y="0" width="20" height="50" rx="3" fill="#2563EB" />
            </svg>
          </div>
        </div>

        {/* Mini table */}
        <div className="px-4 pb-4">
          <div className="bg-[#FFFFFF] rounded-xl border border-[#E2E8F0] overflow-hidden">
            <div className="grid grid-cols-4 text-[9px] font-semibold text-[#94A3B8] uppercase tracking-wide px-3 py-2 border-b border-[#E2E8F0] bg-[#F1F5F9]">
              <span>Metric</span>
              <span>Value</span>
              <span>Change</span>
              <span>Status</span>
            </div>
            {[
              { metric: "Conversion", value: "4.2%", change: "+0.8%", status: "bg-[#2563EB]" },
              { metric: "Avg. Order", value: "€87", change: "+12%", status: "bg-[#2563EB]" },
              { metric: "Bounce Rate", value: "32%", change: "-5%", status: "bg-[#93C5FD]" },
            ].map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-4 text-[10px] px-3 py-2 border-b border-[#E2E8F0] last:border-0"
              >
                <span className="font-semibold text-[#0F172A]">{row.metric}</span>
                <span className="font-medium text-[#475569]">{row.value}</span>
                <span className="font-medium text-[#2563EB]">{row.change}</span>
                <span>
                  <span className={`inline-block h-2 w-2 rounded-full ${row.status}`} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating accents */}
      <div className="absolute -top-3 -right-3 h-16 w-16 rounded-2xl bg-[#2563EB] -z-10 rotate-12 opacity-80" />
      <div className="absolute -bottom-4 -left-4 h-12 w-12 rounded-full bg-[#F1F5F9] -z-10" />
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="nvr-home-hero min-h-screen flex items-center pt-28 pb-20 bg-[#F8FAFC] relative overflow-hidden hero-arc"
    >
      {/* Background accents */}
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)]">
        <DataField3D className="opacity-70" />
      </div>
      <div className="absolute top-1/4 right-[8%] w-[480px] h-[480px] rounded-full bg-[#2563EB]/8 blur-3xl pointer-events-none" />

      <div className="section-container relative z-10 w-full">
        <div className="nvr-hero-grid grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className="nvr-hero-copy max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="nvr-kicker inline-flex items-center gap-2 bg-[#2563EB]/5 border border-[#2563EB]/20 text-[#1D4ED8] text-[12px] font-semibold px-4 py-2 rounded-full mb-8"
            >
              <span className="h-2 w-2 rounded-full bg-[#2563EB] animate-pulse" />
              Open to freelance projects & full-time roles
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
              className="nvr-hero-heading text-4xl sm:text-5xl lg:text-[58px] font-extrabold text-[#0F172A] leading-[1.05] tracking-tight mb-6"
            >
              Data analytics made simple for{" "}
              <span className="relative">
                better business decisions.
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#2563EB]/15 -z-10 rounded-sm" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
              className="text-[16px] text-[#475569] leading-relaxed mb-8 max-w-lg"
            >
              I help businesses clean, analyze, visualize, and understand their data using Power BI,
              SQL, Python, Tableau, and modern analytics tools.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: EASE }}
              className="flex flex-wrap gap-4"
            >
              <Button asChild variant="primary">
                <Link to="/projects">
                  View Projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/contact">Start a Project</Link>
              </Button>
            </motion.div>
          </div>

          {/* Right — Dashboard visual */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: EASE }}
            className="nvr-dashboard-wrap flex justify-center items-center [perspective:1100px]"
          >
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            >
              <TiltCard maxTilt={6}>
                <DashboardVisual />
              </TiltCard>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
