import { motion } from "framer-motion";
import { MapPin, Download, ChevronRight, TrendingUp, Users, DollarSign, BarChart3 } from "lucide-react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

function fadeUpProps(delay: number) {
  return {
    initial: { opacity: 0, y: 22 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5, delay, ease: EASE },
  } as const;
}

// Mini Analytics Dashboard Visual
function DashboardMockup() {
  const barHeights = [45, 68, 55, 82, 60, 90, 72];
  const linePoints = [40, 55, 45, 70, 60, 80, 72];

  const svgWidth = 280;
  const svgHeight = 90;
  const pointsStr = linePoints
    .map((y, i) => `${(i / (linePoints.length - 1)) * svgWidth},${svgHeight - y}`)
    .join(" ");

  return (
    <div className="relative w-full max-w-[520px] mx-auto">
      {/* Floating accent badge */}
      <div className="absolute -top-4 -right-2 z-20 flex items-center gap-1.5 bg-blue-600 text-white text-xs font-semibold px-3 py-1.5 rounded-full shadow-blue-pro">
        <TrendingUp className="h-3.5 w-3.5" />
        +28% This Quarter
      </div>

      {/* Main Dashboard Card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-lg-pro overflow-hidden">
        {/* Dashboard header bar */}
        <div className="flex items-center justify-between px-5 py-3.5 border-b border-slate-100 bg-slate-50">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-4 w-4 text-blue-600" />
            <span className="text-xs font-semibold text-slate-700">Sales Performance Dashboard</span>
          </div>
          <div className="flex gap-1.5">
            <div className="h-2 w-2 rounded-full bg-slate-300" />
            <div className="h-2 w-2 rounded-full bg-slate-300" />
            <div className="h-2 w-2 rounded-full bg-blue-500" />
          </div>
        </div>

        <div className="p-5 space-y-4">
          {/* KPI Cards Row */}
          <div className="grid grid-cols-3 gap-3">
            {[
              { label: "Revenue", value: "$2.4M", icon: DollarSign, up: true, delta: "+12%" },
              { label: "Customers", value: "8,240", icon: Users, up: true, delta: "+8%" },
              { label: "Profit", value: "34.2%", icon: TrendingUp, up: false, delta: "-2%" },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-slate-50 rounded-xl p-3 border border-slate-100">
                <div className="flex items-center justify-between mb-1.5">
                  <kpi.icon className="h-3.5 w-3.5 text-slate-400" />
                  <span className={`text-[9px] font-semibold px-1.5 py-0.5 rounded-full ${kpi.up ? "bg-emerald-50 text-emerald-600" : "bg-amber-50 text-amber-600"}`}>
                    {kpi.delta}
                  </span>
                </div>
                <div className="text-sm font-bold text-slate-800">{kpi.value}</div>
                <div className="text-[9px] text-slate-400 font-medium mt-0.5">{kpi.label}</div>
              </div>
            ))}
          </div>

          {/* Line Chart */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold text-slate-600">Revenue Trend</span>
              <span className="text-[9px] text-slate-400 font-medium">Last 7 months</span>
            </div>
            <svg width="100%" height={svgHeight} viewBox={`0 0 ${svgWidth} ${svgHeight}`} preserveAspectRatio="none">
              <defs>
                <linearGradient id="lineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                </linearGradient>
              </defs>
              <polygon
                points={`0,${svgHeight} ${pointsStr} ${svgWidth},${svgHeight}`}
                fill="url(#lineGrad)"
              />
              <polyline
                points={pointsStr}
                fill="none"
                stroke="#2563EB"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
              {linePoints.map((y, i) => (
                <circle
                  key={i}
                  cx={(i / (linePoints.length - 1)) * svgWidth}
                  cy={svgHeight - y}
                  r="3"
                  fill="#2563EB"
                  stroke="white"
                  strokeWidth="1.5"
                />
              ))}
            </svg>
          </div>

          {/* Bar Chart */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold text-slate-600">Monthly Sales</span>
              <span className="text-[9px] text-slate-400 font-medium">By product</span>
            </div>
            <div className="flex items-end gap-1.5 h-[50px]">
              {barHeights.map((h, i) => (
                <div key={i} className="flex-1 flex flex-col items-center justify-end gap-0.5">
                  <div
                    className={`w-full rounded-t-md transition-all ${i === 5 ? "bg-blue-600" : "bg-blue-200"}`}
                    style={{ height: `${(h / 100) * 46}px` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-1">
              {["J", "F", "M", "A", "M", "J", "J"].map((m) => (
                <span key={m} className="flex-1 text-center text-[8px] text-slate-300 font-medium">{m}</span>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Floating status card */}
      <div className="absolute -bottom-3 -left-3 bg-white rounded-xl border border-slate-200 shadow-md-pro px-4 py-2.5 flex items-center gap-2.5 z-20">
        <div className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
        <span className="text-xs font-semibold text-slate-700">Live Data Connected</span>
      </div>
    </div>
  );
}

export function Hero() {
  return (
    <section className="min-h-screen flex items-center pt-16 pb-12 bg-[#F8FAFC] dot-bg relative overflow-hidden">
      {/* Subtle background accent */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-50/70 to-transparent pointer-events-none" />

      <div className="section-container relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-12 lg:gap-16 items-center">

          {/* Left Column — Content */}
          <div className="max-w-xl">
            {/* Availability badge */}
            <motion.div
              {...fadeUpProps(0)}
              className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3 py-1.5 rounded-full mb-6"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Available for freelance & data roles
            </motion.div>

            {/* Headline */}
            <motion.h1
              {...fadeUpProps(0.1)}
              className="text-4xl sm:text-5xl lg:text-[52px] font-extrabold text-[#0F172A] leading-[1.15] tracking-tight mb-5"
            >
              I turn raw data into{" "}
              <span className="text-blue-600">clear business decisions.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              {...fadeUpProps(0.2)}
              className="text-[17px] text-slate-500 font-normal leading-relaxed mb-8"
            >
              I'm <span className="font-semibold text-slate-700">Zain Haidar</span>, a Data Analyst and Power BI Specialist based in Vienna, helping businesses transform messy data into dashboards, insights, reports, and smarter decisions.
            </motion.p>

            {/* Tech pills */}
            <motion.div
              {...fadeUpProps(0.3)}
              className="flex flex-wrap gap-2 mb-8"
            >
              {["Power BI", "SQL", "Python", "Tableau", "ETL Pipelines", "Azure"].map((t) => (
                <span key={t} className="badge-navy text-[11px]">{t}</span>
              ))}
            </motion.div>

            {/* CTA Buttons */}
            <motion.div
              {...fadeUpProps(0.4)}
              className="flex flex-wrap gap-3 mb-8"
            >
              <a
                href="#projects"
                onClick={(e) => { e.preventDefault(); document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" }); }}
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors duration-150 shadow-blue-pro"
              >
                View Projects
                <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="/cv-zain-haidar.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold text-[#0F172A] bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors duration-150 shadow-sm-pro"
              >
                <Download className="h-4 w-4 text-blue-600" />
                Download CV
              </a>
            </motion.div>

            {/* Meta info */}
            <motion.div
              {...fadeUpProps(0.5)}
              className="flex flex-wrap items-center gap-x-5 gap-y-2 text-xs text-slate-400 font-medium"
            >
              <span className="flex items-center gap-1.5">
                <MapPin className="h-3.5 w-3.5 text-blue-600" />
                Vienna, Austria
              </span>
              <span className="h-1 w-1 rounded-full bg-slate-300 hidden sm:block" />
              <span>MS Computer Science, University of Vienna</span>
            </motion.div>
          </div>

          {/* Right Column — Dashboard Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.3, ease: EASE }}
            className="hidden lg:flex justify-center items-center"
          >
            <DashboardMockup />
          </motion.div>
        </div>
      </div>
    </section>
  );
}
