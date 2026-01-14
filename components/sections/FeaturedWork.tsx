'use client';

import { motion, useScroll, useTransform } from 'framer-motion';
import { useRef } from 'react';
import Link from 'next/link';
import { Button } from '../ui/Button';

interface WorkItem {
  id: number;
  title: string;
  description: string;
  image: string;
  color?: string;
  link?: string;
}

const workItems: WorkItem[] = [
  {
    id: 1,
    title: "MIGHTY MORPHIN\nPOWER RANGERS",
    description: "A franchise co-created under the leadership of Shuki Levy that became one of the highest-grossing children's properties of all time, generating billions in licensed merchandise and captivating audiences in over 150 countries.",
    image: "/power.jpg",
    link: "/power-rangers"
  },
  {
    id: 2,
    title: "THE LEM CREATIVE &\nMERCHANDISING\nENGINE",
    description: "A proven production model that integrates storytelling, gaming, and consumer products into a unified revenue system. With deep ties to the gaming and merchandise industries, LEM's approach converts creative worlds into high-value global franchises capable of producing $20M+ in profits across three verticals—leading to projected $1.8-$2B exits within 3-5 years.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTHBVABnZBx92UcP99Z-kNDJl_GX0_MHEWcwg&s"
  },
  {
    id: 3,
    title: "THE LEM IP LIBRARY —\n30+ ORIGINAL SERIES,\nFILMS & GAMES",
    description: "A robust catalog of over 30 fully developed IPs engineered for fast production, global distribution, and merchandising. Each property is designed with rights ownership and scalability at the core—allowing LEM to accelerate output at studio speed and capture the exponential upside of ancillary revenue.",
    image: "https://upload.wikimedia.org/wikipedia/en/1/18/Benedict_Cumberbatch_as_Doctor_Strange.jpeg"
  },
  {
    id: 4,
    title: "SPIDER MAN",
    description: "Shuki composed the theme for the X-Men animated series in 1997. That theme was recently featured in the blockbuster film Dr. Strange. Screenheart made note of the song choice, which has delighted fans globally. One of the coolest pieces of music used in Doctor Strange 2 is the crowd-pleasing 'X-Men '97 Theme' composed by Haim Saban and Shuki Levy for the animated X-Men series that ran from 1992 to 1997. Not only is the song extremely uptempo compared to some of the melancholic musical scores, it also plays directly to the nostalgia of fans of Marvel going back 25 years.",
    image: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQ2PWbTZ3jArSfVutpHvdu4441fBWJLYocuvg&s"
  }
];

export const FeaturedWork = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  });

  return (
    <>
      {/* Section Header */}
      <section id="featured-work" className="bg-black px-8 pt-20 pb-8">
        <div className="max-w-7xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: "easeOut" }}
            viewport={{ once: true, margin: "-100px" }}
            className="text-center mb-16"
          >
            <motion.div 
              className="w-16 h-0.5 bg-gradient-to-r from-blue-500 via-white to-blue-500 mx-auto mb-6"
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
        </div>
      </section>

      {/* Stacking Cards Section */}
      <section 
        ref={containerRef}
        className="relative bg-black"
        style={{ height: `${workItems.length * 100}vh` }}
      >
        <div className="sticky top-0 h-screen flex items-center justify-center px-8">
          {workItems.map((item, index) => {
            const cardStart = index / workItems.length;
            const cardEnd = (index + 1) / workItems.length;
            
            const scale = useTransform(
              scrollYProgress,
              [cardStart, cardStart + 0.1, cardEnd - 0.1, cardEnd],
              [0.8, 1, 1, 0.8]
            );
            
            const opacity = useTransform(
              scrollYProgress,
              [cardStart, cardStart + 0.1, cardEnd - 0.1, cardEnd],
              [0, 1, 1, 0]
            );
            
            const y = useTransform(
              scrollYProgress,
              [cardStart, cardStart + 0.1, cardEnd - 0.1, cardEnd],
              [100, 0, 0, -100]
            );

            return (
              <motion.div
                key={item.id}
                style={{ 
                  scale,
                  opacity,
                  y,
                  zIndex: workItems.length - index
                }}
                className="absolute inset-0 flex items-center justify-center"
              >
                <div className="max-w-6xl mx-auto w-full">
                  <motion.div
                    className="bg-gray-900/40 backdrop-blur-sm rounded-3xl overflow-hidden border border-gray-800/50 shadow-2xl"
                    whileHover={{ 
                      scale: 1.02,
                      transition: { duration: 0.3, ease: "easeOut" }
                    }}
                  >
                    <div className="grid md:grid-cols-2">
                      {/* Left Content */}
                      <div className="p-12 lg:p-16 flex flex-col justify-center">
                        <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-white mb-8" />
                        
                        <h3 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 leading-tight whitespace-pre-line">
                          {item.title}
                        </h3>
                        
                        <p className="text-gray-300 text-base lg:text-lg leading-relaxed mb-10 max-w-lg">
                          {item.description}
                        </p>
                        
                        <div>
                          {item.link ? (
                            <Link href={item.link}>
                              <Button 
                                variant="outline" 
                                size="md"
                              >
                                Learn More
                              </Button>
                            </Link>
                          ) : (
                            <Link href="/contact">
                              <Button 
                                variant="outline" 
                                size="md"
                              >
                                Contact me
                              </Button>
                            </Link>
                          )}
                        </div>
                      </div>

                      {/* Right Image */}
                      <div className="relative h-96 md:h-auto min-h-[500px]">
                        <div 
                          className="w-full h-full bg-cover bg-center rounded-r-3xl"
                          style={{
                            backgroundImage: `url('${item.image}')`
                          }}
                        >
                          <div className="absolute inset-0 bg-gradient-to-l from-transparent to-gray-900/20 rounded-r-3xl"></div>
                        </div>
                        
                        <div className="absolute top-8 right-8 w-3 h-3 bg-white rounded-full opacity-60" />
                      </div>
                    </div>
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>
    </>
  );
};