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
      { title: "Contact — Zain Haidar | Power BI & Data Analyst (Vienna)" },
      { name: "description", content: "Hiring a data analyst or need a Power BI project? Email zainhaider72@gmail.com — replies within 24 hours from Vienna." },
      { property: "og:title", content: "Contact Zain Haidar" },
      { property: "og:description", content: "Power BI & Data Analyst available for full-time roles and selective freelance." },
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
    <main>
      <Nav />
      <section className="pt-32 md:pt-40 pb-20 md:pb-24">
        <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
          <SectionHeader
            kicker="Contact"
            title="The fastest way to reach me."
            intro="Email gets the fastest reply (within 24h, CET). If you prefer a form, the one below sends straight to my inbox. Hiring managers — the CV button is right there."
          />

          <div className="grid lg:grid-cols-12 gap-10">
            <div className="lg:col-span-7 border border-border rounded-md p-6 md:p-10 bg-card">
              {state === "ok" ? (
                <div className="text-center py-12">
                  <div className="mx-auto h-12 w-12 rounded-full border border-foreground grid place-items-center mb-6">
                    <Check className="h-5 w-5" />
                  </div>
                  <h3 className="font-serif-display text-3xl">Message received.</h3>
                  <p className="mt-3 text-muted-foreground">I&rsquo;ll reply from Vienna within 24 hours.</p>
                  <button onClick={() => setState("idle")} className="mt-6 text-sm border-b border-foreground pb-0.5">
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
                    <Field name="project_type" label="Role or project type" placeholder="e.g. Data Analyst role / Power BI rescue" error={errors.project_type} />
                  </div>
                  <div>
                    <label className="block text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">Message</label>
                    <textarea
                      name="message"
                      rows={6}
                      placeholder="Role, team, stack, timeline — or the data problem you&rsquo;re trying to solve."
                      className="w-full rounded-md bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground/60 resize-y"
                    />
                    {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                  </div>

                  {state === "error" && <p className="text-sm text-destructive">{errorMsg}</p>}

                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-medium hover:bg-foreground/90 transition disabled:opacity-60"
                  >
                    {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    Send message
                  </button>
                </form>
              )}
            </div>

            <aside className="lg:col-span-5 space-y-3">
              <InfoTile icon={Mail} label="Email (fastest)" value="zainhaider72@gmail.com" href="mailto:zainhaider72@gmail.com" />
              <InfoTile icon={FileDown} label="CV" value="cv-zain-haidar.pdf" href="/cv-zain-haidar.pdf" download />
              <InfoTile icon={MapPin} label="Based in" value="Vienna, Austria · CET" />
              <InfoTile icon={Linkedin} label="LinkedIn" value="linkedin.com/in/zainhaider" href="https://www.linkedin.com/" />
              <InfoTile icon={Github} label="GitHub" value="github.com/zain" href="https://github.com/" />
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
      <label className="block text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-2">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-md bg-background border border-border px-4 py-3 text-sm focus:outline-none focus:border-foreground/60"
      />
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}

function InfoTile({ icon: Icon, label, value, href, download }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href?: string; download?: boolean }) {
  const Body = (
    <div className="border border-border rounded-md p-5 flex items-center gap-4 bg-card hover:border-foreground/40 transition">
      <div className="h-10 w-10 rounded-md border border-border grid place-items-center shrink-0 text-foreground">
        <Icon className="h-4 w-4" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
        <div className="font-medium truncate">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href} download={download}>{Body}</a> : Body;
}
