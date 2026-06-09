import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { Button } from "@/components/ui/button";
import { getServices, Service } from "@/lib/api";
import { ArrowRight, Loader2, AlertCircle, Inbox } from "lucide-react";
import * as LucideIcons from "lucide-react";
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
  const IconComponent = (LucideIcons as any)[iconName];
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
      } catch (err: any) {
        setError(err.message || "Failed to load services");
      } finally {
        setLoading(false);
      }
    }
    loadServicesData();
  }, []);

  return (
    <main className="bg-[#0E0E11] min-h-screen flex flex-col">
      <Header />

      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-20 bg-[#09090B] relative overflow-hidden hero-arc">
        <div className="absolute -top-24 -right-16 w-[420px] h-[420px] rounded-full bg-[#F97316]/10 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[280px] h-[280px] rounded-full bg-[#09090B]/6 blur-3xl pointer-events-none" />
        <div className="section-container">
          <div className="max-w-3xl">
            <p className="text-[12px] font-semibold uppercase tracking-widest text-[#A1A1AA] mb-3">
              Tailored Solutions
            </p>
            <h1 className="text-4xl sm:text-5xl font-extrabold text-[#FAFAFA] tracking-tight leading-[1.1] mb-5">
              Data services focused on{" "}
              <span className="relative inline-block">
                business outcomes.
                <span className="absolute bottom-1 left-0 w-full h-3 bg-[#F97316]/20 -z-10 rounded-sm" />
              </span>
            </h1>
            <p className="text-[#A1A1AA] text-[15px] leading-relaxed max-w-2xl">
              I specialize in engineering high-fidelity analytical infrastructure and interactive
              Business Intelligence tools that directly remove operational drag, establish database
              integrity, and drive growth.
            </p>
          </div>
        </div>
      </section>

      <section className="py-24 flex-grow">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8 space-y-12">
          {/* Loader */}
          {loading && (
            <div className="flex flex-col justify-center items-center py-24 gap-3">
              <Loader2 className="h-8 w-8 animate-spin text-[#FAFAFA]" />
              <span className="text-xs text-[#A1A1AA] font-medium">
                Loading services catalog...
              </span>
            </div>
          )}

          {/* Error */}
          {error && !loading && (
            <div className="p-5 bg-rose-50 border border-rose-100 rounded-2xl flex items-start gap-3.5 max-w-2xl mx-auto">
              <AlertCircle className="h-5 w-5 text-rose-600 shrink-0 mt-0.5" />
              <div>
                <h4 className="font-bold text-rose-800 text-sm">Failed to Load Services</h4>
                <p className="text-xs text-rose-600 mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Empty */}
          {!loading && !error && services.length === 0 && (
            <div className="border border-[#232329] rounded-3xl p-16 text-center bg-[#0E0E11] max-w-2xl mx-auto">
              <div className="h-12 w-12 rounded-full bg-[#09090B] border border-[#232329] flex items-center justify-center mx-auto mb-4">
                <Inbox className="h-5 w-5 text-[#A1A1AA]" />
              </div>
              <h3 className="font-bold text-[#FAFAFA] text-lg mb-1">No services found.</h3>
              <p className="text-[#A1A1AA] text-xs max-w-md mx-auto">
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
                    className="card-payoneer p-8 flex flex-col justify-between group hover:border-[#F97316]/40"
                  >
                    <div className="space-y-5">
                      <div className="h-12 w-12 rounded-2xl bg-[#F97316]/10 border border-[#F97316]/30 flex items-center justify-center group-hover:bg-[#F97316] transition-colors duration-300">
                        <Icon className="h-5 w-5 text-[#F97316] group-hover:text-white transition-colors duration-300" />
                      </div>
                      <div className="space-y-2">
                        <h3 className="text-[17px] font-bold text-[#FAFAFA] group-hover:text-[#A1A1AA] transition-colors leading-snug">
                          {s.title}
                        </h3>
                        <p className="text-[#A1A1AA] text-[13px] leading-relaxed">
                          {s.short_description}
                        </p>
                      </div>
                    </div>

                    <div className="pt-6 mt-6 border-t border-[#232329]">
                      <Button asChild variant="primary" className="w-full text-[13px]">
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

          {/* Bottom CTA */}
          <div className="bg-[#131316] rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h4 className="font-bold text-white text-base sm:text-lg">
                Interested in a custom analytical solution?
              </h4>
              <p className="text-[#A1A1AA] text-[13px]">
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
