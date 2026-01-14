'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '../ui/Button';

export const Header = () => {
  const navItems = [
    { name: 'Services', href: '/#featured-work' },
    { name: 'About', href: '/#about-us' },
    { name: 'Work', href: '/#past-work' },
    { name: 'Contact', href: '/contact' }
  ];

  return (
    <motion.header
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="absolute top-0 left-0 right-0 z-50 bg-transparent"
    >
      <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex-shrink-0">
          <motion.img
            src="/levi.png"
            alt="Levy Eromo Media"
            className="h-12 w-auto"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
          />
        </Link>

        {/* Navigation */}
        <nav className="hidden md:flex items-center gap-8">
          {navItems.map((item, index) => (
            <motion.div
              key={item.name}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
            >
              <Link
                href={item.href}
                className="relative text-gray-300 hover:text-blue-400 transition-colors duration-300 group"
              >
                <motion.span
                  className="inline-block"
                  whileHover={{ 
                    y: [0, -4, 0],
                    transition: { 
                      duration: 0.4, 
                      ease: "easeInOut",
                      times: [0, 0.5, 1]
                    }
                  }}
                >
                  {item.name}
                </motion.span>
                {/* Underline that slides in from left - blue gradient */}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-blue-400 group-hover:w-full transition-all duration-300" />
              </Link>
            </motion.div>
          ))}
        </nav>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.4 }}
        >
          <Link href="/contact">
            <Button variant="outline" size="sm">
              Get in touch
            </Button>
          </Link>
        </motion.div>
      </div>
    </motion.header>
  );
};