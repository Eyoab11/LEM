'use client';

import { motion } from 'framer-motion';
import { Play } from 'lucide-react';

interface WorkItem {
  id: number;
  title: string;
  image: string;
  services: string;
}

const workItems: WorkItem[] = [
  {
    id: 1,
    title: "THE MYSTERIOUS CITIES OF GOLD",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTktb4JnBZbIC3RG3dIBfdKeVoDNRE_CS9LBg&s",
    services: "Production, Mixing"
  },
  {
    id: 2,
    title: "He-Man & The Masters Of The Universe",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToHuu7iPmDyXcZP7_E2wwxGbyPOYYPn_1_rA&s",
    services: "Production, Vocal Recording, Mixing"
  },
  {
    id: 3,
    title: "M.A.S.K",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRPOQsYFi38y7GppmUd2yBANJSmesvtTvnSOA&s",
    services: "Production, Sound Design, Mastering"
  },
  {
    id: 4,
    title: "Rainbow Brite",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcToO5fl85vw85gbvatsQNtQ-tDfXZ9fOtdF2g&s",
    services: "Beat Production, Mixing"
  },
  {
    id: 5,
    title: "Heathcliff",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRy1p0rdPmx-lpfVWFhbZisjiRDNepJqO7HaA&s",
    services: "Production, Vocal Tuning, Mastering"
  },
  {
    id: 6,
    title: "Spiderman",
    image: "https://m.media-amazon.com/images/M/MV5BYWRkN2M1NmQtZjhjMi00ODFjLTk2ODctYWJiOWNkNjg1OGY4XkEyXkFqcGc@._V1_.jpg",
    services: "Production, Mixing, Mastering"
  }
];

export const WorkGrid = () => {
  return (
    <section className="min-h-screen bg-black py-20 px-8">
      <div className="max-w-6xl mx-auto">
        {/* Grid Container with more vertical space and smaller cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-x-20 gap-y-24">
          {workItems.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: 0.6, 
                delay: index * 0.1,
                ease: "easeOut"
              }}
              viewport={{ once: true, margin: "-50px" }}
              className="group cursor-pointer relative"
            >
              {/* Card Container - Smaller size */}
              <div className="relative max-w-xs mx-auto">
                {/* Diagonal Title Overlay - Changes to white background with black text on hover */}
                <div className="absolute -top-6 -left-6 z-20 transform -rotate-3 w-[calc(100%+3rem)]">
                  <div className="bg-gray-600/40 group-hover:bg-white backdrop-blur-sm px-6 py-4 rounded-md border border-gray-500/30 group-hover:border-gray-300 transition-all duration-300">
                    <h3 className="text-white group-hover:text-black text-sm font-medium tracking-wide leading-tight whitespace-nowrap transition-colors duration-300">
                      {item.title}
                    </h3>
                  </div>
                </div>

                {/* Image Container - 4:3 aspect ratio, smaller */}
                <div className="relative overflow-hidden rounded-lg w-full aspect-[4/3] mb-4">
                  {/* Image - Zooms on hover but stays within card boundaries */}
                  <motion.div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url('${item.image}')`
                    }}
                    whileHover={{ scale: 1.1 }}
                    transition={{ duration: 0.4, ease: "easeOut" }}
                  />
                  
                  {/* Hover Overlay with Play Button and Text */}
                  <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col items-center justify-center">
                    {/* Play Button */}
                    <div className="transform scale-0 group-hover:scale-100 transition-transform duration-300 mb-3">
                      <a 
                        href="https://soundcloud.com/shukilevy/tracks"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-16 h-16 bg-white rounded-full flex items-center justify-center shadow-lg hover:scale-110 transition-transform duration-200"
                      >
                        <Play className="w-6 h-6 text-black ml-1" fill="black" />
                      </a>
                    </div>
                    
                    {/* Play on Spotify Text */}
                    <div className="transform translate-y-4 opacity-0 group-hover:translate-y-0 group-hover:opacity-100 transition-all duration-300">
                      <p className="text-white text-sm font-medium tracking-wide">
                        Play on SoundCloud
                      </p>
                    </div>
                  </div>
                </div>
                
                {/* Services Text */}
                <p className="text-gray-400 text-sm tracking-wide">
                  {item.services}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};