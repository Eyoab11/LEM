'use client';

import { useEffect } from 'react';
import { trackViewItem, trackEvent } from '@/lib/analytics';

interface ProjectViewTrackerProps {
  projectId: string;
  projectTitle: string;
  category: string;
}

export function ProjectViewTracker({ projectId, projectTitle, category }: ProjectViewTrackerProps) {
  useEffect(() => {
    // Track project view
    trackViewItem(projectId, projectTitle, category);
    
    // Track custom project engagement event
    trackEvent('project_view', {
      project_id: projectId,
      project_title: projectTitle,
      project_category: category,
      page_location: window.location.href
    });
  }, [projectId, projectTitle, category]);

  return null; // This component doesn't render anything
}