import { ArrowRight, CloudDownload, Database, Server, Cpu, CheckCircle } from "lucide-react";
import { Link } from "@tanstack/react-router";

export function Hero() {
  return (
    <section className="relative pt-36 md:pt-48 pb-20 md:pb-28 overflow-hidden grid-bg">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 inset-x-0 h-[600px] bg-gradient-hero pointer-events-none z-0" />
      <div className="absolute -top-40 -right-40 w-96 h-96 rounded-full bg-accent/5 blur-[120px] pointer-events-none animate-pulse" />
      <div className="absolute top-80 -left-40 w-[500px] h-[500px] rounded-full bg-glow/5 blur-[160px] pointer-events-none" />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 text-center relative z-10">
        {/* Cyber Eyebrow */}
        <div className="inline-flex items-center gap-2.5 rounded-full border border-white/5 bg-secondary/40 px-4 py-2 text-[11px] font-mono tracking-widest text-accent uppercase mb-8 md:mb-10 shadow-card animate-float">
          <span className="relative flex h-2 w-2">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-accent"></span>
          </span>
          Enterprise BI &amp; Data Engineering Studio
        </div>

        {/* Scaled High-Performance Headline */}
        <h1 className="font-serif-display mx-auto max-w-4xl text-[48px] sm:text-[68px] md:text-[88px] lg:text-[104px] leading-[1.0] tracking-[-0.04em] font-extrabold text-foreground">
          We Architect Data.<br />
          <span className="text-gradient-cyan-purple">You Scale Performance.</span>
        </h1>

        {/* Corporate Positioning Subtext */}
        <p className="mx-auto mt-8 max-w-[720px] text-[16px] md:text-[19px] leading-[1.6] text-muted-foreground">
          Haidar Analytics builds robust, enterprise-grade Power BI models, optimized DAX systems, and unified SQL data warehouses that convert chaotic business databases into governed assets executives actually rely on.
        </p>

        {/* Action Buttons with glow hover */}
        <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-8 py-4 text-[14px] font-bold shadow-glow hover:opacity-95 transition active:scale-95 duration-200"
          >
            Initiate Consultation
            <ArrowRight className="h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Link>
          <a
            href="/cv-zain-haidar.pdf"
            download
            className="inline-flex items-center gap-2 rounded-full border border-white/10 bg-white/5 px-7 py-4 text-[14px] font-bold text-foreground hover:bg-white/10 transition active:scale-95 duration-200"
          >
            <CloudDownload className="h-4 w-4 text-accent" />
            Download Studio Profile
          </a>
        </div>

        {/* Bullet Trust indicators */}
        <div className="mt-14 flex flex-wrap justify-center items-center gap-y-3 gap-x-10 text-[12px] font-mono tracking-wider text-muted-foreground uppercase">
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-accent" /> Governed Architectures
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-accent" /> High-Performance DAX
          </div>
          <div className="flex items-center gap-2">
            <CheckCircle className="h-4 w-4 text-accent" /> Automated ETL Layers
          </div>
        </div>

        {/* Sleek High-Tech Impact Stats Grid */}
        <div className="mt-20 md:mt-24 grid sm:grid-cols-3 gap-6 max-w-4xl mx-auto text-left">
          {/* Stat 1 */}
          <div className="glass p-6 md:p-8 rounded-2xl relative overflow-hidden group transition-all duration-300 hover:border-accent/30">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Server className="h-20 w-20 text-accent" />
            </div>
            <div className="text-muted-foreground uppercase text-[10px] tracking-widest font-mono mb-2">Data Processing</div>
            <div className="text-3xl md:text-4xl font-serif-display font-black text-foreground mb-2">
              8h → 12min
            </div>
            <div className="text-sm text-muted-foreground leading-relaxed">
              Drastic reduction in daily ETL latency through schema orchestration and dbt warehouse modeling.
            </div>
          </div>

          {/* Stat 2 */}
          <div className="glass p-6 md:p-8 rounded-2xl relative overflow-hidden group transition-all duration-300 hover:border-accent/30">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Database className="h-20 w-20 text-accent" />
            </div>
            <div className="text-muted-foreground uppercase text-[10px] tracking-widest font-mono mb-2">Workspace Scale</div>
            <div className="text-3xl md:text-4xl font-serif-display font-black text-foreground mb-2">
              120+ Outlets
            </div>
            <div className="text-sm text-muted-foreground leading-relaxed">
              Row-Level Security (RLS) configured mapping complex regional permissions across multi-brand groups.
            </div>
          </div>

          {/* Stat 3 */}
          <div className="glass p-6 md:p-8 rounded-2xl relative overflow-hidden group transition-all duration-300 hover:border-accent/30">
            <div className="absolute top-0 right-0 p-4 opacity-5 group-hover:opacity-10 transition-opacity">
              <Cpu className="h-20 w-20 text-accent" />
            </div>
            <div className="text-muted-foreground uppercase text-[10px] tracking-widest font-mono mb-2">Forecasting MAPE</div>
            <div className="text-3xl md:text-4xl font-serif-display font-black text-foreground mb-2">
              92% Accuracy
            </div>
            <div className="text-sm text-muted-foreground leading-relaxed">
              Robust ML-driven demand models integrated smoothly directly inside executive business workspaces.
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
