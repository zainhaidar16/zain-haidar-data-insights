import { motion } from "framer-motion";
import { ArrowUpRight, Download, Sparkles } from "lucide-react";
import portrait from "@/assets/zain-portrait.jpg";

export function Hero() {
  return (
    <section id="top" className="relative min-h-screen flex items-center pt-32 pb-16 overflow-hidden">
      {/* Glow + grid background */}
      <div className="absolute inset-0 bg-gradient-hero pointer-events-none" />
      <div className="absolute inset-0 grid-pattern [mask-image:radial-gradient(ellipse_at_center,black,transparent_70%)] opacity-40" />
      <div className="absolute -top-40 left-1/2 -translate-x-1/2 h-[600px] w-[900px] rounded-full bg-primary/20 blur-[140px] animate-pulse-glow" />

      <div className="relative mx-auto w-full max-w-7xl px-6">
        <div className="grid lg:grid-cols-12 gap-12 items-center">
          <div className="lg:col-span-7 space-y-8">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="inline-flex items-center gap-2 glass rounded-full px-4 py-1.5 text-xs uppercase tracking-[0.2em] text-muted-foreground"
            >
              <Sparkles className="h-3.5 w-3.5 text-primary" />
              Data · BI · AI Analytics
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.1 }}
              className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-bold leading-[0.95]"
            >
              Turning data into{" "}
              <span className="text-gradient">business growth.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.25 }}
              className="text-lg lg:text-xl text-muted-foreground max-w-xl leading-relaxed"
            >
              I'm <span className="text-foreground font-medium">Zain Haidar</span> — a Data Analyst & BI
              Consultant in Vienna. I build Power BI dashboards, ETL pipelines and AI analytics that
              help teams decide faster.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.4 }}
              className="flex flex-wrap items-center gap-3"
            >
              <a
                href="#work"
                className="group inline-flex items-center gap-2 rounded-full bg-gradient-primary px-6 py-3 text-sm font-medium text-primary-foreground shadow-glow hover:scale-[1.02] transition-transform"
              >
                View Projects
                <ArrowUpRight className="h-4 w-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </a>
              <a
                href="#contact"
                className="inline-flex items-center gap-2 rounded-full glass px-6 py-3 text-sm font-medium hover:bg-white/10 transition"
              >
                Contact Me
              </a>
              <a
                href="#"
                className="inline-flex items-center gap-2 rounded-full px-6 py-3 text-sm font-medium text-muted-foreground hover:text-foreground transition"
              >
                <Download className="h-4 w-4" />
                Download CV
              </a>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="grid grid-cols-3 gap-6 pt-6 max-w-lg border-t border-white/10"
            >
              {[
                { k: "5+", v: "Years in Analytics" },
                { k: "40+", v: "Dashboards Shipped" },
                { k: "12+", v: "Industries" },
              ].map((s) => (
                <div key={s.v} className="pt-6">
                  <div className="text-3xl font-bold text-gradient font-display">{s.k}</div>
                  <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wider">
                    {s.v}
                  </div>
                </div>
              ))}
            </motion.div>
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.2 }}
            className="lg:col-span-5 relative"
          >
            <div className="relative aspect-[4/5] rounded-3xl overflow-hidden glass-strong shadow-elegant">
              <img
                src={portrait}
                alt="Zain Haidar — Data Analyst & BI Consultant"
                width={1024}
                height={1280}
                className="absolute inset-0 h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-background via-background/20 to-transparent" />
              <div className="absolute bottom-6 left-6 right-6 glass-strong rounded-2xl p-4 flex items-center justify-between">
                <div>
                  <div className="text-xs text-muted-foreground uppercase tracking-widest">Based in</div>
                  <div className="font-medium">Vienna, Austria</div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-muted-foreground uppercase tracking-widest">Status</div>
                  <div className="font-medium text-emerald-400">Open to work</div>
                </div>
              </div>
            </div>
            {/* floating chip */}
            <motion.div
              animate={{ y: [0, -10, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -left-6 top-12 glass-strong rounded-2xl px-4 py-3 shadow-glow hidden md:block"
            >
              <div className="text-[10px] uppercase tracking-widest text-muted-foreground">MS Computer Science</div>
              <div className="text-sm font-medium">University of Vienna</div>
            </motion.div>
            <motion.div
              animate={{ y: [0, 10, 0] }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -right-4 bottom-32 glass-strong rounded-2xl px-4 py-3 shadow-glow hidden md:flex items-center gap-2"
            >
              <div className="h-8 w-8 rounded-lg bg-gradient-primary grid place-items-center text-xs font-bold">
                BI
              </div>
              <div>
                <div className="text-[10px] uppercase tracking-widest text-muted-foreground">Power BI</div>
                <div className="text-sm font-medium">Certified</div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
