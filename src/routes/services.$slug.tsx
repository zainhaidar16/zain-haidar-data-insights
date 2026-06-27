import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { PageHero } from "@/components/portfolio/PageHero";
import { Button } from "@/components/ui/button";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import {
  AlertCircle,
  ArrowLeft,
  ArrowRight,
  Zap,
  TrendingUp,
  HelpCircle,
  Code2,
} from "lucide-react";
import * as LucideIcons from "lucide-react";
import type { LucideIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";
import { motion } from "framer-motion";
import { getServiceDetailData } from "@/lib/public-data.functions";

export const Route = createFileRoute("/services/$slug")({
  loader: ({ params }) => getServiceDetailData({ data: { slug: params.slug } }),
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
  const { service } = Route.useLoaderData();

  // ─── Error / Not Found State ────────────────────────────────────────────────
  if (!service) {
    return (
      <main className="bg-[var(--site-bg)] min-h-screen flex flex-col justify-between font-poppins text-[var(--text-soft)]">
        <Header />
        <div className="flex-grow flex items-center justify-center py-12 md:py-20">
          <div className="max-w-md p-8 bg-[var(--site-bg-soft)] border border-[var(--border)] rounded-3xl text-center shadow-sm">
            <AlertCircle className="h-10 w-10 text-red-600 mx-auto mb-4" />
            <h2 className="text-lg font-bold text-[var(--text-main)] mb-2">
              Service Not Found
            </h2>
            <p className="text-xs text-[var(--text-soft)] mb-6">
              The service you requested does not exist or has been removed.
            </p>
            <Button
              asChild
              variant="outline"
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
    <main className="bg-[var(--site-bg)] min-h-screen flex flex-col font-poppins text-[var(--text-soft)]">
      <Header />

      <PageHero
        eyebrow="Service"
        title={heroTitle || service.title}
        description={heroDescription || service.short_description || "Explore the workflow, deliverables, and business outcomes for this service."}
        before={
          <Link
            to="/services"
            className="inline-flex items-center gap-2 text-[12px] font-normal uppercase tracking-wider text-[var(--text-muted)] hover:text-[var(--text-main)] transition-colors"
          >
            <ArrowLeft className="h-3.5 w-3.5 text-[var(--text-muted)]" /> Back to Services
          </Link>
        }
        meta={
          <span className="inline-flex items-center gap-3">
            <span className="h-10 w-10 rounded-2xl bg-[var(--purple-soft)] border border-[var(--border)] flex items-center justify-center">
              <Icon className="h-5 w-5 text-[var(--purple)]" />
            </span>
            <span>{service.title}</span>
          </span>
        }
        actions={
          <>
            <Button asChild variant="primary" size="lg">
              <Link to="/contact">
                <span>Contact Me</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="outline" size="lg">
              <Link to="/services">All Services</Link>
            </Button>
          </>
        }
      />

      {/* 2. SERVICE OVERVIEW — Full Description */}
      {fullDescription && (
        <section className="py-12 md:py-20 bg-[var(--site-bg-soft)] border-b border-[var(--border)]">
          <div className="section-container px-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="max-w-[800px] mx-auto bg-[var(--site-bg-soft)] border border-[var(--border)] rounded-3xl p-8 md:p-12 shadow-sm"
            >
              <div className="flex items-center gap-3 mb-6">
                <div className="h-8 w-8 rounded-lg bg-[var(--purple-soft)] flex items-center justify-center">
                  <LucideIcons.FileText className="h-4 w-4 text-[var(--purple)]" />
                </div>
                <h2 className="text-xl sm:text-2xl font-bold text-[var(--text-main)] tracking-normal">
                  About This Service
                </h2>
              </div>
              <div className="prose prose-sm sm:prose-base max-w-none text-[var(--text-soft)] leading-[1.8] [&_h1]:text-[var(--text-main)] [&_h2]:text-[var(--text-main)] [&_h3]:text-[var(--text-main)] [&_h4]:text-[var(--text-main)] [&_strong]:text-[var(--text-main)] [&_li]:marker:text-[var(--purple)] [&_p]:mb-4 [&_ul]:list-disc [&_ul]:pl-5 [&_ul]:space-y-2">
                <ReactMarkdown>{fullDescription}</ReactMarkdown>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* 3. PROBLEMS I SOLVE */}
      {problemsSolved.length > 0 && (
        <section className="py-12 md:py-20 bg-[var(--site-bg)] border-b border-[var(--border)]">
          <div className="section-container px-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="text-center mb-16">
                <span className="text-[11px] font-normal uppercase tracking-widest text-[var(--text-muted)] mb-3 block">
                  Challenges
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-main)] tracking-normal">
                  Problems I Solve
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
                    className="p-6 bg-[var(--site-bg-soft)] border border-[var(--border)] rounded-2xl flex items-start gap-4 hover:border-[var(--card-border-hover)] hover:bg-[var(--card-bg-soft)] transition-all duration-300 shadow-sm"
                  >
                    <div className="h-9 w-9 rounded-xl bg-[var(--purple-soft)] border border-[rgba(112,72,232,0.15)] flex items-center justify-center shrink-0 mt-0.5">
                      <Zap className="h-4.5 w-4.5 text-[var(--purple)]" />
                    </div>
                    <p className="text-sm text-[var(--text-soft)] leading-relaxed font-normal">{problem}</p>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* 4. DELIVERABLES */}
      {deliverables.length > 0 && (
        <section className="py-12 md:py-20 bg-[var(--site-bg-soft)] border-b border-[var(--border)]">
          <div className="section-container px-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="text-center mb-16">
                <span className="text-[11px] font-normal uppercase tracking-widest text-[var(--text-muted)] mb-3 block">
                  What You Get
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-main)] tracking-normal">
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
                    className="flex items-start gap-4 p-5 rounded-2xl border border-[var(--border)] bg-[var(--site-bg-soft)] hover:border-[var(--card-border-hover)] hover:bg-[var(--card-bg-soft)] transition-all duration-300 shadow-sm"
                  >
                    <div className="h-8 w-8 rounded-lg bg-[var(--purple-soft)] flex items-center justify-center shrink-0 mt-0.5">
                      <LucideIcons.PackageCheck className="h-4.5 w-4.5 text-[var(--purple)]" />
                    </div>
                    <span className="text-sm text-[var(--text-soft)] leading-relaxed font-normal">
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
        <section className="py-12 md:py-20 bg-[var(--site-bg)] border-b border-[var(--border)]">
          <div className="section-container px-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="text-center mb-16">
                <span className="text-[11px] font-normal uppercase tracking-widest text-[var(--text-muted)] mb-3 block">
                  Why Choose This Service
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-main)] tracking-normal">
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
                    className="p-6 bg-[var(--site-bg-soft)] border border-[var(--border)] rounded-2xl flex items-start gap-4 hover:border-[var(--card-border-hover)] hover:bg-[var(--card-bg-soft)] transition-all duration-300 shadow-sm"
                  >
                    <div className="h-10 w-10 rounded-xl bg-[var(--purple-soft)] border border-[rgba(112,72,232,0.15)] flex items-center justify-center shrink-0">
                      <TrendingUp className="h-5 w-5 text-[var(--purple)]" />
                    </div>
                    <div>
                      <p className="text-sm text-[var(--text-main)] font-normal leading-relaxed">
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
        <section className="py-12 md:py-20 bg-[var(--site-bg-soft)] border-b border-[var(--border)]">
          <div className="section-container px-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="max-w-[780px] mx-auto text-center"
            >
              <span className="text-[11px] font-normal uppercase tracking-widest text-[var(--text-muted)] mb-3 block">
                Tools & Platforms
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-main)] tracking-normal mb-10">
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
                    className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-[var(--site-bg-soft)] border border-[var(--border)] text-sm font-normal text-[var(--text-main)] shadow-sm"
                  >
                    <Code2 className="h-4 w-4 text-[var(--purple)]" />
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
        <section className="py-12 md:py-20 bg-[var(--site-bg)] border-b border-[var(--border)]">
          <div className="section-container px-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
            >
              <div className="text-center mb-16">
                <span className="text-[11px] font-normal uppercase tracking-widest text-[var(--text-muted)] mb-3 block">
                  How It Works
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-main)] tracking-normal">
                  My Process
                </h2>
              </div>

              <div className="max-w-[800px] mx-auto relative">
                {/* Vertical timeline line */}
                <div className="absolute left-[23px] top-4 bottom-4 w-px bg-[var(--border)] hidden sm:block" />

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
                      <div className="h-12 w-12 rounded-2xl bg-[var(--site-bg-soft)] border border-[var(--border)] flex items-center justify-center shrink-0 relative z-10 shadow-sm">
                        <span className="text-sm font-normal text-[var(--purple)]">
                          {String(idx + 1).padStart(2, "0")}
                        </span>
                      </div>

                      {/* Step content */}
                      <div className="p-6 bg-[var(--site-bg-soft)] border border-[var(--border)] rounded-2xl flex-1 hover:border-[var(--card-border-hover)] hover:bg-[var(--card-bg-soft)] transition-all duration-300 shadow-sm">
                        {step.title && (
                          <h3 className="text-base font-semibold text-[var(--text-main)] mb-2">{step.title}</h3>
                        )}
                        {step.description && (
                          <p className="text-sm text-[var(--text-soft)] leading-relaxed">
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
        <section className="py-12 md:py-20 bg-[var(--site-bg-soft)] border-b border-[var(--border)]">
          <div className="section-container px-6 max-w-7xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.5, ease: EASE }}
              className="max-w-[780px] mx-auto"
            >
              <div className="text-center mb-16">
                <span className="text-[11px] font-normal uppercase tracking-widest text-[var(--text-muted)] mb-3 block">
                  Common Questions
                </span>
                <h2 className="text-2xl sm:text-3xl font-bold text-[var(--text-main)] tracking-normal">
                  Frequently Asked Questions
                </h2>
              </div>

              <Accordion type="single" collapsible className="space-y-4">
                {faqItems.map((faq, idx) => (
                  <AccordionItem
                    key={idx}
                    value={`faq-${idx}`}
                    className="border border-[var(--border)] rounded-2xl bg-[var(--site-bg-soft)] px-6 data-[state=open]:border-[var(--card-border-hover)] hover:bg-[var(--card-bg-soft)] transition-all duration-300 shadow-sm"
                  >
                    <AccordionTrigger className="text-sm sm:text-base font-normal text-[var(--text-main)] hover:no-underline py-5 gap-3">
                      <span className="flex items-center gap-4 text-left">
                        <HelpCircle className="h-5 w-5 text-[var(--purple)] shrink-0" />
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="text-sm text-[var(--text-soft)] leading-relaxed pb-5 pl-9 border-t border-[var(--border)] pt-4">
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
      <section className="py-12 md:py-20 bg-[var(--site-bg)] relative overflow-hidden">
        <div className="section-container px-6 max-w-7xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <div className="bg-[var(--site-bg-soft)] border border-[var(--border)] rounded-3xl p-8 sm:p-12 md:p-16 max-w-[1000px] mx-auto relative overflow-hidden shadow-sm">
              {/* Inner glow */}
              <div className="absolute -bottom-24 -right-24 w-[280px] h-[280px] rounded-full bg-[rgba(112,72,232,0.02)] blur-3xl pointer-events-none" />

              <div className="flex flex-col sm:flex-row justify-between items-center gap-8 relative z-10">
                <div className="space-y-4 text-center sm:text-left max-w-lg">
                  <h2 className="font-bold text-[var(--text-main)] text-xl sm:text-2xl md:text-3xl tracking-normal leading-tight">
                    {ctaTitle || `Ready to get started with ${service.title}?`}
                  </h2>
                  {ctaDescription && (
                    <p className="text-[var(--text-soft)] text-sm md:text-base leading-relaxed">
                      {ctaDescription}
                    </p>
                  )}
                </div>
                <div className="shrink-0">
                  <Button
                    asChild
                    variant="primary"
                    size="lg"
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
