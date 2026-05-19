"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bebas_Neue, Outfit } from "next/font/google";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const outfit = Outfit({ weight: ["300", "400", "500", "600"], subsets: ["latin"], variable: "--font-outfit" });

export default function NewsHeader() {
  return (
    <header className={`${bebasNeue.variable} ${outfit.variable} relative w-full py-[20vh] md:py-[30vh] bg-[#0a0d08] overflow-hidden flex items-center justify-center`}>
      
      {/* ── LAYER 1: Image Background & Overlays ── */}
      <div className="absolute inset-0 z-0">
        {/* Replace the src below with an image of an event, a rescue in progress, or someone writing/documenting in the field */}
        <img
          src="https://images.unsplash.com/photo-1542640244-7e672d6cb466?q=80&w=1600&auto=format&fit=crop" 
          className="w-full h-full object-cover opacity-40 grayscale-[20%] contrast-[110%]"
          alt="Field Documentation"
        />
        {/* Gradients to blend the image into the dark theme and make text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-[#0a0d08]/80 via-[#0a0d08]/40 to-[#0a0d08]" />
      </div>

      {/* ── LAYER 2: Content Container ── */}
      <div className="relative z-20 flex flex-col items-center text-center px-6 max-w-4xl mx-auto mt-10">
        
        {/* Eyebrow Subheading */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="flex items-center gap-4 mb-6"
        >
          <span className="w-8 h-[1px] bg-gradient-to-r from-transparent to-[#a8c69f]" />
          <span className="text-[10px] md:text-xs text-[#a8c69f] uppercase tracking-[0.6em] font-bold font-[family-name:var(--font-outfit)]">
            Chronicles of Conservation
          </span>
          <span className="w-8 h-[1px] bg-gradient-to-l from-transparent to-[#a8c69f]" />
        </motion.div>

        {/* Main Bebas Neue Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4, duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
          className="text-[clamp(50px,10vw,120px)] text-white font-[family-name:var(--font-bebas)] leading-[0.85] tracking-wide mb-8"
        >
          DISPATCHES FROM <br /> THE FRONTLINE
        </motion.h1>

        {/* Description Paragraph */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 1, ease: [0.16, 1, 0.3, 1] }}
          className="text-white/70 text-sm md:text-base font-[family-name:var(--font-outfit)] max-w-2xl leading-relaxed tracking-wide"
        >
          Stay informed on our latest rescue operations, community outreach events, and organizational milestones. Read the firsthand reports and official updates driving the 5F Eco Foundation forward.
        </motion.p>
      </div>

      {/* ── LAYER 3: Bottom Border Divider ── */}
      <div className="absolute bottom-0 left-0 w-full px-6 md:px-14 z-20">
        <div className="w-full h-[1px] bg-white/10" />
      </div>

      {/* ── LAYER 4: Grain overlay ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50" />
      
    </header>
  );
}