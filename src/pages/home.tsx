import { ProjectCard } from '../components/project-card';
import { Link } from 'react-router-dom';
import { Sparkles, Zap, Code, ArrowRight, Loader2 } from 'lucide-react';
import { useState, useEffect } from 'react';

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
  },
  {
    id: 'relations',
    title: 'Relations Manager',
    description: 'Manage and visualize relationships effectively.',
    tags: ['React', 'Visualization', 'Management'],
    image: 'https://images.unsplash.com/photo-1593642532973-d31b6557fa68?auto=format&fit=crop&w=800&q=80'
  }
];

// Componente de Skeleton para loading
function ProjectCardSkeleton() {
  return (
    <div className="group relative overflow-hidden rounded-xl border border-gray-800 bg-gray-900/50 backdrop-blur-sm transition-all animate-pulse">
      <div className="aspect-video w-full bg-gray-800"></div>
      <div className="p-5">
        <div className="h-5 bg-gray-800 rounded w-3/4 mb-3"></div>
        <div className="h-4 bg-gray-800 rounded w-full mb-2"></div>
        <div className="h-4 bg-gray-800 rounded w-4/5"></div>
        
        <div className="mt-4 flex flex-wrap gap-1.5">
          <div className="h-5 bg-gray-800 rounded-full w-16"></div>
          <div className="h-5 bg-gray-800 rounded-full w-20"></div>
          <div className="h-5 bg-gray-800 rounded-full w-14"></div>
        </div>
        
        <div className="mt-5 pt-4 border-t border-gray-800/50">
          <div className="h-4 bg-gray-800 rounded w-28"></div>
        </div>
      </div>
    </div>
  );
}

export function Home() {
  const [isLoading, setIsLoading] = useState(true);
  const [projects, setProjects] = useState<typeof DEMO_PROJECTS>([]);

  useEffect(() => {
    // Simular carregamento de projetos
    const loadProjects = async () => {
      // Tempo artificial para demonstrar o loading state
      await new Promise(resolve => setTimeout(resolve, 1500));
      setProjects(DEMO_PROJECTS);
      setIsLoading(false);
    };

    loadProjects();
  }, []);

  return (
    <div className="min-h-screen bg-gray-950 text-white">
      {/* Header com navegação simples */}
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                DevShowcase
              </span>
            </div>
            
            <nav className="flex items-center space-x-6">
              <Link to="/" className="text-sm text-white font-medium">Home</Link>
              <Link to="/hub" className="text-sm text-gray-400 hover:text-white transition-colors">IdeaHub</Link>
              <Link 
                to="/hub" 
                className="px-4 py-1.5 text-sm bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity flex items-center gap-2"
              >
                <Sparkles className="h-3.5 w-3.5" />
                <span>Criar Projeto</span>
              </Link>
            </nav>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative py-20 overflow-hidden">
        {/* Gradientes de background */}
        <div className="absolute inset-0 -z-10">
          <div className="absolute top-0 -left-10 w-72 h-72 bg-blue-500/20 rounded-full filter blur-3xl opacity-30"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-purple-500/20 rounded-full filter blur-3xl opacity-30"></div>
        </div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
          <div className="max-w-3xl mx-auto text-center space-y-8">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 bg-clip-text text-transparent">
              Project Showcase
            </h1>
            <p className="text-gray-400 text-lg sm:text-xl">
              Explore nossa coleção de projetos frontend interativos e inovadores desenvolvidos com as mais recentes tecnologias web
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                to="/hub" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity w-full sm:w-auto justify-center"
              >
                <Sparkles className="h-5 w-5" />
                <span className="font-medium">Gerar Projeto com IA</span>
              </Link>
              
              <Link 
                to="/#projects" 
                className="inline-flex items-center gap-2 px-6 py-3 bg-gray-800 text-white rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors w-full sm:w-auto justify-center"
              >
                <ArrowRight className="h-5 w-5" />
                <span className="font-medium">Ver Projetos</span>
              </Link>
            </div>
          </div>
        </div>
      </section>
      
      {/* Features Section */}
      <section className="py-12 border-t border-gray-800/50 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
              <div className="w-12 h-12 bg-blue-500/20 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="h-6 w-6 text-blue-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Projetos Inspiradores</h3>
              <p className="text-gray-400">Explore designs modernos e implementações técnicas avançadas em diversos domínios.</p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
              <div className="w-12 h-12 bg-purple-500/20 rounded-lg flex items-center justify-center mb-4">
                <Code className="h-6 w-6 text-purple-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Código de Qualidade</h3>
              <p className="text-gray-400">Cada projeto segue as melhores práticas de desenvolvimento frontend com TypeScript e React.</p>
            </div>
            
            <div className="bg-gray-800/50 backdrop-blur-sm p-6 rounded-xl border border-gray-700/50">
              <div className="w-12 h-12 bg-pink-500/20 rounded-lg flex items-center justify-center mb-4">
                <Zap className="h-6 w-6 text-pink-400" />
              </div>
              <h3 className="text-xl font-semibold text-white mb-2">Tecnologia de Ponta</h3>
              <p className="text-gray-400">Implementações com Tailwind CSS, React, TypeScript e outras tecnologias modernas.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Grid */}
      <section id="projects" className="py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col items-center justify-between gap-4 mb-12 sm:flex-row">
            <div>
              <h2 className="text-3xl font-bold text-white mb-2">Projetos em Destaque</h2>
              <p className="text-gray-400">Explore nossa coleção de interfaces e aplicações interativas</p>
            </div>
            <Link 
              to="/hub" 
              className="inline-flex items-center gap-2 px-4 py-2 text-sm bg-gray-800 text-white rounded-lg border border-gray-700 hover:bg-gray-700 transition-colors"
            >
              <Sparkles className="h-4 w-4" />
              <span>Criar Novo Projeto</span>
            </Link>
          </div>
          
          <div className="grid gap-6 sm:gap-8 sm:grid-cols-2 lg:grid-cols-3 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-purple-500/10 to-pink-500/10 blur-3xl -z-10"></div>
            
            {isLoading ? (
              // Skeleton loading state
              <>
                {[1, 2, 3, 4, 5, 6].map((item) => (
                  <ProjectCardSkeleton key={item} />
                ))}
              </>
            ) : (
              // Projetos reais
              <>
                {projects.map((project) => (
                  <ProjectCard
                    key={project.id}
                    project={project}
                    className="hover:scale-[1.02] transition-transform"
                  />
                ))}
              </>
            )}
          </div>
          
          {isLoading && (
            <div className="flex justify-center items-center mt-8">
              <Loader2 className="animate-spin text-blue-500 h-8 w-8" />
              <span className="ml-3 text-gray-400">Carregando projetos...</span>
            </div>
          )}
        </div>
      </section>
      
      {/* CTA Section */}
      <section className="py-16 border-t border-gray-800/50 bg-gray-900/30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-blue-600 to-indigo-600 p-8 sm:p-12">
            <div className="absolute inset-0 bg-grid-white/10 [mask-image:linear-gradient(to_bottom,white,transparent)] pointer-events-none"></div>
            <div className="relative">
              <div className="max-w-3xl">
                <h2 className="text-2xl sm:text-3xl font-bold text-white mb-4">Pronto para criar seu próprio projeto?</h2>
                <p className="text-blue-100 mb-8">
                  Use nosso IdeaHub alimentado por IA para gerar interfaces modernas e funcionais em minutos.
                </p>
                <Link 
                  to="/hub" 
                  className="inline-flex items-center gap-2 px-6 py-3 bg-white text-blue-600 rounded-lg font-medium hover:bg-blue-50 transition-colors focus:outline-none focus:ring-2 focus:ring-white/50 focus:ring-offset-2 focus:ring-offset-blue-600"
                >
                  <Sparkles className="h-5 w-5" />
                  <span>Começar a Criar</span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
      
      {/* Footer */}
      <footer className="border-t border-gray-800 bg-gray-900 py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <div className="flex items-center space-x-2 mb-4 md:mb-0">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
                <Sparkles size={18} className="text-white" />
              </div>
              <span className="text-lg font-bold bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 bg-clip-text text-transparent">
                DevShowcase
              </span>
            </div>
            
            <div className="text-gray-400 text-sm">
              Construído com React, TypeScript e Tailwind CSS. Todos os direitos reservados © 2024
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}