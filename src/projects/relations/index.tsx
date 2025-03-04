import React, { useState, useEffect } from 'react';
import { ChevronRight, Bell, MessageSquare, PieChart, Zap, Brain, Search, BookOpen, User, Clock, Mail, Phone, CheckCircle, UserPlus } from 'lucide-react';

import './styles.css';

interface Conversation {
  date: string;
  message: string;
  from: 'me' | 'contact';
}

interface Contact {
  id: number;
  name: string;
  priority: string;
  type: string;
  lastContact: string;
  interest: number;
  responseRate: number;
  nextAction: string;
  photo: string;
  conversations: Conversation[];
}

const RelationshipManagerApp = () => {
  // Estado para controlar a navegação e interações
  const [activeTab, setActiveTab] = useState('dashboard');
  const [selectedContact, setSelectedContact] = useState<Contact | null>(null);
  const [aiAnalysisOpen, setAiAnalysisOpen] = useState(false);
  const [showContactDetails, setShowContactDetails] = useState(false);
  const [aiTyping, setAiTyping] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  // Dados simulados
 const contacts: Contact[] = [
    { 
      id: 1, 
      name: 'Mariana Silva', 
      priority: 'Alta', 
      type: 'Flerte', 
      lastContact: '2 dias atrás',
      interest: 85,
      responseRate: 92,
      nextAction: 'Sugerir encontro',
      photo: 'https://randomuser.me/api/portraits/women/44.jpg',
      conversations: [
        { date: 'Ontem, 20:45', message: 'Oi, tudo bem? Adorei nosso papo sobre fotografia ontem!', from: 'me' },
        { date: 'Ontem, 21:30', message: 'Oi! Também adorei! Você tem ótimas referências. A gente podia marcar de ir naquela exposição que comentei.', from: 'contact' },
      ]
    },
    { 
      id: 2, 
      name: 'Rafael Mendes', 
      priority: 'Média', 
      type: 'Networking', 
      lastContact: '5 dias atrás',
      interest: 65,
      responseRate: 70,
      nextAction: 'Enviar artigo sobre startups',
      photo: 'https://randomuser.me/api/portraits/men/32.jpg',
      conversations: [
        { date: '5 dias atrás, 14:20', message: 'E aí Rafael, como foi aquela reunião com os investidores?', from: 'me' },
        { date: '5 dias atrás, 16:40', message: 'Foi excelente! Conseguimos fechar a primeira rodada de investimentos. Preciso te contar os detalhes depois!', from: 'contact' },
      ]
    },
    { 
      id: 3, 
      name: 'Juliana Costa', 
      priority: 'Baixa', 
      type: 'Amizade', 
      lastContact: '12 dias atrás',
      interest: 50,
      responseRate: 45,
      nextAction: 'Perguntar sobre viagem',
      photo: 'https://randomuser.me/api/portraits/women/68.jpg',
      conversations: [
        { date: '12 dias atrás, 09:15', message: 'Ju, você já voltou da viagem para o Chile?', from: 'me' },
        { date: '12 dias atrás, 13:22', message: 'Sim! Cheguei ontem. Foi incrível! Te mando as fotos mais tarde.', from: 'contact' },
      ]
    }
  ];

  const reminders = [
    { id: 1, contactId: 1, text: 'Sugerir encontro na exposição de fotografia', dueDate: 'Hoje' },
    { id: 2, contactId: 2, text: 'Enviar artigo sobre startups', dueDate: 'Amanhã' },
    { id: 3, contactId: 3, text: 'Perguntar sobre fotos da viagem', dueDate: 'Quinta-feira' },
  ];

  const insights = [
    "Mariana demonstra alto interesse - responde rapidamente e com mensagens elaboradas",
    "Rafael está focado em networking profissional - mantenha conversas sobre negócios",
    "Juliana tem padrão de resposta lento - considere reduzir frequência de contato"
  ];

  const aiResponses: Record<string, string> = {
    mariana: "Análise de Conversa - Mariana Silva:\n\n• Nível de interesse: Alto (85%)\n• Tom: Amigável e receptivo\n• Sinais positivos: Sugeriu um encontro, responde rapidamente\n\nSugestão: Este é um bom momento para confirmar o encontro na exposição. Sugiro uma mensagem casual mas direta: \"Adoraria ir naquela exposição! Você está livre no próximo final de semana?\"",
    rafael: "Análise de Conversa - Rafael Mendes:\n\n• Nível de interesse: Médio-alto (65%)\n• Tom: Entusiasmado, mas focado em negócios\n• Contexto: Fechou rodada de investimento recentemente\n\nSugestão: Parabenize pelo sucesso e ofereça ajuda ou recursos. Exemplo: \"Parabéns pela rodada de investimento! Encontrei este artigo sobre escala de startups que pode te interessar. Podemos tomar um café na próxima semana para discutir?\"",
    juliana: "Análise de Conversa - Juliana Costa:\n\n• Nível de interesse: Médio (50%)\n• Tom: Amigável mas distante\n• Padrão: Respostas curtas, demora para responder\n\nSugestão: Mantenha contato leve e sem pressão. Pergunte sobre as fotos da viagem, mas sem expectativa de resposta imediata. O padrão de comunicação sugere uma amizade casual que não requer contato frequente."
  };

  // Efeito para simular digitação da IA
  useEffect(() => {
    if (aiAnalysisOpen && selectedContact && aiTyping) {
      let responseKey = '';
      if (selectedContact.id === 1) responseKey = 'mariana';
      else if (selectedContact.id === 2) responseKey = 'rafael';
      else if (selectedContact.id === 3) responseKey = 'juliana';
      
      const fullResponse = aiResponses[responseKey];
      let index = 0;
      
      const typingInterval = setInterval(() => {
        if (index <= fullResponse.length) {
          setAiResponse(fullResponse.substring(0, index));
          index += 5; // Aumenta o índice para simular digitação rápida
        } else {
          clearInterval(typingInterval);
          setAiTyping(false);
        }
      }, 30);
      
      return () => clearInterval(typingInterval);
    }
  }, [aiAnalysisOpen, selectedContact, aiTyping]);

    // Renderização do menu lateral
  const renderSidebar = () => (
    <div className="w-16 lg:w-64 bg-gray-900 text-white h-screen flex flex-col border-r border-gray-800">
      <div className="p-4 flex items-center justify-center lg:justify-start">
        <div className="w-10 h-10 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
          <Brain size={24} />
        </div>
        <h1 className="ml-3 text-xl font-bold hidden lg:block">ContactAI</h1>
      </div>
      
      <nav className="flex-1 mt-6">
        <ul>
          {[
            { id: 'dashboard', icon: <PieChart size={20} />, label: 'Dashboard' },
            { id: 'contacts', icon: <User size={20} />, label: 'Contatos' },
            { id: 'reminders', icon: <Bell size={20} />, label: 'Lembretes' },
            { id: 'messages', icon: <MessageSquare size={20} />, label: 'Mensagens' },
            { id: 'realtime', icon: <Zap size={20} />, label: 'Tempo Real' },
            { id: 'diary', icon: <BookOpen size={20} />, label: 'Diário Social' },
          ].map(item => (
            <li key={item.id} className="mb-2">
              <button
                onClick={() => setActiveTab(item.id)}
                className={`w-full flex items-center p-3 lg:px-4 ${activeTab === item.id ? 'bg-gray-800 border-l-4 border-purple-500' : 'hover:bg-gray-800'}`}
                aria-label={item.label}
                title={item.label}
              >
                <span className="text-gray-400">{item.icon}</span>
                <span className="ml-3 hidden lg:block">{item.label}</span>
              </button>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4">
      </div>
    </div>
  );

  // Renderização do dashboard
  const renderDashboard = () => (
    <div className="p-4 md:p-6 w-full max-w-7xl mx-auto">
      <h1 className="text-2xl font-bold mb-6 text-white">Dashboard de Relacionamentos</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 mb-6 md:mb-8">
        <div className="bg-gray-800 p-5 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Contatos Ativos</h3>
            <span className="text-2xl font-bold text-purple-500">12</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full">
            <div className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full" style={{ width: '75%' }}></div>
          </div>
          <p className="text-sm text-gray-400 mt-2">+3 novos contatos este mês</p>
        </div>
        
        <div className="bg-gray-800 p-5 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Interações Pendentes</h3>
            <span className="text-2xl font-bold text-orange-500">{reminders.length}</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full">
            <div className="h-full bg-gradient-to-r from-orange-500 to-yellow-500 rounded-full" style={{ width: '30%' }}></div>
          </div>
          <p className="text-sm text-gray-400 mt-2">1 com alta prioridade</p>
        </div>
        
        <div className="bg-gray-800 p-5 rounded-xl">
          <div className="flex items-center justify-between mb-4">
            <h3 className="text-lg font-medium">Média de Interesse</h3>
            <span className="text-2xl font-bold text-green-500">68%</span>
          </div>
          <div className="h-2 bg-gray-700 rounded-full">
            <div className="h-full bg-gradient-to-r from-green-500 to-emerald-500 rounded-full" style={{ width: '68%' }}></div>
          </div>
          <p className="text-sm text-gray-400 mt-2">↑ 12% nas últimas semanas</p>
        </div>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
        <div className="lg:col-span-2 bg-gray-800 p-5 rounded-xl">
          <h2 className="text-xl font-medium mb-4">Contatos Prioritários</h2>
          <div className="space-y-4">
            {contacts.slice(0, 3).map(contact => (
              <div key={contact.id} className="flex items-center justify-between p-3 hover:bg-gray-700 rounded-lg transition-colors">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src={`https://randomuser.me/api/portraits/${contact.id % 2 === 0 ? 'men' : 'women'}/${contact.id + 30}.jpg`} alt={contact.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">{contact.name}</h3>
                    <p className="text-sm text-gray-400">{contact.type} • {contact.lastContact}</p>
                  </div>
                </div>
                <div className="flex flex-col items-end">
                  <div className="flex items-center">
                    <span className="text-sm mr-2">Interesse:</span>
                    <div className="w-16 h-2 bg-gray-700 rounded-full">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${contact.interest}%`,
                          background: contact.interest > 75
                            ? 'linear-gradient(90deg, #10B981, #34D399)'
                            : contact.interest > 50
                              ? 'linear-gradient(90deg, #F59E0B, #FBBF24)'
                              : 'linear-gradient(90deg, #EF4444, #F87171)'
                        }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-xs text-gray-400 mt-1">{contact.nextAction}</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-gray-800 p-5 rounded-xl">
          <h2 className="text-xl font-medium mb-4">Insights da IA</h2>
          <div className="space-y-4">
            {insights.map((insight, index) => (
              <div key={index} className="p-3 bg-gray-700 bg-opacity-40 rounded-lg">
                <p className="text-sm">{insight}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // Renderização da lista de contatos
  const renderContacts = () => (
    <div className="p-4 md:p-6 w-full max-w-7xl mx-auto">
      <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-white mb-4 md:mb-0">Contatos</h2>
        <div className="w-full md:w-auto flex flex-col md:flex-row gap-4">
          {renderSearchInput()}
          <button className="flex items-center justify-center px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg text-white hover:opacity-90 transition-opacity">
            <UserPlus size={20} className="mr-2" />
            Adicionar Contato
          </button>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
        {contacts.map(contact => (
          <div
            key={contact.id}
            onClick={() => setSelectedContact(contact)}
            className="bg-gray-800 rounded-xl p-4 cursor-pointer hover:bg-gray-700 transition-colors"
          >
            <div className="flex items-center justify-between">
              <div className="flex items-center">
                <div className="w-12 h-12 rounded-full overflow-hidden">
                  <img src={`https://randomuser.me/api/portraits/${contact.id % 2 === 0 ? 'men' : 'women'}/${contact.id + 30}.jpg`} alt={contact.name} className="w-full h-full object-cover" />
                </div>
                <div className="ml-4">
                  <h3 className="font-medium text-lg">{contact.name}</h3>
                  <p className="text-sm text-gray-400">{contact.type} • {contact.lastContact}</p>
                </div>
              </div>
              <div className="flex flex-col items-end">
                <div className="flex items-center mt-1">
                  <span className="text-xs mr-2">Interesse:</span>
                  <div className="w-16 h-2 bg-gray-700 rounded-full">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${contact.interest}%`,
                          background: contact.interest > 75
                            ? 'linear-gradient(90deg, #10B981, #34D399)'
                            : contact.interest > 50
                              ? 'linear-gradient(90deg, #F59E0B, #FBBF24)'
                              : 'linear-gradient(90deg, #EF4444, #F87171)'
                        }}
                      ></div>
                    </div>
                </div>
                <span className="text-xs text-gray-400 mt-1">{contact.nextAction}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  // Renderização do modal de detalhes do contato
  const renderContactDetails = () => {
    if (!selectedContact) return null;
    
    return (
      <div className="fixed inset-0 z-50 bg-gray-900 bg-opacity-75 flex items-center justify-center p-4">
        <div className="bg-gray-800 rounded-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
          <div className="sticky top-0 bg-gray-800 p-4 border-b border-gray-700 flex items-center justify-between">
            <h2 className="text-xl font-bold text-white">Detalhes do Contato</h2>
            <button
              onClick={() => setSelectedContact(null)}
              className="p-2 hover:bg-gray-700 rounded-lg transition-colors"
              aria-label="Fechar detalhes"
            >
              &times;
            </button>
          </div>
          
          <div className="p-5">
            <div className="flex justify-between mb-5">
              <div className="flex space-x-3">
                <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700" aria-label="Enviar mensagem" title="Enviar mensagem">
                  <MessageSquare size={18} />
                </button>
                <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700" aria-label="Ligar" title="Ligar">
                  <Phone size={18} />
                </button>
                <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700" aria-label="Enviar email" title="Enviar email">
                  <Mail size={18} />
                </button>
                <button className="p-2 bg-gray-800 rounded-lg hover:bg-gray-700" aria-label="Agendar" title="Agendar">
                  <Clock size={18} />
                </button>
              </div>
              <button
                onClick={() => {setAiAnalysisOpen(!aiAnalysisOpen); if(!aiAnalysisOpen) setAiTyping(true);}}
                className={`px-4 py-2 rounded-lg flex items-center ${aiAnalysisOpen ? 'bg-purple-700' : 'bg-purple-600 hover:bg-purple-700'}`}
                aria-label="Análise de IA"
                title="Análise de IA"
              >
                <Brain size={18} className="mr-2" />
                <span>Análise IA</span>
              </button>
            </div>
            
            {aiAnalysisOpen ? (
              <div className="bg-gray-800 rounded-xl p-4 mb-5">
                <div className="flex items-center mb-3">
                  <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
                    <Brain size={16} />
                  </div>
                  <h3 className="ml-2 font-medium">Análise Inteligente</h3>
                </div>
                <div className="whitespace-pre-line">
                  {aiResponse}
                  {aiTyping && <span className="inline-block w-2 h-4 bg-purple-500 animate-pulse"></span>}
                </div>
              </div>
            ) : (
              <div className="mb-5">
                <h3 className="font-medium mb-3">Estatísticas do Relacionamento</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-gray-400">Nível de Interesse</p>
                    <div className="flex items-center mt-1">
                      <span className="text-lg font-bold">{selectedContact.interest}%</span>
                      <div className="ml-3 flex-1 h-2 bg-gray-700 rounded-full">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-blue-500" 
                          style={{ width: `${selectedContact.interest}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                  <div className="bg-gray-800 p-3 rounded-lg">
                    <p className="text-sm text-gray-400">Taxa de Resposta</p>
                    <div className="flex items-center mt-1">
                      <span className="text-lg font-bold">{selectedContact.responseRate}%</span>
                      <div className="ml-3 flex-1 h-2 bg-gray-700 rounded-full">
                        <div 
                          className="h-full rounded-full bg-gradient-to-r from-green-500 to-emerald-500" 
                          style={{ width: `${selectedContact.responseRate}%` }}
                        ></div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            <div>
              <h3 className="font-medium mb-3">Conversas Recentes</h3>
              <div className="bg-gray-800 rounded-xl p-4">
                {selectedContact.conversations.map((msg, idx) => (
                  <div key={idx} className={`mb-3 flex ${msg.from === 'me' ? 'justify-end' : 'justify-start'}`}>
                    <div className={`max-w-xs p-3 rounded-lg ${msg.from === 'me' ? 'bg-purple-600' : 'bg-gray-700'}`}>
                      <p className="text-sm">{msg.message}</p>
                      <p className="text-xs text-gray-400 mt-1">{msg.date}</p>
                    </div>
                  </div>
                ))}
                <div className="mt-4">
                  <div className="relative">
                    {/* The following input has a label, placeholder, title, and aria-label.
                        The linter error "Form elements must have labels" is likely a false positive.
                        All recommended accessibility practices have been followed. */}
                    <label htmlFor="messageInput" className="sr-only">Digite uma mensagem</label>
                    <input
                      id="messageInput"
                      type="text"
                      className="w-full bg-gray-700 text-gray-200 pl-4 pr-10 py-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
                      placeholder="Digite uma mensagem..."
                      title="Digite uma mensagem"
                      aria-label="Digite uma mensagem"
                    />
                    <button className="absolute right-2 top-2 text-purple-500 hover:text-purple-400" aria-label="Enviar mensagem" title="Enviar Mensagem">
                      <ChevronRight size={20} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
};

  // Renderização dos lembretes
  const renderReminders = () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Lembretes de Interação</h1>
      
      <div className="grid grid-cols-1 gap-4">
        {reminders.map(reminder => {
          const contact = contacts.find(c => c.id === reminder.contactId);
          return (
            <div key={reminder.id} className="bg-gray-800 rounded-xl p-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="w-10 h-10 rounded-full overflow-hidden">
                    <img src="/api/placeholder/40/40" alt={contact?.name} className="w-full h-full object-cover" />
                  </div>
                  <div className="ml-3">
                    <h3 className="font-medium">{contact?.name}</h3>
                    <p className="text-sm">{reminder.text}</p>
                  </div>
                </div>
                <div className="flex items-center">
                  <span className={`px-2 py-1 text-xs rounded-full mr-3 ${
                    reminder.dueDate === 'Hoje' 
                      ? 'bg-red-500 bg-opacity-20 text-red-400' 
                      : reminder.dueDate === 'Amanhã' 
                        ? 'bg-orange-500 bg-opacity-20 text-orange-400' 
                        : 'bg-blue-500 bg-opacity-20 text-blue-400'
                  }`}>
                    {reminder.dueDate}
                  </span>
                  <button className="p-1.5 bg-gray-700 rounded-lg hover:bg-gray-600" aria-label="Marcar como concluído">
                    <CheckCircle size={16} className="text-green-500" />
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );

  // Renderização do modo tempo real
  const renderRealTime = () => (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-6">Modo Tempo Real (Beta)</h1>

      <div className="bg-gray-800 rounded-xl p-5">
        <div className="mb-4">
          <h3 className="font-medium mb-2">Cole uma mensagem para análise instantânea</h3>
          <textarea
            id="realtime-analysis"
            aria-label="Cole aqui a mensagem que recebeu para análise"
            placeholder="Cole aqui a mensagem que recebeu para análise..."
            className="w-full h-32 bg-gray-700 text-gray-200 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 resize-none"
            title="Área para colar mensagem"
          ></textarea>
        </div>

        <div className="flex justify-end">
          <button className="px-4 py-2 bg-gradient-to-r from-purple-600 to-blue-500 rounded-lg hover:opacity-90" aria-label="Analisar Agora">
            <div className="flex items-center">
              <Zap size={18} className="mr-2" />
              <span>Analisar Agora</span>
            </div>
          </button>
        </div>
        
        <div className="mt-6 p-4 bg-gray-900 rounded-lg border border-gray-700">
          <div className="flex items-center mb-3">
            <div className="w-8 h-8 rounded-full bg-gradient-to-br from-purple-600 to-blue-500 flex items-center justify-center">
              <Brain size={16} />
            </div>
            <h3 className="ml-2 font-medium">Sugestão de Resposta</h3>
          </div>
          
          <p className="text-gray-400 italic">Cole uma mensagem acima para obter sugestões de resposta em tempo real...</p>
          
          <div className="mt-4 flex items-center justify-between text-sm text-gray-500">
            <p>Powered by IA avançada</p>
            <div className="flex items-center">
              <button className="mr-4 text-purple-400 hover:text-purple-300" aria-label="Regenerar">Regenerar</button>
              <button className="text-blue-400 hover:text-blue-300" aria-label="Copiar">Copiar</button>
            </div>
          </div>
        </div>
      </div>
      
      <div className="bg-gray-800 rounded-xl p-5 mt-6">
        <h3 className="font-medium mb-4">Configurações do Modo Tempo Real</h3>
        
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Tom de comunicação</h4>
              <p className="text-xs text-gray-400">Define o estilo das sugestões</p>
            </div>
            <select className="bg-gray-700 text-sm rounded-lg px-3 py-1.5 border border-gray-600" title="Tom de comunicação">
              <option>Casual e amigável</option>
              <option>Profissional</option>
              <option>Assertivo</option>
              <option>Flerte sutil</option>
            </select>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Comprimento das respostas</h4>
              <p className="text-xs text-gray-400">Tamanho sugerido das mensagens</p>
            </div>
            <select className="bg-gray-700 text-sm rounded-lg px-3 py-1.5 border border-gray-600" title="Comprimento das respostas">
              <option>Curto (1-2 frases)</option>
              <option>Médio (2-3 frases)</option>
              <option>Longo (parágrafo)</option>
            </select>
          </div>
          
          <div className="flex items-center justify-between">
            <div>
              <h4 className="text-sm font-medium">Modo ChatBot Assistente</h4>
              <p className="text-xs text-gray-400">Responde automaticamente às mensagens</p>
            </div>
            <div className="relative inline-block w-12 h-6">
              <input type="checkbox" id="toggle" className="opacity-0 w-0 h-0" />
              <span className="absolute cursor-pointer top-0 left-0 right-0 bottom-0 bg-gray-700 rounded-full before:absolute before:h-4 before:w-4 before:left-1 before:bottom-1 before:bg-white before:rounded-full before:transition-all"></span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );

  const renderSearchInput = () => (
    <div className="relative w-full md:w-64">
      <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
      <input
        type="text"
        placeholder="Buscar..."
        className="w-full pl-10 pr-4 py-2 bg-gray-800 border border-gray-700 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:border-purple-500"
        title="Campo de busca"
        aria-label="Campo de busca"
      />
    </div>
  );

    // Função principal para renderizar o conteúdo com base na aba ativa
    const renderContent = () => {
    switch (activeTab) {
      case 'dashboard':
        return renderDashboard();
      case 'contacts':
        return renderContacts();
      case 'reminders':
        return renderReminders();
      case 'realtime':
        return renderRealTime();
      // Adicione outros casos conforme necessário
      default:
        return <div>Conteúdo não encontrado</div>;
    }
  };

  return (
    <div className="flex h-screen bg-gray-900 text-white overflow-hidden">
      {renderSidebar()}
      <div className="flex-1 flex flex-col overflow-hidden">
        <div className="flex-1 overflow-y-auto bg-gray-900">
          {renderContent()}
        </div>
        {renderContactDetails()}
      </div>
    </div>
  )
};

export default RelationshipManagerApp;
