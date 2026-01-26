// Analytics configuration
export const ANALYTICS_CONFIG = {
  // Google Analytics 4
  GA_MEASUREMENT_ID: 'G-YETLS17D8F',
  
  // Enhanced ecommerce settings
  ENHANCED_ECOMMERCE: {
    enabled: true,
    currency: 'USD',
    trackPurchases: true,
    trackViewItem: true,
    trackAddToCart: false, // Not applicable for this site
    trackRemoveFromCart: false, // Not applicable for this site
  },
  
  // Custom events configuration
  CUSTOM_EVENTS: {
    // Form events
    FORM_START: 'form_start',
    FORM_SUBMIT: 'form_submit',
    FORM_SUCCESS: 'contact_form_success',
    FORM_ERROR: 'contact_form_error',
    
    // Content engagement
    PROJECT_VIEW: 'project_view',
    SOCIAL_MEDIA_CLICK: 'social_media_click',
    CTA_CLICK: 'cta_click',
    
    // Navigation events
    INTERNAL_LINK_CLICK: 'internal_link_click',
    EXTERNAL_LINK_CLICK: 'external_link_click',
    
    // User engagement
    SCROLL_DEPTH: 'scroll_depth',
    TIME_ON_PAGE: 'time_on_page',
    VIDEO_PLAY: 'video_play', // For future use
    VIDEO_COMPLETE: 'video_complete', // For future use
  },
  
  // Page tracking settings
  PAGE_TRACKING: {
    trackPageViews: true,
    trackScrollDepth: true,
    scrollThresholds: [25, 50, 75, 90], // Percentage thresholds
    trackTimeOnPage: true,
  },
  
  // Debug settings
  DEBUG: {
    enabled: process.env.NODE_ENV === 'development',
    logEvents: process.env.NODE_ENV === 'development',
  }
};

// Event parameter types for type safety
export interface BaseEventParams {
  [key: string]: string | number | boolean | undefined;
}

export interface FormEventParams extends BaseEventParams {
  form_name: string;
  form_location?: string;
  subject?: string;
  error_type?: string;
}

export interface ProjectEventParams extends BaseEventParams {
  project_id: string;
  project_title: string;
  project_category: string;
  page_location?: string;
}

export interface SocialEventParams extends BaseEventParams {
  platform: string;
  url: string;
  location: string;
}

export interface NavigationEventParams extends BaseEventParams {
  link_url: string;
  link_text?: string;
  source_page?: string;
  destination_page?: string;
}