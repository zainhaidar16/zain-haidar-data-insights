import {
  ArrowRight,
  BarChart3,
  Database,
  LineChart,
  Workflow,
  Code2,
  ShieldCheck,
  Table2,
  FileSpreadsheet,
  Cloud,
  GitBranch,
  Bot,
  AreaChart,
} from "lucide-react";
import { Link } from "@tanstack/react-router";

const featureCards = [
  {
    title: "Executive BI Dashboards",
    description: "Power BI dashboards for revenue, operations, sales, finance, and executive reporting.",
    image: "/home-card-dashboard.svg",
  },
  {
    title: "SQL & ETL Pipelines",
    description: "Clean, reliable data pipelines that keep your reports fast, consistent, and trusted.",
    image: "/home-card-server.svg",
  },
  {
    title: "Analytics Automation",
    description: "Python and workflow automation that removes manual reporting and spreadsheet chaos.",
    image: "/home-card-chip.svg",
  },
];

const whyItems = [
  {
    title: "Business-first analytics",
    description:
      "Dashboards are designed around real business decisions, not just charts and decoration.",
  },
  {
    title: "Clean data foundation",
    description:
      "SQL, ETL, and Python workflows make your reporting reliable before anything reaches Power BI.",
  },
  {
    title: "Fast delivery mindset",
    description:
      "Clear scope, practical execution, and reporting systems that can actually be used by teams.",
  },
];

const tools = [
  { name: "Power BI", icon: BarChart3 },
  { name: "SQL", icon: Database },
  { name: "Python", icon: Code2 },
  { name: "Tableau", icon: AreaChart },
  { name: "Excel", icon: FileSpreadsheet },
  { name: "Supabase", icon: Cloud },
  { name: "Vercel", icon: LineChart },
  { name: "GitHub", icon: GitBranch },
  { name: "ETL", icon: Workflow },
  { name: "Automation", icon: Bot },
];

const portfolioCards = [
  {
    icon: BarChart3,
    title: "Business Intelligence",
    description: "Interactive dashboards, KPIs, executive summaries, and decision-ready reports.",
    links: ["Power BI dashboards", "KPI reporting", "Executive analytics"],
  },
  {
    icon: Database,
    title: "Data Engineering",
    description: "Data cleaning, SQL modeling, ETL workflows, and automated reporting pipelines.",
    links: ["SQL analysis", "ETL pipelines", "Data cleaning"],
  },
  {
    icon: LineChart,
    title: "Performance Analytics",
    description: "Trend analysis, growth tracking, forecasting, and performance improvement insights.",
    links: ["Forecasting", "Trend analysis", "Business reporting"],
  },
  {
    icon: Workflow,
    title: "Workflow Automation",
    description: "Automated data flows that reduce repeated manual work and reporting mistakes.",
    links: ["Python automation", "Scheduled reports", "Process optimization"],
  },
];

const latestCards = [
  {
    title: "Power BI Business KPI Dashboard",
    date: "Featured Project",
    image: "/home-card-dashboard.svg",
  },
  {
    title: "SQL Data Cleaning and Reporting Pipeline",
    date: "Featured Project",
    image: "/home-card-server.svg",
  },
  {
    title: "Python Automation for Analytics Reports",
    date: "Featured Project",
    image: "/home-card-chip.svg",
  },
];

export function AmdHomePage() {
  return (
    <>
      <section className="amd-home-hero-clean">
        <div className="amd-hero-wave" aria-hidden="true" />
        <div className="amd-hero-mask" aria-hidden="true" />
        <div className="section-container relative z-10">
          <div className="max-w-[720px] pt-36 pb-32">
            <h1 className="amd-main-title">Build What&apos;s Next With Data Intelligence</h1>
            <p className="mt-7 max-w-[680px] text-[21px] font-semibold leading-[1.45] text-white">
              Power BI, SQL, Python, ETL, and automation solutions for businesses that need faster,
              cleaner, and smarter decisions.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link to="/projects" className="amd-square-btn">
                View Projects <ArrowRight className="h-4 w-4" />
              </Link>
              <Link to="/contact" className="amd-square-btn">
                Start a Project
              </Link>
            </div>
          </div>

          <div className="amd-feature-grid">
            {featureCards.map((card) => (
              <article key={card.title} className="amd-feature-card">
                <img src={card.image} alt="" className="h-[190px] w-full object-cover" />
                <div className="p-5">
                  <h3>{card.title}</h3>
                  <p>{card.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="amd-section amd-why-section">
        <div className="section-container">
          <h2 className="amd-section-title text-center">Why Zain The Analyst</h2>
          <div className="mt-14 grid gap-10 md:grid-cols-3">
            {whyItems.map((item) => (
              <div key={item.title}>
                <h3 className="text-[24px] font-black leading-tight text-white">{item.title}</h3>
                <p className="mt-5 max-w-[420px] text-[17px] font-medium leading-relaxed text-white">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
          <div className="mt-16 flex justify-center">
            <Link to="/services" className="amd-square-btn">
              Explore Analytics Services <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="amd-section amd-trust-section">
        <div className="section-container">
          <h2 className="amd-section-title text-center">Tools I Use To Build Reliable Analytics</h2>
          <div className="amd-logo-grid mt-14">
            {tools.map((tool) => {
              const Icon = tool.icon;
              return (
                <div key={tool.name} className="amd-logo-item">
                  <Icon className="amd-tool-icon" aria-hidden="true" />
                  <span>{tool.name}</span>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      <section className="amd-section">
        <div className="section-container">
          <h2 className="amd-section-title text-center">A Comprehensive Analytics Portfolio</h2>
          <p className="mx-auto mt-5 max-w-2xl text-center text-[18px] font-medium text-[#9CA3AF]">
            End-to-end analytics solutions across dashboards, databases, automation, and reporting.
          </p>
          <div className="amd-portfolio-grid mt-16">
            {portfolioCards.map((card) => {
              const Icon = card.icon;
              return (
                <article key={card.title} className="amd-portfolio-card">
                  <div className="amd-card-image">
                    <Icon className="h-12 w-12 text-[#00D9FF]" />
                  </div>
                  <div className="p-6">
                    <h3>{card.title}</h3>
                    <p>{card.description}</p>
                    <div className="mt-7 space-y-3">
                      {card.links.map((link) => (
                        <Link key={link} to="/services" className="amd-card-link">
                          {link} <ArrowRight className="h-3.5 w-3.5" />
                        </Link>
                      ))}
                    </div>
                  </div>
                </article>
              );
            })}
          </div>
        </div>
      </section>

      <section className="amd-section amd-latest-section">
        <div className="section-container">
          <h2 className="amd-section-title text-center">Latest Work</h2>
          <div className="amd-latest-grid mt-14">
            {latestCards.map((card) => (
              <article key={card.title} className="amd-latest-card">
                <img src={card.image} alt="" className="h-[210px] w-full object-cover" />
                <div className="p-6">
                  <h3>{card.title}</h3>
                  <p>{card.date}</p>
                </div>
              </article>
            ))}
          </div>
          <div className="mt-16 flex justify-center">
            <Link to="/projects" className="amd-square-btn">
              View All Projects <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="amd-final-section">
        <div className="section-container">
          <div className="amd-final-panel">
            <div>
              <ShieldCheck className="mb-6 h-10 w-10 text-[#00D9FF]" />
              <h2 className="amd-section-title">Need a serious analytics system?</h2>
              <p className="mt-5 max-w-2xl text-[18px] font-medium leading-relaxed text-[#D7D7D7]">
                Tell me what data you have, what decisions you need to make, and what reports are wasting your time.
              </p>
            </div>
            <Link to="/contact" className="amd-square-btn">
              Contact Me <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
