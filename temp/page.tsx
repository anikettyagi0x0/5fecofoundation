"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { BrowserProvider } from "ethers";
import { api } from "./lib/api";

export default function ModernLogin() {
  const router = useRouter();
  const [status, setStatus] = useState<string>("System Standby");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (localStorage.getItem("vagnox_token")) {
      router.push("/dashboard");
    }
  }, [router]);

  const handleAuthenticate = async () => {
    setError(null);
    setIsLoading(true);
    try {
      if (!window.ethereum) {
        throw new Error("No Web3 provider detected. Please install MetaMask.");
      }

      setStatus("Initializing Provider...");
      const provider = new BrowserProvider(window.ethereum);

      setStatus("Requesting Wallet Access...");
      const signer = await provider.getSigner();
      const walletAddress = await signer.getAddress();

      setStatus(`Fetching challenge for ${walletAddress.substring(0, 6)}...`);
      // message is the full EIP-4361 string MetaMask will render as structured UI
      // nonce is kept separately to send back for server-side verification
      const { nonce, message } = await api.getNonce(walletAddress);

      setStatus("Awaiting Cryptographic Signature...");
      // Sign the full SIWE message — MetaMask will display it in a readable format
      const signature = await signer.signMessage(message);

      setStatus("Verifying Payload...");
      // Send nonce (not message) back — server reconstructs message itself
      const { access_token } = await api.verifySignature(walletAddress, nonce, signature);

      setStatus("Access Granted.");
      localStorage.setItem("vagnox_token", access_token);

      setTimeout(() => router.push("/dashboard"), 800);

    } catch (err: any) {
      console.error(err);
      setError(err.message || "Authentication sequence aborted.");
      setStatus("System Standby");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen flex flex-col items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-[#712fff] opacity-20 blur-[120px] rounded-full pointer-events-none" />

      <div className="relative z-10 flex flex-col items-center w-full max-w-md space-y-8">

        <div className="Welcome-box px-4 py-2 border border-[#a48fff3d]">
          <span className="text-sm font-medium text-gray-300">
            {isLoading ? "⚡ " : "🔒 "} {status}
          </span>
        </div>

        <div className="text-center space-y-4">
          <h1 className="text-5xl font-bold tracking-tight Welcome-text pb-2">
            Vagnox Auth
          </h1>
          <p className="text-gray-400 text-sm">
            Sign a cryptographic message to establish a secure session.
          </p>
        </div>

        {error && (
          <div className="w-full p-4 rounded-xl bg-red-500/10 border border-red-500/30 text-red-400 text-sm text-center backdrop-blur-md">
            {error}
          </div>
        )}

        <button
          onClick={handleAuthenticate}
          disabled={isLoading}
          className="button-primary w-full py-4 rounded-2xl text-white font-semibold tracking-wide transition-all hover:scale-[1.02] active:scale-[0.98] border border-[#a48fff3d] disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isLoading ? "Authenticating..." : "Connect Wallet"}
        </button>

        <p className="cursive text-[#ba9cff] text-xl pt-8 opacity-70">
          Secure by design.
        </p>
      </div>
    </main>
  );
}