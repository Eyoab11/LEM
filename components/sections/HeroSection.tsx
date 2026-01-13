'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '../ui/Button';
import { Play } from 'lucide-react';

export const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0 z-0">
        <div 
          className="w-full h-full bg-cover bg-center bg-no-repeat grayscale"
          style={{
            backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.7), rgba(0, 0, 0, 0.7)), url('/power.jpg')`
          }}
        />
      </div>

      {/* Content */}
      <div className="relative z-10 text-center max-w-4xl mx-auto px-6">
        {/* Badge with Rotating Disk */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="inline-flex items-center gap-4 bg-white/10 backdrop-blur-sm rounded-full px-8 py-4 mb-8 border border-white/20"
        >
          {/* Rotating Disk */}
          <div className="relative">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="w-12 h-12 rounded-full border-2 border-orange-500 relative overflow-hidden"
            >
              {/* Disk Image */}
              <div 
                className="w-full h-full bg-cover bg-center"
                style={{
                  backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR966p5PDMZiGo7QWtwpS0JK6trL6RG9c7KpA&s')`
                }}
              />
              {/* Center Hole */}
              <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-black rounded-full border border-orange-500"></div>
            </motion.div>
          </div>
          <span className="text-white text-base font-medium">Music Composer & Producer</span>
        </motion.div>

        {/* Main Heading */}
        <motion.h1
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-5xl md:text-7xl font-bold text-white mb-6 leading-tight"
        >
          LEVY EROMO MEDIA
        </motion.h1>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.6 }}
          className="text-gray-300 text-lg md:text-xl mb-8 max-w-2xl mx-auto leading-relaxed"
        >
          A new global studio born from the architect of one of<br />
          the most successful children's franchises in history.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="mb-12"
        >
          <Link href="/contact">
            <Button variant="primary" size="lg">
              Let's Talk Music
            </Button>
          </Link>
        </motion.div>

        {/* Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.0 }}
          className="text-white mb-16"
        >
          <span className="text-lg font-medium">200+ credited works</span>
        </motion.div>
      </div>

      {/* Enhanced Audio Visualizer - Fewer Bars with More Space Between */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-32 left-1/2 transform -translate-x-1/2"
      >
        <div className="flex items-end gap-8 h-32 w-[1000px] justify-center">
          {Array.from({ length: 25 }).map((_, i) => (
            <motion.div
              key={i}
              className="w-1.5 bg-gray-500 rounded-full"
              animate={{
                height: [8, Math.random() * 60 + 8, 8],
              }}
              transition={{
                duration: 2.5,
                repeat: Infinity,
                delay: i * 0.08,
                ease: "easeInOut"
              }}
            />
          ))}
        </div>
      </motion.div>

      {/* Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.5 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
      >
        <motion.div
          animate={{ y: [0, 10, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
          className="w-6 h-10 border-2 border-white/30 rounded-full flex justify-center"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-1 h-3 bg-white/50 rounded-full mt-2"
          />
        </motion.div>
      </motion.div>
    </section>
  );
};