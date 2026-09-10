import { createFileRoute, Link } from "@tanstack/react-router";
import { useEffect, useRef, useState, type FormEvent } from "react";
import { z } from "zod";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { PageHero } from "@/components/portfolio/PageHero";
import { profile } from "@/data/profile";
import { pageHead } from "@/lib/seo";
import { enquirySchema, budgetOptions, type Enquiry } from "@/lib/enquiry";
import { submitLead } from "@/lib/leads.functions";
export const Route = createFileRoute("/contact")({
  validateSearch: (search) =>
    z.object({ intent: z.enum(["employment", "freelance"]).optional() }).parse(search),
  head: () =>
    pageHead(
      "Let’s work together",
      "Discuss an employment opportunity or a freelance data analysis, Power BI, or reporting project with Zain Haidar.",
      "/contact",
    ),
  component: Contact,
});
const initial: Enquiry = {
  intent: "employment",
  name: "",
  email: "",
  company: "",
  role: "",
  jobUrl: "",
  service: "",
  timeline: "",
  budget: "",
  message: "",
  website: "",
};
function Contact() {
  const search = Route.useSearch();
  const [form, setForm] = useState<Enquiry>({ ...initial, intent: search.intent || "employment" });
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [sending, setSending] = useState(false);
  const [status, setStatus] = useState<{ ok: boolean; text: string } | null>(null);
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (search.intent) setForm((prev) => ({ ...prev, intent: search.intent! }));
  }, [search.intent]);
  const update = (name: keyof Enquiry, value: string) => {
    setForm((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));
    setStatus(null);
  };
  const field = (name: keyof Enquiry, label: string, type = "text", required = false) => (
    <div className="field" key={name}>
      <label htmlFor={name}>
        {label}
        {!required && <span> (optional)</span>}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={form[name]}
        onChange={(event) => update(name, event.target.value)}
        maxLength={name === "email" ? 320 : name === "jobUrl" ? 1000 : 200}
        autoComplete={
          name === "name"
            ? "name"
            : name === "email"
              ? "email"
              : name === "company"
                ? "organization"
                : "off"
        }
        aria-invalid={Boolean(errors[name])}
        aria-describedby={errors[name] ? name + "-error" : undefined}
      />
      {errors[name] && (
        <p className="field-error" id={name + "-error"}>
          {errors[name]}
        </p>
      )}
    </div>
  );
  async function send(event: FormEvent) {
    event.preventDefault();
    if (sending) return;
    const result = enquirySchema.safeParse(form);
    if (!result.success) {
      const next: Record<string, string> = {};
      for (const issue of result.error.issues) next[String(issue.path[0])] = issue.message;
      setErrors(next);
      requestAnimationFrame(() =>
        formRef.current?.querySelector<HTMLElement>('[aria-invalid="true"]')?.focus(),
      );
      return;
    }
    setSending(true);
    setStatus(null);
    try {
      const response = await submitLead({ data: result.data });
      if (response.ok) {
        setStatus({
          ok: true,
          text: "Thank you. Your enquiry has been received. I’ll reply to the email address you provided.",
        });
        setForm({ ...initial, intent: form.intent });
      } else
        setStatus({ ok: false, text: response.error || "Please try again or email me directly." });
    } catch {
      setStatus({
        ok: false,
        text: "Your message could not be sent. Please try again or email me directly. Your draft is still here.",
      });
    } finally {
      setSending(false);
      requestAnimationFrame(() => statusRef.current?.focus());
    }
  }
  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <PageHero
          eyebrow="Get in touch"
          title="Let’s talk about what’s next."
          description="An employment opportunity or a defined data project—tell me what you have in mind."
        />
        <section className="section">
          <div className="container contact-grid">
            <form
              className="enquiry-form"
              noValidate
              onSubmit={send}
              ref={formRef}
              aria-busy={sending}
            >
              <fieldset disabled={sending}>
                <legend>I’m getting in touch about</legend>
                <div className="intent-options">
                  {(
                    [
                      ["employment", "Employment opportunity"],
                      ["freelance", "Freelance project"],
                    ] as const
                  ).map(([value, label]) => (
                    <label className="intent-option" key={value}>
                      <input
                        type="radio"
                        name="intent"
                        value={value}
                        checked={form.intent === value}
                        onChange={() => update("intent", value)}
                      />
                      {label}
                    </label>
                  ))}
                </div>
              </fieldset>
              {status && (
                <div
                  ref={statusRef}
                  tabIndex={-1}
                  role={status.ok ? "status" : "alert"}
                  className={"status-box" + (status.ok ? "" : " error")}
                >
                  {status.text}
                </div>
              )}
              <fieldset disabled={sending}>
                <div className="form-grid">
                  {field("name", "Your name", "text", true)}
                  {field("email", "Email address", "email", true)}
                </div>
                <div className="form-section">{field("company", "Company or organisation")}</div>
                {form.intent === "employment" ? (
                  <div className="form-grid">
                    {field("role", "Role title")}
                    {field("jobUrl", "Job description link", "url")}
                  </div>
                ) : (
                  <>
                    <div className="form-grid">
                      <div className="field">
                        <label htmlFor="service">
                          Area of work <span>(optional)</span>
                        </label>
                        <select
                          id="service"
                          value={form.service}
                          onChange={(event) => update("service", event.target.value)}
                        >
                          <option value="">Choose an area</option>
                          <option>Power BI dashboards</option>
                          <option>SQL & data preparation</option>
                          <option>Reporting automation</option>
                          <option>Something else</option>
                        </select>
                      </div>
                      <div className="field">
                        <label htmlFor="budget">
                          Budget range <span>(optional)</span>
                        </label>
                        <select
                          id="budget"
                          value={form.budget}
                          onChange={(event) => update("budget", event.target.value)}
                        >
                          <option value="">Prefer to discuss</option>
                          {budgetOptions.map((option) => (
                            <option key={option.value} value={option.value}>
                              {option.label}
                            </option>
                          ))}
                        </select>
                      </div>
                    </div>
                    <div className="form-section">{field("timeline", "Expected timeline")}</div>
                  </>
                )}
                <div className="field form-section">
                  <label htmlFor="message">
                    {form.intent === "employment"
                      ? "Tell me about the opportunity"
                      : "Tell me about the data problem"}
                  </label>
                  <textarea
                    id="message"
                    required
                    minLength={10}
                    maxLength={5000}
                    value={form.message}
                    onChange={(event) => update("message", event.target.value)}
                    aria-invalid={Boolean(errors.message)}
                    aria-describedby={errors.message ? "message-error" : "message-help"}
                  />
                  {errors.message ? (
                    <p id="message-error" className="field-error">
                      {errors.message}
                    </p>
                  ) : (
                    <p id="message-help" className="form-help">
                      A short overview is enough. Please leave confidential datasets out of the
                      enquiry.
                    </p>
                  )}
                </div>
                <div className="honeypot" aria-hidden="true">
                  <label htmlFor="website">Website</label>
                  <input
                    id="website"
                    tabIndex={-1}
                    autoComplete="off"
                    value={form.website}
                    onChange={(event) => update("website", event.target.value)}
                  />
                </div>
                <button type="submit" className="button button-primary">
                  {sending ? "Sending…" : "Send enquiry"}
                </button>
                <p className="form-help">
                  Your details are used to respond to this enquiry.{" "}
                  <a href="#privacy">How enquiries are handled</a>.
                </p>
              </fieldset>
            </form>
            <aside className="contact-aside">
              <p className="eyebrow">Direct contact</p>
              <h2>Prefer a conversation?</h2>
              <p>
                <a className="text-link" href={"mailto:" + profile.email}>
                  {profile.email}
                </a>
              </p>
              <p>
                {profile.location}
                <br />
                Central European time
              </p>
              <div className="actions">
                <a
                  className="button button-outline"
                  href={profile.calendar}
                  target="_blank"
                  rel="noreferrer"
                >
                  Choose a time on Calendly ↗
                </a>
              </div>
              <p className="form-help">
                Available times and call duration are shown on the booking page.
              </p>
              <div className="actions">
                <a className="text-link" href={profile.linkedin} target="_blank" rel="noreferrer">
                  LinkedIn ↗
                </a>
                <a className="text-link" href={profile.github} target="_blank" rel="noreferrer">
                  GitHub ↗
                </a>
              </div>
              <div className="actions">
                <a className="button button-outline" href={profile.resume} download>
                  Download resume
                </a>
              </div>
            </aside>
          </div>
        </section>
        <section className="section section-tint" id="privacy">
          <div className="container privacy-note">
            <h2>How enquiries are handled</h2>
            <p>
              The form collects the contact details and message you provide so Zain Haidar can
              respond. Enquiries are stored using Supabase; access to enquiry records is restricted
              to the website administrator. They are not displayed publicly.
            </p>
            <p>
              To ask about an enquiry or request its deletion, email{" "}
              <a href={"mailto:" + profile.email}>{profile.email}</a>. Please do not include
              passwords, sensitive personal records, or confidential datasets. Calendly and LinkedIn
              are external services with their own privacy policies.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
