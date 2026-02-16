import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';

// Generate specific metadata for the Team page
export const metadata: Metadata = generatePageMetadata({
  title: 'TEAM',
  description: 'Meet the leadership team at Levy Eromo Media. Our world-class team includes legendary composer Shuki Levy, creative executives, and industry veterans driving family entertainment innovation.',
  keywords: [
    'Levy Eromo Media team',
    'leadership team',
    'Shuki Levy',
    'Tori Avey Levy',
    'animation executives',
    'entertainment industry leaders',
    'creative team',
    'production team',
    'media professionals',
    'family entertainment experts',
    'animation studio team',
    'Power Rangers creator',
    'legendary composer',
    'entertainment visionaries'
  ],
  image: '/social/og-default.jpg',
  canonical: '/team',
});

export default function TeamLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
