'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from './Button';

export interface CTAProps {
  title: string;
  subtitle?: string;
  description: string;
  primaryAction: {
    text: string;
    href: string;
    variant?: 'primary' | 'secondary';
  };
  secondaryAction?: {
    text: string;
    href: string;
    variant?: 'primary' | 'secondary';
  };
  className?: string;
  showDecorator?: boolean;
}

export const CallToAction = ({
  title,
  subtitle,
  description,
  primaryAction,
  secondaryAction,
  className = '',
  showDecorator = true
}: CTAProps) => {
  return (
    <section className={`py-20 px-6 ${className}`}>
      <div className="max-w-4xl mx-auto text-center">
        {/* Decorative line */}
        {showDecorator && (
          <motion.div
            className="w-16 h-0.5 bg-gradient-to-r from-blue-500 via-white to-blue-500 mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
        )}

        {/* Main heading */}
        <motion.h2
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          viewport={{ once: true }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-6"
        >
          {title}
        </motion.h2>

        {/* Subtitle */}
        {subtitle && (
          <motion.h3
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
            className="text-xl md:text-2xl text-gray-300 mb-6 font-semibold"
          >
            {subtitle}
          </motion.h3>
        )}

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.5 }}
          viewport={{ once: true }}
          className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto leading-relaxed"
        >
          {description}
        </motion.p>

        {/* Action buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          viewport={{ once: true }}
          className="flex flex-col sm:flex-row gap-6 justify-center items-center"
        >
          <Link href={primaryAction.href}>
            <Button 
              variant={primaryAction.variant || 'primary'} 
              size="lg"
            >
              {primaryAction.text}
            </Button>
          </Link>

          {secondaryAction && (
            <Link href={secondaryAction.href}>
              <Button 
                variant={secondaryAction.variant || 'secondary'} 
                size="lg"
              >
                {secondaryAction.text}
              </Button>
            </Link>
          )}
        </motion.div>
      </div>
    </section>
  );
};