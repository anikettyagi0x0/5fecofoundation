// src/lib/api.ts
const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:8000/api/v1";

export const api = {
  async getNonce(walletAddress: string) {
    const res = await fetch(`${API_BASE_URL}/auth/nonce`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet_address: walletAddress }),
    });
    if (!res.ok) throw new Error(await parseError(res, "Wallet not authorized."));
    return res.json() as Promise<{ nonce: string; message: string }>;
  },

  async verifySignature(walletAddress: string, nonce: string, signature: string) {
    const res = await fetch(`${API_BASE_URL}/auth/verify`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ wallet_address: walletAddress, nonce, signature }),
    });
    if (!res.ok) throw new Error(await parseError(res, "Signature verification failed."));
    return res.json() as Promise<{ access_token: string; token_type: string; wallet_address: string }>;
  },

  async getMe(token: string) {
    const res = await fetch(`${API_BASE_URL}/auth/me`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error(await parseError(res, "Session invalid."));
    return res.json();
  },

  async logout(token: string) {
    const res = await fetch(`${API_BASE_URL}/auth/logout`, {
      method: "POST",
      headers: { Authorization: `Bearer ${token}` },
    });
    if (!res.ok) throw new Error("Logout failed");
    return res.json();
  },
};

async function parseError(res: Response, fallback: string) {
  try {
    const data = await res.json();
    return data.detail || fallback;
  } catch {
    return fallback;
  }
}