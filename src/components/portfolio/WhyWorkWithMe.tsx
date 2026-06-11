import { motion } from "framer-motion";
import {
  FileBarChart,
  DatabaseZap,
  LayoutDashboard,
  MessageCircle,
  Lightbulb,
  Workflow,
} from "lucide-react";
import TiltCard from "@/components/fx/TiltCard";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const benefits = [
  {
    icon: FileBarChart,
    title: "Clear Reporting",
    desc: "Dashboards and reports that stakeholders can read, trust, and act on without technical training.",
  },
  {
    icon: DatabaseZap,
    title: "Clean Data Workflows",
    desc: "Structured ETL pipelines and database schemas that eliminate data silos and manual workarounds.",
  },
  {
    icon: LayoutDashboard,
    title: "Practical Dashboards",
    desc: "Interactive Power BI and Tableau dashboards designed for real daily use, not just presentations.",
  },
  {
    icon: MessageCircle,
    title: "Simple Communication",
    desc: "Complex analytics explained in plain language. No jargon walls between data and decisions.",
  },
  {
    icon: Lightbulb,
    title: "Business Insights",
    desc: "Every analysis starts with a business question and ends with an actionable recommendation.",
  },
  {
    icon: Workflow,
    title: "End-to-End Support",
    desc: "From raw data ingestion to final dashboard delivery — a single point of contact for the entire analytics lifecycle.",
  },
];

export function WhyWorkWithMe() {
  return (
    <section className="py-24 md:py-28 bg-white border-t border-[#E8E8ED]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-[12px] font-semibold uppercase tracking-widest text-[#0071E3] mb-3">
            Why Choose Me
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#1D1D1F] leading-tight">
            Why work with Zain The Analyst?
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((item, i) => {
            const Icon = item.icon;
            return (
              <TiltCard key={item.title} maxTilt={8}>
                <motion.div
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
                  className="card-payoneer p-7 group flex flex-col h-full bg-[#FBFBFD] border border-[#E8E8ED] hover:border-[#0071E3]/30 hover:shadow-md rounded-[24px] transition-all duration-300"
                >
                  <div className="h-11 w-11 rounded-2xl bg-[rgba(0,113,227,0.06)] border border-[rgba(0,113,227,0.12)] flex items-center justify-center mb-4 group-hover:bg-[#0071E3] transition-colors duration-300">
                    <Icon className="h-5 w-5 text-[#0071E3] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-bold text-[#1D1D1F] text-[16px] mb-2">{item.title}</h3>
                  <p className="text-[13px] text-[#6E6E73] leading-relaxed">{item.desc}</p>
                </motion.div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
