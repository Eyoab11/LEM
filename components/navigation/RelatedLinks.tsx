'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { motion } from 'framer-motion';
import { getRelatedLinks, InternalLink } from '@/lib/navigation/internal-links';

interface RelatedLinksProps {
  title?: string;
  customLinks?: InternalLink[];
  className?: string;
  maxLinks?: number;
}

export const RelatedLinks = ({ 
  title = "Related Pages", 
  customLinks, 
  className = "",
  maxLinks = 4 
}: RelatedLinksProps) => {
  const pathname = usePathname();
  const links = customLinks || getRelatedLinks(pathname);
  const displayLinks = links.slice(0, maxLinks);

  if (displayLinks.length === 0) {
    return null;
  }

  return (
    <section className={`py-12 ${className}`}>
      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          <h2 className="text-2xl md:text-3xl font-bold text-white mb-8 text-center">
            {title}
          </h2>
          
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {displayLinks.map((link, index) => (
              <motion.div
                key={link.href}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
              >
                <Link
                  href={link.href}
                  className="group block p-6 bg-gray-900/40 backdrop-blur-sm rounded-xl border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300 h-full"
                >
                  <h3 className="text-lg font-semibold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                    {link.title.split(' - ')[0]}
                  </h3>
                  {link.description && (
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {link.description}
                    </p>
                  )}
                  <div className="mt-4 text-blue-400 text-sm font-medium group-hover:text-blue-300 transition-colors duration-300">
                    Learn more →
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};