import { notFound } from 'next/navigation';
import { Metadata } from 'next';
import Link from 'next/link';
import { Header } from '@/components/layout/Header';
import { Footer } from '@/components/layout/Footer';
import { BreadcrumbWrapper } from '@/components/navigation/BreadcrumbWrapper';
import { RelatedLinks } from '@/components/navigation/RelatedLinks';
import { Button } from '@/components/ui/Button';
import { generatePageMetadata } from '@/lib/seo';
import { ProjectViewTracker } from '@/components/analytics/ProjectViewTracker';

// Sample project data - in a real app, this would come from a CMS or database
const projectsData = {
  'power-rangers': {
    title: 'Shuki Levy and the Creation of Mighty Morphin Power Rangers',
    description: 'Discover how Shuki Levy helped create the iconic Mighty Morphin Power Rangers series, from its original pilot to the unforgettable soundtrack that defined a generation.',
    category: 'Television Production',
    content: 'This would contain the full project content...',
    image: '/power.jpg',
    slug: 'power-rangers',
    dateCreated: new Date('1993-08-28') // Original air date
  },
  'inspector-gadget': {
    title: 'Inspector Gadget - Animation and Music Production',
    description: 'Explore the creative process behind Inspector Gadget, featuring innovative animation techniques and memorable musical compositions.',
    category: 'Animation',
    content: 'This would contain the full project content...',
    image: '/inspectorgadget.jpg',
    slug: 'inspector-gadget',
    dateCreated: new Date('1983-09-12') // Original air date
  },
  'he-man': {
    title: 'He-Man and the Masters of the Universe',
    description: 'Behind the scenes of the legendary He-Man series, showcasing world-class animation and unforgettable musical scores.',
    category: 'Animation',
    content: 'This would contain the full project content...',
    image: '/heman.jpg',
    slug: 'he-man',
    dateCreated: new Date('1983-09-05') // Original air date
  }
};

// Generate metadata for the project page
export async function generateMetadata({ params }: ProjectPageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData[slug as keyof typeof projectsData];

  if (!project) {
    return {
      title: 'Project Not Found',
      description: 'The requested project could not be found.',
    };
  }

  return generatePageMetadata({
    title: project.title,
    description: project.description,
    keywords: [
      project.category.toLowerCase(),
      'animation project',
      'television production',
      'entertainment',
      'Levy Eromo Media',
      project.slug.replace('-', ' ')
    ],
    image: project.image,
    canonical: `/projects/${project.slug}`,
  });
}

interface ProjectPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export default async function ProjectPage({ params }: ProjectPageProps) {
  const { slug } = await params;
  const project = projectsData[slug as keyof typeof projectsData];

  if (!project) {
    notFound();
  }

  return (
    <main className="bg-black min-h-screen">
      <ProjectViewTracker 
        projectId={project.slug}
        projectTitle={project.title}
        category={project.category}
      />
      <Header />
      
      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-32 pb-20 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Breadcrumb Navigation */}
          <div className="mb-8 text-left">
            <BreadcrumbWrapper />
          </div>
          
          <div className="text-center mb-16">
            <div className="inline-block px-4 py-2 bg-blue-600/20 border border-blue-500/30 rounded-full mb-6">
              <span className="text-blue-400 text-sm font-medium">{project.category}</span>
            </div>
            <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold text-white mb-8 tracking-tight leading-tight">
              {project.title}
            </h1>
            <p className="text-xl md:text-2xl text-gray-300 leading-relaxed max-w-4xl mx-auto">
              {project.description}
            </p>
          </div>

          {/* Project Image */}
          <div className="relative w-full h-[500px] rounded-2xl overflow-hidden mb-16">
            <img
              src={project.image}
              alt={project.title}
              className="w-full h-full object-cover"
            />
          </div>

          {/* Content */}
          <div className="text-center max-w-4xl mx-auto">
            <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
              {project.content}
            </p>
          </div>
        </div>
      </section>

      {/* Related Projects */}
      <RelatedLinks title="Explore More Projects" />

      {/* CTA Section */}
      <section className="py-32 px-6">
        <div className="max-w-4xl mx-auto text-center">
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
        </div>
      </section>

      <Footer />
    </main>
  );
}

// Generate static params for known projects
export async function generateStaticParams() {
  return Object.keys(projectsData).map((slug) => ({
    slug,
  }));
}