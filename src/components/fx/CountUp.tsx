import { useEffect, useRef } from "react";
import { useInView, animate, useReducedMotion } from "framer-motion";

interface CountUpProps {
  value: string;
  className?: string;
}

export default function CountUp({ value, className = "" }: CountUpProps) {
  const ref = useRef<HTMLSpanElement | null>(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  const prefersReducedMotion = useReducedMotion();

  useEffect(() => {
    const el = ref.current;
    if (!el || !isInView || prefersReducedMotion) return;

    // Parse the value using a regex that matches optional non-digit prefix, a number, and optional non-digit suffix
    const match = value.match(/^([^\d]*)([\d.,]+)([^\d]*)$/);
    if (!match) {
      el.textContent = value;
      return;
    }

    const prefix = match[1] || "";
    const numStr = match[2];
    const suffix = match[3] || "";

    // Determine decimal separator and format
    const isCommaDecimal = numStr.includes(",") && !numStr.includes(".");

    let decimals = 0;
    const dotIndex = numStr.indexOf(".");
    if (dotIndex !== -1) {
      decimals = numStr.length - dotIndex - 1;
    } else if (isCommaDecimal) {
      const commaParts = numStr.split(",");
      if (commaParts[1] && commaParts[1].length <= 2) {
        decimals = commaParts[1].length;
      }
    }

    // Clean number for parsing
    let cleanNumStr = numStr;
    if (isCommaDecimal && decimals > 0) {
      cleanNumStr = numStr.replace(",", ".");
    } else {
      cleanNumStr = numStr.replace(/,/g, "");
    }

    const targetNum = parseFloat(cleanNumStr);
    if (isNaN(targetNum)) {
      el.textContent = value;
      return;
    }

    const controls = animate(0, targetNum, {
      duration: 1.4,
      ease: [0.16, 1, 0.3, 1],
      onUpdate: (latest) => {
        let formattedNum = latest.toFixed(decimals);

        // Re-apply thousands separators if originally present
        if (numStr.includes(",") && !isCommaDecimal) {
          const parts = formattedNum.split(".");
          parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, ",");
          formattedNum = parts.join(".");
        } else if (isCommaDecimal) {
          formattedNum = formattedNum.replace(".", ",");
        }

        el.textContent = `${prefix}${formattedNum}${suffix}`;
      },
      onComplete: () => {
        el.textContent = value;
      },
    });

    return () => controls.stop();
  }, [value, isInView, prefersReducedMotion]);

  return (
    <span ref={ref} className={className}>
      {value}
    </span>
  );
}
