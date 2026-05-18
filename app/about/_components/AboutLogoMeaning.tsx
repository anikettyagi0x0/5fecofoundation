"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutLogoMeaning() {
  return (
    <section className="bg-[#FAF7F2] py-20 md:py-32 w-full border-t border-[#e8efe6]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        
        {/* FIX: Changed items-start to items-center so the logo floats perfectly in the middle of the text height */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-24">
          
          {/* ── 1. Left Side: The Logo (Simple & Clean) ── */}
          <div className="w-full md:w-[40%] flex justify-center md:justify-start">
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 1 }}
              className="relative w-full max-w-[280px] md:max-w-[320px]"
            >
              {/* No more huge circles, just the logo in its natural form */}
              <img 
                src="/logo-5feco.jpeg" 
                alt="5F Eco Foundation Logo" 
                className="w-full h-auto object-contain mix-blend-multiply" 
              />
            </motion.div>
          </div>

          {/* ── 2. Right Side: The Meaning (Editorial Style) ── */}
          <div className="w-full md:w-[60%]">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-10 h-[2px] bg-[#ca5310]" />
                <span className="text-[11px] text-[#ca5310] uppercase tracking-[0.4em] font-bold font-[family-name:var(--font-outfit)]">
                  Our Identity
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1a2e15] font-[family-name:var(--font-bebas)] leading-[1.1] tracking-wide mb-8">
                SYMBOLISM OF THE <br /> 5F ECO FOUNDATION
              </h2>
              
              {/* Simple, Professional Narrative */}
              <div className="space-y-6">
                <p className="text-[#3f4f3b] font-medium text-lg md:text-xl font-[family-name:var(--font-outfit)] leading-relaxed">
                  Our logo represents the deep connection between people and nature. It stands for the five core values of our foundation: Faith, Focus, Foundation, Foresight, and Freedom.
                </p>

                <p className="text-[#4a5d46] font-medium text-base md:text-lg font-[family-name:var(--font-outfit)] leading-relaxed">
                  Every shape and line in the logo reflects the balance of our forests, wildlife, and environment. It reminds us that protecting nature is not just one person’s job; it is a shared responsibility for all of us.
                </p>

                <p className="text-[#4a5d46] font-medium text-base md:text-lg font-[family-name:var(--font-outfit)] leading-relaxed">
                  Inspired by India’s rich biodiversity and natural heritage, our logo carries a vision of a greener, safer, and stronger future.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}