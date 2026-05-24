import { motion } from "framer-motion";
import { ArrowUpRight, BarChart3, Users, Database, MessageSquare } from "lucide-react";

const projects = [
  {
    id: "1",
    icon: BarChart3,
    category: "Business Intelligence",
    categoryColor: "blue",
    title: "Power BI Sales Performance Dashboard",
    description:
      "A comprehensive dashboard for tracking revenue, product performance, customer trends, and sales KPIs across multiple regions and channels.",
    tags: ["Power BI", "DAX", "Power Query", "Excel"],
    accentBg: "bg-blue-50",
    accentBorder: "border-blue-100",
    chartPreview: "sales",
  },
  {
    id: "2",
    icon: Users,
    category: "Data Analysis",
    categoryColor: "indigo",
    title: "Customer Segmentation Analysis",
    description:
      "Python and SQL analysis to identify customer groups, buying behavior, lifetime value, and campaign targeting opportunities.",
    tags: ["Python", "SQL", "Pandas", "Matplotlib"],
    accentBg: "bg-indigo-50",
    accentBorder: "border-indigo-100",
    chartPreview: "segment",
  },
  {
    id: "3",
    icon: Database,
    category: "Data Engineering",
    categoryColor: "violet",
    title: "ETL Pipeline for Reporting Automation",
    description:
      "An automated workflow to clean, validate, transform, and load business data from multiple sources into a single reporting-ready layer.",
    tags: ["Python", "SQL", "ETL", "Azure"],
    accentBg: "bg-violet-50",
    accentBorder: "border-violet-100",
    chartPreview: "etl",
  },
  {
    id: "4",
    icon: MessageSquare,
    category: "NLP / Data Analysis",
    categoryColor: "sky",
    title: "Enron Emails Dataset Analysis",
    description:
      "Exploratory analysis of over 500,000 email records — uncovering communication patterns, topic clusters, and network relationships using NLP.",
    tags: ["Python", "SQL", "NLP", "SQLite"],
    accentBg: "bg-sky-50",
    accentBorder: "border-sky-100",
    chartPreview: "nlp",
  },
];

const categoryBadgeColors: Record<string, string> = {
  blue:   "bg-blue-50 text-blue-700 border-blue-200",
  indigo: "bg-indigo-50 text-indigo-700 border-indigo-200",
  violet: "bg-violet-50 text-violet-700 border-violet-200",
  sky:    "bg-sky-50 text-sky-700 border-sky-200",
};

// Mini dashboard preview per project
function ChartPreview({ type }: { type: string }) {
  if (type === "sales") {
    const bars = [60, 80, 55, 95, 70, 85, 90];
    return (
      <div className="flex items-end gap-1.5 h-16 px-1">
        {bars.map((h, i) => (
          <div key={i} className="flex-1">
            <div
              className={`w-full rounded-t ${i === 3 ? "bg-blue-500" : "bg-blue-200"}`}
              style={{ height: `${(h / 100) * 56}px` }}
            />
          </div>
        ))}
      </div>
    );
  }
  if (type === "segment") {
    return (
      <div className="flex items-center justify-center h-16 gap-3">
        {[
          { size: 48, color: "bg-indigo-500", label: "High Value" },
          { size: 36, color: "bg-indigo-300", label: "Mid Tier" },
          { size: 28, color: "bg-indigo-100", label: "Churned" },
        ].map((d) => (
          <div key={d.label} className="flex flex-col items-center gap-1">
            <div className={`rounded-full ${d.color}`} style={{ width: d.size, height: d.size }} />
            <span className="text-[8px] text-slate-400 font-medium">{d.label}</span>
          </div>
        ))}
      </div>
    );
  }
  if (type === "etl") {
    return (
      <div className="flex items-center justify-center h-16 gap-2">
        {["Extract", "→", "Transform", "→", "Load"].map((step, i) => (
          <div key={i} className={`${step === "→" ? "text-slate-300 font-bold text-lg" : "px-2.5 py-1 rounded-lg text-[9px] font-semibold bg-violet-100 text-violet-700 border border-violet-200"}`}>
            {step}
          </div>
        ))}
      </div>
    );
  }
  // NLP
  const words = [
    { w: "finance", s: 1.0 }, { w: "trading", s: 0.7 }, { w: "email", s: 0.85 },
    { w: "risk", s: 0.6 }, { w: "market", s: 0.9 }, { w: "analysis", s: 0.75 },
  ];
  return (
    <div className="flex flex-wrap gap-1.5 items-center justify-center h-16 px-2">
      {words.map((w) => (
        <span
          key={w.w}
          className="px-2 py-0.5 rounded bg-sky-100 text-sky-700 font-medium"
          style={{ fontSize: `${Math.round(w.s * 11)}px` }}
        >
          {w.w}
        </span>
      ))}
    </div>
  );
}

export function Projects() {
  return (
    <section id="projects" className="py-24 bg-[#F8FAFC]">
      <div className="section-container">
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5 }}
          className="text-center mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">Portfolio</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight">Featured Projects</h2>
          <p className="mt-4 text-[15px] text-slate-400 max-w-lg mx-auto leading-relaxed">
            A selection of analytics and BI projects built for real business challenges.
          </p>
        </motion.div>

        {/* Project cards */}
        <div className="grid md:grid-cols-2 gap-6">
          {projects.map((project, i) => {
            const Icon = project.icon;
            const badgeClass = categoryBadgeColors[project.categoryColor];
            return (
              <motion.div
                key={project.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="card-pro flex flex-col overflow-hidden group"
              >
                {/* Visual preview area */}
                <div className={`${project.accentBg} border-b ${project.accentBorder} px-6 py-4`}>
                  <ChartPreview type={project.chartPreview} />
                </div>

                {/* Content */}
                <div className="p-6 flex flex-col flex-1">
                  <div className="flex items-start justify-between gap-3 mb-3">
                    <div className="flex items-center gap-2.5">
                      <div className={`h-8 w-8 rounded-lg ${project.accentBg} border ${project.accentBorder} flex items-center justify-center shrink-0`}>
                        <Icon className="h-4 w-4 text-slate-600" />
                      </div>
                      <span className={`text-[11px] font-semibold px-2 py-0.5 rounded border ${badgeClass}`}>
                        {project.category}
                      </span>
                    </div>
                  </div>

                  <h3 className="font-bold text-[#0F172A] text-[16px] leading-snug mb-2.5 group-hover:text-blue-600 transition-colors">
                    {project.title}
                  </h3>

                  <p className="text-sm text-slate-500 leading-relaxed mb-5 flex-1">
                    {project.description}
                  </p>

                  <div className="flex flex-wrap gap-1.5 mb-5">
                    {project.tags.map((tag) => (
                      <span key={tag} className="badge-navy">{tag}</span>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors w-fit"
                  >
                    View Case Study
                    <ArrowUpRight className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
