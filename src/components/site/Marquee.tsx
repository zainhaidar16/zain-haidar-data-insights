const tech = [
  "POWER BI", "TABLEAU", "LOOKER STUDIO", "EXCEL AUTOMATION",
  "CLEAN DATABASES", "SQL DATABASES", "GOOGLE BIGQUERY", "PYTHON SCRIPTS",
  "SPREADSHEET CLEANUP", "BUSINESS REPORTS", "DATA PIPELINES", "DATA CHARTS"
];

export function Marquee() {
  return (
    <section className="border-y border-[#545454] py-8 bg-[#CFCFCF] relative overflow-hidden">

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8 mb-5">
        <div className="text-[10px] font-medium uppercase tracking-[0.3em] text-[#545454] flex items-center gap-2">
          <span className="h-1.5 w-1.5 rounded-full bg-[#545454] animate-ping" />
          Tools I Use
        </div>
      </div>
      
      <div className="relative flex overflow-hidden">
        <div className="flex shrink-0 animate-marquee gap-14 pr-14">
          {[...tech, ...tech].map((t, i) => (
            <span
              key={i}
              className="text-[14px] font-medium tracking-widest text-[#545454] uppercase whitespace-nowrap flex items-center gap-4"
            >
              <span>{t}</span>
              <span className="text-[#7D7D7D] font-sans">✦</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
