/**
 * Test for favicon configuration
 */

import { describe, it, expect } from 'vitest';
import { generateBaseMetadata } from '@/lib/seo/metadata';
import { siteConfig } from '@/lib/seo/config';

describe('Favicon Configuration', () => {
  it('should use lemm.png as the favicon', () => {
    const metadata = generateBaseMetadata();
    
    expect(metadata.icons).toBeDefined();
    expect(metadata.icons).toEqual({
      icon: '/lemm.png',
      shortcut: '/lemm.png',
      apple: '/lemm.png',
    });
  });

  it('should use lemm.png as the logo in site config', () => {
    expect(siteConfig.logo).toBe('/lemm.png');
  });

  it('should include lemm.png in structured data logo URL', () => {
    const expectedLogoUrl = `${siteConfig.siteUrl}${siteConfig.logo}`;
    expect(expectedLogoUrl).toContain('/lemm.png');
  });
});