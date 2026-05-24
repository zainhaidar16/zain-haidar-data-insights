import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { getServiceBySlug, Service } from "@/lib/api";
import { Loader2, AlertCircle, ArrowLeft, Settings, Database, TrendingUp, Cpu, BarChart3, Sparkles, Activity, CheckCircle, ArrowRight } from "lucide-react";

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => ({
    meta: [
      { title: `${params.slug.replace(/-/g, " ").toUpperCase()} Services — Zain The Analyst` },
      { name: "description", content: "Professional consulting details and analytical tools outline." },
    ],
  }),
  component: ServiceDetailPage,
});

// Helper component to resolve service icons dynamically from string names in database
function ServiceIcon({ name, className }: { name?: string; className?: string }) {
  const iconName = name?.toLowerCase() || "";
  
  if (iconName.includes("database") || iconName.includes("sql")) {
    return <Database className={className} />;
  }
  if (iconName.includes("trend") || iconName.includes("forecasting") || iconName.includes("chart") || iconName.includes("line")) {
    return <TrendingUp className={className} />;
  }
  if (iconName.includes("automation") || iconName.includes("workflow") || iconName.includes("loop")) {
    return <Cpu className={className} />;
  }
  if (iconName.includes("dashboard") || iconName.includes("bi") || iconName.includes("power")) {
    return <BarChart3 className={className} />;
  }
  if (iconName.includes("sparkles") || iconName.includes("ai") || iconName.includes("magic")) {
    return <Sparkles className={className} />;
  }
  if (iconName.includes("active") || iconName.includes("check")) {
    return <Activity className={className} />;
  }
  
  return <Settings className={className} />;
}

// Professional dynamic content generator based on service title and slug
function getDynamicServiceDetails(slug: string, title: string) {
  const key = slug.toLowerCase() + " " + title.toLowerCase();
  
  if (key.includes("power-bi") || key.includes("dashboard") || key.includes("bi") || key.includes("report")) {
    return {
      overview: "A professional Business Intelligence (BI) service centered around converting complex, fragmented data points into interactive, high-performance dashboards. Using advanced modeling and visualization best practices, this service helps organizations monitor key performance indicators (KPIs) in real time to make data-driven decisions.",
      helpList: [
        "Design clear, modern, and user-friendly dashboard interfaces aligned with corporate brand guidelines.",
        "Formulate optimized DAX calculations layers for complex time-intelligence and dynamic margin analysis.",
        "Structure robust star schemas inside Power BI linking multi-table data sources.",
        "Set up secure report sharing workflows, automated refresh cycles, and workspaces gateways."
      ],
      tools: ["Power BI", "DAX", "Power Query", "Excel", "SQL"]
    };
  }

  if (key.includes("etl") || key.includes("pipeline") || key.includes("clean") || key.includes("data-engineering") || key.includes("engineering")) {
    return {
      overview: "An engineering-focused service designed to construct automated Extract, Transform, and Load (ETL) data pipelines. Messy, unorganized raw files (such as spreadsheets, CSVs, or JSON API payloads) are cleaned, consolidated, and structured into sanitary databases, eliminating manual labor and data inconsistencies.",
      helpList: [
        "Develop automated Python scripts using Pandas to sanitize, cleanse, and structure messy sheets.",
        "Write highly efficient SQL queries to consolidate siloted data tables.",
        "Enforce strict validation constraints and automated check logs to ensure database sanity.",
        "Create scheduled data loader scripts to automatically refresh downstream tables."
      ],
      tools: ["SQL", "Python", "ETL", "PostgreSQL", "Power Query", "Excel"]
    };
  }

  if (key.includes("solution") || key.includes("web") || key.includes("app") || key.includes("automation")) {
    return {
      overview: "A customized software development service tailored for companies requiring bespoke analytics platforms beyond standard off-the-shelf BI tools. By building lightweight, fast web applications, this service provides automated reporting tools, client portals, and customizable visualization solutions.",
      helpList: [
        "Develop secure analytics dashboard portals using modern Python frameworks like Django or Flask.",
        "Connect relational database systems (PostgreSQL, SQLite) directly with web layouts.",
        "Integrate responsive interactive charts (Chart.js, Recharts) to provide bespoke views.",
        "Build secure, modular REST APIs to dynamically query, fetch, or load business metrics."
      ],
      tools: ["Django", "Flask", "Python", "SQL", "Tableau", "Excel"]
    };
  }

  // Default: Data Analysis & SQL / Forecasting
  return {
    overview: "An analytical service aimed at conducting in-depth database queries, explorative analysis, and operational reporting. By using SQL and Python statistical libraries, we query relational tables to outline trends, identify anomalies, and uncover growth vectors for planning and forecasting.",
    helpList: [
      "Formulate complex SQL queries using window functions, Common Table Expressions (CTEs), and multi-table joins.",
      "Conduct Exploratory Data Analysis (EDA) in Jupyter Notebooks to discover hidden patterns.",
      "Outline growth, operational bottlenecks, and historical trend indicators.",
      "Generate clean summaries, visual reports, and advanced Excel metric models for stakeholders."
    ],
    tools: ["SQL", "Python", "Excel", "PostgreSQL", "Tableau", "Power Query"]
  };
}

function ServiceDetailPage() {
  const { slug } = Route.useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadService() {
      try {
        setLoading(true);
        const data = await getServiceBySlug(slug);
        console.log("Route slug:", slug);
        console.log("Fetched service:", data);
        setService(data);
        setError(null);
      } catch (err: any) {
        console.error("Failed to load service detail post:", err);
        setError(err.message || "Failed to load service details.");
      } finally {
        setLoading(false);
      }
    }
    loadService();
  }, [slug]);

  if (loading) {
    return (
      <main className="bg-[#F8FAFC] min-h-screen flex flex-col justify-between font-poppins text-slate-800">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center gap-3 py-32 animate-pulse">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600 mb-1" />
          <span className="text-xs font-semibold text-slate-500">Loading...</span>
        </div>
        <Footer />
      </main>
    );
  }

  if (error) {
    return (
      <main className="bg-[#F8FAFC] min-h-screen flex flex-col justify-between font-poppins text-slate-800">
        <Header />
        <div className="flex-grow flex items-center justify-center py-32">
          <div className="max-w-md p-6 bg-white border border-slate-200 rounded-3xl shadow-sm text-center">
            <AlertCircle className="h-10 w-10 text-rose-500 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-slate-800 mb-1">Failed to load service details.</h2>
            <p className="text-xs text-rose-600 mb-6 leading-normal font-semibold">
              {error}
            </p>
            <Link to="/services" className="inline-flex justify-center px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition cursor-pointer">
              Back to Services
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  if (!service) {
    return (
      <main className="bg-[#F8FAFC] min-h-screen flex flex-col justify-between font-poppins text-slate-800">
        <Header />
        <div className="flex-grow flex items-center justify-center py-32">
          <div className="max-w-md p-6 bg-white border border-slate-200 rounded-3xl shadow-sm text-center">
            <AlertCircle className="h-10 w-10 text-rose-500 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-slate-800 mb-1">Not found.</h2>
            <p className="text-xs text-slate-550 mb-6 leading-normal font-semibold">
              The service capability requested does not exist.
            </p>
            <Link to="/services" className="inline-flex justify-center px-4 py-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white text-xs font-semibold shadow-md transition cursor-pointer">
              Back to Services
            </Link>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // Get dynamic details safely based on Supabase database values
  const details = getDynamicServiceDetails(service.slug, service.title);
  const processSteps = [
    { title: "Understand the business problem", desc: "Align on business constraints, core target metrics, and exact dashboard queries requirements." },
    { title: "Review and clean the data", desc: "Sanitize spreadsheets, perform SQL joins, eliminate duplicates, and construct robust databases." },
    { title: "Build the dashboard, analysis, or workflow", desc: "Develop clean DAX layers, optimized database pipelines, or analytics web views." },
    { title: "Test and improve the result", desc: "Validate calculations accuracy, optimize query response times, and polish mobile responsive styling." },
    { title: "Deliver clear insights", desc: "Transfer report ownership, deliver training documentation, and present finalized business findings." }
  ];

  return (
    <main className="bg-[#F8FAFC] min-h-screen flex flex-col font-poppins text-slate-800">
      <Header />
      
      <section className="pt-32 md:pt-40 pb-24 flex-grow animate-fade-in">
        <div className="mx-auto max-w-[800px] px-5 sm:px-8 space-y-8">
          
          {/* Back Navigation Button */}
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-blue-600 mb-2 cursor-pointer transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Services
          </Link>

          {/* Hero Section */}
          <div className="bg-white border border-slate-200/50 shadow-xs rounded-3xl p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-3.5 flex-1">
              <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">Consulting Domain</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight leading-snug">
                {service.title}
              </h1>
              <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed font-semibold italic">
                "{service.short_description}"
              </p>
              
              {/* Hero CTA buttons */}
              <div className="flex flex-wrap gap-2.5 pt-2">
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4.5 py-2.5 text-xs font-bold uppercase tracking-wider transition shadow-sm shadow-blue-500/10 cursor-pointer"
                >
                  <span>Start a Project</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
                <Link
                  to="/services"
                  className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-650 px-4 py-2.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
                >
                  Back to Services
                </Link>
              </div>
            </div>

            <div className="h-16 w-16 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs">
              <ServiceIcon name={service.icon} className="h-6 w-6 shrink-0" />
            </div>
          </div>

          {/* Overview Section */}
          <div className="bg-white border border-slate-200/50 shadow-xs rounded-2xl p-6 sm:p-8 space-y-3">
            <h2 className="font-bold text-xs uppercase tracking-wider text-[#0F172A] border-b border-slate-100 pb-2">Overview</h2>
            <p className="text-slate-650 text-xs sm:text-[13px] leading-relaxed font-semibold">
              {details.overview}
            </p>
          </div>

          {/* What I Can Help With Section */}
          <div className="bg-white border border-slate-200/50 shadow-xs rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="font-bold text-xs uppercase tracking-wider text-[#0F172A] border-b border-slate-100 pb-2">What I Can Help With</h2>
            <ul className="space-y-3">
              {details.helpList.map((item, idx) => (
                <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-[13px] text-slate-650 font-semibold leading-relaxed">
                  <CheckCircle className="h-4.5 w-4.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{item}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Tools & Approach Section */}
          <div className="bg-white border border-slate-200/50 shadow-xs rounded-2xl p-6 sm:p-8 space-y-4">
            <h2 className="font-bold text-xs uppercase tracking-wider text-[#0F172A] border-b border-slate-100 pb-2">Tools & Approach</h2>
            <div className="flex flex-wrap gap-1.5">
              {details.tools.map((tool, idx) => (
                <span 
                  key={idx}
                  className="px-2.5 py-1 rounded bg-slate-50 border border-slate-200 text-[10px] text-slate-650 font-bold uppercase tracking-wider"
                >
                  {tool}
                </span>
              ))}
            </div>
          </div>

          {/* Process Section */}
          <div className="bg-white border border-slate-200/50 shadow-xs rounded-2xl p-6 sm:p-8 space-y-5">
            <h2 className="font-bold text-xs uppercase tracking-wider text-[#0F172A] border-b border-slate-100 pb-2">Process</h2>
            <div className="relative border-l border-slate-150 ml-2.5 pl-5.5 space-y-6">
              {processSteps.map((step, idx) => (
                <div key={idx} className="relative space-y-1">
                  {/* Number indicator */}
                  <div className="absolute -left-8.5 top-0.5 h-6 w-6 rounded-full border border-blue-200 bg-blue-50 text-blue-600 text-[11px] font-bold flex items-center justify-center font-mono">
                    {idx + 1}
                  </div>
                  <h4 className="font-bold text-slate-800 text-[13px]">{step.title}</h4>
                  <p className="text-slate-400 text-xs font-semibold leading-normal">{step.desc}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Bottom CTA Section */}
          <div className="bg-[#0F172A] border border-slate-800 shadow-md rounded-3xl p-6 sm:p-10 text-white flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h4 className="font-bold text-base sm:text-lg">Need help with this?</h4>
              <p className="text-slate-400 text-xs font-semibold">Let's discuss how we can build optimized, secure dashboard workflows tailored for you.</p>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 text-xs font-bold uppercase tracking-wider transition shadow-md shadow-blue-500/10 cursor-pointer self-stretch sm:self-auto justify-center"
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
