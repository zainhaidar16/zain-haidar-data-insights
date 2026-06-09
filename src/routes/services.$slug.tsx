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
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";

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
  const IconComponent = (LucideIcons as any)[iconName];
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
      } catch (err: any) {
        console.error("Failed to load service detail:", err);
        setError(err.message || "Failed to load service details.");
      } finally {
        setLoading(false);
      }
    }
    loadService();
  }, [slug]);

  // ─── Loading State ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <main className="bg-[#0E0E11] min-h-screen flex flex-col justify-between">
        <Header />
        <div className="flex-grow flex flex-col items-center justify-center gap-3 py-32">
          <Loader2 className="h-8 w-8 animate-spin text-[#FAFAFA]" />
          <span className="text-xs font-medium text-[#A1A1AA]">Loading service...</span>
        </div>
        <Footer />
      </main>
    );
  }

  // ─── Error / Not Found State ────────────────────────────────────────────────
  if (error || !service) {
    return (
      <main className="bg-[#0E0E11] min-h-screen flex flex-col justify-between">
        <Header />
        <div className="flex-grow flex items-center justify-center py-32">
          <div className="max-w-md p-6 bg-[#0E0E11] border border-[#232329] rounded-3xl shadow-sm text-center">
            <AlertCircle className="h-10 w-10 text-rose-500 mx-auto mb-3" />
            <h2 className="text-lg font-bold text-[#FAFAFA] mb-1">
              {error ? "Failed to load service details." : "Service Not Found"}
            </h2>
            <p className="text-xs text-[#A1A1AA] mb-6">
              {error || "The service you requested does not exist or has been removed."}
            </p>
            <Button asChild variant="secondary" className="text-xs">
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
    <main className="bg-[#0E0E11] min-h-screen flex flex-col">
      <Header />

      {/* ═══════════════════════════════════════════════════════════════════════
          1. HERO SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="pt-32 md:pt-40 pb-20 md:pb-28 bg-[#09090B] relative overflow-hidden hero-arc">
        {/* Decorative accent blobs */}
        <div className="absolute -top-24 -right-16 w-[420px] h-[420px] rounded-full bg-[#F97316]/8 blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[280px] h-[280px] rounded-full bg-[#09090B]/6 blur-3xl pointer-events-none" />

        <div className="section-container">
          {/* Back link */}
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-[12px] font-medium uppercase tracking-wider text-[#A1A1AA] hover:text-[#FAFAFA] transition-colors mb-8"
          >
            <ArrowLeft className="h-3.5 w-3.5" /> Back to Services
          </Link>

          <div className="max-w-3xl">
            {/* Icon + label */}
            <div className="flex items-center gap-3 mb-5">
              <div className="h-14 w-14 rounded-2xl bg-[#F97316]/10 border border-[#F97316]/30 flex items-center justify-center">
                <Icon className="h-6 w-6 text-[#F97316]" />
              </div>
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#A1A1AA]">
                Service
              </span>
            </div>

            {/* Title */}
            {heroTitle ? (
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#FAFAFA] tracking-tight leading-[1.1] mb-5">
                {heroTitle}
              </h1>
            ) : (
              <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-[#FAFAFA] tracking-tight leading-[1.1] mb-5">
                {service.title}
              </h1>
            )}

            {/* Description */}
            {heroDescription && (
              <p className="text-[#A1A1AA] text-[15px] sm:text-base leading-relaxed max-w-2xl mb-8">
                {heroDescription}
              </p>
            )}

            {/* CTA buttons */}
            <div className="flex flex-wrap gap-3">
              <Button asChild variant="primary">
                <Link to="/contact">
                  <span>Contact Me</span>
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/services">All Services</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════════════════════════════════════
          2. SERVICE OVERVIEW — Full Description
          ═══════════════════════════════════════════════════════════════════════ */}
      {fullDescription && (
        <section className="py-20 md:py-28">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="max-w-[780px] mx-auto"
            >
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FAFAFA] tracking-tight mb-8">
                About This Service
              </h2>
              <div className="prose prose-sm sm:prose-base max-w-none text-[#A1A1AA] leading-[1.85] [&_h1]:text-[#FAFAFA] [&_h2]:text-[#FAFAFA] [&_h3]:text-[#FAFAFA] [&_h4]:text-[#FAFAFA] [&_strong]:text-[#FAFAFA] [&_li]:marker:text-[#F97316]">
                <ReactMarkdown>{fullDescription}</ReactMarkdown>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          3. PROBLEMS WE SOLVE
          ═══════════════════════════════════════════════════════════════════════ */}
      {problemsSolved.length > 0 && (
        <section className="py-20 md:py-28 bg-[#09090B]">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="text-center mb-12">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#F97316] mb-2 block">
                  Challenges
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FAFAFA] tracking-tight">
                  Problems We Solve
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 max-w-[1100px] mx-auto">
                {problemsSolved.map((problem, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: idx * 0.06, ease: EASE }}
                    className="card-payoneer p-5 flex items-start gap-3.5 hover:border-[#F97316]/30"
                  >
                    <div className="h-8 w-8 rounded-xl bg-[#F97316]/10 border border-[#F97316]/30 flex items-center justify-center shrink-0 mt-0.5">
                      <Zap className="h-4 w-4 text-[#F97316]" />
                    </div>
                    <p className="text-[13px] sm:text-sm text-[#A1A1AA] leading-relaxed font-medium">
                      {problem}
                    </p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          4. DELIVERABLES
          ═══════════════════════════════════════════════════════════════════════ */}
      {deliverables.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="text-center mb-12">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#F97316] mb-2 block">
                  What You Get
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FAFAFA] tracking-tight">
                  Deliverables
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 max-w-[1000px] mx-auto">
                {deliverables.map((item, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: idx * 0.05, ease: EASE }}
                    className="flex items-start gap-3 p-4 rounded-2xl border border-[#232329] bg-[#0E0E11] hover:border-[#FDBA74]/60 transition-colors"
                  >
                    <CheckCircle2 className="h-5 w-5 text-[#F97316] shrink-0 mt-0.5" />
                    <span className="text-[13px] sm:text-sm text-[#A1A1AA] leading-relaxed font-medium">
                      {item}
                    </span>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          5. BENEFITS
          ═══════════════════════════════════════════════════════════════════════ */}
      {benefits.length > 0 && (
        <section className="py-20 md:py-28 bg-[#09090B]">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="text-center mb-12">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#F97316] mb-2 block">
                  Why Choose This Service
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FAFAFA] tracking-tight">
                  Key Benefits
                </h2>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-[900px] mx-auto">
                {benefits.map((benefit, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 14 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-40px" }}
                    transition={{ duration: 0.4, delay: idx * 0.06, ease: EASE }}
                    className="card-payoneer p-6 flex items-start gap-4 hover:border-[#F97316]/30"
                  >
                    <div className="h-10 w-10 rounded-xl bg-[#F97316]/10 border border-[#F97316]/30 flex items-center justify-center shrink-0">
                      <TrendingUp className="h-5 w-5 text-[#F97316]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#FAFAFA] font-semibold leading-relaxed">
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

      {/* ═══════════════════════════════════════════════════════════════════════
          6. TECHNOLOGY STACK
          ═══════════════════════════════════════════════════════════════════════ */}
      {technologies.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="max-w-[780px] mx-auto text-center"
            >
              <span className="text-[11px] font-bold uppercase tracking-widest text-[#F97316] mb-2 block">
                Tools & Platforms
              </span>
              <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FAFAFA] tracking-tight mb-10">
                Technology Stack
              </h2>

              <div className="flex flex-wrap justify-center gap-2.5">
                {technologies.map((tech, idx) => (
                  <motion.span
                    key={idx}
                    initial={{ opacity: 0, scale: 0.9 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.3, delay: idx * 0.04, ease: EASE }}
                    className="inline-flex items-center px-4 py-2 rounded-full bg-[#0E0E11] border border-[#232329] text-[13px] font-semibold text-[#FAFAFA] hover:border-[#F97316]/50 hover:bg-[#F97316]/10 transition-colors shadow-sm"
                  >
                    {tech}
                  </motion.span>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          7. PROCESS STEPS
          ═══════════════════════════════════════════════════════════════════════ */}
      {processSteps.length > 0 && (
        <section className="py-20 md:py-28 bg-[#09090B]">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="text-center mb-14">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#F97316] mb-2 block">
                  How It Works
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FAFAFA] tracking-tight">
                  Our Process
                </h2>
              </div>

              <div className="max-w-[800px] mx-auto relative">
                {/* Vertical timeline line */}
                <div className="absolute left-[23px] top-4 bottom-4 w-px bg-[#27272A] hidden sm:block" />

                <div className="space-y-6">
                  {processSteps.map((step, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -16 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: "-40px" }}
                      transition={{ duration: 0.45, delay: idx * 0.08, ease: EASE }}
                      className="flex gap-5 items-start"
                    >
                      {/* Step number */}
                      <div className="h-12 w-12 rounded-2xl bg-[#0E0E11] border border-[#232329] flex items-center justify-center shrink-0 relative z-10 shadow-sm">
                        <span className="text-sm font-extrabold text-[#F97316]">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Step content */}
                      <div className="card-payoneer p-5 sm:p-6 flex-1 hover:border-[#F97316]/30">
                        {step.title && (
                          <h3 className="text-[15px] font-bold text-[#FAFAFA] mb-1.5">
                            {step.title}
                          </h3>
                        )}
                        {step.description && (
                          <p className="text-[13px] text-[#A1A1AA] leading-relaxed">
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

      {/* ═══════════════════════════════════════════════════════════════════════
          8. FAQ SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      {faqItems.length > 0 && (
        <section className="py-20 md:py-28">
          <div className="section-container">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="max-w-[780px] mx-auto"
            >
              <div className="text-center mb-12">
                <span className="text-[11px] font-bold uppercase tracking-widest text-[#F97316] mb-2 block">
                  Common Questions
                </span>
                <h2 className="text-2xl sm:text-3xl font-extrabold text-[#FAFAFA] tracking-tight">
                  Frequently Asked Questions
                </h2>
              </div>

              <Accordion type="single" collapsible className="space-y-3">
                {faqItems.map((faq, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`faq-${idx}`}
                    className="border border-[#232329] rounded-2xl bg-[#0E0E11] px-5 shadow-sm data-[state=open]:border-[#FDBA74]/60 transition-colors"
                  >
                    <AccordionTrigger className="text-sm font-semibold text-[#FAFAFA] hover:no-underline py-5 gap-3">
                      <span className="flex items-center gap-3 text-left">
                        <HelpCircle className="h-4 w-4 text-[#F97316] shrink-0" />
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-[13px] text-[#A1A1AA] leading-relaxed pb-5 pl-7">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                ))}
              </Accordion>
            </motion.div>
          </div>
        </section>
      )}

      {/* ═══════════════════════════════════════════════════════════════════════
          9. FINAL CTA SECTION
          ═══════════════════════════════════════════════════════════════════════ */}
      <section className="py-20 md:py-28 bg-[#09090B]">
        <div className="section-container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="bg-[#131316] rounded-3xl p-8 sm:p-12 md:p-16 max-w-[1000px] mx-auto">
              <div className="flex flex-col sm:flex-row justify-between items-center gap-8">
                <div className="space-y-3 text-center sm:text-left max-w-lg">
                  <h2 className="font-extrabold text-white text-xl sm:text-2xl tracking-tight leading-tight">
                    {ctaTitle || `Ready to get started with ${service.title}?`}
                  </h2>
                  {ctaDescription && (
                    <p className="text-[#A1A1AA] text-[14px] leading-relaxed">
                      {ctaDescription}
                    </p>
                  )}
                </div>
                <div className="shrink-0">
                  <Button asChild variant="primary" size="lg">
                    <Link to="/contact">
                      <span>Contact Me</span>
                      <ArrowRight className="h-4 w-4" />
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
