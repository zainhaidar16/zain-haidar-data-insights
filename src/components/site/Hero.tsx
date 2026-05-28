import { ArrowRight, CloudDownload, CheckCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

export function Hero() {
  return (
    <section className="relative pt-36 md:pt-48 pb-20 md:pb-28 overflow-hidden bg-[#CFCFCF]">

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 text-center relative z-10">
        {/* Minimal Editorial Eyebrow */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-[#545454] bg-[#CFCFCF] px-5 py-2 text-[10px] font-medium tracking-widest text-[#545454] uppercase mb-8 md:mb-10">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          Power BI · Tableau · Looker Studio Specialist
        </div>

        {/* Dynamic Display Headline */}
        <h1 className="font-serif-display mx-auto max-w-5xl text-[44px] sm:text-[64px] md:text-[84px] lg:text-[96px] leading-[1.0] tracking-[-0.035em] font-extrabold text-foreground">
          I build simple, clear dashboards<br />
          <span className="text-foreground">to help you understand your data.</span>
        </h1>

        {/* Custom Personal Bio copy focusing on dashboards and data tech */}
        <p className="mx-auto mt-8 max-w-[760px] text-[16px] md:text-[18px] leading-[1.65] text-muted-foreground">
          Hi, I&apos;m <span className="text-foreground font-semibold">Zain Haidar</span>, the founder of <span className="text-accent font-semibold">Haidar Analytics</span>. I make clean, easy-to-read dashboards in <span className="text-foreground font-semibold">Power BI</span>, <span className="text-foreground font-semibold">Tableau</span>, and <span className="text-foreground font-semibold">Looker Studio</span> that help companies see their sales, profits, and customer metrics clearly. I clean up messy spreadsheets, connect databases, and make your reporting work automatically every day.
        </p>

        {/* Technical Outline CTA Actions */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Button asChild variant="primary">
            <Link to="/contact" className="group">
              Hire Me / Contact
              <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <a href="/Zain%20Haidar%20Resume.pdf" download>
              <CloudDownload className="h-4 w-4" />
              Download Resume
            </a>
          </Button>
        </div>

        {/* Technology checkboxes */}
        <div className="mt-16 flex flex-wrap justify-center items-center gap-y-3 gap-x-10 text-[11px] font-medium tracking-wider text-[#545454] uppercase">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-[#545454]" /> Microsoft Power BI
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-[#545454]" /> Tableau Dashboards
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-[#545454]" /> Google Looker Studio
          </div>
        </div>
      </div>
    </section>
  );
}
