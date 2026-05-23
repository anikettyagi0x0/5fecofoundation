"use client";

// ADDED: Imported useEffect
import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Bebas_Neue, Outfit } from "next/font/google";

const bebasNeue = Bebas_Neue({ weight: "400", subsets: ["latin"], variable: "--font-bebas" });
const outfit = Outfit({ weight: ["300", "400", "500", "600"], subsets: ["latin"], variable: "--font-outfit" });

const videoFootage = [
  {
    id: "v1",
    title: "OPERATION LEOPARD: THE WELL RESCUE",
    location: "Maharashtra • 4:12",
    thumbnail: "https://images.unsplash.com/photo-1602491453631-e2a5ad90a131?q=80&w=1200&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1", 
  },
  {
    id: "v2",
    title: "REUNITING AN ELEPHANT CALF",
    location: "Assam • 3:45",
    thumbnail: "https://images.unsplash.com/photo-1552825442-9905218d6a8b?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1", 
  },
  {
    id: "v3",
    title: "PANGOLIN ANTI-POACHING CONFISCATION",
    location: "Odisha • 2:30",
    thumbnail: "https://images.unsplash.com/photo-1550252133-78b17b20eb30?q=80&w=800&auto=format&fit=crop",
    videoUrl: "https://www.youtube.com/embed/LXb3EKWsInQ?autoplay=1", 
  }
];

export default function RescueFootage() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  // NEW FIX: Scroll Lock Hook
  // This completely stops the page from scrolling while the video modal is open
  useEffect(() => {
    if (activeVideo) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    // Cleanup function in case the component unmounts while modal is open
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [activeVideo]);

  const fadeUp = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <>
      <section className={`${bebasNeue.variable} ${outfit.variable} bg-[#0a0d08] py-24 md:py-32 w-full relative overflow-hidden border-t border-white/5`}>
        
        <div className="absolute inset-0 pointer-events-none opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')]" />

        <div className="max-w-[1200px] mx-auto px-6 md:px-12 relative z-10">
          
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
                  Drishya • Frontline Footage
                </span>
              </div>
              <h2 className="text-4xl md:text-5xl lg:text-6xl text-white font-[family-name:var(--font-bebas)] leading-[1.1] tracking-wide">
                WITNESS THE RESCUE
              </h2>
            </div>
            
            <button className="group flex items-center gap-3 px-6 py-3 border border-white/20 rounded-full text-white font-bold font-[family-name:var(--font-outfit)] text-xs uppercase tracking-widest hover:bg-white hover:text-[#0a0d08] transition-all duration-300 w-fit">
              View Documentary Series
              <svg className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </button>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-8">
            
            {/* Main Featured Video */}
            <motion.div 
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              onClick={() => setActiveVideo(videoFootage[0].videoUrl)}
              className="lg:col-span-8 group relative rounded-[2rem] overflow-hidden cursor-pointer w-full aspect-video lg:aspect-auto"
            >
              <img 
                src={videoFootage[0].thumbnail} 
                alt={videoFootage[0].title} 
                className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d08] via-[#0a0d08]/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity duration-500" />
              
              <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="w-20 h-20 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform group-hover:scale-110 group-hover:bg-[#ca5310] transition-all duration-500 shadow-[0_0_30px_rgba(202,83,16,0.2)]">
                  <svg className="w-8 h-8 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                    <path d="M8 5v14l11-7z" />
                  </svg>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 p-8 md:p-10 w-full">
                <div className="flex items-center gap-3 mb-3">
                  <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-[#a8c69f] text-[11px] uppercase tracking-widest font-bold font-[family-name:var(--font-outfit)] drop-shadow-md">
                    {videoFootage[0].location}
                  </span>
                </div>
                <h3 className="text-3xl md:text-5xl text-white font-[family-name:var(--font-bebas)] tracking-wide drop-shadow-lg">
                  {videoFootage[0].title}
                </h3>
              </div>
            </motion.div>

            {/* Stacked Side Videos */}
            <div className="lg:col-span-4 flex flex-col gap-6 lg:gap-8">
              {videoFootage.slice(1).map((video, index) => (
                <motion.div 
                  key={video.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.2 + (index * 0.2), duration: 0.8 }}
                  onClick={() => setActiveVideo(video.videoUrl)}
                  className="group relative rounded-2xl overflow-hidden cursor-pointer w-full aspect-video flex-1"
                >
                  <img 
                    src={video.thumbnail} 
                    alt={video.title} 
                    className="absolute inset-0 w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-1000 ease-out"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0a0d08] via-[#0a0d08]/40 to-transparent opacity-90 group-hover:opacity-70 transition-opacity duration-500" />
                  
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="w-14 h-14 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center transform group-hover:scale-110 group-hover:bg-[#ca5310] transition-all duration-500">
                      <svg className="w-6 h-6 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>

                  <div className="absolute bottom-0 left-0 p-6 w-full">
                    <span className="text-[#a8c69f] text-[10px] uppercase tracking-widest font-bold font-[family-name:var(--font-outfit)] mb-2 block">
                      {video.location}
                    </span>
                    <h3 className="text-xl md:text-2xl text-white font-[family-name:var(--font-bebas)] tracking-wide leading-tight">
                      {video.title}
                    </h3>
                  </div>
                </motion.div>
              ))}
            </div>
            
          </div>
        </div>
      </section>

      {/* ── 3. Video Player Modal (Lightbox) ── */}
      <AnimatePresence>
        {activeVideo && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            // NEW FIX: Changed to h-[100dvh] w-screen to force exact screen fit regardless of scroll position
            className={`fixed top-0 left-0 h-[100dvh] w-screen z-[100] flex items-center justify-center bg-black/95 backdrop-blur-sm p-4 md:p-12 ${bebasNeue.variable} ${outfit.variable}`}
            onClick={() => setActiveVideo(null)} 
          >
            {/* Close Button */}
            <button 
              onClick={() => setActiveVideo(null)}
              className="absolute top-6 right-6 md:top-10 md:right-10 text-white/70 hover:text-white transition-colors z-[110] flex items-center gap-2 group"
            >
              <span className="font-[family-name:var(--font-outfit)] text-xs uppercase tracking-[0.2em] font-bold opacity-0 group-hover:opacity-100 transform translate-x-2 group-hover:translate-x-0 transition-all">Close</span>
              <svg className="w-8 h-8" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Video Container */}
            <motion.div 
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ delay: 0.1, duration: 0.4 }}
              onClick={(e) => e.stopPropagation()} 
              className="relative w-full max-w-[1200px] aspect-video bg-black rounded-2xl md:rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
            >
              <iframe 
                src={activeVideo} 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowFullScreen
                className="absolute inset-0 w-full h-full"
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}