import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { getDashboardStats, getRecentLeads, DashboardStats, Lead } from "@/lib/adminApi";
import {
  Briefcase,
  FileText,
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
    meta: [{ title: "Dashboard Overview — Zain The Analyst Admin" }],
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
      } catch (err: any) {
        console.error("Dashboard metrics load failed:", err);
        setError(err?.message || "Failed to load dashboard metrics. Check console for details.");
      } finally {
        setLoading(false);
      }
    }

    loadDashboardData();
  }, [navigate]);
  if (loading) {
    return (
      <div className="space-y-8 animate-fade-in font-poppins">
        {/* Loading skeletons for metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 7 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-[#FFFFFF] border border-[#D5D9D2] shadow-sm rounded-2xl p-5 flex flex-col justify-between h-32 animate-pulse"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2.5 flex-1">
                  <div className="h-2.5 w-20 bg-[#F1F2EE] rounded" />
                  <div className="h-6 w-12 bg-[#F1F2EE] rounded" />
                </div>
                <div className="h-10 w-10 bg-[#F1F2EE] border border-[#D5D9D2] rounded-xl" />
              </div>
              <div className="h-2 w-28 bg-[#F1F2EE] rounded" />
            </div>
          ))}
        </div>

        {/* Loading skeleton for recent leads */}
        <div className="bg-[#FFFFFF] border border-[#D5D9D2] rounded-3xl p-6 space-y-4 animate-pulse">
          <div className="h-4 w-32 bg-[#F1F2EE] rounded" />
          <div className="h-3 w-48 bg-[#F1F2EE] rounded" />
          <div className="space-y-3 pt-4">
            <div className="h-10 bg-[#F1F2EE] rounded" />
            <div className="h-10 bg-[#F1F2EE] rounded" />
            <div className="h-10 bg-[#F1F2EE] rounded" />
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
          color: "text-[#245C73] bg-[rgba(36,92,115,0.06)] border-[rgba(36,92,115,0.12)]",
          details: `${stats.publishedProjects} Published · ${stats.draftProjects} Drafts`,
        },
        {
          label: "Posts",
          href: "/admin/posts",
          value: stats.totalPosts,
          icon: FileText,
          color: "text-indigo-600 bg-indigo-50 border-indigo-100",
          details: `${stats.publishedPosts} Published`,
        },
        {
          label: "Services",
          href: "/admin/services",
          value: stats.totalServices,
          icon: Settings,
          color: "text-emerald-600 bg-emerald-50 border-emerald-100",
          details: `${stats.activeServices} Active`,
        },
        {
          label: "Enquiries",
          href: "/admin/leads",
          value: stats.totalLeads,
          icon: Inbox,
          color: "text-rose-600 bg-rose-50 border-rose-100",
          details: `${stats.newLeads} New`,
        },
        {
          label: "Skills",
          href: "/admin/skills",
          value: stats.totalSkills,
          icon: Database,
          color: "text-cyan-600 bg-cyan-50 border-cyan-100",
        },
        {
          label: "Courses & certifications",
          href: "/admin/certifications",
          value: stats.totalCertifications,
          icon: Award,
          color: "text-amber-600 bg-amber-50 border-amber-100",
        },
        {
          label: "Experience",
          href: "/admin/experience",
          value: stats.totalExperience,
          icon: Clock,
          color: "text-violet-600 bg-violet-50 border-violet-100",
        },
      ]
    : [];

  return (
    <div className="space-y-8 animate-fade-in font-poppins">
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
          className="rounded-2xl border border-rose-200 bg-rose-50 text-rose-700 text-xs px-5 py-4 font-semibold flex items-center gap-3 shadow-xs"
        >
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid count cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <Link
              to={m.href}
              key={m.label}
              className="admin-metric bg-[#FFFFFF] border border-[#D5D9D2] shadow-sm rounded-2xl p-5 hover:border-[#245C73]/20 hover:shadow-md transition duration-200 flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-xs uppercase font-bold text-[#5F6961] tracking-wider">
                    {m.label}
                  </span>
                  <div className="text-3xl font-extrabold text-[#202420] mt-1">{m.value}</div>
                </div>
                <div className="admin-metric-icon p-2.5 rounded-xl border">
                  <Icon className="h-5 w-5 shrink-0" />
                </div>
              </div>
              {m.details && (
                <div className="text-xs text-[#4D574F] font-semibold mt-4 border-t border-[#D5D9D2] pt-3">
                  {m.details}
                </div>
              )}
            </Link>
          );
        })}
      </div>

      {/* Leads Section */}
      <div className="bg-[#FFFFFF] border border-[#D5D9D2] rounded-3xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#D5D9D2] flex justify-between items-center bg-[#FAF9F6]">
          <div>
            <h3 className="font-bold text-[#202420] text-sm tracking-wide">Recent enquiries</h3>
            <p className="text-xs text-[#5F6961] mt-0.5 font-medium">
              Employment opportunities and freelance project enquiries
            </p>
          </div>
          <Link
            to="/admin/leads"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#245C73] hover:text-[#19485D] transition"
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
          <div className="p-12 text-center text-[#5F6961] text-xs font-semibold">
            No enquiries yet. New messages from your contact form will appear here.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table
              aria-label="Recent enquiries"
              className="w-full text-left border-collapse text-xs"
            >
              <thead>
                <tr className="bg-[#F1F2EE] border-b border-[#D5D9D2] text-xs font-bold uppercase tracking-wider text-[#5F6961]">
                  <th scope="col" className="px-6 py-3.5">
                    Contact
                  </th>
                  <th className="px-6 py-3.5">Project Type / Budget</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Received</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#D5D9D2] font-medium text-[#4D574F]">
                {recentLeads.map((lead) => {
                  const statusColors = {
                    new: "bg-[rgba(36,92,115,0.06)] text-[#245C73] border-[rgba(36,92,115,0.12)]",
                    contacted: "bg-amber-50 text-amber-600 border-amber-100",
                    in_progress: "bg-purple-50 text-purple-600 border-purple-100",
                    closed: "bg-emerald-50 text-emerald-600 border-emerald-100",
                    rejected: "bg-rose-50 text-rose-600 border-rose-100",
                  };

                  return (
                    <tr key={lead.id} className="hover:bg-[#F1F2EE]/30 transition">
                      <td className="px-6 py-4">
                        <div className="font-bold text-[#202420]">{lead.name}</div>
                        <div className="text-xs text-[#5F6961] font-semibold mt-0.5">
                          {lead.email}
                        </div>
                        {lead.company && (
                          <div className="text-xs text-[#5F6961] mt-0.5 italic">
                            at {lead.company}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-[#202420] capitalize font-bold">
                          {lead.project_type?.replace(/_/g, " ") || "General Inquiry"}
                        </div>
                        <div className="text-xs text-[#5F6961] font-semibold mt-0.5">
                          Budget:{" "}
                          <span className="text-[#4D574F] uppercase">
                            {lead.budget?.replace(/_/g, " ") || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-xs font-bold uppercase tracking-wide select-none ${statusColors[lead.status] || "bg-slate-100 text-slate-500 border-slate-200"}`}
                        >
                          {lead.status.replace(/_/g, " ")}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[#5F6961] font-mono text-xs">
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
