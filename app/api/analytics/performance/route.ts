import { NextRequest, NextResponse } from 'next/server';
import { PerformanceReport, WebVitalMetric } from '@/lib/analytics/core-web-vitals';

/**
 * Performance Analytics API Endpoint
 * Receives and processes Core Web Vitals and performance data
 */

interface PerformanceData extends PerformanceReport {
  // Additional fields for processing
  sessionId?: string;
  userId?: string;
}

/**
 * POST /api/analytics/performance
 * Receive performance metrics from client-side monitoring
 */
export async function POST(request: NextRequest) {
  try {
    const data: PerformanceData = await request.json();

    // Validate required fields
    if (!data.url || !data.timestamp || !Array.isArray(data.metrics)) {
      return NextResponse.json(
        { error: 'Invalid performance data format' },
        { status: 400 }
      );
    }

    // Process the performance data
    const processedData = await processPerformanceData(data);

    // In production, you would:
    // 1. Store data in a database (e.g., PostgreSQL, MongoDB)
    // 2. Send to analytics services (e.g., Google Analytics, DataDog)
    // 3. Trigger alerts for poor performance
    // 4. Update performance dashboards

    // For now, we'll log the data and return success
    console.log('📊 Performance Report Received:', {
      url: data.url,
      deviceType: data.deviceType,
      connectionType: data.connectionType,
      metricsCount: data.metrics.length,
      timestamp: new Date(data.timestamp).toISOString(),
    });

    // Log individual metrics
    data.metrics.forEach(metric => {
      console.log(`  ${metric.name}: ${formatMetricForLogging(metric)}`);
    });

    return NextResponse.json({
      success: true,
      processed: processedData,
      timestamp: Date.now(),
    });

  } catch (error) {
    console.error('Error processing performance data:', error);
    
    return NextResponse.json(
      { error: 'Failed to process performance data' },
      { status: 500 }
    );
  }
}

/**
 * GET /api/analytics/performance
 * Retrieve performance analytics (for dashboard/reporting)
 */
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    const startDate = searchParams.get('startDate');
    const endDate = searchParams.get('endDate');
    const deviceType = searchParams.get('deviceType');
    const url = searchParams.get('url');

    // In production, this would query your database
    // For now, return mock data structure
    const mockData = {
      summary: {
        totalReports: 0,
        averageScores: {
          LCP: { value: 0, rating: 'good' as const },
          FID: { value: 0, rating: 'good' as const },
          CLS: { value: 0, rating: 'good' as const },
          FCP: { value: 0, rating: 'good' as const },
          TTFB: { value: 0, rating: 'good' as const },
          INP: { value: 0, rating: 'good' as const },
        },
        deviceBreakdown: {
          mobile: 0,
          desktop: 0,
          tablet: 0,
        },
        performanceGrades: {
          A: 0,
          B: 0,
          C: 0,
          D: 0,
          F: 0,
        },
      },
      trends: [],
      topPages: [],
      filters: {
        startDate,
        endDate,
        deviceType,
        url,
      },
    };

    return NextResponse.json(mockData);

  } catch (error) {
    console.error('Error retrieving performance data:', error);
    
    return NextResponse.json(
      { error: 'Failed to retrieve performance data' },
      { status: 500 }
    );
  }
}

/**
 * Process and enrich performance data
 */
async function processPerformanceData(data: PerformanceData): Promise<{
  enriched: PerformanceData;
  alerts: string[];
  recommendations: string[];
}> {
  const alerts: string[] = [];
  const recommendations: string[] = [];

  // Check for performance issues and generate alerts
  data.metrics.forEach(metric => {
    if (metric.rating === 'poor') {
      alerts.push(`Poor ${metric.name} performance: ${formatMetricForLogging(metric)}`);
      
      // Generate specific recommendations
      switch (metric.name) {
        case 'LCP':
          recommendations.push('Optimize images and reduce server response times to improve LCP');
          break;
        case 'FID':
          recommendations.push('Reduce JavaScript execution time and optimize event handlers for better FID');
          break;
        case 'CLS':
          recommendations.push('Set explicit dimensions for images and ads to prevent layout shifts');
          break;
        case 'FCP':
          recommendations.push('Optimize critical rendering path and reduce render-blocking resources');
          break;
        case 'TTFB':
          recommendations.push('Optimize server response times and consider using a CDN');
          break;
        case 'INP':
          recommendations.push('Optimize JavaScript and reduce main thread blocking for better INP');
          break;
      }
    }
  });

  // Enrich data with additional context
  const enriched: PerformanceData = {
    ...data,
    sessionId: generateSessionId(),
    // Add more enrichment as needed
  };

  return {
    enriched,
    alerts,
    recommendations,
  };
}

/**
 * Format metric for logging
 */
function formatMetricForLogging(metric: WebVitalMetric): string {
  const value = metric.name === 'CLS' 
    ? metric.value.toFixed(3)
    : `${Math.round(metric.value)}ms`;
  
  return `${value} (${metric.rating})`;
}

/**
 * Generate a session ID for tracking
 */
function generateSessionId(): string {
  return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
}

/**
 * Validate metric data
 */
function isValidMetric(metric: any): metric is WebVitalMetric {
  return (
    typeof metric === 'object' &&
    typeof metric.name === 'string' &&
    typeof metric.value === 'number' &&
    typeof metric.rating === 'string' &&
    typeof metric.delta === 'number' &&
    typeof metric.id === 'string' &&
    typeof metric.navigationType === 'string' &&
    ['CLS', 'FID', 'FCP', 'LCP', 'TTFB', 'INP'].includes(metric.name) &&
    ['good', 'needs-improvement', 'poor'].includes(metric.rating)
  );
}