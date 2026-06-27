import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function FinalCTA() {
  return (
    <section className="py-12 md:py-20 bg-[linear-gradient(135deg,#f0eaff_0%,#e8dfff_100%)] border-t border-[var(--line-soft)] relative overflow-hidden">
      {/* Purple radial glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full bg-[var(--purple-glow)] blur-[100px] pointer-events-none" />

      <div className="section-container relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="max-w-2xl"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[46px] font-bold text-[var(--text-main)] leading-tight mb-6">
            Ready to Understand Your Data?
          </h2>
          <p className="text-[16px] text-[var(--text-soft)] leading-relaxed mb-10 max-w-xl font-normal">
            Send me your data problem. I will help you turn it into a clear dashboard, report, or automation system.
          </p>
          <div className="flex flex-wrap justify-start gap-4">
            <Button asChild variant="primary" size="lg">
              <Link to="/contact" className="inline-flex items-center gap-2">
                <span>Start a Project</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" size="lg">
              <Link to="/services">View Services</Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
