import React, { useState } from 'react';
import {
  Compass,
  Book,
  Target,
  Monitor,
  Code,
  Clock,
  Plus,
  ChevronRight,
  X
} from 'lucide-react';

interface Skill {
  name: string;
  progress: number;
  level: string;
}

interface Recommendation {
  type: 'course' | 'project' | 'resource';
  title: string;
  platform?: string;
  duration?: string;
  difficulty?: string;
  skills?: string[];
  match: number;
}

interface Milestone {
  title: string;
  date: string;
}

interface LearningPath {
  title: string;
  progress: number;
  nextMilestone: string;
  milestones: Milestone[];
  skills: Skill[];
  recommendations: Recommendation[];
}

const learningPaths: { [key: string]: LearningPath } = {
  fullstack: {
    title: 'Desenvolvedor Full Stack',
    progress: 45,
    nextMilestone: 'APIs RESTful com Django',
    milestones: [
      { title: 'Início da Jornada', date: 'Jan 2023' },
      { title: 'Frontend Avançado com React', date: 'Mar 2023' },
      { title: 'Backend com Django', date: 'Jun 2023' },
      { title: 'Integração de Banco de Dados', date: 'Set 2023' }
    ],
    skills: [
      { name: 'React', progress: 75, level: 'Intermediário' },
      { name: 'Django', progress: 60, level: 'Iniciante' },
      { name: 'PostgreSQL', progress: 40, level: 'Iniciante' }
    ],
    recommendations: [
      {
        type: 'course',
        title: 'Django REST Framework Masterclass',
        platform: 'Udemy',
        duration: '12 horas',
        match: 95
      },
      {
        type: 'project',
        title: 'Sistema de E-commerce',
        difficulty: 'Intermediário',
        skills: ['React', 'Django', 'PostgreSQL'],
        match: 88
      },
      {
        type: 'resource',
        title: 'Documentação Oficial Django',
        duration: '2 horas de leitura',
        match: 92
      }
    ]
  }
};

const SkillSphereDashboard: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'roadmap' | 'resources' | 'skills'>('roadmap');
  const [selectedSkillPath] = useState('fullstack');
  const currentPath = learningPaths[selectedSkillPath];

  // Estados para modais e feedbacks
  const [showSkillModal, setShowSkillModal] = useState(false);
  const [selectedSkill, setSelectedSkill] = useState<Skill | null>(null);
  const [showAddSkillModal, setShowAddSkillModal] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newSkillLevel, setNewSkillLevel] = useState('');
  const [newSkillProgress, setNewSkillProgress] = useState(0);
  const [toastMessage, setToastMessage] = useState<string | null>(null);

  // Função para exibir toast notifications
  const showToast = (message: string) => {
    setToastMessage(message);
    setTimeout(() => setToastMessage(null), 3000);
  };

  // Abre o modal de detalhes da habilidade
  const openSkillModal = (skill: Skill) => {
    setSelectedSkill(skill);
    setShowSkillModal(true);
  };

  // Função para adicionar nova habilidade (simulação)
  const handleAddSkill = () => {
    showToast(`Nova habilidade "${newSkillName}" adicionada!`);
    setShowAddSkillModal(false);
    setNewSkillName('');
    setNewSkillLevel('');
    setNewSkillProgress(0);
  };

  // Modal de detalhes da habilidade
  const renderSkillModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-gray-800/95 rounded-2xl p-6 max-w-md w-full border border-gray-700 shadow-2xl">
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-bold text-white">{selectedSkill?.name}</h3>
          <button 
            onClick={() => setShowSkillModal(false)} 
            className="text-gray-400 hover:text-gray-300"
            aria-label="Fechar modal"
            title="Fechar modal"
          >
            <X className="w-6 h-6" />
          </button>
        </div>
        {selectedSkill && (
          <div>
            <p className="text-gray-300 mb-2">Nível: <span className="font-medium text-white">{selectedSkill.level}</span></p>
            <p className="text-gray-300 mb-4">Progresso: <span className="font-medium text-white">{selectedSkill.progress}%</span></p>
            <div className="w-full h-2 bg-gray-700 rounded-full">
              <div className="h-full bg-blue-500 rounded-full" style={{ width: `${selectedSkill.progress}%` }} />
            </div>
          </div>
        )}
        <div className="mt-6 flex justify-end">
          <button
            onClick={() => setShowSkillModal(false)}
            className="px-4 py-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition"
          >
            Fechar
          </button>
        </div>
      </div>
    </div>
  );

  // Modal para adicionar nova habilidade
  const renderAddSkillModal = () => (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-70 z-50">
      <div className="bg-gray-800/95 rounded-2xl p-6 max-w-md w-full border border-gray-700 shadow-2xl">
        <h3 className="text-xl font-bold text-white mb-4">Adicionar Nova Habilidade</h3>
        <div className="space-y-4">
          <input
            type="text"
            placeholder="Nome da habilidade"
            value={newSkillName}
            onChange={(e) => setNewSkillName(e.target.value)}
            className="w-full p-2 bg-gray-700/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="text"
            placeholder="Nível (Iniciante, Intermediário, Avançado)"
            value={newSkillLevel}
            onChange={(e) => setNewSkillLevel(e.target.value)}
            className="w-full p-2 bg-gray-700/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <input
            type="number"
            placeholder="Progresso (%)"
            value={newSkillProgress}
            onChange={(e) => setNewSkillProgress(Number(e.target.value))}
            className="w-full p-2 bg-gray-700/50 border border-gray-600 rounded-md text-white placeholder-gray-400 focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        <div className="mt-6 flex justify-end gap-4">
          <button
            onClick={() => setShowAddSkillModal(false)}
            className="px-4 py-2 bg-gray-700 text-white rounded-full hover:bg-gray-600 transition"
          >
            Cancelar
          </button>
          <button
            onClick={handleAddSkill}
            className="px-4 py-2 bg-green-600 text-white rounded-full hover:bg-green-700 transition"
          >
            Adicionar
          </button>
        </div>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-gray-900 to-gray-800">
      {toastMessage && (
        <div className="fixed top-4 right-4 bg-purple-600 text-white px-4 py-2 rounded-full shadow-lg transition-opacity">
          {toastMessage}
        </div>
      )}
      {/* Header */}
      <div className="bg-gray-800 rounded-2xl shadow-lg p-8 mb-8 border border-gray-700">
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">SkillSphere</h1>
            <p className="text-gray-300 mt-1">Seu guia personalizado de aprendizado</p>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-300">Progresso Total:</span>
            <div className="w-64 h-2 bg-gray-700 rounded-full">
              <div
                className="h-full bg-blue-500 rounded-full transition-all duration-500"
                style={{ width: `${currentPath.progress}%` }}
              />
            </div>
            <span className="text-sm font-medium text-white">{currentPath.progress}%</span>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-grow grid grid-cols-12 gap-6">
        {/* Sidebar */}
        <div className="col-span-3">
          <div className="bg-gray-800 rounded-2xl shadow-lg p-4 border border-gray-700">
            <nav className="space-y-2">
              <button
                onClick={() => setActiveTab('roadmap')}
                className={`w-full flex items-center gap-3 p-4 rounded-lg transition-colors ${
                  activeTab === 'roadmap' ? 'bg-blue-600 text-white font-medium' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Compass className="w-5 h-5" />
                Roteiro
              </button>
              <button
                onClick={() => setActiveTab('resources')}
                className={`w-full flex items-center gap-3 p-4 rounded-lg transition-colors ${
                  activeTab === 'resources' ? 'bg-blue-600 text-white font-medium' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Book className="w-5 h-5" />
                Recursos
              </button>
              <button
                onClick={() => setActiveTab('skills')}
                className={`w-full flex items-center gap-3 p-4 rounded-lg transition-colors ${
                  activeTab === 'skills' ? 'bg-blue-600 text-white font-medium' : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <Target className="w-5 h-5" />
                Habilidades
              </button>
            </nav>
          </div>
        </div>

        {/* Main Panel */}
        <div className="col-span-9">
          <div className="bg-gray-800 rounded-2xl shadow-lg p-8">
            {activeTab === 'roadmap' && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6">Seu Roteiro: {currentPath.title}</h2>

                {/* Próximo Milestone */}
                <div className="bg-blue-600 rounded-lg p-6 mb-8 shadow-xl">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-sm text-blue-100 font-medium mb-1">Próximo Milestone</p>
                      <h3 className="text-lg font-bold text-white">{currentPath.nextMilestone}</h3>
                    </div>
                    <button className="px-6 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium">
                      Começar
                    </button>
                  </div>
                </div>

                {/* Linha do Tempo */}
                <div className="mb-8">
                  <h3 className="text-lg font-bold text-white mb-4">Linha do Tempo</h3>
                  <div className="border-l-2 border-blue-500 pl-4">
                    {currentPath.milestones.map((milestone, index) => (
                      <div key={index} className="mb-4">
                        <div className="flex items-center gap-2">
                          <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                          <span className="text-sm text-gray-300">{milestone.date}</span>
                        </div>
                        <p className="text-white font-medium">{milestone.title}</p>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Recomendações */}
                <div className="space-y-4">
                  {currentPath.recommendations.map((item, index) => (
                    <div key={index} className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:shadow-xl transition-shadow">
                      <div className="flex items-center justify-between">
                        <div className="flex items-center gap-4">
                          {item.type === 'course' && <Monitor className="w-5 h-5 text-purple-500" />}
                          {item.type === 'project' && <Code className="w-5 h-5 text-green-500" />}
                          {item.type === 'resource' && <Book className="w-5 h-5 text-blue-500" />}
                          <div>
                            <h4 className="font-medium text-white">{item.title}</h4>
                            <div className="flex items-center gap-2 text-sm text-gray-400 mt-1">
                              <Clock className="w-4 h-4" />
                              <span>{item.duration}</span>
                            </div>
                          </div>
                        </div>
                        <div className="flex items-center gap-4">
                          <span className="px-4 py-1 bg-green-100 text-green-600 rounded-full text-sm font-medium">
                            {item.match}% match
                          </span>
                          <ChevronRight className="w-5 h-5 text-gray-400" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {activeTab === 'skills' && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6">Suas Habilidades</h2>
                <div className="grid grid-cols-2 gap-4">
                  {currentPath.skills.map((skill, index) => (
                    <div
                      key={index}
                      className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
                      onClick={() => openSkillModal(skill)}
                    >
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="font-medium text-white">{skill.name}</h3>
                        <span className="text-sm text-gray-400">{skill.level}</span>
                      </div>
                      <div className="w-full h-2 bg-gray-700 rounded-full mb-3">
                        <div
                          className="h-full bg-blue-500 rounded-full transition-all duration-500"
                          style={{ width: `${skill.progress}%` }}
                        />
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-400">{skill.progress}% completo</span>
                        <button className="text-blue-400 hover:text-blue-500 transition-colors">
                          Ver detalhes →
                        </button>
                      </div>
                    </div>
                  ))}
                  <div
                    className="bg-gray-800/50 border-2 border-dashed border-gray-700 rounded-lg p-6 flex items-center justify-center cursor-pointer hover:bg-gray-700/70 transition-colors"
                    onClick={() => setShowAddSkillModal(true)}
                  >
                    <div className="text-center">
                      <Plus className="w-8 h-8 text-gray-400 mx-auto mb-2" />
                      <span className="text-gray-400">Adicionar nova habilidade</span>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === 'resources' && (
              <div>
                <h2 className="text-xl font-bold text-white mb-6">Recursos Recomendados</h2>
                <div className="grid grid-cols-3 gap-4">
                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="bg-purple-700 w-max p-3 rounded-lg mb-4">
                      <Monitor className="w-6 h-6 text-purple-300" />
                    </div>
                    <h3 className="font-medium text-white mb-2">Cursos Online</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Aprenda com cursos das melhores plataformas de educação.
                    </p>
                    <button className="text-blue-400 hover:text-blue-500 transition-colors text-sm">
                      Explorar cursos →
                    </button>
                  </div>

                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="bg-green-700 w-max p-3 rounded-lg mb-4">
                      <Code className="w-6 h-6 text-green-300" />
                    </div>
                    <h3 className="font-medium text-white mb-2">Projetos Práticos</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Aplique seus conhecimentos em cenários reais.
                    </p>
                    <button className="text-blue-400 hover:text-blue-500 transition-colors text-sm">
                      Ver projetos →
                    </button>
                  </div>

                  <div className="bg-gray-800/50 border border-gray-700 rounded-lg p-6 hover:shadow-xl transition-shadow">
                    <div className="bg-blue-700 w-max p-3 rounded-lg mb-4">
                      <Book className="w-6 h-6 text-blue-300" />
                    </div>
                    <h3 className="font-medium text-white mb-2">Documentação</h3>
                    <p className="text-sm text-gray-400 mb-4">
                      Referências técnicas e guias oficiais.
                    </p>
                    <button className="text-blue-400 hover:text-blue-500 transition-colors text-sm">
                      Acessar docs →
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Modais */}
      {showSkillModal && renderSkillModal()}
      {showAddSkillModal && renderAddSkillModal()}
    </div>
  );
};

export default SkillSphereDashboard;
