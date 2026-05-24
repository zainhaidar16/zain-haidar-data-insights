import { useState, useMemo } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  BarChart,
  Bar,
  LineChart,
  Line,
  ComposedChart,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import { TrendingUp, TrendingDown, DollarSign, Percent, Users, ArrowUpRight, Filter } from "lucide-react";

// Types
type MetricType = "revenue" | "profit" | "customers" | "conversion";
type YearType = "2023" | "2024" | "2025";
type SectorType = "All" | "Retail" | "SaaS" | "Healthcare";

// Mock Data Builder
const rawDashboardData = {
  "2023": {
    All: [
      { name: "Jan", revenue: 45000, profit: 32, customers: 1200, conversion: 2.1 },
      { name: "Feb", revenue: 52000, profit: 34, customers: 1350, conversion: 2.3 },
      { name: "Mar", revenue: 49000, profit: 33, customers: 1400, conversion: 2.2 },
      { name: "Apr", revenue: 63000, profit: 36, customers: 1650, conversion: 2.5 },
      { name: "May", revenue: 58000, profit: 35, customers: 1800, conversion: 2.4 },
      { name: "Jun", revenue: 71000, profit: 38, customers: 2100, conversion: 2.8 },
      { name: "Jul", revenue: 78000, profit: 39, customers: 2300, conversion: 2.9 },
      { name: "Aug", revenue: 74000, profit: 37, customers: 2450, conversion: 2.7 },
      { name: "Sep", revenue: 85000, profit: 41, customers: 2800, conversion: 3.1 },
      { name: "Oct", revenue: 91000, profit: 42, customers: 3100, conversion: 3.3 },
      { name: "Nov", revenue: 88000, profit: 40, customers: 3250, conversion: 3.2 },
      { name: "Dec", revenue: 105000, profit: 45, customers: 3700, conversion: 3.6 },
    ],
    Retail: [
      { name: "Jan", revenue: 25000, profit: 22, customers: 600, conversion: 1.8 },
      { name: "Feb", revenue: 29000, profit: 24, customers: 680, conversion: 2.0 },
      { name: "Mar", revenue: 26000, profit: 23, customers: 710, conversion: 1.9 },
      { name: "Apr", revenue: 38000, profit: 26, customers: 850, conversion: 2.2 },
      { name: "May", revenue: 33000, profit: 25, customers: 920, conversion: 2.1 },
      { name: "Jun", revenue: 42000, profit: 28, customers: 1100, conversion: 2.4 },
      { name: "Jul", revenue: 48000, profit: 29, customers: 1250, conversion: 2.6 },
      { name: "Aug", revenue: 44000, profit: 27, customers: 1320, conversion: 2.4 },
      { name: "Sep", revenue: 53000, profit: 31, customers: 1500, conversion: 2.7 },
      { name: "Oct", revenue: 58000, profit: 32, customers: 1680, conversion: 2.9 },
      { name: "Nov", revenue: 55000, profit: 30, customers: 1750, conversion: 2.8 },
      { name: "Dec", revenue: 72000, profit: 35, customers: 2100, conversion: 3.3 },
    ],
    SaaS: [
      { name: "Jan", revenue: 12000, profit: 68, customers: 400, conversion: 2.9 },
      { name: "Feb", revenue: 14000, profit: 69, customers: 450, conversion: 3.1 },
      { name: "Mar", revenue: 15000, profit: 68, customers: 480, conversion: 3.0 },
      { name: "Apr", revenue: 17000, profit: 70, customers: 550, conversion: 3.4 },
      { name: "May", revenue: 18000, profit: 69, customers: 610, conversion: 3.3 },
      { name: "Jun", revenue: 20000, profit: 72, customers: 700, conversion: 3.7 },
      { name: "Jul", revenue: 21000, profit: 73, customers: 750, conversion: 3.8 },
      { name: "Aug", revenue: 21500, profit: 71, customers: 800, conversion: 3.6 },
      { name: "Sep", revenue: 23000, profit: 75, customers: 920, conversion: 4.1 },
      { name: "Oct", revenue: 24000, profit: 76, customers: 1020, conversion: 4.3 },
      { name: "Nov", revenue: 24500, profit: 74, customers: 1100, conversion: 4.2 },
      { name: "Dec", revenue: 26000, profit: 78, customers: 1200, conversion: 4.7 },
    ],
    Healthcare: [
      { name: "Jan", revenue: 8000, profit: 12, customers: 200, conversion: 1.2 },
      { name: "Feb", revenue: 9000, profit: 14, customers: 220, conversion: 1.4 },
      { name: "Mar", revenue: 8000, profit: 13, customers: 210, conversion: 1.3 },
      { name: "Apr", revenue: 8000, profit: 15, customers: 250, conversion: 1.5 },
      { name: "May", revenue: 7000, profit: 14, customers: 270, conversion: 1.4 },
      { name: "Jun", revenue: 9000, profit: 16, customers: 300, conversion: 1.7 },
      { name: "Jul", revenue: 9000, profit: 17, customers: 300, conversion: 1.8 },
      { name: "Aug", revenue: 8500, profit: 15, customers: 330, conversion: 1.6 },
      { name: "Sep", revenue: 9000, profit: 18, customers: 380, conversion: 1.9 },
      { name: "Oct", revenue: 9000, profit: 19, customers: 400, conversion: 2.0 },
      { name: "Nov", revenue: 8500, profit: 18, customers: 400, conversion: 1.9 },
      { name: "Dec", revenue: 7000, profit: 21, customers: 400, conversion: 2.2 },
    ]
  },
  "2024": {
    All: [
      { name: "Jan", revenue: 108000, profit: 44, customers: 3800, conversion: 3.5 },
      { name: "Feb", revenue: 112000, profit: 46, customers: 3950, conversion: 3.7 },
      { name: "Mar", revenue: 119000, profit: 45, customers: 4120, conversion: 3.6 },
      { name: "Apr", revenue: 135000, profit: 48, customers: 4450, conversion: 4.0 },
      { name: "May", revenue: 128000, profit: 47, customers: 4600, conversion: 3.9 },
      { name: "Jun", revenue: 148000, profit: 50, customers: 5100, conversion: 4.4 },
      { name: "Jul", revenue: 152000, profit: 52, customers: 5350, conversion: 4.5 },
      { name: "Aug", revenue: 146000, profit: 49, customers: 5500, conversion: 4.2 },
      { name: "Sep", revenue: 168000, profit: 53, customers: 6050, conversion: 4.8 },
      { name: "Oct", revenue: 175000, profit: 55, customers: 6400, conversion: 5.1 },
      { name: "Nov", revenue: 170000, profit: 52, customers: 6650, conversion: 4.9 },
      { name: "Dec", revenue: 198000, profit: 58, customers: 7400, conversion: 5.7 },
    ],
    Retail: [
      { name: "Jan", revenue: 74000, profit: 34, customers: 2150, conversion: 3.2 },
      { name: "Feb", revenue: 76000, profit: 36, customers: 2280, conversion: 3.4 },
      { name: "Mar", revenue: 81000, profit: 35, customers: 2380, conversion: 3.3 },
      { name: "Apr", revenue: 94000, profit: 38, customers: 2600, conversion: 3.7 },
      { name: "May", revenue: 88000, profit: 37, customers: 2710, conversion: 3.6 },
      { name: "Jun", revenue: 104000, profit: 40, customers: 3050, conversion: 4.1 },
      { name: "Jul", revenue: 107000, profit: 41, customers: 3200, conversion: 4.2 },
      { name: "Aug", revenue: 101000, profit: 39, customers: 3280, conversion: 3.9 },
      { name: "Sep", revenue: 118000, profit: 43, customers: 3650, conversion: 4.5 },
      { name: "Oct", revenue: 122000, profit: 44, customers: 3880, conversion: 4.7 },
      { name: "Nov", revenue: 117000, profit: 42, customers: 4020, conversion: 4.5 },
      { name: "Dec", revenue: 139000, profit: 48, customers: 4500, conversion: 5.3 },
    ],
    SaaS: [
      { name: "Jan", revenue: 26800, profit: 79, customers: 1250, conversion: 4.8 },
      { name: "Feb", revenue: 28000, profit: 80, customers: 1320, conversion: 5.0 },
      { name: "Mar", revenue: 29500, profit: 79, customers: 1380, conversion: 4.9 },
      { name: "Apr", revenue: 32000, profit: 82, customers: 1500, conversion: 5.4 },
      { name: "May", revenue: 31800, profit: 81, customers: 1540, conversion: 5.3 },
      { name: "Jun", revenue: 35000, profit: 84, customers: 1700, conversion: 5.8 },
      { name: "Jul", revenue: 36200, profit: 85, customers: 1780, conversion: 5.9 },
      { name: "Aug", revenue: 36500, profit: 83, customers: 1840, conversion: 5.7 },
      { name: "Sep", revenue: 40000, profit: 86, customers: 2020, conversion: 6.3 },
      { name: "Oct", revenue: 42000, profit: 87, customers: 2150, conversion: 6.6 },
      { name: "Nov", revenue: 43000, profit: 86, customers: 2250, conversion: 6.5 },
      { name: "Dec", revenue: 47000, profit: 89, customers: 2500, conversion: 7.2 },
    ],
    Healthcare: [
      { name: "Jan", revenue: 7200, profit: 22, customers: 400, conversion: 2.1 },
      { name: "Feb", revenue: 8000, profit: 24, customers: 350, conversion: 2.3 },
      { name: "Mar", revenue: 8500, profit: 23, customers: 360, conversion: 2.2 },
      { name: "Apr", revenue: 9000, profit: 25, customers: 350, conversion: 2.5 },
      { name: "May", revenue: 8200, profit: 24, customers: 350, conversion: 2.4 },
      { name: "Jun", revenue: 9000, profit: 27, customers: 350, conversion: 2.8 },
      { name: "Jul", revenue: 8800, profit: 28, customers: 370, conversion: 2.9 },
      { name: "Aug", revenue: 8500, profit: 26, customers: 380, conversion: 2.7 },
      { name: "Sep", revenue: 10000, profit: 29, customers: 380, conversion: 3.1 },
      { name: "Oct", revenue: 11000, profit: 30, customers: 370, conversion: 3.3 },
      { name: "Nov", revenue: 10000, profit: 28, customers: 380, conversion: 3.2 },
      { name: "Dec", revenue: 12000, profit: 33, customers: 400, conversion: 3.8 },
    ]
  },
  "2025": {
    All: [
      { name: "Jan", revenue: 202000, profit: 57, customers: 7600, conversion: 5.6 },
      { name: "Feb", revenue: 215000, profit: 59, customers: 7900, conversion: 5.8 },
      { name: "Mar", revenue: 228000, profit: 58, customers: 8250, conversion: 5.7 },
      { name: "Apr", revenue: 254000, profit: 61, customers: 8800, conversion: 6.2 },
      { name: "May", revenue: 242000, profit: 60, customers: 9100, conversion: 6.0 },
      { name: "Jun", revenue: 278000, profit: 64, customers: 10100, conversion: 6.7 },
      { name: "Jul", revenue: 288000, profit: 66, customers: 10500, conversion: 6.9 },
      { name: "Aug", revenue: 274000, profit: 63, customers: 10900, conversion: 6.5 },
      { name: "Sep", revenue: 312000, profit: 68, customers: 12000, conversion: 7.3 },
      { name: "Oct", revenue: 325000, profit: 70, customers: 12600, conversion: 7.6 },
      { name: "Nov", revenue: 318000, profit: 67, customers: 13200, conversion: 7.4 },
      { name: "Dec", revenue: 365000, profit: 73, customers: 14500, conversion: 8.4 },
    ],
    Retail: [
      { name: "Jan", revenue: 142000, profit: 49, customers: 4600, conversion: 5.2 },
      { name: "Feb", revenue: 151000, profit: 51, customers: 4800, conversion: 5.4 },
      { name: "Mar", revenue: 160000, profit: 50, customers: 5050, conversion: 5.3 },
      { name: "Apr", revenue: 179000, profit: 53, customers: 5400, conversion: 5.8 },
      { name: "May", revenue: 169000, profit: 52, customers: 5600, conversion: 5.6 },
      { name: "Jun", revenue: 196000, profit: 56, customers: 6250, conversion: 6.3 },
      { name: "Jul", revenue: 202000, profit: 58, customers: 6500, conversion: 6.5 },
      { name: "Aug", revenue: 192000, profit: 55, customers: 6750, conversion: 6.1 },
      { name: "Sep", revenue: 220000, profit: 60, customers: 7500, conversion: 6.9 },
      { name: "Oct", revenue: 229000, profit: 62, customers: 7900, conversion: 7.2 },
      { name: "Nov", revenue: 223000, profit: 59, customers: 8300, conversion: 7.0 },
      { name: "Dec", revenue: 259000, profit: 65, customers: 9200, conversion: 8.0 },
    ],
    SaaS: [
      { name: "Jan", revenue: 48000, profit: 89, customers: 2600, conversion: 7.2 },
      { name: "Feb", revenue: 51500, profit: 90, customers: 2700, conversion: 7.5 },
      { name: "Mar", revenue: 54000, profit: 89, customers: 2800, conversion: 7.4 },
      { name: "Apr", revenue: 60000, profit: 91, customers: 3000, conversion: 7.9 },
      { name: "May", revenue: 59500, profit: 90, customers: 3100, conversion: 7.7 },
      { name: "Jun", revenue: 66000, profit: 92, customers: 3400, conversion: 8.4 },
      { name: "Jul", revenue: 69000, profit: 93, customers: 3500, conversion: 8.6 },
      { name: "Aug", revenue: 68500, profit: 91, customers: 3650, conversion: 8.2 },
      { name: "Sep", revenue: 76000, profit: 94, customers: 4000, conversion: 9.1 },
      { name: "Oct", revenue: 79000, profit: 95, customers: 4200, conversion: 9.4 },
      { name: "Nov", revenue: 80000, profit: 94, customers: 4400, conversion: 9.2 },
      { name: "Dec", revenue: 87000, profit: 96, customers: 4800, conversion: 10.0 },
    ],
    Healthcare: [
      { name: "Jan", revenue: 12000, profit: 33, customers: 400, conversion: 3.5 },
      { name: "Feb", revenue: 12500, profit: 35, customers: 400, conversion: 3.7 },
      { name: "Mar", revenue: 14000, profit: 34, customers: 400, conversion: 3.6 },
      { name: "Apr", revenue: 15000, profit: 36, customers: 400, conversion: 4.0 },
      { name: "May", revenue: 13500, profit: 35, customers: 400, conversion: 3.9 },
      { name: "Jun", revenue: 16000, profit: 38, customers: 450, conversion: 4.4 },
      { name: "Jul", revenue: 17000, profit: 39, customers: 500, conversion: 4.5 },
      { name: "Aug", revenue: 13500, profit: 37, customers: 500, conversion: 4.2 },
      { name: "Sep", revenue: 16000, profit: 40, customers: 500, conversion: 4.8 },
      { name: "Oct", revenue: 17000, profit: 41, customers: 500, conversion: 5.1 },
      { name: "Nov", revenue: 15000, profit: 39, customers: 500, conversion: 4.9 },
      { name: "Dec", revenue: 19000, profit: 44, customers: 500, conversion: 5.7 },
    ]
  }
};

export function InteractiveDashboard() {
  const [metric, setMetric] = useState<MetricType>("revenue");
  const [year, setYear] = useState<YearType>("2025");
  const [sector, setSector] = useState<SectorType>("All");

  // Filtered dataset
  const activeData = useMemo(() => {
    return rawDashboardData[year][sector];
  }, [year, sector]);

  // Aggregate numbers
  const aggregates = useMemo(() => {
    const totalRev = activeData.reduce((acc, curr) => acc + curr.revenue, 0);
    const avgProfit = Math.round(activeData.reduce((acc, curr) => acc + curr.profit, 0) / activeData.length);
    const maxCust = activeData[activeData.length - 1].customers;
    const avgConv = (activeData.reduce((acc, curr) => acc + curr.conversion, 0) / activeData.length).toFixed(1);

    return {
      revenue: `$${totalRev.toLocaleString()}`,
      profit: `${avgProfit}%`,
      customers: maxCust.toLocaleString(),
      conversion: `${avgConv}%`,
    };
  }, [activeData]);

  // Metric visual configuration
  const metricConfigs = {
    revenue: {
      title: "Total Revenue",
      value: aggregates.revenue,
      trend: "+28% YoY",
      trendUp: true,
      icon: DollarSign,
      color: "#06b6d4",
      gradient: ["rgba(6, 182, 212, 0.2)", "rgba(6, 182, 212, 0.0)"],
    },
    profit: {
      title: "Avg Profit Margin",
      value: aggregates.profit,
      trend: "+14% YoY",
      trendUp: true,
      icon: Percent,
      color: "#6366f1",
      gradient: ["rgba(99, 102, 241, 0.2)", "rgba(99, 102, 241, 0.0)"],
    },
    customers: {
      title: "Active Customers",
      value: aggregates.customers,
      trend: "+42% YoY",
      trendUp: true,
      icon: Users,
      color: "#d946ef",
      gradient: ["rgba(217, 70, 239, 0.2)", "rgba(217, 70, 239, 0.0)"],
    },
    conversion: {
      title: "Conversion Rate",
      value: aggregates.conversion,
      trend: "-2% YoY",
      trendUp: false,
      icon: ArrowUpRight,
      color: "#f59e0b",
      gradient: ["rgba(245, 158, 11, 0.2)", "rgba(245, 158, 11, 0.0)"],
    },
  };

  const currentConf = metricConfigs[metric];

  return (
    <section className="relative py-20 bg-background overflow-hidden border-t border-border">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[400px] rounded-full bg-primary/5 blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 text-[10px] font-mono tracking-widest text-accent uppercase mb-3">
              <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
              Live Interactive Proof
            </div>
            <h2 className="font-serif-display text-[28px] sm:text-[38px] leading-tight tracking-[-0.03em] max-w-xl">
              Fully interactive dashboard built entirely in React.
            </h2>
            <p className="mt-3 text-muted-foreground text-[14px] leading-relaxed max-w-lg">
              Don't just take my word for it. Filter by year, segment, and toggle key metrics below to see how I connect, clean, and visualize complex datasets in real time.
            </p>
          </div>

          {/* Elegant Translucent Filters */}
          <div className="flex flex-wrap items-center gap-4 bg-white/5 border border-border/80 rounded-2xl p-3 backdrop-blur-md">
            <div className="flex items-center gap-2 text-xs font-mono text-muted-foreground uppercase border-r border-border/60 pr-4">
              <Filter className="h-3.5 w-3.5 text-accent" /> Filter data
            </div>

            {/* Year Selector */}
            <div className="flex rounded-lg bg-black/40 border border-border/60 p-0.5">
              {(["2023", "2024", "2025"] as YearType[]).map((y) => (
                <button
                  key={y}
                  onClick={() => setYear(y)}
                  className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider rounded-md transition ${
                    year === y ? "bg-gradient-primary text-white" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {y}
                </button>
              ))}
            </div>

            {/* Segment Selector */}
            <div className="flex rounded-lg bg-black/40 border border-border/60 p-0.5">
              {(["All", "Retail", "SaaS", "Healthcare"] as SectorType[]).map((s) => (
                <button
                  key={s}
                  onClick={() => setSector(s)}
                  className={`px-3 py-1.5 text-[11px] font-mono uppercase tracking-wider rounded-md transition ${
                    sector === s ? "bg-gradient-primary text-white" : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  {s}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Dashboard Grid Workspace */}
        <div className="grid lg:grid-cols-12 gap-6 items-stretch">
          {/* Metrics KPIs Side Column */}
          <div className="lg:col-span-4 grid sm:grid-cols-2 lg:grid-cols-1 gap-4">
            {(Object.keys(metricConfigs) as MetricType[]).map((key) => {
              const cfg = metricConfigs[key];
              const Icon = cfg.icon;
              const isSelected = metric === key;
              return (
                <button
                  key={key}
                  onClick={() => setMetric(key)}
                  className={`glass rounded-2xl p-5 text-left transition-all duration-300 relative overflow-hidden group ${
                    isSelected ? "border-accent/40 bg-accent/[0.03] scale-[0.99] shadow-glow" : "glass-hover"
                  }`}
                >
                  <div className="flex justify-between items-start mb-3">
                    <div
                      className={`h-9 w-9 rounded-xl flex items-center justify-center border transition-all ${
                        isSelected ? "bg-accent/15 border-accent/30 text-accent" : "bg-white/5 border-border text-muted-foreground"
                      }`}
                    >
                      <Icon className="h-4.5 w-4.5" />
                    </div>
                    <span
                      className={`font-mono text-[10px] tracking-wider uppercase px-2 py-0.5 rounded border ${
                        cfg.trendUp
                          ? "border-emerald-500/20 text-emerald-400 bg-emerald-500/5"
                          : "border-amber-500/20 text-amber-400 bg-amber-500/5"
                      }`}
                    >
                      {cfg.trendUp ? <TrendingUp className="h-3 w-3 inline mr-1" /> : <TrendingDown className="h-3 w-3 inline mr-1" />}
                      {cfg.trend}
                    </span>
                  </div>

                  <div className="text-muted-foreground uppercase font-mono tracking-widest text-[9px] mb-1">
                    {cfg.title}
                  </div>
                  <div className="font-serif-display text-2xl font-bold text-foreground">
                    {cfg.value}
                  </div>

                  {/* Aesthetic visual side active lines */}
                  {isSelected && (
                    <div className="absolute left-0 top-0 bottom-0 w-[3px] bg-accent" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Master Animated High Fidelity Chart Panel */}
          <div className="lg:col-span-8 glass rounded-3xl p-6 relative overflow-hidden border border-border shadow-card flex flex-col justify-between min-h-[400px]">
            <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/20 to-transparent" />
            
            <div className="flex justify-between items-center mb-6 border-b border-border/40 pb-4">
              <div>
                <span className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent">Real-time render view</span>
                <h3 className="font-serif-display text-xl mt-0.5">
                  {currentConf.title} over {year} ({sector} Sector)
                </h3>
              </div>
              <div className="text-right font-mono text-xs text-muted-foreground">
                Updated just now · React Charting
              </div>
            </div>

            {/* Render proper graph according to selected metric */}
            <div className="flex-1 w-full h-[300px] mt-2 select-none">
              <ResponsiveContainer width="100%" height="100%">
                <AnimatePresence mode="wait">
                  {metric === "revenue" ? (
                    <AreaChart data={activeData} key="revenue">
                      <defs>
                        <linearGradient id="colorRev" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor={currentConf.color} stopOpacity={0.25} />
                          <stop offset="95%" stopColor={currentConf.color} stopOpacity={0.0} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `$${v / 1000}k`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(10, 15, 30, 0.95)",
                          border: "1px solid rgba(255,255,255,0.09)",
                          borderRadius: "12px",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                          color: "#f8fafc"
                        }}
                        formatter={(val: number) => [`$${val.toLocaleString()}`, "Revenue"]}
                      />
                      <Area type="monotone" dataKey="revenue" stroke={currentConf.color} strokeWidth={2.5} fillOpacity={1} fill="url(#colorRev)" />
                    </AreaChart>
                  ) : metric === "profit" ? (
                    <BarChart data={activeData} key="profit">
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(10, 15, 30, 0.95)",
                          border: "1px solid rgba(255,255,255,0.09)",
                          borderRadius: "12px",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                          color: "#f8fafc"
                        }}
                        formatter={(val: number) => [`${val}%`, "Profit Margin"]}
                      />
                      <Bar dataKey="profit" fill={currentConf.color} radius={[4, 4, 0, 0]} maxBarSize={30} />
                    </BarChart>
                  ) : metric === "customers" ? (
                    <LineChart data={activeData} key="customers">
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(10, 15, 30, 0.95)",
                          border: "1px solid rgba(255,255,255,0.09)",
                          borderRadius: "12px",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                          color: "#f8fafc"
                        }}
                        formatter={(val: number) => [val.toLocaleString(), "Active Customers"]}
                      />
                      <Line type="monotone" dataKey="customers" stroke={currentConf.color} strokeWidth={2.5} dot={{ stroke: currentConf.color, strokeWidth: 2, r: 3 }} activeDot={{ r: 5 }} />
                    </LineChart>
                  ) : (
                    <ComposedChart data={activeData} key="conversion">
                      <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.03)" vertical={false} />
                      <XAxis dataKey="name" stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} />
                      <YAxis stroke="#64748b" fontSize={11} tickLine={false} axisLine={false} tickFormatter={(v) => `${v}%`} />
                      <Tooltip
                        contentStyle={{
                          backgroundColor: "rgba(10, 15, 30, 0.95)",
                          border: "1px solid rgba(255,255,255,0.09)",
                          borderRadius: "12px",
                          boxShadow: "0 10px 25px rgba(0,0,0,0.5)",
                          color: "#f8fafc"
                        }}
                        formatter={(val: number) => [`${val}%`, "Conversion Rate"]}
                      />
                      <Bar dataKey="conversion" fill="rgba(245, 158, 11, 0.15)" stroke="rgba(245, 158, 11, 0.3)" maxBarSize={30} />
                      <Line type="monotone" dataKey="conversion" stroke={currentConf.color} strokeWidth={2.5} dot={false} />
                    </ComposedChart>
                  )}
                </AnimatePresence>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
