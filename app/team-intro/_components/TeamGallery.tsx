"use client";

import React from "react";
import { motion } from "framer-motion";
import Link from "next/link";
import { teamMembers } from "../utils/info"; 

const categoryOrder = ["Board of Directors", "Core Team", "Field Volunteers"];

// Relatable Hinglish phrases that connect emotionally with the user
const hinglishPhrases: Record<string, string> = {
  "Board of Directors": "Humari Neev",    // Our Foundation/Roots
  "Core Team": "Asli Taaqat",             // The Real Strength
  "Field Volunteers": "Zameen Ke Hero",   // The Grassroots Heroes
};

export default function TeamRoster() {
  const fadeUp = {
    hidden: { opacity: 0, y: 40 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.8, ease: "easeOut" } },
  };

  return (
    <section className="bg-white py-24 md:py-32 w-full relative">
      <div className="max-w-[1200px] mx-auto px-6 md:px-12">
        
        {categoryOrder.map((category, index) => {
          const membersInCategory = teamMembers.filter(
            (member) => member.category === category
          );

          if (membersInCategory.length === 0) return null;

          return (
            <div key={index} className="mb-24 last:mb-0">
              
              {/* ── Category Header ── */}
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-50px" }}
                variants={fadeUp}
                className="mb-14 flex flex-col items-center text-center border-b border-[#e8efe6] pb-8"
              >
                <div className="flex items-center gap-4 mb-3">
                  <span className="w-10 h-[2px] bg-[#ca5310]" />
                  {/* The Relatable Hinglish Phrase */}
                  <span className="text-sm md:text-base text-[#ca5310] uppercase font-bold tracking-[0.3em] font-[family-name:var(--font-outfit)]">
                    {hinglishPhrases[category]}
                  </span>
                  <span className="w-10 h-[2px] bg-[#ca5310]" />
                </div>
                <h2 className="text-4xl md:text-5xl text-[#1a2e15] font-[family-name:var(--font-bebas)] tracking-wide">
                  {category}
                </h2>
              </motion.div>

              {/* ── Members List (Perfectly Centered) ── */}
              <div className="flex flex-wrap justify-center gap-8 lg:gap-12">
                {membersInCategory.map((member, idx) => (
                  <motion.div
                    key={member.id}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, margin: "-50px" }}
                    transition={{ delay: idx * 0.1, duration: 0.6 }}
                    className="group flex flex-col items-center text-center w-full max-w-[280px]"
                  >
                    {/* Portrait Image Container */}
                    <div className="w-full aspect-[3/4] rounded-2xl overflow-hidden bg-[#FAF7F2] mb-6 relative shadow-[0_10px_30px_rgba(26,46,21,0.04)] group-hover:shadow-[0_20px_40px_rgba(77,124,15,0.1)] transition-all duration-500">
                      <img
                        src={member.image}
                        alt={member.name}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#1a2e15]/0 group-hover:bg-[#1a2e15]/10 transition-colors duration-500" />
                    </div>

                    {/* Member Details */}
                    <div className="flex flex-col items-center w-full">
                      <h3 className="text-xl md:text-2xl font-bold font-[family-name:var(--font-outfit)] text-[#1a2e15] mb-1">
                        {member.name}
                      </h3>
                      <p className="text-[#4d7c0f] font-medium text-sm md:text-base font-[family-name:var(--font-outfit)] mb-5">
                        {member.role}
                      </p>

                      {/* Social Icons */}
                      {member.socials && (
                        <div className="flex items-center justify-center gap-3">
                          
                          {member.socials.linkedin && (
                            <Link 
                              href={member.socials.linkedin} 
                              target="_blank"
                              className="w-9 h-9 rounded-full bg-[#f4f7f3] border border-[#d1e0ce] flex items-center justify-center text-[#4a5d46] hover:bg-[#4d7c0f] hover:border-[#4d7c0f] hover:text-white transition-all duration-300"
                            >
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
                              </svg>
                            </Link>
                          )}

                          {member.socials.twitter && (
                            <Link 
                              href={member.socials.twitter} 
                              target="_blank"
                              className="w-9 h-9 rounded-full bg-[#f4f7f3] border border-[#d1e0ce] flex items-center justify-center text-[#4a5d46] hover:bg-[#4d7c0f] hover:border-[#4d7c0f] hover:text-white transition-all duration-300"
                            >
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M24 4.557c-.883.392-1.832.656-2.828.775 1.017-.609 1.798-1.574 2.165-2.724-.951.564-2.005.974-3.127 1.195-.897-.957-2.178-1.555-3.594-1.555-3.179 0-5.515 2.966-4.797 6.045-4.091-.205-7.719-2.165-10.148-5.144-1.29 2.213-.669 5.108 1.523 6.574-.806-.026-1.566-.247-2.229-.616-.054 2.281 1.581 4.415 3.949 4.89-.693.188-1.452.232-2.224.084.626 1.956 2.444 3.379 4.6 3.419-2.07 1.623-4.678 2.348-7.29 2.04 2.179 1.397 4.768 2.212 7.548 2.212 9.142 0 14.307-7.721 13.995-14.646.962-.695 1.797-1.562 2.457-2.549z"/>
                              </svg>
                            </Link>
                          )}

                          {member.socials.instagram && (
                            <Link 
                              href={member.socials.instagram} 
                              target="_blank"
                              className="w-9 h-9 rounded-full bg-[#f4f7f3] border border-[#d1e0ce] flex items-center justify-center text-[#4a5d46] hover:bg-[#4d7c0f] hover:border-[#4d7c0f] hover:text-white transition-all duration-300"
                            >
                              <svg className="w-4 h-4 fill-current" viewBox="0 0 24 24">
                                <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                              </svg>
                            </Link>
                          )}

                        </div>
                      )}
                    </div>
                  </motion.div>
                ))}
              </div>

            </div>
          );
        })}

      </div>
    </section>
  );
}