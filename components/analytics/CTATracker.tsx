'use client';

import { trackEvent } from '@/lib/analytics';
import { ANALYTICS_CONFIG } from '@/lib/analytics/config';

interface CTATrackerProps {
  ctaName: string;
  ctaLocation: string;
  destination?: string;
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export function CTATracker({ 
  ctaName, 
  ctaLocation, 
  destination, 
  children, 
  className,
  onClick 
}: CTATrackerProps) {
  const handleClick = () => {
    // Track CTA click
    trackEvent(ANALYTICS_CONFIG.CUSTOM_EVENTS.CTA_CLICK, {
      cta_name: ctaName,
      cta_location: ctaLocation,
      destination: destination || 'unknown',
      page_location: window.location.pathname
    });

    // Call original onClick if provided
    if (onClick) {
      onClick();
    }
  };

  return (
    <div onClick={handleClick} className={className}>
      {children}
    </div>
  );
}