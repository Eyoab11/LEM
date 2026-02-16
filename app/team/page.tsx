'use client';

import { motion, AnimatePresence } from 'framer-motion';
import Image from 'next/image';
import { useState } from 'react';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';

const teamMembers = [
  {
    id: 1,
    name: 'Shuki Levy',
    role: 'Co-Founder & Managing Partner',
    bio: 'Legendary composer and producer, record-holder for TV theme songs, co-creator of Power Rangers, leading Global Family Entertainment.',
    gradient: 'from-blue-500 to-cyan-500',
    image: '/shuki.jpg.jpeg'
  },
  {
    id: 2,
    name: 'Tori Avey Levy',
    role: 'Co-Founder & Managing Partner',
    bio: 'Writer and Storyteller of Family Entertainment in the field of Animation.',
    gradient: 'from-purple-500 to-pink-500',
    image: '/tori.jpg.jpeg'
  },
  {
    id: 3,
    name: 'Fraser M. K. Tennant',
    role: 'Advisory Partner',
    bio: 'International Business Strategist, specializing in start-ups and developing companies into global Brands.',
    gradient: 'from-emerald-500 to-teal-500',
    image: '/fraser.jpg.jpeg'
  },
  {
    id: 4,
    name: 'Bryan Lukasik',
    role: 'Creative Executive',
    bio: 'Award-winning children\'s content creator, showrunner of Mayta the Brown Bear.',
    gradient: 'from-orange-500 to-red-500',
    image: '/bryan.jpg.jpeg'
  },
  {
    id: 5,
    name: 'Angel Gamboa-Bryant',
    role: 'Post-Production Specialist',
    bio: 'Emmy-nominated editor, expert in narrative flow and comedy formats, shaping family Entertainment.',
    gradient: 'from-violet-500 to-purple-500',
    image: '/angel.jpg.jpeg'
  },
  {
    id: 6,
    name: 'Erdolo Eromo',
    role: 'Managing Partner',
    bio: 'Entrepreneur and Investor specializing in Family Entertainment through Animation.',
    gradient: 'from-indigo-500 to-blue-500',
    image: '/erdolo.jpg.jpeg'
  },
  {
    id: 7,
    name: 'Ersno Eromo',
    role: 'Partner, Eromo Ventures',
    bio: 'Entrepreneur and Investor in Family Entertainment with a specialty of integrating AI in Healthcare.',
    gradient: 'from-cyan-500 to-blue-500',
    image: '/ersno.jpg.jpeg'
  }
];

export default function TeamPage() {
  const [selectedMember, setSelectedMember] = useState<typeof teamMembers[0] | null>(null);

  return (
    <main className="bg-black min-h-screen">
      <Header />
      
      {/* Full Screen Hero with Image */}
      <section className="relative h-screen flex items-center overflow-hidden">
        {/* Background Image */}
        <div className="absolute inset-0">
          <Image
            src="/shuki-piano.jpg"
            alt="Shuki Levy at piano"
            fill
            className="object-cover object-[75%_20%] md:object-[center_20%]"
            priority
          />
          {/* Dark Overlay for better text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/95 via-black/80 to-black/30" />
        </div>

        {/* Content - Left Aligned */}
        <div className="relative z-10 max-w-7xl mx-auto px-8 md:px-12 w-full">
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, delay: 0.3 }}
            className="max-w-2xl"
          >
            {/* Logo */}
            <div className="mb-12">
              <Image
                src="/lemm.png"
                alt="Levy Eromo Media"
                width={300}
                height={120}
                className="w-64 md:w-80 lg:w-96 h-auto"
                priority
              />
            </div>

            {/* Text */}
            <h1 className="text-xl md:text-2xl lg:text-3xl text-white leading-relaxed font-light">
              The group of remarkable people<br />
              behind Levy Eromo Media.
            </h1>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-12 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center gap-2"
          >
            <span className="text-white/60 text-sm uppercase tracking-wider">Scroll</span>
            <svg className="w-6 h-6 text-white/60" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </section>

      {/* Team Members Grid */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-7xl mx-auto">
          {/* Section Title */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Meet The Leadership Team
            </h2>
          </motion.div>

          {/* Team Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="group cursor-pointer"
              >
                <div className="relative rounded-2xl overflow-hidden aspect-[3/4]">
                  {/* White background container for images */}
                  <div className="absolute inset-0 bg-white" />
                  
                  {/* Team Member Image */}
                  {member.image ? (
                    <div className="relative w-full h-full">
                      <Image
                        src={member.image}
                        alt={member.name}
                        fill
                        className="object-cover"
                      />
                    </div>
                  ) : (
                    <div className="absolute inset-0 flex items-center justify-center bg-gradient-to-br from-gray-800 to-gray-900">
                      <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${member.gradient} opacity-20`} />
                      <div className="absolute inset-0 flex items-center justify-center">
                        <svg className="w-32 h-32 text-white/10" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                        </svg>
                      </div>
                    </div>
                  )}

                  {/* Overlay with Name */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent flex flex-col justify-end p-6">
                    <h3 className="text-white text-xl font-semibold mb-2">
                      {member.name}
                    </h3>
                    <button 
                      onClick={() => setSelectedMember(member)}
                      className="text-white/80 text-sm px-4 py-1.5 border border-white/30 rounded-full w-fit hover:bg-white hover:text-black hover:border-white transition-all duration-300 transform hover:scale-105"
                    >
                      Read Bio
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bio Modal */}
      <AnimatePresence>
        {selectedMember && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedMember(null)}
            className="fixed inset-0 bg-black/90 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-black rounded-2xl max-w-4xl w-full border border-gray-800 relative"
            >
              {/* Close Button */}
              <button
                onClick={() => setSelectedMember(null)}
                className="absolute top-4 right-4 z-10 text-gray-400 hover:text-white transition-colors"
              >
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>

              <div className="flex flex-col md:flex-row gap-0 h-full">
                {/* Left - Image */}
                <div className="flex-shrink-0 w-full md:w-[45%]">
                  <div className="relative rounded-t-2xl md:rounded-l-2xl md:rounded-tr-none overflow-hidden aspect-[4/5] md:h-full">
                    {/* White background container for images */}
                    <div className="absolute inset-0 bg-white" />
                    
                    {selectedMember.image ? (
                      <div className="relative w-full h-full">
                        <Image
                          src={selectedMember.image}
                          alt={selectedMember.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                    ) : (
                      <>
                        <div className="absolute inset-0 flex items-center justify-center">
                          <div className={`w-32 h-32 rounded-full bg-gradient-to-br ${selectedMember.gradient} opacity-20`} />
                          <div className="absolute inset-0 flex items-center justify-center">
                            <svg className="w-32 h-32 text-white/10" fill="currentColor" viewBox="0 0 24 24">
                              <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z"/>
                            </svg>
                          </div>
                        </div>
                      </>
                    )}
                  </div>
                </div>

                {/* Right - Content */}
                <div className="flex-1 flex flex-col p-8 md:p-10 justify-center">
                  {/* Name & Title */}
                  <div className="mb-6">
                    <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">
                      {selectedMember.name}
                    </h2>
                    <p className="text-gray-400 font-medium text-lg">
                      {selectedMember.role}
                    </p>
                  </div>

                  {/* Bio */}
                  <div className="text-gray-300 leading-relaxed text-lg">
                    <p>{selectedMember.bio}</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <Footer />
    </main>
  );
}
