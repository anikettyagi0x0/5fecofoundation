"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Bebas_Neue, Outfit } from "next/font/google";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const outfit = Outfit({ weight: ["300", "400", "500", "600", "700"], subsets: ["latin"], variable: "--font-outfit" });

// Updated: These stories are now 100% focused on Wildfire Resilience in India
const stories = [
  {
    id: "1",
    title: "RISING FROM THE ASHES IN UTTARAKHAND",
    excerpt: "Witness how the native Himalayan forests are using the monsoon rains to bounce back from the devastating summer blazes of 2025.",
    category: "Aranya • Forest Recovery",
    slug: "uttarakhand-forest-recovery",
    image: "https://images.unsplash.com/photo-1605806616949-1e87b487cb2a?q=80&w=1200&auto=format&fit=crop", 
  },
  {
    id: "2",
    title: "THE RETURN TO BANDIPUR",
    excerpt: "Following the massive fires, local camera traps capture the triumphant return of wildlife to the newly sprouting grasslands.",
    category: "Vanyajeeva • Wildlife",
    slug: "bandipur-wildlife-return",
    image: "https://images.unsplash.com/photo-1564750692735-866418b76258?q=80&w=800&auto=format&fit=crop", 
  },
  {
    id: "3",
    title: "THE GUARDIANS OF SIMLIPAL",
    excerpt: "Meet the indigenous fire squads using ancient techniques to manage controlled burns and protect the biosphere reserve.",
    category: "Samuday • Community",
    slug: "simlipal-fire-guardians",
    image: "https://images.unsplash.com/photo-1542044801-38fb5ea4219a?q=80&w=800&auto=format&fit=crop",
  },
];

export default function FieldStoriesGrid() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className={`${bebasNeue.variable} ${outfit.variable} bg-[#FAF7F2] py-24 md:py-32 w-full border-t border-[#e8efe6]`}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        
        {/* ── 1. Top Header & Action ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16"
        >
          <div>
            <div className="flex items-center gap-4 mb-4">
              <span className="w-10 h-[2px] bg-[#ca5310]" />
              <span className="text-[12px] text-[#ca5310] uppercase tracking-[0.4em] font-black font-[family-name:var(--font-outfit)]">
                Karya • Resilience In Action
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1a2e15] font-[family-name:var(--font-bebas)] leading-[1.1] tracking-wide">
              FIELD DIARIES: SURVIVING THE FLAMES
            </h2>
          </div>
          
          <Link 
            href="/stories-gallery"
            className="group flex items-center gap-3 px-6 py-3 border-2 border-[#1a2e15] rounded-full text-[#1a2e15] font-bold font-[family-name:var(--font-outfit)] text-xs uppercase tracking-widest hover:bg-[#1a2e15] hover:text-white transition-all duration-300"
          >
            Read All Reports
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        {/* ── 2. The Magazine Grid ── */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Main Featured Story (Takes up 7 out of 12 columns) */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="lg:col-span-7 flex flex-col group"
          >
            <Link href={`/newsroom/${stories[0].slug}`} className="block overflow-hidden rounded-2xl mb-6 relative">
              <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-4 py-1.5 rounded-full shadow-sm z-10">
                <span className="text-[10px] text-[#ca5310] uppercase tracking-widest font-bold font-[family-name:var(--font-outfit)]">
                  {stories[0].category}
                </span>
              </div>
              <img 
                src={stories[0].image} 
                alt={stories[0].title} 
                className="w-full aspect-[4/3] object-cover transform group-hover:scale-105 transition-transform duration-700" 
              />
            </Link>
            <h3 className="text-3xl md:text-4xl text-[#1a2e15] font-[family-name:var(--font-bebas)] tracking-wide mb-3 group-hover:text-[#4d7c0f] transition-colors">
              <Link href={`/newsroom/${stories[0].slug}`}>{stories[0].title}</Link>
            </h3>
            <p className="text-[#4a5d46] text-lg font-[family-name:var(--font-outfit)] leading-relaxed mb-6">
              {stories[0].excerpt}
            </p>
          </motion.div>

          {/* Stacked Side Stories (Takes up 5 out of 12 columns) */}
          <div className="lg:col-span-5 flex flex-col gap-10 lg:gap-0 lg:justify-between">
            
            {/* Sub Story 1 */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.2, duration: 0.8 }}
              className="flex gap-6 group"
            >
              <Link href={`/newsroom/${stories[1].slug}`} className="block w-2/5 md:w-1/3 shrink-0 overflow-hidden rounded-xl">
                <img 
                  src={stories[1].image} 
                  alt={stories[1].title} 
                  className="w-full aspect-square object-cover transform group-hover:scale-105 transition-transform duration-700" 
                />
              </Link>
              <div className="flex flex-col justify-center">
                <span className="text-[#ca5310] text-[10px] uppercase tracking-widest font-bold font-[family-name:var(--font-outfit)] mb-2">
                  {stories[1].category}
                </span>
                <h3 className="text-xl md:text-2xl text-[#1a2e15] font-[family-name:var(--font-bebas)] tracking-wide mb-2 group-hover:text-[#4d7c0f] transition-colors">
                  <Link href={`/newsroom/${stories[1].slug}`}>{stories[1].title}</Link>
                </h3>
                <p className="text-[#4a5d46] text-sm font-[family-name:var(--font-outfit)] line-clamp-2">
                  {stories[1].excerpt}
                </p>
              </div>
            </motion.div>

            {/* Divider Line (Only on Desktop) */}
            <div className="hidden lg:block w-full h-[1px] bg-[#d1e0ce]/60 my-6" />

            {/* Sub Story 2 */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="flex gap-6 group"
            >
              <Link href={`/newsroom/${stories[2].slug}`} className="block w-2/5 md:w-1/3 shrink-0 overflow-hidden rounded-xl">
                <img 
                  src={stories[2].image} 
                  alt={stories[2].title} 
                  className="w-full aspect-square object-cover transform group-hover:scale-105 transition-transform duration-700" 
                />
              </Link>
              <div className="flex flex-col justify-center">
                <span className="text-[#ca5310] text-[10px] uppercase tracking-widest font-bold font-[family-name:var(--font-outfit)] mb-2">
                  {stories[2].category}
                </span>
                <h3 className="text-xl md:text-2xl text-[#1a2e15] font-[family-name:var(--font-bebas)] tracking-wide mb-2 group-hover:text-[#4d7c0f] transition-colors">
                  <Link href={`/newsroom/${stories[2].slug}`}>{stories[2].title}</Link>
                </h3>
                <p className="text-[#4a5d46] text-sm font-[family-name:var(--font-outfit)] line-clamp-2">
                  {stories[2].excerpt}
                </p>
              </div>
            </motion.div>

          </div>
          
        </div>
      </div>
    </section>
  );
}