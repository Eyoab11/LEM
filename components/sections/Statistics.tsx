'use client';

import { motion } from 'framer-motion';

export const Statistics = () => {
  const stats = [
    {
      id: 1,
      number: "50+",
      description: "Years in film & TV music"
    },
    {
      id: 2,
      number: "100+",
      description: "Television series scored"
    },
    {
      id: 3,
      number: "15+",
      description: "Gold & Platinum records"
    },
    {
      id: 4,
      number: "4,200+",
      description: "Themes, cues & songs composed"
    }
  ];

  return (
    <section className="bg-black py-16 px-8">
      <div className="max-w-7xl mx-auto">
        {/* Statistics Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {stats.map((stat, index) => (
            <motion.div
              key={stat.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.8, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="text-center"
            >
              {/* Large Number */}
              <motion.div
                initial={{ scale: 0.8 }}
                whileInView={{ scale: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1 + 0.2,
                  ease: "easeOut"
                }}
                viewport={{ once: true }}
                className="text-5xl md:text-6xl lg:text-7xl font-bold text-white mb-4 leading-none"
              >
                {stat.number}
              </motion.div>
              
              {/* Description */}
              <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ 
                  duration: 0.6, 
                  delay: index * 0.1 + 0.4
                }}
                viewport={{ once: true }}
                className="text-gray-400 text-sm md:text-base leading-relaxed max-w-xs mx-auto"
              >
                {stat.description}
              </motion.p>
            </motion.div>
          ))}
        </div>

        {/* Bottom Light Effect - Glowing line */}
        <motion.div
          initial={{ width: 0, opacity: 0 }}
          whileInView={{ width: "100%", opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8, ease: "easeOut" }}
          viewport={{ once: true }}
          className="relative h-4 mt-16 mx-auto overflow-visible"
        >
          {/* Main light bar */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-gray-400 to-transparent rounded-full" />
          
          {/* Glow effect layer 1 */}
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/40 to-transparent blur-sm rounded-full" />
          
          {/* Glow effect layer 2 - wider spread */}
          <div className="absolute -inset-2 bg-gradient-to-r from-transparent via-white/20 to-transparent blur-md rounded-full" />
          
          {/* Glow effect layer 3 - even wider spread */}
          <div className="absolute -inset-4 bg-gradient-to-r from-transparent via-white/10 to-transparent blur-xl rounded-full" />
        </motion.div>
      </div>
    </section>
  );
};