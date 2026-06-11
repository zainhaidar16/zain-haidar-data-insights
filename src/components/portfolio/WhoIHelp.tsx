import { motion } from "framer-motion";
import { Building2, BriefcaseBusiness, Users, ArrowRight } from "lucide-react";
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
    icon: BriefcaseBusiness,
    title: "Freelance Clients",
    description:
      "Freelancers and solopreneurs hire me for focused data projects — one-off dashboard builds, data cleaning sprints, and reporting automations that save hours of manual work every week.",
    cta: "Start a Project",
  },
  {
    icon: Users,
    title: "Hiring Teams",
    description:
      "If you're looking for a data analyst or BI specialist to join your team, I bring 5+ years of production dashboard experience, SQL pipeline engineering, and cross-functional communication skills.",
    cta: "Get in Touch",
  },
];

export function WhoIHelp() {
  return (
    <section className="py-24 md:py-28 bg-[#F5F5F7] border-t border-[#E8E8ED]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-[12px] font-semibold uppercase tracking-widest text-[#0071E3] mb-3">
            Who I Serve
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#1D1D1F] leading-tight">
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
                className="bg-[#FFFFFF] rounded-[24px] border border-[#E8E8ED] p-8 flex flex-col justify-between shadow-none hover:border-[#0071E3]/30 hover:shadow-md transition-all duration-300 group"
              >
                <div>
                  <div className="h-12 w-12 rounded-2xl bg-[rgba(0,113,227,0.06)] border border-[rgba(0,113,227,0.12)] flex items-center justify-center mb-5 group-hover:bg-[#0071E3] transition-colors duration-300">
                    <Icon className="h-5 w-5 text-[#0071E3] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-bold text-[#1D1D1F] text-[18px] mb-3 group-hover:text-[#0071E3] transition-colors">
                    {item.title}
                  </h3>
                  <p className="text-[14px] text-[#6E6E73] leading-relaxed mb-6">
                    {item.description}
                  </p>
                </div>
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1.5 text-[13px] font-semibold text-[#0071E3] hover:text-[#005BB5] transition-colors"
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
