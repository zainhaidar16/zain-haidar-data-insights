import { motion } from "framer-motion";
import { MapPin, ChevronRight, Mail, BarChart3, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const badges = [
  "Data Analyst",
  "Power BI Specialist",
  "BI Developer",
  "Python & SQL",
  "Based in Vienna",
];

const achievements = [
  { text: "20+ dashboards delivered across retail, finance & healthcare" },
  { text: "30% average reporting efficiency improvement for clients" },
];

export function Hero() {
  return (
    <section
      id="hero"
      className="min-h-screen flex items-center pt-20 pb-16 bg-[#F8FAFC] relative overflow-hidden"
    >
      {/* Subtle dot grid background */}
      <div className="absolute inset-0 dot-bg opacity-60 pointer-events-none" />
      {/* Right-side tint */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-bl from-blue-50/60 to-transparent pointer-events-none" />

      <div className="section-container relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* ── Left column ── */}
          <div className="max-w-xl">

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="inline-flex items-center gap-2 bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold px-3.5 py-1.5 rounded-full mb-7"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-emerald-500 animate-pulse" />
              Open to freelance projects &amp; full-time roles
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
              className="text-4xl sm:text-5xl lg:text-[50px] font-extrabold text-[#0F172A] leading-[1.14] tracking-tight mb-4"
            >
              Data Analyst & BI Specialist —{" "}
              <span className="text-blue-600">5+ years turning raw data into revenue.</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
              className="text-[16px] text-slate-500 leading-relaxed mb-6"
            >
              I build production dashboards, automate reporting pipelines, and deliver insights that drive measurable business outcomes — using Power BI, SQL, Python, and modern analytics tools.
            </motion.p>

            {/* Key achievements */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.2, ease: EASE }}
              className="flex flex-col gap-2.5 mb-7"
            >
              {achievements.map((item) => (
                <div
                  key={item.text}
                  className="flex items-start gap-2.5 text-[14px] text-slate-600"
                >
                  <CheckCircle2 className="h-4.5 w-4.5 text-blue-600 shrink-0 mt-0.5" />
                  <span>{item.text}</span>
                </div>
              ))}
            </motion.div>

            {/* Role badges */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.26, ease: EASE }}
              className="flex flex-wrap gap-2 mb-8"
            >
              {badges.map((badge) => (
                <span
                  key={badge}
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[12px] font-medium bg-white border border-slate-200 text-slate-600 shadow-sm"
                >
                  {badge === "Based in Vienna" && (
                    <MapPin className="h-3 w-3 text-blue-500" />
                  )}
                  {badge}
                </span>
              ))}
            </motion.div>

            {/* CTA buttons */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.34, ease: EASE }}
              className="flex flex-wrap gap-3"
            >
              <Link
                to="/projects"
                className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-semibold text-white bg-blue-600 rounded-xl hover:bg-blue-700 transition-colors duration-150 shadow-[0_4px_14px_rgba(37,99,235,0.25)]"
              >
                View Projects
                <ChevronRight className="h-4 w-4" />
              </Link>
              <Link
                to="/contact"
                className="inline-flex items-center gap-2 px-6 py-3 text-[14px] font-semibold text-[#0F172A] bg-white border border-slate-200 rounded-xl hover:bg-slate-50 hover:border-slate-300 transition-colors duration-150 shadow-sm"
              >
                <Mail className="h-4 w-4 text-blue-600" />
                Contact Me
              </Link>
            </motion.div>
          </div>

          {/* ── Right column — Dashboard screenshot ── */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: EASE }}
            className="hidden lg:flex justify-center items-center py-6"
          >
            <div className="relative w-full max-w-[520px] mx-auto">
              {/* Live indicator badge */}
              <div className="absolute -top-3.5 -right-2 z-20 flex items-center gap-1.5 bg-[#0F172A] text-white text-[10px] font-semibold px-3.5 py-1.5 rounded-full shadow-lg">
                <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
                Analytics Dashboard
              </div>

              {/* Dashboard image */}
              <div className="rounded-2xl border border-slate-200 shadow-[0_8px_32px_-4px_rgba(0,0,0,0.12)] overflow-hidden">
                <img
                  src="/dashboard-preview.png"
                  alt="Power BI analytics dashboard designed by Zain Haidar — KPI metrics, revenue trends, and customer segmentation"
                  className="w-full h-auto block"
                  loading="eager"
                />
              </div>

              {/* Floating bottom badge */}
              <div className="absolute -bottom-3 -left-2 z-20 bg-white rounded-xl border border-slate-200 shadow-md px-3.5 py-2 flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg bg-blue-600 flex items-center justify-center">
                  <BarChart3 className="h-3.5 w-3.5 text-white" />
                </div>
                <div>
                  <div className="text-[9px] font-bold text-[#0F172A]">Power BI · SQL · Python</div>
                  <div className="text-[8px] text-slate-400">Analytics Stack</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
