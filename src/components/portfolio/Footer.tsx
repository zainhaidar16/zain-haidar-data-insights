import { Github, Linkedin, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";

const websiteLinks = [
  { label: "Home", to: "/" },
  { label: "About", to: "/about" },
  { label: "Services", to: "/services" },
  { label: "Projects", to: "/projects" },
  { label: "Blog", to: "/blog" },
  { label: "Contact", to: "/contact" },
];

const serviceLinks = [
  { label: "Dashboard Automation", to: "/services" },
  { label: "SQL Data Analysis", to: "/services" },
  { label: "Forecasting & Trends", to: "/services" },
  { label: "ETL Pipelines", to: "/services" },
];

const connectLinks = [
  { icon: Mail, href: "mailto:zainhaider72@gmail.com", label: "Email" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/zain-haidar-8b3060201", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/zainhaider", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="bg-[#111111] pt-16 pb-8">
      <div className="section-container">

        {/* 4-Column Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10">

          {/* Brand Column */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-[#D7FF3F] text-[#111111] font-bold text-sm select-none">
                ZA
              </div>
              <span className="text-[15px]">
                <span className="font-bold text-white">Zain</span>
                <span className="font-medium text-gray-400"> The Analyst</span>
              </span>
            </Link>
            <p className="text-[13px] text-gray-400 leading-relaxed max-w-[280px]">
              Data analytics, Business Intelligence dashboards, and ETL pipeline solutions that help businesses make clearer decisions.
            </p>
          </div>

          {/* Website Links */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-5">
              Website
            </h4>
            <ul className="space-y-3">
              {websiteLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[13px] text-gray-400 hover:text-[#D7FF3F] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services Links */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-5">
              Services
            </h4>
            <ul className="space-y-3">
              {serviceLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[13px] text-gray-400 hover:text-[#D7FF3F] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Connect Links */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-gray-500 mb-5">
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
                      className="flex items-center gap-2.5 text-[13px] text-gray-400 hover:text-[#D7FF3F] transition-colors duration-200 group"
                    >
                      <Icon className="h-4 w-4 text-gray-500 group-hover:text-[#D7FF3F] transition-colors" />
                      <span>{s.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>

        {/* Copyright Bar */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-gray-500">
            © {new Date().getFullYear()} Zain Haidar — Zain The Analyst. All rights reserved.
          </p>
          <p className="text-[11px] text-gray-600">
            Vienna, Austria
          </p>
        </div>

      </div>
    </footer>
  );
}
