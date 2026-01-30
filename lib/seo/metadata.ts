/**
 * Metadata generation utilities for Next.js App Router
 * Handles static and dynamic metadata generation with SEO optimization
 */

import { Metadata } from "next";
import { siteConfig } from "./config";
import { MetadataGeneratorOptions, DynamicMetadataParams } from "./types";
import { getSocialImages, generateSocialImageUrls, defaultSocialImages } from "./social-images";

/**
 * Generates base metadata object for the root layout
 * This provides site-wide defaults that can be overridden by individual pages
 */
export function generateBaseMetadata(): Metadata {
  const { defaultMetadata, openGraph, twitter, siteUrl, siteName } = siteConfig;
  
  // Use absolute URLs to ensure they work correctly
  const ogImages = [
    {
      url: `${siteUrl}/social/og-default.jpg`,
      width: 1200,
      height: 630,
      alt: defaultMetadata.defaultTitle,
      type: 'image/jpeg',
    },
    {
      url: `${siteUrl}/social/og-square.jpg`,
      width: 800,
      height: 800,
      alt: defaultMetadata.defaultTitle,
      type: 'image/jpeg',
    },
  ];

  return {
    metadataBase: new URL(siteUrl),
    title: {
      template: defaultMetadata.titleTemplate,
      default: defaultMetadata.defaultTitle,
    },
    description: defaultMetadata.description,
    keywords: [...defaultMetadata.keywords], // Convert readonly array to mutable
    authors: [...defaultMetadata.authors], // Convert readonly array to mutable
    creator: defaultMetadata.creator,
    publisher: defaultMetadata.publisher,
    robots: defaultMetadata.robots,
    
    // Open Graph with proper social images
    openGraph: {
      type: openGraph.type,
      locale: openGraph.locale,
      url: siteUrl,
      siteName: openGraph.siteName,
      title: defaultMetadata.defaultTitle,
      description: defaultMetadata.description,
      images: ogImages,
    },

    // Twitter with proper social images
    twitter: {
      card: twitter.card,
      site: twitter.site,
      creator: twitter.creator,
      title: defaultMetadata.defaultTitle,
      description: defaultMetadata.description,
      images: [`${siteUrl}/social/twitter-card.jpg`],
    },

    // Additional meta tags
    other: {
      'theme-color': '#000000',
      'color-scheme': 'light dark',
    },

    // Icons (separate from social images)
    icons: {
      icon: '/lemm.png',
      shortcut: '/lemm.png',
      apple: '/lemm.png',
    },

    // Verification tags (to be added when available)
    verification: {
      // google: 'your-google-verification-code',
      // bing: 'your-bing-verification-code',
    },
  };
}

/**
 * Generates metadata for specific pages with customization options
 */
export function generatePageMetadata(options: MetadataGeneratorOptions): Metadata {
  const {
    title,
    description,
    keywords = [],
    image,
    canonical,
    noIndex = false,
    socialImageType = 'default',
  } = options;

  const { siteUrl, defaultMetadata, openGraph, twitter } = siteConfig;
  
  // Get appropriate social images
  const socialImages = getSocialImages(socialImageType);
  let ogImages = generateSocialImageUrls(socialImages.openGraph);
  let twitterImages = socialImages.twitter.map(img => img.startsWith('http') ? img : `${siteUrl}${img}`);
  
  // Override with custom image if provided
  if (image) {
    const imageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
    ogImages = [
      {
        url: imageUrl,
        width: 1200,
        height: 630,
        alt: title || defaultMetadata.defaultTitle,
        type: 'image/jpeg',
      },
      {
        url: imageUrl,
        width: 800,
        height: 600,
        alt: title || defaultMetadata.defaultTitle,
        type: 'image/jpeg',
      },
    ];
    twitterImages = [imageUrl];
  }
  
  // Merge keywords with defaults
  const allKeywords = [...defaultMetadata.keywords, ...keywords];
  
  // Generate title - use full title with company name for consistency
  const fullTitle = title 
    ? `${title} | ${siteConfig.siteName}`
    : defaultMetadata.defaultTitle;
  
  // For Open Graph and Twitter, use the same full title
  const fullTitleWithCompany = fullTitle;
  
  // Use provided description or default
  const metaDescription = description || defaultMetadata.description;

  const metadata: Metadata = {
    title: fullTitle,
    description: metaDescription,
    keywords: allKeywords,
    
    // Canonical URL
    alternates: canonical ? {
      canonical: `${siteUrl}${canonical}`,
    } : undefined,

    // Robots
    robots: noIndex ? {
      index: false,
      follow: false,
    } : defaultMetadata.robots,

    // Open Graph with enhanced social media optimization
    openGraph: {
      type: openGraph.type,
      locale: openGraph.locale,
      url: canonical ? `${siteUrl}${canonical}` : siteUrl,
      siteName: openGraph.siteName,
      title: fullTitleWithCompany,
      description: metaDescription,
      images: ogImages,
    },

    // Twitter with enhanced card support
    twitter: {
      card: twitter.card,
      site: twitter.site,
      creator: twitter.creator,
      title: fullTitleWithCompany,
      description: metaDescription,
      images: twitterImages,
    },

    // Additional social media and SEO tags
    other: {
      // Facebook specific
      'fb:app_id': process.env.FACEBOOK_APP_ID || '',
      
      // Additional Twitter tags
      'twitter:domain': siteUrl.replace('https://', ''),
      'twitter:url': canonical ? `${siteUrl}${canonical}` : siteUrl,
      
      // LinkedIn specific
      'linkedin:owner': 'levy-eromo-media',
      
      // Pinterest specific
      'pinterest:rich_pin': 'true',
      
      // Additional SEO tags
      'theme-color': '#000000',
      'color-scheme': 'light dark',
      'format-detection': 'telephone=no',
      'mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-capable': 'yes',
      'apple-mobile-web-app-status-bar-style': 'black-translucent',
      
      // Content language
      'content-language': 'en-US',
      
      // Geo tags (if applicable)
      'geo.region': 'US-CA',
      'geo.placename': 'Los Angeles',
      
      // Business/Organization tags
      'business:contact_data:street_address': siteConfig.businessInfo.address.streetAddress,
      'business:contact_data:locality': siteConfig.businessInfo.address.addressLocality,
      'business:contact_data:region': siteConfig.businessInfo.address.addressRegion,
      'business:contact_data:postal_code': siteConfig.businessInfo.address.postalCode,
      'business:contact_data:country_name': siteConfig.businessInfo.address.addressCountry,
      'business:contact_data:email': siteConfig.businessInfo.email,
      'business:contact_data:phone_number': siteConfig.businessInfo.phone,
    },
  };

  return metadata;
}

/**
 * Generates metadata for dynamic routes (e.g., project pages)
 */
export async function generateDynamicMetadata(
  params: DynamicMetadataParams,
  options: MetadataGeneratorOptions
): Promise<Metadata> {
  // This function can be extended to fetch data based on params
  // For now, it uses the provided options with enhanced Open Graph and Twitter support
  const metadata = generatePageMetadata(options);
  
  // Add additional Open Graph properties for dynamic pages
  if (metadata.openGraph) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article', // Dynamic pages are typically articles
      publishedTime: new Date().toISOString(),
      modifiedTime: new Date().toISOString(),
      section: 'Projects',
      tags: options.keywords || [],
    };
  }

  // Enhanced Twitter Card for dynamic content
  if (metadata.twitter) {
    metadata.twitter = {
      ...metadata.twitter,
      card: 'summary_large_image',
    };
  }

  return metadata;
}

/**
 * Generates metadata specifically for project pages
 */
export function generateProjectMetadata(project: {
  title: string;
  description: string;
  category: string;
  tags: string[];
  image?: string;
  slug: string;
}): Metadata {
  const keywords = [
    ...project.tags,
    project.category,
    'animation project',
    'media production',
    ...siteConfig.industryKeywords.slice(0, 5), // Add some industry keywords
  ];

  return generatePageMetadata({
    title: project.title,
    description: project.description,
    keywords,
    image: project.image,
    canonical: `/projects/${project.slug}`,
  });
}

/**
 * Generates metadata for category/listing pages
 */
export function generateCategoryMetadata(category: {
  name: string;
  description: string;
  slug: string;
}): Metadata {
  const title = `${category.name} Projects`;
  const description = category.description || 
    `Explore our ${category.name.toLowerCase()} projects and creative work at Levy Eromo Media.`;
  
  const keywords = [
    category.name.toLowerCase(),
    `${category.name.toLowerCase()} projects`,
    'portfolio',
    'creative work',
    ...siteConfig.industryKeywords.slice(0, 3),
  ];

  const metadata = generatePageMetadata({
    title,
    description,
    keywords,
    canonical: `/projects/category/${category.slug}`,
  });

  // Enhanced Open Graph for category pages
  if (metadata.openGraph) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'website' as const,
    };
  }

  return metadata;
}

/**
 * Generates metadata for blog/article pages
 */
export function generateArticleMetadata(article: {
  title: string;
  description: string;
  author: string;
  publishedDate: Date;
  modifiedDate?: Date;
  tags: string[];
  image?: string;
  slug: string;
}): Metadata {
  const keywords = [
    ...article.tags,
    'animation industry',
    'media production',
    'entertainment news',
    ...siteConfig.industryKeywords.slice(0, 3),
  ];

  const metadata = generatePageMetadata({
    title: article.title,
    description: article.description,
    keywords,
    image: article.image,
    canonical: `/blog/${article.slug}`,
  });

  // Enhanced Open Graph for articles
  if (metadata.openGraph) {
    metadata.openGraph = {
      ...metadata.openGraph,
      type: 'article',
      publishedTime: article.publishedDate.toISOString(),
      modifiedTime: (article.modifiedDate || article.publishedDate).toISOString(),
      authors: [article.author],
      section: 'Blog',
      tags: article.tags,
    };
  }

  // Enhanced Twitter Card for articles
  if (metadata.twitter) {
    metadata.twitter = {
      ...metadata.twitter,
      card: 'summary_large_image',
    };
  }

  return metadata;
}

/**
 * Utility function to validate metadata completeness
 */
export function validateMetadata(metadata: Metadata): {
  isValid: boolean;
  issues: string[];
} {
  const issues: string[] = [];

  // Check title length - handle different title formats
  let title = '';
  if (typeof metadata.title === 'string') {
    title = metadata.title;
  } else if (metadata.title && typeof metadata.title === 'object') {
    // For template objects, we can't easily validate length without the actual page title
    // So we'll skip this validation for template titles
    title = '';
  }
  
  if (title && title.length > 60) {
    issues.push('Title exceeds 60 characters');
  }
  if (title && title.length < 10) {
    issues.push('Title is too short (less than 10 characters)');
  }

  // Check description length
  const description = metadata.description || '';
  if (description.length > 160) {
    issues.push('Description exceeds 160 characters');
  }
  if (description.length < 50) {
    issues.push('Description is too short (less than 50 characters)');
  }

  // Check for required Open Graph properties
  if (!metadata.openGraph?.title) {
    issues.push('Missing Open Graph title');
  }
  if (!metadata.openGraph?.description) {
    issues.push('Missing Open Graph description');
  }
  if (!metadata.openGraph?.images || (Array.isArray(metadata.openGraph.images) && metadata.openGraph.images.length === 0)) {
    issues.push('Missing Open Graph images');
  }

  // Check Twitter Card properties - Next.js handles card type automatically
  if (!metadata.twitter?.title) {
    issues.push('Missing Twitter title');
  }
  if (!metadata.twitter?.description) {
    issues.push('Missing Twitter description');
  }

  return {
    isValid: issues.length === 0,
    issues,
  };
}

/**
 * Generates social media optimized metadata for sharing
 */
export function generateSocialMetadata(options: {
  title: string;
  description: string;
  image: string;
  url: string;
  type?: 'website' | 'article';
  author?: string;
  publishedTime?: string;
  modifiedTime?: string;
  tags?: string[];
}): Partial<Metadata> {
  const { siteUrl, openGraph, twitter } = siteConfig;
  const {
    title,
    description,
    image,
    url,
    type = 'website',
    author,
    publishedTime,
    modifiedTime,
    tags = []
  } = options;

  const fullImageUrl = image.startsWith('http') ? image : `${siteUrl}${image}`;
  const fullUrl = url.startsWith('http') ? url : `${siteUrl}${url}`;

  return {
    openGraph: {
      type,
      locale: openGraph.locale,
      url: fullUrl,
      siteName: openGraph.siteName,
      title,
      description,
      images: [
        {
          url: fullImageUrl,
          width: 1200,
          height: 630,
          alt: title,
          type: 'image/jpeg',
        },
        {
          url: fullImageUrl,
          width: 800,
          height: 600,
          alt: title,
          type: 'image/jpeg',
        },
        {
          url: fullImageUrl,
          width: 400,
          height: 400,
          alt: title,
          type: 'image/jpeg',
        },
      ],
      ...(type === 'article' && {
        authors: author ? [author] : undefined,
        publishedTime,
        modifiedTime,
        tags,
        section: 'Blog',
      }),
    },
    twitter: {
      card: 'summary_large_image',
      site: twitter.site,
      creator: twitter.creator,
      title,
      description,
      images: [fullImageUrl],
    },
  };
}