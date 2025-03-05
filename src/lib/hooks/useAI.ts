import { useState } from 'react';
import { callAI, testAPIConnection, getAvailableModels } from '../services/aiService';
import { getAPIKey } from '../services/apiKeyService';

export function useAI() {
  const [selectedModel, setSelectedModel] = useState<string>('gpt4');
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [result, setResult] = useState<string | null>(null);
  
  const models = getAvailableModels();
  
  const generateWithAI = async (prompt: string): Promise<string | null> => {
    setIsProcessing(true);
    setError(null);
    setResult(null);
    
    try {
      const apiKey = getAPIKey(getProviderFromModelId(selectedModel));
      
      if (!apiKey) {
        throw new Error(`Nenhuma chave API configurada para ${getProviderNameFromModelId(selectedModel)}`);
      }
      
      const response = await callAI(selectedModel, prompt, apiKey);
      setResult(response);
      return response;
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : 'Erro desconhecido ao chamar a API de IA';
      setError(errorMessage);
      return null;
    } finally {
      setIsProcessing(false);
    }
  };
  
  const getProviderFromModelId = (modelId: string): string => {
    const model = models.find(m => m.id === modelId);
    return model ? model.provider.toLowerCase() : 'openai';
  };
  
  const getProviderNameFromModelId = (modelId: string): string => {
    const model = models.find(m => m.id === modelId);
    return model ? model.provider : 'OpenAI';
  };
  
  const testConnection = async (modelId: string): Promise<boolean> => {
    try {
      const apiKey = getAPIKey(getProviderFromModelId(modelId));
      if (!apiKey) return false;
      
      return await testAPIConnection(modelId, apiKey);
    } catch {
      return false;
    }
  };
  
  return {
    selectedModel,
    setSelectedModel,
    isProcessing,
    error,
    result,
    generateWithAI,
    models,
    testConnection
  };
} 