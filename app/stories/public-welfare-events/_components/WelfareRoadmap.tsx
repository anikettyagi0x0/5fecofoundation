"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bebas_Neue, Outfit } from "next/font/google";
import Link from "next/link"; // Added Link for the donation routing

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const outfit = Outfit({ weight: ["300", "400", "500", "600"], subsets: ["latin"], variable: "--font-outfit" });

const futurePlans = [
  {
    year: "2027",
    tag: "Swasthya Vistar • Health Expansion",
    title: "100+ MOBILE CLINIC FLEET",
    desc: "Scaling our medical reach by deploying a fleet of off-road capable, fully equipped mobile clinics to serve over 500 disconnected forest-fringe communities across Central India.",
  },
  {
    year: "2028",
    tag: "Urja • Sustainable Power",
    title: "SOLAR MICRO-GRIDS",
    desc: "Partnering with engineering institutes to install decentralized solar micro-grids in off-grid tribal villages, providing clean, reliable electricity for schools and primary healthcare centers.",
  },
  {
    year: "2029",
    tag: "Kendra • Empowerment Hubs",
    title: "VOCATIONAL ECO-CENTERS",
    desc: "Building physical, zero-carbon training facilities where indigenous youth and women can master sustainable trades, from organic agriculture to eco-tourism management.",
  },
  {
    year: "2030",
    tag: "Jal Kranti • Water Revolution",
    title: "UNIVERSAL CLEAN WATER",
    desc: "A massive infrastructure push to ensure 100% of the villages within our operational biospheres have permanent, maintenance-free bio-sand water filtration systems.",
  }
];

export default function WelfareRoadmap() {
  return (
    <section className={`${bebasNeue.variable} ${outfit.variable} bg-[#1a2e15] py-24 md:py-32 w-full relative overflow-hidden border-t-4 border-[#ca5310]`}>
      
      {/* Subtle organic noise texture for the dark background */}
      <div className="absolute inset-0 pointer-events-none opacity-5 bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

      <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* ── 1. Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col md:flex-row md:items-end justify-between gap-8 mb-20"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-10 h-[2px] bg-[#ca5310]" />
              <span className="text-[12px] text-[#ca5310] uppercase tracking-[0.4em] font-black font-[family-name:var(--font-outfit)]">
                Lakshya • Vision 2030
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-[family-name:var(--font-bebas)] leading-[1.1] tracking-wide">
              THE ROAD AHEAD
            </h2>
          </div>
          
          <p className="text-white/70 text-base md:text-lg font-[family-name:var(--font-outfit)] leading-relaxed max-w-md">
            Welfare is an ongoing promise. Here is our strategic blueprint for scaling our grassroots impact and building self-sustaining communities over the next decade.
          </p>
        </motion.div>

        {/* ── 2. The Typographic Roadmap ── */}
        <div className="flex flex-col border-t border-white/20">
          {futurePlans.map((plan, index) => (
            <motion.div
              key={plan.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.15, duration: 0.6 }}
              className="group flex flex-col md:flex-row items-start md:items-center py-10 md:py-12 border-b border-white/10 hover:bg-white/[0.02] transition-colors duration-500"
            >
              
              {/* Massive Year (Left Column) */}
              <div className="w-full md:w-1/3 mb-6 md:mb-0 md:pr-12 md:border-r border-white/10 group-hover:border-[#ca5310]/50 transition-colors duration-500">
                <span className="text-6xl md:text-7xl lg:text-8xl text-white/10 group-hover:text-[#a8c69f] font-[family-name:var(--font-bebas)] transition-colors duration-500 leading-none">
                  {plan.year}
                </span>
              </div>

              {/* Content (Right Column) */}
              <div className="w-full md:w-2/3 md:pl-12 flex flex-col">
                <span className="text-[#ca5310] text-[10px] md:text-[11px] uppercase tracking-[0.3em] font-bold font-[family-name:var(--font-outfit)] mb-3">
                  {plan.tag}
                </span>
                
                <h3 className="text-3xl md:text-4xl text-white font-[family-name:var(--font-bebas)] tracking-wide mb-4 transform group-hover:translate-x-2 transition-transform duration-500">
                  {plan.title}
                </h3>
                
                <p className="text-white/60 text-base md:text-lg font-[family-name:var(--font-outfit)] leading-relaxed max-w-xl group-hover:text-white/80 transition-colors duration-500">
                  {plan.desc}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

        {/* ── 3. Gentle Donation Nudge ── */}
        {/* Added smoothly at the end of the timeline sequence */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="mt-12 md:mt-16 flex flex-col md:flex-row items-center justify-between p-8 md:p-10 rounded-2xl bg-white/[0.02] border border-white/5"
        >
          <div className="mb-6 md:mb-0 md:pr-8">
            <h4 className="text-2xl md:text-3xl text-white font-[family-name:var(--font-bebas)] tracking-wide mb-2">
              HELP US REACH THESE MILESTONES
            </h4>
            <p className="text-white/50 text-sm md:text-base font-[family-name:var(--font-outfit)] leading-relaxed max-w-xl">
              Our vision for the next decade relies entirely on the generosity of individuals who share our commitment. Help us turn this roadmap into reality.
            </p>
          </div>
          
          <Link 
            href="/donate" 
            className="group flex items-center gap-3 px-8 py-3 rounded-full border border-[#ca5310]/50 text-white font-bold font-[family-name:var(--font-outfit)] text-[11px] uppercase tracking-widest hover:bg-[#ca5310] hover:border-[#ca5310] transition-all duration-300 w-full md:w-auto justify-center md:justify-start shrink-0"
          >
            Support Our Vision
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
            </svg>
          </Link>
        </motion.div>

      </div>
    </section>
  );
}