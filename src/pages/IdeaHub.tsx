import React, { useState, useEffect, useMemo } from 'react';
import { Link } from 'react-router-dom';
import {
  Code, Eye, GitBranch, Sparkles, Layers, Search, Settings,
  User, Bell, Plus, Save, Copy, Mic, Send,
  Star, Folder, MoreVertical, Clock,
  Zap, MessageSquare, PanelLeft,
  PanelRight, X, Grid, List, Maximize2,
  HelpCircle, Check, Users, ArrowLeft
} from 'lucide-react';
import { AIModelSelector } from '../components/AIModelSelector';
import { AIErrorNotification } from '../components/AIErrorNotification';
import { APIKeyManager } from '../components/APIKeyManager';
import { getAvailableModels } from '../lib/services/aiService';
import { AIModelConfig } from '../lib/types/ai';

// Definir interface para o tipo de projeto
interface Project {
  id: number;
  name: string;
  description: string;
  date: string;
  status: string;
  tags: string[];
  // Adicione outras propriedades conforme necessário
}

// Componente principal do Hub
export function IdeaHub() {
  const [activeView, setActiveView] = useState('dashboard');
  const [selectedProject, setSelectedProject] = useState<Project | null>(null);
  const [viewMode, setViewMode] = useState('preview');
  const [ideaInput, setIdeaInput] = useState('');
  const [processing, setProcessing] = useState(false);
  const [recording, setRecording] = useState(false);
  const [menuVisible, setMenuVisible] = useState(false);
  const [showCodePanel, setShowCodePanel] = useState(false);
  const [projectView, setProjectView] = useState('grid');
  const [demoMode, setDemoMode] = useState(false);
  const [demoStep, setDemoStep] = useState(0);
  const [selectedModel, setSelectedModel] = useState('gpt4');
  const [showChat, setShowChat] = useState(false);
  const [aiError, setAiError] = useState<string | null>(null);
  const [showAPIKeyManager, setShowAPIKeyManager] = useState(false);
  const [availableAIModels, setAvailableAIModels] = useState<AIModelConfig[]>([]);

  // Carregar modelos de IA disponíveis
  useEffect(() => {
    const allModels = getAvailableModels();
    setAvailableAIModels(allModels);
  }, []);

  // Fixar botões sem texto discernível
  useEffect(() => {
    const fixAccessibility = () => {
      const buttonsWithoutText = Array.from(document.querySelectorAll('button:not([title]):not([aria-label])'))
        .filter(button => {
          const text = button.textContent?.trim() || '';
          return text === '';
        });
      
      buttonsWithoutText.forEach((button, index) => {
        button.setAttribute('title', `Botão de ação ${index + 1}`);
        button.setAttribute('aria-label', `Botão de ação ${index + 1}`);
      });
    };

    // Executa imediatamente
    fixAccessibility();
    
    // E também após cada mudança de conteúdo 
    const observer = new MutationObserver(fixAccessibility);
    observer.observe(document.body, { childList: true, subtree: true });
    
    return () => observer.disconnect();
  }, []);

  // Dados simulados para visualização
  const salesData = [
    { date: 'Dia 1', sales: 850, orders: 25 },
    { date: 'Dia 2', sales: 750, orders: 20 },
    { date: 'Dia 3', sales: 950, orders: 30 },
    { date: 'Dia 4', sales: 1100, orders: 35 },
    { date: 'Dia 5', sales: 980, orders: 28 },
    { date: 'Dia 6', sales: 1200, orders: 40 },
    { date: 'Dia 7', sales: 1300, orders: 45 }
  ];

  // Dados simulados - Use useMemo para evitar recriação em cada renderização
  const projects = useMemo(() => [
    {
      id: 1,
      name: "E-commerce Dashboard",
      description: "Painel administrativo para gerenciamento de loja online",
      date: "10 Mar 2024",
      thumbnail: "https://picsum.photos/320/180?random=1",
      tags: ["Dashboard", "E-commerce", "Admin"],
      starred: true,
      preview: "/api/placeholder/800/600",
      status: "completed"
    },
    {
      id: 2,
      name: "App de Fitness",
      description: "Aplicativo mobile para acompanhamento de treinos e dieta",
      date: "28 Fev 2024",
      thumbnail: "https://picsum.photos/320/180?random=2",
      tags: ["Mobile", "Health", "Tracking"],
      starred: false,
      preview: "/api/placeholder/800/600",
      status: "completed"
    },
    {
      id: 3,
      name: "Portal de Notícias",
      description: "Site de notícias com categorias e sistema de comentários",
      date: "15 Fev 2024",
      thumbnail: "https://picsum.photos/320/180?random=3",
      tags: ["Website", "Content", "Media"],
      starred: true,
      preview: "/api/placeholder/800/600",
      status: "completed"
    },
    {
      id: 4,
      name: "Rede Social para Devs",
      description: "Plataforma para desenvolvedores compartilharem projetos",
      date: "05 Fev 2024",
      thumbnail: "https://picsum.photos/320/180?random=4",
      tags: ["Social", "Developers", "Portfolio"],
      starred: false,
      preview: "/api/placeholder/800/600",
      status: "in_progress"
    },
    {
      id: 5,
      name: "Gerenciador de Relacionamentos",
      description: "Aplicativo para gerenciar contatos e interações",
      date: "12 Mar 2024",
      thumbnail: "https://picsum.photos/320/180?random=5",
      tags: ["CRM", "Contatos", "Interações"],
      starred: false,
      preview: "/api/placeholder/800/600",
      status: "in_progress"
    }
  ], []);

  const categories = useMemo(() => [
    { id: 'all', name: 'Todos Projetos', count: 12 },
    { id: 'recent', name: 'Recentes', count: 4 },
    { id: 'starred', name: 'Favoritos', count: 5 },
    { id: 'shared', name: 'Compartilhados', count: 3 },
    { id: 'templates', name: 'Templates', count: 8 }
  ], []);

  const sampleCode = `// React component generated from your description
import React, { useState, useEffect } from 'react';
import './EcommerceStyles.css';

const EcommerceDashboard = () => {
  const [salesData, setSalesData] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [dateRange, setDateRange] = useState('weekly');
  
  useEffect(() => {
    // Simulate API call to fetch data
    fetchSalesData(dateRange);
  }, [dateRange]);
  
  const fetchSalesData = (range) => {
    setIsLoading(true);
    // In a real app, this would be an API call
    setTimeout(() => {
      const data = generateMockData(range);
      setSalesData(data);
      setIsLoading(false);
    }, 800);
  };
  
  const generateMockData = (range) => {
    // Generate mock sales data based on date range
    // This would come from your backend in a real app
    return Array(range === 'weekly' ? 7 : 30).fill(0).map((_, i) => ({
      date: \`Day \${i + 1}\`,
      sales: Math.floor(Math.random() * 1000) + 500,
      orders: Math.floor(Math.random() * 50) + 10
    }));
  };
  
  return (
    <div className="dashboard-container">
      <header className="dashboard-header">
        <h1>E-commerce Dashboard</h1>
        <div className="date-selector">
          <button 
            onClick={() => setDateRange('weekly')}
            className={dateRange === 'weekly' ? 'active' : ''}
          >
            Weekly
          </button>
          <button 
            onClick={() => setDateRange('monthly')}
            className={dateRange === 'monthly' ? 'active' : ''}
          >
            Monthly
          </button>
        </div>
      </header>
      
      <div className="metrics-grid">
        <div className="metric-card">
          <h3>Total Sales</h3>
          <p className="metric-value">
            ${salesData.reduce((sum, day) => sum + day.sales, 0).toLocaleString()}
          </p>
          <p className="metric-label">Past {dateRange === 'weekly' ? '7' : '30'} days</p>
        </div>
        
        <div className="metric-card">
          <h3>Orders</h3>
          <p className="metric-value">
            {salesData.reduce((sum, day) => sum + day.orders, 0)}
          </p>
          <p className="metric-label">Past {dateRange === 'weekly' ? '7' : '30'} days</p>
        </div>
        
        <div className="metric-card">
          <h3>Avg. Order Value</h3>
          <p className="metric-value">
            ${salesData.length ? Math.round(
    salesData.reduce((sum, day) => sum + day.sales, 0) /
    salesData.reduce((sum, day) => sum + day.orders, 0)
  ) : 0
    }
          </p>
          <p className="metric-label">Past {dateRange === 'weekly' ? '7' : '30'} days</p>
        </div>
      </div>
      
      <div className="sales-chart">
        <h2>Sales Trend</h2>
        {isLoading ? (
          <div className="loading-indicator">Loading data...</div>
        ) : (
          <div className="chart-container">
            {/* This would be a real chart component in production */}
            <div className="chart-placeholder">
              {salesData.map((day, index) => (
                <div 
                  key={index}
                  className="chart-bar" 
                  style={{ height: \`\${day.sales / 20}px\` }}
                  title={\`\${day.date}: $\${day.sales}\`}
                ></div>
              ))}
            </div>
          </div>
        )}
      </div>
      
      <div className="recent-orders">
        <h2>Recent Orders</h2>
        <table>
          <thead>
            <tr>
              <th>Order ID</th>
              <th>Customer</th>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {Array(5).fill(0).map((_, i) => (
              <tr key={i}>
                <td>#ORD-{1000 + i}</td>
                <td>Customer {i + 1}</td>
                <td>March {10 - i}, 2024</td>
                <td>${Math.floor(Math.random() * 300) + 50}</td>
                <td>
                  <span className={\`status \${
                    ['completed', 'processing', 'completed', 'processing', 'shipped'][i]
                  }\`}>
                    {['Completed', 'Processing', 'Completed', 'Processing', 'Shipped'][i]}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EcommerceDashboard;`;

  // Função para inicializar o modo de processamento
  const startProcessing = () => {
    if (ideaInput.trim() !== '') {
      setProcessing(true);

      // Simulando o processamento da IA
      setTimeout(() => {
        setProcessing(false);
        setActiveView('editor');
        setSelectedProject(projects[0]);
      }, 3000);
    }
  };

  // Efeito para o modo demo
  useEffect(() => {
    if (demoMode) {
      const demoSteps = [
        // Iniciar no dashboard
        () => { setActiveView('dashboard'); setSelectedProject(null); },
        // Ir para nova ideia
        () => { setActiveView('create'); },
        // Simular entrada de texto
        () => { setIdeaInput("Crie um dashboard para monitoramento de vendas de e-commerce com gráficos de tendências e tabela de pedidos recentes."); },
        // Simular processamento
        () => { setProcessing(true); },
        // Mostrar resultado
        () => {
          setProcessing(false);
          setActiveView('editor');
          setSelectedProject(projects[0]);
        },
        // Alternar para modo código
        () => { setViewMode('code'); setShowCodePanel(true); },
        // Voltar para preview
        () => { setViewMode('preview'); setShowCodePanel(false); },
        // Finalizar demo
        () => { setActiveView('dashboard'); setDemoMode(false); }
      ];

      let currentStep = 0;
      let demoInterval: NodeJS.Timeout | null = null;

      demoInterval = setInterval(() => {
        if (currentStep < demoSteps.length) {
          demoSteps[currentStep]();
          setDemoStep(currentStep);
          currentStep++;
        } else if (demoInterval) {
          clearInterval(demoInterval);
          setDemoMode(false);
          setIdeaInput("");
        }
      }, 3000);

      return () => {
        if (demoInterval) clearInterval(demoInterval);
      };
    }
  }, [demoMode, projects]);

  // Renderizar sidebar
  const renderSidebar = () => (
    <aside className={`bg-gray-900 h-screen w-64 border-r border-gray-800 flex-shrink-0 transition-all duration-300 fixed z-30 ${menuVisible ? 'translate-x-0' : '-translate-x-full'}`}>
      <div className="flex flex-col h-full">
        <div className="p-4 border-b border-gray-800 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-9 h-9 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-lg flex items-center justify-center">
              <Sparkles size={20} className="text-white" />
            </div>
            <div className="ml-3">
              <h1 className="text-white font-bold text-lg">IdeaForge</h1>
              <p className="text-gray-400 text-xs">Powered by AI</p>
            </div>
          </div>
          <button
            onClick={() => setMenuVisible(false)}
            className="text-gray-400 hover:text-white p-1 rounded-md hover:bg-gray-800"
            aria-label="Fechar menu"
            title="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4">
          <button
            onClick={() => setActiveView('create')}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg flex items-center justify-center"
            title="Criar nova ideia"
          >
            <Plus size={18} className="mr-2" />
            <span>Nova Ideia</span>
          </button>
        </div>

        <nav className="flex-1 overflow-y-auto p-4">
          <div className="mb-6">
            <ul className="space-y-1">
              {[
                { id: 'dashboard', icon: <Layers size={18} />, label: 'Meus Projetos' },
                { id: 'explore', icon: <Sparkles size={18} />, label: 'Explorar' },
                { id: 'community', icon: <Users size={18} />, label: 'Comunidade' },
              ].map(item => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveView(item.id);
                      setSelectedProject(null);
                    }}
                    className={`w-full flex items-center px-3 py-2 rounded-lg transition-colors ${activeView === item.id ? 'bg-gray-800 text-white' : 'text-gray-400 hover:bg-gray-800 hover:text-white'}`}
                    title={item.label}
                    aria-label={item.label}
                  >
                    <span className="mr-3">{item.icon}</span>
                    <span>{item.label}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div className="mb-6">
            <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2 px-3">Categorias</h3>
            <ul className="space-y-1">
              {categories.map(category => (
                <li key={category.id}>
                  <button 
                    className="w-full flex items-center justify-between px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                    title={`Categoria ${category.name}`}
                    aria-label={`Categoria ${category.name}`}
                  >
                    <span>{category.name}</span>
                    <span className="bg-gray-800 text-gray-400 text-xs rounded-full py-0.5 px-2">
                      {category.count}
                    </span>
                  </button>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-gray-400 text-xs font-medium uppercase tracking-wider mb-2 px-3">Recentes</h3>
            <ul className="space-y-1">
              {projects.slice(0, 3).map(project => (
                <li key={project.id}>
                  <button
                    onClick={() => {
                      setSelectedProject(project);
                      setActiveView('editor');
                    }}
                    className="w-full flex items-center px-3 py-2 rounded-lg text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
                  >
                    <span className="w-2 h-2 rounded-full bg-blue-500 mr-2 flex-shrink-0"></span>
                    <span className="truncate">{project.name}</span>
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </nav>

        <div className="p-4 border-t border-gray-800">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-full bg-gray-800 flex items-center justify-center">
              <User size={20} className="text-gray-400" />
            </div>
            <div className="ml-3">
              <p className="text-white text-sm">Alex Martins</p>
              <p className="text-gray-400 text-xs">Plano Pro</p>
            </div>
            <button 
              className="ml-auto text-gray-400 hover:text-white"
              title="Configurações"
              aria-label="Configurações"
            >
              <Settings size={18} />
            </button>
          </div>
        </div>
      </div>
    </aside>
  );

  // Renderizar header com botão de menu que muda de posição
  const renderHeader = () => (
    <header className="bg-gray-900 border-b border-gray-800 py-3 px-4 flex items-center sticky top-0 z-20 w-full">
      <Link
        to="/"
        className="inline-flex items-center gap-2 text-sm font-medium text-gray-400 hover:text-blue-400 transition-colors mr-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Back to Projects
      </Link>

      <button
        onClick={() => setMenuVisible(!menuVisible)}
        className="text-gray-400 hover:text-white mr-4 p-1 rounded hover:bg-gray-800"
        aria-label={menuVisible ? "Fechar menu" : "Abrir menu"}
        title={menuVisible ? "Fechar menu" : "Abrir menu"}
      >
        {menuVisible ? <PanelLeft size={20} /> : <PanelRight size={20} />}
      </button>

      {activeView === 'dashboard' && (
        <div className="flex-1 flex items-center">
          <h1 className="text-white text-lg font-medium">Meus Projetos</h1>
          <div className="ml-auto flex items-center">
            <div className="relative mr-4">
              <label htmlFor="search-projects" className="sr-only">Buscar projetos</label>
              <input
                id="search-projects"
                type="text"
                placeholder="Buscar projetos..."
                className="bg-gray-800 border border-gray-700 text-gray-200 rounded-lg py-1.5 pl-9 pr-3 text-sm w-64 focus:outline-none focus:ring-1 focus:ring-blue-500"
              />
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
            </div>

            <div className="flex space-x-2">
              <button
                onClick={() => setProjectView('grid')}
                className={`p-1.5 rounded-lg ${projectView === 'grid' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
                title="Visualização em grade"
              >
                <Grid size={18} />
              </button>
              <button
                onClick={() => setProjectView('list')}
                className={`p-1.5 rounded-lg ${projectView === 'list' ? 'bg-gray-700 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
                title="Visualização em lista"
              >
                <List size={18} />
              </button>
            </div>
          </div>
        </div>
      )}

      {activeView === 'create' && (
        <h1 className="text-white text-lg font-medium">Nova Ideia</h1>
      )}

      {activeView === 'editor' && selectedProject && (
        <div className="flex-1 flex items-center">
          <div>
            <h1 className="text-white text-lg font-medium">{selectedProject.name}</h1>
            <div className="flex items-center">
              <span className="text-gray-400 text-xs mr-3">{selectedProject.date}</span>
              <div className="flex space-x-1">
                {selectedProject.tags.map((tag: string, index: number) => (
                  <span key={index} className="text-xs bg-gray-800 text-gray-300 px-2 py-0.5 rounded">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="ml-auto flex items-center">
            <div className="flex mr-4">
              <button
                onClick={() => {
                  setViewMode('preview');
                  setShowCodePanel(false);
                }}
                className={`px-3 py-1.5 text-sm flex items-center rounded-l-lg ${viewMode === 'preview' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              >
                <Eye size={16} className="mr-2" />
                <span>Preview</span>
              </button>
              <button
                onClick={() => {
                  setViewMode('code');
                  setShowCodePanel(true);
                }}
                className={`px-3 py-1.5 text-sm flex items-center rounded-r-lg ${viewMode === 'code' ? 'bg-blue-600 text-white' : 'bg-gray-800 text-gray-300 hover:bg-gray-700'}`}
              >
                <Code size={16} className="mr-2" />
                <span>Código</span>
              </button>
            </div>

            <button
              onClick={() => alert('Projeto salvo!')}
              className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm flex items-center mr-2"
              title="Salvar projeto"
            >
              <Save size={16} className="mr-2" />
              <span>Salvar</span>
            </button>

            <button
              onClick={() => alert('Projeto exportado para GitHub!')}
              className="px-3 py-1.5 bg-gray-800 hover:bg-gray-700 text-gray-300 rounded-lg text-sm flex items-center"
              title="Exportar para GitHub"
            >
              <GitBranch size={16} className="mr-2" />
              <span>Exportar</span>
            </button>
          </div>
        </div>
      )}

      <div className="ml-auto flex items-center">
        <div className="mr-4">
          <AIModelSelector 
            selectedModel={selectedModel} 
            onSelectModel={(modelId) => setSelectedModel(modelId)} 
            onConfigureAPIKeys={() => setShowAPIKeyManager(true)}
          />
        </div>
        <button
          onClick={() => setDemoMode(true)}
          className="text-sm text-blue-500 hover:text-blue-400 mr-4"
          title="Iniciar demonstração"
        >
          Demo
        </button>
        <button
          onClick={() => setShowChat(!showChat)}
          className="text-gray-400 hover:text-white mr-3 relative"
          title="Abrir chat"
        >
          <MessageSquare size={20} />
          <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full text-xs flex items-center justify-center text-white">2</span>
        </button>
        <button
          className="text-gray-400 hover:text-white mr-3"
          title="Notificações"
          aria-label="Notificações"
        >
          <Bell size={20} />
        </button>
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 flex items-center justify-center">
          <span className="text-white text-sm font-medium">AM</span>
        </div>
      </div>
    </header>
  );

  // Renderizar dashboard
  const renderDashboard = () => (
    <div className="p-6">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        <div className="bg-gray-800 rounded-xl p-5 flex items-center">
          <div className="w-12 h-12 rounded-lg bg-blue-900 flex items-center justify-center">
            <Folder className="text-blue-400" size={24} />
          </div>
          <div className="ml-4">
            <h2 className="text-white text-2xl font-bold">12</h2>
            <p className="text-gray-400">Total de Projetos</p>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-5 flex items-center">
          <div className="w-12 h-12 rounded-lg bg-purple-900 flex items-center justify-center">
            <Clock className="text-purple-400" size={24} />
          </div>
          <div className="ml-4">
            <h2 className="text-white text-2xl font-bold">4</h2>
            <p className="text-gray-400">Projetos Recentes</p>
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-5 flex items-center">
          <div className="w-12 h-12 rounded-lg bg-green-900 flex items-center justify-center">
            <Check className="text-green-400" size={24} />
          </div>
          <div className="ml-4">
            <h2 className="text-white text-2xl font-bold">8</h2>
            <p className="text-gray-400">Projetos Completos</p>
          </div>
        </div>
      </div>

      {projectView === 'grid' ? (
        // Grid view
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {projects.map(project => (
            <div
              key={project.id}
              className="bg-gray-800 rounded-xl overflow-hidden hover:ring-1 hover:ring-blue-500 transition-all cursor-pointer"
              onClick={() => {
                setSelectedProject(project);
                setActiveView('editor');
              }}
            >
              <div className="h-40 overflow-hidden relative">
                <img
                  src={project.thumbnail}
                  alt={project.name}
                  className="w-full h-full object-cover"
                />
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    // In a real app, we would update the state here
                    console.log(`Toggling star for project: ${project.name}`);
                  }}
                  className="absolute top-2 right-2 h-7 w-7 bg-gray-900/70 rounded-full flex items-center justify-center"
                  title="Favoritar projeto"
                  aria-label="Favoritar projeto"
                >
                  <Star
                    size={16}
                    fill={project.starred ? "currentColor" : "none"}
                    className={project.starred ? "text-yellow-400" : "text-white"}
                  />
                </button>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-gray-900 to-transparent py-2 px-3">
                  <span className={`text-xs px-2 py-0.5 rounded ${project.status === 'completed'
                      ? 'bg-green-900/60 text-green-400'
                      : 'bg-blue-900/60 text-blue-400'
                    }`}>
                    {project.status === 'completed' ? 'Completo' : 'Em Progresso'}
                  </span>
                </div>
              </div>
              <div className="p-4">
                <h3 className="text-white font-medium mb-1">{project.name}</h3>
                <p className="text-gray-400 text-sm mb-2 line-clamp-2">{project.description}</p>
                <div className="flex justify-between items-center">
                  <div className="flex space-x-1">
                    {project.tags.slice(0, 2).map((tag, index) => (
                      <span key={index} className="text-xs bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded">
                        {tag}
                      </span>
                    ))}
                    {project.tags.length > 2 && (
                      <span className="text-xs bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded">
                        +{project.tags.length - 2}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-500">{project.date}</span>
                </div>
              </div>
            </div>
          ))}

          {/* Card para criar nova ideia */}
          <div
            className="bg-gray-800 rounded-xl border-2 border-dashed border-gray-700 flex flex-col items-center justify-center p-6 h-full cursor-pointer hover:border-blue-500 transition-colors"
            onClick={() => setActiveView('create')}
          >
            <div className="w-16 h-16 rounded-full bg-gray-700 flex items-center justify-center mb-4">
              <Plus size={28} className="text-blue-400" />
            </div>
            <h3 className="text-white font-medium mb-2">Nova Ideia</h3>
            <p className="text-gray-400 text-sm text-center">Criar um novo projeto a partir de uma descrição</p>
          </div>
        </div>
      ) : (
        // List view
        <div className="bg-gray-800 rounded-xl overflow-hidden">
          <table className="w-full">
            <thead>
              <tr className="border-b border-gray-700">
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Nome</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Status</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Tags</th>
                <th className="text-left py-3 px-4 text-gray-400 font-medium">Data</th>
                <th className="py-3 px-4 text-gray-400 font-medium"></th>
              </tr>
            </thead>
            <tbody>
              {projects.map(project => (
                <tr
                  key={project.id}
                  className="border-b border-gray-700 hover:bg-gray-750 cursor-pointer transition-colors"
                  onClick={() => {
                    setSelectedProject(project);
                    setActiveView('editor');
                  }}
                >
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className="w-10 h-10 rounded-lg overflow-hidden flex-shrink-0">
                        <img
                          src={project.thumbnail}
                          alt={project.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="ml-3">
                        <h3 className="text-white font-medium">{project.name}</h3>
                        <p className="text-gray-400 text-sm">{project.description.slice(0, 40)}...</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`text-xs px-2 py-1 rounded ${project.status === 'completed'
                        ? 'bg-green-900/40 text-green-400'
                        : 'bg-blue-900/40 text-blue-400'
                      }`}>
                      {project.status === 'completed' ? 'Completo' : 'Em Progresso'}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-1">
                      {project.tags.map((tag, index) => (
                        <span key={index} className="text-xs bg-gray-700 text-gray-300 px-1.5 py-0.5 rounded">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </td>
                  <td className="py-3 px-4 text-gray-400">{project.date}</td>
                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // In a real app, we would update the state here
                        console.log(`Toggling star for project: ${project.name}`);
                      }}
                      className="text-gray-400 hover:text-yellow-400 mr-2"
                      title="Favoritar projeto"
                      aria-label="Favoritar projeto"
                    >
                      <Star
                        size={18}
                        fill={project.starred ? "currentColor" : "none"}
                        className={project.starred ? "text-yellow-400" : ""}
                      />
                    </button>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        // Show options menu
                        alert("Opções do projeto: " + project.name);
                      }}
                      className="text-gray-400 hover:text-white"
                    >
                      <MoreVertical size={18} />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );

  // Renderizar página de criação
  const renderCreate = () => (
    <div className="p-6 max-w-5xl mx-auto">
      <div className="mb-8">
        <h2 className="text-white text-xl font-medium mb-2">Descreva sua Ideia</h2>
        <p className="text-gray-400">
          Explique em detalhes o projeto que você deseja criar. Quanto mais detalhada for sua descrição,
          melhores serão os resultados gerados pela IA.
        </p>
      </div>

      <div className="bg-gray-800 rounded-xl p-6 mb-8">
        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="idea-title" className="text-white font-medium">Nome do Projeto</label>
          </div>
          <input
            type="text"
            id="idea-title"
            placeholder="Ex: Dashboard de E-commerce"
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg py-2 px-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div className="mb-6">
          <div className="flex items-center justify-between mb-2">
            <label htmlFor="idea-description" className="text-white font-medium">Descrição Detalhada</label>
            <div className="flex items-center">
              <button
                onClick={() => setRecording(!recording)}
                className={`flex items-center justify-center p-1.5 rounded-lg mr-2 ${recording ? 'bg-red-500 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
                title="Usar microfone"
                aria-label="Usar microfone"
              >
                <Mic size={18} />
              </button>
              <span className="text-xs text-gray-400">
                {recording ? 'Gravando...' : 'Usar voz'}
              </span>
            </div>
          </div>
          <textarea
            id="idea-description"
            value={ideaInput}
            onChange={(e) => setIdeaInput(e.target.value)}
            placeholder="Descreva em detalhes o que você deseja criar. Por exemplo: 'Quero um dashboard para e-commerce que mostre métricas de vendas, gráficos de tendências, e uma lista dos pedidos recentes. Deve ter filtros para diferentes períodos e categorias de produtos.'"
            className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg py-3 px-4 focus:outline-none focus:ring-2 focus:ring-blue-500 h-36 resize-none"
          ></textarea>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="text-white font-medium block mb-2">Modelo de IA</label>
            <div className="space-y-2">
              {availableAIModels.length === 0 ? (
                <div className="text-center p-4 bg-gray-700/50 rounded-lg">
                  <p className="text-gray-400 mb-2">Nenhum modelo de IA disponível</p>
                  <button 
                    onClick={() => setShowAPIKeyManager(true)}
                    className="px-4 py-2 bg-blue-600 text-white text-sm rounded-lg hover:bg-blue-700"
                  >
                    Configurar Chaves de API
                  </button>
                </div>
              ) : (
                availableAIModels.map(model => (
                  <div key={model.id} className="flex items-center p-2 rounded-lg hover:bg-gray-700 cursor-pointer">
                    <input
                      type="radio"
                      id={model.id}
                      name="aiModel"
                      checked={selectedModel === model.id}
                      onChange={() => setSelectedModel(model.id)}
                      className="mr-3 accent-blue-500"
                    />
                    <div className="flex items-center flex-1">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-r ${model.color} flex items-center justify-center`}>
                        <Sparkles size={14} className="text-white" />
                      </div>
                      <div className="ml-3">
                        <label htmlFor={model.id} className="text-white text-sm font-medium cursor-pointer">{model.name}</label>
                        <p className="text-gray-400 text-xs">{model.provider}</p>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </div>

          <div>
            <label className="text-white font-medium block mb-2">Configurações</label>
            <div className="space-y-3">
              <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                <div>
                  <p className="text-white text-sm">Código Comentado</p>
                  <p className="text-gray-400 text-xs">Incluir comentários explicativos</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    defaultChecked 
                    id="comentarios"
                    aria-label="Ativar código comentado"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                <div>
                  <p className="text-white text-sm">Design Responsivo</p>
                  <p className="text-gray-400 text-xs">Adaptar para todos dispositivos</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    className="sr-only peer" 
                    defaultChecked 
                    id="responsivo"
                    aria-label="Ativar design responsivo"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>

              <div className="flex items-center justify-between bg-gray-700 p-3 rounded-lg">
                <div>
                  <p className="text-white text-sm">Interações Avançadas</p>
                  <p className="text-gray-400 text-xs">Incluir animações e eventos</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input 
                    type="checkbox" 
                    id="advanced-interactions"
                    name="advanced-interactions"
                    className="sr-only peer"
                    aria-label="Ativar interações avançadas"
                  />
                  <div className="w-11 h-6 bg-gray-600 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                </label>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <button
          onClick={() => setActiveView('dashboard')}
          className="px-4 py-2 bg-gray-700 hover:bg-gray-600 text-white rounded-lg flex items-center"
        >
          <span>Cancelar</span>
        </button>

        <button
          onClick={startProcessing}
          disabled={ideaInput.trim() === '' || processing}
          className={`px-6 py-2 rounded-lg flex items-center ${ideaInput.trim() === '' || processing
              ? 'bg-gray-700 text-gray-400 cursor-not-allowed'
              : 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white hover:opacity-90'
            }`}
        >
          {processing ? (
            <>
              <div className="animate-spin rounded-full h-5 w-5 border-t-2 border-b-2 border-white mr-3"></div>
              <span>Gerando Projeto...</span>
            </>
          ) : (
            <>
              <Sparkles size={20} className="mr-2" />
              <span>Gerar Projeto</span>
            </>
          )}
        </button>
      </div>
    </div>
  );

  // Renderizar editor de projeto
  const renderEditor = () => {
    if (!selectedProject) return null;

    return (
      <div className="h-[calc(100vh-124px)] flex">
        {/* Área de visualização/código */}
        <div className={`flex-1 p-6 ${showCodePanel ? 'pr-0' : ''}`}>
          <div className="bg-gray-800 rounded-xl h-full overflow-hidden">
            {viewMode === 'preview' ? (
              // Preview do projeto
              <div className="flex flex-col h-full">
                <div className="bg-gray-900 py-2 px-4 flex items-center justify-between border-b border-gray-700">
                  <div className="flex items-center">
                    <div className="w-3 h-3 rounded-full bg-red-500 mr-1.5"></div>
                    <div className="w-3 h-3 rounded-full bg-yellow-500 mr-1.5"></div>
                    <div className="w-3 h-3 rounded-full bg-green-500"></div>
                  </div>
                  <div className="flex items-center text-xs text-gray-400">
                    <span className="px-2 py-1 rounded bg-gray-800 mr-2">localhost:3000</span>
                    <button 
                      className="text-gray-400 hover:text-white p-1" 
                      title="Maximizar janela" 
                      aria-label="Maximizar janela"
                    >
                      <Maximize2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="flex-1 p-4 overflow-auto bg-gray-100">
                  <div className="max-w-5xl mx-auto">
                    {/* Versão simplificada do dashboard para preview */}
                    <div className="bg-white p-4 rounded-lg shadow mb-6">
                      <h1 className="text-xl font-bold text-gray-800 mb-4">E-commerce Dashboard</h1>

                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                        <div className="bg-blue-50 p-4 rounded-lg border border-blue-100">
                          <h3 className="text-sm font-medium text-gray-600">Total Sales</h3>
                          <p className="text-2xl font-bold text-gray-800">
                            ${salesData.reduce((sum, day) => sum + day.sales, 0).toLocaleString()}
                          </p>
                          <p className="text-xs text-gray-500">Past 7 days</p>
                        </div>

                        <div className="bg-green-50 p-4 rounded-lg border border-green-100">
                          <h3 className="text-sm font-medium text-gray-600">Orders</h3>
                          <p className="text-2xl font-bold text-gray-800">
                            {salesData.reduce((sum, day) => sum + day.orders, 0)}
                          </p>
                          <p className="text-xs text-gray-500">Past 7 days</p>
                        </div>

                        <div className="bg-purple-50 p-4 rounded-lg border border-purple-100">
                          <h3 className="text-sm font-medium text-gray-600">Avg. Order Value</h3>
                          <p className="text-2xl font-bold text-gray-800">
                            ${(
                              salesData.reduce((sum, day) => sum + day.sales, 0) /
                              salesData.reduce((sum, day) => sum + day.orders, 0)
                            ).toFixed(2)}
                          </p>
                          <p className="text-xs text-gray-500">Past 7 days</p>
                        </div>
                      </div>

                      <div className="bg-gray-50 p-4 rounded-lg border border-gray-200 mb-6">
                        <h2 className="font-medium text-gray-700 mb-4">Sales Trend</h2>
                        <div className="h-48 flex items-end space-x-2">
                          {salesData.map((day, index) => (
                            <div key={index} className="flex flex-col items-center flex-1">
                              <div
                                className="bg-blue-500 w-full rounded-t-sm"
                                style={{ height: `${day.sales / 14}px` }}
                              ></div>
                              <p className="text-xs text-gray-500 mt-1">{day.date}</p>
                            </div>
                          ))}
                        </div>
                      </div>

                      <div className="bg-white">
                        <h2 className="font-medium text-gray-700 mb-2">Recent Orders</h2>
                        <div className="overflow-x-auto">
                          <table className="min-w-full divide-y divide-gray-200">
                            <thead>
                              <tr>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Customer</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                              </tr>
                            </thead>
                            <tbody className="divide-y divide-gray-200">
                              {Array(5).fill(0).map((_, i) => (
                                <tr key={i}>
                                  <td className="px-4 py-2 text-sm text-gray-500">#ORD-{1000 + i}</td>
                                  <td className="px-4 py-2 text-sm text-gray-800">Customer {i + 1}</td>
                                  <td className="px-4 py-2 text-sm text-gray-500">March {10 - i}, 2024</td>
                                  <td className="px-4 py-2 text-sm text-gray-800">${Math.floor(Math.random() * 300) + 50}</td>
                                  <td className="px-4 py-2">
                                    <span className={`px-2 py-1 text-xs font-medium rounded-full ${['bg-green-100 text-green-800', 'bg-yellow-100 text-yellow-800', 'bg-green-100 text-green-800', 'bg-yellow-100 text-yellow-800', 'bg-blue-100 text-blue-800'][i]
                                      }`}>
                                      {['Completed', 'Processing', 'Completed', 'Processing', 'Shipped'][i]}
                                    </span>
                                  </td>
                                </tr>
                              ))}
                            </tbody>
                          </table>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              // Visualização do código
              <div className="flex flex-col h-full">
                <div className="bg-gray-900 py-2 px-4 flex items-center justify-between border-b border-gray-700">
                  <div className="flex items-center">
                    <span className="text-gray-400 text-sm">EcommerceDashboard.jsx</span>
                  </div>
                  <div className="flex items-center">
                    <button className="text-gray-400 hover:text-white p-1 mr-1"
                      title="Copiar código"
                      aria-label="Copiar código"
                    >
                      <Copy size={14} />
                    </button>
                    <button 
                      className="text-gray-400 hover:text-white p-1" 
                      title="Maximizar janela" 
                      aria-label="Maximizar janela"
                    >
                      <Maximize2 size={14} />
                    </button>
                  </div>
                </div>
                <div className="flex-1 p-4 overflow-auto">
                  <pre className="text-gray-300 text-sm font-mono whitespace-pre-wrap">
                    {sampleCode}
                  </pre>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Painel lateral de código/sugestões */}
        {showCodePanel && (
          <div className="w-96 border-l border-gray-700 flex flex-col h-full">
            <div className="bg-gray-900 p-4 border-b border-gray-700 flex items-center justify-between">
              <h3 className="text-white font-medium">Sugestões de IA</h3>
              <button
                onClick={() => setShowCodePanel(false)}
                className="text-gray-400 hover:text-white"
                title="Fechar painel"
                aria-label="Fechar painel"
              >
                <X size={18} />
              </button>
            </div>
            <div className="flex-1 p-4 overflow-auto">
              <div className="space-y-4">
                <div className="bg-blue-900/30 border border-blue-800 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Sparkles size={16} className="text-blue-400 mr-2" />
                    <h4 className="text-white font-medium">Sugestão de Melhoria</h4>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    Adicione filtros de categorias para permitir analisar o desempenho por tipo de produto.
                  </p>
                  <div className="flex justify-end">
                    <button className="text-xs text-blue-400 hover:text-blue-300 px-2 py-1 bg-blue-900/30 rounded"
                      title="Aplicar esta sugestão"
                      aria-label="Aplicar esta sugestão"
                    >
                      Aplicar Sugestão
                    </button>
                  </div>
                </div>

                <div className="bg-gray-750 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <Code size={16} className="text-purple-400 mr-2" />
                    <h4 className="text-white font-medium">Otimização de Código</h4>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    Use React.memo para componentes da tabela de pedidos para melhor performance.
                  </p>
                  <div className="flex justify-end">
                    <button className="text-xs text-purple-400 hover:text-purple-300 px-2 py-1 bg-purple-900/30 rounded"
                      title="Otimizar código"
                      aria-label="Otimizar código"
                    >
                      Otimizar Código
                    </button>
                  </div>
                </div>

                <div className="bg-gray-750 border border-gray-700 rounded-lg p-4">
                  <div className="flex items-center mb-2">
                    <HelpCircle size={16} className="text-yellow-400 mr-2" />
                    <h4 className="text-white font-medium">Potenciais Problemas</h4>
                  </div>
                  <p className="text-gray-300 text-sm mb-3">
                    Há um potencial problema de renderização quando não há dados disponíveis.
                  </p>
                  <div className="flex justify-end">
                    <button className="text-xs text-yellow-400 hover:text-yellow-300 px-2 py-1 bg-yellow-900/30 rounded"
                      title="Corrigir problema"
                      aria-label="Corrigir problema"
                    >
                      Corrigir Problema
                    </button>
                  </div>
                </div>

                <div className="mt-6">
                  <h4 className="text-white font-medium mb-3">Pergunte à IA</h4>
                  <div className="relative">
                    <label htmlFor="ai-question" className="sr-only">Pergunte à IA</label>
                    <input
                      id="ai-question"
                      type="text"
                      placeholder="Ex: Como adicionar um filtro de data?"
                      className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg py-2 pl-3 pr-10 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                    <button className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-white"
                      title="Enviar mensagem"
                      aria-label="Enviar mensagem"
                    >
                      <Send size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  };

  // Renderizar Chat IA
  const renderChat = () => {
    if (!showChat) return null;

    return (
      <div className="fixed bottom-4 right-4 w-80 bg-gray-900 rounded-xl shadow-lg border border-gray-700 z-40">
        <div className="p-3 border-b border-gray-700 flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center">
              <Sparkles size={16} className="text-white" />
            </div>
            <h3 className="ml-2 text-white font-medium">Assistente IA</h3>
          </div>
          <button
            onClick={() => setShowChat(false)}
            className="text-gray-400 hover:text-white"
            title="Fechar chat"
            aria-label="Fechar chat"
          >
            <X size={18} />
          </button>
        </div>
        <div className="h-80 overflow-y-auto p-3 bg-gray-850">
          <div className="flex mb-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
              <Sparkles size={12} className="text-white" />
            </div>
            <div className="ml-2 bg-gray-800 rounded-lg p-2 text-gray-300 text-sm max-w-[85%]">
              Olá! Como posso ajudar com seu projeto hoje?
            </div>
          </div>

          <div className="flex justify-end mb-3">
            <div className="bg-blue-900/50 rounded-lg p-2 text-gray-200 text-sm max-w-[85%]">
              Como faço para adicionar um sistema de filtros no dashboard?
            </div>
          </div>

          <div className="flex mb-3">
            <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 flex items-center justify-center flex-shrink-0">
              <Sparkles size={12} className="text-white" />
            </div>
            <div className="ml-2 bg-gray-800 rounded-lg p-2 text-gray-300 text-sm max-w-[85%]">
              Para adicionar filtros, você pode criar componentes de seleção no cabeçalho do dashboard. Vou preparar um código de exemplo para você.
            </div>
          </div>
        </div>
        <div className="p-3 border-t border-gray-700">
          <div className="relative">
            <label htmlFor="chat-input" className="sr-only">Digite sua pergunta</label>
            <input
              id="chat-input"
              type="text"
              placeholder="Digite sua pergunta..."
              className="w-full bg-gray-800 border border-gray-700 text-gray-200 rounded-lg py-2 pl-3 pr-10 focus:outline-none focus:ring-1 focus:ring-blue-500 text-sm"
            />
            <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex">
              <button className="text-gray-400 hover:text-white mr-1"
                title="Ativar microfone"
                aria-label="Ativar microfone"
              >
                <Mic size={16} />
              </button>
              <button className="text-gray-400 hover:text-white"
                title="Enviar mensagem"
                aria-label="Enviar mensagem"
              >
                <Send size={16} />
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Renderizar indicador de demonstração
  const renderDemoIndicator = () => {
    if (!demoMode) return null;

    return (
      <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-2 px-4 rounded-lg shadow-lg z-50 flex items-center">
        <Zap size={18} className="mr-2" />
        <span>Demonstração: Passo {demoStep + 1}/8</span>
      </div>
    );
  };

  // Componente principal
  return (
    <div className="bg-gray-950 text-gray-200 min-h-screen flex overflow-hidden">
      {renderSidebar()}

      <div className="flex-1 flex flex-col transition-all duration-300 w-full">
        <div className="fixed top-0 left-0 w-full z-20 bg-opacity-50 bg-black h-full"
          onClick={() => setMenuVisible(false)}
          style={{ display: menuVisible ? 'block' : 'none' }}
          role="button"
          aria-label="Fechar menu lateral"
          title="Fechar menu lateral"
        />
        {renderHeader()}

        <main className="flex-1 overflow-y-auto">
          {activeView === 'dashboard' && renderDashboard()}
          {activeView === 'create' && renderCreate()}
          {activeView === 'editor' && renderEditor()}
          {activeView === 'explore' && (
            <div className="flex items-center justify-center h-full text-gray-400">
              Área de exploração em desenvolvimento
            </div>
          )}
          {activeView === 'community' && (
            <div className="flex items-center justify-center h-full text-gray-400">
              Área de comunidade em desenvolvimento
            </div>
          )}
        </main>
      </div>

      {renderChat()}
      {renderDemoIndicator()}
      {aiError && (
        <AIErrorNotification 
          message={aiError} 
          onDismiss={() => setAiError(null)} 
        />
      )}
      
      {/* Modal de Configuração de Chaves de API */}
      {showAPIKeyManager && (
        <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50">
          <div className="bg-gray-900 rounded-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
            <div className="flex items-center justify-between p-4 border-b border-gray-800">
              <h2 className="text-xl font-medium text-white">Configurações de API</h2>
              <button
                onClick={() => setShowAPIKeyManager(false)}
                className="text-gray-400 hover:text-white"
                title="Fechar"
                aria-label="Fechar"
              >
                <X size={24} />
              </button>
            </div>
            <div className="p-6">
              <APIKeyManager />
            </div>
          </div>
        </div>
      )}
    </div>
  );
}