import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { getServices, Service } from "@/lib/api";
import { Loader2, AlertCircle, Inbox, Settings, Activity, Cpu, Sparkles, TrendingUp, BarChart3, Database } from "lucide-react";

export const Route = createFileRoute("/services")({
  head: () => ({
    meta: [
      { title: "Analytics Consulting Services — Zain The Analyst" },
      { name: "description", content: "Professional Business Intelligence, data queries cleaning, metrics tracking, and analytics web dashboards by Zain Haidar." },
    ],
  }),
  component: ServicesPage,
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

function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadServicesData() {
      try {
        setLoading(true);
        const data = await getServices();
        setServices(data);
        setError(null);
      } catch (err: any) {
        setError(err.message || "Failed to load services");
      } finally {
        setLoading(false);
      }
    }
    loadServicesData();
  }, []);

  return (
    <main className="bg-[#F8FAFC] min-h-screen flex flex-col font-poppins text-slate-800">
      <Header />
      
      <section className="pt-32 md:pt-40 pb-20 flex-grow animate-fade-in">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          
          {/* Header */}
          <div className="mb-14 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">Analytics Offerings</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight mb-4">
              Services & Capabilities
            </h2>
            <p className="text-slate-500 text-[15px] leading-[1.8] font-medium">
              I support organizations in cleaning spreadsheets, engineering automated reporting models, and building high-performance visual dashboards to unlock clear business insights.
            </p>
          </div>

          {/* Loader */}
          {loading && (
            <div className="flex flex-col justify-center items-center py-24 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-blue-600" />
              <span className="text-xs text-slate-400 font-semibold">Loading services catalog...</span>
            </div>
          )}

          {/* Error Banner */}
          {error && !loading && (
            <div className="p-5 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3.5 max-w-2xl mx-auto shadow-xs">
              <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-rose-800 text-sm">Failed to Load Services</h4>
                <p className="text-xs text-rose-600 mt-1 leading-normal font-semibold">{error}</p>
              </div>
            </div>
          )}

          {/* Empty State */}
          {!loading && !error && services.length === 0 && (
            <div className="border border-slate-200 rounded-3xl p-16 text-center bg-white max-w-2xl mx-auto shadow-xs">
              <div className="h-12 w-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-4">
                <Inbox className="h-5 w-5 text-slate-400" />
              </div>
              <h3 className="font-bold text-slate-800 text-lg mb-1">No services found.</h3>
              <p className="text-slate-550 text-xs max-w-md mx-auto leading-relaxed font-semibold">
                Services will appear here once logged into the admin dashboard or seed configurations.
              </p>
            </div>
          )}

          {/* Services Grid */}
          {!loading && !error && services.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {services.map((s) => (
                <div 
                  key={s.id} 
                  className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-slate-350 transition-all duration-200 group"
                >
                  <div className="space-y-5">
                    {/* Icon Card */}
                    <div className="h-12 w-12 rounded-2xl bg-blue-50 border border-blue-100 text-blue-600 flex items-center justify-center transition-transform duration-300 group-hover:scale-105 shrink-0 shadow-2xs">
                      <ServiceIcon name={s.icon} className="h-5 w-5 shrink-0" />
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors leading-snug">
                        {s.title}
                      </h3>
                      <p className="text-slate-500 text-xs sm:text-[13px] leading-relaxed font-semibold">
                        {s.short_description}
                      </p>
                    </div>
                  </div>

                  {/* Action Link */}
                  <div className="pt-6 mt-auto border-t border-slate-50">
                    <Link
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-2.5 rounded-xl border border-slate-200 text-slate-650 hover:text-blue-600 hover:bg-slate-50 font-bold text-xs shadow-2xs transition cursor-pointer"
                    >
                      <span>View Service</span>
                      <span>→</span>
                    </Link>
                  </div>
                </div>
              ))}
            </div>
          )}

        </div>
      </section>

      <Footer />
    </main>
  );
}
