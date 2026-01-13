import { Header } from '../components/layout/Header';
import { HeroSection } from '../components/sections/HeroSection';
import { LogoCarousel } from '../components/sections/LogoCarousel';
import { FeaturedWork } from '../components/sections/FeaturedWork';
import { ScrollText } from '../components/sections/ScrollText';
import { PastWork } from '../components/sections/PastWork';
import { WorkGrid } from '../components/sections/WorkGrid';

export default function Home() {
  return (
    <main>
      <Header />
      <HeroSection />
      <LogoCarousel />
      <FeaturedWork />
      <ScrollText />
      <PastWork />
      <WorkGrid />
    </main>
  );
}
