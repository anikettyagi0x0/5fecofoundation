"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bebas_Neue, Outfit } from "next/font/google";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const outfit = Outfit({ weight: ["300", "400", "500", "600"], subsets: ["latin"], variable: "--font-outfit" });

const pressLogos = [
  {
    id: "press-1",
    name: "The Hindu",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/8/8c/The_Hindu_logo.svg", 
  },
  {
    id: "press-2",
    name: "Times of India",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/5/52/The_Times_of_India_logo.svg",
  },
  {
    id: "press-3",
    name: "Hindustan Times",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/0/0e/Hindustan_Times_logo.svg",
  },
  {
    id: "press-4",
    name: "Indian Express",
    logoUrl: "https://upload.wikimedia.org/wikipedia/commons/f/f6/The_Indian_Express_logo.svg",
  }
];

export default function WelfarePressMinimal() {
  return (
    <section className={`${bebasNeue.variable} ${outfit.variable} bg-white py-20 md:py-24 w-full border-t border-gray-100`}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        
        {/* ── 1. Simple Centered Header with Description ── */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-16"
        >
          {/* Eyebrow */}
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[1px] bg-gray-300" />
            <span className="text-[10px] text-gray-500 uppercase tracking-[0.3em] font-bold font-[family-name:var(--font-outfit)]">
              Samachar • Media Coverage
            </span>
            <span className="w-8 h-[1px] bg-gray-300" />
          </div>
          
          {/* Main Title */}
          <h2 className="text-3xl md:text-4xl text-[#1a2e15] font-[family-name:var(--font-bebas)] tracking-widest mb-4">
            FEATURED IN
          </h2>

          {/* ADDED: Short, elegant description */}
          <p className="text-gray-500 text-sm md:text-base font-[family-name:var(--font-outfit)] max-w-xl leading-relaxed">
            Our commitment to grassroots welfare and wildlife conservation has been recognized and shared by leading publications across the nation.
          </p>
        </motion.div>

        {/* ── 2. The Clean Logo Row ── */}
        <div className="flex flex-wrap items-center justify-center gap-12 md:gap-20 lg:gap-28">
          {pressLogos.map((press, index) => (
            <motion.div
              key={press.id}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.5 }}
              className="flex items-center justify-center group"
            >
              <img
                src={press.logoUrl}
                alt={`${press.name} Logo`}
                className="h-6 md:h-8 lg:h-10 w-auto object-contain grayscale opacity-40 group-hover:grayscale-0 group-hover:opacity-100 transition-all duration-300 cursor-pointer"
              />
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}