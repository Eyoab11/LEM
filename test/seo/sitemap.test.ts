/**
 * Sitemap and Technical SEO Tests
 */

import { describe, it, expect } from 'vitest';
import {
  getAllSitemapEntries,
  generateSitemapXML,
  validateSitemapEntry,
  getSitemapStats,
  validateImageAltText,
  validateURLStructure,
  generateCanonicalURL,
} from '@/lib/seo';

describe('Sitemap Generation', () => {
  it('should generate sitemap entries for all pages', () => {
    const entries = getAllSitemapEntries();
    
    expect(entries).toBeDefined();
    expect(entries.length).toBeGreaterThan(0);
    
    // Check that main pages are included
    const urls = entries.map(entry => entry.url);
    expect(urls).toContain('/');
    expect(urls).toContain('/about');
    expect(urls).toContain('/contact');
  });

  it('should not include project pages in sitemap (projects are now sections on homepage)', () => {
    const entries = getAllSitemapEntries();
    const projectUrls = entries.filter(entry => entry.url.startsWith('/projects/'));
    
    expect(projectUrls.length).toBe(0);
  });

  it('should generate valid XML sitemap', () => {
    const entries = getAllSitemapEntries();
    const xml = generateSitemapXML(entries);
    
    expect(xml).toContain('<?xml version="1.0" encoding="UTF-8"?>');
    expect(xml).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">');
    expect(xml).toContain('<loc>');
    expect(xml).toContain('<lastmod>');
    expect(xml).toContain('<changefreq>');
    expect(xml).toContain('<priority>');
  });

  it('should validate sitemap entries correctly', () => {
    const validEntry = {
      url: '/test',
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    };
    
    expect(validateSitemapEntry(validEntry)).toBe(true);
    
    const invalidEntry = {
      url: 'invalid-url',
      lastModified: new Date(),
      changeFrequency: 'invalid' as any,
      priority: 2.0, // Invalid priority
    };
    
    expect(validateSitemapEntry(invalidEntry)).toBe(false);
  });

  it('should generate sitemap statistics', () => {
    const entries = getAllSitemapEntries();
    const stats = getSitemapStats(entries);
    
    expect(stats.totalUrls).toBe(entries.length);
    expect(stats.staticPages).toBeGreaterThan(0);
    expect(stats.averagePriority).toBeGreaterThan(0);
    expect(stats.averagePriority).toBeLessThanOrEqual(1);
    expect(stats.changeFrequencies).toBeDefined();
  });
});

describe('Image Alt Text Validation', () => {
  it('should validate good alt text', () => {
    const result = validateImageAltText(
      'Professional animation studio equipment for video production',
      '/camera.png',
      'animation studio production'
    );
    
    expect(result.isValid).toBe(true);
    expect(result.score).toBeGreaterThan(80);
    expect(result.issues).toHaveLength(0);
  });

  it('should detect missing alt text', () => {
    const result = validateImageAltText('', '/image.jpg');
    
    expect(result.isValid).toBe(false);
    expect(result.issues).toContain('Missing alt text');
    expect(result.score).toBeLessThan(60);
  });

  it('should detect redundant phrases', () => {
    const result = validateImageAltText('Image of a camera', '/camera.jpg');
    
    expect(result.isValid).toBe(false);
    expect(result.issues.some(issue => issue.includes('redundant phrase'))).toBe(true);
  });

  it('should detect filename in alt text', () => {
    const result = validateImageAltText('camera.jpg image', '/camera.jpg');
    
    expect(result.isValid).toBe(false);
    expect(result.issues).toContain('Alt text contains filename');
  });
});

describe('URL Structure Validation', () => {
  it('should validate good URL structure', () => {
    const result = validateURLStructure('/about');
    
    expect(result.isValid).toBe(true);
    expect(result.score).toBeGreaterThan(80);
  });

  it('should detect uppercase letters in URL', () => {
    const result = validateURLStructure('/About');
    
    expect(result.isValid).toBe(false);
    expect(result.issues).toContain('Contains uppercase letters');
  });

  it('should detect underscores in URL', () => {
    const result = validateURLStructure('/about_us');
    
    expect(result.isValid).toBe(false);
    expect(result.issues).toContain('Contains underscores');
  });

  it('should detect multiple consecutive hyphens', () => {
    const result = validateURLStructure('/about--us');
    
    expect(result.isValid).toBe(false);
    expect(result.issues).toContain('Contains multiple consecutive hyphens');
  });
});

describe('Canonical URL Generation', () => {
  it('should generate proper canonical URLs', () => {
    const canonical = generateCanonicalURL('/about', 'https://example.com');
    expect(canonical).toBe('https://example.com/about');
  });

  it('should handle root path correctly', () => {
    const canonical = generateCanonicalURL('/', 'https://example.com');
    expect(canonical).toBe('https://example.com/');
  });

  it('should remove trailing slashes', () => {
    const canonical = generateCanonicalURL('/contact/', 'https://example.com');
    expect(canonical).toBe('https://example.com/contact');
  });

  it('should add leading slash if missing', () => {
    const canonical = generateCanonicalURL('contact', 'https://example.com');
    expect(canonical).toBe('https://example.com/contact');
  });
});