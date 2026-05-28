import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { Button } from "@/components/ui/button";
import { getServiceBySlug, Service } from "@/lib/api";
import { Loader2, AlertCircle, ArrowLeft, ArrowRight, CheckCircle2 } from "lucide-react";
import * as LucideIcons from "lucide-react";

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => {
    return {
      meta: [
        { title: `${params.slug.replace(/-/g, " ").replace(/\b\w/g, c => c.toUpperCase())} — Zain Haidar` },
        { name: "description", content: "Explore details, process workflows, and business outcomes for Zain Haidar's professional data analytics services." },
      ],
    };
  },
  component: ServiceDetailPage,
});

const getIconComponent = (iconName?: string) => {
  if (!iconName) return LucideIcons.BarChart2;
  const IconComponent = (LucideIcons as any)[iconName];
  return IconComponent || LucideIcons.BarChart2;
};

function ServiceDetailPage() {
  const { slug } = Route.useParams();
  const [service, setService] = useState<Service | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function loadService() {
      try {
        setLoading(true);
        const data = await getServiceBySlug(slug);
        setService(data);
        setError(null);
      } catch (err: any) {
        console.error("Failed to load service detail post:", err);
        setError(err.message || "Failed to load service details.");
      } finally {
        setLoading(false);
      }
    }
    loadService();
  }, [slug]);

  if (loading) {
    return (
      <main className="bg-white min-h-screen flex flex-col justify-between">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center gap-3 py-32">
          <Loader2 className="h-8 w-8 animate-spin text-[#09090B]" />
          <span className="text-xs font-medium text-[#71717A]">Loading...</span>
        </div>
        <Footer />
      </main>
    );
  }

  if (error || !service) {
    return (
      <main className="bg-white min-h-screen flex flex-col justify-between">
        <Header />
        <div className="flex-grow flex items-center justify-center py-32">
          <div className="max-w-md p-6 bg-white border border-[#E4E4E7] rounded-3xl shadow-sm text-center">
            <AlertCircle className="h-10 w-10 text-rose-500 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-[#09090B] mb-1">{error ? "Failed to load service details." : "Service Not Found"}</h2>
            <p className="text-xs text-[#71717A] mb-6">{error || "The service capability requested does not exist."}</p>
            <Button asChild variant="secondary" className="text-xs">
              <Link to="/services">Back to Services</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  const Icon = getIconComponent(service.icon);

  return (
    <main className="bg-white min-h-screen flex flex-col">
      <Header />
      
      {/* Hero */}
      <section className="pt-32 md:pt-40 pb-16 bg-[#FAFAFA]">
        <div className="mx-auto max-w-[800px] px-5 sm:px-8">
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-wider text-[#71717A] hover:text-[#09090B] transition-colors mb-6"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Services
          </Link>

          <div className="flex flex-col-reverse sm:flex-row sm:items-center justify-between gap-6">
            <div className="space-y-3 flex-1">
              <span className="text-[12px] uppercase font-semibold text-[#71717A] tracking-widest">Services Catalog</span>
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#09090B] tracking-tight leading-tight">
                {service.title}
              </h1>
            </div>
            <div className="h-16 w-16 rounded-2xl bg-[#FFF7ED] border border-[#FDBA74]/40 flex items-center justify-center shrink-0">
              <Icon className="h-7 w-7 text-[#09090B]" />
            </div>
          </div>
        </div>
      </section>

      <section className="py-16 flex-grow animate-fade-in">
        <div className="mx-auto max-w-[800px] px-5 sm:px-8 space-y-12">

          {/* Description */}
          <p className="text-[#71717A] text-base sm:text-lg leading-relaxed">
            {service.short_description}
          </p>

          {/* CTAs */}
          <div className="flex flex-wrap gap-3">
            <Button asChild variant="primary">
              <Link to="/contact">
                <span>Get Started</span>
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/services">Other Offerings</Link>
            </Button>
          </div>

          {/* Overview */}
          <div className="space-y-4 pt-4 border-t border-[#E4E4E7]">
            <h2 className="font-bold text-[#09090B] text-sm uppercase tracking-wider">Overview</h2>
            <p className="text-[#71717A] text-[14px] sm:text-base leading-relaxed">
              {service.short_description}
            </p>
          </div>

          {/* Bottom CTA */}
          <div className="bg-[#09090B] rounded-3xl p-8 sm:p-12 flex flex-col sm:flex-row justify-between items-center gap-8">
            <div className="space-y-2 text-center sm:text-left">
              <h4 className="font-bold text-white text-base sm:text-lg">Ready to optimize your reporting with {service.title}?</h4>
              <p className="text-[#A1A1AA] text-[13px]">{service.short_description}</p>
            </div>
            <Button asChild variant="primary">
              <Link to="/contact">
                <span>Contact Me</span>
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
