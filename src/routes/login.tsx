import adminCss from "../admin.css?url";
import { createFileRoute, Link, useNavigate } from "@tanstack/react-router";
import { useState, useEffect } from "react";
import { supabase } from "@/lib/supabase";
import { lovable } from "@/integrations/lovable";

import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";
import { Loader2 } from "lucide-react";

export const Route = createFileRoute("/login")({
  head: () => ({
    links: [{ rel: "stylesheet", href: adminCss }],
    meta: [
      { title: "Sign in — Zain Haidar Admin" },
      { name: "description", content: "Sign in to Zain Haidar admin area." },
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

  async function onGoogle() {
    setError("");
    const result = await lovable.auth.signInWithOAuth("google", {
      redirect_uri: `${window.location.origin}/admin`,
    });
    if (result.error) {
      setError(result.error.message ?? "Google sign-in failed");
      return;
    }
    if (result.redirected) return;
    navigate({ to: "/admin" });
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      if (mode === "signup") {
        const { error } = await supabase.auth.signUp({
          email,
          password,
          options: { emailRedirectTo: `${window.location.origin}/admin` },
        });
        if (error) throw error;
      } else {
        const { error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        if (error) throw error;
        navigate({ to: "/admin" });
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <>
      <Header />
      <main id="main-content" tabIndex={-1}>
        <section className="admin-shell admin-login auth-page">
          <div className="admin-login-wrap">
            <section className="admin-login-card" aria-labelledby="auth-title">
              <span className="admin-eyebrow">Portfolio access</span>
              <h1 id="auth-title">{mode === "signup" ? "Create account" : "Welcome back"}</h1>
              <p>Sign in to access the portfolio studio.</p>
              <button type="button" onClick={onGoogle} className="admin-secondary">
                Continue with Google
              </button>
              <div className="auth-divider">
                <span>or use your email</span>
              </div>
              <form onSubmit={onSubmit} aria-busy={loading}>
                <div className="admin-field">
                  <label htmlFor="sign-in-email">Email address</label>
                  <input
                    id="sign-in-email"
                    type="email"
                    autoComplete="username"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                  />
                </div>
                <div className="admin-field">
                  <label htmlFor="sign-in-password">Password</label>
                  <input
                    id="sign-in-password"
                    type="password"
                    autoComplete={mode === "signup" ? "new-password" : "current-password"}
                    required
                    minLength={8}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <p className="admin-help">Use at least 8 characters.</p>
                </div>
                {error && (
                  <p role="alert" className="admin-error">
                    {error}
                  </p>
                )}
                <button type="submit" disabled={loading} className="admin-primary">
                  {loading && <Loader2 size={18} className="animate-spin" />}
                  {loading ? "Please wait…" : mode === "signup" ? "Create account" : "Sign in"}
                </button>
              </form>
              <button
                type="button"
                onClick={() => setMode((m) => (m === "signin" ? "signup" : "signin"))}
                className="admin-text-button"
              >
                {mode === "signin"
                  ? "Need an account? Sign up"
                  : "Already have an account? Sign in"}
              </button>
              <Link to="/" className="admin-back">
                ← Back to website
              </Link>
            </section>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
