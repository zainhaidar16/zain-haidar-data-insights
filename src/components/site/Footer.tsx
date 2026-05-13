import { Link } from "@tanstack/react-router";
import { Sparkles, Linkedin, Github, Mail } from "lucide-react";

const groups = [
  {
    title: "Studio",
    links: [
      { to: "/services", label: "Services" },
      { to: "/work", label: "Case studies" },
      { to: "/about", label: "About" },
      { to: "/insights", label: "Insights" },
    ],
  },
  {
    title: "Connect",
    links: [
      { to: "/contact", label: "Start a project" },
      { to: "/login", label: "Client login" },
    ],
  },
] as const;

export function Footer() {
  return (
    <footer className="relative mt-20 border-t border-border bg-background/40 backdrop-blur-sm">
      <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-10 py-16 grid gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5 space-y-5">
          <Link to="/" className="inline-flex items-center gap-2.5">
            <span className="grid place-items-center h-9 w-9 rounded-lg bg-gradient-primary shadow-glow">
              <Sparkles className="h-4 w-4 text-primary-foreground" strokeWidth={2.5} />
            </span>
            <span className="font-serif-display text-xl">
              Haidar<span className="text-gradient">.</span>Analytics
            </span>
          </Link>
          <p className="text-muted-foreground max-w-sm text-sm leading-relaxed">
            Data, BI &amp; AI analytics for ambitious teams. Founded by Zain Haidar — Vienna, working globally.
          </p>
          <div className="flex items-center gap-2 pt-2">
            {[
              { icon: Linkedin, href: "https://www.linkedin.com/", label: "LinkedIn" },
              { icon: Github, href: "https://github.com/", label: "GitHub" },
              { icon: Mail, href: "mailto:zainhaider72@gmail.com", label: "Email" },
            ].map((s) => (
              <a
                key={s.label}
                href={s.href}
                aria-label={s.label}
                className="grid place-items-center h-10 w-10 rounded-full glass hover:bg-foreground/10 transition"
              >
                <s.icon className="h-4 w-4" />
              </a>
            ))}
          </div>
        </div>

        {groups.map((g) => (
          <div key={g.title} className="lg:col-span-2">
            <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">{g.title}</div>
            <ul className="space-y-2.5 text-sm">
              {g.links.map((l) => (
                <li key={l.to}>
                  <Link to={l.to} className="text-foreground/80 hover:text-foreground">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div className="lg:col-span-3">
          <div className="text-xs uppercase tracking-[0.2em] text-muted-foreground mb-4">Studio</div>
          <p className="text-sm text-foreground/80">Vienna, Austria</p>
          <p className="text-sm text-muted-foreground mt-1">CET · Replies within 24h</p>
        </div>
      </div>

      <div className="border-t border-border">
        <div className="mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-10 py-6 flex flex-col md:flex-row items-center justify-between gap-3 text-xs text-muted-foreground">
          <div>© {new Date().getFullYear()} Haidar Analytics — Crafted in Vienna.</div>
          <div className="font-mono">Data · BI · AI Analytics</div>
        </div>
      </div>
    </footer>
  );
}
