"use client";

import React from "react";
import { FaTwitter, FaLinkedinIn, FaInstagram, FaFacebookF } from "react-icons/fa";

const FloatingSocials = () => {
  const socials = [
    { name: "Twitter", icon: FaTwitter, href: "#" },
    { name: "LinkedIn", icon: FaLinkedinIn, href: "#" },
    { name: "Instagram", icon: FaInstagram, href: "#" },
    { name: "Facebook", icon: FaFacebookF, href: "#" },
  ];

  return (
    <div className="fixed right-0 top-1/2 -translate-y-1/2 z-[9999]">
      <div className="bg-[#0a0d08]/80 backdrop-blur-md border border-[#4d7c0f]/30 border-r-0 rounded-l-2xl py-6 px-3 flex flex-col gap-5 shadow-[-10px_0_30px_rgba(0,0,0,0.5)]">
        
        {/* Top Decorative Line */}
        <div className="w-[1px] h-4 bg-gradient-to-b from-transparent to-[#a8c69f] mx-auto opacity-50" />

        {socials.map((social) => {
          const Icon = social.icon;
          return (
            <a
              key={social.name}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="relative group w-10 h-10 flex items-center justify-center rounded-full bg-white/10 border border-white/10 hover:bg-[#4d7c0f] hover:border-[#a8c69f] hover:scale-110 transition-all duration-300"
            >
              <Icon className="text-white/80 group-hover:text-white text-[15px] transition-colors" />
              
              {/* Tooltip */}
              <span className="absolute right-14 bg-[#0a0d08] border border-[#4d7c0f]/30 text-[#a8c69f] text-[10px] uppercase tracking-[0.2em] font-bold py-1.5 px-3 rounded-md opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none whitespace-nowrap">
                {social.name}
              </span>
            </a>
          );
        })}

        {/* Bottom Decorative Line */}
        <div className="w-[1px] h-4 bg-gradient-to-t from-transparent to-[#a8c69f] mx-auto opacity-50" />
        
      </div>
    </div>
  );
};

export default FloatingSocials;