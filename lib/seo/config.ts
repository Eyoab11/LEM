/**
 * SEO Configuration for Levy Eromo Media
 * Central configuration for all SEO-related settings and constants
 */

export const siteConfig = {
  siteName: "Levy Eromo Media",
  siteUrl: process.env.NEXT_PUBLIC_SITE_URL || "https://levyeromedia.com",
  description: "Where legendary world-builders unite to redefine animation for the next century",
  logo: "/lemm.png",
  
  // Business Information
  businessInfo: {
    name: "Levy Eromo Media",
    description: "Professional animation and media production company specializing in world-class storytelling and visual content creation",
    foundingDate: "2020-01-01",
    email: "contact@levyeromedia.com",
    phone: "+1-555-0123", // Update with actual phone number
    address: {
      streetAddress: "123 Animation Street", // Update with actual address
      addressLocality: "Los Angeles",
      addressRegion: "CA",
      postalCode: "90210",
      addressCountry: "US"
    }
  },

  // Social Media Links
  socialMedia: {
    twitter: "https://twitter.com/levyeromedia",
    linkedin: "https://linkedin.com/company/levyeromedia",
    instagram: "https://instagram.com/levyeromedia",
    youtube: "https://youtube.com/@levyeromedia"
  },

  // Default SEO Settings
  defaultMetadata: {
    titleTemplate: "%s | Levy Eromo Media",
    defaultTitle: "Levy Eromo Media - Professional Animation & Media Production",
    description: "Where legendary world-builders unite to redefine animation for the next century. Professional animation, video production, and creative storytelling services.",
    keywords: [
      "animation",
      "media production",
      "video editing",
      "content creation",
      "storytelling",
      "visual effects",
      "motion graphics",
      "creative services",
      "Levy Eromo Media"
    ],
    authors: [{ name: "Levy Eromo Media" }],
    creator: "Levy Eromo Media",
    publisher: "Levy Eromo Media",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-video-preview": -1,
        "max-image-preview": "large",
        "max-snippet": -1,
      },
    },
  },

  // Open Graph Defaults
  openGraph: {
    type: "website",
    locale: "en_US",
    siteName: "Levy Eromo Media",
    images: [
      {
        url: "/og-image.jpg", // Will need to create this
        width: 1200,
        height: 630,
        alt: "Levy Eromo Media - Professional Animation & Media Production",
      },
    ],
  },

  // Twitter Card Defaults
  twitter: {
    card: "summary_large_image",
    site: "@levyeromedia",
    creator: "@levyeromedia",
  },

  // Industry-specific keywords for animation/media
  industryKeywords: [
    "2D animation",
    "3D animation",
    "character design",
    "storyboarding",
    "post-production",
    "video production",
    "motion design",
    "visual storytelling",
    "animation studio",
    "media company",
    "creative agency",
    "content production"
  ]
} as const;

export type SiteConfig = typeof siteConfig;