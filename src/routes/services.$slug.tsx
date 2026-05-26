import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { getServiceBySlug, Service } from "@/lib/api";
import { Loader2, AlertCircle, ArrowLeft, ArrowRight, CheckCircle2, HelpCircle, Laptop, Cpu, Settings, Database, TrendingUp, Sparkles, Activity, BarChart3 } from "lucide-react";
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



// Helper component to resolve service icons dynamically from string names in database
function ServiceIcon({ name, className }: { name?: string; className?: string }) {
  const iconName = name?.toLowerCase() || "";
  
  if (iconName.includes("database") || iconName.includes("sql")) {
    return <Database className={className} />;
  }
  if (iconName.includes("trend") || iconName.includes("forecasting") || iconName.includes("chart") || iconName.includes("line")) {
    return <TrendingUp className={className} />;
  }
  if (iconName.includes("automation") || iconName.includes("workflow") || iconName.includes("loop") || iconName.includes("cpu")) {
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

const getIconColorClass = (slug: string) => {
  const norm = slug.toLowerCase();
  if (norm.includes("dashboard")) return "text-blue-600 bg-blue-50 border-blue-100";
  if (norm.includes("sql")) return "text-violet-600 bg-violet-50 border-violet-100";
  return "text-emerald-600 bg-emerald-50 border-emerald-100";
};

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
            <h2 className="text-lg font-bold text-slate-800 mb-1">Service Not Found</h2>
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

  const iconColorClass = getIconColorClass(service.slug);

  return (
    <main className="bg-white min-h-screen flex flex-col font-poppins text-slate-800">
      <Header />
      
      <section className="pt-32 md:pt-40 pb-24 flex-grow animate-fade-in">
        <div className="mx-auto max-w-[800px] px-5 sm:px-8 space-y-16">
          
          {/* Back Navigation */}
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-wider text-slate-400 hover:text-blue-600 cursor-pointer transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Services
          </Link>

          {/* Hero Block (Open Layout) */}
          <div className="space-y-6 pt-4">
            <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-6 pb-6 border-b border-slate-100">
              <div className="space-y-3 flex-1">
                <span className="text-xs uppercase font-bold text-blue-600 tracking-widest">Services Catalog</span>
                <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#0F172A] tracking-tight leading-tight font-poppins">
                  {service.title}
                </h1>
              </div>
              <div className={`h-16 w-16 rounded-2xl border flex items-center justify-center shrink-0 shadow-xs ${iconColorClass}`}>
                <ServiceIcon name={service.icon} className="h-7 w-7 shrink-0" />
              </div>
            </div>

            {/* Short Description */}
            <p className="text-slate-550 text-base sm:text-lg leading-relaxed font-medium">
              {service.short_description}
            </p>

            {/* Hero CTAs */}
            <div className="flex flex-wrap gap-3 pt-4">
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition shadow-sm shadow-blue-500/10 cursor-pointer"
              >
                <span>Get Started</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
              <Link
                to="/services"
                className="inline-flex items-center gap-1.5 rounded-xl border border-slate-200 hover:bg-slate-50 text-slate-650 px-5 py-3.5 text-xs font-bold uppercase tracking-wider transition cursor-pointer"
              >
                Other Offerings
              </Link>
            </div>
          </div>

          {/* Overview Section */}
          <div className="space-y-4 pt-4 border-t border-slate-100">
            <div className="flex items-center gap-2.5">
              <HelpCircle className="h-5 w-5 text-blue-600 shrink-0" />
              <h2 className="font-bold text-xs sm:text-sm uppercase tracking-wider text-slate-900 font-poppins">Overview</h2>
            </div>
            <p className="text-slate-600 text-[14px] sm:text-base leading-relaxed font-semibold">
              {service.short_description}
            </p>
          </div>

          {/* Bottom CTA Block */}
          <div className="bg-[#0F172A] border border-slate-800 shadow-md rounded-3xl p-8 sm:p-12 text-white flex flex-col sm:flex-row justify-between items-center gap-8">
            <div className="space-y-2 text-center sm:text-left">
              <h4 className="font-bold text-base sm:text-lg">Ready to optimize your reporting with {service.title}?</h4>
              <p className="text-slate-400 text-xs font-semibold">{service.short_description}</p>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6 py-4 text-xs font-bold uppercase tracking-wider transition shadow-md shadow-blue-500/10 cursor-pointer self-stretch sm:self-auto justify-center"
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
