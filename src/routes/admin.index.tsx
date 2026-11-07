import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getDashboardStats, getRecentLeads, DashboardStats, Lead } from "@/lib/adminApi";
import {
  Briefcase,
  Settings,
  Inbox,
  Database,
  Award,
  Clock,
  Loader2,
  ArrowUpRight,
  AlertCircle,
} from "lucide-react";

export const Route = createFileRoute("/admin/")({
  head: () => ({
    meta: [{ title: "Dashboard Overview — zainhaidar Admin" }],
  }),
  component: AdminDashboardIndex,
});

function AdminDashboardIndex() {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [recentLeads, setRecentLeads] = useState<Lead[]>([]);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    async function loadDashboardData() {
      setLoading(true);
      setError("");

      try {
        // 1. Verify active Supabase session
        const {
          data: { session },
          error: sessionError,
        } = await supabase.auth.getSession();
        if (sessionError) throw sessionError;

        if (!session) {
          console.warn("No authenticated admin session found. Redirecting to login...");
          navigate({ to: "/admin/login" });
          return;
        }

        // 2. Fetch live stats and recent leads in parallel
        const [statsData, leadsData] = await Promise.all([getDashboardStats(), getRecentLeads()]);

        setStats(statsData);
        setRecentLeads(leadsData);
      } catch (err: unknown) {
        console.error("Dashboard metrics load failed:", err);
        setError(
          err instanceof Error
            ? err.message
            : "Failed to load dashboard metrics. Check console for details.",
        );
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [navigate]);
  if (loading) {
    return (
      <div className="space-y-8 animate-fade-in font-sans">
        {/* Loading skeletons for metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-card border border-border shadow-sm admin-card p-6 flex flex-col justify-between h-32 animate-pulse"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2.5 flex-1">
                  <div className="h-2.5 w-20 bg-background rounded" />
                  <div className="h-6 w-12 bg-background rounded" />
                </div>
                <div className="h-10 w-10 bg-background border border-border rounded-[var(--radius-control)]" />
              </div>
              <div className="h-2 w-28 bg-background rounded" />
            </div>
          ))}
        </div>

        {/* Loading skeleton for recent leads */}
        <div className="bg-card border border-border admin-card p-6 space-y-4 animate-pulse">
          <div className="h-4 w-32 bg-background rounded" />
          <div className="h-3 w-48 bg-background rounded" />
          <div className="space-y-3 pt-4">
            <div className="h-10 bg-background rounded" />
            <div className="h-10 bg-background rounded" />
            <div className="h-10 bg-background rounded" />
          </div>
        </div>
      </div>
    );
  }

  // Count metrics structure mapped from verified Supabase exact count data
  const metrics = stats
    ? [
        {
          label: "Projects",
          href: "/admin/projects",
          value: stats.totalProjects,
          icon: Briefcase,
          color: "text-[var(--accent-text)] bg-muted border-border",
          details: `${stats.publishedProjects} Published · ${stats.draftProjects} Drafts`,
        },
        {
          label: "Services",
          href: "/admin/services",
          value: stats.totalServices,
          icon: Settings,
          color:
            "text-[var(--admin-success)] bg-[var(--admin-success-soft)] border-[var(--admin-success-border)]",
          details: `${stats.activeServices} Active`,
        },
        {
          label: "Enquiries",
          href: "/admin/leads",
          value: stats.totalLeads,
          icon: Inbox,
          color:
            "text-[var(--admin-danger)] bg-[var(--admin-danger-soft)] border-[var(--admin-danger-border)]",
          details: `${stats.newLeads} New`,
        },
        {
          label: "Skills",
          href: "/admin/skills",
          value: stats.totalSkills,
          icon: Database,
          color: "text-[var(--accent-text)] bg-[var(--accent-soft)] border-border",
        },
        {
          label: "Courses & certifications",
          href: "/admin/certifications",
          value: stats.totalCertifications,
          icon: Award,
          color:
            "text-[var(--admin-warning)] bg-[var(--admin-warning-soft)] border-[var(--admin-warning-border)]",
        },
        {
          label: "Experience",
          href: "/admin/experience",
          value: stats.totalExperience,
          icon: Clock,
          color: "text-[var(--accent-text)] bg-[var(--accent-soft)] border-border",
        },
      ]
    : [];

  return (
    <div className="space-y-8 animate-fade-in font-sans">
      <div className="admin-intro">
        <div>
          <span className="admin-eyebrow">YOUR WORKSPACE</span>
          <h1>Portfolio overview</h1>
          <p>Review enquiries and keep your published work up to date.</p>
        </div>
        <div className="admin-quick-links">
          <Link to="/admin/leads">Open enquiries</Link>
          <Link to="/admin/projects">Manage projects</Link>
        </div>
      </div>
      {error && (
        <div
          role="alert"
          className="admin-card border border-[var(--admin-danger-border)] bg-[var(--admin-danger-soft)] text-[var(--admin-danger)] text-sm px-6 py-4 font-semibold flex items-center gap-3 shadow-xs"
        >
          <AlertCircle className="h-5 w-5 shrink-0 text-[var(--admin-danger)]" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid count cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-6">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <Link
              to={m.href}
              key={m.label}
              className="admin-metric bg-card border border-border shadow-sm admin-card p-6 hover:border-border hover:shadow-md transition duration-200 flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-sm uppercase font-semibold text-muted-foreground tracking-wider">
                    {m.label}
                  </span>
                  <div className="text-3xl font-semibold text-foreground mt-1">{m.value}</div>
                </div>
                <div className="admin-metric-icon p-2.5 rounded-[var(--radius-control)] border">
                  <Icon className="h-5 w-5 shrink-0" />
                </div>
              </div>
              {m.details && (
                <div className="text-sm text-muted-foreground font-semibold mt-4 border-t border-border pt-3">
                  {m.details}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Leads Section */}
      <div className="bg-card border border-border admin-card shadow-sm overflow-hidden">
        <div className="px-6 py-6 border-b border-border flex justify-between items-center bg-background">
          <div>
            <h3 className="font-semibold text-foreground text-sm tracking-wide">
              Recent enquiries
            </h3>
            <p className="text-sm text-muted-foreground mt-0.5 font-medium">
              Employment opportunities and freelance project enquiries
            </p>
          </div>
          <Link
            to="/admin/leads"
            className="inline-flex items-center gap-1 text-sm font-semibold text-[var(--accent-text)] hover:text-[var(--accent-text)] transition"
          >
            <span>View all</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {error ? (
          <p className="p-6 text-sm">
            Enquiries could not be loaded. Refresh the page to try again.
          </p>
        ) : recentLeads.length === 0 ? (
          <div className="p-12 text-center text-muted-foreground text-sm font-semibold">
            No enquiries yet. New messages from your contact form will appear here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table
              aria-label="Recent enquiries"
              className="w-full text-left border-collapse text-sm"
            >
              <thead>
                <tr className="bg-background border-b border-border text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                  <th scope="col" className="px-6 py-3.5">
                    Contact
                  </th>
                  <th className="px-6 py-3.5">Project Type / Budget</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border font-medium text-muted-foreground">
                {recentLeads.map((lead) => {
                  const statusColors = {
                    new: "bg-muted text-[var(--accent-text)] border-border",
                    contacted:
                      "bg-[var(--admin-warning-soft)] text-[var(--admin-warning)] border-[var(--admin-warning-border)]",
                    in_progress: "bg-[var(--accent-soft)] text-[var(--accent-text)] border-border",
                    closed:
                      "bg-[var(--admin-success-soft)] text-[var(--admin-success)] border-[var(--admin-success-border)]",
                    rejected:
                      "bg-[var(--admin-danger-soft)] text-[var(--admin-danger)] border-[var(--admin-danger-border)]",
                  };

                  return (
                    <tr key={lead.id} className="hover:bg-background transition">
                      <td className="px-6 py-4">
                        <div className="font-semibold text-foreground">{lead.name}</div>
                        <div className="text-sm text-muted-foreground font-semibold mt-0.5">
                          {lead.email}
                        </div>
                        {lead.company && (
                          <div className="text-sm text-muted-foreground mt-0.5 italic">
                            at {lead.company}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-foreground capitalize font-semibold">
                          {lead.project_type?.replace(/_/g, " ") || "General Inquiry"}
                        </div>
                        <div className="text-sm text-muted-foreground font-semibold mt-0.5">
                          Budget:{" "}
                          <span className="text-muted-foreground uppercase">
                            {lead.budget?.replace(/_/g, " ") || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-sm font-semibold uppercase tracking-wide select-none ${statusColors[lead.status] || "bg-muted text-muted-foreground border-border"}`}
                        >
                          {lead.status.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground font-mono text-sm">
                        {lead.created_at ? new Date(lead.created_at).toLocaleString() : "N/A"}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}
