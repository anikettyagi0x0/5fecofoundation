"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bebas_Neue, Outfit } from "next/font/google";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const outfit = Outfit({ weight: ["300", "400", "500", "600"], subsets: ["latin"], variable: "--font-outfit" });

const pillars = [
  {
    id: "01",
    tag: "Swasthya • Healthcare",
    title: "MEDICAL FRONTLINES",
    desc: "Organizing free, mobile medical camps in remote forest-fringe villages. We provide essential diagnostics, maternal care, and life-saving medicines to communities living far from urban hospitals.",
    image: "https://images.unsplash.com/photo-1574607407408-1e681c46041d?q=80&w=800&auto=format&fit=crop", // Medical/Care context
  },
  {
    id: "02",
    tag: "Ajeevika • Livelihoods",
    title: "GREEN EMPOWERMENT",
    desc: "Breaking the cycle of poverty by training indigenous women in sustainable trades. From organic leaf-plate making to managing decentralized forest nurseries, we turn conservation into a viable income.",
    image: "https://images.unsplash.com/photo-1607656311408-1e43ebaa0120?q=80&w=800&auto=format&fit=crop", // Women working/crafts
  },
  {
    id: "03",
    tag: "Jal Suraksha • Vital Resources",
    title: "CLEAN WATER ACCESS",
    desc: "Building and restoring deep-water wells and bio-sand filtration systems to ensure that vulnerable communities and local schools have year-round access to safe, disease-free drinking water.",
    image: "https://images.unsplash.com/photo-1544485303-34538965f973?q=80&w=800&auto=format&fit=crop", // Water/Community
  }
];

export default function WelfarePillars() {
  return (
    <section className={`${bebasNeue.variable} ${outfit.variable} bg-[#FAF7F2] py-24 md:py-32 w-full relative border-t border-[#e8efe6]`}>
      
      {/* Subtle background texture */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(#4d7c0f_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03]" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* ── 1. Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-20 md:mb-28"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="w-10 h-[2px] bg-[#ca5310]" />
            <span className="text-[12px] text-[#ca5310] uppercase tracking-[0.4em] font-black font-[family-name:var(--font-outfit)]">
              Sankalp • Our Core Focus
            </span>
            <span className="w-10 h-[2px] bg-[#ca5310]" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1a2e15] font-[family-name:var(--font-bebas)] leading-[1.1] tracking-wide max-w-2xl">
            UPLIFTING THE GRASSROOTS
          </h2>
        </motion.div>

        {/* ── 2. The 3-Pillar Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-10 lg:gap-16">
          {pillars.map((pillar, index) => (
            <motion.div
              key={pillar.id}
              initial={{ opacity: 0, y: 40 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              className="flex flex-col group"
            >
              
              {/* Image Container */}
              <div className="relative w-full aspect-[4/5] rounded-[2rem] overflow-hidden mb-8 shadow-md">
                <img
                  src={pillar.image}
                  alt={pillar.title}
                  className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                />
                {/* Dark overlay for contrast */}
                <div className="absolute inset-0 bg-[#1a2e15]/10 group-hover:bg-transparent transition-colors duration-500" />
                
                {/* Number Badge */}
                <div className="absolute top-6 left-6 w-12 h-12 bg-white/95 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg">
                  <span className="text-[#1a2e15] font-[family-name:var(--font-bebas)] text-xl mt-1">
                    {pillar.id}
                  </span>
                </div>
              </div>

              {/* Text Content */}
              <div className="flex flex-col px-2">
                <span className="text-[#ca5310] text-[11px] uppercase tracking-[0.2em] font-bold font-[family-name:var(--font-outfit)] mb-3 block">
                  {pillar.tag}
                </span>
                
                <h3 className="text-3xl lg:text-4xl text-[#1a2e15] font-[family-name:var(--font-bebas)] tracking-wide mb-4 group-hover:text-[#4d7c0f] transition-colors duration-300">
                  {pillar.title}
                </h3>
                
                <p className="text-[#4a5d46] text-base md:text-[17px] font-[family-name:var(--font-outfit)] leading-relaxed">
                  {pillar.desc}
                </p>

                {/* Minimal animated underline */}
                <div className="mt-6 w-12 h-[2px] bg-[#1a2e15]/20 group-hover:w-full group-hover:bg-[#ca5310] transition-all duration-700 ease-in-out" />
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}