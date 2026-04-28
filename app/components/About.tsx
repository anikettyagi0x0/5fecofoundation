"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bebas_Neue, DM_Mono, Outfit } from "next/font/google";

const bebas = Bebas_Neue({ weight: "400", subsets: ["latin"] });
const mono = DM_Mono({ weight: ["400"], subsets: ["latin"] });
const outfit = Outfit({ weight: ["300", "400", "600"], subsets: ["latin"] });

const TacticalAbout = () => {
  // Using a tiger or orangutan placeholder (replace with your actual asset)
  const imageUrl = "/hero/sumatran-tiger.jpg"; // Swap with your image path

  // Animation variants for the image slices
  const sliceVariants = {
    hidden: (i: number) => ({
      y: i % 2 === 0 ? 100 : -100, // Alternating starting positions
      opacity: 0,
    }),
    visible: {
      y: 0,
      opacity: 1,
      transition: { duration: 1.2, ease: [0.16, 1, 0.3, 1], delay: 0.2 }
    },
    hover: (i: number) => ({
      y: i === 1 ? -15 : i === 2 ? 10 : -5, // Fractures on hover
      filter: "contrast(1.2) saturate(1.2)",
      transition: { duration: 0.4, ease: "easeOut" }
    })
  };

  return (
    <section className={`relative py-32 bg-[#0a0d08] text-white overflow-hidden ${outfit.className}`}>
      
      {/* Background Tech Grid */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-[0.03]" 
        style={{ backgroundImage: 'linear-gradient(#a8c69f 1px, transparent 1px), linear-gradient(90deg, #a8c69f 1px, transparent 1px)', backgroundSize: '40px 40px' }} 
      />

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center relative z-10">
        
        {/* ── LEFT: INNOVATIVE IMAGE FRACTURE ── */}
        <div className="lg:col-span-5 relative h-[500px] md:h-[700px] w-full cursor-crosshair group">
          
          {/* Tactical Frame Elements */}
          <div className="absolute -top-4 -left-4 w-8 h-8 border-t-2 border-l-2 border-[#4d7c0f] opacity-50" />
          <div className="absolute -bottom-4 -right-4 w-8 h-8 border-b-2 border-r-2 border-[#4d7c0f] opacity-50" />
          <div className="absolute top-1/2 -left-8 w-4 h-[1px] bg-[#4d7c0f] opacity-50" />
          
          {/* Animated HUD Scanline */}
          <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-transparent via-[#a8c69f]/10 to-transparent z-20 pointer-events-none animate-[scanline_4s_linear_infinite]" />
          
          <motion.div 
            initial="hidden" 
            whileInView="visible" 
            whileHover="hover"
            viewport={{ once: true, margin: "-10%" }}
            className="relative w-full h-full"
          >
            {/* Slice 1 (Left 33%) */}
            <motion.div 
              custom={0} variants={sliceVariants}
              className="absolute inset-0 bg-cover bg-center grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
              style={{ backgroundImage: `url(${imageUrl})`, clipPath: "polygon(0 0, 32.5% 0, 32.5% 100%, 0 100%)" }}
            />
            {/* Slice 2 (Middle 34%) */}
            <motion.div 
              custom={1} variants={sliceVariants}
              className="absolute inset-0 bg-cover bg-center grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
              style={{ backgroundImage: `url(${imageUrl})`, clipPath: "polygon(33.5% 0, 66.5% 0, 66.5% 100%, 33.5% 100%)" }}
            >
              {/* Target Reticle in Center Slice */}
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-12 h-12 border border-[#a8c69f]/30 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-200">
                <div className="w-1 h-1 bg-[#4d7c0f] rounded-full animate-pulse" />
              </div>
            </motion.div>
            {/* Slice 3 (Right 33%) */}
            <motion.div 
              custom={2} variants={sliceVariants}
              className="absolute inset-0 bg-cover bg-center grayscale-[30%] group-hover:grayscale-0 transition-all duration-700"
              style={{ backgroundImage: `url(${imageUrl})`, clipPath: "polygon(67.5% 0, 100% 0, 100% 100%, 67.5% 100%)" }}
            />
          </motion.div>
        </div>

        {/* ── RIGHT: DOSSIER CONTENT ── */}
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="lg:col-span-7 flex flex-col justify-center"
        >
          {/* Header Tag */}
          <div className="flex items-center gap-4 mb-6">
            <span className="w-10 h-[1px] bg-[#4d7c0f]" />
            <span className={`text-[#a8c69f] text-[10px] tracking-[0.4em] uppercase font-bold ${mono.className}`}>
              Dossier Ref: ID-884
            </span>
          </div>

          <h2 className={`${bebas.className} text-6xl md:text-8xl leading-[0.85] tracking-tight text-white mb-8`}>
            FRONTLINE <br />
            <span className="text-white/30">INTELLIGENCE</span>
          </h2>

          <div className="space-y-6 max-w-2xl">
            <p className="text-[#ede8df]/60 text-sm md:text-base leading-relaxed">
              GlobalHope operates beyond standard conservation models. We deploy advanced 
              telemetry and satellite oversight to map the darkest corners of the Sumatran canopy. 
              By treating habitat loss as a critical security breach, we implement tactical 
              solutions to protect endangered species.
            </p>
            <p className={`text-[#a8c69f]/80 text-xs tracking-widest leading-loose uppercase ${mono.className}`}>
              // Primary Directive: Monitor, Audit, Protect. <br />
              // Active Personnel: 142 Field Agents.
            </p>
          </div>

          {/* Tactical Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-8 mt-12 pt-10 border-t border-white/10">
            <div>
              <div className={`${bebas.className} text-4xl text-[#4d7c0f] mb-1`}>3,402</div>
              <div className={`text-[9px] text-white/40 uppercase tracking-[0.2em] ${mono.className}`}>Species Tracked</div>
            </div>
            <div>
              <div className={`${bebas.className} text-4xl text-[#4d7c0f] mb-1`}>0%</div>
              <div className={`text-[9px] text-white/40 uppercase tracking-[0.2em] ${mono.className}`}>Data Tampering</div>
            </div>
            <div className="hidden md:block">
              <div className={`${bebas.className} text-4xl text-[#4d7c0f] mb-1`}>24/7</div>
              <div className={`text-[9px] text-white/40 uppercase tracking-[0.2em] ${mono.className}`}>Canopy Oversight</div>
            </div>
          </div>

          {/* Action Button */}
          <motion.button 
            whileHover={{ scale: 1.05, backgroundColor: "#a8c69f", color: "#0a0d08" }}
            whileTap={{ scale: 0.98 }}
            className={`mt-14 w-max px-10 py-4 border border-[#4d7c0f]/50 bg-transparent text-[#a8c69f] text-[10px] uppercase tracking-[0.3em] font-bold transition-colors ${mono.className}`}
          >
            Access Full Report
          </motion.button>
        </motion.div>

      </div>

      {/* Global CSS for the custom scanline animation */}
      <style suppressHydrationWarning>{`
        @keyframes scanline {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(800px); } /* Adjust based on max height */
        }
      `}</style>
    </section>
  );
};

export default TacticalAbout;