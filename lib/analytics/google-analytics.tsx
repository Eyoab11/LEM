'use client';

import Script from 'next/script';

const GA_MEASUREMENT_ID = 'G-YETLS17D8F';

export function GoogleAnalytics() {
  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${GA_MEASUREMENT_ID}');
        `}
      </Script>
    </>
  );
}

// Enhanced ecommerce and custom event tracking functions
export const gtag = (...args: any[]) => {
  if (typeof window !== 'undefined' && (window as any).gtag) {
    (window as any).gtag(...args);
  }
};

// Custom event tracking for user engagement
export const trackEvent = (eventName: string, parameters?: Record<string, any>) => {
  gtag('event', eventName, parameters);
};

// Enhanced ecommerce tracking
export const trackPurchase = (transactionId: string, value: number, currency = 'USD', items: any[] = []) => {
  gtag('event', 'purchase', {
    transaction_id: transactionId,
    value: value,
    currency: currency,
    items: items
  });
};

export const trackViewItem = (itemId: string, itemName: string, category?: string, value?: number) => {
  gtag('event', 'view_item', {
    item_id: itemId,
    item_name: itemName,
    item_category: category,
    value: value
  });
};

export const trackSelectContent = (contentType: string, itemId: string) => {
  gtag('event', 'select_content', {
    content_type: contentType,
    item_id: itemId
  });
};

export const trackShare = (method: string, contentType: string, itemId: string) => {
  gtag('event', 'share', {
    method: method,
    content_type: contentType,
    item_id: itemId
  });
};

export const trackSearch = (searchTerm: string) => {
  gtag('event', 'search', {
    search_term: searchTerm
  });
};

export const trackEngagement = (engagementTimeMs: number) => {
  gtag('event', 'user_engagement', {
    engagement_time_msec: engagementTimeMs
  });
};

export const trackFormSubmit = (formName: string) => {
  gtag('event', 'form_submit', {
    form_name: formName
  });
};

export const trackPageView = (pageTitle: string, pagePath: string) => {
  gtag('event', 'page_view', {
    page_title: pageTitle,
    page_location: window.location.href,
    page_path: pagePath
  });
};