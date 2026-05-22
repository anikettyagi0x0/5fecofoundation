"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bebas_Neue, Outfit } from "next/font/google";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const outfit = Outfit({ weight: ["300", "400", "500", "600"], subsets: ["latin"], variable: "--font-outfit" });

export default function ResilienceHistory() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 1, ease: [0.16, 1, 0.3, 1] } },
  };

  return (
    <section className={`${bebasNeue.variable} ${outfit.variable} bg-[#FAF7F2] py-24 md:py-40 w-full relative overflow-hidden`}>
      
      {/* ── Organic Background Elements ── */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-[#4d7c0f]/5 rounded-full blur-[120px] -translate-x-1/2 -translate-y-1/2 pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-[#ca5310]/5 rounded-full blur-[120px] translate-x-1/3 translate-y-1/3 pointer-events-none" />

      {/* Subtle traditional texture hint */}
      <div className="absolute inset-0 z-0 pointer-events-none bg-[radial-gradient(#ca5310_1px,transparent_1px)] [background-size:60px_60px] opacity-[0.02]" />

      <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* ── 1. The Human Intro & Indian Ecological Anchor ── */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={fadeUp}
          className="flex flex-col items-center text-center max-w-4xl mx-auto mb-32"
        >
          <span className="text-[#ca5310] font-[family-name:var(--font-outfit)] uppercase tracking-[0.3em] text-xs font-bold mb-8 block">
            Prakriti's Cycle of Rebirth
          </span>
          
          <h2 className="text-4xl md:text-5xl lg:text-7xl text-[#1a2e15] font-[family-name:var(--font-bebas)] leading-[1.05] tracking-wide mb-10">
            AGNI IS NOT THE END. <br/>
            <span className="text-[#4d7c0f]">IT IS THE PURIFIER.</span>
          </h2>
          
          {/* Editorial Pull Quote */}
          <div className="relative border-l-2 border-[#ca5310] pl-6 md:pl-10 text-left md:text-center md:border-l-0 md:pl-0">
            <p className="text-[#4a5d46] font-[family-name:var(--font-outfit)] text-lg md:text-2xl leading-relaxed italic">
              "When you walk through the Himalayan foothills after a summer fire, it feels like a graveyard. But wait for the first drops of the Monsoon. When rain touches the black ash, the Mitti (soil) remembers. The forest doesn't just survive; it is born again."
            </p>
          </div>
        </motion.div>

        {/* ── 2. The Living Stats ── */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-16 mb-40">
          {[
            { num: "70", sym: "%", title: "Canopy Revival", text: "In just 3 to 5 years, pioneer species restore the lush green roof of the Indian deciduous forest." },
            { num: "48", sym: "hrs", title: "The First Shoots", text: "Hidden epicormic buds push new green shoots through charred bark within hours of the fire passing." },
            { num: "3", sym: "x", title: "Ash to Amrit", text: "The burned underbrush acts as potent fertilizer, tripling available nitrogen for the coming monsoon." }
          ].map((stat, i) => (
            <motion.div 
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.2, duration: 0.8 }}
              className="flex flex-col md:items-center md:text-center relative"
            >
              <div className="text-[5rem] md:text-[6rem] text-[#1a2e15] font-[family-name:var(--font-bebas)] leading-none mb-2">
                {stat.num}<span className="text-[#ca5310] text-5xl">{stat.sym}</span>
              </div>
              <h4 className="text-[#4d7c0f] font-bold font-[family-name:var(--font-outfit)] uppercase tracking-widest text-sm mb-4">
                {stat.title}
              </h4>
              <p className="text-[#4a5d46] text-base font-[family-name:var(--font-outfit)] leading-relaxed max-w-[280px]">
                {stat.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ── 3. The Narrative Journey (With Vertical Thread) ── */}
        <div className="relative space-y-32 md:space-y-40 pb-20">
          
          {/* Subtle connecting line running down the middle for desktop */}
          <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-[1px] bg-gradient-to-b from-[#ca5310]/50 via-[#4d7c0f]/30 to-transparent -translate-x-1/2 z-0" />
          
          {/* Story Block 1: The Chir Pine */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="flex flex-col md:flex-row items-center gap-12 lg:gap-24 relative z-10"
          >
            <div className="w-full md:w-1/2 order-2 md:order-1 bg-[#FAF7F2] md:bg-transparent md:pr-12">
              <span className="text-[#ca5310] text-6xl font-[family-name:var(--font-bebas)] mb-4 block leading-none">01</span>
              <h3 className="text-4xl lg:text-5xl text-[#1a2e15] font-[family-name:var(--font-bebas)] tracking-wide mb-6">
                THE CHIR PINE'S SECRET
              </h3>
              <p className="text-[#4a5d46] text-lg font-[family-name:var(--font-outfit)] leading-relaxed mb-6">
                In the upper reaches of Uttarakhand, the native Chir Pine has adapted brilliantly to ground fires. It produces cones sealed tight with hardened resin, holding its breath for the inevitable summer heat.
              </p>
              <p className="text-[#4a5d46] text-lg font-[family-name:var(--font-outfit)] leading-relaxed">
                When a fire sweeps through, the intense heat melts the resin. Thousands of protected seeds drop directly into the cleared earth, timing their release perfectly with the clearing of the old forest floor.
              </p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <div className="relative w-full aspect-[4/3] md:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-[#1a2e15]/5 border border-[#e8efe6]">
                <img src="https://images.unsplash.com/photo-1614527961204-51784db710be?q=80&w=1000&auto=format&fit=crop" alt="Pinecone opening" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>

          {/* Story Block 2: Bhasma (The Ash) */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="flex flex-col md:flex-row items-center gap-12 lg:gap-24 relative z-10"
          >
            <div className="w-full md:w-1/2">
              <div className="relative w-full aspect-[4/3] md:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-[#1a2e15]/5 border border-[#e8efe6]">
                <img src="https://images.unsplash.com/photo-1615560965379-3fb7496660fc?q=80&w=1000&auto=format&fit=crop" alt="New shoot in ash" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
            <div className="w-full md:w-1/2 bg-[#FAF7F2] md:bg-transparent md:pl-12">
              <span className="text-[#4d7c0f] text-6xl font-[family-name:var(--font-bebas)] mb-4 block leading-none">02</span>
              <h3 className="text-4xl lg:text-5xl text-[#1a2e15] font-[family-name:var(--font-bebas)] tracking-wide mb-6">
                BHASMA: THE BLACK GOLD
              </h3>
              <p className="text-[#4a5d46] text-lg font-[family-name:var(--font-outfit)] leading-relaxed mb-6">
                To the untrained eye, a burned forest floor is a wasteland. To the Indian ecosystem, it is a hyper-fertilized nursery. 
              </p>
              <p className="text-[#4a5d46] text-lg font-[family-name:var(--font-outfit)] leading-relaxed">
                The charred remains of Lantana and dry brush turn into *Bhasma* (ash). This neutralizes acidic soils and deposits a massive dose of carbon and nutrients, acting as an instant, potent fertilizer for the seeds lying in wait.
              </p>
            </div>
          </motion.div>

          {/* Story Block 3: The Palash & The Monsoon */}
          <motion.div 
            initial="hidden" whileInView="visible" viewport={{ once: true, margin: "-100px" }} variants={fadeUp}
            className="flex flex-col md:flex-row items-center gap-12 lg:gap-24 relative z-10"
          >
            <div className="w-full md:w-1/2 order-2 md:order-1 bg-[#FAF7F2] md:bg-transparent md:pr-12">
              <span className="text-[#ca5310] text-6xl font-[family-name:var(--font-bebas)] mb-4 block leading-none">03</span>
              <h3 className="text-4xl lg:text-5xl text-[#1a2e15] font-[family-name:var(--font-bebas)] tracking-wide mb-6">
                THE MONSOON AWAKENING
              </h3>
              <p className="text-[#4a5d46] text-lg font-[family-name:var(--font-outfit)] leading-relaxed mb-6">
                Fire acts as a natural reset button, clearing the dense overgrowth so Surya (sunlight) can flood the ground level. But the true magic happens weeks later.
              </p>
              <p className="text-[#4a5d46] text-lg font-[family-name:var(--font-outfit)] leading-relaxed">
                When the Southwestern Monsoon finally arrives, the rain washes the nutrient-dense ash directly into the root systems. Trees like the *Palash* (Flame of the Forest) burst back to life, painting the charred landscape in brilliant, defiant colors.
              </p>
            </div>
            <div className="w-full md:w-1/2 order-1 md:order-2">
              <div className="relative w-full aspect-[4/3] md:aspect-[4/5] rounded-[2rem] overflow-hidden shadow-2xl shadow-[#1a2e15]/5 border border-[#e8efe6]">
                <img src="https://images.unsplash.com/photo-1542272201-b1ca555f8505?q=80&w=1000&auto=format&fit=crop" alt="Sunlight through trees" className="absolute inset-0 w-full h-full object-cover" />
              </div>
            </div>
          </motion.div>

        </div>

      </div>
    </section>
  );
}