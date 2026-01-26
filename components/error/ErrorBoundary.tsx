'use client';

import React, { Component, ReactNode } from 'react';
import { trackEvent } from '@/lib/analytics';
import { Button } from '@/components/ui/Button';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void;
}

interface State {
  hasError: boolean;
  error?: Error;
}

/**
 * Error Boundary Component
 * Catches JavaScript errors in child components and displays fallback UI
 */
export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    // Log error to analytics
    trackEvent('component_error_boundary', {
      error_message: error.message,
      error_stack: error.stack?.substring(0, 500),
      component_stack: errorInfo.componentStack?.substring(0, 500),
      page_location: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
    });

    // Call custom error handler if provided
    if (this.props.onError) {
      this.props.onError(error, errorInfo);
    }

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error('Error Boundary caught an error:', error, errorInfo);
    }
  }

  render() {
    if (this.state.hasError) {
      // Custom fallback UI
      if (this.props.fallback) {
        return this.props.fallback;
      }

      // Default fallback UI
      return (
        <div className="bg-gray-900 border border-red-500/20 rounded-lg p-6 my-4">
          <div className="flex items-center mb-4">
            <div className="w-8 h-8 bg-red-500/20 rounded-full flex items-center justify-center mr-3">
              <span className="text-red-400 text-sm">⚠</span>
            </div>
            <h3 className="text-lg font-semibold text-white">
              Component Error
            </h3>
          </div>
          
          <p className="text-gray-300 mb-4">
            This component encountered an error and couldn't render properly.
          </p>
          
          <Button
            onClick={() => this.setState({ hasError: false, error: undefined })}
            variant="outline"
            size="sm"
          >
            Try Again
          </Button>
          
          {process.env.NODE_ENV === 'development' && this.state.error && (
            <details className="mt-4">
              <summary className="cursor-pointer text-red-400 text-sm font-semibold mb-2">
                Error Details (Development Only)
              </summary>
              <pre className="text-xs text-gray-400 bg-black/50 p-3 rounded overflow-auto">
                {this.state.error.message}
                {this.state.error.stack && (
                  <>
                    {'\n\nStack Trace:\n'}
                    {this.state.error.stack}
                  </>
                )}
              </pre>
            </details>
          )}
        </div>
      );
    }

    return this.props.children;
  }
}

/**
 * HOC for wrapping components with error boundary
 */
export function withErrorBoundary<P extends object>(
  Component: React.ComponentType<P>,
  fallback?: ReactNode,
  onError?: (error: Error, errorInfo: React.ErrorInfo) => void
) {
  const WrappedComponent = (props: P) => (
    <ErrorBoundary fallback={fallback} onError={onError}>
      <Component {...props} />
    </ErrorBoundary>
  );

  WrappedComponent.displayName = `withErrorBoundary(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}

/**
 * Hook for handling async errors in functional components
 */
export function useErrorHandler() {
  return (error: Error, context?: string) => {
    // Log error to analytics
    trackEvent('async_error_handled', {
      error_message: error.message,
      error_context: context || 'unknown',
      page_location: typeof window !== 'undefined' ? window.location.pathname : 'unknown',
    });

    // Log to console in development
    if (process.env.NODE_ENV === 'development') {
      console.error(`Async error in ${context}:`, error);
    }

    // In production, you might want to show a toast notification
    // or handle the error in some other way
  };
}