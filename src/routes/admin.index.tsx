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
  }, [navigate]);  if (loading) {
    return (
      <div className="space-y-8 animate-fade-in font-poppins">
        {/* Loading skeletons for metric cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {Array.from({ length: 7 }).map((_, idx) => (
            <div
              key={idx}
              className="bg-[#FFFFFF] border border-[#E8E8ED] shadow-sm rounded-2xl p-5 flex flex-col justify-between h-32 animate-pulse"
            >
              <div className="flex justify-between items-start">
                <div className="space-y-2.5 flex-1">
                  <div className="h-2.5 w-20 bg-[#F5F5F7] rounded" />
                  <div className="h-6 w-12 bg-[#F5F5F7] rounded" />
                </div>
                <div className="h-10 w-10 bg-[#F5F5F7] border border-[#E8E8ED] rounded-xl" />
              </div>
              <div className="h-2 w-28 bg-[#F5F5F7] rounded" />
            </div>
          ))}
        </div>

        {/* Loading skeleton for recent leads */}
        <div className="bg-[#FFFFFF] border border-[#E8E8ED] rounded-3xl p-6 space-y-4 animate-pulse">
          <div className="h-4 w-32 bg-[#F5F5F7] rounded" />
          <div className="h-3 w-48 bg-[#F5F5F7] rounded" />
          <div className="space-y-3 pt-4">
            <div className="h-10 bg-[#F5F5F7] rounded" />
            <div className="h-10 bg-[#F5F5F7] rounded" />
            <div className="h-10 bg-[#F5F5F7] rounded" />
          </div>
        </div>
      </div>
    );
  }

  // Count metrics structure mapped from verified Supabase exact count data
  const metrics = stats
    ? [
        {
          label: "Total Projects",
          value: stats.totalProjects,
          icon: Briefcase,
          color: "text-[#0071E3] bg-[rgba(0,113,227,0.06)] border-[rgba(0,113,227,0.12)]",
          details: `${stats.publishedProjects} Published · ${stats.draftProjects} Drafts`,
        },
        {
          label: "Blog Posts",
          value: stats.totalPosts,
          icon: FileText,
          color: "text-indigo-600 bg-indigo-50 border-indigo-100",
          details: `${stats.publishedPosts} Published`,
        },
        {
          label: "Services Offered",
          value: stats.totalServices,
          icon: Settings,
          color: "text-emerald-600 bg-emerald-50 border-emerald-100",
          details: `${stats.activeServices} Active`,
        },
        {
          label: "Total Leads",
          value: stats.totalLeads,
          icon: Inbox,
          color: "text-rose-600 bg-rose-50 border-rose-100",
          details: `${stats.newLeads} New`,
        },
        {
          label: "Skills Logged",
          value: stats.totalSkills,
          icon: Database,
          color: "text-cyan-600 bg-cyan-50 border-cyan-100",
        },
        {
          label: "Certifications",
          value: stats.totalCertifications,
          icon: Award,
          color: "text-amber-600 bg-amber-50 border-amber-100",
        },
        {
          label: "Experience Items",
          value: stats.totalExperience,
          icon: Clock,
          color: "text-violet-600 bg-violet-50 border-violet-100",
        },
      ]
    : [];

  return (
    <div className="space-y-8 animate-fade-in font-poppins">
      {error && (
        <div className="rounded-2xl border border-rose-200 bg-rose-50 text-rose-700 text-xs px-5 py-4 font-semibold flex items-center gap-3 shadow-xs">
          <AlertCircle className="h-5 w-5 shrink-0 text-rose-500" />
          <span>{error}</span>
        </div>
      )}

      {/* Grid count cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {metrics.map((m) => {
          const Icon = m.icon;
          return (
            <div
              key={m.label}
              className="bg-[#FFFFFF] border border-[#E8E8ED] shadow-sm rounded-2xl p-5 hover:border-[#0071E3]/20 hover:shadow-md transition duration-200 flex flex-col justify-between"
            >
              <div className="flex justify-between items-start">
                <div>
                  <span className="text-[10px] uppercase font-bold text-[#86868B] tracking-wider">
                    {m.label}
                  </span>
                  <div className="text-3xl font-extrabold text-[#1D1D1F] mt-1">{m.value}</div>
                </div>
                <div className={`p-2.5 rounded-xl border ${m.color}`}>
                  <Icon className="h-5 w-5 shrink-0" />
                </div>
              </div>
              {m.details && (
                <div className="text-[11px] text-[#6E6E73] font-semibold mt-4 border-t border-[#E8E8ED] pt-3">
                  {m.details}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Leads Section */}
      <div className="bg-[#FFFFFF] border border-[#E8E8ED] rounded-3xl shadow-sm overflow-hidden">
        <div className="px-6 py-5 border-b border-[#E8E8ED] flex justify-between items-center bg-[#FBFBFD]">
          <div>
            <h3 className="font-bold text-[#1D1D1F] text-sm tracking-wide">Recent Leads Inbox</h3>
            <p className="text-xs text-[#86868B] mt-0.5 font-medium">
              The latest incoming client requests and contacts
            </p>
          </div>
          <Link
            to="/admin/leads"
            className="inline-flex items-center gap-1 text-xs font-semibold text-[#0071E3] hover:text-[#005BB5] transition"
          >
            <span>Go to Inbox</span>
            <ArrowUpRight className="h-4 w-4" />
          </Link>
        </div>

        {recentLeads.length === 0 ? (
          <div className="p-12 text-center text-[#86868B] text-xs font-semibold">
            No leads found.
          </div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left border-collapse text-xs">
              <thead>
                <tr className="bg-[#F5F5F7] border-b border-[#E8E8ED] text-[10px] font-bold uppercase tracking-wider text-[#86868B]">
                  <th className="px-6 py-3.5">Client</th>
                  <th className="px-6 py-3.5">Project Type / Budget</th>
                  <th className="px-6 py-3.5">Status</th>
                  <th className="px-6 py-3.5">Received At</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-[#E8E8ED] font-medium text-[#6E6E73]">
                {recentLeads.map((lead) => {
                  const statusColors = {
                    new: "bg-[rgba(0,113,227,0.06)] text-[#0071E3] border-[rgba(0,113,227,0.12)]",
                    contacted: "bg-amber-50 text-amber-600 border-amber-100",
                    in_progress: "bg-purple-50 text-purple-600 border-purple-100",
                    closed: "bg-emerald-50 text-emerald-600 border-emerald-100",
                    rejected: "bg-rose-50 text-rose-600 border-rose-100",
                  };

                  return (
                    <tr key={lead.id} className="hover:bg-[#F5F5F7]/30 transition">
                      <td className="px-6 py-4">
                        <div className="font-bold text-[#1D1D1F]">{lead.name}</div>
                        <div className="text-[11px] text-[#86868B] font-semibold mt-0.5">
                          {lead.email}
                        </div>
                        {lead.company && (
                          <div className="text-[10px] text-[#86868B] mt-0.5 italic">
                            at {lead.company}
                          </div>
                        )}
                      </td>
                      <td className="px-6 py-4">
                        <div className="text-[#1D1D1F] capitalize font-bold">
                          {lead.project_type?.replace(/_/g, " ") || "General Inquiry"}
                        </div>
                        <div className="text-[10px] text-[#86868B] font-semibold mt-0.5">
                          Budget:{" "}
                          <span className="text-[#6E6E73] uppercase">
                            {lead.budget?.replace(/_/g, " ") || "N/A"}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4">
                        <span
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wide select-none ${statusColors[lead.status] || "bg-slate-100 text-slate-500 border-slate-200"}`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-4 text-[#86868B] font-mono text-[11px]">
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
