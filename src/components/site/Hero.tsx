import { ArrowRight, FileDown } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Hero() {
  return (
    <section className="relative pt-36 md:pt-48 pb-24 md:pb-32">
      <div className="mx-auto max-w-[1180px] px-5 sm:px-8 text-center">
        {/* Eyebrow */}
        <div className="inline-flex items-center gap-2 rounded-full border border-border bg-secondary/60 px-4 py-1.5 text-[12px] font-medium text-muted-foreground mb-10">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
          Available for Data Analyst &amp; BI roles · Vienna · Remote EU
        </div>

        {/* Headline — Apple-style: large, tight, semibold, no italics */}
        <h1 className="font-serif-display mx-auto max-w-[18ch] text-[44px] sm:text-[64px] md:text-[80px] lg:text-[96px] leading-[1.02] tracking-[-0.035em] font-semibold text-foreground">
          Power BI, built for decisions.
        </h1>

        {/* Sub */}
        <p className="mx-auto mt-7 max-w-[640px] text-[18px] md:text-[20px] leading-[1.5] text-muted-foreground">
          I&apos;m <span className="text-foreground font-medium">Zain Haidar</span>, a data analyst in Vienna.
          I design Power BI models, DAX measures and SQL pipelines that turn
          scattered business data into reports executives actually open.
        </p>

        {/* CTAs */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
          <a
            href="/cv-zain-haidar.pdf"
            download
            className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-[15px] font-medium hover:bg-foreground/90 transition"
          >
            <FileDown className="h-4 w-4" />
            Download CV
          </a>
          <Link
            to="/work"
            className="group inline-flex items-center gap-1.5 rounded-full px-5 py-3.5 text-[15px] font-medium text-foreground hover:text-accent transition-colors"
          >
            See dashboards
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5" />
          </Link>
        </div>

        {/* Stack line */}
        <div className="mt-14 flex flex-wrap justify-center gap-x-8 gap-y-2 text-[13px] font-medium text-muted-foreground">
          <span>Power BI</span>
          <span className="text-border">·</span>
          <span>DAX</span>
          <span className="text-border">·</span>
          <span>SQL Server</span>
          <span className="text-border">·</span>
          <span>Azure Data Factory</span>
          <span className="text-border">·</span>
          <span>Python</span>
          <span className="text-border">·</span>
          <span>dbt</span>
        </div>

        {/* Quiet meta footer */}
        <div className="mt-20 pt-8 border-t border-border grid sm:grid-cols-3 gap-6 text-left text-sm max-w-3xl mx-auto">
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-1.5">Now</div>
            <div className="text-foreground">MS Computer Science — University of Vienna</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-1.5">Recently</div>
            <div className="text-foreground">Power BI &amp; ETL for retail and healthcare clients</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.18em] text-muted-foreground mb-1.5">Looking for</div>
            <div className="text-foreground">Data Analyst / BI Developer roles · Vienna or remote EU</div>
          </div>
        </div>
      </div>
    </section>
  );
}
