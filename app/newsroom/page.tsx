import { Metadata } from 'next';

// utils import
import Navbar from '../components/Navbar';
import DonationSection from '../components/donation';
import Footer from '../components/Footer';

// core sub-endpoint components import
import NewsHeader from './_components/Header';
import FeaturedNews from './_components/FeaturedNews';
import AllNewsGrid from './_components/AllNewsList';

export const metadata: Metadata = {
  title: 'About Us | 5F ECO Foundation of India',
  description: 'Pioneering advanced vulnerability research and decentralized protocol security.',
};

export default function AboutPage() {
  return (
  
    <main className="min-h-screen bg-black text-neutral-200 selection:bg-emerald-500/30 pb-20">
      <Navbar />
      <NewsHeader />
      <FeaturedNews />
      <AllNewsGrid />
      <DonationSection />
      <Footer />
    </main>
  );
}