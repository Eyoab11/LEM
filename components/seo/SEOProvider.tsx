'use client';

import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import { 
  SEOIntegrationConfig, 
  DEFAULT_SEO_CONFIG, 
  initializeSEOIntegration,
  performSEOHealthCheck 
} from '@/lib/seo/integration';
import { trackEvent } from '@/lib/analytics';
import { useErrorHandler } from '@/components/error/ErrorBoundary';

interface SEOContextValue {
  config: SEOIntegrationConfig;
  healthStatus: 'healthy' | 'warning' | 'error' | 'checking';
  updateConfig: (newConfig: Partial<SEOIntegrationConfig>) => void;
  runHealthCheck: () => Promise<void>;
}

const SEOContext = createContext<SEOContextValue | undefined>(undefined);

interface SEOProviderProps {
  children: ReactNode;
  initialConfig?: Partial<SEOIntegrationConfig>;
  enableHealthCheck?: boolean;
}

/**
 * SEO Provider Component
 * Provides SEO configuration and health monitoring throughout the app
 */
export function SEOProvider({ 
  children, 
  initialConfig = {}, 
  enableHealthCheck = true 
}: SEOProviderProps) {
  const [config, setConfig] = useState<SEOIntegrationConfig>(() => 
    initializeSEOIntegration(initialConfig)
  );
  const [healthStatus, setHealthStatus] = useState<'healthy' | 'warning' | 'error' | 'checking'>('checking');
  const handleError = useErrorHandler();

  // Run initial health check
  useEffect(() => {
    if (!enableHealthCheck) {
      setHealthStatus('healthy');
      return;
    }

    const runInitialHealthCheck = async () => {
      try {
        const result = await performSEOHealthCheck(config);
        setHealthStatus(result.overall);

        // Track health check results
        trackEvent('seo_health_check', {
          status: result.overall,
          checks_passed: result.checks.filter(c => c.status === 'pass').length,
          checks_warning: result.checks.filter(c => c.status === 'warning').length,
          checks_failed: result.checks.filter(c => c.status === 'fail').length,
        });

        if (config.logErrors && result.overall !== 'healthy') {
          console.warn('[SEO Provider] Health check issues detected:', result.checks);
        }
      } catch (error) {
        setHealthStatus('error');
        handleError(error instanceof Error ? error : new Error(String(error)), 'SEO health check');
      }
    };

    runInitialHealthCheck();
  }, [config, enableHealthCheck, handleError]);

  // Update configuration
  const updateConfig = (newConfig: Partial<SEOIntegrationConfig>) => {
    setConfig(prevConfig => {
      const updatedConfig = { ...prevConfig, ...newConfig };
      
      if (updatedConfig.logErrors) {
        console.log('[SEO Provider] Configuration updated:', updatedConfig);
      }

      trackEvent('seo_config_updated', {
        changes: Object.keys(newConfig),
      });

      return updatedConfig;
    });
  };

  // Manual health check
  const runHealthCheck = async () => {
    setHealthStatus('checking');
    
    try {
      const result = await performSEOHealthCheck(config);
      setHealthStatus(result.overall);

      trackEvent('seo_manual_health_check', {
        status: result.overall,
        checks_passed: result.checks.filter(c => c.status === 'pass').length,
        checks_warning: result.checks.filter(c => c.status === 'warning').length,
        checks_failed: result.checks.filter(c => c.status === 'fail').length,
      });

      if (config.logErrors) {
        console.log('[SEO Provider] Manual health check completed:', result);
      }
    } catch (error) {
      setHealthStatus('error');
      handleError(error instanceof Error ? error : new Error(String(error)), 'SEO manual health check');
    }
  };

  const contextValue: SEOContextValue = {
    config,
    healthStatus,
    updateConfig,
    runHealthCheck,
  };

  return (
    <SEOContext.Provider value={contextValue}>
      {children}
      {/* Development health indicator */}
      {process.env.NODE_ENV === 'development' && enableHealthCheck && (
        <SEOHealthIndicator />
      )}
    </SEOContext.Provider>
  );
}

/**
 * Hook to use SEO context
 */
export function useSEO() {
  const context = useContext(SEOContext);
  if (context === undefined) {
    throw new Error('useSEO must be used within a SEOProvider');
  }
  return context;
}

/**
 * Development health indicator component
 */
function SEOHealthIndicator() {
  const { healthStatus, runHealthCheck } = useSEO();

  const getStatusColor = () => {
    switch (healthStatus) {
      case 'healthy': return '#10b981'; // green
      case 'warning': return '#f59e0b'; // yellow
      case 'error': return '#ef4444'; // red
      case 'checking': return '#6b7280'; // gray
      default: return '#6b7280';
    }
  };

  const getStatusIcon = () => {
    switch (healthStatus) {
      case 'healthy': return '✓';
      case 'warning': return '⚠';
      case 'error': return '✗';
      case 'checking': return '⟳';
      default: return '?';
    }
  };

  return (
    <div
      style={{
        position: 'fixed',
        bottom: '10px',
        right: '10px',
        background: 'rgba(0, 0, 0, 0.8)',
        color: 'white',
        padding: '8px 12px',
        borderRadius: '6px',
        fontSize: '12px',
        fontFamily: 'monospace',
        zIndex: 9999,
        border: `2px solid ${getStatusColor()}`,
        cursor: 'pointer',
      }}
      onClick={runHealthCheck}
      title="Click to run SEO health check"
    >
      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
        <span style={{ color: getStatusColor() }}>
          {getStatusIcon()}
        </span>
        <span>SEO: {healthStatus}</span>
      </div>
    </div>
  );
}

/**
 * HOC for components that need SEO context
 */
export function withSEO<P extends object>(Component: React.ComponentType<P>) {
  const WrappedComponent = (props: P) => {
    const seoContext = useSEO();
    return <Component {...props} seo={seoContext} />;
  };

  WrappedComponent.displayName = `withSEO(${Component.displayName || Component.name})`;
  
  return WrappedComponent;
}