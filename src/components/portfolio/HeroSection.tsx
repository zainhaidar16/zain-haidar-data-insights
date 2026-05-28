import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, BarChart3, Users, DollarSign } from "lucide-react";
import { Link } from "@tanstack/react-router";

const EASE = [0.25, 0.1, 0.25, 1] as const;

// Custom analytics dashboard visual (CSS mockup)
function DashboardVisual() {
  return (
    <div className="relative w-full max-w-[540px] mx-auto">
      {/* Main dashboard card */}
      <div className="bg-white rounded-3xl border border-[#CFCFCF] shadow-lg overflow-hidden">
        {/* Dashboard header bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#CFCFCF] bg-[#CFCFCF]">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#545454]" />
            <div className="h-3 w-3 rounded-full bg-[#7D7D7D]" />
            <div className="h-3 w-3 rounded-full bg-[#CFCFCF]" />
          </div>
          <div className="text-[10px] font-semibold text-[#7D7D7D]">Analytics Dashboard</div>
          <div className="w-12" />
        </div>

        {/* KPI cards row */}
        <div className="grid grid-cols-3 gap-3 p-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[#CFCFCF] rounded-xl p-3 border border-[#7D7D7D]/30"
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <DollarSign className="h-3.5 w-3.5 text-[#252525]" />
              <span className="text-[9px] font-semibold text-[#7D7D7D]">Revenue</span>
            </div>
            <div className="text-lg font-bold text-[#252525]">€142K</div>
            <div className="text-[9px] font-medium text-[#545454] mt-0.5">+24% ↑</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-[#CFCFCF] rounded-xl p-3 border border-[#CFCFCF]"
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <Users className="h-3.5 w-3.5 text-[#252525]" />
              <span className="text-[9px] font-semibold text-[#7D7D7D]">Users</span>
            </div>
            <div className="text-lg font-bold text-[#252525]">2,847</div>
            <div className="text-[9px] font-medium text-[#545454] mt-0.5">+12% ↑</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-xl p-3 border border-[#CFCFCF]"
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-[#252525]" />
              <span className="text-[9px] font-semibold text-[#7D7D7D]">Growth</span>
            </div>
            <div className="text-lg font-bold text-[#252525]">18.3%</div>
            <div className="text-[9px] font-medium text-[#545454] mt-0.5">+5.2% ↑</div>
          </motion.div>
        </div>

        {/* Mini chart area */}
        <div className="px-4 pb-2">
          <div className="bg-[#CFCFCF] rounded-xl p-3 border border-[#CFCFCF]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold text-[#7D7D7D]">Monthly Performance</span>
              <span className="text-[9px] font-medium text-[#7D7D7D]">Last 6 months</span>
            </div>
            {/* SVG mini bar chart */}
            <svg viewBox="0 0 200 50" className="w-full h-10">
              <rect x="10" y="30" width="20" height="20" rx="3" fill="#CFCFCF" />
              <rect x="40" y="20" width="20" height="30" rx="3" fill="#CFCFCF" />
              <rect x="70" y="15" width="20" height="35" rx="3" fill="#7D7D7D" />
              <rect x="100" y="10" width="20" height="40" rx="3" fill="#7D7D7D" />
              <rect x="130" y="5" width="20" height="45" rx="3" fill="#252525" />
              <rect x="160" y="0" width="20" height="50" rx="3" fill="#252525" />
            </svg>
          </div>
        </div>

        {/* Mini data table */}
        <div className="px-4 pb-4">
          <div className="bg-white rounded-xl border border-[#CFCFCF] overflow-hidden">
            <div className="grid grid-cols-4 text-[9px] font-semibold text-[#7D7D7D] uppercase tracking-wide px-3 py-2 border-b border-[#CFCFCF] bg-[#CFCFCF]">
              <span>Metric</span>
              <span>Value</span>
              <span>Change</span>
              <span>Status</span>
            </div>
            {[
              { metric: "Conversion", value: "4.2%", change: "+0.8%", status: "bg-[#545454]" },
              { metric: "Avg. Order", value: "€87", change: "+12%", status: "bg-[#545454]" },
              { metric: "Bounce Rate", value: "32%", change: "-5%", status: "bg-[#7D7D7D]" },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-4 text-[10px] px-3 py-2 border-b border-[#CFCFCF] last:border-0">
                <span className="font-semibold text-[#252525]">{row.metric}</span>
                <span className="font-medium text-[#7D7D7D]">{row.value}</span>
                <span className="font-medium text-[#545454]">{row.change}</span>
                <span><span className={`inline-block h-2 w-2 rounded-full ${row.status}`} /></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating lime accent */}
      <div className="absolute -top-3 -right-3 h-16 w-16 rounded-2xl bg-[#545454] -z-10 rotate-12" />
      <div className="absolute -bottom-4 -left-4 h-12 w-12 rounded-full bg-[#CFCFCF] -z-10" />
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-28 pb-20 bg-[#CFCFCF] relative overflow-hidden hero-arc"
    >
      {/* Sweeping gradient arcs */}
      <div className="absolute -top-40 -right-20 w-[520px] h-[520px] rounded-full hero-swoop blur-[2px] opacity-70 pointer-events-none" />
      <div className="absolute top-20 -left-24 w-[420px] h-[420px] rounded-full bg-[#545454]/15 blur-3xl pointer-events-none" />
      <div className="absolute bottom-16 right-24 w-[240px] h-[240px] rounded-full bg-[#252525]/5 blur-3xl pointer-events-none" />

      <div className="section-container relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left column */}
          <div className="max-w-xl">
            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="inline-flex items-center gap-2 bg-[#CFCFCF] border border-[#7D7D7D]/40 text-[#252525] text-[12px] font-semibold px-4 py-2 rounded-full mb-8"
            >
              <span className="h-2 w-2 rounded-full bg-[#545454] animate-pulse" />
              Open to freelance projects & full-time roles
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
              className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold text-[#252525] leading-[1.05] tracking-tight mb-6"
            >
              Data analytics made simple for{" "}
              <span className="relative">
                better business decisions.
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#7D7D7D]/35 -z-10 rounded-sm" />
              </span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
              className="text-[16px] text-[#7D7D7D] leading-relaxed mb-8 max-w-lg"
            >
              I help businesses clean, analyze, visualize, and understand their data
              using Power BI, SQL, Python, Tableau, and modern analytics tools.
            </motion.p>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.22, ease: EASE }}
              className="flex flex-wrap gap-4"
            >
              <Link
                to="/projects"
                className="btn-dark"
              >
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="btn-lime"
              >
                Start a Project
              </Link>
            </motion.div>
          </div>

          {/* Right column — Dashboard visual */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: EASE }}
            className="flex justify-center items-center"
          >
            <DashboardVisual />
          </motion.div>

        </div>
      </div>

      {/* Curved divider */}
      <div className="absolute bottom-0 left-0 w-full overflow-hidden leading-none">
        <svg viewBox="0 0 1440 120" className="w-full h-[90px]">
          <path
            fill="#FFFFFF"
            d="M0,32L60,42.7C120,53,240,75,360,74.7C480,75,600,53,720,48C840,43,960,53,1080,64C1200,75,1320,85,1380,90.7L1440,96L1440,120L0,120Z"
          />
        </svg>
      </div>
    </section>
  );
}
