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

const normalizeCopy = (value?: string | null) => value?.trim().replace(/\s+/g, " ").toLowerCase();

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

  const featuredService = services[0];
  const remainingServices = services.slice(1);
  const FeaturedIcon = getIconComponent(featuredService.icon);
  const showHeroDescription =
    Boolean(featuredService.hero_description) &&
    normalizeCopy(featuredService.hero_description) !== normalizeCopy(featuredService.short_description);

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

        {/* Layout: 1 big card on top, remaining cards below */}
        <div className="space-y-6">
          {/* Big featured card */}
          <motion.div
            initial={{ opacity: 0, y: 18 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE }}
            className="site-card p-8 md:p-10 group relative overflow-hidden"
          >
            {/* Subtle purple glow */}
            <div className="absolute -top-20 -right-20 w-[300px] h-[300px] rounded-full bg-[var(--purple-glow)] blur-[80px] pointer-events-none" />

            <div className="relative z-10">
              <div className="flex max-w-3xl flex-col">
                <div className="flex items-center justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3">
                    <div className="site-card-icon">
                      <FeaturedIcon className="h-5 w-5 text-[var(--purple)]" />
                    </div>
                    <span className="site-card-label">
                      Main Service
                    </span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getLogosForText(featuredService.title + " " + (featuredService.short_description || "") + " " + (featuredService.hero_description || "")).map((logo) => (
                      <div key={logo.name} className="h-7 w-7 rounded-lg bg-[#F5F2FF] border border-[rgba(112,72,232,0.12)] flex items-center justify-center" title={logo.name}>
                        <img src={logo.logo} alt={`${logo.name} logo`} className="h-4.5 w-4.5 object-contain" />
                      </div>
                    ))}
                  </div>
                </div>
                <h3 className="site-card-title text-2xl md:text-3xl mb-3">
                  {featuredService.title}
                </h3>
                <p className="site-card-text text-[15px] leading-relaxed mb-4 max-w-lg">
                  {featuredService.short_description || "Service details coming soon."}
                </p>
                {showHeroDescription && (
                  <p className="text-[13px] text-[var(--text-soft)] font-normal">
                    {featuredService.hero_description}
                  </p>
                )}
                <Link
                  to="/services/$slug"
                  params={{ slug: featuredService.slug }}
                  className="site-card-link mt-6 inline-flex items-center gap-2 text-[14px]"
                >
                  Explore
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </motion.div>

          {/* Small cards grid */}
          {remainingServices.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              {remainingServices.map((service, i) => {
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
