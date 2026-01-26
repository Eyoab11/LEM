'use client';

import { useEffect, useRef } from 'react';
import { 
  initializeCoreWebVitals, 
  WebVitalMetric,
  formatMetricValue,
  calculatePerformanceScore
} from '@/lib/analytics/core-web-vitals';
import { trackEvent } from '@/lib/analytics/google-analytics';

interface CoreWebVitalsTrackerProps {
  /** Whether to log metrics to console in development */
  debug?: boolean;
  /** Custom callback for handling metrics */
  onMetric?: (metric: WebVitalMetric) => void;
  /** Whether to send metrics to Google Analytics */
  sendToGA?: boolean;
}

/**
 * Core Web Vitals Tracker Component
 * Automatically monitors and reports Core Web Vitals metrics
 */
export function CoreWebVitalsTracker({
  debug = process.env.NODE_ENV === 'development',
  onMetric,
  sendToGA = true,
}: CoreWebVitalsTrackerProps) {
  const metricsRef = useRef<WebVitalMetric[]>([]);
  const reportedRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    const handleMetric = (metric: WebVitalMetric) => {
      // Avoid duplicate reporting
      const metricKey = `${metric.name}-${metric.id}`;
      if (reportedRef.current.has(metricKey)) {
        return;
      }
      reportedRef.current.add(metricKey);

      // Store metric
      metricsRef.current.push(metric);

      // Debug logging
      if (debug) {
        console.group(`🔍 Core Web Vital: ${metric.name}`);
        console.log('Value:', formatMetricValue(metric));
        console.log('Rating:', metric.rating);
        console.log('Navigation Type:', metric.navigationType);
        console.log('Metric ID:', metric.id);
        console.groupEnd();
      }

      // Send to Google Analytics
      if (sendToGA) {
        trackEvent('core_web_vital', {
          metric_name: metric.name,
          metric_value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          metric_rating: metric.rating,
          metric_delta: Math.round(metric.name === 'CLS' ? metric.delta * 1000 : metric.delta),
          navigation_type: metric.navigationType,
          page_path: window.location.pathname,
        });

        // Send individual metric events for better tracking
        trackEvent(`cwv_${metric.name.toLowerCase()}`, {
          value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
          rating: metric.rating,
          navigation_type: metric.navigationType,
        });
      }

      // Custom callback
      if (onMetric) {
        onMetric(metric);
      }

      // Calculate and report overall performance score when we have key metrics
      const keyMetrics = ['LCP', 'FID', 'CLS'];
      const hasKeyMetrics = keyMetrics.every(name => 
        metricsRef.current.some(m => m.name === name)
      );

      if (hasKeyMetrics && sendToGA) {
        const { score, grade } = calculatePerformanceScore(metricsRef.current);
        
        trackEvent('performance_score', {
          score,
          grade,
          metrics_count: metricsRef.current.length,
          page_path: window.location.pathname,
        });

        if (debug) {
          console.log(`📊 Performance Score: ${score} (${grade})`);
        }
      }
    };

    // Initialize monitoring
    const monitor = initializeCoreWebVitals(handleMetric);

    // Cleanup on unmount
    return () => {
      monitor.disconnect();
    };
  }, [debug, onMetric, sendToGA]);

  // This component doesn't render anything visible
  return null;
}

/**
 * Core Web Vitals Display Component
 * Shows current metrics in a debug overlay (development only)
 */
export function CoreWebVitalsDisplay() {
  const metricsRef = useRef<WebVitalMetric[]>([]);

  useEffect(() => {
    if (process.env.NODE_ENV !== 'development') {
      return;
    }

    const handleMetric = (metric: WebVitalMetric) => {
      // Update metrics array
      const existingIndex = metricsRef.current.findIndex(m => m.name === metric.name);
      if (existingIndex >= 0) {
        metricsRef.current[existingIndex] = metric;
      } else {
        metricsRef.current.push(metric);
      }

      // Force re-render by updating a state or using a different approach
      // For now, we'll just log to console
      console.table(
        metricsRef.current.map(m => ({
          Metric: m.name,
          Value: formatMetricValue(m),
          Rating: m.rating,
          Navigation: m.navigationType,
        }))
      );
    };

    initializeCoreWebVitals(handleMetric);
  }, []);

  // Only show in development
  if (process.env.NODE_ENV !== 'development') {
    return null;
  }

  return (
    <div
      style={{
        position: 'fixed',
        top: '10px',
        right: '10px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '10px',
        borderRadius: '5px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 9999,
        maxWidth: '300px',
      }}
    >
      <div style={{ fontWeight: 'bold', marginBottom: '5px' }}>
        Core Web Vitals (Dev)
      </div>
      <div style={{ fontSize: '10px', opacity: 0.7 }}>
        Check console for detailed metrics
      </div>
    </div>
  );
}

/**
 * Performance Monitoring Hook
 * Custom hook for accessing Core Web Vitals data
 */
export function usePerformanceMonitoring() {
  const metricsRef = useRef<WebVitalMetric[]>([]);

  useEffect(() => {
    const handleMetric = (metric: WebVitalMetric) => {
      const existingIndex = metricsRef.current.findIndex(m => m.name === metric.name);
      if (existingIndex >= 0) {
        metricsRef.current[existingIndex] = metric;
      } else {
        metricsRef.current.push(metric);
      }
    };

    const monitor = initializeCoreWebVitals(handleMetric);

    return () => {
      monitor.disconnect();
    };
  }, []);

  return {
    metrics: metricsRef.current,
    getMetric: (name: WebVitalMetric['name']) => 
      metricsRef.current.find(m => m.name === name),
    getPerformanceScore: () => calculatePerformanceScore(metricsRef.current),
  };
}