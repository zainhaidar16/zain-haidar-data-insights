import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { z } from "zod";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { createLead } from "@/lib/api";
import { Mail, MapPin, Linkedin, Github, FileDown, Loader2, Check, AlertCircle } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Zain The Analyst | Simple Data Dashboards" },
      { name: "description", content: "Get in touch with Zain Haidar for clean and simple Power BI, Tableau, or Looker Studio reports." },
      { property: "og:title", content: "Contact — Zain The Analyst" },
      { property: "og:description", content: "Reach out to build simple, clear, and fast business dashboards." },
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
      setErrorMsg("Something went wrong. Please try again.");
      console.error("Supabase contact form submission failed:", err);
    }
  }

  return (
    <main className="bg-[#F8FAFC] min-h-screen flex flex-col font-poppins text-slate-800">
      <Header />
      
      <section className="pt-32 md:pt-40 pb-20 md:pb-24 flex-grow">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          
          {/* Page Title Header */}
          <div className="mb-12 max-w-3xl">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">Contact</p>
            <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight mb-4">
              Get in touch with me
            </h2>
            <p className="text-slate-500 text-[15px] leading-[1.8]">
              The easiest way to reach me is by sending an email. You can also fill out the form below, and I will reply within 24 hours.
            </p>
          </div>

          <div className="grid lg:grid-cols-12 gap-10 mt-12">
            {/* Contact Form card */}
            <div className="lg:col-span-7 card-pro p-6 md:p-10">
              {state === "ok" ? (
                <div className="text-center py-12">
                  <div className="mx-auto h-12 w-12 rounded-full border border-emerald-200 grid place-items-center mb-6 bg-emerald-50 text-emerald-600 animate-pulse">
                    <Check className="h-5 w-5" />
                  </div>
                  <h3 className="text-2xl font-bold text-[#0F172A]">Message received!</h3>
                  <p className="mt-3 text-slate-500 text-sm">Message sent successfully. I will get back to you soon.</p>
                  <button
                    onClick={() => setState("idle")}
                    className="mt-6 text-sm text-blue-600 border-b border-blue-600 pb-0.5 font-semibold hover:text-blue-700 cursor-pointer"
                  >
                    Send another message
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field name="name" label="Your name" placeholder="Your name" error={errors.name} />
                    <Field name="email" type="email" label="Email address" placeholder="your@email.com" error={errors.email} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field name="company" label="Company (optional)" placeholder="Company name" error={errors.company} />
                    
                    <div>
                      <label className="block text-[10px] uppercase tracking-wider text-blue-600 font-bold mb-2.5">
                        Role or project type
                      </label>
                      <select
                        name="project_type"
                        className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition text-slate-700 font-medium cursor-pointer"
                      >
                        <option value="">Select a project type...</option>
                        <option value="Power BI Dashboard">Power BI Dashboard</option>
                        <option value="Data Analysis">Data Analysis</option>
                        <option value="ETL / Data Cleaning">ETL / Data Cleaning</option>
                        <option value="Analytics Web App">Analytics Web App</option>
                        <option value="Other">Other</option>
                      </select>
                      {errors.project_type && <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.project_type}</p>}
                    </div>
                  </div>
                  
                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-blue-600 font-bold mb-2.5">
                      Project Budget (optional)
                    </label>
                    <select
                      name="budget"
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition text-slate-700 font-medium cursor-pointer"
                    >
                      <option value="">Select a budget range...</option>
                      <option value="Under €500">Under €500</option>
                      <option value="€500 - €1,000">€500 - €1,000</option>
                      <option value="€1,000 - €3,000">€1,000 - €3,000</option>
                      <option value="€3,000+">€3,000+</option>
                      <option value="Not sure yet">Not sure yet</option>
                    </select>
                    {errors.budget && <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.budget}</p>}
                  </div>

                  <div>
                    <label className="block text-[10px] uppercase tracking-wider text-blue-600 font-bold mb-2.5">
                      Message
                    </label>
                    <textarea
                      name="message"
                      rows={6}
                      placeholder="Tell me about your project"
                      className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition resize-y text-slate-700 font-medium"
                    />
                    {errors.message && <p className="text-xs text-rose-500 mt-1 font-semibold">{errors.message}</p>}
                  </div>

                  {state === "error" && (
                    <div className="p-4 bg-rose-50 border border-rose-100 rounded-xl flex items-center gap-3 text-rose-600 text-xs">
                      <AlertCircle className="h-4 w-4 shrink-0" />
                      <span>{errorMsg}</span>
                    </div>
                  )}

                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 font-semibold text-sm shadow-md hover:shadow-lg transition disabled:opacity-60 cursor-pointer"
                  >
                    {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin text-white" /> : null}
                    Send message
                  </button>
                </form>
              )}
            </div>


            {/* Sidebar Tiles */}
            <aside className="lg:col-span-5 space-y-4">
              <InfoTile icon={Mail} label="Email (fastest)" value="zainhaider72@gmail.com" href="mailto:zainhaider72@gmail.com" />
              <InfoTile icon={FileDown} label="CV" value="cv-zain-haidar.pdf" href="/cv-zain-haidar.pdf" download />
              <InfoTile icon={MapPin} label="Based in" value="Vienna, Austria · CET" />
              <InfoTile icon={Linkedin} label="LinkedIn" value="linkedin.com/in/zain-haidar" href="https://www.linkedin.com/in/zain-haidar-8b3060201" />
              <InfoTile icon={Github} label="GitHub" value="github.com/zainhaider" href="https://github.com/zainhaider" />
            </aside>
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
      <label className="block text-[10px] uppercase tracking-wider text-blue-600 font-bold mb-2.5">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500/20 transition text-slate-700 font-medium"
      />
      {error && <p className="text-xs text-rose-500 mt-1 font-semibold">{error}</p>}
    </div>
  );
}

function InfoTile({ icon: Icon, label, value, href, download }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href?: string; download?: boolean }) {
  const Body = (
    <div className="card-pro p-5 flex items-center gap-4 hover:border-blue-400 transition-all duration-200 group">
      <div className="h-10 w-10 rounded-xl bg-blue-50 border border-blue-100 flex items-center justify-center shrink-0 text-blue-600 transition-transform duration-200">
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] font-semibold uppercase tracking-wider text-blue-600">{label}</div>
        <div className="font-bold text-slate-700 truncate mt-1 text-[14px]">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} download={download} className="block cursor-pointer">{Body}</a> : Body;
}
