"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { featuredNews } from "../_newsdata/newsData";

export default function FeaturedNews() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="bg-white py-20 md:py-28 w-full border-t border-[#e8efe6]">
      <div className="max-w-[1440px] mx-auto px-6 md:px-12">
        
        {/* ── 1. Section Header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="flex flex-col items-center text-center mb-12"
        >
          <div className="flex items-center gap-4 mb-4">
            <span className="w-10 h-[2px] bg-[#ca5310]" />
            {/* The Bold Hinglish Eyebrow */}
            <span className="text-[12px] text-[#ca5310] uppercase tracking-[0.4em] font-black font-[family-name:var(--font-outfit)]">
              Khas Khabar
            </span>
            <span className="w-10 h-[2px] bg-[#ca5310]" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1a2e15] font-[family-name:var(--font-bebas)] leading-[1.1] tracking-wide">
            OUR FEATURED NEWS
          </h2>
        </motion.div>

        {/* ── 2. Sleek, Single-Line Grid (4 columns on Desktop) ── */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-8">
          
          {featuredNews.map((article, index) => (
            <motion.article
              key={article.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group flex flex-col bg-[#FAF7F2] rounded-2xl overflow-hidden shadow-[0_5px_15px_rgba(26,46,21,0.03)] border border-[#e8efe6] hover:shadow-[0_15px_30px_rgba(77,124,15,0.08)] hover:-translate-y-1 transition-all duration-300 h-full"
            >
              {/* Compact Thumbnail */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <img
                  src={article.thumbnail}
                  alt={article.title}
                  className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                />
                <div className="absolute top-3 left-3 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full shadow-sm">
                  <span className="text-[9px] text-[#ca5310] uppercase tracking-widest font-bold font-[family-name:var(--font-outfit)]">
                    {article.category}
                  </span>
                </div>
              </div>

              {/* Tighter, Aligned Content */}
              <div className="flex flex-col p-5 md:p-6 flex-grow">
                
                <span className="text-[#a8c69f] text-[10px] font-bold uppercase tracking-widest font-[family-name:var(--font-outfit)] mb-2">
                  {article.date}
                </span>

                {/* FIX: Changed hover color to Forest Green (#4d7c0f) */}
                <h3 className="text-2xl text-[#1a2e15] font-[family-name:var(--font-bebas)] tracking-wide leading-[1.15] mb-3 group-hover:text-[#4d7c0f] transition-colors duration-300 line-clamp-2">
                  <Link href={`/newsroom/${article.slug}`}>
                    {article.title}
                  </Link>
                </h3>

                <p className="text-[#4a5d46] font-medium text-sm font-[family-name:var(--font-outfit)] leading-relaxed mb-6 flex-grow line-clamp-3">
                  {article.excerpt}
                </p>

                {/* Simple Footer Link */}
                <div className="mt-auto pt-4 border-t border-[#d1e0ce]/50">
                  <Link 
                    href={`/newsroom/${article.slug}`}
                    /* FIX: Changed hover color to Forest Green (#4d7c0f) */
                    className="flex items-center justify-between w-full text-[#1a2e15] font-bold font-[family-name:var(--font-outfit)] text-[11px] uppercase tracking-[0.1em] group/btn hover:text-[#4d7c0f] transition-colors"
                  >
                    Read Article
                    {/* FIX: Arrow turns green and moves right on hover */}
                    <svg className="w-4 h-4 text-[#a8c69f] group-hover/btn:text-[#4d7c0f] group-hover/btn:translate-x-1 transition-all" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" />
                    </svg>
                  </Link>
                </div>
                
              </div>
            </motion.article>
          ))}
          
        </div>

      </div>
    </section>
  );
}