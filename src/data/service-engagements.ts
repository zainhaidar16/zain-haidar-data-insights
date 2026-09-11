export const serviceEngagements: Record<string, { input: string; handover: string; fit: string }> =
  {
    "power-bi-dashboards": {
      fit: "A focused decision-making report",
      input:
        "A sample export or existing model, your KPI definitions, and the decisions the report needs to support.",
      handover:
        "The Power BI file, documented measures, and a walkthrough of filters, refresh steps, and known limitations.",
    },
    "data-cleaning": {
      fit: "An analysis-ready dataset",
      input:
        "Representative source files or table schemas, known quality issues, and the required output format.",
      handover:
        "Prepared data, reusable SQL or Python transformations, validation checks, and an exception log.",
    },
    "report-automation": {
      fit: "A repeatable reporting workflow",
      input:
        "The current reporting steps, example inputs and outputs, frequency, and the environment where it will run.",
      handover:
        "A reusable script, setup and scheduling guidance, and instructions for reruns, failures, and recovery.",
    },
  };
