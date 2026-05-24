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

// Generate realistic details based on slug
function getDetailedContent(slug: string, title: string) {
  const key = slug.toLowerCase();

  if (key.includes("power-bi") || key.includes("dashboard") || key.includes("bi")) {
    return {
      overview: "I design and build highly interactive, responsive Power BI dashboards to track business KPIs, sales performance, revenue trends, and operations metrics. By leveraging advanced DAX patterns, optimized schema designs, and Power Query preprocessing pipelines, I convert complex multi-table data into clean, recruiter-friendly visual stories.",
      helpList: [
        "Advanced DAX calculation layers (Time Intelligence, Year-over-Year margins, dynamic filtering).",
        "Power Query ETL modeling, schema cleanups, and star-schema optimization.",
        "Beautiful dashboard UI/UX styling tailored for executive decision-making.",
        "Automatic refresh cycles setup and report sharing configurations."
      ],
      tools: ["Power BI Desktop", "DAX", "Power Query", "Excel", "SQL Server"]
    };
  }

  if (key.includes("etl") || key.includes("clean") || key.includes("transform") || key.includes("automation")) {
    return {
      overview: "Clean data is the foundation of all robust business decisions. I engineer automated ETL (Extract, Transform, Load) pipelines to preprocess, structure, and sanitize spreadsheets, raw CSVs, or unorganized databases. Using Python and SQL, I eliminate manual data cleanup tasks, merge siloed data streams, and build scheduled data refresh scripts.",
      helpList: [
        "Automated python scripts to sanitize, clean, and format raw spreadsheets.",
        "Siloed datasets consolidation and clean data schemas creation.",
        "Scheduled data loading pipelines setup connecting to SQL databases.",
        "Data validation constraints and automated check logs to ensure database sanity."
      ],
      tools: ["Python", "Pandas", "SQL", "PostgreSQL", "dbt", "Github Actions"]
    };
  }

  if (key.includes("web") || key.includes("frontend") || key.includes("app") || key.includes("solution")) {
    return {
      overview: "For businesses that require customized dashboard solutions beyond standard tools, I develop lightweight, analytics-focused web applications. By utilizing web frameworks like Django and Flask combined with standard Javascript frontend interfaces, I build secure dashboard platforms, data collection APIs, and interactive tools.",
      helpList: [
        "Analytics dashboard portals with client authentication gates.",
        "Custom APIs development to fetch, load, or query database records.",
        "Responsive, modern charts integration (Recharts, Chart.js) into frontend code.",
        "Database connections (PostgreSQL, SQLite) mapping and migration workflows."
      ],
      tools: ["Python", "Django", "Flask", "JavaScript", "HTML5 & Tailwind CSS", "Git"]
    };
  }

  // Default / Data Analysis & SQL / Forecasting
  return {
    overview: "I perform in-depth SQL and Python-based data analysis to query, join, clean, and extract actionable insights from business databases. My approach goes beyond standard counts to perform trend analysis, historical forecasting, and granular deep-dives that help stakeholders plan effectively.",
    helpList: [
      "Complex SQL queries formulation involving multi-table joins, subqueries, and window functions.",
      "Exploratory Data Analysis (EDA) in Python using statistical modules.",
      "Trend analysis and historical forecasting reports identifying growth variables.",
      "Data summaries, spreadsheet metrics dashboards, and recurring analysis automation."
    ],
    tools: ["SQL Server", "PostgreSQL", "Python", "Jupyter Notebooks", "Excel (Advanced)"]
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
        setService(data);
        setError(null);
      } catch (err: any) {
        console.error("Failed to load service detail post:", err);
        setError("Failed to load service details.");
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
        <div className="flex-grow flex flex-col items-center justify-center gap-3 py-32">
          <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
          <span className="text-xs font-semibold text-slate-450">Loading service offering details...</span>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !service) {
    return (
      <main className="bg-[#F8FAFC] min-h-screen flex flex-col justify-between font-poppins text-slate-800">
        <Header />
        <div className="flex-grow flex items-center justify-center py-32">
          <div className="max-w-md p-6 bg-white border border-slate-200 rounded-3xl shadow-sm text-center">
            <AlertCircle className="h-10 w-10 text-rose-500 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-slate-800 mb-1">Service not found.</h2>
            <p className="text-xs text-slate-500 mb-6 leading-normal font-semibold">
              The service capability requested does not exist or has been disabled.
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

  const details = getDetailedContent(service.slug, service.title);

  return (
    <main className="bg-[#F8FAFC] min-h-screen flex flex-col font-poppins text-slate-800">
      <Header />
      
      <section className="pt-32 md:pt-40 pb-24 flex-grow animate-fade-in">
        <div className="mx-auto max-w-[800px] px-5 sm:px-8 space-y-10">
          
          {/* Back Navigation */}
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-blue-600 mb-4 cursor-pointer transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Services
          </Link>

          {/* Heading Block */}
          <div className="bg-white border border-slate-200/50 shadow-xs rounded-3xl p-6 sm:p-10 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6">
            <div className="space-y-3">
              <span className="text-[10px] uppercase font-bold text-blue-600 tracking-wider">Consulting Domain</span>
              <h1 className="text-2xl sm:text-3xl font-extrabold text-[#0F172A] tracking-tight leading-snug">
                {service.title}
              </h1>
              <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed font-semibold italic">
                "{service.short_description}"
              </p>
            </div>

            <div className="h-16 w-16 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center shrink-0 shadow-2xs">
              <ServiceIcon name={service.icon} className="h-6 w-6 shrink-0" />
            </div>
          </div>

          {/* Detailed sections */}
          <div className="space-y-8">
            
            {/* Overview */}
            <div className="bg-white border border-slate-200/50 shadow-xs rounded-2xl p-6 space-y-3">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#0F172A] border-b border-slate-100 pb-2">Overview</h3>
              <p className="text-slate-650 text-xs sm:text-[13px] leading-relaxed font-semibold">
                {details.overview}
              </p>
            </div>

            {/* Help List */}
            <div className="bg-white border border-slate-200/50 shadow-xs rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#0F172A] border-b border-slate-100 pb-2">What I Can Help With</h3>
              <ul className="space-y-3">
                {details.helpList.map((item, idx) => (
                  <li key={idx} className="flex gap-2.5 items-start text-xs sm:text-[13px] text-slate-650 font-semibold leading-relaxed">
                    <CheckCircle className="h-4.5 w-4.5 text-blue-600 shrink-0 mt-0.5" />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>

            {/* Tools & Approach */}
            <div className="bg-white border border-slate-200/50 shadow-xs rounded-2xl p-6 space-y-4">
              <h3 className="font-bold text-xs uppercase tracking-wider text-[#0F172A] border-b border-slate-100 pb-2">Tools & Stack</h3>
              <div className="flex flex-wrap gap-1.5">
                {details.tools.map((tool, idx) => (
                  <span 
                    key={idx}
                    className="px-2.5 py-1 rounded-full bg-slate-50 border border-slate-200 text-[10px] text-slate-650 font-bold uppercase tracking-wider"
                  >
                    {tool}
                  </span>
                ))}
              </div>
            </div>

            {/* Call to Action */}
            <div className="bg-[#0F172A] border border-slate-800 shadow-md rounded-3xl p-6 sm:p-10 text-white flex flex-col sm:flex-row justify-between items-center gap-6">
              <div className="space-y-2 text-center sm:text-left">
                <h4 className="font-bold text-base sm:text-lg">Need custom consulting?</h4>
                <p className="text-slate-400 text-xs font-semibold">Let's discuss your database queries, pipelines, or dashboards.</p>
              </div>

              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-3 text-xs font-bold uppercase tracking-wider transition shadow-md shadow-blue-500/10 cursor-pointer self-stretch sm:self-auto justify-center"
              >
                <span>Start a Project</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </div>

          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
