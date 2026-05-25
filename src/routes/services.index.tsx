import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { getServices, Service } from "@/lib/api";
import { BarChart3, Database, TrendingUp, ArrowRight, Loader2, AlertCircle, Inbox, Cpu, Sparkles, Settings, Activity } from "lucide-react";
import { motion } from "framer-motion";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Analytics Services & Solutions — Zain Haidar" },
      { name: "description", content: "Professional Business Intelligence, database engineering, automated SQL pipelines, and forecasting solutions tailored for business outcomes." },
    ],
  }),
  component: ServicesPage,
});

// Dynamic benefit statements mapping based on service slug
const serviceBenefits: Record<string, string> = {
  "dashboard-automation": "Interactive dashboards that cut your reporting time in half",
  "sql-data-analysis": "Clean databases and optimized queries that establish a single source of truth",
  "forecasting-trend-analysis": "Statistical trend modeling that anticipates future customer demand"
};

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
      
      <section className="pt-32 md:pt-40 pb-24 flex-grow">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8 space-y-16">
          
          {/* Header */}
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">Tailored Solutions</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              Data Services Focused on Business Outcomes
            </h1>
            <p className="text-slate-500 text-xs sm:text-[14px] leading-relaxed font-semibold">
              I specialize in engineering high-fidelity analytical infrastructure and interactive Business Intelligence tools that directly remove operational drag, establish database integrity, and drive growth.
            </p>
          </div>

          {/* Loader */}
          {loading && (
            <div className="flex flex-col justify-center items-center py-24 gap-3 animate-pulse">
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
                No services are currently published in the database.
              </p>
            </div>
          )}

          {/* Services Grid */}
          {!loading && !error && services.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((s, idx) => {
                const benefit = serviceBenefits[s.slug] || "Delivering automated analytics models mapped to core metrics.";
                const iconColorClass = getIconColorClass(s.slug);

                return (
                  <motion.div 
                    key={s.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: idx * 0.08, ease: EASE }}
                    className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-slate-350 transition-all duration-300 group"
                  >
                    <div className="space-y-6">
                      {/* Icon */}
                      <div className="flex items-start justify-between gap-4">
                        <div className={`h-11 w-11 rounded-xl border flex items-center justify-center shrink-0 shadow-2xs ${iconColorClass}`}>
                          <ServiceIcon name={s.icon} className="h-5 w-5" />
                        </div>
                      </div>

                      {/* Benefit Highlight Container */}
                      <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                        <p className="text-[#0F172A] text-xs font-bold leading-relaxed">
                          “{benefit}”
                        </p>
                      </div>

                      <div className="space-y-2">
                        <h3 className="text-base sm:text-[17px] font-extrabold text-[#0F172A] group-hover:text-blue-600 transition-colors leading-snug">
                          {s.title}
                        </h3>
                        <p className="text-slate-550 text-xs sm:text-[13px] leading-relaxed font-semibold">
                          {s.short_description}
                        </p>
                      </div>
                    </div>

                    {/* CTA button */}
                    <div className="pt-6 mt-6 border-t border-slate-100">
                      <Link
                        to="/services/$slug"
                        params={{ slug: s.slug }}
                        className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm shadow-blue-500/10 transition cursor-pointer"
                      >
                        <span>Explore Service details</span>
                        <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                      </Link>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          {/* Consultation Lead Form Section */}
          <div className="bg-[#0F172A] border border-slate-800 shadow-md rounded-3xl p-6 sm:p-10 text-white flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h4 className="font-bold text-base sm:text-lg">Interested in a custom analytical solution?</h4>
              <p className="text-slate-400 text-xs font-semibold">Let's discuss how we can build automated, secure reporting infrastructure tailored to your parameters.</p>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition shadow-md shadow-blue-500/10 cursor-pointer self-stretch sm:self-auto justify-center"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
