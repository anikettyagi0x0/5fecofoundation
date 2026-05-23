"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bebas_Neue, Outfit } from "next/font/google";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const outfit = Outfit({ weight: ["300", "400", "500", "600"], subsets: ["latin"], variable: "--font-outfit" });

export default function RestorationManifesto() {
  return (
    <section className={`${bebasNeue.variable} ${outfit.variable} bg-[#1a2e15] py-32 md:py-48 w-full relative overflow-hidden flex items-center justify-center`}>
      
      {/* Subtle organic noise texture for the dark background */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          {/* ── Eyebrow ── */}
          <div className="flex items-center gap-4 mb-8 md:mb-12">
            <span className="w-12 h-[2px] bg-[#ca5310]" />
            <span className="text-[#ca5310] text-[11px] md:text-xs uppercase tracking-[0.5em] font-bold font-[family-name:var(--font-outfit)]">
              Sankalp • Our Vow
            </span>
            <span className="w-12 h-[2px] bg-[#ca5310]" />
          </div>

          {/* ── The Bold Lines ── */}
          <h2 className="text-[clamp(40px,6vw,90px)] text-white font-[family-name:var(--font-bebas)] leading-[1.05] tracking-wide mb-10">
            WE DO NOT JUST PLANT TREES. <br />
            WE AWAKEN THE <span className="text-[#a8c69f]">ANCIENT MEMORY</span> <br />
            OF THE FOREST.
          </h2>

          {/* ── Supporting Subtext ── */}
          <p className="text-white/70 text-lg md:text-2xl font-[family-name:var(--font-outfit)] leading-relaxed max-w-2xl font-light">
            Restoration is a generational promise. We put our hands in the soil today so that tomorrow, the earth can breathe.
          </p>

        </motion.div>

      </div>
    </section>
  );
}