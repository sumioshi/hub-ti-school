import React, { useState } from 'react';
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
  Eye,
  Camera,
  Move3d,
  RotateCw,
  ZoomIn,
  Share2,
  PanelLeftClose,
  PanelLeftOpen
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

// Função para calcular um resumo dos dados
const calculateSummary = (data: typeof salesData) => {
  const totalRevenue = data.reduce((sum, item) => sum + item.revenue, 0);
  const totalProfit = data.reduce((sum, item) => sum + item.profit, 0);
  const avgUnits = data.reduce((sum, item) => sum + item.units, 0) / data.length;
  return { totalRevenue, totalProfit, avgUnits };
};

const VisuARDemoEnhanced: React.FC = () => {
  // Estados de controle
  const [mode, setMode] = useState('2d'); // '2d', '3d' ou 'ar'
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [activeDataPoint, setActiveDataPoint] = useState<any>(null);
  const [selectedTimePeriod, setSelectedTimePeriod] = useState('6M');
  const [selectedMetric, setSelectedMetric] = useState('revenue');
  const [chartType, setChartType] = useState<'bar' | 'line'>('bar');
  const [isLoading, setIsLoading] = useState(false);
  const [showARGuide, setShowARGuide] = useState(false);
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [isFullScreen, setIsFullScreen] = useState(false);
  const [showShareModal, setShowShareModal] = useState(false);

  // Resumo dos dados
  const summary = calculateSummary(salesData);

  // Alteração de modo com simulação de loading e toast feedback
  const handleModeChange = (newMode: string) => {
    setIsLoading(true);
    setToastMessage(`Mudando para modo ${newMode.toUpperCase()}...`);
    setMode(newMode);
    setTimeout(() => {
      setIsLoading(false);
      setToastMessage(`Modo ${newMode.toUpperCase()} ativado!`);
      setTimeout(() => setToastMessage(null), 2000);
      if (newMode === 'ar') {
        setShowARGuide(true);
      }
    }, 1000);
  };

  // Alteração do tipo de gráfico
  const handleChartTypeToggle = (type: 'bar' | 'line') => {
    setChartType(type);
    setToastMessage(`Tipo de gráfico alterado para ${type === 'bar' ? 'Barras' : 'Linhas'}`);
    setTimeout(() => setToastMessage(null), 2000);
  };

  // Alterna entre fullscreen e modo normal para AR
  const handleToggleFullScreen = () => {
    setIsFullScreen(!isFullScreen);
    setToastMessage(isFullScreen ? 'Saindo do modo fullscreen' : 'Entrando no modo fullscreen');
    setTimeout(() => setToastMessage(null), 2000);
  };

  // Simula a geração de um relatório
  const handleGenerateReport = () => {
    setToastMessage('Gerando relatório...');
    setTimeout(() => setToastMessage('Relatório gerado com sucesso!'), 1500);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Abre o modal de compartilhamento
  const handleShareDashboard = () => {
    setShowShareModal(true);
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
      <p className="text-white text-lg">Carregando {mode.toUpperCase()}...</p>
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
        <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
          <RotateCw className="w-6 h-6 text-white" />
        </button>
        <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
          <ZoomIn className="w-6 h-6 text-white" />
        </button>
        <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
          <Move3d className="w-6 h-6 text-white" />
        </button>
        <button className="p-2 hover:bg-gray-700 rounded-full transition-colors">
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
    <div className="w-full max-w-7xl mx-auto p-8 bg-gradient-to-br from-gray-900 to-gray-800 min-h-screen relative">
      {renderToast()}
      <div className="bg-gray-900 rounded-2xl shadow-lg p-8">
        <div className="flex items-center justify-between mb-8">
          <div className="flex items-center gap-4">
            <h1 className="text-3xl font-bold text-white">VisuAR Insight</h1>
            <button
              onClick={() => setIsPanelOpen(!isPanelOpen)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
            >
              {isPanelOpen ? <PanelLeftClose className="w-6 h-6 text-gray-300" /> : <PanelLeftOpen className="w-6 h-6 text-gray-300" />}
            </button>
          </div>

          <div className="flex gap-4">
            <button
              onClick={() => handleModeChange('2d')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                mode === '2d'
                  ? 'bg-blue-600 text-white font-semibold shadow-md'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Eye className="w-6 h-6" />
              2D
            </button>
            <button
              onClick={() => handleModeChange('3d')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                mode === '3d'
                  ? 'bg-purple-600 text-white font-semibold shadow-md'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Box className="w-6 h-6" />
              3D
            </button>
            <button
              onClick={() => handleModeChange('ar')}
              className={`flex items-center gap-2 px-6 py-3 rounded-lg transition-colors ${
                mode === 'ar'
                  ? 'bg-green-600 text-white font-semibold shadow-md'
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              <Camera className="w-6 h-6" />
              AR
            </button>
          </div>
        </div>

        <div className="flex gap-8">
          {isPanelOpen && (
            <div className="w-80 bg-gray-800 p-6 rounded-2xl shadow-lg">
              <h3 className="font-semibold text-white mb-6">Configurações</h3>
              <div className="space-y-6">
                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Período</label>
                  <select
                    value={selectedTimePeriod}
                    onChange={(e) => setSelectedTimePeriod(e.target.value)}
                    className="w-full p-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="1M">Último Mês</option>
                    <option value="3M">3 Meses</option>
                    <option value="6M">6 Meses</option>
                    <option value="1Y">1 Ano</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-300 mb-2">Métrica</label>
                  <select
                    value={selectedMetric}
                    onChange={(e) => setSelectedMetric(e.target.value)}
                    className="w-full p-2 bg-gray-900 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500"
                  >
                    <option value="revenue">Receita</option>
                    <option value="profit">Lucro</option>
                    <option value="units">Unidades</option>
                  </select>
                </div>

                <div className="pt-6 border-t border-gray-700">
                  <h4 className="font-medium text-white mb-3">Filtros Rápidos</h4>
                  <div className="space-y-2">
                    <button className="w-full text-left px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-gray-300">
                      Por Região
                    </button>
                    <button className="w-full text-left px-4 py-2 bg-gray-700 rounded-lg hover:bg-gray-600 transition-colors text-gray-300">
                      Por Categoria
                    </button>
                  </div>
                </div>

                <div className="pt-6 border-t border-gray-700">
                  <h4 className="font-medium text-white mb-3">Ações Rápidas</h4>
                  <div className="space-y-2">
                    <button
                      onClick={handleGenerateReport}
                      className="w-full text-left px-4 py-2 bg-indigo-600 rounded-lg hover:bg-indigo-700 transition-colors text-white font-medium"
                    >
                      Gerar Relatório
                    </button>
                    <button
                      onClick={handleShareDashboard}
                      className="w-full text-left px-4 py-2 bg-green-600 rounded-lg hover:bg-green-700 transition-colors text-white font-medium"
                    >
                      Compartilhar Dashboard
                    </button>
                  </div>
                </div>

                {renderDataSummary()}
              </div>
            </div>
          )}

          <div className="flex-1 relative bg-gray-800 rounded-2xl p-6 shadow-lg">
            {isLoading && renderLoadingOverlay()}
            {mode === 'ar' ? renderAREnvironment() : renderChart()}

            <div className="flex gap-4 mt-6">
              <button
                onClick={() => handleChartTypeToggle('bar')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  chartType === 'bar'
                    ? 'bg-blue-600 text-white font-semibold shadow-md'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Gráfico de Barras
              </button>
              <button
                onClick={() => handleChartTypeToggle('line')}
                className={`px-4 py-2 rounded-full transition-colors ${
                  chartType === 'line'
                    ? 'bg-blue-600 text-white font-semibold shadow-md'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                }`}
              >
                Gráfico de Linhas
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Modal de compartilhamento */}
      {showShareModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
          <div className="bg-gray-900 rounded-2xl p-8 shadow-lg max-w-md w-full">
            <h3 className="text-2xl font-bold text-white mb-4">Compartilhar Dashboard</h3>
            <p className="text-gray-300 mb-4">Copie o link abaixo para compartilhar:</p>
            <input
              type="text"
              readOnly
              value="https://dashboard.example.com/shared-link"
              className="w-full p-2 bg-gray-800 border border-gray-700 rounded-md text-gray-200"
            />
            <div className="mt-6 flex justify-end">
              <button
                onClick={() => setShowShareModal(false)}
                className="px-4 py-2 bg-indigo-600 text-white rounded-full hover:bg-indigo-700 transition"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default VisuARDemoEnhanced;
