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
  X,
  ShieldAlert,
} from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({
    meta: [
      { title: "Control Room — Zain The Analyst Admin" },
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
    // Check active session
    supabase.auth.getSession().then(({ data }) => {
      const activeSession = !!data.session;
      setIsAuthenticated(activeSession);
      setSessionChecked(true);

      // Protect all /admin routes except /admin/login
      if (!activeSession && location.pathname !== "/admin/login") {
        navigate({ to: "/admin/login" });
      }
    });

    // Listen for auth state changes
    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      const activeSession = !!session;
      setIsAuthenticated(activeSession);

      if (!activeSession && location.pathname !== "/admin/login") {
        navigate({ to: "/admin/login" });
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [navigate, location.pathname]);

  // Logout handler
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
      <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center font-poppins">
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
    return null; // will be redirected by useEffect
  }

  // Sidebar Links
  const sidebarLinks = [
    { label: "Dashboard", href: "/admin", icon: LayoutDashboard },
    { label: "Projects", href: "/admin/projects", icon: Briefcase },
    { label: "Posts", href: "/admin/posts", icon: FileText },
    { label: "Experience", href: "/admin/experience", icon: Briefcase },
    { label: "Skills", href: "/admin/skills", icon: Database },
    { label: "Certifications", href: "/admin/certifications", icon: Award },
    { label: "Services", href: "/admin/services", icon: Settings },
    { label: "Leads", href: "/admin/leads", icon: Inbox },
  ];

  // Resolve active page title
  const getPageTitle = () => {
    const path = location.pathname;
    if (path === "/admin") return "Dashboard Overview";
    if (path.includes("/projects")) return "Projects CRUD";
    if (path.includes("/posts")) return "Insights Posts CMS";
    if (path.includes("/experience")) return "Experience Timeline CRUD";
    if (path.includes("/skills")) return "Technical Skills CRUD";
    if (path.includes("/certifications")) return "Certifications CRUD";
    if (path.includes("/services")) return "Services CMS";
    if (path.includes("/leads")) return "Leads Inbox";
    return "Control Room";
  };

  return (
    <div className="min-h-screen bg-[#F5F5F7] flex flex-col md:flex-row font-poppins text-[#6E6E73]">
      {/* ─── SIDEBAR NAVIGATION (Desktop) ─── */}
      <aside className="hidden md:flex flex-col w-64 bg-[#FFFFFF] text-[#6E6E73] border-r border-[#E8E8ED] shrink-0">
        {/* Header Branding */}
        <div className="h-16 px-6 border-b border-[#E8E8ED] flex items-center gap-3">
          <div className="h-8 w-8 rounded-lg bg-[#0071E3] flex items-center justify-center font-bold text-white text-xs select-none">
            Z
          </div>
          <div>
            <div className="font-bold text-sm tracking-wide text-[#1D1D1F]">Zain The Analyst</div>
            <div className="text-[10px] text-[#86868B] font-semibold tracking-wider uppercase">
              Studio Admin
            </div>
          </div>
        </div>

        {/* Navigation links */}
        <nav className="flex-1 px-4 py-6 space-y-1.5 overflow-y-auto">
          {sidebarLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.href;

            return (
              <Link
                key={link.label}
                to={link.href}
                className={`flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold tracking-wide transition-all ${
                  isActive
                    ? "bg-[rgba(0,113,227,0.06)] text-[#0071E3]"
                    : "text-[#6E6E73] hover:bg-[#F5F5F7] hover:text-[#0071E3]"
                }`}
              >
                <Icon className="h-4 w-4" />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>

        {/* Footer actions */}
        <div className="p-4 border-t border-[#E8E8ED] space-y-2">
          <Link
            to="/"
            className="flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-[#6E6E73] hover:text-[#0071E3] hover:bg-[#F5F5F7] transition"
          >
            <Globe className="h-4 w-4" />
            <span>Back to Website</span>
          </Link>
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-2.5 rounded-xl text-xs font-semibold text-rose-600 hover:text-rose-500 hover:bg-rose-50 transition cursor-pointer"
          >
            <LogOut className="h-4 w-4" />
            <span>Logout</span>
          </button>
        </div>
      </aside>

      {/* ─── MOBILE HEADER & SIDEBAR OVERLAY ─── */}
      <header className="md:hidden h-16 bg-[#FFFFFF] border-b border-[#E8E8ED] text-[#1D1D1F] flex items-center justify-between px-4 z-40 relative">
        <div className="flex items-center gap-2">
          <div className="h-7 w-7 rounded-md bg-[#0071E3] flex items-center justify-center font-bold text-white text-[10px]">
            Z
          </div>
          <span className="font-bold text-xs tracking-wider uppercase text-[#1D1D1F]">Studio Admin</span>
        </div>

        <button
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="p-2 text-[#6E6E73] hover:text-[#0071E3] transition cursor-pointer"
        >
          {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </button>
      </header>

      {/* Mobile Drawer Overlay */}
      {mobileMenuOpen && (
        <div className="md:hidden fixed inset-0 bg-black/20 z-30 pt-16 flex flex-col">
          <div className="bg-[#FFFFFF] border-b border-[#E8E8ED] w-full px-4 py-6 space-y-6 animate-fade-in shadow-md">
            <nav className="space-y-2">
              {sidebarLinks.map((link) => {
                const Icon = link.icon;
                const isActive = location.pathname === link.href;

                return (
                  <Link
                    key={link.label}
                    to={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className={`flex items-center gap-3 px-4 py-3.5 rounded-xl text-xs font-semibold transition ${
                      isActive
                        ? "bg-[rgba(0,113,227,0.06)] text-[#0071E3]"
                        : "text-[#6E6E73] hover:bg-[#F5F5F7] hover:text-[#0071E3]"
                    }`}
                  >
                    <Icon className="h-4.5 w-4.5" />
                    <span>{link.label}</span>
                  </Link>
                );
              })}
            </nav>

            <div className="pt-4 border-t border-[#E8E8ED] space-y-2">
              <Link
                to="/"
                onClick={() => setMobileMenuOpen(false)}
                className="flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-[#6E6E73] hover:text-[#0071E3]"
              >
                <Globe className="h-4.5 w-4.5" />
                <span>Back to Website</span>
              </Link>
              <button
                onClick={() => {
                  setMobileMenuOpen(false);
                  handleLogout();
                }}
                className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-semibold text-rose-650 hover:bg-rose-50 cursor-pointer"
              >
                <LogOut className="h-4.5 w-4.5" />
                <span>Logout</span>
              </button>
            </div>
          </div>
          <div className="flex-grow" onClick={() => setMobileMenuOpen(false)} />
        </div>
      )}

      {/* ─── MAIN CONTENT AREA ─── */}
      <div className="flex-1 flex flex-col min-w-0">
        {/* Desktop Topbar */}
        <header className="hidden md:flex h-16 bg-[#FFFFFF] border-b border-[#E8E8ED] px-8 items-center justify-between shadow-sm">
          <h2 className="font-bold text-[#1D1D1F] text-lg">{getPageTitle()}</h2>
          <div className="flex items-center gap-4">
            <span className="text-xs font-semibold text-[#86868B] bg-[#F5F5F7] px-3 py-1 rounded-full border border-[#E8E8ED]">
              Admin Session Active
            </span>
          </div>
        </header>

        {/* Content Body */}
        <main className="flex-1 p-6 md:p-8 overflow-y-auto max-w-7xl w-full mx-auto">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
