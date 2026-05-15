import { ArrowUpRight, FileDown, Mail } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Hero() {
  return (
    <section className="relative pt-32 md:pt-44 pb-20 md:pb-28">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        {/* Status line */}
        <div className="flex items-center gap-3 text-[12px] uppercase tracking-[0.22em] text-muted-foreground mb-10">
          <span className="h-1.5 w-1.5 rounded-full bg-emerald-600" />
          <span>Open to roles · Vienna &amp; remote EU</span>
          <span className="hidden sm:inline text-border">/</span>
          <span className="hidden sm:inline">2026</span>
        </div>

        {/* Editorial headline */}
        <h1 className="font-serif-display text-foreground leading-[0.98] tracking-[-0.035em] text-[40px] sm:text-[64px] md:text-[88px] lg:text-[112px] max-w-[16ch]">
          Power BI &amp; data analyst, turning <span className="italic">messy business data</span> into dashboards executives actually use.
        </h1>

        {/* Sub */}
        <div className="mt-12 grid md:grid-cols-12 gap-8 items-end">
          <p className="md:col-span-7 text-[17px] md:text-[19px] text-muted-foreground leading-relaxed max-w-[58ch]">
            I&apos;m <span className="text-foreground">Zain Haidar</span>, a data analyst based in Vienna.
            I build Power BI semantic models, DAX measures and SQL pipelines for mid-market
            companies who are tired of stitching reports from six exports every Monday.
            Currently finishing an MS in Computer Science at the University of Vienna and
            looking for a full-time Data Analyst or BI Developer role.
          </p>

          <div className="md:col-span-5 md:text-right">
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-3">
              Core stack
            </div>
            <div className="font-mono text-sm text-foreground/80 leading-relaxed">
              Power BI · DAX · SQL Server<br />
              Azure Data Factory · Python · dbt
            </div>
          </div>
        </div>

        {/* CTAs */}
        <div className="mt-12 flex flex-wrap items-center gap-3">
          <a
            href="/cv-zain-haidar.pdf"
            download
            className="group inline-flex items-center gap-2 rounded-full bg-foreground text-background px-7 py-3.5 text-sm font-medium hover:bg-foreground/90 transition"
          >
            <FileDown className="h-4 w-4" />
            Download CV
          </a>
          <Link
            to="/work"
            className="group inline-flex items-center gap-2 rounded-full border border-foreground/20 px-7 py-3.5 text-sm font-medium hover:border-foreground/60 transition"
          >
            See dashboards
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <a
            href="mailto:zainhaider72@gmail.com"
            className="inline-flex items-center gap-2 px-3 py-3.5 text-sm font-medium hover:text-accent transition"
          >
            <Mail className="h-4 w-4" />
            zainhaider72@gmail.com
          </a>
        </div>

        {/* Editorial rule + meta */}
        <div className="mt-20 pt-6 border-t border-border grid sm:grid-cols-3 gap-6 text-sm">
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-1.5">Now</div>
            <div className="text-foreground">MS Computer Science — Univ. of Vienna</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-1.5">Recently</div>
            <div className="text-foreground">Power BI &amp; ETL for retail and healthcare clients</div>
          </div>
          <div>
            <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-1.5">Looking for</div>
            <div className="text-foreground">Data Analyst / BI Developer roles · Vienna or remote EU</div>
          </div>
        </div>
      </div>
    </section>
  );
}
