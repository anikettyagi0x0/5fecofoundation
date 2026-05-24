"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bebas_Neue, Outfit } from "next/font/google";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const outfit = Outfit({ weight: ["300", "400", "500", "600"], subsets: ["latin"], variable: "--font-outfit" });

const philosophyPoints = [
  {
    num: "01",
    title: "BUILDING COMPASSION",
    desc: "When a child learns to gently handle a leaf, plant a seed, or watch a bird, they develop a deep-rooted empathy that extends not just to nature, but to all living beings.",
  },
  {
    num: "02",
    title: "SCREEN-FREE REALITY",
    desc: "In an era of digital fatigue, the forest is the ultimate sensory experience. Nature grounds children, improving their mental health, focus, and physical well-being.",
  },
  {
    num: "03",
    title: "THE FUTURE GUARDIANS",
    desc: "We protect what we love. We cannot expect the next generation to fight for forests and wildlife if they have never experienced the magic of standing under a canopy.",
  }
];

export default function WorkshopPhilosophy() {
  return (
    <section className={`${bebasNeue.variable} ${outfit.variable} bg-[#FAF7F2] py-24 md:py-40 w-full relative`}>
      
      {/* Subtle organic noise texture */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(#4d7c0f_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03]" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24">
          
          {/* ── 1. Left Side: The Core Statement ── */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              {/* Eyebrow */}
              <div className="flex items-center gap-4 mb-6">
                <span className="w-10 h-[2px] bg-[#ca5310]" />
                <span className="text-[12px] text-[#ca5310] uppercase tracking-[0.4em] font-black font-[family-name:var(--font-outfit)]">
                  Shiksha • The Philosophy
                </span>
              </div>
              
              {/* Massive Title */}
              <h2 className="text-5xl md:text-6xl lg:text-7xl text-[#1a2e15] font-[family-name:var(--font-bebas)] leading-[1.05] tracking-wide mb-8">
                BEYOND THE <br />
                <span className="text-[#4d7c0f]">CLASSROOM.</span>
              </h2>
              
              {/* Manifesto Paragraph */}
              <p className="text-[#4a5d46] text-lg md:text-xl font-[family-name:var(--font-outfit)] leading-relaxed italic border-l-2 border-[#ca5310] pl-6 py-2">
                "If a child never learns to love the soil, the trees, and the animals, who will be left to protect them tomorrow?"
              </p>
            </motion.div>
          </div>

          {/* ── 2. Right Side: The Three Pillars ── */}
          <div className="lg:col-span-7 flex flex-col justify-center">
            <div className="flex flex-col">
              {philosophyPoints.map((point, index) => (
                <motion.div 
                  key={point.num}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-50px" }}
                  transition={{ delay: index * 0.15, duration: 0.6 }}
                  className="group flex items-start gap-6 md:gap-10 py-8 md:py-10 border-t border-[#1a2e15]/10 first:border-t-2 first:border-[#1a2e15]"
                >
                  {/* Big Soft Number */}
                  <span className="text-5xl md:text-6xl text-[#d1e0ce] font-[family-name:var(--font-bebas)] leading-none mt-1 group-hover:text-[#ca5310] transition-colors duration-500 shrink-0">
                    {point.num}
                  </span>
                  
                  {/* Text Content */}
                  <div>
                    <h3 className="text-2xl md:text-3xl text-[#1a2e15] font-[family-name:var(--font-bebas)] tracking-wide mb-3">
                      {point.title}
                    </h3>
                    <p className="text-[#4a5d46] text-base md:text-[17px] font-[family-name:var(--font-outfit)] leading-relaxed">
                      {point.desc}
                    </p>
                  </div>
                </motion.div>
              ))}
              
              {/* Bottom Border */}
              <div className="w-full border-t border-[#1a2e15]/10" />
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}