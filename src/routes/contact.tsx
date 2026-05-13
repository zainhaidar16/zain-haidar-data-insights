import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { useServerFn } from "@tanstack/react-start";
import { z } from "zod";
import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { SectionHeader } from "@/components/site/SectionHeader";
import { submitLead } from "@/lib/leads.functions";
import { Mail, MapPin, Linkedin, Github, Loader2, Check } from "lucide-react";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Start a project | Haidar Analytics" },
      { name: "description", content: "Tell us about your data project. Replies within 24 hours from Vienna." },
      { property: "og:title", content: "Contact Haidar Analytics" },
      { property: "og:description", content: "Start a Power BI, ETL or AI analytics engagement." },
    ],
  }),
  component: ContactPage,
});

const ClientSchema = z.object({
  name: z.string().trim().min(1, "Required").max(200),
  email: z.string().trim().email("Enter a valid email").max(320),
  company: z.string().trim().max(200).optional(),
  project_type: z.string().trim().max(120).optional(),
  budget: z.enum(["under_5k", "5k_15k", "15k_50k", "50k_plus", "not_sure"]).optional(),
  message: z.string().trim().min(10, "Tell us a bit more (10+ chars)").max(5000),
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
      budget: (String(fd.get("budget") ?? "") || undefined) as "under_5k" | "5k_15k" | "15k_50k" | "50k_plus" | "not_sure" | undefined,
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
      <section className="pt-32 md:pt-40 pb-24">
        <div className="mx-auto max-w-5xl px-6">
          <SectionHeader
            kicker="Contact"
            title="Let's build something measurable."
            intro="Tell us about your project — dashboards, pipelines, forecasting or AI analytics. We reply within 24 hours."
          />

          <div className="grid lg:grid-cols-5 gap-8">
            <div className="lg:col-span-3 glass-strong gradient-border rounded-3xl p-6 md:p-10">
              {state === "ok" ? (
                <div className="text-center py-12">
                  <div className="mx-auto h-14 w-14 rounded-full bg-gradient-primary grid place-items-center shadow-glow mb-6">
                    <Check className="h-6 w-6 text-primary-foreground" />
                  </div>
                  <h3 className="font-serif-display text-3xl">Message received.</h3>
                  <p className="mt-3 text-muted-foreground">Zain will reply from Vienna within 24 hours.</p>
                  <button onClick={() => setState("idle")} className="mt-6 text-sm text-primary hover:underline">
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
                    <Field name="project_type" label="Project type" placeholder="e.g. Power BI dashboard" error={errors.project_type} />
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.22em] text-muted-foreground mb-2">Budget</label>
                    <select name="budget" defaultValue="" className="w-full rounded-xl bg-foreground/[0.04] border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary/60">
                      <option value="">Select…</option>
                      <option value="under_5k">Under €5k</option>
                      <option value="5k_15k">€5k – €15k</option>
                      <option value="15k_50k">€15k – €50k</option>
                      <option value="50k_plus">€50k+</option>
                      <option value="not_sure">Not sure yet</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-xs uppercase tracking-[0.22em] text-muted-foreground mb-2">Project brief</label>
                    <textarea
                      name="message"
                      rows={6}
                      placeholder="Goals, current stack, timeline…"
                      className="w-full rounded-xl bg-foreground/[0.04] border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary/60 resize-y"
                    />
                    {errors.message && <p className="text-xs text-destructive mt-1">{errors.message}</p>}
                  </div>

                  {state === "error" && <p className="text-sm text-destructive">{errorMsg}</p>}

                  <button
                    type="submit"
                    disabled={state === "loading"}
                    className="inline-flex items-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-7 py-3.5 text-sm font-medium shadow-glow hover:scale-[1.02] transition disabled:opacity-60"
                  >
                    {state === "loading" ? <Loader2 className="h-4 w-4 animate-spin" /> : null}
                    Send brief
                  </button>
                </form>
              )}
            </div>

            <aside className="lg:col-span-2 space-y-4">
              <InfoTile icon={Mail} label="Email" value="zainhaider72@gmail.com" href="mailto:zainhaider72@gmail.com" />
              <InfoTile icon={MapPin} label="Studio" value="Vienna, Austria · CET" />
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
      <label className="block text-xs uppercase tracking-[0.22em] text-muted-foreground mb-2">{label}</label>
      <input
        name={name}
        type={type}
        placeholder={placeholder}
        className="w-full rounded-xl bg-foreground/[0.04] border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary/60"
      />
      {error && <p className="text-xs text-destructive mt-1">{error}</p>}
    </div>
  );
}

function InfoTile({ icon: Icon, label, value, href }: { icon: React.ComponentType<{ className?: string }>; label: string; value: string; href?: string }) {
  const Body = (
    <div className="glass-strong rounded-2xl p-5 flex items-center gap-4 hover:bg-foreground/[0.06] transition">
      <div className="h-10 w-10 rounded-xl bg-gradient-primary grid place-items-center shrink-0 shadow-glow">
        <Icon className="h-4 w-4 text-primary-foreground" />
      </div>
      <div className="min-w-0">
        <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{label}</div>
        <div className="font-medium truncate">{value}</div>
      </div>
    </div>
  );
  return href ? <a href={href}>{Body}</a> : Body;
}
