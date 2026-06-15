import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { ArrowRight, AlertCircle, Inbox } from "lucide-react";
import { Link } from "@tanstack/react-router";
import * as LucideIcons from "lucide-react";
import { getServices, Service } from "@/lib/api";
import TiltCard from "@/components/fx/TiltCard";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const getIconComponent = (iconName?: string) => {
  if (!iconName) return LucideIcons.BarChart3;
  const normalized = iconName.split("-").map((part) => part.charAt(0).toUpperCase() + part.slice(1)).join("");
  const overrides: Record<string, string> = {
    Barchart3: "BarChart3",
    Barchart2: "BarChart3",
    Barchart: "BarChart3",
    Linechart: "LineChart",
    Databasezap: "DatabaseZap",
    Database: "Database",
    Trendingup: "TrendingUp",
    Layoutdashboard: "LayoutDashboard",
    Filebarchart: "FileBarChart",
    Code2: "Code2",
    Code: "Code2",
    Activity: "Activity",
    Bot: "Bot",
    Workflow: "Workflow",
    Globe: "Globe",
  };
  const finalName = overrides[normalized] || overrides[iconName] || normalized || iconName;
  return (LucideIcons as any)[finalName] || LucideIcons.BarChart3;
};

export function Services() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadServices() {
      try {
        setLoading(true);
        setServices(await getServices());
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
    <section id="services" className="border-t border-[rgba(245,231,210,0.14)] bg-[#17130f] py-24 md:py-28">
      <div className="section-container">
        <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ duration: 0.5, ease: EASE }} className="mb-14">
          <p className="mb-3 text-[12px] font-normal uppercase tracking-widest text-[#d6c3a5]">What I Offer</p>
          <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
            <h2 className="max-w-lg text-3xl font-normal leading-tight text-[#fff7ed] sm:text-4xl lg:text-[42px]">Analytics services built for clearer decisions.</h2>
            <Link to="/contact" className="inline-flex items-center gap-1.5 text-[13px] font-normal text-[#fbbf24] transition-colors hover:text-[#fed7aa]">Discuss your project <ArrowRight className="h-4 w-4" /></Link>
          </div>
        </motion.div>

        {loading && <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">{[1, 2, 3, 4].map((i) => <div key={i} className="card-payoneer animate-pulse rounded-[24px] border border-[rgba(245,231,210,0.14)] bg-[#211c16] p-7"><div className="mb-5 h-11 w-11 rounded-2xl bg-[#2a241c]" /><div className="mb-3 h-6 w-1/2 rounded bg-[#2a241c]" /><div className="mb-2 h-4 w-full rounded bg-[#2a241c]" /><div className="mb-5 h-4 w-5/6 rounded bg-[#2a241c]" /></div>)}</div>}

        {error && !loading && <div className="mx-auto flex max-w-2xl items-start gap-3.5 rounded-2xl border border-red-400/25 bg-red-500/10 p-6"><AlertCircle className="mt-0.5 h-5 w-5 shrink-0 text-red-300" /><div><h4 className="text-sm font-normal text-red-200">Failed to Load Services</h4><p className="mt-1 text-xs leading-normal text-red-200">{error}</p></div></div>}

        {!loading && !error && services.length === 0 && <div className="mx-auto max-w-md py-16 text-center"><div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full border border-[rgba(245,231,210,0.14)] bg-[#211c16]"><Inbox className="h-5 w-5 text-[#d6c3a5]" /></div><h4 className="mb-1 text-sm font-normal text-[#fff7ed]">No Services Found</h4><p className="text-xs leading-normal text-[#d6c3a5]">No services are currently published in the database.</p></div>}

        {!loading && !error && services.length > 0 && <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">{services.map((service, i) => {
          const Icon = getIconComponent(service.icon);
          return <TiltCard key={service.id} maxTilt={7}><motion.div initial={{ opacity: 0, y: 18 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-60px" }} transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }} className="card-payoneer group flex h-full flex-col rounded-[24px] border border-[rgba(245,231,210,0.14)] bg-[#211c16] p-7 transition-all duration-300 hover:border-[rgba(245,158,11,0.46)] hover:shadow-md">
            <div className="mb-5 flex h-12 w-12 items-center justify-center rounded-2xl border border-[rgba(245,158,11,0.24)] bg-[rgba(245,158,11,0.10)] transition-colors duration-300 group-hover:bg-[#f59e0b]">
              <Icon className="h-5 w-5 text-[#fbbf24] transition-colors duration-300 group-hover:text-[#1c1408]" />
            </div>
            <h3 className="mb-2.5 text-[17px] font-normal text-[#fff7ed] transition-colors group-hover:text-[#fed7aa]">{service.title}</h3>
            <p className="mb-5 text-[14px] leading-relaxed text-[#f5e7d2]">{service.short_description}</p>
            <div className="mt-auto border-t border-[rgba(245,231,210,0.14)] pt-4"><Link to="/services/$slug" params={{ slug: service.slug }} className="inline-flex cursor-pointer items-center gap-1.5 text-[13px] font-normal text-[#fbbf24] transition-colors duration-150 hover:text-[#fed7aa]"><span>Learn More</span><ArrowRight className="h-3.5 w-3.5" /></Link></div>
          </motion.div></TiltCard>;
        })}</div>}
      </div>
    </section>
  );
}
