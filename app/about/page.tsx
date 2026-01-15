'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Image from 'next/image';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { Button } from '../../components/ui/Button';

export default function AboutPage() {
  const capabilities = [
    "A global production team driven by creative and heartfelt storytelling, with a proven track record",
    "A focus on projects that promote cross-cultural understanding",
    "Positive concepts, stories and characters that resonate internationally",
    "Vast knowledge of the universal experiences of children and families in every part of our increasingly connected world",
    "Productions developed in-house on a streamlined budget, launched quickly to an international audience, and tracked with innovative, real time analytic systems",
    "A diverse and cost-effective content slate that can be tested at seed level in target global markets",
    "Merchandising strategy built organically into our entertainment productions and focused on long-term sustainability",
    "Global production apparatus with plans to expand animation, production, and manufacturing capabilities to key global territories"
  ];

  return (
    <main className="bg-black min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            {/* Left - Text */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.2 }}
            >
              <div className="w-12 h-0.5 bg-gradient-to-r from-blue-400 to-white mb-8" />
              <h1 className="text-5xl md:text-7xl font-bold text-white mb-8 tracking-tight leading-tight">
                About Levy Eromo Media
              </h1>
              
              <p className="text-lg md:text-xl text-gray-300 leading-relaxed mb-8">
                Levy Eromo Media has a distinctive ability to curate heroic family-friendly stories enmeshed in local traditions and values, authentic to the markets where they are viewed.
              </p>

              <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                This new family-centric brand is powered by a visionary legend in the entertainment space, and an executive team with global business acumen.
              </p>
            </motion.div>

            {/* Right - Image */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 1, delay: 0.4 }}
              className="relative h-[500px] rounded-2xl overflow-hidden bg-black"
            >
              <Image
                src="/camera.png"
                alt="Levy Eromo Media"
                fill
                className="object-contain"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* What We Bring Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-black to-gray-900">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 via-white to-blue-500 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              What LEM Brings Together
            </h2>
            <p className="text-gray-400 text-lg max-w-3xl mx-auto">
              Our comprehensive approach combines creativity, technology, and global reach to deliver exceptional entertainment experiences.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8">
            {capabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                viewport={{ once: true }}
                className="bg-gray-900/40 backdrop-blur-sm rounded-xl p-6 border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300"
              >
                <div className="flex gap-4 items-start">
                  <div className="flex-shrink-0 w-8 h-8 bg-gradient-to-br from-blue-500 to-blue-700 rounded-lg flex items-center justify-center text-white font-bold text-sm">
                    {index + 1}
                  </div>
                  <p className="text-base md:text-lg text-gray-300 leading-relaxed">
                    {capability}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Image Gallery Section */}
      <section className="py-20 px-6 bg-gradient-to-b from-gray-900 to-black">
        <div className="max-w-6xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 via-white to-blue-500 mx-auto mb-6" />
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Some Of Our Legacy
            </h2>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-6">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className="relative h-[300px] rounded-xl overflow-hidden bg-black group"
            >
              <Image
                src="/powerrangers.jpg"
                alt="Power Rangers"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-semibold text-lg">Power Rangers</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1 }}
              viewport={{ once: true }}
              className="relative h-[300px] rounded-xl overflow-hidden bg-black group"
            >
              <Image
                src="/xmen.jpg"
                alt="X-Men"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-semibold text-lg">X-Men</p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              viewport={{ once: true }}
              className="relative h-[300px] rounded-xl overflow-hidden bg-black group"
            >
              <Image
                src="/inspectorgadget.jpg"
                alt="Inspector Gadget"
                fill
                className="object-cover group-hover:scale-110 transition-transform duration-500"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <p className="text-white font-semibold text-lg">Inspector Gadget</p>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
              Let's Create Together
            </h2>
            <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
              Ready to bring your vision to life? Get in touch with our team to discuss your next project.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
              <Link href="/contact">
                <Button variant="primary" size="lg">
                  Get in Touch
                </Button>
              </Link>
              
              <Link href="/">
                <Button variant="outline" size="lg">
                  Back to Home
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      <Footer />
    </main>
  );
}
