import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, BarChart3, Database, Activity } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import DataField3D from "@/components/fx/DataField3D";
import TiltCard from "@/components/fx/TiltCard";

const EASE = [0.25, 0.1, 0.25, 1] as const;

function DashboardVisual() {
  return (
    <div className="relative w-full max-w-[540px] mx-auto">
      {/* Main dashboard card */}
      <div className="bg-[#FFFFFF] rounded-3xl border border-[#E8E8ED] shadow-lg overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#E8E8ED] bg-[#F5F5F7]">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#FF3B30]" />
            <div className="h-3 w-3 rounded-full bg-[#FF9500]" />
            <div className="h-3 w-3 rounded-full bg-[#34C759]" />
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-semibold text-[#6E6E73]">
            <Activity className="h-3 w-3 text-[#0071E3]" />
            <span>Analytics Dashboard</span>
          </div>
          <div className="w-12" />
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-3 gap-3 p-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[rgba(0,113,227,0.04)] rounded-xl p-3 border border-[rgba(0,113,227,0.12)]"
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <BarChart3 className="h-3.5 w-3.5 text-[#0071E3]" />
              <span className="text-[9px] font-semibold text-[#6E6E73]">Revenue</span>
            </div>
            <div className="text-lg font-bold text-[#1D1D1F]">€142K</div>
            <div className="text-[9px] font-semibold text-[#0071E3] mt-0.5">+24% ↑</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-[#FBFBFD] rounded-xl p-3 border border-[#E8E8ED]"
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <Database className="h-3.5 w-3.5 text-[#6E6E73]" />
              <span className="text-[9px] font-semibold text-[#6E6E73]">Nodes</span>
            </div>
            <div className="text-lg font-bold text-[#1D1D1F]">2,847</div>
            <div className="text-[9px] font-semibold text-[#34C759] mt-0.5">+12% ↑</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-[#FBFBFD] rounded-xl p-3 border border-[#E8E8ED]"
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-[#0071E3]" />
              <span className="text-[9px] font-semibold text-[#6E6E73]">Growth</span>
            </div>
            <div className="text-lg font-bold text-[#1D1D1F]">18.3%</div>
            <div className="text-[9px] font-semibold text-[#0071E3] mt-0.5">+5.2% ↑</div>
          </motion.div>
        </div>

        {/* Mini chart */}
        <div className="px-4 pb-2">
          <div className="bg-[#FBFBFD] rounded-xl p-3 border border-[#E8E8ED]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold text-[#1D1D1F]">Monthly Performance</span>
              <span className="text-[9px] font-medium text-[#86868B]">Last 6 months</span>
            </div>
            <svg viewBox="0 0 200 50" className="w-full h-10">
              <rect x="10" y="30" width="20" height="20" rx="3" fill="#E8E8ED" />
              <rect x="40" y="20" width="20" height="30" rx="3" fill="#E8E8ED" />
              <rect x="70" y="15" width="20" height="35" rx="3" fill="#0071E3" opacity="0.3" />
              <rect x="100" y="10" width="20" height="40" rx="3" fill="#0071E3" opacity="0.6" />
              <rect x="130" y="5" width="20" height="45" rx="3" fill="#0071E3" opacity="0.8" />
              <rect x="160" y="0" width="20" height="50" rx="3" fill="#0071E3" />
            </svg>
          </div>
        </div>

        {/* Mini table */}
        <div className="px-4 pb-4">
          <div className="bg-[#FFFFFF] rounded-xl border border-[#E8E8ED] overflow-hidden">
            <div className="grid grid-cols-4 text-[9px] font-semibold text-[#86868B] uppercase tracking-wide px-3 py-2 border-b border-[#E8E8ED] bg-[#F5F5F7]">
              <span>Metric</span>
              <span>Value</span>
              <span>Change</span>
              <span>Status</span>
            </div>
            {[
              { metric: "Conversion", value: "4.2%", change: "+0.8%", status: "bg-[#0071E3]" },
              { metric: "Avg. Order", value: "€87", change: "+12%", status: "bg-[#0071E3]" },
              { metric: "Bounce Rate", value: "32%", change: "-5%", status: "bg-[#34C759]" },
            ].map((row, i) => (
              <div
                key={i}
                className="grid grid-cols-4 text-[10px] px-3 py-2 border-b border-[#E8E8ED] last:border-0"
              >
                <span className="font-semibold text-[#1D1D1F]">{row.metric}</span>
                <span className="font-medium text-[#6E6E73]">{row.value}</span>
                <span className="font-medium text-[#0071E3]">{row.change}</span>
                <span>
                  <span className={`inline-block h-2 w-2 rounded-full ${row.status}`} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating accents */}
      <div className="absolute -top-3 -right-3 h-16 w-16 rounded-2xl bg-[rgba(0,113,227,0.06)] -z-10 rotate-12" />
      <div className="absolute -bottom-4 -left-4 h-12 w-12 rounded-full bg-[#FFFFFF] -z-10 border border-[#E8E8ED]" />
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="nvr-home-hero min-h-screen flex items-center pt-28 pb-20 bg-background relative overflow-hidden"
    >
      {/* Background accents */}
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)] pointer-events-none">
        <DataField3D className="opacity-40" />
      </div>
      <div className="absolute top-1/4 right-[8%] w-[480px] h-[480px] rounded-full bg-[rgba(0,113,227,0.03)] blur-3xl pointer-events-none" />

      <div className="section-container relative z-10 w-full">
        <div className="nvr-hero-grid grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          {/* Left */}
          <div className="nvr-hero-copy max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="nvr-kicker inline-flex items-center gap-2 bg-[rgba(0,113,227,0.06)] border border-[rgba(0,113,227,0.15)] text-[#0071E3] text-[12px] font-semibold px-4 py-2 rounded-full mb-8"
            >
              <span className="h-2 w-2 rounded-full bg-[#0071E3] animate-pulse" />
              Open to freelance projects & full-time roles
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
              className="nvr-hero-heading text-4xl sm:text-5xl lg:text-[58px] font-extrabold text-[#1D1D1F] leading-[1.05] tracking-tight mb-6"
            >
              Data analytics made simple for{" "}
              <span className="relative">
                better business decisions.
                <span className="absolute bottom-1 left-0 w-full h-1 bg-[rgba(0,113,227,0.12)] -z-10 rounded-full" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
              className="text-[16px] text-[#6E6E73] leading-relaxed mb-8 max-w-lg"
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
              <Button asChild variant="primary" className="bg-[#0071E3] hover:bg-[#005BB5] text-white">
                <Link to="/projects">
                  View Projects
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary" className="border-[#D2D2D7] hover:bg-[#F5F5F7] text-[#1D1D1F]">
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
