"use client";

import React from "react";
import { motion } from "framer-motion";

interface ScrollRevealProps {
  children: React.ReactNode;
  width?: "fit-content" | "100%";
  stagger?: boolean;
}

const ScrollReveal = ({ children, width = "100%", stagger = false }: ScrollRevealProps) => {
  
  // Animation for the container/single element
  const containerVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: {
        duration: 0.8,
        ease: [0.21, 0.45, 0.32, 0.9], // Custom cubic-bezier for "liquid" feel
        when: "beforeChildren",
        staggerChildren: stagger ? 0.15 : 0,
      }
    }
  };

  // Animation for individual children (used if stagger={true})
  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" }
    }
  };

  return (
    <motion.div
      style={{ position: "relative", width, overflow: "visible" }}
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true, margin: "-100px" }} // Triggers 100px before it enters view
    >
      {stagger ? (
        React.Children.map(children, (child) => (
          <motion.div variants={childVariants}>{child}</motion.div>
        ))
      ) : (
        children
      )}
    </motion.div>
  );
};

export default ScrollReveal;