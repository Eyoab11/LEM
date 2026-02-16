import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';
import { Header } from '../../../components/layout/Header';
import { Footer } from '../../../components/layout/Footer';
import { PresentationsPageClient } from './PresentationsPageClient';

export const metadata: Metadata = generatePageMetadata({
  title: 'PRESENTATIONS',
  description: 'Watch Levy Eromo Media presentations showcasing our vision, projects, and capabilities in family entertainment production.',
  keywords: [
    'Levy Eromo Media presentations',
    'media presentations',
    'company videos',
    'entertainment production videos',
    'animation studio presentations',
    'video presentations',
    'company showcase',
    'media portfolio videos'
  ],
  image: '/social/og-default.jpg',
  canonical: '/media/presentations',
});

export default function PresentationsPage() {
  return (
    <>
      <Header />
      <PresentationsPageClient />
      <Footer />
    </>
  );
}
