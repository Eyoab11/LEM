'use client';

import { motion } from 'framer-motion';

export const LogoCarousel = () => {
  const logos = [
    { name: 'Power Rangers', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR42rDDP4NmZ4WzEB0qkTT8W1jd1Uf5zz2V5g&s' },
    { name: 'Spider-Man', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSueckjDhF3J-JuMa-jFT4EMH2oiQeerj2Nhg&s' },
    { name: 'Digimon', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQGAFUhfBH7CPGogd0pbdaVFGo3U-Ab6MdVhA&s' },
    { name: 'Logo', url: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQSfaif-NkEFxzWe_m4ISEHATIYXMweOsh_Dw&s' },
  ];

  // Triple the logos for seamless infinite scroll
  const infiniteLogos = [...logos, ...logos, ...logos];

  return (
    <section className="min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-16 py-12">
      {/* Left fade overlay */}
      <div className="absolute left-0 top-0 bottom-0 w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
      
      {/* Right fade overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

      {/* Carousel Container with margins */}
      <div className="w-full max-w-6xl mx-auto overflow-hidden">
        <div className="relative">
          <motion.div
            className="flex items-center gap-12"
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
                  className="h-16 w-auto object-contain grayscale transition-all duration-300"
                />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};