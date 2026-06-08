import { useEffect, useState } from "react";
import type { ComponentType } from "react";
import { motion } from "framer-motion";
import { ArrowRight, AlertCircle, Inbox } from "lucide-react";
import { Link } from "@tanstack/react-router";
import * as LucideIcons from "lucide-react";
import { getServices, Service } from "@/lib/api";

const EASE = [0.25, 0.1, 0.25, 1] as const;
const iconMap = LucideIcons as unknown as Record<string, ComponentType<{ className?: string }>>;

const getIconComponent = (iconName?: string | null) => {
  if (!iconName) return LucideIcons.BarChart2;
  const IconComponent = iconMap[iconName];
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
      } catch (err: unknown) {
        setError(getErrorMessage(err, "Failed to load services"));
      } finally {
        setLoading(false);
      }
    }
    loadServices();
  }, []);

  return (
    <section id="services" className="py-24 md:py-28 bg-[#FAFAFA]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-14"
        >
          <p className="text-[12px] font-semibold uppercase tracking-widest text-[#71717A] mb-3">
            What I Offer
          </p>
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
            <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#09090B] leading-tight max-w-lg">
              Analytics services built for clearer decisions.
            </h2>
            <Link
              to="/contact"
              className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#F97316] hover:text-[#EA580C] transition-colors"
            >
              Discuss your project <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </motion.div>

        {loading && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="card-payoneer p-7 animate-pulse">
                <div className="h-11 w-11 rounded-2xl bg-[#F4F4F5] mb-5" />
                <div className="h-6 bg-[#E4E4E7] rounded w-1/2 mb-3" />
                <div className="h-4 bg-[#F4F4F5] rounded w-full mb-2" />
                <div className="h-4 bg-[#F4F4F5] rounded w-5/6 mb-5" />
              </div>
            ))}
          </div>
        )}

        {error && !loading && (
          <div className="p-6 bg-red-50 border border-red-200 rounded-2xl flex items-start gap-3.5 max-w-2xl mx-auto">
            <AlertCircle className="h-5 w-5 text-red-500 shrink-0 mt-0.5" />
            <div>
              <h4 className="font-bold text-red-800 text-sm">Failed to Load Services</h4>
              <p className="text-xs text-red-600 mt-1 leading-normal">{error}</p>
            </div>
          </div>
        )}

        {!loading && !error && services.length === 0 && (
          <div className="py-16 text-center max-w-md mx-auto">
            <div className="h-12 w-12 rounded-full bg-[#F4F4F5] border border-[#E4E4E7] flex items-center justify-center mx-auto mb-4">
              <Inbox className="h-5 w-5 text-[#71717A]" />
            </div>
            <h4 className="font-bold text-[#09090B] text-sm mb-1">No Services Found</h4>
            <p className="text-xs text-[#71717A] leading-normal">
              No services are currently published in the database.
            </p>
          </div>
        )}

        {!loading && !error && services.length > 0 && (
          <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {services.map((service, i) => {
              const Icon = getIconComponent(service.icon);
              return (
                <motion.div
                  key={service.id}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
                  className="card-payoneer p-7 group flex flex-col"
                >
                  <div className="h-12 w-12 rounded-2xl bg-[#FFF7ED] border border-[#FDBA74]/30 flex items-center justify-center mb-5 group-hover:bg-[#F97316] transition-colors duration-300">
                    <Icon className="h-5 w-5 text-[#F97316] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-bold text-[#09090B] text-[17px] mb-2.5">{service.title}</h3>
                  <p className="text-[14px] text-[#71717A] leading-relaxed mb-5">
                    {service.short_description}
                  </p>

                  <div className="pt-4 mt-auto border-t border-[#E4E4E7]">
                    <Link
                      to="/services/$slug"
                      params={{ slug: service.slug }}
                      className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#F97316] hover:text-[#EA580C] transition-colors duration-150 cursor-pointer"
                    >
                      <span>Learn more</span>
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
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

function getErrorMessage(error: unknown, fallback: string) {
  return error instanceof Error ? error.message : fallback;
}
