import React, { useState } from 'react';
import { BackButton } from '../../components/BackButton';
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer
} from 'recharts';
import {
  Box,
  Move3d,
  RotateCw,
  ZoomIn,
  Share2,
  DollarSign,
  ShoppingCart,
  Users,
  CreditCard,
  TrendingUp,
  X,
  ArrowLeft
} from 'lucide-react';
import { Link } from 'react-router-dom';

// Dados de exemplo
const salesData = [
  { month: 'Jan', revenue: 4000, profit: 1200, units: 350, region: 'Norte', category: 'Software' },
  { month: 'Fev', revenue: 3000, profit: 900, units: 280, region: 'Sul', category: 'Hardware' },
  { month: 'Mar', revenue: 5000, profit: 1500, units: 420, region: 'Leste', category: 'Serviços' },
  { month: 'Abr', revenue: 2780, profit: 834, units: 290, region: 'Oeste', category: 'Software' },
  { month: 'Mai', revenue: 4890, profit: 1467, units: 385, region: 'Norte', category: 'Hardware' },
  { month: 'Jun', revenue: 3390, profit: 1017, units: 310, region: 'Sul', category: 'Serviços' },
];

interface SalesData {
  month: string;
  revenue: number;
  profit: number;
  units: number;
  region: string;
  category: string;
}

type MetricKey = 'revenue' | 'profit' | 'units';

// Função para calcular um resumo dos dados
const calculateSummary = (data: typeof salesData) => {
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalProfit = data.reduce((sum, item) => sum + item.profit, 0);
  const avgUnits = data.reduce((sum, item) => sum + item.units, 0) / data.length;
  return { totalRevenue, totalProfit, avgUnits };
};

const VisuARDemoEnhanced: React.FC = () => {
  // Estados de controle
  const [activeDataPoint, setActiveDataPoint] = useState<SalesData | null>(null);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('6M');
  const [selectedMetric, setSelectedMetric] = useState<MetricKey>('revenue');
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const [showARGuide, setShowARGuide] = useState(false);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Resumo dos dados
  const summary = calculateSummary(salesData);

  // Alteração do tipo de gráfico
  const handleChartTypeToggle = () => {
    setChartType(prev => prev === 'bar' ? 'line' : 'bar');
  };

  // Simula a geração de um relatório
  const handleGenerateReport = () => {
    // Implementar a lógica para gerar um relatório
  };

  // Alterna entre fullscreen e modo normal
  const handleToggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
  };

  // Renderiza o toast de feedback
  const renderToast = () =>
    null;

  // Overlay de loading
  const renderLoadingOverlay = () => null;

  // Ambiente simulado de AR com efeitos 3D
  const renderAREnvironment = () => null;

  // Renderiza o gráfico 2D (BarChart ou LineChart)
  const renderChart = () => (
    <div className="h-96 w-full">
      <ResponsiveContainer>
        {chartType === 'bar' ? (
          <BarChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              itemStyle={{ color: 'white' }}
            />
            <Bar dataKey={selectedMetric} fill="#6366F1" radius={[4, 4, 0, 0]} />
          </BarChart>
        ) : (
          <LineChart data={salesData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#4B5563" />
            <XAxis dataKey="month" stroke="#9CA3AF" />
            <YAxis stroke="#9CA3AF" />
            <Tooltip
              contentStyle={{
                backgroundColor: '#1F2937',
                border: 'none',
                borderRadius: '0.5rem',
                boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
              }}
              itemStyle={{ color: 'white' }}
            />
            <Line
              type="monotone"
              dataKey={selectedMetric}
              stroke="#6366F1"
              strokeWidth={3}
              dot={{ r: 6, fill: '#6366F1' }}
              activeDot={{ r: 8, fill: '#6366F1' }}
            />
          </LineChart>
        )}
      </ResponsiveContainer>
    </div>
  );

  // Renderiza um resumo dos dados (Data Summary)
  const renderDataSummary = () => null;

  return (
    <>
      <Link to="/" className="fixed top-4 left-4 z-50 inline-flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-200 bg-gray-800/90 hover:bg-gray-700/90 rounded-lg transition-colors shadow-lg backdrop-blur-sm border border-gray-700/50">
        <ArrowLeft className="h-4 w-4" />
        Voltar para Projetos
      </Link>
      <div className="flex flex-col min-h-screen bg-gray-900">
        <BackButton />
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Painel Principal */}
            <div className="lg:col-span-2 space-y-6">
              {/* Cabeçalho */}
              <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
                <h1 className="text-3xl font-bold text-white">Dashboard de Vendas</h1>
                <div className="flex gap-4">
                  <button
                    onClick={() => setShowShareModal(true)}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-colors"
                  >
                    Compartilhar Dashboard
                  </button>
                  <button
                    onClick={handleChartTypeToggle}
                    className={`px-4 py-2 rounded-lg transition-colors ${
                      chartType === 'bar'
                        ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white'
                        : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                    }`}
                  >
                    {chartType === 'bar' ? 'Gráfico de Barras' : 'Gráfico de Linha'}
                  </button>
                </div>
              </div>

              {/* Gráfico */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                <div className="h-[400px]">
                  {renderChart()}
                </div>
              </div>

              {/* Estatísticas */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Vendas Totais</p>
                      <p className="text-2xl font-bold text-white mt-1">R$ {summary.totalRevenue.toLocaleString()}</p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                      <DollarSign className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-sm text-green-400">+{summary.totalRevenue.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Pedidos</p>
                      <p className="text-2xl font-bold text-white mt-1">{salesData.length}</p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                      <ShoppingCart className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-sm text-green-400">+{salesData.length.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Clientes</p>
                      <p className="text-2xl font-bold text-white mt-1">{salesData.length}</p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                      <Users className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-sm text-green-400">+{salesData.length.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-gray-400">Ticket Médio</p>
                      <p className="text-2xl font-bold text-white mt-1">R$ {summary.totalRevenue / salesData.length}</p>
                    </div>
                    <div className="p-3 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg">
                      <CreditCard className="w-6 h-6 text-white" />
                    </div>
                  </div>
                  <div className="mt-4">
                    <div className="flex items-center">
                      <TrendingUp className="w-4 h-4 text-green-400 mr-1" />
                      <span className="text-sm text-green-400">+{summary.totalRevenue.toFixed(2)}%</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Painel Lateral */}
            <div className="space-y-6">
              {/* Filtros */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Filtros</h2>
                <div className="space-y-4">
                  <div>
                    <label htmlFor="timePeriod" className="block text-sm text-gray-400 mb-2">Período</label>
                    <select
                      id="timePeriod"
                      value={selectedTimePeriod}
                      onChange={(e) => setSelectedTimePeriod(e.target.value)}
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      title="Selecione o período"
                    >
                      <option value="day">Hoje</option>
                      <option value="week">Esta Semana</option>
                      <option value="month">Este Mês</option>
                      <option value="year">Este Ano</option>
                    </select>
                  </div>
                  <div>
                    <label htmlFor="metric" className="block text-sm text-gray-400 mb-2">Categoria</label>
                    <select
                      id="metric"
                      value={selectedMetric}
                      onChange={(e) => setSelectedMetric(e.target.value as MetricKey)}
                      className="w-full bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                      title="Selecione a métrica"
                    >
                      <option value="revenue">Receita</option>
                      <option value="profit">Lucro</option>
                      <option value="units">Unidades</option>
                    </select>
                  </div>
                  <button
                    onClick={handleGenerateReport}
                    className="w-full px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-colors"
                  >
                    Gerar Relatório
                  </button>
                </div>
              </div>

              {/* Produtos Mais Vendidos */}
              <div className="bg-gray-800 rounded-xl shadow-lg p-6">
                <h2 className="text-xl font-bold text-white mb-4">Produtos Mais Vendidos</h2>
                <div className="space-y-4">
                  {salesData.map((item) => (
                    <div
                      key={item.month}
                      className="flex items-center justify-between p-4 bg-gray-700 rounded-lg"
                    >
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                          <Box className="w-6 h-6 text-white" />
                        </div>
                        <div>
                          <p className="font-medium text-white">{item.month}</p>
                          <p className="text-sm text-gray-400">{item.category}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-medium text-white">R$ {item.revenue.toLocaleString()}</p>
                        <p className="text-sm text-gray-400">{item.units} vendas</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de Compartilhamento */}
      {showShareModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center p-4">
          <div className="bg-gray-800 rounded-xl shadow-lg p-6 max-w-md w-full">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-xl font-bold text-white">Compartilhar Dashboard</h2>
              <button
                onClick={() => setShowShareModal(false)}
                className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
                title="Fechar modal"
              >
                <X className="w-6 h-6 text-gray-400" />
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label htmlFor="shareLink" className="block text-sm text-gray-400 mb-2">Link do Dashboard</label>
                <div className="flex gap-2">
                  <input
                    id="shareLink"
                    type="text"
                    value="https://visuar.example.com/dashboard/123"
                    readOnly
                    className="flex-1 bg-gray-700 text-white rounded-lg px-4 py-2 focus:outline-none focus:ring-2 focus:ring-purple-500"
                    title="Link para compartilhar"
                  />
                  <button
                    onClick={() => {/* Implementar cópia */}}
                    className="px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-colors"
                  >
                    Copiar
                  </button>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => {/* Implementar compartilhamento */}}
                  className="flex-1 px-4 py-2 bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg hover:opacity-90 transition-colors"
                >
                  Compartilhar
                </button>
                <button
                  onClick={() => setShowShareModal(false)}
                  className="flex-1 px-4 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                >
                  Cancelar
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default VisuARDemoEnhanced;
