"use client";

import React from "react";
import { motion } from "framer-motion";

export default function AboutLogoMeaning() {
  return (
    <section className="bg-[#FAF7F2] py-20 md:py-32 w-full border-t border-[#e8efe6]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row items-start justify-between gap-12 lg:gap-24">
          
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
                  Our insignia is a reflection of the interconnectedness between humanity and the natural world. It serves as a visual pledge to the five pillars of our foundation—Faith, Focus, Foundation, Foresight, and Freedom.
                </p>

                <p className="text-[#4a5d46] font-medium text-base md:text-lg font-[family-name:var(--font-outfit)] leading-relaxed">
                  Each line and curve represents the delicate balance of our ecosystems. The design is intended to remind us that conservation is not a choice, but a collective responsibility to preserve the vibrant biodiversity that defines India&apos;s heritage.
                </p>

                <p className="text-[#4a5d46] font-medium text-base md:text-lg font-[family-name:var(--font-outfit)] leading-relaxed">
                  By rooting our identity in these principles, we ensure that every initiative—from wildlife rescue to habitat restoration—is guided by a consistent vision for a greener, more resilient future.
                </p>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}