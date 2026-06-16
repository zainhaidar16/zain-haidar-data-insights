import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const servicesLinks = [
  { label: "Power BI Dashboards", to: "/services" },
  { label: "SQL Reports", to: "/services" },
  { label: "Data Cleaning", to: "/services" },
  { label: "Excel Reports", to: "/services" },
  { label: "Python Automation", to: "/services" },
  { label: "Business Dashboards", to: "/services" },
];

const projectsLinks = [
  { label: "Power BI", to: "/projects" },
  { label: "SQL", to: "/projects" },
  { label: "Python", to: "/projects" },
  { label: "Excel", to: "/projects" },
  { label: "Dashboards", to: "/projects" },
  { label: "Reports", to: "/projects" },
];

const resourcesLinks = [
  { label: "Blog", to: "/blog" },
  { label: "Data Tips", to: "/blog" },
  { label: "Dashboard Ideas", to: "/blog" },
  { label: "Reporting Tips", to: "/blog" },
  { label: "Automation Ideas", to: "/blog" },
];

const companyLinks = [
  { label: "About", to: "/about" },
  { label: "Contact", to: "/contact" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Blog", to: "/blog" },
];

export function Footer() {
  const [email, setEmail] = useState("");

  return (
    <footer className="nvr-footer bg-[var(--site-bg-soft)] border-t border-[var(--line-soft)] pt-16 pb-6">
      <div className="section-container">
        {/* Main footer grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-10 lg:gap-8 pb-12 border-b border-[var(--line-soft)]">
          {/* Column 1: Services */}
          <div>
            <h4 className="text-[11px] font-normal uppercase tracking-widest text-[var(--text-main)] mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {servicesLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[13px] text-[var(--text-muted)] hover:text-[var(--purple)] transition-colors duration-200 cursor-pointer font-normal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Projects */}
          <div>
            <h4 className="text-[11px] font-normal uppercase tracking-widest text-[var(--text-main)] mb-5">
              Projects
            </h4>
            <ul className="space-y-3">
              {projectsLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[13px] text-[var(--text-muted)] hover:text-[var(--purple)] transition-colors duration-200 cursor-pointer font-normal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 3: Resources */}
          <div>
            <h4 className="text-[11px] font-normal uppercase tracking-widest text-[var(--text-main)] mb-5">
              Resources
            </h4>
            <ul className="space-y-3">
              {resourcesLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[13px] text-[var(--text-muted)] hover:text-[var(--purple)] transition-colors duration-200 cursor-pointer font-normal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Company */}
          <div>
            <h4 className="text-[11px] font-normal uppercase tracking-widest text-[var(--text-main)] mb-5">
              Company
            </h4>
            <ul className="space-y-3">
              {companyLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[13px] text-[var(--text-muted)] hover:text-[var(--purple)] transition-colors duration-200 cursor-pointer font-normal"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 5-6: Newsletter */}
          <div className="col-span-2">
            <h4 className="text-[11px] font-normal uppercase tracking-widest text-[var(--text-main)] mb-3">
              Stay Updated
            </h4>
            <p className="text-[13px] text-[var(--text-muted)] mb-4 font-normal leading-relaxed">
              Get simple tips about dashboards, reports, and business data.
            </p>
            <div className="flex gap-2">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter your email"
                className="flex-1 px-4 py-2.5 bg-white border border-[var(--card-border)] rounded-full text-xs text-[var(--text-main)] font-normal placeholder:text-[var(--text-muted)] focus:outline-none focus:border-[var(--purple)]"
              />
              <button
                type="button"
                className="primary-button px-5 py-2.5 text-white text-xs font-normal rounded-full transition-all duration-200 cursor-pointer shrink-0"
              >
                Subscribe
              </button>
            </div>
          </div>
        </div>

        {/* Brand Strip */}
        <div className="py-6 border-b border-[var(--line-soft)] text-center bg-[var(--site-bg-muted)] rounded-2xl my-6">
          <span className="text-[clamp(1.5rem,5vw,3.5rem)] font-normal tracking-[0.15em] text-[var(--purple)] uppercase select-none leading-none">
            ZAIN THE ANALYST
          </span>
        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-[var(--text-muted)] font-normal">
            © 2026 Zain The Analyst. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--purple)] animate-pulse" />
            <span className="text-[11px] text-[var(--text-muted)] font-normal">Available for projects</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
