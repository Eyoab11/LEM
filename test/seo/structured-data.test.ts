/**
 * Tests for structured data generation
 */

import { describe, it, expect } from 'vitest';
import { 
  generateOrganizationSchema,
  generateWebSiteSchema,
  generateCreativeWorkSchema,
  generateBreadcrumbSchema,
  validateStructuredData,
  generateHomepageSchemas
} from '@/lib/seo/structured-data';

describe('Structured Data Generation', () => {
  it('should generate valid Organization schema', () => {
    const schema = generateOrganizationSchema();
    
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('Organization');
    expect(schema.name).toBe('Levy Eromo Media');
    expect(schema.description).toBeDefined();
    expect(schema.url).toBeDefined();
    expect(schema.logo).toBeDefined();
    expect(schema.contactPoint).toBeInstanceOf(Array);
    expect(schema.sameAs).toBeInstanceOf(Array);
  });

  it('should generate valid WebSite schema', () => {
    const schema = generateWebSiteSchema();
    
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('WebSite');
    expect(schema.name).toBe('Levy Eromo Media');
    expect(schema.description).toBeDefined();
    expect(schema.url).toBeDefined();
    expect(schema.potentialAction).toBeDefined();
  });

  it('should generate valid CreativeWork schema', () => {
    const project = {
      title: 'Test Animation',
      description: 'A test animation project',
      category: 'Animation',
      tags: ['2D', 'Character'],
      images: ['/test-image.jpg'],
      dateCreated: new Date('2024-01-01'),
      url: '/projects/test-animation'
    };

    const schema = generateCreativeWorkSchema(project);
    
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('CreativeWork');
    expect(schema.name).toBe('Test Animation');
    expect(schema.description).toBe('A test animation project');
    expect(schema.creator).toBeDefined();
    expect(schema.dateCreated).toBe('2024-01-01');
    expect(schema.genre).toContain('Animation');
    expect(schema.genre).toContain('2D');
  });

  it('should generate valid Breadcrumb schema', () => {
    const breadcrumbs = [
      { name: 'Home', url: '/' },
      { name: 'Projects', url: '/projects' },
      { name: 'Animation', url: '/projects/animation' }
    ];

    const schema = generateBreadcrumbSchema(breadcrumbs);
    
    expect(schema['@context']).toBe('https://schema.org');
    expect(schema['@type']).toBe('BreadcrumbList');
    expect(schema.itemListElement).toHaveLength(3);
    expect(schema.itemListElement[0].position).toBe(1);
    expect(schema.itemListElement[0].name).toBe('Home');
  });

  it('should validate structured data correctly', () => {
    const validSchema = generateOrganizationSchema();
    const validation = validateStructuredData(validSchema);
    
    expect(validation.isValid).toBe(true);
    expect(validation.errors).toHaveLength(0);
  });

  it('should identify invalid structured data', () => {
    const invalidSchema = {
      name: 'Test'
      // Missing @context and @type
    };

    const validation = validateStructuredData(invalidSchema);
    
    expect(validation.isValid).toBe(false);
    expect(validation.errors.length).toBeGreaterThan(0);
    expect(validation.errors).toContain('Missing @context property');
    expect(validation.errors).toContain('Missing @type property');
  });

  it('should generate homepage schemas array', () => {
    const schemas = generateHomepageSchemas();
    
    expect(schemas).toBeInstanceOf(Array);
    expect(schemas.length).toBeGreaterThanOrEqual(2); // At least Organization and WebSite
    
    // Check that we have Organization and WebSite schemas
    const hasOrganization = schemas.some(schema => schema['@type'] === 'Organization');
    const hasWebSite = schemas.some(schema => schema['@type'] === 'WebSite');
    
    expect(hasOrganization).toBe(true);
    expect(hasWebSite).toBe(true);
  });
});