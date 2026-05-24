export interface SimpleProject {
  id?: string;
  slug: string;
  title: string;
  client?: string | null;
  tag?: string | null;
  year?: string | null;
  duration?: string | null;
  role?: string | null;
  impact?: string | null;
  cover_url?: string | null;
  problem: string;
  approach: string[];
  outcomes: string[];
  stack: string[];
  metrics: Array<{ label: string; value: string }>;
}

const simpleProjectsMap: Record<string, Omit<SimpleProject, "slug" | "cover_url">> = {
  "executive-kpi-retail": {
    title: "Store Sales and Profit Dashboard",
    tag: "Power BI · Retail",
    client: "European Retail Group (120 stores)",
    year: "2024",
    duration: "10 weeks",
    role: "Lead Dashboard Builder",
    impact: "Saved managers 4 hours of work every week and made it easy to see profits in real-time.",
    problem: "Store managers had to copy and paste numbers from 6 different spreadsheets every single week. It took a long time, and it was very hard to see if the stores were actually making a profit.",
    approach: [
      "Talked to store managers to find out exactly what numbers they need to see every day.",
      "Combined all their messy sales and calendar spreadsheets into one clean database.",
      "Built an easy-to-use Power BI dashboard that shows sales, profits, and stock levels.",
      "Set up automatic email updates so everyone gets the latest numbers every morning."
    ],
    outcomes: [
      "Managers now have one single page to see sales, profit, and stock across all 120 stores.",
      "Creating reports now takes only a few minutes instead of 4 full days of manual work.",
      "Managers can now instantly spot and fix pricing mistakes, saving the company money."
    ],
    stack: ["Power BI", "SQL Server", "Data Modeling", "Spreadsheet Cleanup"],
    metrics: [
      { label: "Manual Work Saved", value: "4h / week" },
      { label: "Stores Connected", value: "120" },
      { label: "Spreadsheets Retired", value: "27" },
      { label: "Daily Users", value: "180+" }
    ]
  },
  "patient-demand-forecasting": {
    title: "Hospital Staff Scheduler",
    tag: "AI Analytics · Healthcare",
    client: "Private Clinic Network",
    year: "2024",
    duration: "14 weeks",
    role: "Lead Analyst & AI Developer",
    impact: "92% scheduling accuracy and automated daily updates.",
    problem: "Hospitals were having a hard time scheduling the right number of doctors and nurses. Some days they had too many staff sitting around, and other days they were short-staffed and patients had to wait.",
    approach: [
      "Collected historical hospital visit data, local holidays, and weather records.",
      "Built a smart forecasting tool that predicts how many patients will visit next week.",
      "Wrote a simple script that translates complicated prediction formulas into plain English updates.",
      "Created a clean dashboard so hospital managers can see predicted staff needs at a glance."
    ],
    outcomes: [
      "Improved staff scheduling accuracy to 92%, making sure patients get seen faster.",
      "Saved the hospital analysis team 6 hours of manual spreadsheet work every week.",
      "Adopted by 4 major departments who now use it to schedule their weekly shifts."
    ],
    stack: ["Power BI", "Python", "Data Automation", "Predictions"],
    metrics: [
      { label: "Scheduling Accuracy", value: "92%" },
      { label: "Analyst Hours Saved", value: "6 / week" },
      { label: "Hospital Depts Live", value: "4" },
      { label: "Prediction Models", value: "7" }
    ]
  },
  "lakehouse-modernization": {
    title: "Fast Automatic Database Setup",
    tag: "Data Engineering · Finance",
    client: "Fintech Company",
    year: "2023",
    duration: "16 weeks",
    role: "Database Engineer",
    impact: "Reports now update in 12 minutes instead of 8 hours, and they never break.",
    problem: "A financial company's databases were extremely slow and took over 8 hours to update. This meant their daily business reports were always late, and the system broke constantly.",
    approach: [
      "Cleaned up the old database and removed outdated, slow queries.",
      "Built a modern data pipeline that automatically pulls and cleans transaction records.",
      "Added automatic test scripts that catch data errors before they can break the reports.",
      "Set up cost-saving measures so the company doesn't pay for database power they aren't using."
    ],
    outcomes: [
      "Database update time dropped from 8 hours down to just 12 minutes.",
      "Database errors and broken reports decreased by 70%.",
      "All departments (Finance, Product, and Sales) now see the exact same accurate numbers."
    ],
    stack: ["Snowflake", "dbt", "Python", "Automatic Pipelines"],
    metrics: [
      { label: "Update Time", value: "8h → 12m" },
      { label: "Errors Decreased", value: "-70%" },
      { label: "Data Cleanups", value: "210+" },
      { label: "Monthly Costs Saved", value: "-32%" }
    ]
  },
  "cohort-retention-ltv": {
    title: "Customer Retention Dashboard",
    tag: "Customer Analytics · SaaS",
    client: "Software Company (SaaS)",
    year: "2025",
    duration: "8 weeks",
    role: "Lead Data Analyst",
    impact: "Helped reduce customer loss by 24% and gave the team a single dashboard they trust.",
    problem: "Different departments in a software company couldn't agree on how to count lost customers. Their charts lived in messy spreadsheets that nobody trusted.",
    approach: [
      "Met with all teams to agree on a single, simple definition for active and lost customers.",
      "Wrote clean database code to track customer actions and sign-ups over time.",
      "Built an easy Tableau dashboard that shows customer lifespans and retention curves.",
      "Created a simple model that flags customers who are at risk of leaving so the team can help them."
    ],
    outcomes: [
      "Helped the customer support team reduce customer loss by 24% in the first 3 months.",
      "Allowed the marketing team to easily find and focus on their most loyal customers.",
      "Gave the entire company one single, trusted dashboard to track customer growth."
    ],
    stack: ["Tableau", "SQL", "Google BigQuery", "Customer Analytics"],
    metrics: [
      { label: "Customer Loss", value: "-24%" },
      { label: "Loyal Groups Found", value: "4" },
      { label: "Customer Value", value: "+19%" },
      { label: "Meeting Time Saved", value: "-60%" }
    ]
  }
};

export function translateProject<T extends { slug: string }>(project: T): T & SimpleProject {
  const simple = simpleProjectsMap[project.slug];
  if (!simple) {
    return {
      ...project,
      problem: (project as any).problem || "",
      approach: (project as any).approach || [],
      outcomes: (project as any).outcomes || [],
      stack: (project as any).stack || [],
      metrics: Array.isArray((project as any).metrics) ? (project as any).metrics : []
    } as any;
  }
  return {
    ...project,
    ...simple
  } as any;
}
