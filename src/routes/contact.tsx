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
    <main className="bg-[#0A0A0B] min-h-screen flex flex-col font-poppins text-[#FFFFFF]">
      <Header />

      <PageHero
        eyebrow="Contact Scoping"
        title="Let's discuss your data objectives."
        description="Ready to automate manual reports or restructure disconnected databases? Send a message or book a call directly on my calendar."
      />

      <section className="py-16 flex-grow bg-[#0A0A0B]">
        <div className="mx-auto max-w-[1200px] px-6 space-y-12">
          <div className="grid lg:grid-cols-12 gap-10">
            {/* Left Column: Form & Calendly */}
            <div className="lg:col-span-7 space-y-6">
              {/* Form Card */}
              <div className="bg-[#16161A] border border-[#26262B] rounded-3xl p-6 sm:p-10 shadow-2xl">
                {/* Typical Response Time & Status Alert */}
                <div className="flex items-center gap-3 bg-[#FF6B00]/10 border border-[#FF6B00]/25 rounded-2xl px-4 py-3 mb-6">
                  <Clock className="h-4.5 w-4.5 text-[#FF6B00] shrink-0" />
                  <p className="text-[#FFFFFF] text-xs font-semibold leading-normal">
                    Typical Response Time:{" "}
                    <span className="font-bold text-[#FF6B00]">Within 24 hours</span>
                  </p>
                </div>

                {state === "ok" ? (
                  <div className="text-center py-10 space-y-5">
                    <div className="mx-auto h-12 w-12 rounded-full border border-[#FF6B00]/40 grid place-items-center bg-[#FF6B00]/10 text-[#FF6B00] animate-pulse">
                      <Check className="h-5 w-5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-[#FFFFFF]">Message received!</h3>
                      <p className="text-[#A1A1AA] text-xs sm:text-sm font-medium max-w-sm mx-auto leading-relaxed">
                        Thank you for reaching out. I have logged your analytics parameters and will
                        contact you shortly.
                      </p>
                    </div>
                    <button
                      onClick={() => setState("idle")}
                      className="text-xs text-[#A1A1AA] border-b border-[#26262B] pb-0.5 font-bold hover:text-[#FF6B00] hover:border-[#FF6B00] transition-colors duration-250 cursor-pointer"
                    >
                      Send another inquiry
                    </button>
                  </div>
                ) : (
                  <form onSubmit={onSubmit} className="space-y-6">
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
                        <label className="block text-[10px] uppercase tracking-wider text-[#A1A1AA] font-bold mb-2">
                          Project Classification
                        </label>
                        <select
                          name="project_type"
                          className="w-full rounded-xl bg-[#111113] border border-[#26262B] px-4 py-3 text-xs focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/20 transition-all text-[#FFFFFF] font-semibold cursor-pointer"
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
                      <label className="block text-[10px] uppercase tracking-wider text-[#A1A1AA] font-bold mb-2">
                        Project Budget (optional)
                      </label>
                      <select
                        name="budget"
                        className="w-full rounded-xl bg-[#111113] border border-[#26262B] px-4 py-3 text-xs focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/20 transition-all text-[#FFFFFF] font-semibold cursor-pointer"
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
                      <label className="block text-[10px] uppercase tracking-wider text-[#A1A1AA] font-bold mb-2">
                        Message &amp; Scope Details
                      </label>
                      <textarea
                        name="message"
                        rows={6}
                        placeholder="Please describe the core business problem you are looking to solve, the current data format (Excel, SQL DB, APIs), and your desired deliverables."
                        className="w-full rounded-xl bg-[#111113] border border-[#26262B] px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/20 transition-all resize-y text-[#FFFFFF] font-normal leading-relaxed"
                      />
                      {errors.message && (
                        <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.message}</p>
                      )}
                    </div>

                    {/* Data Security & Confidentiality Reassurance */}
                    <div className="flex gap-3 items-start bg-[#0A0A0B] border border-[#26262B] rounded-2xl px-4 py-3.5 text-[11px] sm:text-xs text-[#A1A1AA] font-normal leading-relaxed shadow-sm">
                      <ShieldCheck className="h-4.5 w-4.5 text-[#FF6B00] shrink-0 mt-0.5" />
                      <span>
                        <strong className="text-[#FFFFFF]">Confidentiality Reassurance:</strong>{" "}
                        Your privacy is paramount. All data and parameters submitted through this
                        scoping gateway are encrypted, strictly confidential, and protected. I never
                        share details with external entities.
                      </span>
                    </div>

                    {state === "error" && (
                      <div className="p-4 bg-[#16161A] border border-[#FF6B00]/25 rounded-xl flex items-center gap-3 text-rose-400 text-xs">
                        <AlertCircle className="h-4 w-4 shrink-0 text-[#FF6B00]" />
                        <span>{errorMsg}</span>
                      </div>
                    )}

                    <Button
                      type="submit"
                      variant="primary"
                      disabled={state === "loading"}
                      className="w-full bg-[#FF6B00] hover:bg-[#FF7D26] text-[#FFFFFF] font-semibold py-3 rounded-full flex items-center justify-center gap-2 transition-all duration-200 shadow-md"
                    >
                      {state === "loading" ? (
                        <Loader2 className="h-4 w-4 animate-spin text-[#FFFFFF]" />
                      ) : null}
                      Submit Inquiry
                    </Button>
                  </form>
                )}
              </div>

              {/* Calendly Call Scheduling */}
              <div className="bg-[#16161A] border border-[#26262B] rounded-3xl p-6 sm:p-8 shadow-2xl flex flex-col sm:flex-row items-start gap-4 hover:border-[#FF6B00]/40 transition-all duration-300 group">
                <div className="h-10 w-10 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center shrink-0 text-[#FF6B00] group-hover:scale-105 transition-transform">
                  <CalendarRange className="h-5 w-5" />
                </div>
                <div className="space-y-4 flex-1">
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-[#FFFFFF] text-sm sm:text-base tracking-tight">
                      Prefer a direct scoping call?
                    </h3>
                    <p className="text-[#A1A1AA] text-xs sm:text-sm leading-relaxed font-normal">
                      Schedule a complimentary 15-minute analytical consultation directly on my
                      Calendly. We will scope your metrics and map technical deliverables.
                    </p>
                  </div>
                  <Button
                    asChild
                    variant="primary"
                    className="bg-[#FF6B00] hover:bg-[#FF7D26] text-[#FFFFFF] font-semibold rounded-full px-5 py-2.5 transition-all duration-200 shadow-md"
                  >
                    <a
                      href="https://calendly.com/zainhaider"
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2"
                    >
                      <span>Schedule on Calendly</span>
                      <ArrowRight className="h-4 w-4 transform group-hover:translate-x-0.5 transition-transform" />
                    </a>
                  </Button>
                </div>
              </div>
            </div>

            {/* Right Column: Contact Channels & Professional Closing Note */}
            <div className="lg:col-span-5 space-y-6">
              {/* Contact Channels Grid */}
              <div className="space-y-4">
                <p className="text-[10px] font-bold uppercase tracking-wider text-[#A1A1AA] pl-2">
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
              <div className="bg-[#16161A] border border-[#26262B] rounded-3xl p-6 sm:p-8 shadow-2xl border-t-4 border-t-[#FF6B00]">
                <div className="space-y-4">
                  <span className="text-[9px] uppercase font-bold text-[#FFFFFF] tracking-wider">
                    A Closing Note
                  </span>
                  <p className="text-[#A1A1AA] text-xs sm:text-[13px] leading-relaxed font-normal">
                    Let's build something exceptional together. Whether resolving manual operational
                    database sync breaks, writing dbt schemas, or architecting interactive executive
                    dashboards in Power BI, I am fully committed to delivering clarity, speed, and
                    tangible commercial outcomes to your team.
                  </p>
                  <div className="pt-4 border-t border-[#26262B] flex items-center gap-3.5">
                    <div className="h-8 w-8 rounded-full bg-[#111113] border border-[#26262B] flex items-center justify-center font-bold text-[#FFFFFF] text-[10px]">
                      ZH
                    </div>
                    <div>
                      <h4 className="font-bold text-[#FFFFFF] text-xs">Zain Haidar</h4>
                      <p className="text-[9px] font-semibold text-[#FF6B00] uppercase tracking-widest mt-0.5">
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
    <div className="w-full">
      <label className="block text-[10px] uppercase tracking-wider text-[#A1A1AA] font-bold mb-2">
        {label}
      </label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl bg-[#111113] border border-[#26262B] px-4 py-3 text-xs focus:outline-none focus:border-[#FF6B00] focus:ring-1 focus:ring-[#FF6B00]/20 transition-all text-[#FFFFFF] font-semibold"
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
    <div className="bg-[#16161A] border border-[#26262B] p-5 flex items-center gap-4 hover:border-[#FF6B00]/40 transition-all duration-300 group rounded-2xl shadow-lg">
      <div className="h-10 w-10 rounded-xl bg-[#FF6B00]/10 border border-[#FF6B00]/20 flex items-center justify-center shrink-0 text-[#FF6B00] transition-transform duration-200 group-hover:scale-105">
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[9px] font-bold uppercase tracking-wider text-[#A1A1AA] leading-none">
          {label}
        </div>
        <div className="font-bold text-[#FFFFFF] truncate mt-1.5 text-xs sm:text-[13px]">
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
