import { createFileRoute } from "@tanstack/react-router";
import ReactMarkdown from "react-markdown";
import { useEffect, useMemo, useState } from "react";
import {
  AlertCircle,
  ArrowDown,
  ArrowUp,
  Check,
  Edit,
  Eye,
  EyeOff,
  GripVertical,
  Loader2,
  Plus,
  RefreshCw,
  Save,
  Search,
  Settings,
  Sparkles,
  Trash2,
  X,
} from "lucide-react";
import { toast } from "sonner";
import {
  createService,
  deleteService,
  generateSlug,
  getAdminServices,
  updateService,
} from "@/lib/adminApi";
import { Service } from "@/lib/api";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";

export const Route = createFileRoute("/admin/services")({
  head: () => ({
    meta: [{ title: "Services CMS - Zain The Analyst Admin" }],
  }),
  component: AdminServicesPage,
});

type ProcessStep = { title: string; description: string };
type FaqItem = { question: string; answer: string };

type ServiceFormState = {
  title: string;
  slug: string;
  short_description: string;
  icon: string;
  sort_order: number;
  is_active: boolean;
  hero_title: string;
  hero_description: string;
  full_description: string;
  problems_solved: string[];
  deliverables: string[];
  benefits: string[];
  technologies: string[];
  process_steps: ProcessStep[];
  faq: FaqItem[];
  cta_title: string;
  cta_description: string;
};

const emptyForm: ServiceFormState = {
  title: "",
  slug: "",
  short_description: "",
  icon: "",
  sort_order: 10,
  is_active: true,
  hero_title: "",
  hero_description: "",
  full_description: "",
  problems_solved: [],
  deliverables: [],
  benefits: [],
  technologies: [],
  process_steps: [],
  faq: [],
  cta_title: "",
  cta_description: "",
};

function AdminServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState("");
  const [formError, setFormError] = useState("");
  const [query, setQuery] = useState("");
  const [editorMode, setEditorMode] = useState<"create" | "edit" | null>(null);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [form, setForm] = useState<ServiceFormState>(emptyForm);
  const [savedSnapshot, setSavedSnapshot] = useState(stableStringify(emptyForm));
  const [previewMarkdown, setPreviewMarkdown] = useState(false);

  const isDirty = editorMode !== null && stableStringify(form) !== savedSnapshot;

  const filteredServices = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return services
      .slice()
      .sort((a, b) => (a.sort_order ?? 0) - (b.sort_order ?? 0))
      .filter((service) => {
        if (!needle) return true;
        return [
          service.title,
          service.slug,
          service.short_description,
          service.hero_title,
          service.hero_description,
        ]
          .filter(Boolean)
          .some((value) => value!.toLowerCase().includes(needle));
      });
  }, [query, services]);

  async function loadServices() {
    setLoading(true);
    setError("");

    try {
      const data = await getAdminServices();
      setServices(data);
    } catch (err: any) {
      console.error("Failed to load services:", err);
      setError(err?.message || "Failed to load services from Supabase.");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadServices();
  }, []);

  useEffect(() => {
    if (!isDirty) return;

    const handleBeforeUnload = (event: BeforeUnloadEvent) => {
      event.preventDefault();
      event.returnValue = "";
    };

    window.addEventListener("beforeunload", handleBeforeUnload);
    return () => window.removeEventListener("beforeunload", handleBeforeUnload);
  }, [isDirty]);

  function patchForm(patch: Partial<ServiceFormState>) {
    setForm((current) => ({ ...current, ...patch }));
  }

  function handleTitleChange(value: string) {
    setForm((current) => {
      const previousGeneratedSlug = generateSlug(current.title);
      const shouldAutoSlug =
        editorMode === "create" || !current.slug || current.slug === previousGeneratedSlug;

      return {
        ...current,
        title: value,
        slug: shouldAutoSlug ? generateSlug(value) : current.slug,
      };
    });
  }

  function startCreate() {
    const nextForm = {
      ...emptyForm,
      sort_order: services.length
        ? Math.max(...services.map((service) => service.sort_order || 0)) + 10
        : 10,
    };

    setForm(nextForm);
    setSavedSnapshot(stableStringify(nextForm));
    setEditingService(null);
    setEditorMode("create");
    setFormError("");
    setPreviewMarkdown(false);
  }

  function startEdit(service: Service) {
    const nextForm = serviceToForm(service);

    setForm(nextForm);
    setSavedSnapshot(stableStringify(nextForm));
    setEditingService(service);
    setEditorMode("edit");
    setFormError("");
    setPreviewMarkdown(false);
  }

  function requestCloseEditor() {
    if (isDirty && !window.confirm("Discard unsaved service changes?")) {
      return;
    }

    closeEditor();
  }

  function closeEditor() {
    setEditorMode(null);
    setEditingService(null);
    setForm(emptyForm);
    setSavedSnapshot(stableStringify(emptyForm));
    setFormError("");
    setPreviewMarkdown(false);
  }

  async function handleSave(event: React.FormEvent) {
    event.preventDefault();

    const validationError = validateForm(form, services, editingService?.id);
    if (validationError) {
      setFormError(validationError);
      return;
    }

    setSaving(true);
    setFormError("");

    const payload = formToPayload(form);

    try {
      if (editorMode === "create") {
        await createService(payload as Omit<Service, "id" | "created_at" | "updated_at">);
        toast.success("Service created.");
      } else if (editingService) {
        await updateService(editingService.id, payload);
        toast.success("Service updated.");
      }

      await loadServices();
      closeEditor();
    } catch (err: any) {
      console.error("Failed to save service:", err);
      const message =
        err?.code === "23505"
          ? "That slug already exists. Choose a unique slug."
          : err?.message || "Failed to save service.";
      setFormError(message);
      toast.error(message);
    } finally {
      setSaving(false);
    }
  }

  async function handleDelete(service: Service) {
    if (!window.confirm(`Delete "${service.title}"? This cannot be undone.`)) {
      return;
    }

    try {
      await deleteService(service.id);
      toast.success("Service deleted.");
      await loadServices();
      if (editingService?.id === service.id) closeEditor();
    } catch (err: any) {
      console.error("Failed to delete service:", err);
      toast.error(err?.message || "Failed to delete service.");
    }
  }

  async function toggleActive(service: Service) {
    try {
      await updateService(service.id, { is_active: !service.is_active });
      setServices((current) =>
        current.map((item) =>
          item.id === service.id ? { ...item, is_active: !item.is_active } : item,
        ),
      );
      toast.success(service.is_active ? "Service set inactive." : "Service set active.");
    } catch (err: any) {
      console.error("Failed to update service status:", err);
      toast.error(err?.message || "Failed to update active status.");
    }
  }

  return (
    <div className="space-y-6 font-poppins text-slate-800">
      <div className="rounded-3xl border border-slate-200/70 bg-[#0E0E11] p-5 shadow-sm">
        <div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
          <div>
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-blue-600">
              <Sparkles className="h-3.5 w-3.5" />
              Services Management
            </div>
            <h3 className="mt-1 text-lg font-extrabold tracking-tight text-slate-950">
              Service detail control panel
            </h3>
            <p className="mt-1 max-w-2xl text-xs font-medium leading-relaxed text-slate-500">
              Manage every service row directly from Supabase using the existing services table.
            </p>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative min-w-0 sm:w-72">
              <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <Input
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search title, slug, description..."
                className="h-10 rounded-xl border-slate-200 bg-slate-50 pl-9 text-xs shadow-none focus-visible:ring-blue-500/30"
              />
            </div>

            <Button
              type="button"
              variant="dark"
              size="sm"
              onClick={startCreate}
              className="h-10 rounded-xl"
            >
              <Plus className="h-4 w-4" />
              New Service
            </Button>
          </div>
        </div>
      </div>

      {error && (
        <div className="flex items-start gap-3 rounded-2xl border border-rose-200 bg-rose-50 px-4 py-3 text-xs font-semibold text-rose-700">
          <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
          <span>{error}</span>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1fr)_minmax(520px,0.95fr)]">
        <section className="min-w-0 rounded-3xl border border-slate-200/70 bg-[#0E0E11] shadow-sm">
          <div className="flex flex-col gap-3 border-b border-slate-200/70 px-5 py-4 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h4 className="text-sm font-bold text-slate-900">All Services</h4>
              <p className="text-[11px] font-medium text-slate-400">
                Sorted by sort_order. {filteredServices.length} of {services.length} shown.
              </p>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              onClick={loadServices}
              disabled={loading}
              className="rounded-xl text-xs"
            >
              <RefreshCw className={`h-3.5 w-3.5 ${loading ? "animate-spin" : ""}`} />
              Refresh
            </Button>
          </div>

          {loading ? (
            <div className="flex min-h-80 flex-col items-center justify-center gap-3 p-10">
              <Loader2 className="h-7 w-7 animate-spin text-blue-600" />
              <span className="text-xs font-semibold text-slate-400">
                Loading services from Supabase...
              </span>
            </div>
          ) : filteredServices.length === 0 ? (
            <div className="flex min-h-80 flex-col items-center justify-center p-10 text-center">
              <Settings className="mb-3 h-8 w-8 text-slate-300" />
              <h4 className="text-sm font-bold text-slate-700">No services found</h4>
              <p className="mt-1 max-w-sm text-xs font-medium text-slate-400">
                Try a different search, or create a new service record.
              </p>
            </div>
          ) : (
            <div className="divide-y divide-slate-100">
              {filteredServices.map((service) => (
                <ServiceRow
                  key={service.id}
                  service={service}
                  isSelected={editingService?.id === service.id}
                  onEdit={() => startEdit(service)}
                  onDelete={() => handleDelete(service)}
                  onToggle={() => toggleActive(service)}
                />
              ))}
            </div>
          )}
        </section>

        <section className="min-w-0">
          {editorMode ? (
            <form
              onSubmit={handleSave}
              className="rounded-3xl border border-slate-200/70 bg-[#0E0E11] shadow-sm"
            >
              <div className="sticky top-0 z-10 rounded-t-3xl border-b border-slate-200/70 bg-[#0E0E11]/95 px-5 py-4 backdrop-blur">
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <h4 className="text-sm font-bold text-slate-950">
                      {editorMode === "create" ? "Create Service" : "Edit Service"}
                    </h4>
                    <p className="mt-0.5 text-[11px] font-medium text-slate-400">
                      {isDirty ? "Unsaved changes" : "All changes saved"}
                    </p>
                  </div>
                  <button
                    type="button"
                    onClick={requestCloseEditor}
                    className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-100 hover:text-slate-700"
                    aria-label="Close editor"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>

                {formError && (
                  <div className="mt-4 flex items-start gap-2 rounded-xl border border-rose-200 bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-700">
                    <AlertCircle className="mt-0.5 h-4 w-4 shrink-0" />
                    <span>{formError}</span>
                  </div>
                )}
              </div>

              <div className="max-h-none space-y-6 p-5 xl:max-h-[calc(100vh-15rem)] xl:overflow-y-auto">
                <EditorSection title="Basic Information">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Field label="Title" required>
                      <Input
                        value={form.title}
                        onChange={(event) => handleTitleChange(event.target.value)}
                        className="rounded-xl border-slate-200 text-sm"
                        placeholder="Business Intelligence"
                      />
                    </Field>

                    <Field
                      label="Slug"
                      required
                      action={
                        <button
                          type="button"
                          onClick={() => patchForm({ slug: generateSlug(form.title) })}
                          className="text-[10px] font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700"
                        >
                          Generate
                        </button>
                      }
                    >
                      <Input
                        value={form.slug}
                        onChange={(event) => patchForm({ slug: generateSlug(event.target.value) })}
                        className="rounded-xl border-slate-200 font-mono text-sm"
                        placeholder="business-intelligence"
                      />
                    </Field>
                  </div>

                  <div className="grid gap-4 sm:grid-cols-[minmax(0,1fr)_130px]">
                    <Field label="Icon">
                      <Input
                        value={form.icon}
                        onChange={(event) => patchForm({ icon: event.target.value })}
                        className="rounded-xl border-slate-200 font-mono text-sm"
                        placeholder="BarChart2"
                      />
                    </Field>

                    <Field label="Sort Order">
                      <Input
                        type="number"
                        value={form.sort_order}
                        onChange={(event) => patchForm({ sort_order: Number(event.target.value) })}
                        className="rounded-xl border-slate-200 text-sm"
                      />
                    </Field>
                  </div>

                  <Field label="Short Description">
                    <Textarea
                      value={form.short_description}
                      onChange={(event) => patchForm({ short_description: event.target.value })}
                      rows={3}
                      className="rounded-xl border-slate-200 text-sm"
                      placeholder="Short summary used on service cards."
                    />
                  </Field>

                  <div className="flex items-center justify-between rounded-2xl border border-slate-200 bg-slate-50 px-4 py-3">
                    <div>
                      <div className="text-xs font-bold text-slate-800">Active Status</div>
                      <div className="text-[11px] font-medium text-slate-400">
                        Active services appear on the public site.
                      </div>
                    </div>
                    <Switch
                      checked={form.is_active}
                      onCheckedChange={(checked) => patchForm({ is_active: checked })}
                    />
                  </div>
                </EditorSection>

                <EditorSection title="Hero Section">
                  <Field label="Hero Title" required>
                    <Input
                      value={form.hero_title}
                      onChange={(event) => patchForm({ hero_title: event.target.value })}
                      className="rounded-xl border-slate-200 text-sm"
                      placeholder="Turn operational data into executive clarity"
                    />
                  </Field>

                  <Field label="Hero Description" required>
                    <Textarea
                      value={form.hero_description}
                      onChange={(event) => patchForm({ hero_description: event.target.value })}
                      rows={4}
                      className="rounded-xl border-slate-200 text-sm"
                      placeholder="Service page hero summary."
                    />
                  </Field>
                </EditorSection>

                <EditorSection
                  title="Service Content"
                  action={
                    <button
                      type="button"
                      onClick={() => setPreviewMarkdown((current) => !current)}
                      className="inline-flex items-center gap-1 text-[10px] font-bold uppercase tracking-wider text-blue-600 hover:text-blue-700"
                    >
                      {previewMarkdown ? (
                        <EyeOff className="h-3.5 w-3.5" />
                      ) : (
                        <Eye className="h-3.5 w-3.5" />
                      )}
                      {previewMarkdown ? "Edit" : "Preview"}
                    </button>
                  }
                >
                  {previewMarkdown ? (
                    <div className="min-h-48 rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm leading-relaxed text-slate-700">
                      {form.full_description.trim() ? (
                        <ReactMarkdown>{form.full_description}</ReactMarkdown>
                      ) : (
                        <span className="text-slate-400">Nothing to preview yet.</span>
                      )}
                    </div>
                  ) : (
                    <Textarea
                      value={form.full_description}
                      onChange={(event) => patchForm({ full_description: event.target.value })}
                      rows={9}
                      className="rounded-xl border-slate-200 font-mono text-sm leading-relaxed"
                      placeholder="Markdown supported. Add the full service description here."
                    />
                  )}
                </EditorSection>

                <EditorSection title="JSON Array Editors">
                  <div className="grid gap-5">
                    <TagInput
                      label="Problems Solved"
                      values={form.problems_solved}
                      placeholder="Problem 1"
                      onChange={(values) => patchForm({ problems_solved: values })}
                    />
                    <TagInput
                      label="Deliverables"
                      values={form.deliverables}
                      placeholder="Deliverable 1"
                      onChange={(values) => patchForm({ deliverables: values })}
                    />
                    <TagInput
                      label="Benefits"
                      values={form.benefits}
                      placeholder="Benefit 1"
                      onChange={(values) => patchForm({ benefits: values })}
                    />
                    <TagInput
                      label="Technologies"
                      values={form.technologies}
                      placeholder="Power BI"
                      onChange={(values) => patchForm({ technologies: values })}
                    />
                  </div>
                </EditorSection>

                <EditorSection title="Process Steps">
                  <ProcessStepsEditor
                    steps={form.process_steps}
                    onChange={(steps) => patchForm({ process_steps: steps })}
                  />
                </EditorSection>

                <EditorSection title="FAQ">
                  <FaqEditor items={form.faq} onChange={(items) => patchForm({ faq: items })} />
                </EditorSection>

                <EditorSection title="CTA Section">
                  <Field label="CTA Title">
                    <Input
                      value={form.cta_title}
                      onChange={(event) => patchForm({ cta_title: event.target.value })}
                      className="rounded-xl border-slate-200 text-sm"
                      placeholder="Ready to build this?"
                    />
                  </Field>

                  <Field label="CTA Description">
                    <Textarea
                      value={form.cta_description}
                      onChange={(event) => patchForm({ cta_description: event.target.value })}
                      rows={3}
                      className="rounded-xl border-slate-200 text-sm"
                      placeholder="Short CTA supporting copy."
                    />
                  </Field>
                </EditorSection>
              </div>

              <div className="flex flex-col-reverse gap-3 border-t border-slate-200/70 p-5 sm:flex-row sm:justify-end">
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={requestCloseEditor}
                  className="rounded-xl"
                >
                  Cancel
                </Button>
                <Button
                  type="submit"
                  variant="dark"
                  size="sm"
                  disabled={saving}
                  className="rounded-xl"
                >
                  {saving ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                  ) : (
                    <Save className="h-4 w-4" />
                  )}
                  {saving ? "Saving..." : "Save Service"}
                </Button>
              </div>
            </form>
          ) : (
            <div className="flex min-h-96 flex-col items-center justify-center rounded-3xl border border-dashed border-slate-300 bg-[#0E0E11] p-8 text-center shadow-sm">
              <Settings className="mb-4 h-10 w-10 text-slate-300" />
              <h4 className="text-base font-extrabold text-slate-800">Select a service to edit</h4>
              <p className="mt-2 max-w-sm text-xs font-medium leading-relaxed text-slate-400">
                Edit an existing service, toggle publication status, or create a new record from the
                admin panel.
              </p>
              <Button
                type="button"
                variant="dark"
                size="sm"
                onClick={startCreate}
                className="mt-5 rounded-xl"
              >
                <Plus className="h-4 w-4" />
                Create Service
              </Button>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

function ServiceRow({
  service,
  isSelected,
  onEdit,
  onDelete,
  onToggle,
}: {
  service: Service;
  isSelected: boolean;
  onEdit: () => void;
  onDelete: () => void;
  onToggle: () => void;
}) {
  return (
    <div className={`p-5 transition ${isSelected ? "bg-blue-50/50" : "hover:bg-slate-50/70"}`}>
      <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
        <div className="min-w-0 flex-1">
          <div className="flex flex-wrap items-center gap-2">
            <span className="rounded-lg border border-slate-200 bg-[#0E0E11] px-2 py-1 font-mono text-[10px] font-bold text-slate-500">
              {service.sort_order ?? 0}
            </span>
            <h5 className="truncate text-sm font-extrabold text-slate-900">{service.title}</h5>
            <span
              className={`inline-flex items-center rounded-full border px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide ${
                service.is_active
                  ? "border-emerald-100 bg-emerald-50 text-emerald-700"
                  : "border-slate-200 bg-slate-100 text-slate-500"
              }`}
            >
              {service.is_active ? "Active" : "Inactive"}
            </span>
          </div>

          <div className="mt-1 font-mono text-[11px] font-medium text-slate-400">
            /{service.slug}
          </div>
          <p className="mt-2 line-clamp-2 text-xs font-medium leading-relaxed text-slate-500">
            {service.short_description || service.hero_description || "No description yet."}
          </p>

          <div className="mt-3 flex flex-wrap gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-400">
            <span>{service.icon || "No icon"}</span>
            <span>{service.technologies?.length || 0} tech</span>
            <span>{service.process_steps?.length || 0} steps</span>
            <span>{service.faq?.length || 0} FAQs</span>
          </div>
        </div>

        <div className="flex shrink-0 items-center gap-2">
          <button
            type="button"
            onClick={onToggle}
            className="rounded-xl border border-slate-200 bg-[#0E0E11] p-2 text-slate-500 transition hover:bg-slate-50 hover:text-slate-900"
            title={service.is_active ? "Set inactive" : "Set active"}
          >
            {service.is_active ? <Eye className="h-4 w-4" /> : <EyeOff className="h-4 w-4" />}
          </button>
          <button
            type="button"
            onClick={onEdit}
            className="rounded-xl border border-slate-200 bg-[#0E0E11] p-2 text-slate-500 transition hover:bg-blue-50 hover:text-blue-700"
            title="Edit service"
          >
            <Edit className="h-4 w-4" />
          </button>
          <button
            type="button"
            onClick={onDelete}
            className="rounded-xl border border-slate-200 bg-[#0E0E11] p-2 text-slate-500 transition hover:bg-rose-50 hover:text-rose-700"
            title="Delete service"
          >
            <Trash2 className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}

function EditorSection({
  title,
  action,
  children,
}: {
  title: string;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <section className="space-y-4 rounded-2xl border border-slate-200/80 bg-[#0E0E11] p-4">
      <div className="flex items-center justify-between gap-3 border-b border-slate-100 pb-3">
        <h5 className="text-xs font-extrabold uppercase tracking-wider text-slate-800">{title}</h5>
        {action}
      </div>
      {children}
    </section>
  );
}

function Field({
  label,
  required,
  action,
  children,
}: {
  label: string;
  required?: boolean;
  action?: React.ReactNode;
  children: React.ReactNode;
}) {
  return (
    <label className="block space-y-1.5">
      <div className="flex items-center justify-between gap-3">
        <span className="text-[10px] font-bold uppercase tracking-wider text-slate-500">
          {label} {required && <span className="text-rose-500">*</span>}
        </span>
        {action}
      </div>
      {children}
    </label>
  );
}

function TagInput({
  label,
  values,
  placeholder,
  onChange,
}: {
  label: string;
  values: string[];
  placeholder: string;
  onChange: (values: string[]) => void;
}) {
  const [draft, setDraft] = useState("");

  function addValue() {
    const value = draft.trim();
    if (!value) return;

    onChange([...values, value]);
    setDraft("");
  }

  function updateValue(index: number, value: string) {
    onChange(values.map((item, itemIndex) => (itemIndex === index ? value : item)));
  }

  function removeValue(index: number) {
    onChange(values.filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <div className="space-y-2">
      <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500">{label}</div>
      <div className="flex flex-wrap gap-2">
        {values.map((value, index) => (
          <div
            key={`${value}-${index}`}
            className="flex max-w-full items-center gap-1 rounded-full border border-blue-100 bg-blue-50 px-2 py-1"
          >
            <input
              value={value}
              onChange={(event) => updateValue(index, event.target.value)}
              className="min-w-0 max-w-44 bg-transparent px-1 text-xs font-semibold text-blue-900 outline-none"
            />
            <button
              type="button"
              onClick={() => removeValue(index)}
              className="rounded-full p-0.5 text-blue-400 hover:bg-blue-100 hover:text-blue-700"
              aria-label={`Remove ${label} item`}
            >
              <X className="h-3 w-3" />
            </button>
          </div>
        ))}
      </div>
      <div className="flex gap-2">
        <Input
          value={draft}
          onChange={(event) => setDraft(event.target.value)}
          onKeyDown={(event) => {
            if (event.key === "Enter") {
              event.preventDefault();
              addValue();
            }
          }}
          placeholder={placeholder}
          className="rounded-xl border-slate-200 text-sm"
        />
        <Button type="button" variant="outline" size="sm" onClick={addValue} className="rounded-xl">
          <Plus className="h-4 w-4" />
          Add
        </Button>
      </div>
    </div>
  );
}

function ProcessStepsEditor({
  steps,
  onChange,
}: {
  steps: ProcessStep[];
  onChange: (steps: ProcessStep[]) => void;
}) {
  function updateStep(index: number, patch: Partial<ProcessStep>) {
    onChange(steps.map((step, stepIndex) => (stepIndex === index ? { ...step, ...patch } : step)));
  }

  function removeStep(index: number) {
    onChange(steps.filter((_, stepIndex) => stepIndex !== index));
  }

  return (
    <div className="space-y-3">
      {steps.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 p-4 text-center text-xs font-medium text-slate-400">
          No process steps yet.
        </div>
      )}

      {steps.map((step, index) => (
        <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <GripVertical className="h-4 w-4" />
              Step {index + 1}
            </div>
            <ReorderControls
              index={index}
              length={steps.length}
              onMove={(from, to) => onChange(moveItem(steps, from, to))}
              onRemove={() => removeStep(index)}
            />
          </div>
          <div className="space-y-3">
            <Input
              value={step.title}
              onChange={(event) => updateStep(index, { title: event.target.value })}
              placeholder="Discovery"
              className="rounded-xl border-slate-200 bg-[#0E0E11] text-sm"
            />
            <Textarea
              value={step.description}
              onChange={(event) => updateStep(index, { description: event.target.value })}
              rows={3}
              placeholder="Understand requirements"
              className="rounded-xl border-slate-200 bg-[#0E0E11] text-sm"
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...steps, { title: "", description: "" }])}
        className="w-full rounded-xl"
      >
        <Plus className="h-4 w-4" />
        Add Step
      </Button>
    </div>
  );
}

function FaqEditor({
  items,
  onChange,
}: {
  items: FaqItem[];
  onChange: (items: FaqItem[]) => void;
}) {
  function updateItem(index: number, patch: Partial<FaqItem>) {
    onChange(items.map((item, itemIndex) => (itemIndex === index ? { ...item, ...patch } : item)));
  }

  function removeItem(index: number) {
    onChange(items.filter((_, itemIndex) => itemIndex !== index));
  }

  return (
    <div className="space-y-3">
      {items.length === 0 && (
        <div className="rounded-xl border border-dashed border-slate-300 p-4 text-center text-xs font-medium text-slate-400">
          No FAQs yet.
        </div>
      )}

      {items.map((item, index) => (
        <div key={index} className="rounded-2xl border border-slate-200 bg-slate-50 p-3">
          <div className="mb-3 flex items-center justify-between gap-3">
            <div className="flex items-center gap-2 text-[10px] font-bold uppercase tracking-wider text-slate-500">
              <GripVertical className="h-4 w-4" />
              FAQ {index + 1}
            </div>
            <ReorderControls
              index={index}
              length={items.length}
              onMove={(from, to) => onChange(moveItem(items, from, to))}
              onRemove={() => removeItem(index)}
            />
          </div>
          <div className="space-y-3">
            <Input
              value={item.question}
              onChange={(event) => updateItem(index, { question: event.target.value })}
              placeholder="Question?"
              className="rounded-xl border-slate-200 bg-[#0E0E11] text-sm"
            />
            <Textarea
              value={item.answer}
              onChange={(event) => updateItem(index, { answer: event.target.value })}
              rows={3}
              placeholder="Answer"
              className="rounded-xl border-slate-200 bg-[#0E0E11] text-sm"
            />
          </div>
        </div>
      ))}

      <Button
        type="button"
        variant="outline"
        size="sm"
        onClick={() => onChange([...items, { question: "", answer: "" }])}
        className="w-full rounded-xl"
      >
        <Plus className="h-4 w-4" />
        Add FAQ
      </Button>
    </div>
  );
}

function ReorderControls({
  index,
  length,
  onMove,
  onRemove,
}: {
  index: number;
  length: number;
  onMove: (from: number, to: number) => void;
  onRemove: () => void;
}) {
  return (
    <div className="flex items-center gap-1">
      <button
        type="button"
        disabled={index === 0}
        onClick={() => onMove(index, index - 1)}
        className="rounded-lg border border-slate-200 bg-[#0E0E11] p-1.5 text-slate-500 transition hover:text-slate-900 disabled:opacity-40"
        aria-label="Move up"
      >
        <ArrowUp className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        disabled={index === length - 1}
        onClick={() => onMove(index, index + 1)}
        className="rounded-lg border border-slate-200 bg-[#0E0E11] p-1.5 text-slate-500 transition hover:text-slate-900 disabled:opacity-40"
        aria-label="Move down"
      >
        <ArrowDown className="h-3.5 w-3.5" />
      </button>
      <button
        type="button"
        onClick={onRemove}
        className="rounded-lg border border-slate-200 bg-[#0E0E11] p-1.5 text-slate-500 transition hover:bg-rose-50 hover:text-rose-700"
        aria-label="Remove item"
      >
        <Trash2 className="h-3.5 w-3.5" />
      </button>
    </div>
  );
}

function serviceToForm(service: Service): ServiceFormState {
  return {
    title: service.title || "",
    slug: service.slug || "",
    short_description: service.short_description || "",
    icon: service.icon || "",
    sort_order: service.sort_order ?? 0,
    is_active: service.is_active ?? true,
    hero_title: service.hero_title || "",
    hero_description: service.hero_description || "",
    full_description: service.full_description || "",
    problems_solved: normalizeStringArray(service.problems_solved),
    deliverables: normalizeStringArray(service.deliverables),
    benefits: normalizeStringArray(service.benefits),
    technologies: normalizeStringArray(service.technologies),
    process_steps: normalizeProcessSteps(service.process_steps),
    faq: normalizeFaq(service.faq),
    cta_title: service.cta_title || "",
    cta_description: service.cta_description || "",
  };
}

function formToPayload(form: ServiceFormState): Partial<Service> {
  return {
    title: form.title.trim(),
    slug: generateSlug(form.slug),
    short_description: form.short_description.trim(),
    icon: nullableString(form.icon) ?? undefined,
    sort_order: Number.isFinite(form.sort_order) ? form.sort_order : 0,
    is_active: form.is_active,
    hero_title: form.hero_title.trim(),
    hero_description: form.hero_description.trim(),
    full_description: nullableString(form.full_description),
    problems_solved: cleanStringArray(form.problems_solved),
    deliverables: cleanStringArray(form.deliverables),
    benefits: cleanStringArray(form.benefits),
    technologies: cleanStringArray(form.technologies),
    process_steps: cleanProcessSteps(form.process_steps),
    faq: cleanFaq(form.faq),
    cta_title: nullableString(form.cta_title),
    cta_description: nullableString(form.cta_description),
  };
}

function validateForm(form: ServiceFormState, services: Service[], currentId?: string) {
  if (!form.title.trim()) return "Title is required.";
  if (!form.slug.trim()) return "Slug is required.";
  if (!form.hero_title.trim()) return "Hero title is required.";
  if (!form.hero_description.trim()) return "Hero description is required.";

  const slug = generateSlug(form.slug);
  if (!slug) return "Slug must include at least one letter or number.";

  const duplicate = services.some((service) => service.slug === slug && service.id !== currentId);
  if (duplicate) return "A service with this slug already exists.";

  return "";
}

function normalizeStringArray(value: unknown): string[] {
  return Array.isArray(value)
    ? value.filter((item): item is string => typeof item === "string")
    : [];
}

function normalizeProcessSteps(value: unknown): ProcessStep[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item) => item && typeof item === "object")
    .map((item: any) => ({
      title: typeof item.title === "string" ? item.title : "",
      description: typeof item.description === "string" ? item.description : "",
    }));
}

function normalizeFaq(value: unknown): FaqItem[] {
  if (!Array.isArray(value)) return [];

  return value
    .filter((item) => item && typeof item === "object")
    .map((item: any) => ({
      question: typeof item.question === "string" ? item.question : "",
      answer: typeof item.answer === "string" ? item.answer : "",
    }));
}

function cleanStringArray(values: string[]) {
  return values.map((value) => value.trim()).filter(Boolean);
}

function cleanProcessSteps(steps: ProcessStep[]) {
  return steps
    .map((step) => ({
      title: step.title.trim(),
      description: step.description.trim(),
    }))
    .filter((step) => step.title || step.description);
}

function cleanFaq(items: FaqItem[]) {
  return items
    .map((item) => ({
      question: item.question.trim(),
      answer: item.answer.trim(),
    }))
    .filter((item) => item.question || item.answer);
}

function nullableString(value: string) {
  const trimmed = value.trim();
  return trimmed ? trimmed : null;
}

function moveItem<T>(items: T[], from: number, to: number) {
  const next = items.slice();
  const [item] = next.splice(from, 1);
  next.splice(to, 0, item);
  return next;
}

function stableStringify(value: unknown) {
  return JSON.stringify(value);
}
