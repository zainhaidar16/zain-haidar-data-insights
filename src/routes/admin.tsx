import {
  Sheet,
  SheetContent,
  SheetTitle,
  SheetDescription,
  SheetTrigger,
} from "@/components/ui/sheet";
import adminCss from "../admin.css?url";
import { createFileRoute, useNavigate, Link, Outlet, useLocation } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import {
  Loader2,
  LogOut,
  Briefcase,
  FileText,
  Database,
  Award,
  Settings,
  Inbox,
  LayoutDashboard,
  Globe,
  Menu,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    links: [{ rel: "stylesheet", href: adminCss }],
    meta: [
      { title: "Portfolio admin — Zain The Analyst Admin" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLayout,
});

function AdminLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const [sessionChecked, setSessionChecked] = useState(false);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    let cancelled = false;
    let revision = 0;
    async function verify(session: { user: { id: string } } | null) {
      const current = ++revision;
      setSessionChecked(false);
      let allowed = false;
      if (session) {
        const { data, error } = await supabase.rpc("has_role", {
          _user_id: session.user.id,
          _role: "admin",
        });
        allowed = !error && data === true;
      }
      if (cancelled || current !== revision) return;
      setIsAuthenticated(allowed);
      setSessionChecked(true);
      if (!session && location.pathname !== "/admin/login") navigate({ to: "/admin/login" });
    }
    supabase.auth.getSession().then(({ data }) => verify(data.session));
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      queueMicrotask(() => {
        if (!cancelled) void verify(session);
      });
    });
    return () => {
      cancelled = true;
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  // Sign out handler
  const handleLogout = async () => {
    try {
      await supabase.auth.signOut();
      navigate({ to: "/admin/login" });
    } catch (err) {
      console.error("Error signing out:", err);
    }
  };

  // Skip rendering shell if checking session or on the login page
  const isLoginPage = location.pathname === "/admin/login";

  if (!sessionChecked) {
    return (
      <main className="min-h-screen bg-[#FAF9F6] flex items-center justify-center font-poppins">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
          <span className="text-xs font-semibold text-slate-400">Verifying session...</span>
        </div>
      </main>
    );
  }

  if (isLoginPage) {
    return <Outlet />;
  }

  if (!isAuthenticated) {
    return (
      <main className="container section">
        <h1>Administrator access required</h1>
        <p>
          This session cannot open the administration area. If your access was just updated, sign
          out and sign in again.
        </p>
        <button className="button button-primary" onClick={handleLogout}>
          Sign out
        </button>
      </main>
    );
  }

  // Sidebar Links
  const sidebarLinks = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Projects", href: "/admin/projects", icon: Briefcase },
    { label: "Posts", href: "/admin/posts", icon: FileText },
    { label: "Experience", href: "/admin/experience", icon: Briefcase },
    { label: "Skills", href: "/admin/skills", icon: Database },
    { label: "Courses & certifications", href: "/admin/certifications", icon: Award },
    { label: "Services", href: "/admin/services", icon: Settings },
    { label: "Enquiries", href: "/admin/leads", icon: Inbox },
  ];

  // Resolve active page title
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/admin") return "Dashboard Overview";
    if (path.includes("/projects")) return "Projects";
    if (path.includes("/posts")) return "Posts";
    if (path.includes("/experience")) return "Experience";
    if (path.includes("/skills")) return "Skills";
    if (path.includes("/certifications")) return "Courses & certifications";
    if (path.includes("/services")) return "Services";
    if (path.includes("/leads")) return "Enquiries";
    return "Portfolio admin";
  };

  return (
    <div className="admin-shell min-h-screen bg-[#F1F2EE] flex flex-col md:flex-row font-poppins text-[#4D574F]">
      <a href="#admin-content" className="admin-skip">
        Skip to content
      </a>
      {/* ─── SIDEBAR NAVIGATION (Desktop) ─── */}
      <aside className="admin-sidebar hidden md:flex flex-col w-64 bg-[#FFFFFF] text-[#4D574F] border-r border-[#D5D9D2] shrink-0">
        {/* Header Branding */}
        <div className="h-16 px-6 border-b border-[#D5D9D2] flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-[#245C73] flex items-center justify-center font-bold text-white text-xs select-none">
            Z
          </div>
          <div>
            <div className="font-bold text-sm tracking-wide text-[#202420]">Zain The Analyst</div>
            <div className="text-xs text-[#5F6961] font-semibold tracking-wider uppercase">
              Portfolio admin
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <nav aria-label="Admin navigation" className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.href;

            return (
              <Link
                key={link.label}
                to={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? "bg-[rgba(36,92,115,0.06)] text-[#245C73]"
                    : "text-[#4D574F] hover:bg-[#F1F2EE] hover:text-[#245C73]"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-[#D5D9D2] space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#4D574F] hover:text-[#245C73] hover:bg-[#F1F2EE] transition"
          >
            <Globe className="h-4 w-4" />
            <span>Back to Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:text-rose-500 hover:bg-rose-50 transition cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* ─── MOBILE HEADER & SIDEBAR OVERLAY ─── */}
      <header className="md:hidden h-16 bg-[#FFFFFF] border-b border-[#D5D9D2] text-[#202420] flex items-center justify-between px-4 z-40 relative">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-[#245C73] flex items-center justify-center font-bold text-white text-xs">
            Z
          </div>
          <span className="font-bold text-xs tracking-wider uppercase text-[#202420]">
            Portfolio admin
          </span>
        </div>

        <Sheet open={mobileMenuOpen} onOpenChange={setMobileMenuOpen}>
          <SheetTrigger asChild>
            <button className="admin-menu" aria-label="Open navigation">
              <Menu size={22} />
            </button>
          </SheetTrigger>
          <SheetContent side="left" className="admin-shell admin-drawer">
            <SheetTitle>Portfolio admin</SheetTitle>
            <SheetDescription>Manage your website content and enquiries.</SheetDescription>
            <nav aria-label="Mobile admin navigation">
              {sidebarLinks.map(({ label, href, icon: Icon }) => (
                <Link
                  key={href}
                  to={href}
                  aria-current={location.pathname === href ? "page" : undefined}
                  onClick={() => setMobileMenuOpen(false)}
                >
                  <Icon size={18} />
                  {label}
                </Link>
              ))}
            </nav>
            <Link to="/" onClick={() => setMobileMenuOpen(false)}>
              View website
            </Link>
            <button
              onClick={() => {
                setMobileMenuOpen(false);
                handleLogout();
              }}
            >
              Sign out
            </button>
          </SheetContent>
        </Sheet>
      </header>

      {/* ─── MAIN CONTENT AREA ─── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Topbar */}
        <header className="hidden md:flex h-16 bg-[#FFFFFF] border-b border-[#D5D9D2] px-8 items-center justify-between shadow-sm">
          <h2 className="font-bold text-[#202420] text-lg">{getPageTitle()}</h2>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-[#5F6961] bg-[#F1F2EE] px-3 py-1 rounded-full border border-[#D5D9D2]">
              Signed in
            </span>
          </div>
        </header>

        {/* Content Body */}
        <main
          id="admin-content"
          tabIndex={-1}
          className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto"
        >
          <Outlet />
        </main>
      </div>
    </div>
  );
}
