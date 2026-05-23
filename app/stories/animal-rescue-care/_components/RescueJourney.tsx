"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bebas_Neue, Outfit } from "next/font/google";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const outfit = Outfit({ weight: ["300", "400", "500", "600"], subsets: ["latin"], variable: "--font-outfit" });

const journeySteps = [
  {
    num: "01",
    tag: "Uddhar • Extraction",
    title: "RAPID RESPONSE",
    desc: "Our 24/7 wildlife ambulance fleets and trained extraction teams are deployed to mitigate human-animal conflict, untangle snares, and safely extract animals in critical distress.",
    image: "https://images.unsplash.com/photo-1588526554528-769a6ebdd9db?q=80&w=800&auto=format&fit=crop", 
  },
  {
    num: "02",
    tag: "Upchar • Healing",
    title: "MEDICAL REHAB",
    desc: "Rescued animals are transported to our specialized care facilities for emergency trauma surgery, disease treatment, and psychological recovery in spacious, natural enclosures.",
    image: "https://images.unsplash.com/photo-1534567153574-2b12153a87f0?q=80&w=800&auto=format&fit=crop", 
  },
  {
    num: "03",
    tag: "Mukti • Freedom",
    title: "THE WILD RETURN",
    desc: "The ultimate goal. Once fully recovered and capable of surviving independently, animals undergo re-wilding protocols and are safely released back into protected biospheres.",
    image: "https://images.unsplash.com/photo-1606011334315-025e4baab810?q=80&w=800&auto=format&fit=crop", 
  }
];

export default function RescueJourney() {
  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className={`${bebasNeue.variable} ${outfit.variable} bg-[#FAF7F2] py-24 md:py-40 w-full relative`}>
      
      {/* Subtle organic noise texture for the background */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(#4d7c0f_1px,transparent_1px)] [background-size:40px_40px] opacity-[0.03]" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* ── 1. Section Header ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-50px" }}
          variants={fadeUp}
          className="flex flex-col items-center text-center max-w-3xl mx-auto mb-20 md:mb-32"
        >
          <div className="flex items-center gap-4 mb-6">
            <span className="w-10 h-[2px] bg-[#ca5310]" />
            <span className="text-[12px] text-[#ca5310] uppercase tracking-[0.4em] font-black font-[family-name:var(--font-outfit)]">
              The Lifeline Protocol
            </span>
            <span className="w-10 h-[2px] bg-[#ca5310]" />
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1a2e15] font-[family-name:var(--font-bebas)] leading-[1.05] tracking-wide mb-8">
            FROM CRISIS TO <br className="hidden md:block" />
            <span className="text-[#4d7c0f]">THE WILDERNESS.</span>
          </h2>
          
          <p className="text-[#4a5d46] font-[family-name:var(--font-outfit)] text-lg leading-relaxed">
            Wildlife conservation is not just about protecting habitats; it is about saving individual lives. Our dedicated veterinary teams follow a strict, three-tiered protocol to ensure every injured or orphaned animal is given the highest chance of returning to nature.
          </p>
        </motion.div>

        {/* ── 2. The Staggered Narrative Layout ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 relative">
          
          {/* Connecting line behind the columns (Desktop only) */}
          <div className="hidden md:block absolute top-[25%] left-0 right-0 h-[1px] border-t border-dashed border-[#d1e0ce] z-0" />

          {journeySteps.map((step, index) => (
            <motion.div 
              key={step.num}
              initial={{ opacity: 0, y: 50 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.2, duration: 0.8 }}
              // Here is the magic: The middle column drops down to create a staggered, organic layout
              className={`flex flex-col group relative z-10 ${index === 1 ? 'md:mt-24' : ''}`}
            >
              
              {/* Massive Number Typography */}
              <div className="text-[6rem] lg:text-[8rem] text-[#d1e0ce] font-[family-name:var(--font-bebas)] leading-none mb-4 md:mb-6 group-hover:text-[#a8c69f] transition-colors duration-500">
                {step.num}
              </div>

              {/* Portrait Image */}
              <div className="w-full aspect-[4/5] rounded-[2rem] overflow-hidden mb-8 border-4 border-white shadow-lg shadow-[#1a2e15]/5">
                <motion.img 
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.7 }}
                  src={step.image} 
                  alt={step.title} 
                  className="w-full h-full object-cover" 
                />
              </div>

              {/* Text Content */}
              <div className="bg-[#FAF7F2] relative">
                <span className="text-[#ca5310] text-[10px] uppercase tracking-widest font-bold font-[family-name:var(--font-outfit)] mb-3 block">
                  {step.tag}
                </span>
                <h3 className="text-3xl md:text-4xl text-[#1a2e15] font-[family-name:var(--font-bebas)] tracking-wide mb-4 group-hover:text-[#4d7c0f] transition-colors duration-300">
                  {step.title}
                </h3>
                <p className="text-[#4a5d46] text-base md:text-[17px] font-[family-name:var(--font-outfit)] leading-relaxed">
                  {step.desc}
                </p>
              </div>

            </motion.div>
          ))}
        </div>

      </div>
    </section>
  );
}