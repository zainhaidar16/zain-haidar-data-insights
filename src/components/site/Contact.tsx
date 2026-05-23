import { Mail, MapPin, Linkedin, Github, FileDown } from "lucide-react";

export function Contact() {
  return (
    <section id="contact" className="relative py-20 md:py-24 overflow-hidden border-b border-slate-100">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-6 grid md:grid-cols-12 gap-8 items-center">
        <div className="md:col-span-7">
          <div className="text-[9px] font-mono uppercase tracking-[0.25em] text-slate-400 mb-4">
            Operational Availability
          </div>
          
          <h2 className="font-serif-display text-[32px] md:text-[44px] lg:text-[52px] leading-tight tracking-[-0.025em] text-slate-800">
            Let&rsquo;s talk about your data.
          </h2>
          
          <p className="mt-4 text-[14px] text-slate-500 max-w-[50ch] leading-relaxed">
            Hiring a dedicated BI lead or scoping an enterprise Power BI rescue mission? We respond to all formal and project inquiries within 24 hours from Vienna.
          </p>
          
          <div className="mt-6 flex flex-wrap gap-2.5">
            <a
              href="mailto:zainhaider72@gmail.com"
              className="inline-flex items-center gap-2 rounded bg-slate-900 text-white px-5 py-3 text-[13px] font-medium hover:bg-slate-800 transition"
            >
              <Mail className="h-3.5 w-3.5" /> zainhaider72@gmail.com
            </a>
            <a
              href="/cv-zain-haidar.pdf"
              download
              className="inline-flex items-center gap-2 rounded border border-slate-200 bg-white px-5 py-3 text-[13px] font-medium text-slate-700 hover:bg-slate-50 transition"
            >
              <FileDown className="h-3.5 w-3.5 text-slate-400" /> Download Profile
            </a>
          </div>
        </div>

        <div className="md:col-span-5 space-y-2.5">
          {[
            { icon: MapPin, label: "Based in", value: "Vienna, Austria · CET" },
            { icon: Github, label: "GitHub", value: "github.com/zainhaidar16", href: "https://github.com/zainhaidar16" },
            { icon: Linkedin, label: "LinkedIn", value: "Connect with Haidar Analytics", href: "https://www.linkedin.com/" },
          ].map((row) => {
            const Inner = (
              <div className="border border-slate-200 bg-white p-4 rounded flex items-center gap-4 hover:border-slate-300 transition duration-150 shadow-sm group">
                <div className="h-8 w-8 rounded bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 text-slate-700">
                  <row.icon className="h-4 w-4" />
                </div>
                <div className="min-w-0">
                  <div className="text-[9px] font-mono uppercase tracking-widest text-slate-400">{row.label}</div>
                  <div className="font-semibold text-slate-800 truncate mt-0.5 text-[13px]">{row.value}</div>
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
