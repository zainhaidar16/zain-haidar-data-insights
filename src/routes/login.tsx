import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/integrations/supabase/client";

import { Nav } from "@/components/site/Nav";
import { Footer } from "@/components/site/Footer";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    meta: [
      { title: "Sign in — Haidar Analytics" },
      { name: "description", content: "Sign in to the Haidar Analytics admin." },
    ],
  }),
  component: LoginPage,
});

function LoginPage() {
  const navigate = useNavigate();
  const [mode, setMode] = useState<"signin" | "signup">("signin");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) navigate({ to: "/admin" });
    });
  }, [navigate]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true); setError("");
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email, password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;
        navigate({ to: "/admin" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally { setLoading(false); }
  }


  return (
    <main>
      <Nav />
      <section className="min-h-screen pt-32 pb-24 grid place-items-center">
        <div className="w-full max-w-md mx-auto px-6">
          <div className="glass-strong gradient-border rounded-3xl p-8">
            <h1 className="font-serif-display text-3xl mb-2">{mode === "signup" ? "Create account" : "Welcome back"}</h1>
            <p className="text-sm text-muted-foreground mb-6">Sign in to access the studio admin.</p>

            <button onClick={onGoogle} className="w-full mb-4 rounded-xl border border-border bg-foreground/[0.04] hover:bg-foreground/[0.08] py-3 text-sm font-medium transition">
              Continue with Google
            </button>

            <div className="flex items-center gap-3 my-4 text-xs text-muted-foreground">
              <div className="h-px flex-1 bg-border" /> or <div className="h-px flex-1 bg-border" />
            </div>

            <form onSubmit={onSubmit} className="space-y-4">
              <input type="email" required value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Email"
                className="w-full rounded-xl bg-foreground/[0.04] border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary/60" />
              <input type="password" required minLength={8} value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password (min 8 chars)"
                className="w-full rounded-xl bg-foreground/[0.04] border border-border px-4 py-3 text-sm focus:outline-none focus:border-primary/60" />
              {error && <p className="text-xs text-destructive">{error}</p>}
              <button type="submit" disabled={loading}
                className="w-full inline-flex items-center justify-center gap-2 rounded-full bg-gradient-primary text-primary-foreground px-5 py-3 text-sm font-medium shadow-glow disabled:opacity-60">
                {loading && <Loader2 className="h-4 w-4 animate-spin" />}
                {mode === "signup" ? "Create account" : "Sign in"}
              </button>
            </form>

            <button onClick={() => setMode((m) => (m === "signin" ? "signup" : "signin"))}
              className="mt-5 text-xs text-muted-foreground hover:text-foreground">
              {mode === "signin" ? "Need an account? Sign up" : "Already have an account? Sign in"}
            </button>
            <div className="mt-6 text-xs text-muted-foreground">
              <Link to="/" className="hover:text-foreground">← Back to site</Link>
            </div>
          </div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
