import { motion } from "framer-motion";
import { ArrowRight, BarChart3, Database, Activity, TrendingUp, Cpu, Zap } from "lucide-react";
import { Link } from "@tanstack/react-router";
import DataField3D from "@/components/fx/DataField3D";
import TiltCard from "@/components/fx/TiltCard";
import { Button } from "@/components/ui/button";

const EASE = [0.25, 0.1, 0.25, 1] as const;

function DashboardVisual() {
  return (
    <div className="relative w-full max-w-[560px] mx-auto">
      <div className="absolute -inset-8 rounded-[2rem] bg-[#ED1C24]/15 blur-3xl" />

      <div className="relative overflow-hidden rounded-[1.35rem] border border-white/10 bg-[#0B0B0B] shadow-2xl">
        <div className="flex items-center justify-between px-5 py-3 border-b border-white/10 bg-[#111111]">
          <div className="flex items-center gap-2">
            <span className="h-3 w-3 rounded-full bg-[#ED1C24]" />
            <span className="h-3 w-3 rounded-full bg-white/35" />
            <span className="h-3 w-3 rounded-full bg-white/15" />
          </div>
          <div className="flex items-center gap-1.5 text-[10px] font-semibold uppercase tracking-[0.18em] text-[#B8B8B8]">
            <Activity className="h-3 w-3 text-[#FF4B52]" />
            <span>Live Performance Core</span>
          </div>
          <div className="w-12" />
        </div>

        <div className="grid grid-cols-3 gap-3 p-4">
          {[
            { icon: BarChart3, label: "Revenue", value: "€142K", change: "+24%", hot: true },
            { icon: Database, label: "Records", value: "2.8M", change: "+12%" },
            { icon: TrendingUp, label: "Growth", value: "18.3%", change: "+5.2%" },
          ].map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.label}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.35 + index * 0.1 }}
                className={`rounded-2xl border p-3 ${
                  item.hot
                    ? "border-[#ED1C24]/35 bg-[#ED1C24]/10"
                    : "border-white/10 bg-white/[0.035]"
                }`}
              >
                <div className="flex items-center gap-1.5 mb-1.5">
                  <Icon className="h-3.5 w-3.5 text-[#FF4B52]" />
                  <span className="text-[9px] font-semibold uppercase tracking-wider text-[#AFAFAF]">
                    {item.label}
                  </span>
                </div>
                <div className="text-lg font-bold text-white">{item.value}</div>
                <div className="text-[9px] font-semibold text-[#FF4B52] mt-0.5">{item.change} ↑</div>
              </motion.div>
            );
          })}
        </div>

        <div className="px-4 pb-2">
          <div className="rounded-2xl border border-white/10 bg-[#070707] p-4">
            <div className="flex items-center justify-between mb-4">
              <span className="text-[11px] font-semibold uppercase tracking-[0.16em] text-white">
                Intelligence Pipeline
              </span>
              <span className="text-[10px] font-medium text-[#8F8F8F]">Last 6 months</span>
            </div>
            <svg viewBox="0 0 220 64" className="w-full h-16" aria-hidden="true">
              <defs>
                <linearGradient id="amdBars" x1="0" x2="0" y1="0" y2="1">
                  <stop offset="0%" stopColor="#FF4B52" />
                  <stop offset="100%" stopColor="#7A080D" />
                </linearGradient>
              </defs>
              {[18, 30, 24, 42, 50, 58].map((height, index) => (
                <rect
                  key={index}
                  x={12 + index * 34}
                  y={62 - height}
                  width="18"
                  height={height}
                  rx="4"
                  fill={index > 2 ? "url(#amdBars)" : "rgba(255,255,255,0.16)"}
                />
              ))}
              <path
                d="M10 48 C42 36, 60 44, 84 28 S132 20, 156 18 S190 12, 212 8"
                fill="none"
                stroke="#FF4B52"
                strokeWidth="2.5"
              />
            </svg>
          </div>
        </div>

        <div className="px-4 pb-4">
          <div className="overflow-hidden rounded-2xl border border-white/10 bg-[#0F0F0F]">
            <div className="grid grid-cols-4 px-3 py-2 text-[9px] font-semibold uppercase tracking-wide text-[#8F8F8F] border-b border-white/10 bg-white/[0.035]">
              <span>System</span>
              <span>Value</span>
              <span>Move</span>
              <span>State</span>
            </div>
            {[
              { metric: "Dashboards", value: "31", change: "+8", status: "bg-[#ED1C24]" },
              { metric: "Pipelines", value: "14", change: "+4", status: "bg-[#FF4B52]" },
              { metric: "Automation", value: "92%", change: "+11%", status: "bg-white/70" },
            ].map((row) => (
              <div
                key={row.metric}
                className="grid grid-cols-4 px-3 py-2 text-[10px] border-b border-white/10 last:border-0"
              >
                <span className="font-semibold text-white">{row.metric}</span>
                <span className="font-medium text-[#D6D6D6]">{row.value}</span>
                <span className="font-medium text-[#FF4B52]">{row.change}</span>
                <span>
                  <span className={`inline-block h-2 w-2 rounded-full ${row.status}`} />
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute -top-4 -right-4 h-20 w-20 rounded-3xl border border-[#ED1C24]/25 bg-[#ED1C24]/10 rotate-12" />
      <div className="absolute -bottom-5 -left-5 h-14 w-14 rounded-full border border-white/10 bg-white/[0.035]" />
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="nvr-home-hero min-h-screen flex items-center pt-28 pb-20 bg-background relative overflow-hidden"
    >
      <div className="absolute inset-0 [mask-image:linear-gradient(to_bottom,black_0%,black_70%,transparent_100%)] pointer-events-none">
        <DataField3D className="opacity-30" />
      </div>
      <div className="absolute top-1/4 right-[8%] w-[520px] h-[520px] rounded-full bg-[#ED1C24]/10 blur-3xl pointer-events-none" />

      <div className="section-container relative z-10 w-full">
        <div className="nvr-hero-grid grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">
          <div className="nvr-hero-copy max-w-2xl">
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="nvr-kicker inline-flex items-center gap-2 bg-[#ED1C24]/10 border border-[#ED1C24]/30 text-[#FF4B52] text-[12px] font-semibold px-4 py-2 rounded-full mb-8"
            >
              <Zap className="h-3.5 w-3.5" />
              High-performance analytics systems
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
              className="nvr-hero-heading text-4xl sm:text-5xl lg:text-[64px] font-extrabold text-white leading-[0.98] tracking-tight mb-6"
            >
              Build faster decisions from{" "}
              <span className="relative">
                raw business data.
                <span className="absolute bottom-1 left-0 w-full h-1 bg-[#ED1C24] -z-10 rounded-full" />
              </span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
              className="text-[16px] text-[#D6D6D6] leading-relaxed mb-8 max-w-xl"
            >
              I design Power BI dashboards, SQL pipelines, Python automation, and reporting systems
              that turn messy data into clean, fast, executive-ready intelligence.
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

            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
              className="mt-8 grid max-w-xl grid-cols-3 gap-3"
            >
              {[
                ["Power BI", "Dashboards"],
                ["SQL + Python", "Automation"],
                ["ETL", "Pipelines"],
              ].map(([title, subtitle]) => (
                <div key={title} className="rounded-2xl border border-white/10 bg-white/[0.035] p-3">
                  <div className="flex items-center gap-2 text-white text-sm font-semibold">
                    <Cpu className="h-3.5 w-3.5 text-[#FF4B52]" />
                    {title}
                  </div>
                  <p className="mt-1 text-[11px] text-[#8F8F8F]">{subtitle}</p>
                </div>
              ))}
            </motion.div>
          </div>

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
