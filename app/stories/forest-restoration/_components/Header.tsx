"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bebas_Neue, Outfit } from "next/font/google";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const outfit = Outfit({ weight: ["300", "400", "500", "600"], subsets: ["latin"], variable: "--font-outfit" });

export default function Header() {
  return (
    // pt-20 to pt-24 pushes the top of this component exactly below your fixed navbar
    <header className={`${bebasNeue.variable} ${outfit.variable} w-full bg-[#0a0d08] pt-20 md:pt-24`}>
      
      {/* ── The Horizontal Divider Line (with mt-4 to drop it slightly) ── */}
      <div className="w-full border-t border-white/10 mt-4" />

      {/* ── The Split Screen Layout ── */}
      <div className="relative w-full flex flex-col lg:flex-row min-h-[calc(100vh-6rem)]">
        
        {/* ── 1. Left Side: Content & Typography ── */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 py-16 lg:py-0 relative z-10">
          
          <div className="max-w-xl">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="flex items-center gap-4 mb-6 md:mb-8"
            >
              <span className="w-10 h-[2px] bg-[#ca5310]" />
              <span className="text-[11px] md:text-xs text-[#ca5310] uppercase tracking-[0.3em] font-bold font-[family-name:var(--font-outfit)]">
                Aranya • Conservation
              </span>
            </motion.div>

            {/* Massive Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(60px,8vw,110px)] text-white font-[family-name:var(--font-bebas)] leading-[0.9] tracking-wide mb-8"
            >
              FOREST <br />
              RESTORATION
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
              className="text-white/80 text-base md:text-[18px] font-[family-name:var(--font-outfit)] leading-relaxed tracking-wide mb-12 pr-4 md:pr-12"
            >
              Join our mission to bring the earth back to life. Discover how community-led planting initiatives and ancient ecological wisdom are restoring our native canopies, one sapling at a time.
            </motion.p>
          </div>
        </div>

        {/* ── 2. Right Side: Immersive Image ── */}
        {/* Hard split, no gradients, exactly like the reference image */}
        <div className="w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-full overflow-hidden">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            // A beautiful, highly reliable image of a lush, restored forest canopy
            src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?q=80&w=1600&auto=format&fit=crop"
            alt="Lush green forest canopy"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

      </div>
    </header>
  );
}