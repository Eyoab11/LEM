'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';

export const PastWork = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  // Title animation
  const titleOpacity = useTransform(
    scrollYProgress,
    [0, 0.15, 0.8, 1],
    [0.3, 1, 1, 0]
  );

  const titleScale = useTransform(
    scrollYProgress,
    [0, 0.15, 0.8],
    [0.98, 1.02, 1]
  );

  // Description animation - appears after title
  const descriptionOpacity = useTransform(
    scrollYProgress,
    [0.1, 0.25, 0.85, 1],
    [0, 1, 1, 0]
  );

  const descriptionScale = useTransform(
    scrollYProgress,
    [0.1, 0.25, 0.85],
    [0.98, 1.01, 1]
  );

  // Subtle Y movements
  const titleY = useTransform(
    scrollYProgress,
    [0, 0.15, 1],
    [10, 0, -10]
  );

  const descriptionY = useTransform(
    scrollYProgress,
    [0.1, 0.25, 1],
    [15, 0, -15]
  );

  return (
    <section 
      ref={containerRef}
      className="h-[180vh] bg-black flex items-start justify-center pt-20"
    >
      <div className="sticky top-1/2 transform -translate-y-1/2 max-w-7xl mx-auto px-8">
        <div className="grid md:grid-cols-2 gap-16 items-center">
          {/* Left Side - Title */}
          <div className="text-left">
            {/* Decorative line */}
            <motion.div 
              className="w-12 h-0.5 bg-white mb-8"
              style={{ opacity: titleOpacity }}
            />
            
            <motion.h2
              style={{ 
                opacity: titleOpacity,
                scale: titleScale,
                y: titleY
              }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide transition-all duration-300 ease-out"
            >
              PAST WORK
            </motion.h2>
          </div>

          {/* Right Side - Description */}
          <div className="text-left">
            <motion.p
              style={{ 
                opacity: descriptionOpacity,
                scale: descriptionScale,
                y: descriptionY
              }}
              className="text-base md:text-lg text-gray-300 leading-relaxed transition-all duration-300 ease-out"
            >
              Where legendary world-builders, visionary composers, and the creative force behind some of the most iconic global franchises unite to redefine animation for the next century. We don't follow the magic. We invent it. Welcome to the studio built by the creator whose work shaped the childhood of millions and launched one of the most successful live-action/animated franchises in history.
            </motion.p>
          </div>
        </div>
      </div>
    </section>
  );
};