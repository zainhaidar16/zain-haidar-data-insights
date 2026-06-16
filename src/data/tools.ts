export const technologyTools = [
  {
    name: "Power BI",
    logo: "/logos/power-bi.svg",
    description: "Business dashboards and reports",
  },
  {
    name: "SQL",
    logo: "/logos/sql.svg",
    description: "Database reports and data queries",
  },
  {
    name: "Python",
    logo: "/logos/python.svg",
    description: "Automation and data analysis",
  },
  {
    name: "Excel",
    logo: "/logos/excel.svg",
    description: "Clean spreadsheets and reports",
  },
  {
    name: "Tableau",
    logo: "/logos/tableau.svg",
    description: "Visual dashboards",
  },
  {
    name: "Pandas",
    logo: "/logos/pandas.svg",
    description: "Data cleaning and analysis",
  },
  {
    name: "PostgreSQL",
    logo: "/logos/postgresql.svg",
    description: "Reliable database storage",
  },
  {
    name: "Supabase",
    logo: "/logos/supabase.svg",
    description: "Database and backend systems",
  },
  {
    name: "GitHub",
    logo: "/logos/github.svg",
    description: "Code and project version control",
  },
  {
    name: "Vercel",
    logo: "/logos/vercel.svg",
    description: "Fast website deployment",
  },
];

export const aiTools = [
  {
    name: "ChatGPT",
    logo: "/logos/chatgpt.svg",
    description: "AI help for reports, writing, and workflows",
  },
  {
    name: "Claude",
    logo: "/logos/claude.svg",
    description: "AI research, writing, and analysis support",
  },
  {
    name: "Gemini",
    logo: "/logos/gemini.svg",
    description: "AI research and business support",
  },
  {
    name: "Grok",
    logo: "/logos/grok.svg",
    description: "AI assistant workflows",
  },
  {
    name: "DeepSeek",
    logo: "/logos/deepseek.svg",
    description: "AI coding and research support",
  },
  {
    name: "Perplexity",
    logo: "/logos/perplexity.svg",
    description: "AI search and research",
  },
  {
    name: "Midjourney",
    logo: "/logos/midjourney.svg",
    description: "AI image and creative support",
  },
  {
    name: "Stable Diffusion",
    logo: "/logos/stable-diffusion.svg",
    description: "AI image generation workflows",
  },
  {
    name: "Cursor",
    logo: "/logos/cursor.svg",
    description: "AI coding and development support",
  },
  {
    name: "Copilot",
    logo: "/logos/copilot.svg",
    description: "AI coding assistant",
  },
];

export function getLogosForText(text: string): { name: string; logo: string }[] {
  const t = text.toLowerCase();
  const allTools = [...technologyTools, ...aiTools];
  const list: { name: string; logo: string }[] = [];

  // Matching
  for (const tool of allTools) {
    if (tool.name.toLowerCase() === "sql" && t.includes("sql") && !t.includes("postgresql")) {
      list.push({ name: tool.name, logo: tool.logo });
      continue;
    }
    if (t.includes(tool.name.toLowerCase())) {
      list.push({ name: tool.name, logo: tool.logo });
    }
  }

  // Fallback mappings if no explicit tool names matched
  if (list.length === 0) {
    if (t.includes("dashboard") || t.includes("bi") || t.includes("visual")) {
      list.push({ name: "Power BI", logo: "/logos/power-bi.svg" });
      list.push({ name: "Excel", logo: "/logos/excel.svg" });
      list.push({ name: "SQL", logo: "/logos/sql.svg" });
    }
    if (t.includes("clean") || t.includes("etl") || t.includes("pipeline") || t.includes("database")) {
      list.push({ name: "SQL", logo: "/logos/sql.svg" });
      list.push({ name: "Excel", logo: "/logos/excel.svg" });
      list.push({ name: "Python", logo: "/logos/python.svg" });
      list.push({ name: "Pandas", logo: "/logos/pandas.svg" });
    }
    if (t.includes("web") || t.includes("analytics solutions") || t.includes("code")) {
      list.push({ name: "Supabase", logo: "/logos/supabase.svg" });
      list.push({ name: "Vercel", logo: "/logos/vercel.svg" });
      list.push({ name: "GitHub", logo: "/logos/github.svg" });
    }
    if (t.includes("ai") || t.includes("automation") || t.includes("agent") || t.includes("workflow")) {
      list.push({ name: "ChatGPT", logo: "/logos/chatgpt.svg" });
      list.push({ name: "Claude", logo: "/logos/claude.svg" });
      list.push({ name: "Gemini", logo: "/logos/gemini.svg" });
    }
  }

  // Deduplicate by name
  return list.filter((item, index, self) =>
    self.findIndex(i => i.name === item.name) === index
  );
}
