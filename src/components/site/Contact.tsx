import { Mail, MapPin, Linkedin, Github, FileDown } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative py-24 md:py-32 border-t border-border">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 grid md:grid-cols-12 gap-10">
        <div className="md:col-span-7">
          <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-5 flex items-center gap-3">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
            Open to work
          </div>
          <h2 className="font-serif-display text-[40px] md:text-[64px] leading-[1] tracking-[-0.025em] max-w-[14ch]">
            Hiring? Or have a Power BI project?
          </h2>
          <p className="mt-6 text-[17px] text-muted-foreground max-w-[55ch] leading-relaxed">
            The fastest way to reach me is email. I&rsquo;m based in Vienna (CET) and reply
            within 24 hours. CV is one click away if you need it for a screening.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <a
              href="mailto:zainhaider72@gmail.com"
              className="inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-medium hover:bg-foreground/90 transition"
            >
              <Mail className="h-4 w-4" /> zainhaider72@gmail.com
            </a>
            <a
              href="/cv-zain-haidar.pdf"
              download
              className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-7 py-3.5 text-sm font-medium hover:border-foreground/60 transition"
            >
              <FileDown className="h-4 w-4" /> Download CV
            </a>
          </div>
        </div>

        <div className="md:col-span-5 space-y-3">
          {[
            { icon: MapPin, label: "Based in", value: "Vienna, Austria · CET" },
            { icon: Github, label: "GitHub", value: "github.com/zainhaidar16", href: "https://github.com/zainhaidar16" },
            { icon: Github, label: "GitHub", value: "github.com/zain", href: "https://github.com/" },
          ].map((row) => {
            const Inner = (
              <div className="border border-border rounded-md p-5 flex items-center gap-4 bg-card hover:border-foreground/40 transition">
                <div className="h-10 w-10 rounded-md border border-border grid place-items-center shrink-0 text-foreground">
                  <row.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">{row.label}</div>
                  <div className="font-medium truncate">{row.value}</div>
                </div>
              </div>
            );
            return row.href ? (
              <a key={row.label} href={row.href} target="_blank" rel="noreferrer">{Inner}</a>
            ) : (
              <div key={row.label}>{Inner}</div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
