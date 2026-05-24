import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SectionHeader } from "@/components/site/SectionHeader";
import { submitLead } from "@/lib/leads.functions";
import { Mail, MapPin, Linkedin, Github, FileDown, Loader2, Check } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Haidar Analytics | Simple Data Dashboards" },
      { name: "description", content: "Get in touch with Haidar Analytics for clean and simple Power BI, Tableau, or Looker Studio reports." },
      { property: "og:title", content: "Contact — Haidar Analytics" },
      { property: "og:description", content: "Reach out to build simple, clear, and fast business dashboards." },
    ],
  }),
  component: ContactPage,
});

const ClientSchema = z.object({
  name: z.string().trim().min(1, "Required").max(200),
  email: z.string().trim().email("Enter a valid email").max(320),
  company: z.string().trim().max(200).optional(),
  project_type: z.string().trim().max(120).optional(),
  message: z.string().trim().min(10, "Tell me a bit more (10+ chars)").max(5000),
});

function ContactPage() {
  const send = useServerFn(submitLead);
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
      message: String(fd.get("message") ?? ""),
    };
    const parsed = ClientSchema.safeParse(raw);
    if (!parsed.success) {
      const fe: Record<string, string> = {};
      parsed.error.issues.forEach((i) => { fe[String(i.path[0])] = i.message; });
      setErrors(fe);
      return;
    }
    setState("loading");
    try {
      const res = await send({ data: parsed.data });
      if (res.ok) { setState("ok"); (e.target as HTMLFormElement).reset(); }
      else { setState("error"); setErrorMsg(res.error ?? "Something went wrong"); }
    } catch {
      setState("error");
      setErrorMsg("Network error. Please try again.");
    }
  }

  return (
    <main className="bg-background">
      <Nav />
      <section className="pt-32 md:pt-40 pb-20 md:pb-24 grid-bg">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <SectionHeader
            kicker="Contact"
            title="Get in touch with me"
            intro="The easiest way to reach me is by sending an email. You can also fill out the form below, and I will reply within 24 hours."
          />

          <div className="grid lg:grid-cols-12 gap-10 mt-12">
            <div className="lg:col-span-7 glass border border-border rounded-2xl p-6 md:p-10 shadow-card">
              {state === "ok" ? (
                <div className="text-center py-12 animate-fade-in">
                  <div className="mx-auto h-12 w-12 rounded-full border border-accent grid place-items-center mb-6 bg-accent/15">
                    <Check className="h-5 w-5 text-accent" />
                  </div>
                  <h3 className="font-serif-display text-3xl text-foreground">Message received.</h3>
                  <p className="mt-3 text-muted-foreground">I&rsquo;ll reply from Vienna within 24 hours.</p>
                  <button onClick={() => setState("idle")} className="mt-6 text-sm text-accent border-b border-accent pb-0.5 font-mono">
                    Send another
                  </button>
                </div>
              ) : (
                <form onSubmit={onSubmit} className="space-y-5">
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field name="name" label="Your name" error={errors.name} />
                    <Field name="email" type="email" label="Email" error={errors.email} />
                  </div>
                  <div className="grid sm:grid-cols-2 gap-5">
                    <Field name="company" label="Company (optional)" error={errors.company} />
                    <Field name="project_type" label="Role or project type" placeholder="e.g. Help with Power BI dashboards" error={errors.project_type} />
                  </div>
                  <div>
                    <label className="block text-[9px] uppercase tracking-[0.25em] text-accent font-bold mb-2.5 font-mono">Message</label>
                    <textarea
                      name="message"
                      rows={6}
                      placeholder="Tell me about your project, your spreadsheets, or your dashboards, and what you would like to build."
                      className="w-full rounded-xl bg-white/[0.02] border border-border px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition resize-y text-foreground"
                    />
                    {errors.message && <p className="text-xs text-destructive mt-1 font-mono">{errors.message}</p>}
                  </div>

                  {state === "error" && <p className="text-sm text-destructive font-mono">{errorMsg}</p>}

                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-primary text-white px-7 py-3.5 text-xs font-mono uppercase tracking-widest shadow-glow disabled:opacity-60 hover:opacity-95 transition duration-150 active:scale-95"
                  >
                    {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin text-white" /> : null}
                    Send message
                  </button>
                </form>
              )}
            </div>

            <aside className="lg:col-span-5 space-y-3">
              <InfoTile icon={Mail} label="Email (fastest)" value="zainhaider72@gmail.com" href="mailto:zainhaider72@gmail.com" />
              <InfoTile icon={FileDown} label="CV" value="cv-zain-haidar.pdf" href="/cv-zain-haidar.pdf" download />
              <InfoTile icon={MapPin} label="Based in" value="Vienna, Austria · CET" />
              <InfoTile icon={Linkedin} label="LinkedIn" value="linkedin.com/in/zainhaidar" href="https://www.linkedin.com/" />
              <InfoTile icon={Github} label="GitHub" value="github.com/zainhaidar16" href="https://github.com/zainhaidar16" />
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
      <label className="block text-[9px] uppercase tracking-[0.25em] text-accent font-bold mb-2.5 font-mono">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl bg-white/[0.02] border border-border px-4 py-3 text-sm focus:outline-none focus:border-accent focus:ring-1 focus:ring-accent/20 transition text-foreground"
      />
      {error && <p className="text-xs text-destructive mt-1 font-mono">{error}</p>}
    </div>
  );
}

function InfoTile({ icon: Icon, label, value, href, download }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href?: string; download?: boolean }) {
  const Body = (
    <div className="glass p-5 flex items-center gap-4 hover:border-accent/40 transition-all duration-350 group shadow-elegant rounded-2xl">
      <div className="h-10 w-10 rounded-xl bg-accent/15 border border-accent/30 flex items-center justify-center shrink-0 text-accent group-hover:scale-105 transition-transform duration-300">
        <Icon className="h-4.5 w-4.5" />
      </div>
      <div className="min-w-0">
        <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-accent font-bold">{label}</div>
        <div className="font-semibold text-foreground truncate mt-1 text-[15px]">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} download={download} className="block">{Body}</a> : Body;
}
