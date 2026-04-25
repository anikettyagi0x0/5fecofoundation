import Navbar from "./components/Navbar";
import HeroSection from "./components/Hero";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#f8fafc]">
      {/* The Navbar Component */}
      <Navbar />
      <HeroSection />
    </main>
  );
}