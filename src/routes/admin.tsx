import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { listLeads, updateLeadStatus, isCurrentUserAdmin } from "@/lib/admin.functions";
import {
  listAllPosts,
  getPostForEdit,
  upsertPost,
  deletePost,
} from "@/lib/admin-posts.functions";
import { Nav } from "@/components/site/Nav";
import { Loader2, LogOut, Inbox, FileText, Plus, Trash2, ExternalLink, Save } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Haidar Analytics" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

const STATUSES = ["new", "contacted", "qualified", "won", "lost"] as const;
type Tab = "inbox" | "posts";

function AdminPage() {
  const navigate = useNavigate();
  const [ready, setReady] = useState(false);
  const [authed, setAuthed] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (!data.session) navigate({ to: "/login" });
      else { setAuthed(true); setReady(true); }
    });
  }, [navigate]);

  if (!ready) return <main className="min-h-screen grid place-items-center"><Loader2 className="h-6 w-6 animate-spin" /></main>;
  if (!authed) return null;
  return <AdminInner />;
}

function AdminInner() {
  const navigate = useNavigate();
  const fetchAdmin = useServerFn(isCurrentUserAdmin);
  const adminQ = useQuery({ queryKey: ["is-admin"], queryFn: () => fetchAdmin() });
  const [tab, setTab] = useState<Tab>("inbox");

  async function logout() {
    await supabase.auth.signOut();
    navigate({ to: "/login" });
  }

  if (adminQ.isLoading) return <main className="min-h-screen grid place-items-center"><Loader2 className="h-6 w-6 animate-spin" /></main>;

  if (!adminQ.data?.isAdmin) {
    return (
      <main>
        <Nav />
        <section className="pt-40 pb-24 mx-auto max-w-2xl px-6 text-center">
          <h1 className="font-serif-display text-4xl mb-3">Not authorized</h1>
          <p className="text-muted-foreground mb-6">
            Your account isn't an admin. Ask Zain to grant access via the user roles table.
          </p>
          <button onClick={logout} className="inline-flex items-center gap-2 rounded-full border border-border px-5 py-2.5 text-sm">
            <LogOut className="h-4 w-4" /> Sign out
          </button>
        </section>
      </main>
    );
  }

  return (
    <main>
      <Nav />
      <section className="pt-32 md:pt-40 pb-24 mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-2">Studio Admin</div>
            <h1 className="font-serif-display text-4xl md:text-5xl">Control room</h1>
          </div>
          <div className="flex gap-2">
            <Link to="/" className="rounded-full border border-border px-4 py-2 text-sm hover:bg-foreground/5 transition">View site</Link>
            <button onClick={logout} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm hover:bg-foreground/5 transition">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>

        <div className="mb-8 inline-flex rounded-full border border-border bg-foreground/[0.03] p-1">
          <TabButton active={tab === "inbox"} onClick={() => setTab("inbox")} icon={<Inbox className="h-4 w-4" />}>Inbox</TabButton>
          <TabButton active={tab === "posts"} onClick={() => setTab("posts")} icon={<FileText className="h-4 w-4" />}>Insights</TabButton>
        </div>

        {tab === "inbox" ? <LeadsPanel /> : <PostsPanel />}
      </section>
    </main>
  );
}

function TabButton({ active, onClick, icon, children }: { active: boolean; onClick: () => void; icon: React.ReactNode; children: React.ReactNode }) {
  return (
    <button
      onClick={onClick}
      className={`inline-flex items-center gap-2 rounded-full px-5 py-2 text-sm transition ${
        active ? "bg-gradient-primary text-primary-foreground shadow-glow" : "text-muted-foreground hover:text-foreground"
      }`}
    >
      {icon} {children}
    </button>
  );
}

/* ----------------- Leads ----------------- */
function LeadsPanel() {
  const qc = useQueryClient();
  const fetchLeads = useServerFn(listLeads);
  const updateStatus = useServerFn(updateLeadStatus);
  const leadsQ = useQuery({ queryKey: ["leads"], queryFn: () => fetchLeads() });
  const mut = useMutation({
    mutationFn: (vars: { id: string; status: typeof STATUSES[number] }) => updateStatus({ data: vars }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leads"] }),
  });

  if (leadsQ.isLoading) return <Loading label="Loading leads" />;
  const leads = leadsQ.data?.leads ?? [];
  if (leads.length === 0) return <Empty label="No leads yet." />;

  return (
    <div className="space-y-3">
      <div className="text-sm text-muted-foreground mb-2">{leads.length} leads</div>
      {leads.map((l) => (
        <div key={l.id} className="glass-strong rounded-2xl p-5 grid md:grid-cols-12 gap-4 items-start">
          <div className="md:col-span-3">
            <div className="font-medium">{l.name}</div>
            <a href={`mailto:${l.email}`} className="text-sm text-primary hover:underline break-all">{l.email}</a>
            {l.company && <div className="text-xs text-muted-foreground mt-1">{l.company}</div>}
          </div>
          <div className="md:col-span-6 text-sm text-foreground/85 whitespace-pre-wrap">{l.message}</div>
          <div className="md:col-span-3 flex flex-col gap-2 md:items-end">
            <select
              defaultValue={l.status}
              onChange={(e) => mut.mutate({ id: l.id, status: e.target.value as typeof STATUSES[number] })}
              className="rounded-lg bg-foreground/[0.04] border border-border px-3 py-1.5 text-xs"
            >
              {STATUSES.map((s) => <option key={s} value={s}>{s}</option>)}
            </select>
            <div className="text-[11px] text-muted-foreground font-mono">
              {new Date(l.created_at).toLocaleString()}
            </div>
            {l.budget && <div className="text-[11px] text-muted-foreground">Budget: {l.budget}</div>}
            {l.project_type && <div className="text-[11px] text-muted-foreground">Type: {l.project_type}</div>}
          </div>
        </div>
      ))}
    </div>
  );
}

/* ----------------- Posts CMS ----------------- */
type PostListItem = {
  id: string; slug: string; title: string; status: string;
  category: string | null; published_at: string | null;
  updated_at: string; reading_minutes: number | null;
};

function PostsPanel() {
  const qc = useQueryClient();
  const fetchPosts = useServerFn(listAllPosts);
  const removePost = useServerFn(deletePost);
  const postsQ = useQuery({ queryKey: ["admin-posts"], queryFn: () => fetchPosts() });
  const [editingId, setEditingId] = useState<string | "new" | null>(null);

  const del = useMutation({
    mutationFn: (id: string) => removePost({ data: { id } }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["admin-posts"] }),
  });

  if (editingId !== null) {
    return (
      <PostEditor
        postId={editingId === "new" ? undefined : editingId}
        onClose={() => { setEditingId(null); qc.invalidateQueries({ queryKey: ["admin-posts"] }); }}
      />
    );
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-5">
        <div className="text-sm text-muted-foreground">{postsQ.data?.posts.length ?? 0} posts</div>
        <button
          onClick={() => setEditingId("new")}
          className="inline-flex items-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-5 py-2.5 text-sm font-medium shadow-glow"
        >
          <Plus className="h-4 w-4" /> New post
        </button>
      </div>

      {postsQ.isLoading ? <Loading label="Loading posts" /> : (postsQ.data?.posts.length ?? 0) === 0 ? (
        <Empty label="No posts yet. Create your first Insight." />
      ) : (
        <div className="space-y-2">
          {(postsQ.data?.posts as PostListItem[]).map((p) => (
            <div key={p.id} className="glass-strong rounded-2xl p-4 md:p-5 grid md:grid-cols-12 gap-4 items-center">
              <div className="md:col-span-7 min-w-0">
                <div className="flex items-center gap-2">
                  <StatusPill status={p.status} />
                  {p.category && <span className="text-[10px] uppercase tracking-widest text-muted-foreground">{p.category}</span>}
                </div>
                <div className="font-serif-display text-xl md:text-2xl mt-1 truncate">{p.title}</div>
                <div className="text-xs font-mono text-muted-foreground mt-1 truncate">/{p.slug}</div>
              </div>
              <div className="md:col-span-3 text-xs text-muted-foreground font-mono">
                {p.published_at ? `Pub ${new Date(p.published_at).toLocaleDateString()}` : `Edited ${new Date(p.updated_at).toLocaleDateString()}`}
              </div>
              <div className="md:col-span-2 flex md:justify-end gap-2">
                {p.status === "published" && (
                  <Link to="/insights/$slug" params={{ slug: p.slug }} className="inline-flex items-center gap-1 rounded-lg border border-border px-3 py-1.5 text-xs hover:bg-foreground/5">
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

function StatusPill({ status }: { status: string }) {
  const isPub = status === "published";
  return (
    <span className={`text-[10px] uppercase tracking-widest font-mono px-2 py-0.5 rounded-full border ${
      isPub ? "border-primary/40 text-primary bg-primary/10" : "border-border text-muted-foreground"
    }`}>{status}</span>
  );
}

/* ----------------- Editor ----------------- */
function slugify(s: string) {
  return s.toLowerCase().trim().replace(/[^a-z0-9\s-]/g, "").replace(/\s+/g, "-").replace(/-+/g, "-").slice(0, 80);
}

function PostEditor({ postId, onClose }: { postId?: string; onClose: () => void }) {
  const isNew = !postId;
  const fetchPost = useServerFn(getPostForEdit);
  const save = useServerFn(upsertPost);

  const postQ = useQuery({
    queryKey: ["admin-post", postId],
    queryFn: () => fetchPost({ data: { id: postId! } }),
    enabled: !!postId,
  });

  const initial = postQ.data?.post;
  const [form, setForm] = useState({
    slug: "", title: "", excerpt: "", body_md: "", category: "",
    tagsText: "", cover_url: "", reading_minutes: 5,
    seo_title: "", seo_description: "", status: "draft" as "draft" | "published",
    autoSlug: true,
  });
  const [error, setError] = useState("");
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (initial) {
      setForm({
        slug: initial.slug ?? "",
        title: initial.title ?? "",
        excerpt: initial.excerpt ?? "",
        body_md: initial.body_md ?? "",
        category: initial.category ?? "",
        tagsText: (initial.tags ?? []).join(", "),
        cover_url: initial.cover_url ?? "",
        reading_minutes: initial.reading_minutes ?? 5,
        seo_title: initial.seo_title ?? "",
        seo_description: initial.seo_description ?? "",
        status: (initial.status === "published" ? "published" : "draft"),
        autoSlug: false,
      });
    }
  }, [initial]);

  const wordCount = useMemo(() => form.body_md.trim().split(/\s+/).filter(Boolean).length, [form.body_md]);

  function update<K extends keyof typeof form>(k: K, v: (typeof form)[K]) {
    setForm((f) => {
      const next = { ...f, [k]: v };
      if (k === "title" && f.autoSlug) next.slug = slugify(String(v));
      return next;
    });
  }

  async function onSave(status: "draft" | "published") {
    setError(""); setSaving(true);
    try {
      const tags = form.tagsText.split(",").map((t) => t.trim()).filter(Boolean);
      await save({
        data: {
          id: postId,
          slug: form.slug,
          title: form.title,
          excerpt: form.excerpt || undefined,
          body_md: form.body_md,
          category: form.category || undefined,
          tags,
          cover_url: form.cover_url || undefined,
          reading_minutes: Number(form.reading_minutes) || 5,
          seo_title: form.seo_title || undefined,
          seo_description: form.seo_description || undefined,
          status,
        },
      });
      onClose();
    } catch (e) {
      setError(e instanceof Error ? e.message : "Failed to save");
    } finally {
      setSaving(false);
    }
  }

  if (!isNew && postQ.isLoading) return <Loading label="Loading post" />;

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-3">
        <div>
          <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-1">{isNew ? "New" : "Edit"}</div>
          <h2 className="font-serif-display text-3xl">{form.title || "Untitled insight"}</h2>
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
            <input value={form.title} onChange={(e) => update("title", e.target.value)} className={inputCls} placeholder="A bold, specific headline" />
          </Field>
          <Field label="Slug" hint="lowercase letters, numbers, dashes">
            <div className="flex gap-2">
              <input
                value={form.slug}
                onChange={(e) => setForm((f) => ({ ...f, slug: e.target.value, autoSlug: false }))}
                className={inputCls}
                placeholder="my-post-slug"
              />
              <button type="button" onClick={() => setForm((f) => ({ ...f, slug: slugify(f.title), autoSlug: true }))} className="rounded-xl border border-border px-3 text-xs hover:bg-foreground/5 whitespace-nowrap">Auto</button>
            </div>
          </Field>
          <Field label="Excerpt" hint="Shown in listings & SEO">
            <textarea value={form.excerpt} onChange={(e) => update("excerpt", e.target.value)} rows={3} className={inputCls} maxLength={500} />
          </Field>
          <Field label={`Body (Markdown) — ${wordCount} words`}>
            <textarea
              value={form.body_md}
              onChange={(e) => update("body_md", e.target.value)}
              rows={22}
              className={`${inputCls} font-mono text-sm leading-relaxed`}
              placeholder="# Heading&#10;&#10;Write in Markdown…"
            />
          </Field>
        </div>

        <aside className="space-y-4">
          <Field label="Status">
            <select value={form.status} onChange={(e) => update("status", e.target.value as "draft" | "published")} className={inputCls}>
              <option value="draft">Draft</option>
              <option value="published">Published</option>
            </select>
          </Field>
          <Field label="Category">
            <input value={form.category} onChange={(e) => update("category", e.target.value)} className={inputCls} placeholder="Strategy, BI, AI…" />
          </Field>
          <Field label="Tags" hint="Comma-separated">
            <input value={form.tagsText} onChange={(e) => update("tagsText", e.target.value)} className={inputCls} placeholder="power-bi, dax, forecasting" />
          </Field>
          <Field label="Cover image URL">
            <input value={form.cover_url} onChange={(e) => update("cover_url", e.target.value)} className={inputCls} placeholder="https://…" />
            {form.cover_url && (
              <div className="mt-2 aspect-[16/9] rounded-xl overflow-hidden border border-border">
                <img src={form.cover_url} alt="" className="h-full w-full object-cover" />
              </div>
            )}
          </Field>
          <Field label="Reading minutes">
            <input type="number" min={1} max={120} value={form.reading_minutes} onChange={(e) => update("reading_minutes", Number(e.target.value))} className={inputCls} />
          </Field>
          <div className="pt-2 border-t border-border" />
          <Field label="SEO title">
            <input value={form.seo_title} onChange={(e) => update("seo_title", e.target.value)} className={inputCls} maxLength={200} />
          </Field>
          <Field label="SEO description">
            <textarea value={form.seo_description} onChange={(e) => update("seo_description", e.target.value)} rows={3} className={inputCls} maxLength={400} />
          </Field>
        </aside>
      </div>
    </div>
  );
}

const inputCls = "w-full rounded-xl bg-foreground/[0.04] border border-border px-4 py-2.5 text-sm focus:outline-none focus:border-primary/60 transition";

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

function Loading({ label }: { label: string }) {
  return <div className="text-muted-foreground text-sm"><Loader2 className="inline h-4 w-4 animate-spin mr-2" />{label}…</div>;
}
function Empty({ label }: { label: string }) {
  return <div className="glass-strong rounded-3xl p-12 text-center text-muted-foreground">{label}</div>;
}
