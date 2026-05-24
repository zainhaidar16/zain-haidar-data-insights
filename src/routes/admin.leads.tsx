import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { 
  getAdminLeads, 
  updateLeadStatus, 
  deleteLead,
  Lead
} from "@/lib/adminApi";
import { 
  Loader2, Search, Filter, Trash2, X, AlertCircle, 
  Mail, Calendar, Briefcase, DollarSign, MessageSquare, Inbox
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/leads")({
  head: () => ({
    meta: [{ title: "Leads Inbox — Zain The Analyst Admin" }]
  }),
  component: AdminLeadsPage
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
      setLeads(prev => prev.map(l => l.id === id ? { ...l, status: nextStatus } : l));
      if (activeLead && activeLead.id === id) {
        setActiveLead(prev => prev ? { ...prev, status: nextStatus } : null);
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
    if (!confirm(`Are you sure you want to permanently delete lead message from "${clientName}"?`)) {
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
  const filteredLeads = leads.filter(l => {
    const matchesSearch = 
      l.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      l.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.company || "").toLowerCase().includes(searchQuery.toLowerCase()) ||
      (l.message || "").toLowerCase().includes(searchQuery.toLowerCase());
    
    const matchesStatus = statusFilter === "all" || l.status === statusFilter;
    
    return matchesSearch && matchesStatus;
  });

  const statusColors = {
    new: "bg-blue-50 text-blue-600 border-blue-100",
    contacted: "bg-amber-50 text-amber-600 border-amber-100",
    in_progress: "bg-purple-50 text-purple-600 border-purple-100",
    closed: "bg-emerald-50 text-emerald-600 border-emerald-100",
    rejected: "bg-rose-50 text-rose-600 border-rose-100",
  };

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      
      {/* Search and Filters panel */}
      <div className="flex flex-col sm:flex-row justify-between items-stretch sm:items-center gap-4 bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm">
        <div className="flex-1 flex flex-col sm:flex-row gap-3">
          <div className="relative flex-1">
            <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" />
            <input
              type="text"
              placeholder="Search leads by client name, email, company, message..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2 text-xs rounded-xl bg-slate-50 border border-slate-200 focus:outline-none focus:border-blue-600 focus:bg-white transition"
            />
          </div>
          
          <div className="flex items-center gap-2">
            <Filter className="h-4 w-4 text-slate-400 shrink-0" />
            <select
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
              className="text-xs rounded-xl bg-slate-50 border border-slate-200 px-3 py-2 focus:outline-none focus:border-blue-600 font-semibold"
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
        <div className="rounded-xl border border-rose-200 bg-rose-50 text-rose-650 text-xs px-4 py-3 font-semibold flex items-center gap-2 shadow-xs">
          <AlertCircle className="h-4.5 w-4.5 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      {/* Main split listing & detailed panel layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        
        {/* Leads catalogue list */}
        <div className="lg:col-span-7 bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-16 flex flex-col items-center justify-center gap-2">
              <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
              <span className="text-xs text-slate-450 font-medium">Loading leads database...</span>
            </div>
          ) : filteredLeads.length === 0 ? (
            <div className="p-16 text-center text-slate-400 font-semibold text-xs leading-relaxed">
              No incoming lead messages match the filters.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/80 text-[10px] font-bold uppercase tracking-wider text-slate-455">
                    <th className="px-5 py-3.5">Client Details</th>
                    <th className="px-5 py-3.5">Status</th>
                    <th className="px-5 py-3.5">Received</th>
                    <th className="px-5 py-3.5 text-right">Delete</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {filteredLeads.map((lead) => (
                    <tr 
                      key={lead.id} 
                      onClick={() => setActiveLead(lead)}
                      className={`hover:bg-slate-50/40 transition cursor-pointer ${
                        activeLead?.id === lead.id ? "bg-blue-50/20" : ""
                      }`}
                    >
                      <td className="px-5 py-3.5">
                        <div className="font-bold text-slate-800 text-xs">{lead.name}</div>
                        <div className="text-[10px] text-slate-400 font-mono mt-0.5">{lead.email}</div>
                        <div className="text-[10px] text-slate-500 font-semibold mt-0.5">
                          {lead.project_type?.replace(/_/g, " ") || "General Inquiry"}
                        </div>
                      </td>
                      <td className="px-5 py-3.5">
                        <span className={`inline-flex items-center px-2 py-0.5 rounded-full border text-[9px] font-bold uppercase tracking-wide ${statusColors[lead.status] || "bg-slate-100 border-slate-200"}`}>
                          {lead.status}
                        </span>
                      </td>
                      <td className="px-5 py-3.5 text-slate-400 font-mono text-[10px] whitespace-nowrap">
                        {lead.created_at ? new Date(lead.created_at).toLocaleDateString() : "N/A"}
                      </td>
                      <td className="px-5 py-3.5 text-right" onClick={(e) => e.stopPropagation()}>
                        <button
                          onClick={() => handleDelete(lead.id, lead.name)}
                          className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
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
        <div className="lg:col-span-5 bg-white border border-slate-200/60 shadow-sm rounded-3xl overflow-hidden p-6 min-h-[350px] flex flex-col justify-between">
          {activeLead ? (
            <div className="space-y-6 flex-1 flex flex-col justify-between">
              
              <div className="space-y-5">
                
                {/* Panel Header */}
                <div className="flex justify-between items-start border-b border-slate-100 pb-4">
                  <div>
                    <h3 className="font-bold text-slate-800 text-sm tracking-wide">
                      Lead: {activeLead.name}
                    </h3>
                    <div className="flex items-center gap-1.5 text-slate-400 text-[10px] mt-1 font-semibold">
                      <Mail className="h-3.5 w-3.5 text-slate-350 shrink-0" />
                      <a href={`mailto:${activeLead.email}`} className="hover:text-blue-600 hover:underline">{activeLead.email}</a>
                    </div>
                  </div>
                  
                  <span className={`inline-flex px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wider ${statusColors[activeLead.status]}`}>
                    {activeLead.status}
                  </span>
                </div>

                {/* Meta details list */}
                <div className="grid grid-cols-2 gap-4 text-xs font-semibold">
                  {activeLead.company && (
                    <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                      <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block mb-0.5">Company</span>
                      <span className="text-slate-700 flex items-center gap-1.5">
                        <Briefcase className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                        {activeLead.company}
                      </span>
                    </div>
                  )}

                  <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                    <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block mb-0.5">Created Date</span>
                    <span className="text-slate-700 flex items-center gap-1.5">
                      <Calendar className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      {activeLead.created_at ? new Date(activeLead.created_at).toLocaleDateString() : "N/A"}
                    </span>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl">
                    <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block mb-0.5">Budget</span>
                    <span className="text-slate-700 flex items-center gap-1.5 font-bold uppercase text-blue-600">
                      <DollarSign className="h-3.5 w-3.5 text-blue-500 shrink-0" />
                      {activeLead.budget?.replace(/_/g, " ") || "N/A"}
                    </span>
                  </div>

                  <div className="bg-slate-50 border border-slate-100 p-2.5 rounded-xl col-span-2">
                    <span className="text-[9px] uppercase font-bold text-slate-400 tracking-wider block mb-0.5">Project Scope / Domain</span>
                    <span className="text-slate-700 flex items-center gap-1.5 capitalize font-bold">
                      <Inbox className="h-3.5 w-3.5 text-slate-400 shrink-0" />
                      {activeLead.project_type?.replace(/_/g, " ") || "General Inquiry"}
                    </span>
                  </div>
                </div>

                {/* Message Body */}
                <div className="bg-slate-50 border border-slate-150/40 p-4.5 rounded-2xl">
                  <div className="flex items-center gap-1 text-[9px] uppercase font-bold text-slate-400 tracking-wider mb-2">
                    <MessageSquare className="h-3.5 w-3.5 text-slate-350 shrink-0" />
                    <span>Client Message</span>
                  </div>
                  <p className="text-xs text-slate-700 leading-relaxed font-semibold whitespace-pre-wrap">
                    "{activeLead.message}"
                  </p>
                </div>

              </div>

              {/* Status Update Options */}
              <div className="border-t border-slate-100 pt-4 mt-6">
                <label className="block text-[9px] font-bold text-slate-400 uppercase tracking-wider mb-2">
                  Update Lead Status Pipeline
                </label>
                <div className="flex gap-2">
                  <select
                    disabled={statusUpdatingId === activeLead.id}
                    value={activeLead.status}
                    onChange={(e) => handleStatusChange(activeLead.id, e.target.value as any)}
                    className="flex-1 text-xs font-semibold rounded-xl bg-slate-50 border border-slate-200 px-3 py-2.5 focus:outline-none focus:border-blue-600 cursor-pointer disabled:opacity-50"
                  >
                    <option value="new">New Inbox</option>
                    <option value="contacted">Contacted</option>
                    <option value="in_progress">In Progress</option>
                    <option value="closed">Closed / Won</option>
                    <option value="rejected">Rejected / Spam</option>
                  </select>

                  <button
                    onClick={() => handleDelete(activeLead.id, activeLead.name)}
                    className="rounded-xl border border-rose-250 bg-rose-50 text-rose-600 hover:bg-rose-100 px-4 py-2 text-xs font-semibold transition cursor-pointer"
                    title="Delete permanently"
                  >
                    Delete Message
                  </button>
                </div>
              </div>

            </div>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center text-center p-12 text-slate-400">
              <Mail className="h-10 w-10 text-slate-300 stroke-1 mb-3" />
              <h4 className="font-bold text-xs uppercase tracking-wider text-slate-450 mb-1">
                Details Viewer
              </h4>
              <p className="text-[11px] leading-relaxed max-w-xs font-medium">
                Click on any lead record in the inbox catalog to view its full conversation and details here.
              </p>
            </div>
          )}
        </div>

      </div>

    </div>
  );
}
