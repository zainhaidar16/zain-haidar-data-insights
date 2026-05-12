import { motion } from "framer-motion";
import portrait from "@/assets/zain-portrait.jpg";

export function Hero() {
  return (
    <section id="top" className="relative pt-40 pb-24 overflow-hidden">
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />

      <div className="relative mx-auto max-w-[1400px] px-6 lg:px-10">
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, ease: "easeOut" }}
          className="font-serif-display text-center text-[12vw] md:text-[8.5vw] lg:text-[7.5rem] xl:text-[9rem] leading-[0.95] tracking-[-0.04em] text-foreground"
        >
          Turning Data <br className="hidden md:block" />
          <span className="italic">into</span> Business Growth
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-10 text-center text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto leading-relaxed"
        >
          I'm Zain Haidar — a Vienna-based Data Analyst & BI Consultant building Power BI
          dashboards, ETL pipelines and AI analytics that help teams decide faster.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
          className="mt-12 flex flex-wrap items-center justify-center gap-4"
        >
          <a
            href="#contact"
            className="inline-flex items-center rounded-full bg-foreground text-background px-8 py-4 text-sm font-medium hover:bg-foreground/90 transition-all"
          >
            Get Quote ⎯ For Free
          </a>
          <a
            href="#work"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-8 py-4 text-sm font-medium text-foreground hover:bg-foreground hover:text-background transition-all"
          >
            View My Work
            <span aria-hidden>→</span>
          </a>
        </motion.div>

        {/* Floating cinematic image collage */}
        <motion.div
          initial={{ opacity: 0, y: 60 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.5 }}
          className="mt-24 grid grid-cols-12 gap-4 md:gap-6"
        >
          <div className="col-span-12 md:col-span-4 rounded-3xl bg-secondary aspect-[4/5] overflow-hidden shadow-card">
            <img src={portrait} alt="Zain Haidar" className="w-full h-full object-cover grayscale hover:grayscale-0 transition duration-700" />
          </div>
          <div className="col-span-12 md:col-span-4 rounded-3xl bg-foreground text-background p-8 flex flex-col justify-between aspect-[4/5]">
            <div className="text-xs uppercase tracking-[0.25em] opacity-70">Currently</div>
            <div>
              <div className="text-5xl font-serif-display leading-none">5+</div>
              <div className="mt-2 text-sm opacity-80">Years building enterprise BI &amp; analytics products across 12+ industries.</div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-4 grid grid-rows-2 gap-4 md:gap-6">
            <div className="rounded-3xl bg-secondary p-6 flex flex-col justify-between">
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Based in</div>
              <div className="text-2xl font-serif-display">Vienna, Austria</div>
            </div>
            <div className="rounded-3xl bg-secondary p-6 flex flex-col justify-between">
              <div className="text-xs uppercase tracking-[0.25em] text-muted-foreground">Status</div>
              <div className="flex items-center gap-2">
                <span className="h-2 w-2 rounded-full bg-emerald-500 animate-pulse" />
                <span className="text-2xl font-serif-display">Open to work</span>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
