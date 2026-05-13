const tech = [
  "Power BI", "SQL", "Python", "Tableau", "Databricks", "Snowflake",
  "Azure", "AWS", "GCP", "dbt", "Airflow", "Spark", "Docker", "Pandas",
  "scikit-learn", "PyTorch", "OpenAI", "LangChain",
];

export function Marquee() {
  return (
    <section className="border-y border-border py-10 overflow-hidden">
      <div className="text-center text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-6">
        The stack we ship every day
      </div>
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <div className="flex shrink-0 animate-marquee gap-12 pr-12">
          {[...tech, ...tech].map((t, i) => (
            <span
              key={i}
              className="text-2xl md:text-3xl font-serif-display text-foreground/55 hover:text-foreground transition-colors whitespace-nowrap"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
