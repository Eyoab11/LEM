'use client';

import { motion } from 'framer-motion';

export const LogoCarousel = () => {
  const logos = [
    { name: 'Power Rangers', url: '/powerrangers.png', alt: 'Power Rangers logo' },
    { name: 'X-Men', url: '/xmen.png', alt: 'X-Men logo' },
    { name: 'Spider-Man', url: '/spiiderman.png', alt: 'Spider-Man logo' },
    { name: 'Inspector Gadget', url: '/inspectorgadget.png', alt: 'Inspector Gadget logo' },
    { name: 'Super Mario Bros. Super Show', url: '/supershow.png', alt: 'Super Mario Bros. Super Show logo' },
    { name: 'Rainbow Brite', url: '/rainbowbrite.png', alt: 'Rainbow Brite logo' },
    { name: 'The Incredible Hulk', url: '/theincrediblehulk.png', alt: 'The Incredible Hulk logo' },
  ];

  // Triple the logos for seamless infinite scroll
  const infiniteLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-8 md:py-12 lg:min-h-screen flex items-center justify-center bg-black relative overflow-hidden px-8 md:px-16">
      {/* Left fade overlay */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
      
      {/* Right fade overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

      {/* Carousel Container with margins */}
      <div className="w-full max-w-6xl mx-auto overflow-hidden">
        <div className="relative">
          <motion.div
            className="flex items-center gap-8 md:gap-12"
            animate={{
              x: [`0%`, `-${100 / 3}%`],
            }}
            transition={{
              duration: 15, // Faster on mobile (was 25)
              repeat: Infinity,
              ease: "linear",
            }}
            style={{ width: '300%' }}
          >
            {infiniteLogos.map((logo, index) => (
              <motion.div
                key={`${logo.name}-${index}`}
                className="flex-shrink-0 opacity-70 hover:opacity-100 transition-all duration-300 relative group"
                whileHover={{ scale: 1.1 }}
              >
                <img
                  src={logo.url}
                  alt={logo.alt || logo.name}
                  className="h-10 md:h-16 w-auto object-contain transition-all duration-300" // Smaller on mobile
                />
                {/* Blue tint overlay on hover */}
                <div className="absolute inset-0 bg-blue-500/0 group-hover:bg-blue-500/10 transition-all duration-300 rounded-lg" />
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};