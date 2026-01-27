/**
 * Content Freshness Tracking System
 * Manages content update timestamps and freshness indicators for SEO
 */

export interface ContentFreshness {
  lastUpdated: string;
  createdAt: string;
  version: string;
  updateFrequency: 'daily' | 'weekly' | 'monthly' | 'quarterly' | 'yearly';
  contentType: 'page' | 'project' | 'blog' | 'service';
}

export interface FreshnessIndicator {
  isRecent: boolean;
  daysSinceUpdate: number;
  updateStatus: 'fresh' | 'moderate' | 'stale';
  displayText: string;
}

/**
 * Calculate content freshness based on last update date
 */
export function calculateFreshness(lastUpdated: string): FreshnessIndicator {
  const updateDate = new Date(lastUpdated);
  const now = new Date();
  const daysSinceUpdate = Math.floor((now.getTime() - updateDate.getTime()) / (1000 * 60 * 60 * 24));
  
  let updateStatus: 'fresh' | 'moderate' | 'stale';
  let displayText: string;
  
  if (daysSinceUpdate <= 30) {
    updateStatus = 'fresh';
    displayText = daysSinceUpdate <= 7 ? 'Recently updated' : 'Updated this month';
  } else if (daysSinceUpdate <= 90) {
    updateStatus = 'moderate';
    displayText = 'Updated recently';
  } else {
    updateStatus = 'stale';
    displayText = 'Last updated ' + Math.floor(daysSinceUpdate / 30) + ' months ago';
  }
  
  return {
    isRecent: daysSinceUpdate <= 30,
    daysSinceUpdate,
    updateStatus,
    displayText
  };
}

/**
 * Generate structured data for content freshness
 */
export function generateFreshnessStructuredData(contentFreshness: ContentFreshness) {
  return {
    '@type': 'Article',
    'datePublished': contentFreshness.createdAt,
    'dateModified': contentFreshness.lastUpdated,
    'version': contentFreshness.version
  };
}

/**
 * Content update tracking for different page types
 */
export const contentUpdates: Record<string, ContentFreshness> = {
  '/': {
    lastUpdated: new Date().toISOString(),
    createdAt: '2024-01-01T00:00:00Z',
    version: '2.1.0',
    updateFrequency: 'monthly',
    contentType: 'page'
  },
  '/contact': {
    lastUpdated: new Date().toISOString(),
    createdAt: '2024-01-01T00:00:00Z',
    version: '1.3.0',
    updateFrequency: 'yearly',
    contentType: 'page'
  }
};

/**
 * Get content freshness for a specific path
 */
export function getContentFreshness(path: string): ContentFreshness | null {
  return contentUpdates[path] || null;
}

/**
 * Update content timestamp for a specific path
 */
export function updateContentTimestamp(path: string, version?: string): void {
  if (contentUpdates[path]) {
    contentUpdates[path].lastUpdated = new Date().toISOString();
    if (version) {
      contentUpdates[path].version = version;
    }
  }
}