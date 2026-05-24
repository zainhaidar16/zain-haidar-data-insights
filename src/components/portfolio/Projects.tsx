import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowUpRight, AlertCircle, Inbox } from "lucide-react";
import { getProjects, Project } from "@/lib/api";

const EASE = [0.25, 0.1, 0.25, 1] as const;

// ─── Color map ────────────────────────────────────────────────────────────────

type ColorKey = "blue" | "sky" | "indigo" | "violet" | "amber" | "emerald";

const colorMap: Record<
  ColorKey,
  { badge: string; previewBg: string; previewBorder: string; accent: string; accentLight: string }
> = {
  blue:    { badge: "bg-blue-50 text-blue-700 border-blue-200",     previewBg: "bg-blue-50",    previewBorder: "border-blue-100",    accent: "#2563EB", accentLight: "#DBEAFE" },
  sky:     { badge: "bg-sky-50 text-sky-700 border-sky-200",       previewBg: "bg-sky-50",     previewBorder: "border-sky-100",     accent: "#0EA5E9", accentLight: "#E0F2FE" },
  indigo:  { badge: "bg-indigo-50 text-indigo-700 border-indigo-200", previewBg: "bg-indigo-50", previewBorder: "border-indigo-100", accent: "#6366F1", accentLight: "#E0E7FF" },
  violet:  { badge: "bg-violet-50 text-violet-700 border-violet-200", previewBg: "bg-violet-50", previewBorder: "border-violet-100", accent: "#7C3AED", accentLight: "#EDE9FE" },
  amber:   { badge: "bg-amber-50 text-amber-700 border-amber-200",  previewBg: "bg-amber-50",   previewBorder: "border-amber-100",   accent: "#D97706", accentLight: "#FEF3C7" },
  emerald: { badge: "bg-emerald-50 text-emerald-700 border-emerald-200", previewBg: "bg-emerald-50", previewBorder: "border-emerald-100", accent: "#059669", accentLight: "#D1FAE5" },
};

// Helper to determine color layout dynamically
const getProjectDesign = (slug: string, index: number) => {
  const normalized = slug.toLowerCase();
  let colorKey: ColorKey = "blue";
  let visualType = "kpi";

  if (normalized.includes("kpi")) {
    colorKey = "blue";
    visualType = "kpi";
  } else if (normalized.includes("retail") || normalized.includes("sales")) {
    colorKey = "sky";
    visualType = "retail";
  } else if (normalized.includes("segment")) {
    colorKey = "indigo";
    visualType = "segment";
  } else if (normalized.includes("etl") || normalized.includes("pipeline")) {
    colorKey = "violet";
    visualType = "etl";
  } else if (normalized.includes("forecast") || normalized.includes("trend")) {
    colorKey = "amber";
    visualType = "forecast";
  } else if (normalized.includes("web") || normalized.includes("app")) {
    colorKey = "emerald";
    visualType = "webapp";
  } else {
    // Round-robin fallback
    const keys: ColorKey[] = ["blue", "sky", "indigo", "violet", "amber", "emerald"];
    const visuals = ["kpi", "retail", "segment", "etl", "forecast", "webapp"];
    colorKey = keys[index % keys.length];
    visualType = visuals[index % visuals.length];
  }

  return { colorKey, visualType };
};

// ─── Dashboard preview visuals ────────────────────────────────────────────────

function KpiVisual({ accent, light }: { accent: string; light: string }) {
  const bars = [55, 72, 60, 88, 65, 80];
  return (
    <div className="w-full h-full flex flex-col gap-2 p-1">
      {/* KPI strip */}
      <div className="grid grid-cols-3 gap-1.5">
        {[{ l: "Revenue", v: "$2.4M" }, { l: "Orders", v: "1,840" }, { l: "Growth", v: "+14%" }].map((k) => (
          <div key={k.l} className="rounded-md p-1.5" style={{ background: light }}>
            <div className="text-[8px] font-medium" style={{ color: accent }}>{k.v}</div>
            <div className="text-[7px] text-slate-400">{k.l}</div>
          </div>
        ))}
      </div>
      {/* Bar chart */}
      <div className="flex items-end gap-1 flex-1 px-0.5">
        {bars.map((h, i) => (
          <div key={i} className="flex-1 rounded-t-sm" style={{ height: `${(h / 100) * 38}px`, background: i === 3 ? accent : light, border: `1px solid ${light}` }} />
        ))}
      </div>
    </div>
  );
}

function RetailVisual({ accent, light }: { accent: string; light: string }) {
  const pts = [28, 38, 32, 50, 42, 58, 52, 65];
  const W = 220, H = 55;
  const pathD = pts.map((y, i) => `${i === 0 ? "M" : "L"}${(i / (pts.length - 1)) * W},${H - y}`).join(" ");
  const areaD = `M0,${H} ${pts.map((y, i) => `L${(i / (pts.length - 1)) * W},${H - y}`).join(" ")} L${W},${H} Z`;
  return (
    <div className="w-full h-full p-1 flex flex-col gap-1.5">
      <div className="flex justify-between items-center">
        <span className="text-[9px] font-semibold text-slate-600">Monthly Revenue</span>
        <span className="text-[8px] px-1.5 py-0.5 rounded-full font-semibold" style={{ background: light, color: accent }}>+18%</span>
      </div>
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="flex-1">
        <defs>
          <linearGradient id={`rg-${accent.replace("#","")}`} x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor={accent} stopOpacity="0.18" />
            <stop offset="100%" stopColor={accent} stopOpacity="0" />
          </linearGradient>
        </defs>
        <path d={areaD} fill={`url(#rg-${accent.replace("#","")})`} />
        <path d={pathD} fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {pts.map((y, i) => <circle key={i} cx={(i / (pts.length - 1)) * W} cy={H - y} r="2.5" fill={accent} stroke="white" strokeWidth="1.5" />)}
      </svg>
      <div className="flex justify-between">
        {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug"].map(m => <span key={m} className="text-[7px] text-slate-300 font-medium">{m}</span>)}
      </div>
    </div>
  );
}

function SegmentVisual({ accent, light }: { accent: string; light: string }) {
  const bubbles = [
    { cx: 42, cy: 30, r: 18, label: "High Value", opacity: 1 },
    { cx: 90, cy: 44, r: 14, label: "Mid Tier",   opacity: 0.65 },
    { cx: 138, cy: 26, r: 10, label: "At Risk",   opacity: 0.4 },
    { cx: 175, cy: 40, r: 8,  label: "Churned",   opacity: 0.25 },
  ];
  return (
    <div className="w-full h-full p-1 flex flex-col gap-1">
      <div className="flex justify-between items-center">
        <span className="text-[9px] font-semibold text-slate-600">Customer Segments</span>
        <span className="text-[8px] text-slate-400">4 clusters</span>
      </div>
      <svg width="100%" height="54" viewBox="0 0 220 60" className="flex-1">
        {bubbles.map((b) => (
          <g key={b.label}>
            <circle cx={b.cx} cy={b.cy} r={b.r} fill={accent} opacity={b.opacity} />
            <text x={b.cx} y={b.cy + b.r + 8} textAnchor="middle" fontSize="6" fill="#94A3B8" fontFamily="Poppins, sans-serif">{b.label}</text>
          </g>
        ))}
      </svg>
    </div>
  );
}

function EtlVisual({ accent, light }: { accent: string; light: string }) {
  const steps = ["Extract", "Clean", "Transform", "Load"];
  return (
    <div className="w-full h-full p-2 flex flex-col justify-center gap-3">
      <span className="text-[9px] font-semibold text-slate-600">ETL Pipeline</span>
      <div className="flex items-center gap-1">
        {steps.map((step, i) => (
          <div key={step} className="flex items-center gap-1 flex-1">
            <div className="flex-1 text-center py-1.5 rounded-md text-[8px] font-semibold" style={{ background: light, color: accent }}>
              {step}
            </div>
            {i < steps.length - 1 && (
              <svg width="12" height="10" viewBox="0 0 12 10" className="shrink-0">
                <path d="M0 5 L8 5 M5 2 L8 5 L5 8" stroke={accent} strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        ))}
      </div>
      <div className="flex gap-1">
        {["CSV", "JSON", "SQL DB", "API"].map(src => (
          <span key={src} className="flex-1 text-center text-[7px] py-0.5 rounded border font-medium text-slate-400 border-slate-200 bg-slate-50">{src}</span>
        ))}
      </div>
    </div>
  );
}

function ForecastVisual({ accent, light }: { accent: string; light: string }) {
  const actual = [30, 38, 35, 48, 44, 55, 52, 60];
  const forecast = [60, 65, 70, 76];
  const W = 220, H = 55;
  const allPts = [...actual, ...forecast];
  const toX = (i: number) => (i / (allPts.length - 1)) * W;
  const toY = (v: number) => H - (v / 90) * H;
  const actPath = actual.map((v, i) => `${i === 0 ? "M" : "L"}${toX(i)},${toY(v)}`).join(" ");
  const splitX = toX(actual.length - 1);
  const fcPath = forecast.map((v, i) => `${i === 0 ? "M" : "L"}${toX(actual.length - 1 + i)},${toY(v)}`).join(" ");
  return (
    <div className="w-full h-full p-1 flex flex-col gap-1">
      <div className="flex items-center justify-between">
        <span className="text-[9px] font-semibold text-slate-600">Trend & Forecast</span>
        <div className="flex items-center gap-2">
          <span className="flex items-center gap-0.5 text-[7px] text-slate-400"><span className="inline-block w-4 h-0.5 rounded" style={{ background: accent }} /> Actual</span>
          <span className="flex items-center gap-0.5 text-[7px] text-slate-400"><span className="inline-block w-4 h-0.5 rounded border border-dashed" style={{ borderColor: accent }} /> Forecast</span>
        </div>
      </div>
      <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" className="flex-1">
        {/* forecast shaded area */}
        <rect x={splitX} y="0" width={W - splitX} height={H} fill={light} opacity="0.5" />
        {/* actual line */}
        <path d={actPath} fill="none" stroke={accent} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* forecast dashed line */}
        <path d={fcPath} fill="none" stroke={accent} strokeWidth="2" strokeDasharray="4 3" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    </div>
  );
}

function WebAppVisual({ accent, light }: { accent: string; light: string }) {
  return (
    <div className="w-full h-full p-1.5 flex flex-col gap-1.5">
      {/* Browser chrome */}
      <div className="rounded-md border border-slate-200 overflow-hidden">
        <div className="flex items-center gap-1 px-2 py-1 bg-slate-100 border-b border-slate-200">
          <div className="h-1.5 w-1.5 rounded-full bg-red-300" />
          <div className="h-1.5 w-1.5 rounded-full bg-amber-300" />
          <div className="h-1.5 w-1.5 rounded-full bg-emerald-300" />
          <div className="ml-2 h-2 flex-1 rounded-sm bg-slate-200" />
        </div>
        <div className="p-2 bg-white flex gap-2">
          {/* sidebar */}
          <div className="flex flex-col gap-1 w-10">
            {[100, 70, 85, 60].map((w, i) => <div key={i} className="h-1.5 rounded-sm" style={{ width: `${w}%`, background: i === 0 ? accent : light }} />)}
          </div>
          {/* content area */}
          <div className="flex-1 flex flex-col gap-1">
            <div className="h-1.5 rounded-sm bg-slate-100 w-3/4" />
            <div className="grid grid-cols-3 gap-1 mt-0.5">
              {[0,1,2].map(i => <div key={i} className="h-5 rounded-sm" style={{ background: i === 0 ? light : "#F1F5F9" }} />)}
            </div>
            <div className="h-1.5 rounded-sm bg-slate-100 w-full" />
            <div className="h-1.5 rounded-sm bg-slate-100 w-5/6" />
          </div>
        </div>
      </div>
      <div className="flex gap-1">
        {["Python", "Flask", "REST API"].map(tag => (
          <span key={tag} className="text-[7px] font-semibold px-1.5 py-0.5 rounded" style={{ background: light, color: accent }}>{tag}</span>
        ))}
      </div>
    </div>
  );
}

function ProjectVisual({ type, colorKey }: { type: string; colorKey: ColorKey }) {
  const c = colorMap[colorKey];
  const props = { accent: c.accent, light: c.accentLight };
  switch (type) {
    case "kpi":     return <KpiVisual {...props} />;
    case "retail":  return <RetailVisual {...props} />;
    case "segment": return <SegmentVisual {...props} />;
    case "etl":     return <EtlVisual {...props} />;
    case "forecast":return <ForecastVisual {...props} />;
    case "webapp":  return <WebAppVisual {...props} />;
    default:        return null;
  }
}

// ─── Main section ─────────────────────────────────────────────────────────────

export function Projects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadProjects() {
      try {
        setLoading(true);
        const data = await getProjects();
        setProjects(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load projects");
      } finally {
        setLoading(false);
      }
    }
    loadProjects();
  }, []);

  return (
    <section id="projects" className="py-24 bg-[#F8FAFC] border-t border-slate-100">
      <div className="section-container">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">Portfolio</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight mb-4">
            Featured Projects
          </h2>
          <p className="text-[15px] text-slate-500 leading-relaxed max-w-2xl">
            Selected projects based on dashboard development, data analysis, ETL workflows, forecasting, and analytics web solutions.
          </p>
        </motion.div>

        {/* LOADING STATE */}
        {loading && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <div key={i} className="card-pro flex flex-col overflow-hidden animate-pulse">
                <div className="h-[110px] bg-slate-100 w-full" />
                <div className="p-5 space-y-4">
                  <div className="h-6 bg-slate-200 rounded w-1/3" />
                  <div className="h-5 bg-slate-100 rounded w-5/6" />
                  <div className="h-4 bg-slate-100 rounded w-full" />
                  <div className="h-4 bg-slate-100 rounded w-2/3" />
                  <div className="flex gap-2">
                    <div className="h-6 bg-slate-100 rounded w-12" />
                    <div className="h-6 bg-slate-100 rounded w-12" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ERROR STATE */}
        {error && !loading && (
          <div className="p-6 bg-rose-50 border border-rose-100 rounded-xl flex items-start gap-3.5 max-w-2xl mx-auto">
            <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-rose-800 text-sm">Failed to Load Projects</h4>
              <p className="text-xs text-rose-600 mt-1 leading-normal">{error}</p>
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && projects.length === 0 && (
          <div className="py-16 text-center max-w-md mx-auto">
            <div className="h-12 w-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-4">
              <Inbox className="h-5 w-5 text-slate-400" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">No Projects Found</h4>
            <p className="text-xs text-slate-500 leading-normal">
              No projects found.
            </p>
          </div>
        )}

        {/* PROJECT GRID */}
        {!loading && !error && projects.length > 0 && (
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {projects.map((project, i) => {
              const { colorKey, visualType } = getProjectDesign(project.slug, i);
              const c = colorMap[colorKey];

              return (
                <motion.div
                  key={project.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.45, delay: i * 0.07, ease: EASE }}
                  className="card-pro flex flex-col overflow-hidden group"
                >
                  {/* Dashboard preview area */}
                  <div className={`${c.previewBg} border-b ${c.previewBorder} px-4 py-3 h-[110px] flex items-center`}>
                    <ProjectVisual type={visualType} colorKey={colorKey} />
                  </div>

                  {/* Card content */}
                  <div className="p-5 flex flex-col flex-1 gap-3">
                    {/* Category badge */}
                    <span className={`self-start text-[10px] font-semibold px-2.5 py-0.5 rounded border ${c.badge}`}>
                      {project.category}
                    </span>

                    {/* Title */}
                    <h3 className="font-bold text-[#0F172A] text-[15px] leading-snug group-hover:text-blue-600 transition-colors duration-150">
                      {project.title}
                    </h3>

                    {/* Description */}
                    <p className="text-[13px] text-slate-500 leading-relaxed flex-1 line-clamp-3">
                      {project.short_description}
                    </p>

                    {/* Technologies */}
                    {project.technologies && project.technologies.length > 0 && (
                      <div className="flex flex-wrap gap-1.5">
                        {project.technologies.map((tag) => (
                          <span key={tag} className="badge-navy text-[10px]">{tag}</span>
                        ))}
                      </div>
                    )}

                    {/* CTA */}
                    <div className="pt-1 border-t border-slate-100">
                      <a
                        href={`/projects/${project.slug}`}
                        className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-blue-600 hover:text-blue-700 transition-colors duration-150 mt-1 cursor-pointer"
                      >
                        View Case Study
                        <ArrowUpRight className="h-3.5 w-3.5" />
                      </a>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
