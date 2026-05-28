import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { createLead } from "@/lib/api";
import { Mail, MapPin, Linkedin, Github, FileDown, Loader2, Check, AlertCircle, Phone, Clock, ShieldCheck, CalendarRange, ArrowRight, Globe } from "lucide-react";
import { Button } from "@/components/ui/button";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact Zain Haidar — Data Analyst & BI Specialist" },
      { name: "description", content: "Reach out to Zain Haidar to discuss Business Intelligence dashboard design, SQL optimization, ETL pipeline automation, or custom analytical software." },
      { property: "og:title", content: "Contact Zain Haidar — Data Analyst & BI Specialist" },
      { property: "og:description", content: "Reach out to build automated, secure, and revenue-driving analytics platforms." },
    ],
  }),
  component: ContactPage,
});

const ClientSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(200),
  email: z.string().trim().email("Enter a valid email").max(320),
  company: z.string().trim().max(200).optional().transform(v => v === "" ? undefined : v),
  project_type: z.enum(["Power BI Dashboard", "Data Analysis", "ETL / Data Cleaning", "Analytics Web App", "Other", ""]).optional().transform(v => v === "" ? undefined : v),
  budget: z.enum(["Under €500", "€500 - €1,000", "€1,000 - €3,000", "€3,000+", "Not sure yet", ""]).optional().transform(v => v === "" ? undefined : v),
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
    } catch (err: any) {
      setState("error");
      setErrorMsg("Something went wrong with the database connection. Please reach out directly via email.");
      console.error("Supabase contact form submission failed:", err);
    }
  }

  return (
    <main className="bg-[#F8F7F3] min-h-screen flex flex-col font-sans text-[#111111]">
      <Header />
      
      <section className="pt-32 md:pt-40 pb-24 flex-grow">
        <div className="mx-auto max-w-[1200px] px-5 sm:px-8 space-y-12">
          
          {/* Header */}
          <div className="max-w-3xl space-y-3">
            <p className="text-[12px] font-semibold uppercase tracking-widest text-gray-500">Contact Scoping</p>
            <h1 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#111111] tracking-tight leading-tight">
              Let's Discuss Your Data Scopes &amp; Objectives
            </h1>
            <p className="text-gray-600 text-xs sm:text-[14px] leading-relaxed font-medium">
              Ready to automate manual reports or restructure disconnected databases? Send a message through the encrypted scoping form or secure a call directly on my calendar.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-10">
            
            {/* Left Column: Form & Calendly */}
            <div className="lg:col-span-7 space-y-6">
              
              {/* Form Card */}
              <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-10 shadow-sm">
                
                {/* Typical Response Time & Status Alert */}
                <div className="flex items-center gap-2 bg-[#F2FBD9] border border-[#D7FF3F]/30 rounded-2xl px-4 py-3 mb-6">
                  <Clock className="h-4.5 w-4.5 text-[#111111] shrink-0" />
                  <p className="text-[#111111] text-xs font-semibold leading-normal">
                    Typical Response Time: <span className="font-bold">Within 24 hours</span>
                  </p>
                </div>

                {state === "ok" ? (
                  <div className="text-center py-10 space-y-5">
                    <div className="mx-auto h-12 w-12 rounded-full border border-emerald-200 grid place-items-center bg-emerald-50 text-emerald-600 animate-pulse">
                      <Check className="h-5 w-5" />
                    </div>
                    <div className="space-y-2">
                      <h3 className="text-xl font-bold text-[#111111]">Message received!</h3>
                      <p className="text-gray-500 text-xs sm:text-sm font-medium max-w-sm mx-auto leading-relaxed">
                        Thank you for reaching out. I have logged your analytics parameters and will contact you shortly.
                      </p>
                    </div>
                    <button
                      onClick={() => setState("idle")}
                      className="text-xs text-gray-700 border-b border-gray-700 pb-0.5 font-bold hover:text-[#111111] transition cursor-pointer"
                    >
                      Send another inquiry
                    <Button type="submit" variant="primary" disabled={state === "loading"}>
                      {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                      Submit Inquiry
                    </Button>
                    </div>

                    <div className="grid sm:grid-cols-2 gap-5">
                      <Field name="company" label="Company (optional)" placeholder="Enterprise / Freelance" error={errors.company} />
                      
                      <div>
                        <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-2">
                          Project Classification
                        </label>
                        <select
                          name="project_type"
                          className="w-full rounded-xl bg-gray-50 border border-[#E5E7EB] px-4 py-3 text-xs focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111]/20 transition text-[#111111] font-semibold cursor-pointer"
                        >
                          <option value="">Select a service type...</option>
                          <option value="Power BI Dashboard">Power BI / Business Intelligence</option>
                          <option value="Data Analysis">SQL / Python Data Analysis</option>
                          <option value="ETL / Data Cleaning">ETL / Data Engineering</option>
                          <option value="Analytics Web App">Custom Analytics Software</option>
                          <option value="Other">Other</option>
                        </select>
                        {errors.project_type && <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.project_type}</p>}
                      </div>
                    </div>
                    
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-2">
                        Project Budget (optional)
                      </label>
                      <select
                        name="budget"
                        className="w-full rounded-xl bg-gray-50 border border-[#E5E7EB] px-4 py-3 text-xs focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111]/20 transition text-[#111111] font-semibold cursor-pointer"
                      >
                        <option value="">Select a budget scope...</option>
                        <option value="Under €500">Under €500</option>
                        <option value="€500 - €1,000">€500 – €1,000</option>
                        <option value="€1,000 - €3,000">€1,000 – €3,000</option>
                        <option value="€3,000+">€3,000+</option>
                        <option value="Not sure yet">Not sure yet</option>
                      </select>
                      {errors.budget && <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.budget}</p>}
                    </div>

                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-2">
                        Message &amp; Scope Details
                      </label>
                      <textarea
                        name="message"
                        rows={6}
                        placeholder="Please describe the core business problem you are looking to solve, the current data format (Excel, SQL DB, APIs), and your desired deliverables."
                        className="w-full rounded-xl bg-gray-50 border border-[#E5E7EB] px-4 py-3 text-xs sm:text-sm focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111]/20 transition resize-y text-[#111111] font-normal leading-relaxed"
                      />
                      {errors.message && <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.message}</p>}
                    </div>

                    {/* Data Security & Confidentiality Reassurance */}
                    <div className="flex gap-2.5 items-start bg-gray-50 border border-[#E5E7EB]/60 rounded-2xl px-4 py-3 text-[11px] sm:text-xs text-gray-500 font-normal leading-relaxed">
                      <ShieldCheck className="h-4.5 w-4.5 text-emerald-600 shrink-0 mt-0.5" />
                      <span>
                        <strong>Confidentiality Reassurance:</strong> Your privacy is paramount. All data and parameters submitted through this scoping gateway are encrypted, strictly confidential, and protected. I never share details with external entities.
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
              <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 shadow-sm flex flex-col sm:flex-row items-start gap-4 hover:border-gray-400 transition-all duration-350 group">
                <div className="h-10 w-10 rounded-xl bg-[#F2FBD9] border border-[#D7FF3F]/35 flex items-center justify-center shrink-0 text-[#111111] group-hover:scale-105 transition-transform">
                  <CalendarRange className="h-5 w-5" />
                </div>
                <div className="space-y-3.5 flex-1">
                  <div className="space-y-1">
                    <h3 className="font-extrabold text-[#111111] text-sm tracking-tight">Prefer a direct scoping call?</h3>
                    <p className="text-gray-500 text-xs leading-relaxed font-normal">
                      Schedule a complimentary 15-minute analytical consultation directly on my Calendly. We will scope your metrics and map technical deliverables.
                    </p>
                  </div>
                  <Button asChild variant="primary">
                    <a href="https://calendly.com/zainhaider" target="_blank" rel="noopener noreferrer">
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
                <p className="text-[10px] font-bold uppercase tracking-wider text-gray-400 pl-2">Multiple Contact Methods</p>
                <div className="space-y-3">
                  <InfoTile icon={Mail} label="Email Address" value="zainhaider72@gmail.com" href="mailto:zainhaider72@gmail.com" />
                  <InfoTile icon={Phone} label="Direct Phone (CET)" value="+43 664 1234567" href="tel:+436641234567" />
                  <InfoTile icon={Linkedin} label="LinkedIn Business Profile" value="linkedin.com/in/zain-haidar" href="https://www.linkedin.com/in/zain-haidar/" />
                  <InfoTile icon={Github} label="GitHub Code Repository" value="github.com/zainhaidar16" href="https://github.com/zainhaidar16" />
                  <InfoTile icon={Globe} label="Kaggle Profile" value="kaggle.com/zainhaidar" href="https://www.kaggle.com/zainhaidar" />
                  <InfoTile icon={Globe} label="Hugging Face Profile" value="huggingface.co/zainhaidar" href="https://huggingface.co/zainhaidar" />
                  <InfoTile icon={FileDown} label="Professional Credentials (PDF)" value="Zain Haidar Resume.pdf" href="/Zain%20Haidar%20Resume.pdf" download />
                  <InfoTile icon={MapPin} label="Base Location" value="Vienna, Austria · CET timezone" />
                </div>
              </div>

              {/* Professional Closing Note Card */}
              <div className="bg-white border border-[#E5E7EB] rounded-3xl p-6 sm:p-8 shadow-sm border-t-4 border-t-[#D7FF3F]">
                <div className="space-y-4">
                  <span className="text-[9px] uppercase font-bold text-[#111111] tracking-wider">A Closing Note</span>
                  <p className="text-gray-500 text-xs sm:text-[13px] leading-relaxed font-normal">
                    Let's build something exceptional together. Whether resolving manual operational database sync breaks, writing dbt schemas, or architecting interactive executive dashboards in Power BI, I am fully committed to delivering clarity, speed, and tangible commercial outcomes to your team.
                  </p>
                  <div className="pt-2 border-t border-gray-150 flex items-center gap-3">
                    <div className="h-8 w-8 rounded-full bg-[#111111] flex items-center justify-center font-bold text-white text-[10px]">
                      ZH
                    </div>
                    <div>
                      <h4 className="font-bold text-[#111111] text-xs">Zain Haidar</h4>
                      <p className="text-[9px] font-semibold text-gray-400 uppercase tracking-widest mt-0.5">Vienna Analytics Consultant</p>
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

function Field({ name, label, type = "text", placeholder, error }: { name: string; label: string; type?: string; placeholder?: string; error?: string }) {
  return (
    <div>
      <label className="block text-[10px] uppercase tracking-wider text-gray-500 font-bold mb-2">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl bg-gray-50 border border-[#E5E7EB] px-4 py-3 text-xs focus:outline-none focus:border-[#111111] focus:ring-1 focus:ring-[#111111]/20 transition text-[#111111] font-semibold"
      />
      {error && <p className="text-xs text-rose-500 mt-1 font-semibold">{error}</p>}
    </div>
  );
}

function InfoTile({ icon: Icon, label, value, href, download }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href?: string; download?: boolean }) {
  const Body = (
    <div className="bg-white border border-[#E5E7EB]/70 p-5 flex items-center gap-4 hover:border-gray-400 transition-all duration-200 group rounded-2xl shadow-xs">
      <div className="h-10 w-10 rounded-xl bg-[#F2FBD9] border border-[#D7FF3F]/35 flex items-center justify-center shrink-0 text-[#111111] transition-transform duration-200">
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div className="min-w-0 flex-1">
        <div className="text-[9px] font-bold uppercase tracking-wider text-gray-400 leading-none">{label}</div>
        <div className="font-bold text-[#111111] truncate mt-1.5 text-xs sm:text-[13px]">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} download={download} className="block cursor-pointer">{Body}</a> : Body;
}

