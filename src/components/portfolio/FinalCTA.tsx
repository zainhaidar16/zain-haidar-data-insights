import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const EASE = [0.25, 0.1, 0.25, 1] as const;

export function FinalCTA() {
  return (
    <section className="py-24 bg-[#252525] relative overflow-hidden">

      <div className="section-container relative z-10 text-center">
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="max-w-2xl mx-auto"
        >
          <h2 className="text-3xl sm:text-4xl lg:text-[48px] font-extrabold text-white leading-tight mb-6">
            Ready to turn your data into decisions?
          </h2>
          <p className="text-[16px] text-[#CFCFCF] leading-relaxed mb-10 max-w-xl mx-auto">
            Let's discuss how analytics, dashboards, and clean data pipelines can help your business
            make faster, smarter decisions.
          </p>
          <Button asChild variant="primary">
            <Link to="/contact">
              Start a Project
              <ArrowRight className="h-4.5 w-4.5" />
            </Link>
          </Button>
        </motion.div>
      </div>
    </section>
  );
}
