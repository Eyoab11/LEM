/**
 * Image SEO Optimization Utilities
 * Tools for validating and optimizing images for SEO
 */

import { validateImageAltText, validatePageImages } from './technical';

/**
 * Site-wide image inventory for SEO validation
 */
export const siteImages = {
  // Logo and branding
  logo: {
    src: '/lemm.png',
    alt: 'Levy Eromo Media logo - Professional animation and media production company',
    context: 'branding logo header',
  },
  
  // Hero and main images
  camera: {
    src: '/camera.png',
    alt: 'Professional video camera representing Levy Eromo Media\'s production capabilities',
    context: 'about production equipment',
  },
  
  // Project thumbnails
  powerRangers: {
    src: '/power.jpg',
    alt: 'Mighty Morphin Power Rangers promotional image showcasing the iconic superhero team',
    context: 'power rangers television production project',
  },
  
  inspectorGadget: {
    src: '/inspectorgadget.jpg',
    alt: 'Inspector Gadget animated character with his signature gadgets and detective coat',
    context: 'inspector gadget animation project',
  },
  
  heMan: {
    src: '/heman.jpg',
    alt: 'He-Man and the Masters of the Universe characters in action scene',
    context: 'he-man animation project masters universe',
  },
  
  xMen: {
    src: '/xmen.jpg',
    alt: 'X-Men animated series characters displaying their superpowers',
    context: 'x-men animation project marvel',
  },
  
  digimon: {
    src: '/digimon.jpg',
    alt: 'Digimon digital monsters and their human partners in adventure scene',
    context: 'digimon animation project digital monsters',
  },
  
  spiderMan: {
    src: '/spiderman.jpg',
    alt: 'Spider-Man in his iconic red and blue costume swinging through the city',
    context: 'spider-man animation project marvel superhero',
  },
  
  rainbowBrite: {
    src: '/rainbowbrite.png',
    alt: 'Rainbow Brite character with colorful hair and magical rainbow powers',
    context: 'rainbow brite animation project children entertainment',
  },
  
  // Background and decorative images
  background: {
    src: '/background.jpeg',
    alt: 'Abstract animation studio background with creative lighting effects',
    context: 'background decoration studio atmosphere',
  },
  
  // Character images
  shera: {
    src: '/she-ra.jpg',
    alt: 'She-Ra Princess of Power wielding her magical sword in heroic pose',
    context: 'she-ra animation project princess power',
  },
  
  mask: {
    src: '/mask.jpg',
    alt: 'M.A.S.K. vehicles and characters from the action-adventure animated series',
    context: 'mask animation project vehicles adventure',
  },
  
  mysteryCities: {
    src: '/MYSTERIOUSCITIESOFGOLD.jpg',
    alt: 'Mysterious Cities of Gold adventure scene with ancient civilizations',
    context: 'mysterious cities gold animation adventure history',
  },
  
  ulysses: {
    src: '/ulysse.jpg',
    alt: 'Ulysses 31 space adventure with futuristic spacecraft and characters',
    context: 'ulysses 31 animation space adventure mythology',
  },
} as const;

/**
 * Validate all site images for SEO compliance
 */
export function validateAllSiteImages() {
  const images = Object.entries(siteImages).map(([key, image]) => ({
    key,
    src: image.src,
    alt: image.alt,
    context: image.context,
  }));

  return validatePageImages(images);
}

/**
 * Generate optimized image props for Next.js Image component
 */
export function getOptimizedImageProps(
  imageKey: keyof typeof siteImages,
  options: {
    width?: number;
    height?: number;
    priority?: boolean;
    sizes?: string;
  } = {}
) {
  const image = siteImages[imageKey];
  
  return {
    src: image.src,
    alt: image.alt,
    width: options.width || 800,
    height: options.height || 600,
    priority: options.priority || false,
    sizes: options.sizes || '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw',
    style: {
      width: '100%',
      height: 'auto',
    },
  };
}

/**
 * Image SEO best practices checker
 */
export interface ImageSEOReport {
  totalImages: number;
  optimizedImages: number;
  issues: Array<{
    image: string;
    issue: string;
    severity: 'low' | 'medium' | 'high';
    recommendation: string;
  }>;
  score: number;
}

export function generateImageSEOReport(): ImageSEOReport {
  const validation = validateAllSiteImages();
  const issues: ImageSEOReport['issues'] = [];

  validation.results.forEach((result) => {
    result.issues.forEach((issue) => {
      let severity: 'low' | 'medium' | 'high' = 'medium';
      
      if (issue.includes('Missing alt text')) {
        severity = 'high';
      } else if (issue.includes('too short') || issue.includes('filename')) {
        severity = 'medium';
      } else {
        severity = 'low';
      }

      issues.push({
        image: result.src,
        issue,
        severity,
        recommendation: result.suggestions[0] || 'Review image SEO best practices',
      });
    });
  });

  return {
    totalImages: validation.totalImages,
    optimizedImages: validation.validImages,
    issues,
    score: validation.overallScore,
  };
}

/**
 * Generate structured data for images
 */
export function generateImageStructuredData(
  imageKey: keyof typeof siteImages,
  pageUrl: string
) {
  const image = siteImages[imageKey];
  
  return {
    '@context': 'https://schema.org',
    '@type': 'ImageObject',
    url: `${pageUrl}${image.src}`,
    description: image.alt,
    contentUrl: `${pageUrl}${image.src}`,
  };
}