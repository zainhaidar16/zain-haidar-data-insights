import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { 
  getAdminCertifications, 
  createCertification, 
  updateCertification, 
  deleteCertification 
} from "@/lib/adminApi";
import { Certification } from "@/lib/api";
import { 
  Loader2, Plus, Edit, Trash2, X, Save, AlertCircle, Award, ExternalLink 
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/certifications")({
  head: () => ({
    meta: [{ title: "Certifications CRUD — Zain The Analyst Admin" }]
  }),
  component: AdminCertificationsPage
});

function AdminCertificationsPage() {
  const [certifications, setCertifications] = useState<Certification[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  
  // Editor State
  const [editingCert, setEditingCert] = useState<Certification | null>(null);
  const [isCreateMode, setIsCreateMode] = useState(false);
  const [formLoading, setFormLoading] = useState(false);
  const [formError, setFormError] = useState("");

  // Form Fields
  const [title, setTitle] = useState("");
  const [provider, setProvider] = useState("");
  const [category, setCategory] = useState("");
  const [credentialUrl, setCredentialUrl] = useState("");
  const [sortOrder, setSortOrder] = useState<number>(0);

  // Load Certifications
  async function loadCertifications() {
    setLoading(true);
    setError("");
    try {
      const data = await getAdminCertifications();
      setCertifications(data);
    } catch (err: any) {
      console.error(err);
      setError(err?.message || "Failed to load certifications.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadCertifications();
  }, []);

  // Open Edit Form
  function startEdit(cert: Certification) {
    setEditingCert(cert);
    setIsCreateMode(false);
    setFormError("");

    setTitle(cert.title);
    setProvider(cert.provider || "");
    setCategory(cert.category || "");
    setCredentialUrl(cert.credential_url || "");
    setSortOrder(cert.sort_order || 0);
  }

  // Open Create Form
  function startCreate() {
    setEditingCert(null);
    setIsCreateMode(true);
    setFormError("");

    setTitle("");
    setProvider("");
    setCategory("");
    setCredentialUrl("");
    setSortOrder(certifications.length ? Math.max(...certifications.map(c => c.sort_order || 0)) + 10 : 10);
  }

  // Save changes
  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    if (!title.trim()) {
      setFormError("Title is required.");
      return;
    }

    setFormLoading(true);
    setFormError("");

    const certPayload = {
      title: title.trim(),
      provider: provider.trim() || null,
      category: category.trim() || null,
      credential_url: credentialUrl.trim() || null,
      sort_order: Number(sortOrder) || 0,
    } as any;

    try {
      if (isCreateMode) {
        await createCertification(certPayload);
        toast.success("Certification created successfully!");
      } else if (editingCert) {
        await updateCertification(editingCert.id, certPayload);
        toast.success("Certification updated successfully!");
      }
      setIsCreateMode(false);
      setEditingCert(null);
      loadCertifications();
    } catch (err: any) {
      console.error(err);
      setFormError(err?.message || "Failed to save certification.");
    } finally {
      setFormLoading(false);
    }
  }

  // Delete
  async function handleDelete(id: string, certName: string) {
    if (!confirm(`Delete certification record for "${certName}"?`)) {
      return;
    }
    try {
      await deleteCertification(id);
      toast.success(`Deleted certification "${certName}" successfully.`);
      loadCertifications();
    } catch (err: any) {
      console.error(err);
      toast.error(err?.message || "Failed to delete certification.");
    }
  }

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      
      {/* Create button */}
      {!editingCert && !isCreateMode && (
        <div className="flex justify-end bg-[#0E0E11] border border-slate-200/60 p-5 rounded-2xl shadow-sm">
          <button
            onClick={startCreate}
            className="inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 text-xs font-semibold shadow-md shadow-blue-500/10 cursor-pointer transition shrink-0"
          >
            <Plus className="h-4 w-4" />
            <span>Add Certification</span>
          </button>
        </div>
      )}

      {/* Editor & Creator Form */}
      {(editingCert || isCreateMode) && (
        <div className="bg-[#0E0E11] border border-slate-200/60 shadow-sm rounded-3xl overflow-hidden max-w-2xl mx-auto">
          <div className="px-6 py-4.5 border-b border-slate-200/70 bg-slate-50/50 flex justify-between items-center">
            <div>
              <h3 className="font-bold text-slate-800 text-sm tracking-wide">
                {isCreateMode ? "Add Certification & Course" : `Edit Certification: ${title}`}
              </h3>
              <p className="text-xs text-slate-400 font-medium">
                Include valid credentials links matching your professional achievements.
              </p>
            </div>
            <button
              onClick={() => { setIsCreateMode(false); setEditingCert(null); }}
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

            <div>
              <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">
                Certification Title <span className="text-rose-500">*</span>
              </label>
              <input
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Databricks Associate Developer, Apache Spark"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">
                  Provider / Institution
                </label>
                <input
                  type="text"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  placeholder="e.g. Databricks, Udemy, Kaggle, freeCodeCamp"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition"
                />
              </div>

              <div>
                <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">
                  Category / Classification
                </label>
                <input
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Data Engineering, Visualization, Python"
                  className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition"
                />
              </div>
            </div>

            <div>
              <label className="block text-[10px] font-bold text-slate-455 uppercase tracking-wider mb-1.5">
                Verification / Credential URL
              </label>
              <input
                type="text"
                value={credentialUrl}
                onChange={(e) => setCredentialUrl(e.target.value)}
                placeholder="e.g. https://credentials.databricks.com/xxx"
                className="w-full rounded-xl border border-slate-200 px-4 py-2.5 text-xs focus:outline-none focus:border-blue-600 transition font-mono"
              />
            </div>

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

            {/* Actions */}
            <div className="flex justify-end gap-3 border-t border-slate-100 pt-4">
              <button
                type="button"
                onClick={() => { setIsCreateMode(false); setEditingCert(null); }}
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
                <span>{formLoading ? "Saving Credential..." : "Save Certification"}</span>
              </button>
            </div>

          </form>
        </div>
      )}

      {/* Main Table View */}
      {!editingCert && !isCreateMode && (
        <div className="bg-[#0E0E11] border border-slate-200/60 rounded-3xl overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-16 flex flex-col items-center justify-center gap-2">
              <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
              <span className="text-xs text-slate-450 font-medium">Loading certifications catalogue...</span>
            </div>
          ) : certifications.length === 0 ? (
            <div className="p-16 text-center text-slate-400 font-semibold text-xs leading-relaxed">
              No certifications found. Click "Add Certification" to begin.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-xs">
                <thead>
                  <tr className="bg-slate-50 border-b border-slate-200/80 text-[10px] font-bold uppercase tracking-wider text-slate-455">
                    <th className="px-6 py-3.5">Certification / Course</th>
                    <th className="px-6 py-3.5">Provider</th>
                    <th className="px-6 py-3.5">Category</th>
                    <th className="px-6 py-3.5 text-center">Link</th>
                    <th className="px-6 py-3.5">Sort Order</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100 font-medium">
                  {certifications.map((cert) => (
                    <tr key={cert.id} className="hover:bg-slate-50/40 transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <Award className="h-4 w-4 text-blue-600 shrink-0" />
                          <span className="font-bold text-slate-800 text-xs">{cert.title}</span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-slate-600 font-bold">
                        {cert.provider || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-slate-550">
                        {cert.category || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-center">
                        {cert.credential_url ? (
                          <a
                            href={cert.credential_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex p-1.5 border border-slate-200 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-xl transition"
                            title="Verify Credential Link"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <span className="text-[10px] text-slate-400 font-semibold italic">No Link</span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-slate-450 font-mono font-bold">
                        {cert.sort_order ?? 0}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          
                          <button
                            onClick={() => startEdit(cert)}
                            className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-slate-50 rounded-lg transition cursor-pointer"
                            title="Edit Certification"
                          >
                            <Edit className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => handleDelete(cert.id, cert.title)}
                            className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-lg transition cursor-pointer"
                            title="Delete Certification"
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
