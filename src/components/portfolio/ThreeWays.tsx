import { motion } from "framer-motion";
import { BarChart3, Database, Zap, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const cards = [
  {
    icon: BarChart3,
    title: "Dashboards",
    smallNumber: "Power BI",
    description:
      "I build clear dashboards so you can see sales, costs, orders, customers, and business results in one place.",
    bullets: ["Sales dashboards", "KPI reports", "Executive reports", "Monthly reports"],
    button: "View Dashboards",
    link: "/projects",
  },
  {
    icon: Database,
    title: "Data Cleaning",
    smallNumber: "SQL + Excel",
    description:
      "I clean messy files, fix broken data, and prepare your data so reports are correct and easy to use.",
    bullets: ["Excel cleaning", "SQL cleaning", "Data merging", "Error fixing"],
    button: "Clean My Data",
    link: "/services",
  },
  {
    icon: Zap,
    title: "Automation",
    smallNumber: "Python",
    description:
      "I automate repeated reporting tasks so you save time and stop doing the same work again and again.",
    bullets: ["Report automation", "Python scripts", "Scheduled reports", "Workflow cleanup"],
    button: "Automate Reports",
    link: "/services",
  },
];

export function ThreeWays() {
  return (
    <section className="py-24 md:py-28 bg-[#050505] border-t border-[rgba(255,255,255,0.06)]">
      <div className="section-container">
        {/* Section header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-14"
        >
          <p className="text-[12px] font-normal uppercase tracking-[0.2em] text-[#8B5CF6] mb-4">
            WHAT DO YOU NEED?
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-normal text-white leading-tight">
            Three Ways I Can{" "}
            <span className="text-[#8B5CF6]">Help</span>
          </h2>
          <p className="mt-4 text-[15px] text-[#8B8B98] max-w-2xl mx-auto leading-relaxed font-normal">
            Choose what your business needs right now. I can clean your data, build reports, or automate your work.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid md:grid-cols-3 gap-6">
          {cards.map((card, i) => {
            const Icon = card.icon;
            return (
              <motion.div
                key={card.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-60px" }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
                className="bg-[#111111] border border-[rgba(145,92,255,0.20)] rounded-2xl p-7 flex flex-col group hover:border-[rgba(145,92,255,0.40)] hover:bg-[#0F0A1A] transition-all duration-300"
              >
                {/* Top row: icon + small number */}
                <div className="flex items-start justify-between mb-5">
                  <div className="h-12 w-12 rounded-xl bg-[#1B102B] border border-[rgba(139,92,246,0.20)] flex items-center justify-center">
                    <Icon className="h-5 w-5 text-[#8B5CF6]" />
                  </div>
                  <span className="text-[11px] font-normal text-[#8B8B98] uppercase tracking-wider bg-[rgba(255,255,255,0.04)] px-3 py-1 rounded-full border border-[rgba(255,255,255,0.06)]">
                    {card.smallNumber}
                  </span>
                </div>

                {/* Title */}
                <h3 className="text-[20px] font-normal text-white mb-3">
                  {card.title}
                </h3>

                {/* Description */}
                <p className="text-[14px] text-[#8B8B98] leading-relaxed mb-5 font-normal">
                  {card.description}
                </p>

                {/* Bullet list */}
                <ul className="space-y-2 mb-6 flex-1">
                  {card.bullets.map((bullet) => (
                    <li key={bullet} className="flex items-center gap-2.5 text-[13px] text-[#D8D8E0] font-normal">
                      <span className="h-1.5 w-1.5 rounded-full bg-[#8B5CF6] shrink-0" />
                      {bullet}
                    </li>
                  ))}
                </ul>

                {/* CTA Button */}
                <Link
                  to={card.link}
                  className="mt-auto inline-flex items-center justify-center gap-2 w-full px-5 py-3 bg-[#8B5CF6] hover:bg-[#A779FF] text-white text-[13px] font-normal rounded-full transition-all duration-200 cursor-pointer"
                >
                  {card.button}
                  <ArrowRight className="h-3.5 w-3.5" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
