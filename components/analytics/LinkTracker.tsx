'use client';

import { useEffect } from 'react';
import { useAnalytics } from './AnalyticsProvider';
import { ANALYTICS_CONFIG } from '@/lib/analytics/config';

/**
 * LinkTracker Component
 * Automatically tracks all link clicks (internal and external) for analytics
 */
export function LinkTracker() {
  const { trackEvent, isInitialized } = useAnalytics();

  useEffect(() => {
    if (!isInitialized) return;

    const handleLinkClick = (event: MouseEvent) => {
      const target = event.target as HTMLElement;
      
      // Find the closest link element (handles nested elements like icons in links)
      const link = target.closest('a');
      if (!link) return;

      const href = link.href;
      const linkText = link.textContent?.trim() || link.getAttribute('aria-label') || 'Unknown';
      const currentDomain = window.location.hostname;
      
      try {
        const linkUrl = new URL(href);
        const isInternal = linkUrl.hostname === currentDomain || 
                          linkUrl.hostname === '' || 
                          href.startsWith('/') || 
                          href.startsWith('#');

        // Determine link type and track accordingly
        if (isInternal) {
          trackEvent(ANALYTICS_CONFIG.CUSTOM_EVENTS.INTERNAL_LINK_CLICK, {
            link_url: href,
            link_text: linkText,
            source_page: window.location.pathname,
            destination_page: linkUrl.pathname || href,
            link_position: getLinkPosition(link),
            link_type: href.startsWith('#') ? 'anchor' : 'internal'
          });
        } else {
          trackEvent(ANALYTICS_CONFIG.CUSTOM_EVENTS.EXTERNAL_LINK_CLICK, {
            link_url: href,
            link_text: linkText,
            source_page: window.location.pathname,
            external_domain: linkUrl.hostname,
            link_position: getLinkPosition(link),
            link_type: 'external'
          });
        }
      } catch (error) {
        // Handle malformed URLs or other errors
        console.warn('[LinkTracker] Failed to parse link URL:', href, error);
        
        // Still track as best effort
        const isInternal = href.startsWith('/') || href.startsWith('#') || !href.includes('://');
        
        trackEvent(isInternal ? ANALYTICS_CONFIG.CUSTOM_EVENTS.INTERNAL_LINK_CLICK : ANALYTICS_CONFIG.CUSTOM_EVENTS.EXTERNAL_LINK_CLICK, {
          link_url: href,
          link_text: linkText,
          source_page: window.location.pathname,
          link_position: getLinkPosition(link),
          link_type: isInternal ? 'internal' : 'external',
          parse_error: true
        });
      }
    };

    // Add event listener to document
    document.addEventListener('click', handleLinkClick, true);

    // Cleanup
    return () => {
      document.removeEventListener('click', handleLinkClick, true);
    };
  }, [trackEvent, isInitialized]);

  // This component doesn't render anything
  return null;
}

/**
 * Helper function to determine link position/context
 */
function getLinkPosition(link: HTMLAnchorElement): string {
  // Check if link is in navigation
  if (link.closest('nav')) return 'navigation';
  
  // Check if link is in header
  if (link.closest('header')) return 'header';
  
  // Check if link is in footer
  if (link.closest('footer')) return 'footer';
  
  // Check if link is in main content
  if (link.closest('main')) return 'main_content';
  
  // Check if link is in sidebar
  if (link.closest('aside')) return 'sidebar';
  
  // Check for common class names
  const classList = link.className.toLowerCase();
  if (classList.includes('cta') || classList.includes('button')) return 'cta';
  if (classList.includes('social')) return 'social';
  if (classList.includes('breadcrumb')) return 'breadcrumb';
  
  return 'unknown';
}