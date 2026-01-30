import { Metadata } from 'next';
import { generatePageMetadata } from '@/lib/seo';

export const metadata: Metadata = generatePageMetadata({
  title: 'POWER RANGERS',
  description: 'Discover how Shuki Levy helped create one of the most iconic children\'s franchises of all time, from the unforgettable theme song to the groundbreaking storytelling that defined Power Rangers.',
  keywords: [
    'Power Rangers',
    'Shuki Levy',
    'Haim Saban',
    'Mighty Morphin Power Rangers',
    'children\'s television',
    'animation',
    'theme song',
    'Go Go Power Rangers',
    'Super Sentai',
    'television production',
    'music composition',
    'entertainment history'
  ],
  canonical: '/power-rangers',
  socialImageType: 'project',
});

export default function PowerRangersLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}