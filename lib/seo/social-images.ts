/**
 * Social Images Configuration and Utilities
 * Manages social media thumbnails and Open Graph images
 */

import { siteConfig } from './config';

export interface SocialImageConfig {
  url: string;
  width: number;
  height: number;
  alt: string;
  type?: string;
}

export interface SocialImageSet {
  openGraph: SocialImageConfig[];
  twitter: string[];
  linkedin?: SocialImageConfig[];
  facebook?: SocialImageConfig[];
}

/**
 * Default social images for the site
 */
export const defaultSocialImages: SocialImageSet = {
  openGraph: [
    {
      url: '/social/og-default.jpg',
      width: 1200,
      height: 630,
      alt: 'Levy Eromo Media - Professional Animation & Media Production',
      type: 'image/jpeg',
    },
    {
      url: '/social/og-square.jpg',
      width: 800,
      height: 800,
      alt: 'Levy Eromo Media - Professional Animation & Media Production',
      type: 'image/jpeg',
    },
    {
      url: '/social/og-small.jpg',
      width: 400,
      height: 400,
      alt: 'Levy Eromo Media - Professional Animation & Media Production',
      type: 'image/jpeg',
    },
  ],
  twitter: [
    '/social/twitter-card.jpg',
    '/social/og-default.jpg',
  ],
  linkedin: [
    {
      url: '/social/linkedin-banner.jpg',
      width: 1200,
      height: 627,
      alt: 'Levy Eromo Media - Professional Animation & Media Production',
      type: 'image/jpeg',
    },
  ],
  facebook: [
    {
      url: '/social/facebook-cover.jpg',
      width: 1200,
      height: 630,
      alt: 'Levy Eromo Media - Professional Animation & Media Production',
      type: 'image/jpeg',
    },
  ],
};

/**
 * Project-specific social images
 */
export const projectSocialImages = {
  powerRangers: {
    openGraph: [
      {
        url: '/social/projects/power-rangers-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Power Rangers Project - Levy Eromo Media',
        type: 'image/jpeg',
      },
    ],
    twitter: ['/social/projects/power-rangers-twitter.jpg'],
  },
  animation: {
    openGraph: [
      {
        url: '/social/projects/animation-og.jpg',
        width: 1200,
        height: 630,
        alt: 'Animation Projects - Levy Eromo Media',
        type: 'image/jpeg',
      },
    ],
    twitter: ['/social/projects/animation-twitter.jpg'],
  },
};

/**
 * Generates social image URLs with proper domain
 */
export function generateSocialImageUrls(images: SocialImageConfig[]): SocialImageConfig[] {
  const { siteUrl } = siteConfig;
  
  return images.map(image => ({
    ...image,
    url: image.url.startsWith('http') ? image.url : `${siteUrl}${image.url}`,
  }));
}

/**
 * Gets social images for a specific page or content type
 */
export function getSocialImages(type: 'default' | 'project' | 'article' | 'contact', projectKey?: string): SocialImageSet {
  switch (type) {
    case 'project':
      if (projectKey && projectSocialImages[projectKey as keyof typeof projectSocialImages]) {
        return projectSocialImages[projectKey as keyof typeof projectSocialImages];
      }
      return defaultSocialImages;
    
    case 'article':
      return {
        openGraph: [
          {
            url: '/social/blog-og.jpg',
            width: 1200,
            height: 630,
            alt: 'Blog Article - Levy Eromo Media',
            type: 'image/jpeg',
          },
        ],
        twitter: ['/social/blog-twitter.jpg'],
      };
    
    case 'contact':
      return {
        openGraph: [
          {
            url: '/social/contact-og.jpg',
            width: 1200,
            height: 630,
            alt: 'Contact Us - Levy Eromo Media',
            type: 'image/jpeg',
          },
        ],
        twitter: ['/social/contact-twitter.jpg'],
      };
    
    default:
      return defaultSocialImages;
  }
}

/**
 * Creates a social image configuration for dynamic content
 */
export function createDynamicSocialImage(options: {
  title: string;
  description?: string;
  baseImage?: string;
  category?: string;
}): SocialImageSet {
  const { title, description, baseImage = '/social/og-default.jpg', category } = options;
  const alt = `${title} - Levy Eromo Media`;
  
  return {
    openGraph: [
      {
        url: baseImage,
        width: 1200,
        height: 630,
        alt,
        type: 'image/jpeg',
      },
      {
        url: baseImage.replace('.jpg', '-square.jpg'),
        width: 800,
        height: 800,
        alt,
        type: 'image/jpeg',
      },
    ],
    twitter: [baseImage],
  };
}

/**
 * Validates social image dimensions and formats
 */
export function validateSocialImage(image: SocialImageConfig, platform: 'openGraph' | 'twitter' | 'linkedin' | 'facebook'): {
  isValid: boolean;
  issues: string[];
} {
  const issues: string[] = [];
  
  // Platform-specific dimension requirements
  const requirements = {
    openGraph: {
      minWidth: 600,
      minHeight: 315,
      maxWidth: 1200,
      maxHeight: 630,
      aspectRatio: 1.91, // 1200:630
      tolerance: 0.1,
    },
    twitter: {
      minWidth: 300,
      minHeight: 157,
      maxWidth: 4096,
      maxHeight: 4096,
      aspectRatio: 1.91, // For summary_large_image
      tolerance: 0.1,
    },
    linkedin: {
      minWidth: 1200,
      minHeight: 627,
      maxWidth: 1200,
      maxHeight: 627,
      aspectRatio: 1.91,
      tolerance: 0.05,
    },
    facebook: {
      minWidth: 1200,
      minHeight: 630,
      maxWidth: 1200,
      maxHeight: 630,
      aspectRatio: 1.90,
      tolerance: 0.05,
    },
  };
  
  const req = requirements[platform];
  const actualRatio = image.width / image.height;
  const ratioError = Math.abs(actualRatio - req.aspectRatio) / req.aspectRatio;
  
  // Check dimensions
  if (image.width < req.minWidth) {
    issues.push(`Width ${image.width}px is below minimum ${req.minWidth}px for ${platform}`);
  }
  if (image.width > req.maxWidth) {
    issues.push(`Width ${image.width}px exceeds maximum ${req.maxWidth}px for ${platform}`);
  }
  if (image.height < req.minHeight) {
    issues.push(`Height ${image.height}px is below minimum ${req.minHeight}px for ${platform}`);
  }
  if (image.height > req.maxHeight) {
    issues.push(`Height ${image.height}px exceeds maximum ${req.maxHeight}px for ${platform}`);
  }
  
  // Check aspect ratio
  if (ratioError > req.tolerance) {
    issues.push(`Aspect ratio ${actualRatio.toFixed(2)} deviates too much from recommended ${req.aspectRatio} for ${platform}`);
  }
  
  // Check file format
  const supportedFormats = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
  if (image.type && !supportedFormats.includes(image.type)) {
    issues.push(`Unsupported image format ${image.type} for ${platform}`);
  }
  
  return {
    isValid: issues.length === 0,
    issues,
  };
}

/**
 * Generates social media meta tags for HTML head
 */
export function generateSocialMetaTags(images: SocialImageSet, options: {
  title: string;
  description: string;
  url: string;
  type?: 'website' | 'article';
}): Record<string, string> {
  const { title, description, url, type = 'website' } = options;
  const { siteUrl } = siteConfig;
  
  const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;
  const ogImage = images.openGraph[0];
  const twitterImage = images.twitter[0];
  
  return {
    // Open Graph
    'og:type': type,
    'og:title': title,
    'og:description': description,
    'og:url': fullUrl,
    'og:site_name': siteConfig.siteName,
    'og:image': ogImage.url.startsWith('http') ? ogImage.url : `${siteUrl}${ogImage.url}`,
    'og:image:width': ogImage.width.toString(),
    'og:image:height': ogImage.height.toString(),
    'og:image:alt': ogImage.alt,
    'og:image:type': ogImage.type || 'image/jpeg',
    
    // Twitter
    'twitter:card': 'summary_large_image',
    'twitter:site': siteConfig.twitter.site,
    'twitter:creator': siteConfig.twitter.creator,
    'twitter:title': title,
    'twitter:description': description,
    'twitter:image': twitterImage.startsWith('http') ? twitterImage : `${siteUrl}${twitterImage}`,
    'twitter:image:alt': ogImage.alt,
    
    // Additional social platforms
    'linkedin:owner': 'levy-eromo-media',
    'pinterest:rich_pin': 'true',
  };
}

/**
 * Image optimization recommendations for social media
 */
export const socialImageGuidelines = {
  openGraph: {
    dimensions: '1200x630px',
    aspectRatio: '1.91:1',
    fileSize: 'Under 8MB',
    formats: ['JPEG', 'PNG', 'WebP'],
    recommendations: [
      'Use high-quality images with clear text',
      'Ensure important content is in the center',
      'Test on different devices and platforms',
      'Include your brand logo or watermark',
    ],
  },
  twitter: {
    dimensions: '1200x675px (summary_large_image)',
    aspectRatio: '1.78:1',
    fileSize: 'Under 5MB',
    formats: ['JPEG', 'PNG', 'WebP', 'GIF'],
    recommendations: [
      'Use summary_large_image for better engagement',
      'Ensure text is readable on mobile devices',
      'Consider Twitter\'s dark mode',
      'Test with Twitter Card Validator',
    ],
  },
  linkedin: {
    dimensions: '1200x627px',
    aspectRatio: '1.91:1',
    fileSize: 'Under 5MB',
    formats: ['JPEG', 'PNG'],
    recommendations: [
      'Professional, business-appropriate imagery',
      'Include company branding',
      'Use high contrast for readability',
      'Test in LinkedIn post preview',
    ],
  },
  facebook: {
    dimensions: '1200x630px',
    aspectRatio: '1.91:1',
    fileSize: 'Under 8MB',
    formats: ['JPEG', 'PNG'],
    recommendations: [
      'Avoid text-heavy images (20% rule)',
      'Use Facebook Sharing Debugger to test',
      'Consider mobile feed display',
      'Include clear call-to-action visually',
    ],
  },
} as const;