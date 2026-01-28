import { NextRequest, NextResponse } from 'next/server';
import { readFile } from 'fs/promises';
import { join } from 'path';

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url);
    
    const title = searchParams.get('title') || 'Levy Eromo Media';
    const platform = searchParams.get('platform') || 'og';
    const category = searchParams.get('category') || '';
    
    // Map platform and category to existing social images
    let imagePath = '/social/og-default.jpg';
    
    if (category) {
      switch (category.toLowerCase()) {
        case 'power-rangers':
          imagePath = '/social/projects/power-rangers-og.jpg';
          break;
        case 'animation':
          imagePath = '/social/projects/animation-og.jpg';
          break;
        case 'contact':
          imagePath = '/social/contact-og.jpg';
          break;
        case 'blog':
          imagePath = '/social/blog-og.jpg';
          break;
        default:
          imagePath = '/social/og-default.jpg';
      }
    }
    
    // Platform-specific images
    switch (platform) {
      case 'twitter':
        imagePath = '/social/twitter-card.jpg';
        break;
      case 'linkedin':
        imagePath = '/social/linkedin-banner.jpg';
        break;
      case 'facebook':
        imagePath = '/social/facebook-cover.jpg';
        break;
    }
    
    try {
      // Try to read the specific image file
      const publicPath = join(process.cwd(), 'public', imagePath);
      const imageBuffer = await readFile(publicPath);
      
      // Determine content type
      const contentType = imagePath.endsWith('.png') ? 'image/png' : 'image/jpeg';
      
      return new NextResponse(imageBuffer, {
        headers: {
          'Content-Type': contentType,
          'Cache-Control': 'public, max-age=86400', // Cache for 24 hours
          'Content-Length': imageBuffer.length.toString(),
        },
      });
      
    } catch (fileError) {
      // Fallback to default image if specific image not found
      const fallbackPath = join(process.cwd(), 'public/social/og-default.jpg');
      const fallbackBuffer = await readFile(fallbackPath);
      
      return new NextResponse(fallbackBuffer, {
        headers: {
          'Content-Type': 'image/jpeg',
          'Cache-Control': 'public, max-age=86400',
          'Content-Length': fallbackBuffer.length.toString(),
        },
      });
    }
    
  } catch (error) {
    console.error('Error serving social image:', error);
    
    // Return a simple error response
    return NextResponse.json(
      { error: 'Failed to serve social image' },
      { status: 500 }
    );
  }
}