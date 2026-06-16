import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";

const EASE = [0.25, 0.1, 0.25, 1] as const;

<<<<<<< HEAD
/* Abstract curved lines SVG background */
function CurvedLines() {
  return (
    <svg
      className="absolute inset-0 w-full h-full opacity-[0.12]"
      viewBox="0 0 1440 900"
      fill="none"
      preserveAspectRatio="xMidYMid slice"
    >
      <path
        d="M-100 600 C200 300, 500 700, 800 400 S1200 200, 1600 500"
        stroke="url(#grad1)"
        strokeWidth="1.2"
        fill="none"
      />
      <path
        d="M-50 750 C300 450, 600 800, 900 500 S1300 300, 1700 600"
        stroke="url(#grad2)"
        strokeWidth="0.8"
        fill="none"
      />
      <path
        d="M100 200 C400 500, 700 100, 1000 350 S1400 600, 1800 250"
        stroke="url(#grad3)"
        strokeWidth="1"
        fill="none"
      />
      <path
        d="M-200 400 C100 100, 450 550, 750 250 S1100 450, 1500 150"
        stroke="url(#grad4)"
        strokeWidth="0.6"
        fill="none"
      />
      <defs>
        <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
          <stop offset="30%" stopColor="#8B5CF6" stopOpacity="1" />
          <stop offset="70%" stopColor="#A779FF" stopOpacity="1" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="grad2" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
          <stop offset="40%" stopColor="#8B5CF6" stopOpacity="0.6" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="grad3" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#A779FF" stopOpacity="0" />
          <stop offset="50%" stopColor="#A779FF" stopOpacity="0.8" />
          <stop offset="100%" stopColor="#A779FF" stopOpacity="0" />
        </linearGradient>
        <linearGradient id="grad4" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8B5CF6" stopOpacity="0" />
          <stop offset="50%" stopColor="#8B5CF6" stopOpacity="0.4" />
          <stop offset="100%" stopColor="#8B5CF6" stopOpacity="0" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* Glowing dots scattered in the background */
function GlowingDots() {
  const dots = [
    { cx: "12%", cy: "25%", size: 6, delay: 0 },
    { cx: "85%", cy: "18%", size: 5, delay: 0.5 },
    { cx: "30%", cy: "75%", size: 7, delay: 1.0 },
    { cx: "75%", cy: "65%", size: 4, delay: 1.5 },
    { cx: "50%", cy: "40%", size: 5, delay: 0.8 },
    { cx: "20%", cy: "50%", size: 4, delay: 2.0 },
    { cx: "90%", cy: "80%", size: 6, delay: 0.3 },
    { cx: "60%", cy: "20%", size: 3, delay: 1.2 },
    { cx: "40%", cy: "85%", size: 5, delay: 0.7 },
    { cx: "8%", cy: "70%", size: 4, delay: 1.8 },
  ];

  return (
    <div className="absolute inset-0 pointer-events-none">
      {dots.map((dot, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            left: dot.cx,
            top: dot.cy,
            width: dot.size * 2,
            height: dot.size * 2,
            background: "radial-gradient(circle, rgba(139,92,246,0.8) 0%, rgba(139,92,246,0) 70%)",
            boxShadow: `0 0 ${dot.size * 4}px ${dot.size}px rgba(139,92,246,0.3)`,
          }}
          animate={{
            opacity: [0.3, 0.8, 0.3],
            scale: [1, 1.3, 1],
          }}
          transition={{
            duration: 3 + dot.delay,
            repeat: Infinity,
            ease: "easeInOut",
            delay: dot.delay,
          }}
        />
      ))}
    </div>
  );
}

export function HeroSection() {
  return (
    <section
      id="hero"
      className="nvr-home-hero min-h-screen flex items-center pt-28 pb-20 bg-[#050505] relative overflow-hidden"
    >
      {/* Background effects */}
      <CurvedLines />
      <GlowingDots />

      {/* Subtle radial glow */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full bg-[rgba(139,92,246,0.04)] blur-[120px] pointer-events-none" />

      <div className="section-container relative z-10 w-full">
        <div className="flex flex-col items-center text-center max-w-3xl mx-auto">
          {/* Pill badge */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.45, ease: EASE }}
            className="inline-flex items-center gap-2.5 bg-[rgba(139,92,246,0.08)] border border-[rgba(139,92,246,0.25)] text-[#A779FF] text-[12px] font-normal px-5 py-2 rounded-full mb-8"
          >
            <span className="h-2 w-2 rounded-full bg-[#8B5CF6] animate-pulse" />
            Data dashboards, reports, and automation
          </motion.div>

          {/* Two-line title */}
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.08, ease: EASE }}
            className="text-5xl sm:text-6xl lg:text-[72px] font-normal text-white leading-[1.08] tracking-tight mb-6"
          >
            Turn Your Data
            <br />
            <span className="text-[#8B5CF6]">Into Clear Decisions</span>
          </motion.h1>

          {/* Paragraph */}
          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.14, ease: EASE }}
            className="text-[16px] sm:text-[18px] text-[#8B8B98] leading-relaxed mb-10 max-w-xl mx-auto font-normal"
          >
            I help businesses understand their numbers with Power BI dashboards, SQL reports, clean data, and simple automation.
          </motion.p>

          {/* Two CTA buttons */}
          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.22, ease: EASE }}
            className="flex flex-wrap justify-center gap-4"
          >
            <Button asChild variant="primary">
              <Link to="/projects">
                View My Work
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary">
              <Link to="/services">See Services</Link>
=======
const featureCards = [
  {
    title: "Executive BI Dashboards",
    description: "Power BI reports that make performance, revenue, operations, and growth easy to understand.",
    image: "/home-card-dashboard.svg",
  },
  {
    title: "Clean Data Pipelines",
    description: "SQL, Python, and ETL systems that clean messy business data and keep reports reliable.",
    image: "/home-card-server.svg",
  },
  {
    title: "Automation Systems",
    description: "Repeatable reporting workflows that save time and reduce manual spreadsheet work.",
    image: "/home-card-chip.svg",
  },
];

export function HeroSection() {
  return (
    <section id="hero" className="amd-home-hero relative overflow-hidden bg-black pt-24 pb-0">
      <div className="amd-light-wave" aria-hidden="true" />
      <div className="amd-hero-vignette" aria-hidden="true" />

      <div className="section-container relative z-10">
        <div className="max-w-2xl pt-16 md:pt-24 pb-20 md:pb-28">
          <motion.h1
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: EASE }}
            className="amd-hero-title text-white"
          >
            Build What&apos;s Next With Data Intelligence
          </motion.h1>

          <motion.p
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
            className="mt-6 max-w-xl text-[18px] leading-[1.55] text-white"
          >
            Power BI, SQL, Python, ETL, and automation solutions for businesses that need faster,
            cleaner, and smarter decisions.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 14 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
            className="mt-8 flex flex-wrap gap-4"
          >
            <Button asChild variant="secondary" className="amd-outline-button">
              <Link to="/projects">
                View Projects
                <ArrowRight className="h-4 w-4" />
              </Link>
            </Button>
            <Button asChild variant="secondary" className="amd-outline-button">
              <Link to="/contact">Start a Project</Link>
>>>>>>> d51b17ca2fb58399db28bb7a73d89dd3bce38d55
            </Button>
          </motion.div>
        </div>

        <div className="amd-hero-card-grid grid gap-4 md:grid-cols-3">
          {featureCards.map((card, index) => (
            <motion.article
              key={card.title}
              initial={{ opacity: 0, y: 18 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-80px" }}
              transition={{ duration: 0.45, delay: index * 0.08, ease: EASE }}
              className="amd-news-card overflow-hidden border border-white/15 bg-[#151515]"
            >
              <img src={card.image} alt="" className="h-44 w-full object-cover" loading="eager" />
              <div className="p-5">
                <h3 className="text-[19px] font-bold leading-snug text-white">{card.title}</h3>
                <p className="mt-4 text-[14px] leading-relaxed text-[#D7D7D7]">{card.description}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
