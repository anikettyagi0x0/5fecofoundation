"use client";

import { useEffect, useState, useRef, useCallback } from "react";
import { useRouter } from "next/navigation";
import { api } from "../lib/api";

// ─── Types ───────────────────────────────────────────────────────
interface Job {
  id: string;
  target: string;
  tools: string[];
  status: "pending" | "running" | "completed" | "failed" | "cancelled";
  created_at: string;
  started_at?: string;
  completed_at?: string;
}

interface CliToken {
  token_prefix: string;
  label: string;
  is_active: boolean;
  created_at: string;
  expires_at?: string;
  last_used?: string;
}

interface ActivityEntry {
  tag: string;
  message: string;
  ts: string;
  type: "info" | "success" | "error" | "warn";
}

interface NewJobForm {
  target: string;
  tools: string[];
}

const ALLOWED_TOOLS = [
  "nmap", "subfinder", "httpx", "nuclei",
  "ffuf", "amass", "waybackurls", "katana", "dnsx", "whois",
];

const STATUS_COLORS: Record<string, string> = {
  pending:   "text-yellow-400 bg-yellow-400/10 border-yellow-400/20",
  running:   "text-blue-400 bg-blue-400/10 border-blue-400/20",
  completed: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
  failed:    "text-red-400 bg-red-400/10 border-red-400/20",
  cancelled: "text-gray-400 bg-gray-400/10 border-gray-400/20",
};

const STATUS_DOT: Record<string, string> = {
  pending:   "bg-yellow-400",
  running:   "bg-blue-400 animate-pulse",
  completed: "bg-emerald-400",
  failed:    "bg-red-400",
  cancelled: "bg-gray-500",
};

function fmt(iso: string) {
  return new Date(iso).toLocaleString("en-US", {
    month: "short", day: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

function shortWallet(w: string) {
  return `${w.slice(0, 6)}...${w.slice(-4)}`;
}

// ─── Main Component ───────────────────────────────────────────────
export default function VagnoxDashboard() {
  const router = useRouter();

  // ── Auth state
  const [wallet, setWallet]   = useState("");
  const [token, setToken]     = useState("");
  const [loading, setLoading] = useState(true);

  // ── Data state
  const [jobs, setJobs]       = useState<Job[]>([]);
  const [cliTokens, setCliTokens] = useState<CliToken[]>([]);
  const [activity, setActivity]   = useState<ActivityEntry[]>([]);

  // ── UI state
  const [activeTab, setActiveTab]         = useState<"jobs" | "tokens">("jobs");
  const [showNewJob, setShowNewJob]       = useState(false);
  const [showNewToken, setShowNewToken]   = useState(false);
  const [newJob, setNewJob]               = useState<NewJobForm>({ target: "", tools: [] });
  const [newTokenLabel, setNewTokenLabel] = useState("");
  const [generatedToken, setGeneratedToken] = useState<string | null>(null);
  const [actionLoading, setActionLoading]   = useState(false);
  const [jobsLoading, setJobsLoading]       = useState(false);
  const [tokensLoading, setTokensLoading]   = useState(false);

  // ── WebSocket refs — one per running job
  const wsRefs = useRef<Map<string, WebSocket>>(new Map());
  const activityRef = useRef<HTMLDivElement>(null);

  // ─── Activity logger ────────────────────────────────────────────
  const log = useCallback((tag: string, message: string, type: ActivityEntry["type"] = "info") => {
    // FIX: Using standardized padStart formatting protects against rare hydration locale mismatches
    const now = new Date();
    const ts = `${String(now.getHours()).padStart(2, '0')}:${String(now.getMinutes()).padStart(2, '0')}:${String(now.getSeconds()).padStart(2, '0')}`;
    
    const entry: ActivityEntry = { tag, message, type, ts };
    setActivity(prev => [entry, ...prev].slice(0, 50));
  }, []);

  // ─── Fetch jobs ─────────────────────────────────────────────────
  const fetchJobs = useCallback(async (t: string) => {
    setJobsLoading(true);
    try {
      const data = await api.listJobs(t);
      setJobs(data.jobs || []);
    } catch {
      log("Jobs", "Failed to fetch scan jobs", "error");
    } finally {
      setJobsLoading(false);
    }
  }, [log]);

  // ─── Fetch CLI tokens ───────────────────────────────────────────
  const fetchCliTokens = useCallback(async (t: string) => {
    setTokensLoading(true);
    try {
      const data = await api.listCliTokens(t);
      setCliTokens(data.tokens || []);
    } catch {
      log("Tokens", "Failed to fetch CLI tokens", "error");
    } finally {
      setTokensLoading(false);
    }
  }, [log]);

  // ─── WebSocket for live job updates ─────────────────────────────
  const subscribeToJob = useCallback((jobId: string, t: string) => {
    if (wsRefs.current.has(jobId)) return;

    const wsUrl = process.env.NEXT_PUBLIC_WS_URL || "ws://localhost:8000";
    const ws = new WebSocket(`${wsUrl}/ws/scan/${jobId}?token=${t}`);

    // FIX: Add intentional close flag for auto-reconnect strategy
    (ws as any).intentionalClose = false;

    ws.onopen = () => log("WS", `Subscribed to job ${jobId.slice(0, 8)}...`, "info");

    ws.onmessage = (e) => {
      try {
        const msg = JSON.parse(e.data);
        if (msg.type === "status") {
          setJobs(prev => prev.map(j =>
            j.id === jobId ? { ...j, status: msg.status } : j
          ));
          log("Job", `${jobId.slice(0, 8)}... → ${msg.status}`,
            msg.status === "completed" ? "success" :
            msg.status === "failed" ? "error" : "info"
          );
          
          if (["completed", "failed", "cancelled"].includes(msg.status)) {
            (ws as any).intentionalClose = true;
            ws.close();
            wsRefs.current.delete(jobId);
          }
        }
        if (msg.type === "result") {
          log("Result", `[${msg.tool}] ${msg.output?.slice(0, 80)}...`, "info");
        }
      } catch {}
    };

    ws.onerror = () => log("WS", `Connection error for job ${jobId.slice(0, 8)}`, "error");
    
    ws.onclose = () => {
      wsRefs.current.delete(jobId);
      // FIX: Auto-reconnect if the connection drops unexpectedly
      if (!(ws as any).intentionalClose) {
        log("WS", `Connection dropped for ${jobId.slice(0, 8)}. Reconnecting...`, "warn");
        setTimeout(() => {
          setJobs(currentJobs => {
            const job = currentJobs.find(j => j.id === jobId);
            if (job && ["pending", "running"].includes(job.status)) {
              subscribeToJob(jobId, t);
            }
            return currentJobs;
          });
        }, 3000);
      }
    };

    wsRefs.current.set(jobId, ws);
  }, [log]);

  // ─── Session verify on mount ────────────────────────────────────
  useEffect(() => {
    const verify = async () => {
      const t = localStorage.getItem("vagnox_token");
      if (!t) { router.push("/"); return; }

      try {
        const data = await api.getMe(t);
        setWallet(data.wallet_address);
        setToken(t);
        log("System", "Session verified. JWT valid.", "success");
        log("Auth", `Wallet ${shortWallet(data.wallet_address)} authenticated.`, "success");
        await fetchJobs(t);
        await fetchCliTokens(t);
        setLoading(false);
      } catch {
        localStorage.removeItem("vagnox_token");
        router.push("/");
      }
    };
    verify();

    return () => {
      wsRefs.current.forEach(ws => {
        (ws as any).intentionalClose = true;
        ws.close();
      });
      wsRefs.current.clear();
    };
  }, [router, fetchJobs, fetchCliTokens, log]);

  // ─── Subscribe to running jobs ───────────────────────────────────
  useEffect(() => {
    if (!token) return;
    jobs.filter(j => j.status === "running").forEach(j => subscribeToJob(j.id, token));
  }, [jobs, token, subscribeToJob]);

  // ─── Actions ─────────────────────────────────────────────────────

  const handleLogout = async () => {
    try { await api.logout(token); } catch {}
    wsRefs.current.forEach(ws => {
      (ws as any).intentionalClose = true;
      ws.close();
    });
    localStorage.removeItem("vagnox_token");
    router.push("/");
  };

  const handleCreateJob = async () => {
    if (!newJob.target || newJob.tools.length === 0) return;
    setActionLoading(true);
    try {
      const data = await api.createJob(token, newJob.target, newJob.tools);
      log("Jobs", `Job created for ${newJob.target} — ${data.job_id?.slice(0, 8)}...`, "success");
      setShowNewJob(false);
      setNewJob({ target: "", tools: [] });
      await fetchJobs(token);
    } catch {
      log("Jobs", "Failed to create job", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleCancelJob = async (jobId: string) => {
    try {
      await api.cancelJob(token, jobId);
      log("Jobs", `Job ${jobId.slice(0, 8)}... cancelled`, "warn");
      setJobs(prev => prev.map(j => j.id === jobId ? { ...j, status: "cancelled" } : j));
    } catch {
      log("Jobs", "Failed to cancel job", "error");
    }
  };

  const handleDeleteJob = async (jobId: string) => {
    try {
      await api.deleteJob(token, jobId);
      log("Jobs", `Job ${jobId.slice(0, 8)}... deleted`, "warn");
      setJobs(prev => prev.filter(j => j.id !== jobId));
    } catch {
      log("Jobs", "Cannot delete — job may still be active", "error");
    }
  };

  const handleGenerateToken = async () => {
    if (!newTokenLabel.trim()) return;
    setActionLoading(true);
    try {
      const data = await api.generateCliToken(token, newTokenLabel);
      setGeneratedToken(data.token);
      log("Tokens", `CLI token "${newTokenLabel}" generated`, "success");
      await fetchCliTokens(token);
    } catch {
      log("Tokens", "Failed to generate token", "error");
    } finally {
      setActionLoading(false);
    }
  };

  const handleRevokeToken = async (prefix: string) => {
    try {
      await api.revokeCliToken(token, prefix);
      log("Tokens", `Token ${prefix} revoked`, "warn");
      setCliTokens(prev => prev.map(t =>
        t.token_prefix === prefix ? { ...t, is_active: false } : t
      ));
    } catch {
      log("Tokens", "Failed to revoke token", "error");
    }
  };

  const toggleTool = (tool: string) => {
    setNewJob(prev => ({
      ...prev,
      tools: prev.tools.includes(tool)
        ? prev.tools.filter(t => t !== tool)
        : [...prev.tools, tool],
    }));
  };

  // ─── Derived stats ────────────────────────────────────────────
  const stats = {
    total:     jobs.length,
    running:   jobs.filter(j => j.status === "running").length,
    completed: jobs.filter(j => j.status === "completed").length,
    failed:    jobs.filter(j => j.status === "failed").length,
    activeTokens: cliTokens.filter(t => t.is_active).length,
  };

  // ─── Loading screen ───────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4">
        <div className="Welcome-box px-6 py-3 border border-[#a48fff3d]">
          <span className="Welcome-text font-bold">Decrypting Session...</span>
        </div>
        <div className="flex gap-1">
          {[0,1,2].map(i => (
            <div key={i} className="w-1.5 h-1.5 rounded-full bg-[#ba9cff] animate-pulse"
              style={{ animationDelay: `${i * 150}ms` }} />
          ))}
        </div>
      </div>
    );
  }

  // ─── Dashboard ────────────────────────────────────────────────
  return (
    <div className="min-h-screen p-4 md:p-8 relative">
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#712fff]/10 to-transparent pointer-events-none" />

      <div className="max-w-7xl mx-auto space-y-6 relative z-10">

        {/* ── Header ── */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#a48fff1f] pb-6">
          <div>
            <h1 className="text-3xl font-bold Welcome-text">Vagnox Overseer</h1>
            <p className="text-gray-400 mt-1 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[#e59cff]">{wallet}</span>
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button
              onClick={() => { fetchJobs(token); fetchCliTokens(token); }}
              className="px-4 py-2 rounded-xl text-sm font-medium border border-[#a48fff3d] hover:bg-white/5 transition-colors text-gray-400"
            >
              ↻ Refresh
            </button>
            <button
              onClick={handleLogout}
              className="button-primary px-6 py-2 rounded-xl text-sm font-medium border border-[#a48fff3d] hover:bg-white/5 transition-colors"
            >
              Sever Connection
            </button>
          </div>
        </header>

        {/* ── Stats Row ── */}
        <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
          {[
            { label: "Total Jobs",     value: stats.total,        color: "text-white" },
            { label: "Running",        value: stats.running,      color: "text-blue-400" },
            { label: "Completed",      value: stats.completed,    color: "text-emerald-400" },
            { label: "Failed",         value: stats.failed,       color: "text-red-400" },
            { label: "Active Tokens",  value: stats.activeTokens, color: "text-[#ba9cff]" },
          ].map(s => (
            <div key={s.label} className="rounded-2xl border border-[#a48fff1f] bg-white/[0.02] p-4 text-center">
              <div className={`text-2xl font-bold font-mono ${s.color}`}>{s.value}</div>
              <div className="text-gray-500 text-xs mt-1">{s.label}</div>
            </div>
          ))}
        </div>

        {/* ── Main Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

          {/* ── Left: Jobs + Tokens ── */}
          <div className="lg:col-span-2 space-y-4">

            {/* Tab bar */}
            <div className="flex items-center gap-1 border-b border-[#a48fff1f] pb-0">
              {(["jobs", "tokens"] as const).map(tab => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-5 py-2.5 text-sm font-medium rounded-t-xl transition-colors capitalize border-b-2 ${
                    activeTab === tab
                      ? "border-[#ba9cff] text-[#ba9cff] bg-white/[0.03]"
                      : "border-transparent text-gray-500 hover:text-gray-300"
                  }`}
                >
                  {tab === "jobs" ? `Scan Jobs (${stats.total})` : `CLI Tokens (${stats.activeTokens})`}
                </button>
              ))}
            </div>

            {/* ── Jobs Tab ── */}
            {activeTab === "jobs" && (
              <div className="rounded-2xl border border-[#a48fff1f] bg-white/[0.02] overflow-hidden">
                {/* Job list header */}
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#a48fff1f]">
                  <span className="text-sm text-gray-400 font-medium">Scan Operations</span>
                  <button
                    onClick={() => setShowNewJob(v => !v)}
                    className="px-4 py-1.5 rounded-lg text-xs font-medium bg-[#712fff]/20 border border-[#712fff]/30 text-[#ba9cff] hover:bg-[#712fff]/30 transition-colors"
                  >
                    {showNewJob ? "✕ Cancel" : "+ New Scan"}
                  </button>
                </div>

                {/* New job form */}
                {showNewJob && (
                  <div className="px-5 py-4 border-b border-[#a48fff1f] bg-black/20 space-y-4">
                    <div>
                      <label className="text-xs text-gray-400 block mb-1.5">Target (domain / IP / CIDR)</label>
                      <input
                        type="text"
                        value={newJob.target}
                        onChange={e => setNewJob(p => ({ ...p, target: e.target.value }))}
                        placeholder="example.com"
                        className="w-full bg-black/30 border border-[#a48fff1f] rounded-lg px-3 py-2 text-sm font-mono text-white placeholder-gray-600 focus:outline-none focus:border-[#ba9cff]/50"
                      />
                    </div>
                    <div>
                      <label className="text-xs text-gray-400 block mb-1.5">Tools</label>
                      <div className="flex flex-wrap gap-2">
                        {ALLOWED_TOOLS.map(tool => (
                          <button
                            key={tool}
                            onClick={() => toggleTool(tool)}
                            className={`px-3 py-1 rounded-lg text-xs font-mono transition-colors ${
                              newJob.tools.includes(tool)
                                ? "bg-[#712fff]/30 border border-[#712fff]/50 text-[#ba9cff]"
                                : "bg-white/5 border border-white/10 text-gray-400 hover:text-white"
                            }`}
                          >
                            {tool}
                          </button>
                        ))}
                      </div>
                    </div>
                    <button
                      onClick={handleCreateJob}
                      disabled={actionLoading || !newJob.target || newJob.tools.length === 0}
                      className="px-5 py-2 rounded-lg text-sm font-medium bg-[#712fff]/30 border border-[#712fff]/40 text-[#ba9cff] hover:bg-[#712fff]/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                    >
                      {actionLoading ? "Creating..." : "Launch Scan"}
                    </button>
                  </div>
                )}

                {/* Job list */}
                <div className="divide-y divide-[#a48fff0f]">
                  {jobsLoading ? (
                    <div className="px-5 py-8 text-center text-gray-600 text-sm">Loading jobs...</div>
                  ) : jobs.length === 0 ? (
                    <div className="px-5 py-10 text-center">
                      <div className="text-gray-600 text-sm">No scan jobs yet</div>
                      <div className="text-gray-700 text-xs mt-1">Create one from the dashboard or CLI</div>
                    </div>
                  ) : (
                    jobs.map(job => (
                      <div key={job.id} className="px-5 py-4 hover:bg-white/[0.01] transition-colors">
                        <div className="flex items-start justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2.5 flex-wrap">
                              <span className="font-mono text-sm text-white truncate">{job.target}</span>
                              <span className={`inline-flex items-center gap-1.5 px-2 py-0.5 rounded-md text-xs font-medium border ${STATUS_COLORS[job.status]}`}>
                                <span className={`w-1.5 h-1.5 rounded-full ${STATUS_DOT[job.status]}`} />
                                {job.status}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 mt-1.5 flex-wrap">
                              <span className="text-gray-600 text-xs font-mono">{job.id.slice(0, 8)}...</span>
                              <span className="text-gray-600 text-xs">{fmt(job.created_at)}</span>
                              <div className="flex gap-1 flex-wrap">
                                {job.tools.map(t => (
                                  <span key={t} className="text-xs text-gray-500 bg-white/5 px-1.5 py-0.5 rounded font-mono">{t}</span>
                                ))}
                              </div>
                            </div>
                          </div>
                          <div className="flex items-center gap-2 shrink-0">
                            {["pending", "running"].includes(job.status) && (
                              <button
                                onClick={() => handleCancelJob(job.id)}
                                className="px-3 py-1 rounded-lg text-xs border border-yellow-400/20 text-yellow-400 hover:bg-yellow-400/10 transition-colors"
                              >
                                Cancel
                              </button>
                            )}
                            {["completed", "failed", "cancelled"].includes(job.status) && (
                              <button
                                onClick={() => handleDeleteJob(job.id)}
                                className="px-3 py-1 rounded-lg text-xs border border-red-400/20 text-red-400 hover:bg-red-400/10 transition-colors"
                              >
                                Delete
                              </button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ── CLI Tokens Tab ── */}
            {activeTab === "tokens" && (
              <div className="rounded-2xl border border-[#a48fff1f] bg-white/[0.02] overflow-hidden">
                <div className="flex items-center justify-between px-5 py-4 border-b border-[#a48fff1f]">
                  <span className="text-sm text-gray-400 font-medium">CLI Access Tokens</span>
                  <button
                    onClick={() => { setShowNewToken(v => !v); setGeneratedToken(null); }}
                    className="px-4 py-1.5 rounded-lg text-xs font-medium bg-[#712fff]/20 border border-[#712fff]/30 text-[#ba9cff] hover:bg-[#712fff]/30 transition-colors"
                  >
                    {showNewToken ? "✕ Cancel" : "+ Generate Token"}
                  </button>
                </div>

                {/* Generate token form */}
                {showNewToken && (
                  <div className="px-5 py-4 border-b border-[#a48fff1f] bg-black/20 space-y-3">
                    {generatedToken ? (
                      <div className="space-y-3">
                        <div className="text-xs text-yellow-400 font-medium">
                          ⚠ Copy this token now — it will never be shown again
                        </div>
                        <div className="bg-black/50 border border-[#a48fff1f] rounded-lg p-3 font-mono text-xs text-emerald-400 break-all select-all">
                          {generatedToken}
                        </div>
                        <button
                          onClick={() => { navigator.clipboard.writeText(generatedToken); }}
                          className="px-4 py-1.5 rounded-lg text-xs font-medium bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 hover:bg-emerald-500/20 transition-colors"
                        >
                          Copy to Clipboard
                        </button>
                      </div>
                    ) : (
                      <>
                        <div>
                          <label className="text-xs text-gray-400 block mb-1.5">Token Label</label>
                          <input
                            type="text"
                            value={newTokenLabel}
                            onChange={e => setNewTokenLabel(e.target.value)}
                            placeholder="my-laptop"
                            className="w-full bg-black/30 border border-[#a48fff1f] rounded-lg px-3 py-2 text-sm text-white placeholder-gray-600 focus:outline-none focus:border-[#ba9cff]/50"
                          />
                        </div>
                        <button
                          onClick={handleGenerateToken}
                          disabled={actionLoading || !newTokenLabel.trim()}
                          className="px-5 py-2 rounded-lg text-sm font-medium bg-[#712fff]/30 border border-[#712fff]/40 text-[#ba9cff] hover:bg-[#712fff]/40 transition-colors disabled:opacity-40 disabled:cursor-not-allowed"
                        >
                          {actionLoading ? "Generating..." : "Generate"}
                        </button>
                      </>
                    )}
                  </div>
                )}

                {/* Token list */}
                <div className="divide-y divide-[#a48fff0f]">
                  {tokensLoading ? (
                    <div className="px-5 py-8 text-center text-gray-600 text-sm">Loading tokens...</div>
                  ) : cliTokens.length === 0 ? (
                    <div className="px-5 py-10 text-center">
                      <div className="text-gray-600 text-sm">No CLI tokens</div>
                      <div className="text-gray-700 text-xs mt-1">Generate one to use the CLI tool</div>
                    </div>
                  ) : (
                    cliTokens.map(t => (
                      <div key={t.token_prefix} className="px-5 py-4 hover:bg-white/[0.01] transition-colors">
                        <div className="flex items-center justify-between gap-3">
                          <div className="flex-1 min-w-0">
                            <div className="flex items-center gap-2.5">
                              <span className="text-sm text-white font-medium">{t.label}</span>
                              <span className={`px-2 py-0.5 rounded-md text-xs border ${
                                t.is_active
                                  ? "text-emerald-400 bg-emerald-400/10 border-emerald-400/20"
                                  : "text-gray-500 bg-gray-500/10 border-gray-500/20"
                              }`}>
                                {t.is_active ? "active" : "revoked"}
                              </span>
                            </div>
                            <div className="flex items-center gap-3 mt-1 flex-wrap">
                              <span className="font-mono text-xs text-gray-500">{t.token_prefix}...</span>
                              <span className="text-gray-600 text-xs">Created {fmt(t.created_at)}</span>
                              {t.last_used && (
                                <span className="text-gray-600 text-xs">Last used {fmt(t.last_used)}</span>
                              )}
                              {t.expires_at && (
                                <span className="text-gray-600 text-xs">Expires {fmt(t.expires_at)}</span>
                              )}
                            </div>
                          </div>
                          {t.is_active && (
                            <button
                              onClick={() => handleRevokeToken(t.token_prefix)}
                              className="px-3 py-1 rounded-lg text-xs border border-red-400/20 text-red-400 hover:bg-red-400/10 transition-colors shrink-0"
                            >
                              Revoke
                            </button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}
          </div>

          {/* ── Right: Activity Log ── */}
          <div className="rounded-2xl border border-[#a48fff1f] bg-white/[0.02] overflow-hidden flex flex-col">
            <div className="flex items-center justify-between px-5 py-4 border-b border-[#a48fff1f] shrink-0">
              <span className="text-sm text-gray-400 font-medium">Live Activity</span>
              <button
                onClick={() => setActivity([])}
                className="text-xs text-gray-600 hover:text-gray-400 transition-colors"
              >
                Clear
              </button>
            </div>
            <div ref={activityRef} className="flex-1 overflow-y-auto max-h-[600px] p-3 space-y-1.5 font-mono text-xs">
              {activity.length === 0 ? (
                <div className="text-gray-700 text-center py-8">No activity yet</div>
              ) : (
                activity.map((a, i) => (
                  <div key={i} className="flex gap-2 p-2 rounded-lg bg-black/20 border border-white/[0.03]">
                    <span className="text-gray-600 shrink-0">{a.ts}</span>
                    <span className={`shrink-0 ${
                      a.type === "success" ? "text-emerald-500" :
                      a.type === "error"   ? "text-red-500" :
                      a.type === "warn"    ? "text-yellow-500" :
                      "text-[#ba9cff]"
                    }`}>[{a.tag}]</span>
                    <span className="text-gray-400 break-all">{a.message}</span>
                  </div>
                ))
              )}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}