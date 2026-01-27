import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest';
import { ANALYTICS_CONFIG } from '@/lib/analytics/config';

// Mock the analytics provider
const mockTrackEvent = vi.fn();

vi.mock('@/components/analytics/AnalyticsProvider', () => ({
  useAnalytics: () => ({
    isInitialized: true,
    trackEvent: mockTrackEvent,
    trackError: vi.fn(),
    trackPerformance: vi.fn(),
    setUserId: vi.fn(),
    setUserProperties: vi.fn(),
  }),
}));

describe('LinkTracker Configuration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should have correct event names configured', () => {
    expect(ANALYTICS_CONFIG.CUSTOM_EVENTS.INTERNAL_LINK_CLICK).toBe('internal_link_click');
    expect(ANALYTICS_CONFIG.CUSTOM_EVENTS.EXTERNAL_LINK_CLICK).toBe('external_link_click');
  });

  it('should have link tracking events in analytics config', () => {
    const events = ANALYTICS_CONFIG.CUSTOM_EVENTS;
    
    expect(events).toHaveProperty('INTERNAL_LINK_CLICK');
    expect(events).toHaveProperty('EXTERNAL_LINK_CLICK');
    expect(typeof events.INTERNAL_LINK_CLICK).toBe('string');
    expect(typeof events.EXTERNAL_LINK_CLICK).toBe('string');
  });
});