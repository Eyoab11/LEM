'use client';

import { usePathname } from 'next/navigation';
import { Breadcrumb, generateBreadcrumbs } from './Breadcrumb';

interface BreadcrumbWrapperProps {
  className?: string;
}

export const BreadcrumbWrapper = ({ className }: BreadcrumbWrapperProps) => {
  const pathname = usePathname();
  
  // Don't show breadcrumbs on the home page
  if (pathname === '/') {
    return null;
  }
  
  const breadcrumbs = generateBreadcrumbs(pathname);
  
  return <Breadcrumb items={breadcrumbs} className={className} />;
};