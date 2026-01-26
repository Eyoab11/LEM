import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';

// Generate specific metadata for the About page
export const metadata: Metadata = generatePageMetadata({
  title: 'ABOUT',
  description: 'Levy Eromo Media has a distinctive ability to curate heroic family-friendly stories enmeshed in local traditions and values, authentic to the markets where they are viewed.',
  keywords: [
    'about levy eromo media',
    'animation studio',
    'family entertainment',
    'global storytelling',
    'creative team',
    'entertainment production',
    'cross-cultural content',
    'heroic stories',
    'local traditions',
    'authentic content',
    'world-class production team',
    'international audience'
  ],
  image: '/lemm.png',
  canonical: '/about',
});

export default function AboutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}