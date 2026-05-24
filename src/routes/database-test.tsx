import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { supabase } from "@/lib/supabase";
import { CheckCircle2, XCircle, RefreshCw, Database, Shield } from "lucide-react";
import { Header } from "@/components/portfolio/Header";
import { Footer } from "@/components/portfolio/Footer";

export const Route = createFileRoute("/database-test")({
  head: () => ({
    meta: [
      { title: "Database Connection Test — Zain The Analyst" },
      { name: "description", content: "Supabase connection diagnostics for Zain Haidar's portfolio database tables." }
    ]
  }),
  component: DatabaseTestPage
});

interface TableStatus {
  name: string;
  status: "idle" | "loading" | "success" | "failed";
  count?: number;
  errorMsg?: string;
}

const TABLES_TO_TEST = [
  "projects",
  "posts",
  "experience",
  "skills",
  "certifications",
  "services",
  "leads"
];

function DatabaseTestPage() {
  const [results, setResults] = useState<TableStatus[]>(
    TABLES_TO_TEST.map((t) => ({ name: t, status: "idle" }))
  );
  const [testingAll, setTestingAll] = useState(false);

  const testTableConnection = async (tableName: string) => {
    try {
      setResults((prev) =>
        prev.map((item) =>
          item.name === tableName ? { ...item, status: "loading" } : item
        )
      );

      // Perform a simple count or SELECT query to test connectivity and RLS
      const { data, error, count } = await supabase
        .from(tableName)
        .select("*", { count: "exact", head: false });

      if (error) {
        throw error;
      }

      setResults((prev) =>
        prev.map((item) =>
          item.name === tableName
            ? {
                ...item,
                status: "success",
                count: data?.length ?? count ?? 0
              }
            : item
        )
      );
    } catch (err: any) {
      console.error(`Error querying table ${tableName}:`, err);
      setResults((prev) =>
        prev.map((item) =>
          item.name === tableName
            ? {
                ...item,
                status: "failed",
                errorMsg: err.message || JSON.stringify(err)
              }
            : item
        )
      );
    }
  };

  const runAllTests = async () => {
    setTestingAll(true);
    for (const table of TABLES_TO_TEST) {
      await testTableConnection(table);
    }
    setTestingAll(false);
  };

  useEffect(() => {
    runAllTests();
  }, []);

  return (
    <div className="min-h-screen bg-[#F8FAFC] flex flex-col font-poppins">
      <Header />
      
      <main className="flex-grow pt-32 pb-24">
        <div className="max-w-4xl mx-auto px-4">
          
          {/* Diagnostic Header */}
          <div className="bg-[#0F172A] rounded-2xl p-8 text-white mb-10 shadow-lg relative overflow-hidden">
            <div className="absolute right-0 top-0 translate-x-12 -translate-y-12 w-64 h-64 rounded-full bg-blue-600/10 blur-3xl" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-6 relative z-10">
              <div>
                <div className="flex items-center gap-3 mb-2">
                  <Database className="h-6 w-6 text-blue-400" />
                  <span className="text-xs font-semibold uppercase tracking-wider text-blue-400 bg-blue-500/10 px-3 py-1 rounded-full border border-blue-500/20">
                    Diagnostics
                  </span>
                </div>
                <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                  Database Connection Tester
                </h1>
                <p className="text-slate-400 text-sm max-w-lg leading-relaxed">
                  Validates direct connection to Supabase and assesses table accessibility under existing RLS (Row Level Security) policies.
                </p>
              </div>
              
              <button
                onClick={runAllTests}
                disabled={testingAll}
                className="flex items-center gap-2 px-5 py-3 rounded-xl bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm shadow-md hover:shadow-lg transition-all shrink-0 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <RefreshCw className={`h-4 w-4 ${testingAll ? "animate-spin" : ""}`} />
                {testingAll ? "Running Tests..." : "Run All Tests"}
              </button>
            </div>
          </div>

          {/* Connection Overview Warning */}
          <div className="mb-8 p-4 bg-slate-50 border border-slate-200 rounded-xl flex items-start gap-3">
            <Shield className="h-5 w-5 text-[#2563EB] shrink-0 mt-0.5" />
            <div>
              <h4 className="text-sm font-semibold text-[#0F172A]">Security Standard Active</h4>
              <p className="text-xs text-slate-500 leading-relaxed mt-0.5">
                Client credentials are used directly. All write and read methods adhere to your exact database RLS policies. Service role keys are not used.
              </p>
            </div>
          </div>

          {/* Results Grid */}
          <div className="grid sm:grid-cols-2 gap-6">
            {results.map((res) => (
              <div
                key={res.name}
                className="card-pro p-6 flex flex-col justify-between hover:border-slate-300 transition-all duration-200"
              >
                <div>
                  {/* Table Header */}
                  <div className="flex items-center justify-between mb-4">
                    <span className="font-bold text-slate-800 text-base capitalize font-poppins">
                      {res.name}
                    </span>
                    
                    {res.status === "loading" && (
                      <span className="flex h-5 w-5 relative">
                        <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-400 opacity-75"></span>
                        <span className="relative inline-flex rounded-full h-5 w-5 bg-blue-500"></span>
                      </span>
                    )}

                    {res.status === "success" && (
                      <div className="flex items-center gap-1.5 text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-full border border-emerald-100 text-xs font-semibold">
                        <CheckCircle2 className="h-3.5 w-3.5" />
                        <span>Connected</span>
                      </div>
                    )}

                    {res.status === "failed" && (
                      <div className="flex items-center gap-1.5 text-rose-600 bg-rose-50 px-2.5 py-1 rounded-full border border-rose-100 text-xs font-semibold">
                        <XCircle className="h-3.5 w-3.5" />
                        <span>Failed</span>
                      </div>
                    )}

                    {res.status === "idle" && (
                      <span className="text-xs text-slate-400 font-medium">Waiting...</span>
                    )}
                  </div>

                  {/* Body Info */}
                  <div className="mt-2 space-y-1">
                    {res.status === "success" && (
                      <div className="text-sm font-poppins text-slate-500">
                        Total records: <span className="font-semibold text-slate-800">{res.count} rows</span>
                      </div>
                    )}

                    {res.status === "failed" && (
                      <div className="bg-rose-50/50 border border-rose-100 rounded-lg p-3 mt-2">
                        <span className="block text-xs font-semibold text-rose-800 uppercase tracking-wider mb-1">
                          Error Details
                        </span>
                        <span className="block text-xs font-mono text-rose-600 break-all leading-normal">
                          {res.errorMsg}
                        </span>
                      </div>
                    )}

                    {res.status === "loading" && (
                      <div className="h-8 bg-slate-50 rounded animate-pulse" />
                    )}
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-slate-100 flex justify-end">
                  <button
                    onClick={() => testTableConnection(res.name)}
                    disabled={res.status === "loading" || testingAll}
                    className="text-xs text-blue-600 hover:text-blue-700 font-semibold cursor-pointer disabled:opacity-50"
                  >
                    Test Table
                  </button>
                </div>
              </div>
            ))}
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}
