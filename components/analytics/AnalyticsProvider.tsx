'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { GoogleAnalytics, trackEvent } from '@/lib/analytics/google-analytics';
import { ANALYTICS_CONFIG } from '@/lib/analytics/config';
import { initializeCoreWebVitals, WebVitalMetric } from '@/lib/analytics/core-web-vitals';
import { useErrorHandler } from '@/components/error/ErrorBoundary';

interface AnalyticsContextValue {
  isInitialized: boolean;
  trackEvent: (eventName: string, parameters?: Record<string, any>) => void;
  trackError: (error: Error, context?: string) => void;
  trackPerformance: (metric: WebVitalMetric) => void;
  setUserId: (userId: string) => void;
  setUserProperties: (properties: Record<string, any>) => void;
}

const AnalyticsContext = createContext<AnalyticsContextValue | undefined>(undefined);

interface AnalyticsProviderProps {
  children: ReactNode;
  enableInDevelopment?: boolean;
  enableCoreWebVitals?: boolean;
  enableScrollTracking?: boolean;
}

/**
 * Analytics Provider Component
 * Provides centralized analytics functionality with error handling
 */
export function AnalyticsProvider({ 
  children, 
  enableInDevelopment = false,
  enableCoreWebVitals = true,
  enableScrollTracking = true
}: AnalyticsProviderProps) {
  const [isInitialized, setIsInitialized] = useState(false);
  const [coreWebVitalsMonitor, setCoreWebVitalsMonitor] = useState<any>(null);
  const handleError = useErrorHandler();

  // Initialize analytics
  useEffect(() => {
    const shouldInitialize = process.env.NODE_ENV === 'production' || enableInDevelopment;
    
    if (shouldInitialize) {
      try {
        setIsInitialized(true);
        
        // Track initialization
        trackEvent('analytics_initialized', {
          environment: process.env.NODE_ENV,
          timestamp: Date.now(),
        });

        console.log('[Analytics] Initialized successfully');
      } catch (error) {
        handleError(error instanceof Error ? error : new Error(String(error)), 'Analytics initialization');
      }
    }
  }, [enableInDevelopment, handleError]);

  // Initialize Core Web Vitals monitoring
  useEffect(() => {
    if (!isInitialized || !enableCoreWebVitals) return;

    try {
      const monitor = initializeCoreWebVitals((metric: WebVitalMetric) => {
        // Track Core Web Vitals
        trackEvent('core_web_vital', {
          metric_name: metric.name,
          metric_value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          metric_rating: metric.rating,
          navigation_type: metric.navigationType,
        });
      });

      setCoreWebVitalsMonitor(monitor);

      return () => {
        if (monitor && typeof monitor.disconnect === 'function') {
          monitor.disconnect();
        }
      };
    } catch (error) {
      handleError(error instanceof Error ? error : new Error(String(error)), 'Core Web Vitals initialization');
    }
  }, [isInitialized, enableCoreWebVitals, handleError]);

  // Safe event tracking
  const safeTrackEvent = (eventName: string, parameters?: Record<string, any>) => {
    if (!isInitialized) return;

    try {
      trackEvent(eventName, {
        ...parameters,
        timestamp: Date.now(),
        page_location: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
      });
    } catch (error) {
      handleError(error instanceof Error ? error : new Error(String(error)), `Event tracking: ${eventName}`);
    }
  };

  // Safe error tracking
  const trackErrorSafely = (error: Error, context?: string) => {
    if (!isInitialized) return;

    try {
      trackEvent('application_error', {
        error_message: error.message,
        error_context: context || 'unknown',
        error_stack: error.stack?.substring(0, 500),
        page_location: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
        user_agent: typeof window !== 'undefined' ? window.navigator.userAgent : 'unknown',
      });
    } catch (trackingError) {
      // Fallback to console if tracking fails
      console.error('[Analytics] Failed to track error:', trackingError);
      console.error('[Analytics] Original error:', error);
    }
  };

  // Safe performance tracking
  const trackPerformanceSafely = (metric: WebVitalMetric) => {
    if (!isInitialized) return;

    try {
      safeTrackEvent(`performance_${metric.name.toLowerCase()}`, {
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        rating: metric.rating,
        navigation_type: metric.navigationType,
        metric_id: metric.id,
      });
    } catch (error) {
      handleError(error instanceof Error ? error : new Error(String(error)), `Performance tracking: ${metric.name}`);
    }
  };

  // Safe user ID setting
  const setUserIdSafely = (userId: string) => {
    if (!isInitialized) return;

    try {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('config', 'G-YETLS17D8F', {
          user_id: userId,
        });
      }
    } catch (error) {
      handleError(error instanceof Error ? error : new Error(String(error)), 'Set user ID');
    }
  };

  // Safe user properties setting
  const setUserPropertiesSafely = (properties: Record<string, any>) => {
    if (!isInitialized) return;

    try {
      if (typeof window !== 'undefined' && (window as any).gtag) {
        (window as any).gtag('set', { user_properties: properties });
      }
    } catch (error) {
      handleError(error instanceof Error ? error : new Error(String(error)), 'Set user properties');
    }
  };

  const contextValue: AnalyticsContextValue = {
    isInitialized,
    trackEvent: safeTrackEvent,
    trackError: trackErrorSafely,
    trackPerformance: trackPerformanceSafely,
    setUserId: setUserIdSafely,
    setUserProperties: setUserPropertiesSafely,
  };

  return (
    <AnalyticsContext.Provider value={contextValue}>
      {isInitialized && <GoogleAnalytics />}
      {children}
    </AnalyticsContext.Provider>
  );
}

/**
 * Hook to use analytics context
 */
export function useAnalytics() {
  const context = useContext(AnalyticsContext);
  if (context === undefined) {
    throw new Error('useAnalytics must be used within an AnalyticsProvider');
  }
  return context;
}

/**
 * HOC for components that need analytics
 */
export function withAnalytics<P extends object>(Component: React.ComponentType<P>) {
  const WrappedComponent = (props: P) => {
    const analytics = useAnalytics();
    return <Component {...props} analytics={analytics} />;
  };

  WrappedComponent.displayName = `withAnalytics(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

/**
 * Enhanced tracking hooks
 */
export function usePageTracking() {
  const { trackEvent } = useAnalytics();

  useEffect(() => {
    // Track page view
    trackEvent('page_view', {
      page_title: typeof document !== 'undefined' ? document.title : 'unknown',
      page_location: typeof window !== 'undefined' ? window.location.href : 'unknown',
      page_path: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
    });
  }, [trackEvent]);
}

export function useFormTracking(formName: string) {
  const { trackEvent } = useAnalytics();

  return {
    trackFormStart: () => trackEvent('form_start', { form_name: formName }),
    trackFormSubmit: () => trackEvent('form_submit', { form_name: formName }),
    trackFormError: (error: string) => trackEvent('form_error', { 
      form_name: formName, 
      error_message: error 
    }),
  };
}

export function useInteractionTracking() {
  const { trackEvent } = useAnalytics();

  return {
    trackClick: (elementName: string, elementType?: string) => 
      trackEvent('click', { element_name: elementName, element_type: elementType }),
    trackScroll: (depth: number) => 
      trackEvent('scroll', { scroll_depth: depth }),
    trackEngagement: (duration: number) => 
      trackEvent('engagement', { engagement_time_msec: duration }),
  };
}