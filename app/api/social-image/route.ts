import { NextRequest, NextResponse } from 'next/server';
import { generateSocialImageConfig, generateSocialImageHTML } from '@/lib/seo/social-image-generator';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const title = searchParams.get('title') || 'Levy Eromo Media';
    const subtitle = searchParams.get('subtitle') || '';
    const platform = (searchParams.get('platform') || 'og') as 'openGraph' | 'twitter' | 'linkedin';
    const category = searchParams.get('category') || '';
    
    // Map platform parameter to internal format
    const platformMap = {
      'og': 'openGraph' as const,
      'twitter': 'twitter' as const,
      'linkedin': 'linkedin' as const,
    };
    
    const mappedPlatform = platformMap[platform as keyof typeof platformMap] || 'openGraph';
    
    // Generate image configuration
    const config = generateSocialImageConfig({
      title,
      subtitle: subtitle || undefined,
      platform: mappedPlatform,
      category: category || undefined,
    });
    
    // Generate HTML for the image
    const html = generateSocialImageHTML(config);
    
    // In a production environment, you would use a service like:
    // - Puppeteer to render HTML to image
    // - Canvas API to draw the image
    // - External service like Bannerbear, Placid, or similar
    
    // For now, return the HTML that could be rendered to an image
    const fullHTML = `
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>
            body { margin: 0; padding: 0; }
          </style>
        </head>
        <body>
          ${html}
        </body>
      </html>
    `;
    
    // Return HTML response for now (in production, this would return an image)
    return new NextResponse(fullHTML, {
      headers: {
        'Content-Type': 'text/html',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });
    
  } catch (error) {
    console.error('Error generating social image:', error);
    
    return NextResponse.json(
      { error: 'Failed to generate social image' },
      { status: 500 }
    );
  }
}

// Example implementation with image generation (commented out)
/*
import puppeteer from 'puppeteer';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const title = searchParams.get('title') || 'Levy Eromo Media';
    const subtitle = searchParams.get('subtitle') || '';
    const platform = (searchParams.get('platform') || 'og') as 'openGraph' | 'twitter' | 'linkedin';
    const category = searchParams.get('category') || '';
    
    const platformMap = {
      'og': 'openGraph' as const,
      'twitter': 'twitter' as const,
      'linkedin': 'linkedin' as const,
    };
    
    const mappedPlatform = platformMap[platform as keyof typeof platformMap] || 'openGraph';
    
    const config = generateSocialImageConfig({
      title,
      subtitle: subtitle || undefined,
      platform: mappedPlatform,
      category: category || undefined,
    });
    
    const html = generateSocialImageHTML(config);
    
    // Launch Puppeteer
    const browser = await puppeteer.launch({
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    });
    
    const page = await browser.newPage();
    
    // Set viewport to match image dimensions
    await page.setViewport({
      width: config.width,
      height: config.height,
      deviceScaleFactor: 1,
    });
    
    // Set HTML content
    await page.setContent(`
      <!DOCTYPE html>
      <html>
        <head>
          <meta charset="utf-8">
          <style>body { margin: 0; padding: 0; }</style>
        </head>
        <body>${html}</body>
      </html>
    `);
    
    // Take screenshot
    const screenshot = await page.screenshot({
      type: 'jpeg',
      quality: 90,
      fullPage: true,
    });
    
    await browser.close();
    
    return new NextResponse(screenshot, {
      headers: {
        'Content-Type': 'image/jpeg',
        'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
      },
    });
    
  } catch (error) {
    console.error('Error generating social image:', error);
    
    return NextResponse.json(
      { error: 'Failed to generate social image' },
      { status: 500 }
    );
  }
}
*/