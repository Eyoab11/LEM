/**
 * Core Web Vitals Monitoring and Reporting
 * Implements client-side performance monitoring for LCP, FID, CLS, and other metrics
 */

'use client';

export interface WebVitalMetric {
  name: 'CLS' | 'FID' | 'FCP' | 'LCP' | 'TTFB' | 'INP';
  value: number;
  rating: 'good' | 'needs-improvement' | 'poor';
  delta: number;
  id: string;
  navigationType: 'navigate' | 'reload' | 'back-forward' | 'back-forward-cache';
}

export interface PerformanceReport {
  url: string;
  timestamp: number;
  metrics: WebVitalMetric[];
  deviceType: 'mobile' | 'desktop' | 'tablet';
  connectionType: string;
  userAgent: string;
}

/**
 * Core Web Vitals thresholds (in milliseconds for timing metrics)
 */
export const WEB_VITALS_THRESHOLDS = {
  LCP: { good: 2500, poor: 4000 },      // Largest Contentful Paint
  FID: { good: 100, poor: 300 },        // First Input Delay
  CLS: { good: 0.1, poor: 0.25 },       // Cumulative Layout Shift
  FCP: { good: 1800, poor: 3000 },      // First Contentful Paint
  TTFB: { good: 800, poor: 1800 },      // Time to First Byte
  INP: { good: 200, poor: 500 },        // Interaction to Next Paint
} as const;

/**
 * Get performance rating based on metric value and thresholds
 */
function getPerformanceRating(
  metricName: WebVitalMetric['name'],
  value: number
): WebVitalMetric['rating'] {
  const thresholds = WEB_VITALS_THRESHOLDS[metricName];
  
  if (value <= thresholds.good) {
    return 'good';
  } else if (value <= thresholds.poor) {
    return 'needs-improvement';
  } else {
    return 'poor';
  }
}

/**
 * Core Web Vitals Monitor Class
 */
export class CoreWebVitalsMonitor {
  private metrics: Map<string, WebVitalMetric> = new Map();
  private observers: PerformanceObserver[] = [];
  private reportCallback?: (metric: WebVitalMetric) => void;
  private isInitialized = false;

  constructor(reportCallback?: (metric: WebVitalMetric) => void) {
    this.reportCallback = reportCallback;
  }

  /**
   * Initialize Core Web Vitals monitoring
   */
  initialize(): void {
    if (this.isInitialized || typeof window === 'undefined') {
      return;
    }

    this.isInitialized = true;

    // Monitor Largest Contentful Paint (LCP)
    this.observeLCP();

    // Monitor First Input Delay (FID) and Interaction to Next Paint (INP)
    this.observeFID();
    this.observeINP();

    // Monitor Cumulative Layout Shift (CLS)
    this.observeCLS();

    // Monitor First Contentful Paint (FCP)
    this.observeFCP();

    // Monitor Time to First Byte (TTFB)
    this.observeTTFB();

    // Report metrics when page is about to unload
    this.setupUnloadReporting();
  }

  /**
   * Observe Largest Contentful Paint (LCP)
   */
  private observeLCP(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        const lastEntry = entries[entries.length - 1] as PerformanceEntry & {
          renderTime?: number;
          loadTime?: number;
        };

        if (lastEntry) {
          const value = lastEntry.renderTime || lastEntry.loadTime || 0;
          this.reportMetric({
            name: 'LCP',
            value,
            rating: getPerformanceRating('LCP', value),
            delta: value,
            id: this.generateId(),
            navigationType: this.getNavigationType(),
          });
        }
      });

      observer.observe({ type: 'largest-contentful-paint', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn('LCP observation failed:', error);
    }
  }

  /**
   * Observe First Input Delay (FID)
   */
  private observeFID(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const fidEntry = entry as PerformanceEntry & { processingStart?: number };
          if (fidEntry.processingStart) {
            const value = fidEntry.processingStart - entry.startTime;
            this.reportMetric({
              name: 'FID',
              value,
              rating: getPerformanceRating('FID', value),
              delta: value,
              id: this.generateId(),
              navigationType: this.getNavigationType(),
            });
          }
        });
      });

      observer.observe({ type: 'first-input', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn('FID observation failed:', error);
    }
  }

  /**
   * Observe Interaction to Next Paint (INP)
   */
  private observeINP(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const inpEntry = entry as PerformanceEntry & { 
            processingStart?: number;
            processingEnd?: number;
          };
          
          if (inpEntry.processingStart && inpEntry.processingEnd) {
            const value = inpEntry.processingEnd - entry.startTime;
            this.reportMetric({
              name: 'INP',
              value,
              rating: getPerformanceRating('INP', value),
              delta: value,
              id: this.generateId(),
              navigationType: this.getNavigationType(),
            });
          }
        });
      });

      observer.observe({ type: 'event', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn('INP observation failed:', error);
    }
  }

  /**
   * Observe Cumulative Layout Shift (CLS)
   */
  private observeCLS(): void {
    if (!('PerformanceObserver' in window)) return;

    let clsValue = 0;
    let sessionValue = 0;
    let sessionEntries: PerformanceEntry[] = [];

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        
        entries.forEach((entry) => {
          const layoutShiftEntry = entry as PerformanceEntry & { 
            value?: number;
            hadRecentInput?: boolean;
          };
          
          if (!layoutShiftEntry.hadRecentInput && layoutShiftEntry.value) {
            sessionValue += layoutShiftEntry.value;
            sessionEntries.push(entry);

            if (sessionValue > clsValue) {
              clsValue = sessionValue;
              this.reportMetric({
                name: 'CLS',
                value: clsValue,
                rating: getPerformanceRating('CLS', clsValue),
                delta: layoutShiftEntry.value,
                id: this.generateId(),
                navigationType: this.getNavigationType(),
              });
            }
          }
        });
      });

      observer.observe({ type: 'layout-shift', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn('CLS observation failed:', error);
    }
  }

  /**
   * Observe First Contentful Paint (FCP)
   */
  private observeFCP(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          if (entry.name === 'first-contentful-paint') {
            this.reportMetric({
              name: 'FCP',
              value: entry.startTime,
              rating: getPerformanceRating('FCP', entry.startTime),
              delta: entry.startTime,
              id: this.generateId(),
              navigationType: this.getNavigationType(),
            });
          }
        });
      });

      observer.observe({ type: 'paint', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn('FCP observation failed:', error);
    }
  }

  /**
   * Observe Time to First Byte (TTFB)
   */
  private observeTTFB(): void {
    if (!('PerformanceObserver' in window)) return;

    try {
      const observer = new PerformanceObserver((list) => {
        const entries = list.getEntries();
        entries.forEach((entry) => {
          const navEntry = entry as PerformanceEntry & {
            responseStart?: number;
            requestStart?: number;
          };
          
          if (navEntry.responseStart && navEntry.requestStart) {
            const value = navEntry.responseStart - navEntry.requestStart;
            this.reportMetric({
              name: 'TTFB',
              value,
              rating: getPerformanceRating('TTFB', value),
              delta: value,
              id: this.generateId(),
              navigationType: this.getNavigationType(),
            });
          }
        });
      });

      observer.observe({ type: 'navigation', buffered: true });
      this.observers.push(observer);
    } catch (error) {
      console.warn('TTFB observation failed:', error);
    }
  }

  /**
   * Set up reporting when page is about to unload
   */
  private setupUnloadReporting(): void {
    const reportAllMetrics = () => {
      this.generatePerformanceReport();
    };

    // Report on page visibility change (when user switches tabs)
    document.addEventListener('visibilitychange', () => {
      if (document.visibilityState === 'hidden') {
        reportAllMetrics();
      }
    });

    // Report on page unload
    window.addEventListener('beforeunload', reportAllMetrics);
    window.addEventListener('pagehide', reportAllMetrics);
  }

  /**
   * Report a single metric
   */
  private reportMetric(metric: WebVitalMetric): void {
    this.metrics.set(metric.name, metric);
    
    if (this.reportCallback) {
      this.reportCallback(metric);
    }

    // Send to Google Analytics if available
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', metric.name, {
        event_category: 'Web Vitals',
        event_label: metric.id,
        value: Math.round(metric.name === 'CLS' ? metric.value * 1000 : metric.value),
        custom_map: {
          metric_rating: metric.rating,
          metric_delta: Math.round(metric.name === 'CLS' ? metric.delta * 1000 : metric.delta),
        },
      });
    }
  }

  /**
   * Generate a unique ID for the metric
   */
  private generateId(): string {
    return `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;
  }

  /**
   * Get navigation type
   */
  private getNavigationType(): WebVitalMetric['navigationType'] {
    if (typeof window === 'undefined' || !('performance' in window)) {
      return 'navigate';
    }

    const navEntry = performance.getEntriesByType('navigation')[0] as PerformanceNavigationTiming;
    
    if (navEntry) {
      switch (navEntry.type) {
        case 'reload':
          return 'reload';
        case 'back_forward':
          return 'back-forward';
        default:
          return 'navigate';
      }
    }

    return 'navigate';
  }

  /**
   * Get device type based on screen size and user agent
   */
  private getDeviceType(): 'mobile' | 'desktop' | 'tablet' {
    if (typeof window === 'undefined') return 'desktop';

    const width = window.innerWidth;
    const userAgent = navigator.userAgent.toLowerCase();

    if (width <= 768 || /mobile|android|iphone/.test(userAgent)) {
      return 'mobile';
    } else if (width <= 1024 || /tablet|ipad/.test(userAgent)) {
      return 'tablet';
    } else {
      return 'desktop';
    }
  }

  /**
   * Get connection type
   */
  private getConnectionType(): string {
    if (typeof navigator === 'undefined') return 'unknown';

    const connection = (navigator as any).connection || (navigator as any).mozConnection || (navigator as any).webkitConnection;
    
    if (connection) {
      return connection.effectiveType || connection.type || 'unknown';
    }

    return 'unknown';
  }

  /**
   * Generate comprehensive performance report
   */
  generatePerformanceReport(): PerformanceReport {
    const report: PerformanceReport = {
      url: typeof window !== 'undefined' ? window.location.href : '',
      timestamp: Date.now(),
      metrics: Array.from(this.metrics.values()),
      deviceType: this.getDeviceType(),
      connectionType: this.getConnectionType(),
      userAgent: typeof navigator !== 'undefined' ? navigator.userAgent : '',
    };

    // Send report to analytics endpoint (if configured)
    this.sendPerformanceReport(report);

    return report;
  }

  /**
   * Send performance report to analytics endpoint
   */
  private async sendPerformanceReport(report: PerformanceReport): Promise<void> {
    try {
      // In production, this would send to your analytics endpoint
      const endpoint = '/api/analytics/performance';
      
      await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(report),
        keepalive: true, // Ensure request completes even if page unloads
      });
    } catch (error) {
      console.warn('Failed to send performance report:', error);
    }
  }

  /**
   * Get current metrics summary
   */
  getMetricsSummary(): {
    [K in WebVitalMetric['name']]?: {
      value: number;
      rating: WebVitalMetric['rating'];
      threshold: { good: number; poor: number };
    };
  } {
    const summary: any = {};

    this.metrics.forEach((metric, name) => {
      summary[name] = {
        value: metric.value,
        rating: metric.rating,
        threshold: WEB_VITALS_THRESHOLDS[name as keyof typeof WEB_VITALS_THRESHOLDS],
      };
    });

    return summary;
  }

  /**
   * Cleanup observers
   */
  disconnect(): void {
    this.observers.forEach(observer => observer.disconnect());
    this.observers = [];
    this.metrics.clear();
    this.isInitialized = false;
  }
}

/**
 * Global Core Web Vitals monitor instance
 */
let globalMonitor: CoreWebVitalsMonitor | null = null;

/**
 * Initialize Core Web Vitals monitoring
 */
export function initializeCoreWebVitals(
  reportCallback?: (metric: WebVitalMetric) => void
): CoreWebVitalsMonitor {
  if (!globalMonitor) {
    globalMonitor = new CoreWebVitalsMonitor(reportCallback);
    globalMonitor.initialize();
  }
  
  return globalMonitor;
}

/**
 * Get the global monitor instance
 */
export function getCoreWebVitalsMonitor(): CoreWebVitalsMonitor | null {
  return globalMonitor;
}

/**
 * Utility function to format metric values for display
 */
export function formatMetricValue(metric: WebVitalMetric): string {
  switch (metric.name) {
    case 'CLS':
      return metric.value.toFixed(3);
    case 'FID':
    case 'LCP':
    case 'FCP':
    case 'TTFB':
    case 'INP':
      return `${Math.round(metric.value)}ms`;
    default:
      return metric.value.toString();
  }
}

/**
 * Get performance score based on all metrics
 */
export function calculatePerformanceScore(metrics: WebVitalMetric[]): {
  score: number;
  grade: 'A' | 'B' | 'C' | 'D' | 'F';
} {
  if (metrics.length === 0) {
    return { score: 0, grade: 'F' };
  }

  const weights = {
    LCP: 0.25,
    FID: 0.25,
    CLS: 0.25,
    FCP: 0.15,
    TTFB: 0.05,
    INP: 0.05,
  };

  let totalScore = 0;
  let totalWeight = 0;

  metrics.forEach(metric => {
    const weight = weights[metric.name as keyof typeof weights] || 0;
    let score = 0;

    switch (metric.rating) {
      case 'good':
        score = 100;
        break;
      case 'needs-improvement':
        score = 75;
        break;
      case 'poor':
        score = 50;
        break;
    }

    totalScore += score * weight;
    totalWeight += weight;
  });

  const finalScore = totalWeight > 0 ? Math.round(totalScore / totalWeight) : 0;
  
  let grade: 'A' | 'B' | 'C' | 'D' | 'F';
  if (finalScore >= 90) grade = 'A';
  else if (finalScore >= 80) grade = 'B';
  else if (finalScore >= 70) grade = 'C';
  else if (finalScore >= 60) grade = 'D';
  else grade = 'F';

  return { score: finalScore, grade };
}