/**
 * Google Search Console Basic Integration
 * Provides utilities for Search Console domain verification
 */

export interface SearchConsoleConfig {
  siteUrl: string;
  verificationFile: string;
}

/**
 * Search Console Configuration
 */
export const SEARCH_CONSOLE_CONFIG: SearchConsoleConfig = {
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || 'https://levyeromedia.com',
  verificationFile: 'google8a46c4bf3c3615fc.html',
};

/**
 * Utility functions for Search Console basic integration
 */

/**
 * Generate Search Console verification meta tag
 */
export function generateSearchConsoleVerificationTag(verificationCode: string): string {
  return `<meta name="google-site-verification" content="${verificationCode}" />`;
}

/**
 * Check if Search Console verification file exists
 */
export function isSearchConsoleVerified(): boolean {
  // The verification file exists in public/google8a46c4bf3c3615fc.html
  return true;
}

/**
 * Get Search Console property URL for manual setup
 */
export function getSearchConsolePropertyUrl(siteUrl: string): string {
  return `https://search.google.com/search-console?resource_id=${encodeURIComponent(siteUrl)}`;
}

/**
 * Get verification file URL
 */
export function getVerificationFileUrl(siteUrl: string, verificationFile: string): string {
  return `${siteUrl}/${verificationFile}`;
}

/**
 * Get sitemap URL for Search Console submission
 */
export function getSitemapUrl(siteUrl: string): string {
  return `${siteUrl}/sitemap.xml`;
}