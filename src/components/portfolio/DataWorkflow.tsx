const steps = [
  [
    "Clarify",
    "Define the decision, the audience and the questions the work needs to answer.",
  ],
  ["Prepare", "Check sources, clean the data and make assumptions explicit."],
  [
    "Analyse",
    "Explore patterns, build measures and test the reasoning behind the result.",
  ],
  [
    "Communicate",
    "Turn the findings into a clear dashboard, explanation or recommendation.",
  ],
  [
    "Maintain",
    "Document the logic, add checks and make the next update easier.",
  ],
];
export function DataWorkflow() {
  return (
    <ol className="approach-grid">
      {steps.map(([title, copy], i) => (
        <li key={title}>
          <span className="small-label">0{i + 1} /</span>
          <h3>{title}</h3>
          <p>{copy}</p>
        </li>
      ))}
    </ol>
  );
}
