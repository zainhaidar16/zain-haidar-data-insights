export interface Metric {
  label: string;
  value: string;
}

export interface DetailedChallenge {
  title: string;
  problem: string;
  solution: string;
}

export interface CaseStudyDetails {
  context: string;
  scope: string;
  challenges: DetailedChallenge[];
  methodology: string[];
}

export interface ProjectData {
  id: string;
  title: string;
  slug: string;
  category: string;
  short_description: string;
  objectives: string[];
  technologies: string[];
  impact: string;
  image_url: string;
  metrics: Metric[];
  caseStudy: CaseStudyDetails;
}

export const staticProjects: ProjectData[] = [
  {
    id: "executive-sales-margin",
    title: "Executive Sales & Margin BI System",
    slug: "executive-sales-margin-dashboard",
    category: "Business Intelligence",
    short_description:
      "An automated, time-intelligent Power BI dashboard constructed for retail executive leadership to track real-time revenue margins across multiple categories.",
    objectives: [
      "Remove manual spreadsheet compilation labor that consumed up to 10 hours a week.",
      "Establish a single, standardized calculation schema for calculating margin ratios.",
      "Deliver interactive comparison reporting across multiple years and product categories.",
    ],
    technologies: ["Power BI", "DAX", "Power Query", "Excel", "SQL Server"],
    impact:
      "Reduced reporting time by 40% and saved over 40 hours of manual spreadsheet compilation per month.",
    image_url: "/dashboard-preview.png",
    metrics: [
      { label: "Reporting Time Reduced", value: "40%" },
      { label: "Manual Hours Saved", value: "40+ hrs/mo" },
      { label: "Dashboard Interaction", value: "85%" },
    ],
    caseStudy: {
      context:
        "A regional retail operation with multiple product categories relied on static, offline Excel workbooks to track performance. These spreadsheets were manually updated every Friday by a business analyst, leading to frequent formatting bugs, delayed margin calculations, and slow reaction times when product performance fell.",
      scope:
        "Three years of historical retail transactions, user billing details, and vendor cost invoices, representing approximately 4.2 million raw database records.",
      challenges: [
        {
          title: "Inconsistent Tax & Margin Definitions",
          problem:
            "Different product divisions calculated tax inclusions and margin ratios using inconsistent arithmetic formulas, leading to conflicting executive summaries.",
          solution:
            "Established a unified dimensional relational model inside a central SQL database and locked down core DAX formulas inside Power BI to guarantee standard calculations across the company.",
        },
        {
          title: "Slow Dashboard Load Latency",
          problem:
            "Initial dashboards took over 30 seconds to reload filters due to unoptimized relationships and complex calculations written on top of unindexed tables.",
          solution:
            "Pre-aggregated operational values inside SQL Server indexing and rebuilt calculations using optimized DAX search structures to reduce load latency to under 1.5 seconds.",
        },
      ],
      methodology: [
        "Structured a clean star-schema relational model in Power BI, linking transaction fact tables with product and calendar dimensions.",
        "Wrote complex time-intelligence DAX formulas to perform year-to-date and year-over-year sales and margin calculations.",
        "Configured secure scheduled query refresh gateways connected to a central SQL server to guarantee live updates.",
      ],
    },
  },
  {
    id: "customer-segmentation-pipeline",
    title: "Multi-Channel Customer Segmentation Analysis",
    slug: "customer-segmentation-pipeline",
    category: "Data Analysis",
    short_description:
      "An analytical Python cohort model that extracted siloed user interaction logs and mapped customer behaviors to maximize marketing campaign conversion rates.",
    objectives: [
      "Consolidate customer interaction streams scattered across five disconnected SaaS platforms.",
      "Build predictive cohort segments using statistical clustering techniques to identify high-value users.",
      "Deliver target recommendations to increase performance marketing campaign ROI.",
    ],
    technologies: ["Python", "Pandas", "Scikit-Learn", "SQL", "Snowflake", "Tableau"],
    impact:
      "Delivered predictive customer insights that increased campaign conversion rates and ROI by 15%, while reducing customer churn by 8%.",
    image_url: "/dashboard-preview.png",
    metrics: [
      { label: "Marketing ROI Increased", value: "15%" },
      { label: "Average Customer Churn", value: "-8%" },
      { label: "Cohort Engagement Score", value: "+22%" },
    ],
    caseStudy: {
      context:
        "An e-commerce business was running massive, uniform customer email marketing campaigns with zero personalization. The resulting lack of relevance drove high unsubscribe rates, declining conversions, and wasted marketing spend.",
      scope:
        "Transactional databases, Stripe billing records, email marketing platform clicks, and product platform logs containing 800,000+ unique user interactions.",
      challenges: [
        {
          title: "Disconnected Multi-Platform IDs",
          problem:
            "Stripe transactions, email records, and usage logs utilized distinct, uncorrelated user IDs, making it impossible to map end-to-end customer journeys.",
          solution:
            "Drafted a robust user-mapping Python script to match records deterministically using hashed email profiles and session tokens.",
        },
        {
          title: "Highly Scattered Feature Vectors",
          problem:
            "Exploratory analytics suffered from noise due to thousands of low-frequency user activities that skewed basic classification averages.",
          solution:
            "Applied Principal Component Analysis (PCA) to reduce dataset dimensionality before feeding the clean features into clustering algorithms.",
        },
      ],
      methodology: [
        "Extracted raw SaaS databases and cleaned missing values using custom Pandas pipelines.",
        "Trained a K-Means clustering algorithm using Scikit-Learn to isolate four high-fidelity customer value cohorts.",
        "Built interactive campaign performance trackers in Tableau, enabling self-service query filters for marketing teams.",
      ],
    },
  },
  {
    id: "orchestrated-db-etl",
    title: "Orchestrated Relational Database ETL Infrastructure",
    slug: "database-etl-infrastructure",
    category: "Data Engineering",
    short_description:
      "A modular, robust ETL transformation schema built using dbt and orchestrated on Apache Airflow to ingest and clean transactional records.",
    objectives: [
      "Re-engineer daily transactional ingestion scripts that suffered from frequent database pipeline breaks.",
      "Incorporate automated data quality testing rules to validate schema integrity at the stage layer.",
      "Optimize slow analytic queries to ensure downstream dashboard views load instantly.",
    ],
    technologies: ["SQL", "dbt", "Apache Airflow", "PostgreSQL", "Docker", "Git"],
    impact:
      "Increased pipeline operational reliability to 99.7% and improved analytic SQL query performance speeds by 35%.",
    image_url: "/dashboard-preview.png",
    metrics: [
      { label: "Pipeline Reliability Uptime", value: "99.7%" },
      { label: "SQL Query Speedup", value: "35%" },
      { label: "Data Quality Incidents", value: "0" },
    ],
    caseStudy: {
      context:
        "Crucial operational databases suffered from daily synchronization failures because raw API payloads arrived with unpredictable formats, leaving downstream BI dashboard screens completely empty at the start of business.",
      scope:
        "Multiple daily transactional APIs, ledger databases, and relational inventory catalog systems updating millions of rows.",
      challenges: [
        {
          title: "Corrupted and Duplicate API Payloads",
          problem:
            "Unannounced upstream SaaS API structure changes regularly loaded empty values and duplicated records, triggering table execution locks.",
          solution:
            "Wrote rigorous schema validation tests inside dbt, blocking stage tables from updating if data quality checks fail.",
        },
        {
          title: "Resource Congestion and Lock Latencies",
          problem:
            "Simultaneous analytics extraction runs triggered resource exhaustion and blocked transactional locks during peak hours.",
          solution:
            "Re-architected pipeline structures using Apache Airflow DAGs to execute heavier transformations incrementally during off-peak windows.",
        },
      ],
      methodology: [
        "Wrote modular, incremental dbt schemas with built-in schema tests, version-controlled in a structured GitHub workflow.",
        "Orchestrated complex daily extraction runs with Apache Airflow and configured automated Slack notifications for pipeline alerts.",
        "Containerized local database development environments using Docker to verify query stability before deployment.",
      ],
    },
  },
];
