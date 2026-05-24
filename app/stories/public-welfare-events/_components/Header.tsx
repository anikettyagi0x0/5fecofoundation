"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bebas_Neue, Outfit } from "next/font/google";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const outfit = Outfit({ weight: ["300", "400", "500", "600", "900"], subsets: ["latin"], variable: "--font-outfit" });

export default function Header() {
  return (
    // pt-20 to pt-24 pushes the top of this component exactly below your fixed navbar
    <header className={`${bebasNeue.variable} ${outfit.variable} w-full bg-[#0a0d08] pt-20 md:pt-24`}>
      
      {/* ── The Horizontal Divider Line ── */}
      {/* mt-6 pushes the line perfectly down from the navbar */}
      <div className="w-full border-t border-white/10 mt-6" />

      {/* ── The Split Screen Layout ── */}
      <div className="relative w-full flex flex-col lg:flex-row min-h-[calc(100vh-8rem)]">
        
        {/* ── 1. Left Side: Content & Typography ── */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 md:px-16 lg:px-24 pt-16 pb-20 lg:pt-24 lg:pb-24 relative z-10">
          
          <div className="max-w-xl">
            {/* Eyebrow - Thematic Indian touch */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.8, ease: "easeOut" }}
              className="flex items-center gap-4 mb-8 md:mb-10"
            >
              <span className="w-12 h-[2px] bg-[#ca5310]" />
              <span className="text-[10px] md:text-xs text-[#ca5310] uppercase tracking-[0.4em] font-black font-[family-name:var(--font-outfit)]">
                Seva • Community Impact
              </span>
            </motion.div>

            {/* Massive Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 1, ease: [0.16, 1, 0.3, 1] }}
              className="text-[clamp(60px,8vw,110px)] text-white font-[family-name:var(--font-bebas)] leading-[0.9] tracking-wide mb-8"
            >
              PUBLIC <br />
              WELFARE
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 1, ease: "easeOut" }}
              className="text-white/80 text-base md:text-[18px] font-[family-name:var(--font-outfit)] leading-relaxed tracking-wide mb-12 pr-4 md:pr-12"
            >
              Conservation cannot succeed without the people. Explore our grassroots initiatives dedicated to uplifting indigenous communities, providing essential healthcare, and creating sustainable, green livelihoods that harmonize human well-being with ecological survival.
            </motion.p>
          </div>
        </div>

        {/* ── 2. Right Side: Immersive Image ── */}
        <div className="w-full lg:w-1/2 relative min-h-[50vh] lg:min-h-full overflow-hidden">
          <motion.img
            initial={{ scale: 1.1 }}
            animate={{ scale: 1 }}
            transition={{ duration: 2, ease: "easeOut" }}
            // A grounded, warm, documentary-style image representing community and human connection
            src="https://images.unsplash.com/photo-1531206715517-5c0ba140b2b8?q=80&w=1600&auto=format&fit=crop"
            alt="Local community members working together"
            className="absolute inset-0 w-full h-full object-cover"
          />
        </div>

      </div>
    </header>
  );
}