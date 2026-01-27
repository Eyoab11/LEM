import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { Button } from '@/components/ui/Button';
import { generatePageMetadata } from '@/lib/seo';

// Generate specific metadata for the 404 page
export const metadata: Metadata = generatePageMetadata({
  title: 'Page Not Found',
  description: 'The page you are looking for could not be found. Explore our animation projects, learn about our services, or contact our team.',
  keywords: [
    '404 error',
    'page not found',
    'levy eromo media',
    'animation studio',
    'media production'
  ],
  canonical: '/404',
  noIndex: true, // Don't index 404 pages
});

export default function NotFound() {
  return (
    <main className="bg-black min-h-screen">
      <Header />
      
      {/* 404 Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <div className="mb-8">
            <h1 className="text-8xl md:text-9xl font-bold text-transparent bg-gradient-to-r from-blue-400 to-blue-600 bg-clip-text mb-4">
              404
            </h1>
            <div className="w-24 h-0.5 bg-gradient-to-r from-blue-500 via-white to-blue-500 mx-auto mb-8" />
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-6">
            Page Not Found
          </h2>
          
          <p className="text-xl text-gray-300 leading-relaxed mb-12 max-w-2xl mx-auto">
            The page you're looking for seems to have vanished into the animation multiverse. 
            Let's get you back to exploring our creative world.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/">
              <Button variant="primary" size="lg">
                Back to Home
              </Button>
            </Link>
            
            <Link href="/#past-work">
              <Button variant="outline" size="lg">
                View Our Work
              </Button>
            </Link>
            
            <Link href="/contact">
              <Button variant="outline" size="lg">
                Contact Us
              </Button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}