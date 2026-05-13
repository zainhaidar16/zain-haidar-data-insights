import { createFileRoute, useNavigate, Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { useServerFn } from "@tanstack/react-start";
import { supabase } from "@/integrations/supabase/client";
import { listLeads, updateLeadStatus, isCurrentUserAdmin } from "@/lib/admin.functions";
import { Nav } from "@/components/site/Nav";
import { Loader2, LogOut } from "lucide-react";

export const Route = createFileRoute("/admin")({
  head: () => ({ meta: [{ title: "Admin — Haidar Analytics" }, { name: "robots", content: "noindex" }] }),
  component: AdminPage,
});

const STATUSES = ["new", "contacted", "qualified", "won", "lost"] as const;

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
  const qc = useQueryClient();
  const fetchAdmin = useServerFn(isCurrentUserAdmin);
  const fetchLeads = useServerFn(listLeads);
  const updateStatus = useServerFn(updateLeadStatus);

  const adminQ = useQuery({ queryKey: ["is-admin"], queryFn: () => fetchAdmin() });
  const leadsQ = useQuery({
    queryKey: ["leads"],
    queryFn: () => fetchLeads(),
    enabled: !!adminQ.data?.isAdmin,
  });

  const mut = useMutation({
    mutationFn: (vars: { id: string; status: typeof STATUSES[number] }) => updateStatus({ data: vars }),
    onSuccess: () => qc.invalidateQueries({ queryKey: ["leads"] }),
  });

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

  const leads = leadsQ.data?.leads ?? [];

  return (
    <main>
      <Nav />
      <section className="pt-32 md:pt-40 pb-24 mx-auto max-w-7xl px-6">
        <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
          <div>
            <div className="text-[11px] uppercase tracking-[0.3em] text-muted-foreground mb-2">Admin</div>
            <h1 className="font-serif-display text-4xl md:text-5xl">Lead inbox</h1>
            <p className="text-muted-foreground mt-2">{leads.length} leads</p>
          </div>
          <div className="flex gap-2">
            <Link to="/" className="rounded-full border border-border px-4 py-2 text-sm">View site</Link>
            <button onClick={logout} className="inline-flex items-center gap-2 rounded-full border border-border px-4 py-2 text-sm">
              <LogOut className="h-4 w-4" /> Sign out
            </button>
          </div>
        </div>

        {leadsQ.isLoading ? (
          <div className="text-muted-foreground"><Loader2 className="inline h-4 w-4 animate-spin" /> Loading…</div>
        ) : leads.length === 0 ? (
          <div className="glass-strong rounded-3xl p-12 text-center text-muted-foreground">No leads yet.</div>
        ) : (
          <div className="space-y-3">
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
        )}
      </section>
    </main>
  );
}
