import { motion } from "framer-motion";
import { MapPin, Download, ChevronRight, TrendingUp, Users, DollarSign, BarChart3, ShoppingCart } from "lucide-react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

// ─── Dashboard Visual ─────────────────────────────────────────────────────────

function DashboardVisual() {
  // Line chart data
  const lineData = [32, 42, 37, 55, 48, 64, 58, 72, 65, 80, 74, 88];
  const W = 260, H = 72;
  const toX = (i: number) => (i / (lineData.length - 1)) * W;
  const toY = (v: number) => H - ((v - 28) / 65) * H;
  const linePath = lineData.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(v)}`).join(" ");
  const areaPath = `M${toX(0)},${H} ${lineData.map((v, i) => `L${toX(i)},${toY(v)}`).join(" ")} L${toX(lineData.length - 1)},${H} Z`;

  // Bar chart data
  const barData = [55, 72, 48, 88, 62, 76];
  const months = ["Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

  // Table data
  const tableRows = [
    { product: "Product A", sales: "$84,200", growth: "+12%" },
    { product: "Product B", sales: "$62,500", growth: "+8%" },
    { product: "Product C", sales: "$41,800", growth: "-3%" },
  ];

  return (
    <div className="relative w-full max-w-[500px] mx-auto">
      {/* Live indicator badge */}
      <div className="absolute -top-3.5 -right-2 z-20 flex items-center gap-1.5 bg-[#0F172A] text-white text-[10px] font-semibold px-3 py-1.5 rounded-full shadow-lg">
        <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
        Live Dashboard
      </div>

      {/* Main card */}
      <div className="bg-white rounded-2xl border border-slate-200 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.12)] overflow-hidden">

        {/* Dashboard header */}
        <div className="flex items-center justify-between px-5 py-3 bg-[#0F172A] border-b border-slate-800">
          <div className="flex items-center gap-2">
            <BarChart3 className="h-3.5 w-3.5 text-blue-400" />
            <span className="text-[11px] font-semibold text-slate-200">Business Performance Dashboard</span>
          </div>
          <div className="flex gap-1.5">
            <div className="h-2 w-2 rounded-full bg-slate-600" />
            <div className="h-2 w-2 rounded-full bg-slate-600" />
            <div className="h-2 w-2 rounded-full bg-blue-500" />
          </div>
        </div>

        <div className="p-4 space-y-3.5">

          {/* KPI Cards */}
          <div className="grid grid-cols-4 gap-2">
            {[
              { label: "Revenue",   value: "$2.4M", delta: "+14%", up: true,  Icon: DollarSign },
              { label: "Orders",    value: "8,240", delta: "+9%",  up: true,  Icon: ShoppingCart },
              { label: "Customers", value: "3,180", delta: "+6%",  up: true,  Icon: Users },
              { label: "Avg. Deal", value: "$292",  delta: "-2%",  up: false, Icon: TrendingUp },
            ].map((kpi) => (
              <div key={kpi.label} className="bg-slate-50 rounded-xl p-2.5 border border-slate-100">
                <div className="flex items-center justify-between mb-1.5">
                  <kpi.Icon className="h-3 w-3 text-slate-400" />
                  <span className={`text-[8px] font-bold px-1 py-0.5 rounded-full ${kpi.up ? "bg-emerald-50 text-emerald-600" : "bg-red-50 text-red-500"}`}>
                    {kpi.delta}
                  </span>
                </div>
                <div className="text-[12px] font-extrabold text-[#0F172A] leading-none">{kpi.value}</div>
                <div className="text-[8px] text-slate-400 font-medium mt-0.5">{kpi.label}</div>
              </div>
            ))}
          </div>

          {/* Line chart */}
          <div className="bg-slate-50 rounded-xl p-3 border border-slate-100">
            <div className="flex items-center justify-between mb-2">
              <span className="text-[10px] font-semibold text-slate-700">Revenue Trend</span>
              <span className="text-[8px] font-medium text-slate-400 bg-white border border-slate-200 px-2 py-0.5 rounded-full">Last 12 months</span>
            </div>
            <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none">
              <defs>
                <linearGradient id="heroLineGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stopColor="#2563EB" stopOpacity="0.15" />
                  <stop offset="100%" stopColor="#2563EB" stopOpacity="0" />
                </linearGradient>
              </defs>
              <path d={areaPath} fill="url(#heroLineGrad)" />
              <path d={linePath} fill="none" stroke="#2563EB" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
              {lineData.map((v, i) => (
                i % 3 === 0 && (
                  <circle key={i} cx={toX(i)} cy={toY(v)} r="2.5" fill="#2563EB" stroke="white" strokeWidth="1.5" />
                )
              ))}
            </svg>
          </div>

          {/* Bottom row: bar chart + table */}
          <div className="grid grid-cols-5 gap-2.5">

            {/* Bar chart */}
            <div className="col-span-2 bg-slate-50 rounded-xl p-2.5 border border-slate-100">
              <div className="text-[9px] font-semibold text-slate-700 mb-2">Monthly Sales</div>
              <div className="flex items-end gap-1 h-10">
                {barData.map((h, i) => (
                  <div key={i} className="flex-1 flex flex-col items-center gap-0.5">
                    <div
                      className="w-full rounded-t-sm transition-all"
                      style={{
                        height: `${(h / 100) * 36}px`,
                        background: i === 3 ? "#2563EB" : "#DBEAFE",
                      }}
                    />
                  </div>
                ))}
              </div>
              <div className="flex justify-between mt-1">
                {months.map((m) => (
                  <span key={m} className="flex-1 text-center text-[6px] text-slate-300 font-medium">{m}</span>
                ))}
              </div>
            </div>

            {/* Mini table */}
            <div className="col-span-3 bg-slate-50 rounded-xl p-2.5 border border-slate-100">
              <div className="text-[9px] font-semibold text-slate-700 mb-1.5">Top Products</div>
              <table className="w-full">
                <thead>
                  <tr>
                    <th className="text-left text-[7px] text-slate-400 font-medium pb-1">Product</th>
                    <th className="text-right text-[7px] text-slate-400 font-medium pb-1">Sales</th>
                    <th className="text-right text-[7px] text-slate-400 font-medium pb-1">Δ</th>
                  </tr>
                </thead>
                <tbody>
                  {tableRows.map((row, i) => (
                    <tr key={row.product} className={i < tableRows.length - 1 ? "border-b border-slate-100" : ""}>
                      <td className="text-[8px] font-medium text-slate-600 py-0.5">{row.product}</td>
                      <td className="text-[8px] font-semibold text-slate-700 py-0.5 text-right">{row.sales}</td>
                      <td className={`text-[8px] font-bold py-0.5 text-right ${row.growth.startsWith("+") ? "text-emerald-500" : "text-red-400"}`}>{row.growth}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      </div>

      {/* Floating bottom badge */}
      <div className="absolute -bottom-3 -left-2 z-20 bg-white rounded-xl border border-slate-200 shadow-md px-3.5 py-2 flex items-center gap-2">
        <div className="h-6 w-6 rounded-lg bg-blue-600 flex items-center justify-center">
          <BarChart3 className="h-3.5 w-3.5 text-white" />
        </div>
        <div>
          <div className="text-[9px] font-bold text-[#0F172A]">Power BI · SQL · Python</div>
          <div className="text-[8px] text-slate-400">Analytics Stack</div>
        </div>
      </div>
    </div>
  );
}

// ─── Hero section ─────────────────────────────────────────────────────────────

const badges = [
  "Data Analyst",
  "Power BI Specialist",
  "BI Developer",
  "Python & SQL",
  "Based in Vienna",
];

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-20 pb-16 bg-[#F8FAFC] relative overflow-hidden"
    >
      {/* Subtle dot grid background */}
      <div className="absolute inset-0 dot-bg opacity-60 pointer-events-none" />
      {/* Right-side tint */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-50/60 to-transparent pointer-events-none" />

      <div className="section-container relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── Left column ── */}
          <div className="max-w-xl">

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-7"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Open to freelance projects &amp; full-time roles
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
              className="text-4xl sm:text-5xl lg:text-[50px] font-extrabold text-[#0F172A] leading-[1.14] tracking-tight mb-5"
            >
              I turn raw data into{" "}
              <span className="text-blue-600">clear business decisions.</span>
            </motion.h1>

            {/* Subheadline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.16, ease: EASE }}
              className="text-[16px] text-slate-500 leading-relaxed mb-7"
            >
              I'm <span className="font-semibold text-slate-700">Zain Haidar</span>, a Data Analyst and Power BI Specialist based in Vienna. I help businesses clean, analyze, visualize, and understand their data using Power BI, SQL, Python, Tableau, and modern analytics tools.
            </motion.p>

            {/* Role badges */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.24, ease: EASE }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[12px] font-medium bg-white border border-slate-200 text-slate-600 shadow-sm"
                >
                  {badge === "Based in Vienna" && (
                    <MapPin className="h-3 w-3 text-blue-500" />
                  )}
                  {badge}
                </span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.32, ease: EASE }}
              className="flex flex-wrap gap-3"
            >
              <a
                href="#projects"
                onClick={(e) => {
                  e.preventDefault();
                  document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" });
                }}
                className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors duration-150 shadow-[0_4px_14px_rgba(37,99,235,0.25)]"
              >
                View Projects
                <ChevronRight className="h-4 w-4" />
              </a>
              <a
                href="/cv-zain-haidar.pdf"
                download
                className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-semibold text-[#0F172A] bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors duration-150 shadow-sm"
              >
                <Download className="h-4 w-4 text-blue-600" />
                Download CV
              </a>
            </motion.div>
          </div>

          {/* ── Right column — Dashboard visual ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: EASE }}
            className="hidden lg:flex justify-center items-center py-6"
          >
            <DashboardVisual />
          </motion.div>

        </div>
      </div>
    </section>
  );
}
