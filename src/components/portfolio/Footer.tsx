import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, Globe } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { getServices, Service } from "@/lib/api";

const websiteLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const resourceLinks = [
  { label: "All Projects", to: "/projects" },
  { label: "Case Studies", to: "/projects" },
  { label: "Blog & Guides", to: "/blog" },
  { label: "Start a Project", to: "/contact" },
];

const connectLinks = [
  { icon: Mail, href: "mailto:zainhaider72@gmail.com", label: "Email" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/zain-haidar/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/zainhaidar16", label: "GitHub" },
  { icon: Globe, href: "https://www.kaggle.com/zainhaidar", label: "Kaggle" },
  { icon: Globe, href: "https://huggingface.co/zainhaidar", label: "Hugging Face" },
];

export function Footer() {
  const [services, setServices] = useState<Service[]>([]);

  useEffect(() => {
    let active = true;
    async function loadServices() {
      try {
        const data = await getServices();
        if (active) setServices(data);
      } catch {
        if (active) setServices([]);
      }
    }
    loadServices();
    return () => {
      active = false;
    };
  }, []);

  return (
    <footer className="nvr-footer bg-[#F1F5F9] border-t border-[#E2E8F0] pt-20 pb-8">
      <div className="section-container">
        <div className="nvr-footer-grid grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-10 lg:gap-8 pb-14 border-b border-[#E2E8F0]">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-2 space-y-5">
            <Link
              to="/"
              className="flex items-center gap-2.5 group"
              aria-label="Zain The Analyst — Home"
            >
              <img
                src="/z-monogram-footer.svg"
                alt="Zain The Analyst"
                className="h-9 w-9 object-contain shrink-0"
                width={36}
                height={36}
              />
              <span className="text-[15px]">
                <span className="font-bold text-[#0F172A]">Zain</span>
                <span className="font-medium text-[#475569]"> The Analyst</span>
              </span>
            </Link>
            <p className="text-[13px] text-[#475569] leading-relaxed max-w-[300px]">
              Data analytics, Business Intelligence dashboards, and ETL pipeline solutions that help
              businesses make clearer decisions faster.
            </p>
            <div className="inline-flex items-center gap-2 bg-[#2563EB]/10 border border-[#2563EB]/20 rounded-full px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#2563EB] animate-pulse" />
              <span className="text-[11px] font-semibold text-[#1D4ED8]">
                Available for new projects
              </span>
            </div>
          </div>

          {/* Website Links */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#0F172A] mb-5">
              Website
            </h4>
            <ul className="space-y-3">
              {websiteLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[13px] text-[#475569] hover:text-[#2563EB] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#0F172A] mb-5">
              Services
            </h4>
            {services.length > 0 ? (
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.id}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: service.slug }}
                      className="text-[13px] text-[#475569] hover:text-[#2563EB] transition-colors duration-200"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <ul className="space-y-3">
                {["Power BI Dashboards", "ETL Pipelines", "SQL Analytics", "Data Strategy"].map(
                  (s) => (
                    <li key={s}>
                      <Link
                        to="/services"
                        className="text-[13px] text-[#475569] hover:text-[#2563EB] transition-colors duration-200"
                      >
                        {s}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            )}
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#0F172A] mb-5">
              Connect
            </h4>
            <ul className="space-y-3">
              {connectLinks.map((s) => {
                const Icon = s.icon;
                return (
                  <li key={s.label}>
                    <a
                      href={s.href}
                      target={s.href.startsWith("http") ? "_blank" : undefined}
                      rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                      className="flex items-center gap-2.5 text-[13px] text-[#475569] hover:text-[#2563EB] transition-colors duration-200 group"
                    >
                      <Icon className="h-4 w-4 text-[#475569] group-hover:text-[#2563EB] transition-colors shrink-0" />
                      <span>{s.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-[#94A3B8]">
            © {new Date().getFullYear()} Zain Haidar — Zain The Analyst. All rights reserved.
          </p>
          <p className="text-[11px] text-[#94A3B8]">
            ZAIN THE ANALYST (PRIVATE) LIMITED CUIN: 0285646
          </p>
        </div>
      </div>
    </footer>
  );
}
