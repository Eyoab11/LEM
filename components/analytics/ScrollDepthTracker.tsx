'use client';

import { useEffect, useRef } from 'react';
import { trackEvent } from '@/lib/analytics';
import { ANALYTICS_CONFIG } from '@/lib/analytics/config';

export function ScrollDepthTracker() {
  const trackedDepths = useRef<Set<number>>(new Set());
  const startTime = useRef<number>(Date.now());

  useEffect(() => {
    if (!ANALYTICS_CONFIG.PAGE_TRACKING.trackScrollDepth) return;

    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const scrollPercentage = Math.round((scrollTop / documentHeight) * 100);

      // Track scroll depth milestones
      ANALYTICS_CONFIG.PAGE_TRACKING.scrollThresholds.forEach(threshold => {
        if (scrollPercentage >= threshold && !trackedDepths.current.has(threshold)) {
          trackedDepths.current.add(threshold);
          
          trackEvent(ANALYTICS_CONFIG.CUSTOM_EVENTS.SCROLL_DEPTH, {
            scroll_depth: threshold,
            page_location: window.location.pathname,
            time_to_depth: Date.now() - startTime.current
          });
        }
      });
    };

    const handleBeforeUnload = () => {
      if (ANALYTICS_CONFIG.PAGE_TRACKING.trackTimeOnPage) {
        const timeOnPage = Date.now() - startTime.current;
        
        trackEvent(ANALYTICS_CONFIG.CUSTOM_EVENTS.TIME_ON_PAGE, {
          time_on_page_ms: timeOnPage,
          page_location: window.location.pathname,
          max_scroll_depth: Math.max(...Array.from(trackedDepths.current), 0)
        });
      }
    };

    // Add event listeners
    window.addEventListener('scroll', handleScroll, { passive: true });
    window.addEventListener('beforeunload', handleBeforeUnload);

    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('beforeunload', handleBeforeUnload);
    };
  }, []);

  return null; // This component doesn't render anything
}