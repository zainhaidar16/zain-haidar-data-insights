import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, Lock } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Sign In — Zain The Analyst Studio" },
      { name: "robots", content: "noindex, nofollow" },
    ],
  }),
  component: AdminLoginPage,
});

function AdminLoginPage() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    // Check if session is already active
    supabase.auth.getSession().then(({ data }) => {
      if (data.session) {
        navigate({ to: "/admin" });
      }
    });
  }, [navigate]);

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const { error: authError } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (authError) throw authError;

      // Upon success, redirect to dashboard root
      navigate({ to: "/admin" });
    } catch (err: any) {
      setError(err?.message || "Failed to sign in. Please check your credentials.");
    } finally {
      setLoading(false);
    }
  }

  return (
    <main className="admin-shell admin-login">
      <div className="admin-login-wrap">
        <a href="/" className="admin-login-brand">
          <span className="admin-monogram">Z</span>Zain Haidar
        </a>
        <section className="admin-login-card" aria-labelledby="login-heading">
          <span className="admin-eyebrow">
            <Lock size={16} /> PORTFOLIO ADMIN
          </span>
          <h1 id="login-heading">Welcome back.</h1>
          <p>Sign in to manage your work, writing, and enquiries.</p>
          <form onSubmit={handleLogin} aria-busy={loading}>
            <div className="admin-field">
              <label htmlFor="admin-email">Email address</label>
              <input
                id="admin-email"
                name="email"
                type="email"
                autoComplete="username"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
              />
            </div>
            <div className="admin-field">
              <label htmlFor="admin-password">Password</label>
              <div className="admin-password">
                <input
                  id="admin-password"
                  name="password"
                  type={showPassword ? "text" : "password"}
                  autoComplete="current-password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <button
                  type="button"
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>
            {error && (
              <div className="admin-error" role="alert">
                {error}
              </div>
            )}
            <button type="submit" disabled={loading} className="admin-primary">
              {loading && <Loader2 size={18} className="animate-spin" />}
              {loading ? "Signing in…" : "Sign in"}
            </button>
          </form>
          <p className="admin-login-note">Access is limited to the website administrator.</p>
        </section>
        <a className="admin-back" href="/">
          ← Back to website
        </a>
      </div>
    </main>
  );
}
