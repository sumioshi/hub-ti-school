import React, { useState, useEffect } from 'react';
import {
  Package, MapPin, ShoppingBag, Award, Zap, PieChart, Truck,
  CreditCard, Layers, ChevronRight, Search, User, Bell, Menu, X,
  Star, ArrowRight, DollarSign, CheckCircle
} from 'lucide-react';
import { BackButton } from '../../components/BackButton';

// Definição das interfaces para tipagem
interface Plan {
  id: number;
  name: string;
  price: string;
  color: string;
  features: string[];
  recommended?: boolean;
}

interface Store {
  id: number;
  name: string;
  distance: string;
  rating: number;
  address: string;
  openHours: string;
  products: number;
  image: string;
  pickupTime: string;
}

interface Product {
  id: number;
  name: string;
  brand: string;
  category: string;
  size: string;
  image: string;
  description: string;
  flavors: string[];
  rating: number;
  reviews: number;
  popular: boolean;
}

// Dados estáticos (movidos para fora do componente)
const plans: Plan[] = [
  {
    id: 1,
    name: 'Básico',
    price: 'R$ 139,90/mês',
    color: 'from-blue-500 to-teal-400',
    features: [
      '1kg de Whey Protein por mês',
      '1 pote de Creatina (300g) a cada 2 meses',
      'Retirada em loja parceira',
      'Acesso ao catálogo básico'
    ]
  },
  {
    id: 2,
    name: 'Pro',
    price: 'R$ 249,90/mês',
    color: 'from-purple-500 to-indigo-500',
    features: [
      '2kg de Whey Protein por mês',
      '1 pote de Creatina (300g) por mês',
      '1 pré-treino ou BCAA por mês',
      'Retirada em loja ou entrega (1x mês)',
      '5% de cashback em compras extras',
      'Acesso ao catálogo completo'
    ],
    recommended: true
  },
  {
    id: 3,
    name: 'Elite',
    price: 'R$ 379,90/mês',
    color: 'from-amber-500 to-red-500',
    features: [
      '3kg de Whey Protein por mês',
      '1 pote de Creatina (500g) por mês',
      '2 pré-treinos ou BCAAs por mês',
      '1 suplemento premium por mês',
      'Entregas ilimitadas',
      '10% de cashback em compras extras',
      'Acesso ao catálogo premium',
      'Consultoria nutricional mensal'
    ]
  }
];

const stores: Store[] = [
  {
    id: 1,
    name: 'SupplementX',
    distance: '1.2km',
    rating: 4.8,
    address: 'Av. Paulista, 1000 - São Paulo',
    openHours: '09:00 - 22:00',
    products: 189,
    image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=64&h=64&q=80',
    pickupTime: '10-15 min'
  },
  {
    id: 2,
    name: 'MuscleNation',
    distance: '3.5km',
    rating: 4.7,
    address: 'Rua Augusta, 1200 - São Paulo',
    openHours: '10:00 - 21:00',
    products: 205,
    image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=64&h=64&q=80',
    pickupTime: '5-10 min'
  },
  {
    id: 3,
    name: 'FitFormula',
    distance: '5.8km',
    rating: 4.9,
    address: 'Av. Rebouças, 3000 - São Paulo',
    openHours: '08:00 - 20:00',
    products: 176,
    image: 'https://images.unsplash.com/photo-1506748686214-e9df14d4d9d0?auto=format&fit=crop&w=64&h=64&q=80',
    pickupTime: '15-20 min'
  }
];

const products: Product[] = [
  {
    id: 1,
    name: 'Whey Protein Isolado',
    brand: 'ProElite',
    category: 'Proteínas',
    size: '1kg',
    image: '/api/placeholder/200/200',
    description: 'Whey protein isolado de alta qualidade com 27g de proteína por dose. Baixo teor de carboidratos e gorduras.',
    flavors: ['Chocolate', 'Baunilha', 'Morango', 'Cookies'],
    rating: 4.8,
    reviews: 423,
    popular: true
  },
  {
    id: 2,
    name: 'Creatina Monohidratada',
    brand: 'MusclePower',
    category: 'Performance',
    size: '300g',
    image: '/api/placeholder/200/200',
    description: 'Creatina pura micronizada para aumento de força e performance nos treinos. Sem aditivos.',
    flavors: ['Sem sabor'],
    rating: 4.9,
    reviews: 512,
    popular: true
  },
  {
    id: 3,
    name: 'Pré-treino Ultimate',
    brand: 'TurboCharge',
    category: 'Energia',
    size: '300g',
    image: '/api/placeholder/200/200',
    description: 'Pré-treino completo com cafeína, beta-alanina, citrulina e arginina para máxima energia.',
    flavors: ['Frutas Vermelhas', 'Limão', 'Uva'],
    rating: 4.7,
    reviews: 318,
    popular: false
  },
  {
    id: 4,
    name: 'BCAA 2:1:1',
    brand: 'AminoFuel',
    category: 'Recuperação',
    size: '250g',
    image: '/api/placeholder/200/200',
    description: 'Blend de aminoácidos de cadeia ramificada para melhor recuperação muscular.',
    flavors: ['Laranja', 'Limão', 'Neutro'],
    rating: 4.5,
    reviews: 246,
    popular: false
  }
];

const userSubscription = {
  plan: 'Pro',
  startDate: '10/05/2023',
  nextCharge: '10/03/2024',
  remaining: {
    whey: { total: 2, used: 1, unit: 'kg' },
    creatine: { total: 1, used: 0, unit: 'pote' },
    preworkout: { total: 1, used: 0, unit: 'pote' }
  },
  history: [
    { date: '15/02/2024', product: 'Whey Protein Isolado (1kg)', store: 'SupplementX' },
    { date: '20/01/2024', product: 'Whey Protein Isolado (1kg)', store: 'FitFormula' },
    { date: '20/01/2024', product: 'Creatina Monohidratada (300g)', store: 'FitFormula' },
    { date: '15/12/2023', product: 'Whey Protein Isolado (1kg)', store: 'MuscleNation' }
  ],
  cashback: 78.45
};

const recommendedProducts = [
  {
    id: 1,
    name: 'Creatina Monohidratada',
    image: '/api/placeholder/64/64',
    reason: 'Potencial para +15% de força nos treinos de força'
  },
  {
    id: 2,
    name: 'Multivitamínico',
    image: '/api/placeholder/64/64',
    reason: 'Complemento para sua dieta com baixa ingestão de vegetais'
  },
  {
    id: 3,
    name: 'Whey Hydrolyzed',
    image: '/api/placeholder/64/64',
    reason: 'Absorção mais rápida para seu treino matinal'
  }
];

// Interface para o modal de produto
interface ProductModalProps {
  product: Product;
  onClose: () => void;
}

// Componente do Modal de Produto
const ProductModal: React.FC<ProductModalProps> = ({ product, onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 rounded-xl max-w-2xl w-full">
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <h3 className="text-xl font-bold text-white">{product.name}</h3>
            <button
              onClick={onClose}
              className="text-gray-400 hover:text-white"
              aria-label="Fechar modal"
              title="Fechar modal"
            >
              <X size={20} />
            </button>
          </div>
          
          <div className="flex flex-col md:flex-row gap-6 mb-6">
            <div className="w-full md:w-1/3 bg-gray-800 rounded-lg overflow-hidden">
<img 
  src="/api/placeholder/200/200" 
  alt={product.name} 
  className="w-full h-auto object-contain p-4"
/>
            </div>
            
            <div className="w-full md:w-2/3">
              <div className="flex items-center mb-2">
                <p className="text-blue-400 font-medium">{product.brand}</p>
                <span className="mx-2 text-gray-500">•</span>
                <p className="text-gray-300">{product.category}</p>
                <span className="mx-2 text-gray-500">•</span>
                <p className="text-gray-300">{product.size}</p>
              </div>
              
              <div className="flex items-center mb-4">
                <div className="flex items-center">
                  <Star size={16} className="text-yellow-400" />
                  <span className="ml-1 text-white">{product.rating}</span>
                </div>
                <span className="mx-2 text-gray-500">•</span>
                <span className="text-gray-400">{product.reviews} avaliações</span>
              </div>
              
              <p className="text-gray-300 mb-4">{product.description}</p>
              
              <div className="mb-4">
                <h4 className="text-white font-medium mb-2">Sabores disponíveis:</h4>
                <div className="flex flex-wrap gap-2">
                  {product.flavors.map((flavor, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1 bg-gray-700 rounded-full text-sm text-gray-300"
                    >
                      {flavor}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-col sm:flex-row gap-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-medium"
            >
              Fechar
            </button>
            <button
              className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium flex items-center justify-center"
            >
              <ShoppingBag size={18} className="mr-2" />
              <span>Adicionar ao plano</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

// Componente principal
const SuppliFitApp = () => {
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedPlan, setSelectedPlan] = useState<Plan | null>(null);
  const [selectedStore, setSelectedStore] = useState<Store | null>(null);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [sidebarOpen, setSidebarOpen] = useState<boolean>(false);
  const [modalOpen, setModalOpen] = useState<boolean>(false);
  const [storeDetailsOpen, setStoreDetailsOpen] = useState<boolean>(false);
  const [demoMode, setDemoMode] = useState<boolean>(false);
  const [productModalOpen, setProductModalOpen] = useState<boolean>(false);

  // Renderizar Indicador de Demo
  const renderDemoIndicator = () => {
    if (!demoMode) return null;

    return (
      <div className="fixed bottom-4 left-4 z-50 bg-gray-900 border border-gray-700 rounded-lg p-3 shadow-lg">
        <div className="flex items-center">
          <div className="animate-spin w-6 h-6 border-4 border-blue-500 rounded-full border-t-transparent mr-3"></div>
          <p className="text-sm text-white">Modo Demonstração</p>
        </div>
      </div>
    );
  };

  // Efeito para modo de demonstração
  useEffect(() => {
    if (demoMode) {
      const demoSteps = [
        () => setActiveTab('home'),
        () => setActiveTab('plans'),
        () => { setSelectedPlan(plans[1]); setModalOpen(true); },
        () => { setModalOpen(false); setSelectedPlan(null); setActiveTab('stores'); },
        () => { setSelectedStore(stores[0]); setStoreDetailsOpen(true); },
        () => { setStoreDetailsOpen(false); setSelectedStore(null); setActiveTab('products'); },
        () => { setSelectedProduct(products[0]); setProductModalOpen(true); },
        () => { setProductModalOpen(false); setSelectedProduct(null); setActiveTab('dashboard'); },
        () => { setActiveTab('home'); setDemoMode(false); }
      ];

      let currentStep = 0;
      let demoInterval: NodeJS.Timeout | null = null;

      demoInterval = setInterval(() => {
        if (currentStep < demoSteps.length) {
          demoSteps[currentStep]();
          currentStep++;
        } else {
          if (demoInterval) {
            clearInterval(demoInterval);
          }
          setDemoMode(false);
        }
      }, 3000);

      return () => {
        if (demoInterval) {
          clearInterval(demoInterval);
        }
      };
    }
  }, [demoMode]);

  // Renderizar Sidebar
  const renderSidebar = () => (
<div className={`fixed inset-y-0 left-0 z-40 w-64 bg-gray-900 shadow-lg transform ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'} transition-transform duration-300 lg:translate-x-0 lg:static lg:w-64`}>
      <div className="p-4 h-full flex flex-col">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-r from-blue-600 to-purple-600 flex items-center justify-center">
              <Package size={22} className="text-white" />
            </div>
            <div className="ml-3">
              <h1 className="text-lg font-bold text-white">SuppliFit</h1>
              <p className="text-xs text-gray-400">Gympass dos Suplementos</p>
            </div>
          </div>
          <button
            onClick={() => setSidebarOpen(false)}
            className="text-gray-500 hover:text-gray-300 lg:hidden"
            aria-label="Fechar menu"
            title="Fechar menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1">
          <ul className="space-y-1">
            {[
              { id: 'home', icon: <Layers size={20} />, label: 'Início' },
              { id: 'plans', icon: <Award size={20} />, label: 'Planos' },
              { id: 'stores', icon: <MapPin size={20} />, label: 'Lojas Parceiras' },
              { id: 'products', icon: <ShoppingBag size={20} />, label: 'Catálogo' },
              { id: 'dashboard', icon: <PieChart size={20} />, label: 'Minha Assinatura' },
              { id: 'ai', icon: <Zap size={20} />, label: 'Recomendações IA' },
            ].map(item => (
              <li key={item.id}>
                <button
                  onClick={() => { setActiveTab(item.id); setSidebarOpen(false); }}
                  className={`w-full flex items-center px-4 py-3 rounded-lg ${activeTab === item.id ? 'bg-gradient-to-r from-blue-900/40 to-purple-900/40 text-white' : 'text-gray-400 hover:bg-gray-800'}`}
                >
                  <span className={activeTab === item.id ? 'text-blue-400' : ''}>{item.icon}</span>
                  <span className="ml-3">{item.label}</span>
                </button>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-auto">
          <div className="bg-gray-800 rounded-lg p-3">
            <div className="flex items-center">
              <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
                <span className="text-xs font-bold text-white">MR</span>
              </div>
              <div className="ml-3">
                <p className="text-sm text-white">Matheus Ribeiro</p>
                <p className="text-xs text-gray-400">Plano Pro</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Renderizar Header
  const renderHeader = () => (
    <header className="bg-gray-900 border-b border-gray-800 sticky top-0 z-40">
      <div className="px-4 py-3 flex items-center justify-between">
        <div className="flex items-center">
          <button
            onClick={() => setSidebarOpen(true)}
            className="text-gray-400 hover:text-white mr-3 lg:hidden"
            aria-label="Abrir menu"
            title="Abrir menu"
          >
            <Menu size={24} />
          </button>
          <h1 className="text-lg font-medium text-white">
            {activeTab === 'home' && 'Início'}
            {activeTab === 'plans' && 'Planos de Assinatura'}
            {activeTab === 'stores' && 'Lojas Parceiras'}
            {activeTab === 'products' && 'Catálogo de Suplementos'}
            {activeTab === 'dashboard' && 'Minha Assinatura'}
            {activeTab === 'ai' && 'Recomendações IA'}
          </h1>
        </div>

        <div className="flex items-center">
          <button
            className="text-gray-400 hover:text-white mr-4 relative"
            aria-label="Notificações"
            title="Notificações"
          >
            <Bell size={20} />
            <span className="absolute -top-1 -right-1 w-4 h-4 bg-blue-500 rounded-full text-white text-xs flex items-center justify-center">3</span>
          </button>
          <button
            className="text-gray-400 hover:text-white"
            aria-label="Perfil do usuário"
            title="Perfil do usuário"
          >
            <User size={20} />
          </button>
        </div>
      </div>
    </header>
  );

  // Renderizar Home
  const renderHome = () => (
    <div className="p-4 sm:p-6">
      <div className="mb-8 bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-6 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-40 h-40 bg-blue-500 rounded-full filter blur-3xl opacity-20"></div>
        <div className="absolute bottom-0 left-10 w-32 h-32 bg-purple-500 rounded-full filter blur-3xl opacity-20"></div>
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-white relative z-10">Bem-vindo ao SuppliFit</h2>
        <p className="text-gray-300 mb-4 max-w-lg relative z-10">Sua assinatura de suplementos. Recarregue sua suplementação mensalmente nas melhores lojas parceiras.</p>
        <div className="flex flex-wrap gap-4">
          <button
            onClick={() => setActiveTab('plans')}
            className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg hover:opacity-90 text-white font-medium flex items-center"
          >
            <span>Ver Planos</span>
            <ChevronRight size={18} className="ml-1" />
          </button>
          <button
            onClick={() => setDemoMode(true)}
            className="px-4 py-2 bg-gray-800 rounded-lg hover:bg-gray-700 text-white font-medium"
          >
            Iniciar Demo
          </button>
        </div>
      </div>

      <h3 className="text-lg font-medium mb-4 text-white">Como funciona</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          {
            icon: <CreditCard className="text-blue-400" size={24} />,
            title: "Assine um plano",
            description: "Escolha entre os planos Básico, Pro ou Elite de acordo com suas necessidades."
          },
          {
            icon: <ShoppingBag className="text-purple-400" size={24} />,
            title: "Selecione seus suplementos",
            description: "Escolha os suplementos que deseja dentro das opções do seu plano."
          },
          {
            icon: <MapPin size={24} className="text-gray-400" />,
            title: "Retire ou receba",
            description: "Retire na loja parceira mais próxima ou receba em casa, dependendo do seu plano."
          },
        ].map((item, index) => (
          <div key={index} className="bg-gray-800 rounded-xl p-5">
            <div className="w-12 h-12 rounded-full bg-gray-700 flex items-center justify-center mb-4">
              {item.icon}
            </div>
            <h4 className="text-lg font-medium mb-2 text-white">{item.title}</h4>
            <p className="text-gray-400">{item.description}</p>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-white">Planos populares</h3>
        <button
          onClick={() => setActiveTab('plans')}
          className="text-blue-400 flex items-center text-sm"
        >
          <span>Ver todos</span>
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
        {plans.filter(plan => plan.recommended).map(plan => (
          <div
            key={plan.id}
            className="bg-gray-800 rounded-xl p-5 border border-purple-500/50 relative"
          >
            <div className="absolute top-3 right-3 bg-purple-600 text-xs text-white px-2 py-1 rounded-full">
              Recomendado
            </div>
            <h4 className="text-lg font-medium mb-1 text-white">{plan.name}</h4>
            <p className="text-xl font-bold mb-4 bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {plan.price}
            </p>
            <ul className="space-y-2 mb-4">
              {plan.features.map((feature: string, index: number) => (
                <li key={index} className="flex items-start">
                  <CheckCircle size={16} className="text-green-400 mt-0.5 mr-2 flex-shrink-0" />
                  <span className="text-sm text-gray-300">{feature}</span>
                </li>
              ))}
            </ul>
            <button
              onClick={() => { setSelectedPlan(plan); setModalOpen(true); }}
              className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium hover:opacity-90"
            >
              Selecionar
            </button>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-medium text-white">Lojas parceiras próximas</h3>
        <button
          onClick={() => setActiveTab('stores')}
          className="text-blue-400 flex items-center text-sm"
        >
          <span>Ver todas</span>
          <ChevronRight size={16} className="ml-1" />
        </button>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {stores.slice(0, 3).map(store => (
          <div key={store.id} className="bg-gray-800 rounded-xl p-4">
            <div className="flex items-center mb-3">
              <div className="w-12 h-12 rounded-lg bg-gray-700 overflow-hidden">
<Package size={24} className="w-full h-full text-gray-400" />
              </div>
              <div className="ml-3">
                <h4 className="font-medium text-white">{store.name}</h4>
                <div className="flex items-center text-sm">
                  <MapPin size={14} className="text-gray-400 mr-1" />
                  <span className="text-gray-400">{store.distance}</span>
                  <span className="mx-2 text-gray-500">•</span>
                  <div className="flex items-center">
                    <Star size={14} className="text-yellow-400 mr-1" />
                    <span className="text-gray-400">{store.rating}</span>
                  </div>
                </div>
              </div>
            </div>
            <button
              onClick={() => { setSelectedStore(store); setStoreDetailsOpen(true); }}
              className="w-full py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-white flex items-center justify-center"
            >
              <MapPin size={14} className="mr-1" />
              <span>Ver detalhes</span>
            </button>
          </div>
        ))}
      </div>
    </div>
  );

  // Renderizar Planos
  const renderPlans = () => (
    <div className="p-4 sm:p-6">
      <div className="mb-8 bg-gradient-to-r from-indigo-900 to-purple-900 rounded-xl p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-white">Planos de Assinatura</h2>
        <p className="text-gray-300">Escolha o plano ideal para suas necessidades de suplementação.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {plans.map(plan => (
          <div
            key={plan.id}
            className={`bg-gray-800 rounded-xl overflow-hidden ${plan.recommended ? 'ring-2 ring-purple-500' : ''}`}
          >
            {plan.recommended && (
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 py-1.5 px-4 text-center">
                <span className="text-sm font-medium text-white">Mais Popular</span>
              </div>
            )}
            <div className="p-6">
              <h3 className="text-xl font-bold text-white mb-1">{plan.name}</h3>
              <div className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent text-2xl font-bold mb-4">
                {plan.price}
              </div>
              <ul className="space-y-3 mb-6">
                {plan.features.map((feature: string, index: number) => (
                  <li key={index} className="flex">
                    <CheckCircle size={18} className={`mr-2 mt-0.5 flex-shrink-0 ${plan.recommended ? 'text-purple-400' : 'text-blue-400'}`} />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
              <button
                onClick={() => { setSelectedPlan(plan); setModalOpen(true); }}
                className={`w-full py-2.5 rounded-lg font-medium text-white ${plan.recommended ? 'bg-gradient-to-r from-purple-600 to-indigo-600 hover:opacity-90' : 'bg-gray-700 hover:bg-gray-600'}`}
              >
                Assinar agora
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-8 bg-gray-800 rounded-xl p-6">
        <h3 className="text-lg font-medium mb-4 text-white">Perguntas Frequentes</h3>
        <div className="space-y-4">
          {[
            {
              question: "Como funciona a retirada de suplementos?",
              answer: "Após assinar um plano, você pode escolher os suplementos e retirar em qualquer loja parceira, apresentando o QR Code gerado no aplicativo."
            },
            {
              question: "Posso trocar de plano a qualquer momento?",
              answer: "Sim, você pode fazer upgrade ou downgrade do seu plano a qualquer momento. As mudanças serão aplicadas no próximo ciclo de faturamento."
            },
            {
              question: "Existe período mínimo de fidelidade?",
              answer: "Não há período mínimo de fidelidade. Você pode cancelar sua assinatura quando quiser, sem multas."
            }
          ].map((item, index) => (
            <div key={index} className="border-b border-gray-700 pb-4">
              <h4 className="font-medium text-white mb-2">{item.question}</h4>
              <p className="text-gray-400 text-sm">{item.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );

  // Renderizar Lojas
  const renderStores = () => (
    <div className="p-4 sm:p-6">
      <div className="bg-gray-800 rounded-xl p-4 mb-6">
        <div className="relative">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar lojas por nome ou localização..."
            className="w-full bg-gray-700 text-gray-200 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {stores.map(store => (
          <div key={store.id} className="bg-gray-800 rounded-xl overflow-hidden">
            <div className="p-4">
              <div className="flex items-center mb-3">
                <div className="w-16 h-16 rounded-lg bg-gray-700 overflow-hidden flex-shrink-0">
<Package size={24} className="w-full h-full text-gray-400" />
                </div>
                <div className="ml-3">
                  <h3 className="text-lg font-medium text-white">{store.name}</h3>
                  <div className="flex items-center text-sm mb-1">
                    <MapPin size={14} className="text-gray-400 mr-1" />
                    <span className="text-gray-400">{store.distance}</span>
                    <span className="mx-2 text-gray-500">•</span>
                    <div className="flex items-center">
                      <Star size={14} className="text-yellow-400 mr-1" />
                      <span className="text-gray-400">{store.rating}</span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-400">{store.address}</p>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-2 mb-4 text-sm">
                <div className="bg-gray-700 rounded-lg p-2">
                  <p className="text-gray-400">Horário</p>
                  <p className="text-white">{store.openHours}</p>
                </div>
                <div className="bg-gray-700 rounded-lg p-2">
                  <p className="text-gray-400">Produtos</p>
                  <p className="text-white">{store.products}+ itens</p>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => { setSelectedStore(store); setStoreDetailsOpen(true); }}
                  className="flex-1 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg font-medium text-white"
                >
                  Ver Detalhes
                </button>
                <button className="flex-1 py-2 bg-gray-700 hover:bg-gray-600 rounded-lg font-medium text-white">
                  Ver no Mapa
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Renderizar Produtos
  const renderProducts = () => (
    <div className="p-4 sm:p-6">
      <div className="bg-gray-800 rounded-xl p-4 mb-6">
        <div className="relative mb-4">
          <Search size={18} className="absolute left-3 top-3 text-gray-400" />
          <input
            type="text"
            placeholder="Buscar suplementos..."
            className="w-full bg-gray-700 text-gray-200 pl-10 pr-4 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
        <div className="flex flex-wrap gap-2">
          {['Todos', 'Proteínas', 'Creatina', 'Pré-treino', 'Aminoácidos', 'Vitaminas'].map((category: string, index: number) => (
            <button
              key={index}
              className={`px-3 py-1 rounded-full text-sm ${index === 0 ? 'bg-blue-600 text-white' : 'bg-gray-700 text-gray-300 hover:bg-gray-600'}`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      <h3 className="text-lg font-medium mb-4 text-white">Catálogo de Suplementos</h3>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
        {products.map(product => (
          <div
            key={product.id}
            className="bg-gray-800 rounded-xl overflow-hidden cursor-pointer hover:bg-gray-750 transition-colors"
            onClick={() => { setSelectedProduct(product); setProductModalOpen(true); }}
          >
            <div className="h-48 bg-gray-700 relative">
<Package size={24} className="w-full h-full text-gray-400" />
              {product.popular && (
                <div className="absolute top-2 right-2 bg-blue-600 text-white text-xs px-2 py-1 rounded-full">
                  Popular
                </div>
              )}
            </div>
            <div className="p-4">
              <p className="text-sm text-blue-400 mb-1">{product.brand}</p>
              <h4 className="font-medium text-white mb-1">{product.name}</h4>
              <p className="text-sm text-gray-400 mb-2">{product.size} • {product.category}</p>
              <div className="flex items-center">
                <div className="flex items-center">
                  <Star size={14} className="text-yellow-400" />
                  <span className="ml-1 text-sm text-white">{product.rating}</span>
                </div>
                <span className="mx-2 text-gray-500">•</span>
                <span className="text-sm text-gray-400">{product.reviews} avaliações</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Renderizar Dashboard
  const renderDashboard = () => (
    <div className="p-4 sm:p-6">
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-6 mb-6">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between">
          <div>
            <h2 className="text-xl font-bold mb-1 text-white">Assinatura {userSubscription.plan}</h2>
            <p className="text-gray-300">Próxima cobrança: {userSubscription.nextCharge}</p>
          </div>
          <div className="mt-4 md:mt-0">
            <button
              onClick={() => setActiveTab('plans')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg mr-2"
            >
              Mudar Plano
            </button>
            <button
              onClick={() => alert('Funcionalidade em desenvolvimento')}
              className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white rounded-lg"
            >
              Gerenciar
            </button>
          </div>
        </div>
      </div>

      <h3 className="text-lg font-medium mb-4 text-white">Suplementos do Mês</h3>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-8">
        {[
          {
            name: 'Whey Protein',
            used: userSubscription.remaining.whey.used,
            total: userSubscription.remaining.whey.total,
            unit: userSubscription.remaining.whey.unit,
            color: 'from-blue-500 to-cyan-500',
            icon: <Package size={20} />
          },
          {
            name: 'Creatina',
            used: userSubscription.remaining.creatine.used,
            total: userSubscription.remaining.creatine.total,
            unit: userSubscription.remaining.creatine.unit,
            color: 'from-purple-500 to-pink-500',
            icon: <Package size={20} />
          },
          {
            name: 'Pré-treino',
            used: userSubscription.remaining.preworkout.used,
            total: userSubscription.remaining.preworkout.total,
            unit: userSubscription.remaining.preworkout.unit,
            color: 'from-amber-500 to-red-500',
            icon: <Package size={20} />
          }
        ].map((item, index) => (
          <div key={index} className="bg-gray-800 rounded-xl p-5">
            <div className="flex justify-between items-center mb-4">
              <div className="flex items-center">
                <div className={`w-10 h-10 rounded-lg bg-gradient-to-r ${item.color} flex items-center justify-center`}>
                  {item.icon}
                </div>
                <h4 className="ml-3 font-medium text-white">{item.name}</h4>
              </div>
              <span className="text-sm text-gray-400">
                {item.used}/{item.total} {item.unit}
              </span>
            </div>
            <div className="h-2 bg-gray-700 rounded-full overflow-hidden">
              <div
                className={`h-full bg-gradient-to-r ${item.color}`}
                style={{ width: `${(item.used / item.total) * 100}%` }} // Estilo inline para largura dinâmica
              ></div>
            </div>
            <div className="mt-4 flex justify-between">
              <button
                onClick={() => alert(`Detalhes da sua cota de ${item.name}`)}
                className="px-3 py-1.5 bg-gray-700 hover:bg-gray-600 rounded-lg text-sm text-white"
              >
                Detalhes
              </button>
              {item.used < item.total && (
                <button
                  onClick={() => setActiveTab('stores')}
                  className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm text-white flex items-center"
                >
                  <Truck size={14} className="mr-1" />
                  <span>Retirar</span>
                </button>
              )}
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <h3 className="text-lg font-medium mb-4 text-white">Histórico de Retiradas</h3>
          <div className="bg-gray-800 rounded-xl overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gray-900">
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Data</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Produto</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-300">Loja</th>
                    <th className="py-3 px-4 text-left text-sm font-medium text-gray-300"></th>
                  </tr>
                </thead>
                <tbody>
                  {userSubscription.history.map((item, index) => (
                    <tr key={index} className="border-t border-gray-700">
                      <td className="py-3 px-4 text-sm text-gray-300">{item.date}</td>
                      <td className="py-3 px-4 text-sm text-white">{item.product}</td>
                      <td className="py-3 px-4 text-sm text-gray-300">{item.store}</td>
                      <td className="py-3 px-4 text-right">
                        <button onClick={() => alert('Detalhes do produto disponíveis em breve')} className="text-blue-400 hover:text-blue-300 text-sm">Detalhes</button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
        <div>
          <h3 className="text-lg font-medium mb-4 text-white">Meu Cashback</h3>
          <div className="bg-gray-800 rounded-xl p-5">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500 flex items-center justify-center">
                <DollarSign size={24} className="text-white" />
              </div>
              <div className="text-right">
                <p className="text-sm text-gray-400">Saldo disponível</p>
                <p className="text-2xl font-bold text-white">R$ {userSubscription.cashback.toFixed(2)}</p>
              </div>
            </div>
            <button
              onClick={() => alert(`Você tem R$ ${userSubscription.cashback.toFixed(2)} disponíveis para usar em sua próxima compra!`)}
              className="w-full py-2 bg-gradient-to-r from-green-600 to-emerald-600 rounded-lg text-white font-medium hover:opacity-90 mb-4"
            >
              Usar cashback
            </button>
            <div className="text-center text-sm text-gray-400">
              <p>5% de cashback em todas as compras extras</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Renderizar Recomendações IA
  const renderAI = () => (
    <div className="p-4 sm:p-6">
      <div className="mb-8 bg-gradient-to-r from-blue-900 to-purple-900 rounded-xl p-6">
        <h2 className="text-xl sm:text-2xl font-bold mb-2 text-white">Recomendações Inteligentes</h2>
        <p className="text-gray-300">Sugestões personalizadas com base no seu perfil e objetivos.</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-8">
        <div className="lg:col-span-2 bg-gray-800 rounded-xl p-5">
          <h3 className="text-lg font-medium mb-4 text-white">Suplementos Recomendados</h3>
          <div className="space-y-4">
            {recommendedProducts.map(product => (
              <div key={product.id} className="bg-gray-700 rounded-lg p-4">
                <div className="flex items-start">
                  <div className="w-16 h-16 rounded-lg bg-gray-600 overflow-hidden flex-shrink-0">
                    <Package size={24} className="w-full h-full text-gray-400" />
                  </div>
                  <div className="ml-4 flex-1">
                    <h4 className="font-medium text-white mb-1">{product.name}</h4>
                    <p className="text-sm text-gray-300 mb-3">{product.reason}</p>
                    <div className="flex justify-end">
                      <button className="px-3 py-1 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm text-white">
                        Adicionar ao plano
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="bg-gray-800 rounded-xl p-5">
          <h3 className="text-lg font-medium mb-4 text-white">Perfil Fitness</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm text-gray-300">Objetivo atual</p>
                <button className="text-xs text-blue-400">Editar</button>
              </div>
              <div className="bg-gray-700 rounded-lg px-3 py-2 text-white">
                Ganho de massa muscular
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm text-gray-300">Frequência de treino</p>
                <button className="text-xs text-blue-400">Editar</button>
              </div>
              <div className="bg-gray-700 rounded-lg px-3 py-2 text-white">
                5-6x por semana
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm text-gray-300">Tipo de treino</p>
                <button className="text-xs text-blue-400">Editar</button>
              </div>
              <div className="bg-gray-700 rounded-lg px-3 py-2 text-white">
                Musculação + HIIT
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <p className="text-sm text-gray-300">Restrições alimentares</p>
                <button className="text-xs text-blue-400">Editar</button>
              </div>
              <div className="bg-gray-700 rounded-lg px-3 py-2 text-white">
                Sem intolerância à lactose
              </div>
            </div>
            <button className="w-full py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium hover:opacity-90 mt-2">
              Atualizar perfil completo
            </button>
          </div>
        </div>
      </div>

      <div className="bg-gray-800 rounded-xl p-5">
        <h3 className="text-lg font-medium mb-4 text-white">Análise de Progresso</h3>
        <div className="bg-gray-700 rounded-lg p-4 mb-4">
          <div className="flex items-center mb-3">
            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-500 to-purple-500 flex items-center justify-center">
              <Zap size={20} className="text-white" />
            </div>
            <div className="ml-3">
              <h4 className="font-medium text-white">Insight da IA</h4>
              <p className="text-sm text-gray-300">Baseado nos seus últimos 3 meses de treino</p>
            </div>
          </div>
          <p className="text-gray-300 mb-4">Seu consumo de proteínas está abaixo do ideal para seu objetivo atual de ganho de massa. Recomendamos aumentar a ingestão de whey ou adicionar uma caseína noturna ao seu plano.</p>
          <div className="flex justify-end">
            <button className="px-4 py-1.5 bg-blue-600 hover:bg-blue-700 rounded-lg text-sm text-white flex items-center">
              <span>Ver recomendações</span>
              <ArrowRight size={14} className="ml-1" />
            </button>
          </div>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h5 className="font-medium text-white">Consumo de proteína</h5>
              <span className="text-sm text-blue-400">Últimos 30 dias</span>
            </div>
            <div className="flex items-end">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">Consumo atual</span>
                  <span className="text-sm text-white">1.5g/kg</span>
                </div>
                <div className="h-2 bg-gray-600 rounded-full">
                  <div className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full" style={{ width: '75%' }}></div> {/* Estilo inline para largura dinâmica */}
                </div>
              </div>
              <div className="ml-4 text-right">
                <span className="text-xs text-gray-400">Meta</span>
                <p className="text-lg font-bold text-white">2.0g/kg</p>
              </div>
            </div>
          </div>
          <div className="bg-gray-700 rounded-lg p-4">
            <div className="flex justify-between items-center mb-2">
              <h5 className="font-medium text-white">Consumo de creatina</h5>
              <span className="text-sm text-blue-400">Últimos 30 dias</span>
            </div>
            <div className="flex items-end">
              <div className="flex-1">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-gray-400">Consumo atual</span>
                  <span className="text-sm text-white">4.8g/dia</span>
                </div>
                <div className="h-2 bg-gray-600 rounded-full">
                  <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '96%' }}></div> {/* Estilo inline para largura dinâmica */}
                </div>
              </div>
              <div className="ml-4 text-right">
                <span className="text-xs text-gray-400">Meta</span>
                <p className="text-lg font-bold text-white">5g/dia</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  // Renderizar Modal de Plano
  const renderPlanModal = () => {
    if (!modalOpen || !selectedPlan) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 rounded-xl max-w-lg w-full">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div>
                <h3 className="text-xl font-bold text-white">Plano {selectedPlan.name}</h3>
                <p className="text-gray-400">Confirme sua assinatura</p>
              </div>
              <button
                onClick={() => setModalOpen(false)}
                className="text-gray-400 hover:text-white"
                aria-label="Fechar modal"
                title="Fechar modal"
              >
                <X size={20} />
              </button>
            </div>
            <div className="bg-gray-800 rounded-lg p-4 mb-6">
              <div className="flex justify-between mb-2">
                <span className="text-gray-300">Mensalidade</span>
                <span className="text-white font-medium">{selectedPlan.price.split('/')[0]}</span>
              </div>
              <div className="border-t border-gray-700 my-2"></div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-400">Cobrança</span>
                <span className="text-gray-300">Mensal (renovação automática)</span>
              </div>
            </div>
            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">O que está incluso:</h4>
              <ul className="space-y-2">
                {selectedPlan.features.map((feature: string, index: number) => (
                  <li key={index} className="flex">
                    <CheckCircle size={18} className="text-green-500 mr-2 mt-0.5 flex-shrink-0" />
                    <span className="text-gray-300">{feature}</span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-medium"
              >
                Cancelar
              </button>
              <button
                onClick={() => {
                  setModalOpen(false);
                  // Aqui seria a lógica de assinatura
                }}
                className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium hover:opacity-90"
              >
                Confirmar Assinatura
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Renderizar Modal de Detalhes da Loja
  const renderStoreDetailsModal = () => {
    if (!storeDetailsOpen || !selectedStore) return null;
    return (
      <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
        <div className="bg-gray-900 rounded-xl max-w-3xl w-full max-h-screen overflow-auto">
          <div className="p-6">
            <div className="flex justify-between items-start mb-6">
              <div className="flex items-center">
                <div className="w-16 h-16 rounded-lg bg-gray-800 overflow-hidden">
                  <Package size={24} className="w-full h-full text-gray-400" />
                </div>
                <div className="ml-4">
                  <h3 className="text-xl font-bold text-white">{selectedStore.name}</h3>
                  <div className="flex items-center text-sm">
                    <MapPin size={14} className="text-gray-400 mr-1" />
                    <span className="text-gray-400">{selectedStore.distance}</span>
                    <span className="mx-2 text-gray-500">•</span>
                    <div className="flex items-center">
                      <Star size={14} className="text-yellow-400 mr-1" />
                      <span className="text-gray-400">{selectedStore.rating}</span>
                    </div>
                  </div>
                </div>
              </div>
              <button
                onClick={() => setStoreDetailsOpen(false)}
                className="text-gray-400 hover:text-white"
                aria-label="Fechar modal"
                title="Fechar modal"
              >
                <X size={20} />
              </button>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
              <div className="bg-gray-800 rounded-lg p-3">
                <h4 className="text-sm text-gray-400 mb-1">Endereço</h4>
                <p className="text-white">{selectedStore.address}</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-3">
                <h4 className="text-sm text-gray-400 mb-1">Horário de Funcionamento</h4>
                <p className="text-white">{selectedStore.openHours}</p>
              </div>
              <div className="bg-gray-800 rounded-lg p-3">
                <h4 className="text-sm text-gray-400 mb-1">Tempo de Retirada</h4>
                <p className="text-white">{selectedStore.pickupTime}</p>
              </div>
            </div>
            <div className="mb-6">
              <h4 className="font-medium text-white mb-3">Produtos Disponíveis na Loja</h4>
              <div className="bg-gray-800 p-4 rounded-lg">
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Produto</th>
                        <th className="py-2 px-4 text-left text-sm font-medium text-gray-300">Categoria</th>
                        <th className="py-2 px-4 text-center text-sm font-medium text-gray-300">Disponibilidade</th>
                        <th className="py-2 px-4 text-right text-sm font-medium text-gray-300"></th>
                      </tr>
                    </thead>
                    <tbody>
                      {products.map((product, index) => (
                        <tr key={index} className={index > 0 ? "border-t border-gray-700" : ""}>
                          <td className="py-3 px-4">
                            <div className="flex items-center">
                              <div className="w-8 h-8 rounded bg-gray-700 overflow-hidden flex-shrink-0">
                                <Package size={24} className="w-full h-full text-gray-400" />
                              </div>
                              <span className="ml-2 text-white">{product.name}</span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-sm text-gray-300">{product.category}</td>
                          <td className="py-3 px-4">
                            <div className="flex justify-center">
                              <span className="px-2 py-1 bg-green-500 bg-opacity-20 text-green-400 rounded-full text-xs">
                                Em estoque
                              </span>
                            </div>
                          </td>
                          <td className="py-3 px-4 text-right">
                            <button className="text-blue-400 hover:text-blue-300 text-sm">
                              Retirar
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={() => setStoreDetailsOpen(false)}
                className="px-4 py-2 bg-gray-800 hover:bg-gray-700 rounded-lg text-white font-medium"
              >
                Fechar
              </button>
              <button
                onClick={() => alert('Abrindo mapa de navegação...')}
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 rounded-lg text-white font-medium flex items-center justify-center"
              >
                <MapPin size={18} className="mr-2" />
                <span>Como Chegar</span>
              </button>
              <button className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg text-white font-medium hover:opacity-90">
                Retirar Produto
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  };

  // Renderizar Modal de Produto
  const renderProductModal = () => {
    if (!productModalOpen || !selectedProduct) return null;
    return <ProductModal product={selectedProduct} onClose={() => setProductModalOpen(false)} />;
  };

  return (
    <div className="bg-gray-900 text-gray-200 min-h-screen flex">
      <BackButton />
      {renderSidebar()}
      <div className="flex-1 flex flex-col relative z-10">
        {renderHeader()}
        <main className="flex-1 overflow-y-auto">
          {activeTab === 'home' && renderHome()}
          {activeTab === 'plans' && renderPlans()}
          {activeTab === 'stores' && renderStores()}
          {activeTab === 'products' && renderProducts()}
          {activeTab === 'dashboard' && renderDashboard()}
          {activeTab === 'ai' && renderAI()}
        </main>
      </div>
      {renderPlanModal()}
      {renderStoreDetailsModal()}
      {renderProductModal()}
      {renderDemoIndicator()}
    </div>
  );
};

export default SuppliFitApp;
