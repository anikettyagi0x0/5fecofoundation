"use client";

import React from "react";
import { motion } from "framer-motion";
import { GiLotus, GiTreeRoots, GiHand } from "react-icons/gi";

export default function AboutIntro() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.9, ease: [0.16, 1, 0.3, 1] } }
  };

  return (
    <section className="bg-[#FAF7F2] pt-24 pb-32 md:pt-32 md:pb-40 w-full relative overflow-hidden">
      
      {/* ── Ambient Background Textures ── */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#ca5310]/5 rounded-full blur-[100px]" />
        <div className="absolute top-1/2 -right-40 w-[500px] h-[500px] bg-[#4d7c0f]/5 rounded-full blur-[120px]" />
        <GiLotus className="absolute top-10 left-10 text-[400px] text-[#4d7c0f] opacity-[0.02] -rotate-12" />
        <GiTreeRoots className="absolute bottom-10 right-10 text-[600px] text-[#ca5310] opacity-[0.02]" />
      </div>

      <div className="max-w-[1440px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* ── 1. The Natural Intro & Image ── */}
        <div className="flex flex-col md:flex-row items-center justify-between gap-12 lg:gap-20 mb-20 md:mb-28 mt-6">
          
          {/* Main Title & Text Block */}
          <motion.div 
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeUp}
            className="w-full md:w-[55%] relative z-20"
          >
            <div className="flex items-center gap-4 mb-6">
              <span className="w-12 h-[2px] bg-[#ca5310]" />
              <span className="text-xs text-[#ca5310] uppercase tracking-[0.4em] font-bold font-[family-name:var(--font-outfit)]">
                Our Sankalp
              </span>
            </div>
            
            <h2 className="text-5xl md:text-6xl lg:text-7xl text-[#1a2e15] font-[family-name:var(--font-bebas)] leading-[0.95] tracking-wide mb-8 drop-shadow-sm">
              ROOTED IN NATURE. <br /> DRIVEN BY COMMUNITY.
            </h2>
            
            <div className="bg-white/60 backdrop-blur-md p-8 rounded-3xl rounded-tr-[4rem] border border-white/50 shadow-[0_20px_40px_rgba(26,46,21,0.03)]">
              {/* Updated: Smoother, medium-weight deep green text */}
              <p className="text-[#4a5d46] font-medium text-lg font-[family-name:var(--font-outfit)] leading-relaxed">
                The 5F Eco Foundation is a grassroots movement born from the soil of India. We are a dedicated collective working hand-in-hand with local communities to heal our forests, protect our wildlife, and restore the sacred balance of our ecosystems.
              </p>
            </div>
          </motion.div>

          {/* The Perfectly Sized Image Block */}
          <motion.div
            initial={{ opacity: 0, x: 30, y: 20 }}
            whileInView={{ opacity: 1, x: 0, y: 0 }}
            viewport={{ once: true, margin: "-100px" }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
            className="w-full md:w-[45%] flex justify-center md:justify-end relative z-10"
          >
            <div className="relative aspect-square w-full max-w-[450px] rounded-[2rem] rounded-tl-[5rem] rounded-br-[5rem] overflow-hidden shadow-2xl border-[6px] border-white group">
              <img 
                src="/aboutUs/AboutIndex/about-image-2.jpg"
                alt="NGO Impact in Action" 
                className="w-full h-full object-cover transition-transform duration-[1.5s] group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#1a2e15]/60 via-transparent to-transparent opacity-60" />
              
              {/* Photo Caption Label */}
              <div className="absolute bottom-5 left-5 bg-white/95 px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-[#ca5310] animate-pulse" />
                <span className="text-[10px] uppercase tracking-widest text-[#1a2e15] font-bold font-[family-name:var(--font-outfit)]">
                  Impact in Action
                </span>
              </div>
            </div>
          </motion.div>
        </div>

        {/* ── 2. Mission & Vision (Perfectly Balanced Side-by-Side) ── */}
        <motion.div 
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={{
            hidden: { opacity: 0 },
            visible: { opacity: 1, transition: { staggerChildren: 0.2 } }
          }}
          className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 relative z-20 mb-8 lg:mb-12"
        >
          {/* Mission Card */}
          <motion.div variants={fadeUp} className="bg-white p-10 md:p-12 rounded-[2rem] rounded-tl-[4rem] rounded-br-[4rem] shadow-[0_10px_40px_rgba(77,124,15,0.06)] border border-[#e8efe6] relative overflow-hidden group h-full">
            <div className="w-16 h-16 bg-[#e8efe6] rounded-2xl rounded-tl-[1.5rem] flex items-center justify-center mb-8 rotate-3 group-hover:rotate-0 transition-transform duration-500">
              <GiTreeRoots className="text-[#4d7c0f] text-3xl" />
            </div>
            <h3 className="text-3xl md:text-4xl text-[#1a2e15] font-[family-name:var(--font-bebas)] tracking-widest mb-4">
              OUR MISSION
            </h3>
            {/* Updated: Smoother, medium-weight deep green text */}
            <p className="text-[#3f4f3b] font-medium font-[family-name:var(--font-outfit)] leading-relaxed text-base md:text-lg">
              To rapidly respond to wildlife in distress, rehabilitate displaced species, and secure vulnerable habitats. We implement native, science-backed conservation strategies that stop biodiversity loss and restore ecological balance.
            </p>
          </motion.div>

          {/* Vision Card */}
          <motion.div variants={fadeUp} className="bg-white p-10 md:p-12 rounded-[2rem] rounded-tr-[4rem] rounded-bl-[4rem] shadow-[0_10px_40px_rgba(77,124,15,0.06)] border border-[#e8efe6] relative overflow-hidden group h-full">
            <div className="w-16 h-16 bg-[#fff3e0] rounded-2xl rounded-br-[1.5rem] flex items-center justify-center mb-8 -rotate-3 group-hover:rotate-0 transition-transform duration-500">
              <GiLotus className="text-[#ca5310] text-3xl" />
            </div>
            <h3 className="text-3xl md:text-4xl text-[#1a2e15] font-[family-name:var(--font-bebas)] tracking-widest mb-4">
              OUR VISION
            </h3>
            {/* Updated: Smoother, medium-weight deep green text */}
            <p className="text-[#3f4f3b] font-medium font-[family-name:var(--font-outfit)] leading-relaxed text-base md:text-lg">
              A future where India's natural habitats thrive unthreatened by human expansion. We envision rural communities acting as the proud stewards of their environment, ensuring generations inherit a vibrant, living planet.
            </p>
          </motion.div>
        </motion.div>

        {/* ── 3. How We Serve (Full-Width Horizontal Footer) ── */}
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1], delay: 0.2 }}
          className="w-full bg-[#2A3F24] rounded-[2rem] rounded-tl-[4rem] rounded-br-[4rem] p-10 md:p-14 text-white shadow-2xl relative overflow-hidden"
        >
          {/* Grain overlay */}
          <div className="absolute inset-0 opacity-[0.15] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />
          
          <div className="relative z-10">
            <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-white/10 pb-8 mb-10 gap-6">
              <h3 className="text-3xl md:text-5xl font-[family-name:var(--font-bebas)] tracking-widest text-[#e8efe6]">
                HOW WE SERVE
              </h3>
              <div className="flex items-center gap-3">
                <GiHand className="text-[#ca5310] text-3xl" />
                <span className="font-[family-name:var(--font-outfit)] text-sm tracking-widest uppercase text-[#a8c69f] font-bold">
                  Together We Protect
                </span>
              </div>
            </div>

            {/* Horizontal 3-Column Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
              {[
                { title: "Wildlife Rescue", desc: "24/7 rapid response teams for injured or displaced wildlife across all frontiers." },
                { title: "Habitat Restoration", desc: "Large-scale reforestation and active removal of invasive species from ecosystems." },
                { title: "Grassroots Education", desc: "Empowering local populations through awareness to mitigate human-wildlife conflict." }
              ].map((item, i) => (
                <div key={i} className="group flex flex-col gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/5 border border-white/20 flex items-center justify-center group-hover:bg-[#a8c69f] group-hover:border-transparent transition-colors duration-300">
                    <span className="text-white/70 group-hover:text-[#1a2e15] font-bold text-lg transition-colors duration-300">
                      {i + 1}
                    </span>
                  </div>
                  <div>
                    <h4 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-outfit)] mb-3 text-[#e8efe6]">
                      {item.title}
                    </h4>
                    {/* Updated: Added font-medium and softer contrast for the dark background */}
                    <p className="text-[#e8efe6]/80 font-medium font-[family-name:var(--font-outfit)] text-sm md:text-base leading-relaxed">
                      {item.desc}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </motion.div>

      </div>
    </section>
  );
}