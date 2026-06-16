import { motion } from "framer-motion";
import { BarChart3, Database, Code2, FileSpreadsheet, LineChart, Server, Github, Globe, BookOpen, Zap } from "lucide-react";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const tools = [
  { name: "Power BI", icon: BarChart3 },
  { name: "SQL", icon: Database },
  { name: "Python", icon: Code2 },
  { name: "Excel", icon: FileSpreadsheet },
  { name: "Tableau", icon: LineChart },
  { name: "Supabase", icon: Server },
  { name: "GitHub", icon: Github },
  { name: "Vercel", icon: Globe },
  { name: "Pandas", icon: BookOpen },
  { name: "Automation", icon: Zap },
];

export function ToolsGrid() {
  return (
    <section className="py-20 md:py-24 bg-[#050505] border-t border-[rgba(255,255,255,0.06)]">
      <div className="section-container">
        <motion.div
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, ease: EASE }}
          className="text-center mb-12"
        >
          <h2 className="text-2xl sm:text-3xl font-normal text-white">
            Tools I Use
          </h2>
        </motion.div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-4">
          {tools.map((tool, i) => {
            const Icon = tool.icon;
            return (
              <motion.div
                key={tool.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.35, delay: i * 0.04, ease: EASE }}
                className="flex flex-col items-center justify-center gap-3 py-6 px-4 bg-[#111111] border border-[rgba(255,255,255,0.08)] rounded-xl hover:border-[rgba(145,92,255,0.30)] transition-all duration-300 cursor-default select-none group"
              >
                <Icon className="h-6 w-6 text-[#8B8B98] group-hover:text-[#8B5CF6] transition-colors duration-300" />
                <span className="text-[13px] font-normal text-[#D8D8E0] group-hover:text-white transition-colors duration-300">
                  {tool.name}
                </span>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
