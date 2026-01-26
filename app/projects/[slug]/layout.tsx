import { Metadata } from 'next';
import { generateDynamicMetadata, StructuredData, generateCreativeWorkSchema } from '@/lib/seo';
import { DynamicMetadataParams } from '@/lib/seo/types';

// Sample project data - in a real app, this would come from a CMS or database
const projectsData = {
  'power-rangers': {
    title: 'Shuki Levy and the Creation of Mighty Morphin Power Rangers',
    description: 'Discover how Shuki Levy helped create the iconic Mighty Morphin Power Rangers series, from its original pilot to the unforgettable soundtrack that defined a generation.',
    category: 'Television Production',
    tags: [
      'Power Rangers',
      'Shuki Levy',
      'Haim Saban',
      'children\'s television',
      'action series',
      'theme music',
      'Super Sentai adaptation',
      'television production'
    ],
    image: '/power.jpg',
    slug: 'power-rangers',
    dateCreated: new Date('1993-08-28') // Original air date
  },
  'inspector-gadget': {
    title: 'Inspector Gadget - Animation and Music Production',
    description: 'Explore the creative process behind Inspector Gadget, featuring innovative animation techniques and memorable musical compositions.',
    category: 'Animation',
    tags: [
      'Inspector Gadget',
      'animation',
      'children\'s cartoons',
      'theme music',
      'character design',
      'television animation'
    ],
    image: '/inspectorgadget.jpg',
    slug: 'inspector-gadget',
    dateCreated: new Date('1983-09-12') // Original air date
  },
  'he-man': {
    title: 'He-Man and the Masters of the Universe',
    description: 'Behind the scenes of the legendary He-Man series, showcasing world-class animation and unforgettable musical scores.',
    category: 'Animation',
    tags: [
      'He-Man',
      'Masters of the Universe',
      'action animation',
      'fantasy series',
      'character development',
      'musical composition'
    ],
    image: '/heman.jpg',
    slug: 'he-man',
    dateCreated: new Date('1983-09-05') // Original air date
  }
};

// Generate metadata for dynamic project pages
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const project = projectsData[slug as keyof typeof projectsData];
  
  if (!project) {
    // Return default metadata for unknown projects
    return generateDynamicMetadata(
      { params: { slug }, searchParams: {} },
      {
        title: 'Project Not Found',
        description: 'The requested project could not be found. Explore our other creative works and animation projects.',
        keywords: ['project', 'animation', 'media production'],
        canonical: `/projects/${slug}`,
        noIndex: true
      }
    );
  }

  // Generate metadata using the project data
  return generateDynamicMetadata(
    { params: { slug }, searchParams: {} },
    {
      title: project.title,
      description: project.description,
      keywords: [
        ...project.tags,
        project.category.toLowerCase(),
        'levy eromo media project',
        'animation project',
        'media production'
      ],
      image: project.image,
      canonical: `/projects/${project.slug}`
    }
  );
}

export default async function ProjectLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const project = projectsData[slug as keyof typeof projectsData];

  // Generate structured data for the project if it exists
  let structuredData = null;
  if (project) {
    structuredData = generateCreativeWorkSchema({
      title: project.title,
      description: project.description,
      category: project.category,
      tags: project.tags,
      images: [project.image],
      dateCreated: project.dateCreated,
      url: `/projects/${project.slug}`
    });
  }

  return (
    <>
      {structuredData && (
        <StructuredData data={structuredData} />
      )}
      {children}
    </>
  );
}