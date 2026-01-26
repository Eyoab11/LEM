/**
 * XML Sitemap Generation Utilities
 * Generates dynamic sitemaps for all pages in the application
 */

import { siteConfig } from './config';
import type { SitemapEntry } from './types';

// Static pages configuration
const staticPages: SitemapEntry[] = [
  {
    url: '/',
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 1.0,
  },
  {
    url: '/about',
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.8,
  },
  {
    url: '/contact',
    lastModified: new Date(),
    changeFrequency: 'monthly',
    priority: 0.7,
  },
  {
    url: '/projects',
    lastModified: new Date(),
    changeFrequency: 'weekly',
    priority: 0.9,
  },
];

// Dynamic project pages - in a real app, this would come from a CMS or database
const projectSlugs = ['power-rangers', 'inspector-gadget', 'he-man'];

/**
 * Get all dynamic project pages
 */
export function getProjectPages(): SitemapEntry[] {
  return projectSlugs.map((slug) => ({
    url: `/projects/${slug}`,
    lastModified: new Date(),
    changeFrequency: 'monthly' as const,
    priority: 0.8,
  }));
}

/**
 * Get all sitemap entries
 */
export function getAllSitemapEntries(): SitemapEntry[] {
  const projectPages = getProjectPages();
  return [...staticPages, ...projectPages];
}

/**
 * Generate XML sitemap content
 */
export function generateSitemapXML(entries: SitemapEntry[]): string {
  const baseUrl = siteConfig.siteUrl;
  
  const urlEntries = entries
    .map((entry) => {
      const url = `${baseUrl}${entry.url}`;
      const lastmod = entry.lastModified.toISOString().split('T')[0]; // YYYY-MM-DD format
      
      return `  <url>
    <loc>${url}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${entry.changeFrequency}</changefreq>
    <priority>${entry.priority}</priority>
  </url>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urlEntries}
</urlset>`;
}

/**
 * Generate sitemap index for multiple sitemaps (if needed in the future)
 */
export function generateSitemapIndex(sitemapUrls: string[]): string {
  const baseUrl = siteConfig.siteUrl;
  const lastmod = new Date().toISOString().split('T')[0];
  
  const sitemapEntries = sitemapUrls
    .map((sitemapUrl) => {
      return `  <sitemap>
    <loc>${baseUrl}${sitemapUrl}</loc>
    <lastmod>${lastmod}</lastmod>
  </sitemap>`;
    })
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>
<sitemapindex xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${sitemapEntries}
</sitemapindex>`;
}

/**
 * Validate sitemap entry
 */
export function validateSitemapEntry(entry: SitemapEntry): boolean {
  // Check URL format
  if (!entry.url || !entry.url.startsWith('/')) {
    return false;
  }
  
  // Check priority range
  if (entry.priority < 0 || entry.priority > 1) {
    return false;
  }
  
  // Check change frequency
  const validFrequencies = ['always', 'hourly', 'daily', 'weekly', 'monthly', 'yearly', 'never'];
  if (!validFrequencies.includes(entry.changeFrequency)) {
    return false;
  }
  
  // Check last modified date
  if (!(entry.lastModified instanceof Date) || isNaN(entry.lastModified.getTime())) {
    return false;
  }
  
  return true;
}

/**
 * Get sitemap statistics
 */
export function getSitemapStats(entries: SitemapEntry[]) {
  const stats = {
    totalUrls: entries.length,
    staticPages: staticPages.length,
    dynamicPages: entries.length - staticPages.length,
    lastGenerated: new Date(),
    averagePriority: entries.reduce((sum, entry) => sum + entry.priority, 0) / entries.length,
    changeFrequencies: {} as Record<string, number>,
  };
  
  // Count change frequencies
  entries.forEach((entry) => {
    stats.changeFrequencies[entry.changeFrequency] = 
      (stats.changeFrequencies[entry.changeFrequency] || 0) + 1;
  });
  
  return stats;
}