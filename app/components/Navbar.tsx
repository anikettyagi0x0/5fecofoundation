"use client";

import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { FaTwitter, FaLinkedin, FaFacebook } from "react-icons/fa";
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
      className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-700 ${
        scrolled 
          ? "bg-[#0a0d08]/95 backdrop-blur-2xl border-b border-[#4d7c0f]/20 py-3" 
          : "bg-transparent py-6"
      }`}
    >
      {/* Container with increased max-width and wider padding to prevent squeezing */}
      <div className="max-w-[1440px] mx-auto px-8 md:px-12 flex items-center">
        
        {/* 1. LOGO AREA - Fixed the broken div tags here! */}
        <div className="flex items-center gap-4 cursor-pointer group shrink-0">
          <div className="relative w-11 h-11 bg-[#4d7c0f] rounded-sm flex items-center justify-center transition-all group-hover:bg-[#a8c69f] group-hover:-rotate-6 shadow-2xl overflow-hidden">
            <img 
              src="/logo-5feco.jpeg" 
              alt="5F Eco Foundation of India" 
              className="w-7 h-7 object-contain" 
            />
          </div>
          <span className="text-xl tracking-[0.25em] font-bold text-white uppercase font-[family-name:var(--font-outfit)]">
            GLOBAL<span className="font-light text-[#a8c69f] opacity-80">India</span>
          </span>
        </div>

        {/* 2. SPACER (Pushes links to the center/right) */}
        <div className="flex-1" />

        {/* 3. NAVIGATION LINKS (Using flexible gap) */}
        <div className="hidden xl:flex items-center gap-x-10">
          {navLinks.map((link) => (
            <a
              key={link.name}
              href={link.href}
              className="text-[11px] uppercase tracking-[0.35em] font-bold text-white/90 hover:text-[#a8c69f] transition-all duration-300"
              style={{ textShadow: "0 2px 10px rgba(0,0,0,0.8)" }}
            >
              {link.name}
            </a>
          ))}
        </div>

        {/* 4. SPACER */}
        <div className="flex-1 max-w-[60px]" />

        {/* 5. ACTION AREA (Socials + Button) */}
        <div className="flex items-center gap-8 shrink-0">
          
          {/* Social Icons with individualized spacing */}
          <div className="hidden lg:flex items-center gap-4 border-r border-white/10 pr-8">
            {[FaTwitter, FaLinkedin, FaFacebook].map((Icon, idx) => (
              <a 
                key={idx} 
                href="#" 
                className="w-10 h-10 flex items-center justify-center rounded-full bg-black/40 border border-white/10 text-white hover:bg-[#4d7c0f] transition-all duration-300 backdrop-blur-md"
              >
                <Icon className="text-sm" />
              </a>
            ))}
          </div>

          {/* Advanced Forest CTA */}
          <motion.button 
            whileHover="hover"
            initial="initial"
            className="group relative overflow-hidden bg-white px-8 py-3.5 rounded-none shadow-2xl"
          >
            <div className="absolute inset-0 bg-[#4d7c0f] translate-y-[101%] group-hover:translate-y-0 transition-transform duration-500" />
            <div className="relative flex items-center gap-3">
               <span className="text-[10px] font-black uppercase tracking-[0.25em] text-black group-hover:text-white transition-colors">
                 Support Mission
               </span>
               <GiOakLeaf className="text-[#4d7c0f] group-hover:text-white transition-colors" size={18} />
            </div>
          </motion.button>
        </div>

      </div>
    </motion.nav>
  );
};

export default Navbar;