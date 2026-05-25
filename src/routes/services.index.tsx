import { createFileRoute, Link } from "@tanstack/react-router";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { BarChart3, Database, TrendingUp, ArrowRight, HelpCircle, Laptop, CheckCircle2 } from "lucide-react";
import { motion } from "framer-motion";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export const Route = createFileRoute("/services/")({
  head: () => ({
    meta: [
      { title: "Analytics Services & Solutions — Zain Haidar" },
      { name: "description", content: "Professional Business Intelligence, database engineering, automated SQL pipelines, and forecasting solutions tailored for business outcomes." },
    ],
  }),
  component: ServicesPage,
});

interface ServiceStaticItem {
  title: string;
  slug: string;
  benefit: string;
  short_description: string;
  icon: any;
  iconColorClass: string;
}

const staticServices: ServiceStaticItem[] = [
  {
    title: "Dashboard Automation & Business Intelligence",
    slug: "dashboard-automation",
    benefit: "Interactive dashboards that cut your reporting time in half",
    short_description: "Replace manual, error-prone spreadsheets with automated reporting suites in Power BI or Tableau. Executive leaders get immediate answers to revenue, operational speed, and product performance questions.",
    icon: BarChart3,
    iconColorClass: "text-blue-600 bg-blue-50 border-blue-100"
  },
  {
    title: "SQL Data Analysis & Modeling",
    slug: "sql-data-analysis",
    benefit: "Clean databases and optimized queries that establish a single source of truth",
    short_description: "Query, cleanse, and structure raw database tables and multi-platform SaaS streams. By designing optimized schemas and modular SQL transformations, I build a robust data foundation your business can rely on.",
    icon: Database,
    iconColorClass: "text-violet-600 bg-violet-50 border-violet-100"
  },
  {
    title: "Forecasting & Predictive Analytics",
    slug: "forecasting-trend-analysis",
    benefit: "Statistical trend modeling that anticipates future customer demand",
    short_description: "Apply Python and SQL statistical time-series modeling to historical operational data. By outlining revenue trends, operational anomalies, and capacity projections, I help stakeholders run strategic financial planning.",
    icon: TrendingUp,
    iconColorClass: "text-emerald-600 bg-emerald-50 border-emerald-100"
  }
];

function ServicesPage() {
  return (
    <main className="bg-[#F8FAFC] min-h-screen flex flex-col font-poppins text-slate-800">
      <Header />
      
      <section className="pt-32 md:pt-40 pb-24 flex-grow">
        <div className="mx-auto max-w-[1100px] px-5 sm:px-8 space-y-16">
          
          {/* Header */}
          <div className="max-w-3xl space-y-3">
            <p className="text-xs font-semibold uppercase tracking-widest text-blue-600">Tailored Solutions</p>
            <h1 className="text-3xl sm:text-4xl font-extrabold text-[#0F172A] tracking-tight leading-tight">
              Data Services Focused on Business Outcomes
            </h1>
            <p className="text-slate-500 text-xs sm:text-[14px] leading-relaxed font-semibold">
              I specialize in engineering high-fidelity analytical infrastructure and interactive Business Intelligence tools that directly remove operational drag, establish database integrity, and drive growth.
            </p>
          </div>

          {/* Services Grid */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {staticServices.map((s, idx) => {
              const Icon = s.icon;
              return (
                <motion.div 
                  key={s.slug}
                  initial={{ opacity: 0, y: 18 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, margin: "-60px" }}
                  transition={{ duration: 0.45, delay: idx * 0.08, ease: EASE }}
                  className="bg-white border border-slate-200/60 rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xs hover:shadow-md hover:border-slate-350 transition-all duration-300 group"
                >
                  <div className="space-y-6">
                    {/* Icon & Benefit statement */}
                    <div className="flex items-start justify-between gap-4">
                      <div className={`h-11 w-11 rounded-xl border flex items-center justify-center shrink-0 shadow-2xs ${s.iconColorClass}`}>
                        <Icon className="h-5 w-5" />
                      </div>
                    </div>

                    {/* Benefit Highlight Container */}
                    <div className="bg-slate-50 border border-slate-100 rounded-xl px-4 py-3">
                      <p className="text-[#0F172A] text-xs font-bold leading-relaxed">
                        “{s.benefit}”
                      </p>
                    </div>

                    <div className="space-y-2">
                      <h3 className="text-base sm:text-[17px] font-extrabold text-[#0F172A] group-hover:text-blue-600 transition-colors leading-snug">
                        {s.title}
                      </h3>
                      <p className="text-slate-550 text-xs sm:text-[13px] leading-relaxed font-semibold">
                        {s.short_description}
                      </p>
                    </div>
                  </div>

                  {/* CTA button */}
                  <div className="pt-6 mt-6 border-t border-slate-100">
                    <Link
                      to="/services/$slug"
                      params={{ slug: s.slug }}
                      className="w-full inline-flex items-center justify-center gap-1.5 px-4 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-bold text-xs shadow-sm shadow-blue-500/10 transition cursor-pointer"
                    >
                      <span>Explore Service details</span>
                      <ArrowRight className="h-3.5 w-3.5 transform group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  </div>
                </motion.div>
              );
            })}
          </div>

          {/* Consultation Lead Form Section */}
          <div className="bg-[#0F172A] border border-slate-800 shadow-md rounded-3xl p-6 sm:p-10 text-white flex flex-col sm:flex-row justify-between items-center gap-6">
            <div className="space-y-2 text-center sm:text-left">
              <h4 className="font-bold text-base sm:text-lg">Interested in a custom analytical solution?</h4>
              <p className="text-slate-400 text-xs font-semibold">Let's discuss how we can build automated, secure reporting infrastructure tailored to your parameters.</p>
            </div>

            <Link
              to="/contact"
              className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-6 py-3.5 text-xs font-bold uppercase tracking-wider transition shadow-md shadow-blue-500/10 cursor-pointer self-stretch sm:self-auto justify-center"
            >
              <span>Get Started</span>
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

        </div>
      </section>

      <Footer />
    </main>
  );
}
