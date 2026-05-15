"use client";

import React from "react";
import { motion } from "framer-motion";
import { GiSprout, GiLeafSwirl, GiOakLeaf, GiForest, GiLotus, GiTreeRoots } from "react-icons/gi";

// Ensure you replace the placeholder image URLs with your real paths
const timelineData = [
  {
    year: "2015",
    title: "The Seed is Planted",
    description: "Born from a small group of conservationists, our first mission was simple: rescuing displaced wildlife in expanding urban corridors.",
    icon: <GiSprout className="text-white text-2xl" />,
    image: "https://images.unsplash.com/photo-1564750975191-0ed807751c6b?q=80&w=800&auto=format&fit=crop",
    color: "#ca5310", // Saffron
  },
  {
    year: "2018",
    title: "First Reforestation",
    description: "Launched the 'Green Frontier' initiative, planting and nurturing over 50,000 native saplings in degraded forest zones.",
    icon: <GiLeafSwirl className="text-white text-2xl" />,
    image: "https://images.unsplash.com/photo-1611270404368-2a006f1d24c3?q=80&w=800&auto=format&fit=crop",
    color: "#4d7c0f", // Forest
  },
  {
    year: "2021",
    title: "Community Stewardship",
    description: "Partnered with 40+ rural villages, training locals to become the primary protectors of their indigenous wildlife.",
    icon: <GiOakLeaf className="text-white text-2xl" />,
    image: "https://images.unsplash.com/photo-1533420803445-5d971e4cc4fa?q=80&w=800&auto=format&fit=crop",
    color: "#ca5310", // Saffron
  },
  {
    year: "2024",
    title: "National Scale & Tech",
    description: "Integrated modern anti-poaching tech and expanded our rapid response veterinary teams across multiple states.",
    icon: <GiForest className="text-white text-2xl" />,
    image: "https://images.unsplash.com/photo-1542640244-7e672d6cb466?q=80&w=800&auto=format&fit=crop",
    color: "#1a2e15", // Deep Green
  }
];

export default function AboutTimeline() {
  return (
    <section className="bg-[#FAF7F2] pt-32 pb-32 md:pb-40 w-full relative overflow-hidden">
      
      {/* Background Mandala & Floral Motifs (Faded to 3% opacity) */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none opacity-[0.03]">
        <GiLotus className="absolute -top-20 -left-20 text-[500px] text-[#4d7c0f]" />
        <GiTreeRoots className="absolute -bottom-40 -right-20 text-[600px] text-[#ca5310]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* ── 1. Section Header ── */}
        {/* Adjusted mb-16 (margin-bottom) to fix the gap issue */}
        <div className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            className="flex items-center justify-center gap-4 mb-6"
          >
            <span className="w-12 h-[2px] bg-[#ca5310]" />
            <span className="text-xs text-[#ca5310] uppercase tracking-[0.4em] font-bold font-[family-name:var(--font-outfit)]">
              Our Journey
            </span>
            <span className="w-12 h-[2px] bg-[#ca5310]" />
          </motion.div>
          
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.1 }}
            className="text-4xl md:text-6xl lg:text-7xl text-[#1a2e15] font-[family-name:var(--font-bebas)] leading-[1.05] tracking-wide mb-6 drop-shadow-sm"
          >
            THE PATH OF CONSERVATION
          </motion.h2>
          
          {/* Smoothed out the text: medium weight, softer green color */}
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ delay: 0.2 }}
            className="text-[#4a5d46] font-medium text-lg md:text-xl font-[family-name:var(--font-outfit)] max-w-2xl mx-auto leading-relaxed"
          >
            True ecological change takes time. Over the years, our roots have grown deeper, our reach has expanded, and our commitment to the wild has only grown stronger.
          </motion.p>
        </div>

        {/* ── 2. DESKTOP TIMELINE (Horizontal Bento Grid) ── */}
        <div className="hidden md:grid md:grid-cols-4 gap-6 lg:gap-8">
          {timelineData.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="bg-white p-5 rounded-[1.5rem] rounded-tl-[4rem] rounded-br-[4rem] shadow-[0_15px_40px_rgba(26,46,21,0.04)] border border-[#e8efe6] hover:shadow-[0_25px_50px_rgba(77,124,15,0.08)] transition-all duration-500 group flex flex-col h-full"
            >
              {/* Image Container */}
              <div className="w-full h-44 lg:h-48 rounded-[1rem] rounded-tl-[3.5rem] overflow-hidden mb-5 shadow-inner">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105" />
              </div>

              {/* Text Area */}
              <div className="flex flex-col flex-grow text-center px-1">
                {/* Year Header */}
                <h4 className="text-4xl lg:text-5xl font-[family-name:var(--font-bebas)] tracking-wider mb-2 drop-shadow-sm transition-colors duration-300" style={{ color: item.color }}>
                  {item.year}
                </h4>
                
                {/* Title (Smoother bold) */}
                <h3 className="text-xl lg:text-2xl font-bold font-[family-name:var(--font-outfit)] text-[#1a2e15] mb-3 max-w-[280px] mx-auto leading-snug">
                  {item.title}
                </h3>
                
                {/* Description (Smoother, medium weight, softer color) */}
                <p className="text-[#3f4f3b] font-medium text-sm lg:text-base font-[family-name:var(--font-outfit)] leading-relaxed flex-grow">
                  {item.description}
                </p>
                
                {/* Flavour Icon and Text at bottom */}
                <div className="mt-8 pt-5 border-t border-[#e8efe6] flex items-center justify-center gap-2">
                  {React.cloneElement(item.icon as React.ReactElement, { size: 16, style: { color: item.color } })}
                  <span className="text-[10px] lg:text-xs text-[#71856b] font-[family-name:var(--font-outfit)] tracking-widest uppercase font-semibold">
                    Field Diaries: {item.year}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* ── 3. MOBILE TIMELINE (Alternating Path) ── */}
        <div className="block md:hidden relative max-w-lg mx-auto">
          {/* Animated Vertical Line Segment */}
          <div className="absolute top-0 left-[28px] w-[2px] h-full bg-[#e8efe6] z-0" />
          <motion.div 
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            className="absolute top-0 left-[28px] w-[2px] bg-gradient-to-b from-[#ca5310] via-[#4d7c0f] to-[#FAF7F2] z-0"
          />

          <div className="flex flex-col gap-10 pt-4">
            {timelineData.map((item, index) => (
              <motion.div 
                key={index}
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-50px" }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                className="relative pl-[5rem] pr-2 group"
              >
                {/* Timeline Icon Node */}
                <div 
                  className="absolute top-4 left-[12px] w-9 h-9 rounded-full border-[3px] border-[#FAF7F2] flex items-center justify-center shadow-md z-20 group-hover:scale-110 transition-transform"
                  style={{ backgroundColor: item.color }}
                >
                  {React.cloneElement(item.icon as React.ReactElement, { size: 16, style: { color: 'white' } })}
                </div>

                {/* Mobile Card */}
                <div className="bg-white p-4 rounded-[1.5rem] rounded-tl-[3.5rem] shadow-[0_10px_30px_rgba(26,46,21,0.04)] border border-[#e8efe6]">
                  {/* Photo */}
                  <div className="w-full h-40 rounded-[1rem] rounded-tl-[3rem] overflow-hidden mb-4 shadow-inner">
                    <img src={item.image} alt={item.title} className="w-full h-full object-cover" />
                  </div>
                  
                  {/* Text Header */}
                  <div className="text-center px-1">
                    <h4 className="text-4xl font-[family-name:var(--font-bebas)] tracking-wider mb-1" style={{ color: item.color }}>
                      {item.year}
                    </h4>
                    <h3 className="text-xl font-bold font-[family-name:var(--font-outfit)] text-[#1a2e15] mb-2 leading-tight">
                      {item.title}
                    </h3>
                    <p className="text-[#3f4f3b] font-medium text-sm font-[family-name:var(--font-outfit)] leading-relaxed">
                      {item.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

      </div>
    </section>
  );
}