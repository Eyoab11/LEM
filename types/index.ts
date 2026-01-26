export interface NavItem {
  name: string;
  href: string;
}

export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  onClick?: () => void;
  className?: string;
}

export interface SectionProps {
  children: React.ReactNode;
  className?: string;
}

// Re-export SEO types for convenience
export type {
  PageMetadata,
  ProjectSEOData,
  OrganizationSchema,
  CreativeWorkSchema,
  WebSiteSchema,
  BreadcrumbSchema,
  NavigationItem,
  SitemapEntry,
  WebVitalsMetrics,
  SEOPerformanceReport,
  MetadataGeneratorOptions,
  DynamicMetadataParams,
  ContentSEOData,
  LocalBusinessSchema,
} from "../lib/seo";