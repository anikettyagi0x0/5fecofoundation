"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bebas_Neue, Outfit } from "next/font/google";
import Link from "next/link";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const outfit = Outfit({ weight: ["300", "400", "500", "600"], subsets: ["latin"], variable: "--font-outfit" });

const pastEvents = [
  {
    id: "01",
    title: "THE NILGIRI SEED CAMP",
    date: "March 2026",
    location: "Western Ghats, Tamil Nadu",
    desc: "A three-day immersive camp where children learned to identify native flora, gathered resilient seeds, and crafted over 500 organic seed-balls to help regenerate the forest buffer zone.",
    image: "https://images.unsplash.com/photo-1542838686-330b62e4c45b?q=80&w=1200&auto=format&fit=crop", 
    slug: "nilgiri-seed-camp",
  },
  {
    id: "02",
    title: "MACRO ECOLOGY DRIVE",
    date: "November 2025",
    location: "Kanha Buffer Zone, MP",
    desc: "We shifted the focus from apex predators to the micro-jungle. Armed with magnifying lenses and field journals, students documented the critical roles of beetles, fungi, and soil health.",
    image: "https://images.unsplash.com/photo-1502086223501-7ea6ecd79368?q=80&w=1200&auto=format&fit=crop", 
    slug: "kanha-macro-ecology",
  },
  {
    id: "03",
    title: "RIVERBANK DISCOVERY",
    date: "August 2025",
    location: "Rishikesh, Uttarakhand",
    desc: "Combining waste management education with stream ecology. Children mapped out the riverbed ecosystem, learned about natural water filtration, and helped clear plastic from sensitive nesting zones.",
    image: "https://images.unsplash.com/photo-1534080554492-3eb699665bc7?q=80&w=1200&auto=format&fit=crop", 
    slug: "rishikesh-riverbank",
  }
];

export default function PastEventsZigZag() {
  return (
    <section className={`${bebasNeue.variable} ${outfit.variable} bg-[#FAF7F2] py-24 md:py-32 w-full relative border-t border-[#e8efe6]`}>
      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* ── 1. Section Header ── */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-50px" }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="flex flex-col items-center text-center mb-20 md:mb-32"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="w-10 h-[2px] bg-[#ca5310]" />
            <span className="text-[12px] text-[#ca5310] uppercase tracking-[0.4em] font-black font-[family-name:var(--font-outfit)]">
              Smriti • The Archives
            </span>
            <span className="w-10 h-[2px] bg-[#ca5310]" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1a2e15] font-[family-name:var(--font-bebas)] leading-[1.05] tracking-wide max-w-3xl">
            MEMORIES FROM THE WILD
          </h2>
        </motion.div>

        {/* ── 2. The Zig-Zag Layout ── */}
        <div className="flex flex-col gap-24 md:gap-32">
          {pastEvents.map((event, index) => {
            // Determine if the row is even or odd to flip the layout
            const isEven = index % 2 === 0;

            return (
              <motion.div 
                key={event.id}
                initial={{ opacity: 0, y: 40 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8 }}
                // Mobile: Always stack (Image top, text bottom). 
                // Desktop: Alternate based on isEven.
                className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} items-center gap-10 md:gap-16 lg:gap-24 group`}
              >
                
                {/* Image Column (50% width) */}
                <div className="w-full md:w-1/2 relative">
                  <Link href={`/newsroom/${event.slug}`} className="block relative w-full aspect-[4/3] md:aspect-[5/4] rounded-2xl md:rounded-[2rem] overflow-hidden shadow-lg shadow-[#1a2e15]/5">
                    <img 
                      src={event.image} 
                      alt={event.title} 
                      className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out" 
                    />
                    {/* Subtle overlay for premium feel */}
                    <div className="absolute inset-0 bg-[#1a2e15]/10 group-hover:bg-transparent transition-colors duration-500" />
                  </Link>
                </div>

                {/* Text Column (50% width) */}
                <div className="w-full md:w-1/2 flex flex-col justify-center">
                  
                  {/* Meta Information (Date & Location) */}
                  <div className="flex items-center gap-4 mb-4">
                    <span className="text-[#ca5310] text-[11px] uppercase tracking-[0.2em] font-bold font-[family-name:var(--font-outfit)]">
                      {event.date}
                    </span>
                    <span className="w-1 h-1 rounded-full bg-[#1a2e15]/30" />
                    <span className="text-[#4a5d46] text-[11px] uppercase tracking-widest font-semibold font-[family-name:var(--font-outfit)]">
                      {event.location}
                    </span>
                  </div>
                  
                  {/* Title */}
                  <h3 className="text-4xl lg:text-5xl text-[#1a2e15] font-[family-name:var(--font-bebas)] tracking-wide mb-6 leading-[1.05]">
                    {event.title}
                  </h3>
                  
                  {/* Description */}
                  <p className="text-[#4a5d46] text-base md:text-lg font-[family-name:var(--font-outfit)] leading-relaxed mb-8">
                    {event.desc}
                  </p>

                  {/* Call to Action Link */}
                  <Link 
                    href={`/newsroom/${event.slug}`}
                    className="inline-flex items-center gap-3 text-[#1a2e15] font-bold font-[family-name:var(--font-outfit)] text-[11px] uppercase tracking-widest hover:text-[#ca5310] transition-colors group/btn w-fit"
                  >
                    Read Event Diary
                    <div className="w-10 h-10 rounded-full border border-[#1a2e15]/20 flex items-center justify-center group-hover/btn:border-[#ca5310] transition-colors">
                      <svg className="w-4 h-4 transform group-hover/btn:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </div>
                  </Link>
                  
                </div>

              </motion.div>
            );
          })}
        </div>

      </div>
    </section>
  );
}