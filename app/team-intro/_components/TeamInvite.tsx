"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";

export default function TeamInvite() {
  return (
    // Reduced padding (py-16 md:py-20) to remove the extra vertical space
    <section className="bg-[#FAF7F2] py-16 md:py-20 w-full border-t border-[#e8efe6]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.6, ease: "easeOut" }}
          // Flex layout: Stacks on mobile, splits 50/50 on desktop
          className="flex flex-col md:flex-row items-start justify-between gap-8 md:gap-16 lg:gap-24"
        >
          
          {/* ── 1. Left Side: Heading ── */}
          <div className="w-full md:w-1/2">
            {/* The Hinglish Eyebrow */}
            <div className="flex items-center gap-4 mb-4 md:mb-6">
              <span className="w-8 h-[2px] bg-[#ca5310]" />
              <span className="text-xs text-[#ca5310] uppercase tracking-[0.4em] font-bold font-[family-name:var(--font-outfit)]">
                Sankalp Lein
              </span>
            </div>

            <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1a2e15] font-[family-name:var(--font-bebas)] tracking-wide leading-[1.05] m-0">
              READY TO JOIN <br className="hidden md:block" /> THE FRONTLINE?
            </h2>
          </div>

          {/* ── 2. Right Side: Description & Button ── */}
          {/* Added md:pt-2 to perfectly align the top of the paragraph with the Bebas heading */}
          <div className="w-full md:w-1/2 flex flex-col items-start md:pt-2">
            
            <p className="text-[#4a5d46] font-medium text-base md:text-lg font-[family-name:var(--font-outfit)] leading-relaxed mb-8 max-w-md">
              Whether you are a seasoned veterinarian, a researcher, or simply someone driven to protect India's wildlife—your journey starts here.
            </p>

            <Link 
              href="/volunteer" 
              className="inline-flex items-center justify-center bg-[#1a2e15] text-white px-10 py-3.5 rounded-full font-bold font-[family-name:var(--font-outfit)] text-[12px] uppercase tracking-widest shadow-md hover:shadow-lg hover:bg-[#ca5310] transition-all duration-300 group"
            >
              Apply Now
              <svg 
                className="w-4 h-4 ml-3 text-white group-hover:translate-x-1 transition-transform duration-300" 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
              </svg>
            </Link>

          </div>

        </motion.div>

      </div>
    </section>
  );
}