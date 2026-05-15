import { motion } from "framer-motion";
import { GraduationCap } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const edu = [
  { yr: "2024 — Now", title: "MS Computer Science", at: "University of Vienna", desc: "Focus on Machine Learning, NLP and modern data analytics." },
  { yr: "2017 — 2021", title: "BS Computer Science", at: "PMAS Arid Agriculture University", desc: "Foundations in software engineering, statistics and databases." },
];

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32">
      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeader kicker="About" title="A consultant who codes — and ships." />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start">
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-5 text-[17px] text-foreground/85 leading-[1.7] max-w-[60ch]"
          >
            <p>
              I started in software engineering and gradually moved deeper into analytics
              and BI &mdash; chasing the part of the work where data turns into decisions
              that someone, somewhere, has to make on Monday morning.
            </p>
            <p>
              Today I help mid-market businesses ship clear, scalable Power BI: from the
              data model and DAX measures to the dashboard the CEO actually opens. I care
              about correct definitions, fast refreshes, and reports a non-technical
              stakeholder can defend in a meeting.
            </p>
            <p className="text-foreground">
              My philosophy: <span className="ochre-underline">clarity over cleverness</span>
              {" "}&mdash; and shipping insight over shipping charts.
            </p>
            <p className="text-muted-foreground text-[15px]">
              Currently in Vienna, finishing my MS at the University of Vienna and open to
              full-time Data Analyst / BI Developer roles. Selective freelance, too.
            </p>
          </motion.div>

          <div className="lg:col-span-5 space-y-3">
            {edu.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, x: 16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="border border-border rounded-md p-5 flex gap-4 bg-card"
              >
                <div className="h-10 w-10 rounded-md bg-foreground grid place-items-center shrink-0">
                  <GraduationCap className="h-4 w-4 text-background" />
                </div>
                <div>
                  <div className="text-[11px] font-mono uppercase tracking-wider text-muted-foreground">{e.yr}</div>
                  <div className="text-[17px] font-medium mt-0.5">{e.title}</div>
                  <div className="text-sm text-muted-foreground">{e.at}</div>
                  <p className="text-sm text-muted-foreground mt-2 leading-relaxed">{e.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
