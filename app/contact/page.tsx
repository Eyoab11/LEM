import { Metadata } from 'next';
import { Header } from '../../components/layout/Header';
import { Footer } from '../../components/layout/Footer';
import { ContactForm } from '../../components/sections/ContactForm';
import { generatePageMetadata } from '@/lib/seo';

// Generate specific metadata for the Contact page
export const metadata: Metadata = generatePageMetadata({
  title: 'CONTACT',
  description: 'Reach out to Levy Eromo Media by filling out the contact form.',
  keywords: [
    'contact levy eromo media',
    'animation services',
    'media production inquiry',
    'creative consultation',
    'project discussion',
    'animation studio contact',
    'video production services',
    'entertainment production',
    'creative services inquiry',
    'animation quote',
    'media production consultation'
  ],
  image: '/lemm.png',
  canonical: '/contact',
});

export default function Contact() {
  return (
    <main>
      <Header />
      <section className="min-h-screen bg-black pt-20 pb-16 px-8">
        <div className="max-w-4xl mx-auto">
          <ContactForm />
        </div>
      </section>
      <Footer />
    </main>
  );
}