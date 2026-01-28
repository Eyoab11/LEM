import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { generateSafeMetadata, generateSafeStructuredData } from "@/lib/seo/integration";
import { StructuredData } from "@/lib/seo";
import { SEOProvider } from "@/components/seo/SEOProvider";
import { AnalyticsProvider } from "@/components/analytics/AnalyticsProvider";
import { ErrorBoundary } from "@/components/error/ErrorBoundary";
import { ScrollDepthTracker } from "@/components/analytics/ScrollDepthTracker";
import { CoreWebVitalsTracker } from "@/components/analytics/CoreWebVitalsTracker";
import { LinkTracker } from "@/components/analytics/LinkTracker";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

// Generate comprehensive metadata using the integrated SEO system
const metadataResult = await generateSafeMetadata();
export const metadata: Metadata = metadataResult.data || {};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Generate structured data for the homepage with error handling
  const structuredDataResult = await generateSafeStructuredData('homepage');
  const homepageSchemas = structuredDataResult.data || [];

  return (
    <html lang="en">
      <head>
        {/* Inject structured data with error handling */}
        {homepageSchemas.map((schema, index) => (
          <ErrorBoundary key={index} fallback={null}>
            <StructuredData data={schema} />
          </ErrorBoundary>
        ))}
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable}`}>
        <ErrorBoundary>
          <SEOProvider enableHealthCheck={process.env.NODE_ENV === 'development'}>
            <AnalyticsProvider 
              enableInDevelopment={process.env.NODE_ENV === 'development'}
              enableCoreWebVitals={true}
              enableScrollTracking={true}
            >
              <ErrorBoundary fallback={null}>
                <ScrollDepthTracker />
              </ErrorBoundary>
              <ErrorBoundary fallback={null}>
                <CoreWebVitalsTracker />
              </ErrorBoundary>
              <ErrorBoundary fallback={null}>
                <LinkTracker />
              </ErrorBoundary>
              {children}
            </AnalyticsProvider>
          </SEOProvider>
        </ErrorBoundary>
      </body>
    </html>
  );
}
