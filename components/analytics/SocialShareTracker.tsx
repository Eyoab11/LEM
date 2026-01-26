'use client';

import { trackShare, trackEvent } from '@/lib/analytics';

interface SocialShareTrackerProps {
  platform: string;
  url: string;
  children: React.ReactNode;
  className?: string;
}

export function SocialShareTracker({ platform, url, children, className }: SocialShareTrackerProps) {
  const handleClick = () => {
    // Track social media click
    trackShare(platform, 'social_link', url);
    
    // Track custom social engagement event
    trackEvent('social_media_click', {
      platform: platform,
      url: url,
      location: 'contact_form'
    });
  };

  return (
    <a 
      href={url} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={className}
      onClick={handleClick}
    >
      {children}
    </a>
  );
}