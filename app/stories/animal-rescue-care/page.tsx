import { Metadata } from 'next';

// utils import
import Navbar from '../../components/Navbar';
import DonationSection from '../../components/donation';
import Footer from '../../components/Footer';

import Header from './_components/Header';
import RescueJourney from './_components/RescueJourney';
import RescueFootage from './_components/RescueFootage';
import RelatedDiaries from './_components/RelatedWorks';

export const metadata: Metadata = {
  title: 'Forest Restoration | 5F ECO Foundation of India',
  description: 'Pioneering advanced vulnerability research and decentralized protocol security.',
};

export default function AboutPage() {
  return (
  
    <main className="min-h-screen bg-black text-neutral-200 selection:bg-emerald-500/30 pb-20">
      <Navbar />
      <Header />
      <RescueJourney />
      <RescueFootage />
      <RelatedDiaries />
      <DonationSection />
      <Footer />
    </main>
  );
}