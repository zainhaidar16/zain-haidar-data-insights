import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";
import { Link } from "@tanstack/react-router";
import { Button } from "@/components/ui/button";
import { PageHero } from "./PageHero";

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
            background: "radial-gradient(circle, rgba(112,72,232,0.3) 0%, rgba(112,72,232,0) 70%)",
            boxShadow: `0 0 ${dot.size * 4}px ${dot.size}px rgba(112,72,232,0.15)`,
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
    <PageHero
      variant="landing"
      eyebrow="Data dashboards, reports, and automation"
      title={
        <>
          Turn Your Data
          <br />
          <span className="neura-gradient">Into Clear Decisions</span>
        </>
      }
      description="I help businesses understand their numbers with Power BI dashboards, SQL reports, clean data, and simple automation."
      decorative={
        <>
          <CurvedLines />
          <GlowingDots />
        </>
      }
      actions={
        <>
          <Button asChild variant="primary">
            <Link to="/projects">
              View My Work
              <ArrowRight className="h-4 w-4" />
            </Link>
          </Button>
          <Button asChild variant="secondary">
            <Link to="/services">See Services</Link>
          </Button>
        </>
      }
    />
  );
}
