"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { api } from "../lib/api";

export default function ModernDashboard() {
  const router = useRouter();
  const [wallet, setWallet] = useState<string>("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const verifySession = async () => {
      const token = localStorage.getItem("vagnox_token");
      if (!token) {
        router.push("/");
        return;
      }

      try {
        const data = await api.getMe(token);
        setWallet(data.wallet_address);
        setLoading(false);
      } catch {
        localStorage.removeItem("vagnox_token");
        router.push("/");
      }
    };

    verifySession();
  }, [router]);

  const handleLogout = async () => {
    const token = localStorage.getItem("vagnox_token");
    if (token) {
      try {
        await api.logout(token);
      } catch (e) {
        console.error("Logout failed", e);
      }
    }
    localStorage.removeItem("vagnox_token");
    router.push("/");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <div className="Welcome-box px-6 py-3 border border-[#a48fff3d]">
          <span className="Welcome-text font-bold">Decrypting Session...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen p-6 md:p-12 relative">
      {/* Background radial */}
      <div className="absolute top-0 left-0 w-full h-96 bg-gradient-to-b from-[#712fff]/10 to-transparent pointer-events-none" />

      <div className="max-w-6xl mx-auto space-y-8 relative z-10">
        
        {/* Header */}
        <header className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-[#a48fff1f] pb-6">
          <div>
            <h1 className="text-3xl font-bold Welcome-text">Vagnox Overseer</h1>
            <p className="text-gray-400 mt-1 text-sm flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#ba9cff] animate-pulse" />
              Connected: <span className="font-mono text-[#e59cff]">{wallet}</span>
            </p>
          </div>
          <button 
            onClick={handleLogout}
            className="button-primary px-6 py-2 rounded-xl text-sm font-medium border border-[#a48fff3d] hover:bg-white/5 transition-colors"
          >
            Sever Connection
          </button>
        </header>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          
          {/* Card 1 */}
          <div className="rounded-3xl border border-[#a48fff1f] bg-white/[0.02] backdrop-blur-xl p-6 shadow-lg shadow-black/50">
            <h3 className="text-gray-400 text-sm font-medium mb-4">Network Status</h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-sm">Mainframe</span>
                <span className="text-[#ba9cff] text-sm">Operational</span>
              </div>
              <div className="flex justify-between items-center border-b border-white/5 pb-2">
                <span className="text-sm">Authentication</span>
                <span className="text-[#ba9cff] text-sm">Secured via JWT</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm">Whitelist Cache</span>
                <span className="text-[#ba9cff] text-sm">Synced</span>
              </div>
            </div>
          </div>

          {/* Card 2 - Activity Log with your custom scan animation */}
          <div className="md:col-span-2 rounded-3xl border border-[#a48fff1f] bg-white/[0.02] backdrop-blur-xl p-6 shadow-lg shadow-black/50 relative overflow-hidden group">
            
            {/* The scanline element utilizing your keyframes */}
            <div className="absolute left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-[#ba9cff] to-transparent opacity-0 group-hover:animate-scan z-0 pointer-events-none" />

            <h3 className="text-gray-400 text-sm font-medium mb-4 relative z-10">Recent Activity</h3>
            <div className="space-y-3 relative z-10 font-mono text-xs md:text-sm">
              <div className="flex gap-4 text-gray-300 bg-black/20 p-3 rounded-lg border border-white/5">
                <span className="text-gray-500">[System]</span>
                <span>Session verified successfully. JWT issued.</span>
              </div>
              <div className="flex gap-4 text-gray-300 bg-black/20 p-3 rounded-lg border border-white/5">
                <span className="text-gray-500">[Auth]</span>
                <span>Cryptographic signature validated against whitelist.</span>
              </div>
              <div className="flex gap-4 text-gray-300 bg-black/20 p-3 rounded-lg border border-white/5">
                <span className="text-gray-500">[Network]</span>
                <span>Connecting to Vagnox secure routing layer...</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}