import { motion } from "framer-motion";
import { Building2, UserCircle, Briefcase, ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const audiences = [
  {
    icon: Building2,
    title: "Small Businesses",
    description:
      "I help small businesses replace spreadsheet chaos with automated dashboards and clean databases — giving you real-time visibility into sales, operations, and customer trends without hiring a full data team.",
    cta: "Start a Project",
  },
  {
    icon: UserCircle,
    title: "Freelance Clients",
    description:
      "Freelancers and solopreneurs hire me for focused data projects — one-off dashboard builds, data cleaning sprints, and reporting automations that save hours of manual work every week.",
    cta: "Start a Project",
  },
  {
    icon: Briefcase,
    title: "Hiring Teams",
    description:
      "If you're looking for a data analyst or BI specialist to join your team, I bring 5+ years of production dashboard experience, SQL pipeline engineering, and cross-functional communication skills.",
    cta: "Get in Touch",
  },
];

export function WhoIHelp() {
  return (
    <section className="py-24 md:py-28 bg-[#020617]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-[12px] font-semibold uppercase tracking-widest text-[#94A3B8] mb-3">
            Who I Serve
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#F8FAFC] leading-tight">
            Built for teams that need data clarity
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-6">
          {audiences.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
                className="bg-[#0F172A] rounded-3xl border border-[#334155] p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#2563EB]/40 transition-all duration-300 group"
              >
                <div>
                  <div className="h-12 w-12 rounded-2xl bg-[#2563EB]/10 border border-[#2563EB]/25 flex items-center justify-center mb-5 group-hover:bg-[#2563EB] transition-colors duration-300">
                    <Icon className="h-5 w-5 text-[#2563EB] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-bold text-[#F8FAFC] text-[18px] mb-3">{item.title}</h3>
                  <p className="text-[14px] text-[#94A3B8] leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#2563EB] hover:text-[#3B82F6] transition-colors"
                >
                  {item.cta}
                  <ArrowRight className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" />
                </Link>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
