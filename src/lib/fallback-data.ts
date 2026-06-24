import type { Project, Service } from "@/lib/api";
import { staticProjects } from "@/lib/projects-data";

export const fallbackProjects: Project[] = staticProjects.map((project, index) => ({
  id: project.id,
  title: project.title,
  slug: project.slug,
  category: project.category,
  short_description: project.short_description,
  description: project.caseStudy.context,
  problem: project.caseStudy.challenges[0]?.problem,
  approach: project.caseStudy.methodology,
  outcome: [project.impact],
  technologies: project.technologies,
  metrics: project.metrics,
  image_url: project.image_url,
  featured: index < 3,
  status: "published",
  sort_order: index + 1,
  hero_title: project.title,
  hero_description: project.short_description,
  project_goal: project.objectives[0],
  key_features: project.objectives,
  challenges: project.caseStudy.challenges.map((challenge) => challenge.title),
  solution_steps: project.caseStudy.challenges.map((challenge) => ({
    title: challenge.title,
    description: challenge.solution,
  })),
  business_impact: [project.impact],
}));

export const fallbackServices: Service[] = [
  {
    id: "fallback-power-bi-dashboards",
    title: "Power BI Dashboards",
    slug: "power-bi-dashboards",
    short_description:
      "Clear dashboards for tracking sales, costs, orders, customers, and business results in one place.",
    icon: "BarChart3",
    sort_order: 1,
    is_active: true,
    hero_title: "Power BI dashboards for clearer business decisions",
    hero_description:
      "Replace scattered reports with focused dashboard views that make performance easier to monitor.",
    full_description:
      "TODO(zain): Replace this fallback service description with your final approved service copy.",
    deliverables: ["KPI dashboard", "Executive report view", "Refresh-ready reporting model"],
    technologies: ["Power BI", "DAX", "Power Query"],
  },
  {
    id: "fallback-data-cleaning",
    title: "Data Cleaning",
    slug: "data-cleaning",
    short_description:
      "Clean messy files, fix broken records, and prepare data so reports are correct and easy to use.",
    icon: "Database",
    sort_order: 2,
    is_active: true,
    hero_title: "Clean data foundations for trustworthy reporting",
    hero_description:
      "Turn inconsistent spreadsheets and source exports into reliable datasets for analysis.",
    full_description:
      "TODO(zain): Replace this fallback service description with your final approved service copy.",
    deliverables: ["Cleaned datasets", "Validation checks", "Reusable preparation workflow"],
    technologies: ["SQL", "Excel", "Power Query"],
  },
  {
    id: "fallback-report-automation",
    title: "Report Automation",
    slug: "report-automation",
    short_description:
      "Automate repeated reporting tasks so teams save time and stop rebuilding the same reports manually.",
    icon: "Zap",
    sort_order: 3,
    is_active: true,
    hero_title: "Automation for recurring analytics work",
    hero_description:
      "Reduce manual reporting effort with repeatable scripts, scheduled outputs, and cleaner workflows.",
    full_description:
      "TODO(zain): Replace this fallback service description with your final approved service copy.",
    deliverables: ["Automation script", "Scheduled report workflow", "Documentation handoff"],
    technologies: ["Python", "SQL", "Excel"],
  },
];
