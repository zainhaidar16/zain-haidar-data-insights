import { createFileRoute, Link, notFound } from '@tanstack/react-router';
import { Header } from '@/components/portfolio/Header';
import { Footer } from '@/components/portfolio/Footer';
import { PageHero } from '@/components/portfolio/PageHero';
import { FinalCTA } from '@/components/portfolio/FinalCTA';
import { pageHead } from '@/lib/seo';

import ReactMarkdown from 'react-markdown';
import { getPostDetailData } from '@/lib/public-data.functions';
export const Route=createFileRoute('/blog/$slug')({loader:async({params})=>{const data=await getPostDetailData({data:{slug:params.slug}});if(!data.post)throw notFound();return data;},head:({loaderData})=>loaderData?.post?pageHead(loaderData.post.seo_title||loaderData.post.title,loaderData.post.seo_description||loaderData.post.excerpt||'An article by Zain Haidar.','/blog/'+loaderData.post.slug,loaderData.post.cover_url):{},component:Article});
function Article(){const {post:p,relatedPosts}=Route.useLoaderData();if(!p)return null;return <><Header/><main id="main-content" tabIndex={-1}><PageHero eyebrow={p.category||'Article'} before={<Link to="/blog">← All articles</Link>} title={p.title} description={p.excerpt||''} meta={<span>{p.author_name||'Zain Haidar'}{p.published_at?' · '+new Date(p.published_at).toLocaleDateString('en-GB',{day:'numeric',month:'long',year:'numeric',timeZone:'UTC'}):''}</span>}/><section className="section"><div className="container detail-layout"><article className="article-body">{p.cover_url&&<img src={p.cover_url} alt="" width="1200" height="675"/>}<ReactMarkdown>{p.body_md||''}</ReactMarkdown>{!p.body_md&&p.sections?.map(s=><section key={s.heading}><h2>{s.heading}</h2><ReactMarkdown>{s.content}</ReactMarkdown></section>)}</article><aside className="detail-aside">{p.key_takeaways?.length&&<><h3>Key takeaways</h3><ul>{p.key_takeaways.map(t=><li key={t}>{t}</li>)}</ul></>}<h3>More to explore</h3>{relatedPosts.map(r=><p key={r.id}><Link className="text-link" to="/blog/$slug" params={{slug:r.slug}}>{r.title}</Link></p>)}<Link className="text-link" to="/projects">Explore my project work →</Link></aside></div></section></main><Footer/></>}
