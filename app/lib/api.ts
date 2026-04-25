/**
 * lib/api.ts
 *
 * Typed API client for Vagnox backend.
 * Combines Web3 Authentication (Nonce/Signature) with Dashboard Operations.
 * All authenticated calls use the JWT stored in localStorage.
 */

const BASE = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000";

export class ApiError extends Error {
  constructor(public status: number, message: string) {
    super(message);
  }
}

async function request<T>(
  path: string,
  options: RequestInit = {},
  token?: string,
): Promise<T> {
  const headers: Record<string, string> = {
    "Content-Type": "application/json",
    ...(options.headers as Record<string, string> || {}),
  };

  if (token) {
    headers["Authorization"] = `Bearer ${token}`;
  }

  const res = await fetch(`${BASE}${path}`, { ...options, headers });

  if (!res.ok) {
    const body = await res.json().catch(() => ({ detail: "Unknown error" }));
    throw new ApiError(res.status, body.detail || "Request failed");
  }

  return res.json();
}

export const api = {

  // ── Auth (Web3 Login Flow) ────────────────────────────────────

  getNonce(walletAddress: string) {
    return request<{ nonce: string; message: string }>("/api/v1/auth/nonce", {
      method: "POST",
      body: JSON.stringify({ wallet_address: walletAddress }),
    });
  },

  verifySignature(walletAddress: string, nonce: string, signature: string) {
    return request<{ access_token: string; token_type: string; wallet_address: string }>("/api/v1/auth/verify", {
      method: "POST",
      body: JSON.stringify({ wallet_address: walletAddress, nonce, signature }),
    });
  },

  getMe(token: string) {
    return request<{ wallet_address: string }>("/api/v1/auth/me", {}, token);
  },

  logout(token: string) {
    return request<{ detail: string }>("/api/v1/auth/logout", { method: "POST" }, token);
  },

  // ── Scan Jobs ─────────────────────────────────────────────────

  listJobs(token: string, status?: string) {
    const qs = status ? `?status_filter=${status}` : "";
    return request<{
      jobs: Array<{
        id: string;
        target: string;
        tools: string[];
        status: "pending" | "running" | "completed" | "failed" | "cancelled";
        created_at: string;
        started_at?: string;
        completed_at?: string;
      }>;
      total: number;
      limit: number;
      offset: number;
    }>(`/api/v1/scan/jobs${qs}`, {}, token);
  },

  createJob(token: string, target: string, tools: string[]) {
    return request<{
      job_id: string;
      target: string;
      tools: string[];
      status: string;
      message: string;
    }>("/api/v1/scan/jobs", {
      method: "POST",
      body: JSON.stringify({ target, tools }),
    }, token);
  },

  getJob(token: string, jobId: string) {
    return request<{
      id: string;
      wallet_address: string;
      target: string;
      tools: string[];
      status: string;
      created_at: string;
      started_at?: string;
      completed_at?: string;
    }>(`/api/v1/scan/jobs/${jobId}`, {}, token);
  },

  getJobResults(token: string, jobId: string) {
    return request<Array<{
      id: string;
      job_id: string;
      tool: string;
      output: string;
      created_at: string;
    }>>(`/api/v1/scan/jobs/${jobId}/results`, {}, token);
  },

  cancelJob(token: string, jobId: string) {
    return request<{ job_id: string; status: string }>(
      `/api/v1/scan/jobs/${jobId}/cancel`,
      { method: "POST" },
      token,
    );
  },

  deleteJob(token: string, jobId: string) {
    return request<{ job_id: string; status: string }>(
      `/api/v1/scan/jobs/${jobId}`,
      { method: "DELETE" },
      token,
    );
  },

  // ── CLI Tokens ────────────────────────────────────────────────

  listCliTokens(token: string) {
    return request<{
      tokens: Array<{
        token_prefix: string;
        label: string;
        is_active: boolean;
        created_at: string;
        expires_at?: string;
        last_used?: string;
      }>;
      total: number;
    }>("/api/v1/cli-tokens/", {}, token);
  },

  generateCliToken(token: string, label: string, expiresInDays = 30) {
    return request<{
      token: string;
      token_prefix: string;
      label: string;
      expires_at: string;
      created_at: string;
      message: string;
    }>("/api/v1/cli-tokens/generate", {
      method: "POST",
      body: JSON.stringify({ label, expires_in_days: expiresInDays }),
    }, token);
  },

  revokeCliToken(token: string, tokenPrefix: string) {
    return request<{
      token_prefix: string;
      revoked: boolean;
      message: string;
    }>(`/api/v1/cli-tokens/${tokenPrefix}`, {
      method: "DELETE",
    }, token);
  },
};