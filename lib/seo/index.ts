/**
 * SEO Library - Main exports
 * Centralized exports for all SEO-related utilities and components
 */

// Configuration
export { siteConfig } from "./config";
export type { SiteConfig } from "./config";

// Types
export * from "./types";

// Metadata utilities
export {
  generateBaseMetadata,
  generatePageMetadata,
  generateDynamicMetadata,
  generateProjectMetadata,
  generateCategoryMetadata,
  generateArticleMetadata,
  generateSocialMetadata,
  validateMetadata,
} from "./metadata";

// Structured data utilities
export {
  generateOrganizationSchema,
  generateLocalBusinessSchema,
  generateWebSiteSchema,
  generateCreativeWorkSchema,
  generateBreadcrumbSchema,
  generateHomepageSchemas,
  StructuredData,
  combineSchemas,
  validateStructuredData,
} from "./structured-data";

// Sitemap utilities
export {
  getAllSitemapEntries,
  getProjectPages,
  generateSitemapXML,
  generateSitemapIndex,
  validateSitemapEntry,
  getSitemapStats,
} from "./sitemap";

// Technical SEO utilities
export {
  HTTP_STATUS,
  createSEOResponse,
  create404Response,
  createRedirectResponse,
  validateImageAltText,
  validatePageImages,
  generateRobotsMetaTag,
  validateURLStructure,
  generateCanonicalURL,
} from "./technical";

// Image optimization utilities
export {
  siteImages,
  validateAllSiteImages,
  getOptimizedImageProps,
  generateImageSEOReport,
  generateImageStructuredData,
} from "./image-optimizer";

// Content freshness utilities
export {
  calculateFreshness,
  generateFreshnessStructuredData,
  contentUpdates,
  getContentFreshness,
  updateContentTimestamp,
} from "./content-freshness";
export type { ContentFreshness, FreshnessIndicator } from "./content-freshness";

// Integration utilities with error handling and fallbacks
export {
  generateSafeMetadata,
  generateSafeStructuredData,
  validatePageImagesSafely,
  calculateContentFreshnessSafely,
  generateSafeCanonicalURL,
  performSEOHealthCheck,
  initializeSEOIntegration,
  SEOIntegrationError,
  DEFAULT_SEO_CONFIG,
} from "./integration";
export type { SEOIntegrationConfig, SEOIntegrationResult } from "./integration";