import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { ArrowLeft, Loader2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { InteractiveCalculator } from '../projects/interactive-calculator';
import SkillSphereDashboard from '../projects/skill-sphere';
import VisuARDemoEnhanced from '../projects/visuar';
import CamIASecurityDashboard from '../projects/camIA';
import UXCustomBIDemo from '../projects/customBI';
import SupplyFitDemo from '../projects/supplyfit';
import RelationsManager from '../projects/relations';

const PROJECT_COMPONENTS: Record<string, React.FC> = {
  'interactive-calculator': InteractiveCalculator,
  'skill-sphere': SkillSphereDashboard,
  'visuar': VisuARDemoEnhanced,
  'camia': CamIASecurityDashboard,
  'customBI': UXCustomBIDemo,
  'supplyfit': SupplyFitDemo,
  'relations': RelationsManager,
};

const PROJECT_INFO: Record<string, { title: string, description: string, tags: string[] }> = {
  'interactive-calculator': {
    title: 'Interactive Calculator',
    description: 'Uma calculadora moderna com funções matemáticas avançadas e uma interface bonita.',
    tags: ['React', 'TypeScript', 'TailwindCSS'],
  },
  'skill-sphere': {
    title: 'SkillSphere',
    description: 'Plataforma de aprendizado personalizada para desenvolvedores.',
    tags: ['React', 'TypeScript', 'TailwindCSS', 'Dashboard'],
  },
  'visuar': {
    title: 'VisuAR Insight',
    description: 'Transforme dados complexos em experiências imersivas de realidade aumentada.',
    tags: ['React', 'AR', 'Data Visualization', 'TailwindCSS'],
  },
  'camia': {
    title: 'CamIASecurity 2.0',
    description: 'Sistema avançado de monitoramento com IA para detecção de comportamentos específicos.',
    tags: ['React', 'AI', 'Security', 'Dashboard'],
  },
  'customBI': {
    title: 'UXCustomBI Pro',
    description: 'Plataforma de dashboards customizáveis com edição drag-and-drop e integração em tempo real.',
    tags: ['React', 'TypeScript', 'TailwindCSS', 'Dashboard'],
  },
  'supplyfit': {
    title: 'SupplyFit',
    description: 'O Gympass dos suplementos: assinatura mensal para retirar suplementos em lojas parceiras.',
    tags: ['React', 'Subscription', 'Fitness', 'E-commerce'],
  },
  'relations': {
    title: 'Relations Manager',
    description: 'Gerencie e visualize relacionamentos de forma eficaz.',
    tags: ['React', 'Visualization', 'Management'],
  },
};

export function Project() {
  const { projectId } = useParams<{ projectId: string }>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  
  // Sugestões alternativas para mostrar quando um projeto não for encontrado
  const getSuggestions = (excludeId?: string) => {
    const allIds = Object.keys(PROJECT_COMPONENTS);
    return allIds
      .filter(id => id !== excludeId)
      .sort(() => 0.5 - Math.random()) // Embaralhar array
      .slice(0, 3); // Pegar apenas 3 itens
  };
  
  useEffect(() => {
    // Simulação de carregamento
    const timer = setTimeout(() => {
      setIsLoading(false);
      
      if (projectId && !PROJECT_COMPONENTS[projectId]) {
        setError(`Projeto "${projectId}" não encontrado`);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, [projectId]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col">
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <Loader2 className="h-12 w-12 animate-spin text-blue-500 mx-auto mb-4" />
            <h2 className="text-xl text-white font-medium">Carregando projeto...</h2>
            <p className="text-gray-400 mt-2">Preparando os componentes e recursos necessários</p>
          </div>
        </div>
      </div>
    );
  }

  if (error || !projectId || !PROJECT_COMPONENTS[projectId]) {
    const suggestions = getSuggestions(projectId);
    
    return (
      <div className="min-h-screen bg-gray-950 flex flex-col">
        <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
            <div className="flex items-center">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Voltar para Home</span>
              </Link>
            </div>
          </div>
        </header>
        
        <div className="flex-1 flex items-center justify-center p-4">
          <div className="max-w-lg w-full text-center">
            <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-red-500/20 flex items-center justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
              </svg>
            </div>
            <h1 className="text-2xl font-bold text-white mb-2">Projeto não encontrado</h1>
            <p className="text-gray-400 mb-8">
              {error || `Não conseguimos encontrar o projeto "${projectId}". Ele pode ter sido removido ou o link está incorreto.`}
            </p>
            
            <div className="mb-8">
              <h2 className="text-lg font-medium text-white mb-4">Confira estas alternativas</h2>
              <div className="grid gap-4 sm:grid-cols-3">
                {suggestions.map((id) => (
                  <Link 
                    key={id}
                    to={`/projects/${id}`}
                    className="block p-4 rounded-lg bg-gray-800 hover:bg-gray-700 transition-colors border border-gray-700"
                  >
                    <h3 className="font-medium text-white mb-1">{PROJECT_INFO[id]?.title || id}</h3>
                    <p className="text-sm text-gray-400 line-clamp-2">{PROJECT_INFO[id]?.description || 'Projeto alternativo'}</p>
                  </Link>
                ))}
              </div>
            </div>
            
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-lg hover:opacity-90 transition-opacity"
            >
              <ArrowLeft className="h-5 w-5" />
              <span className="font-medium">Voltar para a galeria</span>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  const ProjectComponent = PROJECT_COMPONENTS[projectId];
  
  return (
    <div className="bg-gray-950 min-h-screen flex flex-col">
      <header className="border-b border-gray-800 bg-gray-900/80 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center">
              <Link 
                to="/" 
                className="inline-flex items-center gap-2 text-gray-400 hover:text-white transition-colors"
                aria-label="Voltar para a página inicial"
              >
                <ArrowLeft className="h-5 w-5" />
                <span>Voltar</span>
              </Link>
              
              <div className="ml-6 pl-6 border-l border-gray-800">
                <h1 className="text-lg font-medium text-white">
                  {PROJECT_INFO[projectId]?.title || projectId}
                </h1>
                <div className="flex mt-1 space-x-2">
                  {PROJECT_INFO[projectId]?.tags.map((tag) => (
                    <span key={tag} className="inline-flex items-center rounded-full bg-blue-900/40 px-2.5 py-0.5 text-xs font-medium text-blue-400">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>
      
      <main className="flex-1 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <ProjectComponent />
        </div>
      </main>
    </div>
  );
}