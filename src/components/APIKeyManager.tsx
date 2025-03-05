import React, { useState, useEffect } from 'react';
import { saveAPIKey, getAllAPIKeys, hasAPIKey } from '../lib/services/apiKeyService';
import { testAPIConnection } from '../lib/services/aiService';
import { Key, Check, X, RefreshCw } from 'lucide-react';

export function APIKeyManager() {
  const [keys, setKeys] = useState({
    openai: '',
    anthropic: '',
    xai: '',
    openrouter: ''
  });
  
  const [testing, setTesting] = useState<Record<string, boolean>>({});
  const [connectionStatus, setConnectionStatus] = useState<Record<string, boolean | null>>({});
  const [showKeys, setShowKeys] = useState<Record<string, boolean>>({});
  
  useEffect(() => {
    const hasKeys = {
      openai: hasAPIKey('openai'),
      anthropic: hasAPIKey('anthropic'),
      xai: hasAPIKey('xai'),
      openrouter: hasAPIKey('openrouter')
    };
    
    // Mostrar apenas se há chaves
    setKeys({
      openai: hasKeys.openai ? '••••••••••••••••' : '',
      anthropic: hasKeys.anthropic ? '••••••••••••••••' : '',
      xai: hasKeys.xai ? '••••••••••••••••' : '',
      openrouter: hasKeys.openrouter ? '••••••••••••••••' : '',
    });
    
    // Inicializa status das conexões
    setConnectionStatus({
      openai: null,
      anthropic: null,
      xai: null,
      openrouter: null
    });
  }, []);
  
  const handleShowKey = (provider: string) => {
    setShowKeys(prev => {
      const newState = { ...prev };
      newState[provider] = !prev[provider];
      
      // Se estava oculto e agora vai mostrar, carrega a chave real
      if (newState[provider]) {
        const key = getAllAPIKeys()[provider as keyof typeof getAllAPIKeys];
        setKeys(prevKeys => ({
          ...prevKeys,
          [provider]: key || ''
        }));
      } else {
        // Se estava mostrando e agora vai ocultar
        if (hasAPIKey(provider)) {
          setKeys(prevKeys => ({
            ...prevKeys,
            [provider]: '••••••••••••••••'
          }));
        }
      }
      
      return newState;
    });
  };
  
  const handleSaveKey = (provider: string) => {
    saveAPIKey(provider, keys[provider as keyof typeof keys] || '');
    
    // Após salvar, esconde a chave novamente
    if (keys[provider as keyof typeof keys]) {
      setShowKeys(prev => ({ ...prev, [provider]: false }));
      setKeys(prev => ({ ...prev, [provider]: '••••••••••••••••' }));
    } else {
      setShowKeys(prev => ({ ...prev, [provider]: false }));
    }
    
    // Reseta o status de conexão
    setConnectionStatus(prev => ({ ...prev, [provider]: null }));
  };
  
  const handleInputChange = (provider: string, value: string) => {
    setKeys(prev => ({ ...prev, [provider]: value }));
    // Quando o usuário começa a digitar, reseta o status de conexão
    setConnectionStatus(prev => ({ ...prev, [provider]: null }));
  };
  
  const testConnection = async (provider: string, modelId: string) => {
    setTesting(prev => ({ ...prev, [provider]: true }));
    setConnectionStatus(prev => ({ ...prev, [provider]: null }));
    
    try {
      const key = getAllAPIKeys()[provider as keyof typeof getAllAPIKeys];
      if (!key) {
        setConnectionStatus(prev => ({ ...prev, [provider]: false }));
        return;
      }
      
      const isConnected = await testAPIConnection(modelId, key);
      setConnectionStatus(prev => ({ ...prev, [provider]: isConnected }));
    } catch {
      setConnectionStatus(prev => ({ ...prev, [provider]: false }));
    } finally {
      setTesting(prev => ({ ...prev, [provider]: false }));
    }
  };
  
  const providerData = [
    { id: 'openai', name: 'OpenAI', modelId: 'gpt4', placeholder: 'sk-xxxxxxxxxxxxx' },
    { id: 'anthropic', name: 'Anthropic', modelId: 'claude', placeholder: 'sk-ant-xxxxxxxxxxxxx' },
    { id: 'xai', name: 'xAI', modelId: 'grok', placeholder: 'grok-xxxxxxxxxxxxx' },
    { id: 'openrouter', name: 'OpenRouter', modelId: 'openrouter', placeholder: 'sk-or-xxxxxxxxxxxxx' }
  ];
  
  return (
    <div className="bg-gray-800 rounded-xl p-6">
      <h2 className="text-lg font-medium text-white mb-4">Configurar Chaves de API</h2>
      <p className="text-gray-400 text-sm mb-6">
        Configure suas chaves de API para usar os diferentes modelos de IA. Suas chaves são armazenadas localmente no seu navegador.
      </p>
      
      <div className="space-y-6">
        {providerData.map(provider => (
          <div key={provider.id} className="space-y-2">
            <div className="flex justify-between">
              <label htmlFor={`${provider.id}-key`} className="text-white font-medium text-sm">
                {provider.name}
              </label>
              {connectionStatus[provider.id] === true && (
                <span className="text-xs text-green-400 flex items-center">
                  <Check size={12} className="mr-1" /> Conectado
                </span>
              )}
              {connectionStatus[provider.id] === false && (
                <span className="text-xs text-red-400 flex items-center">
                  <X size={12} className="mr-1" /> Falha na conexão
                </span>
              )}
            </div>
            <div className="flex gap-2">
              <div className="relative flex-1">
                <input
                  id={`${provider.id}-key`}
                  type={showKeys[provider.id] ? "text" : "password"}
                  value={keys[provider.id as keyof typeof keys] || ''}
                  onChange={(e) => handleInputChange(provider.id, e.target.value)}
                  placeholder={provider.placeholder}
                  className="w-full bg-gray-700 border border-gray-600 text-white rounded-lg py-2 pl-9 pr-3 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <Key className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={16} />
              </div>
              <button
                onClick={() => handleShowKey(provider.id)}
                className="px-2 py-2 bg-gray-700 text-gray-300 rounded-lg hover:bg-gray-600 transition-colors"
                title={showKeys[provider.id] ? "Ocultar chave" : "Mostrar chave"}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  {showKeys[provider.id] ? (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21" />
                  ) : (
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  )}
                </svg>
              </button>
              <button
                onClick={() => handleSaveKey(provider.id)}
                className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
              >
                Salvar
              </button>
              <button
                onClick={() => testConnection(provider.id, provider.modelId)}
                disabled={testing[provider.id] || !hasAPIKey(provider.id)}
                className={`px-3 py-2 rounded-lg ${
                  !hasAPIKey(provider.id)
                    ? 'bg-gray-700 text-gray-500 cursor-not-allowed'
                    : 'bg-gray-700 text-gray-300 hover:bg-gray-600 transition-colors'
                }`}
                title="Testar conexão"
              >
                {testing[provider.id] ? (
                  <RefreshCw className="h-5 w-5 animate-spin" />
                ) : (
                  "Testar"
                )}
              </button>
            </div>
            <p className="text-xs text-gray-500">
              {provider.id === 'openai' && "Necessário para usar o GPT-4. Obtenha sua chave em https://platform.openai.com"}
              {provider.id === 'anthropic' && "Necessário para usar o Claude. Obtenha sua chave em https://console.anthropic.com"}
              {provider.id === 'xai' && "Necessário para usar o Grok. Obtenha sua chave em https://platform.xai.com"}
              {provider.id === 'openrouter' && "Permite acesso a múltiplos modelos. Obtenha sua chave em https://openrouter.ai"}
            </p>
          </div>
        ))}
      </div>
      
      <div className="mt-8 p-4 bg-blue-900/30 border border-blue-800/50 rounded-lg">
        <h3 className="text-sm font-medium text-blue-400 mb-2">Sobre segurança das chaves</h3>
        <p className="text-xs text-blue-200/70">
          Suas chaves API são armazenadas apenas localmente no seu navegador. 
          Recomendamos configurar limites de uso nas plataformas de IA para evitar custos inesperados.
        </p>
      </div>
    </div>
  );
} 