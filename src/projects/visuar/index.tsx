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
  X
} from 'lucide-react';

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
  const [isLoading, setIsLoading] = useState(false);
  const [showARGuide, setShowARGuide] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Resumo dos dados
  const summary = calculateSummary(salesData);

  // Alteração do tipo de gráfico
  const handleChartTypeToggle = () => {
    setChartType(prev => prev === 'bar' ? 'line' : 'bar');
    setToastMessage(`Tipo de gráfico alterado para ${chartType === 'bar' ? 'Linhas' : 'Barras'}`);
    setTimeout(() => setToastMessage(null), 2000);
  };

  // Simula a geração de um relatório
  const handleGenerateReport = () => {
    setToastMessage('Gerando relatório...');
    setTimeout(() => setToastMessage('Relatório gerado com sucesso!'), 1500);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Alterna entre fullscreen e modo normal
  const handleToggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    setToastMessage(isFullScreen ? 'Saindo do modo fullscreen' : 'Entrando no modo fullscreen');
    setTimeout(() => setToastMessage(null), 2000);
  };

  // Renderiza o toast de feedback
  const renderToast = () =>
    toastMessage && (
      <div className="fixed top-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg transition-opacity">
        {toastMessage}
      </div>
    );

  // Overlay de loading
  const renderLoadingOverlay = () => (
    <div className="absolute inset-0 bg-black bg-opacity-70 flex flex-col items-center justify-center z-50">
      <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin mb-4"></div>
      <p className="text-white text-lg">Carregando {chartType === 'bar' ? 'BarChart' : 'LineChart'}...</p>
    </div>
  );

  // Ambiente simulado de AR com efeitos 3D
  const renderAREnvironment = () => (
    <div
      className={`relative ${isFullScreen ? 'h-screen' : 'h-96'} bg-gradient-to-br from-purple-800 to-blue-900 rounded-xl overflow-hidden shadow-xl`}
    >
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: 'radial-gradient(circle, rgba(255,255,255,0.1) 1px, transparent 1px)',
          backgroundSize: '20px 20px'
        }}
      ></div>

      <div className="absolute inset-0 flex items-center justify-center">
        <div className="transform perspective-1000 rotate-x-45 rotate-z-10 scale-75 hover:scale-90 transition-transform duration-500">
          <div className="grid grid-cols-3 gap-6">
            {salesData.map((item, index) => (
              <div key={index} className="relative group">
                <div
                  className="w-20 bg-blue-600 bg-opacity-80 rounded cursor-pointer transition-transform duration-300 transform hover:scale-110"
                  style={{
                    height: `${item[selectedMetric] / 30}px`,
                    transform: `translateZ(${index * 20}px)`
                  }}
                  onMouseEnter={() => setActiveDataPoint(item)}
                  onMouseLeave={() => setActiveDataPoint(null)}
                >
                  <div className="absolute top-0 left-0 w-full text-center text-white text-xs font-medium p-1">
                    {item.month}
                  </div>
                  {activeDataPoint === item && (
                    <div className="absolute -right-48 top-0 bg-white p-4 rounded-xl shadow-lg z-50 w-44">
                      <h4 className="font-bold text-gray-800">{item.month}</h4>
                      <div className="space-y-2 mt-2">
                        <p className="text-sm">
                          <span className="text-gray-500">Receita:</span>{' '}
                          <span className="font-medium">R$ {item.revenue.toLocaleString()}</span>
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500">Lucro:</span>{' '}
                          <span className="font-medium">R$ {item.profit.toLocaleString()}</span>
                        </p>
                        <p className="text-sm">
                          <span className="text-gray-500">Unidades:</span>{' '}
                          <span className="font-medium">{item.units}</span>
                        </p>
                        <div className="pt-2 border-t">
                          <span className="text-xs text-blue-600">
                            {item.region} • {item.category}
                          </span>
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex gap-4 bg-black bg-opacity-50 p-3 rounded-full shadow-lg">
        <button 
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          title="Rotacionar visualização"
        >
          <RotateCw className="w-6 h-6 text-white" />
        </button>
        <button 
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          title="Aumentar zoom"
        >
          <ZoomIn className="w-6 h-6 text-white" />
        </button>
        <button 
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          title="Mover visualização"
        >
          <Move3d className="w-6 h-6 text-white" />
        </button>
        <button 
          className="p-2 hover:bg-gray-700 rounded-full transition-colors"
          title="Compartilhar visualização"
        >
          <Share2 className="w-6 h-6 text-white" />
        </button>
      </div>

      <div className="absolute top-4 right-4">
        <button
          onClick={handleToggleFullScreen}
          className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
        >
          {isFullScreen ? 'Sair Fullscreen' : 'Fullscreen'}
        </button>
      </div>

      {showARGuide && (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-black bg-opacity-90 text-white p-8 rounded-xl max-w-md text-center">
          <h3 className="text-xl font-bold mb-6">Bem-vindo ao Modo AR!</h3>
          <p className="mb-6">Use gestos para explorar os dados:</p>
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="text-center">
              <Move3d className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">Arraste</p>
            </div>
            <div className="text-center">
              <RotateCw className="w-8 h-8 mx-auto mb-2" />
              <p className="text-sm">Gire</p>
            </div>
          </div>
          <button
            onClick={() => setShowARGuide(false)}
            className="bg-white text-black px-8 py-3 rounded-full hover:bg-gray-200 transition-colors font-medium"
          >
            Começar
          </button>
        </div>
      )}
    </div>
  );

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
  const renderDataSummary = () => (
    <div className="p-6 bg-gray-800 rounded-2xl shadow-lg border border-gray-700 mt-6">
      <h3 className="text-xl font-bold text-white mb-4">Resumo dos Dados</h3>
      <p className="text-gray-300">
        Receita Total: <span className="font-semibold">R$ {summary.totalRevenue.toLocaleString()}</span>
      </p>
      <p className="text-gray-300">
        Lucro Total: <span className="font-semibold">R$ {summary.totalProfit.toLocaleString()}</span>
      </p>
      <p className="text-gray-300">
        Média de Unidades: <span className="font-semibold">{summary.avgUnits.toFixed(0)}</span>
      </p>
    </div>
  );

  return (
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

      {/* Overlay de Loading */}
      {isLoading && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-gray-800 rounded-xl shadow-lg p-8">
            <div className="flex items-center gap-4">
              <div className="animate-spin rounded-full h-8 w-8 border-4 border-purple-500 border-t-transparent"></div>
              <p className="text-white">Carregando...</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisuARDemoEnhanced;
