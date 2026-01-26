export {
  GoogleAnalytics,
  gtag,
  trackEvent,
  trackPurchase,
  trackViewItem,
  trackSelectContent,
  trackShare,
  trackSearch,
  trackEngagement,
  trackFormSubmit,
  trackPageView
} from './google-analytics';

export { ANALYTICS_CONFIG } from './config';
export type {
  BaseEventParams,
  FormEventParams,
  ProjectEventParams,
  SocialEventParams,
  NavigationEventParams
} from './config';

// Search Console basic integration
export {
  SEARCH_CONSOLE_CONFIG,
  generateSearchConsoleVerificationTag,
  isSearchConsoleVerified,
  getSearchConsolePropertyUrl,
  getVerificationFileUrl,
  getSitemapUrl
} from './search-console';
export type {
  SearchConsoleConfig
} from './search-console';

// Core Web Vitals monitoring
export {
  CoreWebVitalsMonitor,
  initializeCoreWebVitals,
  getCoreWebVitalsMonitor,
  formatMetricValue,
  calculatePerformanceScore,
  WEB_VITALS_THRESHOLDS
} from './core-web-vitals';
export type {
  WebVitalMetric,
  PerformanceReport
} from './core-web-vitals';