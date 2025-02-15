import React, { useState, useRef, useEffect } from 'react';
import {
  Camera,
  Users,
  MapPin,
  Bell,
  AlertTriangle,
  LayoutGrid,
  Maximize2,
  Play,
  Pause,
  ArrowUp,
  ArrowDown,
  ArrowLeft,
  ArrowRight,
  Clock,
  Download
} from 'lucide-react';

/* ========================================================= */
/*                     INTERFACE DE TIPAGEM                */
/* ========================================================= */

interface Analytics {
  peopleCount?: number;
  studentsCount?: number;
  activeAlerts: number;
  avgDwellTime?: string;
  avgResponseTime?: string;
  riskZones: number;
}

/* ========================================================= */
/*                     MODAIS (Placeholders)               */
/* ========================================================= */

// Modal: Detalhes do Alerta
interface AlertDetailModalProps {
  alert: {
    id: string;
    type: string;
    camera: string;
    timestamp: string;
    confidence: number;
    severity: string;
  };
  onClose: () => void;
}

const AlertDetailModal: React.FC<AlertDetailModalProps> = ({ alert, onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Detalhes do Alerta</h2>
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        >
          &times;
        </button>
      </div>
      <div className="text-sm space-y-2">
        <p className="text-gray-700 dark:text-gray-200"><strong>Tipo:</strong> {alert.type}</p>
        <p className="text-gray-700 dark:text-gray-200"><strong>Local:</strong> {alert.camera}</p>
        <p className="text-gray-700 dark:text-gray-200"><strong>Timestamp:</strong> {alert.timestamp}</p>
        <p className="text-gray-700 dark:text-gray-200"><strong>Confiança:</strong> {alert.confidence}%</p>
        <p className="text-gray-700 dark:text-gray-200"><strong>Severidade:</strong> {alert.severity}</p>
        <p className="text-gray-500 dark:text-gray-400">Mais detalhes sobre o alerta podem ser exibidos aqui.</p>
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          Fechar
        </button>
      </div>
    </div>
  </div>
);

// Modal: Editor de Zonas (Básico)
interface ZoneConfigModalProps {
  onClose: () => void;
}

const ZoneConfigModal: React.FC<ZoneConfigModalProps> = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-lg">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800 dark:text-gray-100">Editor de Zonas</h2>
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        >
          &times;
        </button>
      </div>
      <div className="mb-4">
        <p className="text-sm text-gray-500 dark:text-gray-400">
          Desenhe a zona livremente ou escolha um template:
        </p>
        <div className="flex gap-2 mt-2">
          <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded">
            Perímetro
          </button>
          <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded">
            Área
          </button>
          <button className="px-3 py-1 bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-100 rounded">
            Linha
          </button>
        </div>
      </div>
      <div className="border border-dashed border-gray-400 dark:border-gray-600 rounded h-48 flex items-center justify-center text-gray-500 dark:text-gray-400">
        Editor Visual de Zonas
      </div>
      <div className="mt-4">
        <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
          Horário de Ativação
        </label>
        <input
          type="time"
          className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
        />
      </div>
      <div className="mt-6 flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
        >
          Salvar
        </button>
      </div>
    </div>
  </div>
);

// Modal: Preview de Detecções em Tempo Real
interface DetectionPreviewModalProps {
  onClose: () => void;
}
const DetectionPreviewModal: React.FC<DetectionPreviewModalProps> = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-2xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Detecções em Tempo Real</h2>
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        >
          &times;
        </button>
      </div>
      <div className="relative border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg h-64 flex items-center justify-center">
        <video
          src="https://www.w3schools.com/html/mov_bbb.mp4"
          autoPlay
          muted
          loop
          className="absolute w-full h-full object-cover"
        />
        {/* Exemplo de bounding boxes simuladas */}
        <div className="absolute border-2 border-red-500" style={{ top: '20%', left: '10%', width: '30%', height: '30%' }} />
        <div className="absolute border-2 border-yellow-500" style={{ top: '50%', left: '50%', width: '20%', height: '20%' }} />
        <span className="relative text-white z-10">Detecções em tempo real</span>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          Fechar
        </button>
      </div>
    </div>
  </div>
);

// Modal: Calibração de Sensibilidade
interface CalibrationModalProps {
  onClose: () => void;
}
const CalibrationModal: React.FC<CalibrationModalProps> = ({ onClose }) => {
  const [sensitivity, setSensitivity] = useState(50);
  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
      <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Calibração de Sensibilidade</h2>
          <button
            onClick={onClose}
            aria-label="Fechar modal"
            className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
          >
            &times;
          </button>
        </div>
        <p className="text-gray-700 dark:text-gray-200 mb-4">Ajuste a sensibilidade para as detecções:</p>
        <input
          type="range"
          min="0"
          max="100"
          value={sensitivity}
          onChange={(e) => setSensitivity(Number(e.target.value))}
          className="w-full"
        />
        <p className="text-center text-gray-700 dark:text-gray-200 mt-2">Sensibilidade: {sensitivity}%</p>
        <div className="mt-4 flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-green-500 hover:bg-green-600 text-white rounded-lg"
          >
            Salvar
          </button>
        </div>
      </div>
    </div>
  );
};

// Modal: Editor de Zonas Avançadas (Polígonos, Régua Virtual)
interface AdvancedZonesModalProps {
  onClose: () => void;
}
const AdvancedZonesModal: React.FC<AdvancedZonesModalProps> = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-3xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Editor de Zonas Avançadas</h2>
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        >
          &times;
        </button>
      </div>
      <div className="border-2 border-dashed border-gray-400 dark:border-gray-600 rounded-lg h-80 flex items-center justify-center text-gray-500 dark:text-gray-400">
        Editor de Polígonos e Régua Virtual
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          Fechar
        </button>
      </div>
    </div>
  </div>
);

// Modal: Analytics Avançados
interface AdvancedAnalyticsModalProps {
  onClose: () => void;
}
const AdvancedAnalyticsModal: React.FC<AdvancedAnalyticsModalProps> = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-4xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Analytics Avançados</h2>
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        >
          &times;
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-blue-50 dark:bg-blue-900 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">Gráfico de Ocupação por Horário</p>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded mt-2 flex items-center justify-center text-gray-500">
            [Gráfico]
          </div>
        </div>
        <div className="bg-green-50 dark:bg-green-900 rounded-lg p-4">
          <p className="text-sm text-gray-600 dark:text-gray-300">Timeline de Eventos</p>
          <div className="h-32 bg-gray-200 dark:bg-gray-700 rounded mt-2 flex items-center justify-center text-gray-500">
            [Timeline]
          </div>
        </div>
      </div>
      <div className="mt-4 flex justify-end gap-4">
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded">
          Exportar PDF
        </button>
        <button className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded">
          Exportar Excel
        </button>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          Fechar
        </button>
      </div>
    </div>
  </div>
);

// Modal: Busca Avançada
interface AdvancedSearchModalProps {
  onClose: () => void;
}
const AdvancedSearchModal: React.FC<AdvancedSearchModalProps> = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-3xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Busca Avançada</h2>
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        >
          &times;
        </button>
      </div>
      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Características (ex: cor, tipo de objeto)
          </label>
          <input
            type="text"
            placeholder="Digite os filtros..."
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
            Data e Hora
          </label>
          <input
            type="datetime-local"
            className="mt-1 block w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 text-gray-800 dark:text-gray-100"
          />
        </div>
        <div className="border rounded p-4 bg-gray-100 dark:bg-gray-700 text-center text-gray-500 dark:text-gray-300">
          Preview com Thumbnails dos eventos filtrados
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          Fechar
        </button>
      </div>
    </div>
  </div>
);

// Modal: Visualização Avançada (Picture-in-Picture, Lado a Lado, Zoom, etc.)
interface AdvancedVisualizationModalProps {
  onClose: () => void;
}
const AdvancedVisualizationModal: React.FC<AdvancedVisualizationModalProps> = ({ onClose }) => (
  <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-60">
    <div className="bg-white dark:bg-gray-800 rounded-lg p-6 w-full max-w-3xl">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">Visualização Avançada</h2>
        <button
          onClick={onClose}
          aria-label="Fechar modal"
          className="text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-gray-100"
        >
          &times;
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4">
        <div className="border rounded-lg p-4 bg-gray-100 dark:bg-gray-700 text-center text-gray-500 dark:text-gray-300">
          Modo Picture-in-Picture
        </div>
        <div className="border rounded-lg p-4 bg-gray-100 dark:bg-gray-700 text-center text-gray-500 dark:text-gray-300">
          Comparação Lado a Lado
        </div>
        <div className="border rounded-lg p-4 bg-gray-100 dark:bg-gray-700 text-center text-gray-500 dark:text-gray-300">
          Zoom Digital (ROI)
        </div>
        <div className="border rounded-lg p-4 bg-gray-100 dark:bg-gray-700 text-center text-gray-500 dark:text-gray-300">
          Marcadores na Timeline
        </div>
      </div>
      <div className="mt-4 flex justify-end">
        <button
          onClick={onClose}
          className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg"
        >
          Fechar
        </button>
      </div>
    </div>
  </div>
);

/* ========================================================= */
/*                   COMPONENTE PRINCIPAL                  */
/* ========================================================= */

const CamIASecurityDashboard: React.FC = () => {
  // Estados principais
  const [activeDashboard, setActiveDashboard] = useState<'camia' | 'schoolguard'>('camia');
  const [selectedCamera, setSelectedCamera] = useState<string>('cam-01');
  const [alertsExpanded, setAlertsExpanded] = useState<boolean>(false);
  const [isPlaying, setIsPlaying] = useState<boolean>(true);
  const [selectedAlert, setSelectedAlert] = useState<{
    id: string;
    type: string;
    camera: string;
    timestamp: string;
    confidence: number;
    severity: string;
  } | null>(null);
  const [viewMode, setViewMode] = useState<'single' | 'grid'>('single');
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [playbackRate, setPlaybackRate] = useState<number>(1);

  // Estados para modais extras
  const [showDetectionModal, setShowDetectionModal] = useState<boolean>(false);
  const [showCalibrationModal, setShowCalibrationModal] = useState<boolean>(false);
  const [showAdvancedZonesModal, setShowAdvancedZonesModal] = useState<boolean>(false);
  const [showAdvancedAnalyticsModal, setShowAdvancedAnalyticsModal] = useState<boolean>(false);
  const [showAdvancedSearchModal, setShowAdvancedSearchModal] = useState<boolean>(false);
  const [showAdvancedVisualizationModal, setShowAdvancedVisualizationModal] = useState<boolean>(false);
  const [showZoneModal, setShowZoneModal] = useState<boolean>(false);

  // Refs para fullscreen e vídeo
  const videoContainerRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  // Atualiza a velocidade de reprodução do vídeo
  useEffect(() => {
    if (videoRef.current) {
      videoRef.current.playbackRate = playbackRate;
    }
  }, [playbackRate]);

  // Dados para CamIASecurity 2.0
  const cameras = [
    { id: 'cam-01', name: 'Entrada Principal', status: 'online', alerts: 2, streamUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 'cam-02', name: 'Estacionamento A', status: 'online', alerts: 0, streamUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 'cam-03', name: 'Corredor 1º Andar', status: 'online', alerts: 1, streamUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 'cam-04', name: 'Área de Carga', status: 'offline', alerts: 0, streamUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' }
  ];

  const recentAlerts = [
    {
      id: 'alert-1',
      type: 'fight',
      camera: 'Entrada Principal',
      timestamp: '2 min atrás',
      confidence: 94,
      severity: 'high'
    },
    {
      id: 'alert-2',
      type: 'crowding',
      camera: 'Corredor 1º Andar',
      timestamp: '5 min atrás',
      confidence: 88,
      severity: 'medium'
    },
    {
      id: 'alert-3',
      type: 'fallen_person',
      camera: 'Entrada Principal',
      timestamp: '12 min atrás',
      confidence: 96,
      severity: 'high'
    }
  ];

  const analytics: Analytics = {
    peopleCount: 127,
    activeAlerts: 3,
    avgDwellTime: '8.5 min',
    riskZones: 2
  };

  // Dados para SchoolGuardAI
  const schoolRooms = [
    { id: 'room-01', name: 'Sala 101', status: 'online', alerts: 1, streamUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 'room-02', name: 'Biblioteca', status: 'online', alerts: 0, streamUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 'room-03', name: 'Quadra', status: 'offline', alerts: 2, streamUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' },
    { id: 'room-04', name: 'Auditório', status: 'online', alerts: 0, streamUrl: 'https://www.w3schools.com/html/mov_bbb.mp4' }
  ];

  const schoolAlerts = [
    {
      id: 'alert-1',
      type: 'bullying',
      camera: 'Sala 101',
      timestamp: '3 min atrás',
      confidence: 90,
      severity: 'high'
    },
    {
      id: 'alert-2',
      type: 'crowding',
      camera: 'Auditório',
      timestamp: '10 min atrás',
      confidence: 85,
      severity: 'medium'
    }
  ];

  const schoolAnalytics: Analytics = {
    studentsCount: 500,
    activeAlerts: 5,
    avgResponseTime: '2 min',
    riskZones: 1
  };

  // Função para renderizar ícones de alerta
  const renderAlertIcon = (type: string) => {
    switch (type) {
      case 'fight':
        return <AlertTriangle className="w-5 h-5 text-red-500" aria-label="Alerta de briga" />;
      case 'crowding':
        return <Users className="w-5 h-5 text-yellow-500" aria-label="Alerta de aglomeração" />;
      case 'fallen_person':
        return <AlertTriangle className="w-5 h-5 text-orange-500" aria-label="Alerta de pessoa caída" />;
      case 'bullying':
        return <AlertTriangle className="w-5 h-5 text-purple-500" aria-label="Alerta de bullying" />;
      default:
        return <Bell className="w-5 h-5 text-gray-500" aria-label="Alerta genérico" />;
    }
  };

  // Dados de acordo com o dashboard ativo
  const currentCameras = activeDashboard === 'camia' ? cameras : schoolRooms;
  const currentAlerts = activeDashboard === 'camia' ? recentAlerts : schoolAlerts;
  const currentAnalytics = activeDashboard === 'camia' ? analytics : schoolAnalytics;
  const dashboardTitle = activeDashboard === 'camia' ? 'CamIASecurity 2.0' : 'SchoolGuardAI';
  const cameraSectionTitle = activeDashboard === 'camia' ? 'Câmeras' : 'Ambientes';

  // Alternador de tema
  const toggleTheme = () => setTheme(prev => (prev === 'light' ? 'dark' : 'light'));

  // Função para fullscreen
  const handleFullscreen = () => {
    if (videoContainerRef.current) {
      if (document.fullscreenElement) {
        document.exitFullscreen();
      } else {
        videoContainerRef.current.requestFullscreen();
      }
    }
  };

  // Funções simuladas
  const handleStepFrame = () => alert('Avançar frame (simulado)');
  const handlePiP = () => alert('Ativar Picture-in-Picture (simulado)');
  const handlePTZ = (direction: string) => alert(`PTZ: ${direction} (simulado)`);
  const handleRecordings = () => alert('Ver Gravações acionado (simulado)');

  /* ========================================================= */
  /*                     LAYOUT PRINCIPAL                     */
  /* ========================================================= */

  return (
    // Root com suporte a dark mode
    <div className={`${theme === 'dark' ? 'dark' : ''} flex min-h-screen bg-gray-100 text-gray-900 dark:bg-gray-900 dark:text-gray-100`}>
      {/* Barra Lateral Fixa */}
      <aside className="w-64 bg-white dark:bg-gray-800 shadow-md flex-shrink-0 hidden md:block">
        <div className="p-4">
          <h2 className="text-2xl font-bold mb-4">Menu</h2>
          <nav className="flex flex-col space-y-2">
            <button className="text-left px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => setActiveDashboard('camia')}>
              Dashboard
            </button>
            <button className="text-left px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => alert('Navegar para Alertas (simulado)')}>
              Alertas
            </button>
            <button className="text-left px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => alert('Navegar para Analytics (simulado)')}>
              Analytics
            </button>
            <button className="text-left px-3 py-2 rounded hover:bg-gray-200 dark:hover:bg-gray-700" onClick={() => alert('Navegar para Configurações (simulado)')}>
              Configurações
            </button>
          </nav>
        </div>
      </aside>

      {/* Conteúdo Principal */}
      <main className="flex-1">
        {/* Breadcrumbs */}
        <div className="p-4 border-b border-gray-300 dark:border-gray-700">
          <p className="text-sm text-gray-600 dark:text-gray-300">
            Home / {dashboardTitle} / Visualização
          </p>
        </div>

        {/* Header com Tabs e Atalhos Rápidos */}
        <div className="p-4 flex flex-col md:flex-row items-center justify-between">
          <h1 className="text-3xl font-bold mb-4 md:mb-0">{dashboardTitle}</h1>
          <div className="flex flex-wrap gap-4">
            <button
              onClick={() => setActiveDashboard('camia')}
              className={`px-4 py-2 rounded border ${activeDashboard === 'camia' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              CamIASecurity 2.0
            </button>
            <button
              onClick={() => setActiveDashboard('schoolguard')}
              className={`px-4 py-2 rounded border ${activeDashboard === 'schoolguard' ? 'bg-blue-600 text-white' : 'bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200'}`}
            >
              SchoolGuardAI
            </button>
            <button
              onClick={() => setViewMode(prev => (prev === 'single' ? 'grid' : 'single'))}
              className="px-4 py-2 rounded border bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
            >
              {viewMode === 'single' ? 'Visualizar Grid' : 'Visualizar Única'}
            </button>
          </div>
        </div>

        {/* Conteúdo: Área Principal com Vídeo, Lista e Analytics */}
        <div className="p-4 grid grid-cols-12 gap-6">
          {/* Coluna Esquerda: Lista de Câmeras e Analytics */}
          <div className="col-span-12 md:col-span-3 space-y-4">
            {/* Lista de Câmeras / Ambientes */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-medium text-gray-800 dark:text-gray-100">{cameraSectionTitle}</h2>
                <button className="p-1.5 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg" aria-label="Alternar visualização">
                  <LayoutGrid className="w-5 h-5 text-gray-600 dark:text-gray-300" />
                </button>
              </div>
              <div className="space-y-2">
                {currentCameras.map((cam) => (
                  <button
                    key={cam.id}
                    onClick={() => setSelectedCamera(cam.id)}
                    className={`w-full flex items-center justify-between p-3 rounded-lg transition-colors border ${
                      selectedCamera === cam.id
                        ? 'bg-blue-100 border-blue-300 text-blue-700'
                        : 'bg-gray-200 dark:bg-gray-700 border-gray-200 dark:border-gray-600 text-gray-800 dark:text-gray-200 hover:bg-gray-300 dark:hover:bg-gray-600'
                    }`}
                    aria-label={`Selecionar ${activeDashboard === 'camia' ? 'câmera' : 'ambiente'} ${cam.name}`}
                  >
                    <div className="flex items-center gap-3">
                      <Camera className="w-5 h-5" />
                      <div className="text-left">
                        <p className="font-medium">{cam.name}</p>
                        <p className="text-sm">
                          {cam.status === 'online' ? (
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 bg-green-500 rounded-full"></span>
                              <span>Online</span>
                            </span>
                          ) : (
                            <span className="flex items-center gap-1">
                              <span className="w-2 h-2 bg-red-500 rounded-full"></span>
                              <span>Offline</span>
                            </span>
                          )}
                        </p>
                      </div>
                    </div>
                    {cam.alerts > 0 && (
                      <span className="px-2 py-1 bg-red-100 text-red-600 text-sm rounded-lg">
                        {cam.alerts}
                      </span>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Painel de Analytics */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
              <h2 className="font-medium text-gray-800 dark:text-gray-100 mb-4">
                {activeDashboard === 'camia' ? 'Analytics' : 'Estatísticas'}
              </h2>
              <div className="grid grid-cols-2 gap-4">
                {activeDashboard === 'camia' ? (
                  <>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                      <Users className="w-6 h-6 text-blue-600 dark:text-blue-300 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-300">Total de Pessoas</p>
                      <p className="text-xl font-bold">{currentAnalytics.peopleCount}</p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-900 rounded-lg">
                      <Bell className="w-6 h-6 text-red-600 dark:text-red-300 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-300">Alertas Ativos</p>
                      <p className="text-xl font-bold">{currentAnalytics.activeAlerts}</p>
                    </div>
                    <div className="p-4 bg-purple-50 dark:bg-purple-900 rounded-lg">
                      <Clock className="w-6 h-6 text-purple-600 dark:text-purple-300 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-300">Tempo Médio</p>
                      <p className="text-xl font-bold">{currentAnalytics.avgDwellTime}</p>
                    </div>
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
                      <MapPin className="w-6 h-6 text-yellow-600 dark:text-yellow-300 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-300">Zonas de Risco</p>
                      <p className="text-xl font-bold">{currentAnalytics.riskZones}</p>
                    </div>
                  </>
                ) : (
                  <>
                    <div className="p-4 bg-blue-50 dark:bg-blue-900 rounded-lg">
                      <Users className="w-6 h-6 text-blue-600 dark:text-blue-300 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-300">Total de Alunos</p>
                      <p className="text-xl font-bold">{currentAnalytics.studentsCount}</p>
                    </div>
                    <div className="p-4 bg-red-50 dark:bg-red-900 rounded-lg">
                      <Bell className="w-6 h-6 text-red-600 dark:text-red-300 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-300">Alertas Ativos</p>
                      <p className="text-xl font-bold">{currentAnalytics.activeAlerts}</p>
                    </div>
                    <div className="p-4 bg-green-50 dark:bg-green-900 rounded-lg">
                      <Clock className="w-6 h-6 text-green-600 dark:text-green-300 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-300">Tempo de Resposta</p>
                      <p className="text-xl font-bold">{currentAnalytics.avgResponseTime}</p>
                    </div>
                    <div className="p-4 bg-yellow-50 dark:bg-yellow-900 rounded-lg">
                      <MapPin className="w-6 h-6 text-yellow-600 dark:text-yellow-300 mb-2" />
                      <p className="text-sm text-gray-600 dark:text-gray-300">Zonas de Risco</p>
                      <p className="text-xl font-bold">{currentAnalytics.riskZones}</p>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>

          {/* Coluna Central: Player de Vídeo */}
          <div className="col-span-12 md:col-span-6 space-y-4">
            {viewMode === 'single' ? (
              <div ref={videoContainerRef} className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
                <div className="relative aspect-video bg-gray-900 rounded-lg overflow-hidden mb-4">
                  <video
                    ref={videoRef}
                    src={currentCameras.find(c => c.id === selectedCamera)?.streamUrl}
                    autoPlay
                    muted
                    loop
                    style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                  />
                  <div className="absolute bottom-0 inset-x-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <button
                          onClick={() => setIsPlaying(!isPlaying)}
                          className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                          aria-label={isPlaying ? "Pausar vídeo" : "Reproduzir vídeo"}
                        >
                          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
                        </button>
                        <button
                          onClick={handleStepFrame}
                          className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                          aria-label="Avançar frame"
                        >
                          <ArrowRight className="w-5 h-5" />
                        </button>
                        <button
                          onClick={handlePiP}
                          className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                          aria-label="Ativar Picture in Picture"
                        >
                          <Download className="w-5 h-5" />
                        </button>
                        <span className="text-white text-sm">Ao vivo</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          onClick={handleFullscreen}
                          className="p-2 text-white hover:bg-white/20 rounded-full transition-colors"
                          aria-label="Tela cheia"
                        >
                          <Maximize2 className="w-5 h-5" />
                        </button>
                      </div>
                    </div>
                  </div>
                  {/* Painel de Controle PTZ (Simulado) */}
                  <div className="absolute top-2 right-2 bg-black bg-opacity-50 p-2 rounded space-y-1">
                    <button
                      onClick={() => handlePTZ('up')}
                      aria-label="Mover para cima"
                      className="p-1 hover:bg-gray-700 rounded"
                    >
                      <ArrowUp className="w-4 h-4 text-white" />
                    </button>
                    <div className="flex gap-1">
                      <button
                        onClick={() => handlePTZ('left')}
                        aria-label="Mover para a esquerda"
                        className="p-1 hover:bg-gray-700 rounded"
                      >
                        <ArrowLeft className="w-4 h-4 text-white" />
                      </button>
                      <button
                        onClick={() => handlePTZ('right')}
                        aria-label="Mover para a direita"
                        className="p-1 hover:bg-gray-700 rounded"
                      >
                        <ArrowRight className="w-4 h-4 text-white" />
                      </button>
                    </div>
                    <button
                      onClick={() => handlePTZ('down')}
                      aria-label="Mover para baixo"
                      className="p-1 hover:bg-gray-700 rounded"
                    >
                      <ArrowDown className="w-4 h-4 text-white" />
                    </button>
                  </div>
                </div>
                {/* Controles Avançados do Player */}
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setPlaybackRate(prev => prev + 0.25)}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                    aria-label="Aumentar velocidade"
                  >
                    <ArrowUp className="w-4 h-4 inline mr-1" />+Speed
                  </button>
                  <button
                    onClick={() => setPlaybackRate(prev => Math.max(0.25, prev - 0.25))}
                    className="px-3 py-1 bg-gray-200 dark:bg-gray-700 rounded"
                    aria-label="Diminuir velocidade"
                  >
                    <ArrowDown className="w-4 h-4 inline mr-1" />-Speed
                  </button>
                  <span className="text-white">Velocidade: {playbackRate.toFixed(2)}x</span>
                </div>
                <div className="mt-2">
                  <button
                    onClick={handleRecordings}
                    className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                  >
                    Ver Gravações
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-2 gap-4">
                {currentCameras.map((cam) => (
                  <div key={cam.id} className="relative bg-gray-900 rounded-lg overflow-hidden">
                    <video
                      src={cam.streamUrl}
                      autoPlay
                      muted
                      loop
                      style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                    />
                    <div className="absolute bottom-0 inset-x-0 p-2 bg-gradient-to-t from-black/80 to-transparent flex items-center justify-between">
                      <span className="text-white text-sm">{cam.name}</span>
                      {cam.alerts > 0 && (
                        <span className="px-2 py-1 bg-red-100 text-red-600 text-xs rounded">
                          {cam.alerts}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Coluna Direita: Alertas e Mapa de Calor */}
          <div className="col-span-12 md:col-span-3 space-y-4">
            {/* Sistema de Alertas */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
              <div className="flex items-center justify-between mb-4">
                <h2 className="font-medium text-gray-800 dark:text-gray-100">
                  {activeDashboard === 'camia' ? 'Alertas Recentes' : 'Alertas Escolares'}
                </h2>
                <button
                  onClick={() => setAlertsExpanded(!alertsExpanded)}
                  className="text-blue-600 text-sm hover:underline"
                  aria-label={alertsExpanded ? "Recolher alertas" : "Expandir alertas"}
                >
                  {alertsExpanded ? 'Recolher' : 'Ver todos'}
                </button>
              </div>
              <div className="space-y-3">
                {currentAlerts.map((alert) => (
                  <div
                    key={alert.id}
                    className={`p-4 rounded-lg border ${
                      alert.severity === 'high'
                        ? 'border-red-200 bg-red-50 dark:bg-red-900 dark:border-red-700'
                        : 'border-yellow-200 bg-yellow-50 dark:bg-yellow-900 dark:border-yellow-700'
                    }`}
                  >
                    <div className="flex items-start gap-3">
                      {renderAlertIcon(alert.type)}
                      <div className="flex-1">
                        <div className="flex items-center justify-between">
                          <h3 className="font-medium text-gray-800 dark:text-gray-100">
                            {alert.type === 'fight' && 'Briga Detectada'}
                            {alert.type === 'crowding' && 'Aglomeração'}
                            {alert.type === 'fallen_person' && 'Pessoa Caída'}
                            {alert.type === 'bullying' && 'Bullying Detectado'}
                          </h3>
                          <span className="text-sm text-gray-600 dark:text-gray-300">{alert.timestamp}</span>
                        </div>
                        <p className="text-sm text-gray-700 dark:text-gray-300 mt-1">{alert.camera}</p>
                        <div className="flex items-center gap-2 mt-2">
                          <span className="text-sm text-gray-600 dark:text-gray-300">Confiança: {alert.confidence}%</span>
                          <button
                            onClick={() => setSelectedAlert(alert)}
                            className="ml-auto text-blue-600 hover:underline text-sm"
                            aria-label={`Ver detalhes do alerta ${alert.id}`}
                          >
                            Ver Detalhe
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Mapa de Calor */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow p-4">
              <h2 className="font-medium text-gray-800 dark:text-gray-100 mb-4">Mapa de Calor</h2>
              <div className="aspect-square rounded-lg relative overflow-hidden bg-gradient-to-r from-red-500 via-yellow-500 to-green-500">
                <div className="absolute inset-0 opacity-75" />
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-white text-2xl font-bold">Heat Map</span>
                  <span className="text-white text-sm">Visualização de fluxo</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Seção: Ferramentas Extras (Ações Rápidas) */}
        <div className="p-4 bg-white dark:bg-gray-800 rounded-xl shadow mt-6">
          <h2 className="font-medium text-gray-800 dark:text-gray-100 mb-2">Ferramentas</h2>
          <div className="flex flex-wrap gap-4">
            <button onClick={() => setShowDetectionModal(true)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded">
              Detecção
            </button>
            <button onClick={() => setShowCalibrationModal(true)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded">
              Calibração
            </button>
            <button onClick={() => setShowAdvancedZonesModal(true)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded">
              Zonas Avançadas
            </button>
            <button onClick={() => setShowAdvancedAnalyticsModal(true)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded">
              Analytics Avançados
            </button>
            <button onClick={() => setShowAdvancedSearchModal(true)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded">
              Busca Avançada
            </button>
            <button onClick={() => setShowAdvancedVisualizationModal(true)} className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white rounded">
              Visualização Avançada
            </button>
          </div>
        </div>
      </main>

      {/* Renderização de Modais */}
      {selectedAlert && (
        <AlertDetailModal
          alert={selectedAlert}
          onClose={() => setSelectedAlert(null)}
        />
      )}
      {showZoneModal && <ZoneConfigModal onClose={() => setShowZoneModal(false)} />}
      {showDetectionModal && (
        <DetectionPreviewModal onClose={() => setShowDetectionModal(false)} />
      )}
      {showCalibrationModal && (
        <CalibrationModal onClose={() => setShowCalibrationModal(false)} />
      )}
      {showAdvancedZonesModal && (
        <AdvancedZonesModal onClose={() => setShowAdvancedZonesModal(false)} />
      )}
      {showAdvancedAnalyticsModal && (
        <AdvancedAnalyticsModal onClose={() => setShowAdvancedAnalyticsModal(false)} />
      )}
      {showAdvancedSearchModal && (
        <AdvancedSearchModal onClose={() => setShowAdvancedSearchModal(false)} />
      )}
      {showAdvancedVisualizationModal && (
        <AdvancedVisualizationModal onClose={() => setShowAdvancedVisualizationModal(false)} />
      )}
    </div>
  );
};

export default CamIASecurityDashboard;
