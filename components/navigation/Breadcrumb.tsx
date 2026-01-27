'use client';

import Link from 'next/link';
import { ChevronRight, Home } from 'lucide-react';
import { StructuredData } from '@/lib/seo';

export interface BreadcrumbItem {
  label: string;
  href: string;
  isCurrentPage?: boolean;
}

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  className?: string;
}

export const Breadcrumb = ({ items, className = '' }: BreadcrumbProps) => {
  // Generate BreadcrumbList structured data
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: item.label,
      item: `${process.env.NEXT_PUBLIC_SITE_URL || 'https://levyeromomedia.com'}${item.href}`
    }))
  };

  return (
    <>
      {/* Inject structured data */}
      <StructuredData data={breadcrumbSchema} />
      
      <nav 
        aria-label="Breadcrumb" 
        className={`flex items-center space-x-2 text-sm ${className}`}
      >
        <ol className="flex items-center space-x-2">
          {items.map((item, index) => (
            <li key={item.href} className="flex items-center">
              {index > 0 && (
                <ChevronRight 
                  className="h-4 w-4 text-gray-500 mx-2" 
                  aria-hidden="true" 
                />
              )}
              
              {item.isCurrentPage ? (
                <span 
                  className="text-gray-400 font-medium"
                  aria-current="page"
                >
                  {index === 0 && (
                    <Home className="h-4 w-4 inline mr-1" aria-hidden="true" />
                  )}
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className="text-gray-300 hover:text-blue-400 transition-colors duration-200 flex items-center"
                >
                  {index === 0 && (
                    <Home className="h-4 w-4 inline mr-1" aria-hidden="true" />
                  )}
                  {item.label}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
    </>
  );
};

// Helper function to generate breadcrumb items based on pathname
export const generateBreadcrumbs = (pathname: string): BreadcrumbItem[] => {
  const segments = pathname.split('/').filter(Boolean);
  const breadcrumbs: BreadcrumbItem[] = [
    { label: 'Home', href: '/' }
  ];

  let currentPath = '';
  
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`;
    const isLast = index === segments.length - 1;
    
    // Convert segment to readable label
    let label = segment
      .split('-')
      .map(word => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' ');
    
    // Special cases for known routes
    if (segment === 'contact') {
      label = 'Contact';
    } else if (segment === 'about') {
      label = 'About';
    }
    
    breadcrumbs.push({
      label,
      href: currentPath,
      isCurrentPage: isLast
    });
  });

  return breadcrumbs;
};