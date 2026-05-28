import { motion } from "framer-motion";
import { MapPin, ChevronRight, Mail, BarChart3, CheckCircle2 } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

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
      className="min-h-screen flex items-center pt-20 pb-16 bg-[#FAFAFA] relative overflow-hidden"
    >
      {/* Subtle dot grid */}
      <div className="absolute inset-0 dot-bg opacity-40 pointer-events-none" />
      {/* Orange glow accent */}
      <div className="absolute top-20 right-0 w-[480px] h-[480px] rounded-full bg-[#F97316]/5 blur-3xl pointer-events-none" />

      <div className="section-container relative z-10 w-full">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20 items-center">

          {/* Left column */}
          <div className="max-w-xl">

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              className="inline-flex items-center gap-2 bg-[#FFF7ED] border border-[#FDBA74] text-[#C2410C] text-xs font-semibold px-3.5 py-1.5 rounded-full mb-7"
            >
              <span className="h-1.5 w-1.5 rounded-full bg-[#F97316] animate-pulse" />
              Open to freelance projects &amp; full-time roles
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
              className="text-4xl sm:text-5xl lg:text-[50px] font-extrabold text-[#09090B] leading-[1.14] tracking-tight mb-4"
            >
              Data Analyst & BI Specialist —{" "}
              <span className="text-[#F97316]">5+ years turning raw data into revenue.</span>
            </motion.h1>

            {/* Tagline */}
            <motion.p
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
              className="text-[16px] text-[#71717A] leading-relaxed mb-6"
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
                  className="flex items-start gap-2.5 text-[14px] text-[#71717A]"
                >
                  <CheckCircle2 className="h-4.5 w-4.5 text-[#F97316] shrink-0 mt-0.5" />
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
                  className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg text-[12px] font-medium bg-white border border-[#E4E4E7] text-[#09090B] shadow-sm"
                >
                  {badge === "Based in Vienna" && (
                    <MapPin className="h-3 w-3 text-[#F97316]" />
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
              <Button asChild variant="primary">
                <Link to="/projects">
                  View Projects
                  <ChevronRight className="h-4 w-4" />
                </Link>
              </Button>
              <Button asChild variant="secondary">
                <Link to="/contact">
                  <Mail className="h-4 w-4" />
                  Contact Me
                </Link>
              </Button>
            </motion.div>
          </div>

          {/* Right column — Dashboard */}
          <motion.div
            initial={{ opacity: 0, x: 28 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6, delay: 0.22, ease: EASE }}
            className="hidden lg:flex justify-center items-center py-6"
          >
            <div className="relative w-full max-w-[520px] mx-auto">
              {/* Live badge */}
              <div className="absolute -top-3.5 -right-2 z-20 flex items-center gap-1.5 bg-[#09090B] text-white text-[10px] font-semibold px-3.5 py-1.5 rounded-full shadow-lg">
                <span className="h-1.5 w-1.5 rounded-full bg-[#F97316] animate-pulse" />
                Analytics Dashboard
              </div>

              {/* Dashboard image */}
              <div className="rounded-2xl border border-[#E4E4E7] shadow-[0_8px_32px_-4px_rgba(0,0,0,0.10)] overflow-hidden">
                <img
                  src="/dashboard-preview.png"
                  alt="Power BI analytics dashboard designed by Zain Haidar — KPI metrics, revenue trends, and customer segmentation"
                  className="w-full h-auto block"
                  loading="eager"
                />
              </div>

              {/* Floating badge */}
              <div className="absolute -bottom-3 -left-2 z-20 bg-white rounded-xl border border-[#E4E4E7] shadow-md px-3.5 py-2 flex items-center gap-2">
                <div className="h-6 w-6 rounded-lg bg-[#F97316] flex items-center justify-center">
                  <BarChart3 className="h-3.5 w-3.5 text-white" />
                </div>
                <div>
                  <div className="text-[9px] font-bold text-[#09090B]">Power BI · SQL · Python</div>
                  <div className="text-[8px] text-[#71717A]">Analytics Stack</div>
                </div>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}
