'use client';

import { usePathname } from 'next/navigation';
import { generateCanonicalUrl } from '@/lib/navigation/internal-links';

interface CanonicalUrlProps {
  customUrl?: string;
}

export const CanonicalUrl = ({ customUrl }: CanonicalUrlProps) => {
  const pathname = usePathname();
  const canonicalUrl = customUrl || generateCanonicalUrl(pathname);

  return (
    <link rel="canonical" href={canonicalUrl} />
  );
};