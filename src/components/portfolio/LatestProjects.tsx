import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const projects = [
  {
    category: "POWER BI",
    title: "Business KPI Dashboard",
    link: "/projects",
  },
  {
    category: "SQL",
    title: "Data Cleaning Report",
    link: "/projects",
  },
  {
    category: "PYTHON",
    title: "Automated Reporting Workflow",
    link: "/projects",
  },
];

export function LatestProjects() {
  return (
    <section className="py-24 md:py-28 bg-[#050505] border-t border-[rgba(255,255,255,0.06)]">
      <div className="section-container">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl sm:text-4xl font-normal text-white mb-4">
            Latest Projects
          </h2>
          <p className="text-[15px] text-[#8B8B98] max-w-xl mx-auto leading-relaxed font-normal">
            Simple examples of dashboards, reports, and data work I can build for businesses.
          </p>
        </motion.div>

        {/* Cards */}
        <div className="grid md:grid-cols-3 gap-6 mb-10">
          {projects.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
              className="bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-2xl p-6 group hover:border-[rgba(145,92,255,0.30)] transition-all duration-300"
            >
              <span className="text-[11px] font-normal text-[#8B5CF6] uppercase tracking-wider">
                {project.category}
              </span>
              <h3 className="text-[17px] font-normal text-white mt-3 mb-4 group-hover:text-white transition-colors">
                {project.title}
              </h3>
              <Link
                to={project.link}
                className="inline-flex items-center gap-1.5 text-[13px] font-normal text-[#8B8B98] hover:text-[#8B5CF6] transition-colors"
              >
                View project
                <ArrowRight className="h-3.5 w-3.5" />
              </Link>
            </motion.div>
          ))}
        </div>

        {/* View All button */}
        <div className="text-center">
          <Button asChild variant="secondary">
            <Link to="/projects" className="inline-flex items-center gap-2">
              View All Projects
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
        </div>
      </div>
    </section>
  );
}
