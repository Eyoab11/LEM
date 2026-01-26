# Analytics Integration

This module provides comprehensive Google Analytics 4 (GA4) integration with enhanced ecommerce tracking and custom event monitoring for the Levy Eromo Media website.

## Features

### ✅ Google Analytics 4 Integration
- **Measurement ID**: `G-YETLS17D8F`
- **Next.js Script Optimization**: Uses `next/script` with `afterInteractive` strategy
- **Type-safe Event Tracking**: TypeScript interfaces for all event parameters

### ✅ Enhanced Ecommerce Tracking
- **View Item Events**: Track project page views with metadata
- **Purchase Tracking**: Ready for future ecommerce features
- **Custom Item Categories**: Animation, Television Production, etc.

### ✅ Custom Event Tracking
- **Form Interactions**: Contact form submissions, errors, and engagement
- **Social Media Clicks**: Facebook, Twitter, LinkedIn engagement tracking
- **Content Engagement**: Project views, CTA clicks, scroll depth
- **Navigation Events**: Internal and external link tracking

### ✅ User Engagement Analytics
- **Scroll Depth Tracking**: 25%, 50%, 75%, 90% milestones
- **Time on Page**: Accurate session duration measurement
- **Form Engagement**: Start, completion, and error tracking

## Implementation

### Core Components

1. **GoogleAnalytics Component** (`google-analytics.tsx`)
   - Main GA4 script loader
   - Global gtag function wrapper
   - Event tracking utilities

2. **Analytics Trackers** (`components/analytics/`)
   - `ProjectViewTracker`: Automatic project page view tracking
   - `SocialShareTracker`: Social media click tracking
   - `ScrollDepthTracker`: User engagement measurement
   - `CTATracker`: Call-to-action click tracking

3. **Configuration** (`config.ts`)
   - Centralized analytics settings
   - Event name constants
   - TypeScript interfaces

### Usage Examples

```tsx
// Track custom events
import { trackEvent } from '@/lib/analytics';

trackEvent('custom_event', {
  category: 'user_interaction',
  action: 'button_click',
  label: 'header_cta'
});

// Track form submissions
import { trackFormSubmit } from '@/lib/analytics';

trackFormSubmit('contact_form');

// Track project views
import { ProjectViewTracker } from '@/components/analytics/ProjectViewTracker';

<ProjectViewTracker 
  projectId="power-rangers"
  projectTitle="Mighty Morphin Power Rangers"
  category="Television Production"
/>

// Monitor Core Web Vitals
import { CoreWebVitalsTracker } from '@/components/analytics/CoreWebVitalsTracker';

<CoreWebVitalsTracker 
  debug={true}
  onMetric={(metric) => console.log('Metric:', metric)}
/>

// Use Search Console API
import { SearchConsoleClient } from '@/lib/analytics';

const client = new SearchConsoleClient();
await client.initialize();
const performance = await client.getSearchPerformance('2024-01-01', '2024-01-31');

// Access performance monitoring hook
import { usePerformanceMonitoring } from '@/components/analytics/CoreWebVitalsTracker';

const { metrics, getMetric, getPerformanceScore } = usePerformanceMonitoring();
const lcpMetric = getMetric('LCP');
const { score, grade } = getPerformanceScore();
```

### Event Types Tracked

#### Form Events
- `form_start`: User begins filling out a form
- `form_submit`: Successful form submission
- `contact_form_success`: Contact form completed successfully
- `contact_form_error`: Contact form submission failed

#### Content Events
- `project_view`: User views a project page
- `social_media_click`: Social media link clicked
- `cta_click`: Call-to-action button clicked

#### Engagement Events
- `scroll_depth`: User scrolls to milestone percentages
- `time_on_page`: Session duration tracking
- `user_engagement`: General engagement metrics

## Google Search Console Integration

### Verification File
- **File**: `public/google8a46c4bf3c3615fc.html` ✅
- **Status**: Ready for verification
- **URL**: Available at `https://www.levyeromomedia.com/google8a46c4bf3c3615fc.html`

### Search Console API Integration ✅
- **Client**: `SearchConsoleClient` class for API interactions
- **Endpoints**: `/api/analytics/search-console` for data retrieval
- **Features**:
  - Search performance data (clicks, impressions, CTR, position)
  - Top performing queries and pages
  - URL indexing status and submission
  - Automated insights and recommendations

### Core Web Vitals Monitoring ✅
- **Real-time Monitoring**: Client-side performance tracking
- **Metrics Tracked**:
  - **LCP** (Largest Contentful Paint): Loading performance
  - **FID** (First Input Delay): Interactivity
  - **CLS** (Cumulative Layout Shift): Visual stability
  - **FCP** (First Contentful Paint): Perceived loading speed
  - **TTFB** (Time to First Byte): Server response time
  - **INP** (Interaction to Next Paint): Responsiveness
- **Performance Reporting**: Automatic data collection and analysis
- **Analytics Integration**: Metrics sent to Google Analytics
- **API Endpoint**: `/api/analytics/performance` for server-side processing

### Manual Steps Required

1. **Deploy and Verify** ✅
   - Deploy the website with the verification file
   - Complete verification in Google Search Console at: `https://www.levyeromomedia.com/google8a46c4bf3c3615fc.html`
   - Set up property and submit sitemap

2. **Configure Search Console API** (Optional)
   - Set up Google Cloud Project and enable Search Console API
   - Configure OAuth2 credentials
   - Set environment variables:
     - `GOOGLE_SEARCH_CONSOLE_API_KEY`
     - `GOOGLE_SEARCH_CONSOLE_CLIENT_ID`
     - `GOOGLE_SEARCH_CONSOLE_CLIENT_SECRET`
     - `GOOGLE_SEARCH_CONSOLE_ACCESS_TOKEN`

3. **Configure Search Console**
   - Add sitemap URL: `https://www.levyeromomedia.com/sitemap.xml`
   - Set up performance monitoring
   - Configure Core Web Vitals tracking

## Testing

The analytics integration includes comprehensive unit tests:

```bash
npm test test/analytics/google-analytics.test.ts
npm test test/analytics/core-web-vitals.test.ts
npm test test/analytics/search-console.test.ts
```

Tests cover:
- Event tracking functionality
- Form submission tracking
- Enhanced ecommerce events
- Core Web Vitals monitoring
- Search Console API integration
- Performance reporting
- Error handling for missing dependencies

## Configuration

### Environment Variables
- `NODE_ENV`: Controls debug mode and logging
- No additional environment variables required

### Analytics Settings
All settings are configured in `lib/analytics/config.ts`:
- Event names and parameters
- Scroll depth thresholds
- Debug and logging options
- Enhanced ecommerce settings

## Performance Considerations

- **Script Loading**: Uses `afterInteractive` strategy to avoid blocking page load
- **Event Batching**: GA4 automatically batches events for optimal performance
- **Client-Side Only**: All tracking components are marked with `'use client'`
- **Passive Listeners**: Scroll tracking uses passive event listeners
- **Core Web Vitals**: Minimal performance impact with efficient observers
- **API Caching**: Search Console data cached to reduce API calls
- **Background Reporting**: Performance data sent asynchronously

## Privacy and Compliance

- **Data Collection**: Only collects anonymous usage analytics
- **No PII**: No personally identifiable information is tracked
- **GDPR Ready**: Can be extended with consent management
- **Opt-out Support**: Respects Do Not Track headers (can be configured)

## Next Steps

1. **Deploy the website** with the Google Search Console verification file ✅
2. **Complete domain verification** in Google Search Console
3. **Set up Search Console** property and submit sitemap (`/sitemap.xml`)
4. **Configure Search Console API** (optional) for programmatic access
5. **Monitor Core Web Vitals** in real-time via the performance dashboard
6. **Set up performance alerts** for poor Core Web Vitals scores
7. **Monitor analytics** in GA4 dashboard
8. **Add consent management** if required for GDPR compliance
9. **Create performance dashboards** using the analytics APIs
10. **Set up automated reporting** for SEO and performance metrics

## Monitoring and Debugging

### Development Mode
- Set `NODE_ENV=development` for detailed logging
- Events are logged to console for debugging
- Test events in GA4 DebugView
- Core Web Vitals metrics displayed in console
- Performance reports logged for inspection

### Production Monitoring
- Monitor real-time events in GA4
- Set up custom alerts for important metrics
- Review conversion tracking and goal completions
- Monitor Core Web Vitals in Search Console
- Track performance trends and regressions
- Set up alerts for poor performance scores

### API Monitoring
- Search Console API rate limits and quotas
- Performance data collection and storage
- Error tracking for failed API calls
- Data validation and quality checks