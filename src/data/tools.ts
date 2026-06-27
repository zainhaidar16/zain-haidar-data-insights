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
  const addLogo = (name: string, logo: string) => {
    if (!list.some((item) => item.name === name)) {
      list.push({ name, logo });
    }
  };

  if (t.includes("forecasting & trend analysis")) {
    addLogo("Python", "/logos/python.svg");
    addLogo("Pandas", "/logos/pandas.svg");
    addLogo("Excel", "/logos/excel.svg");
    return list;
  }

  if (t.includes("sql data analysis")) {
    addLogo("SQL", "/logos/sql.svg");
    addLogo("Python", "/logos/python.svg");
    addLogo("Excel", "/logos/excel.svg");
    return list;
  }

  // Matching
  for (const tool of allTools) {
    if (tool.name.toLowerCase() === "sql" && t.includes("sql") && !t.includes("postgresql")) {
      addLogo(tool.name, tool.logo);
      continue;
    }
    if (t.includes(tool.name.toLowerCase())) {
      addLogo(tool.name, tool.logo);
    }
  }

  // Contextual mappings add supporting logos even when one explicit tool matched.
  if (t.includes("dashboard") || t.includes("bi") || t.includes("visual") || t.includes("report")) {
    addLogo("Power BI", "/logos/power-bi.svg");
    addLogo("Excel", "/logos/excel.svg");
    addLogo("SQL", "/logos/sql.svg");
  }
  if (t.includes("clean") || t.includes("etl") || t.includes("pipeline") || t.includes("database") || t.includes("data analysis")) {
    addLogo("SQL", "/logos/sql.svg");
    addLogo("Excel", "/logos/excel.svg");
    addLogo("Python", "/logos/python.svg");
    addLogo("Pandas", "/logos/pandas.svg");
  }
  if (t.includes("forecast") || t.includes("trend") || t.includes("analysis") || t.includes("analytics")) {
    addLogo("Power BI", "/logos/power-bi.svg");
    addLogo("Python", "/logos/python.svg");
    addLogo("Pandas", "/logos/pandas.svg");
  }
  if (t.includes("web") || t.includes("analytics solutions") || t.includes("code")) {
    addLogo("Supabase", "/logos/supabase.svg");
    addLogo("Vercel", "/logos/vercel.svg");
    addLogo("GitHub", "/logos/github.svg");
  }
  if (t.includes("ai") || t.includes("automation") || t.includes("agent") || t.includes("workflow")) {
    addLogo("ChatGPT", "/logos/chatgpt.svg");
    addLogo("Claude", "/logos/claude.svg");
    addLogo("Gemini", "/logos/gemini.svg");
  }

  // Deduplicate by name
  return list.filter((item, index, self) =>
    self.findIndex(i => i.name === item.name) === index
  );
}
