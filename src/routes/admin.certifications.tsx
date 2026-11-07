import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import {
  getAdminCertifications,
  createCertification,
  updateCertification,
  deleteCertification,
} from "@/lib/adminApi";
import { Certification } from "@/lib/api";
import {
  Loader2,
  Plus,
  Edit,
  Trash2,
  X,
  Save,
  AlertCircle,
  Award,
  ExternalLink,
} from "lucide-react";
import { toast } from "sonner";

export const Route = createFileRoute("/admin/certifications")({
  head: () => ({
    meta: [{ title: "Certifications CRUD — zainhaidar Admin" }],
  }),
  component: AdminCertificationsPage,
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
    setSortOrder(
      certifications.length ? Math.max(...certifications.map((c) => c.sort_order || 0)) + 10 : 10,
    );
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
    <div className="space-y-6 font-sans text-foreground">
      {/* Create button */}
      {!editingCert && !isCreateMode && (
        <div className="flex justify-end bg-card border border-border p-6 admin-card shadow-sm">
          <button
            onClick={startCreate}
            className="inline-flex items-center justify-center gap-2 rounded-[var(--radius-control)] bg-primary hover:bg-primary text-primary-foreground px-4 py-2 text-sm font-semibold shadow-md shadow-none cursor-pointer transition shrink-0 admin-action-primary"
          >
            <Plus className="h-4 w-4" />
            <span>Add Certification</span>
          </button>
        </div>
      )}

      {/* Editor & Creator Form */}
      {(editingCert || isCreateMode) && (
        <div className="bg-card border border-border shadow-sm admin-card overflow-hidden max-w-2xl mx-auto">
          <div className="px-6 py-4 border-b border-border bg-muted flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-foreground text-sm tracking-wide">
                {isCreateMode ? "Add Certification & Course" : `Edit Certification: ${title}`}
              </h3>
              <p className="text-sm text-muted-foreground font-medium">
                Include valid credentials links matching your professional achievements.
              </p>
            </div>
            <button
              aria-label="Close editor"
              onClick={() => {
                setIsCreateMode(false);
                setEditingCert(null);
              }}
              className="p-2 rounded-[var(--radius-control)] border border-border text-muted-foreground hover:text-foreground hover:bg-muted transition cursor-pointer"
            >
              <X className="h-4 w-4" />
            </button>
          </div>

          <form onSubmit={handleSave} className="p-6 space-y-6">
            {formError && (
              <div className="rounded-[var(--radius-control)] border border-[var(--admin-danger-border)] bg-[var(--admin-danger-soft)] text-[var(--admin-danger)] text-sm px-4 py-3 font-semibold flex items-center gap-2">
                <AlertCircle className="h-4.5 w-4.5 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            <div>
              <label
                htmlFor="admin-certifications-tsx-field-1"
                className="block text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2"
              >
                Certification Title <span className="text-[var(--admin-danger)]">*</span>
              </label>
              <input
                id="admin-certifications-tsx-field-1"
                type="text"
                required
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="e.g. Databricks Associate Developer, Apache Spark"
                className="w-full rounded-[var(--radius-control)] border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-border transition"
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label
                  htmlFor="admin-certifications-tsx-field-2"
                  className="block text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2"
                >
                  Provider / Institution
                </label>
                <input
                  id="admin-certifications-tsx-field-2"
                  type="text"
                  value={provider}
                  onChange={(e) => setProvider(e.target.value)}
                  placeholder="e.g. Databricks, Udemy, Kaggle, freeCodeCamp"
                  className="w-full rounded-[var(--radius-control)] border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-border transition"
                />
              </div>

              <div>
                <label
                  htmlFor="admin-certifications-tsx-field-3"
                  className="block text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2"
                >
                  Category / Classification
                </label>
                <input
                  id="admin-certifications-tsx-field-3"
                  type="text"
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  placeholder="e.g. Data Engineering, Visualization, Python"
                  className="w-full rounded-[var(--radius-control)] border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-border transition"
                />
              </div>
            </div>

            <div>
              <label
                htmlFor="admin-certifications-tsx-field-4"
                className="block text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2"
              >
                Verification / Credential URL
              </label>
              <input
                id="admin-certifications-tsx-field-4"
                type="text"
                value={credentialUrl}
                onChange={(e) => setCredentialUrl(e.target.value)}
                placeholder="e.g. https://credentials.databricks.com/xxx"
                className="w-full rounded-[var(--radius-control)] border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-border transition font-mono"
              />
            </div>

            <div>
              <label
                htmlFor="admin-certifications-tsx-field-5"
                className="block text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-2"
              >
                Sort Order
              </label>
              <input
                id="admin-certifications-tsx-field-5"
                type="number"
                value={sortOrder}
                onChange={(e) => setSortOrder(Number(e.target.value))}
                className="w-full rounded-[var(--radius-control)] border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-border transition"
              />
            </div>

            {/* Actions */}
            <div className="flex justify-end gap-3 border-t border-border pt-4">
              <button
                type="button"
                onClick={() => {
                  setIsCreateMode(false);
                  setEditingCert(null);
                }}
                className="rounded-[var(--radius-control)] border border-border text-muted-foreground hover:bg-muted px-4 py-2.5 text-sm font-semibold transition cursor-pointer"
              >
                Cancel
              </button>

              <button
                type="submit"
                disabled={formLoading}
                className="inline-flex items-center gap-2 rounded-[var(--radius-control)] bg-primary hover:bg-primary text-primary-foreground px-6 py-2.5 text-sm font-semibold shadow-md shadow-none cursor-pointer disabled:opacity-60 transition admin-action-primary"
              >
                {formLoading ? (
                  <Loader2 className="h-4 w-4 animate-spin text-primary-foreground" />
                ) : (
                  <Save className="h-4 w-4 text-primary-foreground" />
                )}
                <span>{formLoading ? "Saving Credential..." : "Save Certification"}</span>
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Main Table View */}
      {!editingCert && !isCreateMode && (
        <div className="bg-card border border-border admin-card overflow-hidden shadow-sm">
          {loading ? (
            <div className="p-16 flex flex-col items-center justify-center gap-2">
              <Loader2 className="h-7 w-7 animate-spin text-[var(--accent-text)]" />
              <span className="text-sm text-muted-foreground font-medium">
                Loading certifications catalogue...
              </span>
            </div>
          ) : certifications.length === 0 ? (
            <div className="p-16 text-center text-muted-foreground font-semibold text-sm leading-relaxed">
              No certifications found. Click "Add Certification" to begin.
            </div>
          ) : (
            <div className="overflow-x-auto">
              <table className="w-full text-left border-collapse text-sm">
                <thead>
                  <tr className="bg-muted border-b border-border text-sm font-semibold uppercase tracking-wider text-muted-foreground">
                    <th className="px-6 py-3.5">Certification / Course</th>
                    <th className="px-6 py-3.5">Provider</th>
                    <th className="px-6 py-3.5">Category</th>
                    <th className="px-6 py-3.5 text-center">Link</th>
                    <th className="px-6 py-3.5">Sort Order</th>
                    <th className="px-6 py-3.5 text-right">Actions</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-border font-medium">
                  {certifications.map((cert) => (
                    <tr key={cert.id} className="hover:bg-muted transition">
                      <td className="px-6 py-4">
                        <div className="flex items-center gap-2.5">
                          <Award className="h-4 w-4 text-[var(--accent-text)] shrink-0" />
                          <span className="font-semibold text-foreground text-sm">
                            {cert.title}
                          </span>
                        </div>
                      </td>
                      <td className="px-6 py-4 text-muted-foreground font-semibold">
                        {cert.provider || "N/A"}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground">{cert.category || "N/A"}</td>
                      <td className="px-6 py-4 text-center">
                        {cert.credential_url ? (
                          <a
                            href={cert.credential_url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex p-2 border border-border text-muted-foreground hover:text-[var(--accent-text)] hover:bg-muted rounded-[var(--radius-control)] transition"
                            title="Verify Credential Link"
                          >
                            <ExternalLink className="h-3.5 w-3.5" />
                          </a>
                        ) : (
                          <span className="text-sm text-muted-foreground font-semibold italic">
                            No Link
                          </span>
                        )}
                      </td>
                      <td className="px-6 py-4 text-muted-foreground font-mono font-semibold">
                        {cert.sort_order ?? 0}
                      </td>
                      <td className="px-6 py-4 text-right">
                        <div className="inline-flex items-center gap-1">
                          <button
                            onClick={() => startEdit(cert)}
                            className="p-2 text-muted-foreground hover:text-[var(--accent-text)] hover:bg-muted rounded-[var(--radius-control)] transition cursor-pointer"
                            title="Edit Certification"
                          >
                            <Edit className="h-4 w-4" />
                          </button>

                          <button
                            onClick={() => handleDelete(cert.id, cert.title)}
                            className="p-2 text-muted-foreground hover:text-[var(--admin-danger)] hover:bg-[var(--admin-danger-soft)] rounded-[var(--radius-control)] transition cursor-pointer"
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
