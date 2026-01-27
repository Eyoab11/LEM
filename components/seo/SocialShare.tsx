'use client';

import React from 'react';
import { getSocialImages, generateSocialMetaTags } from '@/lib/seo';

interface SocialShareProps {
  title: string;
  description: string;
  url: string;
  imageType?: 'default' | 'project' | 'article' | 'contact';
  customImage?: string;
  className?: string;
}

interface SocialPlatform {
  name: string;
  icon: string;
  shareUrl: (url: string, title: string, description: string) => string;
  color: string;
}

const socialPlatforms: SocialPlatform[] = [
  {
    name: 'Twitter',
    icon: '𝕏',
    shareUrl: (url, title, description) => 
      `https://twitter.com/intent/tweet?url=${encodeURIComponent(url)}&text=${encodeURIComponent(`${title} - ${description}`)}`,
    color: '#1DA1F2',
  },
  {
    name: 'Facebook',
    icon: '📘',
    shareUrl: (url, title, description) => 
      `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
    color: '#4267B2',
  },
  {
    name: 'LinkedIn',
    icon: '💼',
    shareUrl: (url, title, description) => 
      `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(url)}`,
    color: '#0077B5',
  },
  {
    name: 'Pinterest',
    icon: '📌',
    shareUrl: (url, title, description) => 
      `https://pinterest.com/pin/create/button/?url=${encodeURIComponent(url)}&description=${encodeURIComponent(`${title} - ${description}`)}`,
    color: '#BD081C',
  },
];

export function SocialShare({ 
  title, 
  description, 
  url, 
  imageType = 'default',
  customImage,
  className = '' 
}: SocialShareProps) {
  const socialImages = getSocialImages(imageType);
  const currentUrl = typeof window !== 'undefined' ? window.location.href : url;
  
  const handleShare = (platform: SocialPlatform) => {
    const shareUrl = platform.shareUrl(currentUrl, title, description);
    window.open(shareUrl, '_blank', 'width=600,height=400');
  };

  const handleCopyLink = async () => {
    try {
      await navigator.clipboard.writeText(currentUrl);
      // You could add a toast notification here
      console.log('Link copied to clipboard');
    } catch (err) {
      console.error('Failed to copy link:', err);
    }
  };

  return (
    <div className={`social-share ${className}`}>
      <div className="social-share-title">
        <span>Share this:</span>
      </div>
      <div className="social-share-buttons">
        {socialPlatforms.map((platform) => (
          <button
            key={platform.name}
            onClick={() => handleShare(platform)}
            className="social-share-button"
            style={{ '--platform-color': platform.color } as React.CSSProperties}
            title={`Share on ${platform.name}`}
            aria-label={`Share on ${platform.name}`}
          >
            <span className="social-icon">{platform.icon}</span>
            <span className="social-name">{platform.name}</span>
          </button>
        ))}
        <button
          onClick={handleCopyLink}
          className="social-share-button copy-link"
          title="Copy link"
          aria-label="Copy link to clipboard"
        >
          <span className="social-icon">🔗</span>
          <span className="social-name">Copy</span>
        </button>
      </div>
      
      <style jsx>{`
        .social-share {
          display: flex;
          flex-direction: column;
          gap: 12px;
          padding: 16px;
          border-radius: 8px;
          background: rgba(255, 255, 255, 0.05);
          backdrop-filter: blur(10px);
        }
        
        .social-share-title {
          font-size: 14px;
          font-weight: 600;
          color: #666;
          margin-bottom: 4px;
        }
        
        .social-share-buttons {
          display: flex;
          gap: 8px;
          flex-wrap: wrap;
        }
        
        .social-share-button {
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 12px;
          border: none;
          border-radius: 6px;
          background: var(--platform-color, #333);
          color: white;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all 0.2s ease;
          text-decoration: none;
        }
        
        .social-share-button:hover {
          transform: translateY(-1px);
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.15);
          opacity: 0.9;
        }
        
        .social-share-button.copy-link {
          background: #666;
        }
        
        .social-icon {
          font-size: 14px;
        }
        
        .social-name {
          font-size: 11px;
        }
        
        @media (max-width: 640px) {
          .social-share-buttons {
            justify-content: center;
          }
          
          .social-share-button {
            flex: 1;
            justify-content: center;
            min-width: 70px;
          }
        }
      `}</style>
    </div>
  );
}

/**
 * Hook for generating social meta tags dynamically
 */
export function useSocialMeta(options: {
  title: string;
  description: string;
  url: string;
  imageType?: 'default' | 'project' | 'article' | 'contact';
  customImage?: string;
}) {
  const { title, description, url, imageType = 'default', customImage } = options;
  
  React.useEffect(() => {
    const socialImages = getSocialImages(imageType);
    const metaTags = generateSocialMetaTags(socialImages, {
      title,
      description,
      url,
    });
    
    // Update existing meta tags or create new ones
    Object.entries(metaTags).forEach(([property, content]) => {
      let metaTag = document.querySelector(`meta[property="${property}"]`) ||
                   document.querySelector(`meta[name="${property}"]`);
      
      if (metaTag) {
        metaTag.setAttribute('content', content);
      } else {
        metaTag = document.createElement('meta');
        if (property.startsWith('og:') || property.startsWith('fb:')) {
          metaTag.setAttribute('property', property);
        } else {
          metaTag.setAttribute('name', property);
        }
        metaTag.setAttribute('content', content);
        document.head.appendChild(metaTag);
      }
    });
    
    // Override with custom image if provided
    if (customImage) {
      const ogImageTag = document.querySelector('meta[property="og:image"]');
      const twitterImageTag = document.querySelector('meta[name="twitter:image"]');
      
      if (ogImageTag) ogImageTag.setAttribute('content', customImage);
      if (twitterImageTag) twitterImageTag.setAttribute('content', customImage);
    }
  }, [title, description, url, imageType, customImage]);
}

/**
 * Social sharing preview component for development/testing
 */
export function SocialPreview({ 
  title, 
  description, 
  url, 
  imageType = 'default',
  customImage 
}: SocialShareProps) {
  const socialImages = getSocialImages(imageType);
  const ogImage = customImage || socialImages.openGraph[0]?.url;
  
  return (
    <div className="social-preview">
      <h3>Social Media Preview</h3>
      
      <div className="preview-cards">
        {/* Facebook/Open Graph Preview */}
        <div className="preview-card facebook">
          <div className="preview-header">Facebook</div>
          <div className="preview-content">
            {ogImage && (
              <div className="preview-image">
                <img src={ogImage} alt={title} />
              </div>
            )}
            <div className="preview-text">
              <div className="preview-title">{title}</div>
              <div className="preview-description">{description}</div>
              <div className="preview-url">{url}</div>
            </div>
          </div>
        </div>
        
        {/* Twitter Preview */}
        <div className="preview-card twitter">
          <div className="preview-header">Twitter</div>
          <div className="preview-content">
            {ogImage && (
              <div className="preview-image">
                <img src={ogImage} alt={title} />
              </div>
            )}
            <div className="preview-text">
              <div className="preview-title">{title}</div>
              <div className="preview-description">{description}</div>
              <div className="preview-url">{url}</div>
            </div>
          </div>
        </div>
      </div>
      
      <style jsx>{`
        .social-preview {
          padding: 20px;
          border: 1px solid #ddd;
          border-radius: 8px;
          margin: 20px 0;
          background: #f9f9f9;
        }
        
        .preview-cards {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 20px;
          margin-top: 16px;
        }
        
        .preview-card {
          border: 1px solid #ddd;
          border-radius: 8px;
          overflow: hidden;
          background: white;
        }
        
        .preview-header {
          padding: 8px 12px;
          background: #f0f0f0;
          font-weight: 600;
          font-size: 12px;
          color: #666;
        }
        
        .preview-content {
          padding: 12px;
        }
        
        .preview-image {
          margin-bottom: 8px;
        }
        
        .preview-image img {
          width: 100%;
          height: 120px;
          object-fit: cover;
          border-radius: 4px;
        }
        
        .preview-title {
          font-weight: 600;
          font-size: 14px;
          margin-bottom: 4px;
          color: #1a1a1a;
        }
        
        .preview-description {
          font-size: 12px;
          color: #666;
          margin-bottom: 4px;
          line-height: 1.4;
        }
        
        .preview-url {
          font-size: 11px;
          color: #999;
          text-transform: uppercase;
        }
        
        @media (max-width: 640px) {
          .preview-cards {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </div>
  );
}