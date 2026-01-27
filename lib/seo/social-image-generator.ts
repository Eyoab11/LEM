/**
 * Social Image Generator
 * Utilities for creating dynamic social media images with text overlays
 */

export interface SocialImageTemplate {
  width: number;
  height: number;
  background: string;
  overlay?: {
    color: string;
    opacity: number;
  };
  logo?: {
    src: string;
    width: number;
    height: number;
    position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'center';
  };
  text: {
    title: {
      content: string;
      fontSize: number;
      fontWeight: 'normal' | 'bold' | '600' | '700' | '800';
      color: string;
      maxLines: number;
      position: {
        x: number;
        y: number;
      };
    };
    subtitle?: {
      content: string;
      fontSize: number;
      color: string;
      position: {
        x: number;
        y: number;
      };
    };
    brand: {
      content: string;
      fontSize: number;
      color: string;
      position: {
        x: number;
        y: number;
      };
    };
  };
}

/**
 * Predefined templates for different social platforms
 */
export const socialImageTemplates = {
  openGraph: {
    width: 1200,
    height: 630,
    background: '/background.jpeg',
    overlay: {
      color: 'rgba(0, 0, 0, 0.6)',
      opacity: 0.6,
    },
    logo: {
      src: '/lemm.png',
      width: 80,
      height: 80,
      position: 'top-right' as const,
    },
    text: {
      title: {
        content: '',
        fontSize: 64,
        fontWeight: 'bold' as const,
        color: '#ffffff',
        maxLines: 2,
        position: { x: 60, y: 200 },
      },
      subtitle: {
        content: '',
        fontSize: 32,
        color: '#cccccc',
        position: { x: 60, y: 320 },
      },
      brand: {
        content: 'Levy Eromo Media',
        fontSize: 24,
        color: '#ffffff',
        position: { x: 60, y: 550 },
      },
    },
  },
  twitter: {
    width: 1200,
    height: 675,
    background: '/background.jpeg',
    overlay: {
      color: 'rgba(0, 0, 0, 0.5)',
      opacity: 0.5,
    },
    logo: {
      src: '/lemm.png',
      width: 60,
      height: 60,
      position: 'top-right' as const,
    },
    text: {
      title: {
        content: '',
        fontSize: 56,
        fontWeight: 'bold' as const,
        color: '#ffffff',
        maxLines: 2,
        position: { x: 50, y: 180 },
      },
      subtitle: {
        content: '',
        fontSize: 28,
        color: '#cccccc',
        position: { x: 50, y: 280 },
      },
      brand: {
        content: '@levyeromedia',
        fontSize: 20,
        color: '#1DA1F2',
        position: { x: 50, y: 600 },
      },
    },
  },
  linkedin: {
    width: 1200,
    height: 627,
    background: '/background.jpeg',
    overlay: {
      color: 'rgba(0, 0, 0, 0.7)',
      opacity: 0.7,
    },
    logo: {
      src: '/lemm.png',
      width: 70,
      height: 70,
      position: 'bottom-right' as const,
    },
    text: {
      title: {
        content: '',
        fontSize: 48,
        fontWeight: '600' as const,
        color: '#ffffff',
        maxLines: 2,
        position: { x: 50, y: 150 },
      },
      subtitle: {
        content: '',
        fontSize: 24,
        color: '#cccccc',
        position: { x: 50, y: 250 },
      },
      brand: {
        content: 'Professional Animation & Media Production',
        fontSize: 18,
        color: '#0077B5',
        position: { x: 50, y: 550 },
      },
    },
  },
} as const;

/**
 * Generate social image configuration for a specific page
 */
export function generateSocialImageConfig(options: {
  title: string;
  subtitle?: string;
  platform: 'openGraph' | 'twitter' | 'linkedin';
  background?: string;
  category?: string;
}): SocialImageTemplate {
  const { title, subtitle, platform, background, category } = options;
  
  // Create a deep copy of the template to avoid readonly issues
  const baseTemplate = socialImageTemplates[platform];
  const template: SocialImageTemplate = {
    width: baseTemplate.width,
    height: baseTemplate.height,
    background: baseTemplate.background,
    overlay: baseTemplate.overlay ? { ...baseTemplate.overlay } : undefined,
    logo: baseTemplate.logo ? { ...baseTemplate.logo } : undefined,
    text: {
      title: { ...baseTemplate.text.title },
      subtitle: baseTemplate.text.subtitle ? { ...baseTemplate.text.subtitle } : undefined,
      brand: { ...baseTemplate.text.brand },
    },
  };
  
  // Update text content
  template.text.title.content = title;
  if (subtitle && template.text.subtitle) {
    template.text.subtitle.content = subtitle;
  }
  
  // Use custom background if provided
  if (background) {
    template.background = background;
  }
  
  // Adjust styling based on category
  if (category) {
    switch (category.toLowerCase()) {
      case 'animation':
        template.background = '/superhero.jpg';
        template.text.brand.content = 'Animation Projects - Levy Eromo Media';
        break;
      case 'power-rangers':
        template.background = '/powerrangers.jpg';
        template.text.brand.content = 'Power Rangers Project - Levy Eromo Media';
        break;
      case 'contact':
        template.background = '/background.jpeg';
        template.text.brand.content = 'Get In Touch - Levy Eromo Media';
        break;
    }
  }
  
  return template;
}

/**
 * Generate HTML for social image (for server-side rendering)
 */
export function generateSocialImageHTML(config: SocialImageTemplate): string {
  const { width, height, background, overlay, logo, text } = config;
  
  return `
    <div style="
      width: ${width}px;
      height: ${height}px;
      position: relative;
      background-image: url('${background}');
      background-size: cover;
      background-position: center;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, sans-serif;
      overflow: hidden;
    ">
      ${overlay ? `
        <div style="
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: ${overlay.color};
          opacity: ${overlay.opacity};
        "></div>
      ` : ''}
      
      ${logo ? `
        <img src="${logo.src}" style="
          position: absolute;
          width: ${logo.width}px;
          height: ${logo.height}px;
          ${getLogoPosition(logo.position, width, height, logo.width, logo.height)}
        " alt="Logo" />
      ` : ''}
      
      <div style="
        position: absolute;
        left: ${text.title.position.x}px;
        top: ${text.title.position.y}px;
        font-size: ${text.title.fontSize}px;
        font-weight: ${text.title.fontWeight};
        color: ${text.title.color};
        line-height: 1.2;
        max-width: ${width - text.title.position.x * 2}px;
        word-wrap: break-word;
      ">
        ${text.title.content}
      </div>
      
      ${text.subtitle ? `
        <div style="
          position: absolute;
          left: ${text.subtitle.position.x}px;
          top: ${text.subtitle.position.y}px;
          font-size: ${text.subtitle.fontSize}px;
          color: ${text.subtitle.color};
          line-height: 1.3;
          max-width: ${width - text.subtitle.position.x * 2}px;
        ">
          ${text.subtitle.content}
        </div>
      ` : ''}
      
      <div style="
        position: absolute;
        left: ${text.brand.position.x}px;
        top: ${text.brand.position.y}px;
        font-size: ${text.brand.fontSize}px;
        color: ${text.brand.color};
        font-weight: 500;
      ">
        ${text.brand.content}
      </div>
    </div>
  `;
}

/**
 * Helper function to calculate logo position
 */
function getLogoPosition(
  position: string,
  containerWidth: number,
  containerHeight: number,
  logoWidth: number,
  logoHeight: number
): string {
  const margin = 30;
  
  switch (position) {
    case 'top-left':
      return `top: ${margin}px; left: ${margin}px;`;
    case 'top-right':
      return `top: ${margin}px; right: ${margin}px;`;
    case 'bottom-left':
      return `bottom: ${margin}px; left: ${margin}px;`;
    case 'bottom-right':
      return `bottom: ${margin}px; right: ${margin}px;`;
    case 'center':
      return `top: ${(containerHeight - logoHeight) / 2}px; left: ${(containerWidth - logoWidth) / 2}px;`;
    default:
      return `top: ${margin}px; right: ${margin}px;`;
  }
}

/**
 * Generate social image URL for dynamic generation
 * This would typically point to an API endpoint that generates images
 */
export function generateDynamicSocialImageUrl(options: {
  title: string;
  subtitle?: string;
  platform: 'og' | 'twitter' | 'linkedin';
  category?: string;
}): string {
  const { title, subtitle, platform, category } = options;
  const params = new URLSearchParams({
    title,
    platform,
    ...(subtitle && { subtitle }),
    ...(category && { category }),
  });
  
  return `/api/social-image?${params.toString()}`;
}

/**
 * Validate social image dimensions and content
 */
export function validateSocialImageContent(config: SocialImageTemplate): {
  isValid: boolean;
  warnings: string[];
  errors: string[];
} {
  const warnings: string[] = [];
  const errors: string[] = [];
  
  // Check title length
  if (config.text.title.content.length > 60) {
    warnings.push('Title is longer than 60 characters, may be truncated on some platforms');
  }
  
  if (config.text.title.content.length > 100) {
    errors.push('Title is too long (over 100 characters)');
  }
  
  // Check subtitle length
  if (config.text.subtitle && config.text.subtitle.content.length > 120) {
    warnings.push('Subtitle is longer than 120 characters');
  }
  
  // Check dimensions
  const platformRequirements = {
    openGraph: { width: 1200, height: 630 },
    twitter: { width: 1200, height: 675 },
    linkedin: { width: 1200, height: 627 },
  };
  
  // Validate against common requirements
  if (config.width < 600) {
    errors.push('Image width is below minimum requirement (600px)');
  }
  
  if (config.height < 315) {
    errors.push('Image height is below minimum requirement (315px)');
  }
  
  // Check aspect ratio
  const aspectRatio = config.width / config.height;
  if (aspectRatio < 1.5 || aspectRatio > 2.0) {
    warnings.push('Aspect ratio may not be optimal for social media platforms');
  }
  
  return {
    isValid: errors.length === 0,
    warnings,
    errors,
  };
}

/**
 * Social image optimization tips
 */
export const socialImageOptimizationTips = {
  general: [
    'Use high-contrast text for better readability',
    'Keep important content in the center 80% of the image',
    'Test images on different devices and screen sizes',
    'Use consistent branding across all social images',
    'Optimize file size while maintaining quality',
  ],
  openGraph: [
    'Recommended size: 1200x630px',
    'Keep text readable at smaller sizes',
    'Facebook may crop images in news feed',
    'Test with Facebook Sharing Debugger',
  ],
  twitter: [
    'Use summary_large_image card for better engagement',
    'Consider Twitter\'s dark mode when choosing colors',
    'Text should be readable on mobile devices',
    'Test with Twitter Card Validator',
  ],
  linkedin: [
    'Professional, business-appropriate imagery',
    'Include company branding prominently',
    'Use high contrast for readability',
    'Consider LinkedIn\'s professional context',
  ],
} as const;