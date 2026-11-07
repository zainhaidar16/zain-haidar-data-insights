import { ThemeToggle } from "@/components/portfolio/ThemeToggle";
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
      { title: "Portfolio admin — zainhaidar Admin" },
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
      <main className="admin-shell min-h-screen bg-background flex items-center justify-center font-sans">
        <div className="flex flex-col items-center gap-3">
          <Loader2 className="h-7 w-7 animate-spin text-[var(--accent-text)]" />
          <span className="text-sm font-semibold text-muted-foreground">Verifying session...</span>
        </div>
      </main>
    );
  }

  if (isLoginPage) {
    return <Outlet />;
  }

  if (!isAuthenticated) {
    return (
      <main className="admin-shell admin-access-state">
        <h1>Administrator access required</h1>
        <p>
          This session cannot open the administration area. If your access was just updated, sign
          out and sign in again.
        </p>
        <button className="admin-action-primary" onClick={handleLogout}>
          Sign out
        </button>
      </main>
    );
  }

  // Sidebar Links
  const sidebarLinks = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Projects", href: "/admin/projects", icon: Briefcase },
    { label: "Experience", href: "/admin/experience", icon: Briefcase },
    { label: "Skills", href: "/admin/skills", icon: Database },
    {
      label: "Courses & certifications",
      href: "/admin/certifications",
      icon: Award,
    },
    { label: "Services", href: "/admin/services", icon: Settings },
    { label: "Enquiries", href: "/admin/leads", icon: Inbox },
  ];

  // Resolve active page title
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/admin") return "Dashboard overview";
    if (path.includes("/projects")) return "Projects";

    if (path.includes("/experience")) return "Experience";
    if (path.includes("/skills")) return "Skills";
    if (path.includes("/certifications")) return "Courses & certifications";
    if (path.includes("/services")) return "Services";
    if (path.includes("/leads")) return "Enquiries";
    return "Portfolio admin";
  };

  return (
    <div className="admin-shell min-h-screen bg-background flex flex-col md:flex-row font-sans text-muted-foreground">
      <a href="#admin-content" className="admin-skip">
        Skip to content
      </a>
      {/* ─── SIDEBAR NAVIGATION (Desktop) ─── */}
      <aside className="admin-sidebar hidden md:flex flex-col w-64 bg-card text-muted-foreground border-r border-border shrink-0">
        {/* Header Branding */}
        <div className="h-16 px-6 border-b border-border flex items-center gap-3">
          <div className="h-8 w-8 rounded-[var(--radius-control)] bg-primary flex items-center justify-center font-semibold text-primary-foreground text-sm select-none admin-action-primary">
            Z
          </div>
          <div>
            <div className="font-semibold text-sm tracking-wide text-foreground">zainhaidar</div>
            <div className="text-sm text-muted-foreground font-semibold tracking-wider uppercase">
              Portfolio admin
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <nav aria-label="Admin navigation" className="flex-1 px-4 py-6 space-y-2 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.href;

            return (
              <Link
                key={link.label}
                to={link.href}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-3 px-4 py-3 rounded-[var(--radius-control)] text-sm font-semibold tracking-wide transition-all ${
                  isActive
                    ? "bg-muted text-[var(--accent-text)]"
                    : "text-muted-foreground hover:bg-background hover:text-[var(--accent-text)]"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-border space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-[var(--radius-control)] text-sm font-semibold text-muted-foreground hover:text-[var(--accent-text)] hover:bg-background transition"
          >
            <Globe className="h-4 w-4" />
            <span>View website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-[var(--radius-control)] text-sm font-semibold text-[var(--admin-danger)] hover:text-[var(--admin-danger)] hover:bg-[var(--admin-danger-soft)] transition cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Sign out</span>
          </button>
        </div>
      </aside>

      {/* ─── MOBILE HEADER & SIDEBAR OVERLAY ─── */}
      <header className="md:hidden h-16 bg-card border-b border-border text-foreground flex items-center justify-between px-4 z-40 relative">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-[var(--radius-control)] bg-primary flex items-center justify-center font-semibold text-primary-foreground text-sm admin-action-primary">
            Z
          </div>
          <span className="font-semibold text-sm tracking-wider uppercase text-foreground">
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
        <header className="hidden md:flex h-16 bg-card border-b border-border px-8 items-center justify-between shadow-sm">
          <h2 className="font-semibold text-foreground text-lg">{getPageTitle()}</h2>
          <div className="flex items-center gap-4">
            <ThemeToggle />
            <span className="text-sm font-semibold text-muted-foreground bg-background px-3 py-1 rounded-full border border-border">
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
