import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { PageHero } from "@/components/portfolio/PageHero";
import { getErrorMessage } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { getServices, Service } from "@/lib/api";
import { ArrowRight, Loader2, AlertCircle, Inbox } from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { motion } from "framer-motion";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Analytics Services & Solutions — Zain Haidar" },
      {
        name: "description",
        content:
          "Professional Business Intelligence, database engineering, automated SQL pipelines, and forecasting solutions tailored for business outcomes.",
      },
    ],
  }),
  component: ServicesPage,
});

const getIconComponent = (iconName?: string) => {
  if (!iconName) return LucideIcons.BarChart2;
  const IconComponent = (LucideIcons as unknown as Record<string, LucideIcon>)[iconName];
  return IconComponent || LucideIcons.BarChart2;
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
      } catch (err: unknown) {
        setError(getErrorMessage(err, "Failed to load services"));
      } finally {
        setLoading(false);
      }
    }
    loadServicesData();
  }, []);

  return (
    <main className="bg-[#050505] min-h-screen flex flex-col">
      <Header />

      <PageHero
        eyebrow="Tailored Solutions"
        title="Data services focused on business outcomes."
        description="I specialize in engineering high-fidelity analytical infrastructure and interactive Business Intelligence tools that directly remove operational drag, establish database integrity, and drive growth."
      />

      <section className="py-24 flex-grow bg-[#050505]">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8 space-y-12">
          {/* Loader */}
          {loading && (
            <div className="flex flex-col justify-center items-center py-24 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-[#8B5CF6]" />
              <span className="text-xs text-[#8B8B98] font-normal">
                Loading services catalog...
              </span>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="p-5 bg-[rgba(239,68,68,0.05)] border border-[rgba(239,68,68,0.2)] rounded-2xl flex items-start gap-3.5 max-w-2xl mx-auto shadow-none">
              <AlertCircle className="h-5 w-5 text-red-400 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-normal text-red-200 text-sm">Failed to Load Services</h4>
                <p className="text-xs text-red-400/80 mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && services.length === 0 && (
            <div className="border border-[rgba(145,92,255,0.15)] rounded-2xl p-16 text-center bg-[#111111] max-w-2xl mx-auto">
              <div className="h-12 w-12 rounded-full bg-[#1B102B] border border-[rgba(139,92,246,0.20)] flex items-center justify-center mx-auto mb-4">
                <Inbox className="h-5 w-5 text-[#8B8B98]" />
              </div>
              <h3 className="font-normal text-white text-lg mb-1">No services found.</h3>
              <p className="text-[#8B8B98] text-xs max-w-md mx-auto">
                No services are currently published.
              </p>
            </div>
          )}

          {/* Grid */}
          {!loading && !error && services.length > 0 && (
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {services.map((s, idx) => {
                const Icon = getIconComponent(s.icon);
                return (
                  <motion.div
                    key={s.id}
                    initial={{ opacity: 0, y: 18 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-60px" }}
                    transition={{ duration: 0.45, delay: idx * 0.08, ease: EASE }}
                    className="bg-[#111111] border border-[rgba(145,92,255,0.15)] rounded-2xl p-8 flex flex-col justify-between group hover:border-[rgba(145,92,255,0.35)] hover:bg-[#0F0A1A] transition-all duration-300"
                  >
                    <div className="space-y-5">
                      <div className="h-12 w-12 rounded-2xl bg-[#1B102B] border border-[rgba(139,92,246,0.20)] flex items-center justify-center group-hover:bg-[#8B5CF6] transition-colors duration-300">
                        <Icon className="h-5 w-5 text-[#8B5CF6] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-[17px] font-normal text-white group-hover:text-white transition-colors leading-snug">
                          {s.title}
                        </h3>
                        <p className="text-[#8B8B98] text-[13px] leading-relaxed">
                          {s.short_description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[rgba(255,255,255,0.08)]">
                      <Button asChild variant="dark" className="w-full text-[13px]">
                        <Link to="/services/$slug" params={{ slug: s.slug }}>
                          <span>Explore Service</span>
                          <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      </Button>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          )}

          <div className="bg-[#111111] border border-[rgba(145,92,255,0.20)] rounded-2xl p-8 sm:p-12 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h4 className="font-normal text-white text-base sm:text-lg">
                Interested in a custom analytical solution?
              </h4>
              <p className="text-[#8B8B98] text-[13px]">
                Let's discuss how we can build automated, secure reporting infrastructure tailored
                to your parameters.
              </p>
            </div>
            <Button asChild variant="primary">
              <Link to="/contact">
                <span>Get Started</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
