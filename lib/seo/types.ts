/**
 * TypeScript interfaces for SEO-related data structures
 */

import { Metadata } from "next";

// Page-specific metadata interface
export interface PageMetadata {
  id: string;
  title: string;
  description: string;
  keywords: string[];
  canonicalUrl: string;
  openGraph: {
    title: string;
    description: string;
    image: string;
    type: 'website' | 'article';
  };
  twitter: {
    card: 'summary_large_image';
    title: string;
    description: string;
    image: string;
  };
  structuredData: any[];
  lastModified: Date;
}

// Project-specific SEO data
export interface ProjectSEOData {
  projectId: string;
  title: string;
  description: string;
  category: string;
  tags: string[];
  images: {
    featured: string;
    gallery: string[];
    alt: string[];
  };
  dateCreated: Date;
  client?: string;
  services: string[];
  seoScore: number;
}

// Schema.org structured data interfaces
export interface OrganizationSchema {
  "@context": "https://schema.org";
  "@type": "Organization";
  name: string;
  description: string;
  url: string;
  logo: string;
  contactPoint: ContactPoint[];
  sameAs: string[];
  foundingDate?: string;
  address?: PostalAddress;
}

export interface ContactPoint {
  "@type": "ContactPoint";
  telephone?: string;
  contactType: string;
  email?: string;
  availableLanguage: string[];
}

export interface PostalAddress {
  "@type": "PostalAddress";
  streetAddress: string;
  addressLocality: string;
  addressRegion: string;
  postalCode: string;
  addressCountry: string;
}

export interface CreativeWorkSchema {
  "@context": "https://schema.org";
  "@type": "CreativeWork";
  name: string;
  description: string;
  creator: OrganizationSchema | string;
  dateCreated: string;
  genre: string[];
  image: string[];
  url?: string;
}

export interface WebSiteSchema {
  "@context": "https://schema.org";
  "@type": "WebSite";
  name: string;
  description: string;
  url: string;
  potentialAction?: SearchAction;
}

export interface SearchAction {
  "@type": "SearchAction";
  target: {
    "@type": "EntryPoint";
    urlTemplate: string;
  };
  "query-input": string;
}

export interface BreadcrumbSchema {
  "@context": "https://schema.org";
  "@type": "BreadcrumbList";
  itemListElement: BreadcrumbItem[];
}

export interface BreadcrumbItem {
  "@type": "ListItem";
  position: number;
  name: string;
  item: string;
}

// Navigation and site structure
export interface NavigationItem {
  name: string;
  href: string;
  description?: string;
  children?: NavigationItem[];
}

export interface SitemapEntry {
  url: string;
  lastModified: Date;
  changeFrequency: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

// Performance and analytics
export interface WebVitalsMetrics {
  lcp: number; // Largest Contentful Paint
  fid: number; // First Input Delay
  cls: number; // Cumulative Layout Shift
  fcp: number; // First Contentful Paint
  ttfb: number; // Time to First Byte
}

export interface SEOPerformanceReport {
  pageUrl: string;
  title: string;
  metaDescription: string;
  keywords: string[];
  webVitals: WebVitalsMetrics;
  structuredDataValid: boolean;
  socialMediaOptimized: boolean;
  mobileOptimized: boolean;
  seoScore: number;
  recommendations: string[];
  lastAnalyzed: Date;
}

// Metadata generation utilities
export interface MetadataGeneratorOptions {
  title?: string;
  description?: string;
  keywords?: string[];
  image?: string;
  canonical?: string;
  noIndex?: boolean;
  structuredData?: any[];
  socialImageType?: 'default' | 'project' | 'article' | 'contact';
}

export interface DynamicMetadataParams {
  params: { [key: string]: string | string[] };
  searchParams: { [key: string]: string | string[] | undefined };
}

// Content optimization
export interface ContentSEOData {
  headings: {
    h1: string[];
    h2: string[];
    h3: string[];
  };
  wordCount: number;
  keywordDensity: { [keyword: string]: number };
  internalLinks: string[];
  externalLinks: string[];
  images: {
    src: string;
    alt: string;
    title?: string;
  }[];
  readabilityScore: number;
}

// Local SEO (conditional)
export interface LocalBusinessSchema {
  "@context": "https://schema.org";
  "@type": "LocalBusiness";
  name: string;
  description: string;
  url: string;
  logo: string;
  contactPoint: ContactPoint[];
  sameAs: string[];
  foundingDate?: string;
  address: PostalAddress;
  geo?: GeoCoordinates;
  openingHours?: string[];
  priceRange?: string;
  aggregateRating?: AggregateRating;
}

export interface GeoCoordinates {
  "@type": "GeoCoordinates";
  latitude: number;
  longitude: number;
}

export interface AggregateRating {
  "@type": "AggregateRating";
  ratingValue: number;
  reviewCount: number;
  bestRating?: number;
  worstRating?: number;
}