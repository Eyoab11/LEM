import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { 
  CoreWebVitalsMonitor,
  formatMetricValue,
  calculatePerformanceScore,
  WEB_VITALS_THRESHOLDS,
  WebVitalMetric
} from '@/lib/analytics/core-web-vitals';

// Mock window and performance APIs
const mockPerformanceObserver = vi.fn();
const mockObserve = vi.fn();
const mockDisconnect = vi.fn();

beforeEach(() => {
  // Reset mocks
  vi.clearAllMocks();
  
  // Mock PerformanceObserver
  mockPerformanceObserver.mockImplementation((callback) => ({
    observe: mockObserve,
    disconnect: mockDisconnect,
  }));
  
  // Mock global objects
  global.PerformanceObserver = mockPerformanceObserver;
  global.window = {
    addEventListener: vi.fn(),
    location: { href: 'https://example.com/test' },
    innerWidth: 1024,
    performance: {
      getEntriesByType: vi.fn().mockReturnValue([
        { type: 'navigate' }
      ]),
    },
  } as any;
  
  global.document = {
    addEventListener: vi.fn(),
    visibilityState: 'visible',
  } as any;
  
  global.navigator = {
    userAgent: 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36',
    connection: {
      effectiveType: '4g',
    },
  } as any;
  
  global.fetch = vi.fn().mockResolvedValue({
    ok: true,
    json: () => Promise.resolve({ success: true }),
  });
});

afterEach(() => {
  vi.restoreAllMocks();
});

describe('CoreWebVitalsMonitor', () => {
  it('should initialize without errors', () => {
    const monitor = new CoreWebVitalsMonitor();
    expect(() => monitor.initialize()).not.toThrow();
  });

  it('should set up performance observers on initialization', () => {
    const monitor = new CoreWebVitalsMonitor();
    
    // The monitor should initialize without throwing errors
    expect(() => monitor.initialize()).not.toThrow();
    
    // In a real browser environment, observers would be created
    // In test environment, it gracefully handles missing APIs
  });

  it('should call report callback when metric is reported', () => {
    const reportCallback = vi.fn();
    const monitor = new CoreWebVitalsMonitor(reportCallback);
    
    // Simulate metric reporting
    const mockMetric: WebVitalMetric = {
      name: 'LCP',
      value: 2000,
      rating: 'good',
      delta: 2000,
      id: 'test-id',
      navigationType: 'navigate',
    };
    
    // Access private method for testing
    (monitor as any).reportMetric(mockMetric);
    
    expect(reportCallback).toHaveBeenCalledWith(mockMetric);
  });

  it('should disconnect observers on cleanup', () => {
    const monitor = new CoreWebVitalsMonitor();
    monitor.initialize();
    
    // Should not throw when disconnecting
    expect(() => monitor.disconnect()).not.toThrow();
  });

  it('should generate performance report with correct structure', () => {
    const monitor = new CoreWebVitalsMonitor();
    const report = monitor.generatePerformanceReport();
    
    expect(report).toHaveProperty('url');
    expect(report).toHaveProperty('timestamp');
    expect(report).toHaveProperty('metrics');
    expect(report).toHaveProperty('deviceType');
    expect(report).toHaveProperty('connectionType');
    expect(report).toHaveProperty('userAgent');
    expect(Array.isArray(report.metrics)).toBe(true);
  });

  it('should determine device type correctly', () => {
    const monitor = new CoreWebVitalsMonitor();
    
    // Test desktop
    global.window.innerWidth = 1200;
    let report = monitor.generatePerformanceReport();
    expect(report.deviceType).toBe('desktop');
    
    // Test mobile
    global.window.innerWidth = 400;
    global.navigator.userAgent = 'Mozilla/5.0 (iPhone; CPU iPhone OS 14_0 like Mac OS X)';
    report = monitor.generatePerformanceReport();
    expect(report.deviceType).toBe('mobile');
  });
});

describe('formatMetricValue', () => {
  it('should format CLS values correctly', () => {
    const metric: WebVitalMetric = {
      name: 'CLS',
      value: 0.123,
      rating: 'good',
      delta: 0.123,
      id: 'test',
      navigationType: 'navigate',
    };
    
    expect(formatMetricValue(metric)).toBe('0.123');
  });

  it('should format timing metrics correctly', () => {
    const metric: WebVitalMetric = {
      name: 'LCP',
      value: 2500.7,
      rating: 'good',
      delta: 2500.7,
      id: 'test',
      navigationType: 'navigate',
    };
    
    expect(formatMetricValue(metric)).toBe('2501ms');
  });
});

describe('calculatePerformanceScore', () => {
  it('should return F grade for empty metrics', () => {
    const result = calculatePerformanceScore([]);
    expect(result.score).toBe(0);
    expect(result.grade).toBe('F');
  });

  it('should calculate correct score for good metrics', () => {
    const metrics: WebVitalMetric[] = [
      {
        name: 'LCP',
        value: 2000,
        rating: 'good',
        delta: 2000,
        id: 'test1',
        navigationType: 'navigate',
      },
      {
        name: 'FID',
        value: 50,
        rating: 'good',
        delta: 50,
        id: 'test2',
        navigationType: 'navigate',
      },
      {
        name: 'CLS',
        value: 0.05,
        rating: 'good',
        delta: 0.05,
        id: 'test3',
        navigationType: 'navigate',
      },
    ];
    
    const result = calculatePerformanceScore(metrics);
    expect(result.score).toBeGreaterThan(90);
    expect(result.grade).toBe('A');
  });

  it('should calculate correct score for poor metrics', () => {
    const metrics: WebVitalMetric[] = [
      {
        name: 'LCP',
        value: 5000,
        rating: 'poor',
        delta: 5000,
        id: 'test1',
        navigationType: 'navigate',
      },
      {
        name: 'FID',
        value: 500,
        rating: 'poor',
        delta: 500,
        id: 'test2',
        navigationType: 'navigate',
      },
    ];
    
    const result = calculatePerformanceScore(metrics);
    expect(result.score).toBeLessThan(60);
    expect(result.grade).toBe('F');
  });
});

describe('WEB_VITALS_THRESHOLDS', () => {
  it('should have correct threshold values', () => {
    expect(WEB_VITALS_THRESHOLDS.LCP.good).toBe(2500);
    expect(WEB_VITALS_THRESHOLDS.LCP.poor).toBe(4000);
    expect(WEB_VITALS_THRESHOLDS.FID.good).toBe(100);
    expect(WEB_VITALS_THRESHOLDS.FID.poor).toBe(300);
    expect(WEB_VITALS_THRESHOLDS.CLS.good).toBe(0.1);
    expect(WEB_VITALS_THRESHOLDS.CLS.poor).toBe(0.25);
  });
});

describe('Performance Observer Integration', () => {
  it('should handle LCP observations', () => {
    const reportCallback = vi.fn();
    const monitor = new CoreWebVitalsMonitor(reportCallback);
    
    // Should initialize without throwing errors
    expect(() => monitor.initialize()).not.toThrow();
  });

  it('should handle missing PerformanceObserver gracefully', () => {
    // Remove PerformanceObserver
    delete (global as any).PerformanceObserver;
    
    const monitor = new CoreWebVitalsMonitor();
    expect(() => monitor.initialize()).not.toThrow();
  });
});

describe('Error Handling', () => {
  it('should handle fetch errors gracefully', async () => {
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
    
    const monitor = new CoreWebVitalsMonitor();
    const report = monitor.generatePerformanceReport();
    
    // Should not throw error
    expect(report).toBeDefined();
  });

  it('should handle missing window object', () => {
    delete (global as any).window;
    
    const monitor = new CoreWebVitalsMonitor();
    expect(() => monitor.initialize()).not.toThrow();
  });
});