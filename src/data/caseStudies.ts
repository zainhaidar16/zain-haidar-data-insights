import powerbi from "@/assets/project-powerbi.jpg";
import ai from "@/assets/project-ai.jpg";
import etl from "@/assets/project-etl.jpg";
import customer from "@/assets/project-customer.jpg";

export type CaseStudy = {
  slug: string;
  img: string;
  tag: string;
  title: string;
  client: string;
  year: string;
  duration: string;
  role: string;
  impact: string;
  stack: string[];
  problem: string;
  approach: string[];
  outcomes: string[];
  metrics: { label: string; value: string }[];
  gallery: string[];
};

export const caseStudies: CaseStudy[] = [
  {
    slug: "executive-kpi-retail",
    img: powerbi,
    tag: "Power BI · Retail",
    title: "Executive KPI Dashboard for Multi-Brand Retailer",
    client: "European retail group (120 stores)",
    year: "2024",
    duration: "10 weeks",
    role: "Lead BI Consultant",
    impact: "+18% margin visibility · 120 stores onboarded",
    stack: ["Power BI", "SQL Server", "DAX", "Azure Data Factory", "Power Query"],
    problem:
      "Regional managers were stitching weekly performance from 6+ exports — slow, inconsistent and blind to margin leaks at the SKU level.",
    approach: [
      "Audited existing reporting, KPI definitions and stakeholder interviews across finance, ops and merchandising.",
      "Modeled a star schema in SQL Server with conformed dimensions for store, product and calendar.",
      "Built an executive Power BI workspace with row-level security for region/store managers.",
      "Automated daily refresh through Azure Data Factory and added anomaly callouts in DAX.",
    ],
    outcomes: [
      "Single source of truth for sales, margin and inventory across all 120 stores.",
      "Reporting cycle dropped from 4 days to 1 hour.",
      "Margin leaks caught earlier — projected +18% margin visibility in first quarter.",
    ],
    metrics: [
      { label: "Refresh time", value: "4d → 1h" },
      { label: "Stores onboarded", value: "120" },
      { label: "Reports retired", value: "27" },
      { label: "Active users", value: "180+" },
    ],
    gallery: [powerbi, customer],
  },
  {
    slug: "patient-demand-forecasting",
    img: ai,
    tag: "AI Analytics · Healthcare",
    title: "Patient Demand Forecasting with LLM Insights",
    client: "Private healthcare network",
    year: "2024",
    duration: "14 weeks",
    role: "AI Analytics Lead",
    impact: "92% MAPE accuracy · automated weekly briefings",
    stack: ["Python", "PyTorch", "Databricks", "OpenAI", "MLflow", "Power BI"],
    problem:
      "Clinical operations teams were over- and under-staffing departments due to noisy, manual demand forecasts and zero narrative context for non-technical leaders.",
    approach: [
      "Engineered a clean feature store on Databricks with seasonality, holidays and local events.",
      "Trained gradient-boosted and temporal-fusion models, tracked via MLflow.",
      "Wrapped forecasts with an LLM layer that turns numbers into a weekly executive briefing.",
      "Delivered as an embedded Power BI report with drill-through to model rationale.",
    ],
    outcomes: [
      "Reached 92% MAPE accuracy on 12-week rolling forecasts.",
      "Weekly executive briefing fully automated — saved ~6 analyst hours per week.",
      "Adopted by 4 departments within the first quarter.",
    ],
    metrics: [
      { label: "Forecast accuracy", value: "92% MAPE" },
      { label: "Analyst hours saved", value: "6 / week" },
      { label: "Departments live", value: "4" },
      { label: "Models in prod", value: "7" },
    ],
    gallery: [ai, powerbi],
  },
  {
    slug: "lakehouse-modernization",
    img: etl,
    tag: "Data Engineering · Finance",
    title: "ETL Pipeline & Lakehouse Modernization",
    client: "Fintech scale-up",
    year: "2023",
    duration: "16 weeks",
    role: "Data Engineering Consultant",
    impact: "8h → 12min refresh · single source of truth",
    stack: ["Snowflake", "dbt", "Airflow", "Python", "Fivetran", "Terraform"],
    problem:
      "An ageing nightly batch took 8+ hours, blocked morning reporting and constantly broke when source schemas changed.",
    approach: [
      "Migrated raw ingestion to Fivetran with monitored connectors.",
      "Rebuilt transformations in dbt with tests, snapshots and clear marts per domain.",
      "Orchestrated everything in Airflow with backfills and SLAs.",
      "Provisioned Snowflake warehouses with cost guardrails via Terraform.",
    ],
    outcomes: [
      "Refresh dropped from 8h to 12 minutes end-to-end.",
      "Data incidents fell ~70% thanks to dbt tests and alerting.",
      "Finance, growth and product all consume from the same governed marts.",
    ],
    metrics: [
      { label: "Refresh time", value: "8h → 12m" },
      { label: "Incidents", value: "−70%" },
      { label: "dbt models", value: "210+" },
      { label: "Cost / month", value: "−32%" },
    ],
    gallery: [etl, powerbi],
  },
  {
    slug: "cohort-retention-ltv",
    img: customer,
    tag: "Customer Analytics · SaaS",
    title: "Cohort, Retention & LTV Analytics Platform",
    client: "B2C SaaS (Series B)",
    year: "2025",
    duration: "8 weeks",
    role: "Analytics Lead",
    impact: "−24% churn · 4 segments activated",
    stack: ["SQL", "Python", "Tableau", "GCP BigQuery", "Segment"],
    problem:
      "Product and growth teams couldn't agree on what 'churn' meant. Cohorts and LTV lived in spreadsheets nobody trusted.",
    approach: [
      "Aligned definitions for active user, churn and LTV with product, growth and finance.",
      "Modeled events in BigQuery with versioned SQL and reproducible cohort logic.",
      "Built an interactive Tableau platform: cohort heatmaps, retention curves, LTV by segment.",
      "Shipped a lightweight churn-risk model that powers in-app interventions.",
    ],
    outcomes: [
      "Churn down 24% in the first 90 days post-launch.",
      "4 high-value segments activated with targeted lifecycle journeys.",
      "Single trusted definition of LTV adopted across the company.",
    ],
    metrics: [
      { label: "Churn", value: "−24%" },
      { label: "Segments live", value: "4" },
      { label: "LTV uplift", value: "+19%" },
      { label: "Decision latency", value: "−60%" },
    ],
    gallery: [customer, ai],
  },
];

export const findCaseStudy = (slug: string) =>
  caseStudies.find((c) => c.slug === slug);
