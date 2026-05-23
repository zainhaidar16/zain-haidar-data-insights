import { motion } from "framer-motion";
import { GraduationCap, Check } from "lucide-react";
import { SectionHeader } from "./SectionHeader";

const edu = [
  { yr: "2024 — Present", title: "MS Computer Science", at: "University of Vienna", desc: "Specializing in Machine Learning, NLP, and database architectures." },
  { yr: "2017 — 2021", title: "BS Computer Science", at: "PMAS Arid Agriculture University", desc: "Foundations in databases, statistics, and software engineering." },
];

export function About() {
  return (
    <section id="about" className="relative py-20 md:py-24 border-b border-slate-100 overflow-hidden">
      <div className="mx-auto max-w-[1140px] px-5 sm:px-6">
        <SectionHeader kicker="Philosophy" title="A software engineering approach to BI." />

        <div className="grid lg:grid-cols-12 gap-8 lg:gap-14 items-start mt-10">
          {/* Company Philosophy */}
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4 }}
            className="lg:col-span-7 space-y-5 text-[14px] md:text-[15px] text-slate-500 leading-relaxed max-w-[62ch]"
          >
            <p>
              <strong className="text-slate-800">Haidar Analytics</strong> was founded on a simple thesis: most reporting fails not due to lack of tools, but lack of rigor. We bring structured software engineering disciplines—version control, testing layers, semantic schemas, and speed optimization—directly into the world of business intelligence.
            </p>
            <p>
              Led by <span className="text-slate-800 font-semibold">Zain Haidar</span>, a data architect with deep roots in computer science, we help modern businesses transform database clusters into clean, governed, high-impact dashboard systems that C-suite leaders actually rely on for strategic planning.
            </p>
            
            <div className="pt-2 space-y-3">
              <div className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-slate-700 shrink-0 mt-0.5" />
                <span><strong className="text-slate-800">Clarity over Complexity:</strong> Shipped insights that move business metrics, not just aesthetic layouts.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-slate-700 shrink-0 mt-0.5" />
                <span><strong className="text-slate-800">Governed Data Marts:</strong> Star schemas built from clean, versioned SQL logic to enforce a single source of truth.</span>
              </div>
              <div className="flex items-start gap-2.5">
                <Check className="h-4 w-4 text-slate-700 shrink-0 mt-0.5" />
                <span><strong className="text-slate-800">Speed Optimization:</strong> Shrinking reporting load latencies from several hours down to single digits.</span>
              </div>
            </div>
          </motion.div>

          {/* Academic dossier */}
          <div className="lg:col-span-5 space-y-4">
            <div className="text-[10px] font-mono uppercase tracking-widest text-slate-400 mb-2">
              Academic Background
            </div>
            {edu.map((e, i) => (
              <motion.div
                key={e.title}
                initial={{ opacity: 0, x: 12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: i * 0.06 }}
                className="border border-slate-200 bg-white p-5 rounded flex gap-4 hover:border-slate-300 transition shadow-sm"
              >
                <div className="h-8 w-8 rounded bg-slate-50 border border-slate-200 flex items-center justify-center shrink-0 text-slate-700">
                  <GraduationCap className="h-4.5 w-4.5" />
                </div>
                <div>
                  <div className="text-[9px] font-mono uppercase tracking-wider text-slate-400">{e.yr}</div>
                  <div className="text-[15px] font-bold mt-0.5 text-slate-800">{e.title}</div>
                  <div className="text-xs text-slate-500">{e.at}</div>
                  <p className="text-xs text-slate-400 mt-2 leading-relaxed">{e.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
