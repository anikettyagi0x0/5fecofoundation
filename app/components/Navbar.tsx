"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { GiOakLeaf } from "react-icons/gi";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const navLinks = [
    { name: "Our Mission", href: "#mission" },
    { name: "Programs", href: "#programs" },
    { name: "Impact", href: "#impact" },
    { name: "Get Involved", href: "#join" },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      // Reverted to full-width edge-to-edge design
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 border-b ${
        scrolled 
          ? "bg-[#0a0d08]/90 backdrop-blur-xl border-[#4d7c0f]/30 shadow-2xl py-3 md:py-4" 
          : "bg-transparent border-transparent py-5 md:py-6"
      }`}
    >
      <div className="max-w-[1440px] mx-auto px-6 md:px-12 flex items-center justify-between">
        
        {/* 1. LOGO AREA */}
        <div className="flex items-center gap-3 md:gap-4 cursor-pointer group shrink-0">
          
          <div className="relative w-14 h-14 md:w-16 md:h-16 min-w-[56px] min-h-[56px] md:min-w-[64px] md:min-h-[64px] flex items-center justify-center transition-transform duration-500 group-hover:scale-105 rounded-full overflow-hidden bg-transparent">
            <img 
              src="/logo-5feco.jpeg" 
              alt="5F Eco Foundation of India" 
              className="w-full h-full object-contain scale-110" 
            />
          </div>

          <div className="flex flex-col justify-center pl-1 md:pl-2">
            <span className="text-[22px] md:text-[28px] tracking-[0.15em] font-extrabold text-white uppercase leading-none font-[family-name:var(--font-outfit)] drop-shadow-md">
              5F ECO
            </span>
            <span className="text-[9px] md:text-[11px] font-medium text-[#a8c69f] tracking-[0.3em] uppercase mt-1.5 drop-shadow-sm">
              Foundation of India
            </span>
          </div>

        </div>

        {/* 2. NAVIGATION LINKS */}
        <div className="hidden lg:flex items-center gap-x-8 xl:gap-x-12 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[11px] uppercase tracking-[0.25em] font-semibold text-white/90 hover:text-[#a8c69f] transition-colors duration-300 relative group drop-shadow-md"
            >
              {link.name}
              <span className="absolute -bottom-2 left-0 w-0 h-[2px] bg-[#a8c69f] transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100 rounded-full"></span>
            </a>
          ))}
        </div>

        {/* 3. ACTION AREA */}
        <div className="flex items-center shrink-0">
          <motion.button 
            whileHover="hover"
            initial="initial"
            className="group relative overflow-hidden bg-white/10 border border-white/20 hover:border-transparent px-6 py-2.5 md:px-8 md:py-3.5 rounded-full shadow-lg transition-all duration-300"
          >
            <div className="absolute inset-0 bg-[#4d7c0f] scale-x-0 origin-left group-hover:scale-x-100 transition-transform duration-500 ease-out" />
            <div className="relative flex items-center gap-2.5">
               <span className="text-[9px] md:text-[10px] font-bold uppercase tracking-[0.2em] text-white transition-colors">
                 Support
               </span>
               <GiOakLeaf className="text-[#a8c69f] group-hover:text-white transition-colors" size={16} />
            </div>
          </motion.button>
        </div>

      </div>
    </motion.nav>
  );
};

export default Navbar;