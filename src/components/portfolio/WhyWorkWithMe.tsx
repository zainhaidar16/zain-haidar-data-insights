import { motion } from "framer-motion";
import { FileText, Workflow, BarChart3, MessageCircle, Lightbulb, ArrowRight } from "lucide-react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const benefits = [
  {
    icon: FileText,
    title: "Clear Reporting",
    desc: "Dashboards and reports that stakeholders can read, trust, and act on without technical training.",
  },
  {
    icon: Workflow,
    title: "Clean Data Workflows",
    desc: "Structured ETL pipelines and database schemas that eliminate data silos and manual workarounds.",
  },
  {
    icon: BarChart3,
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
    title: "Business-Focused Insights",
    desc: "Every analysis starts with a business question and ends with an actionable recommendation.",
  },
  {
    icon: ArrowRight,
    title: "End-to-End Support",
    desc: "From raw data ingestion to final dashboard delivery — a single point of contact for the entire analytics lifecycle.",
  },
];

export function WhyWorkWithMe() {
  return (
    <section className="py-24 bg-white">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center max-w-2xl mx-auto mb-14"
        >
          <p className="text-[12px] font-semibold uppercase tracking-widest text-[#9CA3AF] mb-3">Why Choose Me</p>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#111111] leading-tight">
            Why work with Zain The Analyst?
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-6">
          {benefits.map((item, i) => {
            const Icon = item.icon;
            return (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
                className="card-payoneer p-7 group hover:border-[#D7FF3F]/60 flex flex-col"
              >
                <div className="h-11 w-11 rounded-2xl bg-[#F2FBD9] border border-[#D7FF3F]/30 flex items-center justify-center mb-4 group-hover:bg-[#D7FF3F] transition-colors duration-300">
                  <Icon className="h-5 w-5 text-[#111111]" />
                </div>
                <h3 className="font-bold text-[#111111] text-[16px] mb-2">{item.title}</h3>
                <p className="text-[13px] text-[#4B5563] leading-relaxed">{item.desc}</p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
