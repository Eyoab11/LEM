import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import {
  SEARCH_CONSOLE_CONFIG,
  generateSearchConsoleVerificationTag,
  isSearchConsoleVerified,
  getSearchConsolePropertyUrl,
  getVerificationFileUrl,
  getSitemapUrl,
} from '@/lib/analytics/search-console';

beforeEach(() => {
  vi.clearAllMocks();
  
  // Mock environment variables
  process.env.NEXT_PUBLIC_SITE_URL = 'https://levyeromedia.com';
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('Search Console Basic Integration', () => {
  describe('SEARCH_CONSOLE_CONFIG', () => {
    it('should have correct default configuration', () => {
      expect(SEARCH_CONSOLE_CONFIG.siteUrl).toBe('https://levyeromedia.com');
      expect(SEARCH_CONSOLE_CONFIG.verificationFile).toBe('google8a46c4bf3c3615fc.html');
    });
  });

  describe('Utility Functions', () => {
    describe('generateSearchConsoleVerificationTag', () => {
      it('should generate correct verification meta tag', () => {
        const tag = generateSearchConsoleVerificationTag('abc123');
        expect(tag).toBe('<meta name="google-site-verification" content="abc123" />');
      });
    });

    describe('isSearchConsoleVerified', () => {
      it('should return true (verification file exists)', () => {
        const result = isSearchConsoleVerified();
        expect(result).toBe(true);
      });
    });

    describe('getSearchConsolePropertyUrl', () => {
      it('should generate correct property URL', () => {
        const url = getSearchConsolePropertyUrl('https://levyeromedia.com');
        expect(url).toBe('https://search.google.com/search-console?resource_id=https%3A%2F%2Flevyeromedia.com');
      });
    });

    describe('getVerificationFileUrl', () => {
      it('should generate correct verification file URL', () => {
        const url = getVerificationFileUrl('https://levyeromedia.com', 'google123.html');
        expect(url).toBe('https://levyeromedia.com/google123.html');
      });
    });

    describe('getSitemapUrl', () => {
      it('should generate correct sitemap URL', () => {
        const url = getSitemapUrl('https://levyeromedia.com');
        expect(url).toBe('https://levyeromedia.com/sitemap.xml');
      });
    });
  });

  describe('Configuration with default values', () => {
    it('should use default site URL when environment variable is not set', () => {
      delete process.env.NEXT_PUBLIC_SITE_URL;
      
      // Test that the config still works with default values
      expect(SEARCH_CONSOLE_CONFIG.siteUrl).toBe('https://levyeromedia.com');
    });
  });
});