import { motion } from "framer-motion";
import { ArrowRight, TrendingUp, BarChart3, Users, DollarSign } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const EASE = [0.25, 0.1, 0.25, 1] as const;

function DashboardVisual() {
  return (
    <div className="relative w-full max-w-[540px] mx-auto">
      {/* Main dashboard card */}
      <div className="bg-white rounded-3xl border border-[#E4E4E7] shadow-lg overflow-hidden">
        {/* Header bar */}
        <div className="flex items-center justify-between px-5 py-3 border-b border-[#E4E4E7] bg-[#09090B]">
          <div className="flex items-center gap-2">
            <div className="h-3 w-3 rounded-full bg-[#EF4444]" />
            <div className="h-3 w-3 rounded-full bg-[#FDBA74]" />
            <div className="h-3 w-3 rounded-full bg-[#22C55E]" />
          </div>
          <div className="text-[10px] font-semibold text-[#71717A]">Analytics Dashboard</div>
          <div className="w-12" />
        </div>

        {/* KPI cards */}
        <div className="grid grid-cols-3 gap-3 p-4">
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.4 }}
            className="bg-[#FFF7ED] rounded-xl p-3 border border-[#FDBA74]/30"
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <DollarSign className="h-3.5 w-3.5 text-[#F97316]" />
              <span className="text-[9px] font-semibold text-[#71717A]">Revenue</span>
            </div>
            <div className="text-lg font-bold text-[#09090B]">€142K</div>
            <div className="text-[9px] font-semibold text-[#F97316] mt-0.5">+24% ↑</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.5 }}
            className="bg-[#FAFAFA] rounded-xl p-3 border border-[#E4E4E7]"
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <Users className="h-3.5 w-3.5 text-[#71717A]" />
              <span className="text-[9px] font-semibold text-[#71717A]">Users</span>
            </div>
            <div className="text-lg font-bold text-[#09090B]">2,847</div>
            <div className="text-[9px] font-semibold text-[#71717A] mt-0.5">+12% ↑</div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.6 }}
            className="bg-white rounded-xl p-3 border border-[#E4E4E7]"
          >
            <div className="flex items-center gap-1.5 mb-1.5">
              <TrendingUp className="h-3.5 w-3.5 text-[#F97316]" />
              <span className="text-[9px] font-semibold text-[#71717A]">Growth</span>
            </div>
            <div className="text-lg font-bold text-[#09090B]">18.3%</div>
            <div className="text-[9px] font-semibold text-[#F97316] mt-0.5">+5.2% ↑</div>
          </motion.div>
        </div>

        {/* Mini chart */}
        <div className="px-4 pb-2">
          <div className="bg-[#FAFAFA] rounded-xl p-3 border border-[#E4E4E7]">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold text-[#09090B]">Monthly Performance</span>
              <span className="text-[9px] font-medium text-[#71717A]">Last 6 months</span>
            </div>
            <svg viewBox="0 0 200 50" className="w-full h-10">
              <rect x="10" y="30" width="20" height="20" rx="3" fill="#E4E4E7" />
              <rect x="40" y="20" width="20" height="30" rx="3" fill="#E4E4E7" />
              <rect x="70" y="15" width="20" height="35" rx="3" fill="#FDBA74" />
              <rect x="100" y="10" width="20" height="40" rx="3" fill="#FDBA74" />
              <rect x="130" y="5"  width="20" height="45" rx="3" fill="#F97316" />
              <rect x="160" y="0"  width="20" height="50" rx="3" fill="#F97316" />
            </svg>
          </div>
        </div>

        {/* Mini table */}
        <div className="px-4 pb-4">
          <div className="bg-white rounded-xl border border-[#E4E4E7] overflow-hidden">
            <div className="grid grid-cols-4 text-[9px] font-semibold text-[#71717A] uppercase tracking-wide px-3 py-2 border-b border-[#E4E4E7] bg-[#FAFAFA]">
              <span>Metric</span>
              <span>Value</span>
              <span>Change</span>
              <span>Status</span>
            </div>
            {[
              { metric: "Conversion", value: "4.2%", change: "+0.8%", status: "bg-[#F97316]" },
              { metric: "Avg. Order", value: "€87",  change: "+12%",  status: "bg-[#F97316]" },
              { metric: "Bounce Rate",value: "32%",  change: "-5%",   status: "bg-[#FDBA74]" },
            ].map((row, i) => (
              <div key={i} className="grid grid-cols-4 text-[10px] px-3 py-2 border-b border-[#E4E4E7] last:border-0">
                <span className="font-semibold text-[#09090B]">{row.metric}</span>
                <span className="font-medium text-[#71717A]">{row.value}</span>
                <span className="font-medium text-[#F97316]">{row.change}</span>
                <span><span className={`inline-block h-2 w-2 rounded-full ${row.status}`} /></span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Floating accents */}
      <div className="absolute -top-3 -right-3 h-16 w-16 rounded-2xl bg-[#F97316] -z-10 rotate-12 opacity-80" />
      <div className="absolute -bottom-4 -left-4 h-12 w-12 rounded-full bg-[#09090B]/5 -z-10" />
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-28 pb-20 bg-[#FAFAFA] relative overflow-hidden hero-arc"
    >
      {/* Background accents */}
      <div className="absolute -top-40 -right-20 w-[520px] h-[520px] rounded-full bg-[#F97316]/6 blur-3xl pointer-events-none" />
      <div className="absolute top-20 -left-24 w-[420px] h-[420px] rounded-full bg-[#09090B]/3 blur-3xl pointer-events-none" />
      <div className="absolute bottom-16 right-24 w-[240px] h-[240px] rounded-full bg-[#FDBA74]/10 blur-3xl pointer-events-none" />

      <div className="section-container relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left */}
          <div className="max-w-xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="inline-flex items-center gap-2 bg-[#FFF7ED] border border-[#FDBA74] text-[#C2410C] text-[12px] font-semibold px-4 py-2 rounded-full mb-8"
            >
              <span className="h-2 w-2 rounded-full bg-[#F97316] animate-pulse" />
              Open to freelance projects & full-time roles
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
              className="text-4xl sm:text-5xl lg:text-[58px] font-extrabold text-[#09090B] leading-[1.05] tracking-tight mb-6"
            >
              Data analytics made simple for{" "}
              <span className="relative">
                better business decisions.
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#F97316]/20 -z-10 rounded-sm" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
              className="text-[16px] text-[#71717A] leading-relaxed mb-8 max-w-lg"
            >
              I help businesses clean, analyze, visualize, and understand their data
              using Power BI, SQL, Python, Tableau, and modern analytics tools.
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
