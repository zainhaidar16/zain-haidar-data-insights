/** An abstract data field. Decorative geometry, not an empirical chart. */
export function SignalField() {
  const lines = Array.from({ length: 30 }, (_, r) => {
    const points = Array.from({ length: 90 }, (_, c) => {
      const x = c * 12;
      const y = 110 + r * 10 + Math.sin(c * 0.085 + r * 0.065) * Math.sin(r * 0.1) * 54;
      return `${c ? "L" : "M"}${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
    return <path key={r} d={points} opacity={0.12 + r * 0.006} />;
  });
  return (
    <svg
      className="signal-field"
      viewBox="0 0 1068 450"
      fill="none"
      aria-hidden="true"
      focusable="false"
      preserveAspectRatio="xMidYMid slice"
    >
      <g className="signal-field-lines" stroke="white" strokeWidth=".65">
        {lines}
      </g>
      <g className="signal-field-points" fill="white">
        {Array.from({ length: 16 }, (_, i) => (
          <circle
            key={i}
            cx={70 + i * 61}
            cy={245 + Math.sin(i * 0.65) * 60}
            r={1.4}
            opacity={0.25 + (i % 3) * 0.16}
          />
        ))}
      </g>
    </svg>
  );
}
