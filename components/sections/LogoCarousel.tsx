'use client';

import { motion } from 'framer-motion';

export const LogoCarousel = () => {
  // Placeholder logos - you can replace these with actual logo URLs later
  const logos = [
    { name: 'Rotten Tomatoes', url: 'https://via.placeholder.com/150x60/666666/ffffff?text=Rotten+Tomatoes' },
    { name: 'Power Rangers', url: 'https://via.placeholder.com/150x60/666666/ffffff?text=Power+Rangers' },
    { name: 'Spider-Man', url: 'https://via.placeholder.com/150x60/666666/ffffff?text=Spider-Man' },
    { name: 'Digimon', url: 'https://via.placeholder.com/150x60/666666/ffffff?text=DIGIMON' },
    { name: 'Logo Ipsum', url: 'https://via.placeholder.com/150x60/666666/ffffff?text=logo+ipsum' },
    { name: 'Sabai', url: 'https://via.placeholder.com/150x60/666666/ffffff?text=SABAI' },
  ];

  // Triple the logos for seamless infinite scroll
  const infiniteLogos = [...logos, ...logos, ...logos];

  return (
    <section className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-16 py-20">
      {/* Left fade overlay */}
      <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
      
      {/* Right fade overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

      {/* Carousel Container with margins */}
      <div className="w-full max-w-6xl mx-auto overflow-hidden">
        <div className="relative">
          <motion.div
            className="flex items-center gap-20"
            animate={{
              x: [`0%`, `-${100 / 3}%`],
            }}
            transition={{
              duration: 25,
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ width: '300%' }}
          >
            {infiniteLogos.map((logo, index) => (
              <motion.div
                key={`${logo.name}-${index}`}
                className="flex-shrink-0 opacity-50 hover:opacity-100 transition-opacity duration-300"
                whileHover={{ scale: 1.1 }}
              >
                <img
                  src={logo.url}
                  alt={logo.name}
                  className="h-16 w-auto object-contain filter grayscale hover:grayscale-0 transition-all duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};