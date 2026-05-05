"use client";

import React, { useEffect, useState, useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";
import { Bebas_Neue, Outfit } from "next/font/google";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const outfit = Outfit({ weight: ["300", "500", "600", "700"], subsets: ["latin"], variable: "--font-outfit" });

const HeroSection = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const { scrollY } = useScroll();
  const smoothY = useSpring(scrollY, { stiffness: 80, damping: 25 });

  const bgY = useTransform(smoothY, [0, 800], ["0%", "15%"]);
  const textY = useTransform(smoothY, [0, 800], ["0%", "12%"]);
  const subjectY = useTransform(smoothY, [0, 800], ["0%", "-8%"]);

  const title = "SANRAKSH";

  if (!mounted) return <div className="h-screen bg-[#0a0d08]" />;

  return (
    <section
      ref={containerRef}
      className={`${bebasNeue.variable} ${outfit.variable} relative w-full h-[100svh] overflow-hidden bg-[#0a0d08]`}
    >
      {/* ── LAYER 1: Background ── */}
      <motion.div className="absolute inset-0 z-0" style={{ y: bgY, scale: 1.05 }}>
        <img
          src="/hero/5feco-website-4.png"
          className="w-full h-full object-cover opacity-30 grayscale-[20%] contrast-[110%]"
          alt=""
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-[#0a0d08]" />
      </motion.div>

      {/* ── LAYER 2: SOLID HEADING (Behind Elephant) ── */}
      <motion.div
        className="absolute inset-0 z-10 flex flex-col items-center justify-center pointer-events-none pb-[12vh] md:pb-[18vh]"
        style={{ y: textY }}
      >
        {/* Original size perfectly preserved */}
        <div className="flex select-none">
          {title.split("").map((char, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.05, duration: 1 }}
              className="text-[clamp(100px,24vw,340px)] leading-[0.75] text-white font-[family-name:var(--font-bebas)]"
            >
              {char}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* ── LAYER 3: ELEPHANT (Middle Layer) ── */}
      <motion.div
        className="absolute inset-0 z-20 flex items-center justify-center pointer-events-none pt-[18vh] md:pt-[28vh]"
        style={{ y: subjectY }}
      >
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2, duration: 1.5, ease: [0.16, 1, 0.3, 1] }}
          className="w-[clamp(350px,58vw,850px)]"
        >
          <img
            src="/hero/elephant-hero-image.png"
            className="w-full h-auto opacity-[0.95] drop-shadow-[0_15px_25px_rgba(0,0,0,0.5)]"
            alt="Elephant"
          />
        </motion.div>
      </motion.div>

      {/* ── LAYER 4: OUTLINE HEADING & SUBHEADING (In Front of Elephant) ── */}
      <motion.div
        className="absolute inset-0 z-30 flex flex-col items-center justify-center pointer-events-none pb-[12vh] md:pb-[18vh]"
        style={{ y: textY }}
      >
        {/* Original size perfectly preserved */}
        <div className="flex select-none">
          {title.split("").map((char, i) => (
            <motion.span
              key={`outline-${i}`}
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 + i * 0.05, duration: 1 }}
              className="text-[clamp(100px,24vw,340px)] leading-[0.75] text-transparent [-webkit-text-stroke:1px_rgba(255,255,255,0.8)] font-[family-name:var(--font-bebas)]"
            >
              {char}
            </motion.span>
          ))}
        </div>
      </motion.div>

      {/* ── LAYER 5: Dashboard UI ── */}
      <div className="absolute bottom-0 left-0 w-full z-40 px-6 md:px-14 pb-10">
        <div className="grid grid-cols-1 md:grid-cols-3 items-end gap-12 border-t border-white/10 pt-10 backdrop-blur-[2px]">

          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <span className="text-[9px] text-[#a8c69f] uppercase tracking-[0.5em] font-bold">Working for Wildlife & Nature</span>
            </div>
            <div>
              <h4 className="text-3xl text-white font-[family-name:var(--font-bebas)] tracking-widest">5F Eco Foundation of india</h4>
              <p className="text-white/40 text-[9px] uppercase tracking-[0.3em] mt-1">Rescue • Conservation • Restoration</p>
            </div>
          </div>

          <div className="flex flex-col items-center group cursor-pointer">
            <div className="h-12 w-[1px] bg-gradient-to-b from-[#a8c69f] to-transparent mb-4 group-hover:h-16 transition-all" />
            <span className="text-[8px] text-white/30 uppercase tracking-[0.5em] group-hover:text-white transition-colors">Scroll to Discover</span>
          </div>

          <div className="flex flex-col items-end gap-6">
            <div className="flex gap-10">
              {['Mission', 'Impact', 'Research'].map((item) => (
                <a key={item} href="#" className="text-[10px] uppercase tracking-[0.35em] text-white/40 hover:text-[#a8c69f] transition-all font-semibold">
                  {item}
                </a>
              ))}
            </div>
            <div className="text-right">
              <p className="text-white font-bold text-xs tracking-[0.1em]">Join Our Mission</p>
              <p className="text-white/20 text-[9px] uppercase tracking-[0.2em] mt-1">Global Wildlife Network</p>
            </div>
          </div>

        </div>
      </div>

      {/* ── LAYER 6: Grain overlay ── */}
      <div className="absolute inset-0 pointer-events-none opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] z-50" />
    </section>
  );
};

export default HeroSection;