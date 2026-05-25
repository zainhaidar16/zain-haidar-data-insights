import { motion } from "framer-motion";
import { Star, MessageSquare } from "lucide-react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  project: string;
  initials: string;
}

const testimonials: TestimonialItem[] = [
  {
    quote: "Zain's automated Power BI reporting cut our end-of-month executive reporting cycles in half. His calculations standardization completely resolved definition conflicts between sales and operations.",
    author: "Sarah Jenkins",
    role: "Chief Operating Officer",
    company: "RetailFlow Corp",
    project: "Executive Sales & BI Dashboard",
    initials: "SJ"
  },
  {
    quote: "The customer segmentation cohort model delivered deep clarity on churn clusters. Zain helped us identify our highest-value marketing channels, which directly drove a 15% increase in conversion ROI.",
    author: "David Miller",
    role: "Director of Marketing",
    company: "LeadBoost E-Commerce",
    project: "Multi-Channel Cohort Segmentation",
    initials: "DM"
  },
  {
    quote: "Our daily database sync failures were a massive bottleneck that left dashboards empty at 9 AM. Zain systematically optimized our queries and Airflow DAGs, lifting our pipeline reliability to 99.7%.",
    author: "Michael Vance",
    role: "Head of Data Infrastructure",
    company: "FinTech Core Solutions",
    project: "Orchestrated ETL Pipeline",
    initials: "MV"
  }
];

export function Testimonials() {
  return (
    <section id="testimonials" className="py-24 bg-white border-t border-slate-100">
      <div className="section-container max-w-[1200px] mx-auto px-5 sm:px-8 space-y-14">
        
        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center space-y-3"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">Trust &amp; Validation</p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] tracking-tight leading-tight">
            Client Testimonials &amp; References
          </h2>
          <p className="text-[15px] text-slate-500 max-w-xl mx-auto leading-relaxed font-medium">
            Real outcomes and feedback from business operations leaders, marketers, and database engineering stakeholders.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {testimonials.map((t, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.45, delay: idx * 0.08, ease: EASE }}
              className="bg-[#F8FAFC] border border-slate-200/50 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-2xs hover:shadow-xs hover:border-slate-300 transition-all duration-300 relative group"
            >
              {/* Quote details */}
              <div className="space-y-6">
                {/* Stars and quote icon */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-1">
                    {[1, 2, 3, 4, 5].map((s) => (
                      <Star key={s} className="h-4 w-4 fill-amber-400 text-amber-400" />
                    ))}
                  </div>
                  <MessageSquare className="h-5 w-5 text-blue-100 group-hover:text-blue-200 transition-colors" />
                </div>

                <p className="text-slate-650 text-xs sm:text-[13px] sm:text-[13.5px] leading-relaxed font-semibold italic">
                  “{t.quote}”
                </p>
              </div>

              {/* Author details */}
              <div className="pt-6 mt-6 border-t border-slate-100 flex items-center gap-3.5">
                {/* Initials Circle */}
                <div className="h-9 w-9 rounded-full bg-blue-50 border border-blue-100 flex items-center justify-center font-bold text-blue-600 text-xs">
                  {t.initials}
                </div>
                <div className="min-w-0">
                  <h4 className="font-extrabold text-slate-800 text-xs sm:text-[13px]">{t.author}</h4>
                  <p className="text-[10px] text-slate-400 font-bold truncate mt-0.5 uppercase tracking-wide">
                    {t.role} · <span className="text-slate-500">{t.company}</span>
                  </p>
                  <p className="text-[8px] font-bold text-blue-600 mt-1 uppercase tracking-wider">
                    Project: {t.project}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}
