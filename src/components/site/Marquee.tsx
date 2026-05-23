const tech = [
  "POWER BI ENTERPRISE", "DAX STUDIO", "STAR SCHEMA MODELING", "AZURE DATA FACTORY",
  "MICROSOFT FABRIC", "DBT CORE", "SNOWFLAKE WAREHOUSING", "PYTHON ADVANCED",
  "T-SQL ARCHITECTURE", "TABULAR EDITING", "PREDICTIVE FORECASTING", "GIT VERSION CONTROL"
];

export function Marquee() {
  return (
    <section className="border-y border-slate-100 py-6 bg-slate-50/30 relative overflow-hidden">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-6 mb-4">
        <div className="text-[9px] font-mono uppercase tracking-[0.25em] text-slate-400 font-semibold flex items-center gap-2">
          Technology Specializations
        </div>
      </div>
      
      <div className="relative flex overflow-hidden [mask-image:linear-gradient(90deg,transparent,black_15%,black_85%,transparent)]">
        <div className="flex shrink-0 animate-marquee gap-14 pr-14">
          {[...tech, ...tech].map((t, i) => (
            <span
              key={i}
              className="text-[12px] font-mono tracking-wider text-slate-400 uppercase whitespace-nowrap flex items-center gap-4"
            >
              <span>{t}</span>
              <span className="text-slate-200 font-sans">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
