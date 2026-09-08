import { useState } from "react";
import { Link } from "@tanstack/react-router";
import { Menu, ArrowUpRight, Download } from "lucide-react";
import { Sheet, SheetTrigger, SheetContent, SheetTitle, SheetDescription, SheetClose } from "@/components/ui/sheet";
import { profile } from "@/data/profile";
const navigation = [{ label: "Projects", to: "/projects" }, { label: "Services", to: "/services" }, { label: "About", to: "/about" }, { label: "Contact", to: "/contact" }] as const;
export function Header() {
  const [open, setOpen] = useState(false);
  return <>
    <a href="#main-content" className="skip-link">Skip to content</a>
    <header className="site-header"><div className="container header-inner">
      <Link to="/" className="brand" aria-label="Zain Haidar, home"><span className="brand-mark" aria-hidden="true">z.</span><span>Zain Haidar<span className="brand-sub">Data & business intelligence</span></span></Link>
      <nav aria-label="Main navigation" className="desktop-nav">{navigation.map(item => <Link key={item.to} to={item.to} activeProps={{ className: "active", "aria-current": "page" }}>{item.label}</Link>)}</nav>
      <div className="header-actions"><a href={profile.resume} className="button button-small button-outline" download><Download size={16} aria-hidden="true" />Résumé</a>
      <Sheet open={open} onOpenChange={setOpen}><SheetTrigger asChild><button className="icon-button mobile-menu" aria-label="Open navigation"><Menu aria-hidden="true" /></button></SheetTrigger>
      <SheetContent className="site-menu"><SheetTitle>Explore</SheetTitle><SheetDescription>Projects, experience, and ways to work together.</SheetDescription><nav aria-label="Mobile navigation">{navigation.map(item => <SheetClose asChild key={item.to}><Link to={item.to}>{item.label}<ArrowUpRight size={20} aria-hidden="true" /></Link></SheetClose>)}</nav><a href={profile.github} target="_blank" rel="noreferrer">GitHub ↗</a><a href={profile.linkedin} target="_blank" rel="noreferrer">LinkedIn ↗</a></SheetContent></Sheet>
      </div></div></header>
  </>;
}
