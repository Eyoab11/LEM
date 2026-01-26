'use client';

import Link from 'next/link';
import { getContextualLinks, generateAnchorText } from '@/lib/navigation/internal-links';

interface ContextualLinksProps {
  context: 'animation' | 'television' | 'music' | 'portfolio';
  inline?: boolean;
  className?: string;
}

export const ContextualLinks = ({ 
  context, 
  inline = false, 
  className = "" 
}: ContextualLinksProps) => {
  const links = getContextualLinks(context);

  if (inline) {
    return (
      <span className={className}>
        {links.slice(0, 2).map((link, index) => (
          <span key={link.href}>
            {index > 0 && ', '}
            <Link
              href={link.href}
              className="text-blue-400 hover:text-blue-300 transition-colors duration-200 underline"
            >
              {generateAnchorText(link, 'short')}
            </Link>
          </span>
        ))}
      </span>
    );
  }

  return (
    <div className={`space-y-2 ${className}`}>
      {links.slice(0, 3).map((link) => (
        <div key={link.href}>
          <Link
            href={link.href}
            className="text-blue-400 hover:text-blue-300 transition-colors duration-200 underline text-sm"
          >
            {generateAnchorText(link, 'short')}
          </Link>
          {link.description && (
            <p className="text-gray-500 text-xs mt-1">
              {link.description}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};