import { motion } from "framer-motion";
import { GraduationCap, Award, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const edu = [
  { yr: "2024 — Present", title: "MS Computer Science", at: "University of Vienna", desc: "Specializing in Machine Learning, NLP, and modern database architectures." },
  { yr: "2017 — 2021", title: "BS Computer Science", at: "PMAS Arid Agriculture University", desc: "Rigorous foundations in databases, statistics, and software engineering." },
];

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Mesh lighting */}
      <div className="absolute top-20 left-1/3 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeader kicker="About Me" title="A software engineering approach to business intelligence." />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start mt-12">
          {/* Personal Bio */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6 text-[16px] md:text-[17px] text-muted-foreground leading-[1.7] max-w-[62ch]"
          >
            <p>
              I am a data analyst and BI developer who started in software engineering. Over time, I moved deeper into analytics, chasing the exact moment where raw database entries turn into the clear insights executives use to make critical operational decisions.
            </p>
            <p>
              I bring version-control rigors, thorough data checks, and speed-tuning parameters directly to Microsoft **Power BI**, **Tableau**, and **Looker Studio** workspaces. My focus is engineering dashboards that non-technical leaders can confidently defend in strategic planning sessions.
            </p>
            
            <div className="pt-4 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Microsoft Power BI Specialist:</strong> Writing performant DAX layers, configuring workspace directories, and setting up row-level security.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Interactive Tableau Dashboards:</strong> Building complex level-of-detail (LOD) formulas, parameters, and interactive stories.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Looker Studio Solutions:</strong> Connecting real-time GCP BigQuery sets for immediate cross-company performance tracking.</span>
              </div>
            </div>
            
            <p className="text-[15px] font-mono text-accent pt-2">
              Currently based in Vienna · Open to full-time roles &amp; consulting.
            </p>
          </motion.div>

          {/* Academic Foundation cards */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-xs uppercase tracking-widest font-mono text-muted-foreground mb-2 flex items-center gap-2">
              <Award className="h-4 w-4 text-accent" /> Academic Foundation
            </div>
            {edu.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.45, delay: i * 0.08 }}
                className="glass p-6 rounded-2xl flex gap-4 group hover:border-accent/20 transition-all duration-300"
              >
                <div className="h-10 w-10 rounded-lg bg-accent/15 border border-accent/20 flex items-center justify-center shrink-0 text-accent group-hover:scale-105 transition-transform duration-300">
                  <GraduationCap className="h-5 w-5" />
                </div>
                <div>
                  <div className="text-[10px] font-mono uppercase tracking-wider text-muted-foreground">{e.yr}</div>
                  <div className="text-[17px] font-semibold mt-0.5 text-foreground">{e.title}</div>
                  <div className="text-xs text-accent mt-0.5">{e.at}</div>
                  <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{e.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
