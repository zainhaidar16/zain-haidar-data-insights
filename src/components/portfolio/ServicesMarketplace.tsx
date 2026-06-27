import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import type { Service } from "@/lib/api";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { getLogosForText } from "@/data/tools";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const getIconComponent = (iconName?: string) => {
  if (!iconName) return LucideIcons.BarChart2;
  const IconComponent = (LucideIcons as unknown as Record<string, LucideIcon>)[iconName];
  return IconComponent || LucideIcons.BarChart2;
};

export function ServicesMarketplace({ services }: { services: Service[] }) {
  if (services.length === 0) {
    return (
      <section className="py-12 md:py-20 bg-[#f5f3ff] border-t border-[var(--line-soft)]">
        <div className="section-container text-center text-[var(--text-muted)] text-sm">
          No services added yet.
        </div>
      </section>
    );
  }

  return (
    <section className="py-12 md:py-20 bg-[#f5f3ff] border-t border-[var(--line-soft)]">
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="max-w-3xl mb-14"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[var(--text-main)] leading-tight">
            Services Built for Business Data
          </h2>
        </motion.div>

        <div className="space-y-6">
          {services.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {services.slice(0, 4).map((service, i) => {
                const Icon = getIconComponent(service.icon);
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: i * 0.06, ease: EASE }}
                    className="site-card p-6 flex flex-col justify-between group"
                  >
                    <div>
                      <div className="flex items-center justify-between gap-4 mb-4">
                        <div className="flex items-center gap-3">
                          <div className="site-card-icon">
                            <Icon className="h-4 w-4 text-[var(--purple)]" />
                          </div>
                          <span className="site-card-label">
                            Analytics Service
                          </span>
                        </div>
                        <div className="flex items-center gap-1.5">
                          {getLogosForText(service.title + " " + (service.short_description || "")).map((logo) => (
                            <div key={logo.name} className="h-6.5 w-6.5 rounded-md bg-[#F5F2FF] border border-[rgba(112,72,232,0.12)] flex items-center justify-center shrink-0" title={logo.name}>
                              <img src={logo.logo} alt={`${logo.name} logo`} className="h-3.5 w-3.5 object-contain" />
                            </div>
                          ))}
                        </div>
                      </div>
                      <h3 className="site-card-title text-[17px] mb-2">
                        {service.title}
                      </h3>
                      <p className="site-card-text text-[13px] leading-relaxed mb-4">
                        {service.short_description || "Service details coming soon."}
                      </p>
                    </div>
                    <Link
                      to="/services/$slug"
                      params={{ slug: service.slug }}
                      className="site-card-link inline-flex items-center gap-1.5 text-[13px] mt-auto"
                    >
                      Explore
                      <ArrowRight className="h-3.5 w-3.5" />
                    </Link>
                  </motion.div>
                );
              })}
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
