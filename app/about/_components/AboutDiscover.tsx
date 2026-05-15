"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { GiOakLeaf } from "react-icons/gi";

export default function AboutStoriesRedirect() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="bg-[#FAF7F2] py-20 md:py-32 w-full border-t border-[#e8efe6]">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20">
          
          {/* ── 1. Content Side ── */}
          <div className="w-full md:w-1/2">
            <motion.div
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              variants={fadeUp}
            >
              <div className="flex items-center gap-4 mb-6">
                <span className="w-10 h-[2px] bg-[#ca5310]" />
                <span className="text-[11px] text-[#ca5310] uppercase tracking-[0.4em] font-bold font-[family-name:var(--font-outfit)]">
                  The Human Element
                </span>
              </div>
              
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1a2e15] font-[family-name:var(--font-bebas)] leading-[1.1] tracking-wide mb-6">
                PEOPLE POWERING <br /> THE CONSERVATION
              </h2>
              
              <p className="text-[#4a5d46] font-medium text-base md:text-lg font-[family-name:var(--font-outfit)] leading-relaxed mb-10 max-w-xl">
                Behind every rescue and every restored acre is a person driven by purpose. Explore the journeys of our dedicated team and the firsthand field diaries of their impact.
              </p>

              {/* ── Two Button Layout ── */}
              <div className="flex flex-wrap gap-4 md:gap-6">
                {/* 1. Team Button */}
                <Link 
                  href="/about/team" 
                  className="inline-flex items-center justify-center bg-white text-[#1a2e15] border border-[#d1e0ce] px-8 py-3.5 rounded-full font-bold font-[family-name:var(--font-outfit)] text-[12px] uppercase tracking-widest shadow-sm hover:shadow-md hover:border-[#4d7c0f]/30 transition-all duration-300 group"
                >
                  Meet the Team
                </Link>

                {/* 2. Stories Button (with Icon) */}
                <Link 
                  href="/stories" 
                  className="inline-flex items-center justify-center bg-white text-[#1a2e15] border border-[#d1e0ce] px-8 py-3.5 rounded-full font-bold font-[family-name:var(--font-outfit)] text-[12px] uppercase tracking-widest shadow-sm hover:shadow-md hover:border-[#ca5310]/30 transition-all duration-300 group"
                >
                  Field Stories
                  <svg 
                    className="w-4 h-4 ml-3 text-[#ca5310] group-hover:translate-x-1 transition-transform" 
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

          {/* ── 2. Simple Image Side (Clean & Balanced) ── */}
          <motion.div 
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="w-full md:w-[45%]"
          >
            <div className="relative aspect-[4/3] rounded-2xl rounded-tl-[4rem] rounded-br-[4rem] overflow-hidden shadow-lg border-4 border-white group">
              <img 
                src="https://images.unsplash.com/photo-1542640244-7e672d6cb466?q=80&w=1000&auto=format&fit=crop" 
                alt="Our Team in the field" 
                className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[#1a2e15]/10 group-hover:bg-transparent transition-colors duration-500" />
              
              {/* Subtle Label */}
              <div className="absolute bottom-4 right-4 bg-white/90 backdrop-blur-sm px-4 py-2 rounded-xl">
                <span className="text-[10px] text-[#1a2e15] font-bold uppercase tracking-widest font-[family-name:var(--font-outfit)]">
                  Live from the Field
                </span>
              </div>
            </div>
          </motion.div>

        </div>
      </div>
    </section>
  );
}