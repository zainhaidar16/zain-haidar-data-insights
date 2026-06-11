import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function FinalCTA() {
  return (
    <section className="py-28 md:py-32 bg-[#0A0A0B] border-t border-[#26262B] relative overflow-hidden">
      {/* Subtle top orange glow line */}
      <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-[#FF6B00]/40 to-transparent" />

      {/* Orange glow */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-[#FF6B00]/5 blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[400px] h-[200px] bg-[#FF6B00]/3 blur-3xl pointer-events-none" />

      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-[12px] font-bold uppercase tracking-widest text-[#FF6B00] mb-4">
            Let's Work Together
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[52px] font-extrabold text-white leading-tight mb-6">
            Ready to turn your data into decisions?
          </h2>
          <p className="text-[16px] text-[#A1A1AA] leading-relaxed mb-10 max-w-xl mx-auto">
            Let's discuss how analytics, dashboards, and clean data pipelines can help your business
            make faster, smarter decisions.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Button asChild variant="primary" size="lg">
              <Link to="/contact">
                <span>Start a Project</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Link to="/projects" className="btn-outline text-sm">
              View Case Studies
            </Link>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
