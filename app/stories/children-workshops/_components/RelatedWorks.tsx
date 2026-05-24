"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { Bebas_Neue, Outfit } from "next/font/google";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const outfit = Outfit({ weight: ["300", "400", "500", "600"], subsets: ["latin"], variable: "--font-outfit" });

const relatedStories = [
  {
    id: "1",
    title: "THE SUNDARBANS SHIELD",
    excerpt: "How the resilient mangrove walls of Bengal are regenerating to hold back the rising tides.",
    category: "Jal • Coastal Recovery",
    slug: "sundarbans-shield",
    image: "https://images.unsplash.com/photo-1583344695029-7c87c065f6c6?q=80&w=800&auto=format&fit=crop", 
  },
  {
    id: "2",
    title: "GREENING THE THAR",
    excerpt: "Ancient water-harvesting techniques are breathing life back into the expanding desert borders.",
    category: "Bhumi • Land Restoration",
    slug: "greening-the-thar",
    image: "https://images.unsplash.com/photo-1542408930-b4df49859f13?q=80&w=800&auto=format&fit=crop", 
  },
  {
    id: "3",
    title: "VOICES OF THE NILGIRIS",
    excerpt: "Listen to the indigenous tribes of the Blue Mountains as they share centuries of seed-keeping wisdom.",
    category: "Samuday • Community",
    slug: "voices-of-nilgiris",
    image: "https://images.unsplash.com/photo-1518557984649-7b161c230cfa?q=80&w=800&auto=format&fit=crop",
  },
];

export default function RelatedDiaries() {
  const fadeUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: "easeOut" } },
  };

  return (
    // Switched to a soft stone/sand color (#EBE6DD), reduced vertical padding (py-16), and removed the top border line
    <section className={`${bebasNeue.variable} ${outfit.variable} bg-[#EBE6DD] py-16 md:py-20 w-full relative overflow-hidden border-t border-[#d8d2c6]`}>
      
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* ── 1. Section Header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          // Reduced bottom margin to pull the cards up closer to the title
          className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10"
        >
          <div>
            <div className="flex items-center gap-3 mb-3">
              <span className="w-8 h-[2px] bg-[#ca5310]" />
              <span className="text-[11px] text-[#ca5310] uppercase tracking-[0.4em] font-black font-[family-name:var(--font-outfit)]">
                Vistar • Continue Reading
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl text-[#1a2e15] font-[family-name:var(--font-bebas)] leading-[1.1] tracking-wide">
              MORE FIELD DIARIES
            </h2>
          </div>
          
          <Link 
            href="/newsroom"
            className="group flex items-center gap-3 px-6 py-2.5 border border-[#1a2e15]/20 rounded-full text-[#1a2e15] font-bold font-[family-name:var(--font-outfit)] text-[11px] uppercase tracking-widest hover:bg-[#1a2e15] hover:text-[#EBE6DD] transition-all duration-300"
          >
            View All News
            <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </Link>
        </motion.div>

        {/* ── 2. The Stories Grid ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8">
          {relatedStories.map((story, index) => (
            <motion.div
              key={story.id}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, margin: "-50px" }}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { opacity: 1, y: 0, transition: { delay: index * 0.1, duration: 0.6 } }
              }}
              className="group"
            >
              <Link href={`/newsroom/${story.slug}`} className="block">
                
                {/* Image Container */}
                <div className="relative w-full aspect-[4/3] rounded-xl overflow-hidden mb-5">
                  <img
                    src={story.image}
                    alt={story.title}
                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-700 ease-out"
                  />
                </div>

                {/* Text Content */}
                <div>
                  <span className="text-[#ca5310] text-[10px] uppercase tracking-widest font-bold font-[family-name:var(--font-outfit)] mb-2 block">
                    {story.category}
                  </span>
                  <h3 className="text-2xl md:text-3xl text-[#1a2e15] font-[family-name:var(--font-bebas)] tracking-wide mb-2 group-hover:text-[#4d7c0f] transition-colors duration-300">
                    {story.title}
                  </h3>
                  <p className="text-[#4a5d46] text-[15px] font-[family-name:var(--font-outfit)] leading-relaxed line-clamp-2">
                    {story.excerpt}
                  </p>
                </div>
                
              </Link>
            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}