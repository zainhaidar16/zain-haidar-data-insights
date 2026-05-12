import { motion } from "framer-motion";

export function SectionHeader({ kicker, title, intro }: { kicker: string; title: string; intro?: string }) {
  return (
    <div className="relative mb-16">
      <div className="absolute inset-x-0 -top-8 text-center pointer-events-none">
        <span className="text-[12vw] md:text-[10rem] font-serif-display leading-none text-foreground/[0.05] tracking-[-0.04em] select-none">
          {kicker}
        </span>
      </div>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className="relative text-center max-w-3xl mx-auto"
      >
        <div className="text-xs uppercase tracking-[0.3em] text-primary mb-4">/ {kicker}</div>
        <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight">{title}</h2>
        {intro && <p className="mt-4 text-muted-foreground text-lg">{intro}</p>}
      </motion.div>
    </div>
  );
}
