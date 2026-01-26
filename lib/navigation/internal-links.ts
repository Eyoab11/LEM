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
  projects: {
    href: '/projects',
    title: 'Our Projects - Animation Portfolio',
    description: 'Explore our creative portfolio of animation and media projects',
    category: 'portfolio'
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
  powerRangers: {
    href: '/projects/power-rangers',
    title: 'Power Rangers - Iconic Television Production',
    description: 'Behind the scenes of Mighty Morphin Power Rangers creation',
    category: 'project'
  },
  inspectorGadget: {
    href: '/projects/inspector-gadget',
    title: 'Inspector Gadget - Animation Excellence',
    description: 'Innovative animation techniques and musical compositions',
    category: 'project'
  },
  heMan: {
    href: '/projects/he-man',
    title: 'He-Man - Masters of the Universe',
    description: 'Legendary animation and unforgettable musical scores',
    category: 'project'
  }
} as const;

// Get related links based on current page
export const getRelatedLinks = (currentPath: string): InternalLink[] => {
  const related: InternalLink[] = [];
  
  // If on homepage, suggest main navigation
  if (currentPath === '/') {
    related.push(INTERNAL_PAGES.projects, INTERNAL_PAGES.contact);
  }
  
  // If on projects page, suggest individual projects
  else if (currentPath === '/projects') {
    related.push(
      INTERNAL_PAGES.powerRangers,
      INTERNAL_PAGES.inspectorGadget,
      INTERNAL_PAGES.heMan,
      INTERNAL_PAGES.contact
    );
  }
  
  // If on individual project page, suggest other projects and contact
  else if (currentPath.startsWith('/projects/')) {
    const currentProject = currentPath.split('/').pop();
    
    // Add other projects (excluding current one)
    if (currentProject !== 'power-rangers') related.push(INTERNAL_PAGES.powerRangers);
    if (currentProject !== 'inspector-gadget') related.push(INTERNAL_PAGES.inspectorGadget);
    if (currentProject !== 'he-man') related.push(INTERNAL_PAGES.heMan);
    
    // Always suggest projects overview and contact
    related.push(INTERNAL_PAGES.projects, INTERNAL_PAGES.contact);
  }
  
  // If on contact page, suggest main pages
  else if (currentPath === '/contact') {
    related.push(INTERNAL_PAGES.home, INTERNAL_PAGES.projects);
  }
  
  return related;
};

// Get contextual links for content sections
export const getContextualLinks = (context: 'animation' | 'television' | 'music' | 'portfolio'): InternalLink[] => {
  switch (context) {
    case 'animation':
      return [
        INTERNAL_PAGES.inspectorGadget,
        INTERNAL_PAGES.heMan,
        INTERNAL_PAGES.projects
      ];
    
    case 'television':
      return [
        INTERNAL_PAGES.powerRangers,
        INTERNAL_PAGES.projects
      ];
    
    case 'music':
      return [
        INTERNAL_PAGES.powerRangers,
        INTERNAL_PAGES.inspectorGadget,
        INTERNAL_PAGES.heMan
      ];
    
    case 'portfolio':
      return [
        INTERNAL_PAGES.projects,
        INTERNAL_PAGES.powerRangers,
        INTERNAL_PAGES.inspectorGadget,
        INTERNAL_PAGES.heMan
      ];
    
    default:
      return [INTERNAL_PAGES.projects, INTERNAL_PAGES.contact];
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