import Navbar from "./components/Navbar";
import HeroSection from "./components/Hero";
import CubeGallery from "./components/ForestCube";
import About from "./components/About";
import Services from "./components/Services";
import ImpactStories from "./components/Stories";
import FeaturedBanner from "./components/Banner";
import GetInvolved from "./components/community";
import DonationSection from "./components/donation";
import Footer from "./components/Footer";
import ImpactStats from "./components/Counters";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-[#f8fafc]">
      {/*Index Page Components*/}
      <Navbar />
      <HeroSection />
      <About />
      <FeaturedBanner />
      <Services />
      <ImpactStories />
      <ImpactStats />
      <GetInvolved />
      <DonationSection />
      <Footer />
    </main>
  );
}