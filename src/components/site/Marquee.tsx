const tech = [
  "Power BI", "SQL", "Python", "Tableau", "Databricks", "Snowflake",
  "Azure", "AWS", "GCP", "dbt", "Airflow", "Spark", "Docker", "Pandas",
  "scikit-learn", "PyTorch", "OpenAI", "LangChain",
];

export function Marquee() {
  return (
    <section className="border-y border-black/5 py-8 overflow-hidden bg-secondary">
      <div className="text-center text-xs uppercase tracking-[0.3em] text-muted-foreground mb-6">
        Trusted stack across enterprise & startup engagements
      </div>
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <div className="flex shrink-0 animate-[marquee_40s_linear_infinite] gap-12 pr-12">
          {[...tech, ...tech].map((t, i) => (
            <span key={i} className="text-2xl md:text-3xl font-serif-display text-muted-foreground/70 hover:text-foreground transition-colors whitespace-nowrap">
              {t}
            </span>
          ))}
        </div>
      </div>
      <style>{`@keyframes marquee { from { transform: translateX(0); } to { transform: translateX(-50%); } }`}</style>
    </section>
  );
}
