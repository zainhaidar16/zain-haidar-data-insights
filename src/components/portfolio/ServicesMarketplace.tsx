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

  const featuredService = services[0];
  const remainingServices = services.slice(1);
  const FeaturedIcon = getIconComponent(featuredService.icon);

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

            <div className="relative z-10 grid gap-8 lg:grid-cols-[minmax(0,0.4fr)_minmax(0,0.6fr)] lg:items-stretch">
              <div className="flex flex-col">
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
                {featuredService.hero_description && (
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
              <div className="relative min-h-[280px] overflow-hidden rounded-2xl border border-[var(--card-border)] bg-[linear-gradient(135deg,#ffffff_0%,#f7f3ff_48%,#eee6ff_100%)] p-4 shadow-[inset_0_1px_0_rgba(255,255,255,0.75)] lg:min-h-full">
                <div className="absolute -right-16 -top-16 h-44 w-44 rounded-full bg-[var(--purple-soft)] blur-2xl" />
                <div className="absolute -bottom-20 left-1/3 h-48 w-48 rounded-full bg-[rgba(112,72,232,0.12)] blur-3xl" />
                <div className="relative h-full min-h-[248px] overflow-hidden rounded-xl border border-[rgba(112,72,232,0.16)] bg-white/88 p-4">
                  <div className="mb-5 flex items-center justify-between gap-4">
                    <div>
                      <p className="text-[11px] font-normal uppercase tracking-[0.16em] text-[var(--purple)]">
                        Live BI Overview
                      </p>
                      <p className="mt-1 text-sm font-semibold text-[var(--text-main)]">
                        Reporting Performance
                      </p>
                    </div>
                    <div className="flex gap-1.5">
                      <span className="h-2.5 w-2.5 rounded-full bg-[var(--purple)]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[rgba(112,72,232,0.35)]" />
                      <span className="h-2.5 w-2.5 rounded-full bg-[rgba(112,72,232,0.18)]" />
                    </div>
                  </div>

                  <div className="grid gap-3 sm:grid-cols-3">
                    {[
                      ["Revenue", "+18.4%"],
                      ["Refresh", "4 min"],
                      ["Accuracy", "99.2%"],
                    ].map(([label, value]) => (
                      <div key={label} className="rounded-xl border border-[rgba(112,72,232,0.12)] bg-[var(--site-bg-soft)] p-3">
                        <p className="text-[10px] font-normal uppercase tracking-[0.12em] text-[var(--text-muted)]">
                          {label}
                        </p>
                        <p className="mt-1 text-lg font-bold text-[var(--text-main)]">{value}</p>
                      </div>
                    ))}
                  </div>

                  <div className="mt-5 grid gap-4 sm:grid-cols-[1.25fr_0.75fr]">
                    <div className="rounded-xl border border-[rgba(112,72,232,0.12)] bg-white p-4">
                      <div className="mb-4 flex items-center justify-between">
                        <span className="text-xs font-semibold text-[var(--text-main)]">Monthly Trend</span>
                        <span className="rounded-full bg-[var(--purple-soft)] px-2.5 py-1 text-[10px] text-[var(--purple)]">
                          Automated
                        </span>
                      </div>
                      <svg viewBox="0 0 320 150" className="h-32 w-full" role="img" aria-label="Dashboard line and bar chart">
                        <defs>
                          <linearGradient id="serviceChartFill" x1="0" x2="0" y1="0" y2="1">
                            <stop offset="0%" stopColor="#7048E8" stopOpacity="0.24" />
                            <stop offset="100%" stopColor="#7048E8" stopOpacity="0.02" />
                          </linearGradient>
                        </defs>
                        {[24, 54, 84, 114, 144, 174, 204, 234, 264, 294].map((x) => (
                          <line key={x} x1={x} x2={x} y1="8" y2="138" stroke="rgba(112,72,232,0.08)" />
                        ))}
                        {[120, 92, 104, 70, 80, 48, 58, 36].map((height, index) => (
                          <rect
                            key={index}
                            x={30 + index * 34}
                            y={138 - height}
                            width="16"
                            height={height}
                            rx="8"
                            fill={index % 2 === 0 ? "rgba(112,72,232,0.28)" : "rgba(112,72,232,0.46)"}
                          />
                        ))}
                        <path
                          d="M24 116 C58 92 78 96 106 75 C138 50 164 70 192 45 C224 18 256 43 296 22"
                          fill="none"
                          stroke="#7048E8"
                          strokeWidth="5"
                          strokeLinecap="round"
                        />
                        <path
                          d="M24 116 C58 92 78 96 106 75 C138 50 164 70 192 45 C224 18 256 43 296 22 L296 138 L24 138 Z"
                          fill="url(#serviceChartFill)"
                        />
                      </svg>
                    </div>

                    <div className="rounded-xl border border-[rgba(112,72,232,0.12)] bg-[var(--purple)] p-4 text-white">
                      <p className="text-xs font-normal uppercase tracking-[0.14em] text-white/75">
                        Data Health
                      </p>
                      <div className="mt-5 flex aspect-square items-center justify-center rounded-full border-[14px] border-white/20 border-t-white border-r-white/75">
                        <span className="text-2xl font-bold">92%</span>
                      </div>
                      <p className="mt-4 text-xs leading-relaxed text-white/80">
                        Clean pipelines, tracked KPIs, and trusted executive reporting.
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Small cards grid */}
          {remainingServices.length > 0 && (
            <div className="grid sm:grid-cols-2 gap-6">
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
