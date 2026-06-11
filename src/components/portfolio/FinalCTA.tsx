import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function FinalCTA() {
  return (
    <section className="py-24 md:py-28 bg-[#F5F5F7] border-t border-[#E8E8ED] relative overflow-hidden">
      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="max-w-2xl mx-auto"
        >
          <p className="text-[11px] font-bold uppercase tracking-widest text-[#0071E3] mb-4">
            Let's Work Together
          </p>
          <h2 className="text-3xl sm:text-4xl lg:text-[42px] font-extrabold text-[#1D1D1F] leading-tight mb-6">
            Ready to turn your data into decisions?
          </h2>
          <p className="text-[16px] text-[#6E6E73] leading-relaxed mb-8 max-w-xl mx-auto">
            Let's discuss how analytics, dashboards, and clean data pipelines can help your business
            make faster, smarter decisions.
          </p>
          <div className="flex justify-center">
            <Button asChild className="bg-[#0071E3] hover:bg-[#005BB5] text-white rounded-full px-8 py-3.5 h-auto text-[14px] font-semibold transition-all shadow-sm">
              <Link to="/contact" className="inline-flex items-center gap-2">
                <span>Start a Project</span>
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
