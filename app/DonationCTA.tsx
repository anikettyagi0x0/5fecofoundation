"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bebas_Neue, Outfit } from "next/font/google";
import Link from "next/link";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const outfit = Outfit({ weight: ["300", "400", "500", "600"], subsets: ["latin"], variable: "--font-outfit" });

export default function DonationCTA() {
  return (
    <section className={`${bebasNeue.variable} ${outfit.variable} bg-[#1a2e15] py-24 md:py-32 w-full relative overflow-hidden flex items-center justify-center border-t border-white/10`}>
      
      {/* Subtle organic noise texture for the dark background */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      {/* Decorative large faint text in the background */}
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-[15rem] md:text-[25rem] text-white/[0.02] font-[family-name:var(--font-bebas)] whitespace-nowrap pointer-events-none z-0">
        ACT NOW
      </div>

      <div className="max-w-[800px] mx-auto px-6 md:px-12 relative z-10 text-center flex flex-col items-center">
        
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center"
        >
          {/* ── 1. Eyebrow ── */}
          <div className="flex items-center gap-4 mb-8">
            <span className="w-12 h-[2px] bg-[#ca5310]" />
            <span className="text-[#ca5310] text-[11px] md:text-xs uppercase tracking-[0.4em] font-black font-[family-name:var(--font-outfit)]">
              Sahyog • We Need You
            </span>
            <span className="w-12 h-[2px] bg-[#ca5310]" />
          </div>

          {/* ── 2. The Bold Plea ── */}
          <h2 className="text-5xl md:text-6xl lg:text-7xl text-white font-[family-name:var(--font-bebas)] leading-[1.05] tracking-wide mb-6">
            WE CANNOT DO THIS <span className="text-[#a8c69f]">ALONE.</span>
          </h2>

          {/* ── 3. Supporting Text ── */}
          <p className="text-white/80 text-lg md:text-xl font-[family-name:var(--font-outfit)] leading-relaxed max-w-2xl mb-10 font-light">
            Every restored forest, every rescued animal, and every uplifted community starts with your support. Give what you can today, and help us turn this vision into reality.
          </p>

          {/* ── 4. The Action Buttons ── */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4 w-full sm:w-auto">
            {/* Primary Donate Button */}
            <Link 
              href="/donate"
              className="group relative flex items-center justify-center gap-3 px-10 py-4 bg-[#ca5310] overflow-hidden rounded-full text-white font-bold font-[family-name:var(--font-outfit)] text-sm uppercase tracking-widest transition-all duration-300 w-full sm:w-auto shadow-[0_0_20px_rgba(202,83,16,0.3)] hover:shadow-[0_0_30px_rgba(202,83,16,0.5)] transform hover:-translate-y-1"
            >
              <div className="absolute inset-0 w-full h-full bg-white/20 transform -translate-x-full group-hover:translate-x-0 transition-transform duration-500 ease-out" />
              <span className="relative z-10">Make a Donation</span>
              <svg className="w-4 h-4 relative z-10 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

            {/* Secondary Option (e.g., Volunteer or Learn More) */}
            <Link 
              href="/volunteer"
              className="group flex items-center justify-center px-10 py-4 border border-white/20 rounded-full text-white font-bold font-[family-name:var(--font-outfit)] text-sm uppercase tracking-widest hover:bg-white hover:text-[#1a2e15] transition-all duration-300 w-full sm:w-auto"
            >
              Become a Volunteer
            </Link>
          </div>

          {/* Trust Marker */}
          <div className="mt-8 flex items-center justify-center gap-2 text-white/50 text-[11px] uppercase tracking-widest font-[family-name:var(--font-outfit)]">
            <svg className="w-4 h-4 text-[#a8c69f]" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
            </svg>
            Direct Field Impact Guarantee
          </div>

        </motion.div>

      </div>
    </section>
  );
}