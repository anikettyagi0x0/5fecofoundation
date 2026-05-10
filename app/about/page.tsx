import React from "react";
import Navbar from "@/components/Navbar";
import FloatingSocials from "@/components/utils/FloatingSocials";
import Footer from "@/components/Footer";

// About Page Specific Components
import AboutHero from "@/components/about/AboutHero";
import AboutStats from "@/components/about/AboutStats";
import MissionVision from "@/components/about/MissionVision";
import OurTeam from "@/components/about/OurTeam";
import HistoryTimeline from "@/components/about/HistoryTimeline";

export const metadata = {
  title: "About Us | 5F ECO Foundation",
  description: "Learn about our mission to protect nature and wildlife.",
};

export default function AboutPage() {
  return (
    <main className="relative min-h-screen bg-[#0a0d08] selection:bg-[#4d7c0f] selection:text-white">
      
      {/* 1. Global Navigation & Socials */}
      <Navbar />
      <FloatingSocials />

      {/* 2. Hero Section (Parallax & Title) */}
      <AboutHero />

      {/* 3. Overlapping Glass Stats */}
      <AboutStats />

      {/* 4. Core Content Sections */}
      <MissionVision />
      <OurTeam />
      <HistoryTimeline />

      {/* 5. Global Footer */}
      <Footer />
      
    </main>
  );
}