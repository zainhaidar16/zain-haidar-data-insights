import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const edu = [
  { yr: "2024 — Now", title: "MS Computer Science", at: "University of Vienna", desc: "Focus on Machine Learning, NLP, Data Analytics & BI." },
  { yr: "2017 — 2021", title: "BS Computer Science", at: "PMAS Arid Agriculture University", desc: "Foundations in software engineering, statistics & databases." },
];

export function About() {
  return (
    <section id="about" className="relative py-32">
      <div className="mx-auto max-w-6xl px-6">
        <SectionHeader kicker="About" title="A consultant who codes." />

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="space-y-6 text-lg text-muted-foreground leading-relaxed"
          >
            <p>
              I started in software engineering and gradually moved deeper into analytics, BI and AI —
              chasing the part of the work where data turns into decisions.
            </p>
            <p>
              Today I help startups and enterprises ship clear, scalable analytics: from the data model
              to the dashboard, from forecasting to AI-assisted reporting workflows.
            </p>
            <p className="text-foreground">
              My philosophy: <span className="text-gradient font-semibold">clarity over complexity</span>,
              and shipping insight over shipping charts.
            </p>
          </motion.div>

          <div className="space-y-4">
            {edu.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                className="glass-strong rounded-2xl p-6 flex gap-4"
              >
                <div className="h-11 w-11 rounded-xl bg-gradient-primary grid place-items-center shrink-0 shadow-glow">
                  <GraduationCap className="h-5 w-5 text-primary-foreground" />
                </div>
                <div>
                  <div className="text-xs font-mono text-primary/80">{e.yr}</div>
                  <div className="text-lg font-semibold mt-0.5">{e.title}</div>
                  <div className="text-sm text-muted-foreground">{e.at}</div>
                  <p className="text-sm text-muted-foreground mt-2">{e.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
