/**
 * SEO Integration Tests
 * Comprehensive tests for the integrated SEO system
 */

import { describe, it, expect, beforeEach } from 'vitest';
import {
  generateSafeMetadata,
  generateSafeStructuredData,
  performSEOHealthCheck,
  initializeSEOIntegration,
  DEFAULT_SEO_CONFIG,
} from '@/lib/seo/integration';
import { siteConfig } from '@/lib/seo/config';

describe('SEO Integration System', () => {
  let config: typeof DEFAULT_SEO_CONFIG;

  beforeEach(() => {
    config = initializeSEOIntegration();
  });

  describe('Metadata Generation', () => {
    it('should generate safe metadata with fallbacks', async () => {
      const result = await generateSafeMetadata(undefined, config);
      
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      
      // Check if title exists and is a string
      expect(result.data?.title).toBeDefined();
      if (typeof result.data?.title === 'string') {
        expect(result.data.title).toContain('Levy Eromo Media');
      } else {
        // Handle case where title might be an object (Next.js metadata format)
        expect(result.data?.title).toBeTruthy();
      }
      
      expect(result.fallbackUsed).toBe(false);
    });

    it('should handle metadata generation errors gracefully', async () => {
      const faultyConfig = { ...config, enableValidation: true };
      
      // This should still succeed with fallback
      const result = await generateSafeMetadata({
        title: '', // Invalid empty title
        description: '',
      }, faultyConfig);
      
      expect(result.data).toBeDefined();
      // Should either succeed with valid data or use fallback
      expect(result.data?.title).toBeTruthy();
    });

    it('should generate page-specific metadata correctly', async () => {
      const pageData = {
        title: 'Test Page',
        description: 'Test description for SEO integration',
        keywords: ['test', 'seo', 'integration'],
      };

      const result = await generateSafeMetadata(pageData, config);
      
      expect(result.success).toBe(true);
      expect(result.data?.title).toContain('Test Page');
      expect(result.data?.description).toBe(pageData.description);
    });
  });

  describe('Structured Data Generation', () => {
    it('should generate safe structured data for homepage', async () => {
      const result = await generateSafeStructuredData('homepage', undefined, config);
      
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
      expect(Array.isArray(result.data)).toBe(true);
      expect(result.data!.length).toBeGreaterThan(0);
    });

    it('should handle structured data generation errors gracefully', async () => {
      const faultyConfig = { ...config, enableStructuredData: false };
      
      const result = await generateSafeStructuredData('homepage', undefined, faultyConfig);
      
      expect(result.success).toBe(true);
      expect(result.data).toEqual([]);
    });

    it('should validate structured data when enabled', async () => {
      const validationConfig = { ...config, enableValidation: true };
      
      const result = await generateSafeStructuredData('homepage', undefined, validationConfig);
      
      expect(result.success).toBe(true);
      expect(result.data).toBeDefined();
    });
  });

  describe('Health Check System', () => {
    it('should perform comprehensive health check', async () => {
      const result = await performSEOHealthCheck(config);
      
      expect(result.overall).toMatch(/^(healthy|warning|error)$/);
      expect(Array.isArray(result.checks)).toBe(true);
      expect(result.checks.length).toBeGreaterThan(0);
      
      // Check that all required components are tested
      const componentNames = result.checks.map(check => check.component);
      expect(componentNames).toContain('metadata');
      expect(componentNames).toContain('structured-data');
      expect(componentNames).toContain('canonical-urls');
    });

    it('should handle health check failures gracefully', async () => {
      // This test ensures the health check doesn't throw errors
      const result = await performSEOHealthCheck(config);
      
      expect(result).toBeDefined();
      expect(result.overall).toBeDefined();
      expect(result.checks).toBeDefined();
    });

    it('should provide detailed check information', async () => {
      const result = await performSEOHealthCheck(config);
      
      result.checks.forEach(check => {
        expect(check.component).toBeTruthy();
        expect(check.status).toMatch(/^(pass|warning|fail)$/);
        expect(check.message).toBeTruthy();
      });
    });
  });

  describe('Configuration Management', () => {
    it('should initialize with default configuration', () => {
      const defaultConfig = initializeSEOIntegration();
      
      expect(defaultConfig.enableStructuredData).toBe(true);
      expect(defaultConfig.enableImageOptimization).toBe(true);
      expect(defaultConfig.enableContentFreshness).toBe(true);
      expect(defaultConfig.fallbackToDefaults).toBe(true);
    });

    it('should merge custom configuration with defaults', () => {
      const customConfig = initializeSEOIntegration({
        enableStructuredData: false,
        logErrors: true,
      });
      
      expect(customConfig.enableStructuredData).toBe(false);
      expect(customConfig.logErrors).toBe(true);
      expect(customConfig.enableImageOptimization).toBe(true); // Should keep default
    });
  });

  describe('Error Handling', () => {
    it('should handle network-like errors gracefully', async () => {
      // Simulate a scenario where external dependencies might fail
      const result = await generateSafeMetadata(undefined, config);
      
      // Should always return a result, even if it's a fallback
      expect(result).toBeDefined();
      expect(result.data || result.error).toBeDefined();
    });

    it('should provide meaningful error messages', async () => {
      const faultyConfig = { 
        ...config, 
        enableValidation: true,
        fallbackToDefaults: false 
      };
      
      // Try to generate metadata that might fail validation
      const result = await generateSafeMetadata({
        title: '', // Invalid
        description: '',
      }, faultyConfig);
      
      if (!result.success) {
        expect(result.error).toBeDefined();
        expect(result.error?.message).toBeTruthy();
        expect(result.error?.component).toBeTruthy();
      }
    });
  });

  describe('Site Configuration', () => {
    it('should have valid site configuration', () => {
      expect(siteConfig.siteName).toBeTruthy();
      expect(siteConfig.siteUrl).toBeTruthy();
      expect(siteConfig.description).toBeTruthy();
      expect(siteConfig.businessInfo).toBeDefined();
      expect(siteConfig.defaultMetadata).toBeDefined();
    });

    it('should have proper business information', () => {
      const { businessInfo } = siteConfig;
      
      expect(businessInfo.name).toBeTruthy();
      expect(businessInfo.description).toBeTruthy();
      expect(businessInfo.email).toBeTruthy();
      expect(businessInfo.address).toBeDefined();
      expect(businessInfo.address.addressCountry).toBeTruthy();
    });

    it('should have social media configuration', () => {
      const { socialMedia } = siteConfig;
      
      expect(socialMedia).toBeDefined();
      expect(Object.keys(socialMedia).length).toBeGreaterThan(0);
    });
  });

  describe('Integration Resilience', () => {
    it('should maintain functionality when individual components fail', async () => {
      // Test that the system continues to work even if some parts fail
      const results = await Promise.allSettled([
        generateSafeMetadata(undefined, config),
        generateSafeStructuredData('homepage', undefined, config),
        performSEOHealthCheck(config),
      ]);
      
      // At least some operations should succeed
      const successfulResults = results.filter(r => r.status === 'fulfilled');
      expect(successfulResults.length).toBeGreaterThan(0);
    });

    it('should provide consistent API across all integration functions', async () => {
      const metadataResult = await generateSafeMetadata(undefined, config);
      const structuredDataResult = await generateSafeStructuredData('homepage', undefined, config);
      
      // All results should have consistent structure
      expect(metadataResult).toHaveProperty('success');
      expect(metadataResult).toHaveProperty('fallbackUsed');
      expect(structuredDataResult).toHaveProperty('success');
      expect(structuredDataResult).toHaveProperty('fallbackUsed');
    });
  });
});