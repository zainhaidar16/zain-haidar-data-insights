import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { Header } from '@/components/portfolio/Header';
import { Footer } from '@/components/portfolio/Footer';
import { PageHero } from '@/components/portfolio/PageHero';
import { FinalCTA } from '@/components/portfolio/FinalCTA';
import { pageHead } from '@/lib/seo';

import { useState } from 'react';
import { getProjectsPageData } from '@/lib/public-data.functions';
import { ProjectCard } from '@/components/portfolio/LatestProjects';
export const Route=createFileRoute('/projects/')({loader:()=>getProjectsPageData(),head:()=>pageHead('Projects','Explore Power BI reports, SQL analysis, Python workflows, and machine learning studies.','/projects'),component:Projects});
function Projects(){const {projects,unavailable}=Route.useLoaderData();const [filter,setFilter]=useState('All');const categories=['All',...new Set(projects.map(p=>p.category).filter(Boolean))];const visible=projects.filter(p=>filter==='All'||p.category===filter);return <><Header/><main id="main-content" tabIndex={-1}><PageHero eyebrow="Project portfolio" title="The work behind the skills." description="Explore the question, approach, findings, and limitations of each study. Open the reports and code to see how the work comes together."/><section className="section"><div className="container"><div className="filters" aria-label="Filter projects">{categories.map(c=><button className="filter" key={c} onClick={()=>setFilter(c)} aria-pressed={filter===c}>{c}</button>)}</div><p className="muted" role="status">{visible.length} {visible.length===1?'project':'projects'}</p><div className="project-grid">{visible.map(p=><ProjectCard key={p.id} project={p}/>)}</div>{!visible.length&&<div className="empty-state"><h2>{unavailable?'Projects are temporarily unavailable':'No projects in this category'}</h2><p>{unavailable?'Please try again, or explore the source repositories on GitHub.':'Choose another category to explore the portfolio.'}</p><a className="text-link" href="https://github.com/zainhaidar16">Visit GitHub ↗</a></div>}</div></section><FinalCTA/></main><Footer/></>}
