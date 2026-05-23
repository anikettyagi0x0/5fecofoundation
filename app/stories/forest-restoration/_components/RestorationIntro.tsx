"use client";

import React from "react";
import { motion } from "framer-motion";
import { Bebas_Neue, Outfit } from "next/font/google";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const outfit = Outfit({ weight: ["300", "400", "500", "600"], subsets: ["latin"], variable: "--font-outfit" });

const coreActivities = [
  {
    num: "01",
    tag: "Van Mahotsav • Plantation",
    title: "MASS REFORESTATION DRIVES",
    desc: "Organizing large-scale, community-led planting festivals across degraded lands using only native saplings to rapidly rebuild the natural canopy.",
    image: "https://images.unsplash.com/photo-1466692476868-aef1dfb1e735?q=80&w=600&auto=format&fit=crop", 
  },
  {
    num: "02",
    tag: "Beej Daan • Seeding",
    title: "SEED BALL DISPERSAL",
    desc: "Engaging local volunteers and youth to craft and scatter nutrient-coated seed balls across hard-to-reach terrains just before the monsoon arrives.",
    image: "https://images.unsplash.com/photo-1599940824399-b87987ceb72a?q=80&w=600&auto=format&fit=crop", 
  },
  {
    num: "03",
    tag: "Jal Sanchay • Hydrology",
    title: "BUILDING CHECK DAMS",
    desc: "Constructing traditional water harvesting structures to slow down monsoon runoff, recharge groundwater tables, and keep the forest soil moist year-round.",
    image: "https://images.unsplash.com/photo-1470043201067-764120126fa4?q=80&w=600&auto=format&fit=crop", 
  },
  {
    num: "04",
    tag: "Agni Raksha • Protection",
    title: "COMMUNITY FIRE WATCH",
    desc: "Equipping and training indigenous forest squads to clear dry brush, maintain vital fire lines, and act as the first line of defense during peak summer.",
    image: "https://images.unsplash.com/photo-1542044801-38fb5ea4219a?q=80&w=600&auto=format&fit=crop", 
  }
];

export default function RestorationActivities() {
  return (
    <section className={`${bebasNeue.variable} ${outfit.variable} bg-[#FAF7F2] py-24 md:py-32 w-full relative`}>
      <div className="max-w-[1000px] mx-auto px-6 md:px-12 relative z-10">
        
        {/* ── 1. Compact Header ── */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mb-16"
        >
          <div className="flex items-center gap-3 mb-4">
            <span className="w-8 h-[2px] bg-[#ca5310]" />
            <span className="text-[11px] text-[#ca5310] uppercase tracking-[0.4em] font-black font-[family-name:var(--font-outfit)]">
              On The Ground
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl lg:text-6xl text-[#1a2e15] font-[family-name:var(--font-bebas)] leading-[1.05] tracking-wide">
            OUR CORE ACTIVITIES
          </h2>
        </motion.div>

        {/* ── 2. The Editorial List ── */}
        <div className="flex flex-col">
          {coreActivities.map((activity, index) => (
            <motion.div 
              key={activity.num}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              className="group flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-12 py-8 border-t border-[#1a2e15]/10 first:border-t-2 first:border-[#1a2e15]"
            >
              
              {/* Number & Text Content */}
              <div className="flex gap-6 md:gap-10 items-start w-full md:w-3/4">
                <span className="text-5xl md:text-6xl text-[#d1e0ce] font-[family-name:var(--font-bebas)] leading-none mt-1 group-hover:text-[#4d7c0f] transition-colors duration-500">
                  {activity.num}
                </span>
                
                <div>
                  <span className="text-[#ca5310] text-[10px] uppercase tracking-[0.2em] font-bold font-[family-name:var(--font-outfit)] mb-2 block">
                    {activity.tag}
                  </span>
                  <h3 className="text-2xl md:text-3xl text-[#1a2e15] font-[family-name:var(--font-bebas)] tracking-wide mb-3">
                    {activity.title}
                  </h3>
                  <p className="text-[#4a5d46] text-[15px] md:text-base font-[family-name:var(--font-outfit)] leading-relaxed max-w-xl">
                    {activity.desc}
                  </p>
                </div>
              </div>

              {/* Thumbnail Image */}
              <div className="w-full md:w-1/4 flex justify-start md:justify-end">
                <div className="w-full md:w-40 aspect-[16/9] md:aspect-[4/3] rounded-xl overflow-hidden shadow-sm border border-[#e8efe6]">
                  <img 
                    src={activity.image} 
                    alt={activity.title} 
                    className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700 ease-out" 
                  />
                </div>
              </div>

            </motion.div>
          ))}
          
          {/* Final closing border */}
          <div className="w-full border-t border-[#1a2e15]/10" />
        </div>

      </div>
    </section>
  );
}