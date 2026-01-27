/**
 * Next.js Middleware for SEO and Technical Infrastructure
 * Handles redirects, security headers, and SEO-related middleware with error handling
 */

import { NextRequest, NextResponse } from 'next/server';
import { siteConfig } from '@/lib/seo/config';

export default function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  
  try {
    const response = NextResponse.next();

    // Add security and SEO headers with error handling
    try {
      response.headers.set('X-Frame-Options', 'DENY');
      response.headers.set('X-Content-Type-Options', 'nosniff');
      response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
      response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');
      
      // Add SEO-friendly headers
      response.headers.set('X-Robots-Tag', 'index, follow');
    } catch (headerError) {
      console.error('[Middleware] Failed to set security headers:', headerError);
      // Continue without headers rather than failing completely
    }
    
    // Handle trailing slashes - redirect to non-trailing slash version
    if (pathname !== '/' && pathname.endsWith('/')) {
      try {
        const url = request.nextUrl.clone();
        url.pathname = pathname.slice(0, -1);
        return NextResponse.redirect(url, 301);
      } catch (redirectError) {
        console.error('[Middleware] Failed to handle trailing slash redirect:', redirectError);
        // Continue without redirect
      }
    }

    // Handle common redirects (example patterns)
    const redirects: Record<string, string> = {
      '/home': '/',
      '/about-us': '/about',
      '/contact-us': '/contact',
    };

    if (redirects[pathname]) {
      try {
        const url = request.nextUrl.clone();
        url.pathname = redirects[pathname];
        return NextResponse.redirect(url, 301);
      } catch (redirectError) {
        console.error('[Middleware] Failed to handle redirect:', redirectError);
        // Continue without redirect
      }
    }

    // Handle old project URLs - redirect to home page projects section
    if (pathname.startsWith('/project/') || pathname.startsWith('/projects/')) {
      try {
        const url = request.nextUrl.clone();
        url.pathname = '/';
        url.hash = '#past-work';
        return NextResponse.redirect(url, 301);
      } catch (redirectError) {
        console.error('[Middleware] Failed to handle project URL redirect:', redirectError);
        // Continue without redirect
      }
    }

    // Add canonical URL header for better SEO
    try {
      const canonicalUrl = `${siteConfig.siteUrl}${pathname}`;
      response.headers.set('Link', `<${canonicalUrl}>; rel="canonical"`);
    } catch (canonicalError) {
      console.error('[Middleware] Failed to set canonical URL header:', canonicalError);
      // Continue without canonical header
    }

    // Add performance and monitoring headers
    try {
      response.headers.set('X-Middleware-Cache', 'HIT');
      response.headers.set('X-Middleware-Time', Date.now().toString());
    } catch (performanceError) {
      console.error('[Middleware] Failed to set performance headers:', performanceError);
      // Continue without performance headers
    }

    return response;
  } catch (error) {
    // Log the error but don't break the request
    console.error('[Middleware] Critical error in middleware:', error);
    
    // Return a basic response to prevent complete failure
    const fallbackResponse = NextResponse.next();
    
    // Try to add at least basic security headers
    try {
      fallbackResponse.headers.set('X-Content-Type-Options', 'nosniff');
      fallbackResponse.headers.set('X-Frame-Options', 'DENY');
    } catch (fallbackError) {
      console.error('[Middleware] Failed to set fallback headers:', fallbackError);
    }
    
    return fallbackResponse;
  }
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - robots.txt (robots file)
     * - sitemap.xml (sitemap file)
     * - google verification files
     */
    '/((?!api|_next/static|_next/image|favicon.ico|robots.txt|sitemap.xml|google.*\\.html).*)',
  ],
};