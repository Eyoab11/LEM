// URL optimization utilities for SEO

/**
 * Optimizes URL slugs for SEO
 */
export const optimizeSlug = (text: string): string => {
  return text
    .toLowerCase()
    .trim()
    .replace(/[^\w\s-]/g, '') // Remove special characters except hyphens
    .replace(/\s+/g, '-') // Replace spaces with hyphens
    .replace(/-+/g, '-') // Replace multiple hyphens with single hyphen
    .replace(/^-|-$/g, ''); // Remove leading/trailing hyphens
};

/**
 * Generates SEO-friendly URLs from titles
 */
export const generateSeoUrl = (title: string, maxLength: number = 60): string => {
  const slug = optimizeSlug(title);
  
  if (slug.length <= maxLength) {
    return slug;
  }
  
  // Truncate at word boundary
  const truncated = slug.substring(0, maxLength);
  const lastHyphen = truncated.lastIndexOf('-');
  
  return lastHyphen > 0 ? truncated.substring(0, lastHyphen) : truncated;
};

/**
 * Validates URL structure for SEO best practices
 */
export const validateUrl = (url: string): {
  isValid: boolean;
  issues: string[];
  suggestions: string[];
} => {
  const issues: string[] = [];
  const suggestions: string[] = [];
  
  // Check length
  if (url.length > 100) {
    issues.push('URL is too long (over 100 characters)');
    suggestions.push('Consider shortening the URL slug');
  }
  
  // Check for underscores (hyphens are preferred)
  if (url.includes('_')) {
    issues.push('URL contains underscores');
    suggestions.push('Replace underscores with hyphens for better SEO');
  }
  
  // Check for uppercase letters
  if (url !== url.toLowerCase()) {
    issues.push('URL contains uppercase letters');
    suggestions.push('Use lowercase letters for consistency');
  }
  
  // Check for special characters
  const specialChars = /[^a-z0-9\-\/]/g;
  if (specialChars.test(url)) {
    issues.push('URL contains special characters');
    suggestions.push('Remove special characters and use only letters, numbers, and hyphens');
  }
  
  // Check for double hyphens
  if (url.includes('--')) {
    issues.push('URL contains double hyphens');
    suggestions.push('Replace double hyphens with single hyphens');
  }
  
  // Check for trailing/leading hyphens in segments
  const segments = url.split('/');
  segments.forEach((segment, index) => {
    if (segment.startsWith('-') || segment.endsWith('-')) {
      issues.push(`URL segment ${index + 1} has leading or trailing hyphens`);
      suggestions.push('Remove leading and trailing hyphens from URL segments');
    }
  });
  
  return {
    isValid: issues.length === 0,
    issues,
    suggestions
  };
};

/**
 * Generates canonical URL with proper formatting
 */
export const generateCanonicalUrl = (path: string, baseUrl?: string): string => {
  const base = baseUrl || process.env.NEXT_PUBLIC_SITE_URL || 'https://levyeromomedia.com';
  
  // Ensure path starts with /
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  
  // Remove trailing slash except for root
  const finalPath = cleanPath === '/' ? '/' : cleanPath.replace(/\/$/, '');
  
  return `${base}${finalPath}`;
};

/**
 * Extracts and optimizes URL parameters for SEO
 */
export const optimizeUrlParams = (params: Record<string, string>): string => {
  const optimizedParams = Object.entries(params)
    .filter(([_, value]) => value && value.trim() !== '')
    .map(([key, value]) => [
      optimizeSlug(key),
      optimizeSlug(value)
    ])
    .sort(([a], [b]) => a.localeCompare(b)) // Sort for consistency
    .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
    .join('&');
  
  return optimizedParams ? `?${optimizedParams}` : '';
};

/**
 * Generates breadcrumb-friendly URL segments
 */
export const generateBreadcrumbSegments = (path: string): Array<{
  segment: string;
  label: string;
  href: string;
}> => {
  const segments = path.split('/').filter(Boolean);
  const breadcrumbs: Array<{ segment: string; label: string; href: string }> = [];
  
  let currentPath = '';
  
  segments.forEach((segment) => {
    currentPath += `/${segment}`;
    
    // Convert segment to readable label
    const label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    breadcrumbs.push({
      segment,
      label,
      href: currentPath
    });
  });
  
  return breadcrumbs;
};

/**
 * Checks if URL follows SEO best practices
 */
export const checkSeoCompliance = (url: string): {
  score: number;
  recommendations: string[];
} => {
  const recommendations: string[] = [];
  let score = 100;
  
  // Length check
  if (url.length > 60) {
    score -= 20;
    recommendations.push('Shorten URL to under 60 characters');
  }
  
  // Keyword placement (check if important keywords are early in URL)
  const segments = url.split('/').filter(Boolean);
  if (segments.length > 3) {
    score -= 10;
    recommendations.push('Reduce URL depth (fewer than 3 levels is ideal)');
  }
  
  // Readability
  const hasNumbers = /\d/.test(url);
  if (hasNumbers && !/\d{4}/.test(url)) { // Allow years
    score -= 5;
    recommendations.push('Avoid random numbers in URLs unless they add meaning');
  }
  
  // Hyphens vs underscores
  if (url.includes('_')) {
    score -= 15;
    recommendations.push('Use hyphens instead of underscores');
  }
  
  // Stop words (common words that don't add SEO value)
  const stopWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
  const urlWords = url.split(/[-\/]/).filter(Boolean);
  const hasStopWords = urlWords.some(word => stopWords.includes(word.toLowerCase()));
  
  if (hasStopWords) {
    score -= 5;
    recommendations.push('Consider removing stop words (the, and, or, etc.) from URL');
  }
  
  return {
    score: Math.max(0, score),
    recommendations
  };
};