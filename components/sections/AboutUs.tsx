'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import { Button } from '../ui/Button';

export const AboutUs = () => {
  const values = [
    {
      id: 1,
      number: "1",
      title: "VISION",
      description: "Every record begins with a clear vision. I shape raw ideas into music that feels intentional, timeless, and emotionally powerful.",
      position: "top-left"
    },
    {
      id: 2,
      number: "2",
      title: "CRAFT",
      description: "Details matter. From sound design to final polish, I approach every track with precision and care that makes the music shine.",
      position: "top-right"
    },
    {
      id: 3,
      number: "3",
      title: "TRUST",
      description: "Collaboration only works with trust. I keep communication open, deadlines tight, and always deliver what I promise without compromise.",
      position: "bottom-left"
    },
    {
      id: 4,
      number: "4",
      title: "ENERGY",
      description: "Music should move people. I focus on creating productions that carry energy—tracks that connect instantly and stay with listeners.",
      position: "bottom-right"
    }
  ];

  const getPositionClasses = (position: string) => {
    switch (position) {
      case 'top-left':
        return 'lg:absolute lg:top-8 lg:left-8';
      case 'top-right':
        return 'lg:absolute lg:top-8 lg:right-8';
      case 'bottom-left':
        return 'lg:absolute lg:bottom-8 lg:left-8';
      case 'bottom-right':
        return 'lg:absolute lg:bottom-8 lg:right-8';
      default:
        return '';
    }
  };

  return (
    <section id="about-us" className="h-screen bg-black flex items-center justify-center px-8">
      <div className="max-w-6xl mx-auto w-full">
        {/* Section Header - Reduced spacing */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="text-center mb-12"
        >
          {/* Decorative line */}
          <motion.div 
            className="w-16 h-0.5 bg-gradient-to-r from-blue-500 via-white to-blue-500 mx-auto mb-6"
            initial={{ width: 0 }}
            whileInView={{ width: 64 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            viewport={{ once: true }}
          />
          <motion.h2 
            className="text-4xl md:text-5xl lg:text-6xl font-bold text-white tracking-wide"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            viewport={{ once: true }}
          >
            About Levy Eromo Media
          </motion.h2>
          
          {/* Description paragraph */}
          <motion.p
            className="text-gray-300 text-lg md:text-xl leading-relaxed max-w-4xl mx-auto mt-8"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.6 }}
            viewport={{ once: true }}
          >
            Levy Eromo Media is a global, family-centric entertainment studio powered by world-class creative talent with a decades-long track record of building iconic franchises for children and families worldwide. With music at its core, LEM uniquely blends storytelling and chart-defining compositions to create emotionally resonant brands that travel across cultures and generations.
          </motion.p>
        </motion.div>

        {/* Main Content Area - Reduced height */}
        <div className="relative h-[500px] flex items-center justify-center">
          {/* Central Portrait - Smaller to fit screen */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
            viewport={{ once: true }}
            className="relative z-10"
          >
            <div className="w-80 h-[450px] rounded-2xl overflow-hidden shadow-2xl border border-gray-800/30">
              <div 
                className="w-full h-full bg-cover bg-center bg-gradient-to-b from-transparent to-black/20"
                style={{
                  backgroundImage: `url('https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR966p5PDMZiGo7QWtwpS0JK6trL6RG9c7KpA&s')`
                }}
              />
            </div>
          </motion.div>

          {/* Value Cards - Absolutely Transparent, Typography Matching Image */}
          {values.map((value, index) => (
            <motion.div
              key={value.id}
              initial={{ opacity: 0, y: 30, scale: 0.9 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.6 + index * 0.1, ease: "easeOut" }}
              viewport={{ once: true }}
              className={`w-72 ${getPositionClasses(value.position)}`}
            >
              {/* Completely Transparent Container */}
              <div className="text-center">
                {/* Large Number - Much Bigger and More Transparent */}
                <div className="text-7xl font-bold text-gray-600/30 mb-1 leading-none">
                  {value.number}
                </div>
                
                {/* Title - Much Bolder and Bigger */}
                <h3 className="text-2xl font-black text-white mb-4 tracking-wide">
                  {value.title}
                </h3>
                
                {/* Description - Centered and Proper Spacing */}
                <p className="text-gray-400 text-sm leading-relaxed text-center max-w-xs mx-auto">
                  {value.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 1.4 }}
          viewport={{ once: true }}
          className="text-center mt-8"
        >
          <Link href="/about">
            <Button variant="primary" size="lg">
              Learn More
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
};