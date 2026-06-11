import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { getServiceBySlug, Service } from "@/lib/api";
import {
  Loader2,
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  CheckCircle2,
  Zap,
  TrendingUp,
  HelpCircle,
  Code2,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { getErrorMessage } from "@/lib/utils";

export const Route = createFileRoute("/services/$slug")({
  head: ({ params }) => {
    return {
      meta: [
        {
          title: `${params.slug.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase())} — Zain Haidar`,
        },
        {
          name: "description",
          content:
            "Explore details, process workflows, and business outcomes for Zain Haidar's professional data analytics services.",
        },
      ],
    };
  },
  component: ServiceDetailPage,
});

const EASE = [0.25, 0.1, 0.25, 1] as const;

const getIconComponent = (iconName?: string | null) => {
  if (!iconName) return LucideIcons.BarChart2;
  const IconComponent = (LucideIcons as unknown as Record<string, LucideIcon>)[iconName];
  return IconComponent || LucideIcons.BarChart2;
};

function safeStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string" && item.trim() !== "")
    : [];
}

function safeObjectArray<T extends Record<string, unknown>>(value: unknown): T[] {
  return Array.isArray(value)
    ? value.filter((item): item is T => item !== null && typeof item === "object")
    : [];
}

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
      } catch (err: unknown) {
        console.error("Failed to load service detail:", err);
        setError(getErrorMessage(err, "Failed to load service details."));
      } finally {
        setLoading(false);
      }
    }
    loadService();
  }, [slug]);

  // ─── Loading State ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <main className="bg-[#F5F5F7] min-h-screen flex flex-col justify-between font-poppins">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center gap-3 py-32">
          <Loader2 className="h-8 w-8 animate-spin text-[#0071E3]" />
          <span className="text-xs font-medium text-[#86868B]">Loading service...</span>
        </div>
        <Footer />
      </main>
    );
  }

  // ─── Error / Not Found State ────────────────────────────────────────────────
  if (error || !service) {
    return (
      <main className="bg-[#F5F5F7] min-h-screen flex flex-col justify-between font-poppins">
        <Header />
        <div className="flex-grow flex items-center justify-center py-32">
          <div className="max-w-md p-8 bg-[#FFFFFF] border border-[#E8E8ED] rounded-3xl text-center shadow-lg">
            <AlertCircle className="h-10 w-10 text-red-500 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-[#1D1D1F] mb-2">
              {error ? "Failed to load service details." : "Service Not Found"}
            </h2>
            <p className="text-xs text-[#6E6E73] mb-6">
              {error || "The service you requested does not exist or has been removed."}
            </p>
            <Button
              asChild
              variant="outline"
              className="text-xs border-[#D2D2D7] bg-[#FFFFFF] hover:bg-[#F5F5F7] text-[#1D1D1F]"
            >
              <Link to="/services">Back to Services</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </main>
    );
  }

  // ─── Normalize Data ─────────────────────────────────────────────────────────
  const Icon = getIconComponent(service.icon);
  const problemsSolved = safeStringArray(service.problems_solved);
  const deliverables = safeStringArray(service.deliverables);
  const benefits = safeStringArray(service.benefits);
  const technologies = safeStringArray(service.technologies);
  const processSteps = safeObjectArray<{ title: string; description: string }>(
    service.process_steps,
  );
  const faqItems = safeObjectArray<{ question: string; answer: string }>(service.faq);

  const heroTitle = service.hero_title?.trim();
  const heroDescription = service.hero_description?.trim();
  const fullDescription = service.full_description?.trim();
  const ctaTitle = service.cta_title?.trim();
  const ctaDescription = service.cta_description?.trim();

  return (
    <main className="bg-[#F5F5F7] min-h-screen flex flex-col font-poppins text-[#6E6E73]">
      <Header />

      {/* 1. HERO SECTION */}
      <section className="service-detail-hero bg-[#F5F5F7] relative overflow-hidden border-b border-[#E8E8ED] pt-32 pb-16">
        {/* Glow Effects */}
        <div className="absolute top-0 right-1/4 w-[400px] h-[400px] rounded-full bg-[#0071E3]/3 blur-[120px] pointer-events-none" />
        <div className="absolute bottom-0 left-10 w-[300px] h-[300px] rounded-full bg-[#0071E3]/2 blur-[100px] pointer-events-none" />

        <div className="section-container relative z-10 px-6 max-w-7xl mx-auto">
          {/* Back link */}
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-[12px] font-semibold uppercase tracking-wider text-[#86868B] hover:text-[#0071E3] transition-colors mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-[#0071E3]" /> Back to Services
          </Link>

          <div className="max-w-3xl">
            {/* Icon + label */}
            <div className="flex items-center gap-4 mb-6">
              <div className="h-14 w-14 rounded-2xl bg-[rgba(0,113,227,0.06)] border border-[rgba(0,113,227,0.12)] flex items-center justify-center">
                <Icon className="h-6 w-6 text-[#0071E3]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#0071E3]">
                Service
              </span>
            </div>

            {/* Title */}
            {heroTitle ? (
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1D1D1F] tracking-tight leading-[1.15] mb-6">
                {heroTitle}
              </h1>
            ) : (
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#1D1D1F] tracking-tight leading-[1.15] mb-6">
                {service.title}
              </h1>
            )}

            {/* Description */}
            {heroDescription && (
              <p className="text-[#6E6E73] text-base md:text-lg leading-relaxed max-w-2xl mb-10">
                {heroDescription}
              </p>
            )}

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-4">
              <Button
                asChild
                className="bg-[#0071E3] hover:bg-[#005BB5] text-white rounded-full px-6 py-4 h-auto flex items-center gap-2 font-semibold transition-all duration-200"
              >
                <Link to="/contact">
                  <span>Contact Me</span>
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button
                asChild
                variant="outline"
                className="border-[#D2D2D7] bg-white hover:bg-[#F5F5F7] text-[#1D1D1F] rounded-full px-6 py-4 h-auto font-semibold transition-all duration-200"
              >
                <Link to="/services">All Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* 2. SERVICE OVERVIEW — Full Description */}
      {fullDescription && (
        <section className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E8E8ED]">
          <div className="section-container px-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="max-w-[800px] mx-auto bg-[#FBFBFD] border border-[#E8E8ED] rounded-3xl p-8 md:p-12 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-lg bg-[rgba(0,113,227,0.06)] flex items-center justify-center">
                  <LucideIcons.FileText className="h-4 w-4 text-[#0071E3]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[#1D1D1F] tracking-tight">
                  About This Service
                </h2>
              </div>
              <div className="prose prose-sm sm:prose-base max-w-none text-[#6E6E73] leading-[1.8] [&_h1]:text-[#1D1D1F] [&_h2]:text-[#1D1D1F] [&_h3]:text-[#1D1D1F] [&_h4]:text-[#1D1D1F] [&_strong]:text-[#1D1D1F] [&_strong]:font-semibold [&_li]:marker:text-[#0071E3] [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2">
                <ReactMarkdown>{fullDescription}</ReactMarkdown>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* 3. PROBLEMS WE SOLVE */}
      {problemsSolved.length > 0 && (
        <section className="py-20 md:py-28 bg-[#F5F5F7] border-b border-[#E8E8ED]">
          <div className="section-container px-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="text-center mb-16">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#0071E3] mb-3 block">
                  Challenges
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F] tracking-tight">
                  Problems We Solve
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-[1100px] mx-auto">
                {problemsSolved.map((problem, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: idx * 0.06, ease: EASE }}
                    className="p-6 bg-[#FFFFFF] border border-[#E8E8ED] rounded-2xl flex items-start gap-4 hover:border-[#0071E3]/30 transition-all duration-300 shadow-sm"
                  >
                    <div className="h-9 w-9 rounded-xl bg-[rgba(0,113,227,0.06)] border border-[rgba(0,113,227,0.12)] flex items-center justify-center shrink-0 mt-0.5">
                      <Zap className="h-4.5 w-4.5 text-[#0071E3]" />
                    </div>
                    <p className="text-sm text-[#6E6E73] leading-relaxed font-medium">{problem}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* 4. DELIVERABLES */}
      {deliverables.length > 0 && (
        <section className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E8E8ED]">
          <div className="section-container px-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="text-center mb-16">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#0071E3] mb-3 block">
                  What You Get
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F] tracking-tight">
                  Deliverables
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[1000px] mx-auto">
                {deliverables.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: idx * 0.05, ease: EASE }}
                    className="flex items-start gap-4 p-5 rounded-2xl border border-[#E8E8ED] bg-[#FBFBFD] hover:border-[#0071E3]/30 transition-all duration-300 shadow-sm"
                  >
                    <div className="h-8 w-8 rounded-lg bg-[rgba(0,113,227,0.06)] flex items-center justify-center shrink-0 mt-0.5">
                      <LucideIcons.PackageCheck className="h-4.5 w-4.5 text-[#0071E3]" />
                    </div>
                    <span className="text-sm text-[#6E6E73] leading-relaxed font-medium">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* 5. BENEFITS */}
      {benefits.length > 0 && (
        <section className="py-20 md:py-28 bg-[#F5F5F7] border-b border-[#E8E8ED]">
          <div className="section-container px-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="text-center mb-16">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#0071E3] mb-3 block">
                  Why Choose This Service
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F] tracking-tight">
                  Key Benefits
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-[900px] mx-auto">
                {benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: idx * 0.06, ease: EASE }}
                    className="p-6 bg-[#FFFFFF] border border-[#E8E8ED] rounded-2xl flex items-start gap-4 hover:border-[#0071E3]/30 transition-all duration-300 shadow-sm"
                  >
                    <div className="h-10 w-10 rounded-xl bg-[rgba(0,113,227,0.06)] border border-[rgba(0,113,227,0.12)] flex items-center justify-center shrink-0">
                      <TrendingUp className="h-5 w-5 text-[#0071E3]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#1D1D1F] font-semibold leading-relaxed">
                        {benefit}
                      </p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* 6. TECHNOLOGY STACK */}
      {technologies.length > 0 && (
        <section className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E8E8ED]">
          <div className="section-container px-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="max-w-[780px] mx-auto text-center"
            >
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#0071E3] mb-3 block">
                Tools & Platforms
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F] tracking-tight mb-10">
                Technology Stack
              </h2>

              <div className="flex flex-wrap justify-center gap-3">
                {technologies.map((tech, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.04, ease: EASE }}
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[#FBFBFD] border border-[#E8E8ED] text-sm font-semibold text-[#1D1D1F] hover:border-[#0071E3]/40 hover:bg-[rgba(0,113,227,0.04)] transition-all duration-300 shadow-sm cursor-default"
                  >
                    <Code2 className="h-4 w-4 text-[#0071E3]" />
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* 7. PROCESS STEPS */}
      {processSteps.length > 0 && (
        <section className="py-20 md:py-28 bg-[#F5F5F7] border-b border-[#E8E8ED]">
          <div className="section-container px-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="text-center mb-16">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#0071E3] mb-3 block">
                  How It Works
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F] tracking-tight">
                  Our Process
                </h2>
              </div>

              <div className="max-w-[800px] mx-auto relative">
                {/* Vertical timeline line */}
                <div className="absolute left-[23px] top-4 bottom-4 w-px bg-[#D2D2D7] hidden sm:block" />

                <div className="space-y-8">
                  {processSteps.map((step, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: idx * 0.08, ease: EASE }}
                      className="flex gap-6 items-start"
                    >
                      {/* Step number */}
                      <div className="h-12 w-12 rounded-2xl bg-[#FFFFFF] border border-[#E8E8ED] flex items-center justify-center shrink-0 relative z-10 shadow-sm">
                        <span className="text-sm font-extrabold text-[#0071E3]">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Step content */}
                      <div className="p-6 bg-[#FFFFFF] border border-[#E8E8ED] rounded-2xl flex-1 hover:border-[#0071E3]/30 transition-all duration-300 shadow-sm">
                        {step.title && (
                          <h3 className="text-base font-bold text-[#1D1D1F] mb-2">{step.title}</h3>
                        )}
                        {step.description && (
                          <p className="text-sm text-[#6E6E73] leading-relaxed">
                            {step.description}
                          </p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* 8. FAQ SECTION */}
      {faqItems.length > 0 && (
        <section className="py-20 md:py-28 bg-[#FFFFFF] border-b border-[#E8E8ED]">
          <div className="section-container px-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="max-w-[780px] mx-auto"
            >
              <div className="text-center mb-16">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#0071E3] mb-3 block">
                  Common Questions
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#1D1D1F] tracking-tight">
                  Frequently Asked Questions
                </h2>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((faq, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`faq-${idx}`}
                    className="border border-[#E8E8ED] rounded-2xl bg-[#FFFFFF] px-6 shadow-sm data-[state=open]:border-[#0071E3]/40 transition-all duration-300"
                  >
                    <AccordionTrigger className="text-sm sm:text-base font-semibold text-[#1D1D1F] hover:no-underline py-5 gap-3">
                      <span className="flex items-center gap-4 text-left">
                        <HelpCircle className="h-5 w-5 text-[#0071E3] shrink-0" />
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-[#6E6E73] leading-relaxed pb-5 pl-9 border-t border-[#E8E8ED]/50 pt-4">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>
      )}

      {/* 9. FINAL CTA SECTION */}
      <section className="py-20 md:py-28 bg-[#F5F5F7] relative overflow-hidden">
        {/* Subtle blue accent line */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full max-w-7xl h-[1px] bg-gradient-to-r from-transparent via-[#0071E3]/20 to-transparent pointer-events-none" />

        <div className="section-container px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="bg-[#FFFFFF] border border-[#E8E8ED] rounded-3xl p-8 sm:p-12 md:p-16 max-w-[1000px] mx-auto relative overflow-hidden shadow-lg">
              {/* Inner blue glow */}
              <div className="absolute -bottom-24 -right-24 w-[280px] h-[280px] rounded-full bg-[#0071E3]/3 blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row justify-between items-center gap-8 relative z-10">
                <div className="space-y-4 text-center sm:text-left max-w-lg">
                  <h2 className="font-extrabold text-[#1D1D1F] text-xl sm:text-2xl md:text-3xl tracking-tight leading-tight">
                    {ctaTitle || `Ready to get started with ${service.title}?`}
                  </h2>
                  {ctaDescription && (
                    <p className="text-[#6E6E73] text-sm md:text-base leading-relaxed">
                      {ctaDescription}
                    </p>
                  )}
                </div>
                <div className="shrink-0">
                  <Button
                    asChild
                    className="bg-[#0071E3] hover:bg-[#005BB5] text-white rounded-full px-8 py-6 h-auto font-semibold transition-all duration-200"
                  >
                    <Link to="/contact">
                      <span>Contact Me</span>
                      <ArrowRight className="h-5 w-5 ml-1 inline" />
                    </Link>
                  </Button>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
