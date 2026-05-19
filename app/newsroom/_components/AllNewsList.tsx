"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { allNews } from "../_newsdata/newsData";

export default function AllNewsGrid() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="bg-[#FAF7F2] py-20 md:py-32 w-full border-t border-[#e8efe6] relative overflow-hidden">
      
      {/* ── 1. The Premium Editorial Background ── */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden flex flex-col items-center justify-center">
        
        {/* Layer A: Ambient Glowing Orbs */}
        <div className="absolute top-0 left-0 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-[#4d7c0f]/10 rounded-full blur-[120px] md:blur-[160px] -translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 right-0 w-[500px] md:w-[800px] h-[500px] md:h-[800px] bg-[#ca5310]/10 rounded-full blur-[120px] md:blur-[160px] translate-x-1/3 translate-y-1/3" />

        {/* Layer B: Precision Dot Grid */}
        <div className="absolute inset-0 bg-[radial-gradient(#4d7c0f_1.5px,transparent_1.5px)] [background-size:32px_32px] opacity-[0.06]" />

        {/* Layer C: Massive Hollow Typography Watermarks */}
{/* 1. Top text */}
<div className="absolute top-[15%] left-1/2 -translate-x-1/2 whitespace-nowrap select-none">
          <span 
            className="text-[20vw] md:text-[14vw] font-[family-name:var(--font-bebas)] tracking-widest text-transparent"
            style={{ WebkitTextStroke: '2px rgba(117, 187, 26, 0.08)' }}
          >
            5F ECO
          </span>
        </div>

        {/* 2. Middle text (Moved to absolute center) */}
        <div className="absolute top-[52.5%] left-1/2 -translate-x-1/2 -translate-y-1/2 whitespace-nowrap select-none">
          <span 
            className="text-[20vw] md:text-[14vw] font-[family-name:var(--font-bebas)] tracking-widest text-transparent"
            style={{ WebkitTextStroke: '2px rgba(117, 187, 26, 0.08)' }}
          >
            FOUNDATION
          </span>
        </div>

        {/* 3. Bottom text (Pushed down to 10% from the bottom) */}
        <div className="absolute bottom-[10%] left-1/2 -translate-x-1/2 whitespace-nowrap select-none">
          <span 
            className="text-[15vw] md:text-[14vw] font-[family-name:var(--font-bebas)] tracking-widest text-transparent"
            style={{ WebkitTextStroke: '2px rgba(117, 187, 26, 0.08)' }}
          >
            OF INDIA
          </span>
        </div>

      </div>

      {/* ── 2. Content Container (relative z-10 keeps it above the background) ── */}
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* ── Section Header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="flex flex-col items-center text-center mb-16 md:mb-20"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="w-10 h-[2px] bg-[#ca5310]" />
            <span className="text-[12px] text-[#ca5310] uppercase tracking-[0.4em] font-black font-[family-name:var(--font-outfit)]">
              Sabhi Khabre
            </span>
            <span className="w-10 h-[2px] bg-[#ca5310]" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1a2e15] font-[family-name:var(--font-bebas)] leading-[1.1] tracking-wide">
            EXPLORE THE ARCHIVES
          </h2>
        </motion.div>

        {/* ── 3. The 3-Column Grid Layout ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-10">
          
          {allNews.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: (index % 3) * 0.1, duration: 0.6 }}
              // Cards are solid white to pop against the textured background
              className="group flex flex-col bg-white/95 backdrop-blur-sm rounded-2xl overflow-hidden shadow-[0_10px_20px_rgba(26,46,21,0.04)] border border-[#e8efe6]/60 hover:shadow-[0_20px_40px_rgba(77,124,15,0.08)] hover:-translate-y-1.5 transition-all duration-500 h-full relative z-20"
            >
              {/* Thumbnail Image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3.5 py-1.5 rounded-full shadow-sm">
                  <span className="text-[10px] text-[#ca5310] uppercase tracking-widest font-bold font-[family-name:var(--font-outfit)]">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Card Content */}
              <div className="flex flex-col p-6 md:p-8 flex-grow">
                
                <span className="text-[#a8c69f] text-[11px] font-bold uppercase tracking-widest font-[family-name:var(--font-outfit)] mb-3">
                  {article.date}
                </span>

                <h3 className="text-2xl md:text-3xl text-[#1a2e15] font-[family-name:var(--font-bebas)] tracking-wide leading-[1.15] mb-4 group-hover:text-[#4d7c0f] transition-colors duration-300 line-clamp-2">
                  <Link href={`/newsroom/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                <p className="text-[#4a5d46] font-medium text-sm md:text-base font-[family-name:var(--font-outfit)] leading-relaxed mb-8 flex-grow line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Footer Link */}
                <div className="mt-auto pt-5 border-t border-[#d1e0ce]/40">
                  <Link 
                    href={`/newsroom/${article.slug}`}
                    className="flex items-center justify-between w-full text-[#1a2e15] font-bold font-[family-name:var(--font-outfit)] text-[12px] uppercase tracking-[0.1em] group/btn hover:text-[#4d7c0f] transition-colors"
                  >
                    Read Article
                    <svg className="w-4 h-4 text-[#a8c69f] group-hover/btn:text-[#4d7c0f] group-hover/btn:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
                
              </div>
            </motion.article>
          ))}
          
        </div>

        {/* ── 4. Load More Action ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-16 flex justify-center relative z-20"
        >
          <button className="px-10 py-3.5 rounded-full border-2 border-[#1a2e15] text-[#1a2e15] font-bold font-[family-name:var(--font-outfit)] text-[12px] uppercase tracking-widest hover:bg-[#1a2e15] hover:text-white transition-all duration-300 cursor-pointer shadow-sm hover:shadow-md">
            Load More Stories
          </button>
        </motion.div>

      </div>
    </section>
  );
}