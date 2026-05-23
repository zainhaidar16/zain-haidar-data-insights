import { ArrowRight, CloudDownload, BarChart2, Shield, Zap, CheckCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Hero() {
  return (
    <section className="relative pt-36 md:pt-48 pb-20 md:pb-28 overflow-hidden grid-bg">
      {/* Radiant Glowing Background spots */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-hero pointer-events-none z-0" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute top-80 -left-40 w-[500px] h-[500px] rounded-full bg-glow/5 blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 text-center relative z-10">
        {/* Icy Glass Eyebrow */}
        <div className="inline-flex items-center gap-2.5 rounded-lg border border-white/5 bg-secondary/40 px-4 py-2 text-[11px] font-mono tracking-widest text-accent uppercase mb-8 md:mb-10 shadow-card animate-float">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          Power BI · Tableau · Looker Studio Specialist
        </div>

        {/* Dynamic Glass Headline */}
        <h1 className="font-serif-display mx-auto max-w-5xl text-[48px] sm:text-[68px] md:text-[88px] lg:text-[100px] leading-[1.0] tracking-[-0.03em] font-extrabold text-foreground">
          Dashboards Built for Decisions.<br />
          <span className="text-gradient-cyan-purple">Data Engineered for Scale.</span>
        </h1>

        {/* Custom Personal Bio copy focusing on dashboards and data tech */}
        <p className="mx-auto mt-8 max-w-[750px] text-[16px] md:text-[19px] leading-[1.6] text-muted-foreground">
          I&apos;m <span className="text-foreground font-semibold">Zain Haidar</span>, a Data Analyst and Business Intelligence Engineer in Vienna. I build high-performance dashboard control stations, complex DAX layers, and automated SQL pipelines that turn cluttered database structures into governed, reliable insights executives actually rely on.
        </p>

        {/* Floating Cyber buttons */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-2 rounded-lg bg-gradient-primary text-primary-foreground px-8 py-4 text-[14px] font-bold shadow-glow hover:opacity-95 transition active:scale-95 duration-200"
          >
            Initiate Scoping
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="/cv-zain-haidar.pdf"
            download
            className="inline-flex items-center gap-2 rounded-lg border border-white/10 bg-white/5 px-7 py-4 text-[14px] font-bold text-foreground hover:bg-white/10 transition active:scale-95 duration-200"
          >
            <CloudDownload className="h-4 w-4 text-accent" />
            Download Capability Profile
          </a>
        </div>

        {/* Technology checkboxes */}
        <div className="mt-14 flex flex-wrap justify-center items-center gap-y-3 gap-x-10 text-[12px] font-mono tracking-wider text-muted-foreground uppercase">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-accent" /> Microsoft Power BI
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-accent" /> Tableau Server &amp; Desktop
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-accent" /> Looker Studio &amp; BigQuery
          </div>
        </div>

        {/* Dynamic Glass Dashboard Analytics stats */}
        <div className="mt-20 md:mt-24 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
          {/* Stat 1 */}
          <div className="glass p-6 md:p-8 rounded-2xl relative overflow-hidden group transition-all duration-300 hover:border-accent/30 shadow-elegant">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Zap className="h-20 w-20 text-accent" />
            </div>
            <div className="text-muted-foreground uppercase text-[10px] tracking-widest font-mono mb-2">DAX &amp; LOD Optimization</div>
            <div className="text-3xl md:text-4xl font-serif-display font-black text-foreground mb-2">
              8h → 12min
            </div>
            <div className="text-sm text-muted-foreground leading-relaxed">
              Power BI semantic model refreshes optimized through star schemas, conformed dimensions, and efficient query foldings.
            </div>
          </div>

          {/* Stat 2 */}
          <div className="glass p-6 md:p-8 rounded-2xl relative overflow-hidden group transition-all duration-300 hover:border-accent/30 shadow-elegant">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Shield className="h-20 w-20 text-accent" />
            </div>
            <div className="text-muted-foreground uppercase text-[10px] tracking-widest font-mono mb-2">Data Integrity Scale</div>
            <div className="text-3xl md:text-4xl font-serif-display font-black text-foreground mb-2">
              120+ Outlets
            </div>
            <div className="text-sm text-muted-foreground leading-relaxed">
              Row-Level Security (RLS) configured mapping multi-brand groups, providing consistent row security for store managers.
            </div>
          </div>

          {/* Stat 3 */}
          <div className="glass p-6 md:p-8 rounded-2xl relative overflow-hidden group transition-all duration-300 hover:border-accent/30 shadow-elegant">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <BarChart2 className="h-20 w-20 text-accent" />
            </div>
            <div className="text-muted-foreground uppercase text-[10px] tracking-widest font-mono mb-2">Consolidation</div>
            <div className="text-3xl md:text-4xl font-serif-display font-black text-foreground mb-2">
              27 Reports
            </div>
            <div className="text-sm text-muted-foreground leading-relaxed">
              Fragmented spreadsheet clusters and reports retired into a unified, secure dashboard system managers open daily.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
