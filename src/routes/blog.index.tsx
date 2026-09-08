import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { Header } from '@/components/portfolio/Header';
import { Footer } from '@/components/portfolio/Footer';
import { PageHero } from '@/components/portfolio/PageHero';
import { FinalCTA } from '@/components/portfolio/FinalCTA';
import { pageHead } from '@/lib/seo';

import { getBlogIndexData } from '@/lib/public-data.functions';
export const Route=createFileRoute('/blog/')({loader:()=>getBlogIndexData(),head:()=>pageHead('Notes & articles','Writing on data analysis, business intelligence, and AI.','/blog'),component:Blog});
function Blog(){const {posts}=Route.useLoaderData();return <><Header/><main id="main-content" tabIndex={-1}><PageHero eyebrow="Notes & articles" title="Thinking through data and AI." description="Technical notes, practical explanations, and perspectives on the tools changing analytical work."/><section className="section"><div className="container blog-grid">{posts.map(p=><article className="blog-card" key={p.id}>{p.cover_url&&<img src={p.cover_url} alt="" width="800" height="450" loading="lazy"/>}<div className="blog-card-body"><p className="small-label">{p.category||'Article'}</p><h2><Link to="/blog/$slug" params={{slug:p.slug}}>{p.title}</Link></h2><p>{p.excerpt}</p><Link className="text-link" to="/blog/$slug" params={{slug:p.slug}}>Read article →</Link></div></article>)}{!posts.length&&<div className="empty-state"><h2>No articles to display</h2><p>Please check back later.</p></div>}</div></section></main><Footer/></>}
