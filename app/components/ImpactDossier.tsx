"use client";

import React from "react";
import ScrollReveal from "./utils/ScrollReveal"; // Using your new component
import { GiRadarSweep } from "react-icons/gi";
import { SiTarget } from "react-icons/si";

const ImpactDossier = () => {
  return (
    <section className="relative py-24 bg-[#0a0d08] border-t border-white/5 overflow-hidden">
      {/* Background Grid Pattern from your tailwind config */}
      <div className="absolute inset-0 bg-grid-pattern opacity-10 pointer-events-none" />
      
      <div className="max-w-7xl mx-auto px-8 md:px-12 relative z-10">
        <ScrollReveal stagger={true}>
          {/* Section Header */}
          <div className="mb-20">
            <div className="flex items-center gap-3 mb-4">
              <GiRadarSweep className="text-[#4d7c0f] text-xl animate-pulse" />
              <span className="text-[#a8c69f] font-mono text-[10px] tracking-[0.5em] uppercase">
                Mission Intelligence / Ref: 2026-ID
              </span>
            </div>
            <h2 className="text-white text-5xl md:text-7xl font-[family-name:var(--font-bebas)] tracking-tight">
              TACTICAL <span className="text-white/20">OVERSIGHT</span>
            </h2>
          </div>

          {/* Dossier Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-start">
            
            {/* Left Column: The "About" Intelligence */}
            <div className="space-y-8">
              <p className="text-white/70 text-lg leading-relaxed font-[family-name:var(--font-outfit)] max-w-xl">
                GlobalHope operates at the intersection of blockchain security and environmental 
                preservation. We utilize decentralized ledger technology to verify 
                conservation efforts in real-time, ensuring that every hectare of the Sumatran 
                canopy is accounted for through immutable telemetry data.
              </p>
              
              <div className="grid grid-cols-2 gap-8 pt-8 border-t border-white/10">
                <div>
                  <h5 className="text-[#a8c69f] font-mono text-[10px] uppercase tracking-widest mb-2">Protocol</h5>
                  <p className="text-white font-bold tracking-wide uppercase text-sm">AuditX3.0 Verified</p>
                </div>
                <div>
                  <h5 className="text-[#a8c69f] font-mono text-[10px] uppercase tracking-widest mb-2">Location</h5>
                  <p className="text-white font-bold tracking-wide uppercase text-sm">Indonesia / 0°47'S 100°12'E</p>
                </div>
              </div>
            </div>

            {/* Right Column: Visual Data Element */}
            <div className="relative aspect-video bg-zinc-950/50 border border-white/10 rounded-sm p-8 flex items-center justify-center overflow-hidden">
               {/* Scanline animation from your config */}
               <div className="absolute inset-0 w-full h-[2px] bg-[#4d7c0f]/20 blur-sm animate-scanline z-20" />
               
               <div className="text-center space-y-4">
                 <SiTarget className="text-white/10 text-9xl absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 rotate-12" />
                 <p className="text-[#4d7c0f] font-mono text-4xl font-black">74.2%</p>
                 <p className="text-white/40 text-[10px] uppercase tracking-[0.4em]">Biometric Habitat Integrity</p>
               </div>
            </div>

          </div>
        </ScrollReveal>
      </div>
    </section>
  );
};

export default ImpactDossier;