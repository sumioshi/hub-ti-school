import { ProjectCard } from '../components/project-card';
import { Link } from 'react-router-dom';
import { Sparkles } from 'lucide-react';

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
    id: 'camia',
    title: 'CamIASecurity 2.0',
    description: 'Advanced AI monitoring system for specific behavior detection.',
    tags: ['React', 'AI', 'Security', 'Dashboard'],
    image: 'https://images.unsplash.com/photo-1557597774-9d273605dfa9?auto=format&fit=crop&w=800&q=80'
  },
  {
    id: 'customBI',
    title: 'UXCustomBI Pro',
    description: 'Plataforma de dashboards customizáveis com edição drag-and-drop e integração em tempo real.',
    tags: ['React', 'TypeScript', 'TailwindCSS', 'Dashboard'],
    image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=800&q=80'
  },
  // Adicionando o SupplyFit
  {
    id: 'supplyfit',
    title: 'SupplyFit',
    description: 'O Gympass dos suplementos: assinatura mensal para retirar suplementos em lojas parceiras.',
    tags: ['React', 'Subscription', 'Fitness', 'E-commerce'],
    image: 'https://images.unsplash.com/photo-1579758629938-03607ccdbaba?auto=format&fit=crop&w=800&q=80'
  }
];

export function Home() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="space-y-6 max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
            Project Showcase
          </h1>
          <p className="text-gray-400 text-xl">
            Explore nossa coleção de projetos frontend interativos e inovadores
          </p>
          <div className="w-32 h-1 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 mx-auto rounded-full"></div>
          
          {/* Link para o novo Hub de Ideias com AI */}
          <div className="pt-4">
            <Link 
              to="/hub" 
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <Sparkles className="h-5 w-5" />
              <span className="font-medium">Explore o Hub de Ideias com IA</span>
            </Link>
          </div>
        </div>
        
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl -z-10"></div>
          {DEMO_PROJECTS.map((project) => (
            <ProjectCard
              key={project.id}
              project={project}
              className="hover:scale-[1.02] transition-transform"
            />
          ))}
        </div>
      </div>
    </div>
  );
}