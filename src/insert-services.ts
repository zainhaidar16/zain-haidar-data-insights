import { supabase } from "./lib/supabase";

async function main() {
  const newServices = [
    {
      title: 'SQL Data Analysis',
      slug: 'sql-data-analysis',
      short_description: 'SQL-based data analysis for cleaning, querying, joining, and analyzing business datasets to find useful insights.',
      icon: 'database',
      sort_order: 5,
      is_active: true
    },
    {
      title: 'Forecasting & Trend Analysis',
      slug: 'forecasting-trend-analysis',
      short_description: 'Trend analysis and forecasting reports using historical data, Python, SQL, and statistical methods to support better planning.',
      icon: 'line-chart',
      sort_order: 6,
      is_active: true
    },
    {
      title: 'Dashboard Automation',
      slug: 'dashboard-automation',
      short_description: 'Automated reporting workflows that reduce manual work by connecting cleaned data to dashboards, KPIs, and recurring reports.',
      icon: 'workflow',
      sort_order: 7,
      is_active: true
    }
  ];

  console.log("Seeding services into Supabase public.services...");
  for (const service of newServices) {
    const { data, error } = await supabase
      .from("services")
      .upsert(service, { onConflict: "slug" })
      .select();

    if (error) {
      console.error(`Failed to upsert service ${service.title}:`, error.message);
    } else {
      console.log(`Successfully upserted service: ${service.title}`);
    }
  }
  console.log("Services seed complete.");
}

main();
