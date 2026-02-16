import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'BROCHURE',
  description: 'Explore the Levy Eromo Media brochure showcasing our vision, projects, and capabilities in family entertainment production.',
  keywords: [
    'Levy Eromo Media brochure',
    'media kit',
    'company overview',
    'entertainment production',
    'animation studio brochure',
    'corporate brochure',
    'company presentation',
    'media portfolio'
  ],
  image: '/social/og-default.jpg',
  canonical: '/media/brochure',
});

export default function BrochurePage() {
  return (
    <>
      {/* Dynamic import to avoid SSR issues with client component */}
      <BrochurePageContent />
    </>
  );
}

// Import the client component
import { BrochurePageContent } from './BrochurePageContent';
