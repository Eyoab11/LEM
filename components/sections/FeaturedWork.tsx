'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import { Button } from '../ui/Button';

export const FeaturedWork = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  // Transform scale based on scroll progress
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.7, 1, 1]);
  const opacity = useTransform(scrollYProgress, [0, 0.3, 1], [0.3, 1, 1]);
  const y = useTransform(scrollYProgress, [0, 0.5, 1], [100, 0, 0]);

  return (
    <section 
      ref={containerRef}
      className="min-h-[150vh] bg-black flex items-center justify-center px-8 py-32"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20"
        >
          {/* Decorative line */}
          <motion.div 
            className="w-16 h-0.5 bg-white mx-auto mb-8"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
          <motion.h2 
            className="text-4xl md:text-5xl font-bold text-white tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            FEATURED WORK
          </motion.h2>
        </motion.div>

        {/* Featured Card with Scroll Animation */}
        <motion.div
          style={{ 
            scale,
            opacity,
            y
          }}
          className="relative max-w-6xl mx-auto"
        >
          {/* Main Card Container */}
          <motion.div
            className="bg-gray-900/40 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-800/50 shadow-2xl"
            whileHover={{ 
              scale: 1.02,
              transition: { duration: 0.3, ease: "easeOut" }
            }}
          >
            <div className="grid md:grid-cols-2 gap-0">
              {/* Left Content */}
              <motion.div 
                className="p-12 lg:p-16 flex flex-col justify-center"
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
              >
                {/* Small decorative line */}
                <motion.div 
                  className="w-12 h-0.5 bg-white mb-8"
                  initial={{ width: 0 }}
                  whileInView={{ width: 48 }}
                  transition={{ duration: 0.6, delay: 0.5 }}
                  viewport={{ once: true }}
                />
                
                {/* Title */}
                <motion.h3 
                  className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight"
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.6 }}
                  viewport={{ once: true }}
                >
                  MIGHTY MORPHIN<br />
                  POWER RANGERS
                </motion.h3>
                
                {/* Description */}
                <motion.p 
                  className="text-gray-300 text-base lg:text-lg leading-relaxed mb-10 max-w-lg"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 0.8 }}
                  viewport={{ once: true }}
                >
                  A franchise co-created under the leadership of Shuki Levy that became one of the highest-grossing children's properties of all time, generating $6.47 billion in licensed merchandise and captivating audiences in over 150 countries. This world-building blueprint remains foundational to LEM's creative model.
                </motion.p>
                
                {/* CTA Button */}
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.8, delay: 1 }}
                  viewport={{ once: true }}
                >
                  <Button 
                    variant="outline" 
                    size="md"
                    className="text-gray-300 border-gray-600 hover:border-white hover:text-white"
                  >
                    Contact me
                  </Button>
                </motion.div>
              </motion.div>

              {/* Right Image */}
              <motion.div 
                className="relative h-96 md:h-auto min-h-[500px]"
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 1, delay: 0.4, ease: "easeOut" }}
                viewport={{ once: true, margin: "-50px" }}
              >
                <motion.div 
                  className="w-full h-full bg-cover bg-center rounded-r-3xl"
                  style={{
                    backgroundImage: `url('https://images.unsplash.com/photo-1578662996442-48f60103fc96?q=80&w=800&auto=format&fit=crop')`
                  }}
                  whileHover={{ 
                    scale: 1.05,
                    transition: { duration: 0.4, ease: "easeOut" }
                  }}
                >
                  {/* Overlay for better text contrast */}
                  <div className="absolute inset-0 bg-gradient-to-l from-transparent to-gray-900/20 rounded-r-3xl"></div>
                </motion.div>
                
                {/* Small indicator dot */}
                <motion.div 
                  className="absolute top-8 right-8 w-3 h-3 bg-white rounded-full opacity-60"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ duration: 0.4, delay: 1.2, type: "spring" }}
                  viewport={{ once: true }}
                />
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};