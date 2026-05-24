import { Mail, MapPin, Linkedin, Github, FileDown } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 border-t border-border overflow-hidden bg-secondary/15">
      <div className="absolute -bottom-20 -left-20 w-80 h-80 rounded-full bg-primary/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 grid md:grid-cols-12 gap-10 items-center">
        <div className="md:col-span-7">
          <div className="text-[10px] font-mono uppercase tracking-[0.25em] text-primary mb-5 flex items-center gap-2">
            <span className="relative flex h-2 w-2">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
            </span>
            Availability Details
          </div>
          
          <h2 className="font-serif-display text-[36px] md:text-[54px] lg:text-[64px] leading-[1.05] tracking-[-0.03em] max-w-[15ch] text-foreground">
            Let&rsquo;s talk about your dashboards.
          </h2>
          
          <p className="mt-6 text-[16px] text-muted-foreground max-w-[55ch] leading-relaxed">
            Hiring a dedicated BI developer or scoping an optimization project for your Power BI, Tableau, or Looker Studio setups? I reply within 24 hours from Vienna.
          </p>
          
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:zainhaider72@gmail.com"
              className="inline-flex items-center gap-2 rounded border border-primary bg-primary text-primary-foreground px-6 py-3.5 text-xs font-mono uppercase tracking-widest hover:bg-primary/95 transition duration-150 shadow-glow"
            >
              <Mail className="h-4 w-4" /> zainhaider72@gmail.com
            </a>
            <a
              href="/cv-zain-haidar.pdf"
              download
              className="inline-flex items-center gap-2 rounded border border-border bg-white text-foreground px-6 py-3.5 text-xs font-mono uppercase tracking-widest hover:bg-secondary transition duration-150"
            >
              <FileDown className="h-4 w-4 text-primary" /> Download CV
            </a>
          </div>
        </div>

        <div className="md:col-span-5 space-y-3">
          {[
            { icon: MapPin, label: "Located in", value: "Vienna, Austria · CET" },
            { icon: Github, label: "GitHub", value: "github.com/zainhaidar16", href: "https://github.com/zainhaidar16" },
            { icon: Linkedin, label: "LinkedIn", value: "Connect on LinkedIn", href: "https://www.linkedin.com/" },
          ].map((row) => {
            const Inner = (
              <div className="glass p-5 rounded-xl border border-border flex items-center gap-4 hover:border-primary/30 transition-all duration-300 group shadow-elegant">
                <div className="h-10 w-10 rounded bg-primary/10 border border-primary/20 flex items-center justify-center shrink-0 text-primary group-hover:scale-105 transition-transform duration-300">
                  <row.icon className="h-4.5 w-4.5" />
                </div>
                <div className="min-w-0">
                  <div className="text-[10px] font-mono uppercase tracking-widest text-muted-foreground">{row.label}</div>
                  <div className="font-semibold text-foreground truncate mt-0.5">{row.value}</div>
                </div>
              </div>
            );
            return row.href ? (
              <a key={row.label} href={row.href} target="_blank" rel="noreferrer" className="block">{Inner}</a>
            ) : (
              <div key={row.label}>{Inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
