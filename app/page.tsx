import Navbar from "./components/Navbar";
import HeroSection from "./components/Hero";
import CubeGallery from "./components/ForestCube";
import About from "./components/About";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#f8fafc]">
      {/* The Navbar Component */}
      <Navbar />
      <HeroSection />
      <CubeGallery />
      <About />
    </main>
  );
}