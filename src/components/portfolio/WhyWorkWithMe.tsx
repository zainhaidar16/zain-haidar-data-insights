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
    <section className="py-24 md:py-28 bg-[#0F1012] border-t border-[rgba(245,245,243,0.10)]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-[12px] font-normal uppercase tracking-widest text-[#AAA9A3] mb-3">
            Why Choose Me
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-normal text-[#F5F5F3] leading-tight">
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
                  className="card-payoneer p-7 group flex flex-col h-full bg-[#1D1E22] border border-[rgba(245,245,243,0.10)] hover:border-[rgba(245,245,243,0.24)] hover:bg-[#232428] hover:shadow-lg rounded-[24px] transition-all duration-300"
                >
                  <div className="h-11 w-11 rounded-2xl bg-[#151619] border border-[rgba(245,245,243,0.10)] flex items-center justify-center mb-4 group-hover:border-[rgba(245,245,243,0.24)] transition-all duration-300">
                    <Icon className="h-5 w-5 text-[#D8D8D2] group-hover:text-white transition-colors duration-300" />
                  </div>
                  <h3 className="font-normal text-[#F5F5F3] text-[16px] mb-2">{item.title}</h3>
                  <p className="text-[13px] text-[#D7D7D2] leading-relaxed font-normal">{item.desc}</p>
                </motion.div>
              </TiltCard>
            );
          })}
        </div>
      </div>
    </section>
  );
}
