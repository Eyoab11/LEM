'use client';

import { useEffect } from 'react';
import { Metadata } from 'next';
import { trackEvent } from '@/lib/analytics';
import { Button } from '@/components/ui/Button';

// Note: global-error.tsx must be a Client Component
export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // Log error to analytics
    trackEvent('error_boundary_triggered', {
      error_message: error.message,
      error_digest: error.digest,
      error_stack: error.stack?.substring(0, 500), // Truncate stack trace
      page_location: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
    });

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Global Error Boundary:', error);
    }
  }, [error]);

  return (
    <html lang="en">
      <body className="bg-black text-white min-h-screen flex items-center justify-center">
        <div className="max-w-2xl mx-auto text-center px-6">
          <div className="mb-8">
            <h1 className="text-6xl md:text-7xl font-bold text-transparent bg-gradient-to-r from-red-400 to-red-600 bg-clip-text mb-4">
              Oops!
            </h1>
            <div className="w-24 h-0.5 bg-gradient-to-r from-red-500 via-white to-red-500 mx-auto mb-8" />
          </div>
          
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-6">
            Something went wrong
          </h2>
          
          <p className="text-lg text-gray-300 leading-relaxed mb-8 max-w-xl mx-auto">
            We encountered an unexpected error. Our team has been notified and is working to fix this issue.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={reset}
              variant="primary" 
              size="lg"
            >
              Try Again
            </Button>
            
            <Button 
              onClick={() => window.location.href = '/'}
              variant="outline" 
              size="lg"
            >
              Go Home
            </Button>
          </div>
          
          {process.env.NODE_ENV === 'development' && (
            <details className="mt-8 text-left bg-gray-900 p-4 rounded-lg">
              <summary className="cursor-pointer text-red-400 font-semibold mb-2">
                Error Details (Development Only)
              </summary>
              <pre className="text-xs text-gray-300 overflow-auto">
                {error.message}
                {error.stack && (
                  <>
                    {'\n\nStack Trace:\n'}
                    {error.stack}
                  </>
                )}
              </pre>
            </details>
          )}
        </div>
      </body>
    </html>
  );
}