import { useEffect } from "react";
import { useLocation } from "@tanstack/react-router";
export function ScrollMotion() {
  const path = useLocation({ select: (l) => l.pathname });
  useEffect(() => {
    const media = window.matchMedia("(prefers-reduced-motion: reduce)");
    if (media.matches || !("IntersectionObserver" in window)) return;
    const elements = [
      ...document.querySelectorAll<HTMLElement>(
        ".studio-case,.studio-paths,.service-chapter,.premium-heading,.signal-work,.premium-service,.signal-bio,.skill-groups>div,.signal-notes>a,.project-card,.timeline-item,.credential",
      ),
    ];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.setAttribute("data-reveal", "visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.08 },
    );
    elements.forEach((el) => {
      if (el.getBoundingClientRect().top > window.innerHeight) {
        el.setAttribute("data-reveal", "pending");
        observer.observe(el);
      }
    });
    const show = () => {
      if (media.matches) elements.forEach((el) => el.removeAttribute("data-reveal"));
    };
    media.addEventListener("change", show);
    return () => {
      observer.disconnect();
      media.removeEventListener("change", show);
      elements.forEach((el) => el.removeAttribute("data-reveal"));
    };
  }, [path]);
  return null;
}
