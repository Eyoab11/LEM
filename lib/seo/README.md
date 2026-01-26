# SEO Infrastructure Documentation

## Overview

This SEO infrastructure provides comprehensive search engine optimization for the Levy Eromo Media website using Next.js 16.1.1's App Router and modern SEO best practices.

## Features

### ✅ Core Metadata Management
- **Base metadata** with site-wide defaults
- **Page-specific metadata** generation
- **Dynamic metadata** for project pages
- **Open Graph** and **Twitter Card** optimization
- **Canonical URL** management
- **Robots directives** configuration

### ✅ Structured Data (Schema.org)
- **Organization schema** for business information
- **WebSite schema** with search action
- **CreativeWork schema** for projects
- **Breadcrumb schema** for navigation
- **LocalBusiness schema** (conditional)
- **JSON-LD** format implementation

### ✅ Performance Optimization Ready
- Next.js Metadata API integration
- Server-side rendering support
- Optimized for Core Web Vitals
- Lazy loading structured data

### ✅ Testing & Validation
- Comprehensive test suite with Vitest
- Metadata validation utilities
- Structured data validation
- Schema.org compliance checking

## File Structure

```
lib/seo/
├── config.ts          # Site configuration and constants
├── types.ts           # TypeScript interfaces
├── metadata.ts        # Metadata generation utilities
├── structured-data.tsx # Schema.org structured data
├── index.ts           # Main exports
└── README.md          # This documentation

test/seo/
├── metadata.test.ts        # Metadata tests
└── structured-data.test.ts # Structured data tests
```

## Usage Examples

### Basic Page Metadata

```typescript
import { generatePageMetadata } from '@/lib/seo';

export const metadata = generatePageMetadata({
  title: 'About Us',
  description: 'Learn about our animation studio...',
  keywords: ['animation', 'studio', 'creative'],
  canonical: '/about',
});
```

### Project-Specific Metadata

```typescript
import { generateProjectMetadata } from '@/lib/seo';

export const metadata = generateProjectMetadata({
  title: 'Animation Project',
  description: 'A sample animation project',
  category: 'Animation',
  tags: ['2D', 'Character Design'],
  slug: 'animation-project'
});
```

### Structured Data Integration

```typescript
import { StructuredData, generateHomepageSchemas } from '@/lib/seo';

export default function Layout({ children }) {
  const schemas = generateHomepageSchemas();
  
  return (
    <html>
      <head>
        {schemas.map((schema, index) => (
          <StructuredData key={index} data={schema} />
        ))}
      </head>
      <body>{children}</body>
    </html>
  );
}
```

## Configuration

### Site Configuration (`lib/seo/config.ts`)

Update the `siteConfig` object with your specific business information:

```typescript
export const siteConfig = {
  siteName: "Your Site Name",
  siteUrl: "https://yoursite.com",
  description: "Your site description",
  
  businessInfo: {
    name: "Your Business Name",
    email: "contact@yoursite.com",
    phone: "+1-555-0123",
    address: {
      streetAddress: "123 Your Street",
      addressLocality: "Your City",
      addressRegion: "Your State",
      postalCode: "12345",
      addressCountry: "US"
    }
  },
  
  socialMedia: {
    twitter: "https://twitter.com/yourhandle",
    linkedin: "https://linkedin.com/company/yourcompany",
    // ... other social links
  }
};
```

## Testing

Run the SEO tests to ensure everything is working correctly:

```bash
npm test
```

The test suite covers:
- Metadata generation and validation
- Structured data creation and validation
- Schema.org compliance
- Error handling

## Validation Tools

### Built-in Validation

```typescript
import { validateMetadata, validateStructuredData } from '@/lib/seo';

// Validate metadata
const validation = validateMetadata(metadata);
if (!validation.isValid) {
  console.log('Issues:', validation.issues);
}

// Validate structured data
const schemaValidation = validateStructuredData(schema);
if (!schemaValidation.isValid) {
  console.log('Errors:', schemaValidation.errors);
}
```

### External Validation Tools

- **Google Rich Results Test**: https://search.google.com/test/rich-results
- **Schema Markup Validator**: https://validator.schema.org/
- **Google Lighthouse**: Built into Chrome DevTools
- **Google Search Console**: For live site monitoring

## Requirements Satisfied

This implementation satisfies the following requirements from the SEO specification:

- **1.3**: Clear, descriptive page titles and meta descriptions ✅
- **1.4**: Compelling titles and descriptions for search results ✅
- **6.1**: Unique, descriptive title tags under 60 characters ✅
- **6.2**: Compelling descriptions under 160 characters ✅

## Next Steps

After implementing this core infrastructure, you can:

1. Add page-specific metadata to remaining pages
2. Implement XML sitemap generation
3. Add robots.txt configuration
4. Integrate Google Analytics and Search Console
5. Implement performance monitoring
6. Add breadcrumb navigation with structured data

## Troubleshooting

### Common Issues

1. **TypeScript Errors**: Ensure all imports use the correct paths
2. **Build Failures**: Check that all metadata functions return valid Metadata objects
3. **Missing Structured Data**: Verify that StructuredData components are properly imported
4. **Validation Failures**: Use the built-in validation utilities to identify issues

### Debug Mode

Enable debug logging by setting the environment variable:

```bash
NEXT_PUBLIC_SEO_DEBUG=true
```

This will log metadata generation and structured data creation to the console.