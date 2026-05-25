import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { BarChart3, Database, TrendingUp, ArrowLeft, ArrowRight, CheckCircle2, HelpCircle, Laptop, Cpu, Settings } from "lucide-react";
import { motion } from "framer-motion";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => {
    const titleMap: Record<string, string> = {
      "dashboard-automation": "Dashboard Automation & Business Intelligence — Zain Haidar",
      "sql-data-analysis": "SQL Data Analysis & Modeling — Zain Haidar",
      "forecasting-trend-analysis": "Forecasting & Predictive Analytics — Zain Haidar"
    };
    return {
      meta: [
        { title: titleMap[params.slug] || "Analytics Service Detail — Zain Haidar" },
        { name: "description", content: "Explore details, process workflows, and business outcomes for Zain Haidar's professional data analytics services." },
      ],
    };
  },
  component: ServiceDetailPage,
});

interface DetailedServiceData {
  title: string;
  slug: string;
  benefit: string;
  icon: any;
  iconColorClass: string;
  problem: string;
  helpList: string[];
  toolsDescription: Array<{ tool: string; desc: string }>;
  processSteps: Array<{ title: string; desc: string }>;
}

const detailedServices: Record<string, DetailedServiceData> = {
  "dashboard-automation": {
    title: "Dashboard Automation & Business Intelligence",
    slug: "dashboard-automation",
    benefit: "Interactive dashboards that cut your reporting time in half and enable live self-service querying.",
    icon: BarChart3,
    iconColorClass: "text-blue-600 bg-blue-50 border-blue-100",
    problem: "Executives and operational managers frequently spend up to 10 hours a week manually copying raw numbers between spreadsheets, leading to delayed reports, calculation discrepancies, and an inability to make critical tactical decisions when operational disruptions occur.",
    helpList: [
      "Automated Power BI dashboard suites configured with secure, direct cloud database connections.",
      "Clean, time-intelligent DAX calculation layers to trace year-over-year margins, customer behavior, and sales trends.",
      "Integrated star-schema database relationships linking operational, billing, and inventory tables.",
      "Configured cloud workspaces, automated refresh schedules, and secure stakeholder report sharing permissions."
    ],
    toolsDescription: [
      { tool: "Power BI & DAX", desc: "Used as the primary data modeling and reporting engine, writing optimized calculations that maintain instant filter responsiveness even across millions of rows." },
      { tool: "Power Query & M", desc: "Employed for robust upstream transformation steps to filter, pivot, and prep local spreadsheets before feeding the database models." },
      { tool: "SQL Server", desc: "Utilized to house, index, and organize key corporate datasets to guarantee 100% data integrity and single-second query speeds." }
    ],
    processSteps: [
      { title: "Understand the business problem", desc: "Align on critical operational metrics, core target KPI definitions, and exact user goal criteria." },
      { title: "Clean & analyse data", desc: "Query raw tables, eliminate data duplicates, and resolve structural margin or calculation discrepancies in SQL." },
      { title: "Build the dashboard", desc: "Construct optimized relational database schemas, design intuitive visual layouts, and write modular DAX formulas." },
      { title: "Iterate and deliver", desc: "Test query performance speeds across devices, polish responsive details, and transfer secure workspace control." }
    ]
  },
  "sql-data-analysis": {
    title: "SQL Data Analysis & Modeling",
    slug: "sql-data-analysis",
    benefit: "Clean databases and optimized queries that establish a single, reliable source of truth.",
    icon: Database,
    iconColorClass: "text-violet-600 bg-violet-50 border-violet-100",
    problem: "Transactional and customer data is often siloed across separate platforms, unformatted, and prone to duplicate entries. This makes it impossible for cross-functional teams to rely on reports, leading to database synchronization errors and misinformed operational choices.",
    helpList: [
      "Sanitized, integrated database schemas in PostgreSQL or SQL Server that serve as a single source of truth.",
      "Modular SQL data transformation views using Common Table Expressions (CTEs) and robust window functions.",
      "Automated data ingestion processes connecting third-party API payloads into structured database tables.",
      "Detailed database documentation, schema diagrams, and indexing protocols to optimize transaction latency."
    ],
    toolsDescription: [
      { tool: "SQL (PostgreSQL / SQL Server)", desc: "The primary tool used to write high-performance queries, optimize complex multi-table joins, and enforce database integrity rules." },
      { tool: "Python (Pandas & SQLAlchemy)", desc: "Employed to write custom scripts that extract messy transactional files, clean null data columns, and load them into relational databases." },
      { tool: "dbt (Data Build Tool)", desc: "Used to write modular, version-controlled database transformations that automatically validate structural constraints." }
    ],
    processSteps: [
      { title: "Map out database constraints", desc: "Define key tables, join logic, and source SaaS API connections to avoid redundant engineering overhead." },
      { title: "Ingest & extract data", desc: "Build Python ingestion scripts to fetch raw JSON/CSV feeds into staging tables securely." },
      { title: "Clean & model data", desc: "Write modular SQL views, optimize relational indexes, and resolve duplicate or invalid values." },
      { title: "Test & deploy", desc: "Enforce strict data-sanity validation rules, document the schemas, and establish automated scheduled loading." }
    ]
  },
  "forecasting-trend-analysis": {
    title: "Forecasting & Predictive Analytics",
    slug: "forecasting-trend-analysis",
    benefit: "Statistical trend modeling that identifies seasonal patterns and anticipates future customer demand.",
    icon: TrendingUp,
    iconColorClass: "text-emerald-600 bg-emerald-50 border-emerald-100",
    problem: "Organizations struggle to plan inventory capacity, staffing, or financial runway because they lack visibility into long-term demand trends and seasonal demand fluctuations, forcing them to operate reactively rather than proactively.",
    helpList: [
      "Historical time-series trend analysis reports outlining seasonality cycles, growth trends, and peak periods.",
      "Predictive capacity forecasting models developed in Python to anticipate future demand parameters.",
      "Customer lifetime value (CLV) cohort analysis to identify long-term high-value user clusters.",
      "Statistical regression analyses establishing correlations between marketing spend and sales conversions."
    ],
    toolsDescription: [
      { tool: "Python (Pandas, NumPy, statsmodels)", desc: "Used to conduct explorative statistical analyses, clean trend series, and build forecasting regression curves." },
      { tool: "SQL Analytics", desc: "Utilized to aggregate and window historical transactional logs across multi-year cycles to prepare clean data inputs." },
      { tool: "Tableau & Excel", desc: "Employed to construct interactive trend visualizations and scenario planning models for operational stakeholders." }
    ],
    processSteps: [
      { title: "Gather historical data", desc: "Aggregate multi-year operational records and identify crucial external factors affecting metrics." },
      { title: "Clean & analyse data", desc: "Clean anomalies, map seasonal spikes, and analyze correlation factors in Python statistical packages." },
      { title: "Model trend & forecast", desc: "Apply regression and time-series modeling curves to project future operational demand points." },
      { title: "Present and deliver", desc: "Build interactive scenario planners, write comprehensive executive summaries, and hand off predictive files." }
    ]
  }
};

function ServiceDetailPage() {
  const { slug } = Route.useParams();
  const service = detailedServices[slug];

  if (!service) {
    return (
      <main className="bg-[#F8FAFC] min-h-screen flex flex-col justify-between font-poppins text-slate-800">
        <Header />
        <div className="flex-grow flex items-center justify-center py-32 px-5">
          <div className="max-w-md p-8 bg-white border border-slate-200 rounded-3xl shadow-sm text-center space-y-5">
            <HelpCircle className="h-10 w-10 text-slate-400 mx-auto" />
            <div className="space-y-1">
              <h2 className="text-lg font-bold text-slate-800">Service Not Found</h2>
              <p className="text-xs text-slate-500 leading-normal font-semibold">
                The service capability requested does not exist or has been relocated.
              </p>
            </div>
            <Link 
              to="/services" 
              className="inline-flex justify-center w-full px-4 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-bold shadow-md transition cursor-pointer"
            >
              Back to Services
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const Icon = service.icon;

  return (
    <main className="bg-[#F8FAFC] min-h-screen flex flex-col font-poppins text-slate-800">
      <Header />
      
      <section className="pt-32 md:pt-40 pb-24 flex-grow">
        <div className="mx-auto max-w-[800px] px-5 sm:px-8 space-y-10">
          
          {/* Back Navigation */}
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-blue-600 cursor-pointer transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Services
          </Link>

          {/* Hero / Header Card */}
          <div className="bg-white border border-slate-200/50 shadow-xs rounded-3xl p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-4 flex-1">
              <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">Services Catalog</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight leading-snug">
                {service.title}
              </h1>
              
              {/* Highlighted Benefit Statement */}
              <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3 border-l-2 border-l-blue-600">
                <p className="text-[#0F172A] text-xs sm:text-[13px] font-bold leading-relaxed">
                  “{service.benefit}”
                </p>
              </div>

              {/* CTA trigger */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 text-xs font-bold uppercase tracking-wider transition shadow-sm shadow-blue-500/10 cursor-pointer"
                >
                  <span>Get Started</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-250 hover:bg-slate-50 text-slate-650 px-4 py-3 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                >
                  Other Offerings
                </Link>
              </div>
            </div>

            <div className={`h-16 w-16 rounded-2xl border flex items-center justify-center shrink-0 shadow-2xs ${service.iconColorClass}`}>
              <Icon className="h-6 w-6 shrink-0" />
            </div>
          </div>

          {/* Business Problem */}
          <div className="bg-white border border-slate-200/50 shadow-xs rounded-2xl p-6 sm:p-8 space-y-3">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <HelpCircle className="h-4 w-4 text-blue-600" />
              <h2 className="font-bold text-xs uppercase tracking-wider text-[#0F172A]">The Business Problem</h2>
            </div>
            <p className="text-slate-600 text-xs sm:text-[13.5px] leading-relaxed font-semibold">
              {service.problem}
            </p>
          </div>

          {/* What I Can Help With (Deliverables) */}
          <div className="bg-white border border-slate-200/50 shadow-xs rounded-2xl p-6 sm:p-8 space-y-4">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <CheckCircle2 className="h-4 w-4 text-blue-600" />
              <h2 className="font-bold text-xs uppercase tracking-wider text-[#0F172A]">What I Can Help With</h2>
            </div>
            <ul className="space-y-3">
              {service.helpList.map((item, idx) => (
                <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-[13px] text-slate-650 font-semibold leading-relaxed">
                  <span className="h-2 w-2 rounded-full bg-blue-500 mt-2 shrink-0 animate-pulse" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Approach */}
          <div className="bg-white border border-slate-200/50 shadow-xs rounded-2xl p-6 sm:p-8 space-y-5">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Laptop className="h-4 w-4 text-blue-600" />
              <h2 className="font-bold text-xs uppercase tracking-wider text-[#0F172A]">Tools &amp; Approach</h2>
            </div>
            <div className="grid gap-5">
              {service.toolsDescription.map((item, idx) => (
                <div key={idx} className="space-y-1 border-l-2 border-slate-100 pl-4 py-0.5 hover:border-blue-400 transition-colors">
                  <h4 className="font-bold text-slate-800 text-xs sm:text-[13px]">{item.tool}</h4>
                  <p className="text-slate-500 text-[11px] sm:text-[12px] leading-relaxed font-semibold">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Process Outline */}
          <div className="bg-white border border-slate-200/50 shadow-xs rounded-2xl p-6 sm:p-8 space-y-6">
            <div className="flex items-center gap-2 border-b border-slate-100 pb-3">
              <Cpu className="h-4 w-4 text-blue-600" />
              <h2 className="font-bold text-xs uppercase tracking-wider text-[#0F172A]">Process Outline</h2>
            </div>
            <div className="relative border-l border-slate-150 ml-3 pl-6 space-y-6">
              {service.processSteps.map((step, idx) => (
                <div key={idx} className="relative space-y-1">
                  {/* Number indicator */}
                  <div className="absolute -left-9 top-0.5 h-6 w-6 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-[11px] font-bold flex items-center justify-center font-mono">
                    {idx + 1}
                  </div>
                  <h4 className="font-bold text-slate-800 text-xs sm:text-[13px]">{step.title}</h4>
                  <p className="text-slate-400 text-xs font-semibold leading-relaxed">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA Block */}
          <div className="bg-[#0F172A] border border-slate-800 shadow-md rounded-3xl p-6 sm:p-10 text-white flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h4 className="font-bold text-base sm:text-lg">Ready to optimize your reporting?</h4>
              <p className="text-slate-400 text-xs font-semibold">Let's discuss how we can build automated pipelines tailored specifically to your datasets.</p>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-3.5 text-xs font-bold uppercase tracking-wider transition shadow-md shadow-blue-500/10 cursor-pointer self-stretch sm:self-auto justify-center"
            >
              <span>Contact Me</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
