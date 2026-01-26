import { Metadata } from 'next';
import { generateProjectMetadata } from '@/lib/seo';

// Generate specific metadata for the Power Rangers project page
export const metadata: Metadata = generateProjectMetadata({
  title: 'POWER RANGERS',
  description: 'Discover how Shuki Levy helped create Mighty Morphin Power Rangers, shaping its storytelling, music, and legacy into a global pop culture phenomenon.',
  category: 'Television Production',
  tags: [
    'Power Rangers',
    'Shuki Levy',
    'Haim Saban',
    'children\'s television',
    'action series',
    'theme music',
    'Super Sentai adaptation',
    'television production'
  ],
  image: '/lemm.png',
  slug: 'power-rangers'
});

export default function PowerRangersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}