import { motion } from "framer-motion";

const EASE = [0.25, 0.1, 0.25, 1] as const;

const certifications = [
  {
    title: "Databricks Associate Developer for Apache Spark",
    issuer: "Udemy",
    category: "Data Engineering",
    categoryColor: "violet",
    year: "2024",
    description: "Comprehensive training on Apache Spark fundamentals, RDDs, DataFrames, Spark SQL, and the Databricks platform for large-scale data processing.",
  },
  {
    title: "Data Visualization",
    issuer: "Kaggle",
    category: "Data Analysis",
    categoryColor: "blue",
    year: "2024",
    description: "Practical course covering chart design principles, Seaborn, and Matplotlib for communicating data insights clearly and effectively.",
  },
  {
    title: "Data Analysis with Python",
    issuer: "freeCodeCamp",
    category: "Data Analysis",
    categoryColor: "blue",
    year: "2023",
    description: "Hands-on training in NumPy, Pandas, Matplotlib, and statistical analysis using Python for real-world datasets.",
  },
  {
    title: "Databricks Lakehouse Fundamentals",
    issuer: "Databricks",
    category: "Data Engineering",
    categoryColor: "violet",
    year: "2024",
    description: "Core concepts of the Lakehouse architecture — Delta Lake, Unity Catalog, and the Databricks ecosystem for unified analytics.",
  },
  {
    title: "GitHub Foundations",
    issuer: "GitHub",
    category: "Developer Tools",
    categoryColor: "slate",
    year: "2024",
    description: "Foundational understanding of version control, Git workflows, collaboration, repositories, pull requests, and GitHub Actions.",
  },
  {
    title: "Vector Databases Professional Certificate",
    issuer: "LinkedIn / Weaviate",
    category: "Machine Learning",
    categoryColor: "indigo",
    year: "2024",
    description: "Professional-level training on vector databases, embeddings, semantic search, and AI-powered retrieval systems using Weaviate.",
  },
  {
    title: "Introduction to Machine Learning",
    issuer: "Kaggle",
    category: "Machine Learning",
    categoryColor: "indigo",
    year: "2023",
    description: "Foundational machine learning concepts including decision trees, model validation, overfitting, and hands-on Python practice.",
  },
  {
    title: "Foundation of Data Analysis, NLP & Business Intelligence",
    issuer: "University of Vienna",
    category: "Academic",
    categoryColor: "emerald",
    year: "2022–2024",
    description: "University coursework covering statistical data analysis, natural language processing, and business intelligence concepts as part of the MSc Computer Science programme.",
  },
];

type ColorKey = "blue" | "violet" | "indigo" | "slate" | "emerald";

const colorMap: Record<ColorKey, { badge: string; dot: string; issuer: string }> = {
  blue:    { badge: "bg-blue-50 text-blue-700 border-blue-200",     dot: "bg-blue-500",    issuer: "text-blue-600" },
  violet:  { badge: "bg-violet-50 text-violet-700 border-violet-200", dot: "bg-violet-500", issuer: "text-violet-600" },
  indigo:  { badge: "bg-indigo-50 text-indigo-700 border-indigo-200", dot: "bg-indigo-500", issuer: "text-indigo-600" },
  slate:   { badge: "bg-slate-100 text-slate-700 border-slate-200",  dot: "bg-slate-500",   issuer: "text-slate-500" },
  emerald: { badge: "bg-emerald-50 text-emerald-700 border-emerald-200", dot: "bg-emerald-500", issuer: "text-emerald-600" },
};

export function Certifications() {
  return (
    <section id="certifications" className="py-24 bg-[#F8FAFC]">
      <div className="section-container">

        {/* Heading */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.5, ease: EASE }}
          className="mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-blue-600 mb-3">
            Credentials
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-[#0F172A] leading-tight mb-4">
            Certifications &amp; Courses
          </h2>
          <p className="text-[15px] text-slate-500 leading-relaxed max-w-2xl">
            A selection of certifications and courses that support my skills in data analysis, business intelligence, machine learning, data engineering, and modern analytics tools.
          </p>
        </motion.div>

        {/* Cards grid */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {certifications.map((cert, i) => {
            const color = colorMap[cert.categoryColor as ColorKey];
            return (
              <motion.div
                key={cert.title}
                initial={{ opacity: 0, y: 18 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.4, delay: i * 0.06, ease: EASE }}
                className="card-pro p-5 flex flex-col gap-3"
              >
                {/* Top row: category badge + year */}
                <div className="flex items-center justify-between gap-2">
                  <span className={`text-[10px] font-semibold px-2 py-0.5 rounded border ${color.badge} leading-snug`}>
                    {cert.category}
                  </span>
                  <span className="text-[10px] font-medium text-slate-400 shrink-0">
                    {cert.year}
                  </span>
                </div>

                {/* Title */}
                <h3 className="font-semibold text-[#0F172A] text-[14px] leading-snug">
                  {cert.title}
                </h3>

                {/* Issuer with colored dot */}
                <div className="flex items-center gap-1.5">
                  <span className={`h-1.5 w-1.5 rounded-full shrink-0 ${color.dot}`} />
                  <span className={`text-[11px] font-semibold ${color.issuer}`}>
                    {cert.issuer}
                  </span>
                </div>

                {/* Description */}
                <p className="text-[11px] text-slate-400 leading-relaxed flex-1">
                  {cert.description}
                </p>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
