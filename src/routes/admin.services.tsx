import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { 
  getAdminServices, 
  createService, 
  updateService, 
  deleteService, 
  generateSlug 
} from "@/lib/adminApi";
import { Service } from "@/lib/api";
import { 
  Loader2, Plus, Edit, Trash2, X, Save, AlertCircle, Settings, Check 
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/services")({
  head: () => ({
    meta: [{ title: "Services CMS — Zain The Analyst Admin" }]
  }),
  component: AdminServicesPage
});

function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Editor State
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // Form Fields
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [shortDescription, setShortDescription] = useState("");
  const [icon, setIcon] = useState("");
  const [sortOrder, setSortOrder] = useState<number>(0);
  const [isActive, setIsActive] = useState(true);

  // Load Services
  async function loadServices() {
    setLoading(true);
    setError("");
    try {
      const data = await getAdminServices();
      setServices(data);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to load services catalogue.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  // Title change triggers slug auto generation
  function handleTitleChange(val: string) {
    setTitle(val);
    if (isCreateMode || (editingService && slug === generateSlug(editingService.title))) {
      setSlug(generateSlug(val));
    }
  }

  // Open Edit Form
  function startEdit(service: Service) {
    setEditingService(service);
    setIsCreateMode(false);
    setFormError("");

    setTitle(service.title);
    setSlug(service.slug);
    setShortDescription(service.short_description || "");
    setIcon(service.icon || "");
    setSortOrder(service.sort_order || 0);
    setIsActive(service.is_active);
  }

  // Open Create Form
  function startCreate() {
    setEditingService(null);
    setIsCreateMode(true);
    setFormError("");

    setTitle("");
    setSlug("");
    setShortDescription("");
    setIcon("");
    setSortOrder(services.length ? Math.max(...services.map(s => s.sort_order || 0)) + 10 : 10);
    setIsActive(true);
  }

  // Save changes
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setFormError("Title is required.");
      return;
    }
    if (!slug.trim()) {
      setFormError("Slug is required.");
      return;
    }
    if (!shortDescription.trim()) {
      setFormError("Short Description is required.");
      return;
    }

    setFormLoading(true);
    setFormError("");

    const servicePayload = {
      title: title.trim(),
      slug: slug.trim().toLowerCase(),
      short_description: shortDescription.trim(),
      icon: icon.trim() || null,
      sort_order: Number(sortOrder) || 0,
      is_active: isActive,
    } as any;

    try {
      if (isCreateMode) {
        await createService(servicePayload);
        toast.success("Service offering created successfully!");
      } else if (editingService) {
        await updateService(editingService.id, servicePayload);
        toast.success("Service offering updated successfully!");
      }
      setIsCreateMode(false);
      setEditingService(null);
      loadServices();
    } catch (err: any) {
      console.error(err);
      setFormError(err?.message || "Failed to save service offering.");
    } finally {
      setFormLoading(false);
    }
  }

  // Delete
  async function handleDelete(id: string, name: string) {
    if (!confirm(`Delete service offering "${name}"?`)) {
      return;
    }
    try {
      await deleteService(id);
      toast.success(`Deleted service offering "${name}" successfully.`);
      loadServices();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to delete service.");
    }
  }

  // Toggle active state
  async function toggleActive(service: Service) {
    try {
      await updateService(service.id, { is_active: !service.is_active });
      toast.success(`Service status toggled.`);
      loadServices();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to toggle active state.");
    }
  }

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      
      {/* Create row */}
      {!editingService && !isCreateMode && (
        <div className="flex justify-end bg-white border border-slate-200/60 p-5 rounded-2xl shadow-sm">
          <button
            onClick={startCreate}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-semibold shadow-md shadow-blue-500/10 cursor-pointer transition shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Add Service</span>
          </button>
        </div>
      )}

      {/* Editor & Creator Form */}
      {(editingService || isCreateMode) && (
        <div className="bg-white border border-slate-200/60 shadow-sm rounded-3xl overflow-hidden max-w-2xl mx-auto">
          <div className="px-6 py-4.5 border-b border-slate-200/70 bg-slate-50/50 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-800 text-sm tracking-wide">
                {isCreateMode ? "Add Service Offering" : `Edit Service: ${title}`}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Services populate the core homepage cards showing your technical domains.
              </p>
            </div>
            <button
              onClick={() => { setIsCreateMode(false); setEditingService(null); }}
              className="p-1.5 rounded-lg border border-slate-200 text-slate-400 hover:text-slate-700 hover:bg-slate-50 transition cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="p-6 space-y-5">
            
            {formError && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 text-rose-600 text-xs px-4 py-3 font-semibold flex items-center gap-2">
                <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">
                  Service Title <span className="text-rose-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  value={title}
                  onChange={(e) => handleTitleChange(e.target.value)}
                  placeholder="e.g. Business Intelligence"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5 flex justify-between">
                  <span>URL Slug <span className="text-rose-500">*</span></span>
                  <button
                    type="button"
                    onClick={() => setSlug(generateSlug(title))}
                    className="text-[9px] font-extrabold text-blue-600 uppercase tracking-wider animate-pulse-slow"
                  >
                    Auto
                  </button>
                </label>
                <input
                  type="text"
                  required
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  placeholder="e.g. business-intelligence"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition font-mono"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">
                Lucide Icon Name
              </label>
              <input
                type="text"
                value={icon}
                onChange={(e) => setIcon(e.target.value)}
                placeholder="e.g. BarChart, Database, LineChart, Code (Leave empty for default Settings)"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition font-mono"
              />
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">
                Short Service Offering Description <span className="text-rose-500">*</span>
              </label>
              <textarea
                required
                value={shortDescription}
                onChange={(e) => setShortDescription(e.target.value)}
                placeholder="Brief summary bullet describing the technical consulting scope of this service."
                rows={3}
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">
                  Sort Order
                </label>
                <input
                  type="number"
                  value={sortOrder}
                  onChange={(e) => setSortOrder(Number(e.target.value))}
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition"
                />
              </div>

              <div className="flex flex-col justify-end pb-2">
                <div className="flex items-center gap-1.5">
                  <input
                    type="checkbox"
                    id="isActive"
                    checked={isActive}
                    onChange={(e) => setIsActive(e.target.checked)}
                    className="h-4 w-4 text-blue-600 border-slate-300 rounded cursor-pointer"
                  />
                  <label htmlFor="isActive" className="text-[10px] font-bold text-slate-700 cursor-pointer select-none">
                    Is Offering Active / Visible?
                  </label>
                </div>
              </div>
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => { setIsCreateMode(false); setEditingService(null); }}
                className="rounded-xl border border-slate-200 text-slate-500 hover:bg-slate-50 px-4 py-2.5 text-xs font-semibold transition cursor-pointer"
              >
                Cancel
              </button>
              
              <button
                type="submit"
                disabled={formLoading}
                className="inline-flex items-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-2.5 text-xs font-semibold shadow-md shadow-blue-500/10 cursor-pointer disabled:opacity-60 transition"
              >
                {formLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-white" />
                ) : (
                  <Save className="h-4 w-4 text-white" />
                )}
                <span>{formLoading ? "Saving Service..." : "Save Service"}</span>
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Main Table view of all services */}
      {!editingService && !isCreateMode && (
        <div className="bg-white border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-16 flex flex-col items-center justify-center gap-2">
              <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
              <span className="text-xs text-slate-450 font-medium">Loading services checklist...</span>
            </div>
          ) : services.length === 0 ? (
            <div className="p-16 text-center text-slate-400 font-semibold text-xs leading-relaxed">
              No services found. Click "Add Service" to build an offering.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/80 text-[10px] font-bold uppercase tracking-wider text-slate-455">
                    <th className="px-6 py-3.5">Service Details</th>
                    <th className="px-6 py-3.5">Icon Field</th>
                    <th className="px-6 py-3.5">Short Summary</th>
                    <th className="px-6 py-3.5">Active</th>
                    <th className="px-6 py-3.5">Sort Order</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {services.map((s) => (
                    <tr key={s.id} className="hover:bg-slate-50/40 transition">
                      <td className="px-6 py-4">
                        <div>
                          <div className="font-bold text-slate-800 text-xs flex items-center gap-2">
                            <Settings className="h-4.5 w-4.5 text-blue-600 shrink-0" />
                            <span>{s.title}</span>
                          </div>
                          <div className="text-[10px] text-slate-400 font-mono mt-0.5">slug: /{s.slug}</div>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-500 font-mono text-[10px]">
                        {s.icon || "default"}
                      </td>
                      <td className="px-6 py-4 text-slate-650 truncate max-w-xs font-semibold">
                        {s.short_description}
                      </td>
                      <td className="px-6 py-4">
                        <button
                          onClick={() => toggleActive(s)}
                          className={`inline-flex items-center px-2.5 py-0.5 rounded-full border text-[10px] font-bold uppercase tracking-wide transition cursor-pointer ${
                            s.is_active 
                              ? "bg-emerald-50 text-emerald-600 border-emerald-100" 
                              : "bg-slate-50 text-slate-450 border-slate-200"
                          }`}
                          title="Toggle Active Status"
                        >
                          {s.is_active ? "Active" : "Inactive"}
                        </button>
                      </td>
                      <td className="px-6 py-4 text-slate-450 font-mono font-bold">
                        {s.sort_order ?? 0}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          
                          <button
                            onClick={() => startEdit(s)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition cursor-pointer"
                            title="Edit Service"
                          >
                            <Edit className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => handleDelete(s.id, s.title)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                            title="Delete Service"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      )}

    </div>
  );
}
