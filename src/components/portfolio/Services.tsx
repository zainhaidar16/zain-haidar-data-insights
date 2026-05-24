import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, RefreshCw, AlertCircle, Inbox } from "lucide-react";
import * as LucideIcons from "lucide-react";
import { getServices, Service } from "@/lib/api";

const EASE = [0.25, 0.1, 0.25, 1] as const;

// Helper to map DB string representation of icons to Lucide elements
const getIconComponent = (iconName?: string) => {
  if (!iconName) return LucideIcons.BarChart2;
  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent || LucideIcons.BarChart2;
};

export function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadServices() {
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
    loadServices();
  }, []);

  return (
    <section id="services" className="py-24 bg-white border-t border-slate-100">
      <div className="section-container">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">What I Offer</p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight max-w-md">
              Services I Provide
            </h2>
            <a
              href="#contact"
              onClick={(e) => {
                e.preventDefault();
                document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" });
              }}
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-blue-600 hover:text-blue-700 transition-colors"
            >
              Discuss your project <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </motion.div>

        {/* LOADING STATE */}
        {loading && (
          <div className="grid md:grid-cols-2 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card-pro p-7 animate-pulse">
                <div className="h-11 w-11 rounded-xl bg-slate-100 mb-5" />
                <div className="h-6 bg-slate-200 rounded w-1/2 mb-3" />
                <div className="h-4 bg-slate-100 rounded w-full mb-2" />
                <div className="h-4 bg-slate-100 rounded w-5/6 mb-5" />
                <div className="flex gap-2">
                  <div className="h-6 bg-slate-100 rounded w-16" />
                  <div className="h-6 bg-slate-100 rounded w-16" />
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
              <h4 className="font-bold text-rose-800 text-sm">Failed to Load Services</h4>
              <p className="text-xs text-rose-600 mt-1 leading-normal">{error}</p>
            </div>
          </div>
        )}

        {/* EMPTY STATE */}
        {!loading && !error && services.length === 0 && (
          <div className="py-16 text-center max-w-md mx-auto">
            <div className="h-12 w-12 rounded-full bg-slate-50 border border-slate-200 flex items-center justify-center mx-auto mb-4">
              <Inbox className="h-5 w-5 text-slate-400" />
            </div>
            <h4 className="font-bold text-slate-800 text-sm mb-1">No Services Found</h4>
            <p className="text-xs text-slate-500 leading-normal">
              No services are currently published in the database.
            </p>
          </div>
        )}

        {/* SERVICE CARDS GRID */}
        {!loading && !error && services.length > 0 && (
          <div className="grid md:grid-cols-2 gap-6">
            {services.map((service, i) => {
              const Icon = getIconComponent(service.icon);
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
                  className="card-pro p-7 group"
                >
                  <div className="h-11 w-11 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center mb-5 group-hover:bg-blue-600 group-hover:border-blue-600 transition-colors duration-200">
                    <Icon className="h-5 w-5 text-blue-600 group-hover:text-white transition-colors duration-200" />
                  </div>
                  <h3 className="font-bold text-[#0F172A] text-[17px] mb-2.5">{service.title}</h3>
                  <p className="text-sm text-slate-500 leading-relaxed">{service.short_description}</p>
                </motion.div>
              );
            })}
          </div>
        )}

      </div>
    </section>
  );
}
