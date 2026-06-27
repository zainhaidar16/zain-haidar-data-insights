import { Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";

const footerGroups = [
  {
    label: "Navigation",
    links: [
      { label: "Home", to: "/" },
      { label: "About", to: "/about" },
      { label: "Services", to: "/services" },
      { label: "Projects", to: "/projects" },
      { label: "Blog", to: "/blog" },
      { label: "Contact", to: "/contact" },
    ],
  },
  {
    label: "Services",
    links: [
      { label: "Power BI Dashboards", to: "/services" },
      { label: "Data Cleaning", to: "/services" },
      { label: "Report Automation", to: "/services" },
      { label: "Business Analytics", to: "/services" },
    ],
  },
  {
    label: "Work",
    links: [
      { label: "Case Studies", to: "/projects" },
      { label: "Dashboards", to: "/projects" },
      { label: "SQL Projects", to: "/projects" },
      { label: "Python Projects", to: "/projects" },
    ],
  },
  {
    label: "Resources",
    links: [
      { label: "Analytics Blog", to: "/blog" },
      { label: "Dashboard Guides", to: "/blog" },
      { label: "Reporting Tips", to: "/blog" },
      { label: "Contact", to: "/contact" },
    ],
  },
];

export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="nvr-footer bg-[var(--site-bg-soft)] border-t border-[var(--line-soft)]">
      <div className="section-container">
        <div className="grid gap-10 border-b border-[var(--line-soft)] pb-10 lg:grid-cols-[1.25fr_2fr]">
          <div className="max-w-sm lg:border-r lg:border-[#e5e5f0] lg:pr-10">
            <Link
              to="/"
              className="nvr-logo mb-5 inline-flex items-center gap-2.5"
              aria-label="Zain The Analyst - Home"
            >
              <img src="/z-monogram-header.svg" alt="Z Monogram" width={36} height={36} />
              <span className="text-sm font-semibold tracking-normal text-[var(--text-main)]">
                Zain <span className="font-medium text-[var(--text-muted)]">The Analyst</span>
              </span>
            </Link>
            <p className="text-[14px] leading-7 text-[var(--text-muted)]">
              Dashboards, reporting systems, and analytics workflows for teams that need clearer decisions.
            </p>
            <Link
              to="/contact"
              className="primary-button mt-6 inline-flex items-center justify-center gap-2 rounded-full px-5 py-2.5 text-xs font-semibold uppercase tracking-wider text-white transition-all duration-200 hover:-translate-y-0.5"
            >
              Start a Project
              <ArrowRight className="h-3.5 w-3.5" aria-hidden="true" />
            </Link>
          </div>

          <div className="grid grid-cols-2 gap-8 sm:grid-cols-4">
            {footerGroups.map((group) => (
              <div key={group.label}>
                <h4 className="mb-4 text-[11px] font-bold uppercase tracking-[0.1em] text-[#0d0d0d]">
                  {group.label}
                </h4>
                <ul>
                  {group.links.map((link) => (
                    <li key={`${group.label}-${link.label}`}>
                      <Link
                        to={link.to}
                        className="text-[14px] font-normal leading-[2] text-[#6b6b8a] transition-colors duration-200 hover:text-[var(--purple)]"
                      >
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>

        <div className="flex flex-col items-center justify-between gap-3 pt-6 sm:flex-row">
          <p className="text-[12px] text-[var(--text-muted)]">
            © {year} Zain The Analyst. All rights reserved.
          </p>
          <div className="flex items-center gap-1.5">
            <span className="h-1.5 w-1.5 rounded-full bg-[var(--purple)] animate-pulse" />
            <span className="text-[11px] text-[var(--text-muted)]">Available for projects</span>
          </div>
        </div>
      </div>
    </footer>
  );
}
