"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { GiOakLeaf } from "react-icons/gi";

const Navbar = () => {
  const [scrolled, setScrolled] = useState(false);
  const [activeDropdown, setActiveDropdown] = useState<string | null>(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Updated Data Structure with Dropdowns for all options
  const navLinks = [
    {
      name: "About Us",
      href: "/about",
      dropdown: [
        { name: "Our Mission", href: "/about#mission" },
        { name: "Leadership", href: "/about#leadership" },
        { name: "Financials", href: "/about#financials" },
      ],
    },
    {
      name: "Programs",
      href: "#programs",
      dropdown: [
        { name: "Wildlife Rescue", href: "#rescue" },
        { name: "Habitat Restoration", href: "#restoration" },
        { name: "Community Education", href: "#education" },
      ],
    },
    {
      name: "Impact",
      href: "#impact",
      dropdown: [
        { name: "Success Stories", href: "#stories" },
        { name: "Annual Reports", href: "#reports" },
        { name: "Live Counters", href: "#counters" },
      ],
    },
    {
      name: "Get Involved",
      href: "#join",
      dropdown: [
        { name: "Volunteer", href: "#volunteer" },
        { name: "Donate", href: "#donate" },
        { name: "Corporate Partnerships", href: "#partnerships" },
      ],
    },
  ];

  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
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

        {/* 2. NAVIGATION LINKS WITH DROPDOWNS */}
        <div className="hidden lg:flex items-center gap-x-8 xl:gap-x-12 absolute left-1/2 -translate-x-1/2">
          {navLinks.map((link) => (
            <div
              key={link.name}
              className="relative group"
              onMouseEnter={() => setActiveDropdown(link.name)}
              onMouseLeave={() => setActiveDropdown(null)}
            >
              {/* Main Link */}
              <a
                href={link.href}
                className="flex items-center gap-1.5 py-4 text-[11px] uppercase tracking-[0.25em] font-semibold text-white/90 hover:text-[#a8c69f] transition-colors duration-300 relative drop-shadow-md"
              >
                {link.name}
                
                {/* Small Dropdown Arrow */}
                <svg
                  className={`w-2.5 h-2.5 opacity-70 transition-transform duration-300 ${
                    activeDropdown === link.name ? "rotate-180" : "rotate-0"
                  }`}
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 9l-7 7-7-7" />
                </svg>

                {/* Animated Underline */}
                <span className="absolute bottom-2 left-0 w-0 h-[2px] bg-[#a8c69f] transition-all duration-300 group-hover:w-full opacity-0 group-hover:opacity-100 rounded-full"></span>
              </a>

              {/* Animated Dropdown Menu */}
              <AnimatePresence>
                {activeDropdown === link.name && (
                  <motion.div
                    initial={{ opacity: 0, y: 15, scale: 0.95 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    exit={{ opacity: 0, y: 10, scale: 0.95 }}
                    transition={{ duration: 0.2, ease: "easeOut" }}
                    className="absolute top-full left-1/2 -translate-x-1/2 pt-1 min-w-[220px]"
                  >
                    <div className="bg-[#0a0d08]/95 backdrop-blur-xl border border-[#4d7c0f]/30 rounded-xl p-2.5 shadow-[0_15px_40px_rgba(0,0,0,0.6)]">
                      <div className="flex flex-col gap-1">
                        {link.dropdown.map((subItem) => (
                          <a
                            key={subItem.name}
                            href={subItem.href}
                            className="px-4 py-3 text-[10px] uppercase tracking-[0.2em] font-semibold text-white/70 hover:text-[#a8c69f] hover:bg-white/5 rounded-lg transition-all duration-200"
                          >
                            {subItem.name}
                          </a>
                        ))}
                      </div>
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>
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