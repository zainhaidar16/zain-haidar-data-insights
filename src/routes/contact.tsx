import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { PageHero } from "@/components/portfolio/PageHero";
import { getErrorMessage } from "@/lib/utils";
import { createLead } from "@/lib/api";
import {
  Mail,
  MapPin,
  Linkedin,
  Github,
  FileDown,
  Loader2,
  Check,
  AlertCircle,
  Phone,
  Clock,
  ShieldCheck,
  CalendarRange,
  ArrowRight,
  Globe,
} from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Zain Haidar — Data Analyst & BI Specialist" },
      {
        name: "description",
        content:
          "Reach out to Zain Haidar to discuss Business Intelligence dashboard design, SQL optimization, ETL pipeline automation, or custom analytical software.",
      },
      { property: "og:title", content: "Contact Zain Haidar — Data Analyst & BI Specialist" },
      {
        property: "og:description",
        content: "Reach out to build automated, secure, and revenue-driving analytics platforms.",
      },
    ],
  }),
  component: ContactPage,
});

const ClientSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Enter a valid email").max(320),
  company: z
    .string()
    .trim()
    .max(200)
    .optional()
    .transform((v) => (v === "" ? undefined : v)),
  project_type: z
    .enum([
      "Power BI Dashboard",
      "Data Analysis",
      "ETL / Data Cleaning",
      "Analytics Web App",
      "Other",
      "",
    ])
    .optional()
    .transform((v) => (v === "" ? undefined : v)),
  budget: z
    .enum(["Under €500", "€500 - €1,000", "€1,000 - €3,000", "€3,000+", "Not sure yet", ""])
    .optional()
    .transform((v) => (v === "" ? undefined : v)),
  message: z.string().trim().min(1, "Message is required").max(5000),
});

function ContactPage() {
  const [state, setState] = useState<"idle" | "loading" | "ok" | "error">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [errorMsg, setErrorMsg] = useState("");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setErrors({});
    setErrorMsg("");
    const fd = new FormData(e.currentTarget);
    const raw = {
      name: String(fd.get("name") ?? ""),
      email: String(fd.get("email") ?? ""),
      company: String(fd.get("company") ?? "") || undefined,
      project_type: String(fd.get("project_type") ?? "") || undefined,
      budget: String(fd.get("budget") ?? "") || undefined,
      message: String(fd.get("message") ?? ""),
    };
    const parsed = ClientSchema.safeParse(raw);
    if (!parsed.success) {
      const fe: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        fe[String(i.path[0])] = i.message;
      });
      setErrors(fe);
      return;
    }
    setState("loading");
    try {
      await createLead(parsed.data);
      setState("ok");
      (e.target as HTMLFormElement).reset();
    } catch (err: unknown) {
      setState("error");
      setErrorMsg(
        getErrorMessage(
          err,
          "Something went wrong with the database connection. Please reach out directly via email.",
        ),
      );
      console.error("Supabase contact form submission failed:", err);
    }
  }

  return (
    <main className="bg-[#0F172A] min-h-screen flex flex-col font-sans text-[#F8FAFC]">
      <Header />

      <PageHero
        eyebrow="Contact Scoping"
        title="Let's discuss your data objectives."
        description="Ready to automate manual reports or restructure disconnected databases? Send a message or book a call directly on my calendar."
      />

      <section className="py-16 flex-grow">
        <div className="section-container space-y-12">
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Left Column: Form & Calendly */}
            <div className="lg:col-span-7 space-y-6">
              {/* Form Card */}
              <div className="bg-[#0F172A] border border-[#334155] rounded-3xl p-6 sm:p-10 shadow-sm">
                {/* Typical Response Time & Status Alert */}
                <div className="flex items-center gap-2 bg-[#2563EB]/10 border border-[#2563EB]/25 rounded-2xl px-4 py-3 mb-6">
                  <Clock className="h-4.5 w-4.5 text-[#2563EB] shrink-0" />
                  <p className="text-[#F8FAFC] text-xs font-semibold leading-normal">
                    Typical Response Time: <span className="font-bold">Within 24 hours</span>
                  </p>
                </div>

                {state === "ok" ? (
                  <div className="text-center py-10 space-y-5">
                    <div className="mx-auto h-12 w-12 rounded-full border border-[#2563EB]/40 grid place-items-center bg-[#2563EB]/10 text-[#2563EB] animate-pulse">
                      <Check className="h-5 w-5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-[#F8FAFC]">Message received!</h3>
                      <p className="text-[#94A3B8] text-xs sm:text-sm font-medium max-w-sm mx-auto leading-relaxed">
                        Thank you for reaching out. I have logged your analytics parameters and will
                        contact you shortly.
                      </p>
                    </div>
                    <button
                      onClick={() => setState("idle")}
                      className="text-xs text-[#94A3B8] border-b border-[#475569] pb-0.5 font-bold hover:text-[#2563EB] hover:border-[#2563EB] transition cursor-pointer"
                    >
                      Send another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-5">
                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field
                        name="name"
                        label="Your Name"
                        placeholder="Zain Haidar"
                        error={errors.name}
                      />
                      <Field
                        name="email"
                        type="email"
                        label="Email Address"
                        placeholder="zain@company.com"
                        error={errors.email}
                      />
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field
                        name="company"
                        label="Company (optional)"
                        placeholder="Enterprise / Freelance"
                        error={errors.company}
                      />

                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-[#94A3B8] font-bold mb-2">
                          Project Classification
                        </label>
                        <select
                          name="project_type"
                          className="w-full rounded-xl bg-[#1E293B] border border-[#334155] px-4 py-3 text-xs focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20 transition text-[#F8FAFC] font-semibold cursor-pointer"
                        >
                          <option value="">Select a service type...</option>
                          <option value="Power BI Dashboard">
                            Power BI / Business Intelligence
                          </option>
                          <option value="Data Analysis">SQL / Python Data Analysis</option>
                          <option value="ETL / Data Cleaning">ETL / Data Engineering</option>
                          <option value="Analytics Web App">Custom Analytics Software</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.project_type && (
                          <p className="text-xs text-rose-500 mt-1 font-semibold">
                            {errors.project_type}
                          </p>
                        )}
                      </div>
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#94A3B8] font-bold mb-2">
                        Project Budget (optional)
                      </label>
                      <select
                        name="budget"
                        className="w-full rounded-xl bg-[#1E293B] border border-[#334155] px-4 py-3 text-xs focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20 transition text-[#F8FAFC] font-semibold cursor-pointer"
                      >
                        <option value="">Select a budget scope...</option>
                        <option value="Under €500">Under €500</option>
                        <option value="€500 - €1,000">€500 – €1,000</option>
                        <option value="€1,000 - €3,000">€1,000 – €3,000</option>
                        <option value="€3,000+">€3,000+</option>
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
                      {errors.budget && (
                        <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.budget}</p>
                      )}
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-[#94A3B8] font-bold mb-2">
                        Message &amp; Scope Details
                      </label>
                      <textarea
                        name="message"
                        rows={6}
                        placeholder="Please describe the core business problem you are looking to solve, the current data format (Excel, SQL DB, APIs), and your desired deliverables."
                        className="w-full rounded-xl bg-[#1E293B] border border-[#334155] px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20 transition resize-y text-[#F8FAFC] font-normal leading-relaxed"
                      />
                      {errors.message && (
                        <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.message}</p>
                      )}
                    </div>

                    {/* Data Security & Confidentiality Reassurance */}
                    <div className="flex gap-2.5 items-start bg-[#020617] border border-[#334155]/60 rounded-2xl px-4 py-3 text-[11px] sm:text-xs text-[#94A3B8] font-normal leading-relaxed">
                      <ShieldCheck className="h-4.5 w-4.5 text-[#2563EB] shrink-0 mt-0.5" />
                      <span>
                        <strong>Confidentiality Reassurance:</strong> Your privacy is paramount. All
                        data and parameters submitted through this scoping gateway are encrypted,
                        strictly confidential, and protected. I never share details with external
                        entities.
                      </span>
                    </div>

                    {state === "error" && (
                      <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-3 text-rose-600 text-xs">
                        <AlertCircle className="h-4 w-4 shrink-0" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <Button type="submit" variant="primary" disabled={state === "loading"}>
                      {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                      Submit Inquiry
                    </Button>
                  </form>
                )}
              </div>

              {/* Calendly Call Scheduling */}
              <div className="bg-[#0F172A] border border-[#334155] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start gap-4 hover:border-[#2563EB]/40 transition-all duration-350 group">
                <div className="h-10 w-10 rounded-xl bg-[#2563EB]/10 border border-[#93C5FD]/35 flex items-center justify-center shrink-0 text-[#2563EB] group-hover:scale-105 transition-transform">
                  <CalendarRange className="h-5 w-5" />
                </div>
                <div className="space-y-3.5 flex-1">
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-[#F8FAFC] text-sm tracking-tight">
                      Prefer a direct scoping call?
                    </h3>
                    <p className="text-[#94A3B8] text-xs leading-relaxed font-normal">
                      Schedule a complimentary 15-minute analytical consultation directly on my
                      Calendly. We will scope your metrics and map technical deliverables.
                    </p>
                  </div>
                  <Button asChild variant="primary">
                    <a
                      href="https://calendly.com/zainhaider"
                      target="_blank"
                      rel="noopener noreferrer"
                    >
                      <span>Schedule on Calendly</span>
                      <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Channels & Professional Closing Note */}
            <div className="lg:col-span-5 space-y-6">
              {/* Contact Channels Grid */}
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#94A3B8] pl-2">
                  Multiple Contact Methods
                </p>
                <div className="space-y-3">
                  <InfoTile
                    icon={Mail}
                    label="Email Address"
                    value="zainhaider72@gmail.com"
                    href="mailto:zainhaider72@gmail.com"
                  />
                  <InfoTile
                    icon={Phone}
                    label="Direct Phone (CET)"
                    value="+43 664 1234567"
                    href="tel:+436641234567"
                  />
                  <InfoTile
                    icon={Linkedin}
                    label="LinkedIn Business Profile"
                    value="linkedin.com/in/zain-haidar"
                    href="https://www.linkedin.com/in/zain-haidar/"
                  />
                  <InfoTile
                    icon={Github}
                    label="GitHub Code Repository"
                    value="github.com/zainhaidar16"
                    href="https://github.com/zainhaidar16"
                  />
                  <InfoTile
                    icon={Globe}
                    label="Kaggle Profile"
                    value="kaggle.com/zainhaidar"
                    href="https://www.kaggle.com/zainhaidar"
                  />
                  <InfoTile
                    icon={Globe}
                    label="Hugging Face Profile"
                    value="huggingface.co/zainhaidar"
                    href="https://huggingface.co/zainhaidar"
                  />
                  <InfoTile
                    icon={FileDown}
                    label="Professional Credentials (PDF)"
                    value="Zain Haidar Resume.pdf"
                    href="/Zain%20Haidar%20Resume.pdf"
                    download
                  />
                  <InfoTile
                    icon={MapPin}
                    label="Base Location"
                    value="Vienna, Austria · CET timezone"
                  />
                </div>
              </div>

              {/* Professional Closing Note Card */}
              <div className="bg-[#0F172A] border border-[#334155] rounded-3xl p-6 sm:p-8 shadow-sm border-t-4 border-t-[#2563EB]">
                <div className="space-y-4">
                  <span className="text-[9px] uppercase font-bold text-[#F8FAFC] tracking-wider">
                    A Closing Note
                  </span>
                  <p className="text-[#94A3B8] text-xs sm:text-[13px] leading-relaxed font-normal">
                    Let's build something exceptional together. Whether resolving manual operational
                    database sync breaks, writing dbt schemas, or architecting interactive executive
                    dashboards in Power BI, I am fully committed to delivering clarity, speed, and
                    tangible commercial outcomes to your team.
                  </p>
                  <div className="pt-2 border-t border-[#334155] flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#1E293B] flex items-center justify-center font-bold text-white text-[10px]">
                      ZH
                    </div>
                    <div>
                      <h4 className="font-bold text-[#F8FAFC] text-xs">Zain Haidar</h4>
                      <p className="text-[9px] font-semibold text-[#94A3B8] uppercase tracking-widest mt-0.5">
                        Vienna Analytics Consultant
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}

function Field({
  name,
  label,
  type = "text",
  placeholder,
  error,
}: {
  name: string;
  label: string;
  type?: string;
  placeholder?: string;
  error?: string;
}) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-wider text-[#94A3B8] font-bold mb-2">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl bg-[#1E293B] border border-[#334155] px-4 py-3 text-xs focus:outline-none focus:border-[#2563EB] focus:ring-1 focus:ring-[#2563EB]/20 transition text-[#F8FAFC] font-semibold"
      />
      {error && <p className="text-xs text-rose-500 mt-1 font-semibold">{error}</p>}
    </div>
  );
}

function InfoTile({
  icon: Icon,
  label,
  value,
  href,
  download,
}: {
  icon: React.ComponentType<{ className?: string }>;
  label: string;
  value: string;
  href?: string;
  download?: boolean;
}) {
  const Body = (
    <div className="bg-[#0F172A] border border-[#334155] p-5 flex items-center gap-4 hover:border-[#2563EB]/40 transition-all duration-200 group rounded-2xl shadow-sm">
      <div className="h-10 w-10 rounded-xl bg-[#2563EB]/10 border border-[#93C5FD]/35 flex items-center justify-center shrink-0 text-[#2563EB] transition-transform duration-200 group-hover:scale-105">
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[9px] font-bold uppercase tracking-wider text-[#94A3B8] leading-none">
          {label}
        </div>
        <div className="font-bold text-[#F8FAFC] truncate mt-1.5 text-xs sm:text-[13px]">
          {value}
        </div>
      </div>
    </div>
  );
  return href ? (
    <a href={href} download={download} className="block cursor-pointer">
      {Body}
    </a>
  ) : (
    Body
  );
}
