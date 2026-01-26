import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BreadcrumbWrapper } from '@/components/navigation/BreadcrumbWrapper';
import { RelatedLinks } from '@/components/navigation/RelatedLinks';
import { generatePageMetadata } from '@/lib/seo';

// Generate specific metadata for the Projects page
export const metadata: Metadata = generatePageMetadata({
  title: 'Our Projects',
  description: 'Explore the creative portfolio of Levy Eromo Media, featuring iconic animation projects, television productions, and legendary entertainment franchises.',
  keywords: [
    'animation projects',
    'television production',
    'creative portfolio',
    'entertainment franchises',
    'animation studio work',
    'media production portfolio',
    'Power Rangers',
    'Inspector Gadget',
    'He-Man'
  ],
  canonical: '/projects',
});

// Sample project data
const projects = [
  {
    title: 'Shuki Levy and the Creation of Mighty Morphin Power Rangers',
    description: 'Discover how Shuki Levy helped create the iconic Mighty Morphin Power Rangers series.',
    category: 'Television Production',
    image: '/power.jpg',
    slug: 'power-rangers'
  },
  {
    title: 'Inspector Gadget - Animation and Music Production',
    description: 'Explore the creative process behind Inspector Gadget, featuring innovative animation techniques.',
    category: 'Animation',
    image: '/inspectorgadget.jpg',
    slug: 'inspector-gadget'
  },
  {
    title: 'He-Man and the Masters of the Universe',
    description: 'Behind the scenes of the legendary He-Man series, showcasing world-class animation.',
    category: 'Animation',
    image: '/heman.jpg',
    slug: 'he-man'
  }
];

export default function ProjectsPage() {
  return (
    <main className="bg-black min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="relative pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb Navigation */}
          <div className="mb-8">
            <BreadcrumbWrapper />
          </div>
          
          <div className="text-center mb-16">
            <div className="w-16 h-0.5 bg-gradient-to-r from-blue-500 via-white to-blue-500 mx-auto mb-6" />
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-8 tracking-tight leading-tight">
              Our Creative Portfolio
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
              Explore the legendary projects that have shaped entertainment for generations. From iconic television series to groundbreaking animation, discover the creative legacy of Levy Eromo Media.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project, index) => (
              <Link key={project.slug} href={`/projects/${project.slug}`}>
                <div className="group cursor-pointer bg-gray-900/40 backdrop-blur-sm rounded-xl overflow-hidden border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300">
                  {/* Project Image */}
                  <div className="relative h-64 overflow-hidden">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className="absolute top-4 left-4">
                      <span className="inline-block px-3 py-1 bg-blue-600/80 backdrop-blur-sm text-blue-100 text-xs font-medium rounded-full">
                        {project.category}
                      </span>
                    </div>
                  </div>
                  
                  {/* Project Info */}
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors duration-300">
                      {project.title}
                    </h3>
                    <p className="text-gray-400 text-sm leading-relaxed">
                      {project.description}
                    </p>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Related Links */}
      <RelatedLinks title="Get Started" />

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            Ready to Create Your Next Project?
          </h2>
          <p className="text-gray-400 text-lg mb-12 max-w-2xl mx-auto">
            Let's bring your creative vision to life with our world-class animation and production expertise.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
            <Link href="/contact">
              <button className="px-8 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-semibold rounded-lg hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl">
                Start Your Project
              </button>
            </Link>
            
            <Link href="/">
              <button className="px-8 py-4 border border-gray-600 text-white font-semibold rounded-lg hover:border-blue-500 hover:text-blue-400 transition-all duration-300">
                Back to Home
              </button>
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </main>
  );
}