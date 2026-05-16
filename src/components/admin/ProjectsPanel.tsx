import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { Link } from "@tanstack/react-router";
import {
  listAllProjects,
  getProjectForEdit,
  upsertProject,
  deleteProject,
  uploadProjectImage,
} from "@/lib/admin-projects.functions";
import { Loader2, Plus, Trash2, ExternalLink, Save, Upload, X } from "lucide-react";

const inputCls = "w-full rounded-xl bg-foreground/[0.04] border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-primary/60 transition";

function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80);
}

type ProjectListItem = {
  id: string; slug: string; title: string; status: string;
  tag: string | null; cover_url: string | null;
  sort_order: number; published_at: string | null; updated_at: string;
};

export function ProjectsPanel() {
  const qc = useQueryClient();
  const fetchProjects = useServerFn(listAllProjects);
  const removeProject = useServerFn(deleteProject);
  const projectsQ = useQuery({ queryKey: ["admin-projects"], queryFn: () => fetchProjects() });
  const [editingId, setEditingId] = useState<string | "new" | null>(null);

  const del = useMutation({
    mutationFn: (id: string) => removeProject({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-projects"] }),
  });

  if (editingId !== null) {
    return (
      <ProjectEditor
        projectId={editingId === "new" ? undefined : editingId}
        onClose={() => { setEditingId(null); qc.invalidateQueries({ queryKey: ["admin-projects"] }); }}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="text-sm text-muted-foreground">{projectsQ.data?.projects.length ?? 0} projects</div>
        <button
          onClick={() => setEditingId("new")}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-5 py-2.5 text-sm font-medium shadow-glow"
        >
          <Plus className="h-4 w-4" /> New project
        </button>
      </div>

      {projectsQ.isLoading ? (
        <div className="text-muted-foreground text-sm"><Loader2 className="inline h-4 w-4 animate-spin mr-2" />Loading projects…</div>
      ) : (projectsQ.data?.projects.length ?? 0) === 0 ? (
        <div className="glass-strong rounded-3xl p-12 text-center text-muted-foreground">No projects yet. Add your first case study.</div>
      ) : (
        <div className="space-y-2">
          {(projectsQ.data?.projects as ProjectListItem[]).map((p) => (
            <div key={p.id} className="glass-strong rounded-2xl p-4 grid md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-1">
                {p.cover_url ? (
                  <img src={p.cover_url} alt="" className="h-14 w-20 object-cover rounded-md border border-border" />
                ) : (
                  <div className="h-14 w-20 bg-secondary rounded-md border border-border" />
                )}
              </div>
              <div className="md:col-span-6 min-w-0">
                <div className="flex items-center gap-2">
                  <span className={`text-[10px] uppercase tracking-widest font-mono px-2 py-0.5 rounded-full border ${
                    p.status === "published" ? "border-primary/40 text-primary bg-primary/10" : "border-border text-muted-foreground"
                  }`}>{p.status}</span>
                  {p.tag && <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.tag}</span>}
                </div>
                <div className="font-serif-display text-xl mt-1 truncate">{p.title}</div>
                <div className="text-xs font-mono text-muted-foreground mt-1 truncate">/{p.slug}</div>
              </div>
              <div className="md:col-span-2 text-xs text-muted-foreground font-mono">
                Order {p.sort_order}
              </div>
              <div className="md:col-span-3 flex md:justify-end gap-2">
                {p.status === "published" && (
                  <Link to="/work/$slug" params={{ slug: p.slug }} className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-foreground/5">
                    <ExternalLink className="h-3.5 w-3.5" /> View
                  </Link>
                )}
                <button onClick={() => setEditingId(p.id)} className="rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-foreground/5">Edit</button>
                <button
                  onClick={() => { if (confirm(`Delete "${p.title}"?`)) del.mutate(p.id); }}
                  className="rounded-lg border border-destructive/40 text-destructive px-2.5 py-1.5 text-xs hover:bg-destructive/10"
                  aria-label="Delete"
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

type Metric = { label: string; value: string };

function ProjectEditor({ projectId, onClose }: { projectId?: string; onClose: () => void }) {
  const isNew = !projectId;
  const fetchProject = useServerFn(getProjectForEdit);
  const save = useServerFn(upsertProject);
  const uploadImg = useServerFn(uploadProjectImage);

  const projectQ = useQuery({
    queryKey: ["admin-project", projectId],
    queryFn: () => fetchProject({ data: { id: projectId! } }),
    enabled: !!projectId,
  });

  const initial = projectQ.data?.project;
  const [form, setForm] = useState({
    slug: "", title: "", client: "", tag: "", year: "", duration: "", role: "",
    impact: "", cover_url: "", problem: "",
    approach: [] as string[],
    outcomes: [] as string[],
    stack: [] as string[],
    metrics: [] as Metric[],
    gallery: [] as string[],
    status: "draft" as "draft" | "published",
    sort_order: 0,
    autoSlug: true,
    stackText: "",
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);
  const [uploadingFor, setUploadingFor] = useState<null | "cover" | "gallery">(null);

  useEffect(() => {
    if (initial) {
      setForm({
        slug: initial.slug ?? "",
        title: initial.title ?? "",
        client: initial.client ?? "",
        tag: initial.tag ?? "",
        year: initial.year ?? "",
        duration: initial.duration ?? "",
        role: initial.role ?? "",
        impact: initial.impact ?? "",
        cover_url: initial.cover_url ?? "",
        problem: initial.problem ?? "",
        approach: initial.approach ?? [],
        outcomes: initial.outcomes ?? [],
        stack: initial.stack ?? [],
        metrics: (initial.metrics ?? []) as Metric[],
        gallery: initial.gallery ?? [],
        status: initial.status === "published" ? "published" : "draft",
        sort_order: initial.sort_order ?? 0,
        autoSlug: false,
        stackText: (initial.stack ?? []).join(", "),
      });
    }
  }, [initial]);

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => {
      const next = { ...f, [k]: v };
      if (k === "title" && f.autoSlug) next.slug = slugify(String(v));
      return next;
    });
  }

  async function fileToUrl(file: File, kind: "cover" | "gallery") {
    setUploadingFor(kind);
    try {
      const buf = await file.arrayBuffer();
      const bin = new Uint8Array(buf);
      let s = "";
      for (let i = 0; i < bin.byteLength; i++) s += String.fromCharCode(bin[i]);
      const dataBase64 = btoa(s);
      const safeName = file.name.replace(/[^a-zA-Z0-9._-]/g, "_").slice(0, 200);
      const res = await uploadImg({ data: { filename: safeName, contentType: file.type || "image/jpeg", dataBase64 } });
      return res.url as string;
    } finally {
      setUploadingFor(null);
    }
  }

  async function onCoverFile(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const url = await fileToUrl(file, "cover");
      update("cover_url", url);
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      e.target.value = "";
    }
  }

  async function onGalleryFile(e: React.ChangeEvent<HTMLInputElement>) {
    const files = Array.from(e.target.files ?? []);
    try {
      for (const f of files) {
        const url = await fileToUrl(f, "gallery");
        setForm((s) => ({ ...s, gallery: [...s.gallery, url] }));
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Upload failed");
    } finally {
      e.target.value = "";
    }
  }

  async function onSave(status: "draft" | "published") {
    setError(""); setSaving(true);
    try {
      const stack = form.stackText.split(",").map((s) => s.trim()).filter(Boolean);
      await save({
        data: {
          id: projectId,
          slug: form.slug,
          title: form.title,
          client: form.client || undefined,
          tag: form.tag || undefined,
          year: form.year || undefined,
          duration: form.duration || undefined,
          role: form.role || undefined,
          impact: form.impact || undefined,
          cover_url: form.cover_url || undefined,
          problem: form.problem,
          approach: form.approach.filter(Boolean),
          outcomes: form.outcomes.filter(Boolean),
          stack,
          metrics: form.metrics.filter((m) => m.label && m.value),
          gallery: form.gallery.filter(Boolean),
          status,
          sort_order: Number(form.sort_order) || 0,
        },
      });
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  const wordCount = useMemo(() => form.problem.trim().split(/\s+/).filter(Boolean).length, [form.problem]);

  if (!isNew && projectQ.isLoading) return <div className="text-muted-foreground text-sm"><Loader2 className="inline h-4 w-4 animate-spin mr-2" />Loading project…</div>;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-1">{isNew ? "New" : "Edit"}</div>
          <h2 className="font-serif-display text-3xl">{form.title || "Untitled project"}</h2>
        </div>
        <div className="flex gap-2">
          <button onClick={onClose} className="rounded-full border border-border px-4 py-2 text-sm hover:bg-foreground/5">Cancel</button>
          <button onClick={() => onSave("draft")} disabled={saving} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-foreground/5 disabled:opacity-60">
            <Save className="h-4 w-4" /> Save draft
          </button>
          <button onClick={() => onSave("published")} disabled={saving} className="inline-flex items-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-5 py-2 text-sm font-medium shadow-glow disabled:opacity-60">
            {saving && <Loader2 className="h-4 w-4 animate-spin" />} Publish
          </button>
        </div>
      </div>

      {error && <div className="rounded-xl border border-destructive/40 bg-destructive/10 text-destructive text-sm px-4 py-3">{error}</div>}

      <div className="grid lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-4">
          <Field label="Title">
            <input value={form.title} onChange={(e) => update("title", e.target.value)} className={inputCls} placeholder="Project title" />
          </Field>
          <Field label="Slug" hint="lowercase letters, numbers, dashes">
            <div className="flex gap-2">
              <input
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value, autoSlug: false }))}
                className={inputCls}
                placeholder="my-project-slug"
              />
              <button type="button" onClick={() => setForm((f) => ({ ...f, slug: slugify(f.title), autoSlug: true }))} className="rounded-xl border border-border px-3 text-xs hover:bg-foreground/5 whitespace-nowrap">Auto</button>
            </div>
          </Field>

          <div className="grid sm:grid-cols-3 gap-3">
            <Field label="Tag"><input value={form.tag} onChange={(e) => update("tag", e.target.value)} className={inputCls} placeholder="Power BI · Retail" /></Field>
            <Field label="Year"><input value={form.year} onChange={(e) => update("year", e.target.value)} className={inputCls} placeholder="2024" /></Field>
            <Field label="Duration"><input value={form.duration} onChange={(e) => update("duration", e.target.value)} className={inputCls} placeholder="10 weeks" /></Field>
          </div>
          <div className="grid sm:grid-cols-2 gap-3">
            <Field label="Client"><input value={form.client} onChange={(e) => update("client", e.target.value)} className={inputCls} placeholder="European retail group" /></Field>
            <Field label="Role"><input value={form.role} onChange={(e) => update("role", e.target.value)} className={inputCls} placeholder="Lead BI Consultant" /></Field>
          </div>

          <Field label="Impact headline" hint="One line, shown on cards">
            <input value={form.impact} onChange={(e) => update("impact", e.target.value)} className={inputCls} maxLength={280} placeholder="+18% margin · 120 stores onboarded" />
          </Field>

          <Field label={`Problem — ${wordCount} words`}>
            <textarea value={form.problem} onChange={(e) => update("problem", e.target.value)} rows={5} className={inputCls} maxLength={4000} />
          </Field>

          <RepeatableList
            label="Approach (steps)"
            items={form.approach}
            onChange={(v) => update("approach", v)}
            placeholder="What you did, one step at a time"
          />

          <RepeatableList
            label="Outcomes"
            items={form.outcomes}
            onChange={(v) => update("outcomes", v)}
            placeholder="Measurable outcome"
          />

          <MetricsEditor
            metrics={form.metrics}
            onChange={(v) => update("metrics", v)}
          />

          <GalleryEditor
            urls={form.gallery}
            onChange={(v) => update("gallery", v)}
            onUpload={onGalleryFile}
            uploading={uploadingFor === "gallery"}
          />
        </div>

        <aside className="space-y-4">
          <Field label="Status">
            <select value={form.status} onChange={(e) => update("status", e.target.value as "draft" | "published")} className={inputCls}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </Field>
          <Field label="Sort order" hint="Lower = first">
            <input type="number" min={0} max={10000} value={form.sort_order} onChange={(e) => update("sort_order", Number(e.target.value))} className={inputCls} />
          </Field>
          <Field label="Stack" hint="Comma-separated">
            <input value={form.stackText} onChange={(e) => update("stackText", e.target.value)} className={inputCls} placeholder="Power BI, DAX, SQL Server" />
          </Field>

          <Field label="Cover image">
            <div className="flex flex-col gap-2">
              <input value={form.cover_url} onChange={(e) => update("cover_url", e.target.value)} className={inputCls} placeholder="https://… or upload below" />
              <label className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs hover:bg-foreground/5 cursor-pointer">
                {uploadingFor === "cover" ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
                Upload image
                <input type="file" accept="image/*" onChange={onCoverFile} className="hidden" />
              </label>
              {form.cover_url && (
                <div className="aspect-[16/9] rounded-xl overflow-hidden border border-border">
                  <img src={form.cover_url} alt="" className="h-full w-full object-cover" />
                </div>
              )}
            </div>
          </Field>
        </aside>
      </div>
    </div>
  );
}

function Field({ label, hint, children }: { label: string; hint?: string; children: React.ReactNode }) {
  return (
    <label className="block">
      <div className="flex items-baseline justify-between mb-1.5">
        <span className="text-xs uppercase tracking-widest text-muted-foreground">{label}</span>
        {hint && <span className="text-[10px] text-muted-foreground/70">{hint}</span>}
      </div>
      {children}
    </label>
  );
}

function RepeatableList({ label, items, onChange, placeholder }: { label: string; items: string[]; onChange: (v: string[]) => void; placeholder?: string }) {
  return (
    <Field label={label}>
      <div className="space-y-2">
        {items.map((v, i) => (
          <div key={i} className="flex gap-2">
            <textarea
              value={v}
              onChange={(e) => onChange(items.map((x, idx) => (idx === i ? e.target.value : x)))}
              rows={2}
              className={inputCls}
              placeholder={placeholder}
            />
            <button type="button" onClick={() => onChange(items.filter((_, idx) => idx !== i))} className="rounded-lg border border-border px-2 text-xs hover:bg-foreground/5 self-start mt-1" aria-label="Remove">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => onChange([...items, ""])} className="inline-flex items-center gap-2 rounded-lg border border-dashed border-border px-3 py-1.5 text-xs hover:bg-foreground/5">
          <Plus className="h-3 w-3" /> Add item
        </button>
      </div>
    </Field>
  );
}

function MetricsEditor({ metrics, onChange }: { metrics: Metric[]; onChange: (v: Metric[]) => void }) {
  return (
    <Field label="Key metrics" hint="Label + value (e.g. Refresh time · 4d → 1h)">
      <div className="space-y-2">
        {metrics.map((m, i) => (
          <div key={i} className="grid grid-cols-[1fr_1fr_auto] gap-2">
            <input
              value={m.label}
              onChange={(e) => onChange(metrics.map((x, idx) => (idx === i ? { ...x, label: e.target.value } : x)))}
              className={inputCls}
              placeholder="Label"
            />
            <input
              value={m.value}
              onChange={(e) => onChange(metrics.map((x, idx) => (idx === i ? { ...x, value: e.target.value } : x)))}
              className={inputCls}
              placeholder="Value"
            />
            <button type="button" onClick={() => onChange(metrics.filter((_, idx) => idx !== i))} className="rounded-lg border border-border px-2 text-xs hover:bg-foreground/5" aria-label="Remove">
              <X className="h-3.5 w-3.5" />
            </button>
          </div>
        ))}
        <button type="button" onClick={() => onChange([...metrics, { label: "", value: "" }])} className="inline-flex items-center gap-2 rounded-lg border border-dashed border-border px-3 py-1.5 text-xs hover:bg-foreground/5">
          <Plus className="h-3 w-3" /> Add metric
        </button>
      </div>
    </Field>
  );
}

function GalleryEditor({ urls, onChange, onUpload, uploading }: {
  urls: string[]; onChange: (v: string[]) => void;
  onUpload: (e: React.ChangeEvent<HTMLInputElement>) => void; uploading: boolean;
}) {
  return (
    <Field label="Gallery">
      <div className="space-y-3">
        {urls.length > 0 && (
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
            {urls.map((u, i) => (
              <div key={i} className="relative aspect-[4/3] rounded-lg overflow-hidden border border-border group">
                <img src={u} alt="" className="h-full w-full object-cover" />
                <button
                  type="button"
                  onClick={() => onChange(urls.filter((_, idx) => idx !== i))}
                  className="absolute top-1.5 right-1.5 rounded-full bg-background/80 backdrop-blur border border-border p-1 opacity-0 group-hover:opacity-100 transition"
                  aria-label="Remove"
                >
                  <X className="h-3.5 w-3.5" />
                </button>
              </div>
            ))}
          </div>
        )}
        <label className="inline-flex items-center gap-2 rounded-xl border border-border px-3 py-2 text-xs hover:bg-foreground/5 cursor-pointer">
          {uploading ? <Loader2 className="h-3.5 w-3.5 animate-spin" /> : <Upload className="h-3.5 w-3.5" />}
          Upload images
          <input type="file" accept="image/*" multiple onChange={onUpload} className="hidden" />
        </label>
      </div>
    </Field>
  );
}
