const tech = [
  "MICROSOFT POWER BI", "TABLEAU DESKTOP", "LOOKER STUDIO", "DAX CALCULATIONS",
  "KIMBALL STAR SCHEMAS", "DBT DATA MARTS", "AZURE DATA WAREHOUSING", "GCP BIGQUERY",
  "T-SQL PROGRAMMING", "TABULAR EDITING", "PREDICTIVE ANALYTICS", "GIT VERSION CONTROL"
];

export function Marquee() {
  return (
    <section className="border-y border-white/5 py-8 bg-[#070b19]/30 backdrop-blur-sm relative overflow-hidden">
      {/* Subtle glow borders */}
      <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-accent/30 to-transparent" />
      <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-glow/30 to-transparent" />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 mb-5">
        <div className="text-[10px] font-mono uppercase tracking-[0.3em] text-accent font-semibold flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-accent animate-ping" />
          Technical Specialization Stack
        </div>
      </div>
      
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <div className="flex shrink-0 animate-marquee gap-14 pr-14">
          {[...tech, ...tech].map((t, i) => (
            <span
              key={i}
              className="text-[14px] font-mono tracking-widest text-muted-foreground uppercase whitespace-nowrap flex items-center gap-4 hover:text-accent transition-colors duration-300"
            >
              <span>{t}</span>
              <span className="text-white/10 font-sans">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
