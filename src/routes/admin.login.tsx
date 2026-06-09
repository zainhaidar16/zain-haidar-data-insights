import { createFileRoute, useNavigate } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { Loader2, Lock } from "lucide-react";

export const Route = createFileRoute("/admin/login")({
  head: () => ({
    meta: [
      { title: "Sign In — Zain The Analyst Studio" },
      { name: "robots", content: "noindex, nofollow" }
    ]
  }),
  component: AdminLoginPage
});

function AdminLoginPage() {
  const navigate = useNavigate();
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
    <main className="min-h-screen bg-[#F8FAFC] flex items-center justify-center font-poppins px-4">
      <div className="w-full max-w-md">
        
        {/* Branding header */}
        <div className="flex flex-col items-center mb-8">
          <div className="h-12 w-12 rounded-xl bg-blue-600 flex items-center justify-center font-bold text-white text-base shadow-lg shadow-blue-500/25 mb-3 select-none">
            ZA
          </div>
          <h1 className="font-bold text-2xl text-slate-900 tracking-tight">Zain The Analyst</h1>
          <p className="text-xs text-slate-555 font-semibold mt-1 tracking-wider uppercase">Studio Control Room</p>
        </div>

        {/* Login Card */}
        <div className="bg-[#0E0E11] border border-slate-200/60 shadow-xl shadow-slate-100 rounded-3xl p-8">
          <div className="flex items-center gap-2.5 mb-6 text-slate-800">
            <Lock className="h-5 w-5 text-blue-600 shrink-0" />
            <h2 className="font-bold text-lg">Admin Authentication</h2>
          </div>

          <form onSubmit={handleLogin} className="space-y-4">
            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
                Email Address
              </label>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="admin@zaintheanalyst.com"
                className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-blue-600 focus:bg-[#0E0E11] transition shadow-sm"
              />
            </div>

            <div>
              <label className="block text-[10px] font-semibold text-slate-400 uppercase tracking-widest mb-1.5">
                Password
              </label>
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-xl bg-slate-50 border border-slate-200 px-4 py-3 text-sm focus:outline-none focus:border-blue-600 focus:bg-[#0E0E11] transition shadow-sm"
              />
            </div>

            {error && (
              <div className="rounded-xl border border-rose-200 bg-rose-50 text-rose-600 text-xs px-4 py-3 font-medium leading-relaxed">
                {error}
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full inline-flex items-center justify-center gap-2 rounded-xl bg-blue-600 hover:bg-blue-700 text-white px-5 py-3.5 text-sm font-semibold tracking-wide shadow-md shadow-blue-500/10 hover:shadow-blue-500/20 disabled:opacity-60 transition cursor-pointer"
            >
              {loading && <Loader2 className="h-4 w-4 animate-spin text-white" />}
              <span>{loading ? "Authenticating..." : "Sign In to Dashboard"}</span>
            </button>
          </form>
        </div>

        {/* Back Link */}
        <div className="text-center mt-6">
          <a
            href="/"
            className="text-xs text-slate-400 hover:text-slate-650 font-semibold tracking-wide transition"
          >
            ← Back to Website
          </a>
        </div>

      </div>
    </main>
  );
}
