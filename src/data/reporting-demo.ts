import type { Project } from "@/lib/api";
export const reportingDemo: Project = {
  id: "reporting-automation-demo",
  slug: "reporting-automation-pipeline",
  title: "Reporting automation: reliable reruns",
  category: "Data Engineering",
  short_description:
    "A runnable Python workflow with incremental file loading, validation, exception records, and monthly reporting.",
  study_type: "Synthetic demonstration",
  featured: true,
  status: "published",
  sort_order: 0,
  technologies: ["Python", "CSV", "Data validation", "Automation"],
  metrics: [],
  image_url: "/project-artifacts/reporting-automation/pipeline.svg",
  project_goal:
    "How can a reporting job process new files without duplicating orders or hiding data-quality problems?",
  contribution:
    "Implementation, synthetic fixtures, failure handling, and regression tests for a small-file reporting workflow.",
  approach: [
    "Track source file hashes so unchanged inputs are skipped. Reject changes to previously ingested snapshots.",
    "Validate each row and record exceptions with a source filename and row number.",
    "Persist state and publish monthly totals using atomic file replacement. Reruns regenerate a missing report from saved state.",
  ],
  findings: [
    {
      title: "A repeatable result",
      detail:
        "The synthetic sample produces three accepted orders and three rejected rows. A second run loads zero new files and preserves the same totals.",
    },
    {
      title: "Failures remain visible",
      detail:
        "Duplicate IDs, invalid dates, and negative amounts appear in exception records. An unexpected file schema stops the batch before saved state changes.",
    },
    {
      title: "Checks cover the failure paths",
      detail:
        "Regression tests verify reruns, incremental files, changed inputs, duplicates, invalid rows, and rollback after a schema error.",
    },
  ],
  source_note:
    "Six invented sample order rows. These demonstrate behavior, not operating scale or business impact.",
  recommendation:
    "For an operational version, agree update and deletion semantics, use durable database storage for larger datasets, and integrate the command with the chosen scheduler and alerting system.",
  limitations: [
    "This small-file demonstration holds its state in memory. It is not a distributed or warehouse-scale pipeline.",
    "A crashed process can leave a run marker; recovery requires confirming that the original process stopped.",
    "The example does not support order updates, deletions, or multiple currencies.",
  ],
  evidence_links: [
    {
      label: "Download the complete example",
      url: "/project-artifacts/reporting-automation.zip",
    },
    {
      label: "Read the implementation",
      url: "/project-artifacts/reporting-automation/pipeline.py",
    },
    {
      label: "Run & recovery instructions",
      url: "/project-artifacts/reporting-automation/README.md",
    },
    {
      label: "Regression tests",
      url: "/project-artifacts/reporting-automation/test_pipeline.py",
    },
  ],
};
