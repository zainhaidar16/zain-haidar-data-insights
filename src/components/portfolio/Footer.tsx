import { useEffect, useState } from "react";
import { Github, Linkedin, Mail, ExternalLink, Globe } from "lucide-react";
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

const projectBlogLinks = [
  { label: "All Projects", to: "/projects" },
  { label: "Case Studies", to: "/projects" },
  { label: "Blog & Guides", to: "/blog" },
];

const connectLinks = [
  { icon: Mail, href: "mailto:zainhaider72@gmail.com", label: "Email" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/zain-haidar/", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/zainhaidar16", label: "GitHub" },
  { icon: Globe, href: "https://www.kaggle.com/zainhaidar", label: "Kaggle" },
  { icon: ExternalLink, href: "https://huggingface.co/zainhaidar", label: "Hugging Face" },
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
    <footer className="nvr-footer bg-[#0A0A0B] border-t border-[#26262B] pt-20 pb-8">
      <div className="section-container">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-10 lg:gap-8 pb-14 border-b border-[#26262B]">
          {/* Brand Column (takes up 2 grid cols) */}
          <div className="sm:col-span-2 space-y-6">
            <Link to="/" className="inline-block group" aria-label="Zain The Analyst — Home">
              <img
                src="/z-monogram-footer.svg"
                alt="Zain The Analyst"
                className="h-10 w-10 object-contain shrink-0"
                width={40}
                height={40}
              />
            </Link>
            <p className="text-[13px] text-[#71717A] leading-relaxed max-w-[280px]">
              Data analytics, Business Intelligence dashboards, and ETL pipeline solutions that help
              businesses make clearer decisions faster.
            </p>
            <div className="inline-flex items-center gap-2 bg-[rgba(255,107,0,0.1)] border border-[rgba(255,107,0,0.25)] rounded-full px-4 py-2">
              <span className="h-1.5 w-1.5 rounded-full bg-[#FF6B00] animate-pulse" />
              <span className="text-[11px] font-semibold text-[#FF6B00]">
                Available for new projects
              </span>
            </div>
          </div>

          {/* Column 1: Website */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#FFFFFF] mb-5">
              Website
            </h4>
            <ul className="space-y-3">
              {websiteLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[13px] text-[#A1A1AA] hover:text-[#FF6B00] transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 2: Services */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#FFFFFF] mb-5">
              Services
            </h4>
            {services.length > 0 ? (
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.id}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: service.slug }}
                      className="text-[13px] text-[#A1A1AA] hover:text-[#FF6B00] transition-colors duration-200 cursor-pointer"
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
                        className="text-[13px] text-[#A1A1AA] hover:text-[#FF6B00] transition-colors duration-200 cursor-pointer"
                      >
                        {s}
                      </Link>
                    </li>
                  ),
                )}
              </ul>
            )}
          </div>

          {/* Column 3: Projects / Blog */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#FFFFFF] mb-5">
              Work & Insights
            </h4>
            <ul className="space-y-3">
              {projectBlogLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[13px] text-[#A1A1AA] hover:text-[#FF6B00] transition-colors duration-200 cursor-pointer"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Column 4: Connect */}
          <div>
            <h4 className="text-[11px] font-bold uppercase tracking-widest text-[#FFFFFF] mb-5">
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
                      className="flex items-center gap-2.5 text-[13px] text-[#A1A1AA] hover:text-[#FF6B00] transition-colors duration-200 group"
                    >
                      <Icon className="h-4 w-4 text-[#71717A] group-hover:text-[#FF6B00] transition-colors shrink-0" />
                      <span>{s.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-[12px] text-[#71717A]">
            © {new Date().getFullYear()} Zain Haidar — Zain The Analyst. All rights reserved.
          </p>
          <p className="text-[11px] text-[#71717A]">
            ZAIN THE ANALYST (PRIVATE) LIMITED CUIN: 0285646
          </p>
        </div>
      </div>
    </footer>
  );
}
