const tech = [
  "POWER BI", "TABLEAU", "LOOKER STUDIO", "EXCEL AUTOMATION",
  "CLEAN DATABASES", "SQL DATABASES", "GOOGLE BIGQUERY", "PYTHON SCRIPTS",
  "SPREADSHEET CLEANUP", "BUSINESS REPORTS", "DATA PIPELINES", "DATA CHARTS"
];

export function Marquee() {
  return (
    <section className="border-y border-border py-8 bg-secondary/35 relative overflow-hidden">
      {/* Subtle glow borders */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/20 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/10 to-transparent" />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 mb-5">
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-primary font-semibold flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-primary animate-ping" />
          Tools I Use
        </div>
      </div>
      
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <div className="flex shrink-0 animate-marquee gap-14 pr-14">
          {[...tech, ...tech].map((t, i) => (
            <span
              key={i}
              className="text-[14px] font-mono tracking-widest text-muted-foreground uppercase whitespace-nowrap flex items-center gap-4 hover:text-primary transition-colors duration-300"
            >
              <span>{t}</span>
              <span className="text-primary/20 font-sans">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
