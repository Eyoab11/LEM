'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
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
        <div className="max-w-5xl mx-auto text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, delay: 0.2 }}
          >
            <h1 className="text-6xl md:text-8xl font-bold text-white mb-12 tracking-tight leading-tight">
              About
            </h1>
            
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed mb-16">
              Levy Eromo Media has a distinctive ability to curate heroic family-friendly stories enmeshed in local traditions and values, authentic to the markets where they are viewed.
            </p>

            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed">
              This new family-centric brand is powered by a visionary legend in the entertainment space, and an executive team with global business acumen.
            </p>
          </motion.div>
        </div>
      </section>

      {/* What We Bring Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
            className="mb-20"
          >
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              LEM brings together:
            </h2>
          </motion.div>

          <div className="space-y-12">
            {capabilities.map((capability, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                viewport={{ once: true }}
                className="flex gap-6 items-start"
              >
                <div className="flex-shrink-0 w-2 h-2 bg-white rounded-full mt-3" />
                <p className="text-xl text-gray-300 leading-relaxed">
                  {capability}
                </p>
              </motion.div>
            ))}
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
            <h2 className="text-5xl md:text-6xl font-bold text-white mb-12">
              Let's Create Together
            </h2>
            
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
