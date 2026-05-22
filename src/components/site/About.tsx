import { motion } from "framer-motion";
import { GraduationCap, Award, CheckCircle2 } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const edu = [
  { yr: "2024 — Present", title: "MS Computer Science", at: "University of Vienna", desc: "Specializing in Machine Learning, NLP, and advanced database architectures." },
  { yr: "2017 — 2021", title: "BS Computer Science", at: "PMAS Arid Agriculture University", desc: "Rigorous foundations in databases, statistics, and software engineering." },
];

export function About() {
  return (
    <section id="about" className="relative py-24 md:py-32 overflow-hidden">
      {/* Background Mesh light reflection */}
      <div className="absolute top-20 left-1/3 w-[300px] h-[300px] rounded-full bg-accent/5 blur-[100px] pointer-events-none" />

      <div className="mx-auto max-w-[1240px] px-5 sm:px-8">
        <SectionHeader kicker="Our DNA" title="A software engineering approach to business intelligence." />

        <div className="grid lg:grid-cols-12 gap-10 lg:gap-16 items-start mt-12">
          {/* Company Philosophy column */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-7 space-y-6 text-[16px] md:text-[17px] text-muted-foreground leading-[1.7] max-w-[62ch]"
          >
            <p>
              <strong className="text-foreground">Haidar Analytics</strong> was founded on a simple thesis: most reporting fails not due to lack of tools, but lack of rigor. We bring structured software engineering disciplines—version control, testing layers, semantic schemas, and speed optimization—directly into the world of business intelligence.
            </p>
            <p>
              Led by <span className="text-foreground font-semibold">Zain Haidar</span>, a data architect with deep roots in computer science, we help modern businesses transform database clusters into clean, governed, high-impact dashboard systems that C-suite leaders actually rely on for strategic planning.
            </p>
            
            <div className="pt-4 space-y-3">
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Clarity over Complexity:</strong> Shipped insights that move business metrics, not just aesthetic layouts.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Governed Data Marts:</strong> Star schemas built from clean, versioned SQL logic to enforce a single source of truth.</span>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle2 className="h-5 w-5 text-accent shrink-0 mt-0.5" />
                <span><strong className="text-foreground">Speed Optimization:</strong> Shrinking reporting load latencies from several hours down to single digits.</span>
              </div>
            </div>
            
            <p className="text-[15px] font-mono text-accent pt-2">
              Based in Vienna, Austria · Serving enterprise networks globally.
            </p>
          </motion.div>

          {/* Academic Background column */}
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
