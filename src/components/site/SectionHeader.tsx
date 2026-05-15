import { motion } from "framer-motion";

export function SectionHeader({
  kicker,
  title,
  intro,
  align = "left",
}: {
  kicker: string;
  title: string;
  intro?: string;
  align?: "center" | "left";
}) {
  const isLeft = align === "left";
  return (
    <div className={`relative mb-14 md:mb-20 ${isLeft ? "" : "text-center"}`}>
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, margin: "-80px" }}
        transition={{ duration: 0.5 }}
        className={`relative ${isLeft ? "max-w-3xl" : "max-w-3xl mx-auto"}`}
      >
        <div className={`flex items-center gap-3 text-[11px] uppercase tracking-[0.22em] text-muted-foreground mb-5 ${isLeft ? "" : "justify-center"}`}>
          <span className="h-px w-8 bg-foreground/40" />
          {kicker}
        </div>
        <h2 className="font-serif-display text-[34px] sm:text-[44px] md:text-[56px] lg:text-[64px] tracking-[-0.025em] leading-[1.02]">
          {title}
        </h2>
        {intro && (
          <p className={`mt-5 text-muted-foreground text-[16px] md:text-[17px] leading-relaxed ${isLeft ? "max-w-2xl" : "max-w-2xl mx-auto"}`}>
            {intro}
          </p>
        )}
      </motion.div>
    </div>
  );
}
