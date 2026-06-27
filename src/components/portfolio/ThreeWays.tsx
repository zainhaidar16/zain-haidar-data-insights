import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const cards = [
  {
    title: "Dashboards",
    smallNumber: "Power BI",
    logos: [
      { name: "Power BI", logo: "/logos/power-bi.svg" },
      { name: "SQL", logo: "/logos/sql.svg" },
    ],
    description:
      "I build clear dashboards so you can see sales, costs, orders, customers, and business results in one place.",
    bullets: ["Sales dashboards", "KPI reports", "Executive reports", "Monthly reports"],
    button: "View Dashboards",
    link: "/projects",
  },
  {
    title: "Data Cleaning",
    smallNumber: "SQL + Excel",
    logos: [
      { name: "SQL", logo: "/logos/sql.svg" },
      { name: "Excel", logo: "/logos/excel.svg" },
    ],
    description:
      "I clean messy files, fix broken data, and prepare your data so reports are correct and easy to use.",
    bullets: ["Excel cleaning", "SQL cleaning", "Data merging", "Error fixing"],
    button: "Clean My Data",
    link: "/services",
  },
  {
    title: "Automation",
    smallNumber: "Python",
    logos: [
      { name: "Python", logo: "/logos/python.svg" },
      { name: "Pandas", logo: "/logos/pandas.svg" },
    ],
    description:
      "I automate repeated reporting tasks so you save time and stop doing the same work again and again.",
    bullets: ["Report automation", "Python scripts", "Scheduled reports", "Workflow cleanup"],
    button: "Automate Reports",
    link: "/services",
  },
];

export function ThreeWays() {
  return (
    <section className="py-12 md:py-20 bg-white border-t border-[var(--line-soft)]">
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="max-w-3xl mb-14"
        >
          <p className="text-[12px] font-normal uppercase tracking-[0.2em] text-[var(--purple)] mb-4">
            WHAT DO YOU NEED?
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[var(--text-main)] leading-tight">
            Three Ways I Can{" "}
            <span className="text-[var(--purple)]">Help</span>
          </h2>
          <p className="mt-4 text-[15px] text-[var(--text-soft)] max-w-2xl leading-relaxed font-normal">
            Choose what your business needs right now. I can clean your data, build reports, or automate your work.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
                className="site-card p-7 flex flex-col group"
              >
                {/* Top row: icon + small number */}
                <div className="flex items-start justify-between mb-5">
                  <div className="flex -space-x-2">
                    {card.logos.map((logo) => (
                      <div
                        key={logo.name}
                        className="h-12 w-12 rounded-xl border border-[var(--card-border)] bg-white p-2.5 shadow-sm"
                        title={logo.name}
                      >
                        <img src={logo.logo} alt={`${logo.name} logo`} className="h-full w-full object-contain" />
                      </div>
                    ))}
                  </div>
                  <span className="text-[11px] font-normal text-[var(--text-soft)] uppercase tracking-wider bg-[var(--site-bg-soft)] px-3 py-1 rounded-full border border-[var(--card-border)]">
                    {card.smallNumber}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[20px] font-semibold text-[var(--text-main)] mb-3">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-[14px] text-[var(--text-soft)] leading-relaxed mb-5 font-normal">
                  {card.description}
                </p>

                {/* Bullet list */}
                <ul className="space-y-2 mb-6 flex-1">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2.5 text-[13px] text-[var(--text-soft)] font-normal">
                      <span className="h-1.5 w-1.5 rounded-full bg-[var(--purple)] shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  to={card.link}
                  className="secondary-button mt-auto inline-flex w-auto items-center justify-center gap-2 self-start px-6 py-3 text-[13px] font-semibold rounded-[10px] transition-all duration-200 cursor-pointer"
                >
                  {card.button}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
