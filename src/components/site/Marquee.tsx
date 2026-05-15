const tech = [
  "Power BI", "DAX", "SQL Server", "T-SQL", "Azure Data Factory",
  "Microsoft Fabric", "Excel · Power Query", "Python · pandas", "dbt",
  "Snowflake", "PostgreSQL", "Tableau", "Git",
];

export function Marquee() {
  return (
    <section className="border-y border-border py-8">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 mb-5">
        <div className="text-[11px] uppercase tracking-[0.22em] text-muted-foreground">
          Tools I work with daily
        </div>
      </div>
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_8%,black_92%,transparent)]">
        <div className="flex shrink-0 animate-marquee gap-10 pr-10">
          {[...tech, ...tech].map((t, i) => (
            <span
              key={i}
              className="text-[15px] font-mono text-muted-foreground whitespace-nowrap"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
