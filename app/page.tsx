import { Metadata } from 'next';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { HeroSection } from '../components/sections/HeroSection';
import { LogoCarousel } from '../components/sections/LogoCarousel';
import { FeaturedWork } from '../components/sections/FeaturedWork';
import { ScrollText } from '../components/sections/ScrollText';
import { PastWork } from '../components/sections/PastWork';
import { WorkGrid } from '../components/sections/WorkGrid';
import { AboutUs } from '../components/sections/AboutUs';
import { Statistics } from '../components/sections/Statistics';
import { Contact } from '../components/sections/Contact';
import { generatePageMetadata } from '@/lib/seo';

// Generate specific metadata for the homepage
export const metadata: Metadata = generatePageMetadata({
  title: 'HOME',
  description: 'Levy Eromo Media (LEM) creates family-friendly stories rooted in local traditions and values, offering authentic entertainment that resonates globally. Led by a visionary team, LEM focuses on cross-cultural understanding, positive storytelling, and characters that connect with children and families worldwide. With a global production team, in-house content development, and innovative AI-driven tracking, LEM delivers fast, cost-effective productions with built-in merchandising strategies.',
  keywords: [
    'animation studio',
    'media production',
    'video editing',
    'creative storytelling',
    'visual effects',
    'motion graphics',
    'professional animation services',
    'entertainment production',
    'family-friendly content',
    'global storytelling',
    'Levy Eromo Media'
  ],
  image: '/lemm.png',
  canonical: '/',
});

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <LogoCarousel />
      <AboutUs />
      <FeaturedWork />
      <ScrollText />
      <PastWork />
      <WorkGrid />
      <Statistics />
      <Contact />
      <Footer />
    </main>
  );
}
