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
    bg: "bg-[#F2FBD9]",
  },
  {
    icon: UserCircle,
    title: "Freelance Clients",
    description:
      "Freelancers and solopreneurs hire me for focused data projects — one-off dashboard builds, data cleaning sprints, and reporting automations that save hours of manual work every week.",
    cta: "Start a Project",
    bg: "bg-[#F6F4EF]",
  },
  {
    icon: Briefcase,
    title: "Hiring Teams",
    description:
      "If you're looking for a data analyst or BI specialist to join your team, I bring 5+ years of production dashboard experience, SQL pipeline engineering, and cross-functional communication skills.",
    cta: "Get in Touch",
    bg: "bg-[#FFFFFF]",
  },
];

export function WhoIHelp() {
  return (
    <section className="py-24 bg-[#F6F4EF]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-[12px] font-semibold uppercase tracking-widest text-[#9CA3AF] mb-3">Who I Serve</p>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#111111] leading-tight">
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
                className={`${item.bg} rounded-3xl border border-[#E5E7EB] p-8 flex flex-col justify-between shadow-sm hover:shadow-md hover:border-[#D7FF3F]/40 transition-all duration-300 group`}
              >
                <div>
                  <div className="h-12 w-12 rounded-2xl bg-white border border-[#E5E7EB] flex items-center justify-center mb-5">
                    <Icon className="h-5 w-5 text-[#111111]" />
                  </div>
                  <h3 className="font-bold text-[#111111] text-[18px] mb-3">{item.title}</h3>
                  <p className="text-[14px] text-[#4B5563] leading-relaxed mb-6">{item.description}</p>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#111111] hover:text-[#4B5563] transition-colors"
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
