'use client';

import { motion } from 'framer-motion';
import { calculateFreshness, getContentFreshness } from '@/lib/seo/content-freshness';

export interface FreshnessIndicatorProps {
  path: string;
  className?: string;
  showIcon?: boolean;
}

export const FreshnessIndicator = ({ 
  path, 
  className = '', 
  showIcon = true 
}: FreshnessIndicatorProps) => {
  const contentFreshness = getContentFreshness(path);
  
  if (!contentFreshness) {
    return null;
  }

  const freshness = calculateFreshness(contentFreshness.lastUpdated);
  
  const getStatusColor = () => {
    switch (freshness.updateStatus) {
      case 'fresh':
        return 'text-green-400 border-green-400/30 bg-green-400/10';
      case 'moderate':
        return 'text-yellow-400 border-yellow-400/30 bg-yellow-400/10';
      case 'stale':
        return 'text-gray-400 border-gray-400/30 bg-gray-400/10';
      default:
        return 'text-gray-400 border-gray-400/30 bg-gray-400/10';
    }
  };

  const getIcon = () => {
    switch (freshness.updateStatus) {
      case 'fresh':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
        );
      case 'moderate':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
          </svg>
        );
      case 'stale':
        return (
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        );
      default:
        return null;
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.3 }}
      className={`inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-medium border ${getStatusColor()} ${className}`}
    >
      {showIcon && getIcon()}
      <span>{freshness.displayText}</span>
      <span className="text-xs opacity-70">v{contentFreshness.version}</span>
    </motion.div>
  );
};