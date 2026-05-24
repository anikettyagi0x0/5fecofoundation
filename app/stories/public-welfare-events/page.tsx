import { Metadata } from 'next';

// utils import
import Navbar from '../../components/Navbar';
import DonationSection from '../../components/donation';
import Footer from '../../components/Footer';

import Header from './_components/Header';
import WelfarePillars from './_components/WelfarePillars';
import WelfareRoadmap from './_components/WelfareRoadmap';
import WelfarePressMinimal from './_components/WelfarePressMinimal';
import RelatedDiaries from './_components/RelatedNews';


export const metadata: Metadata = {
  title: 'Children Workshops  | 5F ECO Foundation of India',
  description: 'Pioneering advanced vulnerability research and decentralized protocol security.',
};

export default function AboutPage() {
  return (
  
    <main className="min-h-screen bg-black text-neutral-200 selection:bg-emerald-500/30 pb-20">
      <Navbar />
      <Header />
      <WelfarePillars />
      <WelfareRoadmap />
      <WelfarePressMinimal />
      <RelatedDiaries />
      <DonationSection />
      <Footer />
    </main>
  );
}