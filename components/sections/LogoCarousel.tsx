'use client';

import { motion } from 'framer-motion';

export const LogoCarousel = () => {
  const logos = [
    { name: 'Cities of Gold', url: '/citiesofgold-removebg-preview.png', alt: 'Cities of Gold logo', scale: 1.4 },
    { name: 'Digimon', url: '/digimon-removebg-preview.png', alt: 'Digimon logo', scale: 1.4 },
    { name: 'He-Man', url: '/heman-removebg-preview.png', alt: 'He-Man logo', scale: 1.4 },
    { name: 'She-Ra', url: '/shera-removebg-preview.png', alt: 'She-Ra logo' },
    { name: 'Super Mario Bros. Super Show', url: '/supershow-removebg-preview (1).png', alt: 'Super Mario Bros. Super Show logo', scale: 1.4 },
    { name: 'Turbo', url: '/turbo-removebg-preview.png', alt: 'Turbo logo' },
    { name: 'Ulysses', url: '/ulysses-removebg-preview.png', alt: 'Ulysses logo' },
    { name: 'VR Troopers', url: '/vtroopers-removebg-preview.png', alt: 'VR Troopers logo' },
    { name: 'Zelda', url: '/zelda-removebg-preview.png', alt: 'Zelda logo' },
    { name: 'X-Men', url: '/xmen.png', alt: 'X-Men logo' },
    { name: 'Spider-Man', url: '/spiiderman.png', alt: 'Spider-Man logo', scale: 1.4 },
    { name: 'Inspector Gadget', url: '/inspectorgadget.png', alt: 'Inspector Gadget logo', scale: 1.4 },
    { name: 'Rainbow Brite', url: '/rainbowbrite.png', alt: 'Rainbow Brite logo' },
    { name: 'The Incredible Hulk', url: '/theincrediblehulk.png', alt: 'The Incredible Hulk logo' },
  ];

  // Triple the logos for truly seamless infinite scroll
  const infiniteLogos = [...logos, ...logos, ...logos];

  return (
    <section className="py-16 md:py-20 flex items-center justify-center bg-black relative overflow-hidden px-8 md:px-16">
      {/* Left fade overlay */}
      <div className="absolute left-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-r from-black via-black/80 to-transparent z-10 pointer-events-none" />
      
      {/* Right fade overlay */}
      <div className="absolute right-0 top-0 bottom-0 w-24 md:w-48 bg-gradient-to-l from-black via-black/80 to-transparent z-10 pointer-events-none" />

      {/* Carousel Container with margins */}
      <div className="w-full max-w-7xl mx-auto overflow-hidden">
        <div className="relative">
          <motion.div
            className="flex items-center gap-12 md:gap-16"
            animate={{
              x: [0, -((200 + 48) * logos.length)], // 200px minWidth + 48px gap (12*4)
            }}
            transition={{
              x: {
                duration: 40,
                repeat: Infinity,
                ease: "linear",
                repeatType: "loop",
              },
            }}
          >
            {infiniteLogos.map((logo, index) => (
              <motion.div
                key={`${logo.name}-${index}`}
                className="flex-shrink-0 opacity-90 hover:opacity-100 transition-all duration-300 relative group"
                whileHover={{ scale: 1.1 }}
                style={{ 
                  minWidth: '200px',
                  height: '120px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
              >
                <img
                  src={logo.url}
                  alt={logo.alt || logo.name}
                  className="max-h-[120px] w-auto object-contain transition-all duration-300"
                  style={{
                    filter: 'brightness(1.3) contrast(1.2)',
                    imageRendering: 'crisp-edges',
                    transform: logo.scale ? `scale(${logo.scale})` : 'scale(1)'
                  }}
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