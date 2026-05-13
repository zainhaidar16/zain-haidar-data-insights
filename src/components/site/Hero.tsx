import { motion } from "framer-motion";
import { ArrowUpRight, Sparkles } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { LiveChartBackdrop } from "./LiveChartBackdrop";
import { KpiTile } from "./KpiTile";

export function Hero() {
  return (
    <section className="relative pt-28 md:pt-40 pb-16 md:pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
      <LiveChartBackdrop className="absolute inset-x-0 bottom-0 h-[40vh] w-full opacity-60" />

      <div className="relative mx-auto max-w-[1400px] px-5 sm:px-6 lg:px-10">
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="flex justify-center mb-8"
        >
          <div className="inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-xs uppercase tracking-[0.22em] text-muted-foreground">
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-400 animate-pulse" />
            Booking Q3 — 2 slots left
            <Sparkles className="h-3 w-3 text-primary" />
          </div>
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="font-serif-display text-center leading-[0.95] tracking-[-0.04em] text-foreground text-[14vw] sm:text-[10vw] md:text-[8vw] lg:text-[7rem] xl:text-[8.5rem]"
        >
          Data, BI &amp; AI <br className="hidden md:block" />
          for <span className="italic text-gradient">teams that ship.</span>
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-8 text-center text-base md:text-lg text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          A boutique analytics studio led by Zain Haidar in Vienna. We build the dashboards,
          pipelines and AI workflows that turn messy data into decisions you can trust.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-10 flex flex-wrap items-center justify-center gap-3"
        >
          <Link
            to="/contact"
            className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-7 py-3.5 text-sm font-medium shadow-glow hover:scale-[1.03] transition"
          >
            Start a project
            <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
          </Link>
          <Link
            to="/work"
            className="inline-flex items-center gap-2 rounded-full border border-border bg-foreground/[0.03] px-7 py-3.5 text-sm font-medium hover:bg-foreground/[0.07] transition"
          >
            See case studies
            <span aria-hidden>→</span>
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-4"
        >
          <KpiTile value={9} suffix="+" label="Years in data" />
          <KpiTile value={42} suffix="+" label="Projects shipped" />
          <KpiTile value={120} label="Stores onboarded" />
          <KpiTile value={92} suffix="%" label="Forecast accuracy" />
        </motion.div>
      </div>
    </section>
  );
}
