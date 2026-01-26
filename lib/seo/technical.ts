/**
 * Technical SEO Infrastructure
 * Utilities for HTTP status codes, image alt text validation, and other technical SEO aspects
 */

import { NextResponse } from 'next/server';

/**
 * HTTP Status Code Utilities
 */
export const HTTP_STATUS = {
  OK: 200,
  MOVED_PERMANENTLY: 301,
  FOUND: 302,
  NOT_MODIFIED: 304,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  METHOD_NOT_ALLOWED: 405,
  INTERNAL_SERVER_ERROR: 500,
  BAD_GATEWAY: 502,
  SERVICE_UNAVAILABLE: 503,
} as const;

/**
 * Create proper HTTP responses with SEO-friendly status codes
 */
export function createSEOResponse(
  content: string | object,
  status: number = HTTP_STATUS.OK,
  headers: Record<string, string> = {}
): NextResponse {
  const defaultHeaders = {
    'Cache-Control': 'public, max-age=3600, s-maxage=86400',
    'X-Robots-Tag': 'index, follow',
    ...headers,
  };

  if (typeof content === 'string') {
    return new NextResponse(content, {
      status,
      headers: {
        'Content-Type': 'text/html; charset=utf-8',
        ...defaultHeaders,
      },
    });
  }

  return NextResponse.json(content, {
    status,
    headers: defaultHeaders,
  });
}

/**
 * Create 404 response with proper SEO headers
 */
export function create404Response(message: string = 'Page not found'): NextResponse {
  return new NextResponse(message, {
    status: HTTP_STATUS.NOT_FOUND,
    headers: {
      'Content-Type': 'text/html; charset=utf-8',
      'Cache-Control': 'public, max-age=300',
      'X-Robots-Tag': 'noindex, nofollow',
    },
  });
}

/**
 * Create redirect response with proper SEO headers
 */
export function createRedirectResponse(
  destination: string,
  permanent: boolean = false
): NextResponse {
  const status = permanent ? HTTP_STATUS.MOVED_PERMANENTLY : HTTP_STATUS.FOUND;
  
  return NextResponse.redirect(destination, {
    status,
    headers: {
      'Cache-Control': permanent ? 'public, max-age=31536000' : 'public, max-age=3600',
    },
  });
}

/**
 * Image Alt Text Validation
 */
export interface ImageValidationResult {
  isValid: boolean;
  issues: string[];
  suggestions: string[];
  score: number; // 0-100
}

/**
 * Validate image alt text for SEO compliance
 */
export function validateImageAltText(
  altText: string,
  imageSrc: string,
  context?: string
): ImageValidationResult {
  const issues: string[] = [];
  const suggestions: string[] = [];
  let score = 100;

  // Check if alt text exists
  if (!altText || altText.trim().length === 0) {
    issues.push('Missing alt text');
    suggestions.push('Add descriptive alt text for accessibility and SEO');
    score -= 50;
  } else {
    // Check alt text length
    if (altText.length < 10) {
      issues.push('Alt text too short');
      suggestions.push('Use more descriptive alt text (10+ characters recommended)');
      score -= 20;
    }
    
    if (altText.length > 125) {
      issues.push('Alt text too long');
      suggestions.push('Keep alt text under 125 characters for screen readers');
      score -= 15;
    }

    // Check for redundant phrases
    const redundantPhrases = [
      'image of',
      'picture of',
      'photo of',
      'graphic of',
      'illustration of',
    ];
    
    const lowerAltText = altText.toLowerCase();
    redundantPhrases.forEach((phrase) => {
      if (lowerAltText.includes(phrase)) {
        issues.push(`Contains redundant phrase: "${phrase}"`);
        suggestions.push(`Remove "${phrase}" - screen readers already announce it's an image`);
        score -= 10;
      }
    });

    // Check for filename in alt text
    const filename = imageSrc.split('/').pop()?.split('.')[0];
    if (filename && lowerAltText.includes(filename.toLowerCase())) {
      issues.push('Alt text contains filename');
      suggestions.push('Use descriptive text instead of filename');
      score -= 15;
    }

    // Check for context relevance (if context provided)
    if (context) {
      const contextWords = context.toLowerCase().split(/\s+/);
      const altWords = lowerAltText.split(/\s+/);
      const commonWords = contextWords.filter(word => altWords.includes(word));
      
      if (commonWords.length === 0) {
        suggestions.push('Consider adding context-relevant keywords to alt text');
        score -= 5;
      }
    }
  }

  return {
    isValid: issues.length === 0,
    issues,
    suggestions,
    score: Math.max(0, score),
  };
}

/**
 * Validate multiple images on a page
 */
export function validatePageImages(
  images: Array<{ src: string; alt: string; context?: string }>
): {
  overallScore: number;
  totalImages: number;
  validImages: number;
  results: Array<ImageValidationResult & { src: string }>;
} {
  const results = images.map((img) => ({
    src: img.src,
    ...validateImageAltText(img.alt, img.src, img.context),
  }));

  const validImages = results.filter((result) => result.isValid).length;
  const overallScore = results.reduce((sum, result) => sum + result.score, 0) / results.length;

  return {
    overallScore: Math.round(overallScore),
    totalImages: images.length,
    validImages,
    results,
  };
}

/**
 * Generate robots meta tag based on page type
 */
export function generateRobotsMetaTag(
  pageType: 'public' | 'private' | 'noindex' | 'archive' = 'public'
): string {
  switch (pageType) {
    case 'private':
      return 'noindex, nofollow';
    case 'noindex':
      return 'noindex, follow';
    case 'archive':
      return 'noindex, follow, noarchive';
    case 'public':
    default:
      return 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1';
  }
}

/**
 * Validate URL structure for SEO
 */
export interface URLValidationResult {
  isValid: boolean;
  issues: string[];
  suggestions: string[];
  score: number;
}

export function validateURLStructure(url: string): URLValidationResult {
  const issues: string[] = [];
  const suggestions: string[] = [];
  let score = 100;

  // Remove protocol and domain for analysis
  const path = url.replace(/^https?:\/\/[^\/]+/, '');

  // Check URL length
  if (path.length > 100) {
    issues.push('URL too long');
    suggestions.push('Keep URLs under 100 characters when possible');
    score -= 15;
  }

  // Check for uppercase letters
  if (/[A-Z]/.test(path)) {
    issues.push('Contains uppercase letters');
    suggestions.push('Use lowercase letters in URLs');
    score -= 10;
  }

  // Check for underscores
  if (path.includes('_')) {
    issues.push('Contains underscores');
    suggestions.push('Use hyphens instead of underscores in URLs');
    score -= 10;
  }

  // Check for multiple consecutive hyphens
  if (/--+/.test(path)) {
    issues.push('Contains multiple consecutive hyphens');
    suggestions.push('Use single hyphens to separate words');
    score -= 5;
  }

  // Check for trailing slash consistency
  if (path.length > 1 && path.endsWith('/')) {
    suggestions.push('Consider removing trailing slash for consistency');
    score -= 2;
  }

  // Check for stop words (common words that add little SEO value)
  const stopWords = ['the', 'and', 'or', 'but', 'in', 'on', 'at', 'to', 'for', 'of', 'with', 'by'];
  const pathWords = path.split(/[\/\-]/).filter(word => word.length > 0);
  const stopWordsFound = pathWords.filter(word => stopWords.includes(word.toLowerCase()));
  
  if (stopWordsFound.length > 2) {
    suggestions.push('Consider removing some stop words from URL');
    score -= 5;
  }

  return {
    isValid: issues.length === 0,
    issues,
    suggestions,
    score: Math.max(0, score),
  };
}

/**
 * Generate canonical URL with proper formatting
 */
export function generateCanonicalURL(
  path: string,
  baseUrl: string,
  removeTrailingSlash: boolean = true
): string {
  // Ensure path starts with /
  const normalizedPath = path.startsWith('/') ? path : `/${path}`;
  
  // Remove trailing slash if requested (except for root)
  const finalPath = removeTrailingSlash && normalizedPath !== '/' && normalizedPath.endsWith('/')
    ? normalizedPath.slice(0, -1)
    : normalizedPath;
  
  return `${baseUrl}${finalPath}`;
}