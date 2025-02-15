import React, { useState, useEffect } from 'react';
import { DragDropContext, Droppable, Draggable, DropResult } from 'react-beautiful-dnd';
import { LayoutGrid, Edit, RefreshCw } from 'lucide-react';
import { PowerBIEmbed } from 'powerbi-client-react';
import { models } from 'powerbi-client';

const initialDashboardItems = [
  { id: 'item-1', content: 'Gráfico de Vendas' },
  { id: 'item-2', content: 'Indicadores de Desempenho' },
  { id: 'item-3', content: 'Mapa de Clientes' },
];

const UXCustomBIDemo: React.FC = () => {
  // Controle de abas: "Custom BI Dashboard" e "Power BI Customization"
  const [activeTab, setActiveTab] = useState<'customBI' | 'powerBI'>('customBI');

  /*** Estados para o Custom BI Dashboard ***/
  const [selectedTemplate, setSelectedTemplate] = useState<string>('Varejo');
  const [selectedDataSource, setSelectedDataSource] = useState<string>('PowerBI');
  const [customDomain, setCustomDomain] = useState<string>('');
  const [realTimeData, setRealTimeData] = useState<string>('Nenhum dado recebido.');
  const [theme, setTheme] = useState<string>('Dark'); // Default para Dark
  const [permissions, setPermissions] = useState<{ [key: string]: boolean }>({
    'Gráfico de Vendas': true,
    'Indicadores de Desempenho': true,
    'Mapa de Clientes': true,
  });
  const [dashboardItems, setDashboardItems] = useState(initialDashboardItems);
  const [isEditing, setIsEditing] = useState<boolean>(false);

  /*** Estados para a Customização de Relatórios Power BI ***/
  const [pbMode, setPbMode] = useState<'edit' | 'view'>('edit');
  const [pbLayout, setPbLayout] = useState<string>('Default');
  const [pbFilter, setPbFilter] = useState<string>('All');
  const [pbTheme, setPbTheme] = useState<string>('Dark');
  const [pbPermission, setPbPermission] = useState<boolean>(true);
  const [pbBookmark, setPbBookmark] = useState<string>('');
  const [pbBookmarks, setPbBookmarks] = useState<string[]>([]);
  const [pbDrillThrough, setPbDrillThrough] = useState<boolean>(false);
  const [isSaving, setIsSaving] = useState<boolean>(false);
  const [isReportLoading, setIsReportLoading] = useState<boolean>(true);
  const [embedError, setEmbedError] = useState<string | null>(null);

  // -----------------------------
  // Configurações de Embed do Power BI
  // -----------------------------
  // ** Substitua os valores abaixo pelas credenciais reais **
  const reportId = "YOUR_REPORT_ID";
  const embedUrl = "https://app.powerbi.com/view?r=eyJrIjoiOGUyYWVlZDQtN2IxYi00NjFkLWI5YTMtZThjNDRhYjljYmQ5IiwidCI6IjM3MjQ4MTdmLTU1YzktNDEzOC05M2Y4LTg2N2EzNTAzYmYxMSIsImMiOjZ9";
  const accessToken = "YOUR_ACCESS_TOKEN"; // Obtido via backend seguro

  const powerBIEventHandlers = new Map<string, any>([
    ['loaded', () => { console.log('Report loaded'); setIsReportLoading(false); }],
    ['rendered', () => console.log('Report rendered')],
    ['error', (event: any) => {
      console.log('Report error', event.detail);
      setEmbedError('Erro ao carregar o relatório. Verifique as credenciais ou tente novamente.');
      setIsReportLoading(false);
    }],
    ['visualClicked', (event: any) => { console.log('Visual clicked', event.detail); }],
    ['pageChanged', (event: any) => { console.log('Page changed', event.detail); }],
  ]);

  // -----------------------------
  // Efeito de salvamento automático para customizações do Power BI
  // -----------------------------
  useEffect(() => {
    setIsSaving(true);
    const timer = setTimeout(() => {
      setIsSaving(false);
    }, 1000);
    return () => clearTimeout(timer);
  }, [pbLayout, pbFilter, pbTheme, pbPermission, pbDrillThrough]);

  /*** Funções do Custom BI Dashboard ***/
  const handleDragEnd = (result: DropResult) => {
    if (!result.destination) return;
    const items = Array.from(dashboardItems);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    setDashboardItems(items);
  };

  const togglePermission = (widget: string) => {
    setPermissions((prev) => ({
      ...prev,
      [widget]: !prev[widget],
    }));
  };

  const fetchRealTimeData = () => {
    setRealTimeData('Carregando dados...');
    setTimeout(() => {
      setRealTimeData(`Dados recebidos às ${new Date().toLocaleTimeString()}`);
    }, 1500);
  };

  /*** Funções para Power BI Customization ***/
  const handleSaveBookmark = () => {
    if (pbBookmark.trim() !== '') {
      setPbBookmarks([...pbBookmarks, pbBookmark]);
      setPbBookmark('');
    }
  };

  return (
    <div className="min-h-screen p-8 bg-gradient-to-b from-gray-900 to-gray-800 text-white">
      <header className="mb-10 text-center">
        <h1 className="text-4xl font-extrabold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-blue-500 inline-flex items-center gap-2">
          <LayoutGrid className="w-10 h-10" /> UXCustomBI Pro Demo
        </h1>
        <p className="mt-2 text-lg text-gray-300">
          Demonstração integrada de dashboards customizados e relatórios Power BI embedados.
        </p>
      </header>

      {/* Abas para alternar entre as demonstrações */}
      <div className="mb-8 flex justify-center gap-4">
        <button
          onClick={() => setActiveTab('customBI')}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            activeTab === 'customBI'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Custom BI Dashboard
        </button>
        <button
          onClick={() => setActiveTab('powerBI')}
          className={`px-6 py-2 rounded-full font-medium transition-colors ${
            activeTab === 'powerBI'
              ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
              : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
          }`}
        >
          Power BI Customization
        </button>
      </div>

      {activeTab === 'customBI' ? (
        // Seção: Custom BI Dashboard Demo
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Painel de Configurações */}
          <div className="p-6 rounded-2xl shadow-2xl bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600">
            <h2 className="text-2xl font-bold mb-6">Configurações</h2>

            {/* Template por Setor */}
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-1">Template por setor</label>
              <select
                value={selectedTemplate}
                onChange={(e) => setSelectedTemplate(e.target.value)}
                className="w-full p-2 bg-gray-900 border border-gray-600 rounded-md text-gray-200 focus:ring-2 focus:ring-purple-500"
              >
                <option value="Varejo">Varejo</option>
                <option value="Saúde">Saúde</option>
                <option value="Educação">Educação</option>
              </select>
            </div>

            {/* Permissões de Elementos */}
            <div className="mb-5">
              <h3 className="text-lg font-semibold mb-2">Permissões de Elementos</h3>
              {Object.keys(permissions).map((widget) => (
                <div key={widget} className="flex items-center justify-between mt-2">
                  <span>{widget}</span>
                  <button
                    onClick={() => togglePermission(widget)}
                    className={`px-3 py-1 rounded-full text-sm font-medium transition ${
                      permissions[widget] ? 'bg-green-600' : 'bg-red-600'
                    }`}
                  >
                    {permissions[widget] ? 'Ativo' : 'Inativo'}
                  </button>
                </div>
              ))}
            </div>

            {/* Modo de Edição Drag-and-Drop */}
            <div className="mb-5">
              <h3 className="text-lg font-semibold mb-2">Modo de Edição</h3>
              <button
                onClick={() => setIsEditing(!isEditing)}
                className="w-full px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition flex items-center justify-center gap-2 font-medium"
              >
                <Edit className="w-5 h-5" />
                {isEditing ? 'Desativar Edição' : 'Ativar Edição'}
              </button>
            </div>

            {/* Fonte de Dados */}
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-1">Fonte de Dados</label>
              <select
                value={selectedDataSource}
                onChange={(e) => setSelectedDataSource(e.target.value)}
                className="w-full p-2 bg-gray-900 border border-gray-600 rounded-md text-gray-200 focus:ring-2 focus:ring-purple-500"
              >
                <option value="PowerBI">PowerBI</option>
                <option value="Tableau">Tableau</option>
                <option value="Qlik">Qlik</option>
                <option value="Outras">Outras</option>
              </select>
            </div>

            {/* Domínio Personalizado */}
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-1">Domínio Personalizado</label>
              <div className="flex">
                <span className="inline-flex items-center px-3 rounded-l-md bg-gray-800 border border-r-0 border-gray-600">
                  https://
                </span>
                <input
                  type="text"
                  value={customDomain}
                  onChange={(e) => setCustomDomain(e.target.value)}
                  placeholder="seusite.com"
                  className="flex-1 p-2 bg-gray-900 border border-gray-600 rounded-r-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
              </div>
            </div>

            {/* Ingestão de Dados */}
            <div className="mb-5">
              <h3 className="text-lg font-semibold mb-2">Ingestão de Dados em Tempo Real</h3>
              <button
                onClick={fetchRealTimeData}
                className="w-full px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition flex items-center justify-center gap-2 font-medium"
              >
                <RefreshCw className="w-5 h-5" />
                Buscar Dados
              </button>
              <p className="mt-2 text-sm text-gray-300">{realTimeData}</p>
            </div>

            {/* Customização de Temas */}
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-1">Tema</label>
              <select
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
                className="w-full p-2 bg-gray-900 border border-gray-600 rounded-md text-gray-200 focus:ring-2 focus:ring-purple-500"
              >
                <option value="Light">Claro</option>
                <option value="Dark">Escuro</option>
                <option value="Custom">Customizado</option>
              </select>
            </div>
          </div>

          {/* Preview do Dashboard */}
          <div className="p-6 rounded-2xl shadow-2xl bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600">
            <h2 className="text-2xl font-bold mb-6">Preview do Dashboard</h2>
            <p className="mb-4">
              Template selecionado: <strong>{selectedTemplate}</strong>
            </p>
            <DragDropContext onDragEnd={handleDragEnd}>
              <Droppable droppableId="dashboard">
                {(provided) => (
                  <div
                    ref={provided.innerRef}
                    {...provided.droppableProps}
                    className="space-y-4 min-h-[150px] border-2 border-dashed border-gray-600 p-4 rounded-lg"
                  >
                    {dashboardItems.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index} isDragDisabled={!isEditing}>
                        {(provided) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className="p-4 bg-gray-900 rounded-lg border border-gray-700 flex justify-between items-center"
                          >
                            <span>{item.content}</span>
                            <span className={`text-sm ${permissions[item.content] ? 'text-green-400' : 'text-red-400'}`}>
                              {permissions[item.content] ? 'Ativo' : 'Inativo'}
                            </span>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </DragDropContext>
            {!isEditing && (
              <p className="mt-4 text-sm text-gray-400">
                Ative o modo de edição para reorganizar os widgets.
              </p>
            )}
          </div>
        </div>
      ) : (
        // Seção: Power BI Customization Demo
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Painel de Controle do Power BI */}
          <div className="p-6 rounded-2xl shadow-2xl bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600">
            <h2 className="text-2xl font-bold mb-6">Customização de Relatório Power BI</h2>

            {/* Modo Editar/Visualizar */}
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-1">Modo</label>
              <div className="flex gap-4">
                <button
                  onClick={() => setPbMode('edit')}
                  className={`flex-1 px-4 py-2 rounded-full font-medium transition ${
                    pbMode === 'edit'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Editar
                </button>
                <button
                  onClick={() => setPbMode('view')}
                  className={`flex-1 px-4 py-2 rounded-full font-medium transition ${
                    pbMode === 'view'
                      ? 'bg-gradient-to-r from-blue-600 to-purple-600 text-white shadow-lg'
                      : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
                  }`}
                >
                  Visualizar
                </button>
              </div>
            </div>

            {/* Layout do Dashboard */}
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-1">Layout do Dashboard</label>
              <select
                value={pbLayout}
                onChange={(e) => setPbLayout(e.target.value)}
                className="w-full p-2 bg-gray-900 border border-gray-600 rounded-md text-gray-200 focus:ring-2 focus:ring-purple-500"
              >
                <option value="Default">Padrão</option>
                <option value="Compact">Compacto</option>
                <option value="Spacious">Espaçoso</option>
              </select>
            </div>

            {/* Filtros */}
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-1">Filtro</label>
              <select
                value={pbFilter}
                onChange={(e) => setPbFilter(e.target.value)}
                className="w-full p-2 bg-gray-900 border border-gray-600 rounded-md text-gray-200 focus:ring-2 focus:ring-purple-500"
              >
                <option value="All">Todos</option>
                <option value="Last30Days">Últimos 30 dias</option>
                <option value="ThisYear">Este ano</option>
              </select>
            </div>

            {/* Permissão de Acesso */}
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-1">Permissão de Acesso</label>
              <button
                onClick={() => setPbPermission(!pbPermission)}
                className={`w-full px-4 py-2 rounded-full font-medium transition ${
                  pbPermission ? 'bg-green-600' : 'bg-red-600'
                }`}
              >
                {pbPermission ? 'Permitido' : 'Negado'}
              </button>
            </div>

            {/* Temas */}
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-1">Tema</label>
              <select
                value={pbTheme}
                onChange={(e) => setPbTheme(e.target.value)}
                className="w-full p-2 bg-gray-900 border border-gray-600 rounded-md text-gray-200 focus:ring-2 focus:ring-purple-500"
              >
                <option value="Light">Claro</option>
                <option value="Dark">Escuro</option>
                <option value="Custom">Customizado</option>
              </select>
            </div>

            {/* Bookmarks */}
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-1">Bookmarks</label>
              <div className="flex gap-2">
                <input
                  type="text"
                  value={pbBookmark}
                  onChange={(e) => setPbBookmark(e.target.value)}
                  placeholder="Nome do Bookmark"
                  className="flex-1 p-2 bg-gray-900 border border-gray-600 rounded-md text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
                />
                <button
                  onClick={handleSaveBookmark}
                  className="px-4 py-2 rounded-full bg-indigo-600 hover:bg-indigo-700 transition font-medium text-white"
                >
                  Salvar
                </button>
              </div>
              {pbBookmarks.length > 0 && (
                <ul className="mt-2 pl-5 list-disc text-gray-300 text-sm">
                  {pbBookmarks.map((bookmark, index) => (
                    <li key={index}>{bookmark}</li>
                  ))}
                </ul>
              )}
            </div>

            {/* Drill-through */}
            <div className="mb-5">
              <label className="block text-sm font-semibold mb-1">Drill-through</label>
              <button
                onClick={() => setPbDrillThrough(!pbDrillThrough)}
                className={`w-full px-4 py-2 rounded-full font-medium transition ${
                  pbDrillThrough ? 'bg-green-600' : 'bg-gray-700 hover:bg-gray-600'
                }`}
              >
                {pbDrillThrough ? 'Ativado' : 'Desativado'}
              </button>
            </div>

            {/* Exportar e Compartilhar */}
            <div className="mb-5 flex gap-4">
              <button className="flex-1 px-4 py-2 rounded-full bg-blue-600 hover:bg-blue-700 transition font-medium text-white">
                Exportar
              </button>
              <button className="flex-1 px-4 py-2 rounded-full bg-green-600 hover:bg-green-700 transition font-medium text-white">
                Compartilhar
              </button>
            </div>

            {/* Indicador de Auto-saving */}
            {isSaving && <p className="text-sm text-gray-400">Salvando customizações...</p>}
          </div>

          {/* Preview do Relatório Power BI Real */}
          <div className="p-6 rounded-2xl shadow-2xl bg-gradient-to-r from-gray-800 to-gray-700 border border-gray-600">
            <h2 className="text-2xl font-bold mb-6">Preview do Relatório Power BI</h2>
            {embedError ? (
              <div className="p-4 bg-red-800 text-red-300 rounded">
                <p>{embedError}</p>
              </div>
            ) : (
              <>
                {isReportLoading && (
                  <div className="flex items-center justify-center h-64">
                    <p className="text-gray-400">Carregando relatório...</p>
                  </div>
                )}
                {accessToken ? (
                  <PowerBIEmbed
                    cssClassName="report-style"
                    embedConfig={{
                      type: 'report',
                      id: reportId,
                      embedUrl: embedUrl,
                      accessToken: accessToken,
                      settings: {
                        panes: {
                          filters: {
                            expanded: false,
                            visible: true,
                          },
                        },
                        background: models.BackgroundType.Transparent,
                      },
                    }}
                    eventHandlers={powerBIEventHandlers}
                    getEmbeddedComponent={(embeddedReport) => {
                      console.log('Embedded report instance:', embeddedReport);
                    }}
                  />
                ) : (
                  <iframe
                    title="Fallback Power BI Report"
                    width="100%"
                    height="600px"
                    src="https://app.powerbi.com/view?r=eyJrIjoiOGUyYWVlZDQtN2IxYi00NjFkLWI5YTMtZThjNDRhYjljYmQ5IiwidCI6IjM3MjQ4MTdmLTU1YzktNDEzOC05M2Y4LTg2N2EzNTAzYmYxMSIsImMiOjZ9"
                    frameBorder="0"
                    allowFullScreen={true}
                  ></iframe>
                )}
              </>
            )}
            {pbMode === 'edit' && (
              <p className="mt-4 text-sm text-gray-400">
                Você está no modo de edição. As alterações serão salvas automaticamente.
              </p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default UXCustomBIDemo;
