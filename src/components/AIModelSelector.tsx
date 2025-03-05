import React, { useEffect, useState } from 'react';
import { ChevronDown, Check, Settings } from 'lucide-react';
import { getAvailableModels } from '../lib/services/aiService';
import { getAPIKey } from '../lib/services/apiKeyService';
import { AIModelConfig } from '../lib/types/ai';
import './AIModelSelector.css'; // Vamos criar este arquivo CSS para estilos externos

interface AIModelSelectorProps {
  selectedModel: string;
  onSelectModel: (modelId: string) => void;
  onConfigureAPIKeys?: () => void;
}

export function AIModelSelector({ selectedModel, onSelectModel, onConfigureAPIKeys }: AIModelSelectorProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [models, setModels] = useState<Record<string, AIModelConfig>>({});
  const [availableModels, setAvailableModels] = useState<string[]>([]);

  useEffect(() => {
    // Convertemos o array de modelos para um Record para facilitar a busca
    const allModelsArray = getAvailableModels();
    const allModels: Record<string, AIModelConfig> = {};
    allModelsArray.forEach(model => {
      allModels[model.id] = model;
    });
    
    setModels(allModels);
    
    // Verificar quais modelos estão disponíveis (com chaves de API)
    const checkAvailableModels = async () => {
      const available: string[] = [];
      
      for (const model of allModelsArray) {
        const provider = model.provider;
        if (provider === 'local' || await getAPIKey(provider)) {
          available.push(model.id);
        }
      }
      
      setAvailableModels(available);
      
      // Se o modelo selecionado não estiver disponível, selecione o primeiro disponível
      if (available.length > 0 && !available.includes(selectedModel)) {
        onSelectModel(available[0]);
      }
    };
    
    checkAvailableModels();
  }, [selectedModel, onSelectModel]);

  const toggleDropdown = () => setIsOpen(!isOpen);

  const handleSelectModel = (modelId: string) => {
    onSelectModel(modelId);
    setIsOpen(false);
  };

  // Se não houver modelo selecionado ou disponível
  if (!selectedModel || availableModels.length === 0) {
    return (
      <div className="w-full px-3 py-2 text-sm text-gray-400 bg-gray-800/50 rounded-md">
        Nenhum modelo disponível. 
        {onConfigureAPIKeys && (
          <button 
            onClick={onConfigureAPIKeys}
            className="ml-1 text-blue-400 hover:text-blue-300"
          >
            Configurar APIs
          </button>
        )}
      </div>
    );
  }

  return (
    <div className="relative">
      <button
        type="button"
        className="flex items-center justify-between w-full px-3 py-2 text-sm font-medium text-gray-300 bg-gray-800/50 rounded-md hover:bg-gray-700 focus:outline-none"
        onClick={toggleDropdown}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-labelledby="model-selector-label"
        id="model-selector"
      >
        <div className="flex items-center">
          <span 
            className={`model-indicator ${models[selectedModel]?.id || 'default'}`}
            aria-hidden="true"
          />
          <span>{models[selectedModel]?.name || 'Modelo desconhecido'}</span>
        </div>
        <ChevronDown className="w-4 h-4 ml-2" />
      </button>

      {isOpen && (
        <div className="absolute z-10 w-full mt-1 bg-gray-800 rounded-md shadow-lg max-h-60 overflow-auto">
          <ul
            className="py-1 model-list"
            role="listbox"
            aria-labelledby="model-selector-label"
            aria-activedescendant={selectedModel}
          >
            {availableModels.map((modelId) => (
              <li
                key={modelId}
                id={modelId}
                role="option"
                aria-selected={modelId === selectedModel}
                tabIndex={0}
                className={`model-option ${modelId === selectedModel ? 'selected' : ''}`}
                onClick={() => handleSelectModel(modelId)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    handleSelectModel(modelId);
                    e.preventDefault();
                  }
                }}
              >
                <div className="flex items-center">
                  <span 
                    className={`model-dot ${models[modelId]?.id || 'default'}`}
                    aria-hidden="true"
                  />
                  <span>{models[modelId]?.name || 'Modelo desconhecido'}</span>
                </div>
                {modelId === selectedModel && (
                  <Check className="w-4 h-4" aria-hidden="true" />
                )}
              </li>
            ))}
            {onConfigureAPIKeys && (
              <li
                className="api-config-option"
                role="button"
                tabIndex={0}
                onClick={onConfigureAPIKeys}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' || e.key === ' ') {
                    if (onConfigureAPIKeys) onConfigureAPIKeys();
                    e.preventDefault();
                  }
                }}
                aria-label="Configurar chaves de API"
              >
                <Settings className="w-4 h-4 mr-2" aria-hidden="true" />
                <span>Configurar chaves de API</span>
              </li>
            )}
          </ul>
        </div>
      )}
      <span id="model-selector-label" className="sr-only">Selecionar modelo de IA</span>
    </div>
  );
} 