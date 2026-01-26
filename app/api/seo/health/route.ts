/**
 * SEO Health Check API Endpoint
 * Provides comprehensive SEO system health monitoring
 */

import { NextRequest, NextResponse } from 'next/server';
import { performSEOHealthCheck, DEFAULT_SEO_CONFIG } from '@/lib/seo/integration';
import { validateAllSiteImages } from '@/lib/seo/image-optimizer';
import { getSitemapStats, getAllSitemapEntries } from '@/lib/seo/sitemap';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const detailed = searchParams.get('detailed') === 'true';
    const includeImages = searchParams.get('images') === 'true';
    const includeSitemap = searchParams.get('sitemap') === 'true';

    // Perform basic health check
    const healthCheck = await performSEOHealthCheck(DEFAULT_SEO_CONFIG);

    const response: any = {
      timestamp: new Date().toISOString(),
      overall: healthCheck.overall,
      checks: healthCheck.checks,
    };

    // Add detailed information if requested
    if (detailed) {
      response.details = {
        environment: process.env.NODE_ENV,
        buildTime: process.env.NEXT_PUBLIC_BUILD_TIME,
        seoConfig: {
          enableStructuredData: DEFAULT_SEO_CONFIG.enableStructuredData,
          enableImageOptimization: DEFAULT_SEO_CONFIG.enableImageOptimization,
          enableContentFreshness: DEFAULT_SEO_CONFIG.enableContentFreshness,
          enableValidation: DEFAULT_SEO_CONFIG.enableValidation,
        },
      };
    }

    // Add image validation if requested
    if (includeImages) {
      try {
        const imageValidation = validateAllSiteImages();
        response.images = {
          totalImages: imageValidation.totalImages,
          validImages: imageValidation.validImages,
          overallScore: imageValidation.overallScore,
          results: imageValidation.results.slice(0, 10), // Limit to first 10 results
        };
      } catch (error) {
        response.images = {
          error: 'Failed to validate images',
          message: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    }

    // Add sitemap information if requested
    if (includeSitemap) {
      try {
        const sitemapEntries = getAllSitemapEntries();
        const sitemapStats = getSitemapStats(sitemapEntries);
        response.sitemap = sitemapStats;
      } catch (error) {
        response.sitemap = {
          error: 'Failed to get sitemap stats',
          message: error instanceof Error ? error.message : 'Unknown error',
        };
      }
    }

    // Set appropriate cache headers
    const headers = new Headers();
    headers.set('Content-Type', 'application/json');
    headers.set('Cache-Control', 'no-cache, no-store, must-revalidate');
    headers.set('Pragma', 'no-cache');
    headers.set('Expires', '0');

    return new NextResponse(JSON.stringify(response, null, 2), {
      status: 200,
      headers,
    });

  } catch (error) {
    console.error('[SEO Health API] Error:', error);

    const errorResponse = {
      timestamp: new Date().toISOString(),
      overall: 'error' as const,
      error: 'Failed to perform health check',
      message: error instanceof Error ? error.message : 'Unknown error',
      checks: [],
    };

    return new NextResponse(JSON.stringify(errorResponse, null, 2), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });
  }
}

// Handle POST requests for triggering health checks with custom config
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const config = { ...DEFAULT_SEO_CONFIG, ...body.config };

    const healthCheck = await performSEOHealthCheck(config);

    const response = {
      timestamp: new Date().toISOString(),
      overall: healthCheck.overall,
      checks: healthCheck.checks,
      config: config,
    };

    return new NextResponse(JSON.stringify(response, null, 2), {
      status: 200,
      headers: {
        'Content-Type': 'application/json',
        'Cache-Control': 'no-cache, no-store, must-revalidate',
      },
    });

  } catch (error) {
    console.error('[SEO Health API] POST Error:', error);

    const errorResponse = {
      timestamp: new Date().toISOString(),
      overall: 'error' as const,
      error: 'Failed to perform custom health check',
      message: error instanceof Error ? error.message : 'Unknown error',
    };

    return new NextResponse(JSON.stringify(errorResponse, null, 2), {
      status: 500,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
}