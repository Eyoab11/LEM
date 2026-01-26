/**
 * Next.js Sitemap Route Handler
 * Generates dynamic XML sitemap for the application
 */

import { MetadataRoute } from 'next';
import { getAllSitemapEntries } from '@/lib/seo/sitemap';
import { siteConfig } from '@/lib/seo/config';

export default function sitemap(): MetadataRoute.Sitemap {
  const entries = getAllSitemapEntries();
  const baseUrl = siteConfig.siteUrl;
  
  return entries.map((entry) => ({
    url: `${baseUrl}${entry.url}`,
    lastModified: entry.lastModified,
    changeFrequency: entry.changeFrequency,
    priority: entry.priority,
  }));
}

// Enable static generation for better performance
export const dynamic = 'force-static';
export const revalidate = 86400; // Revalidate every 24 hours