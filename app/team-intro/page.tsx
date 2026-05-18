import { Metadata } from 'next';

// utils import
import Navbar from '../components/Navbar';
import DonationSection from '../components/donation';
import Footer from '../components/Footer';

// Main Components Import
import TeamHeader from './_components/Header';
import TeamGallery from './_components/TeamGallery';
import TeamInvite from './_components/TeamInvite';



export const metadata: Metadata = {
  title: 'Team Introduction | 5F ECO Foundation of India',
  description: 'Pioneering advanced vulnerability research and decentralized protocol security.',
};

export default function AboutPage() {
  return (
  
    <main className="min-h-screen bg-black text-neutral-200 selection:bg-emerald-500/30 pb-20">
      <Navbar />
      <TeamHeader />
      <TeamGallery />
      <TeamInvite />
      <DonationSection />
      <Footer />
    </main>
  );
}