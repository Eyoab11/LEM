// Internal linking system for SEO optimization
export interface InternalLink {
  href: string;
  title: string;
  description?: string;
  category?: string;
}

// Define all internal pages and their relationships
export const INTERNAL_PAGES = {
  home: {
    href: '/',
    title: 'Home - Levy Eromo Media',
    description: 'Professional animation and media production services',
    category: 'main'
  },
  contact: {
    href: '/contact',
    title: 'Contact Us - Get in Touch',
    description: 'Contact our animation studio for your next project',
    category: 'contact'
  },
  about: {
    href: '/#about-us',
    title: 'About Us - Our Story',
    description: 'Learn about Levy Eromo Media and our creative journey',
    category: 'main'
  },
  pastWork: {
    href: '/#past-work',
    title: 'Our Work - Animation Portfolio',
    description: 'Explore our creative portfolio of animation and media projects',
    category: 'portfolio'
  }
} as const;

// Get related links based on current page
export const getRelatedLinks = (currentPath: string): InternalLink[] => {
  const related: InternalLink[] = [];
  
  // If on homepage, suggest main navigation
  if (currentPath === '/') {
    related.push(INTERNAL_PAGES.pastWork, INTERNAL_PAGES.contact);
  }
  
  // If on contact page, suggest main pages
  else if (currentPath === '/contact') {
    related.push(INTERNAL_PAGES.home, INTERNAL_PAGES.pastWork);
  }
  
  return related;
};

// Get contextual links for content sections
export const getContextualLinks = (context: 'animation' | 'television' | 'music' | 'portfolio'): InternalLink[] => {
  switch (context) {
    case 'animation':
    case 'television':
    case 'music':
    case 'portfolio':
      return [
        INTERNAL_PAGES.pastWork,
        INTERNAL_PAGES.contact
      ];
    
    default:
      return [INTERNAL_PAGES.pastWork, INTERNAL_PAGES.contact];
  }
};

// Generate anchor text variations for natural linking
export const generateAnchorText = (link: InternalLink, variation: 'default' | 'short' | 'descriptive' = 'default'): string => {
  switch (variation) {
    case 'short':
      return link.title.split(' - ')[0];
    
    case 'descriptive':
      return link.description || link.title;
    
    default:
      return link.title;
  }
};

// URL optimization utilities
export const optimizeUrl = (url: string): string => {
  return url
    .toLowerCase()
    .replace(/[^a-z0-9-]/g, '-')
    .replace(/-+/g, '-')
    .replace(/^-|-$/g, '');
};

export const generateCanonicalUrl = (path: string): string => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'https://levyeromomedia.com';
  const cleanPath = path.startsWith('/') ? path : `/${path}`;
  return `${baseUrl}${cleanPath}`;
};