import { describe, it, expect, vi, beforeEach } from 'vitest';
import { trackEvent, trackFormSubmit, trackViewItem } from '@/lib/analytics';

// Mock the global gtag function
const mockGtag = vi.fn();
Object.defineProperty(global, 'window', {
  value: {
    gtag: mockGtag,
    location: {
      href: 'https://www.levyeromomedia.com/test',
      pathname: '/test'
    }
  },
  writable: true
});

describe('Google Analytics Integration', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should track custom events correctly', () => {
    const eventName = 'test_event';
    const parameters = {
      test_param: 'test_value',
      numeric_param: 123
    };

    trackEvent(eventName, parameters);

    expect(mockGtag).toHaveBeenCalledWith('event', eventName, parameters);
  });

  it('should track form submissions', () => {
    const formName = 'contact_form';

    trackFormSubmit(formName);

    expect(mockGtag).toHaveBeenCalledWith('event', 'form_submit', {
      form_name: formName
    });
  });

  it('should track item views with enhanced ecommerce', () => {
    const itemId = 'project-1';
    const itemName = 'Test Project';
    const category = 'Animation';
    const value = 100;

    trackViewItem(itemId, itemName, category, value);

    expect(mockGtag).toHaveBeenCalledWith('event', 'view_item', {
      item_id: itemId,
      item_name: itemName,
      item_category: category,
      value: value
    });
  });

  it('should handle missing window.gtag gracefully', () => {
    // Temporarily remove gtag
    const originalGtag = (global as any).window.gtag;
    delete (global as any).window.gtag;

    // Should not throw an error
    expect(() => {
      trackEvent('test_event', { param: 'value' });
    }).not.toThrow();

    // Restore gtag
    (global as any).window.gtag = originalGtag;
  });
});