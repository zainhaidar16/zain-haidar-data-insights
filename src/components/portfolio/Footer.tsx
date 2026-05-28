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
    return () => { active = false; };
  }, []);

  return (
    <footer className="bg-[#09090B] pt-16 pb-8">
      <div className="section-container">

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10 lg:gap-8 pb-12 border-b border-white/10">

          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-1 space-y-4">
            <Link to="/" className="flex items-center gap-2.5 group">
              <div className="flex items-center justify-center h-9 w-9 rounded-lg bg-[#F97316] text-white font-bold text-sm select-none">
                ZA
              </div>
              <span className="text-[15px]">
                <span className="font-bold text-white">Zain</span>
                <span className="font-medium text-[#A1A1AA]"> The Analyst</span>
              </span>
            </Link>
            <p className="text-[13px] text-[#A1A1AA] leading-relaxed max-w-[280px]">
              Data analytics, Business Intelligence dashboards, and ETL pipeline solutions that help businesses make clearer decisions.
            </p>
          </div>

          {/* Website Links */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#71717A] mb-5">
              Website
            </h4>
            <ul className="space-y-3">
              {websiteLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-[13px] text-[#A1A1AA] hover:text-[#FDBA74] transition-colors duration-200"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Services */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#71717A] mb-5">
              Services
            </h4>
            {services.length > 0 ? (
              <ul className="space-y-3">
                {services.map((service) => (
                  <li key={service.id}>
                    <Link
                      to="/services/$slug"
                      params={{ slug: service.slug }}
                      className="text-[13px] text-[#A1A1AA] hover:text-[#FDBA74] transition-colors duration-200"
                    >
                      {service.title}
                    </Link>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="text-[13px] text-[#71717A]">Services publishing soon.</p>
            )}
          </div>

          {/* Connect */}
          <div>
            <h4 className="text-[11px] font-semibold uppercase tracking-widest text-[#71717A] mb-5">
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
                      className="flex items-center gap-2.5 text-[13px] text-[#A1A1AA] hover:text-[#F97316] transition-colors duration-200 group"
                    >
                      <Icon className="h-4 w-4 text-[#71717A] group-hover:text-[#F97316] transition-colors" />
                      <span>{s.label}</span>
                    </a>
                  </li>
                );
              })}
            </ul>
          </div>

        </div>

        {/* Copyright */}
        <div className="pt-6 flex flex-col sm:flex-row items-center justify-between gap-3">
          <p className="text-[12px] text-[#71717A]">
            © {new Date().getFullYear()} Zain Haidar — Zain The Analyst. All rights reserved.
          </p>
          <p className="text-[11px] text-[#52525B]">
            Vienna, Austria
          </p>
        </div>

      </div>
    </footer>
  );
}
