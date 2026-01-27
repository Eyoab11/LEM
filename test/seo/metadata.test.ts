/**
 * Tests for SEO metadata generation
 */

import { describe, it, expect } from 'vitest';
import { 
  generateBaseMetadata, 
  generatePageMetadata, 
  validateMetadata
} from '@/lib/seo/metadata';

describe('SEO Metadata Generation', () => {
  it('should generate base metadata with required properties', () => {
    const metadata = generateBaseMetadata();
    
    expect(metadata).toBeDefined();
    expect(metadata.title).toBeDefined();
    expect(metadata.description).toBeDefined();
    expect(metadata.openGraph).toBeDefined();
    expect(metadata.twitter).toBeDefined();
    expect(metadata.robots).toBeDefined();
  });

  it('should generate page-specific metadata', () => {
    const metadata = generatePageMetadata({
      title: 'Test Page',
      description: 'This is a test page for SEO metadata generation',
      keywords: ['test', 'seo', 'metadata'],
      canonical: '/test-page'
    });

    expect(metadata.title).toContain('Test Page');
    expect(metadata.description).toBe('This is a test page for SEO metadata generation');
    expect(metadata.alternates?.canonical).toContain('/test-page');
  });

  it('should validate metadata and identify issues', () => {
    const validMetadata = generatePageMetadata({
      title: 'Valid Page Title',
      description: 'This is a valid description that meets the minimum length requirements for SEO optimization',
    });

    const validation = validateMetadata(validMetadata);
    expect(validation.isValid).toBe(true);
    expect(validation.issues).toHaveLength(0);
  });

  it('should identify metadata validation issues', () => {
    const invalidMetadata = {
      title: 'Short',
      description: 'Too short',
      openGraph: {}
    };

    const validation = validateMetadata(invalidMetadata as any);
    expect(validation.isValid).toBe(false);
    expect(validation.issues.length).toBeGreaterThan(0);
  });
});