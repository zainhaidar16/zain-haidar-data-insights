import { Github, Linkedin, Mail } from "lucide-react";

const footerLinks = [
  { label: "About", href: "#about" },
  { label: "Skills", href: "#skills" },
  { label: "Projects", href: "#projects" },
  { label: "Services", href: "#services" },
  { label: "Contact", href: "#contact" },
];

const socialLinks = [
  { icon: Mail, href: "mailto:zainhaider72@gmail.com", label: "Email" },
  { icon: Linkedin, href: "https://www.linkedin.com/in/zain-haidar-8b3060201", label: "LinkedIn" },
  { icon: Github, href: "https://github.com/zainhaider", label: "GitHub" },
];

export function Footer() {
  return (
    <footer className="bg-[#0F172A] border-t border-white/5 py-10">
      <div className="section-container">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          {/* Logo */}
          <a
            href="#"
            onClick={(e) => { e.preventDefault(); window.scrollTo({ top: 0, behavior: "smooth" }); }}
            className="flex items-center gap-2.5 group"
          >
            <div className="flex items-center justify-center h-8 w-8 rounded-lg bg-blue-600 text-white font-bold text-xs select-none">
              ZA
            </div>
            <span className="text-sm text-slate-400">
              <span className="font-bold text-white">Zain</span>{" "}
              <span className="font-medium">The Analyst</span>
            </span>
          </a>

          {/* Nav */}
          <nav className="flex flex-wrap justify-center gap-x-5 gap-y-2">
            {footerLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                onClick={(e) => { e.preventDefault(); document.querySelector(link.href)?.scrollIntoView({ behavior: "smooth" }); }}
                className="text-xs font-medium text-slate-500 hover:text-blue-400 transition-colors"
              >
                {link.label}
              </a>
            ))}
          </nav>

          {/* Socials */}
          <div className="flex items-center gap-3">
            {socialLinks.map((s) => {
              const Icon = s.icon;
              return (
                <a
                  key={s.label}
                  href={s.href}
                  target={s.href.startsWith("http") ? "_blank" : undefined}
                  rel={s.href.startsWith("http") ? "noopener noreferrer" : undefined}
                  aria-label={s.label}
                  className="h-8 w-8 rounded-lg border border-white/10 flex items-center justify-center text-slate-500 hover:text-blue-400 hover:border-blue-500/30 transition-all"
                >
                  <Icon className="h-3.5 w-3.5" />
                </a>
              );
            })}
          </div>
        </div>

        <div className="border-t border-white/5 mt-8 pt-6 text-center">
          <p className="text-xs text-slate-600">
            © {new Date().getFullYear()} Zain Haidar — Zain The Analyst. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
