import { ProjectCard } from '../components/project-card';

const DEMO_PROJECTS = [
  {
    id: 'interactive-calculator',
    title: 'Interactive Calculator',
    description: 'A modern calculator with advanced mathematical functions and a beautiful interface.',
    tags: ['React', 'TypeScript', 'TailwindCSS'],
    image: 'https://images.unsplash.com/photo-1587145820266-a5951ee6f620?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'skill-sphere',
    title: 'SkillSphere',
    description: 'Personalized learning platform for developers.',
    tags: ['React', 'TypeScript', 'TailwindCSS', 'Dashboard'],
    image: 'https://images.unsplash.com/photo-1456406644174-8ddd4cd52a06?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'visuar',
    title: 'VisuAR Insight',
    description: 'Transform complex data into immersive augmented reality experiences.',
    tags: ['React', 'AR', 'Data Visualization', 'TailwindCSS'],
    image: 'https://images.unsplash.com/photo-1633356122544-f134324a6cee?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'camia-security',
    title: 'CamIASecurity 2.0',
    description: 'Advanced AI monitoring system for specific behavior detection.',
    tags: ['React', 'AI', 'Security', 'Dashboard'],
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'custom-bi',
    title: 'UXCustomBI Pro',
    description: 'Plataforma de dashboards customizáveis com edição drag-and-drop e integração em tempo real.',
    tags: ['React', 'TypeScript', 'TailwindCSS', 'Dashboard'],
    image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=800&q=80'
  }
];

export function Home() {
  return (
    <div className="container px-4 py-8 sm:px-8">
      <div className="space-y-4">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
          Project Showcase
        </h1>
        <p className="text-gray-400 text-lg">
          Explore our collection of interactive frontend projects
        </p>
      </div>
      
      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {DEMO_PROJECTS.map((project) => (
          <ProjectCard
            key={project.id}
            project={project}
            className="hover:scale-[1.02] transition-transform"
          />
        ))}
      </div>
    </div>
  );
}
