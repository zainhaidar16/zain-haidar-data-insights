import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { getAdminLeads, updateLeadStatus, deleteLead, Lead } from "@/lib/adminApi";
import {
  Loader2,
  Search,
  Filter,
  Trash2,
  X,
  AlertCircle,
  Mail,
  Calendar,
  Briefcase,
  DollarSign,
  MessageSquare,
  Inbox,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/leads")({
  head: () => ({
    meta: [{ title: "Leads Inbox — zainhaidar Admin" }],
  }),
  component: AdminLeadsPage,
});

function AdminLeadsPage() {
  const [leads, setLeads] = useState<Lead[]>([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [statusFilter, setStatusFilter] = useState<string>("all");
  const [error, setError] = useState("");

  // Details Modal State
  const [activeLead, setActiveLead] = useState<Lead | null>(null);
  const [statusUpdatingId, setStatusUpdatingId] = useState<string | null>(null);

  // Load Leads
  async function loadLeads() {
    setLoading(true);
    setError("");
    try {
      const data = await getAdminLeads();
      setLeads(data);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to load incoming leads.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadLeads();
  }, []);

  // Update Status
  async function handleStatusChange(id: string, nextStatus: Lead["status"]) {
    setStatusUpdatingId(id);
    try {
      await updateLeadStatus(id, nextStatus);
      toast.success(`Lead status updated to ${nextStatus}.`);

      // Update local state directly
      setLeads((prev) => prev.map((l) => (l.id === id ? { ...l, status: nextStatus } : l)));
      if (activeLead && activeLead.id === id) {
        setActiveLead((prev) => (prev ? { ...prev, status: nextStatus } : null));
      }
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to update lead status.");
    } finally {
      setStatusUpdatingId(null);
    }
  }

  // Delete
  async function handleDelete(id: string, clientName: string) {
    if (
      !confirm(`Are you sure you want to permanently delete lead message from "${clientName}"?`)
    ) {
      return;
    }
    try {
      await deleteLead(id);
      toast.success(`Deleted lead from "${clientName}" successfully.`);
      if (activeLead && activeLead.id === id) {
        setActiveLead(null);
      }
      loadLeads();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to delete lead message.");
    }
  }

  // Filtered List
  const filteredLeads = leads.filter((l) => {
    const matchesSearch =
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.company || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.message || "").toLowerCase().includes(searchQuery.toLowerCase());

    const matchesStatus = statusFilter === "all" || l.status === statusFilter;

    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    new: "bg-[var(--accent-soft)] text-[var(--accent-text)] border-border",
    contacted:
      "bg-[var(--admin-warning-soft)] text-[var(--admin-warning)] border-[var(--admin-warning-border)]",
    in_progress: "bg-[var(--accent-soft)] text-[var(--accent-text)] border-border",
    closed:
      "bg-[var(--admin-success-soft)] text-[var(--admin-success)] border-[var(--admin-success-border)]",
    rejected:
      "bg-[var(--admin-danger-soft)] text-[var(--admin-danger)] border-[var(--admin-danger-border)]",
  };

  return (
    <div className="space-y-6 font-sans text-foreground">
      {/* Search and Filters panel */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-card border border-border p-6 admin-card shadow-sm">
        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search leads by client name, email, company, message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-sm rounded-[var(--radius-control)] bg-muted border border-border focus:outline-none focus:border-border focus:bg-card transition"
            />
          </div>

          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-muted-foreground shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-sm rounded-[var(--radius-control)] bg-muted border border-border px-3 py-2 focus:outline-none focus:border-border font-semibold"
            >
              <option value="all">All Statuses</option>
              <option value="new">New Inbox Only</option>
              <option value="contacted">Contacted</option>
              <option value="in_progress">In Progress</option>
              <option value="closed">Closed / Won</option>
              <option value="rejected">Rejected / Spam</option>
            </select>
          </div>
        </div>
      </div>

      {error && (
        <div className="rounded-[var(--radius-control)] border border-[var(--admin-danger-border)] bg-[var(--admin-danger-soft)] text-[var(--admin-danger)] text-sm px-4 py-3 font-semibold flex items-center gap-2 shadow-xs">
          <AlertCircle className="h-4.5 w-4.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main split listing & detailed panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        {/* Leads catalogue list */}
        <div className="lg:col-span-7 bg-card border border-border admin-card overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-16 flex flex-col items-center justify-center gap-2">
              <Loader2 className="h-7 w-7 animate-spin text-[var(--accent-text)]" />
              <span className="text-sm text-muted-foreground font-medium">
                Loading leads database...
              </span>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-16 text-center text-muted-foreground font-semibold text-sm leading-relaxed">
              No incoming lead messages match the filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-muted border-b border-border text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    <th className="px-6 py-3.5">Client Details</th>
                    <th className="px-6 py-3.5">Status</th>
                    <th className="px-6 py-3.5">Received</th>
                    <th className="px-6 py-3.5 text-right">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border font-medium">
                  {filteredLeads.map((lead) => (
                    <tr
                      key={lead.id}
                      onClick={() => setActiveLead(lead)}
                      className={`hover:bg-muted transition cursor-pointer ${
                        activeLead?.id === lead.id ? "bg-[var(--accent-soft)]" : ""
                      }`}
                    >
                      <td className="px-6 py-3.5">
                        <div className="font-semibold text-foreground text-sm">{lead.name}</div>
                        <div className="text-sm text-muted-foreground font-mono mt-0.5">
                          {lead.email}
                        </div>
                        <div className="text-sm text-muted-foreground font-semibold mt-0.5">
                          {lead.project_type?.replace(/_/g, " ") || "General Inquiry"}
                        </div>
                      </td>
                      <td className="px-6 py-3.5">
                        <span
                          className={`inline-flex items-center px-2 py-0.5 rounded-full border text-sm font-semibold uppercase tracking-wide ${statusColors[lead.status] || "bg-muted border-border"}`}
                        >
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-6 py-3.5 text-muted-foreground font-mono text-sm whitespace-nowrap">
                        {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="px-6 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleDelete(lead.id, lead.name)}
                          className="p-2 text-muted-foreground hover:text-[var(--admin-danger)] hover:bg-[var(--admin-danger-soft)] rounded-[var(--radius-control)] transition cursor-pointer"
                          title="Delete Lead"
                        >
                          <Trash2 className="h-4 w-4" />
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>

        {/* Lead details card panel */}
        <div className="lg:col-span-5 bg-card border border-border shadow-sm admin-card overflow-hidden p-6 min-h-[350px] flex flex-col justify-between">
          {activeLead ? (
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              <div className="space-y-6">
                {/* Panel Header */}
                <div className="flex justify-between items-start border-b border-border pb-4">
                  <div>
                    <h3 className="font-semibold text-foreground text-sm tracking-wide">
                      Lead: {activeLead.name}
                    </h3>
                    <div className="flex items-center gap-2 text-muted-foreground text-sm mt-1 font-semibold">
                      <Mail className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      <a
                        href={`mailto:${activeLead.email}`}
                        className="hover:text-[var(--accent-text)] hover:underline"
                      >
                        {activeLead.email}
                      </a>
                    </div>
                  </div>

                  <span
                    className={`inline-flex px-2.5 py-0.5 rounded-full border text-sm font-semibold uppercase tracking-wider ${statusColors[activeLead.status]}`}
                  >
                    {activeLead.status}
                  </span>
                </div>

                {/* Meta details list */}
                <div className="grid grid-cols-2 gap-4 text-sm font-semibold">
                  {activeLead.company && (
                    <div className="bg-muted border border-border p-2.5 rounded-[var(--radius-control)]">
                      <span className="text-sm uppercase font-semibold text-muted-foreground tracking-wider block mb-0.5">
                        Company
                      </span>
                      <span className="text-foreground flex items-center gap-2">
                        <Briefcase className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                        {activeLead.company}
                      </span>
                    </div>
                  )}

                  <div className="bg-muted border border-border p-2.5 rounded-[var(--radius-control)]">
                    <span className="text-sm uppercase font-semibold text-muted-foreground tracking-wider block mb-0.5">
                      Created Date
                    </span>
                    <span className="text-foreground flex items-center gap-2">
                      <Calendar className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      {activeLead.created_at
                        ? new Date(activeLead.created_at).toLocaleDateString()
                        : "N/A"}
                    </span>
                  </div>

                  <div className="bg-muted border border-border p-2.5 rounded-[var(--radius-control)]">
                    <span className="text-sm uppercase font-semibold text-muted-foreground tracking-wider block mb-0.5">
                      Budget
                    </span>
                    <span className="text-foreground flex items-center gap-2 font-semibold uppercase text-[var(--accent-text)]">
                      <DollarSign className="h-3.5 w-3.5 text-[var(--accent-text)] shrink-0" />
                      {activeLead.budget?.replace(/_/g, " ") || "N/A"}
                    </span>
                  </div>

                  <div className="bg-muted border border-border p-2.5 rounded-[var(--radius-control)] col-span-2">
                    <span className="text-sm uppercase font-semibold text-muted-foreground tracking-wider block mb-0.5">
                      Project Scope / Domain
                    </span>
                    <span className="text-foreground flex items-center gap-2 capitalize font-semibold">
                      <Inbox className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                      {activeLead.project_type?.replace(/_/g, " ") || "General Inquiry"}
                    </span>
                  </div>
                </div>

                {/* Message Body */}
                <div className="bg-muted border border-border p-4.5 admin-card">
                  <div className="flex items-center gap-1 text-sm uppercase font-semibold text-muted-foreground tracking-wider mb-2">
                    <MessageSquare className="h-3.5 w-3.5 text-muted-foreground shrink-0" />
                    <span>Client Message</span>
                  </div>
                  <p className="text-sm text-foreground leading-relaxed font-semibold whitespace-pre-wrap">
                    "{activeLead.message}"
                  </p>
                </div>
              </div>

              {/* Status Update Options */}
              <div className="border-t border-border pt-4 mt-6">
                <label className="block text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2">
                  Update Lead Status Pipeline
                </label>
                <div className="flex gap-2">
                  <select
                    disabled={statusUpdatingId === activeLead.id}
                    value={activeLead.status}
                    onChange={(e) => handleStatusChange(activeLead.id, e.target.value as any)}
                    className="flex-1 text-sm font-semibold rounded-[var(--radius-control)] bg-muted border border-border px-3 py-2.5 focus:outline-none focus:border-border cursor-pointer disabled:opacity-50"
                  >
                    <option value="new">New Inbox</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed / Won</option>
                    <option value="rejected">Rejected / Spam</option>
                  </select>

                  <button
                    onClick={() => handleDelete(activeLead.id, activeLead.name)}
                    className="rounded-[var(--radius-control)] border border-[var(--admin-danger-border)] bg-[var(--admin-danger-soft)] text-[var(--admin-danger)] hover:bg-[var(--admin-danger-soft)] px-4 py-2 text-sm font-semibold transition cursor-pointer"
                    title="Delete permanently"
                  >
                    Delete Message
                  </button>
                </div>
              </div>
            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 text-muted-foreground">
              <Mail className="h-10 w-10 text-muted-foreground stroke-1 mb-3" />
              <h4 className="font-semibold text-sm uppercase tracking-wider text-muted-foreground mb-1">
                Details Viewer
              </h4>
              <p className="text-sm leading-relaxed max-w-xs font-medium">
                Click on any lead record in the inbox catalog to view its full conversation and
                details here.
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
