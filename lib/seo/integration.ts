/**
 * SEO Integration System
 * Central orchestration of all SEO components with error handling and fallbacks
 */

import { Metadata } from 'next';
import { siteConfig } from './config';
import { generateBaseMetadata, generatePageMetadata, validateMetadata } from './metadata';
import { generateHomepageSchemas, validateStructuredData } from './structured-data';
import { validateImageAltText, validatePageImages, generateCanonicalURL } from './technical';
import { calculateFreshness, getContentFreshness } from './content-freshness';
import { validateAllSiteImages } from './image-optimizer';

/**
 * SEO Integration Configuration
 */
export interface SEOIntegrationConfig {
  enableStructuredData: boolean;
  enableImageOptimization: boolean;
  enableContentFreshness: boolean;
  enableValidation: boolean;
  fallbackToDefaults: boolean;
  logErrors: boolean;
}

export const DEFAULT_SEO_CONFIG: SEOIntegrationConfig = {
  enableStructuredData: true,
  enableImageOptimization: true,
  enableContentFreshness: true,
  enableValidation: process.env.NODE_ENV === 'development',
  fallbackToDefaults: true,
  logErrors: process.env.NODE_ENV === 'development',
};

/**
 * SEO Integration Error Types
 */
export class SEOIntegrationError extends Error {
  constructor(
    message: string,
    public component: string,
    public originalError?: Error
  ) {
    super(message);
    this.name = 'SEOIntegrationError';
  }
}

/**
 * SEO Integration Result
 */
export interface SEOIntegrationResult<T> {
  success: boolean;
  data?: T;
  error?: SEOIntegrationError;
  fallbackUsed: boolean;
}

/**
 * Safe execution wrapper with error handling and fallbacks
 */
async function safeExecute<T>(
  operation: () => Promise<T> | T,
  fallback: T,
  component: string,
  config: SEOIntegrationConfig
): Promise<SEOIntegrationResult<T>> {
  try {
    const result = await operation();
    return {
      success: true,
      data: result,
      fallbackUsed: false,
    };
  } catch (error) {
    const seoError = new SEOIntegrationError(
      `Failed to execute ${component}`,
      component,
      error instanceof Error ? error : new Error(String(error))
    );

    if (config.logErrors) {
      console.error(`[SEO Integration] ${component} failed:`, error);
    }

    if (config.fallbackToDefaults) {
      return {
        success: false,
        data: fallback,
        error: seoError,
        fallbackUsed: true,
      };
    }

    return {
      success: false,
      error: seoError,
      fallbackUsed: false,
    };
  }
}

/**
 * Generate comprehensive metadata with error handling
 */
export async function generateSafeMetadata(
  pageData?: {
    title?: string;
    description?: string;
    keywords?: string[];
    canonical?: string;
    noIndex?: boolean;
    openGraph?: Record<string, any>;
    twitter?: Record<string, any>;
  },
  config: SEOIntegrationConfig = DEFAULT_SEO_CONFIG
): Promise<SEOIntegrationResult<Metadata>> {
  const fallbackMetadata = generateBaseMetadata();

  return safeExecute(
    async () => {
      let metadata: Metadata;

      if (pageData) {
        metadata = generatePageMetadata(pageData);
      } else {
        metadata = generateBaseMetadata();
      }

      // Validate metadata if enabled
      if (config.enableValidation) {
        const validation = validateMetadata(metadata);
        if (!validation.isValid) {
          throw new Error(`Metadata validation failed: ${validation.issues.join(', ')}`);
        }
      }

      return metadata;
    },
    fallbackMetadata,
    'metadata-generation',
    config
  );
}

/**
 * Generate structured data with error handling
 */
export async function generateSafeStructuredData(
  pageType: 'homepage' | 'project' | 'about' | 'contact' = 'homepage',
  pageData?: Record<string, any>,
  config: SEOIntegrationConfig = DEFAULT_SEO_CONFIG
): Promise<SEOIntegrationResult<any[]>> {
  const fallbackSchemas: any[] = []; // Empty array as fallback

  if (!config.enableStructuredData) {
    return {
      success: true,
      data: fallbackSchemas,
      fallbackUsed: false,
    };
  }

  return safeExecute(
    async () => {
      let schemas: any[] = [];

      switch (pageType) {
        case 'homepage':
          schemas = generateHomepageSchemas();
          break;
        case 'project':
          // Add project-specific schema generation here
          schemas = generateHomepageSchemas(); // Fallback for now
          break;
        default:
          schemas = generateHomepageSchemas();
      }

      // Validate structured data if enabled
      if (config.enableValidation) {
        for (const schema of schemas) {
          const validation = validateStructuredData(schema);
          if (!validation.isValid) {
            throw new Error(`Structured data validation failed: ${validation.errors.join(', ')}`);
          }
        }
      }

      return schemas;
    },
    fallbackSchemas,
    'structured-data-generation',
    config
  );
}

/**
 * Validate page images with error handling
 */
export async function validatePageImagesSafely(
  images: Array<{ src: string; alt?: string }>,
  config: SEOIntegrationConfig = DEFAULT_SEO_CONFIG
): Promise<SEOIntegrationResult<{ valid: boolean; issues: string[] }>> {
  const fallbackResult = { valid: true, issues: [] };

  if (!config.enableImageOptimization) {
    return {
      success: true,
      data: fallbackResult,
      fallbackUsed: false,
    };
  }

  return safeExecute(
    async () => {
      const issues: string[] = [];

      // Validate alt text
      for (const image of images) {
        const altValidation = validateImageAltText(image.alt || '', image.src);
        if (!altValidation.isValid) {
          issues.push(`Image ${image.src}: ${altValidation.issues.join(', ')}`);
        }
      }

      // Validate page images
      const imagesWithAlt = images.map(img => ({
        src: img.src,
        alt: img.alt || '', // Ensure alt is always a string
      }));
      const pageValidation = validatePageImages(imagesWithAlt);
      
      // Extract issues from validation results
      pageValidation.results.forEach(result => {
        if (!result.isValid) {
          issues.push(`Image ${result.src}: ${result.issues.join(', ')}`);
        }
      });

      return {
        valid: issues.length === 0,
        issues,
      };
    },
    fallbackResult,
    'image-validation',
    config
  );
}

/**
 * Calculate content freshness with error handling
 */
export async function calculateContentFreshnessSafely(
  contentId: string,
  config: SEOIntegrationConfig = DEFAULT_SEO_CONFIG
): Promise<SEOIntegrationResult<{ freshness: number; indicator: string }>> {
  const fallbackResult = { freshness: 1, indicator: 'fresh' };

  if (!config.enableContentFreshness) {
    return {
      success: true,
      data: fallbackResult,
      fallbackUsed: false,
    };
  }

  return safeExecute(
    async () => {
      const freshness = calculateFreshness(contentId);
      const contentFreshness = getContentFreshness(contentId);
      
      return {
        freshness: freshness.daysSinceUpdate,
        indicator: freshness.updateStatus,
      };
    },
    fallbackResult,
    'content-freshness-calculation',
    config
  );
}

/**
 * Generate canonical URL with error handling
 */
export async function generateSafeCanonicalURL(
  pathname: string,
  config: SEOIntegrationConfig = DEFAULT_SEO_CONFIG
): Promise<SEOIntegrationResult<string>> {
  const fallbackUrl = `${siteConfig.siteUrl}${pathname}`;

  return safeExecute(
    async () => {
      return generateCanonicalURL(pathname, siteConfig.siteUrl);
    },
    fallbackUrl,
    'canonical-url-generation',
    config
  );
}

/**
 * Comprehensive SEO health check
 */
export async function performSEOHealthCheck(
  config: SEOIntegrationConfig = DEFAULT_SEO_CONFIG
): Promise<{
  overall: 'healthy' | 'warning' | 'error';
  checks: Array<{
    component: string;
    status: 'pass' | 'warning' | 'fail';
    message: string;
  }>;
}> {
  const checks: Array<{
    component: string;
    status: 'pass' | 'warning' | 'fail';
    message: string;
  }> = [];

  // Check metadata generation
  const metadataResult = await generateSafeMetadata(undefined, config);
  checks.push({
    component: 'metadata',
    status: metadataResult.success ? 'pass' : (metadataResult.fallbackUsed ? 'warning' : 'fail'),
    message: metadataResult.success 
      ? 'Metadata generation working correctly'
      : `Metadata generation failed: ${metadataResult.error?.message}`,
  });

  // Check structured data generation
  const structuredDataResult = await generateSafeStructuredData('homepage', undefined, config);
  checks.push({
    component: 'structured-data',
    status: structuredDataResult.success ? 'pass' : (structuredDataResult.fallbackUsed ? 'warning' : 'fail'),
    message: structuredDataResult.success
      ? 'Structured data generation working correctly'
      : `Structured data generation failed: ${structuredDataResult.error?.message}`,
  });

  // Check image validation
  if (config.enableImageOptimization) {
    try {
      const imageValidation = validateAllSiteImages();
      const allValid = imageValidation.validImages === imageValidation.totalImages;
      const issueCount = imageValidation.results.reduce((count, result) => 
        count + result.issues.length, 0
      );
      
      checks.push({
        component: 'image-optimization',
        status: allValid ? 'pass' : 'warning',
        message: allValid
          ? 'All site images are properly optimized'
          : `Image optimization issues found: ${issueCount} issues`,
      });
    } catch (error) {
      checks.push({
        component: 'image-optimization',
        status: 'fail',
        message: `Image validation failed: ${error}`,
      });
    }
  }

  // Check canonical URL generation
  const canonicalResult = await generateSafeCanonicalURL('/', config);
  checks.push({
    component: 'canonical-urls',
    status: canonicalResult.success ? 'pass' : (canonicalResult.fallbackUsed ? 'warning' : 'fail'),
    message: canonicalResult.success
      ? 'Canonical URL generation working correctly'
      : `Canonical URL generation failed: ${canonicalResult.error?.message}`,
  });

  // Determine overall health
  const failCount = checks.filter(c => c.status === 'fail').length;
  const warningCount = checks.filter(c => c.status === 'warning').length;

  let overall: 'healthy' | 'warning' | 'error';
  if (failCount > 0) {
    overall = 'error';
  } else if (warningCount > 0) {
    overall = 'warning';
  } else {
    overall = 'healthy';
  }

  return { overall, checks };
}

/**
 * Initialize SEO integration system
 */
export function initializeSEOIntegration(
  config: Partial<SEOIntegrationConfig> = {}
): SEOIntegrationConfig {
  const finalConfig = { ...DEFAULT_SEO_CONFIG, ...config };

  if (finalConfig.logErrors) {
    console.log('[SEO Integration] Initialized with config:', finalConfig);
  }

  return finalConfig;
}

/**
 * Export all integration utilities
 */
export {
  generateSafeMetadata as generateMetadata,
  generateSafeStructuredData as generateStructuredData,
  validatePageImagesSafely as validatePageImages,
  calculateContentFreshnessSafely as calculateContentFreshness,
  generateSafeCanonicalURL as generateCanonicalURL,
};