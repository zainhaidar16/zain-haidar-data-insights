import { useEffect, useRef } from "react";
/** Original schematic geometry; decorative, never presented as measured data. */
export function SignalField() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = ref.current;
    if (!el || !("IntersectionObserver" in window)) return;
    let visible = true;
    const update = () =>
      (el.dataset.running = String(visible && !document.hidden));
    const observer = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      update();
    });
    observer.observe(el);
    document.addEventListener("visibilitychange", update);
    update();
    return () => {
      observer.disconnect();
      document.removeEventListener("visibilitychange", update);
    };
  }, []);
  return (
    <div className="data-field" ref={ref} aria-hidden="true">
      <svg
        className="field-grid"
        viewBox="0 0 1400 900"
        preserveAspectRatio="xMidYMid slice"
      >
        <defs>
          <pattern
            id="analytical-grid"
            width="70"
            height="70"
            patternUnits="userSpaceOnUse"
          >
            <path
              d="M70 0H0V70"
              fill="none"
              stroke="currentColor"
              strokeWidth=".5"
            />
          </pattern>
        </defs>
        <rect width="1400" height="900" fill="url(#analytical-grid)" />
        <g fill="none" stroke="currentColor" strokeWidth="1">
          <path d="M0 180H280V320H430M1400 650H1120V500H980M210 900V720H420M1190 0V180H980" />
          <circle cx="280" cy="180" r="5" />
          <circle cx="1120" cy="650" r="5" />
        </g>
      </svg>
      {Array.from({ length: 12 }, (_, i) => (
        <div
          key={i}
          className={"data-fragment fragment-" + i}
          style={{ animationDelay: i * -2.7 + "s" }}
        >
          <span className="fragment-label">
            {["SCHEMA / 01", "TRANSFORM", "MODEL / 02", "VALIDATE"][i % 4]}
          </span>
          <svg viewBox="0 0 160 100">
            <g fill="none" stroke="currentColor" strokeWidth="1">
              {i % 3 === 0 ? (
                Array.from({ length: 7 }, (_, j) => (
                  <path
                    key={j}
                    d={"M12 " + (18 + j * 10) + "H" + (65 + ((j * 23) % 80))}
                  />
                ))
              ) : i % 3 === 1 ? (
                <>
                  <rect x="14" y="20" width="35" height="24" />
                  <rect x="105" y="56" width="35" height="24" />
                  <path d="M49 32H80V68H105M80 32V12H125" />
                </>
              ) : (
                Array.from({ length: 18 }, (_, j) => (
                  <rect
                    key={j}
                    x={15 + (j % 6) * 23}
                    y={18 + Math.floor(j / 6) * 25}
                    width="15"
                    height="15"
                    opacity={0.2 + (j % 4) * 0.2}
                  />
                ))
              )}
            </g>
          </svg>
          <span className="fragment-footer">
            {
              ["SOURCE → STRUCTURE", "QUESTION → METHOD", "LOGIC → OUTPUT"][
                i % 3
              ]
            }
          </span>
        </div>
      ))}
    </div>
  );
}
