import { motion } from "framer-motion";

export function SectionHeader({
  kicker,
  title,
  intro,
  align = "center",
}: {
  kicker: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
}) {
  const isLeft = align === "left";
  return (
    <div className={`relative mb-16 ${isLeft ? "" : "text-center"}`}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.6 }}
        className={`relative ${isLeft ? "max-w-2xl" : "max-w-3xl mx-auto"}`}
      >
        <div className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-5">
          <span className="h-px w-8 bg-primary/60" />
          {kicker}
        </div>
        <h2 className="font-serif-display text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-[-0.03em] leading-[0.98]">
          {title}
        </h2>
        {intro && (
          <p className={`mt-6 text-muted-foreground text-base md:text-lg ${isLeft ? "" : "max-w-2xl mx-auto"}`}>
            {intro}
          </p>
        )}
      </motion.div>
    </div>
  );
}
