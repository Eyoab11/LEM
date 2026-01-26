/**
 * Structured Data (Schema.org) generation utilities
 * Generates JSON-LD markup for enhanced search results
 */

import React from "react";
import { siteConfig } from "./config";
import {
  OrganizationSchema,
  CreativeWorkSchema,
  WebSiteSchema,
  BreadcrumbSchema,
  LocalBusinessSchema,
  ContactPoint,
  PostalAddress,
} from "./types";

/**
 * Generates Organization schema for the company
 */
export function generateOrganizationSchema(): OrganizationSchema {
  const { businessInfo, socialMedia, siteUrl } = siteConfig;

  const contactPoint: ContactPoint = {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English"],
    email: businessInfo.email,
  };

  if (businessInfo.phone) {
    contactPoint.telephone = businessInfo.phone;
  }

  const schema: OrganizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: businessInfo.name,
    description: businessInfo.description,
    url: siteUrl,
    logo: `${siteUrl}${siteConfig.logo}`,
    contactPoint: [contactPoint],
    sameAs: Object.values(socialMedia).filter(Boolean),
  };

  if (businessInfo.foundingDate) {
    schema.foundingDate = businessInfo.foundingDate;
  }

  if (businessInfo.address) {
    schema.address = {
      "@type": "PostalAddress",
      streetAddress: businessInfo.address.streetAddress,
      addressLocality: businessInfo.address.addressLocality,
      addressRegion: businessInfo.address.addressRegion,
      postalCode: businessInfo.address.postalCode,
      addressCountry: businessInfo.address.addressCountry,
    };
  }

  return schema;
}

/**
 * Generates LocalBusiness schema (conditional, when location data is available)
 */
export function generateLocalBusinessSchema(): LocalBusinessSchema | null {
  const { businessInfo, socialMedia, siteUrl } = siteConfig;
  
  if (!businessInfo.address) {
    return null; // No address data available
  }

  const contactPoint: ContactPoint = {
    "@type": "ContactPoint",
    contactType: "customer service",
    availableLanguage: ["English"],
    email: businessInfo.email,
  };

  if (businessInfo.phone) {
    contactPoint.telephone = businessInfo.phone;
  }

  const localBusinessSchema: LocalBusinessSchema = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    name: businessInfo.name,
    description: businessInfo.description,
    url: siteUrl,
    logo: `${siteUrl}${siteConfig.logo}`,
    contactPoint: [contactPoint],
    sameAs: Object.values(socialMedia).filter(Boolean),
    address: {
      "@type": "PostalAddress",
      streetAddress: businessInfo.address.streetAddress,
      addressLocality: businessInfo.address.addressLocality,
      addressRegion: businessInfo.address.addressRegion,
      postalCode: businessInfo.address.postalCode,
      addressCountry: businessInfo.address.addressCountry,
    },
  };

  if (businessInfo.foundingDate) {
    localBusinessSchema.foundingDate = businessInfo.foundingDate;
  }

  return localBusinessSchema;
}

/**
 * Generates WebSite schema with search action
 */
export function generateWebSiteSchema(): WebSiteSchema {
  const { siteName, description, siteUrl } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": "WebSite",
    name: siteName,
    description,
    url: siteUrl,
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: `${siteUrl}/search?q={search_term_string}`,
      },
      "query-input": "required name=search_term_string",
    },
  };
}

/**
 * Generates CreativeWork schema for projects
 */
export function generateCreativeWorkSchema(project: {
  title: string;
  description: string;
  category: string;
  tags: string[];
  images: string[];
  dateCreated: Date;
  client?: string;
  url?: string;
}): CreativeWorkSchema {
  const { siteUrl } = siteConfig;
  const organizationSchema = generateOrganizationSchema();

  return {
    "@context": "https://schema.org",
    "@type": "CreativeWork",
    name: project.title,
    description: project.description,
    creator: organizationSchema,
    dateCreated: project.dateCreated.toISOString().split('T')[0],
    genre: [project.category, ...project.tags],
    image: project.images.map(img => `${siteUrl}${img}`),
    url: project.url ? `${siteUrl}${project.url}` : undefined,
  };
}

/**
 * Generates Breadcrumb schema for navigation
 */
export function generateBreadcrumbSchema(breadcrumbs: Array<{
  name: string;
  url: string;
}>): BreadcrumbSchema {
  const { siteUrl } = siteConfig;

  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: breadcrumbs.map((crumb, index) => ({
      "@type": "ListItem",
      position: index + 1,
      name: crumb.name,
      item: `${siteUrl}${crumb.url}`,
    })),
  };
}

/**
 * React component for injecting JSON-LD structured data
 */
export function StructuredData({ data }: { data: any }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{
        __html: JSON.stringify(data, null, 2),
      }}
    />
  );
}

/**
 * Utility function to combine multiple schemas
 */
export function combineSchemas(...schemas: any[]): any[] {
  return schemas.filter(Boolean);
}

/**
 * Validates structured data against basic Schema.org requirements
 */
export function validateStructuredData(schema: any): {
  isValid: boolean;
  errors: string[];
} {
  const errors: string[] = [];

  // Check for required @context and @type
  if (!schema["@context"]) {
    errors.push("Missing @context property");
  }
  if (!schema["@type"]) {
    errors.push("Missing @type property");
  }

  // Validate Organization schema
  if (schema["@type"] === "Organization") {
    if (!schema.name) errors.push("Organization missing name");
    if (!schema.url) errors.push("Organization missing url");
  }

  // Validate CreativeWork schema
  if (schema["@type"] === "CreativeWork") {
    if (!schema.name) errors.push("CreativeWork missing name");
    if (!schema.creator) errors.push("CreativeWork missing creator");
  }

  // Validate WebSite schema
  if (schema["@type"] === "WebSite") {
    if (!schema.name) errors.push("WebSite missing name");
    if (!schema.url) errors.push("WebSite missing url");
  }

  return {
    isValid: errors.length === 0,
    errors,
  };
}

/**
 * Generates all core schemas for the homepage
 */
export function generateHomepageSchemas(): any[] {
  const organizationSchema = generateOrganizationSchema();
  const websiteSchema = generateWebSiteSchema();
  const localBusinessSchema = generateLocalBusinessSchema();

  const schemas: any[] = [organizationSchema, websiteSchema];
  
  if (localBusinessSchema) {
    schemas.push(localBusinessSchema);
  }

  return schemas;
}