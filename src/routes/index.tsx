import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/portfolio/Header";
import { HeroSection } from "@/components/portfolio/HeroSection";
import { LatestProjects } from "@/components/portfolio/LatestProjects";
import { ServicesMarketplace } from "@/components/portfolio/ServicesMarketplace";
import { Footer } from "@/components/portfolio/Footer";
import { FinalCTA } from "@/components/portfolio/FinalCTA";
import { getHomePageData } from "@/lib/public-data.functions";
import { profile } from "@/data/profile";
import { pageHead } from "@/lib/seo";
export const Route = createFileRoute("/")({ loader: () => getHomePageData(), head: () => pageHead("Data Analyst & Power BI Specialist", "Zain Haidar in Vienna. Explore Power BI, SQL and Python projects, professional experience, and freelance analytics services.", "/"), component: Home });
function Home() { const {projects, projectsUnavailable} = Route.useLoaderData(); return <><Header/><main id="main-content" tabIndex={-1}><HeroSection project={projects[0]}/><LatestProjects projects={projects} unavailable={projectsUnavailable}/><ServicesMarketplace/><section className="section"><div className="container about-summary"><img src="/zain.jpg" alt="Zain Haidar" width="1024" height="1024" loading="lazy"/><div><p className="eyebrow">The person behind the work</p><h2>Analytical thinking.<br />A practical approach.</h2><p>I’m Zain, a data analyst based in Vienna. My work brings together business intelligence, SQL analysis, and Python workflows. I care about making the logic understandable and the output useful.</p><p>I’m open to joining a team or taking on a defined freelance project.</p><div className="actions"><Link className="text-link" to="/about">About & experience<ArrowRight size={17} aria-hidden="true"/></Link><a className="button button-outline button-small" href={profile.resume} download>Download résumé</a></div></div></div></section><FinalCTA/></main><Footer/></>; }
